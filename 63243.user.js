// ==UserScript==
// @name           Castle Age - CTA Topic Sorter
// @namespace      Castle Age
// @description    When you view a Topic/Thread in a group's discussion boards to check in on new Call To Arms in your Guild/Group, this will take all the Links and sort them out, replacing the Ad bar on the left if there is any results. Useful for quickly helping your guild/army mates out with their weapons or other calls.
// @include        http://www.facebook.com/topic.php?uid=*&topic=*
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=63243
// @version       1.1.3
// ==/UserScript==

GM_config.init("Castle Age - CTA Topic Sorter Options", {
	highlight : {
		section : [
		"Sorter Options"
		],
		label : "Show Duplicates? (If unchecked, it will hide them instead)",
		type : "checkbox",
		default : false
	},
	adminControls : {
		label : "Admin Controls?",
		type : "checkbox",
		default : false
	},
	enabled : {
		section : [
		"Other Options"
		],
		label : "Enabled",
		type : "checkbox",
		default : true
	},
	autorefresh : {
		label : "Auto refresh?",
		type : "checkbox",
		default : true
	},
	arinterval : {
		label : "Auto refresh interval (mins)",
		type : "float",
		default : 2
	}
});

function loadbuffer(event) {
	if (GM_getValue('span', 0) != 0)
	{ 
		event.stopPropagation();
		event.preventDefault();
		return false;
	}
	GM_setValue('span', event.target.id);
	var myFrame = document.getElementById('buffer');
    if ( myFrame )
	{
		myFrame.src = event.target.name;
		var theSpan = document.getElementById? document.getElementById(GM_getValue('span')): null;
		if ( theSpan )
		{
			theSpan.textContent = 'Please wait ...';
		}
        return false;
	} 
    return false;
}

function handleBuffer(target) {
	var myFrame = target.contentDocument;
    var lyr = myFrame.getElementById? myFrame.getElementById('app46755028429_monsterTicker'): null;
    if ( lyr ) {
		var theSpan = document.getElementById? document.getElementById(GM_getValue('span', "timeMsg")): null;
		if ( theSpan ) {
			theSpan.textContent = lyr.textContent + ' Left';
		}
    } else {
		if (target.src != '')
		{
			var theSpan = document.getElementById? document.getElementById(GM_getValue('span', "timeMsg")): null;
			if ( theSpan ) {
				theSpan.textContent = 'Monster Killed!';
			}
		}
	}
	GM_setValue('span', 0);
}

var HydraConLinks = new Array();
var HydraBattleLinks = new Array();
var OrcConLinks = new Array();
var BossBattleLinks = new Array();
var DragonBattleLinks = new Array();
var BossConLinks = new Array();
var SerpentAttackLinks = new Array();

var theAds = document.getElementById('sidebar_ads');
theAds.innerHTML = '';

function createElements(type) {
	var titleText = '';
	var linkText = '';
	var thisArray;
	
	switch (type) {
		case 'ConHydra':
			titleText = 'Hydra Construction';
			linkText = 'Construct!';
			thisArray = HydraConLinks;
			break;
		case 'ConOrc':
			titleText = 'Battle of the Dark Legion';
			linkText = 'Construct!';
			thisArray = OrcConLinks;
			break;
		case 'ConBoss':
			titleText = 'Boss Construction';
			linkText = 'Construct!';
			thisArray = BossConLinks;
			break;
		case 'BattleHydra':
			titleText = 'Hydra Attack';
			linkText = 'Attack!';
			thisArray = HydraBattleLinks;
			break;
		case 'BattleBoss':
			titleText = 'Boss Attack';
			linkText = 'Attack!';
			thisArray = BossBattleLinks;
			break;
		case 'BattleDragon':
			titleText = 'Dragon Attack';
			linkText = 'Attack!';
			thisArray = DragonBattleLinks;
			break;
		case 'BattleSerpent':
			titleText = 'Sea Serpent Attack';
			linkText = 'Attack!';
			thisArray = SerpentAttackLinks;
			break;
		default:
			return false;
	}

	if (thisArray.length < 1)
	{
		return false;
	}
	
	// Main box 
	var theBox = document.createElement('div');
	theBox.setAttribute('id', 'CTA' + titleText + '_Container');
	theBox.setAttribute('style', '-moz-user-select:none; border-width: 2px; border-style: solid; margin-bottom: 5px; clear: both;');
	
	var theTitle = document.createElement('div');
	theTitle.setAttribute('id', 'CTA' + titleText + '_Title');
	theTitle.setAttribute('style', 'background-color: #EDEFF4; padding-left: 3px; padding-right: 3px; font-weight: bold; border-bottom-style: solid;');
	theTitle.innerHTML = 'Call To Arms - ' + titleText;
	theBox.appendChild(theTitle);
	// This is what holds the individual post's results.
	var theContents = document.createElement('div');
	theContents.setAttribute('style', 'padding-left: 3px; padding-right: 3px;');
	var newHTML = '<ul id="toggle_tabs_unused" stle="padding: 3px 3px 3px 3px;">';
	for (var i = 0; i < thisArray.length; i++)
	{
		var thisNum = i+1;
		var thisId = 'uid_' + thisArray[i][1] + '_' + thisArray[i][3];
		if (newHTML.indexOf(thisArray[i][0]) === -1)
		{
			newHTML += '<li>' + thisNum + ': ' + '<a title="' + thisArray[i][4] + '" href="' + thisArray[i][0] + '" target="_blank" rel="nofollow">' + linkText + '</a> | <a id="' + thisId + '" name="' + thisArray[i][2] + '">Get Time Left</a></li>';
		} else {
			if(GM_config.get("highlight")==true)
			{
				if(GM_config.get("adminControls")==true && thisArray[i][5] != -1)
				{
					newHTML += '<li>' + thisNum + ': ' + '<a title="' + thisArray[i][4] + '" href="' + thisArray[i][0] + '" target="_blank" rel="nofollow" style="background-color: red;">' + linkText + '</a> | ' + thisArray[i][5] + '</li>';
				} else {
					newHTML += '<li>' + thisNum + ': ' + '<a title="' + thisArray[i][4] + '" href="' + thisArray[i][0] + '" target="_blank" rel="nofollow" style="background-color: red;">' + linkText + '</a> | DUPLICATE</li>';
				}
			}
		}
	}
	newHTML += '</ul>';
	theContents.innerHTML = newHTML;
	theBox.appendChild(theContents);	
	
	theAds.parentNode.appendChild(theBox);

	for (var i = 0; i < thisArray.length; i++)
	{
		var thisId = 'uid_' + thisArray[i][1] + '_' + thisArray[i][3];

		var getDetails = document.getElementById(thisId);
		getDetails.addEventListener('click', loadbuffer, true);
	}
	
	return theBox;
}


