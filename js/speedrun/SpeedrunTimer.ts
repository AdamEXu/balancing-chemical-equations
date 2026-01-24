// Copyright 2014-2026, University of Colorado Boulder

/**
 * Speedrun timer for Balancing Chemical Equations.
 * Tracks time from first level selection until required levels achieve 5 stars.
 * Supports multiple run types: full (all 3), easy (level 1), medium (level 2), hard (level 3).
 *
 * @author Adam Xu
 */

import balancingChemicalEquations from '../balancingChemicalEquations.js';
import GameModel from '../game/model/GameModel.js';
import GameLevel from '../game/model/GameLevel.js';
import SpeedrunConfig from './SpeedrunConfig.js';

export default class SpeedrunTimer {

  private readonly model: GameModel;
  private timerElement: HTMLDivElement | null = null;
  private startTime = 0;
  private elapsedTime = 0;
  private isRunning = false;
  private isCompleted = false;
  private animationFrameId: number | null = null;
  private musicAudio: HTMLAudioElement | null = null;

  // Track which levels have achieved 5 stars (perfect score)
  private readonly levelsPerfect = new Set<number>();

  public constructor( model: GameModel ) {
    this.model = model;
    this.createTimerElement();
    this.setupListeners();
    this.setupMusic();
  }

  private setupMusic(): void {
    console.log( `Music enabled: ${SpeedrunConfig.musicEnabled}` );
    if ( SpeedrunConfig.musicEnabled ) {
      this.musicAudio = new Audio( '/static/speedrun.mp3' );
      this.musicAudio.loop = true;
      this.musicAudio.volume = 1;
    }
  }

  private createTimerElement(): void {
    this.timerElement = document.createElement( 'div' );
    this.timerElement.id = 'speedrun-timer';
    this.timerElement.style.cssText = `
      position: fixed;
      bottom: 4.5vw;
      left: 0;
      font-family: 'Courier New', Consolas, monospace;
      font-size: 24px;
      font-weight: bold;
      color: white;
      background-color: black;
      padding: 5px 12px;
      z-index: 99999;
      pointer-events: none;
      user-select: none;
    `;
    this.updateDisplay();
    document.body.appendChild( this.timerElement );
  }

  private setupListeners(): void {
    // Listen for level selection to start the timer
    this.model.levelProperty.link( ( level: GameLevel | null ) => {
      if ( level !== null && !this.isRunning && !this.isCompleted ) {
        // Only start if selecting an allowed level
        if ( SpeedrunConfig.isLevelAllowed( level.levelNumber ) ) {
          this.start();
        }
      }
    } );

    // Listen for each allowed level's bestScoreProperty to track perfect scores
    this.model.levels.forEach( ( level: GameLevel ) => {
      // Only track scores for allowed levels
      if ( SpeedrunConfig.isLevelAllowed( level.levelNumber ) ) {
        level.bestScoreProperty.link( ( score: number ) => {
          const perfectScore = level.getPerfectScore();
          console.log( `Level ${level.levelNumber} score: ${score}/${perfectScore}, running: ${this.isRunning}` );

          if ( score === 0 ) {
            // Score reset - remove from perfect set and check if full reset
            this.levelsPerfect.delete( level.levelNumber );
            this.checkForFullReset();
          }
          else if ( this.isRunning && !this.isCompleted ) {
            if ( score >= perfectScore ) {
              this.levelsPerfect.add( level.levelNumber );
              console.log( `Level ${level.levelNumber} perfect! Levels complete: ${[ ...this.levelsPerfect ]}` );
              this.checkCompletion();
            }
            else {
              // If score drops below perfect, remove from set
              this.levelsPerfect.delete( level.levelNumber );
            }
          }
        } );
      }
    } );
  }

  private checkForFullReset(): void {
    // Check if ALL allowed levels have score 0 - indicates a full reset
    const allZero = SpeedrunConfig.allowedLevels.every( levelNum => {
      const level = this.model.levels.find( l => l.levelNumber === levelNum );
      return level && level.bestScoreProperty.value === 0;
    } );

    if ( allZero && ( this.isRunning || this.isCompleted || this.elapsedTime > 0 ) ) {
      console.log( 'Full reset detected - resetting timer' );
      this.resetTimer();
    }
  }

