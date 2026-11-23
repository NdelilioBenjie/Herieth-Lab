/* Herieth-Lab lesson content: Physics Form One and Form Two (follows the TIE 2023 syllabus chapter order) */
window.HL = window.HL || {};
HL.courses = HL.courses || [];
HL.courses.push({
  id: 'phy1', subject: 'phy', form: 1, title: 'Physics, Form One',
  topics: [
    {
      id: 'intro', icon: 'pendulum', title: 'Introduction to Physics', sims: ['pendulum'],
      blurb: 'What physics studies, why it matters, and how physicists investigate.',
      notes: [
        ['What physics is', '<p>Physics is the branch of science that studies <b>matter</b>, <b>energy</b> and the way they interact. It asks how and why things move, heat up, light up, attract or repel.</p><p>Main branches you will meet: mechanics, heat, light (optics), sound and waves, electricity and magnetism, and modern (atomic and nuclear) physics.</p>'],
        ['Physics and society', '<ul><li><b>Home:</b> cookers, irons, fridges, lamps and locks all apply physics.</li><li><b>Transport:</b> bicycles, cars, ships and aeroplanes rely on forces, energy and pressure.</li><li><b>Communication:</b> radio, phones, television and the internet use waves and electricity.</li><li><b>Health:</b> thermometers, X-rays, ultrasound and microscopes.</li><li><b>Energy:</b> hydroelectric, solar, wind and geothermal power.</li></ul><p>Physics also supports other subjects: chemistry, biology, geography, agriculture and engineering.</p>'],
        ['Theories, laws and principles', '<p>A <b>law</b> states what always happens under given conditions (for example, Hooke’s law). A <b>principle</b> is a general rule used to explain how things work (Archimedes’ principle). A <b>theory</b> is a well-tested explanation of why it happens (the kinetic theory of matter).</p>'],
        ['The scientific method', '<ol><li>Identify the problem.</li><li>Ask a question and suggest a <b>hypothesis</b>.</li><li>Plan and carry out an experiment, changing one variable at a time.</li><li>Collect and record data.</li><li>Analyse and interpret the data.</li><li>Draw a conclusion and report it.</li></ol><p>Try it in the practical: does the period of a pendulum depend on its length?</p>']
      ],
      quiz: [
        ['Physics is best described as the study of…', ['matter, energy and how they interact', 'living things and their environment', 'the composition of substances', 'rocks and landforms'], 0, 'Physics deals with matter and energy and the interactions between them.'],
        ['Which branch of physics deals with motion and forces?', ['Optics', 'Mechanics', 'Electricity', 'Heat'], 1, 'Mechanics is the study of forces and motion.'],
        ['In an investigation, a hypothesis is…', ['the final conclusion', 'a table of results', 'a suggested answer that can be tested', 'a piece of apparatus'], 2, 'A hypothesis is a testable prediction made before the experiment.'],
        ['Which step comes straight after collecting data?', ['Stating the problem', 'Analysing and interpreting the data', 'Forming a hypothesis', 'Choosing apparatus'], 1, 'Data is analysed and interpreted before a conclusion is drawn.'],
        ['Which of these is a direct application of physics in communication?', ['Fertiliser', 'Vaccines', 'Mobile phones', 'Cement'], 2, 'Phones use electricity and electromagnetic waves.'],
        ['In a fair test of how length affects a pendulum’s period, you should…', ['change length and mass together', 'change only the length', 'change nothing', 'change the stopwatch each time'], 1, 'Only one variable is changed at a time so its effect can be seen.']
      ]
    },
    {
      id: 'measurement', icon: 'ruler', title: 'Measurement', sims: ['caliper', 'density', 'pendulum'],
      blurb: 'Physical quantities, SI units and the instruments used to measure them.',
      notes: [
        ['Physical quantities', '<p>A <b>physical quantity</b> is anything that can be measured. It has a number and a unit, for example 2.5 m.</p><p><b>Fundamental quantities</b> and their SI units:</p><ul><li>Length: metre (m)</li><li>Mass: kilogram (kg)</li><li>Time: second (s)</li><li>Temperature: kelvin (K)</li><li>Electric current: ampere (A)</li><li>Amount of substance: mole (mol)</li><li>Luminous intensity: candela (cd)</li></ul><p><b>Derived quantities</b> are built from these: area (m²), volume (m³), density (kg/m³), speed (m/s), force (N).</p>'],
        ['Measuring length', '<ul><li><b>Metre rule / tape:</b> accurate to 0.1 cm. Place your eye directly above the mark to avoid <b>parallax error</b>.</li><li><b>Vernier caliper:</b> accurate to 0.01 cm. Used for diameters and depths.</li><li><b>Micrometer screw gauge:</b> accurate to 0.01 mm. Used for wire and thin sheets.</li></ul><p class="formula">Vernier reading = main scale reading + (vernier line that coincides × 0.01 cm)</p>'],
        ['Mass, time and volume', '<ul><li><b>Mass</b> is the amount of matter in a body. Measured with a beam balance or electronic balance. It does not change from place to place.</li><li><b>Time</b> is measured with a stopwatch or clock.</li><li><b>Volume of a liquid:</b> measuring cylinder, burette or pipette. Read the bottom of the <b>meniscus</b> at eye level.</li><li><b>Volume of an irregular solid:</b> the displacement method. Volume = final level − initial level.</li></ul>'],
        ['Worked example', '<p>A caliper’s main scale reads 2.3 cm and the 7th vernier line coincides.</p><p class="formula">Reading = 2.3 + (7 × 0.01) = 2.37 cm</p>']
      ],
      quiz: [
        ['Which is a fundamental quantity?', ['Volume', 'Mass', 'Density', 'Speed'], 1, 'Mass is fundamental; the others are derived.'],
        ['The SI unit of temperature is the…', ['degree Celsius', 'kelvin', 'joule', 'candela'], 1, 'The kelvin (K) is the SI unit of temperature.'],
        ['A vernier caliper shows 3.1 cm on the main scale and the 4th vernier line coincides. The reading is…', ['3.14 cm', '3.5 cm', '3.41 cm', '3.104 cm'], 0, '3.1 + (4 × 0.01) = 3.14 cm.'],
        ['Which instrument is best for measuring the diameter of a thin wire?', ['Metre rule', 'Tape measure', 'Micrometer screw gauge', 'Measuring cylinder'], 2, 'A micrometer reads to 0.01 mm.'],
        ['Water in a cylinder rises from 40 cm³ to 58 cm³ when a stone is lowered in. The stone’s volume is…', ['98 cm³', '58 cm³', '18 cm³', '40 cm³'], 2, '58 − 40 = 18 cm³.'],
        ['Parallax error is avoided by…', ['reading quickly', 'placing the eye in line with the mark being read', 'using a longer ruler', 'measuring twice as much'], 1, 'The line of sight must be perpendicular to the scale.']
      ]
    },
    {
      id: 'force', icon: 'spring', title: 'Introduction to force', sims: ['hooke'],
      blurb: 'What a force is, what it can do, and the different kinds of force.',
      notes: [
        ['Concept of force', '<p>A <b>force</b> is a push or a pull. Its SI unit is the <b>newton (N)</b> and it is measured with a spring balance. A force has both size and direction.</p>'],
        ['Effects of forces', '<p>A force can:</p><ul><li>start a body moving or stop it;</li><li>make it move faster or slower;</li><li>change its direction;</li><li>change its shape or size (stretch, squash, bend, twist).</li></ul>'],
        ['Types of force', '<ul><li><b>Weight (gravitational force):</b> the pull of the Earth on a body.</li><li><b>Friction:</b> opposes motion between surfaces in contact.</li><li><b>Tension:</b> the pull in a stretched string or spring.</li><li><b>Upthrust:</b> the upward push of a liquid or gas.</li><li><b>Magnetic and electrostatic forces:</b> act at a distance.</li><li><b>Stretching, compressional and twisting (torsional) forces.</b></li></ul><p>The fundamental forces of nature are gravitational, electromagnetic, strong nuclear and weak nuclear.</p>'],
        ['Mass and weight', '<p class="formula">Weight = mass × g &nbsp;&nbsp; W = mg</p><p>On Earth g ≈ 10 N/kg. A 100 g mass (0.1 kg) weighs about 1 N. Mass is constant everywhere; weight changes with g.</p>']
      ],
      quiz: [
        ['The SI unit of force is the…', ['kilogram', 'joule', 'newton', 'pascal'], 2, 'Force is measured in newtons.'],
        ['Which instrument measures force?', ['Beam balance', 'Spring balance', 'Stopwatch', 'Thermometer'], 1, 'A spring balance (newton-meter) measures force.'],
        ['The weight of a 5 kg bag on Earth (g = 10 N/kg) is…', ['0.5 N', '5 N', '15 N', '50 N'], 3, 'W = mg = 5 × 10 = 50 N.'],
        ['Which force opposes motion between two surfaces in contact?', ['Tension', 'Friction', 'Upthrust', 'Weight'], 1, 'Friction always acts against relative motion.'],
        ['Which is NOT an effect of a force?', ['Changing the shape of a body', 'Changing the mass of a body', 'Changing the direction of motion', 'Stopping a moving body'], 1, 'A force does not change the amount of matter in a body.'],
        ['An astronaut goes to the Moon. Compared with Earth, her…', ['mass is less, weight the same', 'mass and weight are both the same', 'mass is the same, weight is less', 'mass is more, weight is less'], 2, 'Mass stays constant; weight depends on g, which is smaller on the Moon.']
      ]
    },
    {
      id: 'density', icon: 'balance', title: 'Density and relative density', sims: ['density'],
      blurb: 'How much mass is packed into each unit of volume.',
      notes: [
        ['Density', '<p><b>Density</b> is mass per unit volume.</p><p class="formula">density = mass ÷ volume &nbsp;&nbsp; ρ = m / V</p><p>SI unit: kg/m³. Also g/cm³. <b>1 g/cm³ = 1000 kg/m³.</b> Water has a density of 1 g/cm³ (1000 kg/m³).</p>'],
        ['Measuring density', '<ul><li><b>Regular solid:</b> measure mass on a balance; calculate volume from its dimensions.</li><li><b>Irregular solid:</b> mass on a balance; volume by displacement of water.</li><li><b>Liquid:</b> weigh an empty container, weigh it again with a measured volume of liquid, subtract.</li></ul>'],
        ['Relative density', '<p class="formula">Relative density = density of substance ÷ density of water</p><p>It is also the mass of a substance ÷ the mass of an equal volume of water. It has <b>no units</b>. A <b>density bottle</b> is used to find it accurately.</p><p>Example: iron has density 7900 kg/m³, so its relative density is 7.9.</p>'],
        ['Why density matters', '<ul><li>Choosing materials: aluminium for aircraft, lead for sinkers.</li><li>Checking purity, for example of milk or gold.</li><li>Predicting floating and sinking.</li></ul><p>Worked example: a stone of mass 52 g displaces 20 cm³ of water. Density = 52 ÷ 20 = 2.6 g/cm³ = 2600 kg/m³.</p>']
      ],
      quiz: [
        ['Density is defined as…', ['mass × volume', 'mass per unit volume', 'volume per unit mass', 'weight per unit area'], 1, 'ρ = m / V.'],
        ['A block has mass 54 g and volume 20 cm³. Its density is…', ['2.7 g/cm³', '0.37 g/cm³', '1080 g/cm³', '34 g/cm³'], 0, '54 ÷ 20 = 2.7 g/cm³.'],
        ['2.5 g/cm³ is the same as…', ['25 kg/m³', '250 kg/m³', '2500 kg/m³', '0.0025 kg/m³'], 2, 'Multiply by 1000: 2500 kg/m³.'],
        ['The unit of relative density is…', ['kg/m³', 'g/cm³', 'N/m²', 'it has no unit'], 3, 'It is a ratio of two densities, so the units cancel.'],
        ['A liquid has relative density 0.8. Its density is…', ['8000 kg/m³', '800 kg/m³', '80 kg/m³', '1800 kg/m³'], 1, '0.8 × 1000 = 800 kg/m³.'],
        ['Which apparatus is used to find relative density accurately?', ['Density bottle', 'Vernier caliper', 'Barometer', 'Stopwatch'], 0, 'A density bottle holds a fixed, accurately known volume.']
      ]
    },
    {
      id: 'floating', icon: 'boat', title: 'Sinking and floating', sims: ['float'],
      blurb: 'Upthrust, Archimedes’ principle and the law of flotation.',
      notes: [
        ['Sinking, floating and upthrust', '<p>A body in a fluid is pushed upwards by a force called <b>upthrust</b>. This makes it seem lighter.</p><p class="formula">Upthrust = weight in air − apparent weight in fluid</p><p>A body sinks if its density is greater than that of the fluid, and floats if its density is less.</p>'],
        ['Archimedes’ principle', '<p>When a body is wholly or partly immersed in a fluid, it experiences an upthrust <b>equal to the weight of the fluid displaced</b>.</p><p class="formula">Upthrust = volume immersed × density of fluid × g</p>'],
        ['Law of flotation', '<p>A floating body displaces <b>its own weight</b> of the fluid in which it floats. So for a floating body, upthrust = weight of body, and the apparent weight is zero.</p>'],
        ['Applications', '<ul><li><b>Ships:</b> hollow steel hulls displace a large weight of water. The Plimsoll line marks safe loading.</li><li><b>Submarines:</b> fill ballast tanks with water to dive, and with air to rise.</li><li><b>Hydrometer:</b> floats higher in denser liquids, so it measures relative density.</li><li><b>Hot-air balloons:</b> float in the denser cold air around them.</li></ul>']
      ],
      quiz: [
        ['Upthrust on an immersed body equals…', ['the weight of the body', 'the weight of fluid displaced', 'the volume of the body', 'the mass of fluid displaced'], 1, 'This is Archimedes’ principle.'],
        ['A stone weighs 8 N in air and 5 N in water. The upthrust is…', ['13 N', '8 N', '5 N', '3 N'], 3, '8 − 5 = 3 N.'],
        ['A floating body displaces…', ['its own volume of fluid', 'its own weight of fluid', 'no fluid', 'twice its weight of fluid'], 1, 'This is the law of flotation.'],
        ['A block floats in water but sinks in kerosene because…', ['kerosene is less dense than the block', 'kerosene is denser than water', 'the block is lighter in water', 'water has no upthrust'], 0, 'It sinks in any liquid less dense than itself.'],
        ['A hydrometer is used to measure…', ['pressure', 'temperature', 'relative density of liquids', 'volume'], 2, 'It floats at a depth that depends on the liquid’s density.'],
        ['A steel ship floats because…', ['steel is less dense than water', 'its hollow shape displaces water equal to its weight', 'salt water is very thick', 'ships have no weight in water'], 1, 'The average density of ship plus air inside is less than that of water.']
      ]
    },
    {
      id: 'properties', icon: 'drop', title: 'Mechanical properties of matter', sims: ['hooke'],
      blurb: 'Elasticity, adhesion and cohesion, surface tension, capillarity and viscosity.',
      notes: [
        ['Elasticity and Hooke’s law', '<p><b>Elasticity</b> is the ability of a material to return to its original shape after a stretching force is removed.</p><p><b>Hooke’s law:</b> the extension of a spring is directly proportional to the force applied, provided the elastic limit is not exceeded.</p><p class="formula">F = ke</p><p>k is the spring constant in N/m. Beyond the <b>elastic limit</b> the spring is permanently stretched.</p>'],
        ['Adhesion and cohesion', '<ul><li><b>Cohesion:</b> attraction between molecules of the <b>same</b> substance.</li><li><b>Adhesion:</b> attraction between molecules of <b>different</b> substances.</li></ul><p>Water wets glass because adhesion is greater than cohesion. Mercury does not, because its cohesion is greater.</p>'],
        ['Surface tension', '<p>The surface of a liquid behaves like a stretched elastic skin. That is why a needle can rest on water and insects can walk on it. Soap and heat <b>reduce</b> surface tension.</p>'],
        ['Capillarity and viscosity', '<p><b>Capillarity</b> is the rise or fall of a liquid in a narrow tube. Water rises (concave meniscus); mercury falls (convex meniscus). The narrower the tube, the greater the rise. Examples: a lamp wick, blotting paper, water rising in soil.</p><p><b>Viscosity</b> is a liquid’s resistance to flow. Honey is more viscous than water.</p>']
      ],
      quiz: [
        ['Hooke’s law holds provided…', ['the spring is made of steel', 'the elastic limit is not exceeded', 'the load is very large', 'the spring is short'], 1, 'Beyond the elastic limit, extension is no longer proportional to force.'],
        ['A force of 4 N stretches a spring by 8 cm. Its spring constant is…', ['0.5 N/m', '2 N/m', '32 N/m', '50 N/m'], 3, 'k = F/e = 4 ÷ 0.08 = 50 N/m.'],
        ['The attraction between molecules of the same substance is…', ['adhesion', 'cohesion', 'capillarity', 'viscosity'], 1, 'Cohesion acts between like molecules.'],
        ['A needle floats on water because of…', ['upthrust only', 'surface tension', 'viscosity', 'capillarity'], 1, 'The surface acts like a stretched skin.'],
        ['In a narrow glass tube, mercury…', ['rises with a concave meniscus', 'falls with a convex meniscus', 'stays level', 'rises with a convex meniscus'], 1, 'Cohesion in mercury is greater than its adhesion to glass.'],
        ['Adding soap to water…', ['increases its surface tension', 'reduces its surface tension', 'increases its density a lot', 'stops capillarity completely'], 1, 'Soap weakens the surface “skin”, which helps water wet cloth.']
      ]
    },
    {
      id: 'pressure', icon: 'gauge', title: 'Pressure', sims: ['pressure'],
      blurb: 'Pressure in solids, liquids and the atmosphere.',
      notes: [
        ['Concept of pressure', '<p><b>Pressure</b> is the force acting perpendicularly per unit area.</p><p class="formula">P = F / A</p><p>SI unit: the pascal (Pa). 1 Pa = 1 N/m².</p>'],
        ['Pressure due to solids', '<p>For the same force, a <b>smaller area gives a larger pressure</b>. That is why knives and nails are sharp, and why tractors have wide tyres and buildings have wide foundations.</p>'],
        ['Pressure in liquids', '<p class="formula">P = hρg</p><p>Pressure in a liquid increases with depth (h) and density (ρ). At a given depth it acts equally in all directions and does not depend on the shape of the container. This is why dam walls are thicker at the bottom.</p><p><b>Pascal’s principle:</b> pressure applied to an enclosed liquid is transmitted equally throughout it. This is used in hydraulic presses and brakes.</p>'],
        ['Atmospheric pressure', '<p>The air above us has weight and presses on everything. At sea level it is about 101 000 Pa, which supports a column of 760 mm of mercury in a <b>barometer</b>. It decreases with height.</p><p>Applications: drinking straw, syringe, siphon, lift pump and bicycle pump.</p>']
      ],
      quiz: [
        ['The SI unit of pressure is the…', ['newton', 'pascal', 'joule', 'watt'], 1, '1 Pa = 1 N/m².'],
        ['A force of 200 N acts on an area of 4 m². The pressure is…', ['800 Pa', '204 Pa', '50 Pa', '0.02 Pa'], 2, 'P = F/A = 200 ÷ 4 = 50 Pa.'],
        ['Pressure in a liquid depends on…', ['depth and density', 'the shape of the container', 'the colour of the liquid', 'the area of the base only'], 0, 'P = hρg.'],
        ['The pressure 2 m below the surface of water (ρ = 1000 kg/m³, g = 10 N/kg) is…', ['2000 Pa', '5000 Pa', '10 000 Pa', '20 000 Pa'], 3, 'P = 2 × 1000 × 10 = 20 000 Pa.'],
        ['The instrument that measures atmospheric pressure is the…', ['hydrometer', 'barometer', 'thermometer', 'ammeter'], 1, 'A barometer measures atmospheric pressure.'],
        ['A sharp knife cuts better than a blunt one because…', ['it is heavier', 'the small area of its edge gives a large pressure', 'it has more friction', 'it exerts less force'], 1, 'The same force on a smaller area produces more pressure.']
      ]
    },
    {
      id: 'motion', icon: 'trolley', title: 'Linear motion', sims: ['motion', 'pendulum'],
      blurb: 'Distance, displacement, speed, velocity, acceleration and motion under gravity.',
      notes: [
        ['Describing motion', '<ul><li><b>Distance:</b> the total length of path travelled (scalar).</li><li><b>Displacement:</b> distance in a stated direction (vector).</li><li><b>Speed</b> = distance ÷ time (scalar). <b>Velocity</b> = displacement ÷ time (vector). Unit: m/s.</li><li><b>Acceleration</b> = change in velocity ÷ time. Unit: m/s². A negative acceleration is called retardation.</li></ul>'],
        ['Equations of uniformly accelerated motion', '<p class="formula">v = u + at</p><p class="formula">s = ut + ½at²</p><p class="formula">v² = u² + 2as</p><p>u = initial velocity, v = final velocity, a = acceleration, t = time, s = displacement.</p>'],
        ['Motion graphs', '<ul><li><b>Distance–time graph:</b> the slope gives speed. A straight line means uniform speed; a horizontal line means the body is at rest.</li><li><b>Velocity–time graph:</b> the slope gives acceleration; the <b>area under the graph</b> gives distance travelled.</li></ul>'],
        ['Motion under gravity', '<p>A freely falling body accelerates downwards at g ≈ 10 m/s² (more exactly 9.8 m/s²). Use the same equations with a = g for falling and a = −g for a body thrown upwards.</p><p>Worked example: a stone is dropped from rest. After 3 s, v = 0 + 10 × 3 = 30 m/s and s = ½ × 10 × 3² = 45 m.</p>']
      ],
      quiz: [
        ['Which quantity is a vector?', ['Distance', 'Speed', 'Displacement', 'Time'], 2, 'Displacement has both size and direction.'],
        ['A car travels 150 m in 10 s. Its average speed is…', ['1500 m/s', '15 m/s', '160 m/s', '0.07 m/s'], 1, '150 ÷ 10 = 15 m/s.'],
        ['A body starts from rest and accelerates at 2 m/s² for 5 s. Its final velocity is…', ['2.5 m/s', '7 m/s', '10 m/s', '25 m/s'], 2, 'v = u + at = 0 + 2 × 5 = 10 m/s.'],
        ['The area under a velocity–time graph gives…', ['acceleration', 'distance travelled', 'speed', 'time'], 1, 'Area = velocity × time = distance.'],
        ['A stone dropped from rest falls for 2 s (g = 10 m/s²). It falls…', ['10 m', '20 m', '40 m', '5 m'], 1, 's = ½gt² = ½ × 10 × 4 = 20 m.'],
        ['A horizontal line on a distance–time graph means the body is…', ['accelerating', 'moving at uniform speed', 'at rest', 'slowing down'], 2, 'Distance is not changing, so it is not moving.']
      ]
    },
    {
      id: 'energy', icon: 'bulb', title: 'Work, energy and power', sims: ['energy'],
      blurb: 'Doing work, storing and changing energy, and how fast work is done.',
      notes: [
        ['Work', '<p><b>Work</b> is done when a force moves a body in the direction of the force.</p><p class="formula">Work = force × distance &nbsp;&nbsp; W = Fd</p><p>SI unit: the joule (J). 1 J = 1 N m. No movement means no work is done.</p>'],
        ['Energy', '<p><b>Energy</b> is the ability to do work. It is also measured in joules.</p><p class="formula">Potential energy = mgh</p><p class="formula">Kinetic energy = ½mv²</p><p>Other forms: heat, light, sound, electrical, chemical and nuclear energy.</p>'],
        ['Conservation of energy', '<p>Energy cannot be created or destroyed. It can only change from one form to another. For a falling ball, potential energy changes to kinetic energy while the total stays the same.</p><p>Energy sources are <b>renewable</b> (solar, wind, hydro, geothermal, biomass) or <b>non-renewable</b> (coal, oil, natural gas).</p>'],
        ['Power', '<p><b>Power</b> is the rate of doing work.</p><p class="formula">Power = work done ÷ time &nbsp;&nbsp; P = W / t</p><p>SI unit: the watt (W). 1 W = 1 J/s.</p><p>Worked example: a 50 kg student climbs stairs 6 m high in 10 s. Work = mgh = 50 × 10 × 6 = 3000 J. Power = 3000 ÷ 10 = 300 W.</p>']
      ],
      quiz: [
        ['Work is done when…', ['a force is applied to a wall that does not move', 'a force moves a body in its direction', 'a body is held still above the ground', 'time passes'], 1, 'Work needs both force and movement in the direction of the force.'],
        ['A force of 20 N moves a box 5 m. The work done is…', ['4 J', '25 J', '100 J', '15 J'], 2, 'W = Fd = 20 × 5 = 100 J.'],
        ['A 2 kg ball is 10 m above the ground (g = 10 N/kg). Its potential energy is…', ['20 J', '100 J', '200 J', '2000 J'], 2, 'PE = mgh = 2 × 10 × 10 = 200 J.'],
        ['The kinetic energy of a 4 kg trolley moving at 3 m/s is…', ['6 J', '12 J', '18 J', '36 J'], 2, 'KE = ½ × 4 × 3² = 18 J.'],
        ['The unit of power is the…', ['joule', 'newton', 'watt', 'pascal'], 2, '1 W = 1 J/s.'],
        ['As a ball falls freely, its…', ['potential energy increases', 'kinetic energy decreases', 'total energy increases', 'potential energy changes into kinetic energy'], 3, 'The total stays constant while PE is converted to KE.']
      ]
    }
  ]
});

