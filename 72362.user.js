// ==UserScript==
// @name           Castle Age - Arena Guard Builder
// @description    This script will add links to join army member's Arena Guard and thus add them to yours. It also includes a Mass Add at Random feature to attempt adding the 25 listed on the current army members page, and includes a Favorite Army Members Management System. Modified from the Castle Age - Elite Guard Builder by Scott Royalty AKA MuadDib, which can be found at http://userscripts.org/scripts/show/61078. Now has a working Favorites section of it's own! Since not everyone is in the Arena, you'll have to go Page by Page and click the Mass Add Button. Time consuming, but only way to do it. Unless you have iMacro's for Firefox, then you can just code THAT to go Page by page and click the Mass Add Button on it's own. That's what I did.
// @copyright      2010,  Jason Weiss
// @license        GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include        http*://apps.*facebook.com/castle_age/*
// @namespace      Castle Age
// @version        1.6
// ==/UserScript==

var scriptVersion = "1.6";

function getContainer(id) {
	return document.getElementById(id);
};

function loopRequests(x, modBox) {
	if (UserID[x] < 1)
	{
		if (++x < UserID.length)
		{
			modBox.innerHTML = 'Working ' + x + '/' + UserID.length;
			loopRequests(x, modBox);
			return;
		}
	}
	url = 'http://apps.facebook.com/castle_age/arena.php?user=' + UserID[x] + '&lka=' + UserID[x] + '&agtw=1&ref=nf';
	startXmlHttp(url);
	if (++x < UserID.length)
	{
		modBox.innerHTML = 'Working ' + x + '/' + UserID.length;
		loopRequests(x, modBox);
	}
};

function startXmlHttp ( url ) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3',
			'Accept': 'text/html'
		},
	});
};

function massAdd() {
	var massAddLink = document.getElementById("MassAddBtn");
	massAddLink.innerHTML = 'Working 0/' + UserID.length;

	loopRequests(0, massAddLink);
	massAddLink.innerHTML = 'Complete!';
};

function massAddFav() {
	var massAddLink = document.getElementById("AGM_MassFavs");

	for (var i = 0; i < ArenaMembers.length; i++)
	{
		url = 'http://apps.facebook.com/castle_age/arena.php?&user=' + ArenaMembers[i] + '&lka=' + ArenaMembers[i] + '&agtw=1&ref=nf';
		startXmlHttp(url);
	}	

	massAddLink.innerHTML = 'Complete!';
};

function createJoinLink(thisPlayer) {
	var thisPlayerJoin = 'joinLink_' + thisPlayer;
	var thisInsert = document.createElement('a');
	thisInsert.setAttribute('href', 'http://apps.facebook.com/castle_age/arena.php?user=' + thisPlayer + '&lka=' + thisPlayer + '&agtw=1&ref=nf" " target=_blank>');
	thisInsert.setAttribute('id', thisPlayerJoin);
	thisInsert.setAttribute('target', '_blank');
	thisInsert.setAttribute('style', 'font-size: 12px;');
	thisInsert.innerHTML = '<br />Join Arena Guard [x]';
	return thisInsert;
};

function addToFav(target) {
	var thisPlayer = target.id.substring(8);
	if (ArenaMembers.indexOf(thisPlayer) == -1)
	{
		ArenaMembers.push(thisPlayer);
		GM_setValue('ArenaMembers', ArenaMembers.join(','));
		var removeLink = createRemoveFromFav(thisPlayer);
		target.parentNode.appendChild(removeLink);
		var rfavLink = document.getElementById('AGM_FavList');
		var favLink = createFavListElement(thisPlayer);
		rfavLink.appendChild(favLink);
	}
};

function createAddToFav(thisPlayer) {
	var thisPlayerFav = 'favLink_' + thisPlayer;
	var thisInsert = document.createElement('a');
	thisInsert.setAttribute('style', 'font-size: 12px;');
	thisInsert.setAttribute('id', thisPlayerFav);
	thisInsert.innerHTML = '<br />Add To Arena Favorites [x]';
	thisInsert.addEventListener('click', function(e) {
		addToFav(e.target);
	},false);
	return thisInsert;
};

function removeFromFav(target) {
	var thisPlayer = target.id.substring(9);
	if (ArenaMembers.indexOf(thisPlayer) != -1)
	{
		ArenaMembers.splice(ArenaMembers.indexOf(thisPlayer), 1);
		GM_setValue('ArenaMembers', ArenaMembers.join(','));
		removeFromFavElement(thisPlayer);
	}
};

