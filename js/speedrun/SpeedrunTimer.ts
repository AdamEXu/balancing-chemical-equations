// Copyright 2014-2026, University of Colorado Boulder

/**
 * Speedrun timer for Balancing Chemical Equations.
 * Tracks time from first level selection until all 3 levels achieve 5 stars.
 *
 * @author Adam Xu
 */

import balancingChemicalEquations from '../balancingChemicalEquations.js';
import GameModel from '../game/model/GameModel.js';
import GameLevel from '../game/model/GameLevel.js';

export default class SpeedrunTimer {

  private readonly model: GameModel;
  private timerElement: HTMLDivElement | null = null;
  private startTime = 0;
  private elapsedTime = 0;
  private isRunning = false;
  private isCompleted = false;
  private animationFrameId: number | null = null;

  // Track which levels have achieved 5 stars (perfect score)
  private readonly levelsPerfect = new Set<number>();

  public constructor( model: GameModel ) {
    this.model = model;
    this.createTimerElement();
    this.setupListeners();
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
        this.start();
      }
    } );

    // Listen for each level's bestScoreProperty to track perfect scores
    this.model.levels.forEach( ( level: GameLevel ) => {
      level.bestScoreProperty.link( ( score: number ) => {
        if ( this.isRunning && !this.isCompleted ) {
          const perfectScore = level.getPerfectScore();
          if ( score >= perfectScore ) {
            this.levelsPerfect.add( level.levelNumber );
            this.checkCompletion();
          }
          else {
            // If score drops below perfect (e.g., after reset), remove from set
            this.levelsPerfect.delete( level.levelNumber );
          }
        }
      } );
    } );
  }

  private checkCompletion(): void {
    // Check if all 3 levels have perfect scores
    if ( this.levelsPerfect.size === 3 &&
         this.levelsPerfect.has( 1 ) &&
         this.levelsPerfect.has( 2 ) &&
         this.levelsPerfect.has( 3 ) ) {
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

    this.updateTimerColor( 'white' ); // White when stopped/completed
    this.updateDisplay();
    this.submitTime();
  }

  private submitTime(): void {
    const timeMs = Math.floor( this.elapsedTime );

    fetch( '/api/submit-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( { time_ms: timeMs } )
    } )
      .then( response => response.json() )
      .then( data => {
        if ( data.success ) {
          console.log( `Time submitted: ${data.time}` );
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
