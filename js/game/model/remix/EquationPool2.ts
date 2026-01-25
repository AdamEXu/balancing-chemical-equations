// Copyright 2025, University of Colorado Boulder

/**
 * EquationPool2 is the pool of equations for Game level 2.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import balancingChemicalEquations from '../../../balancingChemicalEquations.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import Range from '../../../../../dot/js/Range.js';
import EquationPool from '.././EquationPool.js';
import Molecule from '../../../common/model/Molecule.js';
import Equation from '../../../common/model/Equation.js';

export default class EquationPool2 extends EquationPool {

  public constructor( coefficientsRange: Range, tandem: Tandem ) {

    let equationIndex = 0;

    // Factors out the duplication for creating an Equation with 2 reactants and 2 products.
    const create2Reactants2Products = ( r1: number, reactant1: Molecule, r2: number, reactant2: Molecule,
                                        p1: number, product1: Molecule, p2: number, product2: Molecule ) =>
      Equation.create2Reactants2Products( r1, reactant1, r2, reactant2, p1, product1, p2, product2, coefficientsRange,
        tandem.createTandem( `equation${equationIndex++}` ), EquationPool.coefficientPropertyPhetioReadOnly );

    // The equations in the pool.
    const equations: Equation[] = [
      create2Reactants2Products( 2, Molecule.C, 2, Molecule.H2O, 1, Molecule.CH4, 1, Molecule.CO2 ),
      create2Reactants2Products( 1, Molecule.CH4, 1, Molecule.H2O, 3, Molecule.H2, 1, Molecule.CO ),
      create2Reactants2Products( 1, Molecule.CH4, 2, Molecule.O2, 1, Molecule.CO2, 2, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.C2H4, 3, Molecule.O2, 2, Molecule.CO2, 2, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.C2H6, 1, Molecule.Cl2, 1, Molecule.C2H5Cl, 1, Molecule.HCl ),
      create2Reactants2Products( 1, Molecule.CH4, 4, Molecule.S, 1, Molecule.CS2, 2, Molecule.H2S ),
      create2Reactants2Products( 1, Molecule.CS2, 3, Molecule.O2, 1, Molecule.CO2, 2, Molecule.SO2 ),
      create2Reactants2Products( 1, Molecule.SO2, 2, Molecule.H2, 1, Molecule.S, 2, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.SO2, 3, Molecule.H2, 1, Molecule.H2S, 2, Molecule.H2O ),
      create2Reactants2Products( 2, Molecule.F2, 1, Molecule.H2O, 1, Molecule.OF2, 2, Molecule.HF ),
      create2Reactants2Products( 1, Molecule.OF2, 1, Molecule.H2O, 1, Molecule.O2, 2, Molecule.HF ),
      create2Reactants2Products( 1, Molecule.N2H4, 1, Molecule.O2, 1, Molecule.N2, 2, Molecule.H2O ),
      create2Reactants2Products( 2, Molecule.H2O2, 1, Molecule.N2H4, 1, Molecule.N2, 4, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.Zn, 2, Molecule.HCl, 1, Molecule.ZnCl2, 1, Molecule.H2 ),
      create2Reactants2Products( 1, Molecule.Mg, 2, Molecule.HCl, 1, Molecule.MgCl2, 1, Molecule.H2 ),
      create2Reactants2Products( 2, Molecule.Al, 6, Molecule.HCl, 2, Molecule.AlCl3, 3, Molecule.H2 ),
      create2Reactants2Products( 1, Molecule.Fe, 2, Molecule.HCl, 1, Molecule.FeCl2, 1, Molecule.H2 ),
      create2Reactants2Products( 2, Molecule.Na, 2, Molecule.H2O, 2, Molecule.NaOH, 1, Molecule.H2 ),
      create2Reactants2Products( 2, Molecule.K, 2, Molecule.H2O, 2, Molecule.KOH, 1, Molecule.H2 ),
      create2Reactants2Products( 2, Molecule.Li, 2, Molecule.H2O, 2, Molecule.LiOH, 1, Molecule.H2 ),
      create2Reactants2Products( 2, Molecule.Rb, 2, Molecule.H2O, 2, Molecule.RbOH, 1, Molecule.H2 ),
      create2Reactants2Products( 2, Molecule.Cs, 2, Molecule.H2O, 2, Molecule.CsOH, 1, Molecule.H2 ),
      create2Reactants2Products( 1, Molecule.Ca, 2, Molecule.H2O, 1, Molecule.CaOH2, 1, Molecule.H2 ),
      create2Reactants2Products( 1, Molecule.Ba, 2, Molecule.H2O, 1, Molecule.BaOH2, 1, Molecule.H2 ),
      create2Reactants2Products( 1, Molecule.Sr, 2, Molecule.H2O, 1, Molecule.SrOH2, 1, Molecule.H2 ),
      create2Reactants2Products( 1, Molecule.CH4, 2, Molecule.Cl2, 1, Molecule.CH2Cl2, 2, Molecule.HCl ),
      create2Reactants2Products( 1, Molecule.CH4, 3, Molecule.Cl2, 1, Molecule.CHCl3, 3, Molecule.HCl ),
      create2Reactants2Products( 1, Molecule.CH4, 4, Molecule.Cl2, 1, Molecule.CCl4, 4, Molecule.HCl ),
      create2Reactants2Products( 2, Molecule.CO, 2, Molecule.NO, 2, Molecule.CO2, 1, Molecule.N2 ),
      create2Reactants2Products( 4, Molecule.NH3, 3, Molecule.O2, 2, Molecule.N2, 6, Molecule.H2O ),
      create2Reactants2Products( 4, Molecule.NH3, 5, Molecule.O2, 4, Molecule.NO, 6, Molecule.H2O ),
      create2Reactants2Products( 2, Molecule.H2S, 3, Molecule.O2, 2, Molecule.SO2, 2, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.C2H5OH, 3, Molecule.O2, 2, Molecule.CO2, 3, Molecule.H2O ),
      create2Reactants2Products( 2, Molecule.CH3OH, 3, Molecule.O2, 2, Molecule.CO2, 4, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.SiH4, 2, Molecule.O2, 1, Molecule.SiO2, 2, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.C3H8, 5, Molecule.O2, 3, Molecule.CO2, 4, Molecule.H2O ),
      create2Reactants2Products( 2, Molecule.C2H2, 5, Molecule.O2, 4, Molecule.CO2, 2, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.Fe2O3, 3, Molecule.CO, 2, Molecule.Fe, 3, Molecule.CO2 ),
      create2Reactants2Products( 1, Molecule.Fe2O3, 3, Molecule.H2, 2, Molecule.Fe, 3, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.Fe3O4, 4, Molecule.H2, 3, Molecule.Fe, 4, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.CuO, 1, Molecule.H2, 1, Molecule.Cu, 1, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.PbO, 1, Molecule.C, 1, Molecule.Pb, 1, Molecule.CO ),
      create2Reactants2Products( 2, Molecule.PbO, 1, Molecule.C, 2, Molecule.Pb, 1, Molecule.CO2 ),
      create2Reactants2Products( 1, Molecule.ZnO, 1, Molecule.C, 1, Molecule.Zn, 1, Molecule.CO ),
      create2Reactants2Products( 1, Molecule.SnO2, 2, Molecule.H2, 1, Molecule.Sn, 2, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.WO3, 3, Molecule.H2, 1, Molecule.W, 3, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.TiCl4, 2, Molecule.Mg, 1, Molecule.Ti, 2, Molecule.MgCl2 ),
      create2Reactants2Products( 2, Molecule.KBr, 1, Molecule.Cl2, 2, Molecule.KCl, 1, Molecule.Br2 ),
      create2Reactants2Products( 2, Molecule.KI, 1, Molecule.Cl2, 2, Molecule.KCl, 1, Molecule.I2 ),
      create2Reactants2Products( 2, Molecule.NaI, 1, Molecule.Br2, 2, Molecule.NaBr, 1, Molecule.I2 ),
      create2Reactants2Products( 1, Molecule.Cl2, 2, Molecule.NaBr, 2, Molecule.NaCl, 1, Molecule.Br2 ),
      create2Reactants2Products( 1, Molecule.F2, 2, Molecule.NaCl, 2, Molecule.NaF, 1, Molecule.Cl2 ),
      create2Reactants2Products( 1, Molecule.CuSO4, 1, Molecule.Zn, 1, Molecule.ZnSO4, 1, Molecule.Cu ),
      create2Reactants2Products( 1, Molecule.Fe2O3, 2, Molecule.Al, 2, Molecule.Fe, 1, Molecule.Al2O3 ),
      create2Reactants2Products( 3, Molecule.MnO2, 4, Molecule.Al, 3, Molecule.Mn, 2, Molecule.Al2O3 ),
      create2Reactants2Products( 1, Molecule.Cr2O3, 2, Molecule.Al, 2, Molecule.Cr, 1, Molecule.Al2O3 ),
      create2Reactants2Products( 1, Molecule.SiO2, 2, Molecule.C, 1, Molecule.Si, 2, Molecule.CO ),
      create2Reactants2Products( 1, Molecule.SiO2, 4, Molecule.HF, 1, Molecule.SiF4, 2, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.CaC2, 2, Molecule.H2O, 1, Molecule.C2H2, 1, Molecule.CaOH2 ),
      create2Reactants2Products( 2, Molecule.Na2O2, 2, Molecule.H2O, 4, Molecule.NaOH, 1, Molecule.O2 ),
      create2Reactants2Products( 1, Molecule.CO2, 1, Molecule.H2, 1, Molecule.CO, 1, Molecule.H2O ),
      create2Reactants2Products( 1, Molecule.Na2CO3, 2, Molecule.HCl, 2, Molecule.NaCl, 1, Molecule.H2CO3 ), // Theoretical intermediate
      create2Reactants2Products( 1, Molecule.Mg, 1, Molecule.H2SO4, 1, Molecule.MgSO4, 1, Molecule.H2 ),
      create2Reactants2Products( 1, Molecule.Zn, 1, Molecule.H2SO4, 1, Molecule.ZnSO4, 1, Molecule.H2 ),
      create2Reactants2Products( 2, Molecule.Al, 3, Molecule.H2SO4, 1, Molecule.Al2SO43, 3, Molecule.H2 )
    ];

    super( equations, {
      tandem: tandem
    } );
  }
}

balancingChemicalEquations.register( 'EquationPool2', EquationPool2 );