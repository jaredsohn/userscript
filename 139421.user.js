// ==UserScript==
// @id VortexMobile
// @name Vortex Mobilehehe
// @version 1.0
// @namespace
// @author
// @description
// @include http://*.pokemonvortex.org/mobile/map.php?map=*
// @include http://*.pokemonvortex.org/mobile/wildbattle.php
// @run-at document-end
// ==/UserScript==

var rareCustoms = [ 
    
    //Shiny
	'Shiny Smeargle', 'Shiny Miltank', 'Shiny Dunsparce', 'Shiny Cacnea', 'Shiny Happiny', 'Shiny Pichu', 'Shiny Rattata', 'Shiny Buneary',
    'Shiny Cherubi', 'Shiny Bellsprout', 'Shiny Bulbasaur', 'Shiny Oddish', 'Shiny Mankey', 'Shiny Caterpie', 'Shiny Pidgey', 'Shiny Weedle',
    'Shiny Nidoran (M)', 'Shiny Nidoran (F)', 'Shiny Carnivine', 'Shiny Chikorita', 'Shiny Turtwig', 'Shiny Exeggcute', 'Shiny Seedot', 
    'Shiny Lotad', 'Shiny ', 'Shiny Tropius', 'Shiny Zigzagoon', 'Shiny Wurmple', 'Shiny Burmy (Plant)', 'Shiny Burmy (Steel)', 'Shiny Treecko',
    'Shiny Spearow', 'Shiny Ekans', 'Shiny Igglybuff', 'Shiny Venonat', 'Shiny Meowth', 'Shiny Ponyta', 'Shiny Farfetchd', 'Shiny Doduo',
    'Shiny Lickitung', 'Shiny Tangela', 'Shiny Scyther', 'Shiny Pinsir', 'Shiny Tauros', 'Shiny Eevee', 'Shiny Sentret', 'Shiny Hoothoot',
    'Shiny Ledyba', 'Shiny Spinarak', 'Shiny Togepi', 'Shiny Hoppip', 'Shiny Aipom', 'Shiny Sunkern', 'Shiny Yanma', 'Shiny Murkrow',
    'Shiny Girafarig', 'Shiny Pineco', 'Shiny Snubbull', 'Shiny Heracross', 'Shiny Skarmory', 'Shiny Phanpy', 'Shiny Stantler', 'Shiny Tyrogue',
    'Shiny Poochyena', 'Shiny Taillow', 'Shiny Shroomish', 'Shiny Slakoth', 'Shiny Nincada', 'Shiny Whismur', 'Shiny Skitty', 'Shiny Plusle',
    'Shiny Minun ', 'Shiny Volbeat', 'Shiny Illumise', 'Shiny Budew', 'Shiny Spinda', 'Shiny Swablu', 'Shiny Zangoose', 'Shiny Seviper',
    'Shiny Castform', 'Shiny Kecleon', 'Shiny Absol', 'Shiny Starly', 'Shiny Bidoof', 'Shiny Kricketot', 'Shiny Combee', 'Shiny Glameow',
    'Shiny Stunky', 'Shiny Chatot', 'Shiny Munchlax', 'Shiny Skorupi', 'Shiny Croagunk', 'Shiny Snivy', 'Shiny Patrat', 'Shiny Lillipup',
    'Shiny Pansage', 'Shiny Pidove', 'Shiny Blitzle', 'Shiny Drilbur', 'Shiny Audino', 'Shiny Sewaddle', 'Shiny Venipede', 'Shiny Cottonee',
    'Shiny Petilil', 'Shiny Maractus', 'Shiny Trubbish', 'Shiny Minccino', 'Shiny Deerling (Autumn)', 'Shiny Deerling (Spring)', 'Shiny Deerling (Summer)',
    'Shiny Deerling (Winter)', 'Shiny Karrablast', 'Shiny Foongus', 'Shiny Joltik', 'Shiny Ferroseed', 'Shiny Shelmet', 'Shiny Bouffalant',
    'Shiny Rufflet', 'Shiny Durant', 'Shiny Pikachu', 'Shiny Raticate', 'Shiny Lopunny', 'Shiny Weepinbell', 'Shiny Beedrill', 'Shiny Ivysaur',
    'Shiny Gloom', 'Shiny Primeape', 'Shiny Butterfree', 'Shiny Pidgeot', 'Shiny Arbok', 'Shiny Servine', 'Shiny Watchog', 'Shiny Herdier', 'Shiny Braviary',
    'Shiny Snover', 'Shiny Abomasnow', 'Shiny Unown (N)', 'Shiny Unown (O)', 'Shiny Unown (P)', 'Shiny Unown (Q)',
    'Shiny Unown (R)', 'Shiny Unown (S)', 'Shiny Unown (T)', 'Shiny Unown (U)', 'Shiny Unown (V)', 'Shiny Unown (W)', 'Shiny Unown (X)',
    'Shiny Unown (Y)', 'Shiny Unown (Z)', 'Shiny Unown (Qm)', 'Shiny Unown (Ex)', 'Shiny Delibird', 'Shiny Snorunt',
    'Shiny Swinub', 'Shiny Piloswine', 'Shiny Gible', 'Shiny Smoochum', 'Shiny Bronzor', 'Shiny Slowpoke', 'Shiny Seel',
    'Shiny Spheal', 'Shiny Zubat', 'Shiny Sneasel', 'Shiny Wynaut', 'Shiny Vanillite', 'Shiny Cubchoo', 'Shiny Cryogonal',
    'Shiny Dewgong', 'Shiny Jynx', 'Shiny Weavile', 'Shiny Golbat', 'Shiny Vanillish', 'Shiny Castform (Ice)',
    'Shiny Charmander', 'Shiny Vulpix', 'Shiny Growlithe', 'Shiny Ponyta', 'Shiny Magby', 'Shiny Cyndaquil', 'Shiny Slugma', 'Shiny Torchic',
    'Shiny Torkoal', 'Shiny Chimchar', 'Shiny Numel', 'Shiny Houndour', 'Shiny Solrock', 'Shiny Lunatone', 'Shiny Onix', 'Shiny ', 'Shiny Trapinch',
    'Shiny Larvitar', 'Shiny Magmar', 'Shiny Flareon', 'Shiny Houndoom', 'Shiny Charmeleon', 'Shiny Tepig', 'Shiny Pansear', 'Shiny Darumaka',
    'Shiny Litwick', 'Shiny Heatmor', 'Shiny Larvesta', 'Shiny Simisear', 'Shiny Lampent', 'Shiny Castform (Fire)',
    'Shiny Rattata', 'Shiny Pidgey','Shiny Spearow', 'Shiny Grimer', 'Shiny Elekid', 'Shiny Magnemite', 'Shiny Voltorb', 'Shiny Shinx',
    'Shiny Pichu', 'Shiny Electrike', 'Shiny Pachirisu', 'Shiny Starly', 'Shiny Hoothoot', 'Shiny Mareep', 'Shiny Dunsparce',
    'Shiny Gulpin', 'Shiny Stunky', 'Shiny Swablu', 'Shiny Burmy (Steel)', 'Shiny Koffing', 'Shiny Raichu', 'Shiny Altaria', 'Shiny Electabuzz',
    'Shiny Staravia', 'Shiny Pidgeotto', 'Shiny Pidove', 'Shiny Blitzle', 'Shiny Drilbur', 'Shiny Audino', 'Shiny Trubbish', 'Shiny Emolga', 'Shiny Foongus',
    'Shiny Joltik', 'Shiny Ferroseed', 'Shiny Klink', 'Shiny Tynamo', 'Shiny Stunfisk', 'Shiny Rufflet', 'Shiny Durant', 'Shiny Mienfoo',
    'Shiny Zebstrika', 'Shiny Excadrill', 'Shiny Whirlipede', 'Shiny Escavalier', 'Shiny Klinklang', 'Shiny Pichu (Notched)',
    'Shiny Burmy (Sand)', 'Shiny Sandshrew', 'Shiny Cleffa', 'Shiny Zubat', 'Shiny Paras', 'Shiny Diglett', 'Shiny Machop',
    'Shiny Geodude', 'Shiny Onix', 'Shiny Cubone', 'Shiny Rhyhorn', 'Shiny Kangaskhan', 'Shiny Ditto', 'Shiny Aerodactyl',
    'Shiny Dratini', 'Shiny Bonsly', 'Shiny Unown (A)', 'Shiny Unown (B)', 'Shiny Unown (C)', 'Shiny Unown (D)',
    'Shiny Unown (E)', 'Shiny Unown (F)', 'Shiny Unown (G)', 'Shiny Unown (H)', 'Shiny Unown (I)', 'Shiny Unown (J)',
    'Shiny Unown (K)', 'Shiny Unown (L)', 'Shiny Unown (M)', 'Shiny Gligar', 'Shiny Shuckle', 'Shiny Teddiursa',
    'Shiny Phanpy', 'Shiny Larvitar', 'Shiny Makuhita', 'Shiny Nosepass', 'Shiny Mawile', 'Shiny Aron', 'Shiny Trapinch',
    'Shiny Lileep', 'Shiny Anorith', 'Shiny Bagon', 'Shiny Beldum', 'Shiny Cranidos', 'Shiny Shieldon', 'Shiny Riolu',
    'Shiny Hippopotas', 'Shiny Roggenrola', 'Shiny Drilbur', 'Shiny Timburr', 'Shiny Tympole', 'Shiny Throh',
    'Shiny Sawk', 'Shiny Sandile', 'Shiny Dwebble', 'Shiny Scraggy', 'Shiny Tirtouga', 'Shiny Archen', 'Shiny Pawniard',
    'Shiny Durant', 'Shiny Deino', 'Shiny Axew', 'Shiny Druddigon', 'Shiny Golett', 'Shiny Steelix', 'Shiny Metang',
    'Shiny Bronzong', 'Shiny Graveler', 'Shiny Golem', 'Shiny Onix', 'Shiny Pupitar', 'Shiny Aerodactyl',
    'Shiny Armaldo', 'Shiny Rampardos', 'Shiny Fraxure', 'Shiny Boldore', 'Shiny Excadrill', 'Shiny Archeops', 'Shiny Ferrothorn',
    'Shiny Zweilous',
    'Shiny Venonat', 'Shiny Kricketot', 'Shiny Exeggcute', 'Shiny Murkrow', 'Shiny Spiritomb', 'Shiny Bronzor', 'Shiny Drifloon',
    'Shiny Hoothoot', 'Shiny Mime Jr.', 'Shiny Abra', 'Shiny Kadabra', 'Shiny Misdreavus', 'Shiny Illumise', 'Shiny Duskull',
    'Shiny Volbeat', 'Shiny Natu', 'Shiny Shuppet', 'Shiny Baltoy', 'Shiny Sableye', 'Shiny Drowzee', 'Shiny Girafarig', 'Shiny Meditite',
    'Shiny Chingling', 'Shiny Porygon', 'Shiny Gastly', 'Shiny Spinarak', 'Shiny Wynaut', 'Shiny Spoink', 'Shiny Poochyena',
    'Shiny Ralts', 'Shiny Purrloin', 'Shiny Munna', 'Shiny Woobat', 'Shiny Sandile', 'Shiny Scraggy', 'Shiny Sigilyph', 'Shiny Yamask',
    'Shiny Trubbish', 'Shiny Zorua', 'Shiny Gothita', 'Shiny Solosis', 'Shiny Foongus', 'Shiny Elgyem', 'Shiny Litwick',
    'Shiny Golett', 'Shiny Pawniard', 'Shiny Vullaby', 'Shiny Deino', 'Shiny Liepard', 'Shiny Krookodile', 'Shiny Cofagrigus', 'Shiny Venomoth',
    'Shiny Squirtle', 'Shiny Psyduck', 'Shiny Poliwang', 'Shiny Tentacool', 'Shiny Krabby', 'Shiny Horsea', 'Shiny Goldeen', 
    'Shiny Staryu', 'Shiny  Magikarp', 'Shiny Totodile', 'Shiny Chinchou', 'Shiny Azurill', 'Shiny Remoraid', 'Shiny Lotoad',
    'Shiny Wingull', 'Shiny Surskit', 'Shiny Wailmer', 'Shiny Corpish', 'Shiny Feebas', 'Shiny Luvdisc', 'Shiny Piplup',
    'Shiny Buizel', 'Shiny Shellos (East)', 'Shiny Shellos (West)', 'Shiny Mantyke', 'Shiny Oshawott', 'Shiny Panpour', 'Shiny Alomomola',
    'Shiny Castform (Water)',
    'Shiny Dratinire', 'Shiny Dratinilic', 'Shiny Dratinice', 
    //Mystic
    'Mystic Smeargle', 'Mystic Miltank', 'Mystic Dunsparce', 'Mystic Cacnea', 'Mystic Happiny', 'Mystic Pichu', 'Mystic Rattata',
    'Mystic Buneary', 'Mystic Cherubi', 'Mystic Bellsprout', 'Mystic Bulbasaur', 'Mystic Oddish', 'Mystic Mankey', 'Mystic Caterpie',
    'Mystic Pidgey', 'Mystic Weedle', 'Mystic Nidoran (M)', 'Mystic Nidoran (F)', 'Mystic Carnivine', 'Mystic Chikorita', 'Mystic Turtwig',
    'Mystic Exeggcute', 'Mystic Seedot', 'Mystic Lotad', 'Mystic Tropius', 'Mystic Zigzagoon', 'Mystic Wurmple', 'Mystic Burmy (Plant)',
    'Mystic Burmy (Steel)', 'Mystic Treecko', 'Mystic Spearow', 'Mystic Ekans', 'Mystic Igglybuff', 'Mystic Venonat', 'Mystic Meowth',
    'Mystic Ponyta', 'Mystic Farfetchd', 'Mystic Doduo', 'Mystic Lickitung', 'Mystic Tangela', 'Mystic Scyther', 'Mystic Pinsir', 'Mystic Tauros',
    'Mystic Eevee', 'Mystic Sentret', 'Mystic Hoothoot', 'Mystic Ledyba', 'Mystic Spinarak', 'Mystic Togepi', 'Mystic Hoppip', 'Mystic Aipom',
    'Mystic Sunkern', 'Mystic Yanma', 'Mystic Murkrow', 'Mystic Girafarig', 'Mystic Pineco', 'Mystic Snubbull', 'Mystic Heracross',
    'Mystic Skarmory', 'Mystic Phanpy', 'Mystic Stantler', 'Mystic Tyrogue', 'Mystic Poochyena', 'Mystic Taillow', 'Mystic Shroomish',
    'Mystic Slakoth', 'Mystic Nincada', 'Mystic Whismur', 'Mystic Skitty', 'Mystic Plusle', 'Mystic Minun', 'Mystic Volbeat',
    'Mystic Illumise', 'Mystic Budew', 'Mystic Spinda', 'Mystic Swablu', 'Mystic Zangoose', 'Mystic Seviper', 'Mystic Castform', 'Mystic Kecleon',
    'Mystic Absol', 'Mystic Starly', 'Mystic Bidoof', 'Mystic Kricketot', 'Mystic Combee', 'Mystic Glameow', 'Mystic Stunky', 'Mystic Chatot',
    'Mystic Munchlax', 'Mystic Skorupi', 'Mystic Croagunk', 'Mystic Snivy', 'Mystic Patrat', 'Mystic Lillipup', 'Mystic Pansage',
    'Mystic Pidove', 'Mystic Blitzle', 'Mystic Drilbur', 'Mystic Audino', 'Mystic Sewaddle', 'Mystic Venipede', 'Mystic Cottonee',
    'Mystic Petilil', 'Mystic Maractus', 'Mystic Trubbish', 'Mystic Minccino', 'Mystic Deerling (Autumn)', 'Mystic Deerling (Spring)',
    'Mystic Deerling (Summer)', 'Mystic Deerling (Winter)', 'Mystic Karrablast', 'Mystic Foongus', 'Mystic Joltik', 'Mystic Ferroseed',
    'Mystic Shelmet', 'Mystic Bouffalant', 'Mystic Rufflet', 'Mystic Durant', 'Mystic Pikachu', 'Mystic Raticate', 'Mystic Lopunny',
    'Mystic Weepinbell', 'Mystic Beedrill', 'Mystic Ivysaur', 'Mystic Gloom', 'Mystic Primeape', 'Mystic Butterfree', 'Mystic Pidgeot', 'Mystic Arbok',
    'Mystic Servine', 'Mystic Watchog', 'Mystic Herdier', 'Mystic Braviary',
    'Mystic Squirtle', 'Mystic Psyduck', 'Mystic Poliwang', 'Mystic Tentacool', 'Mystic Krabby', 'Mystic Horsea', 'Mystic Goldeen', 
    'Mystic Staryu', 'Mystic  Magikarp', 'Mystic Totodile', 'Mystic Chinchou', 'Mystic Azurill', 'Mystic Remoraid', 'Mystic Lotoad',
    'Mystic Wingull', 'Mystic Surskit', 'Mystic Wailmer', 'Mystic Corpish', 'Mystic Feebas', 'Mystic Luvdisc', 'Mystic Piplup',
    'Mystic Buizel', 'Mystic Shellos (East)', 'Mystic Shellos (West)', 'Mystic Mantyke', 'Mystic Oshawott', 'Mystic Panpour', 'Mystic Alomomola',
    'Mystic Castform (Water)',
    'Mystic Snover', 'Mystic Abomasnow', 'Mystic Unown (N)', 'Mystic Unown (O)', 'Mystic Unown (P)', 'Mystic Unown (Q)', 'Mystic  (R)',
    'Mystic Unown (S)', 'Mystic Unown (T)', 'Mystic Unown (U)', 'Mystic Unown (V)', 'Mystic Unown (W)', 'Mystic Unown (X)', 'Mystic Unown (Y)',
    'Mystic Unown (Z)', 'Mystic Unown (Qm)', 'Mystic  (Ex)', 'Mystic Snorunt', 'Mystic Swinub', 'Mystic ', 'Mystic Gible', 'Mystic Smoochum',
    'Mystic Bronzor', 'Mystic Slowpoke', 'Mystic Seel', 'Mystic Spheal', 'Mystic Zubat', 'Mystic Wynaut', 'Mystic Vanillite', 'Mystic Cubchoo',
    'Mystic Cryogonal', 'Mystic ', 'Mystic Jynx', 'Mystic Weavile', 'Mystic Golbat', 'Mystic Vanillish', 'Mystic Castform (Ice)',
    'Mystic Burmy (Sand)', 'Mystic Sandshrew', 'Mystic Cleffa', 'Mystic Paras', 'Mystic Machop', 'Mystic Geodude', 'Mystic Onix', 'Mystic Cubone',
    'Mystic Rhyhorn', 'Mystic Kangaskhan', 'Mystic Ditto', 'Mystic Aerodactyl', 'Mystic Dratini', 'Mystic Bonsly', 'Mystic Unown (A)', 'Mystic Unown (B)',
    'Mystic Unown (C)', 'Mystic Unown (D)', 'Mystic Unown (E)', 'Mystic Unown (F)', 'Mystic Unown (G)', 'Mystic Unown (H)', 'Mystic Unown (I)',
    'Mystic Unown (J)', 'Mystic Unown (K)', 'Mystic Unown (L)', 'Mystic Unown (M)', 'Mystic Gligar', 'Mystic Shuckle', 'Mystic Phanpy',
    'Mystic Larvitar', 'Mystic Makuhita', 'Mystic Nosepass', 'Mystic Mawile', 'Mystic Aron', 'Mystic Trapinch', 'Mystic Lileep', 'Mystic Anorith',
    'Mystic Bagon', 'Mystic Beldum', 'Mystic Cranidos', 'Mystic Shieldon', 'Mystic Riolu', 'Mystic Hippopotas', 'Mystic Roggenrola', 'Mystic Drilbur',
    'Mystic Timburr', 'Mystic Tympole', 'Mystic Throh', 'Mystic Sawk', 'Mystic Sandile', 'Mystic Dwebble', 'Mystic Scraggy', 'Mystic Tirtouga', 'Mystic Archen',
    'Mystic Pawniard', 'Mystic Deino', 'Mystic Axew', 'Mystic Druddigon', 'Mystic Golett', 'Mystic Steelix', 'Mystic Metang', 'Mystic Bronzong',
    'Mystic Graveler', 'Mystic Golem', 'Mystic Onix', 'Mystic Pupitar', 'Mystic Aerodactyl', 'Mystic Armaldo', 'Mystic Rampardos',
    'Mystic Fraxure', 'Mystic Boldore', 'Mystic Excadrill', 'Mystic Archeops', 'Mystic Ferrothorn', 'Mystic Zweilous',
    'Mystic Shellder', 'Mystic Magikarp', 'Mystic Lapras', 'Mystic Omanyte', 'Mystic Kabuto', 'Mystic Wooper', 'Mystic Qwilfish',
    'Mystic Corsola', 'Mystic Mudkip', 'Mystic Carvanha', 'Mystic Barboach', 'Mystic Spheal', 'Mystic Clamperl', 'Mystic Relicanth',
    'Mystic Finneon', 'Mystic Oshawott', 'Mystic Tympole', 'Mystic Basculin (Red Stripe)', 'Mystic Tirtouga', 'Mystic Ducklett', 'Mystic Vanillite',
    'Mystic Frillish', 'Mystic Cubchoo', 'Mystic Alomomola', 'Mystic Kabutops', 'Mystic Omastar', 'Mystic Simipour', 'Mystic Palpitoad', 'Mystic Carracosta',
    'Mystic Venonat', 'Mystic Kricketot', 'Mystic Exeggcute', 'Mystic Murkrow', 'Mystic Spiritomb', 'Mystic Bronzor', 'Mystic Drifloon', 'Mystic Hoothoot',
    'Mystic Mime Jr.', 'Mystic Abra', 'Mystic Kadabra', 'Mystic Misdreavus', 'Mystic Illumise', 'Mystic Duskull', 'Mystic Volbeat', 'Mystic Natu',
    'Mystic Shuppet', 'Mystic Baltoy', 'Mystic Sableye', 'Mystic Drowzee', 'Mystic Girafarig', 'Mystic Meditite', 'Mystic Chingling',
    'Mystic Porygon', 'Mystic Gastly', 'Mystic Spinarak', 'Mystic Wynaut', 'Mystic Spoink', 'Mystic Poochyena', 'Mystic Ralts', 'Mystic Purrloin',
    'Mystic Munna', 'Mystic Woobat', 'Mystic Sandile', 'Mystic Scraggy', 'Mystic Sigilyph', 'Mystic Yamask', 'Mystic Trubbish', 'Mystic Zorua',
    'Mystic Gothita', 'Mystic Solosis', 'Mystic Foongus', 'Mystic Elgyem', 'Mystic Golett', 'Mystic Pawniard', 'Mystic Deino', 'Mystic Liepard',
    'Mystic Krookodile', 'Mystic Cofagrigus', 'Mystic Venomoth',
    'Mystic Rattata', 'Mystic Pidgey', 'Mystic Spearow', 'Mystic Elekid', 'Mystic Magnemite', 'Mystic Voltorb', 'Mystic Shinx', 'Mystic Pichu',
    'Mystic Electrike', 'Mystic Pachirisu', 'Mystic Starly', 'Mystic Hoothoot', 'Mystic Mareep', 'Mystic Dunsparce', 'Mystic Gulpin', 'Mystic Stunky', 'Mystic Swablu', 'Mystic Burmy (Steel)',
    'Mystic Koffing', 'Mystic Raichu', 'Mystic Altaria', 'Mystic Electabuzz', 'Mystic Staravia', 'Mystic Pidgeotto', 'Mystic Pidove', 'Mystic Blitzle',
    'Mystic Drilbur', 'Mystic Audino', 'Mystic Trubbish', 'Mystic Emolga', 'Mystic Foongus', 'Mystic Joltik', 'Mystic Ferroseed', 'Mystic Klink', 
    'Mystic Tynamo', 'Mystic Stunfisk', 'Mystic Rufflet', 'Mystic Durant', 'Mystic Mienfoo', 'Mystic Zebstrika', 'Mystic Excadrill', 'Mystic Whirlipede',
    'Mystic Escavalier', 'Mystic Klinklang', 'Mystic Pichu (Notched)',
    'Mystic Charmander', 'Mystic Vulpix', 'Mystic Growlithe', 'Mystic Ponyta', 'Mystic Magby', 'Mystic Cyndaquil', 'Mystic Slugma', 'Mystic Torchic',
    'Mystic Torkoal', 'Mystic Chimchar', 'Mystic Numel', 'Mystic Houndour', 'Mystic Solrock', 'Mystic Lunatone', 'Mystic Onix', 'Mystic Aron',
    'Mystic Trapinch', 'Mystic Larvitar', 'Mystic Magmar', 'Mystic Flareon', 'Mystic Houndoom', 'Mystic Charmeleon', 'Mystic Tepig', 'Mystic Pansear',
    'Mystic Darumaka', 'Mystic Litwick', 'Mystic Heatmor', 'Mystic Larvesta', 'Mystic Simisear', 'Mystic Lampent', 'Mystic Castform (Fire)',
    'Mystic Dratinire', 'Mystic Dratinilic', 'Mystic Dratinice',
    //Dark
    'Dark Smeargle', 'Dark Miltank', 'Dark Dunsparce', 'Dark Cacnea', 'Dark Happiny', 'Dark Pichu', 'Dark Rattata', 'Dark Buneary', 'Dark Cherubi',
    'Dark Bellsprout', 'Dark Bulbasaur', 'Dark Oddish', 'Dark Mankey', 'Dark Caterpie', 'Dark Pidgey', 'Dark Weedle', 'Dark Nidoran (M)',
    'Dark Nidoran (F)', 'Dark Carnivine', 'Dark Chikorita', 'Dark Turtwig', 'Dark Exeggcute', 'Dark Seedot', 'Dark Lotad', 'Dark Tropius',
    'Dark Zigzagoon', 'Dark Wurmple', 'Dark Burmy (Plant)', 'Dark Burmy (Steel)', 'Dark Treecko', 'Dark Spearow', 'Dark Ekans', 'Dark Igglybuff',
    'Dark Venonat', 'Dark Meowth', 'Dark Ponyta', 'Dark Farfetchd', 'Dark Doduo', 'Dark Lickitung', 'Dark Tangela', 'Dark Scyther',
    'Dark Pinsir', 'Dark Tauros', 'Dark Eevee', 'Dark Sentret', 'Dark Hoothoot', 'Dark Ledyba', 'Dark Spinarak', 'Dark Togepi',
    'Dark Hoppip', 'Dark Aipom', 'Dark Sunkern', 'Dark Yanma', 'Dark Murkrow', 'Dark Girafarig', 'Dark Pineco', 'Dark Snubbull',
    'Dark Heracross', 'Dark Skarmory', 'Dark Phanpy', 'Dark Stantler', 'Dark Tyrogue', 'Dark Poochyena', 'Dark Taillow', 'Dark Shroomish',
    'Dark Slakoth', 'Dark Nincada', 'Dark Whismur', 'Dark Skitty', 'Dark Plusle', 'Dark Minun', 'Dark Volbeat', 'Dark Illumise', 'Dark Budew',
    'Dark Spinda', 'Dark Swablu', 'Dark Zangoose', 'Dark Seviper', 'Dark Castform', 'Dark Kecleon', 'Dark Absol', 'Dark Starly', 'Dark Bidoof',
    'Dark Kricketot', 'Dark Combee', 'Dark Glameow', 'Dark Stunky', 'Dark Chatot', 'Dark Munchlax', 'Dark Skorupi', 'Dark Croagunk',
    'Dark Snivy', 'Dark Patrat', 'Dark Lillipup', 'Dark Pansage', 'Dark Pidove', 'Dark Blitzle', 'Dark Drilbur', 'Dark Audino',
    'Dark Sewaddle', 'Dark Venipede', 'Dark Cottonee', 'Dark Petilil', 'Dark Maractus', 'Dark Trubbish', 'Dark Minccino',
    'Dark Deerling (Autumn)', 'Dark Deerling (Spring)', 'Dark Deerling (Summer)', 'Dark Deerling (Winter)', 'Dark Karrablast',
    'Dark Foongus', 'Dark Joltik', 'Dark Ferroseed', 'Dark Shelmet', 'Dark Bouffalant', 'Dark Rufflet', 'Dark Durant', 'Dark Pikachu',
    'Dark Lopunny', 'Dark Weepinbell', 'Dark Beedrill', 'Dark Ivysaur', 'Dark Gloom', 'Dark Primeape', 'Dark Butterfree', 'Dark Pidgeot',
    'Dark Arbok', 'Dark Servine', 'Dark Watchog', 'Dark Herdier', 'Dark Braviary',
    'Dark Squirtle', 'Dark Psyduck', 'Dark Poliwang', 'Dark Tentacool', 'Dark  Krabby', 'Dark Horsea', 'Dark Goldeen', 
    'Dark Staryu', 'Dark Magikarp', 'Dark Totodile', 'Dark Chinchou', 'Dark  Azurill', 'Dark Remoraid', 'Dark Lotoad',
    'Dark Wingull', 'Dark Surskit', 'Dark Wailmer', 'Dark Corpish', 'Dark Feebas', 'Dark Luvdisc', 'Dark Piplup',
    'Dark Buizel', 'Dark Shellos (East)', 'Dark  Shellos (West)', 'Dark Mantyke', 'Dark Oshawott', 'Dark Panpour', 'Dark Alomomola',
    'Dark Castform (Water)',
    'Dark Snover', 'Dark Abomasnow', 'Dark Unown (N)', 'Dark Unown (O)', 'Dark Unown (P)', 'Dark Unown (Q)', 'Dark Unown (R)',
    'Dark Unown (S)', 'Dark Unown (T)', 'Dark Unown (U)', 'Dark Unown (V)', 'Dark Unown (W)', 'Dark Unown (X)', 'Dark Unown (Y)',
    'Dark Unown (Z)', 'Dark  (Qm)', 'Dark (Ex)', 'Dark Piloswine', 'Dark Gible', 'Dark Smoochum', 'Dark Bronzor', 'Dark Slowpoke',
    'Dark Seel', 'Dark Spheal', 'Dark Zubat', 'Dark Sneasel', 'Dark Wynaut', 'Dark Vanillite', 'Dark Cubchoo', 'Dark Cryogonal',
    'Dark Dewgong', 'Dark Jynx', 'Dark Weavile', 'Dark Golbat', 'Dark Vanillish', 'Dark Castform (Ice)',
    'Dark Burmy (Sand)', 'Dark Sandshrew', 'Dark Cleffa', 'Dark Zubat', 'Dark Paras', 'Dark Diglett', 'Dark Machop', 'Dark Geodude',
    'Dark Onix', 'Dark Cubone', 'Dark Rhyhorn', 'Dark Kangaskhan', 'Dark Ditto', 'Dark Aerodactyl', 'Dark Dratini', 'Dark Bonsly',
    'Dark Unown (A)', 'Dark Unown (B)', 'Dark Unown (C)', 'Dark Unown (D)', 'Dark Unown (E)', 'Dark Unown (F)', 'Dark Unown (G)',
    'Dark Unown (H)', 'Dark Unown (I)', 'Dark Unown (J)', 'Dark Unown (K)', 'Dark Unown (L)', 'Dark Unown (M)', 'Dark Gligar', 'Dark Shuckle',
    'Dark Teddiursa', 'Dark Phanpy', 'Dark Larvitar', 'Dark Makuhita', 'Dark Nosepass', 'Dark Mawile', 'Dark Aron', 'Dark Trapinch',
    'Dark Lileep', 'Dark Anorith', 'Dark Bagon', 'Dark Beldum', 'Dark Cranidos', 'Dark Shieldon', 'Dark Riolu', 'Dark Hippopotas',
    'Dark Roggenrola', 'Dark Drilbur', 'Dark Timburr', 'Dark Tympole', 'Dark Throh', 'Dark Sawk', 'Dark Sandile', 'Dark Dwebble',
    'Dark Scraggy', 'Dark Tirtouga', 'Dark Archen', 'Dark Pawniard', 'Dark Durant', 'Dark Deino', 'Dark Axew', 'Dark Druddigon', 'Dark Golett', 
    'Dark Steelix', 'Dark Metang', 'Dark Bronzong', 'Dark Graveler', 'Dark Golem', 'Dark Onix', 'Dark Pupitar', 'Dark Aerodactyl', 'Dark Armaldo',
    'Dark Rampardos', 'Dark Fraxure', 'Dark Boldore', 'Dark Excadrill', 'Dark Archeops', 'Dark Ferrothorn', 'Dark Zweilous',
    'Dark Lapras', 'Dark Omanyte', 'Dark Kabuto', 'Dark Wooper', 'Dark Qwilfish', 'Dark Corsola', 'Dark Mudkip', 'Dark Carvanha',
    'Dark Barboach', 'Dark Spheal', 'Dark Clamperl', 'Dark Relicanth', 'Dark Finneon', 'Dark Oshawott', 'Dark Panpour',
    'Dark Tympole', 'Dark Basculin (Red Stripe)', 'Dark Tirtouga', 'Dark Ducklett', 'Dark Vanillite', 'Dark Frillish', 'Dark Cubchoo',
    'Dark Alomomola', 'Dark Kabutops', 'Dark Omastar', 'Dark Simipour', 'Dark Palpitoad', 'Dark Carracosta',
    'Dark Venonat', 'Dark Kricketot', 'Dark Exeggcute', 'Dark Murkrow', 'Dark Spiritomb', 'Dark Bronzor', 'Dark Drifloon', 'Dark Hoothoot',
    'Dark Mime Jr.', 'Dark Abra', 'Dark Kadabra', 'Dark Misdreavus', 'Dark Illumise', 'Dark Duskull', 'Dark Volbeat', 'Dark Natu',
    'Dark Shuppet', 'Dark Baltoy', 'Dark Sableye', 'Dark Drowzee', 'Dark Girafarig', 'Dark Meditite', 'Dark Chingling', 'Dark Porygon',
    'Dark Gastly', 'Dark Spinarak', 'Dark Wynaut', 'Dark Spoink', 'Dark Poochyena', 'Dark Ralts', 'Dark Purrloin', 'Dark Munna', 'Dark Woobat',
    'Dark Sandile', 'Dark Scraggy', 'Dark Sigilyph', 'Dark Yamask', 'Dark Trubbish', 'Dark Zorua', 'Dark Gothita', 'Dark Solosis', 'Dark Foongus',
    'Dark Elgyem', 'Dark Litwick', 'Dark Golett', 'Dark Pawniard', 'Dark Vullaby', 'Dark Liepard', 'Dark Krookodile', 'Dark Cofagrigus', 'Dark Venomoth',
    'Dark Rattata', 'Dark Pidgey', 'Dark Spearow', 'Dark Grimer', 'Dark Elekid', 'Dark Magnemite', 'Dark Voltorb', 'Dark Shinx', 'Dark Pichu',
    'Dark Electrike', 'Dark Pachirisu', 'Dark Starly', 'Dark Hoothoot', 'Dark Mareep', 'Dark Dunsparce', 'Dark Gulpin', 'Dark Stunky', 'Dark Swablu', 'Dark Burmy (Steel)',
    'Dark Koffing', 'Dark Raichu', 'Dark Altaria', 'Dark Electabuzz', 'Dark Staravia', 'Dark Pidgeotto', 'Dark Pidove', 'Dark Blitzle', 'Dark Drilbur',
    'Dark Audino', 'Dark Trubbish', 'Dark Emolga', 'Dark Foongus', 'Dark Joltik', 'Dark Ferroseed', 'Dark Klink', 'Dark Tynamo', 'Dark Stunfisk',
    'Dark Rufflet', 'Dark Durant', 'Dark Mienfoo', 'Dark Zebstrika', 'Dark Excadrill', 'Dark Whirlipede', 'Dark Escavalier', 'Dark Klinklang', 'Dark Pichu (Notched)',
    'Dark Charmander', 'Dark Vulpix', 'Dark Growlithe', 'Dark Ponyta', 'Dark Magby', 'Dark Cyndaquil', 'Dark Slugma', 'Dark Torchic', 'Dark Torkoal', 'Dark Chimchar',
    'Dark Numel', 'Dark Houndour', 'Dark Solrock', 'Dark Lunatone', 'Dark Onix', 'Dark Aron', 'Dark Trapinch', 'Dark Larvitar', 'Dark Magmar', 'Dark Flareon',
    'Dark Houndoom', 'Dark Charmeleon', 'Dark Tepig', 'Dark Pansear', 'Dark Darumaka', 'Dark Litwick', 'Dark Heatmor', 'Dark Larvesta', 'Dark Simisear',
    'Dark Lampent', 'Dark Castform (Fire)',
    'Dark Dratinire', 'Dark Dratinilic', 'Dark Dratinice',
    //Ancient
    'Ancient Smeargle', 'Ancient Miltank', 'Ancient Dunsparce', 'Ancient Cacnea', 'Ancient Happiny', 'Ancient Pichu', 'Ancient Rattata', 'Ancient Buneary',
    'Ancient Cherubi', 'Ancient Bellsprout', 'Ancient Bulbasaur', 'Ancient Oddish', 'Ancient Mankey', 'Ancient Caterpie', 'Ancient Pidgey', 'Ancient Weedle',
    'Ancient Nidoran (M)', 'Ancient Nidoran (F)', 'Ancient Carnivine', 'Ancient Chikorita', 'Ancient Turtwig', 'Ancient Exeggcute', 'Ancient Seedot',
    'Ancient Lotad', 'Ancient Tropius', 'Ancient Zigzagoon', 'Ancient Wurmple', 'Ancient Burmy (Plant)', 'Ancient Burmy (Steel)', 'Ancient Treecko',
    'Ancient Spearow', 'Ancient Ekans', 'Ancient Igglybuff', 'Ancient Venonat', 'Ancient Meowth', 'Ancient Ponyta', 'Ancient Farfetchd', 'Ancient Doduo',
    'Ancient Lickitung', 'Ancient Tangela', 'Ancient Scyther', 'Ancient Pinsir', 'Ancient Tauros', 'Ancient Eevee', 'Ancient Sentret',
    'Ancient Hoothoot', 'Ancient Ledyba', 'Ancient Spinarak', 'Ancient Togepi', 'Ancient Hoppip', 'Ancient Aipom', 'Ancient Sunkern',
    'Ancient Yanma', 'Ancient Murkrow', 'Ancient Girafarig', 'Ancient Pineco', 'Ancient Snubbull', 'Ancient Heracross', 'Ancient Skarmory',
    'Ancient Phanpy', 'Ancient Stantler', 'Ancient Tyrogue', 'Ancient Poochyena', 'Ancient Taillow', 'Ancient Shroomish', 'Ancient Slakoth',
    'Ancient Nincada', 'Ancient Whismur', 'Ancient Skitty', 'Ancient Plusle', 'Ancient Minun', 'Ancient Volbeat', 'Ancient Illumise', 'Ancient Budew',
    'Ancient Spinda', 'Ancient Swablu', 'Ancient Zangoose', 'Ancient Seviper', 'Ancient Castform', 'Ancient Kecleon', 'Ancient Absol', 'Ancient Starly',
    'Ancient Bidoof', 'Ancient Kricketot', 'Ancient Combee', 'Ancient Glameow', 'Ancient Stunky', 'Ancient Chatot', 'Ancient Munchlax',
    'Ancient Skorupi', 'Ancient Croagunk', 'Ancient Snivy', 'Ancient Patrat', 'Ancient Lillipup', 'Ancient Pansage', 'Ancient Pidove', 'Ancient Blitzle',
    'Ancient Drilbur', 'Ancient Audino', 'Ancient Sewaddle', 'Ancient Venipede', 'Ancient Cottonee', 'Ancient Petilil', 'Ancient Maractus',
    'Ancient Trubbish', 'Ancient Minccino', 'Ancient Deerling (Autumn)', 'Ancient Deerling (Spring)', 'Ancient Deerling (Summer)', 'Ancient Deerling (Winter)',
    'Ancient Karrablast', 'Ancient Foongus', 'Ancient Joltik', 'Ancient Ferroseed', 'Ancient Shelmet', 'Ancient Bouffalant', 'Ancient Rufflet', 'Ancient Durant',
    'Ancient Pikachu', 'Ancient Raticate', 'Ancient Lopunny', 'Ancient Weepinbell', 'Ancient Beedrill', 'Ancient Ivysaur', 'Ancient Gloom',
    'Ancient Primeape', 'Ancient Butterfree', 'Ancient Pidgeot', 'Ancient Arbok', 'Ancient Servine', 'Ancient Watchog', 'Ancient Herdier', 'Ancient Braviary',
    'Ancient Squirtle', 'Ancient Psyduck', 'Ancient Poliwang', 'Ancient Tentacool', 'Ancient Krabby', 'Ancient Horsea', 'Ancient Goldeen', 
    'Ancient Staryu', 'Ancient Magikarp', 'Ancient Totodile', 'Ancient Chinchou', 'Ancient Azurill', 'Ancient Remoraid', 'Ancient Lotoad',
    'Ancient Wingull', 'Ancient Surskit', 'Ancient Wailmer', 'Ancient Corpish', 'Ancient Feebas', 'Ancient Luvdisc', 'Ancient Piplup',
    'Ancient Buizel', 'Ancient Shellos (East)', 'Ancient Shellos (West)', 'Ancient Mantyke', 'Ancient Oshawott', 'Ancient Panpour', 'Ancient Alomomola',
    'Ancient Castform (Water)',
    'Ancient Snover', 'Ancient Abomasnow', 'Ancient Unown (N)', 'Ancient Unown (O)', 'Ancient Unown (P)', 'Ancient Unown (Q)', 'Ancient Unown (R)',
    'Ancient Unown (S)', 'Ancient Unown (T)', 'Ancient Unown (U)', 'Ancient Unown (V)', 'Ancient Unown (W)', 'Ancient Unown (X)', 'Ancient Unown (Y)',
    'Ancient Unown (Z)', 'Ancient Unown (Qm)', 'Ancient Unown (Ex)', 'Ancient Delibird', 'Ancient Snorunt', 'Ancient Swinub', 'Ancient Piloswine',
    'Ancient Gible', 'Ancient Smoochum', 'Ancient Bronzor', 'Ancient Slowpoke', 'Ancient Seel', 'Ancient Spheal', 'Ancient Zubat', 'Ancient Sneasel',
    'Ancient Wynaut', 'Ancient Vanillite', 'Ancient Cubchoo', 'Ancient Cryogonal', 'Ancient Dewgong', 'Ancient Jynx', 'Ancient Weavile', 'Ancient Golbat',
    'Ancient Vanillish', 'Ancient Castform (Ice)',
    'Ancient Burmy (Sand)', 'Ancient Sandshrew', 'Ancient Cleffa', 'Ancient Zubat', 'Ancient Paras', 'Ancient Diglett', 'Ancient Machop', 'Ancient Onix',
    'Ancient Cubone', 'Ancient ', 'Ancient Kangaskhan', 'Ancient Ditto', 'Ancient Aerodactyl', 'Ancient Dratini', 'Ancient Bonsly', 'Ancient Unown (A)',
    'Ancient Unown (B)', 'Ancient Unown (C)', 'Ancient Unown (D)', 'Ancient Unown (E)', 'Ancient Unown (F)', 'Ancient Unown (G)', 'Ancient Unown (H)',
    'Ancient Unown (I)', 'Ancient Unown (J)', 'Ancient Unown (K)', 'Ancient Unown (L)', 'Ancient Unown (M)', 'Ancient Gligar', 'Ancient Shuckle', 'Ancient Teddiursa',
    'Ancient Phanpy', 'Ancient Larvitar', 'Ancient Makuhita', 'Ancient Nosepass', 'Ancient Mawile', 'Ancient Aron', 'Ancient Trapinch', 'Ancient Lileep',
    'Ancient Anorith', 'Ancient Bagon', 'Ancient Beldum', 'Ancient Cranidos', 'Ancient Shieldon', 'Ancient Riolu', 'Ancient Hippopotas', 'Ancient Roggenrola',
    'Ancient Drilbur', 'Ancient Timburr', 'Ancient Tympole', 'Ancient Throh', 'Ancient Sawk', 'Ancient Sandile', 'Ancient Dwebble', 'Ancient Scraggy',
    'Ancient Tirtouga', 'Ancient Archen', 'Ancient Pawniard', 'Ancient Durant', 'Ancient Deino', 'Ancient Axew', 'Ancient Druddigon',
    'Ancient Golett', 'Ancient Steelix', 'Ancient Metang', 'Ancient Bronzong', 'Ancient Graveler', 'Ancient Golem', 'Ancient Onix', 'Ancient Pupitar',
    'Ancient Aerodactyl', 'Ancient Armaldo', 'Ancient Rampardos', 'Ancient Fraxure', 'Ancient Boldore', 'Ancient Excadrill',
    'Ancient Archeops', 'Ancient Ferrothorn', 'Ancient Zweilous',
    'Ancient Lapras', 'Ancient Omanyte', 'Ancient Kabuto', 'Ancient Wooper', 'Ancient Corsola', 'Ancient Mudkip', 'Ancient Carvanha',
    'Ancient Barboach', 'Ancient Spheal', 'Ancient Clamperl', 'Ancient Relicanth', 'Ancient Finneon', 'Ancient Oshawott', 'Ancient Panpour',
    'Ancient Tympole', 'Ancient Basculin (Red Stripe)', 'Ancient Tirtouga', 'Ancient Ducklett', 'Ancient Vanillite', 'Ancient Frillish', 'Ancient Cubchoo',
    'Ancient Alomomola', 'Ancient Kabutops', 'Ancient Omastar', 'Ancient Simipour', 'Ancient Palpitoad',
    'Ancient Venonat', 'Ancient Kricketot', 'Ancient Exeggcute', 'Ancient Murkrow', 'Ancient Spiritomb', 'Ancient Bronzor', 'Ancient Drifloon',
    'Ancient Hoothoot', 'Ancient Mime Jr.', 'Ancient Kadabra', 'Ancient Misdreavus', 'Ancient Illumise', 'Ancient Duskull', 'Ancient Volbeat',
    'Ancient Natu', 'Ancient Baltoy', 'Ancient Sableye', 'Ancient Drowzee', 'Ancient Girafarig', 'Ancient Meditite', 'Ancient Chingling',
    'Ancient Porygon', 'Ancient Gastly', 'Ancient Spinarak', 'Ancient Wynaut', 'Ancient Spoink', 'Ancient Poochyena', 'Ancient Ralts', 'Ancient Purrloin',
    'Ancient Munna', 'Ancient Woobat', 'Ancient Sandile', 'Ancient Scraggy', 'Ancient Sigilyph', 'Ancient Yamask', 'Ancient Trubbish',
    'Ancient Zorua', 'Ancient Gothita', 'Ancient Solosis', 'Ancient Foongus', 'Ancient Elgyem', 'Ancient Litwick', 'Ancient Golett',
    'Ancient Pawniard', 'Ancient Vullaby', 'Ancient Deino', 'Ancient Liepard', 'Ancient Krookodile', 'Ancient Cofagrigus', 'Ancient Venomoth',
    'Ancient Rattata', 'Ancient Pidgey', 'Ancient Spearow', 'Ancient Grimer', 'Ancient Elekid', 'Ancient Magnemite', 'Ancient Voltorb',
    'Ancient Shinx', 'Ancient Pichu', 'Ancient Electrike', 'Ancient Pachirisu', 'Ancient Starly', 'Ancient Hoothoot', 'Ancient Mareep',
    'Ancient Dunsparce', 'Ancient Gulpin', 'Ancient Stunky', 'Ancient Swablu', 'Ancient Burmy (Steel)', 'Ancient Koffing', 'Ancient Raichu',
    'Ancient Altaria', 'Ancient Electabuzz', 'Ancient Staravia', 'Ancient Pidgeotto', 'Ancient Pidove', 'Ancient Blitzle', 'Ancient Drilbur', 'Ancient Audino',
    'Ancient Trubbish', 'Ancient Emolga', 'Ancient Foongus', 'Ancient Joltik', 'Ancient Ferroseed', 'Ancient Klink', 'Ancient Tynamo',
    'Ancient Stunfisk', 'Ancient Rufflet', 'Ancient Durant', 'Ancient Mienfoo', 'Ancient Zebstrika', 'Ancient Excadrill', 'Ancient Whirlipede',
    'Ancient Escavalier', 'Ancient Klinklang', 'Ancient Pichu (Notched)',
    'Ancient Charmander', 'Ancient Vulpix', 'Ancient Growlithe', 'Ancient Ponyta', 'Ancient Magby', 'Ancient Cyndaquil', 'Ancient Slugma',
    'Ancient Torchic', 'Ancient Torkoal', 'Ancient Chimchar', 'Ancient Numel', 'Ancient Houndour', 'Ancient Solrock', 'Ancient Lunatone',
    'Ancient Onix', 'Ancient Aron', 'Ancient Trapinch', 'Ancient Larvitar', 'Ancient Magmar', 'Ancient Flareon',
    'Ancient Houndoom', 'Ancient Charmeleon', 'Ancient Tepig', 'Ancient Pansear', 'Ancient Darumaka', 'Ancient Litwick', 'Ancient Heatmor',
    'Ancient Larvesta', 'Ancient Simisear', 'Ancient Lampent', 'Ancient Castform (Fire)',
    'Ancient Dratinire', 'Ancient Dratinilic', 'Ancient Dratinice',
];



