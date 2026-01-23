// Copyright 2014-2026, University of Colorado Boulder

/**
 * SpeedrunConfig provides configuration for speedrun mode based on URL parameters.
 *
 * @author Adam Xu
 */

import balancingChemicalEquations from '../balancingChemicalEquations.js';

export type RunType = 'full' | 'easy' | 'medium' | 'hard';

const RUN_TYPE_ALLOWED_LEVELS: Record<RunType, number[]> = {
  full: [ 1, 2, 3 ],
  easy: [ 1 ],
  medium: [ 2 ],
  hard: [ 3 ]
};

class SpeedrunConfigClass {

  public readonly runType: RunType;
  public readonly allowedLevels: number[];

  public constructor() {
    this.runType = this.getRunTypeFromURL();
    this.allowedLevels = RUN_TYPE_ALLOWED_LEVELS[ this.runType ];
  }

  private getRunTypeFromURL(): RunType {
    const params = new URLSearchParams( window.location.search );
    const type = params.get( 'run-type' );
    if ( type === 'easy' || type === 'medium' || type === 'hard' || type === 'full' ) {
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
