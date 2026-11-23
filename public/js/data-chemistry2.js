/* Herieth-Lab lesson content: Chemistry Form Three and Form Four (follows the TIE textbook chapter order) */
window.HL = window.HL || {};
HL.courses = HL.courses || [];
HL.courses.push({
  id: 'chem3', subject: 'chem', form: 3, title: 'Chemistry, Form Three',
  topics: [
    {
      id: 'equations', icon: 'scale', title: 'Chemical equations', sims: ['balance'],
      blurb: 'Writing and balancing equations, ionic equations, and redox reactions.',
      notes: [
        ['Writing and balancing equations', '<p>A chemical equation uses formulae to show the reactants and products of a reaction. Because atoms are neither created nor destroyed, an equation must be <b>balanced</b>: each element has the same number of atoms on both sides.</p><ol><li>Write the word equation.</li><li>Write correct formulae. <b>Never change a formula to balance it.</b></li><li>Balance by placing whole numbers (coefficients) in front of formulae. Start with the element that appears in the fewest formulae; leave hydrogen and oxygen to last.</li><li>Check every element, then add state symbols (s), (l), (g), (aq).</li></ol><p class="formula">CH<sub>4</sub>(g) + 2O<sub>2</sub>(g) → CO<sub>2</sub>(g) + 2H<sub>2</sub>O(l)</p>'],
        ['Ionic equations', '<p>In solution, ionic compounds are split into ions. An <b>ionic equation</b> shows only the ions that change; the others are <b>spectator ions</b>.</p><ol><li>Write the balanced full equation with state symbols.</li><li>Split every aqueous ionic compound into its ions.</li><li>Cross out ions that appear unchanged on both sides.</li></ol><p class="formula">Ag<sup>+</sup>(aq) + Cl<sup>−</sup>(aq) → AgCl(s)</p><p class="formula">H<sup>+</sup>(aq) + OH<sup>−</sup>(aq) → H<sub>2</sub>O(l)</p><p>Ionic equations must balance in both atoms and charge.</p>'],
        ['Types of reactions', '<ul><li><b>Combination (synthesis):</b> A + B → AB.</li><li><b>Decomposition:</b> AB → A + B, often by heat (thermal decomposition) or electricity.</li><li><b>Single displacement:</b> a more reactive element replaces a less reactive one: Zn + CuSO<sub>4</sub> → ZnSO<sub>4</sub> + Cu.</li><li><b>Double decomposition:</b> two compounds exchange partners, often forming a precipitate.</li><li><b>Neutralisation:</b> acid + base → salt + water.</li></ul>'],
        ['Oxidation and reduction (redox)', '<p><b>Oxidation</b> is gain of oxygen, loss of hydrogen, or <b>loss of electrons</b>. <b>Reduction</b> is loss of oxygen, gain of hydrogen, or <b>gain of electrons</b>. Remember <b>OIL RIG</b>: Oxidation Is Loss, Reduction Is Gain (of electrons).</p><p>The two always happen together. In CuO + H<sub>2</sub> → Cu + H<sub>2</sub>O, copper(II) oxide is reduced and hydrogen is oxidised.</p><p>An <b>oxidising agent</b> causes oxidation and is itself reduced (O<sub>2</sub>, Cl<sub>2</sub>, acidified KMnO<sub>4</sub>). A <b>reducing agent</b> causes reduction and is itself oxidised (H<sub>2</sub>, C, CO).</p>']
      ],
      quiz: [
        ['When balancing an equation you must never…', ['add state symbols', 'change the formula of a substance', 'put a number in front of a formula', 'count the atoms'], 1, 'Changing a formula changes the substance.'],
        ['The balanced equation for burning magnesium is…', ['Mg + O₂ → MgO', '2Mg + O₂ → 2MgO', 'Mg + O → MgO', 'Mg₂ + O₂ → 2MgO'], 1, 'Two Mg and two O atoms on each side.'],
        ['In NaCl(aq) + AgNO₃(aq) → AgCl(s) + NaNO₃(aq), the spectator ions are…', ['Ag⁺ and Cl⁻', 'Na⁺ and NO₃⁻', 'Na⁺ and Cl⁻', 'Ag⁺ and NO₃⁻'], 1, 'They are unchanged in solution on both sides.'],
        ['Oxidation is…', ['gain of electrons', 'loss of electrons', 'loss of oxygen', 'gain of hydrogen'], 1, 'OIL RIG: Oxidation Is Loss.'],
        ['In CuO + H₂ → Cu + H₂O, the reducing agent is…', ['CuO', 'H₂', 'Cu', 'H₂O'], 1, 'Hydrogen removes oxygen from copper(II) oxide.'],
        ['Zn + CuSO₄ → ZnSO₄ + Cu is an example of…', ['decomposition', 'combination', 'single displacement', 'neutralisation'], 2, 'Zinc, more reactive, displaces copper.']
      ]
    },
    {
      id: 'hardness', icon: 'drop', title: 'Hardness of water', sims: ['hardness'],
      blurb: 'What makes water hard, how to soften it, and its advantages and disadvantages.',
      notes: [
        ['Concept of hardness', '<p><b>Hard water</b> does not form a lather easily with soap. Instead it forms a grey <b>scum</b>. Soft water lathers readily.</p><p>Hardness is caused by dissolved <b>calcium ions (Ca<sup>2+</sup>)</b> and <b>magnesium ions (Mg<sup>2+</sup>)</b>, picked up as rain water passes over rocks such as limestone and dolomite. These ions react with soap (sodium stearate) to form insoluble calcium stearate, the scum:</p><p class="formula">Ca<sup>2+</sup>(aq) + 2C<sub>17</sub>H<sub>35</sub>COO<sup>−</sup>(aq) → (C<sub>17</sub>H<sub>35</sub>COO)<sub>2</sub>Ca(s)</p><p>Soapless detergents do not form scum.</p>'],
        ['Types of hardness', '<ul><li><b>Temporary hardness</b> is caused by dissolved <b>calcium or magnesium hydrogencarbonate</b>. It forms when rain water containing carbon dioxide passes over limestone: CaCO<sub>3</sub> + H<sub>2</sub>O + CO<sub>2</sub> → Ca(HCO<sub>3</sub>)<sub>2</sub>. It is removed by boiling.</li><li><b>Permanent hardness</b> is caused by dissolved calcium or magnesium <b>sulphates or chlorides</b>. Boiling does not remove it.</li></ul>'],
        ['Removing hardness', '<ul><li><b>Boiling</b> (temporary only): Ca(HCO<sub>3</sub>)<sub>2</sub> → CaCO<sub>3</sub>(s) + H<sub>2</sub>O + CO<sub>2</sub>. The insoluble CaCO<sub>3</sub> forms the “fur” or scale in kettles.</li><li><b>Adding lime</b>, calcium hydroxide, in the right amount (temporary only).</li><li><b>Washing soda</b>, sodium carbonate (both types): Ca<sup>2+</sup>(aq) + CO<sub>3</sub><sup>2−</sup>(aq) → CaCO<sub>3</sub>(s).</li><li><b>Ion exchange</b> (both types): a resin swaps Ca<sup>2+</sup> and Mg<sup>2+</sup> for Na<sup>+</sup> ions.</li><li><b>Distillation</b> (both types) gives pure water, but uses a lot of energy.</li></ul><p>Water for drinking is purified by sedimentation, filtration and chlorination (to kill germs).</p>'],
        ['Advantages and disadvantages', '<p><b>Advantages:</b> provides calcium for strong bones and teeth; has a pleasant taste; forms a coating inside lead pipes that stops poisonous lead dissolving; preferred for brewing and tanning.</p><p><b>Disadvantages:</b> wastes soap; scum spoils the look of washed clothes; scale (fur) in kettles, boilers and pipes wastes fuel and can block pipes; may cause boilers to overheat.</p>']
      ],
      quiz: [
        ['Hard water is caused mainly by dissolved…', ['sodium and potassium ions', 'calcium and magnesium ions', 'chloride ions only', 'carbon dioxide'], 1, 'Ca²⁺ and Mg²⁺ react with soap.'],
        ['Temporary hardness is caused by…', ['calcium sulphate', 'calcium hydrogencarbonate', 'sodium chloride', 'magnesium chloride'], 1, 'Hydrogencarbonates decompose on boiling.'],
        ['Which method removes both temporary and permanent hardness?', ['Boiling', 'Adding washing soda', 'Filtering', 'Adding chlorine'], 1, 'Carbonate ions precipitate Ca²⁺ and Mg²⁺.'],
        ['The scale (fur) inside a kettle is mainly…', ['calcium carbonate', 'sodium chloride', 'calcium sulphate solution', 'soap'], 0, 'It forms when temporary hard water is boiled.'],
        ['An advantage of hard water is that it…', ['saves soap', 'provides calcium for bones and teeth', 'prevents scale', 'lathers easily'], 1, 'Calcium is an important mineral.'],
        ['In an ion-exchange water softener, calcium ions are replaced by…', ['magnesium ions', 'sodium ions', 'hydrogen ions', 'chloride ions'], 1, 'Sodium salts do not cause hardness.']
      ]
    },
    {
      id: 'acids3', icon: 'tube', title: 'Acids, bases and salts', sims: ['ph', 'titration'],
      blurb: 'Strength and basicity of acids, kinds of salts, preparing salts, and how salts behave in air.',
      notes: [
        ['Strong and weak, concentrated and dilute', '<p>An <b>acid</b> gives hydrogen ions, H<sup>+</sup>, in water; a <b>base</b> neutralises an acid; an <b>alkali</b> is a soluble base giving OH<sup>−</sup> ions.</p><ul><li><b>Strong</b> acids and alkalis ionise <b>completely</b> in water: HCl, H<sub>2</sub>SO<sub>4</sub>, HNO<sub>3</sub>, NaOH, KOH.</li><li><b>Weak</b> acids and alkalis ionise only <b>partly</b>: ethanoic acid, carbonic acid, ammonia solution.</li><li><b>Concentration</b> is how much acid is dissolved in each dm³. A dilute strong acid and a concentrated weak acid are both possible.</li></ul>'],
        ['Basicity and types of salts', '<p>The <b>basicity</b> of an acid is the number of replaceable hydrogen ions per molecule: HCl and HNO<sub>3</sub> are monobasic, H<sub>2</sub>SO<sub>4</sub> is dibasic, H<sub>3</sub>PO<sub>4</sub> is tribasic.</p><ul><li>A <b>normal salt</b> forms when all the replaceable hydrogen is replaced: Na<sub>2</sub>SO<sub>4</sub>.</li><li>An <b>acid salt</b> still has replaceable hydrogen: NaHSO<sub>4</sub>, NaHCO<sub>3</sub>.</li><li>A <b>basic salt</b> contains hydroxide or oxide as well: Zn(OH)Cl.</li></ul>'],
        ['Preparing salts', '<p><b>Soluble salts</b> (not of sodium, potassium or ammonium): add an excess of an insoluble metal, metal oxide or carbonate to warm dilute acid; filter off the excess; evaporate the filtrate to the point of crystallisation; cool, filter and dry the crystals.</p><p><b>Sodium, potassium and ammonium salts:</b> titrate the acid with the alkali using an indicator to find the volumes, then mix the same volumes without indicator and crystallise.</p><p><b>Insoluble salts</b>: mix two solutions that between them contain the ions of the salt (precipitation); filter, wash and dry. Pb(NO<sub>3</sub>)<sub>2</sub>(aq) + 2KI(aq) → PbI<sub>2</sub>(s) + 2KNO<sub>3</sub>(aq).</p>'],
        ['Salts and water in the air', '<ul><li><b>Water of crystallisation:</b> water chemically bound in crystals, such as CuSO<sub>4</sub>·5H<sub>2</sub>O (blue).</li><li><b>Efflorescent</b> salts lose water of crystallisation to the air and become powdery: Na<sub>2</sub>CO<sub>3</sub>·10H<sub>2</sub>O.</li><li><b>Hygroscopic</b> substances absorb water from the air but do not dissolve: concentrated H<sub>2</sub>SO<sub>4</sub>, CaO, anhydrous CuSO<sub>4</sub>. Used as drying agents.</li><li><b>Deliquescent</b> substances absorb so much water that they dissolve in it: NaOH, CaCl<sub>2</sub>, MgCl<sub>2</sub>.</li></ul>']
      ],
      quiz: [
        ['A strong acid is one that…', ['is very concentrated', 'ionises completely in water', 'has a high pH', 'is poisonous'], 1, 'Strength is about the degree of ionisation.'],
        ['The basicity of sulphuric acid, H₂SO₄, is…', ['1', '2', '3', '4'], 1, 'Each molecule has two replaceable hydrogen ions.'],
        ['NaHCO₃ is an example of…', ['a normal salt', 'an acid salt', 'a basic salt', 'an alkali'], 1, 'It still contains replaceable hydrogen.'],
        ['Lead(II) iodide is prepared by…', ['metal + acid', 'titration', 'precipitation', 'evaporation of a solution'], 2, 'It is insoluble in water.'],
        ['Sodium hydroxide pellets left in air become wet and dissolve. They are…', ['efflorescent', 'hygroscopic', 'deliquescent', 'anhydrous'], 2, 'They absorb enough water to dissolve.'],
        ['Washing soda crystals left in air turn into a white powder. This is…', ['deliquescence', 'efflorescence', 'sublimation', 'hydration'], 1, 'They lose water of crystallisation.']
      ]
    },
    {
      id: 'mole', icon: 'mole', title: 'The mole concept and related calculations', sims: ['moles'],
      blurb: 'Counting particles by weighing, molar mass, gas volumes and formula calculations.',
      notes: [
        ['The mole', '<p>A <b>mole</b> is the amount of substance that contains <b>6.02 × 10<sup>23</sup></b> particles (atoms, molecules or ions). This number is the <b>Avogadro constant</b>, L.</p><p>The <b>molar mass</b> M is the mass of one mole, in g/mol. It equals the relative atomic mass (A<sub>r</sub>) or relative formula mass (M<sub>r</sub>) in grams. H = 1, C = 12, N = 14, O = 16, Na = 23, Mg = 24, S = 32, Cl = 35.5, Ca = 40, Cu = 64.</p><p class="formula">number of moles n = mass (g) ÷ molar mass (g/mol)</p><p class="formula">number of particles = n × 6.02 × 10<sup>23</sup></p>'],
        ['Molar gas volume', '<p>One mole of any gas occupies the same volume at the same temperature and pressure:</p><p class="formula">24 dm³ at room temperature and pressure &nbsp;&nbsp; 22.4 dm³ at s.t.p. (0 °C, 1 atm)</p><p class="formula">moles of gas = volume ÷ molar volume</p><p><b>Gay-Lussac’s law:</b> gases react in volumes that are in simple whole-number ratios, matching their mole ratios in the equation.</p>'],
        ['Formulae from masses', '<p><b>Percentage composition</b> = (mass of element in one mole ÷ molar mass) × 100%. In H<sub>2</sub>O, % H = 2 ÷ 18 × 100 = 11.1%.</p><p><b>Empirical formula</b> (the simplest ratio):</p><ol><li>Write the mass (or %) of each element.</li><li>Divide each by its A<sub>r</sub> to get moles.</li><li>Divide by the smallest number of moles and round to whole numbers.</li></ol><p>The <b>molecular formula</b> is a whole-number multiple of the empirical formula: (empirical formula)<sub>n</sub>, where n = M<sub>r</sub> ÷ empirical formula mass.</p>'],
        ['Reacting masses', '<p>Use the balanced equation to get the mole ratio.</p><p>Worked example: what mass of CaO forms when 50 g of CaCO<sub>3</sub> is heated? CaCO<sub>3</sub> → CaO + CO<sub>2</sub>. Moles of CaCO<sub>3</sub> = 50 ÷ 100 = 0.5 mol, so 0.5 mol of CaO = 0.5 × 56 = <b>28 g</b>. The CO<sub>2</sub> released = 0.5 × 24 = 12 dm³ at room conditions.</p>']
      ],
      quiz: [
        ['One mole of any substance contains…', ['6.02 × 10²³ particles', '22.4 particles', '1 g of the substance', '12 particles'], 0, 'This is the Avogadro constant.'],
        ['How many moles are in 11.7 g of NaCl (Na = 23, Cl = 35.5)?', ['0.1 mol', '0.2 mol', '0.5 mol', '2 mol'], 1, 'Mr = 58.5; 11.7 ÷ 58.5 = 0.2 mol.'],
        ['The molar mass of CaCO₃ (Ca = 40, C = 12, O = 16) is…', ['68 g/mol', '84 g/mol', '100 g/mol', '116 g/mol'], 2, '40 + 12 + 3 × 16 = 100.'],
        ['The volume of 0.25 mol of oxygen at room temperature and pressure is…', ['6 dm³', '5.6 dm³', '24 dm³', '96 dm³'], 0, '0.25 × 24 = 6 dm³.'],
        ['A compound contains 75% carbon and 25% hydrogen by mass. Its empirical formula is…', ['CH₂', 'CH₃', 'CH₄', 'C₂H₆'], 2, 'C: 75/12 = 6.25, H: 25/1 = 25; ratio 1 : 4.'],
        ['How many molecules are in 0.5 mol of water?', ['3.01 × 10²³', '6.02 × 10²³', '1.2 × 10²⁴', '9'], 0, '0.5 × 6.02 × 10²³.']
      ]
    },
    {
      id: 'volumetric', icon: 'burette', title: 'Volumetric analysis', sims: ['titration'],
      blurb: 'Standard solutions, titration technique and calculations from titres.',
      notes: [
        ['Apparatus and standard solutions', '<p><b>Volumetric analysis</b> finds the amount of a substance by measuring volumes of solutions that react exactly.</p><ul><li><b>Burette:</b> delivers a variable, accurately measured volume.</li><li><b>Pipette:</b> delivers one fixed volume (such as 25.0 cm³). Use a pipette filler, never your mouth.</li><li><b>Volumetric flask:</b> makes up a solution to an exact volume.</li><li><b>Conical flask:</b> holds the solution being titrated; it can be swirled without spilling.</li></ul><p>A <b>standard solution</b> is one whose concentration is known exactly.</p>'],
        ['Concentration', '<p class="formula">molarity (mol/dm³) = moles of solute ÷ volume in dm³</p><p class="formula">concentration (g/dm³) = molarity × molar mass</p><p class="formula">dilution: C<sub>1</sub>V<sub>1</sub> = C<sub>2</sub>V<sub>2</sub></p><p>Remember 1000 cm³ = 1 dm³. Example: 4 g of NaOH (M = 40) in 500 cm³ is 0.1 mol in 0.5 dm³ = 0.2 mol/dm³.</p>'],
        ['Titration technique', '<ol><li>Rinse the burette with the solution it will hold, and the pipette with its solution; rinse the conical flask with distilled water only.</li><li>Pipette 25.0 cm³ of one solution into the flask and add 2–3 drops of indicator.</li><li>Record the initial burette reading. Run in the other solution while swirling, dropwise near the end point, until the colour just changes.</li><li>Repeat until two titres agree within 0.10 cm³ (<b>concordant</b>) and average them.</li></ol><p><b>Choosing an indicator:</b> strong acid–strong base: either; strong acid–weak base: methyl orange; weak acid–strong base: phenolphthalein.</p>'],
        ['Calculations', '<p class="formula">M<sub>a</sub>V<sub>a</sub> ÷ M<sub>b</sub>V<sub>b</sub> = n<sub>a</sub> ÷ n<sub>b</sub></p><p>n<sub>a</sub> and n<sub>b</sub> are the numbers of moles of acid and base in the balanced equation.</p><p>Worked example: 25.0 cm³ of NaOH is neutralised by 20.0 cm³ of 0.10 mol/dm³ H<sub>2</sub>SO<sub>4</sub>. H<sub>2</sub>SO<sub>4</sub> + 2NaOH → Na<sub>2</sub>SO<sub>4</sub> + 2H<sub>2</sub>O. Moles of acid = 0.10 × 0.020 = 0.002; moles of NaOH = 0.004; molarity = 0.004 ÷ 0.025 = <b>0.16 mol/dm³</b>.</p><p>Titration is also used to find water of crystallisation, the purity of a sample, molar mass and basicity.</p>']
      ],
      quiz: [
        ['Which apparatus delivers a fixed volume of 25.0 cm³ accurately?', ['Burette', 'Pipette', 'Beaker', 'Measuring cylinder'], 1, 'A pipette is calibrated for one volume.'],
        ['The concentration of 0.5 mol of HCl in 250 cm³ of solution is…', ['0.125 mol/dm³', '0.5 mol/dm³', '2 mol/dm³', '125 mol/dm³'], 2, '0.5 ÷ 0.25 dm³ = 2 mol/dm³.'],
        ['The conical flask should be rinsed with…', ['the acid', 'the alkali', 'distilled water', 'indicator'], 2, 'Rinsing with a reagent would add extra moles.'],
        ['For titrating ethanoic acid (weak) with NaOH (strong), the best indicator is…', ['methyl orange', 'phenolphthalein', 'litmus paper', 'universal indicator'], 1, 'Its colour change matches the alkaline end point.'],
        ['10 cm³ of 2 mol/dm³ acid is diluted to 100 cm³. The new concentration is…', ['0.02 mol/dm³', '0.2 mol/dm³', '2 mol/dm³', '20 mol/dm³'], 1, 'C₂ = 2 × 10 ÷ 100 = 0.2 mol/dm³.'],
        ['25.0 cm³ of 0.1 mol/dm³ NaOH needs 12.5 cm³ of HCl. The HCl concentration is…', ['0.05 mol/dm³', '0.1 mol/dm³', '0.2 mol/dm³', '0.4 mol/dm³'], 2, '1:1 ratio; 0.0025 mol ÷ 0.0125 dm³ = 0.2 mol/dm³.']
      ]
    },
    {
      id: 'electrolysis', icon: 'bolt', title: 'Ionic theory and electrolysis', sims: ['electrolysis'],
      blurb: 'Electrolytes, what forms at each electrode, Faraday’s laws and industrial uses.',
      notes: [
        ['Electrolytes', '<p>An <b>electrolyte</b> is a compound that conducts electricity when molten or dissolved in water and is decomposed by it. It conducts because its ions are free to move. <b>Strong electrolytes</b> are fully ionised (NaCl, HCl); <b>weak electrolytes</b> are partly ionised (ethanoic acid, ammonia solution). <b>Non-electrolytes</b> do not form ions (sugar, ethanol).</p><p>Metals conduct by moving electrons and are not decomposed.</p>'],
        ['Electrolysis', '<p><b>Electrolysis</b> is the decomposition of an electrolyte by an electric current.</p><ul><li><b>Cathode</b> (negative): positive ions (cations) gain electrons; <b>reduction</b>. Cu<sup>2+</sup> + 2e<sup>−</sup> → Cu.</li><li><b>Anode</b> (positive): negative ions (anions) lose electrons; <b>oxidation</b>. 2Cl<sup>−</sup> → Cl<sub>2</sub> + 2e<sup>−</sup>.</li></ul><p>Which ion is discharged depends on its position in the <b>electrochemical series</b>, its <b>concentration</b>, and the <b>type of electrode</b> (inert carbon or platinum, or an active metal).</p>'],
        ['Examples', '<ul><li><b>Molten lead(II) bromide:</b> lead at the cathode, brown bromine vapour at the anode.</li><li><b>Dilute sulphuric acid (inert electrodes):</b> hydrogen at the cathode and oxygen at the anode in a 2 : 1 volume ratio. In effect, water is electrolysed.</li><li><b>Copper(II) sulphate, carbon electrodes:</b> copper on the cathode, oxygen at the anode; the blue colour fades.</li><li><b>Copper(II) sulphate, copper electrodes:</b> the anode dissolves, copper is deposited on the cathode, and the blue colour stays the same.</li><li><b>Concentrated sodium chloride (brine):</b> hydrogen at the cathode, chlorine at the anode; sodium hydroxide is left in solution.</li></ul>'],
        ['Faraday’s laws and applications', '<p><b>First law:</b> the mass of substance released is proportional to the quantity of electricity passed.</p><p class="formula">Q = I t &nbsp;&nbsp; 1 faraday = 96 500 C = 1 mole of electrons</p><p><b>Second law:</b> the same charge releases moles of different elements in proportion to 1 ÷ (charge on the ion).</p><p>Worked example: 2 A for 9650 s gives Q = 19 300 C = 0.2 mol of electrons. Cu<sup>2+</sup> needs 2 mol e<sup>−</sup> per mol, so 0.1 mol Cu = 6.4 g is deposited.</p><p><b>Uses:</b> electroplating (chromium, silver, nickel), purifying copper, extracting reactive metals (sodium, aluminium), anodising aluminium, making chlorine and sodium hydroxide from brine.</p>']
      ],
      quiz: [
        ['An ionic compound conducts electricity when molten because…', ['its electrons are free', 'its ions are free to move', 'it becomes a metal', 'it is hot'], 1, 'In the solid, ions are fixed in place.'],
        ['At the cathode during electrolysis…', ['anions lose electrons', 'cations gain electrons', 'oxygen is always formed', 'the electrode always dissolves'], 1, 'The cathode supplies electrons: reduction.'],
        ['Electrolysis of dilute sulphuric acid gives hydrogen and oxygen in the volume ratio…', ['1 : 1', '1 : 2', '2 : 1', '4 : 1'], 2, 'Two volumes of hydrogen for each volume of oxygen.'],
        ['In electrolysis of copper(II) sulphate with copper electrodes, the anode…', ['gains mass', 'loses mass', 'gives off oxygen', 'is unchanged'], 1, 'Copper atoms go into solution as Cu²⁺.'],
        ['A current of 0.5 A flows for 1930 s. The charge passed is…', ['965 C', '3860 C', '0.00026 C', '96 500 C'], 0, 'Q = It = 0.5 × 1930 = 965 C.'],
        ['Electroplating a spoon with silver: the spoon should be the…', ['anode', 'cathode', 'electrolyte', 'salt bridge'], 1, 'Silver ions are reduced onto the cathode.']
      ]
    },
    {
      id: 'kinetics', icon: 'clock', title: 'Chemical kinetics, equilibrium and energetics', sims: ['rates'],
      blurb: 'How fast reactions go, reversible reactions and equilibrium, and heat changes.',
      notes: [
        ['Rate of reaction', '<p>The <b>rate</b> of a reaction is the change in amount of reactant or product per unit time. It can be followed by measuring the volume of gas given off (gas syringe), the loss of mass, or the time for a colour or precipitate to appear.</p><p>On a graph of volume of gas against time, the slope is steepest at the start and becomes zero when the reaction stops.</p>'],
        ['Factors affecting rate', '<p><b>Collision theory:</b> particles react only when they collide with at least the <b>activation energy</b>.</p><ul><li><b>Concentration (or gas pressure):</b> more particles in a given volume, more frequent collisions.</li><li><b>Temperature:</b> particles move faster and more collisions have enough energy. A rise of 10 °C often roughly doubles the rate.</li><li><b>Surface area:</b> powder reacts faster than lumps because more particles are exposed.</li><li><b>Catalyst:</b> speeds up a reaction without being used up, by providing a route with lower activation energy. MnO<sub>2</sub> catalyses the decomposition of H<sub>2</sub>O<sub>2</sub>.</li><li><b>Light:</b> speeds up some reactions, such as photosynthesis and the darkening of silver salts.</li></ul>'],
        ['Reversible reactions and equilibrium', '<p>A <b>reversible reaction</b> can go both ways (⇌). In a closed system it reaches <b>dynamic equilibrium</b>: the forward and backward reactions continue at equal rates, so the amounts stay constant.</p><p><b>Le Chatelier’s principle:</b> if conditions are changed, the equilibrium shifts to oppose the change.</p><ul><li>Adding reactant shifts it to the right.</li><li>Raising pressure shifts it to the side with fewer gas molecules.</li><li>Raising temperature shifts it in the endothermic direction.</li><li>A catalyst does not shift the position; it only gets there faster.</li></ul><p><b>Haber process:</b> N<sub>2</sub> + 3H<sub>2</sub> ⇌ 2NH<sub>3</sub>, exothermic. Conditions: about 450 °C, 200 atm, iron catalyst: a compromise between a good yield and a fast rate.</p>'],
        ['Energetics', '<ul><li><b>Exothermic</b> reactions give out heat; the surroundings warm up and ΔH is negative (combustion, neutralisation, respiration).</li><li><b>Endothermic</b> reactions take in heat; the surroundings cool and ΔH is positive (photosynthesis, dissolving ammonium nitrate, thermal decomposition).</li></ul><p>Breaking bonds <b>takes in</b> energy; making bonds <b>gives out</b> energy. ΔH = energy to break bonds − energy released making bonds.</p><p>The heat of neutralisation of a strong acid by a strong alkali is about −57 kJ per mole of water formed. Heat change = m c Δθ.</p>']
      ],
      quiz: [
        ['Powdered marble reacts faster with acid than lumps because it has…', ['higher temperature', 'larger surface area', 'more mass', 'a catalyst'], 1, 'More particles are exposed to collisions.'],
        ['A catalyst speeds up a reaction by…', ['raising the temperature', 'providing a path with lower activation energy', 'increasing the concentration', 'shifting the equilibrium'], 1, 'It is not used up in the reaction.'],
        ['In dynamic equilibrium…', ['the reaction has stopped', 'forward and backward rates are equal', 'only products are present', 'the yield is 100%'], 1, 'Both reactions continue at the same rate.'],
        ['For N₂ + 3H₂ ⇌ 2NH₃, increasing the pressure…', ['shifts equilibrium to the left', 'shifts equilibrium to the right', 'has no effect', 'stops the reaction'], 1, 'The right has fewer gas molecules (2 against 4).'],
        ['An exothermic reaction has ΔH that is…', ['positive', 'negative', 'zero', 'always 57 kJ'], 1, 'Heat is given out to the surroundings.'],
        ['Breaking chemical bonds is…', ['exothermic', 'endothermic', 'neither', 'a catalyst'], 1, 'Energy must be supplied to break bonds.']
      ]
    },
    {
      id: 'metals', icon: 'factory', title: 'Extraction and properties of metals', sims: ['reactivity'],
      blurb: 'Where metals are found, the reactivity series, and how metals are extracted.',
      notes: [
        ['Metals, ores and Tanzania’s minerals', '<p>Most metals are found combined in <b>ores</b>: oxides (haematite Fe<sub>2</sub>O<sub>3</sub>, bauxite Al<sub>2</sub>O<sub>3</sub>), sulphides (galena PbS, zinc blende ZnS, copper pyrites), carbonates and chlorides. Unreactive metals such as gold occur <b>native</b> (uncombined). Aluminium and iron are the most abundant metals in the Earth’s crust.</p><p>Tanzania’s mineral wealth includes gold (around Geita and the Lake Victoria goldfields), diamonds (Mwadui, Shinyanga), tanzanite (Mererani, found nowhere else in the world), iron ore (Liganga, Njombe) and coal (Mchuchuma, Kiwira).</p>'],
        ['Properties of metals', '<p><b>Physical:</b> lustrous, good conductors of heat and electricity, malleable, ductile, sonorous, usually high melting points and densities (sodium and mercury are exceptions).</p><p><b>Chemical:</b> form positive ions by losing electrons; form basic oxides; react with acids (above hydrogen) to give hydrogen.</p><p class="formula">K, Na, Ca, Mg, Al, (C), Zn, Fe, Pb, (H), Cu, Ag, Au</p><p>The higher a metal in the reactivity series, the more readily it reacts and the harder it is to extract.</p>'],
        ['Methods of extraction', '<ul><li><b>Very reactive metals</b> (K, Na, Ca, Mg, Al): <b>electrolysis</b> of the molten ore. Sodium from molten NaCl (Downs cell); aluminium from alumina dissolved in molten cryolite.</li><li><b>Moderately reactive</b> (Zn, Fe, Pb): <b>reduction</b> of the oxide with carbon or carbon monoxide. Sulphide ores are first roasted in air to give oxides.</li><li><b>Unreactive</b> (Cu, Ag, Au): found native, or obtained by roasting the ore; copper is purified by electrolysis.</li></ul>'],
        ['Iron in the blast furnace', '<p>Raw materials: iron ore (haematite), coke and limestone, with hot air blown in at the bottom.</p><ol><li>Coke burns: C + O<sub>2</sub> → CO<sub>2</sub>; then CO<sub>2</sub> + C → 2CO.</li><li>Carbon monoxide reduces the ore: Fe<sub>2</sub>O<sub>3</sub> + 3CO → 2Fe + 3CO<sub>2</sub>.</li><li>Limestone decomposes to CaO, which removes sandy impurities: CaO + SiO<sub>2</sub> → CaSiO<sub>3</sub> (<b>slag</b>).</li></ol><p>Molten iron and slag are tapped off separately. Slag is used for road building and cement. Cast iron is brittle; most is turned into <b>steel</b> by removing carbon and adding other metals.</p>']
      ],
      quiz: [
        ['Which metal is usually found native (uncombined)?', ['Sodium', 'Iron', 'Gold', 'Aluminium'], 2, 'Gold is very unreactive.'],
        ['Aluminium is extracted by…', ['heating its oxide with carbon', 'electrolysis of molten alumina in cryolite', 'roasting in air', 'reaction with water'], 1, 'It is too reactive to be reduced by carbon.'],
        ['In the blast furnace, the main reducing agent is…', ['coke', 'carbon monoxide', 'limestone', 'hot air'], 1, 'CO reduces Fe₂O₃ to iron.'],
        ['Limestone is added to the blast furnace to…', ['reduce the ore', 'remove sandy impurities as slag', 'cool the furnace', 'make steel'], 1, 'CaO + SiO₂ → CaSiO₃.'],
        ['Tanzanite is mined at…', ['Mwadui', 'Geita', 'Mererani', 'Liganga'], 2, 'Mererani, near Arusha, is its only known source.'],
        ['Which metal can be extracted by heating its oxide with carbon?', ['Potassium', 'Magnesium', 'Zinc', 'Calcium'], 2, 'Zinc is below carbon in the reactivity series.']
      ]
    },
    {
      id: 'compounds1', icon: 'flask', title: 'Compounds of metals I: oxides, hydroxides and carbonates', sims: ['heatsalts'],
      blurb: 'How metal oxides, hydroxides, carbonates and hydrogencarbonates are made and behave.',
      notes: [
        ['Oxides', '<p>Oxides are classified by how they react with acids and bases:</p><ul><li><b>Basic oxides</b> (most metal oxides) react with acids: CuO, MgO, CaO, Na<sub>2</sub>O.</li><li><b>Acidic oxides</b> (non-metal oxides) react with bases: CO<sub>2</sub>, SO<sub>2</sub>, P<sub>2</sub>O<sub>5</sub>.</li><li><b>Amphoteric oxides</b> react with both acids and strong bases: ZnO, Al<sub>2</sub>O<sub>3</sub>, PbO.</li><li><b>Neutral oxides</b> react with neither: CO, N<sub>2</sub>O, H<sub>2</sub>O.</li></ul><p>Oxides are made by burning the element in oxygen or by heating the hydroxide, carbonate or nitrate.</p>'],
        ['Hydroxides', '<p>Sodium and potassium hydroxides are soluble <b>alkalis</b>; calcium hydroxide is slightly soluble (its solution is limewater). Most other metal hydroxides are insoluble and are made by precipitation, for example adding NaOH(aq) to CuSO<sub>4</sub>(aq) gives blue Cu(OH)<sub>2</sub>.</p><p>On heating, NaOH and KOH are stable; other hydroxides decompose to the oxide and steam:</p><p class="formula">Cu(OH)<sub>2</sub>(s) → CuO(s) + H<sub>2</sub>O(g) &nbsp; (blue → black)</p><p>Zinc and aluminium hydroxides are amphoteric and dissolve in excess NaOH.</p>'],
        ['Carbonates', '<p>Only sodium, potassium and ammonium carbonates are soluble. All carbonates react with acids to give a salt, water and carbon dioxide, which turns limewater milky.</p><p><b>Action of heat:</b> Na<sub>2</sub>CO<sub>3</sub> and K<sub>2</sub>CO<sub>3</sub> are not decomposed by a Bunsen flame. Others give the oxide and CO<sub>2</sub>:</p><ul><li>CuCO<sub>3</sub> → CuO + CO<sub>2</sub> (green → black)</li><li>ZnCO<sub>3</sub> → ZnO + CO<sub>2</sub> (white → yellow when hot, white when cold)</li><li>CaCO<sub>3</sub> → CaO + CO<sub>2</sub> (needs strong heating; used to make quicklime and cement)</li></ul><p>The lower the metal in the reactivity series, the more easily its carbonate decomposes.</p>'],
        ['Hydrogencarbonates', '<p>Sodium hydrogencarbonate (baking soda) decomposes on gentle heating:</p><p class="formula">2NaHCO<sub>3</sub> → Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O + CO<sub>2</sub></p><p>The carbon dioxide makes bread and cakes rise. NaHCO<sub>3</sub> is also used in antacids and fire extinguishers. Calcium hydrogencarbonate exists only in solution and causes temporary hardness of water.</p>']
      ],
      quiz: [
        ['Zinc oxide reacts with both acids and strong alkalis. It is…', ['basic', 'acidic', 'amphoteric', 'neutral'], 2, 'Amphoteric oxides react with both.'],
        ['Heating copper(II) carbonate gives a residue that is…', ['green', 'blue', 'black', 'white'], 2, 'Black copper(II) oxide forms.'],
        ['Which carbonate is NOT decomposed by a Bunsen flame?', ['Copper(II) carbonate', 'Zinc carbonate', 'Sodium carbonate', 'Lead(II) carbonate'], 2, 'Group I carbonates are stable to heat.'],
        ['The gas given off when carbonates are heated turns…', ['limewater milky', 'damp red litmus blue', 'a glowing splint into a flame', 'acidified dichromate green'], 0, 'Carbon dioxide forms a white precipitate of CaCO₃.'],
        ['A residue that is yellow when hot and white when cold is…', ['CuO', 'ZnO', 'CaO', 'MgO'], 1, 'This is a test for zinc oxide.'],
        ['Baking powder makes dough rise because NaHCO₃ releases…', ['oxygen', 'hydrogen', 'carbon dioxide', 'steam only'], 2, 'The gas forms bubbles in the dough.']
      ]
    },
    {
      id: 'compounds2', icon: 'flask', title: 'Compounds of metals II: nitrates, chlorides and sulphates', sims: ['heatsalts'],
      blurb: 'How nitrates, chlorides and sulphates behave on heating, and how to test for them.',
      notes: [
        ['Nitrates', '<p>All nitrates are soluble in water. They decompose on heating in three ways, depending on the metal’s reactivity:</p><ul><li><b>Sodium and potassium:</b> nitrite + oxygen. 2NaNO<sub>3</sub> → 2NaNO<sub>2</sub> + O<sub>2</sub>.</li><li><b>Calcium to copper:</b> oxide + nitrogen dioxide + oxygen. 2Cu(NO<sub>3</sub>)<sub>2</sub> → 2CuO + 4NO<sub>2</sub> + O<sub>2</sub>. Brown fumes of NO<sub>2</sub> appear.</li><li><b>Silver and mercury:</b> metal + NO<sub>2</sub> + O<sub>2</sub>.</li></ul><p>Lead(II) nitrate crackles (<b>decrepitates</b>) on heating and leaves a residue that is orange-red hot and yellow cold. Oxygen is tested by relighting a glowing splint.</p><p><b>Test for nitrate:</b> the <b>brown ring test</b>: add fresh iron(II) sulphate solution, then carefully run concentrated sulphuric acid down the side; a brown ring forms where the layers meet.</p>'],
        ['Chlorides', '<p>Most chlorides are soluble, except silver chloride and lead(II) chloride (lead(II) chloride dissolves in hot water). Chlorides are made from metals, oxides, hydroxides or carbonates with hydrochloric acid, or by direct combination with chlorine.</p><p><b>Test for chloride:</b> add dilute nitric acid, then silver nitrate solution: a <b>white precipitate</b> of AgCl that darkens in light.</p><p class="formula">Ag<sup>+</sup>(aq) + Cl<sup>−</sup>(aq) → AgCl(s)</p><p>Ammonium chloride sublimes on heating, forming a white ring on the cooler part of the test tube.</p>'],
        ['Sulphates', '<p>Most sulphates are soluble, except barium sulphate and lead(II) sulphate; calcium sulphate is only slightly soluble.</p><p><b>Test for sulphate:</b> add dilute hydrochloric acid, then barium chloride solution: a <b>white precipitate</b> of BaSO<sub>4</sub>.</p><p class="formula">Ba<sup>2+</sup>(aq) + SO<sub>4</sub><sup>2−</sup>(aq) → BaSO<sub>4</sub>(s)</p><p>Barium sulphate is so insoluble that patients can swallow a “barium meal” for X-ray scans of the gut.</p>'],
        ['Hydrated salts and their uses', '<p>Heating blue copper(II) sulphate crystals drives off the water of crystallisation and leaves <b>white anhydrous</b> copper(II) sulphate. Adding water turns it blue again and gives out heat. This is a test for water.</p><p class="formula">CuSO<sub>4</sub>·5H<sub>2</sub>O ⇌ CuSO<sub>4</sub> + 5H<sub>2</sub>O</p><p><b>Uses:</b> NaCl to season and preserve food; CaSO<sub>4</sub> (plaster of Paris) for casts; CuSO<sub>4</sub> as a fungicide; KNO<sub>3</sub> and NH<sub>4</sub>NO<sub>3</sub> as fertilisers; (NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub> as a fertiliser.</p>']
      ],
      quiz: [
        ['Heating sodium nitrate gives sodium nitrite and…', ['nitrogen dioxide', 'oxygen', 'nitrogen', 'sodium oxide'], 1, 'Group I nitrates give nitrite and oxygen only.'],
        ['The brown gas given off when copper(II) nitrate is heated is…', ['bromine', 'nitrogen dioxide', 'chlorine', 'oxygen'], 1, 'NO₂ is a brown, acidic gas.'],
        ['Adding acidified silver nitrate to a solution gives a white precipitate. The solution contains…', ['sulphate ions', 'chloride ions', 'nitrate ions', 'carbonate ions'], 1, 'Silver chloride is white.'],
        ['The test for sulphate ions uses…', ['silver nitrate and nitric acid', 'barium chloride and hydrochloric acid', 'limewater', 'iron(II) sulphate'], 1, 'Barium sulphate forms a white precipitate.'],
        ['Which chloride is insoluble in cold water?', ['Sodium chloride', 'Copper(II) chloride', 'Silver chloride', 'Calcium chloride'], 2, 'AgCl is insoluble.'],
        ['Blue copper(II) sulphate crystals turn white on heating because they lose…', ['copper', 'sulphur', 'water of crystallisation', 'oxygen'], 2, 'Anhydrous CuSO₄ is white.']
      ]
    }
  ]
});