var mobileLegends = [
'Dratinire', 'Dratinice', 'Dratinilic', 'Heatran',
'Ho-oh', 'Moltres', 'Entei', 'Reshiram', 'Victini', 'Zapdos',
'Raikou', 'Jirachi', 'Darkrai', 'Darkrown',
'Thundurus', 'Zekrom', 'Genesect', 'Mew',
'Giratina', 'Rotom', 'Mesprit', 'Azelf', 'Uxie',
'Celebi',
'Darkrown',
'Darkrai', 'Kyogre',
'Lugia',
'Keldeo', 'Groudon',
'Arceus',
'Regigigas',
'Palkia',
'Dialga',
'Deoxys',
'Jirachi',
'Registeel',
'Regirock',
'Mewtwo',
'Cobalion',
'Terrakion',
'Virizion',
'Reshiram',
'Zekrom',
'Kyurem',
'Genesect',
'Tornadus',
'Landorus',
'Shaymin (Sky)',
'Celebi',
'Latios',
'Latias',
'Rayquaza',
'Shaymin',
'Mew',
'Cresselia',
'Azelf',
'Uxie',
'Mesprit',
'Virizion',
'Genesect', 'Articuno',
'Suicune',
'Lugia',
'Regice',
'Kyurem', 'Manaphy',
'Phione',
'Suicune',
'Keldeo'
];

