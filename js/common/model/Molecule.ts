// Copyright 2014-2025, University of Colorado Boulder

/**
 * Molecule is the model of a molecule.
 *
 * @author Vasily Shakhov (mlearner.com)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Atom from '../../../../nitroglycerin/js/Atom.js';
import Element from '../../../../nitroglycerin/js/Element.js';
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
import HBrNode from '../../../../nitroglycerin/js/nodes/HBrNode.js';
import HINode from '../../../../nitroglycerin/js/nodes/HINode.js';
import Br2Node from '../../../../nitroglycerin/js/nodes/Br2Node.js';
import I2Node from '../../../../nitroglycerin/js/nodes/I2Node.js';
import LiNode from '../../../../nitroglycerin/js/nodes/LiNode.js';
import NaNode from '../../../../nitroglycerin/js/nodes/NaNode.js';
import KNode from '../../../../nitroglycerin/js/nodes/KNode.js';
import RbNode from '../../../../nitroglycerin/js/nodes/RbNode.js';
import CsNode from '../../../../nitroglycerin/js/nodes/CsNode.js';
import MgNode from '../../../../nitroglycerin/js/nodes/MgNode.js';
import CaNode from '../../../../nitroglycerin/js/nodes/CaNode.js';
import SrNode from '../../../../nitroglycerin/js/nodes/SrNode.js';
import BaNode from '../../../../nitroglycerin/js/nodes/BaNode.js';
import ZnNode from '../../../../nitroglycerin/js/nodes/ZnNode.js';
import CdNode from '../../../../nitroglycerin/js/nodes/CdNode.js';
import FeNode from '../../../../nitroglycerin/js/nodes/FeNode.js';
import PbNode from '../../../../nitroglycerin/js/nodes/PbNode.js';
import CuNode from '../../../../nitroglycerin/js/nodes/CuNode.js';
import AgNode from '../../../../nitroglycerin/js/nodes/AgNode.js';
import HgNode from '../../../../nitroglycerin/js/nodes/HgNode.js';
import LiFNode from '../../../../nitroglycerin/js/nodes/LiFNode.js';
import LiClNode from '../../../../nitroglycerin/js/nodes/LiClNode.js';
import LiBrNode from '../../../../nitroglycerin/js/nodes/LiBrNode.js';
import LiINode from '../../../../nitroglycerin/js/nodes/LiINode.js';
import NaFNode from '../../../../nitroglycerin/js/nodes/NaFNode.js';
import NaClNode from '../../../../nitroglycerin/js/nodes/NaClNode.js';
import NaBrNode from '../../../../nitroglycerin/js/nodes/NaBrNode.js';
import NaINode from '../../../../nitroglycerin/js/nodes/NaINode.js';
import KFNode from '../../../../nitroglycerin/js/nodes/KFNode.js';
import KClNode from '../../../../nitroglycerin/js/nodes/KClNode.js';
import KBrNode from '../../../../nitroglycerin/js/nodes/KBrNode.js';
import KINode from '../../../../nitroglycerin/js/nodes/KINode.js';
import RbFNode from '../../../../nitroglycerin/js/nodes/RbFNode.js';
import RbClNode from '../../../../nitroglycerin/js/nodes/RbClNode.js';
import RbBrNode from '../../../../nitroglycerin/js/nodes/RbBrNode.js';
import RbINode from '../../../../nitroglycerin/js/nodes/RbINode.js';
import CsFNode from '../../../../nitroglycerin/js/nodes/CsFNode.js';
import CsClNode from '../../../../nitroglycerin/js/nodes/CsClNode.js';
import CsBrNode from '../../../../nitroglycerin/js/nodes/CsBrNode.js';
import CsINode from '../../../../nitroglycerin/js/nodes/CsINode.js';
import MgF2Node from '../../../../nitroglycerin/js/nodes/MgF2Node.js';
import MgCl2Node from '../../../../nitroglycerin/js/nodes/MgCl2Node.js';
import MgBr2Node from '../../../../nitroglycerin/js/nodes/MgBr2Node.js';
import MgI2Node from '../../../../nitroglycerin/js/nodes/MgI2Node.js';
import CaF2Node from '../../../../nitroglycerin/js/nodes/CaF2Node.js';
import CaCl2Node from '../../../../nitroglycerin/js/nodes/CaCl2Node.js';
import CaBr2Node from '../../../../nitroglycerin/js/nodes/CaBr2Node.js';
import CaI2Node from '../../../../nitroglycerin/js/nodes/CaI2Node.js';
import SrF2Node from '../../../../nitroglycerin/js/nodes/SrF2Node.js';
import SrCl2Node from '../../../../nitroglycerin/js/nodes/SrCl2Node.js';
import SrBr2Node from '../../../../nitroglycerin/js/nodes/SrBr2Node.js';
import SrI2Node from '../../../../nitroglycerin/js/nodes/SrI2Node.js';
import BaF2Node from '../../../../nitroglycerin/js/nodes/BaF2Node.js';
import BaCl2Node from '../../../../nitroglycerin/js/nodes/BaCl2Node.js';
import BaBr2Node from '../../../../nitroglycerin/js/nodes/BaBr2Node.js';
import BaI2Node from '../../../../nitroglycerin/js/nodes/BaI2Node.js';
import MgONode from '../../../../nitroglycerin/js/nodes/MgONode.js';
import CaONode from '../../../../nitroglycerin/js/nodes/CaONode.js';
import SrONode from '../../../../nitroglycerin/js/nodes/SrONode.js';
import BaONode from '../../../../nitroglycerin/js/nodes/BaONode.js';
import ZnONode from '../../../../nitroglycerin/js/nodes/ZnONode.js';
import CdONode from '../../../../nitroglycerin/js/nodes/CdONode.js';
import CuONode from '../../../../nitroglycerin/js/nodes/CuONode.js';
import HgONode from '../../../../nitroglycerin/js/nodes/HgONode.js';
import Ag2ONode from '../../../../nitroglycerin/js/nodes/Ag2ONode.js';
import LiHNode from '../../../../nitroglycerin/js/nodes/LiHNode.js';
import NaHNode from '../../../../nitroglycerin/js/nodes/NaHNode.js';
import KHNode from '../../../../nitroglycerin/js/nodes/KHNode.js';
import RbHNode from '../../../../nitroglycerin/js/nodes/RbHNode.js';
import CsHNode from '../../../../nitroglycerin/js/nodes/CsHNode.js';
import MgH2Node from '../../../../nitroglycerin/js/nodes/MgH2Node.js';
import CaH2Node from '../../../../nitroglycerin/js/nodes/CaH2Node.js';
import SrH2Node from '../../../../nitroglycerin/js/nodes/SrH2Node.js';
import BaH2Node from '../../../../nitroglycerin/js/nodes/BaH2Node.js';
import ZnSNode from '../../../../nitroglycerin/js/nodes/ZnSNode.js';
import FeSNode from '../../../../nitroglycerin/js/nodes/FeSNode.js';
import CaSNode from '../../../../nitroglycerin/js/nodes/CaSNode.js';
import MgSNode from '../../../../nitroglycerin/js/nodes/MgSNode.js';
import PbSNode from '../../../../nitroglycerin/js/nodes/PbSNode.js';
import Cu2SNode from '../../../../nitroglycerin/js/nodes/Cu2SNode.js';
import Ag2SNode from '../../../../nitroglycerin/js/nodes/Ag2SNode.js';
import Li2SNode from '../../../../nitroglycerin/js/nodes/Li2SNode.js';
import Na2SNode from '../../../../nitroglycerin/js/nodes/Na2SNode.js';
import K2SNode from '../../../../nitroglycerin/js/nodes/K2SNode.js';
import N2H4Node from '../../../../nitroglycerin/js/nodes/N2H4Node.js';
import ZnCl2Node from '../../../../nitroglycerin/js/nodes/ZnCl2Node.js';
import AlCl3Node from '../../../../nitroglycerin/js/nodes/AlCl3Node.js';
import FeCl2Node from '../../../../nitroglycerin/js/nodes/FeCl2Node.js';
import SiCl4Node from '../../../../nitroglycerin/js/nodes/SiCl4Node.js';
import TiCl4Node from '../../../../nitroglycerin/js/nodes/TiCl4Node.js';
import CH2Cl2Node from '../../../../nitroglycerin/js/nodes/CH2Cl2Node.js';
import CHCl3Node from '../../../../nitroglycerin/js/nodes/CHCl3Node.js';
import CCl4Node from '../../../../nitroglycerin/js/nodes/CCl4Node.js';
import S2Cl2Node from '../../../../nitroglycerin/js/nodes/S2Cl2Node.js';
import LiOHNode from '../../../../nitroglycerin/js/nodes/LiOHNode.js';
import NaOHNode from '../../../../nitroglycerin/js/nodes/NaOHNode.js';
import KOHNode from '../../../../nitroglycerin/js/nodes/KOHNode.js';
import RbOHNode from '../../../../nitroglycerin/js/nodes/RbOHNode.js';
import CsOHNode from '../../../../nitroglycerin/js/nodes/CsOHNode.js';
import MgOH2Node from '../../../../nitroglycerin/js/nodes/MgOH2Node.js';
import CaOH2Node from '../../../../nitroglycerin/js/nodes/CaOH2Node.js';
import SrOH2Node from '../../../../nitroglycerin/js/nodes/SrOH2Node.js';
import BaOH2Node from '../../../../nitroglycerin/js/nodes/BaOH2Node.js';
import BeOH2Node from '../../../../nitroglycerin/js/nodes/BeOH2Node.js';
import AlOH3Node from '../../../../nitroglycerin/js/nodes/AlOH3Node.js';
import FeOH3Node from '../../../../nitroglycerin/js/nodes/FeOH3Node.js';
import PbONode from '../../../../nitroglycerin/js/nodes/PbONode.js';
import NiONode from '../../../../nitroglycerin/js/nodes/NiONode.js';
import Cu2ONode from '../../../../nitroglycerin/js/nodes/Cu2ONode.js';
import Fe2O3Node from '../../../../nitroglycerin/js/nodes/Fe2O3Node.js';
import Fe3O4Node from '../../../../nitroglycerin/js/nodes/Fe3O4Node.js';
import Al2O3Node from '../../../../nitroglycerin/js/nodes/Al2O3Node.js';
import Cr2O3Node from '../../../../nitroglycerin/js/nodes/Cr2O3Node.js';
import MnO2Node from '../../../../nitroglycerin/js/nodes/MnO2Node.js';
import As2O3Node from '../../../../nitroglycerin/js/nodes/As2O3Node.js';
import Sb2O3Node from '../../../../nitroglycerin/js/nodes/Sb2O3Node.js';
import B2O3Node from '../../../../nitroglycerin/js/nodes/B2O3Node.js';
import V2O5Node from '../../../../nitroglycerin/js/nodes/V2O5Node.js';
import WO3Node from '../../../../nitroglycerin/js/nodes/WO3Node.js';
import SnO2Node from '../../../../nitroglycerin/js/nodes/SnO2Node.js';
import SiO2Node from '../../../../nitroglycerin/js/nodes/SiO2Node.js';
import Na2O2Node from '../../../../nitroglycerin/js/nodes/Na2O2Node.js';
import SiH4Node from '../../../../nitroglycerin/js/nodes/SiH4Node.js';
import Si2H6Node from '../../../../nitroglycerin/js/nodes/Si2H6Node.js';
import SiF4Node from '../../../../nitroglycerin/js/nodes/SiF4Node.js';
import B2H6Node from '../../../../nitroglycerin/js/nodes/B2H6Node.js';
import C3H8Node from '../../../../nitroglycerin/js/nodes/C3H8Node.js';
import C3H4Node from '../../../../nitroglycerin/js/nodes/C3H4Node.js';
import CaC2Node from '../../../../nitroglycerin/js/nodes/CaC2Node.js';
import Be2CNode from '../../../../nitroglycerin/js/nodes/Be2CNode.js';
import NiSNode from '../../../../nitroglycerin/js/nodes/NiSNode.js';
import Al2S3Node from '../../../../nitroglycerin/js/nodes/Al2S3Node.js';
import Mg3N2Node from '../../../../nitroglycerin/js/nodes/Mg3N2Node.js';
import Ca3P2Node from '../../../../nitroglycerin/js/nodes/Ca3P2Node.js';
import HNO3Node from '../../../../nitroglycerin/js/nodes/HNO3Node.js';
import H2SO4Node from '../../../../nitroglycerin/js/nodes/H2SO4Node.js';
import H3PO4Node from '../../../../nitroglycerin/js/nodes/H3PO4Node.js';
import H3PO3Node from '../../../../nitroglycerin/js/nodes/H3PO3Node.js';
import H2CO3Node from '../../../../nitroglycerin/js/nodes/H2CO3Node.js';
import H3AsO4Node from '../../../../nitroglycerin/js/nodes/H3AsO4Node.js';
import CuSO4Node from '../../../../nitroglycerin/js/nodes/CuSO4Node.js';
import ZnSO4Node from '../../../../nitroglycerin/js/nodes/ZnSO4Node.js';
import MgSO4Node from '../../../../nitroglycerin/js/nodes/MgSO4Node.js';
import PbSO4Node from '../../../../nitroglycerin/js/nodes/PbSO4Node.js';
import Al2SO43Node from '../../../../nitroglycerin/js/nodes/Al2SO43Node.js';
import Fe2SO43Node from '../../../../nitroglycerin/js/nodes/Fe2SO43Node.js';
import Na2CO3Node from '../../../../nitroglycerin/js/nodes/Na2CO3Node.js';
import Ca3PO42Node from '../../../../nitroglycerin/js/nodes/Ca3PO42Node.js';
import Ca3AsO42Node from '../../../../nitroglycerin/js/nodes/Ca3AsO42Node.js';
import AlNode from '../../../../nitroglycerin/js/nodes/AlNode.js';
import AsNode from '../../../../nitroglycerin/js/nodes/AsNode.js';
import BNode from '../../../../nitroglycerin/js/nodes/BNode.js';
import CrNode from '../../../../nitroglycerin/js/nodes/CrNode.js';
import MnNode from '../../../../nitroglycerin/js/nodes/MnNode.js';
import NiNode from '../../../../nitroglycerin/js/nodes/NiNode.js';
import SbNode from '../../../../nitroglycerin/js/nodes/SbNode.js';
import TiNode from '../../../../nitroglycerin/js/nodes/TiNode.js';
import VNode from '../../../../nitroglycerin/js/nodes/VNode.js';
import WNode from '../../../../nitroglycerin/js/nodes/WNode.js';
import SnNode from '../../../../nitroglycerin/js/nodes/SnNode.js';
import SiNode from '../../../../nitroglycerin/js/nodes/SiNode.js';

const Ag = Element.Ag;
const Ba = Element.Ba;
const Br = Element.Br;
const C = Element.C;
const Ca = Element.Ca;
const Cd = Element.Cd;
const Cl = Element.Cl;
const Cs = Element.Cs;
const Cu = Element.Cu;
const F = Element.F;
const Fe = Element.Fe;
const H = Element.H;
const Hg = Element.Hg;
const I = Element.I;
const K = Element.K;
const Li = Element.Li;
const Mg = Element.Mg;
const N = Element.N;
const Na = Element.Na;
const O = Element.O;
const P = Element.P;
const Pb = Element.Pb;
const Rb = Element.Rb;
const S = Element.S;
const Sr = Element.Sr;
const Zn = Element.Zn;
const Al = Element.Al;
const As = Element.As;
const B = Element.B;
const Be = Element.Be;
const Cr = Element.Cr;
const Mn = Element.Mn;
const Ni = Element.Ni;
const Sb = Element.Sb;
const Si = Element.Si;
const Sn = Element.Sn;
const Ti = Element.Ti;
const V = Element.V;
const W = Element.W;

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
  public static readonly Br2 = new Molecule( Br2Node, [ Br, Br ] );
  public static readonly I2 = new Molecule( I2Node, [ I, I ] );
  public static readonly HBr = new Molecule( HBrNode, [ H, Br ] );
  public static readonly HI = new Molecule( HINode, [ H, I ] );

  // Alkali metals
  public static readonly Li = new Molecule( LiNode, [ Li ] );
  public static readonly Na = new Molecule( NaNode, [ Na ] );
  public static readonly K = new Molecule( KNode, [ K ] );
  public static readonly Rb = new Molecule( RbNode, [ Rb ] );
  public static readonly Cs = new Molecule( CsNode, [ Cs ] );

  // Alkaline earth metals
  public static readonly Mg = new Molecule( MgNode, [ Mg ] );
  public static readonly Ca = new Molecule( CaNode, [ Ca ] );
  public static readonly Sr = new Molecule( SrNode, [ Sr ] );
  public static readonly Ba = new Molecule( BaNode, [ Ba ] );

  // Transition and post-transition metals
  public static readonly Zn = new Molecule( ZnNode, [ Zn ] );
  public static readonly Cd = new Molecule( CdNode, [ Cd ] );
  public static readonly Fe = new Molecule( FeNode, [ Fe ] );
  public static readonly Pb = new Molecule( PbNode, [ Pb ] );
  public static readonly Cu = new Molecule( CuNode, [ Cu ] );
  public static readonly Ag = new Molecule( AgNode, [ Ag ] );
  public static readonly Hg = new Molecule( HgNode, [ Hg ] );

  // Alkali halides
  public static readonly LiF = new Molecule( LiFNode, [ Li, F ] );
  public static readonly LiCl = new Molecule( LiClNode, [ Li, Cl ] );
  public static readonly LiBr = new Molecule( LiBrNode, [ Li, Br ] );
  public static readonly LiI = new Molecule( LiINode, [ Li, I ] );
  public static readonly NaF = new Molecule( NaFNode, [ Na, F ] );
  public static readonly NaCl = new Molecule( NaClNode, [ Na, Cl ] );
  public static readonly NaBr = new Molecule( NaBrNode, [ Na, Br ] );
  public static readonly NaI = new Molecule( NaINode, [ Na, I ] );
  public static readonly KF = new Molecule( KFNode, [ K, F ] );
  public static readonly KCl = new Molecule( KClNode, [ K, Cl ] );
  public static readonly KBr = new Molecule( KBrNode, [ K, Br ] );
  public static readonly KI = new Molecule( KINode, [ K, I ] );
  public static readonly RbF = new Molecule( RbFNode, [ Rb, F ] );
  public static readonly RbCl = new Molecule( RbClNode, [ Rb, Cl ] );
  public static readonly RbBr = new Molecule( RbBrNode, [ Rb, Br ] );
  public static readonly RbI = new Molecule( RbINode, [ Rb, I ] );
  public static readonly CsF = new Molecule( CsFNode, [ Cs, F ] );
  public static readonly CsCl = new Molecule( CsClNode, [ Cs, Cl ] );
  public static readonly CsBr = new Molecule( CsBrNode, [ Cs, Br ] );
  public static readonly CsI = new Molecule( CsINode, [ Cs, I ] );

  // Alkaline earth halides
  public static readonly MgF2 = new Molecule( MgF2Node, [ Mg, F, F ] );
  public static readonly MgCl2 = new Molecule( MgCl2Node, [ Mg, Cl, Cl ] );
  public static readonly MgBr2 = new Molecule( MgBr2Node, [ Mg, Br, Br ] );
  public static readonly MgI2 = new Molecule( MgI2Node, [ Mg, I, I ] );
  public static readonly CaF2 = new Molecule( CaF2Node, [ Ca, F, F ] );
  public static readonly CaCl2 = new Molecule( CaCl2Node, [ Ca, Cl, Cl ] );
  public static readonly CaBr2 = new Molecule( CaBr2Node, [ Ca, Br, Br ] );
  public static readonly CaI2 = new Molecule( CaI2Node, [ Ca, I, I ] );
  public static readonly SrF2 = new Molecule( SrF2Node, [ Sr, F, F ] );
  public static readonly SrCl2 = new Molecule( SrCl2Node, [ Sr, Cl, Cl ] );
  public static readonly SrBr2 = new Molecule( SrBr2Node, [ Sr, Br, Br ] );
  public static readonly SrI2 = new Molecule( SrI2Node, [ Sr, I, I ] );
  public static readonly BaF2 = new Molecule( BaF2Node, [ Ba, F, F ] );
  public static readonly BaCl2 = new Molecule( BaCl2Node, [ Ba, Cl, Cl ] );
  public static readonly BaBr2 = new Molecule( BaBr2Node, [ Ba, Br, Br ] );
  public static readonly BaI2 = new Molecule( BaI2Node, [ Ba, I, I ] );

  // Oxides
  public static readonly MgO = new Molecule( MgONode, [ Mg, O ] );
  public static readonly CaO = new Molecule( CaONode, [ Ca, O ] );
  public static readonly SrO = new Molecule( SrONode, [ Sr, O ] );
  public static readonly BaO = new Molecule( BaONode, [ Ba, O ] );
  public static readonly ZnO = new Molecule( ZnONode, [ Zn, O ] );
  public static readonly CdO = new Molecule( CdONode, [ Cd, O ] );
  public static readonly CuO = new Molecule( CuONode, [ Cu, O ] );
  public static readonly HgO = new Molecule( HgONode, [ Hg, O ] );
  public static readonly Ag2O = new Molecule( Ag2ONode, [ Ag, Ag, O ] );

  // Alkali hydrides
  public static readonly LiH = new Molecule( LiHNode, [ Li, H ] );
  public static readonly NaH = new Molecule( NaHNode, [ Na, H ] );
  public static readonly KH = new Molecule( KHNode, [ K, H ] );
  public static readonly RbH = new Molecule( RbHNode, [ Rb, H ] );
  public static readonly CsH = new Molecule( CsHNode, [ Cs, H ] );

  // Alkaline earth hydrides
  public static readonly MgH2 = new Molecule( MgH2Node, [ Mg, H, H ] );
  public static readonly CaH2 = new Molecule( CaH2Node, [ Ca, H, H ] );
  public static readonly SrH2 = new Molecule( SrH2Node, [ Sr, H, H ] );
  public static readonly BaH2 = new Molecule( BaH2Node, [ Ba, H, H ] );

  // Sulfides
  public static readonly ZnS = new Molecule( ZnSNode, [ Zn, S ] );
  public static readonly FeS = new Molecule( FeSNode, [ Fe, S ] );
  public static readonly CaS = new Molecule( CaSNode, [ Ca, S ] );
  public static readonly MgS = new Molecule( MgSNode, [ Mg, S ] );
  public static readonly PbS = new Molecule( PbSNode, [ Pb, S ] );
  public static readonly Cu2S = new Molecule( Cu2SNode, [ Cu, Cu, S ] );
  public static readonly Ag2S = new Molecule( Ag2SNode, [ Ag, Ag, S ] );
  public static readonly Li2S = new Molecule( Li2SNode, [ Li, Li, S ] );
  public static readonly Na2S = new Molecule( Na2SNode, [ Na, Na, S ] );
  public static readonly K2S = new Molecule( K2SNode, [ K, K, S ] );

  // Additional single atoms
  public static readonly Al = new Molecule( AlNode, [ Al ] );
  public static readonly As = new Molecule( AsNode, [ As ] );
  public static readonly B = new Molecule( BNode, [ B ] );
  public static readonly Cr = new Molecule( CrNode, [ Cr ] );
  public static readonly Mn = new Molecule( MnNode, [ Mn ] );
  public static readonly Ni = new Molecule( NiNode, [ Ni ] );
  public static readonly Sb = new Molecule( SbNode, [ Sb ] );
  public static readonly Si = new Molecule( SiNode, [ Si ] );
  public static readonly Sn = new Molecule( SnNode, [ Sn ] );
  public static readonly Ti = new Molecule( TiNode, [ Ti ] );
  public static readonly V = new Molecule( VNode, [ V ] );
  public static readonly W = new Molecule( WNode, [ W ] );

  // Hydrazine
  public static readonly N2H4 = new Molecule( N2H4Node, [ N, N, H, H, H, H ] );

  // Additional chlorides
  public static readonly ZnCl2 = new Molecule( ZnCl2Node, [ Zn, Cl, Cl ] );
  public static readonly AlCl3 = new Molecule( AlCl3Node, [ Al, Cl, Cl, Cl ] );
  public static readonly FeCl2 = new Molecule( FeCl2Node, [ Fe, Cl, Cl ] );
  public static readonly SiCl4 = new Molecule( SiCl4Node, [ Si, Cl, Cl, Cl, Cl ] );
  public static readonly TiCl4 = new Molecule( TiCl4Node, [ Ti, Cl, Cl, Cl, Cl ] );

  // Chloromethanes
  public static readonly CH2Cl2 = new Molecule( CH2Cl2Node, [ C, H, H, Cl, Cl ] );
  public static readonly CHCl3 = new Molecule( CHCl3Node, [ C, H, Cl, Cl, Cl ] );
  public static readonly CCl4 = new Molecule( CCl4Node, [ C, Cl, Cl, Cl, Cl ] );

  // Disulfur dichloride
  public static readonly S2Cl2 = new Molecule( S2Cl2Node, [ S, S, Cl, Cl ] );

  // Hydroxides
  public static readonly LiOH = new Molecule( LiOHNode, [ Li, O, H ] );
  public static readonly NaOH = new Molecule( NaOHNode, [ Na, O, H ] );
  public static readonly KOH = new Molecule( KOHNode, [ K, O, H ] );
  public static readonly RbOH = new Molecule( RbOHNode, [ Rb, O, H ] );
  public static readonly CsOH = new Molecule( CsOHNode, [ Cs, O, H ] );
  public static readonly MgOH2 = new Molecule( MgOH2Node, [ Mg, O, H, O, H ] );
  public static readonly CaOH2 = new Molecule( CaOH2Node, [ Ca, O, H, O, H ] );
  public static readonly SrOH2 = new Molecule( SrOH2Node, [ Sr, O, H, O, H ] );
  public static readonly BaOH2 = new Molecule( BaOH2Node, [ Ba, O, H, O, H ] );
  public static readonly BeOH2 = new Molecule( BeOH2Node, [ Be, O, H, O, H ] );
  public static readonly AlOH3 = new Molecule( AlOH3Node, [ Al, O, H, O, H, O, H ] );
  public static readonly FeOH3 = new Molecule( FeOH3Node, [ Fe, O, H, O, H, O, H ] );

  // Additional oxides
  public static readonly PbO = new Molecule( PbONode, [ Pb, O ] );
  public static readonly NiO = new Molecule( NiONode, [ Ni, O ] );
  public static readonly Cu2O = new Molecule( Cu2ONode, [ Cu, Cu, O ] );
  public static readonly Fe2O3 = new Molecule( Fe2O3Node, [ Fe, Fe, O, O, O ] );
  public static readonly Fe3O4 = new Molecule( Fe3O4Node, [ Fe, Fe, Fe, O, O, O, O ] );
  public static readonly Al2O3 = new Molecule( Al2O3Node, [ Al, Al, O, O, O ] );
  public static readonly Cr2O3 = new Molecule( Cr2O3Node, [ Cr, Cr, O, O, O ] );
  public static readonly MnO2 = new Molecule( MnO2Node, [ Mn, O, O ] );
  public static readonly As2O3 = new Molecule( As2O3Node, [ As, As, O, O, O ] );
  public static readonly Sb2O3 = new Molecule( Sb2O3Node, [ Sb, Sb, O, O, O ] );
  public static readonly B2O3 = new Molecule( B2O3Node, [ B, B, O, O, O ] );
  public static readonly V2O5 = new Molecule( V2O5Node, [ V, V, O, O, O, O, O ] );
  public static readonly WO3 = new Molecule( WO3Node, [ W, O, O, O ] );
  public static readonly SnO2 = new Molecule( SnO2Node, [ Sn, O, O ] );
  public static readonly SiO2 = new Molecule( SiO2Node, [ Si, O, O ] );
  public static readonly Na2O2 = new Molecule( Na2O2Node, [ Na, Na, O, O ] );

  // Silicon compounds
  public static readonly SiH4 = new Molecule( SiH4Node, [ Si, H, H, H, H ] );
  public static readonly Si2H6 = new Molecule( Si2H6Node, [ Si, Si, H, H, H, H, H, H ] );
  public static readonly SiF4 = new Molecule( SiF4Node, [ Si, F, F, F, F ] );

  // Boron compounds
  public static readonly B2H6 = new Molecule( B2H6Node, [ B, B, H, H, H, H, H, H ] );

  // Hydrocarbons
  public static readonly C3H8 = new Molecule( C3H8Node, [ C, C, C, H, H, H, H, H, H, H, H ] );
  public static readonly C3H4 = new Molecule( C3H4Node, [ C, C, C, H, H, H, H ] );

  // Carbides
  public static readonly CaC2 = new Molecule( CaC2Node, [ Ca, C, C ] );
  public static readonly Be2C = new Molecule( Be2CNode, [ Be, Be, C ] );

  // Additional sulfides
  public static readonly NiS = new Molecule( NiSNode, [ Ni, S ] );
  public static readonly Al2S3 = new Molecule( Al2S3Node, [ Al, Al, S, S, S ] );

  // Nitrides and phosphides
  public static readonly Mg3N2 = new Molecule( Mg3N2Node, [ Mg, Mg, Mg, N, N ] );
  public static readonly Ca3P2 = new Molecule( Ca3P2Node, [ Ca, Ca, Ca, P, P ] );

  // Acids
  public static readonly HNO3 = new Molecule( HNO3Node, [ H, N, O, O, O ] );
  public static readonly H2SO4 = new Molecule( H2SO4Node, [ H, H, S, O, O, O, O ] );
  public static readonly H3PO4 = new Molecule( H3PO4Node, [ H, H, H, P, O, O, O, O ] );
  public static readonly H3PO3 = new Molecule( H3PO3Node, [ H, H, H, P, O, O, O ] );
  public static readonly H2CO3 = new Molecule( H2CO3Node, [ H, H, C, O, O, O ] );
  public static readonly H3AsO4 = new Molecule( H3AsO4Node, [ H, H, H, As, O, O, O, O ] );

  // Sulfates
  public static readonly CuSO4 = new Molecule( CuSO4Node, [ Cu, S, O, O, O, O ] );
  public static readonly ZnSO4 = new Molecule( ZnSO4Node, [ Zn, S, O, O, O, O ] );
  public static readonly MgSO4 = new Molecule( MgSO4Node, [ Mg, S, O, O, O, O ] );
  public static readonly PbSO4 = new Molecule( PbSO4Node, [ Pb, S, O, O, O, O ] );
  public static readonly Al2SO43 = new Molecule( Al2SO43Node, [ Al, Al, S, O, O, O, O, S, O, O, O, O, S, O, O, O, O ] );
  public static readonly Fe2SO43 = new Molecule( Fe2SO43Node, [ Fe, Fe, S, O, O, O, O, S, O, O, O, O, S, O, O, O, O ] );

  // Carbonates
  public static readonly Na2CO3 = new Molecule( Na2CO3Node, [ Na, Na, C, O, O, O ] );

  // Phosphates and arsenates
  public static readonly Ca3PO42 = new Molecule( Ca3PO42Node, [ Ca, Ca, Ca, P, O, O, O, O, P, O, O, O, O ] );
  public static readonly Ca3AsO42 = new Molecule( Ca3AsO42Node, [ Ca, Ca, Ca, As, O, O, O, O, As, O, O, O, O ] );
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