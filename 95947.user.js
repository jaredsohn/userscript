// ==UserScript==
// @name           GT Hunting Dog
// @namespace      allc0re
// @icon           http://dl.dropbox.com/u/1756571/puppy_icon.png
// @version        2.65
// @description    Adds links in a handy, hideable box that reduces the number of clicks for  tasks in Ghost Trappers
// @include        http://apps.facebook.com/ghost-trappers/*
// @include        https://apps.facebook.com/ghost-trappers/*
// @include        http://www.ghost-trappers.com/fb/*
// @exclude        http://apps.facebook.com/ghost-trappers/profiletab/*
// @require        http://sizzlemctwizzle.com/updater.php?id=95947
// @history        2.65 - Added profile link to the dog picture
// @history        2.6 - Fixed IDs, added HWeek mechanisms + Starsworn
// @history        2.54 - Added more inventory, fixed some contract errors, added Dreadmoor travel.
// @history        2.531 - Added more inventory, fixed a couple more bugs.
// @history        2.53 - Added more inventory, fixed a couple bugs.
// @history        2.52 - Added Training Room.
// @history        2.51 - Added Rainbow Agent.
// @history        2.5 - Added more contracts, bait, companions, circles, and mechanisms, fixed companion page bug.
// @history        2.4 - Google Chrome support, 3 new contracts, fixed Sanguine candles
// @history        2.321 - Bugfix releast, fixed saved setups only showing at Camp, fixed Lucky Rabit mechanism arming.
// @history        2.32 - organizational menu changes (colors and lines), saved setup titles (1-3), Chrono Dragon companion, improved Secret Transmission detection code
// @history        2.31 - added mouseover stats for all bait, 1 circle, travel to scarwood, 3 contracts, and alphabetized contracst, added link to saved setups.
// @history        2.3 - added cocktail, added companion, bug fix, added 2 more saved setups, added cauldrons
// @history        2.24 - more mechanisms now all with stats on mouseover
// @history        2.23 - added more magic circles, bait, and R5 travel, 1 bug fix (secret transmission in title)
// @history        2.22 - added contract attributes on mouseover
// @history        2.21 - added more items to menus, fixed several bugs including Saved Setups
// @history        2.2 - Changed to work with ghost-trappers.com, added tooltip stats, added more items to menus, changed saved setup links
// @history        2.1 - Fixed bugs and layout, added mechanisms
// @history        2.05 - Added travel to regular locations
// @history        2.04 - Added Braveheart cocktail, added timer in title on ghost-trappers.com domain
// @history        2.031 - bug fix
// @history        2.03 - Added version check
// @history        2.02 - Fixed bugs in 2.01, added HWeek bait
// @history        2.01 - Added version info and link to DL script
// @history        2.0 - Added more IDs, changed layout of links
// @history        2.0 beta3 - Updated for new Facebook app changes
// @history        2.0 beta2 - updated bait, contracts, and companions, added IDs
// @history        2.0 beta1 - Added bait, contracts, and companion menus
// @history        1.0 - Initial release (modification of travcollier's script)
// ==/UserScript==

// Modified from http://userscripts.org/scripts/show/72026 script by travcollier http://userscripts.org/users/140176

// current version (should match GM metatags)
version = 2.65;

// icon/image used as the main button (hides and shows option window)
window.GTDog_main_icon_href = "data:image/png;base64,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"

//get FB ID and set to variable
fbidRegex = /\d{3,}(?=&fromWall=1)/;
if ( document.getElementsByClassName("petRightLevel")[0]){
	var divs = document.getElementsByTagName("div");
    var link = null;

    for (var i=0; i<divs.length; i++)
    {
       if(divs[i].getAttribute("class") ==="petRightLevel")
       {
          link = divs[i].getElementsByTagName("a")[0];
          break;
       }
    }
    if (link){
       codeStore = link.onclick;
       fbid = fbidRegex.exec(codeStore);
    }
}

// get setup names and set them to variables
title1 = "Switch to saved setup 1.";
title2 = "Switch to saved setup 2.";
title3 = "Switch to saved setup 3.";
title4 = "Switch to saved setup 4.";
title5 = "Switch to saved setup 5.";

if ( document.getElementsByClassName("slotLink slot1 ")[0]){
	title1 = document.getElementsByClassName("slotLink slot1 ")[0].title;
}

if ( document.getElementsByClassName("slotLink slot2 ")[0]){
	title2 = document.getElementsByClassName("slotLink slot2 ")[0].title;
}

if ( document.getElementsByClassName("slotLink slot3 ")[0]){
	title3 = document.getElementsByClassName("slotLink slot3 ")[0].title;
}

if ( document.getElementsByClassName("bigName")[0]){
	title1 = "Switch to saved " + document.getElementsByClassName("bigName")[0].textContent;
	title2 = "Switch to saved " + document.getElementsByClassName("bigName")[1].textContent;
	title3 = "Switch to saved " + document.getElementsByClassName("bigName")[2].textContent;
	title4 = "Switch to saved " + document.getElementsByClassName("bigName")[3].textContent;
	title5 = "Switch to saved " + document.getElementsByClassName("bigName")[4].textContent;
}