var shinyCustoms = [
'Dratinire', 'Dratinice', 'Charmander', 'Dratinilic', 'Heatran',
'Ho-oh', 'Moltres', 'Entei', 'Reshiram', 'Victini', 'Zapdos',
'Raikou', 'Jirachi', 'Darkrai', 'Darkrown',
'Thundurus', 'Zekrom', 'Genesect', 'Mew',
'Giratina', 'Rotom', 'Mesprit', 'Azelf', 'Uxie',
'Celebi',
'Darkrown',
'Darkrai', 'Kyogre',
'Lugia',
'Keldeo', 'Groudon',
'Arceus',
'Regigigas',
'Palkia',
'Dialga',
'Deoxys',
'Jirachi',
'Registeel',
'Regirock',
'Mewtwo',
'Cobalion',
'Terrakion',
'Virizion',
'Reshiram',
'Zekrom',
'Kyurem',
'Genesect',
'Tornadus',
'Landorus',
'Shaymin (Sky)',
'Celebi',
'Latios',
'Latias',
'Rayquaza',
'Shaymin',
'Mew',
'Cresselia',
'Azelf',
'Uxie',
'Mesprit',
'Virizion',
'Genesect', 'Articuno',
'Suicune',
'Lugia',
'Regice',
'Kyurem', 'Manaphy',
'Phione',
'Suicune',
'Keldeo'
];

