// Copyright 2014-2025, University of Colorado Boulder

/**
 * Molecule is the model of a molecule.
 *
 * @author Vasily Shakhov (mlearner.com)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Atom from '../../../../nitroglycerin/js/Atom.js';
import Element from '../../../../nitroglycerin/js/Element.js';
import remixMoleculeNode from './remixMoleculeNode.js';
import RemixElements from './RemixElements.js';
import C2H2Node from '../../../../nitroglycerin/js/nodes/C2H2Node.js';
import C2H4Node from '../../../../nitroglycerin/js/nodes/C2H4Node.js';
import C2H5ClNode from '../../../../nitroglycerin/js/nodes/C2H5ClNode.js';
import C2H5OHNode from '../../../../nitroglycerin/js/nodes/C2H5OHNode.js';
import C2H6Node from '../../../../nitroglycerin/js/nodes/C2H6Node.js';
import CH2ONode from '../../../../nitroglycerin/js/nodes/CH2ONode.js';
import CH3OHNode from '../../../../nitroglycerin/js/nodes/CH3OHNode.js';
import CH4Node from '../../../../nitroglycerin/js/nodes/CH4Node.js';
import Cl2Node from '../../../../nitroglycerin/js/nodes/Cl2Node.js';
import CNode from '../../../../nitroglycerin/js/nodes/CNode.js';
import CO2Node from '../../../../nitroglycerin/js/nodes/CO2Node.js';
import CONode from '../../../../nitroglycerin/js/nodes/CONode.js';
import CS2Node from '../../../../nitroglycerin/js/nodes/CS2Node.js';
import F2Node from '../../../../nitroglycerin/js/nodes/F2Node.js';
import H2Node from '../../../../nitroglycerin/js/nodes/H2Node.js';
import H2ONode from '../../../../nitroglycerin/js/nodes/H2ONode.js';
import H2SNode from '../../../../nitroglycerin/js/nodes/H2SNode.js';
import HClNode from '../../../../nitroglycerin/js/nodes/HClNode.js';
import HFNode from '../../../../nitroglycerin/js/nodes/HFNode.js';
import MoleculeNode, { MoleculeNodeOptions } from '../../../../nitroglycerin/js/nodes/MoleculeNode.js';
import N2Node from '../../../../nitroglycerin/js/nodes/N2Node.js';
import N2ONode from '../../../../nitroglycerin/js/nodes/N2ONode.js';
import NH3Node from '../../../../nitroglycerin/js/nodes/NH3Node.js';
import NO2Node from '../../../../nitroglycerin/js/nodes/NO2Node.js';
import NONode from '../../../../nitroglycerin/js/nodes/NONode.js';
import O2Node from '../../../../nitroglycerin/js/nodes/O2Node.js';
import OF2Node from '../../../../nitroglycerin/js/nodes/OF2Node.js';
import P4Node from '../../../../nitroglycerin/js/nodes/P4Node.js';
import PCl3Node from '../../../../nitroglycerin/js/nodes/PCl3Node.js';
import PCl5Node from '../../../../nitroglycerin/js/nodes/PCl5Node.js';
import PF3Node from '../../../../nitroglycerin/js/nodes/PF3Node.js';
import PH3Node from '../../../../nitroglycerin/js/nodes/PH3Node.js';
import SNode from '../../../../nitroglycerin/js/nodes/SNode.js';
import SO2Node from '../../../../nitroglycerin/js/nodes/SO2Node.js';
import SO3Node from '../../../../nitroglycerin/js/nodes/SO3Node.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import balancingChemicalEquations from '../../balancingChemicalEquations.js';
import PNode from '../../../../nitroglycerin/js/nodes/PNode.js';
import H2O2Node from '../../../../nitroglycerin/js/nodes/H2O2Node.js';
import N2O5Node from '../../../../nitroglycerin/js/nodes/N2O5Node.js';
import P2O5Node from '../../../../nitroglycerin/js/nodes/P2O5Node.js';

const Ag = RemixElements.Ag;
const Ba = RemixElements.Ba;
const Br = Element.Br;
const C = Element.C;
const Ca = RemixElements.Ca;
const Cd = RemixElements.Cd;
const Cl = Element.Cl;
const Cs = RemixElements.Cs;
const Cu = RemixElements.Cu;
const F = Element.F;
const Fe = RemixElements.Fe;
const H = Element.H;
const Hg = RemixElements.Hg;
const I = Element.I;
const K = RemixElements.K;
const Li = RemixElements.Li;
const Mg = RemixElements.Mg;
const N = Element.N;
const Na = RemixElements.Na;
const O = Element.O;
const P = Element.P;
const Pb = RemixElements.Pb;
const Rb = RemixElements.Rb;
const S = Element.S;
const Sr = RemixElements.Sr;
const Zn = RemixElements.Zn;
const Al = RemixElements.Al;
const As = RemixElements.As;
const B = Element.B;
const Be = Element.Be;
const Cr = RemixElements.Cr;
const Mn = RemixElements.Mn;
const Ni = RemixElements.Ni;
const Sb = RemixElements.Sb;
const Si = Element.Si;
const Sn = Element.Sn;
const Ti = RemixElements.Ti;
const V = RemixElements.V;
const W = RemixElements.W;

export default class Molecule {

  private readonly MoleculeNodeConstructor: new ( options?: MoleculeNodeOptions ) => MoleculeNode;
  public readonly symbol: string; // in RichText format, with LTR wrapping
  public readonly atoms: Atom[];

  /**
   * Constructor is private because we only use the static instances defined below.
   * @param MoleculeNodeConstructor - constructor for some MoleculeNode subclass, for creating the view
   * @param elements - ordered set of Elements that define the Molecule structure. For example: [ C, C, H, H ] => 'C<sub>2</sub>H<sub>2</sub>'
   */
  private constructor( MoleculeNodeConstructor: new ( options?: MoleculeNodeOptions ) => MoleculeNode, elements: Element[] ) {

    this.MoleculeNodeConstructor = MoleculeNodeConstructor;
    this.symbol = elementsToSymbol( elements );
    this.atoms = elements.map( element => new Atom( element ) );
  }

  /**
   * Any molecule with more than 5 atoms is considered "big". This affects degree of difficulty in the Game.
   */
  public isBig(): boolean {
    return this.atoms.length > 5;
  }

  /**
   * Creates the MoleculeNode that corresponds to this Molecule.
   */
  public createNode( options?: MoleculeNodeOptions ): MoleculeNode {
    return new this.MoleculeNodeConstructor( options );
  }

  // Static instances used through the simulation.
  /**
   * Creates a remix-mode Molecule whose view is laid out automatically from its elements.
   */
  private static remix( elements: Element[] ): Molecule {
    return new Molecule( remixMoleculeNode( elements ), elements );
  }

  public static readonly C = new Molecule( CNode, [ C ] );
  public static readonly Cl2 = new Molecule( Cl2Node, [ Cl, Cl ] );
  public static readonly C2H2 = new Molecule( C2H2Node, [ C, C, H, H ] );
  public static readonly C2H4 = new Molecule( C2H4Node, [ C, C, H, H, H, H ] );
  public static readonly C2H5Cl = new Molecule( C2H5ClNode, [ C, C, H, H, H, H, H, Cl ] );
  public static readonly C2H5OH = new Molecule( C2H5OHNode, [ C, C, H, H, H, H, H, O, H ] );
  public static readonly C2H6 = new Molecule( C2H6Node, [ C, C, H, H, H, H, H, H ] );
  public static readonly CH2O = new Molecule( CH2ONode, [ C, H, H, O ] );
  public static readonly CH3OH = new Molecule( CH3OHNode, [ C, H, H, H, O, H ] );
  public static readonly CH4 = new Molecule( CH4Node, [ C, H, H, H, H ] );
  public static readonly CO = new Molecule( CONode, [ C, O ] );
  public static readonly CO2 = new Molecule( CO2Node, [ C, O, O ] );
  public static readonly CS2 = new Molecule( CS2Node, [ C, S, S ] );
  public static readonly F2 = new Molecule( F2Node, [ F, F ] );
  public static readonly H2 = new Molecule( H2Node, [ H, H ] );
  public static readonly H2O = new Molecule( H2ONode, [ H, H, O ] );
  public static readonly H2O2 = new Molecule( H2O2Node, [ H, H, O, O ] );
  public static readonly H2S = new Molecule( H2SNode, [ H, H, S ] );
  public static readonly HF = new Molecule( HFNode, [ H, F ] );
  public static readonly HCl = new Molecule( HClNode, [ H, Cl ] );
  public static readonly N2 = new Molecule( N2Node, [ N, N ] );
  public static readonly N2O = new Molecule( N2ONode, [ N, N, O ] );
  public static readonly N2O5 = new Molecule( N2O5Node, [ N, N, O, O, O, O, O ] );
  public static readonly NH3 = new Molecule( NH3Node, [ N, H, H, H ] );
  public static readonly NO = new Molecule( NONode, [ N, O ] );
  public static readonly NO2 = new Molecule( NO2Node, [ N, O, O ] );
  public static readonly O2 = new Molecule( O2Node, [ O, O ] );
  public static readonly OF2 = new Molecule( OF2Node, [ O, F, F ] );
  public static readonly P = new Molecule( PNode, [ P ] );
  public static readonly P4 = new Molecule( P4Node, [ P, P, P, P ] );
  public static readonly P2O5 = new Molecule( P2O5Node, [ P, P, O, O, O, O, O ] );
  public static readonly PH3 = new Molecule( PH3Node, [ P, H, H, H ] );
  public static readonly PCl3 = new Molecule( PCl3Node, [ P, Cl, Cl, Cl ] );
  public static readonly PCl5 = new Molecule( PCl5Node, [ P, Cl, Cl, Cl, Cl, Cl ] );
  public static readonly PF3 = new Molecule( PF3Node, [ P, F, F, F ] );
  public static readonly S = new Molecule( SNode, [ S ] );
  public static readonly SO2 = new Molecule( SO2Node, [ S, O, O ] );
  public static readonly SO3 = new Molecule( SO3Node, [ S, O, O, O ] );

  // Halogens
  public static readonly Br2 = Molecule.remix( [ Br, Br ] );
  public static readonly I2 = Molecule.remix( [ I, I ] );
  public static readonly HBr = Molecule.remix( [ H, Br ] );
  public static readonly HI = Molecule.remix( [ H, I ] );

  // Alkali metals
  public static readonly Li = Molecule.remix( [ Li ] );
  public static readonly Na = Molecule.remix( [ Na ] );
  public static readonly K = Molecule.remix( [ K ] );
  public static readonly Rb = Molecule.remix( [ Rb ] );
  public static readonly Cs = Molecule.remix( [ Cs ] );

  // Alkaline earth metals
  public static readonly Mg = Molecule.remix( [ Mg ] );
  public static readonly Ca = Molecule.remix( [ Ca ] );
  public static readonly Sr = Molecule.remix( [ Sr ] );
  public static readonly Ba = Molecule.remix( [ Ba ] );

  // Transition and post-transition metals
  public static readonly Zn = Molecule.remix( [ Zn ] );
  public static readonly Cd = Molecule.remix( [ Cd ] );
  public static readonly Fe = Molecule.remix( [ Fe ] );
  public static readonly Pb = Molecule.remix( [ Pb ] );
  public static readonly Cu = Molecule.remix( [ Cu ] );
  public static readonly Ag = Molecule.remix( [ Ag ] );
  public static readonly Hg = Molecule.remix( [ Hg ] );

  // Alkali halides
  public static readonly LiF = Molecule.remix( [ Li, F ] );
  public static readonly LiCl = Molecule.remix( [ Li, Cl ] );
  public static readonly LiBr = Molecule.remix( [ Li, Br ] );
  public static readonly LiI = Molecule.remix( [ Li, I ] );
  public static readonly NaF = Molecule.remix( [ Na, F ] );
  public static readonly NaCl = Molecule.remix( [ Na, Cl ] );
  public static readonly NaBr = Molecule.remix( [ Na, Br ] );
  public static readonly NaI = Molecule.remix( [ Na, I ] );
  public static readonly KF = Molecule.remix( [ K, F ] );
  public static readonly KCl = Molecule.remix( [ K, Cl ] );
  public static readonly KBr = Molecule.remix( [ K, Br ] );
  public static readonly KI = Molecule.remix( [ K, I ] );
  public static readonly RbF = Molecule.remix( [ Rb, F ] );
  public static readonly RbCl = Molecule.remix( [ Rb, Cl ] );
  public static readonly RbBr = Molecule.remix( [ Rb, Br ] );
  public static readonly RbI = Molecule.remix( [ Rb, I ] );
  public static readonly CsF = Molecule.remix( [ Cs, F ] );
  public static readonly CsCl = Molecule.remix( [ Cs, Cl ] );
  public static readonly CsBr = Molecule.remix( [ Cs, Br ] );
  public static readonly CsI = Molecule.remix( [ Cs, I ] );

  // Alkaline earth halides
  public static readonly MgF2 = Molecule.remix( [ Mg, F, F ] );
  public static readonly MgCl2 = Molecule.remix( [ Mg, Cl, Cl ] );
  public static readonly MgBr2 = Molecule.remix( [ Mg, Br, Br ] );
  public static readonly MgI2 = Molecule.remix( [ Mg, I, I ] );
  public static readonly CaF2 = Molecule.remix( [ Ca, F, F ] );
  public static readonly CaCl2 = Molecule.remix( [ Ca, Cl, Cl ] );
  public static readonly CaBr2 = Molecule.remix( [ Ca, Br, Br ] );
  public static readonly CaI2 = Molecule.remix( [ Ca, I, I ] );
  public static readonly SrF2 = Molecule.remix( [ Sr, F, F ] );
  public static readonly SrCl2 = Molecule.remix( [ Sr, Cl, Cl ] );
  public static readonly SrBr2 = Molecule.remix( [ Sr, Br, Br ] );
  public static readonly SrI2 = Molecule.remix( [ Sr, I, I ] );
  public static readonly BaF2 = Molecule.remix( [ Ba, F, F ] );
  public static readonly BaCl2 = Molecule.remix( [ Ba, Cl, Cl ] );
  public static readonly BaBr2 = Molecule.remix( [ Ba, Br, Br ] );
  public static readonly BaI2 = Molecule.remix( [ Ba, I, I ] );

  // Oxides
  public static readonly MgO = Molecule.remix( [ Mg, O ] );
  public static readonly CaO = Molecule.remix( [ Ca, O ] );
  public static readonly SrO = Molecule.remix( [ Sr, O ] );
  public static readonly BaO = Molecule.remix( [ Ba, O ] );
  public static readonly ZnO = Molecule.remix( [ Zn, O ] );
  public static readonly CdO = Molecule.remix( [ Cd, O ] );
  public static readonly CuO = Molecule.remix( [ Cu, O ] );
  public static readonly HgO = Molecule.remix( [ Hg, O ] );
  public static readonly Ag2O = Molecule.remix( [ Ag, Ag, O ] );

  // Alkali hydrides
  public static readonly LiH = Molecule.remix( [ Li, H ] );
  public static readonly NaH = Molecule.remix( [ Na, H ] );
  public static readonly KH = Molecule.remix( [ K, H ] );
  public static readonly RbH = Molecule.remix( [ Rb, H ] );
  public static readonly CsH = Molecule.remix( [ Cs, H ] );

  // Alkaline earth hydrides
  public static readonly MgH2 = Molecule.remix( [ Mg, H, H ] );
  public static readonly CaH2 = Molecule.remix( [ Ca, H, H ] );
  public static readonly SrH2 = Molecule.remix( [ Sr, H, H ] );
  public static readonly BaH2 = Molecule.remix( [ Ba, H, H ] );

  // Sulfides
  public static readonly ZnS = Molecule.remix( [ Zn, S ] );
  public static readonly FeS = Molecule.remix( [ Fe, S ] );
  public static readonly CaS = Molecule.remix( [ Ca, S ] );
  public static readonly MgS = Molecule.remix( [ Mg, S ] );
  public static readonly PbS = Molecule.remix( [ Pb, S ] );
  public static readonly Cu2S = Molecule.remix( [ Cu, Cu, S ] );
  public static readonly Ag2S = Molecule.remix( [ Ag, Ag, S ] );
  public static readonly Li2S = Molecule.remix( [ Li, Li, S ] );
  public static readonly Na2S = Molecule.remix( [ Na, Na, S ] );
  public static readonly K2S = Molecule.remix( [ K, K, S ] );

  // Additional single atoms
  public static readonly Al = Molecule.remix( [ Al ] );
  public static readonly As = Molecule.remix( [ As ] );
  public static readonly B = Molecule.remix( [ B ] );
  public static readonly Cr = Molecule.remix( [ Cr ] );
  public static readonly Mn = Molecule.remix( [ Mn ] );
  public static readonly Ni = Molecule.remix( [ Ni ] );
  public static readonly Sb = Molecule.remix( [ Sb ] );
  public static readonly Si = Molecule.remix( [ Si ] );
  public static readonly Sn = Molecule.remix( [ Sn ] );
  public static readonly Ti = Molecule.remix( [ Ti ] );
  public static readonly V = Molecule.remix( [ V ] );
  public static readonly W = Molecule.remix( [ W ] );

  // Hydrazine
  public static readonly N2H4 = Molecule.remix( [ N, N, H, H, H, H ] );

  // Additional chlorides
  public static readonly ZnCl2 = Molecule.remix( [ Zn, Cl, Cl ] );
  public static readonly AlCl3 = Molecule.remix( [ Al, Cl, Cl, Cl ] );
  public static readonly FeCl2 = Molecule.remix( [ Fe, Cl, Cl ] );
  public static readonly SiCl4 = Molecule.remix( [ Si, Cl, Cl, Cl, Cl ] );
  public static readonly TiCl4 = Molecule.remix( [ Ti, Cl, Cl, Cl, Cl ] );

  // Chloromethanes
  public static readonly CH2Cl2 = Molecule.remix( [ C, H, H, Cl, Cl ] );
  public static readonly CHCl3 = Molecule.remix( [ C, H, Cl, Cl, Cl ] );
  public static readonly CCl4 = Molecule.remix( [ C, Cl, Cl, Cl, Cl ] );

  // Disulfur dichloride
  public static readonly S2Cl2 = Molecule.remix( [ S, S, Cl, Cl ] );

  // Hydroxides
  public static readonly LiOH = Molecule.remix( [ Li, O, H ] );
  public static readonly NaOH = Molecule.remix( [ Na, O, H ] );
  public static readonly KOH = Molecule.remix( [ K, O, H ] );
  public static readonly RbOH = Molecule.remix( [ Rb, O, H ] );
  public static readonly CsOH = Molecule.remix( [ Cs, O, H ] );
  public static readonly MgOH2 = Molecule.remix( [ Mg, O, H, O, H ] );
  public static readonly CaOH2 = Molecule.remix( [ Ca, O, H, O, H ] );
  public static readonly SrOH2 = Molecule.remix( [ Sr, O, H, O, H ] );
  public static readonly BaOH2 = Molecule.remix( [ Ba, O, H, O, H ] );
  public static readonly BeOH2 = Molecule.remix( [ Be, O, H, O, H ] );
  public static readonly AlOH3 = Molecule.remix( [ Al, O, H, O, H, O, H ] );
  public static readonly FeOH3 = Molecule.remix( [ Fe, O, H, O, H, O, H ] );

  // Additional oxides
  public static readonly PbO = Molecule.remix( [ Pb, O ] );
  public static readonly NiO = Molecule.remix( [ Ni, O ] );
  public static readonly Cu2O = Molecule.remix( [ Cu, Cu, O ] );
  public static readonly Fe2O3 = Molecule.remix( [ Fe, Fe, O, O, O ] );
  public static readonly Fe3O4 = Molecule.remix( [ Fe, Fe, Fe, O, O, O, O ] );
  public static readonly Al2O3 = Molecule.remix( [ Al, Al, O, O, O ] );
  public static readonly Cr2O3 = Molecule.remix( [ Cr, Cr, O, O, O ] );
  public static readonly MnO2 = Molecule.remix( [ Mn, O, O ] );
  public static readonly As2O3 = Molecule.remix( [ As, As, O, O, O ] );
  public static readonly Sb2O3 = Molecule.remix( [ Sb, Sb, O, O, O ] );
  public static readonly B2O3 = Molecule.remix( [ B, B, O, O, O ] );
  public static readonly V2O5 = Molecule.remix( [ V, V, O, O, O, O, O ] );
  public static readonly WO3 = Molecule.remix( [ W, O, O, O ] );
  public static readonly SnO2 = Molecule.remix( [ Sn, O, O ] );
  public static readonly SiO2 = Molecule.remix( [ Si, O, O ] );
  public static readonly Na2O2 = Molecule.remix( [ Na, Na, O, O ] );

  // Silicon compounds
  public static readonly SiH4 = Molecule.remix( [ Si, H, H, H, H ] );
  public static readonly Si2H6 = Molecule.remix( [ Si, Si, H, H, H, H, H, H ] );
  public static readonly SiF4 = Molecule.remix( [ Si, F, F, F, F ] );

  // Boron compounds
  public static readonly B2H6 = Molecule.remix( [ B, B, H, H, H, H, H, H ] );

  // Hydrocarbons
  public static readonly C3H8 = Molecule.remix( [ C, C, C, H, H, H, H, H, H, H, H ] );
  public static readonly C3H4 = Molecule.remix( [ C, C, C, H, H, H, H ] );

  // Carbides
  public static readonly CaC2 = Molecule.remix( [ Ca, C, C ] );
  public static readonly Be2C = Molecule.remix( [ Be, Be, C ] );

  // Additional sulfides
  public static readonly NiS = Molecule.remix( [ Ni, S ] );
  public static readonly Al2S3 = Molecule.remix( [ Al, Al, S, S, S ] );

  // Nitrides and phosphides
  public static readonly Mg3N2 = Molecule.remix( [ Mg, Mg, Mg, N, N ] );
  public static readonly Ca3P2 = Molecule.remix( [ Ca, Ca, Ca, P, P ] );

  // Acids
  public static readonly HNO3 = Molecule.remix( [ H, N, O, O, O ] );
  public static readonly H2SO4 = Molecule.remix( [ H, H, S, O, O, O, O ] );
  public static readonly H3PO4 = Molecule.remix( [ H, H, H, P, O, O, O, O ] );
  public static readonly H3PO3 = Molecule.remix( [ H, H, H, P, O, O, O ] );
  public static readonly H2CO3 = Molecule.remix( [ H, H, C, O, O, O ] );
  public static readonly H3AsO4 = Molecule.remix( [ H, H, H, As, O, O, O, O ] );

  // Sulfates
  public static readonly CuSO4 = Molecule.remix( [ Cu, S, O, O, O, O ] );
  public static readonly ZnSO4 = Molecule.remix( [ Zn, S, O, O, O, O ] );
  public static readonly MgSO4 = Molecule.remix( [ Mg, S, O, O, O, O ] );
  public static readonly PbSO4 = Molecule.remix( [ Pb, S, O, O, O, O ] );
  public static readonly Al2SO43 = Molecule.remix( [ Al, Al, S, O, O, O, O, S, O, O, O, O, S, O, O, O, O ] );
  public static readonly Fe2SO43 = Molecule.remix( [ Fe, Fe, S, O, O, O, O, S, O, O, O, O, S, O, O, O, O ] );

  // Carbonates
  public static readonly Na2CO3 = Molecule.remix( [ Na, Na, C, O, O, O ] );

  // Phosphates and arsenates
  public static readonly Ca3PO42 = Molecule.remix( [ Ca, Ca, Ca, P, O, O, O, O, P, O, O, O, O ] );
  public static readonly Ca3AsO42 = Molecule.remix( [ Ca, Ca, Ca, As, O, O, O, O, As, O, O, O, O ] );
}