  private resetTimer(): void {
    // Stop any running animation
    if ( this.animationFrameId !== null ) {
      cancelAnimationFrame( this.animationFrameId );
      this.animationFrameId = null;
    }

    // Stop music
    this.stopMusic();

    // Reset all state
    this.isRunning = false;
    this.isCompleted = false;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.levelsPerfect.clear();

    // Reset display
    this.updateTimerColor( 'white' );
    this.updateDisplay();
  }

  private checkCompletion(): void {
    // Check if all required levels have perfect scores
    const allComplete = SpeedrunConfig.allowedLevels.every( levelNum => this.levelsPerfect.has( levelNum ) );
    console.log( `Check completion: required=${SpeedrunConfig.allowedLevels}, have=${[ ...this.levelsPerfect ]}, complete=${allComplete}` );
    if ( allComplete ) {
      this.stop();
    }
  }

  private start(): void {
    if ( this.isRunning || this.isCompleted ) {
      return;
    }

    this.isRunning = true;
    this.startTime = performance.now();
    this.updateTimerColor( '#00ff00' ); // Green when running
    this.startMusic();
    this.tick();
  }

  private stop(): void {
    if ( !this.isRunning ) {
      return;
    }

    this.isRunning = false;
    this.isCompleted = true;
    this.elapsedTime = performance.now() - this.startTime;

    if ( this.animationFrameId !== null ) {
      cancelAnimationFrame( this.animationFrameId );
      this.animationFrameId = null;
    }

    this.stopMusic();
    this.playWinSound();
    this.updateTimerColor( 'white' ); // White when stopped/completed
    this.updateDisplay();
    this.submitTime();
  }

  private startMusic(): void {
    if ( this.musicAudio ) {
      this.musicAudio.currentTime = 0;
      this.musicAudio.play().catch( () => {
        // Autoplay may be blocked, ignore error
      } );
    }
  }

  private stopMusic(): void {
    if ( this.musicAudio ) {
      this.musicAudio.pause();
      this.musicAudio.currentTime = 0;
    }
  }

  private playWinSound(): void {
    if ( SpeedrunConfig.musicEnabled ) {
      const winAudio = new Audio( '/static/win.mp3' );
      winAudio.volume = 1;
      winAudio.loop = true;
      winAudio.play().catch( () => {
        // Ignore autoplay errors
      } );
    }
  }

  private submitTime(): void {
    const timeMs = Math.floor( this.elapsedTime );

    fetch( '/api/submit-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        time_ms: timeMs,
        run_type: SpeedrunConfig.runType
      } )
    } )
      .then( response => response.json() )
      .then( data => {
        if ( data.success ) {
          console.log( `Time submitted: ${data.time} (${data.run_type})` );
        }
        else {
          console.error( 'Failed to submit time:', data.error );
        }
      } )
      .catch( error => {
        console.error( 'Error submitting time:', error );
      } );
  }

  private tick(): void {
    if ( !this.isRunning ) {
      return;
    }

    this.elapsedTime = performance.now() - this.startTime;
    this.updateDisplay();

    this.animationFrameId = requestAnimationFrame( () => this.tick() );
  }

  private updateDisplay(): void {
    if ( this.timerElement ) {
      this.timerElement.textContent = this.formatTime( this.elapsedTime );
    }
  }

  private updateTimerColor( color: string ): void {
    if ( this.timerElement ) {
      this.timerElement.style.color = color;
    }
  }

  private formatTime( ms: number ): string {
    const totalMilliseconds = Math.floor( ms );
    const hours = Math.floor( totalMilliseconds / 3600000 );
    const minutes = Math.floor( ( totalMilliseconds % 3600000 ) / 60000 );
    const seconds = Math.floor( ( totalMilliseconds % 60000 ) / 1000 );
    const milliseconds = totalMilliseconds % 1000;

    const pad2 = ( n: number ): string => n.toString().padStart( 2, '0' );
    const pad3 = ( n: number ): string => n.toString().padStart( 3, '0' );

    return `${pad2( hours )}:${pad2( minutes )}:${pad2( seconds )}.${pad3( milliseconds )}`;
  }

  public getElapsedTime(): number {
    return this.elapsedTime;
  }

  public getFormattedTime(): string {
    return this.formatTime( this.elapsedTime );
  }

  public isTimerCompleted(): boolean {
    return this.isCompleted;
  }
}

balancingChemicalEquations.register( 'SpeedrunTimer', SpeedrunTimer );
