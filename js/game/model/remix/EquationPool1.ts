// Copyright 2025, University of Colorado Boulder

/**
* EquationPool1 is the pool of equations for Game level 1.
 *
 * @author Chris Malley (PixelZoom, Inc.)
*/

import balancingChemicalEquations from '../../../balancingChemicalEquations.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import Range from '../../../../../dot/js/Range.js';
import EquationPool from '.././EquationPool.js';
import Molecule from '../../../common/model/Molecule.js';
import Equation from '../../../common/model/Equation.js';

export default class EquationPool1 extends EquationPool {

  public constructor( coefficientsRange: Range, tandem: Tandem ) {

    let equationIndex = 0;

    // Factors out the duplication for creating an Equation with 1 reactant and 2 products.
    const create1Reactant2Products = ( r1: number, reactant1: Molecule, p1: number, product1: Molecule, p2: number, product2: Molecule ) =>
      Equation.create1Reactant2Products( r1, reactant1, p1, product1, p2, product2, coefficientsRange,
        tandem.createTandem( `equation${equationIndex++}` ), EquationPool.coefficientPropertyPhetioReadOnly );

    // Factors out the duplication for creating an Equation with 2 reactants and 1 product.
    const create2Reactants1Product = ( r1: number, reactant1: Molecule, r2: number, reactant2: Molecule, p1: number, product1: Molecule ) =>
      Equation.create2Reactants1Product( r1, reactant1, r2, reactant2, p1, product1, coefficientsRange,
        tandem.createTandem( `equation${equationIndex++}` ), EquationPool.coefficientPropertyPhetioReadOnly );

    // The equations in the pool.
    const equations: Equation[] = [
      create1Reactant2Products( 1, Molecule.PCl5, 1, Molecule.PCl3, 1, Molecule.Cl2 ),
      create1Reactant2Products( 1, Molecule.CH3OH, 1, Molecule.CO, 2, Molecule.H2 ),
      create2Reactants1Product( 2, Molecule.H2, 1, Molecule.O2, 2, Molecule.H2O ),
      create2Reactants1Product( 1, Molecule.H2, 1, Molecule.F2, 2, Molecule.HF ),
      create1Reactant2Products( 2, Molecule.HCl, 1, Molecule.H2, 1, Molecule.Cl2 ),
      create2Reactants1Product( 1, Molecule.CH2O, 1, Molecule.H2, 1, Molecule.CH3OH ),
      create1Reactant2Products( 1, Molecule.C2H6, 1, Molecule.C2H4, 1, Molecule.H2 ),
      create2Reactants1Product( 1, Molecule.C2H2, 2, Molecule.H2, 1, Molecule.C2H6 ),
      create2Reactants1Product( 1, Molecule.C, 1, Molecule.O2, 1, Molecule.CO2 ),
      create2Reactants1Product( 2, Molecule.C, 1, Molecule.O2, 2, Molecule.CO ),
      create1Reactant2Products( 2, Molecule.CO2, 2, Molecule.CO, 1, Molecule.O2 ),
      create1Reactant2Products( 2, Molecule.CO, 1, Molecule.C, 1, Molecule.CO2 ),
      create2Reactants1Product( 1, Molecule.C, 2, Molecule.S, 1, Molecule.CS2 ),
      create1Reactant2Products( 2, Molecule.NO, 1, Molecule.N2, 1, Molecule.O2 ),
      create1Reactant2Products( 2, Molecule.NO2, 2, Molecule.NO, 1, Molecule.O2 ),
      create2Reactants1Product( 2, Molecule.N2, 1, Molecule.O2, 2, Molecule.N2O ),
      create1Reactant2Products( 2, Molecule.SO3, 2, Molecule.SO2, 1, Molecule.O2 ),
      create2Reactants1Product( 1, Molecule.H2, 1, Molecule.Cl2, 2, Molecule.HCl ),
      create2Reactants1Product( 1, Molecule.H2, 1, Molecule.Br2, 2, Molecule.HBr ),
      create2Reactants1Product( 1, Molecule.H2, 1, Molecule.I2, 2, Molecule.HI ),
      create1Reactant2Products( 2, Molecule.HF, 1, Molecule.H2, 1, Molecule.F2 ),
      create1Reactant2Products( 2, Molecule.HBr, 1, Molecule.H2, 1, Molecule.Br2 ),
      create1Reactant2Products( 2, Molecule.HI, 1, Molecule.H2, 1, Molecule.I2 ),
      create2Reactants1Product( 2, Molecule.Li, 1, Molecule.F2, 2, Molecule.LiF ),
      create2Reactants1Product( 2, Molecule.Li, 1, Molecule.Cl2, 2, Molecule.LiCl ),
      create2Reactants1Product( 2, Molecule.Li, 1, Molecule.Br2, 2, Molecule.LiBr ),
      create2Reactants1Product( 2, Molecule.Li, 1, Molecule.I2, 2, Molecule.LiI ),
      create2Reactants1Product( 2, Molecule.Na, 1, Molecule.F2, 2, Molecule.NaF ),
      create2Reactants1Product( 2, Molecule.Na, 1, Molecule.Cl2, 2, Molecule.NaCl ),
      create2Reactants1Product( 2, Molecule.Na, 1, Molecule.Br2, 2, Molecule.NaBr ),
      create2Reactants1Product( 2, Molecule.Na, 1, Molecule.I2, 2, Molecule.NaI ),
      create2Reactants1Product( 2, Molecule.K, 1, Molecule.F2, 2, Molecule.KF ),
      create2Reactants1Product( 2, Molecule.K, 1, Molecule.Cl2, 2, Molecule.KCl ),
      create2Reactants1Product( 2, Molecule.K, 1, Molecule.Br2, 2, Molecule.KBr ),
      create2Reactants1Product( 2, Molecule.K, 1, Molecule.I2, 2, Molecule.KI ),
      create2Reactants1Product( 2, Molecule.Rb, 1, Molecule.F2, 2, Molecule.RbF ),
      create2Reactants1Product( 2, Molecule.Rb, 1, Molecule.Cl2, 2, Molecule.RbCl ),
      create2Reactants1Product( 2, Molecule.Rb, 1, Molecule.Br2, 2, Molecule.RbBr ),
      create2Reactants1Product( 2, Molecule.Rb, 1, Molecule.I2, 2, Molecule.RbI ),
      create2Reactants1Product( 2, Molecule.Cs, 1, Molecule.F2, 2, Molecule.CsF ),
      create2Reactants1Product( 2, Molecule.Cs, 1, Molecule.Cl2, 2, Molecule.CsCl ),
      create2Reactants1Product( 2, Molecule.Cs, 1, Molecule.Br2, 2, Molecule.CsBr ),
      create2Reactants1Product( 2, Molecule.Cs, 1, Molecule.I2, 2, Molecule.CsI ),
      create1Reactant2Products( 2, Molecule.LiF, 2, Molecule.Li, 1, Molecule.F2 ),
      create1Reactant2Products( 2, Molecule.NaCl, 2, Molecule.Na, 1, Molecule.Cl2 ),
      create1Reactant2Products( 2, Molecule.KBr, 2, Molecule.K, 1, Molecule.Br2 ),
      create1Reactant2Products( 2, Molecule.RbI, 2, Molecule.Rb, 1, Molecule.I2 ),
      create2Reactants1Product( 1, Molecule.Mg, 1, Molecule.F2, 1, Molecule.MgF2 ),
      create2Reactants1Product( 1, Molecule.Mg, 1, Molecule.Cl2, 1, Molecule.MgCl2 ),
      create2Reactants1Product( 1, Molecule.Mg, 1, Molecule.Br2, 1, Molecule.MgBr2 ),
      create2Reactants1Product( 1, Molecule.Mg, 1, Molecule.I2, 1, Molecule.MgI2 ),
      create2Reactants1Product( 1, Molecule.Ca, 1, Molecule.F2, 1, Molecule.CaF2 ),
      create2Reactants1Product( 1, Molecule.Ca, 1, Molecule.Cl2, 1, Molecule.CaCl2 ),
      create2Reactants1Product( 1, Molecule.Ca, 1, Molecule.Br2, 1, Molecule.CaBr2 ),
      create2Reactants1Product( 1, Molecule.Ca, 1, Molecule.I2, 1, Molecule.CaI2 ),
      create2Reactants1Product( 1, Molecule.Sr, 1, Molecule.F2, 1, Molecule.SrF2 ),
      create2Reactants1Product( 1, Molecule.Sr, 1, Molecule.Cl2, 1, Molecule.SrCl2 ),
      create2Reactants1Product( 1, Molecule.Sr, 1, Molecule.Br2, 1, Molecule.SrBr2 ),
      create2Reactants1Product( 1, Molecule.Sr, 1, Molecule.I2, 1, Molecule.SrI2 ),
      create2Reactants1Product( 1, Molecule.Ba, 1, Molecule.F2, 1, Molecule.BaF2 ),
      create2Reactants1Product( 1, Molecule.Ba, 1, Molecule.Cl2, 1, Molecule.BaCl2 ),
      create2Reactants1Product( 1, Molecule.Ba, 1, Molecule.Br2, 1, Molecule.BaBr2 ),
      create2Reactants1Product( 1, Molecule.Ba, 1, Molecule.I2, 1, Molecule.BaI2 ),
      create1Reactant2Products( 1, Molecule.MgF2, 1, Molecule.Mg, 1, Molecule.F2 ),
      create1Reactant2Products( 1, Molecule.CaCl2, 1, Molecule.Ca, 1, Molecule.Cl2 ),
      create1Reactant2Products( 1, Molecule.SrBr2, 1, Molecule.Sr, 1, Molecule.Br2 ),
      create1Reactant2Products( 1, Molecule.BaI2, 1, Molecule.Ba, 1, Molecule.I2 ),
      create2Reactants1Product( 2, Molecule.Mg, 1, Molecule.O2, 2, Molecule.MgO ),
      create2Reactants1Product( 2, Molecule.Ca, 1, Molecule.O2, 2, Molecule.CaO ),
      create2Reactants1Product( 2, Molecule.Sr, 1, Molecule.O2, 2, Molecule.SrO ),
      create2Reactants1Product( 2, Molecule.Ba, 1, Molecule.O2, 2, Molecule.BaO ),
      create2Reactants1Product( 2, Molecule.Zn, 1, Molecule.O2, 2, Molecule.ZnO ),
      create2Reactants1Product( 2, Molecule.Cd, 1, Molecule.O2, 2, Molecule.CdO ),
      create1Reactant2Products( 2, Molecule.MgO, 2, Molecule.Mg, 1, Molecule.O2 ),
      create1Reactant2Products( 2, Molecule.CaO, 2, Molecule.Ca, 1, Molecule.O2 ),
      create1Reactant2Products( 2, Molecule.SrO, 2, Molecule.Sr, 1, Molecule.O2 ),
      create1Reactant2Products( 2, Molecule.BaO, 2, Molecule.Ba, 1, Molecule.O2 ),
      create2Reactants1Product( 2, Molecule.Li, 1, Molecule.H2, 2, Molecule.LiH ),
      create2Reactants1Product( 2, Molecule.Na, 1, Molecule.H2, 2, Molecule.NaH ),
      create2Reactants1Product( 2, Molecule.K, 1, Molecule.H2, 2, Molecule.KH ),
      create2Reactants1Product( 2, Molecule.Rb, 1, Molecule.H2, 2, Molecule.RbH ),
      create2Reactants1Product( 2, Molecule.Cs, 1, Molecule.H2, 2, Molecule.CsH ),
      create2Reactants1Product( 1, Molecule.Mg, 1, Molecule.H2, 1, Molecule.MgH2 ),
      create2Reactants1Product( 1, Molecule.Ca, 1, Molecule.H2, 1, Molecule.CaH2 ),
      create2Reactants1Product( 1, Molecule.Sr, 1, Molecule.H2, 1, Molecule.SrH2 ),
      create2Reactants1Product( 1, Molecule.Ba, 1, Molecule.H2, 1, Molecule.BaH2 ),
      create2Reactants1Product( 1, Molecule.Zn, 1, Molecule.S, 1, Molecule.ZnS ),
      create2Reactants1Product( 1, Molecule.Fe, 1, Molecule.S, 1, Molecule.FeS ),
      create2Reactants1Product( 1, Molecule.Ca, 1, Molecule.S, 1, Molecule.CaS ),
      create2Reactants1Product( 1, Molecule.Mg, 1, Molecule.S, 1, Molecule.MgS ),
      create2Reactants1Product( 1, Molecule.Pb, 1, Molecule.S, 1, Molecule.PbS ),
      create2Reactants1Product( 2, Molecule.Cu, 1, Molecule.S, 1, Molecule.Cu2S ),
      create2Reactants1Product( 2, Molecule.Ag, 1, Molecule.S, 1, Molecule.Ag2S ),
      create2Reactants1Product( 2, Molecule.Li, 1, Molecule.S, 1, Molecule.Li2S ),
      create2Reactants1Product( 2, Molecule.Na, 1, Molecule.S, 1, Molecule.Na2S ),
      create2Reactants1Product( 2, Molecule.K, 1, Molecule.S, 1, Molecule.K2S ),
      create1Reactant2Products( 2, Molecule.H2O2, 2, Molecule.H2O, 1, Molecule.O2 ),
      create2Reactants1Product( 1, Molecule.N2, 2, Molecule.O2, 2, Molecule.NO2 ),
      create2Reactants1Product( 2, Molecule.SO2, 1, Molecule.O2, 2, Molecule.SO3 ),
      create2Reactants1Product( 2, Molecule.Hg, 1, Molecule.O2, 2, Molecule.HgO ),
      create1Reactant2Products( 2, Molecule.Ag2O, 4, Molecule.Ag, 1, Molecule.O2 ),
      create2Reactants1Product( 2, Molecule.Cu, 1, Molecule.O2, 2, Molecule.CuO )
    ];

    super( equations, {
      firstBigMolecule: false,
      tandem: tandem
    } );
  }
}

balancingChemicalEquations.register( 'EquationPool1', EquationPool1 );