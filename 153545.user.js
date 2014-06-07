// ==UserScript==
// @name        KoL Combat Item Spoiler
// @namespace   justintnelson@gmail.com
// @description Shows the effects of Kingdom of Loathing combat items in their description window, and also in fight pages (with the fancy interface).
// @include     http://www.kingdomofloathing.com/desc_item.php*
// @include     http://www.kingdomofloathing.com/fight.php*
// @include     http://127.0.0.1:60080/desc_item.php*
// @include     http://127.0.0.1:60080/fight.php*
// @version     3
// ==/UserScript==



function do_fight_page()
{
	var newscript = document.createElement( "script" );
	newscript.appendChild( document.createTextNode( get_short_effects_object ) );
	(document.body || document.head || document.documentElement).appendChild( newscript );

	GM_addStyle(
		"#itemsmenu a img { float: left; }\n" +
		"#itemsmenu a span { display: block; }\n" +
		"#itemsmenu a span.tiny { color: blue; }\n"
	);

	document.getElementById("items").onclick = function()
	{
		var itemsmenu = document.getElementById("itemsmenu");
		var anchor = itemsmenu.firstChild;

		// Check if we already ran this function
		if( anchor.getElementsByTagName("span").length != 1 )
			return;

		var short_effects = get_short_effects_object();

		while( anchor )
		{
			var id = anchor.id.slice(5)

			var span = anchor.getElementsByTagName("span")[0];
			var name = span.firstChild.data;
			var index = name.lastIndexOf("(") - 1;
			if( index > 0 )
				name = name.slice( 0, index );

			var tinyspan = document.createElement("span");
			tinyspan.className = "tiny";
			var effect = short_effects[name];
			if( !effect )
			{
				effect = "Unknown";
				tinyspan.style.color = "red";
			}
			tinyspan.appendChild( document.createTextNode( effect ) );

			span.appendChild( document.createElement("br") );
			span.appendChild( tinyspan );
			anchor = anchor.nextSibling;
		}
	};
}

function do_description_page()
{
	var long_effects = get_long_effects_object();
	var div_description = document.getElementById("description");
	var name = div_description.getElementsByTagName("b")[0].innerHTML;
	var effects = long_effects[name].split('\n');

	if( effects && div_description )
	{
		var center = document.createElement("center");
		var span = document.createElement("span");
		span.appendChild( document.createTextNode( "Combat effect:" ) );
		center.appendChild( span );
		center.appendChild( document.createElement("br") );

		for( i in effects )
		{
			var b = document.createElement("b");
			b.style.color = determine_color( effects[i] );
			b.appendChild( document.createTextNode( effects[i] ) );
			center.appendChild( b );
			center.appendChild( document.createElement("br") );
			labeled = true;
		}

		div_description.appendChild( center );
	}
}

function special_case( s )
{
	// for KoLMafia users
	if(s.indexOf("potion of blessing ")>=0)
		return "+20-30 Monster Defense";
	if(s.indexOf("potion of confusion")>=0)
		return "Delevel 2-3";
	if(s.indexOf("potion of detection ")>=0)
		return "?";
	if(s.indexOf("potion of ettin strength ")>=0)
		return "+(?) Monster Attack";
	if(s.indexOf("potion of healing")>=0)
		return "+14-16 Monster HP";
	if(s.indexOf("potion of inebriety")>=0)
		return "?";
	if(s.indexOf("potion of mental acuity")>=0)
		return "+(?) Monster Level";
	if(s.indexOf("potion of sleepiness")>=0)
		return "?";
	if(s.indexOf("potion of teleportitis")>=0)
		return "Delevel 2-3";
}

function determine_color(s)
{
	if( s.indexOf( "hot damage" ) >= 0 )
		return "red";
	if( s.indexOf( "stench damage" ) >= 0 )
		return "green";
	if( s.indexOf( "spooky damage" ) >= 0 )
		return "gray";
	if( s.indexOf( "sleaze damage" ) >= 0 )
		return "blueviolet";
	if( s.indexOf( "spelling damage" ) >= 0 )
		return "purple";
	return "blue";
}