// Intialization of the page 
window.GTDogInitFunction = function() {
	
	// outer div containing icon, menus, and links
	var oDiv = document.createElement('div'); 
	oDiv.id = 'GTDog';
	oDiv.innerHTML = '<div style="overflow:hidden; width:100%;">\n<a href="http://www.ghost-trappers.com/fb/profiletab/index_intern.php?fbid='+ fbid +'#profileTop">\n<img src="'+ window.GTDog_main_icon_href +'" style="float:right; background-color:blue; border:solid black 1px; id="GTDogToggleOptionsButton">\n</a>\n</div>';
	//oDiv.innerHTML = '<div style="overflow:hidden; width:100%;">\n<img src="'+ window.GTDog_main_icon_href +'" style="float:right; background-color:blue; border:solid black 1px; id="GTDogToggleOptionsButton">\n</div>';
	oDiv.style.padding = "0px";
	oDiv.style.position = "fixed";
	oDiv.style.top = "0px";
	oDiv.style.right = "0px";
	oDiv.style.zIndex = 100; // absurdly high zIndex to ensure it is on top
	oDiv.style.visibility = 'visible';
	window.top.document.body.appendChild(oDiv);
	// links and menus div
	lDiv = document.createElement('div'); 
	lDiv.id = 'GTDogOptionsDiv';
	lDiv.style.border = "solid black 2px";
	lDiv.style.clear = "both";
	lDiv.style.padding = "0 0 0 1px";
	lDiv.style.background = "lightgray";
	lDiv.style.position = "relative";
	lDiv.style.top = "-1px";
	lDiv.style.zIndex = 100; // absurdly high zIndex to ensure it is on top
	lDiv.style.visibility = 'visible';
	window.top.document.getElementById('GTDog').appendChild(lDiv);
	// fill in the lDiv html
	window.GTDogInitOptionsDiv();
	// start updating the title with the timer
	window.updateTitle();
	
	// add click handler to button/icon
	var el = document.getElementById('GTDogToggleOptionsButton');
	el.addEventListener('click',window.GTDogToggleOptionsVisibility,true);

	// Set default options if needed (true is default)
	if( get_cookie('visibility') == null){
		set_cookie('visibility', true, "", "", "", "/");
	}
	
	// open options div (if it was open before)
	if( get_cookie('visibility') == "true" )
	{ 
		document.getElementById('GTDogOptionsDiv').style.visibility = 'visible';
	}

	// hide options div (if it was hidden before)
	if( get_cookie('visibility') == "false" )
	{ 
		document.getElementById('GTDogOptionsDiv').style.visibility = 'hidden';
	}
	
};


// Options selectors
window.GTDogToggleOptionsVisibility = function()
{
	var el = document.getElementById('GTDogOptionsDiv');
	var status = get_cookie('visibility');
	if (status == "true")
	{
		set_cookie('visibility', false, "", "", "", "/");
		el.style.visibility = 'hidden';
	}
	if (status == "false")
	{
		set_cookie('visibility', true, "", "", "", "/");
		el.style.visibility = 'visible';
	}
	else
	{
		set_cookie('visibility', true, "", "", "", "/");
		el.style.visibility = 'visible';
	}
};

	
	