function createRemoveFromFav(thisPlayer) {
	var thisPlayerRFav = 'rfavLink_' + thisPlayer;
	var thisInsert = document.createElement('a');
	thisInsert.setAttribute('style', 'font-size: 12px;');
	thisInsert.setAttribute('id', thisPlayerRFav);
	thisInsert.innerHTML = '<br />Remove From Arena Favorites [x]';
	thisInsert.addEventListener('click', function(e) {
		removeFromFav(e.target);
	},false);
	return thisInsert;
};

function removeFromFavElement(thisPlayer) {
	var thisPlayerRFav = 'rfavLink_' + thisPlayer;
	var rfavLink = document.getElementById(thisPlayerRFav);
	rfavLink.parentNode.removeChild(rfavLink);
	var remLink = document.getElementById('joinFavList_' + thisPlayer);
	if (remLink != null)
	{
		remLink.parentNode.removeChild(remLink);
	}
};

function removeFromFavLink(target) {
	var thisPlayer = target.id.substring(14);
	if (ArenaMembers.indexOf(thisPlayer) != -1)
	{
		ArenaMembers.splice(ArenaMembers.indexOf(thisPlayer), 1);
		GM_setValue('ArenaMembers', ArenaMembers.join(','));
		var rfavLink = document.getElementById('joinFavList_' + thisPlayer);
		rfavLink.parentNode.removeChild(rfavLink);
	}
	var remLink = document.getElementById('rfavLink_' + thisPlayer);
	if (remLink != null)
	{
		removeFromFavElement(thisPlayer);
	}
};

function createManagementBox() {
	var theBox = document.createElement('div');
	theBox.setAttribute('id', 'AGM_Container');
	theBox.setAttribute('style', 'clear: both; text-align: center; -moz-user-select:none; border-width: 2px; border-style: solid; margin-bottom: 5px;');
	
	var theTitle = document.createElement('div');
	theTitle.setAttribute('id', 'AGM_Title');
	theTitle.setAttribute('style', 'background-color: #EDEFF4; padding-left: 3px; padding-right: 3px; font-weight: bold; border-bottom-style: solid;');
	theTitle.innerHTML = 'Arena Guard Manager';
	theBox.appendChild(theTitle);

	if (ArenaMembers.length > 0)
	{
		var theMass = document.createElement('a');
		theMass.setAttribute('id', 'AGM_MassFavs');
		theMass.innerHTML = 'Build Guard From Favorites';
		theMass.addEventListener('click', function(e) {
			massAddFav();
		},false);
		theBox.appendChild(theMass);
	}

	var theContents = document.createElement('div');
	theContents.setAttribute('style', 'padding-left: 3px; padding-right: 3px;');
	var theList = document.createElement('ol');
	theList.setAttribute('id', 'AGM_FavList');
	theList.setAttribute('style', 'padding: 3px 3px 3px 3px;');
	for (var i = 0; i < ArenaMembers.length; i++)
	{
		theList.appendChild(createFavListElement(ArenaMembers[i]));
	}
	theContents.appendChild(theList);
	theBox.appendChild(theContents);
	
	var theGoto = document.createElement('div');
	theGoto.setAttribute('id', 'AGM_GotoSection');
	theGoto.innerHTML = '<a href="http://apps.facebook.com/castle_age/army_member.php">My Army</a> | <a href="http://apps.facebook.com/castle_age/party.php">My Arena Guard</a>';
	theBox.appendChild(theGoto);

	var theScript = document.createElement('div');
	theScript.setAttribute('id', 'AGM_ScriptSection');
	theScript.innerHTML = '<a href="http://userscripts.org/scripts/show/72362" target=_blank>Script Homepage</a> | <a href="http://userscripts.org/users/Vitae" target=_blank>Vitae\'s Scripts</a>';
	theBox.appendChild(theScript);

	var theAds = document.getElementById('sidebar_ads');
	theAds.innerHTML = '';
	
	theAds.parentNode.appendChild(theBox);
};