var legends = [
// Grass
'Shaymin (Sky)',
'Celebi',
'Latios',
'Latias',
'Rayquaza',
'Shaymin',
'Mew',
'Cresselia',
'Azelf',
'Uxie',
'Mesprit',
'Virizion',
'Genesect',

// Grass (water)
'Manaphy',
'Phione',
'Suicune',
'Keldeo',

// Ice
'Articuno',
'Suicune',
'Lugia',
'Regice',
'Kyurem',

// Cave (land)
'Groudon',
'Arceus',
'Regigigas',
'Palkia',
'Dialga',
'Deoxys',
'Jirachi',
'Registeel',
'Regirock',
'Mewtwo',
'Cobalion',
'Terrakion',
'Virizion',
'Reshiram',
'Zekrom',
'Kyurem',
'Genesect',
'Tornadus',
'Landorus',

// Cave (water)
'Kyogre',
'Lugia',
'Keldeo',

// Ghost
'Mew',
'Giratina',
'Rotom',
'Mesprit',
'Azelf',
'Uxie',
'Celebi',
'Darkrown',
'Darkrai',

// Electric
'Zapdos',
'Raikou',
'Jirachi',
'Darkrai',
'Darkrown',
'Thundurus',
'Zekrom',
'Genesect',

// Fire
'Heatran',
'Ho-oh',
'Moltres',
'Entei',
'Reshiram',
'Victini'
];