HL.courses.push({
  id: 'chem4', subject: 'chem', form: 4, title: 'Chemistry, Form Four',
  topics: [
    {
      id: 'nonmetals', icon: 'atom', title: 'Non-metals and their compounds', sims: ['gastests'],
      blurb: 'Chlorine, sulphur, nitrogen, carbon and their important compounds and tests.',
      notes: [
        ['Non-metals', '<p>Non-metals are found at the upper right of the periodic table (plus hydrogen). They are usually poor conductors, brittle when solid, dull, with low melting and boiling points. They gain or share electrons and form <b>acidic</b> or neutral oxides.</p>'],
        ['Chlorine and hydrogen chloride', '<p><b>Chlorine</b> is a greenish-yellow, poisonous gas, denser than air. Lab preparation: heat manganese(IV) oxide with concentrated hydrochloric acid. It <b>bleaches damp litmus</b> (blue → red → white). Uses: killing germs in water and swimming pools, bleach, making PVC and HCl.</p><p><b>Hydrogen chloride</b> is made by warming sodium chloride with concentrated sulphuric acid. It fumes in moist air, is very soluble in water (the fountain experiment), turns damp blue litmus red and forms dense <b>white fumes</b> with ammonia (NH<sub>4</sub>Cl).</p>'],
        ['Sulphur and its compounds', '<p><b>Sulphur</b> is a yellow solid with two allotropes, rhombic and monoclinic. It burns with a blue flame to form <b>sulphur dioxide</b>, a choking gas that turns acidified potassium dichromate paper from <b>orange to green</b>, bleaches, preserves food, and causes acid rain.</p><p><b>Sulphuric acid</b> is made by the <b>Contact process</b>: 2SO<sub>2</sub> + O<sub>2</sub> ⇌ 2SO<sub>3</sub> (V<sub>2</sub>O<sub>5</sub> catalyst, about 450 °C); SO<sub>3</sub> is absorbed in concentrated acid to give oleum, then diluted. Concentrated H<sub>2</sub>SO<sub>4</sub> is a <b>dehydrating agent</b> (it turns sugar into black carbon) and a drying agent. Always add acid to water, never water to acid.</p>'],
        ['Nitrogen, ammonia, carbon and carbon dioxide', '<p><b>Nitrogen</b> makes up about 78% of air and is unreactive because of its strong triple bond.</p><p><b>Ammonia</b> is made in the lab by heating an ammonium salt with a base: 2NH<sub>4</sub>Cl + Ca(OH)<sub>2</sub> → CaCl<sub>2</sub> + 2H<sub>2</sub>O + 2NH<sub>3</sub>. It is dried with calcium oxide and collected by upward delivery, because it is less dense than air. It turns damp red litmus <b>blue</b> and gives white fumes with HCl. Industry makes it by the Haber process; it is used for fertilisers and nitric acid.</p><p><b>Carbon</b> has allotropes diamond (hard, used for cutting) and graphite (soft, conducts, used in pencils and electrodes). <b>Carbon dioxide</b> is made from marble chips and dilute HCl; it turns <b>limewater milky</b> and does not support burning. Uses: fire extinguishers, fizzy drinks, dry ice, photosynthesis.</p>']
      ],
      quiz: [
        ['Which gas bleaches damp litmus paper?', ['Ammonia', 'Chlorine', 'Carbon dioxide', 'Hydrogen'], 1, 'Chlorine bleaches by oxidation.'],
        ['Ammonia gas turns damp red litmus paper…', ['blue', 'white', 'green', 'it has no effect'], 0, 'Ammonia is alkaline.'],
        ['Sulphur dioxide turns acidified potassium dichromate…', ['orange to green', 'green to orange', 'colourless to pink', 'blue to white'], 0, 'SO₂ reduces the dichromate.'],
        ['The catalyst in the Contact process is…', ['iron', 'nickel', 'vanadium(V) oxide', 'platinum only'], 2, 'V₂O₅ catalyses the oxidation of SO₂.'],
        ['Ammonia is collected by upward delivery because it is…', ['denser than air', 'less dense than air', 'insoluble in water', 'coloured'], 1, 'It rises and displaces air downwards.'],
        ['Concentrated sulphuric acid turns sugar black because it is…', ['an oxidising agent only', 'a dehydrating agent', 'a reducing agent', 'a catalyst'], 1, 'It removes the elements of water, leaving carbon.']
      ]
    },
    {
      id: 'organic', icon: 'hex', title: 'Introduction to organic chemistry', sims: ['organic'],
      blurb: 'Hydrocarbons, homologous series, naming, alcohols, acids and polymers.',
      notes: [
        ['Organic compounds and homologous series', '<p><b>Organic chemistry</b> is the chemistry of carbon compounds (except oxides, carbonates and a few others). Carbon can form four bonds and long chains (<b>catenation</b>), so there are millions of organic compounds. Sources include crude oil, natural gas (Tanzania has gas at Songo Songo and Mnazi Bay), coal and plants.</p><p>A <b>homologous series</b> is a family of compounds that: share one general formula; differ by CH<sub>2</sub> from one member to the next; have the same functional group and similar chemical properties; show a gradual change in physical properties.</p><p>Names start with the number of carbons: meth- (1), eth- (2), prop- (3), but- (4), pent- (5), hex- (6).</p>'],
        ['Alkanes, alkenes and alkynes', '<ul><li><b>Alkanes</b>, C<sub>n</sub>H<sub>2n+2</sub>: <b>saturated</b> (only single bonds). Fairly unreactive. They burn well (fuels) and react with chlorine in sunlight by <b>substitution</b>.</li><li><b>Alkenes</b>, C<sub>n</sub>H<sub>2n</sub>: <b>unsaturated</b>, with a C=C double bond. They undergo <b>addition</b> reactions and <b>decolourise bromine water</b> quickly (the test for unsaturation). Ethene is made by cracking and is used to make polythene.</li><li><b>Alkynes</b>, C<sub>n</sub>H<sub>2n−2</sub>: a C≡C triple bond. Ethyne burns very hot in oxygen (welding).</li></ul><p><b>Isomers</b> have the same molecular formula but different structures: butane and 2-methylpropane are both C<sub>4</sub>H<sub>10</sub>.</p>'],
        ['Alcohols and carboxylic acids', '<p><b>Alcohols</b>, C<sub>n</sub>H<sub>2n+1</sub>OH, contain the –OH group. <b>Ethanol</b> is made by <b>fermentation</b> of sugars by yeast in the absence of air:</p><p class="formula">C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> → 2C<sub>2</sub>H<sub>5</sub>OH + 2CO<sub>2</sub></p><p>or by adding steam to ethene. Uses: fuel, solvent, alcoholic drinks, antiseptic. Ethanol turns acidified potassium dichromate from orange to green as it is oxidised.</p><p><b>Carboxylic acids</b> contain the –COOH group. <b>Ethanoic acid</b> is the acid in vinegar. They are weak acids: they turn blue litmus red and fizz with carbonates. With an alcohol and a little concentrated H<sub>2</sub>SO<sub>4</sub> they form sweet-smelling <b>esters</b> (esterification).</p>'],
        ['Polymers', '<p>A <b>polymer</b> is a very large molecule made by joining many small molecules (<b>monomers</b>).</p><ul><li><b>Addition polymers</b> form from alkenes: many ethene molecules give poly(ethene), used for bags and bottles; chloroethene gives PVC.</li><li><b>Condensation polymers</b> form with loss of a small molecule such as water: nylon, polyester; natural examples include proteins and starch.</li></ul><p>Most plastics are <b>non-biodegradable</b>, so their disposal causes land and water pollution.</p>']
      ],
      quiz: [
        ['The general formula of the alkanes is…', ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₊₁OH'], 1, 'Alkanes are saturated hydrocarbons.'],
        ['Which compound decolourises bromine water quickly?', ['Ethane', 'Ethene', 'Ethanol', 'Methane'], 1, 'Ethene is unsaturated and undergoes addition.'],
        ['C₃H₈ is called…', ['methane', 'ethane', 'propane', 'butane'], 2, 'Three carbons: prop-; single bonds: -ane.'],
        ['Ethanol is made from sugar by…', ['cracking', 'fermentation', 'esterification', 'polymerisation'], 1, 'Yeast converts sugar to ethanol and CO₂.'],
        ['The functional group of carboxylic acids is…', ['–OH', '–COOH', 'C=C', '–Cl'], 1, 'Ethanoic acid is CH₃COOH.'],
        ['Poly(ethene) is made by…', ['condensation polymerisation', 'addition polymerisation', 'fermentation', 'substitution'], 1, 'Ethene molecules add together.']
      ]
    },
    {
      id: 'soil', icon: 'leaf', title: 'Soil chemistry', sims: ['ph'],
      blurb: 'How soil forms, plant nutrients, soil pH, manures and fertilisers.',
      notes: [
        ['Soil formation and composition', '<p>Soil forms from rocks by <b>weathering</b>:</p><ul><li><b>Physical:</b> temperature changes, freezing water, wind and running water break rocks up.</li><li><b>Chemical:</b> rain water containing CO<sub>2</sub> dissolves limestone; oxygen oxidises iron minerals.</li><li><b>Biological:</b> plant roots, burrowing animals and microorganisms.</li></ul><p>Soil contains mineral particles (sand, silt, clay), organic matter (<b>humus</b>), water, air and living organisms.</p>'],
        ['Plant nutrients', '<p><b>Macronutrients</b> are needed in large amounts: nitrogen, phosphorus, potassium (N, P, K), calcium, magnesium and sulphur. <b>Micronutrients</b> (trace elements) are needed in small amounts: iron, manganese, zinc, copper, boron, molybdenum, chlorine.</p><ul><li><b>Nitrogen:</b> leaf and stem growth; lack causes yellowing of older leaves and stunted growth.</li><li><b>Phosphorus:</b> root development and ripening; lack causes purplish leaves and poor roots.</li><li><b>Potassium:</b> disease resistance and fruit quality; lack causes scorched leaf edges.</li></ul>'],
        ['Soil reaction (pH)', '<p>Most crops grow best between pH 6 and 7. Soil pH affects which nutrients plants can absorb.</p><ul><li><b>Acidic soils</b> (often from heavy rain leaching bases, or too much ammonium fertiliser) are corrected by <b>liming</b>: adding calcium oxide, calcium hydroxide or powdered limestone.</li><li><b>Alkaline soils</b> are corrected by adding organic matter, sulphur or acidic fertilisers such as ammonium sulphate.</li></ul><p>Soil pH is tested by shaking soil with distilled water (and a little barium sulphate to settle the clay), adding universal indicator and comparing with the colour chart.</p>'],
        ['Manures and fertilisers', '<p><b>Manures</b> come from plant and animal remains: farmyard manure, compost, green manure. They release nutrients slowly and improve soil structure and water holding.</p><p><b>Fertilisers</b> are manufactured chemicals. <b>Straight</b> fertilisers supply one main nutrient (urea, ammonium sulphate, CAN); <b>compound</b> fertilisers supply several (NPK 17:17:17).</p><p class="formula">% N in urea, CO(NH<sub>2</sub>)<sub>2</sub> = 28 ÷ 60 × 100 = 46.7%</p><p><b>Soil fertility</b> is the soil’s ability to supply nutrients; <b>soil productivity</b> is its ability to produce crops, which also depends on climate, water and management. Over-use of fertiliser wastes money and pollutes rivers and lakes.</p>']
      ],
      quiz: [
        ['Which is a macronutrient?', ['Iron', 'Zinc', 'Nitrogen', 'Boron'], 2, 'N, P and K are needed in large amounts.'],
        ['Yellowing of older leaves and stunted growth are signs of lack of…', ['nitrogen', 'potassium', 'boron', 'calcium'], 0, 'Nitrogen is needed for leaf growth.'],
        ['An acidic soil is corrected by adding…', ['sulphur', 'ammonium sulphate', 'lime', 'sand'], 2, 'Lime neutralises soil acidity.'],
        ['The percentage of nitrogen in urea, CO(NH₂)₂ (N = 14, C = 12, O = 16, H = 1), is about…', ['23%', '28%', '47%', '60%'], 2, '28 ÷ 60 × 100 = 46.7%.'],
        ['An NPK fertiliser is an example of…', ['a straight fertiliser', 'a compound fertiliser', 'a manure', 'a trace element'], 1, 'It supplies several nutrients.'],
        ['Breaking of rocks by roots and animals is…', ['physical weathering', 'chemical weathering', 'biological weathering', 'leaching'], 2, 'Living things cause biological weathering.']
      ]
    },
    {
      id: 'pollution', icon: 'factory', title: 'Pollution', sims: [],
      blurb: 'Land, water, air and noise pollution, global warming and the ozone layer.',
      notes: [
        ['Pollution and pollutants', '<p><b>Pollution</b> is the release of harmful substances or energy into the environment. A <b>pollutant</b> is the substance or energy that causes it. Pollutants can be <b>biodegradable</b> (broken down by microorganisms, such as food waste) or <b>non-biodegradable</b> (plastics, metals, glass).</p>'],
        ['Land and water pollution', '<p><b>Land pollution:</b> solid waste, plastics, scrap metal, electronic waste, pesticides and spilled oil. Control: <b>reduce, reuse, recycle</b>; proper landfills and incineration; banning single-use plastic bags (Tanzania banned them in 2019).</p><p><b>Water pollution:</b> raw sewage, industrial effluents, oil spills, and fertilisers washed into lakes, which cause <b>eutrophication</b>: algae grow rapidly, then die and decay, using up oxygen so fish die. <b>Mercury</b> used in small-scale gold mining poisons rivers and the people who eat the fish. Control: treat sewage and effluents, use fertiliser carefully, and use safer gold-processing methods.</p>'],
        ['Air and noise pollution', '<ul><li><b>Carbon monoxide</b> from incomplete burning in vehicles and charcoal stoves: poisonous, it combines with haemoglobin and stops blood carrying oxygen.</li><li><b>Sulphur dioxide and nitrogen oxides</b> from burning fuels: cause <b>acid rain</b>, which damages buildings, plants and aquatic life.</li><li><b>Smoke and particulates</b>: breathing diseases.</li><li><b>CFCs</b>: damage the ozone layer.</li></ul><p>Control: catalytic converters, scrubbers in factory chimneys, clean fuels, tree planting.</p><p><b>Noise pollution</b> from traffic, machines and loud music causes stress and hearing loss; control by ear protection, silencers and zoning.</p>'],
        ['Global warming and the ozone layer', '<p><b>Global warming</b> is the rise in the Earth’s average temperature caused by extra <b>greenhouse gases</b>: carbon dioxide (burning fuels, cutting forests), methane (livestock, rice fields, rubbish dumps), nitrous oxide and CFCs. Effects include melting glaciers, rising sea levels, droughts and floods.</p><p>The <b>ozone layer</b> in the stratosphere absorbs harmful <b>ultraviolet</b> radiation, which causes skin cancer and eye cataracts. CFCs from old fridges and aerosols release chlorine atoms that destroy ozone. The Montreal Protocol phased out CFCs.</p><p><b>Environmental conservation</b> means using resources wisely: planting trees, saving energy, using renewable sources, and protecting water catchments.</p>']
      ],
      quiz: [
        ['Which pollutant combines with haemoglobin and stops blood carrying oxygen?', ['Carbon dioxide', 'Carbon monoxide', 'Sulphur dioxide', 'Nitrogen'], 1, 'CO binds strongly to haemoglobin.'],
        ['Acid rain is caused mainly by…', ['CO₂ and CH₄', 'SO₂ and nitrogen oxides', 'O₃ and CFCs', 'N₂ and O₂'], 1, 'They dissolve in rain to form acids.'],
        ['Eutrophication of lakes is caused mainly by…', ['oil spills', 'fertilisers and sewage', 'plastics', 'noise'], 1, 'Extra nutrients make algae grow rapidly.'],
        ['The ozone layer protects living things from…', ['infrared radiation', 'ultraviolet radiation', 'radio waves', 'acid rain'], 1, 'Ozone absorbs UV.'],
        ['Which gas is NOT a greenhouse gas?', ['Carbon dioxide', 'Methane', 'Nitrogen', 'Water vapour'], 2, 'Nitrogen does not absorb infrared radiation.'],
        ['Mercury pollution in Tanzanian rivers comes mainly from…', ['cement factories', 'small-scale gold processing', 'cattle', 'fishing boats'], 1, 'Mercury is used to collect gold.']
      ]
    },
    {
      id: 'qualitative', icon: 'search', title: 'Qualitative analysis', sims: ['qualanalysis', 'heatsalts'],
      blurb: 'Identifying the ions in an unknown salt by careful tests and observations.',
      notes: [
        ['The concept and the report', '<p><b>Qualitative analysis</b> identifies <b>which</b> ions are present in a substance, not how much. Each test is recorded in three columns:</p><table class="ptab"><thead><tr><th>Experiment</th><th>Observation</th><th>Inference</th></tr></thead><tbody><tr><td>What you did</td><td>What you saw, heard or smelt</td><td>What it tells you</td></tr></tbody></table><p>Observations must be exact: “white precipitate, soluble in excess” rather than “it reacted”.</p>'],
        ['Preliminary tests', '<ul><li><b>Appearance:</b> blue or green suggests Cu<sup>2+</sup>; pale green Fe<sup>2+</sup>; yellow-brown Fe<sup>3+</sup>; white suggests Zn, Al, Pb, Ca, Mg, Na or NH<sub>4</sub><sup>+</sup> salts.</li><li><b>Action of heat:</b> gases and residue colours (see the heating practical).</li><li><b>Solubility</b> in water and in dilute acid.</li><li><b>Flame test</b> on a clean nichrome wire: Na<sup>+</sup> golden yellow, K<sup>+</sup> lilac, Ca<sup>2+</sup> brick red, Cu<sup>2+</sup> blue-green.</li></ul>'],
        ['Tests for cations', '<p>Add sodium hydroxide solution, then ammonia solution, drop by drop, then in excess.</p><ul><li><b>Zn<sup>2+</sup>:</b> white precipitate, soluble in excess NaOH <b>and</b> excess NH<sub>3</sub>.</li><li><b>Al<sup>3+</sup> and Pb<sup>2+</sup>:</b> white precipitate, soluble in excess NaOH, insoluble in excess NH<sub>3</sub>. (Pb<sup>2+</sup> also gives a yellow precipitate with KI.)</li><li><b>Ca<sup>2+</sup>:</b> white precipitate with NaOH, insoluble in excess; no precipitate with NH<sub>3</sub>.</li><li><b>Mg<sup>2+</sup>:</b> white precipitate, insoluble in excess of either.</li><li><b>Cu<sup>2+</sup>:</b> pale blue precipitate; insoluble in excess NaOH; dissolves in excess NH<sub>3</sub> to give a <b>deep blue</b> solution.</li><li><b>Fe<sup>2+</sup>:</b> dirty green precipitate. <b>Fe<sup>3+</sup>:</b> reddish-brown precipitate. Both insoluble in excess.</li><li><b>NH<sub>4</sub><sup>+</sup>:</b> no precipitate; warm with NaOH and ammonia gas turns damp red litmus blue.</li></ul>'],
        ['Tests for anions', '<ul><li><b>CO<sub>3</sub><sup>2−</sup>:</b> add dilute acid; effervescence; the gas turns limewater milky.</li><li><b>SO<sub>4</sub><sup>2−</sup>:</b> dilute HCl then BaCl<sub>2</sub>(aq): white precipitate.</li><li><b>Cl<sup>−</sup>:</b> dilute HNO<sub>3</sub> then AgNO<sub>3</sub>(aq): white precipitate.</li><li><b>NO<sub>3</sub><sup>−</sup>:</b> brown ring test; or warm with NaOH and aluminium foil (Devarda’s alloy): ammonia is given off.</li></ul>']
      ],
      quiz: [
        ['A white precipitate soluble in excess of both NaOH and NH₃ solutions shows…', ['Ca²⁺', 'Zn²⁺', 'Al³⁺', 'Mg²⁺'], 1, 'Only zinc hydroxide dissolves in both.'],
        ['A pale blue precipitate that dissolves in excess ammonia to give a deep blue solution shows…', ['Fe²⁺', 'Cu²⁺', 'Zn²⁺', 'Pb²⁺'], 1, 'A deep blue complex forms with ammonia.'],
        ['A reddish-brown precipitate with NaOH solution shows…', ['Fe²⁺', 'Fe³⁺', 'Cu²⁺', 'Al³⁺'], 1, 'Iron(III) hydroxide is reddish-brown.'],
        ['A compound gives a brick-red flame. It contains…', ['sodium', 'potassium', 'calcium', 'copper'], 2, 'Calcium gives a brick-red flame.'],
        ['A solution gives a white precipitate with acidified barium chloride. It contains…', ['Cl⁻', 'SO₄²⁻', 'NO₃⁻', 'CO₃²⁻'], 1, 'Barium sulphate is white and insoluble.'],
        ['In a qualitative analysis report, the column after “Observation” is…', ['Result', 'Inference', 'Method', 'Conclusion only'], 1, 'Experiment, Observation, Inference.']
      ]
    }
  ]
});