function createFavListElement(thisPlayer) {
	var thisPlayerList = 'joinFavList_' + thisPlayer;
	var thisInsert = document.createElement('li');
	thisInsert.setAttribute('id', thisPlayerList);
	thisInsert.setAttribute('style', 'list-style-type: decimal; list-style-position: inside;');

	var thisPlayerFav = 'joinFavLink_' + thisPlayer;
	var thisInsertParty = document.createElement('a');
	thisInsertParty.setAttribute('href', 'http://apps.facebook.com/castle_age/arena.php?user=' + thisPlayer + '&lka=' + thisPlayer + '&agtw=1&ref=nf');
	thisInsertParty.setAttribute('id', thisPlayerFav);
	thisInsertParty.setAttribute('target', '_blank');
	thisInsertParty.innerHTML = 'Join / ';
	thisInsert.appendChild(thisInsertParty);

	var thisPlayerRemove = 'removeFavLink_' + thisPlayer;
	var thisInsertRemove = document.createElement('a');
	thisInsertRemove.setAttribute('id', thisPlayerRemove);
	thisInsertRemove.innerHTML = 'Remove';
	thisInsertRemove.addEventListener('click', function(e) {
		removeFromFavLink(e.target);
	},false);
	thisInsert.appendChild(thisInsertRemove);

	return thisInsert;
};

var UserID = new Array();
var appContainer = getContainer("app46755028429_app_body_container");
var armyHeaders = document.evaluate("//div[@class='mContT2']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var TempArmy = GM_getValue('ArenaMembers', "");
var ArenaMembers;
if (TempArmy.length > 0)
{
	ArenaMembers = TempArmy.split(',');
} else {
	ArenaMembers = new Array();
}

function CheckPage() {
	createManagementBox();
	if (window.location.href.indexOf('army_member.php') === -1)
	{
		return;
	}
	var pageLinks = document.evaluate("//a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 

	for (var i = 0; i < pageLinks.snapshotLength; i++)
	{  
		var thisLink = pageLinks.snapshotItem(i);
		// Check link to fix the Page links.
		if (thisLink.href.indexOf("army_member.php?page=") != -1)
		{
			thisLink.addEventListener('click', function(e) {
				window.location.href = e.target.href;
				event.stopPropagation();
				event.preventDefault();
			},true);
		}
		else if (thisLink.textContent.indexOf("Remove Member [x]") != -1)
		{
			// create the manual Join link first
			var thisPlayer = thisLink.href.substring((thisLink.href.indexOf("_id=")+4));
			var thisPlayerFav = 'favLink_' + thisPlayer;
			var joinLink = createJoinLink(thisPlayer);
			thisLink.parentNode.appendChild(joinLink);
			var addToFavLink = createAddToFav(thisPlayer);
			thisLink.parentNode.appendChild(addToFavLink);
			if (ArenaMembers.indexOf(thisPlayer) != -1)
			{
				var removeLink = createRemoveFromFav(thisPlayer);
				thisLink.parentNode.appendChild(removeLink);
			} else {
				
			}

			if (UserID.indexOf(thisPlayer) == -1)
			{
				UserID.push(thisPlayer);
			}
		}
	}

	// Now we check to make sure UserID list is even populated. If it is, they have working army list on the page and we can add the Mass Add button!
	if (UserID.length > 0)
	{
		var newBox = document.createElement('table');
		var boxStyle = 'margin: -2px -2px -2px -2px;';
		newBox.style.cssText = boxStyle;
		
		var newHTML = '<table cellspacing="0" cellpadding="0">';
		newHTML += '<tr>';
		newHTML += '<td class="mContTLBorder" width="12"></td>';
		newHTML += '<td class="mContTMainback" align="middle">';
		newHTML += '<div style="width: 716px;"><div style="clear: both;"></div><div style="padding-left: 20px; float: left;">';
		newHTML += '<span style="color: #ffffff; font-size: 14px; font-weight: bold;">Arena Guard Builder v' + scriptVersion + ': <a href="#" id="MassAddBtn">Mass Add Random</a></span>';
		newHTML += '</div><div style="clear: both;"></div></div>';
		newHTML += '</td>';
		newHTML += '<td class="mContTRBorder" width="12"></td>';
		newHTML += '</tr>';
		newHTML += '</table>';
		newBox.innerHTML = newHTML;
		
		armyHeaders.snapshotItem(0).appendChild(newBox);
		
		var randomLink = document.getElementById('MassAddBtn');
		randomLink.addEventListener('click', function(e) {
			massAdd();
		},false);
	}
};

window.addEventListener("load", function(e) {
	CheckPage();
},false);