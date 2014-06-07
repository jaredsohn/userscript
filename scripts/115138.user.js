// ==UserScript==
// @name           GLB Skill Page Enhancements
// @namespace      avidday
// @version        0.9
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// ==/UserScript==

/* rewritten by avidday for use on player skills page and to not use jQuery, 10/9/2011
 * modified ever so slightly by mandyross 22 Sep 2011
 * rewritten by Bogleg from Highlight Attributes Archetype Fix:
 * written by forestmb @userscripts.org
 * modified by peteb @userscripts.org
 * modified by raiderdav @userscripts.org
 * modified by pabst 12/23/08+
 * modified by Tical2k
 * modified by txrulz
 * modified by numone
 * modified by Bogleg 10.06.04 and passed back to numone
 * modified by Bogleg 10.06.08
 */
 
  var commonHeaders = {
	"User-agent": "Mozilla/5.0 (compatible) Greasemonkey",
	"Accept": "text/html,application/xml,text/xml"
};
var playerAttributes = [
    'strength',
    'speed',
    'agility',
    'jumping',
    'stamina',
    'vision',
    'confidence',
    'blocking',
    'throwing',
    'catching',
    'carrying',
    'tackling',
    'kicking',
    'punting'
];
var colorMajor = '#a03c19';
var colorMinor = '#a000a0';
var colorOther = '#606060';
var attColor = [
	// attr name, attr val, attr val boosted (w/eq)
	[colorOther, colorOther, '#6060ff'],
	[colorMinor, colorMinor, '#2020ff'],
	[colorMajor, colorMajor, 0],
];

var position;
var buildTypes;
var archetype;

var refreshLocationDiv = document.getElementById('attribute_list');
var refreshDiv = document.createElement('div');
refreshDiv.id = "holder_div";
refreshDiv.innerHTML = "Press Button to Refresh</br>";
refreshLocationDiv.appendChild(refreshDiv);

var refreshButton = document.createElement('input');
refreshButton.id = "refreshButton";
refreshButton.type = "button";
refreshButton.value = "refresh";
refreshButton.addEventListener("click", main, true);
refreshLocationDiv.appendChild(refreshButton);
/*

*/
function createLegend() {
	// insert the color key
	if(document.getElementById("colorKeyDiv") != null){
		var removeThis = document.getElementById("colorKeyDiv");
		removeThis.parentNode.removeChild(removeThis);
	} 	
	var attributeDiv = document.getElementById("attribute_list");
	var locationDiv = document.getElementById("holder_div");
	//attributeDiv.style.marginBottom = "4px";
	var legendDiv = document.createElement('div');
	attributeDiv.insertBefore(legendDiv, locationDiv);
	legendDiv.id = "colorKeyDiv";
	legendDiv.style.fontWeight = "bold";
	legendDiv.style.textAlign = "center"; 
	legendDiv.style.marginBottom = "4px";
	legendDiv.innerHTML = "Next Auto Level Gain"
		+ " = <span id=\"keyMajor\" style=\"color: " + attColor[2][0] + "\">Major</span>"
		+ " / <span id=\"keyMinor\" style=\"color: " + attColor[1][0] + "\">Minor</span>"
		+ " / <span id=\"keyOther\" style=\"color: " + attColor[0][0] + "\">Zero</span>"
		+ "<div id=\"colorKeyDiv_79\" style=\"font-weight: bold; text-align: center; margin-bottom: 4px;\">ALGs to Lv79"
		+ " = <span id=\"keyMajor_79\" style=\"color: " + attColor[2][0] + "\">Major</span>"
		+ " / <span id=\"keyMinor_79\" style=\"color: " + attColor[1][0] + "\">Minor</span>"
		+ "</div>";
}
 
 // Get Player ID, borrowed from monsterkill