function search() {
var btnSearch = document.querySelector('.container input[type="submit"][value="Search"]');
if (btnSearch) {
btnSearch.click();
}
}

var foundPokemonTags = document.getElementsByTagName('foundpokemon');
if (foundPokemonTags.length > 0) {
var foundPoke = false;
var subsrc = foundPokemonTags[0].innerHTML;
var encounteredPokemon = subsrc.substring(subsrc.indexOf('<br>Wild ') + 9, subsrc.indexOf(' appeared'));

unsafeWindow.console.info('Encountered ', encounteredPokemon);

/* Finding of SDMA normal pokemons*/
/*
if (encounteredPokemon.match(/(Dark |Shiny |Ancient |Mystic )/)) {
foundPoke = true;
unsafeWindow.console.info('Rare found - ', encounteredPokemon);
}
*/

for (var i = 0; i < rareCustoms.length; i++) {
		if (encounteredPokemon.indexOf(rareCustoms[i]) > -1) {
			foundPoke = true;
			unsafeWindow.console.info('Rare Custom found - ', encounteredPokemon);
		}
	}

for (var i = 0; i < shinyCustoms.length; i++) {
if (encounteredPokemon.match(shinyCustoms[i]) && encounteredPokemon.indexOf('Shiny ') > -1) {
foundPoke = true;
unsafeWindow.console.info('Rare Custom found - ', encounteredPokemon);
}
}

for (var i = 0; i < legends.length; i++) {
if (encounteredPokemon.match(legends[i]) && encounteredPokemon.match(/(Dark |Shiny |Ancient |Mystic | )/)) {
foundPoke = true;
unsafeWindow.console.info('Rare Legendary found - ', encounteredPokemon);
}
}

for (var i = 0; i < mobileLegends.length; i++) {
if (encounteredPokemon.indexOf(mobileLegends[i]) > -1) {
foundPoke = true;
unsafeWindow.console.info('Mobile Legendary found - ', encounteredPokemon);
}
}

if (!foundPoke) {
search();
}
else {
var btnBattle = document.querySelector('input[type="submit"][value="Battle!"]');
if (btnBattle) {
btnBattle.click();
}
}
}
else if (document.title.indexOf('Problem loading page') > -1) {
unsafeWindow.console.info('Error loading page. Refreshing.');
window.location = window.location.host + window.location.pathname;
}
else {
unsafeWindow.console.info('Searching...');
search();
}

