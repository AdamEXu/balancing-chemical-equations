// Copyright 2025, University of Colorado Boulder

/**
* EquationPool3 is the pool of equations for Game level 3.
 *
 * @author Chris Malley (PixelZoom, Inc.)
*/

import balancingChemicalEquations from '../../../balancingChemicalEquations.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import Range from '../../../../../dot/js/Range.js';
import EquationPool from '.././EquationPool.js';
import Molecule from '../../../common/model/Molecule.js';
import Equation from '../../../common/model/Equation.js';
export default class EquationPool3 extends EquationPool {

  public constructor( coefficientsRange: Range, tandem: Tandem ) {

    let equationIndex = 0;

    // Helper: Creates 2 Reactants -> 2 Products equation.
    const create2Reactants2Products = ( r1: number, reactant1: Molecule, r2: number, reactant2: Molecule,
                                        p1: number, product1: Molecule, p2: number, product2: Molecule ) =>
      Equation.create2Reactants2Products( r1, reactant1, r2, reactant2, p1, product1, p2, product2, coefficientsRange,
        tandem.createTandem( `equation${equationIndex++}` ), EquationPool.coefficientPropertyPhetioReadOnly );

    // ----------------------------------------------------------------------------------------------------
    // EQUATION DEFINITIONS
    // ----------------------------------------------------------------------------------------------------

    // --- Group 1: Complex Organic/Combustion (Coeffs up to 7) ---
    const eq_C2H5OH_Combustion = create2Reactants2Products( 1, Molecule.C2H5OH, 3, Molecule.O2, 2, Molecule.CO2, 3, Molecule.H2O );
    const eq_CH3OH_Combustion_2 = create2Reactants2Products( 2, Molecule.CH3OH, 3, Molecule.O2, 2, Molecule.CO2, 4, Molecule.H2O );
    const eq_C2H6_Combustion = create2Reactants2Products( 2, Molecule.C2H6, 7, Molecule.O2, 4, Molecule.CO2, 6, Molecule.H2O );
    const eq_C2H2_Combustion = create2Reactants2Products( 2, Molecule.C2H2, 5, Molecule.O2, 4, Molecule.CO2, 2, Molecule.H2O );
    const eq_C3H8_Combustion = create2Reactants2Products( 1, Molecule.C3H8, 5, Molecule.O2, 3, Molecule.CO2, 4, Molecule.H2O );
    const eq_C3H4_Combustion = create2Reactants2Products( 1, Molecule.C3H4, 4, Molecule.O2, 3, Molecule.CO2, 2, Molecule.H2O );
    const eq_Si2H6_Combustion = create2Reactants2Products( 2, Molecule.Si2H6, 7, Molecule.O2, 4, Molecule.SiO2, 6, Molecule.H2O ); // Disilane (Analog to Ethane)
    const eq_B2H6_Combustion = create2Reactants2Products( 1, Molecule.B2H6, 3, Molecule.O2, 1, Molecule.B2O3, 3, Molecule.H2O );

    // --- Group 2: Ammonia & Nitrogen Oxides (The "Tricky N" Group) ---
    const eq_NH3_O2_N2 = create2Reactants2Products( 4, Molecule.NH3, 3, Molecule.O2, 2, Molecule.N2, 6, Molecule.H2O );
    const eq_NH3_O2_NO = create2Reactants2Products( 4, Molecule.NH3, 5, Molecule.O2, 4, Molecule.NO, 6, Molecule.H2O );
    const eq_NH3_O2_NO2 = create2Reactants2Products( 4, Molecule.NH3, 7, Molecule.O2, 4, Molecule.NO2, 6, Molecule.H2O );
    const eq_NH3_NO_N2 = create2Reactants2Products( 4, Molecule.NH3, 6, Molecule.NO, 5, Molecule.N2, 6, Molecule.H2O );
    const eq_NO2_H2O_HNO3 = create2Reactants2Products( 3, Molecule.NO2, 1, Molecule.H2O, 2, Molecule.HNO3, 1, Molecule.NO );

    // --- Group 3: Metal Sulfide Roasting (2-3-2-2 Pattern) ---
    // All of these share the stoichiometry 2MS + 3O2 -> 2MO + 2SO2
    const eq_PbS_Roast = create2Reactants2Products( 2, Molecule.PbS, 3, Molecule.O2, 2, Molecule.PbO, 2, Molecule.SO2 );
    const eq_ZnS_Roast = create2Reactants2Products( 2, Molecule.ZnS, 3, Molecule.O2, 2, Molecule.ZnO, 2, Molecule.SO2 );
    const eq_NiS_Roast = create2Reactants2Products( 2, Molecule.NiS, 3, Molecule.O2, 2, Molecule.NiO, 2, Molecule.SO2 );
    const eq_Cu2S_Roast = create2Reactants2Products( 2, Molecule.Cu2S, 3, Molecule.O2, 2, Molecule.Cu2O, 2, Molecule.SO2 );

    // --- Group 4: Metal Oxide Reduction (1-3-2-3 Pattern) ---
    // Fe2O3 + 3CO -> 2Fe + 3CO2
    const eq_Fe2O3_CO = create2Reactants2Products( 1, Molecule.Fe2O3, 3, Molecule.CO, 2, Molecule.Fe, 3, Molecule.CO2 );
    const eq_Fe2O3_H2 = create2Reactants2Products( 1, Molecule.Fe2O3, 3, Molecule.H2, 2, Molecule.Fe, 3, Molecule.H2O );
    const eq_As2O3_C = create2Reactants2Products( 1, Molecule.As2O3, 3, Molecule.C, 2, Molecule.As, 3, Molecule.CO );
    const eq_Sb2O3_C = create2Reactants2Products( 1, Molecule.Sb2O3, 3, Molecule.C, 2, Molecule.Sb, 3, Molecule.CO );
    const eq_B2O3_Mg = create2Reactants2Products( 1, Molecule.B2O3, 3, Molecule.Mg, 2, Molecule.B, 3, Molecule.MgO );
    const eq_Cr2O3_H2 = create2Reactants2Products( 1, Molecule.Cr2O3, 3, Molecule.H2, 2, Molecule.Cr, 3, Molecule.H2O );
    const eq_WO3_H2 = create2Reactants2Products( 1, Molecule.WO3, 3, Molecule.H2, 1, Molecule.W, 3, Molecule.H2O ); // 1-3-1-3

    // --- Group 5: Hydrolysis of Nitrides/Phosphides/Sulfides (1-6-3-2 or 1-6-2-3) ---
    // Tricky because of the high water coefficient (6)
    const eq_Mg3N2_H2O = create2Reactants2Products( 1, Molecule.Mg3N2, 6, Molecule.H2O, 3, Molecule.MgOH2, 2, Molecule.NH3 );
    const eq_Ca3P2_H2O = create2Reactants2Products( 1, Molecule.Ca3P2, 6, Molecule.H2O, 3, Molecule.CaOH2, 2, Molecule.PH3 );
    const eq_Al2S3_H2O = create2Reactants2Products( 1, Molecule.Al2S3, 6, Molecule.H2O, 2, Molecule.AlOH3, 3, Molecule.H2S );

    // --- Group 6: Polyprotic Acid-Base Neutralization (2-3-1-6 or 3-2-1-6) ---
    const eq_H3PO4_CaOH2 = create2Reactants2Products( 2, Molecule.H3PO4, 3, Molecule.CaOH2, 1, Molecule.Ca3PO42, 6, Molecule.H2O );
    const eq_H2SO4_AlOH3 = create2Reactants2Products( 3, Molecule.H2SO4, 2, Molecule.AlOH3, 1, Molecule.Al2SO43, 6, Molecule.H2O );
    const eq_H2SO4_FeOH3 = create2Reactants2Products( 3, Molecule.H2SO4, 2, Molecule.FeOH3, 1, Molecule.Fe2SO43, 6, Molecule.H2O );
    const eq_H3AsO4_CaOH2 = create2Reactants2Products( 2, Molecule.H3AsO4, 3, Molecule.CaOH2, 1, Molecule.Ca3AsO42, 6, Molecule.H2O );

    // --- Group 7: Chlorination / Halogenation / Substitution (1-4-1-4) ---
    const eq_SiH4_Cl2 = create2Reactants2Products( 1, Molecule.SiH4, 4, Molecule.Cl2, 1, Molecule.SiCl4, 4, Molecule.HCl );
    const eq_TiCl4_Na = create2Reactants2Products( 1, Molecule.TiCl4, 4, Molecule.Na, 1, Molecule.Ti, 4, Molecule.NaCl );
    const eq_SiCl4_K = create2Reactants2Products( 1, Molecule.SiCl4, 4, Molecule.K, 1, Molecule.Si, 4, Molecule.KCl );
    const eq_CS2_Cl2 = create2Reactants2Products( 1, Molecule.CS2, 3, Molecule.Cl2, 1, Molecule.CCl4, 1, Molecule.S2Cl2 ); // 1-3-1-1

    // --- Group 8: Miscellaneous Redox / Other ---
    const eq_Fe3O4_H2 = create2Reactants2Products( 1, Molecule.Fe3O4, 4, Molecule.H2, 3, Molecule.Fe, 4, Molecule.H2O );
    const eq_Fe3O4_CO = create2Reactants2Products( 1, Molecule.Fe3O4, 4, Molecule.CO, 3, Molecule.Fe, 4, Molecule.CO2 );
    const eq_PbS_H2O2 = create2Reactants2Products( 1, Molecule.PbS, 4, Molecule.H2O2, 1, Molecule.PbSO4, 4, Molecule.H2O );
    const eq_MnO2_Al = create2Reactants2Products( 3, Molecule.MnO2, 4, Molecule.Al, 3, Molecule.Mn, 2, Molecule.Al2O3 );
    const eq_V2O5_H2 = create2Reactants2Products( 1, Molecule.V2O5, 5, Molecule.H2, 2, Molecule.V, 5, Molecule.H2O );
    const eq_Be2C_H2O = create2Reactants2Products( 1, Molecule.Be2C, 4, Molecule.H2O, 2, Molecule.BeOH2, 1, Molecule.CH4 );
    const eq_PCl3_H2O = create2Reactants2Products( 1, Molecule.PCl3, 3, Molecule.H2O, 1, Molecule.H3PO3, 3, Molecule.HCl );

    // ----------------------------------------------------------------------------------------------------
    // POOL CONSTRUCTION
    // ----------------------------------------------------------------------------------------------------

    const equations: Equation[] = [
      eq_C2H5OH_Combustion, eq_CH3OH_Combustion_2, eq_C2H6_Combustion, eq_C2H2_Combustion, eq_C3H8_Combustion, eq_C3H4_Combustion, eq_Si2H6_Combustion, eq_B2H6_Combustion,
      eq_NH3_O2_N2, eq_NH3_O2_NO, eq_NH3_O2_NO2, eq_NH3_NO_N2, eq_NO2_H2O_HNO3,
      eq_PbS_Roast, eq_ZnS_Roast, eq_NiS_Roast, eq_Cu2S_Roast,
      eq_Fe2O3_CO, eq_Fe2O3_H2, eq_As2O3_C, eq_Sb2O3_C, eq_B2O3_Mg, eq_Cr2O3_H2, eq_WO3_H2,
      eq_Mg3N2_H2O, eq_Ca3P2_H2O, eq_Al2S3_H2O,
      eq_H3PO4_CaOH2, eq_H2SO4_AlOH3, eq_H2SO4_FeOH3, eq_H3AsO4_CaOH2,
      eq_SiH4_Cl2, eq_TiCl4_Na, eq_SiCl4_K, eq_CS2_Cl2,
      eq_Fe3O4_H2, eq_Fe3O4_CO, eq_PbS_H2O2, eq_MnO2_Al, eq_V2O5_H2, eq_Be2C_H2O, eq_PCl3_H2O
    ];

    super( equations, {
      tandem: tandem
    } );
  }
}

balancingChemicalEquations.register( 'EquationPool3', EquationPool3 );