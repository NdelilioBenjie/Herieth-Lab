/* Herieth-Lab lesson content: Chemistry Form One and Form Two (follows the TIE 2023 syllabus chapter order) */
window.HL = window.HL || {};
HL.courses = HL.courses || [];
HL.courses.push({
  id: 'chem1', subject: 'chem', form: 1, title: 'Chemistry, Form One',
  topics: [
    {
      id: 'intro', icon: 'flask', title: 'Introduction to Chemistry', sims: [],
      blurb: 'What chemistry is, how it links to other subjects and where it is used.',
      notes: [
        ['Concept of chemistry', '<p><b>Chemistry</b> is the branch of science that studies the <b>composition, structure and properties of matter</b> and the changes matter undergoes. A person who studies it is a chemist.</p>'],
        ['Chemistry and other disciplines', '<ul><li><b>Biology:</b> digestion, respiration and photosynthesis are chemical reactions.</li><li><b>Physics:</b> energy changes, electricity and the structure of the atom.</li><li><b>Geography and geology:</b> rocks, minerals, soil and water.</li><li><b>Agriculture:</b> fertilisers, pesticides and soil pH.</li><li><b>Medicine and pharmacy:</b> making and testing drugs.</li><li><b>Mathematics:</b> calculations, ratios and graphs.</li></ul>'],
        ['Chemistry in modern society', '<ul><li><b>Agriculture:</b> fertilisers, insecticides, animal medicines.</li><li><b>Food:</b> preservation, processing, flavouring.</li><li><b>Health:</b> medicines, vaccines, disinfectants, water treatment.</li><li><b>Industry:</b> cement, glass, plastics, paints, soap, textiles.</li><li><b>Transport and energy:</b> petrol, diesel, lubricants, batteries.</li><li><b>Home:</b> cooking, cleaning, cosmetics.</li></ul>'],
        ['Careers and care', '<p>Chemistry leads to careers such as doctor, pharmacist, nurse, engineer, laboratory technician, teacher and agricultural officer.</p><p>Chemicals can also harm people and the environment when misused, so they must be handled, stored and disposed of responsibly.</p>']
      ],
      quiz: [
        ['Chemistry is the study of…', ['forces and motion', 'the composition, structure and properties of matter and its changes', 'living organisms', 'the Earth’s surface'], 1, 'This is the definition of chemistry.'],
        ['Which is an application of chemistry in agriculture?', ['Making fertilisers', 'Building bridges', 'Weather forecasting', 'Drawing maps'], 0, 'Fertilisers are manufactured chemicals that supply plant nutrients.'],
        ['Photosynthesis links chemistry most directly with…', ['geography', 'biology', 'history', 'mathematics'], 1, 'It is a chemical reaction inside living plants.'],
        ['Which product is made by the chemical industry?', ['Timber', 'Cement', 'Sand', 'Wool'], 1, 'Cement is manufactured by chemical processes.'],
        ['Chlorine is added to tap water in order to…', ['make it taste sweet', 'kill germs', 'colour it', 'make it boil faster'], 1, 'Water treatment is an application of chemistry in health.'],
        ['Which career depends most directly on chemistry?', ['Pharmacist', 'Pilot', 'Lawyer', 'Accountant'], 0, 'Pharmacists prepare and dispense medicines.']
      ]
    },
    {
      id: 'lab', icon: 'shield', title: 'Laboratory techniques and safety', sims: ['apparatus', 'bunsen'],
      blurb: 'Laboratory rules, first aid, warning signs and common apparatus.',
      notes: [
        ['Laboratory rules', '<ul><li>Enter the laboratory only with a teacher’s permission.</li><li>Do not eat, drink, taste or smell chemicals directly.</li><li>Read labels before using any chemical.</li><li>Wear protective gear: lab coat, goggles, gloves, closed shoes.</li><li>Point a test tube being heated away from yourself and others.</li><li>Report every accident and breakage at once.</li><li>Wash your hands and clean your bench when you finish.</li></ul>'],
        ['First aid', '<p><b>First aid</b> is the immediate help given to a sick or injured person before medical care arrives. A first-aid kit holds items such as sterile gauze and bandages, plasters, cotton wool, antiseptic, scissors, gloves, safety pins and a pain reliever.</p><ul><li><b>Burns and scalds:</b> cool under running water.</li><li><b>Chemical on skin or in the eye:</b> wash with plenty of running water.</li><li><b>Cuts:</b> clean, apply pressure, cover.</li></ul>'],
        ['Warning signs', '<ul><li><b>Flammable:</b> catches fire easily (ethanol, petrol). Keep away from flames.</li><li><b>Corrosive:</b> destroys skin and materials (concentrated acids and alkalis).</li><li><b>Toxic:</b> poisonous if swallowed, breathed in or absorbed.</li><li><b>Harmful / irritant:</b> may cause illness or irritation.</li><li><b>Oxidising:</b> helps other substances burn.</li><li><b>Explosive:</b> may explode if heated or struck.</li></ul>'],
        ['Apparatus', '<ul><li><b>Measuring volume:</b> measuring cylinder, burette, pipette, volumetric flask.</li><li><b>Measuring mass, temperature, time:</b> balance, thermometer, stopwatch.</li><li><b>Holding and mixing:</b> beaker, test tube, conical flask, round-bottomed flask.</li><li><b>Heating:</b> Bunsen burner, spirit lamp, tripod, wire gauze, crucible, evaporating dish.</li><li><b>Separating:</b> filter funnel, separating funnel, condenser.</li></ul>']
      ],
      quiz: [
        ['Which is a correct laboratory rule?', ['Taste chemicals to identify them', 'Report all accidents to the teacher', 'Run when carrying glassware', 'Pour leftover chemicals back into the bottle'], 1, 'Every accident must be reported immediately.'],
        ['Acid splashes on your hand. You should first…', ['wipe it with a cloth', 'wash it with plenty of running water', 'cover it with a bandage', 'ignore it'], 1, 'Water dilutes and removes the chemical.'],
        ['A bottle of concentrated sulphuric acid should carry which sign?', ['Flammable', 'Corrosive', 'Explosive', 'Oxidising'], 1, 'Concentrated acids destroy skin and materials.'],
        ['Which apparatus measures the volume of a liquid most accurately?', ['Beaker', 'Test tube', 'Burette', 'Evaporating dish'], 2, 'A burette reads to 0.1 cm³ or better.'],
        ['When heating a liquid in a test tube, the mouth should point…', ['towards your face', 'towards your neighbour', 'away from everyone', 'straight down'], 2, 'Hot liquid can shoot out of the tube.'],
        ['Ethanol should be kept away from flames because it is…', ['corrosive', 'toxic', 'flammable', 'radioactive'], 2, 'Flammable liquids catch fire easily.']
      ]
    },
    {
      id: 'fire', icon: 'flame', title: 'Fire, firefighting and flames', sims: ['bunsen', 'fire'],
      blurb: 'What fire needs, how to put it out, and the two kinds of flame.',
      notes: [
        ['Fire and the fire triangle', '<p><b>Fire</b> is the rapid burning (combustion) of a substance, giving out heat and light. It needs three things, shown as the <b>fire triangle</b>:</p><ul><li><b>Fuel</b> (something to burn)</li><li><b>Oxygen</b> (air)</li><li><b>Heat</b> (to reach ignition temperature)</li></ul><p>Remove any one and the fire goes out: <b>starving</b> (fuel), <b>smothering</b> (oxygen) or <b>cooling</b> (heat).</p>'],
        ['Classes of fire and extinguishers', '<ul><li><b>Class A</b>, ordinary solids (wood, paper, cloth): water, foam, dry powder.</li><li><b>Class B</b>, flammable liquids (petrol, kerosene): foam, carbon dioxide, dry powder, sand. <b>Never water.</b></li><li><b>Class C</b>, flammable gases: dry powder, and shut off the gas.</li><li><b>Class D</b>, burning metals: special dry powder or dry sand.</li><li><b>Class E</b>, electrical equipment: carbon dioxide or dry powder. Switch off the mains.</li><li><b>Class F</b>, cooking oils and fats: fire blanket or wet-chemical extinguisher.</li></ul><p>Water is unsuitable for Class B fires because the burning liquid floats and spreads, and for electrical fires because it conducts electricity.</p>'],
        ['Flames', '<p>A <b>flame</b> is a zone of burning gas that gives out heat and light.</p><ul><li><b>Luminous flame</b> (air hole closed): yellow, large, unsteady, sooty, not very hot. Combustion is incomplete.</li><li><b>Non-luminous flame</b> (air hole open): blue, small, steady, no soot, very hot. Combustion is complete.</li></ul><p>The non-luminous flame is used for heating in the laboratory.</p>'],
        ['Lighting a Bunsen burner', '<ol><li>Connect the burner to the gas supply and close the air hole.</li><li>Strike a match and hold it at the top of the chimney.</li><li>Open the gas tap. A luminous flame appears.</li><li>Open the air hole gradually to get a non-luminous flame.</li><li>To put it out, close the gas tap.</li></ol>']
      ],
      quiz: [
        ['The three sides of the fire triangle are…', ['fuel, oxygen and heat', 'fuel, water and heat', 'oxygen, smoke and fuel', 'heat, light and smoke'], 0, 'All three must be present for burning.'],
        ['Covering a burning pan with a fire blanket works by…', ['cooling', 'starving', 'smothering', 'diluting'], 2, 'It cuts off the oxygen supply.'],
        ['Why should water not be used on a petrol fire?', ['Water burns', 'Petrol floats on water, so the fire spreads', 'Water is too cold', 'Petrol dissolves in water'], 1, 'Petrol is less dense than water and keeps burning on top.'],
        ['Which extinguisher is suitable for an electrical fire?', ['Water', 'Foam', 'Carbon dioxide', 'Wet sand'], 2, 'Carbon dioxide does not conduct electricity.'],
        ['A non-luminous flame is…', ['yellow and sooty', 'blue and very hot', 'large and unsteady', 'produced with the air hole closed'], 1, 'With the air hole open, the gas burns completely.'],
        ['A luminous flame leaves soot because…', ['combustion is incomplete', 'there is too much air', 'the flame is too hot', 'the gas is impure'], 0, 'Unburnt carbon particles are left when air is limited.']
      ]
    },
    {
      id: 'matter', icon: 'drop', title: 'Matter', sims: ['states'],
      blurb: 'States of matter, the particle theory, and physical and chemical changes.',
      notes: [
        ['States of matter', '<p><b>Matter</b> is anything that has mass and occupies space.</p><ul><li><b>Solid:</b> fixed shape and volume. Particles closely packed, vibrating in fixed positions.</li><li><b>Liquid:</b> fixed volume, takes the shape of its container. Particles close together but free to slide.</li><li><b>Gas:</b> no fixed shape or volume, easily compressed. Particles far apart and moving fast.</li></ul>'],
        ['Particle (kinetic) theory', '<p>All matter is made of tiny particles that are always moving. Heating gives them more energy, so they move faster. Evidence: <b>diffusion</b> (a smell spreading) and <b>Brownian motion</b> (smoke or pollen particles jiggling at random).</p>'],
        ['Changes of state', '<ul><li>Melting: solid → liquid. Freezing: liquid → solid.</li><li>Evaporation / boiling: liquid → gas. Condensation: gas → liquid.</li><li>Sublimation: solid → gas directly (iodine, ammonium chloride). Deposition: gas → solid.</li></ul><p>During melting and boiling the <b>temperature stays constant</b>: the heat is used to separate the particles.</p>'],
        ['Physical and chemical changes', '<ul><li><b>Physical change:</b> no new substance, easily reversed, mass of the substance unchanged. Examples: melting ice, dissolving salt.</li><li><b>Chemical change:</b> a new substance forms, not easily reversed, usually with a heat change. Examples: burning, rusting, souring of milk.</li></ul><p><b>Rusting</b> of iron needs both <b>water and oxygen</b>. It is prevented by painting, oiling, galvanising or plating.</p>']
      ],
      quiz: [
        ['Which state has a fixed volume but no fixed shape?', ['Solid', 'Liquid', 'Gas', 'None'], 1, 'A liquid takes the shape of its container.'],
        ['The change from solid directly to gas is called…', ['melting', 'evaporation', 'sublimation', 'condensation'], 2, 'Iodine is a common example.'],
        ['While ice is melting, its temperature…', ['rises steadily', 'falls', 'stays constant', 'rises then falls'], 2, 'The heat is used to break the particles free.'],
        ['Which is a chemical change?', ['Melting candle wax', 'Dissolving sugar in tea', 'Rusting of an iron nail', 'Boiling water'], 2, 'Rust is a new substance.'],
        ['Brownian motion is evidence that…', ['particles are always moving', 'gases are heavy', 'liquids cannot flow', 'solids have no particles'], 0, 'Visible specks are knocked about by moving, invisible particles.'],
        ['For iron to rust, it needs…', ['water only', 'oxygen only', 'both water and oxygen', 'neither'], 2, 'Remove either one and rusting stops.']
      ]
    },
    {
      id: 'mixtures', icon: 'tube', title: 'Elements, compounds and mixtures', sims: ['separate'],
      blurb: 'Elements and their symbols, compounds, mixtures and how to separate them.',
      notes: [
        ['Elements and symbols', '<p>An <b>element</b> is a pure substance that cannot be split into simpler substances by chemical means. Each has a <b>chemical symbol</b>: one capital letter, or a capital followed by a small letter.</p><p>Some symbols come from Latin names: sodium Na (natrium), potassium K (kalium), iron Fe (ferrum), copper Cu (cuprum), silver Ag (argentum), gold Au (aurum), lead Pb (plumbum), mercury Hg (hydrargyrum).</p><p>Elements are metals (iron, copper) or non-metals (oxygen, sulphur).</p>'],
        ['Compounds and mixtures', '<p>A <b>compound</b> is formed when two or more elements combine chemically in a fixed ratio (water, common salt). A <b>mixture</b> is two or more substances physically combined in any ratio (air, sea water).</p><ul><li>A mixture can be separated by physical means; a compound cannot.</li><li>A mixture keeps the properties of its parts; a compound has new properties.</li><li>Making a compound involves an energy change; making a mixture usually does not.</li></ul>'],
        ['Solutions, suspensions and emulsions', '<p>A <b>solution</b> is a uniform mixture of a <b>solute</b> dissolved in a <b>solvent</b>. It may be unsaturated, <b>saturated</b> (holds as much solute as it can at that temperature) or supersaturated.</p><p>A <b>suspension</b> has solid particles that settle on standing (muddy water). An <b>emulsion</b> is a mixture of liquids that do not dissolve in each other (milk).</p>'],
        ['Separating mixtures', '<ul><li><b>Decantation:</b> pour liquid off a settled solid.</li><li><b>Filtration:</b> insoluble solid from a liquid.</li><li><b>Evaporation:</b> dissolved solid from a solution.</li><li><b>Simple distillation:</b> solvent from a solution.</li><li><b>Fractional distillation:</b> miscible liquids with different boiling points.</li><li><b>Separating funnel:</b> immiscible liquids.</li><li><b>Sublimation:</b> a solid that sublimes from one that does not.</li><li><b>Chromatography:</b> dissolved coloured substances.</li><li><b>Magnetic separation:</b> magnetic from non-magnetic solids.</li><li><b>Solvent extraction:</b> for example, oil from groundnuts.</li></ul>']
      ],
      quiz: [
        ['The chemical symbol for sodium is…', ['S', 'So', 'Na', 'Sd'], 2, 'From its Latin name, natrium.'],
        ['Which is a compound?', ['Air', 'Water', 'Oxygen', 'Sea water'], 1, 'Water is hydrogen and oxygen chemically combined.'],
        ['Sand is best separated from water by…', ['evaporation', 'filtration', 'chromatography', 'sublimation'], 1, 'Sand is an insoluble solid.'],
        ['Kerosene and water are separated using…', ['a separating funnel', 'a magnet', 'filter paper', 'chromatography paper'], 0, 'They are immiscible liquids.'],
        ['The dyes in ink are separated by…', ['decantation', 'distillation', 'chromatography', 'filtration'], 2, 'Each dye travels a different distance up the paper.'],
        ['A solution that cannot dissolve any more solute at that temperature is…', ['dilute', 'unsaturated', 'saturated', 'a suspension'], 2, 'That is the definition of a saturated solution.']
      ]
    }
  ]
});

