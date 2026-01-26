// Copyright 2014-2026, University of Colorado Boulder

/**
 * SpeedrunConfig provides configuration for speedrun mode based on URL parameters.
 *
 * @author Adam Xu
 */

import balancingChemicalEquations from '../balancingChemicalEquations.js';

export type RunType = 'full' | 'easy' | 'medium' | 'hard' | 'remix-full' | 'remix-easy' | 'remix-medium' | 'remix-hard';

const RUN_TYPE_ALLOWED_LEVELS: Record<RunType, number[]> = {
  full: [ 1, 2, 3 ],
  easy: [ 1 ],
  medium: [ 2 ],
  hard: [ 3 ],
  'remix-full': [ 1, 2, 3 ],
  'remix-easy': [ 1 ],
  'remix-medium': [ 2 ],
  'remix-hard': [ 3 ]
};

class SpeedrunConfigClass {

  public readonly runType: RunType;
  public readonly allowedLevels: number[];
  public readonly musicEnabled: boolean;

  public constructor() {
    const params = new URLSearchParams( window.location.search );
    this.runType = this.getRunTypeFromURL( params );
    this.allowedLevels = RUN_TYPE_ALLOWED_LEVELS[ this.runType ];
    this.musicEnabled = params.get( 'music' ) === 'true';
  }

  private getRunTypeFromURL( params: URLSearchParams ): RunType {
    const type = params.get( 'run-type' );
    if ( type === 'easy' || type === 'medium' || type === 'hard' || type === 'full' ||
         type === 'remix-easy' || type === 'remix-medium' || type === 'remix-hard' || type === 'remix-full' ) {
      return type;
    }
    return 'full';
  }

  public isLevelAllowed( levelNumber: number ): boolean {
    return this.allowedLevels.includes( levelNumber );
  }
}

const SpeedrunConfig = new SpeedrunConfigClass();

balancingChemicalEquations.register( 'SpeedrunConfig', SpeedrunConfig );

export default SpeedrunConfig;