function CheckTopic() {
	var bufferFrame = document.createElement('iframe');
	bufferFrame.setAttribute('id', 'buffer');
	bufferFrame.setAttribute('style', 'display: none; visibility: hidden; width: 0; height: 0;');
	bufferFrame.addEventListener("load", function(e) {
		handleBuffer(e.target);
	},false);
	
	document.body.appendChild(bufferFrame);

	var battleLinks = document.evaluate("//a[contains(@href,'castle_age/battle_monster.php')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < battleLinks.snapshotLength; i++)
	{  
		var battleLink = battleLinks.snapshotItem(i);
		
		if (battleLink.href.indexOf('castle_age/battle_monster.php') === -1)
		{
			continue;
		}

		var postElement   = battleLink.parentNode.parentNode.parentNode.childNodes[0];
		var deletePost = battleLink.parentNode.parentNode.parentNode.childNodes[3].innerHTML;
		if (deletePost.indexOf('Delete') === -1)
		{
			deletePost = -1;
		}
		var postNum = 'x';
		if (postElement.textContent.indexOf('Post #') != -1)
		{
			postNum = postElement.textContent.substring(postElement.textContent.indexOf('Post #'));
		}
		
		// Check for the type this is and handle accordingly
		if (battleLink.href.indexOf('doObjective') != -1)
		{
			var uid = battleLink.href.substring(battleLink.href.indexOf('user=')+5, battleLink.href.indexOf('&action'));
			var myArray = new Array();
			myArray.push(battleLink.href);
			myArray.push(uid);
			// This is one requiring construction
			if (battleLink.href.indexOf('mpool=3') != -1)
			{
				myArray.push('http://apps.facebook.com/castle_age/battle_monster.php?user=' + uid + '&mpool=3');
				myArray.push(3);
				myArray.push(postNum);
				myArray.push(deletePost);
				if (battleLink.href.indexOf('hydra') != -1)
				{
					HydraConLinks.push(myArray);
				} else if (battleLink.href.indexOf('corc') != -1) {
					OrcConLinks.push(myArray);
				}
			} else if (battleLink.href.indexOf('mpool=1') != -1) {
				myArray.push('http://apps.facebook.com/castle_age/battle_monster.php?user=' + uid + '&mpool=1');
				myArray.push(1);
				myArray.push(postNum);
				myArray.push(deletePost);
				BossConLinks.push(myArray);
			}
		} else {
			// If no objective, it's a normal battle URL
			// Because of all the various types of battle followable urls, we do a 2 step process to get the user id. Why? Because i know not how to use regex, and this just as good :P
			var uid = battleLink.href.substring(battleLink.href.indexOf('user=')+5);
			uid = uid.substring(0, uid.indexOf('&'));
			var myArray = new Array();
			myArray.push(battleLink.href);
			myArray.push(uid);
			myArray.push(battleLink.href);
			if (battleLink.href.indexOf('mpool=3') != -1)
			{
				myArray.push(3);
				myArray.push(postNum);
				myArray.push(deletePost);
				HydraBattleLinks.push(myArray);
			} else if (battleLink.href.indexOf('mpool=1') != -1) {
				myArray.push(1);
				myArray.push(postNum);
				myArray.push(deletePost);
				BossBattleLinks.push(myArray);
			} else if (battleLink.href.indexOf('mpool=2') != -1) {
				myArray.push(2);
				myArray.push(postNum);
				myArray.push(deletePost);
				if (battleLink.href.indexOf('sea_') != -1) {
					SerpentAttackLinks.push(myArray);				 
				 } else {
					DragonBattleLinks.push(myArray);
				}
			}
		}
	}

	// Main box for Construction
	var hydraConBox = createElements('ConHydra');
	var orcConBox = createElements('ConOrc');
	var bossConBox = createElements('ConBoss');
	// Main box for Battles
	var hydraBattleBox = createElements('BattleHydra');
	var bossBattleBox = createElements('BattleBoss');
	var dragonBattleBox = createElements('BattleDragon');
	var serpentBattleBox = createElements('BattleSerpent');
	
	if(GM_config.get("autorefresh")==true) {
		window.setTimeout(function() {
				window.location.href = window.location.href;
			}, GM_config.get("arinterval")*60000);
	}
};

GM_registerMenuCommand("Castle Age - CTA Topic Sorter Options", GM_config.open);

window.addEventListener("load", function(e) {
	if(GM_config.get("enabled")==false)
	{
		return;
	}
	CheckTopic();
},false);