/* Herieth-Lab lesson content: Physics Form Three and Form Four (follows the TIE textbook chapter order) */
window.HL = window.HL || {};
HL.courses = HL.courses || [];
HL.courses.push({
  id: 'phy3', subject: 'phy', form: 3, title: 'Physics, Form Three',
  topics: [
    {
      id: 'vectors', icon: 'vector', title: 'Applications of vectors', sims: ['vectors'],
      blurb: 'Adding and resolving vectors, and relative motion such as a boat crossing a river.',
      notes: [
        ['Scalars and vectors', '<p>A <b>scalar</b> has size (magnitude) only: mass, distance, speed, time, energy. A <b>vector</b> has both size and direction: displacement, velocity, acceleration, force, momentum.</p><p>A vector is drawn as an arrow. Its length, to a chosen scale, shows the size; its direction shows the direction.</p>'],
        ['Adding vectors', '<ul><li><b>Same direction:</b> add the sizes. <b>Opposite directions:</b> subtract them.</li><li><b>Triangle method:</b> draw the vectors tip to tail. The <b>resultant</b> joins the tail of the first to the tip of the last.</li><li><b>Parallelogram method:</b> draw both vectors from one point and complete the parallelogram. The diagonal from that point is the resultant.</li></ul><p>For two vectors at right angles, use Pythagoras:</p><p class="formula">R = √(A² + B²) &nbsp;&nbsp; tan θ = B / A</p>'],
        ['Resolving a vector', '<p>One vector can be split into two parts at right angles, called <b>components</b>. A force F at angle θ to the horizontal has:</p><p class="formula">horizontal part = F cos θ &nbsp;&nbsp; vertical part = F sin θ</p><p>On a slope of angle θ, the weight mg of a body splits into mg sin θ <b>down the slope</b> and mg cos θ <b>into the slope</b>.</p>'],
        ['Relative motion', '<p>The velocity of A relative to B is v<sub>A</sub> − v<sub>B</sub>. Two cars moving the same way at 80 km/h and 60 km/h approach each other at 20 km/h; moving towards each other they close at 140 km/h.</p><p><b>Boat crossing a river:</b> the boat’s velocity through the water and the river’s current add as vectors.</p><ul><li>To cross in the <b>shortest time</b>, head straight across. The current carries the boat downstream.</li><li>To land <b>directly opposite</b>, head partly upstream so the upstream part of the boat’s velocity cancels the current.</li></ul><p>Worked example: a boat moves at 4 m/s straight across a river flowing at 3 m/s. Resultant = √(4² + 3²) = 5 m/s at tan<sup>−1</sup>(3/4) ≈ 37° downstream of straight across.</p>']
      ],
      quiz: [
        ['Which quantity is a vector?', ['Mass', 'Speed', 'Force', 'Energy'], 2, 'Force has both size and direction.'],
        ['Forces of 6 N and 8 N act at right angles on a body. The resultant is…', ['2 N', '10 N', '14 N', '48 N'], 1, '√(6² + 8²) = √100 = 10 N.'],
        ['A force of 20 N is applied at 60° to the horizontal. Its horizontal component is…', ['10 N', '17.3 N', '20 N', '40 N'], 0, 'F cos 60° = 20 × 0.5 = 10 N.'],
        ['A block of weight 50 N rests on a slope of 30°. The component of its weight down the slope is…', ['25 N', '43.3 N', '50 N', '100 N'], 0, 'mg sin 30° = 50 × 0.5 = 25 N.'],
        ['Two buses travel towards each other at 50 km/h and 70 km/h. Their relative speed is…', ['20 km/h', '60 km/h', '120 km/h', '3500 km/h'], 2, 'Moving towards each other, the speeds add.'],
        ['To cross a river in the shortest possible time, a boat should be steered…', ['upstream at an angle', 'straight across', 'downstream at an angle', 'along the bank first'], 1, 'All of the boat’s own velocity is then used for crossing.']
      ]
    },
    {
      id: 'friction', icon: 'friction', title: 'Friction', sims: ['friction'],
      blurb: 'The force that opposes sliding, its laws, and how to increase or reduce it.',
      notes: [
        ['Concept of friction', '<p><b>Friction</b> is the force that opposes relative motion between two surfaces in contact. It acts along the surfaces, opposite to the direction the body moves or tends to move.</p><p>It arises because even smooth-looking surfaces are rough at a tiny scale. Their high points catch on each other and stick.</p>'],
        ['Types of friction', '<ul><li><b>Static friction:</b> acts while the body is still at rest. It grows to match the pull, up to a maximum called <b>limiting friction</b>.</li><li><b>Sliding (kinetic) friction:</b> acts once the body is sliding. It is a little <b>less</b> than limiting friction.</li><li><b>Rolling friction:</b> much smaller than sliding friction. This is why wheels and ball bearings are used.</li><li><b>Fluid friction (viscous drag):</b> acts on bodies moving through liquids and gases.</li></ul>'],
        ['Laws of friction and the coefficient of friction', '<ol><li>Friction opposes relative motion.</li><li>Friction depends on the nature of the surfaces in contact.</li><li>Friction does not depend on the area of contact.</li><li>Limiting friction is directly proportional to the normal reaction R.</li><li>Sliding friction is almost independent of speed.</li></ol><p class="formula">μ = F / R</p><p>μ (mu) is the <b>coefficient of friction</b> and has no unit. On a horizontal surface, R = mg.</p><p>Worked example: a 5 kg box needs 20 N to start it sliding (g = 10 N/kg). R = 50 N, so μ<sub>s</sub> = 20 ÷ 50 = 0.4.</p>'],
        ['Friction in daily life', '<p><b>Useful:</b> walking without slipping, brakes, car tyres gripping the road, writing, matches lighting, belts turning pulleys.</p><p><b>Unwanted:</b> wears out moving parts, wastes energy as heat, reduces efficiency of machines.</p><p><b>To reduce friction:</b> lubricants (oil, grease), ball and roller bearings, polishing, streamlining, air cushions (hovercraft).</p><p><b>To increase friction:</b> treads on tyres and shoes, sand on slippery roads, rough surfaces.</p>']
      ],
      quiz: [
        ['Friction always acts…', ['in the direction of motion', 'opposite to the relative motion', 'vertically upwards', 'towards the centre'], 1, 'Friction opposes the relative motion of the surfaces.'],
        ['Compared with limiting (static) friction, sliding friction is…', ['slightly larger', 'slightly smaller', 'exactly equal', 'zero'], 1, 'It takes more force to start a body sliding than to keep it sliding.'],
        ['A 10 kg crate on a floor (g = 10 N/kg) needs 30 N to start moving. The coefficient of static friction is…', ['0.3', '3', '0.03', '300'], 0, 'μ = F/R = 30 ÷ 100 = 0.3.'],
        ['Limiting friction does NOT depend on…', ['the normal reaction', 'the nature of the surfaces', 'the area of contact', 'whether the surfaces are oiled'], 2, 'This is one of the laws of friction.'],
        ['Ball bearings reduce friction by…', ['changing sliding friction into rolling friction', 'increasing the normal reaction', 'heating the surfaces', 'adding more contact area'], 0, 'Rolling friction is much smaller than sliding friction.'],
        ['Which is an example of friction being useful?', ['Wear of engine parts', 'Brakes stopping a bicycle', 'Heating of machine bearings', 'Drag slowing an aeroplane'], 1, 'Brakes depend on friction to stop the wheel.']
      ]
    },
    {
      id: 'light3', icon: 'prism', title: 'Light', sims: ['refract', 'lens'],
      blurb: 'Colours of light, coloured objects and filters, and refraction through lenses.',
      notes: [
        ['Colours of light', '<p>White light is a mixture of colours. A prism separates it into a <b>spectrum</b>: red, orange, yellow, green, blue, indigo, violet. This is <b>dispersion</b>. A second prism, turned the other way, can recombine the colours into white light, which shows that the colours came from the white light and not from the prism.</p><p>The <b>primary colours</b> of light are red, green and blue.</p><p class="formula">red + green = yellow &nbsp; red + blue = magenta &nbsp; green + blue = cyan</p><p>Two colours that add to give white are <b>complementary</b>: yellow and blue, magenta and green, cyan and red.</p>'],
        ['Coloured objects and filters', '<p>An object looks the colour of the light it <b>reflects</b>; it absorbs the other colours. A red shirt reflects red and absorbs the rest. In blue light it looks <b>black</b>, because there is no red to reflect.</p><p>A <b>filter</b> lets through its own colour and absorbs the others. White light through a red filter comes out red. Red light through a green filter gives darkness.</p><p>Mixing <b>paints</b> is different: pigments subtract colours, so blue and yellow paint give green.</p>'],
        ['Refraction through lenses', '<p>A convex lens converges light to a real <b>principal focus</b> F; a concave lens makes light diverge as if it came from a virtual focus. The distance from the optical centre to F is the <b>focal length</b> f.</p><p>Rays used to draw images: a ray parallel to the axis passes through F (or appears to); a ray through the optical centre goes straight on; a ray through F leaves parallel.</p><p class="formula">1/f = 1/u + 1/v &nbsp;&nbsp; m = v / u = image height ÷ object height</p><p>Use the <b>real-is-positive</b> convention: real distances are positive, virtual distances negative. A concave lens has a negative focal length.</p>'],
        ['Power of a lens', '<p class="formula">Power P = 1 / f &nbsp;(f in metres)</p><p>The unit is the <b>dioptre (D)</b>. A convex lens of focal length 25 cm has power +4 D; a concave lens of focal length 50 cm has power −2 D.</p><p>Worked example: an object is 15 cm from a convex lens of focal length 10 cm. 1/v = 1/10 − 1/15 = 1/30, so v = 30 cm. m = 30 ÷ 15 = 2: the image is real, inverted and twice the size.</p>']
      ],
      quiz: [
        ['The primary colours of light are…', ['red, yellow and blue', 'red, green and blue', 'cyan, magenta and yellow', 'red, orange and violet'], 1, 'All other colours can be made by adding these.'],
        ['Red light and green light added together give…', ['yellow', 'white', 'cyan', 'brown'], 0, 'red + green = yellow.'],
        ['A red rose is viewed in pure blue light. It looks…', ['red', 'blue', 'black', 'magenta'], 2, 'The rose can only reflect red, and there is no red light.'],
        ['The power of a convex lens of focal length 20 cm is…', ['+0.05 D', '+5 D', '+20 D', '−5 D'], 1, 'P = 1/f = 1 ÷ 0.2 m = 5 D.'],
        ['An object is 30 cm from a convex lens of focal length 10 cm. The image is formed at…', ['15 cm', '20 cm', '30 cm', '7.5 cm'], 0, '1/v = 1/10 − 1/30 = 2/30, so v = 15 cm.'],
        ['Colours that add to give white light are called…', ['primary', 'secondary', 'complementary', 'spectral'], 2, 'For example, yellow and blue.']
      ]
    },
    {
      id: 'optics3', icon: 'eye', title: 'Optical instruments', sims: ['lens'],
      blurb: 'How lenses are combined in microscopes, telescopes, projectors, cameras and the eye.',
      notes: [
        ['Magnifying glass and compound microscope', '<p>A <b>simple microscope</b> is a convex lens with the object <b>inside its focal length</b>. The image is virtual, upright and magnified. It is best viewed at the <b>near point</b>, about 25 cm from the eye.</p><p>A <b>compound microscope</b> has two short-focus convex lenses. The <b>objective</b> forms a real, magnified, inverted image just inside the focal length of the <b>eyepiece</b>, which magnifies it again.</p><p class="formula">total magnification = m<sub>objective</sub> × m<sub>eyepiece</sub></p>'],
        ['Astronomical telescope and binoculars', '<p>An astronomical telescope uses an objective of <b>long</b> focal length and an eyepiece of <b>short</b> focal length. In normal adjustment the final image is at infinity and the lenses are f<sub>o</sub> + f<sub>e</sub> apart.</p><p class="formula">magnifying power = f<sub>o</sub> ÷ f<sub>e</sub></p><p>The image is inverted, which does not matter for stars. <b>Prism binoculars</b> use two right-angled prisms with total internal reflection to make the image upright and fold the light path, so the instrument is short.</p>'],
        ['Projection lantern and camera', '<p>A <b>projector</b> places the slide between F and 2F of a convex projection lens, so a real, inverted, <b>magnified</b> image falls on a distant screen. The slide is put in upside down so the picture is upright. A concave mirror and condenser lenses send plenty of light through the slide.</p><p>A <b>lens camera</b> places the object beyond 2F, giving a real, inverted, <b>diminished</b> image on the film or sensor. The aperture controls the amount of light, the shutter the exposure time, and moving the lens focuses the image.</p>'],
        ['The human eye and its defects', '<p>The cornea and the eye lens form a real, inverted image on the retina. Ciliary muscles change the thickness of the lens so that both near and far objects can be focused: <b>accommodation</b>. A normal eye sees clearly from the near point (25 cm) to the far point (infinity).</p><ul><li><b>Short sight:</b> the eyeball is too long or the lens too strong; distant objects focus in front of the retina. Corrected with a <b>concave</b> lens.</li><li><b>Long sight:</b> the eyeball is too short or the lens too weak; near objects would focus behind the retina. Corrected with a <b>convex</b> lens.</li><li><b>Presbyopia:</b> the lens stiffens with age; reading glasses (convex) help.</li></ul><p>The camera and the eye compare closely: lens ↔ lens, diaphragm ↔ iris, film ↔ retina. The camera focuses by moving the lens; the eye by changing its shape.</p>']
      ],
      quiz: [
        ['In a compound microscope, the objective lens forms an image that is…', ['virtual and upright', 'real, inverted and magnified', 'real and diminished', 'at infinity'], 1, 'The eyepiece then magnifies this real image.'],
        ['A telescope has lenses of focal lengths 90 cm and 3 cm. In normal adjustment the distance between them is…', ['30 cm', '87 cm', '93 cm', '270 cm'], 2, 'f₀ + fₑ = 90 + 3 = 93 cm.'],
        ['In a slide projector, the slide is placed…', ['inside F', 'at F', 'between F and 2F', 'beyond 2F'], 2, 'This gives a real, inverted, magnified image on the screen.'],
        ['The eye focuses on objects at different distances by…', ['moving the lens forward and back', 'changing the thickness of the lens', 'changing the size of the retina', 'closing the pupil'], 1, 'This is called accommodation.'],
        ['A long-sighted person needs spectacles with…', ['concave lenses', 'convex lenses', 'plane glass', 'prisms'], 1, 'A converging lens helps bring near objects to a focus on the retina.'],
        ['Which part of the camera does the same job as the iris of the eye?', ['Shutter', 'Film', 'Diaphragm (aperture)', 'Lens'], 2, 'Both control how much light enters.']
      ]
    },
    {
      id: 'expansion', icon: 'thermo', title: 'Thermal expansion', sims: ['expansion'],
      blurb: 'How solids, liquids and gases expand when heated, and the gas laws.',
      notes: [
        ['Expansion of solids', '<p>Most substances expand when heated and contract when cooled, because their particles vibrate more and move further apart.</p><p class="formula">linear expansivity α = ΔL ÷ (L<sub>0</sub> × Δθ)</p><p>The unit of α is per kelvin (K<sup>−1</sup>). Steel ≈ 1.2 × 10<sup>−5</sup> K<sup>−1</sup>; brass ≈ 1.9 × 10<sup>−5</sup> K<sup>−1</sup>; aluminium ≈ 2.3 × 10<sup>−5</sup> K<sup>−1</sup>.</p><p>Worked example: a 20 m steel rail warms by 30 K. ΔL = 1.2 × 10<sup>−5</sup> × 20 × 30 = 0.0072 m = 7.2 mm.</p>'],
        ['Expansion in daily life', '<p><b>Problems and allowances:</b> gaps between railway rails and concrete slabs, rollers under bridges, sagging power lines in hot weather, loops in steam pipes.</p><p><b>Uses:</b> fitting a hot iron tyre onto a wheel, rivets.</p><p>A <b>bimetallic strip</b> is two metals (often brass and iron) riveted together. On heating, the brass expands more, so the strip bends with the <b>brass on the outside</b> of the curve. It is used in thermostats (irons, heaters), fire alarms and dial thermometers.</p>'],
        ['Expansion of liquids and water', '<p>Liquids expand more than solids. The <b>real</b> expansion of a liquid is larger than its <b>apparent</b> expansion, because the container also expands.</p><p><b>Anomalous expansion of water:</b> from 0 °C to 4 °C water <b>contracts</b> when heated; above 4 °C it expands. Water is densest at 4 °C. So a pond freezes from the top down: the 4 °C water sinks, ice floats and insulates the water below, and fish survive. Water expands on freezing, which is why frozen pipes burst.</p>'],
        ['Expansion of gases: the gas laws', '<p>For a fixed mass of gas, using absolute temperature T in kelvin (T = θ + 273):</p><ul><li><b>Boyle’s law</b> (constant temperature): pV = constant.</li><li><b>Charles’s law</b> (constant pressure): V ÷ T = constant.</li><li><b>Pressure law</b> (constant volume): p ÷ T = constant.</li></ul><p class="formula">p<sub>1</sub>V<sub>1</sub> ÷ T<sub>1</sub> = p<sub>2</sub>V<sub>2</sub> ÷ T<sub>2</sub></p><p><b>Absolute zero</b>, 0 K (−273 °C), is the temperature at which the volume of an ideal gas would shrink to zero.</p>']
      ],
      quiz: [
        ['When a bimetallic strip of brass and iron is heated, it bends with…', ['iron on the outside', 'brass on the outside', 'no bending', 'both metals shrinking'], 1, 'Brass expands more, so it is on the longer, outer side.'],
        ['Gaps are left between railway rails to…', ['save steel', 'allow for expansion in hot weather', 'let rain drain', 'reduce friction'], 1, 'Without gaps the rails would buckle.'],
        ['Water has its greatest density at…', ['0 °C', '4 °C', '50 °C', '100 °C'], 1, 'This is the anomalous expansion of water.'],
        ['27 °C on the absolute (Kelvin) scale is…', ['246 K', '273 K', '300 K', '327 K'], 2, 'T = 27 + 273 = 300 K.'],
        ['A gas occupies 200 cm³ at 300 K. At constant pressure, at 450 K its volume is…', ['133 cm³', '250 cm³', '300 cm³', '450 cm³'], 2, 'V₂ = 200 × 450/300 = 300 cm³ (Charles’s law).'],
        ['A 10 m aluminium rod (α = 2.3 × 10⁻⁵ K⁻¹) is heated by 100 K. It expands by…', ['0.23 mm', '2.3 mm', '23 mm', '230 mm'], 2, 'ΔL = 2.3 × 10⁻⁵ × 10 × 100 = 0.023 m = 23 mm.']
      ]
    },
    {
      id: 'heattransfer', icon: 'flame', title: 'Transfer of thermal energy', sims: ['heatflow'],
      blurb: 'Conduction, convection and radiation, and how we use and control them.',
      notes: [
        ['Conduction', '<p><b>Conduction</b> is the transfer of heat through a material from particle to particle, without the material itself moving. It is the main way heat moves in solids.</p><p>In metals, <b>free electrons</b> carry energy quickly, so metals are good conductors (copper, aluminium). Wood, plastic, glass, air and wool are poor conductors, or <b>insulators</b>.</p><p>Uses: metal cooking pots with plastic or wooden handles, woollen clothes and feathers trapping air, the wire gauze above a Bunsen burner.</p>'],
        ['Convection', '<p><b>Convection</b> is the transfer of heat by the movement of a fluid (liquid or gas). Heated fluid expands, becomes less dense and rises; cooler, denser fluid sinks to take its place. This sets up <b>convection currents</b>.</p><p>Examples: a kettle heats from the element at the bottom; a domestic hot-water system; ventilation of rooms; <b>sea breeze</b> by day (land warms faster, warm air rises over the land, cool air blows in from the sea) and <b>land breeze</b> at night.</p>'],
        ['Radiation', '<p><b>Radiation</b> is the transfer of heat by electromagnetic waves (infrared). It needs no medium, so it crosses empty space: this is how the Sun’s heat reaches Earth.</p><ul><li><b>Dull black</b> surfaces are good absorbers and good emitters.</li><li><b>Shiny, white or silvery</b> surfaces are poor absorbers and poor emitters; they reflect radiation.</li></ul><p>Uses: white clothes and roofs in hot weather, silvered emergency blankets, black solar water heaters, cooling fins painted black.</p>'],
        ['The vacuum flask', '<p>A vacuum (thermos) flask keeps hot things hot and cold things cold by reducing all three methods of heat transfer:</p><ul><li>the <b>vacuum</b> between the double glass walls stops conduction and convection;</li><li>the <b>silvered</b> inner surfaces reduce radiation;</li><li>the <b>stopper</b> (cork or plastic) reduces conduction and stops convection at the top;</li><li>the walls are thin glass, a poor conductor.</li></ul>']
      ],
      quiz: [
        ['Heat travels through a metal spoon mainly by…', ['convection', 'conduction', 'radiation', 'evaporation'], 1, 'Solids transfer heat by conduction.'],
        ['Metals are good conductors of heat mainly because they have…', ['heavy atoms', 'free electrons', 'high melting points', 'shiny surfaces'], 1, 'Free electrons carry energy rapidly through the metal.'],
        ['A sea breeze blows during the day because…', ['the sea warms faster than the land', 'warm air rises over the land and cool air moves in from the sea', 'water is a good conductor', 'the Sun heats the sea only'], 1, 'Land heats faster, setting up a convection current.'],
        ['Heat from the Sun reaches the Earth by…', ['conduction', 'convection', 'radiation', 'all three'], 2, 'Only radiation can cross the vacuum of space.'],
        ['Which surface is the best emitter of heat radiation?', ['Shiny silver', 'Dull black', 'Polished white', 'Clear glass'], 1, 'Dull black surfaces are good emitters and good absorbers.'],
        ['In a vacuum flask, the vacuum mainly reduces heat transfer by…', ['radiation only', 'conduction and convection', 'evaporation only', 'reflection'], 1, 'There are no particles in a vacuum to conduct or convect.']
      ]
    },
    {
      id: 'heatmeasure', icon: 'beaker', title: 'Measurement of thermal energy', sims: ['specificheat'],
      blurb: 'Heat capacity, specific heat capacity and latent heat, and how to measure them.',
      notes: [
        ['Heat capacity and specific heat capacity', '<p>The <b>heat capacity</b> C of a body is the heat needed to raise its temperature by 1 K: C = Q ÷ Δθ (J/K).</p><p>The <b>specific heat capacity</b> c of a substance is the heat needed to raise the temperature of 1 kg of it by 1 K.</p><p class="formula">Q = m c Δθ</p><p>Unit of c: J/(kg K). Water 4200, aluminium 900, iron 450, copper 390.</p><p>Water’s high specific heat capacity makes it a good coolant in car radiators and explains why the sea warms and cools slowly.</p>'],
        ['Measuring specific heat capacity', '<p><b>Electrical method:</b> a heater of power P (or voltage V and current I) warms a block of mass m for time t.</p><p class="formula">c = P t ÷ (m Δθ) = V I t ÷ (m Δθ)</p><p>Lag the block to reduce heat loss, and put oil in the thermometer hole for good contact.</p><p><b>Method of mixtures:</b> a hot solid is dropped into cold water in a calorimeter. Assuming no heat is lost:</p><p class="formula">heat lost by hot body = heat gained by cold water (+ calorimeter)</p>'],
        ['Latent heat', '<p>During a change of state, heat is taken in or given out with <b>no change in temperature</b>. This hidden heat is <b>latent heat</b>.</p><p class="formula">Q = m L</p><ul><li><b>Specific latent heat of fusion</b> (melting): ice ≈ 3.34 × 10<sup>5</sup> J/kg.</li><li><b>Specific latent heat of vaporisation</b> (boiling): water ≈ 2.26 × 10<sup>6</sup> J/kg.</li></ul><p>Steam at 100 °C scalds worse than water at 100 °C because it gives out its latent heat as it condenses on the skin.</p>'],
        ['Worked examples', '<p>1. How much heat raises 2 kg of water from 25 °C to 75 °C? Q = 2 × 4200 × 50 = 420 000 J.</p><p>2. A 100 W heater warms a 1 kg aluminium block by 10 K in 95 s. c = 100 × 95 ÷ (1 × 10) = 950 J/(kg K). The value is above 900 because some heat was lost to the surroundings.</p><p>3. Heat to melt 0.5 kg of ice at 0 °C: Q = 0.5 × 334 000 = 167 000 J.</p>']
      ],
      quiz: [
        ['The SI unit of specific heat capacity is…', ['J/kg', 'J/K', 'J/(kg K)', 'W/m'], 2, 'Heat per kilogram per kelvin.'],
        ['Heat needed to raise 3 kg of water by 10 K (c = 4200 J/(kg K)) is…', ['12 600 J', '42 000 J', '126 000 J', '1 260 000 J'], 2, 'Q = mcΔθ = 3 × 4200 × 10 = 126 000 J.'],
        ['While ice is melting, the heat supplied…', ['raises its temperature', 'is used to change the state, so the temperature stays constant', 'is lost to the air only', 'makes the ice denser'], 1, 'This is latent heat of fusion.'],
        ['Water is used in car radiators because it has…', ['a low boiling point', 'a high specific heat capacity', 'a low density', 'a high latent heat of fusion only'], 1, 'It takes in a lot of heat for a small temperature rise.'],
        ['A 50 W heater runs for 200 s and warms a 0.5 kg block by 20 K. The specific heat capacity is…', ['500 J/(kg K)', '1000 J/(kg K)', '2000 J/(kg K)', '250 J/(kg K)'], 1, 'c = Pt/(mΔθ) = 10 000 ÷ 10 = 1000 J/(kg K).'],
        ['Steam at 100 °C causes worse burns than boiling water because…', ['steam is hotter', 'steam gives out latent heat as it condenses', 'steam is denser', 'water conducts better'], 1, 'Each kilogram releases about 2.26 MJ when it condenses.']
      ]
    },
    {
      id: 'vapour', icon: 'drop', title: 'Vapour and humidity', sims: ['humidity'],
      blurb: 'Evaporation and boiling, saturated vapour, humidity and the dew point.',
      notes: [
        ['Evaporation and boiling', '<p><b>Evaporation</b> happens at the surface of a liquid at any temperature, as the fastest particles escape. It causes <b>cooling</b>, because the particles left behind have less energy on average.</p><p>Evaporation is faster when: the temperature is higher, the surface area is larger, there is a wind, and the air is dry (low humidity).</p><p><b>Boiling</b> happens throughout the liquid at one fixed temperature, the boiling point, with bubbles of vapour forming inside it.</p>'],
        ['Saturated vapour and boiling point', '<p>In a closed space above a liquid, vapour builds up until as many particles return to the liquid as leave it. The vapour is then <b>saturated</b>, and its pressure is the <b>saturated vapour pressure</b> (s.v.p.). S.v.p. rises with temperature.</p><p class="formula">A liquid boils when its s.v.p. equals the external pressure.</p><p>So the boiling point falls when the pressure falls. High on a mountain such as Kilimanjaro, water boils below 100 °C and food takes longer to cook. A <b>pressure cooker</b> raises the pressure, so water boils above 100 °C and food cooks faster.</p>'],
        ['Humidity', '<p><b>Absolute humidity</b> is the mass of water vapour in each cubic metre of air.</p><p class="formula">relative humidity = (actual vapour pressure ÷ s.v.p. at the air temperature) × 100%</p><p>The <b>dew point</b> is the temperature to which air must be cooled to become saturated. At the dew point the actual vapour pressure equals the s.v.p., so:</p><p class="formula">relative humidity = s.v.p. at the dew point ÷ s.v.p. at the air temperature × 100%</p>'],
        ['Hygrometers and weather', '<ul><li><b>Dew-point hygrometer:</b> a shiny container is cooled slowly until dew just forms on it. That temperature is the dew point.</li><li><b>Wet-and-dry bulb hygrometer:</b> evaporation cools the wet bulb. The drier the air, the bigger the difference between the two readings; tables give the relative humidity.</li><li><b>Hair hygrometer:</b> human hair lengthens in damp air.</li></ul><p><b>Dew</b> forms when surfaces cool below the dew point on clear nights. <b>Mist and fog</b> are droplets formed when air near the ground cools below its dew point. <b>Clouds</b> form when rising air cools. Comfort depends on humidity: on humid days sweat evaporates slowly and we feel hot and sticky.</p>']
      ],
      quiz: [
        ['Evaporation causes cooling because…', ['the liquid absorbs heat from the air', 'the most energetic particles escape, leaving slower ones behind', 'vapour is denser than liquid', 'the pressure increases'], 1, 'The average energy of the remaining particles falls.'],
        ['A liquid boils when its saturated vapour pressure equals…', ['zero', 'the external pressure', 'twice the atmospheric pressure', 'its density'], 1, 'Bubbles of vapour can then form inside the liquid.'],
        ['On a high mountain, water boils…', ['above 100 °C', 'at exactly 100 °C', 'below 100 °C', 'not at all'], 2, 'The air pressure is lower, so the boiling point falls.'],
        ['Which instrument measures relative humidity?', ['Barometer', 'Hygrometer', 'Hydrometer', 'Manometer'], 1, 'A hygrometer measures humidity.'],
        ['The dew point is the temperature at which…', ['water freezes', 'air becomes saturated with water vapour', 'water boils', 'clouds disappear'], 1, 'Cooling below it causes condensation.'],
        ['The s.v.p. at the dew point is 2.0 kPa and at the air temperature 4.0 kPa. The relative humidity is…', ['20%', '50%', '80%', '200%'], 1, 'RH = 2.0 ÷ 4.0 × 100% = 50%.']
      ]
    },
    {
      id: 'current3', icon: 'bulb', title: 'Current electricity', sims: ['bridge', 'circuit'],
      blurb: 'Electromotive force, internal resistance, the Wheatstone bridge and paying for electricity.',
      notes: [
        ['E.m.f. and internal resistance', '<p>The <b>electromotive force (e.m.f.)</b> E of a cell is the energy it gives to each coulomb of charge, measured in volts. It equals the voltage across the cell when no current flows.</p><p>A real cell has <b>internal resistance</b> r. When a current I flows, some voltage is “lost” inside the cell, so the terminal voltage V is less than E.</p><p class="formula">E = V + I r = I (R + r)</p><p>Worked example: a cell of e.m.f. 1.5 V and internal resistance 0.5 Ω drives current through a 2.5 Ω resistor. I = 1.5 ÷ 3.0 = 0.5 A; terminal voltage V = 0.5 × 2.5 = 1.25 V; lost volts = 0.25 V.</p>'],
        ['Cells and resistors in combination', '<ul><li><b>Cells in series:</b> e.m.f.s add, internal resistances add.</li><li><b>Identical cells in parallel:</b> the e.m.f. stays the same as one cell; the internal resistance is reduced, and the cells last longer.</li></ul><p class="formula">Series: R = R₁ + R₂ + … &nbsp;&nbsp; Parallel: 1/R = 1/R₁ + 1/R₂ + …</p><p class="formula">Resistivity: R = ρ L ÷ A</p>'],
        ['The Wheatstone bridge and metre bridge', '<p>A <b>Wheatstone bridge</b> has four resistors P, Q, R and S with a galvanometer across the middle. When the galvanometer reads zero the bridge is <b>balanced</b>:</p><p class="formula">P ÷ Q = R ÷ S</p><p>In a <b>metre bridge</b>, a uniform 1 m resistance wire replaces P and Q. A known resistance R and an unknown X are in the two gaps. A jockey slides along the wire to find the balance point at length l (cm) from the R end:</p><p class="formula">X = R × (100 − l) ÷ l</p><p>The method is accurate because no current flows through the galvanometer at balance, so its own resistance does not matter.</p>'],
        ['Electrical energy and its cost', '<p class="formula">P = V I = I² R = V² ÷ R &nbsp;&nbsp; energy = P t</p><p>Electricity companies charge per <b>kilowatt-hour (kWh)</b>, the energy used by a 1 kW appliance in 1 hour (1 kWh = 3.6 × 10<sup>6</sup> J).</p><p>Worked example: a 2000 W heater runs for 3 hours a day for 30 days. Energy = 2 kW × 90 h = 180 kWh. At TSh 350 per kWh the cost is TSh 63 000.</p><p>Choose a fuse rated just above the normal current: a 2000 W heater on 230 V takes about 8.7 A, so a 10 A or 13 A fuse is used, not 3 A.</p>']
      ],
      quiz: [
        ['The e.m.f. of a cell equals…', ['the terminal voltage when current flows', 'the voltage across it when no current flows', 'its internal resistance', 'the current it gives'], 1, 'With no current there are no lost volts.'],
        ['A cell of e.m.f. 3 V and internal resistance 1 Ω is connected to a 5 Ω resistor. The current is…', ['0.5 A', '0.6 A', '3 A', '15 A'], 0, 'I = E/(R + r) = 3 ÷ 6 = 0.5 A.'],
        ['A metre bridge balances at 40 cm with a known 6 Ω resistor in the left gap. The unknown resistance is…', ['4 Ω', '6 Ω', '9 Ω', '15 Ω'], 2, 'X = 6 × (100 − 40) ÷ 40 = 9 Ω.'],
        ['At balance in a Wheatstone bridge, the current through the galvanometer is…', ['maximum', 'zero', 'equal to the supply current', 'reversed'], 1, 'That is what balance means.'],
        ['A 100 W lamp is used for 10 hours. The energy used is…', ['0.1 kWh', '1 kWh', '10 kWh', '1000 kWh'], 1, '0.1 kW × 10 h = 1 kWh.'],
        ['Two identical cells connected in parallel give…', ['double the e.m.f.', 'the same e.m.f. as one cell', 'zero e.m.f.', 'half the e.m.f.'], 1, 'Parallel cells keep the e.m.f. but lower the internal resistance.']
      ]
    }
  ]
});

