// Copyright 2026, University of Colorado Boulder

/**
 * Builds a MoleculeNode subclass for a remix-mode molecule from its element list alone, so the
 * remix set does not need a hand-laid-out node per molecule. The first element listed is treated
 * as the central species: its atoms form a horizontal core and every other atom is placed on a
 * ring around that core.
 *
 * @author Adam Xu
 */

import Element from '../../../../nitroglycerin/js/Element.js';
import AtomNode from '../../../../nitroglycerin/js/nodes/AtomNode.js';
import MoleculeNode, { MoleculeNodeOptions } from '../../../../nitroglycerin/js/nodes/MoleculeNode.js';

export type MoleculeNodeConstructor = new ( options?: MoleculeNodeOptions ) => MoleculeNode;

const CORE_OVERLAP = 0.25;
const RING_OVERLAP = 0.3;

export default function remixMoleculeNode( elements: Element[] ): MoleculeNodeConstructor {

  return class RemixMoleculeNode extends MoleculeNode {
    public constructor( providedOptions?: MoleculeNodeOptions ) {
      super( layoutAtoms( elements, providedOptions?.atomNodeOptions ), providedOptions );
    }
  };
}

function layoutAtoms( elements: Element[], atomNodeOptions: MoleculeNodeOptions[ 'atomNodeOptions' ] ): AtomNode[] {

  const coreElement = elements[ 0 ];
  const coreAtoms = elements.filter( element => element === coreElement ).map( element => new AtomNode( element, atomNodeOptions ) );
  const ringAtoms = elements.filter( element => element !== coreElement ).map( element => new AtomNode( element, atomNodeOptions ) );

  // Linear AB and AB2 read better than a ring.
  if ( coreAtoms.length === 1 && ringAtoms.length <= 2 ) {
    const row = ringAtoms.length === 2 ? [ ringAtoms[ 0 ], coreAtoms[ 0 ], ringAtoms[ 1 ] ] : [ coreAtoms[ 0 ], ...ringAtoms ];
    placeInRow( row, CORE_OVERLAP );
    return row;
  }

  placeInRow( coreAtoms, CORE_OVERLAP );
  if ( ringAtoms.length === 0 ) {
    return coreAtoms;
  }

  const coreLeft = Math.min( ...coreAtoms.map( atom => atom.left ) );
  const coreRight = Math.max( ...coreAtoms.map( atom => atom.right ) );
  const coreTop = Math.min( ...coreAtoms.map( atom => atom.top ) );
  const coreBottom = Math.max( ...coreAtoms.map( atom => atom.bottom ) );
  const centerX = ( coreLeft + coreRight ) / 2;
  const centerY = ( coreTop + coreBottom ) / 2;

  const behind: AtomNode[] = [];
  const inFront: AtomNode[] = [];
  ringAtoms.forEach( ( atom, i ) => {
    const angle = -Math.PI / 2 + ( 2 * Math.PI * i ) / ringAtoms.length;
    const radiusX = ( coreRight - coreLeft ) / 2 + ( 1 - RING_OVERLAP ) * atom.width / 2;
    const radiusY = ( coreBottom - coreTop ) / 2 + ( 1 - RING_OVERLAP ) * atom.height / 2;
    atom.centerX = centerX + radiusX * Math.cos( angle );
    atom.centerY = centerY + radiusY * Math.sin( angle );
    ( Math.sin( angle ) < 0 ? behind : inFront ).push( atom );
  } );

  return [ ...behind, ...coreAtoms, ...inFront ];
}

function placeInRow( atoms: AtomNode[], overlapPercent: number ): void {
  for ( let i = 1; i < atoms.length; i++ ) {
    atoms[ i ].left = atoms[ i - 1 ].right - overlapPercent * atoms[ i ].width;
  }
}