var battleHTML = document.getElementById('battleForm');
if (battleHTML != null) {
var battleSRC = battleHTML.innerHTML;
var securityCode = battleSRC.substring(battleSRC.indexOf('Type the following number: ') - 5);
securityCode = securityCode.substring(0, securityCode.indexOf('<strong>'));
if (document.getElementById("security") != null) {
document.getElementById("security").value = securityCode;
}

var btnContinue = document.querySelector('input[type="submit"][value="Continue"]');
if (btnContinue) {
btnContinue.click();
}
}

if (document.title.indexOf('Vortex Battle Arena') > -1) {
var inputElements = document.getElementsByTagName('input');
for (var i = 0; i < inputElements.length; i++) {
if (inputElements[i].value.indexOf('Master Ball') > -1) {
var rbMasterBall = inputElements[i];
rbMasterBall.checked = true;

var btnUseItem = document.querySelector('input[type="submit"][value="Use Item"]');
if (btnUseItem) {
btnUseItem.click();
}
}
}


var btnContinue = document.querySelector('input[type="submit"][value="Continue!"]');
if (btnContinue) {
btnContinue.click();
}


var linksOnPage = document.getElementsByTagName('a');
for (var j = 0; j < linksOnPage.length; j++) {
if (linksOnPage[j].href.indexOf('map.php?') > -1) {
window.location = linksOnPage[j];
}
}
}