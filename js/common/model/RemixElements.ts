// Copyright 2026, University of Colorado Boulder

/**
 * Elements used by remix mode that nitroglycerin does not define. Radii are in picometers,
 * colors follow the Jmol CPK scheme so they sit alongside nitroglycerin's own elements.
 *
 * @author Adam Xu
 */

import Element from '../../../../nitroglycerin/js/Element.js';

const RemixElements = {
  Li: new Element( 'Li', 128, 182, 0.98, 6.941, '#CC80FF' ),
  Na: new Element( 'Na', 166, 227, 0.93, 22.98977, '#AB5CF2' ),
  K: new Element( 'K', 203, 275, 0.82, 39.0983, '#8F40D4' ),
  Rb: new Element( 'Rb', 220, 303, 0.82, 85.4678, '#702EB0' ),
  Cs: new Element( 'Cs', 244, 343, 0.79, 132.90545, '#57178F' ),
  Mg: new Element( 'Mg', 141, 173, 1.31, 24.305, '#8AFF00' ),
  Ca: new Element( 'Ca', 176, 231, 1.00, 40.078, '#3DFF00' ),
  Sr: new Element( 'Sr', 195, 249, 0.95, 87.62, '#00FF00' ),
  Ba: new Element( 'Ba', 215, 268, 0.89, 137.327, '#00C900' ),
  Ti: new Element( 'Ti', 160, 187, 1.54, 47.867, '#BFC2C7' ),
  V: new Element( 'V', 153, 179, 1.63, 50.9415, '#A6A6AB' ),
  Cr: new Element( 'Cr', 139, 189, 1.66, 51.9961, '#8A99C7' ),
  Mn: new Element( 'Mn', 139, 197, 1.55, 54.93805, '#9C7AC7' ),
  Fe: new Element( 'Fe', 132, 194, 1.83, 55.845, '#E06633' ),
  Ni: new Element( 'Ni', 124, 163, 1.91, 58.6934, '#50D050' ),
  Cu: new Element( 'Cu', 132, 140, 1.90, 63.546, '#C88033' ),
  Zn: new Element( 'Zn', 122, 139, 1.65, 65.38, '#7D80B0' ),
  Ag: new Element( 'Ag', 145, 172, 1.93, 107.8682, '#C0C0C0' ),
  Cd: new Element( 'Cd', 144, 158, 1.69, 112.411, '#FFD98F' ),
  W: new Element( 'W', 162, 210, 2.36, 183.84, '#2194D6' ),
  Hg: new Element( 'Hg', 132, 155, 2.00, 200.59, '#B8B8D0' ),
  Al: new Element( 'Al', 121, 184, 1.61, 26.98154, '#BFA6A6' ),
  Pb: new Element( 'Pb', 146, 202, 2.33, 207.2, '#575961' ),
  As: new Element( 'As', 119, 185, 2.18, 74.9216, '#BD80E3' ),
  Sb: new Element( 'Sb', 139, 206, 2.05, 121.76, '#9E63B5' )
} as const;

export default RemixElements;