// Insert links and menus into links div
window.GTDogInitOptionsDiv = function()
{
	var lDiv = window.top.document.getElementById('GTDogOptionsDiv');
	// write the html
	lDiv.innerHTML = '<b>GT Hunting Dog</b>&nbsp;&nbsp;&nbsp;<a href="http://userscripts.org/scripts/show/95947" target="_blank" title="visit the script page">'+ version +'</a>'; 
	// Mechanism menu- www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=#
	lDiv.innerHTML += '\n<form id="Mechanisms" action="http://www.ghost-trappers.com/fb/setup.php" method="get">\n<input type="text" name="type" value="mechanism" style="position:absolute; display:none;" /><select name="arm" style="width:127px; background:GhostWhite;" onchange="submit();">\n<option value="">Mechanism...</option>\n<option style="background-color:#985dad;" value="">■Arcane</option>\n<option value="32" title="220 Raw, 20 Mystic, -1 Minute">Abyssal Phone Booth</option>\n<option value="73" title="115 Raw, 30 Mystic, -1 Minute, +1 Burner, 7 Malty Mist, 10%Monster Slayer, 3 Doppelgänger, 5 Will Power, 1 Mystery">Celestial Knight</option>\n<option value="23" title="30 Mystic, -2 Minutes">Magic Maze</option>\n<option value="44" title="290 Raw, 15 Mystic, -1 Minute">Ether Portal</option>\n<option value="18" title="170 Raw, 10 Mystic">The Emerald Pearl</option>\n<option value="28" title="188 Raw, 25 Mystic, -1 Minute">X-Kaliboo</option>\n<option style="background-color:#95bd26;" value="">■Bio</option>\n<option value="61" title="360 Raw, 16 Mystic, -3 Minutes, +1 Burner, 5 Sanguine Scent">Captured Werewolf</option>\n<option value="42" title="270 Raw, 10 Mystic, 3 Malty Mist">Doomshroom</option>\n<option value="12" title="130 Raw, 10 Mystic, 2 Malty Mist">Highland Cattle</option>\n<option value="55" title="342 Raw, 10 Mystic, -3 Minutes, 6 Malty Mist">Lost Island Raptor</option>\n<option value="41" title="5 Raw, 25 Mystic, x2 Loot, 3% Midnight Attraction, 3 Malty Mist">Lucky Rabbit</option>\n<option value="34" title="150 Raw, 10 Mystic, 2 Malty Mist">Poisonous Scorpions</option>\n<option value="31" title="217 Raw, 15 Mystic, +2 Minutes, 3 Malty Mist">Sleeping Dragon</option>\n<option value="25" title="182 Raw, 15 Mystic, 2 Malty Mist">Venus Fly Trap</option>\n<option value="70" title="125 Raw, 20 Mystic, -1 Minute, +1 Burner, 7 Malty Mist, 10% Monster Slayer, 3 Doppelgänger, 5 Will Power, 1 Mystery">Vine Cage</option>\n<option style="background-color:#65b3e5;" value="">■High Tech</option>\n<option value="15" title="145 Raw, -2 Minutes">Addictive PC Game</option>\n<option value="29" title="207 Raw">Anti-Gravity Zone</option>\n<option value="66" title="343 Raw, -2 Minutes, 3% Superbuff">Arctic Cyberraptor</option>\n<option value="10" title="137 Raw, 2 Mystic">Black Hole</option>\n<option value="17" title="170 Raw, +1 Burner">Bottle Barrage Tank</option>\n<option value="56" title="343 Raw, -2 Minutes">Cyberraptor</option>\n<option value="7" title="90 Raw">Freezer</option>\n<option value="11" title="160 Raw">Ghost Magnet</option>\n<option value="39" title="270 Raw, +2 Burner">Max E. Million</option>\n<option value="8" title="75 Raw, 1 Mystic">Pew Pew Purple Beams</option>\n<option value="35" title="205 Raw, -2 Minutes, +1 Burner">Slapping Machine</option>\n<option value="26" title="210 Raw, +1 Burner">Suck-O-Matic 9000</option>\n<option value="48" title="305 Raw, +1 Burner">Laser Shark Basin</option>\n<option style="background-color:#852622; font-weight:bold;" value="">■Infernal</option>\n<option value="53" title="155 Raw">Closed Happy Hour</option>\n<option value="57" title="345 Raw, 5 Mystic, -1 Minute, 2% Midnight Attraction">Devilraptor</option>\n<option value="52" title="230 Raw, 5 Mystic, +1 Burner">Infernal Phone Booth</option>\n<option value="54" title="150 Raw, 25 Mystic, -4 Minutes, 7% Midnight Attraction, 2 Malty Mist">Iron Maiden</option>\n<option value="40" title="326 Raw, -3 Minutes, 10% Midnight Attraction">Black Knight</option>\n<option value="71" title="135 Raw, 25 Mystic, -2 Minutes, +1 Burner, 7 Sanguine Scent, 10% Monster Slayer, 3 Doppelgänger, 5 Will Power, 1 Mystery">Stakethrower</option>\n<option value="51" title="160 Raw, 5 Mystic">Volksmusik-From-Hell</option>\n<option style="background-color:#a77d4b;" value="">■Traditional</option>\n<option value="43" title="280 Raw, 5 Mystic, -2 Minutes">Danse Macabre</option>\n<option value="38" title=" 250 Raw, 15 Mystic, +3 Minutes">Damocles Array</option>\n<option value="14" title="155 Raw, 3 Mystic, +3 Minutes">Eternal Happy Hour</option>\n<option value="24" title="177 Raw">Explosive Sheep Dummy</option>\n<option value="16" title="155 Raw, 10 Mystic">German Volksmusic Band</option>\n<option value="30" title="210 Raw, 15 Mystic, +3 Minutes">Ghost Bus</option>\n<option value="72" title="130 Raw, 5 Mystic, -1 Minute, +1 Burner, 7 Malty Mist, 10% Monster Slayer, 3 Doppelgänger, 5 Will Power, 1 Mystery">Goo Cannon</option>\n<option value="27" title="193 Raw, +1 Minute">Piano-on-a-Rope</option>\n<option value="4" title="30 Raw, 1 Mystic">Piper Jukebox</option>\n<option value="3" title="20 Raw">Punch-in-a-Box</option>\n<option value="58" title="355 Raw, 5 Mystic, -2 Minutes">Retro Time Warper</option>\n<option value="9" title="115 Raw, 5 Mystic">Skeleton Coach</option>\n<option value="2" title="10 Raw">Suck-O-Matic 3000</option>\n<option value="19" title="165 Raw, 3 Mystic, -2 Minutes">Time Warper</option>\n<option value="37" title="230 Raw, 10 Mystic, -3 Minutes, 5% Midnight Attraction">Time Warper Platinum</option>/n<option value="61" title="365 Raw, 5 Mystic, -2 Minutes, +1 Burner, 2 Malty Mist, 3 Sanguine Scent">Trojan Raptor</option>\n</select>\n</form>';
	// Magic Circle menu- www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=#
	lDiv.innerHTML += '\n<form id="Mechanisms" action="http://www.ghost-trappers.com/fb/setup.php" method="get">\n<input type="text" name="type" value="magic_circle" style="position:absolute; display:none;" /><select name="arm" style="width:127px; background:GhostWhite;" onchange="submit();">\n<option value="">Magic Circle...</option>\n<option value="8" title="33 Raw, 3 Mystic">Black Candles</option>\n<option value="28" title="25 Raw, 20 Mystic, -1 Minute, 3 Malty Mist">Black Dragon\'s Breath</option>\n<option value="27" title="100 Raw, 10 Mystic, +1 Minute">Bottled Fireflies</option>\n<option value="22" title="75 Raw, +1 Burner">Burning Bottles</option>\n<option value="38" title="120 Raw, 15 Mystic, -1 Minutes, +1 Burner, 5% Doppelgänger">Chocolate Candles</option>\n<option value="10" title="15 Raw, 20 Mystic">Dance of the Wisps</option>\n<option value="2" title="30 Raw, 5 Mystic, -1 Minute">Dragon\'s Breath</option>\n<option value="15" title="45 Raw">Ectoplasmic Goo</option>\n<option value="32" title="130 Raw, 5 Mystic">Flight of the Phoenix</option>\n<option value="37" title="160 Raw, 6 Mystic, +1 Burner, 2% Purify, 2 Sanguine Scent">Forest Candles</option>\n<option value="11" title="25 Raw">Ghost Ink</option>\n<option value="18" title="55 Raw, 5 Mystic">Golden Candles</option>\n<option value="17" title="65 Raw, 15 Mystic">Ivory Candles</option>\n<option value="29" title="110 Raw, 10 Mystic, -1 Minute, +1 Burner">Laughing Skulls</option>\n<option value="24" title="30 Raw, -2 Minutes">Lava Lamps</option>\n<option value="25" title="70 Raw, 10 Mystic, +2 Minutes">Little Stonehenge</option>\n<option value="20" title="65 Raw, 5 Mystic, +1 Mystic">Magic Torches</option>\n<option value="21" title="60 Raw, 5 Mystic, -2 Minutes">Neon Lights</option>\n<option value="3" title="10 Raw">Ornate Candles</option>\n<option value="34" title="15 Raw, 30 Mystic, +1 Burner, 8 Malty Mist, 2% Purify">Planar Candles</option>\n<option value="31" title="20 Raw, 15 Mystic, 3% Midnight, 5 Malty Mist">Pumpkin Candles</option>\n<option value="23" title="15 Raw, 5 Mystic">Quartz Crystal Array</option>\n<option value="35" title="155 Raw, 5 Mystic, -1 Minute, +1 Burner, 2% Midnight, 1% Purify">Roseglazed Candles</option>\n<option value="19" title="10 Raw, 25 Mystic, +1 Minute">Runic Candles</option>\n<option value="36" title="10 Raw 33, Mystic, -1 Minute, +2 Burner, 3 Malty Mist, 5 Sanguine Scent">Sanguine Candles</option>\n<option value="4" title="15 Raw, 1 Mystic">Silver Candles</option>\n<option value="16" title="50 Raw, 15 Mystic, +1 Minute, 1 Malty Mist">Starlight</option>\n<option value="39" title="25 Mystic, -2 Mintues, 5% Superbuff">Snow Candles</option>\n<option value="9" title="22 Raw, 5 Mystic">Twilight Candles</option>\n<option value="13" title="35 Raw">UV Lights</option>\n<option value="6" title="10 Raw, 10 Mystic">Violet Candles</option>\n<option value="33" title="145 Raw, -1 Minute, +2 Burner">Volcanos</option>\n<option value="26" title="5 Raw, 25 Mystic, 5% Midnight Attraction">Wax Pyramids</option>\n<option value="2" title="5 Raw">White Candles</option>\n<option value="14" title="40 Raw, 3 Mystic, +1 Burner">White Phosphor</option>\n</select>\n</form>';
	// Companion menu
	lDiv.innerHTML += '\n<form id="companions" action="http://www.ghost-trappers.com/fb/setup.php" method="get">\n<input type="text" name="type" value="companion" style="position:absolute; display:none;" /><input type="text" name="go" value="1" style="position:absolute; display:none;" /><select name="companion_id" style="width:127px; background:GhostWhite;" onchange="submit();">\n<option value="">Companion...</option>\n<option value="68">Badger</option>\n<option value="67">Beaver</option>\n<option value="24">Birdie</option>\n<option value="88">Blood Drop</option>\n<option value="5">Bunny</option>\n<option value="48">Camel</option>\n<option value="81">Celestial Ghost</option>\n<option value="69">Chrono Dragon Whelp</option>\n<option value="51">Diamond Dragon Whelp</option>\n<option value="58">Electric Dragon Whelp</option>\n<option value="26">Emerald Dragon Whelp</option>\n<option value="42">Ethereal Cow</option>\n<option value="46">Ferret</option>\n<option value="44">Fox</option>\n<option value="56">Goat</option>\n<option value="30">Hamster</option>\n<option value="37">Hedgehog</option>\n<option value="1">Kitty</option>\n<option value="50">Leprechaun</option>\n<option value="47">Lion Cub</option>\n<option value="64">Little Bronto</option>\n<option value="32">Little Cu Sith</option>\n<option value="49">Little Cupid Ghost</option>\n<option value="41">Little Devil</option>\n<option value="31">Little Kelpie</option>\n<option value="17">Little Spooky</option>\n<option value="66">Little T-Rex</option>\n<option value="23">Loris</option>\n<option value="45">Owl</option>\n<option value="28">Phoenix</option>\n<option value="70">Piggy</option>\n<option value="53">Pink Spooky</option>\n<option value="11">Pixie</option>\n<option value="82">Planar Ghost</option>\n<option value="9">Racoon</option>\n<option value="80">Raindrop</option>\n<option value="33">Rat</option>\n<option value="40">Reindeer</option>\n<option value="43">Robot</option>\n<option value="36">Seal</option>\n<option value="27">Seahorse</option>\n<option value="29">Snake</option>\n<option value="73">Snowman</option>\n<option value="6">Special Bunny</option>\n<option value="2">Special Kitty</option>\n<option value="19">Special Nessy</option>\n<option value="12">Special Pixie</option>\n<option value="4">Special Puppy</option>\n<option value="10">Special Racoon</option>\n<option value="16">Special Spider</option>\n<option value="18">Special Spooky</option>\n<option value="14">Special Squirrel</option>\n<option value="8">Special Turtle</option>\n<option value="7">Turtle</option>\n</select>\n</form>';
	// Contract menu- http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=#
	lDiv.innerHTML += '\n<form id="contracts" action="http://www.ghost-trappers.com/fb/setup.php" method="get">\n<input type="text" name="type" value="contract" style="position:absolute; display:none;" />\n<select name="arm" style="width:127px; background:GhostWhite;" onchange="submit();">\n<option value="">Contract...</option>\n<option style="background-color:#985dad;" value="">■Arcane</option>\n<option value="38" title="3 Raw, -10 Mystic, 10% XP, -2 Minutes, -1 Burner">Balthasar the Sorcerer</option>\n<option value="23" title="10 Mystic, x1.5 Loot, -2 Minutes, 5% Midnight Attraction">Countess Wilhelmina</option>\n<option value="11" title="-5 Raw, 10 Mystic, -2 Minutes, 2 Attraction, 1% Midnight Attraction">Mr. Bastian Shaw</option>\n<option value="6" title="3 Mystic, 20% XP">Novice Bryan B.</option>\n<option value="34" title="5 Mystic, 1% Midnight Attraction, 30% Pet Trainer">Petmaster Peter P.</option>\n<option value="17" title="-10 Raw, 10 Mystic, 20% Cash, x1.75 Loot">Sensei Nakamura</option>\n<option value="65" title="5 Mystic, -1.5 Minutes, 3 Sanguine Scent, 2% Luck, 5% Doppelgänger">Starsworn Unicorn</option>\n<option value="55" title="6 Mystic, -2 Minutes, 5% Midnight, 5 Sanguine Scent, 10% Monster Slayer, +1 Blood Plasma Loot">Valeria Vampire Hunter</option>\n<option style="background-color:#95bd26;" value="">■Bio</option>\n<option value="36" title="10 Mystic, -2 Minutes, 2 Attraction, 3 Malty Mist">Etain, Pict Huntress</option>\n<option value="14" title="2 Raw, 15% Cash, 15% XP">Gwynnyth The Shaman</option>\n<option value="32" title="2 Mystic, 1 Malty Mist, 30% Pet Trainer">Jarisleif The Viking</option>\n<option value="22" title="3 Raw, -2 Minutes, 1 Attraction, 5% Midnight Attraction, 1 Malty Mist">Lorelle</option>\n<option value="56" title="4 Mystic, -2 Minutes, 7 Sanguine Scent, 10% Monster Slayer, +1 Blood Plasma Loot, 2% Luck">Oakmoss Elder T...</option>\n<option value="26" title="6 Raw, +1 Burner, 1 Malty Mist">Rufus the druid</option>\n<option value="13" title="3 Raw, 3 Mystic, x2.5 Loot, 2 Malty Mist">The White Lady</option>\n<option value="4" title="1 Raw, 10% XP, -1 Minute">Zoologist Emma Parker</option>\n<option style="background-color:#65b3e5;" value="">■High Tech</option>\n<option value="41" title="x1.5 Loot, -3 Minutes, 6 Malty Mist">Biochemist Dana Hunter</option>\n<option value="57" title="20 Mystic, 10% Cash, -2 Minutes, 6 Sanguine Scent, 15% Monster Slayer, +1 Blood Plasma Loot">Coffincracker Drone</option>\n<option value="62" title="5 Raw, 20% Cash, x1.5 Loot, -1.5 Minutes, 5% Doppelgänger">Cybercorn</option>\n<option value="33" title="3 Raw, -10 Mystic, 15% Cash, 30% Pet Trainer">Cyberengineer Phil Fox</option>\n<option value="16" title="5 Raw, -30 Mystic, +1 Burner">Dr Fürchtegott N.</option>\n<option value="19" title="2 Raw, 50% XP, +5 Minutes">Engineer Clyde T.</option>\n<option value="2" title="1 Raw, -3 Mystic, 50% Cash, +1 Minute">Mechanic Daniel Roy</option>\n<option value="20" title="1 Raw, -20 Mystic, -2 Minutes, 5% Midnight Attraction, -1 Burner">Nurse Chapham</option>\n<option value="50" title="3 Raw, -20 Mystic, -2 Minutes, 1 Attraction, -1 Burner, +10 Mystery Milk Loot">Prodigy Eli McGrommit</option>\n<option value="30" title="20 Mystic, -2 Minutes, -1 Burner">Professor Albert Z.</option>\n<option value="8" title="1 Raw, -3 Mystic, 25% XP">Sir Overdrive</option>\n<option value="12" title="4 Raw, -20 Mystic, 10% Cash">Tracy Queen</option>\n<option style="background-color:#852622; font-weight:bold;" value="">■Infernal</option>\n<option value="49" title="1 Raw, 7 Mystic, -3 Minutes, 1 Attraction, 10% Pet Trainer, +10 Silver Screen Loot">Beastmaster Esca</option>\n<option value="45" title="5 Raw, 10% Cash, 10% XP, -1 Minute, 5% Purify">Father Pippin The E.</option>\n<option value="52" title="2 Raw, -1 Minute, 1 Attraction, +10 Screaming Strawberry Loot, %5 Luck">Firefighter Nero Jones</option>\n<option value="54" title="5 Mystic, -3 Minutes, 5 Sanguine Scent, 10% Monster Slayer, 3% Purify, +1 Blood Plasma Loot">Helge, Sorcerer A...</option>\n<option value="61" title="3 Raw, -1.5 Minutes, 10% Monster Slayer, 5% Purify, 5% Doppelgänger">Infernicorn</option>\n<option value="28" title="25 Mystic, 10% XP">Mr. Alistair Crow</option>\n<option value="44" title="5 Raw, x2 Loot, -2 Minutes, 5% Pufify">Maya Yendri</option>\n<option style="background-color:#ca2a21;" value="">■Magic Circle</option>\n<option value="24" title="10% XP, -1 Minute, 3% Midnight, ">Assitant Chip Dale</option>\n<option value="66" title="10% XP, -1 Minute, 3% Doppelgänger, +5 Special Vintages Loot">Celestial Unicorn</option>\n<option value="43" title="3 Mystic, 5% Pet Trainer, -5% Monster Slayer">Cora the red</option>\n<option value="42" title="10% Mystic, -1 Minute, 5% Pet Trainer">Dancning Skeleton</option>\n<option value="18" title="5 Mystic, 2 Attraction, 7% Midnight Attraction, 2 Malty Mist">Ether Guardian</option>\n<option value="59" title="1 Raw, 1 Mystic, -1 Minute, +1 Magic Wood Loot">Jack the Lumberjack</option>\n<option value="48" title="x1.75 Loot, 5 Malty Mist, -10% Monster Slayer, +1 Elemental Plasma Loot">Professor Elizabeth M...</option>\n<option value="29" title="5 Mystic, 10% Cash, -1 Minute, 5 Malty Mist, 10% Monster Slayer">Siegfried the D...</option>\n<option value="3" title="8 Mystic, -1 Minute, 1 Attraction, 2 Malty Mist">Sorceress Alithia W.</option>\n<option value="67" title="10% Cash, -2 Minutes, 3% Superbuff">Snow Unicorn</option>\n<option value="35" title="1 Raw, 1 Mystic, -1 Minute, 5% Midnight Attraction, 20% Pet Trainer">The Chairman</option>\n<option value="10" title="3 Mystic, x2 Loot, -1 Minute, 1 Attraction, 1 Malty Mist">Vilevere</option>\n<option style="background-color:#a77d4b;" value="">■Traditional</option>\n<option value="15" title="5 Mystic, x1.5 Loot">Bianca The Waitress</option>\n<option value="5" title="15% XP, 15% Cash, 1 Attraction">Igidius Brown</option>\n<option value="1" title="5 Raw">Inspector James Sinclair</option>\n<option value="27" title="3 Raw, 20% XP, 10% Cash, +3 Minutes">James The Butler</option>\n<option value="39" title="4 Raw, 10% XP, -2 Minutes, -1 Burner">Mr. Arlington Steele</option>\n<option value="53" title="2 Raw, 5 Mystic, -3 Minutes, 5 Sanguine Scent, 5% Monster Slayer">Sarah Michelle Gunther</option>\n<option value="63" title="3 Raw, x2 Loot, -2 Minutes, 5% Midnight, 10% Doppelgänger, +1 Magic Wood Loot">Rainbow Unicorn</option>\n<option value="21" title="3 Raw, 3 Mystic, -2 Minutes, 5% Midnight Attraction">Selena Darkblade</option>\n<option value="37" title="3 Raw, x2 Loot, -3 Minutes, 5 Malty Mist">Sir Hyronimus Q.</option>\n<option value="31" title="2 Raw, 10% XP, 30% Pet Trainer">Sebastian the Frisian</option>\n</select>\n</form>';
	// Whisky menu 
	lDiv.innerHTML += '\n<form id="bait" action="http://www.ghost-trappers.com/fb/setup.php" method="get">\n<input type="text" name="type" value="whisky" style="position:absolute; display:none;" /><select name="arm" style="width:127px; background:GhostWhite;" onchange="submit();">\n<option value="">Whisky...</option>\n<option style="background-color:#e8fff0;" value="4" title="Low">Silver Star Green</option>\n<option style="background-color:#e8fff0;" value="5" title="Low">Moonshadow Green</option>\n<option style="background-color:#e8fff0;" value="7" title="Moderate">Moormist Green</option>\n<option style="background-color:#e8fff0;" value="8" title="Reasonable">Glengreen Green</option>\n<option style="background-color:#e8fff0;" value="14" title="Reasonable, 1 Mystic">Whisperwind Green</option>\n<option style="background-color:#e8fff0;" value="53" title="Reasonable, 1 Raw, 1 Mystic, x1.25 Loot">Shadetouch Green Green</option>\n<option style="background-color:#d1f0ff;" value="6" title="Low, 5 Raw, 10% Cash">Silver Star Blue</option>\n<option style="background-color:#d1f0ff;" value="10" title="Low, 10% XP">Moonshadow Blue</option>\n\n<option style="background-color:#d1f0ff;" value="11" title="Moderate, 1 Mystic, 10% Cash">Moormist Blue</option>\n<option style="background-color:#d1f0ff;" value="12" title="Reasonable, 5% XP, 5% Cash">Glengreen Blue</option>\n<option style="background-color:#d1f0ff;" value="18" title="1 Mystic, 10% XP, 10% Cash">Whisperwind Blue</option>\n<option style="background-color:#d1f0ff;" value="54" title="Reasonable, 2 Raw, 2 Mystic, 20% XP, 20% Cash, 1% Midnight, 2% Luck, x1.5 Loot">Shadetouch Blue</option>\n<option style="background-color:#dfd1ff;" value="23" title="Low, 5 Raw, 100% Cash">Silver Star Purple</option>\n<option style="background-color:#dfd1ff;" value="32" title="Moderate, 3 Mystic, 50% XP, 50% Cash, 1 Malty Mist">Moonshadow Purple</option>\n<option style="background-color:#dfd1ff;" value="37" title="Moderate, 50% XP, 50% Cash, 5% Midnight Attraction, 3 Malty Mist">Moormist Purple</option>\n<option style="background-color:#dfd1ff;" value="43" title="High, 100% XP, 1% Midngiht Attraction">Glengreen Purple</option>\n<option style="background-color:#dfd1ff;" value="46" title="High, 3 Raw, 3 Mystic, 3% Midnight Attraction">Whisperwind Purple</option>\n<option style="background-color:#dfd1ff;" value="55" title="Reasonable, 2 Raw, 3 Mystic, 30% XP, 30% Cash, 1% Midnight, 3% Luck, x2 Loot">Shadetouch Purple</option>\n<option style="background-color:#d9fed3;" value="9" title="Very High, 5 Mystic, -5 Minutes, 2 Malty Mist">Nessy\'s Golden Reserve</option>\n<option style="background-color:#fffa9e;" value="39" title="Very High, 5 Raw, 7 Mystic, -6 Minutes, 5% Midnight Attraction, 5 Malty Mist, 2 Sanguine Scent">Nessy\'s Platinum Edition</option>\n<option value="57" title="Reasonable, 2% Superbuff">Avalanche</option>\n<option value="40" title="High, 5 Mystic, 50% XP, 50% Cash, 3 Malty Mist">Belt of Venus</option>\n<option value="49" title="High, 1 Mystic, 3% Purify">Condensed Halo</option>\n<option value="20" title="Reasonable, 10 Mystic">Highland Pride</option>\n<option value="51" title="Low, 2 Mystic, 6% XP, 6% Cash, 2% Midnight, 1 Sanguine Scent">Liquid Ember</option>\n<option value="26" title="Low, 10 Raw">Maß malt juice</option>\n<option value="45" title="Low, 3 Mystic, 25% Midnight Attraction">Pumpkin Punch</option>\n<option value="" style="border-top:1px dotted black;">■Cocktails</option>\n<option value="15" title="20% Cash">Apple Zapper</option>\n<option value="22" title="20% XP">Black Tartan</option>\n<option value="41" title="5 Mystic, 20% Cash, -2 Minutes, 3 Malty Mist">Black Widow</option>\n<option value="21" title="20% Cash, -1 Minute, 1 Malty Mist">Braveheart</option>\n<option value="30" title="3 Raw, 10% XP, 10% Cash">Cherry Bomb</option>\n<option value="56" title="Very High, 2 Raw, 2 Mystic, 50% Cash, 50% XP, -2 Minutes, 5% Doppelgänger">Choco Shock</option>\n<option value="34" title="2 Mystic, -3 Minutes, 5% Midnight Attraction">Corpse Reviver</option>\n<option value="52" title="1 Raw, 5 Mystic, 5% XP, 15% Cash, -2 Minutes, 3 Sanguine Scent">Crimson Mary</option>\n<option value="25" title="1 Raw, 1 Mystic, 15% XP, 15% Cash, -3 Minutes">Devil Driver</option>\n<option value="50" title="10% XP, 10% Cash, -2 Minutes">Double Feature</option>\n<option value="44" title="2 Raw, 20% XP, -1 Minute, 3% Midnight Attraction, 3 Malty Mist">Frozen Mist</option>\n<option value="17" title="10% XP, 10% Cash">Gentleman</option>\n<option value="28">Green Goddess</option>\n<option value="16" title="20% XP, 1 Malty Mist">Jack Jones</option>\n<option value="29" title="5 Raw, 3% XP, 3% Cash, -2 Minutes">Jesperian Way</option>\n<option value="48" title="2 Mystic, 5% XP, 12% Cash, -2 Minutes, 1 Malty Mist, 2% Luck">Lucky Punch</option>\n<option value="36" title="5 Mystic, 10% XP, 10% Cash, -2 Minutes, 5% Midnight Attraction">Midnight Rider</option>\n<option value="35" title="3 Raw, 10% XP, 10% Cash, -1 Minute, 5% Midnight Attraction">Midnight Smash</option>\n<option value="33" title="2% Midnight Attraction">Mistletoe</option>\n<option value="38" title="20% XP, -3 Minutes">Nightcap</option>\n<option value="31" title="5 Mystic, 5% XP, 5% Cash, -1 Minute">Old Admiral</option>\n<option value="47" title="20% Cash">Red Nightmare</option>\n<option value="24" title="3 Raw, 3 Mystic, 5% XP, 5% Cash">Ruby Tuesday</option>\n<option value="42" title="10% XP, 10% Cash">Witch Hunt</option>\n</select>\n</form>';
	// ID menu (Misc)
	lDiv.innerHTML += '\n<form id="IDs" action="http://www.ghost-trappers.com/fb/setup.php" method="get">\n<input type="text" name="type" value="id" style="position:absolute; display:none;" /><select name="arm" style="width:127px; background:GhostWhite;" onchange="submit();">\n<option value="">ID Badge...</option>\n<option value="2">Basic ID Badge</option>\n<option value="17" title="-1 minute">Cosmic Agent</option>\n<option value="21" title="-1 minute, x1.5 Loot">Devoted Agent</option>\n<option value="4" title="+1 Raw ">Donator</option>\n<option value="11" title="-1 Burner">Ghost Puzzler</option>\n<option value="19" title=" 3% Purify">Love Agent</option>\n<option value="23" title="1% Leprechaun\'s Luck">Lucky</option>\n<option value="20" title="2 Malty Mist">Monster Trapper</option>\n<option value="12" title="+1 Mystic">Mystic Agent</option title="+1 Mystic">\n<option value="15" title="3 Midnight Attraction">Nocturnal Agent</option>\n<option value="14" title="+1 Attraction">Platinum</option>\n<option value="26" title="x1.25 Loot, 3 Doppelgänger">Rainbow Agent</option>\n<option value="6" title="+1 Raw, +3 Mystic, +1 Attraction">Secret Agent</option>\n<option value="5" title="+1 Raw, +1 Attraction">Supporter</option>\n<option value="18" title="x1.5 Loot">Twilight Agent</option>\n</select>\n</form>';
	// Cauldron menu- http://www.ghost-trappers.com/fb/setup.php?type=cauldron&arm=#
	lDiv.innerHTML += '\n<form id="Cauldrons" action="http://www.ghost-trappers.com/fb/setup.php" method="get">\n<input type="text" name="type" value="cauldron" style="position:absolute; display:none;" /><select name="arm" style="width:127px; background:GhostWhite;" onchange="submit();"><option value="">Cauldron...</option>\n<option value="2" title="2 Malty Mist">Basic Cauldron</option>\n<option style="border-bottom:1px dotted black;" value="3" title="5 Mystic, x1.25 Loot, 5 Malty Mist">Witch Cauldron</option>\n<option value="4" title="2 Malty Mist">Jura Atomizer</option>\n<option style="border-bottom:1px dotted black;" value="5" title="5 Mystic, x1.25 Loot, 5 Malty Mist">Super Jura Atomizer</option>\n<option value="7" title="2 Malty Mist">Planar Disruptor</option>\n<option style="border-bottom:1px dotted black;" value="6" title="5 Mystic, x1.25 Loot, 5 Malty Mist">Planar Disintegrator</option>\n<option value="9" title="3 Sanguine Scent">Blood Cauldron</option>\n<option value="10" title="5 Mystic, -1 Minute, 5 Sanguine Scent">Ancient Blood Cauldron</option>\n</select>\n</form>'
	// Travel menu 
	lDiv.innerHTML += '\n<form id="travel" action="http://www.ghost-trappers.com/fb/travel.php" method="get">\n<select name="to" style="width:127px; background:GhostWhite;" onchange="submit();">\n<option value="">Travel...</option>\n<option value="">R1</option>\n<option value="6">Castle McCloud</option>\n<option value="11">Loch Trool</option>\n<option value="13">Glenluck Abbey</option>\n<option style="border-bottom:1px dotted black;" value="14">Castle McDougan</option>\n<option value="">R2</option>\n<option value="16">Castle McWallace</option>\n<option value="18">Kilwittig House</option>\n<option value="19">Loch Muir</option>\n<option style="border-bottom:1px dotted black;" value="20">Castle McKenny</option>\n\n<option value="">R3</option>\n<option value="23">Wellsington Tower</option>\n<option value="24">Dormont Cemetery</option>\n<option value="25">Castle McDonohan</option>\n<option style="border-bottom:1px dotted black;" value="26">Count Church</option>\n<option value="">R4</option>\n<option value="35">Kirkyard Cemetery</option>\n<option value="36">Kirkyard Morgue</option>\n<option value="37">Kirkyard Crypt</option>\n<option value="39">Duke Leyton Castle</option>\n<option value="40">DLC Library</option>\n<option value="41">DLC Pinnacle</option>\n<option value="43">Crows Hills Sanitorium</option>\n<option value="44">Medical Station</option>\n<option style="border-bottom:1px dotted black;" value="45">High Security Station</option>\n<option value="">R5</option>\n<option value="47">Sternham Castle</option>\n<option value="48">Show Room</option>\n<option value="49">Scarwood Forest</option>\n<option value="54">Dreadmoor</option>\n</select>\n</form>';
	// Text Links
	lDiv.innerHTML += '\n<a href="http://www.ghost-trappers.com/fb/gearstore.php">1st Floor</a>';
	lDiv.innerHTML += '\n<a href="http://www.ghost-trappers.com/fb/scotch_ninth_floor.php" style="position:absolute; left:64px;">9th Floor</a>';
	lDiv.innerHTML += '\n<br /><a href="http://www.ghost-trappers.com/fb/scotch_intern.php" style="position:absolute; left:8px;">Bar</a>';
	lDiv.innerHTML += '\n<a href="http://www.ghost-trappers.com/fb/scotch_ninth_floor.php?page=shop" style="position:absolute; left:72px;">Shop</a>';
	lDiv.innerHTML += '\n<br /><a href="http://www.ghost-trappers.com/fb/scotch_intern.php?type=q" style="position:absolute; left:8px;">Q-Section</a>';
	lDiv.innerHTML += '\n<a href="http://www.ghost-trappers.com/fb/scotch_ninth_floor.php?page=tradePost" style="position:absolute; left:72px;">Tradepost</a>';
	lDiv.innerHTML += '\n<br /><a href="http://www.ghost-trappers.com/fb/scotch_intern.php?type=lab" style="position:absolute; left:8px;">Labratory</a>';
	lDiv.innerHTML += '\n<a href="http://www.ghost-trappers.com/fb/scotch_ninth_floor.php?page=talents" style="position:absolute; left:72px;">Training Rm</a>';	
	lDiv.innerHTML += '\n<br /><a href="http://www.ghost-trappers.com/fb/scotch_intern.php?type=office" style="position:absolute; left:8px;">Office</a>';
	lDiv.innerHTML += '\n<a href="http://www.ghost-trappers.com/fb/scotch_ninth_floor.php?page=exhibition" style="position:absolute; left:72px;">Exhibition</a><br />';
	lDiv.innerHTML += '\n<div style="text-align:center;"><a href="http://www.ghost-trappers.com/fb/setup.php?type=saved" title="Manage saved setups">Saved Setups</a></div>';
	lDiv.innerHTML += '\n<div style="text-align:center;"><a href="http://www.ghost-trappers.com/fb/setup.php?type=saved&action=armSetup&slot=0" title="'+ title1 +'">One</a> \n<a href="http://www.ghost-trappers.com/fb/setup.php?type=saved&action=armSetup&slot=1" title="'+ title2 +'">Two</a> \n<a href="http://www.ghost-trappers.com/fb/setup.php?type=saved&action=armSetup&slot=2" title="'+ title3 +'">Three</a> \n<a href="http://www.ghost-trappers.com/fb/setup.php?type=saved&action=armSetup&slot=3" title="'+ title4 +'">Four</a> \n<a href="http://www.ghost-trappers.com/fb/setup.php?type=saved&action=armSetup&slot=4" title="'+ title5 +'">Five</a></div>';
};