function get_short_effects_object()
{
	var ob = new Object();
	ob["30669 scroll"]="Delevel 1-3";
	ob["33398 scroll"]="Delevel 1-3";
	ob["334 scroll"]="Delevel 1-7";
	ob["4-d camera"]="copy monster";
	ob["64067 scroll"]="Delevel 1-3";
	ob["668 scroll"]="Delevel 20-30";
	ob["8-ball"]="Delevel 1-3";
	ob["ancient spice"]="30-40 damage";
	ob["anemone nematocyst"]="Stun 1-2 on land, 3-4 in sea";
	ob["anti-anti-antidote"]="Cure poison effects";
	ob["antique hand mirror"]="Insta-kill The Guy Made Of Bees";
	ob["bag of airline peanuts"]="6-10 damage";
	ob["ball"]="Run away";
	ob["banana peel"]="Stun 2";
	ob["banana spritzer"]="Restore some MP";
	ob["barbed-wire fence"]="Delevel 1-7, block (50%)";
	ob["baseball"]="6-8 damage";
	ob["Battlie Light Saver"]="49(?) damage, block";
	ob["beer bomb"]="55-75 damage";
	ob["big boom"]="80-120 damage, block";
	ob["big glob of skin"]="Restore ~half of missing HP";
	ob["black pepper"]="Delevel 7-10";
	ob["black plastic oyster egg"]="Gain 300-400 Meat";
	ob["black spot"]="32-39 damage";
	ob["blue pixel potion"]="Restore 50-80 MP";
	ob["blue plastic oyster egg"]="Restore 35-50 MP";
	ob["blue shell"]="25 damage or pixels and lose 25 HP";
	ob["Bohemian rhapsody"]="22-60 damage";
	ob["bottle of alcohol"]="45-65 hot damage";
	ob["bottle of Monsieur Bubble"]="Restore 45-65 MP";
	ob["boulder"]="20-30 damage";
	ob["brick of sand"]="60-80 damage, stun 2";
	ob["bronzed locust"]="Delevel 20-30";
	ob["bubbly potion"]="Dungeons of Doom potion";
	ob["buckyball"]="Run away";
	ob["bus pass"]="47 (?) damage";
	ob["cast"]="Restore 15-20 HP";
	ob["chaos butterfly"]="±17 ML";
	ob["chloroform rag"]="Stun 2+";
	ob["clingfilm tangle"]="Stun 2+";
	ob["Cloaca grenade"]="50-60 damage, delevel 2 atk";
	ob["Cloaca-Cola"]="Restore 10-14 MP";
	ob["cloudy potion"]="Dungeons of Doom potion";
	ob["cocktail napkin"]="Banish clingy pirate";
	ob["Colon Annihilation Hot Sauce"]="Ongoing 6-8 hot damage";
	ob["communications windchimes"]="Various effects on the Hippy/Frat Battlefield";
	ob["cracked stone sphere"]="Damage, delevel, or heal";
	ob["cursed cannonball"]="(Mus/2) (+ Mus/2 spooky) damage";
	ob["cursed dirty joke scroll"]="(Mox/2) (+ Mox/2 sleaze) damage";
	ob["cursed voodoo skull"]="(Mys/2) (+ Mys/2 hot) damage";
	ob["d4"]="Delevel 1-40";
	ob["d6"]="1-216 cold damage";
	ob["d8"]="(floor(level/3)+1)d8 prismatic damage";
	ob["d10"]="Delevel 20";
	ob["d12"]="(level+1)d12 physical or elemental damage";
	ob["d20"]="(1-20)*level hot damage";
	ob["dark potion"]="Dungeons of Doom potion";
	ob["death blossom"]="20-30 (100-150) prismatic damage";
	ob["depantsing bomb"]="Delevel 15-20";
	ob["dictionary"]="30-60 spelling damage (keep)";
	ob["disease"]="Delevel 2, block (50%)";
	ob["divine blowout"]="(Mox) damage, gain stats";
	ob["divine can of silly string"]="(Mys) damage, gain stats";
	ob["divine champagne popper"]="Free runaway, banish 5";
	ob["divine cracker"]="Delevel, may pickpocket";
	ob["divine noisemaker"]="(Mus) damage, gain stats";
	ob["Doc Galaktik's Ailment Ointment"]="Restore 8-10 HP";
	ob["Doc Galaktik's Homeopathic Elixir"]="Restore 18-20 HP";
	ob["Doc Galaktik's Restorative Balm"]="Restore 13-15 HP";
	ob["Duskwalker syringe"]="38(?) damage or bubblin' crude";
	ob["dwarf bread"]="7-28 damage; block";
	ob["Dyspepsi grenade"]="50-60 damage, delevel 2 atk";
	ob["Dyspepsi-Cola"]="Restore 10-14 MP";
	ob["effervescent potion"]="Dungeons of Doom potion";
	ob["exploding hacky-sack"]="75-100 hot damage";
	ob["facsimile dictionary"]="30-60 spelling damage (keep)";
	ob["fancy bath salts"]="Delevel 4-5";
	ob["fancy dress ball"]="Run away";
	ob["fat bottom quark"]="25-40 stench damage";
	ob["fat stacks of cash"]="(Not consumed)";
	ob["ferret bait"]="50-60 damage, delevel 5";
	ob["fetid feather"]="80-120 stench damage";
	ob["filthy poultice"]="Restore 80-120 HP";
	ob["finger cuffs"]="Stun 2+";
	ob["fizzy potion"]="Dungeons of Doom potion";
	ob["flaming feather"]="80-120 hot damage";
	ob["flaregun"]="lose 10-30 HP or deal 10-30 damage (sometimes +10-30 hot)";
	ob["flirtatious feather"]="80-120 sleaze damage";
	ob["floorboard cruft"]="100-120 stench damage, stun 2";
	ob["forest tears"]="Restore 5-10 HP";
	ob["frightful feather"]="80-120 spooky damage";
	ob["frigid ninja stars"]="20-25 cold damage";
	ob["Frosty's iceball"]="200-300 cold damage (keep 2/day)";
	ob["frozen feather"]="80-120 cold damage";
	ob["gas balloon"]="Stun 2+";
	ob["gauze garter"]="Restore 80-120 HP";
	ob["Gnomitronic Hyperspatial Demodulizer"]="6-15 damage, finishing blow grants buff (keep)";
	ob["gob of wet hair"]="Delevel 2-3, block";
	ob["golden ring"]="Delevel 20-30, gain 500 Meat";
	ob["Goodfella contract"]="With Penguin Goodfella, weight*(2-4) damage and lose Meat";
	ob["green pixel potion"]="Restore 40-60 HP, restore 30-40 MP";
	ob["green smoke bomb"]="Free runaway (90%)";
	ob["grouchy restless spirit"]="40-45 spooky damage";
	ob["gyroscope"]="Block";
	ob["hair spray"]="3-4 hot damage";
	ob["handful of sand"]="Delevel 5-10";
	ob["handful of sawdust"]="Delevel 4-10";
	ob["Harold's bell"]="Free runaway, banish 20";
	ob["hedgeturtle"]="30-60 damage, ongoing 5-10 damage";
	ob["imp air"]="35-40 hot damage";
	ob["inkwell"]="Delevel 4-7, block (50%)";
	ob["jam band flyers"]="Target auto-hits this round (keep)";
	ob["jar of swamp gas"]="20-30 stench damage, stun 2-4";
	ob["killing feather"]="100-120 damage";
	ob["kite"]="Delevel 12, block (50%)";
	ob["Knob Goblin firecracker"]="2-4 damage";
	ob["Knob Goblin seltzer"]="Restore 8-12 MP";
	ob["Knob Goblin stink bomb"]="Delevel 3, block (50%)";
	ob["Knob Goblin superseltzer"]="Restore 25-29 MP";
	ob["lavender plastic oyster egg"]="35-50 damage";
	ob["leftovers of indeterminate origin"]="5-6 stench damage";
	ob["lewd playing card"]="some damage";
	ob["macrame net"]="90-100 damage, delevel 8-10, block";
	ob["magical mystery juice"]="Restore 1.5*level +5 ±1 MP";
	ob["mariachi G-string"]="10-15 damage";
	ob["Massive Manual of Marauder Mockery"]="(Not consumed)";
	ob["mauve plastic oyster egg"]="35-50 damage";
	ob["meat vortex"]="gain some Meat";
	ob["milky potion"]="Dungeons of Doom potion";
	ob["miniature boiler"]="(?) damage";
	ob["Miniborg beeper"]="20-25 damage, lose 15-20 HP (keep)";
	ob["Miniborg Destroy-O-Bot"]="10-15 (+10-15 hot) damage, delevel 3-5 (keep)";
	ob["Miniborg hiveminder"]="Delevel 8-10 atk (keep)";
	ob["Miniborg laser"]="15-20 hot damage (keep)";
	ob["Miniborg stomper"]="15-20 damage (keep)";
	ob["Miniborg strangler"]="Delevel 3-5 (keep)";
	ob["molotov cocktail cocktail"]="65-80 hot damage (double against hippy soldiers)";
	ob["molybdenum magnet"]="Yossarian (keep)";
	ob["monomolecular yo-yo"]="35-45 damage";
	ob["mossy stone sphere"]="Damage, delevel, or heal";
	ob["Mountain Stream soda"]="Restore 6-9 MP";
	ob["murky potion"]="Dungeons of Doom potion";
	ob["mylar scout drone"]="Delevel 10-12, block (75%)";
	ob["naughty paper shuriken"]="15-20 damage, stun 3 (keep)";
	ob["New Cloaca-Cola"]="Restore 140-160 MP";
	ob["NG"]="40-70 damage";
	ob["odor extractor"]="Effect: On the Trail";
	ob["off-white plastic oyster egg"]="Delevel 7, block (50%)";
	ob["oily boid"]="Delevel 5-8, block (or woim)";
	ob["onion shurikens"]="10-15 sleaze damage";
	ob["ovoid leather thing"]="80-100 damage or lose 40-50 HP";
	ob["PADL Phone"]="Various effects on the Hippy/Frat Battlefield";
	ob["painted turtle"]="10-20 (50-100) prismatic damage";
	ob["palm-frond fan"]="Restore 30-40 HP, 30-40 MP";
	ob["palm-frond net"]="Delevel 8-12, block";
	ob["patchouli incense stick"]="Delevel 3-5, block (50%)";
	ob["patchouli oil bomb"]="65-80 stench damage (double against frat soldiers)";
	ob["photoprotoneutron torpedo"]="30-50 damage";
	ob["plot hole"]="20-25 damage, delevel 3-5, block (50%)";
	ob["plus-sized phylactery"]="Insta-kill Gargantulihc";
	ob["poltergeist-in-the-jar-o"]="200-250 damage";
	ob["possessed tomato"]="Ongoing 6-8 spooky damage";
	ob["possessed top"]="Delevel 6-8";
	ob["powdered organs"]="Delevel 10-12";
	ob["procrastination potion"]="Block (50%)";
	ob["puce plastic oyster egg"]="35-50 damage";
	ob["pygmy blowgun"]="20-30 damage, ongoing damage";
	ob["rainbow bomb"]="20-30 (120-180) prismatic damage";
	ob["razor-sharp can lid"]="2-3 damage";
	ob["razor-tipped yo-yo"]="35-45 damage";
	ob["red pixel potion"]="Restore 100-120 HP";
	ob["red plastic oyster egg"]="Restore 35-40 HP";
	ob["rock band flyers"]="Target auto-hits this round (keep)";
	ob["rocky raccoon"]="50-60 damage";
	ob["rogue swarmer"]="floor(50 + 10 * num^0.7) damage (keep (sometimes))";
	ob["roofie"]="Delevel 4-5, block (50%)";
	ob["rough stone sphere"]="Damage, delevel, or heal";
	ob["rusty bonesaw"]="10-20 damage (60-100 vs giant skeelton)";
	ob["sake bomb"]="50-60 damage, delevel 5";
	ob["sausage bomb"]="80-120 sleaze damage, stun 2";
	ob["sawblade fragment"]="100-150 damage, ongoing damage";
	ob["scented massage oil"]="Restore all HP, block";
	ob["scroll of ancient forbidden unspeakable evil"]="21-29 element-perfect damage, lose 5-6 HP";
	ob["seal tooth"]="1 damage (keep)";
	ob["shard of double-ice"]="(mainstat) damage, target becomes cold-aligned";
	ob["sharpened hubcap"]="Large damage, may insta-kill";
	ob["shaving cream"]="Delevel 2-3, block (50%)";
	ob["shrinking powder"]="(half target's current HP) damage";
	ob["slime stack"]="10%-20% target's HP in damage";
	ob["smoky potion"]="Dungeons of Doom potion";
	ob["smooth stone sphere"]="Damage, delevel, or heal";
	ob["soggy used band-aid"]="Restore all HP, stun 3";
	ob["sonar-in-a-biscuit"]="5-7 damage";
	ob["soup turtle"]="6-10 hot damage";
	ob["Space Tours Tripple"]="Calms target";
	ob["sparking El Vibrato drone"]="250-300 damage";
	ob["spectre scepter"]="Damage, delevel, or heal";
	ob["spices"]="1 damage (keep)";
	ob["spider web"]="Delevel 3, block (50%)";
	ob["Spooky Putty sheet"]="Copy monster";
	ob["star throwing star"]="50-75 damage";
	ob["stick of dynamite"]="15-20 damage";
	ob["stone frisbee"]="80-100 damage or lose 40-50 HP";
	ob["stuffed alien blob"]="Emulates a random combat item";
	ob["stuffed doppelshifter"]="Emulates a random combat item";
	ob["stuffed gray blob"]="Emulates a random combat item";
	ob["superamplified boom box"]="90-100 damage, delevel 8-10, block";
	ob["swirly potion"]="Dungeons of Doom potion";
	ob["T.U.R.D.S. Key"]="Free runaway (sometimes)";
	ob["tattered scrap of paper"]="Free runaway (50%)";
	ob["tequila grenade"]="75-100 damage";
	ob["terrible poem"]="5 damage";
	ob["The Big Book of Pirate Insults"]="Insult enemy (keep)";
	ob["The Six-Pack of Pain"]="(Mus) damage";
	ob["Tom's of the Spanish Main Toothpaste"]="Delevel 6-8, or against a toothy pirate, restore 100-150 MP";
	ob["top"]="Delevel 6";
	ob["toy deathbot"]="30 to (playerHP/10+25) damage, lose (dmg-25) HP (keep)";
	ob["toy mercenary"]="30-35 damage, lose 5-10 Meat (keep)";
	ob["toy soldier"]="30-35 damage, lose a bottle of tequila (keep)";
	ob["tree-eating kite"]="20-25 damage (sometimes) (keep on success)";
	ob["tropical orchid"]="block (50%)";
	ob["unrefined Mountain Stream syrup"]="Restore 50-60 MP";
	ob["unstable laser battery"]="200-250 hot damage, block";
	ob["vial of patchouli oil"]="Delevel 4, block (50%)";
	ob["water pipe bomb"]="55-75 damage";
	ob["white picket fence"]="Regain 14-15 HP; block";
	ob["wussiness potion"]="Delevel 5, block (50%)";
	ob["yellow plastic oyster egg"]="10 Adventures of a buff";
	ob["yo"]="15-20 damage";
	ob["yo-yo"]="30-40 damage";
	ob["Zombo's empty eye"]="150-200 spooky damage, delevel 30-50 (keep)";
	return ob;
}