HL.courses.push({
  id: 'chem2', subject: 'chem', form: 2, title: 'Chemistry, Form Two',
  topics: [
    {
      id: 'atom', icon: 'atom', title: 'Atomic structure', sims: ['atom'],
      blurb: 'Inside the atom: protons, neutrons, electrons and how they are arranged.',
      notes: [
        ['Development of the atomic theory', '<ul><li><b>Dalton:</b> matter is made of tiny, solid, indivisible spheres called atoms.</li><li><b>Thomson:</b> discovered the electron. “Plum pudding” model: negative electrons in a positive sphere.</li><li><b>Rutherford:</b> a tiny, dense, positive <b>nucleus</b> with electrons around it.</li><li><b>Bohr:</b> electrons move in fixed <b>shells</b> (energy levels) around the nucleus.</li></ul>'],
        ['Subatomic particles', '<ul><li><b>Proton:</b> charge +1, relative mass 1, in the nucleus.</li><li><b>Neutron:</b> no charge, relative mass 1, in the nucleus.</li><li><b>Electron:</b> charge −1, mass about 1/1840, in the shells.</li></ul><p>An atom is neutral because it has equal numbers of protons and electrons.</p>'],
        ['Atomic number and mass number', '<p class="formula">Atomic number (Z) = number of protons</p><p class="formula">Mass number (A) = protons + neutrons</p><p>Number of neutrons = A − Z. Sodium, <sup>23</sup><sub>11</sub>Na, has 11 protons, 11 electrons and 12 neutrons.</p><p><b>Isotopes</b> are atoms of the same element with different numbers of neutrons, such as carbon-12 and carbon-14.</p>'],
        ['Electronic arrangement', '<p>For the first 20 elements the shells fill in the order <b>2 : 8 : 8 : 2</b>.</p><p>Examples: carbon 2:4, sodium 2:8:1, chlorine 2:8:7, calcium 2:8:8:2.</p><p>The electrons in the outermost shell are the <b>valence electrons</b>; they decide how the element reacts.</p>']
      ],
      quiz: [
        ['Which particle has a negative charge?', ['Proton', 'Neutron', 'Electron', 'Nucleus'], 2, 'Electrons carry a charge of −1.'],
        ['The atomic number of an element is its number of…', ['neutrons', 'protons', 'protons plus neutrons', 'shells'], 1, 'Z = number of protons.'],
        ['An atom has 17 protons and 18 neutrons. Its mass number is…', ['1', '17', '18', '35'], 3, 'A = 17 + 18 = 35.'],
        ['The electronic arrangement of magnesium (Z = 12) is…', ['2:10', '2:8:2', '8:4', '2:2:8'], 1, 'Shells fill 2, then 8, then the remaining 2.'],
        ['Isotopes of an element differ in their number of…', ['protons', 'electrons', 'neutrons', 'shells'], 2, 'Same protons, different neutrons.'],
        ['Who proposed that an atom has a small, dense, positive nucleus?', ['Dalton', 'Thomson', 'Rutherford', 'Mendeleev'], 2, 'Rutherford’s model introduced the nucleus.']
      ]
    },
    {
      id: 'periodic', icon: 'table', title: 'Periodic classification', sims: ['atom'],
      blurb: 'How the elements are arranged and the patterns in their properties.',
      notes: [
        ['Development of the periodic table', '<ul><li><b>Döbereiner:</b> grouped similar elements in threes (triads).</li><li><b>Newlands:</b> law of octaves; every eighth element was similar when arranged by atomic mass.</li><li><b>Mendeleev:</b> arranged elements by atomic mass, left gaps and predicted undiscovered elements.</li><li><b>Moseley:</b> arranged by atomic number, giving the <b>modern periodic law</b>: the properties of elements are a periodic function of their atomic numbers.</li></ul>'],
        ['Groups and periods', '<p><b>Groups</b> are the vertical columns. <b>Periods</b> are the horizontal rows.</p><p class="formula">Group number = number of outer-shell electrons</p><p class="formula">Period number = number of occupied shells</p><p>Sodium, 2:8:1, is in Group I, Period 3. Named groups: I alkali metals, II alkaline earth metals, VII halogens, VIII (0) noble gases.</p>'],
        ['Trends across a period', '<p>From left to right:</p><ul><li>atomic size <b>decreases</b>;</li><li>metallic character decreases, non-metallic character increases;</li><li>elements change from metals to metalloids to non-metals;</li><li>electronegativity and ionisation energy increase.</li></ul>'],
        ['Trends down a group', '<ul><li>Atomic size <b>increases</b> (more shells).</li><li>Metallic character increases.</li><li><b>Group I</b> metals become <b>more</b> reactive down the group; melting points fall.</li><li><b>Group VII</b> halogens become <b>less</b> reactive down the group; they change from gas (F, Cl) to liquid (Br) to solid (I).</li></ul><p>Noble gases have full outer shells, so they are unreactive.</p>']
      ],
      quiz: [
        ['The modern periodic table arranges elements in order of increasing…', ['atomic mass', 'atomic number', 'density', 'number of neutrons'], 1, 'Moseley’s arrangement by atomic number.'],
        ['An element with electron arrangement 2:8:3 is in…', ['Group II, Period 3', 'Group III, Period 3', 'Group III, Period 2', 'Group V, Period 3'], 1, 'Three outer electrons and three shells.'],
        ['Elements in the same group have the same number of…', ['shells', 'protons', 'outer-shell electrons', 'neutrons'], 2, 'That is why they have similar chemical properties.'],
        ['Across a period from left to right, atomic size…', ['increases', 'decreases', 'stays the same', 'doubles'], 1, 'More protons pull the same shell closer.'],
        ['Who left gaps in his table for undiscovered elements?', ['Newlands', 'Döbereiner', 'Mendeleev', 'Bohr'], 2, 'Mendeleev predicted their properties.'],
        ['Down Group I, the reactivity of the metals…', ['increases', 'decreases', 'stays the same', 'stops'], 0, 'The outer electron is further from the nucleus and is lost more easily.']
      ]
    },
    {
      id: 'bonding', icon: 'bond', title: 'Chemical bonding, formula and nomenclature', sims: ['formula'],
      blurb: 'How atoms join, and how to write and name what they form.',
      notes: [
        ['Why atoms bond', '<p>Atoms combine to get a stable, full outer shell like a noble gas. A <b>chemical bond</b> is the force holding atoms together.</p><ul><li><b>Electrovalent (ionic) bond:</b> electrons are <b>transferred</b> from a metal to a non-metal, forming oppositely charged ions that attract. Example: Na (2:8:1) gives one electron to Cl (2:8:7), forming Na<sup>+</sup>Cl<sup>−</sup>.</li><li><b>Covalent bond:</b> electrons are <b>shared</b> between non-metal atoms. Examples: H<sub>2</sub>, H<sub>2</sub>O, CO<sub>2</sub>, CH<sub>4</sub>.</li></ul>'],
        ['Properties of compounds', '<ul><li><b>Ionic:</b> crystalline solids, high melting points, usually soluble in water, conduct electricity when molten or dissolved.</li><li><b>Covalent:</b> often gases or liquids, low melting points, usually insoluble in water, do not conduct electricity.</li></ul>'],
        ['Valency, radicals and oxidation state', '<p><b>Valency</b> is the combining power of an element: the number of electrons an atom loses, gains or shares.</p><p>A <b>radical</b> is a group of atoms that acts as one unit: ammonium NH<sub>4</sub><sup>+</sup>, hydroxide OH<sup>−</sup>, nitrate NO<sub>3</sub><sup>−</sup>, sulphate SO<sub>4</sub><sup>2−</sup>, carbonate CO<sub>3</sub><sup>2−</sup>, phosphate PO<sub>4</sub><sup>3−</sup>.</p><p>The <b>oxidation state</b> is the charge an atom would have in a compound. The oxidation states in a neutral compound add up to zero.</p>'],
        ['Formulae and naming', '<p>To write a formula, exchange the valencies and simplify: Al (3) and O (2) give Al<sub>2</sub>O<sub>3</sub>; Ca (2) and OH (1) give Ca(OH)<sub>2</sub>.</p><p>An <b>empirical formula</b> shows the simplest whole-number ratio of atoms; a <b>molecular formula</b> shows the actual numbers.</p><p><b>Naming binary compounds:</b> name the metal first, then the non-metal ending in <b>-ide</b>: sodium chloride, magnesium oxide. Use Roman numerals for metals with more than one valency: iron(III) chloride, copper(II) oxide.</p>']
      ],
      quiz: [
        ['An ionic bond is formed by…', ['sharing electrons', 'transferring electrons', 'sharing protons', 'losing neutrons'], 1, 'A metal atom gives electrons to a non-metal atom.'],
        ['Which compound is covalent?', ['Sodium chloride', 'Magnesium oxide', 'Water', 'Calcium chloride'], 2, 'Hydrogen and oxygen are both non-metals and share electrons.'],
        ['The formula of aluminium oxide is…', ['AlO', 'Al₂O₃', 'Al₃O₂', 'AlO₃'], 1, 'Exchange the valencies 3 and 2.'],
        ['The formula of calcium hydroxide is…', ['CaOH', 'Ca₂OH', 'Ca(OH)₂', 'CaOH₂'], 2, 'Calcium has valency 2 and hydroxide 1; the radical needs brackets.'],
        ['FeCl₃ is named…', ['iron chloride', 'iron(II) chloride', 'iron(III) chloride', 'iron trichlorine'], 2, 'Iron has valency 3 here.'],
        ['Ionic compounds conduct electricity when…', ['solid', 'molten or dissolved in water', 'cooled', 'powdered'], 1, 'Their ions are then free to move.']
      ]
    },
    {
      id: 'reactions', icon: 'beaker', title: 'Chemical reactions', sims: ['reactivity'],
      blurb: 'Writing equations and recognising the main types of reaction.',
      notes: [
        ['Chemical equations', '<p>A chemical reaction changes <b>reactants</b> into <b>products</b>. Signs of a reaction: colour change, gas given off, a precipitate, or a temperature change.</p><p>An equation must be <b>balanced</b> because matter is neither created nor destroyed (the law of conservation of mass).</p><ol><li>Write the word equation.</li><li>Write the correct formulae.</li><li>Balance the atoms on both sides using numbers in front of formulae.</li><li>Add state symbols: (s), (l), (g), (aq).</li></ol><p class="formula">2Mg(s) + O<sub>2</sub>(g) → 2MgO(s)</p>'],
        ['Combination and decomposition', '<p><b>Combination (synthesis):</b> two or more substances form one product. 2H<sub>2</sub> + O<sub>2</sub> → 2H<sub>2</sub>O.</p><p><b>Decomposition:</b> one compound breaks into simpler substances, usually on heating. CaCO<sub>3</sub> → CaO + CO<sub>2</sub> (used to make lime and cement).</p>'],
        ['Displacement and precipitation', '<p><b>Displacement:</b> a more reactive element pushes a less reactive one out of its compound. Fe + CuSO<sub>4</sub> → FeSO<sub>4</sub> + Cu. Reactive metals displace hydrogen from dilute acids: Zn + 2HCl → ZnCl<sub>2</sub> + H<sub>2</sub>.</p><p><b>Precipitation (double displacement):</b> two solutions exchange ions to form an insoluble solid. AgNO<sub>3</sub>(aq) + NaCl(aq) → AgCl(s) + NaNO<sub>3</sub>(aq).</p>'],
        ['Neutralisation and ionic equations', '<p><b>Neutralisation:</b> acid + base → salt + water. HCl + NaOH → NaCl + H<sub>2</sub>O.</p><p>An <b>ionic equation</b> shows only the ions that take part: H<sup>+</sup>(aq) + OH<sup>−</sup>(aq) → H<sub>2</sub>O(l). Ions that do not change are called spectator ions.</p><p>Reactivity series (most reactive first): K, Na, Ca, Mg, Al, Zn, Fe, Pb, (H), Cu, Ag, Au.</p>']
      ],
      quiz: [
        ['In a balanced equation, the number of atoms of each element is…', ['greater on the left', 'greater on the right', 'equal on both sides', 'always two'], 2, 'Mass is conserved.'],
        ['CaCO₃ → CaO + CO₂ is an example of…', ['combination', 'decomposition', 'displacement', 'neutralisation'], 1, 'One compound breaks down into two.'],
        ['Balance: __H₂ + O₂ → __H₂O. The missing numbers are…', ['1 and 1', '2 and 1', '2 and 2', '1 and 2'], 2, '2H₂ + O₂ → 2H₂O gives 4 H and 2 O on each side.'],
        ['Zinc reacts with dilute hydrochloric acid to give zinc chloride and…', ['oxygen', 'hydrogen', 'chlorine', 'water'], 1, 'Zn + 2HCl → ZnCl₂ + H₂.'],
        ['Which metal will NOT displace hydrogen from dilute acid?', ['Magnesium', 'Zinc', 'Iron', 'Copper'], 3, 'Copper is below hydrogen in the reactivity series.'],
        ['Mixing silver nitrate and sodium chloride solutions gives a white solid. This is…', ['a precipitation reaction', 'a decomposition reaction', 'a combination reaction', 'not a reaction'], 0, 'Insoluble silver chloride forms as a precipitate.']
      ]
    },
    {
      id: 'acids', icon: 'tube', title: 'Acids, bases and salts', sims: ['ph', 'titration'],
      blurb: 'Properties of acids and bases, indicators, pH, and making salts.',
      notes: [
        ['Acids and bases', '<p>An <b>acid</b> produces hydrogen ions, H<sup>+</sup>, in water. Acids taste sour, turn blue litmus red, and react with metals, carbonates and bases. Examples: hydrochloric HCl, sulphuric H<sub>2</sub>SO<sub>4</sub>, nitric HNO<sub>3</sub>; natural acids in lemons (citric) and vinegar (ethanoic).</p><p>A <b>base</b> neutralises an acid. A soluble base is an <b>alkali</b> and produces hydroxide ions, OH<sup>−</sup>. Alkalis feel soapy and turn red litmus blue. Examples: NaOH, KOH, Ca(OH)<sub>2</sub>, ammonia solution.</p>'],
        ['Indicators and pH', '<ul><li><b>Litmus:</b> red in acid, blue in alkali.</li><li><b>Phenolphthalein:</b> colourless in acid, pink in alkali.</li><li><b>Methyl orange:</b> red in acid, yellow in alkali.</li><li><b>Universal indicator:</b> a range of colours that gives the pH.</li></ul><p>The <b>pH scale</b> runs from 0 to 14: below 7 acidic, 7 neutral, above 7 alkaline. Strong acids and alkalis ionise completely; weak ones only partly.</p>'],
        ['Reactions of acids', '<p class="formula">acid + metal → salt + hydrogen</p><p class="formula">acid + base → salt + water</p><p class="formula">acid + carbonate → salt + water + carbon dioxide</p><p>Neutralisation is used to treat acidic soil with lime, to relieve indigestion with antacids, and to treat insect stings.</p>'],
        ['Salts', '<p>A <b>salt</b> forms when the hydrogen of an acid is replaced by a metal or ammonium ion. Hydrochloric acid gives chlorides, sulphuric acid gives sulphates, nitric acid gives nitrates.</p><p><b>Solubility:</b> all sodium, potassium, ammonium salts and all nitrates are soluble. Most chlorides are soluble (not silver or lead). Most sulphates are soluble (not barium, lead; calcium only slightly). Most carbonates are insoluble.</p><p><b>Preparation:</b> soluble salts by neutralisation or by reacting acid with excess metal, oxide or carbonate, then crystallising; insoluble salts by precipitation.</p><p><b>Action of heat:</b> most carbonates give the oxide and carbon dioxide; hydrated salts lose water of crystallisation; ammonium chloride sublimes.</p>']
      ],
      quiz: [
        ['An acid turns…', ['red litmus blue', 'blue litmus red', 'phenolphthalein pink', 'methyl orange yellow'], 1, 'Acids turn blue litmus red.'],
        ['A solution with pH 12 is…', ['strongly acidic', 'weakly acidic', 'neutral', 'strongly alkaline'], 3, 'Values well above 7 are strongly alkaline.'],
        ['acid + base → ?', ['salt + hydrogen', 'salt + water', 'salt + carbon dioxide', 'water only'], 1, 'This is neutralisation.'],
        ['Which gas is produced when an acid reacts with a carbonate?', ['Hydrogen', 'Oxygen', 'Carbon dioxide', 'Chlorine'], 2, 'acid + carbonate → salt + water + carbon dioxide.'],
        ['Phenolphthalein in sodium hydroxide solution is…', ['colourless', 'pink', 'yellow', 'red-orange'], 1, 'It turns pink in alkali.'],
        ['Sulphuric acid forms salts called…', ['chlorides', 'nitrates', 'sulphates', 'carbonates'], 2, 'For example, zinc sulphate.'],
        ['Which salt is insoluble in water?', ['Sodium chloride', 'Potassium nitrate', 'Silver chloride', 'Ammonium sulphate'], 2, 'Silver chloride forms a white precipitate.']
      ]
    }
  ]
});