/**
 * Converts an ordered set of elements to the symbol for a Molecule. Left-to-right order is preserved.
 * The string is in RichText format by default, with LTR wrapping, but can be in plain text format with withMarkup = false.
 * For example: [ C, C, H, H ] => '\u202aC<sub>2</sub>H<sub>2</sub>\u202b'
 */
function elementsToSymbol( elements: Element[], withMarkup = true ): string {
  let symbol = '';
  let element: Element | null = null;
  let count = 0;
  for ( let i = 0; i < elements.length; i++ ) {
    const currentElement = elements[ i ];
    if ( currentElement === element ) {
      count++;
    }
    else {
      if ( count > 1 ) {
        if ( withMarkup ) {
          symbol += `<sub>${count}</sub>`;
        }
        else {
          symbol += `${count}`;
        }
      }
      symbol += currentElement.symbol;
      element = currentElement;
      count = 1;
    }
  }
  if ( count > 1 ) {
    if ( withMarkup ) {
      symbol += `<sub>${count}</sub>`;
    }
    else {
      symbol += `${count}`;
    }
  }

  // Preserve left-to-right ordering.
  if ( withMarkup ) {
    symbol = StringUtils.wrapLTR( symbol );
  }

  return symbol;
}

balancingChemicalEquations.register( 'Molecule', Molecule );