function get_long_effects_object()
{
	var ob = new Object();
	ob["30669 scroll"]="Delevel 1-3";
	ob["33398 scroll"]="Delevel 1-3";
	ob["334 scroll"]="Delevel 1-7";
	ob["4-d camera"]="copy monster";
	ob["64067 scroll"]="Delevel 1-3";
	ob["668 scroll"]="Delevel 20-30";
	ob["8-ball"]="Delevel 1-3";
	ob["ancient spice"]="30-40 damage";
	ob["anemone nematocyst"]="Stun 1-2 on land, 3-4 in sea";
	ob["anti-anti-antidote"]="Cure poison effects";
	ob["antique hand mirror"]="Insta-kill The Guy Made Of Bees";
	ob["bag of airline peanuts"]="6-10 damage";
	ob["ball"]="Run away";
	ob["banana peel"]="Stun 2";
	ob["banana spritzer"]="Restore some MP";
	ob["barbed-wire fence"]="Delevel 1-7\nBlock (50%)\nInsta-kill Enraged Cow";
	ob["baseball"]="6-8 damage\nInsta-kill Beer Batter";
	ob["Battlie Light Saver"]="49(?) damage\nBlock";
	ob["beer bomb"]="55-75 damage";
	ob["big boom"]="80-120 damage\nBlock";
	ob["big glob of skin"]="Restore ~half of missing HP";
	ob["black pepper"]="Delevel 7-10\nInsta-kill giant fried egg";
	ob["black plastic oyster egg"]="Gain 300-400 Meat";
	ob["black spot"]="32-39 damage";
	ob["blue pixel potion"]="Restore 50-80 MP";
	ob["blue plastic oyster egg"]="Restore 35-50 MP";
	ob["blue shell"]="25 damage (if target has more HP than you)\nGain 1-3 blue and 1-3 white pixels, lose 25 HP (otherwise)";
	ob["Bohemian rhapsody"]="22-60 damage";
	ob["bottle of alcohol"]="45-65 hot damage";
	ob["bottle of Monsieur Bubble"]="Restore 45-65 MP";
	ob["boulder"]="20-30 damage";
	ob["brick of sand"]="60-80 damage\nStun 2";
	ob["bronzed locust"]="Delevel 20-30\nInsta-kill malevolent crop circle";
	ob["bubbly potion"]="Dungeons of Doom potion";
	ob["buckyball"]="Run away";
	ob["bus pass"]="47 (?) damage";
	ob["cast"]="Restore 15-20 HP";
	ob["chaos butterfly"]="Delevel or uplevel ~17\nInsta-kill Tyrannosaurus Tex";
	ob["chloroform rag"]="Stun 2+";
	ob["clingfilm tangle"]="Stun 2+";
	ob["Cloaca grenade"]="50-60 damage\nDelevel 2 atk";
	ob["Cloaca-Cola"]="Restore 10-14 MP";
	ob["cloudy potion"]="Dungeons of Doom potion";
	ob["cocktail napkin"]="Against clingy pirate, free runaway and banish 20";
	ob["Colon Annihilation Hot Sauce"]="Ongoing 6-8 hot damage";
	ob["communications windchimes"]="Various effects on the Hippy/Frat Battlefield";
	ob["cracked stone sphere"]="One of:\n6-10 damage\n8-10 hot damage\ndelevel 1-3\ngain 4-5 HP\n(Not consumed)";
	ob["cursed cannonball"]="(Mus/2) (+ Mus/2 spooky) damage";
	ob["cursed dirty joke scroll"]="(Mox/2) (+ Mox/2 sleaze) damage";
	ob["cursed voodoo skull"]="(Mys/2) (+ Mys/2 hot) damage";
	ob["d4"]="Delevel 1-40";
	ob["d6"]="1-216 cold damage";
	ob["d8"]="(floor(level/3)+1)d8 prismatic damage";
	ob["d10"]="Delevel 20";
	ob["d12"]="(level+1)d12 physical or elemental damage";
	ob["d20"]="(1-20)*level hot damage";
	ob["dark potion"]="Dungeons of Doom potion";
	ob["death blossom"]="20-30 (100-150) prismatic damage";
	ob["depantsing bomb"]="Delevel 15-20";
	ob["dictionary"]="30-60 spelling damage\n(Not consumed)";
	ob["disease"]="Delevel 2\nBlock (50%)\nInsta-kill Vicious Easel";
	ob["divine blowout"]="(Mox) damage\nGain stats";
	ob["divine can of silly string"]="(Mys) damage\nGain stats";
	ob["divine champagne popper"]="Free runaway\nBanish 5";
	ob["divine cracker"]="Delevel\nMay pickpocket";
	ob["divine noisemaker"]="(Mus) damage\nGain stats";
	ob["Doc Galaktik's Ailment Ointment"]="Restore 8-10 HP";
	ob["Doc Galaktik's Homeopathic Elixir"]="Restore 18-20 HP";
	ob["Doc Galaktik's Restorative Balm"]="Restore 13-15 HP";
	ob["Duskwalker syringe"]="38(?) damage\nGain bubblin' crude (vs. oil monsters)";
	ob["dwarf bread"]="7-28 damage\nBlock";
	ob["Dyspepsi grenade"]="50-60 damage\nDelevel 2 atk";
	ob["Dyspepsi-Cola"]="Restore 10-14 MP";
	ob["effervescent potion"]="Dungeons of Doom potion";
	ob["exploding hacky-sack"]="75-100 hot damage";
	ob["facsimile dictionary"]="30-60 spelling damage\n(Not consumed)";
	ob["fancy bath salts"]="Delevel 4-5\nInsta-kill fancy bath slug";
	ob["fancy dress ball"]="Run away";
	ob["fat bottom quark"]="25-40 stench damage";
	ob["fat stacks of cash"]="(Not consumed)";
	ob["ferret bait"]="50-60 damage\nDelevel 5";
	ob["fetid feather"]="80-120 stench damage";
	ob["filthy poultice"]="Restore 80-120 HP";
	ob["finger cuffs"]="Stun 2+";
	ob["fizzy potion"]="Dungeons of Doom potion";
	ob["flaming feather"]="80-120 hot damage";
	ob["flaregun"]="10-30 damage, or 10-30 + 10-30 hot damage, or lose 10-30 HP";
	ob["flirtatious feather"]="80-120 sleaze damage";
	ob["floorboard cruft"]="100-120 stench damage\nStun 2";
	ob["forest tears"]="Restore 5-10 HP";
	ob["frightful feather"]="80-120 spooky damage";
	ob["frigid ninja stars"]="20-25 cold damage\nInsta-kill Flaming Samurai";
	ob["Frosty's iceball"]="200-300 cold damage\n(Not consumed on first two uses per day)";
	ob["frozen feather"]="80-120 cold damage";
	ob["gas balloon"]="Stun 2+";
	ob["gauze garter"]="Restore 80-120 HP";
	ob["Gnomitronic Hyperspatial Demodulizer"]="6-15 damage\nGrants buff as finishing blow\nUsable once per combat\n(Not consumed)";
	ob["gob of wet hair"]="Delevel 2-3\nBlock";
	ob["golden ring"]="Delevel 20-30\nGain 500 Meat";
	ob["Goodfella contract"]="With Penguin Goodfella, weight*(2-4) damage and lose Meat";
	ob["green pixel potion"]="Restore 40-60 HP\nRestore 30-40 MP";
	ob["green smoke bomb"]="Free runaway (90%)";
	ob["grouchy restless spirit"]="40-45 spooky damage";
	ob["gyroscope"]="Block";
	ob["hair spray"]="3-4 hot damage\nInsta-kill Ice Cube";
	ob["handful of sand"]="Delevel 5-10";
	ob["handful of sawdust"]="Delevel 4-10";
	ob["Harold's bell"]="Free runaway\nBanish 20";
	ob["hedgeturtle"]="30-60 damage\nOngoing 5-10 damage";
	ob["imp air"]="35-40 hot damage";
	ob["inkwell"]="Delevel 4-7\nBlock (50%)\nInsta-kill the darkness";
	ob["jam band flyers"]="Target's attack auto-hits this round\n(Not consumed)";
	ob["jar of swamp gas"]="20-30 stench damage\nStun 2-4";
	ob["killing feather"]="100-120 damage";
	ob["kite"]="Delevel 12\nBlock (50%)";
	ob["Knob Goblin firecracker"]="2-4 damage\nInsta-kill concert pianist";
	ob["Knob Goblin seltzer"]="Restore 8-12 MP";
	ob["Knob Goblin stink bomb"]="Delevel 3\nBlock (50%)";
	ob["Knob Goblin superseltzer"]="Restore 25-29 MP";
	ob["lavender plastic oyster egg"]="35-50 damage";
	ob["leftovers of indeterminate origin"]="5-6 stench damage\nInsta-kill Bronze Chef";
	ob["lewd playing card"]="some damage";
	ob["macrame net"]="90-100 damage\nDelevel 8-10\nBlock";
	ob["magical mystery juice"]="Restore 1.5*level +5 ±1 MP";
	ob["mariachi G-string"]="10-15 damage\nInsta-kill El Diablo";
	ob["Massive Manual of Marauder Mockery"]="(Not consumed)";
	ob["mauve plastic oyster egg"]="35-50 damage";
	ob["meat vortex"]="Gain some Meat\nInsta-kill Big Meat Golem";
	ob["milky potion"]="Dungeons of Doom potion";
	ob["miniature boiler"]="(?) damage";
	ob["Miniborg beeper"]="20-25 damage\nLose 15-20 HP\n(Not consumed)";
	ob["Miniborg Destroy-O-Bot"]="10-15 (+10-15 hot) damage\nDelevel 3-5\n(Not consumed)";
	ob["Miniborg hiveminder"]="Delevel 8-10 atk\n(Not consumed)";
	ob["Miniborg laser"]="15-20 hot damage\n(Not consumed)";
	ob["Miniborg stomper"]="15-20 damage\n(Not consumed)";
	ob["Miniborg strangler"]="Delevel 3-5\n(Not consumed)";
	ob["molotov cocktail cocktail"]="65-80 hot damage (double against hippy soldiers)";
	ob["molybdenum magnet"]="Retrieve Yossarian's tools\n(Not consumed)";
	ob["monomolecular yo-yo"]="35-45 damage";
	ob["mossy stone sphere"]="One of:\n6-10 damage\n8-10 hot damage\ndelevel 1-3\ngain 4-5 HP\n(Not consumed)";
	ob["Mountain Stream soda"]="Restore 6-9 MP";
	ob["murky potion"]="Dungeons of Doom potion";
	ob["mylar scout drone"]="Delevel 10-12\nBlock (75%)";
	ob["naughty paper shuriken"]="15-20 damage\nStun 3\n(Not consumed)";
	ob["New Cloaca-Cola"]="Restore 140-160 MP";
	ob["NG"]="40-70 damage\nInsta-kill Giant Desktop Globe";
	ob["odor extractor"]="Effect: On the Trail";
	ob["off-white plastic oyster egg"]="Delevel 7\nBlock (50%)";
	ob["oily boid"]="Delevel 5-8\nBlock\n(Or gain a woim)";
	ob["onion shurikens"]="10-15 sleaze damage";
	ob["ovoid leather thing"]="80-100 damage or lose 40-50 HP";
	ob["PADL Phone"]="Various effects on the Hippy/Frat Battlefield";
	ob["painted turtle"]="10-20 (50-100) prismatic damage";
	ob["palm-frond fan"]="Restore 30-40 HP, 30-40 MP";
	ob["palm-frond net"]="Delevel 8-12\nBlock";
	ob["patchouli incense stick"]="Delevel 3-5\nBlock (50%)";
	ob["patchouli oil bomb"]="65-80 stench damage (double against frat soldiers)";
	ob["photoprotoneutron torpedo"]="30-50 damage\nInsta-kill Electron Submarine";
	ob["plot hole"]="20-25 damage\nDelevel 3-5\nBlock (50%)\nInsta-kill best-selling novelist";
	ob["plus-sized phylactery"]="Insta-kill Gargantulihc";
	ob["poltergeist-in-the-jar-o"]="200-250 damage";
	ob["possessed tomato"]="Ongoing 6-8 spooky damage";
	ob["possessed top"]="Delevel 6-8";
	ob["powdered organs"]="Delevel 10-12\nInsta-kill possessed pipe-organ";
	ob["procrastination potion"]="Block (50%)";
	ob["puce plastic oyster egg"]="35-50 damage";
	ob["pygmy blowgun"]="20-30 damage\nongoing damage";
	ob["rainbow bomb"]="20-30 (120-180) prismatic damage";
	ob["razor-sharp can lid"]="2-3 damage\nInsta-kill Fickle Finger of F8";
	ob["razor-tipped yo-yo"]="35-45 damage";
	ob["red pixel potion"]="Restore 100-120 HP";
	ob["red plastic oyster egg"]="Restore 35-40 HP";
	ob["rock band flyers"]="Target's attack auto-hits this round\n(Not consumed)";
	ob["rocky raccoon"]="50-60 damage";
	ob["rogue swarmer"]="floor(50 + 10 * num^0.7) damage\nnum = number of these in inventory\n(Not consumed (sometimes))";
	ob["roofie"]="Delevel 4-5\nBlock (50%)";
	ob["rough stone sphere"]="One of:\n6-10 damage\n8-10 hot damage\ndelevel 1-3\ngain 4-5 HP\n(Not consumed)";
	ob["rusty bonesaw"]="10-20 damage\n(60-100 vs giant skeelton)";
	ob["sake bomb"]="50-60 damage\nDelevel 5";
	ob["sausage bomb"]="80-120 sleaze damage\nStun 2";
	ob["sawblade fragment"]="100-150 damage\ncontinuous damage";
	ob["scented massage oil"]="Restore all HP\nBlock";
	ob["scroll of ancient forbidden unspeakable evil"]="21-29 element-perfect damage\nLose 5-6 HP\nInsta-kill physically-resistant monsters";
	ob["seal tooth"]="1 damage\n(Not consumed)";
	ob["shard of double-ice"]="(buffed mainstat) damage\ntarget becomes cold-aligned";
	ob["sharpened hubcap"]="Large damage, may insta-kill";
	ob["shaving cream"]="Delevel 2-3\nBlock (50%)";
	ob["shrinking powder"]="(half target's current HP) damage";
	ob["slime stack"]="10%-20% target's HP in damage";
	ob["smoky potion"]="Dungeons of Doom potion";
	ob["smooth stone sphere"]="One of:\n6-10 damage\n8-10 hot damage\ndelevel 1-3\ngain 4-5 HP\n(Not consumed)";
	ob["soggy used band-aid"]="Restore all HP\nStun 3";
	ob["sonar-in-a-biscuit"]="5-7 damage\nInsta-kill Bowling Cricket";
	ob["soup turtle"]="6-10 hot damage";
	ob["Space Tours Tripple"]="Calms target";
	ob["sparking El Vibrato drone"]="250-300 damage";
	ob["spectre scepter"]="Random effect:\n6-10 damage\n8-10 hot damage\ndelevel 1-3\ngain 4-5 HP\n(Not consumed)";
	ob["spices"]="1 damage\n(Not consumed)";
	ob["spider web"]="Delevel 3\nBlock (50%)\nInsta-kill Pretty Fly";
	ob["Spooky Putty sheet"]="Copy monster";
	ob["star throwing star"]="50-75 damage";
	ob["stick of dynamite"]="15-20 damage\nInsta-kill collapsed mineshaft golem";
	ob["stone frisbee"]="80-100 damage or lose 40-50 HP";
	ob["stuffed alien blob"]="Emulates a random combat item";
	ob["stuffed doppelshifter"]="Emulates a random combat item";
	ob["stuffed gray blob"]="Emulates a random combat item";
	ob["superamplified boom box"]="90-100 damage\nDelevel 8-10\nBlock";
	ob["swirly potion"]="Dungeons of Doom potion";
	ob["T.U.R.D.S. Key"]="Free runaway (sometimes)";
	ob["tattered scrap of paper"]="Free runaway (50%)";
	ob["tequila grenade"]="75-100 damage";
	ob["terrible poem"]="5 damage";
	ob["The Big Book of Pirate Insults"]="Insult enemy\nAgainst pirates, may cause effect: Embarrassed\nUsable once per combat\n(Not consumed)";
	ob["The Six-Pack of Pain"]="(Mus) damage";
	ob["Tom's of the Spanish Main Toothpaste"]="Delevel 6-8, or against a toothy pirate, restore 100-150 MP";
	ob["top"]="Delevel 6";
	ob["toy deathbot"]="30 to (playerHP/10+25) damage\nLose (dmg-25) HP\n(Not consumed)";
	ob["toy mercenary"]="30-35 damage\nLose 5-10 Meat\n(Not consumed)";
	ob["toy soldier"]="30-35 damage\nLose a bottle of tequila\n(Not consumed)";
	ob["tree-eating kite"]="20-25 damage (sometimes)\n(Not consumed on success)";
	ob["tropical orchid"]="Block (50%)\nInsta-kill giant bee";
	ob["unrefined Mountain Stream syrup"]="Restore 50-60 MP";
	ob["unstable laser battery"]="200-250 hot damage\nBlock";
	ob["vial of patchouli oil"]="Delevel 4\nBlock (50%)";
	ob["water pipe bomb"]="55-75 damage";
	ob["white picket fence"]="Regain 14-15 HP\nBlock";
	ob["wussiness potion"]="Delevel 5\nBlock (50%)";
	ob["yellow plastic oyster egg"]="One effect (10 Adventures):\nEgg-headedness\nEgg-cellent Vocabulary\nEgg-stra Arm";
	ob["yo"]="15-20 damage";
	ob["yo-yo"]="30-40 damage";
	ob["Zombo's empty eye"]="150-200 spooky damage\nDelevel 30-50\nUsable once per 50 adventures\n(Not consumed)";
	return ob;
}

if( document.URL.indexOf("/fight.php") >= 0 )
{
	do_fight_page();
}

if( document.URL.indexOf("/desc_item.php") >= 0 )
{
	do_description_page();
}