HL.courses.push({
  id: 'phy2', subject: 'phy', form: 2, title: 'Physics, Form Two',
  topics: [
    {
      id: 'static', icon: 'bolt', title: 'Static electricity', sims: ['electroscope'],
      blurb: 'Electric charges at rest: charging, detecting and storing charge.',
      notes: [
        ['Concept of static electricity', '<p><b>Static electricity</b> is electric charge at rest on the surface of a material. There are two kinds of charge, <b>positive</b> and <b>negative</b>.</p><p class="formula">Like charges repel. Unlike charges attract.</p><p>A body becomes negative by gaining electrons and positive by losing electrons.</p>'],
        ['Methods of charging', '<ul><li><b>Friction (rubbing):</b> electrons move from one material to the other. Polythene rubbed with wool becomes negative; glass rubbed with silk becomes positive.</li><li><b>Contact:</b> a charged body touches a neutral one and shares its charge. Both end with the <b>same</b> sign.</li><li><b>Induction:</b> a charged body is brought near (without touching), the conductor is earthed, the earth is removed, then the charged body is removed. The conductor ends with the <b>opposite</b> sign.</li></ul>'],
        ['The gold-leaf electroscope', '<p>It detects charge, tests the sign of a charge, and tests whether a material is a conductor or an insulator. The leaves diverge when both carry the same kind of charge.</p><p><b>Conductors</b> (metals, graphite) let charge flow. <b>Insulators</b> (plastic, rubber, glass, dry wood) do not.</p>'],
        ['Capacitors, charge distribution and lightning', '<p>A <b>capacitor</b> stores charge. Capacitance C = Q / V, measured in farads (F). For a parallel-plate capacitor, capacitance increases with plate area, decreases with plate separation, and depends on the insulator (dielectric) between the plates.</p><p>Charge on a conductor stays on its <b>outer surface</b> and is most concentrated at <b>sharp points</b>. A <b>lightning conductor</b> uses this: a pointed metal rod joined to an earthed plate gives lightning a safe path to the ground.</p>']
      ],
      quiz: [
        ['A polythene rod rubbed with wool becomes negatively charged because it…', ['loses protons', 'gains electrons', 'loses electrons', 'gains protons'], 1, 'Electrons transfer from the wool to the polythene.'],
        ['Two negatively charged balloons brought close together will…', ['attract', 'repel', 'not affect each other', 'become neutral'], 1, 'Like charges repel.'],
        ['A body charged by induction ends up with a charge that is…', ['the same as the inducing charge', 'opposite to the inducing charge', 'always positive', 'zero'], 1, 'Induction gives the opposite sign.'],
        ['Which is an insulator?', ['Copper', 'Graphite', 'Rubber', 'Aluminium'], 2, 'Rubber does not allow charge to flow.'],
        ['On a charged conductor, charge is most concentrated…', ['at the centre', 'on flat surfaces', 'at sharp points', 'evenly inside'], 2, 'This is why lightning conductors are pointed.'],
        ['The capacitance of a parallel-plate capacitor increases when…', ['the plates are moved further apart', 'the plate area is increased', 'the plate area is reduced', 'the dielectric is removed'], 1, 'Larger overlapping area stores more charge per volt.']
      ]
    },
    {
      id: 'current', icon: 'bulb', title: 'Current electricity', sims: ['circuit'],
      blurb: 'Charges in motion: current, voltage, resistance and using electricity safely.',
      notes: [
        ['Current, voltage and circuits', '<p><b>Electric current</b> is the rate of flow of charge.</p><p class="formula">I = Q / t</p><p>Unit: ampere (A), measured with an <b>ammeter</b> connected in series. <b>Potential difference</b> (voltage) is measured in volts (V) with a <b>voltmeter</b> connected in parallel. The e.m.f. of a cell is the voltage across it when no current flows.</p>'],
        ['Resistance and Ohm’s law', '<p><b>Ohm’s law:</b> the current through a conductor is directly proportional to the potential difference across it, provided temperature stays constant.</p><p class="formula">V = IR</p><p>Resistance is measured in ohms (Ω). It increases with the <b>length</b> of a wire, decreases with its <b>cross-sectional area</b>, and depends on the <b>material</b> and <b>temperature</b>: R = ρL / A.</p><p class="formula">Series: R = R₁ + R₂ &nbsp;&nbsp;&nbsp; Parallel: 1/R = 1/R₁ + 1/R₂</p>'],
        ['Heating effect', '<p>A current heats a conductor.</p><p class="formula">Heat = I²Rt</p><p>Used in electric irons, kettles, cookers, heaters, filament lamps and fuses.</p>'],
        ['Electrical installations and cells', '<ul><li><b>Fuse / circuit breaker:</b> cuts off the circuit when the current is too high.</li><li><b>Earth wire:</b> gives a safe path if a metal casing becomes live.</li><li><b>Switches</b> are fitted in the live wire. Household circuits are wired in parallel.</li><li>Never touch switches with wet hands or overload sockets.</li></ul><p><b>Primary cells</b> (dry cell) cannot be recharged. <b>Secondary cells</b> (lead–acid, lithium-ion) can.</p>']
      ],
      quiz: [
        ['An ammeter is connected…', ['in parallel with the component', 'in series with the component', 'across the battery only', 'to the earth wire'], 1, 'All the current must pass through the ammeter.'],
        ['A 6 V battery drives current through a 3 Ω resistor. The current is…', ['18 A', '9 A', '2 A', '0.5 A'], 2, 'I = V/R = 6 ÷ 3 = 2 A.'],
        ['Two resistors of 4 Ω and 6 Ω in series have a total resistance of…', ['2.4 Ω', '10 Ω', '24 Ω', '2 Ω'], 1, 'Series: 4 + 6 = 10 Ω.'],
        ['Two 6 Ω resistors in parallel have a total resistance of…', ['12 Ω', '6 Ω', '3 Ω', '36 Ω'], 2, '1/R = 1/6 + 1/6, so R = 3 Ω.'],
        ['The resistance of a wire increases when…', ['it is made shorter', 'it is made thicker', 'it is made longer', 'it is cooled'], 2, 'Resistance is proportional to length.'],
        ['The purpose of a fuse is to…', ['increase the current', 'store charge', 'break the circuit when the current is too large', 'measure voltage'], 2, 'The fuse wire melts and protects the circuit.']
      ]
    },
    {
      id: 'magnetism', icon: 'magnet', title: 'Magnetism', sims: ['magnet'],
      blurb: 'Magnets, magnetic fields and the Earth as a magnet.',
      notes: [
        ['Concept of magnetism', '<p>A <b>magnet</b> attracts magnetic materials: iron, steel, nickel and cobalt. Every magnet has a north pole and a south pole, where its pull is strongest. A freely suspended magnet comes to rest pointing north–south.</p><p class="formula">Like poles repel. Unlike poles attract.</p><p>Repulsion is the only sure test for a magnet.</p>'],
        ['Magnetisation and demagnetisation', '<p><b>Making a magnet:</b> stroking (single or double touch), the electrical method (a steel bar in a coil carrying direct current), or induction.</p><p><b>Destroying magnetism:</b> heating strongly, hammering, or placing in a coil carrying alternating current and slowly withdrawing it.</p><p>Soft iron is easily magnetised and demagnetised (used in electromagnets). Steel keeps its magnetism (permanent magnets). Store magnets with <b>keepers</b>.</p>'],
        ['Magnetic fields', '<p>A <b>magnetic field</b> is the region around a magnet where its force is felt. Field lines run from <b>N to S</b> outside the magnet, never cross, and are closest where the field is strongest.</p><p>A <b>neutral point</b> is where two fields cancel. <b>Magnetic shielding</b> uses a soft-iron ring to keep a region free of magnetic field.</p>'],
        ['The Earth’s magnetic field', '<p>The Earth behaves as if it had a bar magnet inside it. The <b>angle of declination</b> is the angle between geographic north and magnetic north. The <b>angle of inclination (dip)</b> is the angle the Earth’s field makes with the horizontal. Navigators use a compass and correct for declination.</p>']
      ],
      quiz: [
        ['Which material is magnetic?', ['Copper', 'Aluminium', 'Nickel', 'Brass'], 2, 'Iron, steel, nickel and cobalt are magnetic.'],
        ['Outside a magnet, field lines run from…', ['south to north', 'north to south', 'centre to both poles', 'pole to centre'], 1, 'By convention they leave N and enter S.'],
        ['The surest test that a steel bar is a magnet is that it…', ['attracts iron filings', 'attracts a magnet', 'repels one pole of a known magnet', 'is heavy'], 2, 'Only another magnet can be repelled.'],
        ['A magnet can be demagnetised by…', ['stroking it with another magnet', 'heating it strongly', 'storing it with keepers', 'cooling it'], 1, 'Heating disorders the magnetic domains.'],
        ['A neutral point is where…', ['the field is strongest', 'two magnetic fields cancel each other', 'field lines cross', 'a compass always points north'], 1, 'The resultant field there is zero.'],
        ['The angle between geographic north and magnetic north is the angle of…', ['dip', 'inclination', 'declination', 'incidence'], 2, 'Declination; dip is measured from the horizontal.']
      ]
    },
    {
      id: 'reflection', icon: 'lens', title: 'Nature and reflection of light', sims: ['reflect', 'lens'],
      blurb: 'How light travels, how shadows form and how mirrors make images.',
      notes: [
        ['Light and how it travels', '<p><b>Luminous</b> bodies give out their own light (Sun, flame, lamp). <b>Non-luminous</b> bodies are seen by the light they reflect (Moon, book).</p><p>Light travels in straight lines: <b>rectilinear propagation</b>. This explains shadows (umbra and penumbra), eclipses and the pinhole camera, whose image is real and inverted.</p><p>Materials are <b>transparent</b> (glass), <b>translucent</b> (frosted glass) or <b>opaque</b> (wood).</p>'],
        ['Laws of reflection', '<ol><li>The incident ray, the reflected ray and the normal at the point of incidence all lie in the same plane.</li><li>The angle of incidence equals the angle of reflection: <b>i = r</b>.</li></ol><p>Angles are measured from the <b>normal</b>.</p>'],
        ['Images in a plane mirror', '<p>The image is: the same size as the object, as far behind the mirror as the object is in front, upright, <b>virtual</b> and <b>laterally inverted</b>. Uses: looking glass, periscope, kaleidoscope.</p>'],
        ['Curved mirrors', '<p>A <b>concave</b> mirror converges light; a <b>convex</b> mirror diverges it. Key terms: pole (P), centre of curvature (C), principal focus (F), focal length (f). f = r / 2.</p><p class="formula">1/f = 1/u + 1/v &nbsp;&nbsp;&nbsp; magnification m = v / u</p><p>Concave mirrors are used as shaving mirrors, by dentists and in torch reflectors. Convex mirrors give a wide field of view, so they are used as driving mirrors.</p>']
      ],
      quiz: [
        ['Which is a luminous body?', ['The Moon', 'A mirror', 'A candle flame', 'A white wall'], 2, 'A flame produces its own light.'],
        ['A ray strikes a plane mirror at 35° to the normal. The angle of reflection is…', ['55°', '35°', '70°', '145°'], 1, 'i = r.'],
        ['The image in a plane mirror is…', ['real and inverted', 'virtual and the same size', 'real and magnified', 'virtual and diminished'], 1, 'It is virtual, upright, same size and laterally inverted.'],
        ['A girl stands 2 m in front of a plane mirror. Her image is how far from her?', ['2 m', '1 m', '4 m', '0 m'], 2, '2 m in front plus 2 m behind = 4 m.'],
        ['Driving mirrors are convex because they…', ['magnify', 'give a wide field of view', 'form real images', 'focus light'], 1, 'A convex mirror shows a wide area, upright and diminished.'],
        ['An object is 30 cm from a concave mirror of focal length 10 cm. The image distance is…', ['15 cm', '20 cm', '40 cm', '7.5 cm'], 0, '1/v = 1/10 − 1/30 = 2/30, so v = 15 cm.']
      ]
    },
    {
      id: 'refraction', icon: 'prism', title: 'Refraction and dispersion of light', sims: ['refract', 'lens'],
      blurb: 'Bending of light, prisms, colours and lenses.',
      notes: [
        ['Refraction', '<p><b>Refraction</b> is the bending of light as it passes from one medium to another, because its speed changes. Entering a denser medium it bends <b>towards</b> the normal; leaving it, <b>away</b> from the normal.</p><p><b>Laws:</b> (1) the incident ray, refracted ray and normal lie in the same plane; (2) Snell’s law:</p><p class="formula">n = sin i / sin r</p><p>Also n = real depth ÷ apparent depth = speed of light in air ÷ speed in the medium.</p>'],
        ['Critical angle and total internal reflection', '<p>When light travels from a denser to a less dense medium and the angle of incidence exceeds the <b>critical angle</b> c, all of it is reflected back.</p><p class="formula">sin c = 1 / n</p><p>Applications: optical fibres, prism periscopes and binoculars. It also explains mirages.</p>'],
        ['Prisms and colours', '<p>A prism splits white light into a <b>spectrum</b>: red, orange, yellow, green, blue, indigo, violet. This is <b>dispersion</b>. Red is bent least and violet most. A rainbow is a natural spectrum.</p><p><b>Primary colours of light:</b> red, green, blue. Mixed in pairs they give the secondary colours yellow, cyan and magenta; all three give white.</p>'],
        ['Lenses', '<p>A <b>convex</b> lens converges light; a <b>concave</b> lens diverges it.</p><p class="formula">1/f = 1/u + 1/v &nbsp;&nbsp;&nbsp; m = v / u</p><p>A convex lens gives a real, inverted image when the object is beyond F, and a virtual, upright, magnified image when the object is inside F. A concave lens always gives a virtual, upright, diminished image.</p>']
      ],
      quiz: [
        ['Light entering glass from air bends…', ['away from the normal', 'towards the normal', 'along the surface', 'not at all, at any angle'], 1, 'It slows down in the denser medium and bends towards the normal.'],
        ['Refraction happens because light changes its…', ['colour', 'speed', 'frequency', 'brightness'], 1, 'The speed differs between media.'],
        ['A pool is really 2 m deep but looks 1.5 m deep. The refractive index of water is…', ['0.75', '1.33', '3.0', '3.5'], 1, 'n = real ÷ apparent = 2 ÷ 1.5 = 1.33.'],
        ['Total internal reflection needs light to travel…', ['from a less dense to a denser medium', 'from a denser to a less dense medium at an angle greater than the critical angle', 'along the normal', 'through a vacuum'], 1, 'Both conditions are required.'],
        ['Which colour is deviated most by a prism?', ['Red', 'Yellow', 'Green', 'Violet'], 3, 'Violet is slowed the most in glass.'],
        ['The primary colours of light are…', ['red, yellow, blue', 'red, green, blue', 'cyan, magenta, yellow', 'red, orange, violet'], 1, 'Red, green and blue add to give white light.']
      ]
    },
    {
      id: 'instruments', icon: 'eye', title: 'Optical instruments', sims: ['lens'],
      blurb: 'Microscopes, telescopes, binoculars, the camera and the human eye.',
      notes: [
        ['Simple and compound microscopes', '<p>A <b>simple microscope</b> (magnifying glass) is one convex lens with the object placed <b>inside F</b>. The image is virtual, upright and magnified.</p><p>A <b>compound microscope</b> uses two convex lenses of short focal length. The <b>objective</b> forms a real, magnified image; the <b>eyepiece</b> magnifies it again. The final image is virtual, inverted and highly magnified.</p>'],
        ['Astronomical telescope and binoculars', '<p>An <b>astronomical telescope</b> has an objective of long focal length and an eyepiece of short focal length. In normal adjustment the distance between the lenses is f<sub>o</sub> + f<sub>e</sub>.</p><p class="formula">Magnification = f<sub>o</sub> / f<sub>e</sub></p><p>The final image is inverted. <b>Prism binoculars</b> use total internal reflection in two prisms to turn the image upright and shorten the instrument.</p>'],
        ['The lens camera', '<p>A convex lens forms a real, inverted, diminished image on the film or sensor. The <b>diaphragm (aperture)</b> controls how much light enters; the <b>shutter</b> controls for how long. Focusing is done by moving the lens.</p>'],
        ['The human eye', '<p>The cornea and lens focus light on the <b>retina</b>. The <b>iris</b> controls the size of the pupil. The eye focuses by changing the shape of its lens (accommodation).</p><ul><li><b>Short sight (myopia):</b> distant objects are blurred because the image forms in front of the retina. Corrected with a <b>concave</b> lens.</li><li><b>Long sight (hypermetropia):</b> near objects are blurred because the image would form behind the retina. Corrected with a <b>convex</b> lens.</li></ul>']
      ],
      quiz: [
        ['For a convex lens to act as a magnifying glass, the object must be…', ['beyond 2F', 'at 2F', 'between F and 2F', 'between the lens and F'], 3, 'Inside F the image is virtual, upright and magnified.'],
        ['A telescope has an objective of focal length 100 cm and an eyepiece of 5 cm. Its magnification is…', ['20', '95', '105', '500'], 0, 'M = fo ÷ fe = 100 ÷ 5 = 20.'],
        ['In a camera, the amount of light entering is controlled by the…', ['shutter speed only', 'diaphragm (aperture)', 'film', 'focusing ring'], 1, 'The diaphragm changes the size of the opening.'],
        ['Short sight is corrected using a…', ['convex lens', 'concave lens', 'plane mirror', 'prism'], 1, 'A diverging lens moves the image back onto the retina.'],
        ['The part of the eye where the image forms is the…', ['cornea', 'iris', 'retina', 'pupil'], 2, 'The retina holds the light-sensitive cells.'],
        ['Prism binoculars make use of…', ['dispersion', 'total internal reflection', 'diffraction', 'lateral inversion only'], 1, 'The prisms reflect light internally to turn the image upright.']
      ]
    }
  ]
});