// Put timer in the title of the window/tab
window.updateTitle = function()
{
	if (document.getElementsByName('captcha_id').length > 0)
	{
		mins = "Secret";
		secs = "Transmission";
		divider = " ";
	}

	else if (document.getElementById('topHuntSeconds').textContent == "00" && document.getElementById('topHuntMinutes').textContent == "00")
	{
		mins = "Let's";
		secs = "Hunt!";
		divider = " ";
	}
	
	else if (document.getElementById('topHuntMinutes').textContent != "" && document.getElementById('topHuntSeconds').textContent != "")
	{
		mins = document.getElementById('topHuntMinutes').textContent;
		secs = document.getElementById('topHuntSeconds').textContent;
		divider = ":";
	} 
	
	else
	{
		mins = "Error";
		secs = "creating timer";
		divider = " ";
	}
	
	document.title = "GT " + mins + divider + secs;
	setTimeout(updateTitle, 1000);
}

// cookie functions
window.set_cookie = function(name, value, exp_y, exp_m, exp_d, path, domain, secure)
{
	var cookie_string = name + "=" + escape(value);

	if (exp_y)
	{
		var expires = new Date(exp_y, exp_m, exp_d);
		cookie_string += "; expires=" + expires.toGMTString();
	}

	if (path)
		cookie_string += "; path=" + escape(path);

	if (domain)
		cookie_string += "; domain=" + escape(domain);

	if (secure)
		cookie_string += "; secure";
  
	document.cookie = cookie_string;
}

window.get_cookie = function(cookie_name)
{
	var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
	if (results)
		return (unescape(results[2]));
	else
		return null;
}

// MAIN trigger starting functions
window.GTDogInitFunction();