function parsePlayerId() {
    var pid = window.location.search;
    pid = pid.slice(pid.indexOf('player_id=')+'player_id='.length);
    if (pid.indexOf('&') > -1) {
        pid = pid.slice(0,pid.indexOf('&'));
    } else {
        pid = pid.slice(0);
    }
	return pid;
}
var playerId = parsePlayerId();
GM_xmlhttpRequest({
        method: 'GET',
        url: "/game/player.pl?player_id="+playerId,
        headers: commonHeaders,
        onload: function(responseDetails) {
			var txt = responseDetails.responseText;
			// get player position from the page 
			var positionRegex = /div class="position \D+" style="float: left; margin-left: 2px; position: relative; top: -2px;">(\D+)<\/div>/gi;
			var pResult = positionRegex.exec(txt);
			if (pResult != null && pResult.length > 1) {
				var p = pResult[1];
				var positionDiv = document.createElement('span');
				positionDiv.id = "positionDiv";
				refreshLocationDiv.appendChild(positionDiv);
				positionDiv.innerHTML = "</br>Player Position = <span id=\"player_position\">" + p + "</span></br>";

				} else {

				alert(pResult[2]);
				
			}
			var archetypeRegex = /(archetypes\/.*\.png" style="float: left;" onmouseover="set_tip\(')(.*?)>/gi;
			var aResult = archetypeRegex.exec(txt);
			if (aResult != null && aResult.length > 1) {
				var archSplit = aResult[2].split('\'');
				var archFinal = archSplit[0];
				if (archFinal != null) {
					var a = archFinal;
				}else{
					var a = "No Archetype";
				}
				var archetypeDiv = document.createElement('span');
				archetypeDiv.id = "archetypeDiv";
				refreshLocationDiv.appendChild(archetypeDiv);
				archetypeDiv.innerHTML = "Player Archetype =  <span id=\"player_archetype\">"+ a + "</span></br>";
				} else {
				alert(aResult[2]);
				
			}

				var regexResult = /player_points_value\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(?:.|\n)*?Next Level.*?(\d+)\/1000\D+Vet Pts\D+\d+\D+(\d+)/gi.exec(txt);
				if (regexResult == null) {
					// player is too low level to have VAs
					regexResult = /player_points_value\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(\d+)\D*?(?:.|\n)*?Next Level.*?(\d+)\/1000\D+/gi.exec(txt);
				}
				if (regexResult == null) {
					// player is too old, that last regex fails for plateau players that don't have 'Next Level'
					regexResult = /player_points_value\D*(\d+)\D*(\d+)\D*?(\d+)\D*?(\d+)\D*?(?:.|\n)*?Remaining XP/gi.exec(txt);
				}
				currentLevel = parseInt(regexResult[1]);
				
				

			 
			 var levelDiv = document.createElement('span');
				levelDiv.id = "levelDiv";
				refreshLocationDiv.appendChild(levelDiv);
				levelDiv.innerHTML = "Player Level =  <span id=\"player_currentlevel\">"+ currentLevel + "</span></br>";
				
			var playerNoteResult = /(id="note_content">)(.*?)(<\/textarea>)/gi;
			var pnResult = playerNoteResult.exec(txt);

			var playerNoteDiv = document.createElement('span');
				playerNoteDiv.id = "playerNoteDiv";
			
				refreshLocationDiv.appendChild(playerNoteDiv);
				playerNoteDiv.innerHTML = "Player Custom Note: <span id=\"note_contents\">" + pnResult[2] + "</span></br>";
			main();
		}    
});

function main (){
	var archetype = getArchetype();
	var position = document.getElementById("player_position").innerHTML;
	var curLevel = getLevel();
	buildTypes = getBuilds(position);
	createLegend();
	highlightAttributes(buildTypes, archetype, curLevel);
	//refreshButton.addEventListener("click", main, true);
        document.addEventListener("click", main, true);
}

	
 function getLevel(){
	var currentLevel = 0;
        var checkIt = document.getElementById("currentLevelDiv");
	if (checkIt.innerHTML != ""){
		var levelDivContents = document.getElementById("currentLevelDiv").innerHTML;
		var levelSplitter = levelDivContents.split(': ');
		currentLevel = parseInt(levelSplitter[1]);
		document.getElementById("player_currentlevel").innerHTML = currentLevel;
	}else{
	currentLevel = parseInt(document.getElementById("player_currentlevel").innerHTML);
	}
	return currentLevel;
}
 
 
 // Borrowed from Bogleg's script
 function getBuilds(position) {
	switch(position) {
	case 'FB':
		return [
			['No Archetype',	'Str,Agi,Blo,Car',		'Sta,Vis,Con,Tac,Cat'],
			['Rusher',			'Agi,Car,Con,Str',		'Blo,Spe,Sta,Vis',	'power_through,cut', 'lead_block,pancake'],
			['Blocker',			'Agi,Blo,Str,Vis',		'Car,Con,Spe,Sta',	'lead_block,pancake', 'power_through,cut'],
			['Combo Back',		'Agi,Blo,Car,Str,Vis',	'Cat,Con,Jum,Spe'],
			['Scat Back',		'Agi,Cat,Spe,Vis',		'Blo,Car,Con,Jum',	'sticky_hands,cut', 'lead_block,pancake'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'QB':
		return [
			['No Archetype',	'Str,Sta,Vis,Con,Thr',	'Spe,Agi,Jum,Cat,Car'],
			['Pocket Passer',	'Con,Thr,Vis',			'Agi,Sta,Str,Car',	'pump_fake,tight_spiral', 'on_the_run,dump_pass'],
			['Deep Passer',		'Str,Thr,Vis',			'Agi,Con,Sta,Car',	'pump_fake,turn_the_shoulder', 'on_the_run,dump_pass'],
			['Scrambler',		'Agi,Thr,Vis',			'Con,Spe,Str,Car',	'on_the_run,dump_pass', 'pump_fake,tight_spiral'],
		];
		break;
	case 'HB':
		return [
			['No Archetype',	'Str,Spe,Agi,Vis,Con,Car', 'Jum,Sta,Blo,Thr,Cat'],
			['Power Back',		'Agi,Car,Con,Str',		'Jum,Spe,Sta,Vis',	'lower_the_shoulder,power_through', 'first_step,spin'],
			['Elusive Back',	'Agi,Car,Spe,Vis',		'Cat,Con,Str,Sta',		'head_fake,juke', 'lower_the_shoulder,power_through'],
			['Scat Back',		'Agi,Car,Cat,Spe',		'Con,Jum,Sta,Vis',	'cut,first_step', 'lower_the_shoulder,power_through'],
			['Combo Back',		'Car,Con,Spe,Str,Vis',	'Agi,Cat,Jum,Sta'],
			['Returner',		'Agi,Car,Spe,Sta,Vis',	'Con,Jum,Str',		'first_step,cut', 'stiff_arm,power_through'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'WR':
		return [
			['No Archetype',	'Spe,Agi,Jum,Sta,Vis',	'Con,Car'],
			['Speedster',		'Agi,Cat,Con,Spe,Vis',	'Car,Jum,Sta',		'first_step,cut', 'route_running,sticky_hands'],
			['Possession Rec',	'Agi,Car,Cat,Jum,Vis',	'Con,Spe,Sta',		'route_running,sticky_hands', 'first_step,cut'],
			['Power Rec',		'Agi,Car,Cat,Str,Vis',	'Con,Spe,Sta'],
			['Returner',		'Agi,Car,Spe,Sta,Vis',	'Con,Jum,Str',		'first_step,cut', 'route_running,sticky_hands'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'TE':
		return [
			['No Archetype',	'Str,Vis,Blo,Cat',		'Spe,Agi,Sta,Con,Tac,Car'],
			['Blocker',			'Agi,Blo,Con,Str,Vis',	'Cat,Spe,Sta',		'get_low,pancake', 'route_running,cut'],
			['Power Rec',		'Agi,Car,Con,Cat,Str',	'Blo,Spe,Sta',		'cover_up,lower_the_shoulder', 'get_low,pancake'],
			['Receiver',		'Agi,Car,Cat,Spe,Vis',	'Blo,Sta,Str',		'route_running,cut', 'get_low,pancake'],
			['Dual Threat',		'Agi,Blo,Cat,Str,Vis',	'Con,Jum,Spe'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'C':
		return [
			['No Archetype',	'Str,Blo',				'Agi,Sta,Vis,Con,Tac'],
			['Pass Blocker',	'Agi,Blo,Con,Vis',		'Spe,Sta,Str',		'pass_block,foundation', 'get_low,pancake'],
			['Run Blocker',		'Blo,Con,Str,Vis',		'Agi,Spe,Sta',		'get_low,pancake', 'pass_block,foundation'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'G':
		return [
			['No Archetype',	'Str,Con,Blo',			'Agi,Sta,Vis,Tac'],
			['Pass Blocker',	'Agi,Blo,Con,Vis',		'Spe,Sta,Str',		'pass_block,foundation', 'get_low,pancake'],
			['Run Blocker',		'Blo,Con,Str,Vis',		'Agi,Spe,Sta',		'get_low,pancake', 'pass_block,foundation'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'OT':
		return [
			['No Archetype',	'Str,Agi,Vis,Con,Blo',	'Sta,Tac'],
			['Pass Blocker',	'Agi,Blo,Con,Vis',		'Spe,Sta,Str',		'pass_block,protector', 'get_low,pancake'],
			['Run Blocker',		'Blo,Con,Str,Vis',		'Agi,Spe,Sta',		'get_low,pancake', 'pass_block,protector'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'DT':
		return [
			['No Archetype',	'Str,Agi,Tac',			'Spe,Sta,Vis,Con,Blo'],
			['Run Stuffer',		'Agi,Str,Tac,Vis',		'Con,Spe,Sta',		'wall,break_through', 'shed_block,swat_ball'],
			['Pass Rusher',		'Agi,Spe,Tac,Vis',		'Con,Sta,Str',		'shed_block,swat_ball', 'wall,break_through'],
			['Combo Tackle',	'Spe,Str,Tac,Vis',		'Agi,Con,Sta'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'DE':
		return [
			['No Archetype',	'Str,Spe,Agi,Tac',		'Jum,Sta,Vis,Con,Blo'],
			['Run Stuffer',		'Agi,Str,Tac,Vis',		'Con,Spe,Sta',		'wall,strong_base', 'first_step,tunnel_vision'],
			['Pass Rusher',		'Agi,Spe,Tac,Vis',		'Con,Sta,Str',		'first_step,tunnel_vision', 'wall,strong_base'],
			['Combo End',		'Spe,Str,Tac,Vis',		'Agi,Con,Sta'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'LB':
		return [
			['No Archetype',	'Str,Agi,Sta,Vis,Con,Tac', 'Spe,Jum,Blo,Cat'],
			['Coverage LB',		'Agi,Jum,Spe,Vis',		'Con,Sta,Str,Tac',	'diving_tackle,swat_ball', 'monster_hit,shed_block'],
			['Blitzer',			'Agi,Jum,Spe,Tac',		'Con,Sta,Str,Vis',	'shed_block,big_sack', 'aura_of_intimidation,diving_tackle'],
			['Hard Hitter',		'Agi,Str,Tac,Vis',		'Con,Jum,Spe,Sta',	'snarl,monster_hit', 'swat_ball,big_sack'],
			['Combo LB',		'Agi,Con,Spe,Tac,Vis',	'Jum,Sta,Str'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'CB':
		return [
			['No Archetype',	'Spe,Agi,Jum,Sta,Vis,Cat', 'Str,Con,Tac,Car'],
			['Man Specialist',	'Agi,Jum,Spe,Vis',		'Cat,Con,Sta,Tac',	'shutdown_coverage', 'closing_speed'],
			['Zone Specialist',	'Agi,Spe,Tac,Vis',		'Cat,Con,Jum,Sta',	'superior_vision', 'shutdown_coverage'],
			['Hard Hitter',		'Spe,Str,Tac,Vis',		'Agi,Con,Jum,Sta',	'closing_speed', 'change_direction'],
			['Combo Corner',	'Agi,Spe,Str,Tac',		'Con,Jum,Sta,Vis'],
			['Returner',		'Agi,Car,Spe,Sta,Vis',	'Con,Jum,Str',		'change_direction,return_specialist', 'superior_vision,shutdown_coverage'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'SS':
		return [
			['No Archetype',	'Str,Spe,Sta,Vis,Tac',	'Agi,Jum,Con,Blo,Cat,Car'],
			['Man Specialist',	'Agi,Jum,Spe,Vis',		'Cat,Con,Sta,Tac',	'change_direction', 'big_hit'],
			['Zone Specialist',	'Agi,Spe,Tac,Vis',		'Cat,Con,Jum,Sta',	'superior_vision', 'wrap_up_tackle'],
			['Hard Hitter',		'Spe,Str,Tac,Vis',		'Agi,Con,Jum,Sta',	'big_hit', 'change_direction'],
			['Combo Safety',	'Agi,Spe,Str,Tac',		'Con,Jum,Sta,Vis'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'FS':
		return [
			['No Archetype',	'Spe,Sta,Vis,Tac,Cat',	'Str,Agi,Jum,Con,Blo,Car'],
			['Man Specialist',	'Agi,Jum,Spe,Vis',		'Cat,Con,Sta,Tac',	'shutdown_coverage', 'big_hit'],
			['Zone Specialist',	'Agi,Spe,Tac,Vis',		'Cat,Con,Jum,Sta',	'superior_vision', 'shutdown_coverage'],
			['Hard Hitter',		'Spe,Str,Tac,Vis',		'Agi,Con,Jum,Sta',	'big_hit', 'change_direction'],
			['Combo Safety',	'Agi,Spe,Str,Tac',		'Con,Jum,Sta,Vis'],
			['Special Teamer',	'Agi,Blo,Spe,Sta,Tac',	'Con,Str,Vis'],
		];
		break;
	case 'K':
		return [
			['No Archetype',	'Con,Kic',				'Str,Spe,Agi,Jum,Vis,Thr'],
			['Boomer',			'Con,Kic,Str',			'Agi,Jum,Vis'],
			['Technician',		'Con,Kic,Vis',			'Agi,Jum,Str'],
		];
		break;
	case 'P':
		return [
			['No Archetype',	'Con,Pun',				'Str,Spe,Agi,Jum,Vis,Thr'],
			['Boomer',			'Con,Pun,Str',			'Agi,Jum,Vis'],
			['Technician',		'Con,Pun,Vis',			'Agi,Jum,Str'],
		];
		break;
	}
}

function getArchetype() {
	
	var getHead = document.getElementById("player_vitals").childNodes[1].innerHTML

	var	resultHead = getHead.split(": ");

	if ( resultHead[1] == undefined ) {
		var archetype = document.getElementById("player_archetype").innerHTML;
		} else {
		var splitHead = resultHead[1].split("_");
		var lowerFirstPart = splitHead[1];
		var firstPart = lowerFirstPart.substring(0,1).toUpperCase() +
				lowerFirstPart.substring(1,lowerFirstPart.length);
		
		if (splitHead[2] != undefined) { 
			var lowerSecondPart = splitHead[2]
			var secondPart = lowerSecondPart.substring(0,1).toUpperCase() +
				lowerSecondPart.substring(1,lowerSecondPart.length);
		}else{
			var secondPart = "";
		}
		if (secondPart == "") {
			var archetype = firstPart;
		} else {
		var archetype = firstPart + " " + secondPart;
		}
		//alert(archetype);
		var replacePosition = document.getElementById("player_position");
		var replacementPosition = document.createElement('span');
		replacementPosition.id = "player_position";
		replacementPosition.innerHTML = splitHead[0].toUpperCase(); 
		replacePosition.parentNode.replaceChild(replacementPosition, replacePosition);
		var replaceMe = document.getElementById("player_archetype")
		var replacement = document.createElement('span');
		replacement.id = "player_archetype";
		replacement.innerHTML = archetype;
		replaceMe.parentNode.replaceChild(replacement, replaceMe);
	}
	return archetype.replace('Linebacker', 'LB').replace(' Receiver', ' Rec');
}
	
	
	
	
function highlightAttributes(buildTypes, selectedName, currentLevel) {
	var level = currentLevel;
	// get build info from buildTypes array
	for ( var i=0 ; i< buildTypes.length ; i++) {
		if (buildTypes [i][0] == selectedName) {
			var thisBuild = buildTypes[i];

		}
	}		

	// Move the stars around and color code major/minor skills
	var testGetAtts = document.evaluate(
			"//div[@class='attribute_name']",
			refreshLocationDiv,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
	var countMajor = 0;
	var countMinor = 0;
	for (var j = 0 ; j < testGetAtts.snapshotLength; j++){
		

		var testingA = testGetAtts.snapshotItem(j).lastChild.innerHTML.split('">');
		var testingB = testingA[1].split('</');
		var attribute = testingB[0];
		var theOneWeWant = testGetAtts.snapshotItem(j).lastChild;

		var toCapital = attribute.substring(0,1).toUpperCase() + attribute.substring(1,attribute.length);

		var toCheck = toCapital.slice(0,3);

		var checkAgainstMaj = thisBuild[1].split(",");
		var checkAgainstMin = thisBuild[2].split(",");

		if ( runMatch(toCheck, checkAgainstMaj)) {
			if ( theOneWeWant.previousSibling ) {
			
			theOneWeWant.parentNode.removeChild(theOneWeWant.previousSibling);
			}
			var isMajor = document.createElement('div');
			theOneWeWant.parentNode.insertBefore(isMajor, theOneWeWant);
			isMajor.style.cssFloat = "left";
			isMajor.style.marginTop =  "-2px";
			isMajor.innerHTML = "<img src=\"/images/game/archetypes/primary_ability.png\" onmouseover=\"set_tip(\'Primary Attribute\', 0, 1, 1, 1)\" onmouseout=\"unset_tip()\">";
			theOneWeWant.firstChild.style.color = colorMajor;
			countMajor++;
		} else if ( runMatch(toCheck, checkAgainstMin)) {
			if ( theOneWeWant.previousSibling ) {
			theOneWeWant.parentNode.removeChild(theOneWeWant.previousSibling);
			}
			var isMinor = document.createElement('div');
			theOneWeWant.parentNode.insertBefore(isMinor, theOneWeWant);
			isMinor.style.cssFloat = "left";
			isMinor.style.marginTop =  "-2px";
			isMinor.innerHTML = "<img src=\"/images/game/archetypes/secondary_ability.png\" onmouseover=\"set_tip(\'Secondary Attribute\', 0, 1, 1, 1)\" onmouseout=\"unset_tip()\">";
			theOneWeWant.firstChild.style.color = colorMinor;
			countMinor++;
		} else {
			if ( theOneWeWant.previousSibling ) {
			theOneWeWant.parentNode.removeChild(theOneWeWant.previousSibling);
			}
			theOneWeWant.firstChild.style.color = colorOther;
		}
	
	}


	document.getElementById('keyMajor').innerHTML = ALG(countMajor, level, 2);
	document.getElementById('keyMajor_79').innerHTML = ALG(countMajor, level, 2, 79);
	document.getElementById('keyMinor').innerHTML = ALG(countMinor, level, 1);
	document.getElementById('keyMinor_79').innerHTML = ALG(countMinor, level, 1, 79);
}

function ALG(divisor, lv, mm, tgtLv) {
	if (!parseInt(tgtLv) || tgtLv <= lv) {
		tgtLv = lv + 1;
	}
	var out = 0;
	while (lv < tgtLv) {
		if (lv<=20){
			var gain = (1 * mm )/divisor;
		} else if (lv<=28) {
			var gain = (0.75 * mm )/divisor;
		} else if (lv<=36) { 
			var gain = (0.5625 * mm )/divisor;
		} else {
			var gain = (0.421875 * mm )/divisor;
		}
		out += gain;
		out = Math.floor(out * 1000) / 1000;
		++lv;
	}
	return out;
}	

function runMatch ( incomingAtt, incomingArray){
	var check = false;
	for (z = 0; z< incomingArray.length; z++) {
		if (incomingAtt == incomingArray[z]) {
			check = true;			
		}
	}
	return check;
}