HL.courses.push({
  id: 'phy4', subject: 'phy', form: 4, title: 'Physics, Form Four',
  topics: [
    {
      id: 'waves', icon: 'wave', title: 'Waves', sims: ['waves'],
      blurb: 'Transverse and longitudinal waves, sound, music and the electromagnetic spectrum.',
      notes: [
        ['Concept of a wave', '<p>A <b>wave</b> is a disturbance that carries energy from one place to another without carrying the material along.</p><ul><li><b>Transverse wave:</b> particles vibrate at right angles to the direction the wave travels (water waves, waves on a rope, light). It has crests and troughs.</li><li><b>Longitudinal wave:</b> particles vibrate along the direction of travel (sound, a pushed slinky). It has compressions and rarefactions.</li></ul>'],
        ['Describing waves', '<ul><li><b>Amplitude (A):</b> the greatest displacement from the rest position.</li><li><b>Wavelength (λ):</b> the distance between two neighbouring crests, or two compressions.</li><li><b>Frequency (f):</b> the number of complete waves per second, in hertz (Hz).</li><li><b>Period (T):</b> the time for one complete wave. T = 1 ÷ f.</li></ul><p class="formula">v = f λ</p><p>Waves can be <b>reflected</b>, <b>refracted</b> (they change speed and direction entering a new medium), <b>diffracted</b> (they spread round obstacles and through gaps, most when the gap is about one wavelength) and they <b>interfere</b>. A ripple tank shows all of these.</p>'],
        ['Sound and music', '<p>Sound is a longitudinal wave made by vibrating objects. It needs a medium, so it cannot cross a vacuum. Its speed is about 340 m/s in air, faster in water and faster still in solids.</p><p>An <b>echo</b> is reflected sound: distance to the wall = v t ÷ 2. Echoes are used in sonar and ultrasound scans.</p><ul><li><b>Pitch</b> depends on frequency.</li><li><b>Loudness</b> depends on amplitude.</li><li><b>Quality (timbre)</b> depends on the overtones present, which is why a guitar and a flute playing the same note sound different.</li></ul><p>A stretched string gives a higher note when it is shorter, tighter or thinner. <b>Resonance</b> happens when a body is made to vibrate at its own natural frequency.</p>'],
        ['Electromagnetic waves', '<p>Electromagnetic waves are transverse, need no medium and all travel at 3 × 10<sup>8</sup> m/s in a vacuum. In order of increasing frequency (decreasing wavelength):</p><p class="formula">radio → microwaves → infrared → visible light → ultraviolet → X-rays → gamma rays</p><ul><li>Radio: broadcasting, mobile phones. Microwaves: cooking, satellite links. Infrared: heaters, remote controls.</li><li>Ultraviolet: sterilising, detecting forged notes; too much damages skin and eyes.</li><li>X-rays: imaging bones; gamma rays: killing cancer cells, sterilising equipment. Both can damage living cells.</li></ul>']
      ],
      quiz: [
        ['In a longitudinal wave, the particles vibrate…', ['at right angles to the direction of travel', 'along the direction of travel', 'in circles', 'not at all'], 1, 'Sound is an example.'],
        ['A wave has frequency 50 Hz and wavelength 4 m. Its speed is…', ['12.5 m/s', '54 m/s', '200 m/s', '0.08 m/s'], 2, 'v = fλ = 50 × 4 = 200 m/s.'],
        ['The pitch of a note depends on its…', ['amplitude', 'frequency', 'speed', 'quality'], 1, 'Higher frequency gives higher pitch.'],
        ['A girl hears the echo from a cliff 2 s after shouting (speed of sound 340 m/s). The cliff is…', ['170 m away', '340 m away', '680 m away', '85 m away'], 1, 'd = vt/2 = 340 × 2 ÷ 2 = 340 m.'],
        ['Sound cannot travel through…', ['water', 'steel', 'a vacuum', 'air'], 2, 'Sound needs a medium.'],
        ['Which electromagnetic waves have the highest frequency?', ['Radio waves', 'Infrared', 'Ultraviolet', 'Gamma rays'], 3, 'Gamma rays have the shortest wavelength and highest frequency.']
      ]
    },
    {
      id: 'electromag', icon: 'coil', title: 'Electromagnetism', sims: ['induction'],
      blurb: 'Magnetic effects of currents, motors, generators and transformers.',
      notes: [
        ['Magnetic field of a current', '<p>A current in a wire produces a magnetic field around it.</p><ul><li><b>Straight wire:</b> circular field lines. Direction by the <b>right-hand grip rule</b>: thumb along the current, fingers curl the way of the field.</li><li><b>Solenoid (coil):</b> a field like a bar magnet’s. Grip the coil with the fingers along the current; the thumb points to the north pole.</li></ul><p>An <b>electromagnet</b> is a solenoid with a soft-iron core. It is stronger with more turns, a larger current and a soft-iron core. Uses: electric bell, relay, magnetic crane, loudspeaker.</p>'],
        ['Force on a current and the motor', '<p>A current-carrying wire in a magnetic field feels a force. Its direction is given by <b>Fleming’s left-hand rule</b>: <b>F</b>irst finger = Field, se<b>C</b>ond finger = Current, thu<b>M</b>b = Motion (force).</p><p>The force is larger with a stronger field, a larger current and a longer length of wire in the field.</p><p>In a <b>d.c. motor</b>, forces on the two sides of a coil turn it. A <b>split-ring commutator</b> reverses the current every half turn so the coil keeps turning the same way.</p>'],
        ['Electromagnetic induction', '<p>When the magnetic field linking a conductor <b>changes</b>, an e.m.f. is induced in it. A current flows if the circuit is complete.</p><ul><li><b>Faraday’s law:</b> the induced e.m.f. is proportional to the rate of change of magnetic flux. Moving the magnet faster, using a stronger magnet or more turns gives a larger e.m.f.</li><li><b>Lenz’s law:</b> the induced current flows in a direction that <b>opposes</b> the change producing it. Pushing a N pole into a coil makes a N pole at that end of the coil.</li><li><b>Fleming’s right-hand rule</b> gives the direction of the induced current in a moving wire.</li></ul>'],
        ['Generators and transformers', '<p>An <b>a.c. generator</b> turns a coil in a magnetic field. Slip rings connect it to the circuit, giving alternating current.</p><p>A <b>transformer</b> changes an alternating voltage using two coils on an iron core:</p><p class="formula">V<sub>s</sub> ÷ V<sub>p</sub> = N<sub>s</sub> ÷ N<sub>p</sub> &nbsp;&nbsp; for an ideal transformer V<sub>p</sub> I<sub>p</sub> = V<sub>s</sub> I<sub>s</sub></p><p>Step-up transformers raise voltage; step-down transformers lower it. Electricity is sent across the country at very high voltage so the current, and therefore the I²R heat loss in the cables, is small. A transformer does not work on steady d.c., because the field must keep changing.</p>']
      ],
      quiz: [
        ['The direction of the magnetic field around a straight current-carrying wire is given by…', ['Fleming’s left-hand rule', 'the right-hand grip rule', 'Lenz’s law', 'Ohm’s law'], 1, 'Thumb along the current, fingers show the field.'],
        ['The split-ring commutator in a d.c. motor…', ['increases the current', 'reverses the current in the coil every half turn', 'makes alternating current', 'stores charge'], 1, 'This keeps the coil turning in one direction.'],
        ['Which change would NOT increase the e.m.f. induced by moving a magnet into a coil?', ['Moving the magnet faster', 'Using more turns', 'Using a stronger magnet', 'Holding the magnet still inside the coil'], 3, 'No change of flux means no induced e.m.f.'],
        ['Lenz’s law states that the induced current…', ['is always large', 'opposes the change that produces it', 'flows only in straight wires', 'is the same as the original current'], 1, 'This follows from conservation of energy.'],
        ['A transformer has 200 primary turns and 1000 secondary turns. With 12 V a.c. in, the output is…', ['2.4 V', '12 V', '60 V', '1200 V'], 2, 'Vs = 12 × 1000/200 = 60 V.'],
        ['Electricity is transmitted at high voltage in order to…', ['make it travel faster', 'reduce the current and heat loss in the cables', 'increase the frequency', 'make it safer at home'], 1, 'Power loss in the cables is I²R.']
      ]
    },
    {
      id: 'nuclear', icon: 'radio', title: 'Physics of the atom', sims: ['decay'],
      blurb: 'The nucleus, radioactivity, half-life, nuclear reactions and radiation safety.',
      notes: [
        ['The nucleus', '<p>An atom has a tiny, dense nucleus of protons and neutrons (<b>nucleons</b>) with electrons around it. A nuclide is written <sup>A</sup><sub>Z</sub>X, where Z is the atomic (proton) number and A the mass (nucleon) number.</p><p><b>Isotopes</b> have the same Z but different A, for example <sup>12</sup><sub>6</sub>C and <sup>14</sup><sub>6</sub>C.</p>'],
        ['Natural radioactivity', '<p>Unstable nuclei decay randomly and give out radiation.</p><ul><li><b>Alpha (α):</b> a helium nucleus, <sup>4</sup><sub>2</sub>He, charge +2. Strongly ionising, stopped by a sheet of paper or a few cm of air. A goes down by 4, Z by 2.</li><li><b>Beta (β):</b> a fast electron, charge −1. Stopped by a few mm of aluminium. A stays the same, Z goes up by 1.</li><li><b>Gamma (γ):</b> an electromagnetic wave, no charge. Weakly ionising; reduced only by thick lead or concrete. A and Z do not change.</li></ul><p>In electric and magnetic fields, α and β bend in opposite directions; γ is not deflected. Detectors: Geiger–Müller tube, cloud chamber, photographic film.</p><p class="formula"><sup>238</sup><sub>92</sub>U → <sup>234</sup><sub>90</sub>Th + <sup>4</sup><sub>2</sub>He</p>'],
        ['Half-life', '<p>The <b>half-life</b> is the time taken for half the radioactive nuclei in a sample to decay, or for its activity to halve. It is fixed for each nuclide and cannot be changed by heating or chemical reaction.</p><p>Worked example: a sample has activity 800 counts/min and half-life 2 days. After 6 days (3 half-lives) the activity is 800 → 400 → 200 → 100 counts/min.</p><p>Always subtract the <b>background count</b> (from rocks, cosmic rays and other natural sources) before working out half-life.</p>'],
        ['Uses, hazards and nuclear energy', '<p><b>Uses:</b> radiotherapy for cancer, sterilising medical equipment, tracers in medicine and industry, thickness gauges in factories, smoke detectors (α), carbon-14 dating.</p><p><b>Safety:</b> handle sources with tongs, never point them at people, store them in lead-lined boxes, keep exposure time short and distance large, and wear film badges.</p><p><b>Nuclear fission:</b> a heavy nucleus such as uranium-235 splits into two lighter nuclei and releases neutrons and energy, causing a chain reaction (nuclear power stations). <b>Fusion:</b> light nuclei join to form a heavier one, as in the Sun. The energy comes from a loss of mass: E = mc².</p>']
      ],
      quiz: [
        ['Which radiation is stopped by a sheet of paper?', ['Alpha', 'Beta', 'Gamma', 'X-rays'], 0, 'Alpha particles are large and strongly ionising.'],
        ['When a nucleus emits a beta particle, its proton number…', ['falls by 2', 'falls by 1', 'rises by 1', 'stays the same'], 2, 'A neutron changes into a proton and an electron.'],
        ['When ²²⁶₈₈Ra emits an alpha particle, the new nucleus has…', ['A = 222, Z = 86', 'A = 226, Z = 87', 'A = 224, Z = 86', 'A = 222, Z = 88'], 0, 'A falls by 4 and Z by 2.'],
        ['A source has a half-life of 3 hours. What fraction remains after 9 hours?', ['1/3', '1/4', '1/8', '1/9'], 2, '9 h = 3 half-lives: ½ × ½ × ½ = 1/8.'],
        ['Gamma rays are not deflected by a magnetic field because they…', ['travel too fast', 'have no charge', 'are very heavy', 'are stopped by air'], 1, 'They are electromagnetic waves.'],
        ['The splitting of a heavy nucleus into lighter ones with release of energy is…', ['fusion', 'fission', 'ionisation', 'radiation'], 1, 'Used in nuclear power stations.']
      ]
    },
    {
      id: 'thermionic', icon: 'bolt', title: 'Thermionic emission', sims: ['crt'],
      blurb: 'Electrons boiled off hot metals, cathode rays, the CRO and X-rays.',
      notes: [
        ['Concept of thermionic emission', '<p><b>Thermionic emission</b> is the release of electrons from the surface of a heated metal. Heating gives the free electrons enough energy to escape.</p><p>It is done in an evacuated tube so the electrons are not stopped by air. A heated filament (cathode) gives off electrons, and a positive anode attracts them.</p>'],
        ['Cathode rays and their properties', '<p><b>Cathode rays</b> are streams of fast electrons. They:</p><ul><li>travel in straight lines and cast sharp shadows;</li><li>carry negative charge, so they are deflected <b>towards</b> a positive plate in an electric field;</li><li>are deflected by a magnetic field (direction by Fleming’s left-hand rule, remembering that conventional current is opposite to electron flow);</li><li>cause certain substances to glow (fluorescence);</li><li>carry kinetic energy and produce heat and X-rays when stopped by a metal target.</li></ul>'],
        ['The cathode-ray oscilloscope', '<p>A <b>CRO</b> has an <b>electron gun</b> (heated cathode, grid to control brightness, anodes to accelerate and focus the beam), <b>deflecting plates</b> (Y plates move the spot up and down, X plates sweep it across) and a <b>fluorescent screen</b>.</p><p>Uses: measuring d.c. and a.c. voltages, displaying wave shapes, measuring frequency and time intervals. A larger accelerating voltage gives faster electrons, which are deflected less by the same plate voltage.</p>'],
        ['X-rays', '<p>X-rays are produced when very fast electrons hit a heavy-metal target (such as tungsten) in an X-ray tube. Most of the electrons’ energy becomes heat, so the target is cooled.</p><p>Properties: electromagnetic, travel at the speed of light, not deflected by fields, penetrate matter, ionise gases, affect photographic film.</p><p>Uses: imaging bones and teeth, checking welds and luggage, crystal analysis. They damage living cells, so exposure is kept short and staff are shielded with lead.</p>']
      ],
      quiz: [
        ['Thermionic emission is the release of electrons from…', ['a cold metal in light', 'a heated metal surface', 'a charged insulator', 'a radioactive nucleus'], 1, 'Heat gives the electrons energy to escape.'],
        ['Cathode rays are…', ['streams of protons', 'streams of electrons', 'electromagnetic waves', 'neutral atoms'], 1, 'They are fast-moving electrons.'],
        ['Between two charged plates, a cathode-ray beam bends towards…', ['the negative plate', 'the positive plate', 'neither plate', 'the screen only'], 1, 'Electrons are negatively charged.'],
        ['The tube of a CRO is evacuated so that…', ['the screen glows', 'electrons are not stopped by air molecules', 'the tube is lighter', 'X-rays are produced'], 1, 'Electrons would collide with gas particles.'],
        ['X-rays are produced when…', ['light hits a metal', 'fast electrons strike a metal target', 'a metal is heated', 'nuclei split'], 1, 'The electrons’ kinetic energy is converted.'],
        ['In a CRO, the Y-plates…', ['heat the cathode', 'move the spot up and down', 'accelerate the electrons', 'make the screen glow'], 1, 'X-plates move the spot sideways.']
      ]
    },
    {
      id: 'electronics', icon: 'chip', title: 'Electronics', sims: ['diode'],
      blurb: 'Semiconductors, diodes, rectifiers, transistors and amplifiers.',
      notes: [
        ['Band theory and classifying solids', '<p>Electrons in a solid occupy energy <b>bands</b>. The <b>valence band</b> holds bound electrons; the <b>conduction band</b> holds electrons free to move. Between them is the <b>energy gap</b>.</p><ul><li><b>Conductors</b> (metals): the bands overlap, so many free electrons.</li><li><b>Insulators:</b> a wide gap; electrons cannot reach the conduction band.</li><li><b>Semiconductors</b> (silicon, germanium): a small gap. Heat or light lifts some electrons across, so their resistance <b>falls</b> as temperature rises.</li></ul>'],
        ['Types of semiconductors', '<p>A pure semiconductor is <b>intrinsic</b>. <b>Doping</b> (adding a tiny amount of impurity) makes it <b>extrinsic</b>:</p><ul><li><b>n-type:</b> doped with a pentavalent element (phosphorus, arsenic). Extra free <b>electrons</b> are the majority carriers.</li><li><b>p-type:</b> doped with a trivalent element (boron, gallium). Missing electrons, called <b>holes</b>, are the majority carriers.</li></ul>'],
        ['The p–n junction diode and rectification', '<p>Where p-type meets n-type, a <b>depletion layer</b> with no free carriers forms.</p><ul><li><b>Forward bias</b> (p to +, n to −): the depletion layer narrows and current flows.</li><li><b>Reverse bias:</b> the layer widens and almost no current flows.</li></ul><p>A diode lets current flow one way only, so it is used to change a.c. to d.c.: <b>rectification</b>.</p><ul><li><b>Half-wave:</b> one diode; only half of each cycle passes.</li><li><b>Full-wave (bridge):</b> four diodes; both halves pass in the same direction.</li><li><b>Smoothing:</b> a capacitor across the load fills in the gaps, giving almost steady d.c.</li></ul>'],
        ['Transistors and amplifiers', '<p>A <b>transistor</b> has three layers (n–p–n or p–n–p) and three leads: emitter, base and collector. A small base current controls a much larger collector current.</p><p class="formula">current gain β = I<sub>C</sub> ÷ I<sub>B</sub></p><p>Uses: as a <b>switch</b> (in alarms and automatic lights with an LDR or thermistor) and as an <b>amplifier</b> (radios, microphones, hearing aids). Integrated circuits hold thousands or millions of transistors on one silicon chip.</p>']
      ],
      quiz: [
        ['The resistance of a semiconductor, as its temperature rises…', ['rises', 'falls', 'stays the same', 'becomes infinite'], 1, 'More electrons reach the conduction band.'],
        ['An n-type semiconductor is made by doping silicon with…', ['boron', 'phosphorus', 'aluminium', 'gallium'], 1, 'A pentavalent impurity gives extra electrons.'],
        ['In a p-type semiconductor, the majority charge carriers are…', ['electrons', 'holes', 'protons', 'ions'], 1, 'Trivalent impurities create holes.'],
        ['A diode conducts when it is…', ['reverse biased', 'forward biased', 'disconnected', 'heated only'], 1, 'Forward bias narrows the depletion layer.'],
        ['A bridge rectifier uses…', ['one diode', 'two diodes', 'four diodes', 'one transistor'], 2, 'Four diodes give full-wave rectification.'],
        ['A transistor has a base current of 0.1 mA and collector current of 10 mA. Its current gain is…', ['0.01', '10', '100', '1000'], 2, 'β = 10 ÷ 0.1 = 100.']
      ]
    },
    {
      id: 'astronomy', icon: 'planet', title: 'Elementary astronomy', sims: ['moon'],
      blurb: 'Constellations, the solar system, gravity, the Moon’s phases and eclipses.',
      notes: [
        ['Concept of astronomy and constellations', '<p><b>Astronomy</b> is the study of objects in space: stars, planets, moons, comets and galaxies.</p><p>A <b>constellation</b> is a group of stars that forms a recognisable pattern in the sky, such as <b>Orion</b> (the Hunter) and the <b>Southern Cross</b> (Crux). The Southern Cross points towards the south, so travellers and fishermen in the southern hemisphere have used it to find direction. Stars seem to move across the sky each night because the Earth rotates.</p>'],
        ['The solar system', '<p>The <b>Sun</b> is a star at the centre of our solar system. Eight planets orbit it, in order from the Sun:</p><p class="formula">Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune</p><p>The four inner planets are small and rocky. The four outer planets are large gas or ice giants. An <b>asteroid belt</b> lies between Mars and Jupiter. <b>Comets</b> are lumps of ice and dust on long orbits; they grow tails pointing away from the Sun. Planets shine by reflected sunlight; stars make their own light.</p>'],
        ['Gravitational force', '<p><b>Newton’s law of universal gravitation:</b> every two masses attract each other with a force proportional to the product of their masses and inversely proportional to the square of the distance between them.</p><p class="formula">F = G m₁ m₂ ÷ r² &nbsp;&nbsp; G = 6.67 × 10<sup>−11</sup> N m²/kg²</p><p>Gravity keeps the Moon in orbit around the Earth and the planets around the Sun. If the distance doubles, the force falls to a quarter.</p>'],
        ['The Earth and its Moon', '<ul><li><b>Day and night:</b> the Earth spins on its axis once in about 24 hours.</li><li><b>Year:</b> the Earth orbits the Sun once in about 365¼ days.</li><li><b>Seasons:</b> the Earth’s axis is tilted about 23.5°, so each hemisphere leans towards the Sun for part of the year.</li><li><b>Phases of the Moon:</b> we see different amounts of the Moon’s sunlit half as it orbits us, about every 29.5 days: new moon, waxing crescent, first quarter, waxing gibbous, full moon, then waning back.</li><li><b>Solar eclipse:</b> the Moon passes between the Sun and Earth (at new moon) and its shadow falls on Earth.</li><li><b>Lunar eclipse:</b> the Earth passes between the Sun and Moon (at full moon) and the Moon enters Earth’s shadow.</li><li><b>Tides</b> are caused mainly by the Moon’s gravity pulling on the oceans.</li></ul>']
      ],
      quiz: [
        ['The planet closest to the Sun is…', ['Venus', 'Mercury', 'Mars', 'Earth'], 1, 'Mercury is the innermost planet.'],
        ['The asteroid belt lies between…', ['Earth and Mars', 'Mars and Jupiter', 'Jupiter and Saturn', 'Venus and Earth'], 1, 'Most asteroids orbit between Mars and Jupiter.'],
        ['If the distance between two masses doubles, the gravitational force between them becomes…', ['twice as large', 'half as large', 'a quarter as large', 'four times as large'], 2, 'F is proportional to 1/r².'],
        ['A solar eclipse can happen only at…', ['full moon', 'new moon', 'first quarter', 'any phase'], 1, 'The Moon must be between the Sun and the Earth.'],
        ['The seasons are caused by…', ['the Earth’s distance from the Sun changing greatly', 'the tilt of the Earth’s axis', 'the phases of the Moon', 'the Sun’s rotation'], 1, 'The 23.5° tilt changes how directly sunlight hits each hemisphere.'],
        ['Which constellation is used to find south in the southern hemisphere?', ['The Plough', 'Orion', 'The Southern Cross', 'Leo'], 2, 'The Southern Cross points roughly south.']
      ]
    },
    {
      id: 'earth', icon: 'globe', title: 'Physics of the Earth and its atmosphere', sims: ['waves'],
      blurb: 'The Earth’s layers, earthquakes and volcanoes, the atmosphere and global warming.',
      notes: [
        ['Structure and composition of the Earth', '<ul><li><b>Crust:</b> thin, solid, rocky outer layer; thicker under continents than under oceans.</li><li><b>Mantle:</b> hot, mostly solid rock that flows very slowly.</li><li><b>Outer core:</b> liquid iron and nickel. Its motion produces the Earth’s magnetic field.</li><li><b>Inner core:</b> solid iron and nickel, very hot and under enormous pressure.</li></ul><p>The crust and the top of the mantle are broken into <b>tectonic plates</b> that move a few centimetres a year.</p>'],
        ['Earthquakes and seismic waves', '<p>An <b>earthquake</b> is a sudden shaking of the ground when rocks slip along a fault, usually at plate boundaries. Seismic waves travel out from the <b>focus</b>; the point on the surface above it is the <b>epicentre</b>.</p><ul><li><b>P-waves</b> (primary): longitudinal, fastest, travel through solids and liquids.</li><li><b>S-waves</b> (secondary): transverse, slower, travel through solids only. Because S-waves do not pass through the outer core, we know it is liquid.</li><li><b>Surface waves:</b> slowest and most destructive.</li></ul><p>A <b>seismometer</b> records the waves. Magnitude is given on the Richter scale.</p>'],
        ['Volcanoes', '<p>A <b>volcano</b> is an opening in the crust through which molten rock (<b>magma</b>, called <b>lava</b> at the surface), gases and ash escape. Tanzania lies on the <b>East African Rift</b>, where plates are pulling apart. Kilimanjaro and Meru are volcanoes, and Ol Doinyo Lengai near Lake Natron is still active.</p><p>Benefits include fertile volcanic soils and geothermal energy. Dangers include lava flows, ash and poisonous gases.</p>'],
        ['The atmosphere and global warming', '<p><b>Composition of dry air:</b> nitrogen about 78%, oxygen about 21%, argon about 0.9%, carbon dioxide about 0.04%, plus variable water vapour.</p><ul><li><b>Troposphere:</b> lowest layer, where weather happens; temperature falls with height.</li><li><b>Stratosphere:</b> contains the <b>ozone layer</b>, which absorbs harmful ultraviolet radiation.</li><li><b>Mesosphere</b> and <b>thermosphere</b> above.</li></ul><p><b>Greenhouse effect:</b> the Earth’s surface gives out infrared radiation, and gases such as carbon dioxide, methane and water vapour absorb some of it and keep the Earth warm. Burning fossil fuels and cutting forests add more of these gases, causing <b>global warming</b>: rising temperatures, melting glaciers (including on Kilimanjaro), rising seas and changing rainfall.</p>']
      ],
      quiz: [
        ['Which layer of the Earth is liquid?', ['Crust', 'Mantle', 'Outer core', 'Inner core'], 2, 'S-waves cannot pass through it.'],
        ['S-waves cannot travel through…', ['solids', 'liquids', 'rock', 'the crust'], 1, 'They are transverse waves and need a rigid medium.'],
        ['The point on the Earth’s surface directly above the focus of an earthquake is the…', ['core', 'epicentre', 'fault', 'crater'], 1, 'The epicentre is above the focus.'],
        ['The ozone layer is found in the…', ['troposphere', 'stratosphere', 'mesosphere', 'crust'], 1, 'It absorbs ultraviolet radiation.'],
        ['The gas making up about 78% of dry air is…', ['oxygen', 'carbon dioxide', 'nitrogen', 'argon'], 2, 'Nitrogen is the main gas in air.'],
        ['Which gas is a major cause of the enhanced greenhouse effect?', ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Argon'], 2, 'It absorbs infrared radiation from the Earth.']
      ]
    }
  ]
});
