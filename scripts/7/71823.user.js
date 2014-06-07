// ==UserScript==
// @name           Castle Age Elite Guard Builder Plus
// @namespace      Castle Age
// @description    My Castle Age EGB Script - Based on MuadDib's Original Script
// @include        http*://apps.*facebook.com/castle_age/*
// ==/UserScript==

var scriptVersion = "1.0.3";

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
	url = 'http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=' + UserID[x] + '&lka=' + UserID[x] + '&ref=nf';	
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
	var massAddLink = document.getElementById("EGM_MassFavs");

	for (var i = 0; i < ArmyMembers.length; i++)
	{
		url = 'http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=' + ArmyMembers[i] + '&lka=' + ArmyMembers[i] + '&ref=nf';
		startXmlHttp(url);
	}	

	massAddLink.innerHTML = 'Complete!';
};

// 'Join Elite Guard' entry for each record. 'thisPlayer' is retrieved from the user array pulled down from Facebook.
// This function is called only by CheckPage().

function createJoinLink(thisPlayer, intIndex) 
{
  var thisPlayerJoin = 'joinLink_' + thisPlayer;
  var thisInsert = document.createElement('a');
  with (thisInsert)
  {
    setAttribute('href', 'http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=' + thisPlayer + '&lka=' + thisPlayer + '&ref=nf" " target=_blank>');
    setAttribute('id', thisPlayerJoin);
    setAttribute('target', '_blank');
    setAttribute('style', 'color:Yellow;font-size: 12px;');
    innerHTML = '<br />Join ' + intIndex + 's Elite Guard [x]';
    }
	return thisInsert;
};

function addToFav(target) {
	var thisPlayer = target.id.substring(8);
	if (ArmyMembers.indexOf(thisPlayer) == -1)
	{
		ArmyMembers.push(thisPlayer);
		GM_setValue('ArmyMembers', ArmyMembers.join(','));
		var removeLink = createRemoveFromFav(thisPlayer);
		target.parentNode.appendChild(removeLink);
		var rfavLink = document.getElementById('EGM_FavList');
		var favLink = createFavListElement(thisPlayer);
		rfavLink.appendChild(favLink);
	}
};

function createAddToFav(thisPlayer) {
	var thisPlayerFav = 'favLink_' + thisPlayer;
	var thisInsert = document.createElement('a');
	thisInsert.setAttribute('style', 'font-size: 12px;');
	thisInsert.setAttribute('id', thisPlayerFav);
	thisInsert.innerHTML = '<br />Add To Favorites [x]';
	thisInsert.addEventListener('click', function(e) {
		addToFav(e.target);
	},false);
	return thisInsert;
};

function removeFromFav(target) {
	var thisPlayer = target.id.substring(9);
	if (ArmyMembers.indexOf(thisPlayer) != -1)
	{
		ArmyMembers.splice(ArmyMembers.indexOf(thisPlayer), 1);
		GM_setValue('ArmyMembers', ArmyMembers.join(','));
		removeFromFavElement(thisPlayer);
	}
};

function createRemoveFromFav(thisPlayer) {
	var thisPlayerRFav = 'rfavLink_' + thisPlayer;
	var thisInsert = document.createElement('a');
	thisInsert.setAttribute('style', 'font-size: 12px;');
	thisInsert.setAttribute('id', thisPlayerRFav);
	thisInsert.innerHTML = '<br />Remove From Favorites [x]';
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
	if (ArmyMembers.indexOf(thisPlayer) != -1)
	{
		ArmyMembers.splice(ArmyMembers.indexOf(thisPlayer), 1);
		GM_setValue('ArmyMembers', ArmyMembers.join(','));
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
	theBox.setAttribute('id', 'EGM_Container');
	theBox.setAttribute('style', 'clear: both; text-align: center; -moz-user-select:none; border-width: 2px; border-style: solid; margin-bottom: 5px;');
	
	var theTitle = document.createElement('div');
	theTitle.setAttribute('id', 'EGM_Title');
	theTitle.setAttribute('style', 'background-color: #EDEFF4; padding-left: 3px; padding-right: 3px; font-weight: bold; border-bottom-style: solid;');
	theTitle.innerHTML = 'Slowly\'s Elite Guard Builder';
	theBox.appendChild(theTitle);

	if (ArmyMembers.length > 0)
	{
		var theMass = document.createElement('a');
		theMass.setAttribute('id', 'EGM_MassFavs');
		theMass.innerHTML = 'Build Guard From Favorites';
		theMass.addEventListener('click', function(e) {
			massAddFav();
		},false);
		theBox.appendChild(theMass);
	}

	var theContents = document.createElement('div');
	theContents.setAttribute('style', 'padding-left: 3px; padding-right: 3px;');
	var theList = document.createElement('ol');
	theList.setAttribute('id', 'EGM_FavList');
	theList.setAttribute('style', 'padding: 3px 3px 3px 3px;');
	for (var i = 0; i < ArmyMembers.length; i++)
	{
		theList.appendChild(createFavListElement(ArmyMembers[i]));
	}
	theContents.appendChild(theList);
	theBox.appendChild(theContents);
	
	var theGoto = document.createElement('div');
	theGoto.setAttribute('id', 'EGM_GotoSection');
	theGoto.innerHTML = '<a href="http://apps.facebook.com/castle_age/army_member.php">My Army</a> | <a href="http://apps.facebook.com/castle_age/party.php">My Elite Guard</a>';
	theBox.appendChild(theGoto);

	var theScript = document.createElement('div');
	theScript.setAttribute('id', 'EGM_ScriptSection');
	theScript.innerHTML = '<a href="http://userscripts.org/scripts/show/61078" target=_blank>EGB Home</a> | <a href="http://userscripts.org/users/muaddib" target=_blank>MuadDib</a>';
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
	thisInsertParty.setAttribute('href', 'http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=' + thisPlayer + '&lka=' + thisPlayer + '&ref=nf');
	thisInsertParty.setAttribute('id', thisPlayerFav);
	thisInsertParty.setAttribute('target', '_blank');
	thisInsertParty.innerHTML = 'Join ';
	thisInsert.appendChild(thisInsertParty);

	var thisPlayerRemove = 'removeFavLink_' + thisPlayer;
	var thisInsertRemove = document.createElement('a');
	thisInsertRemove.setAttribute('id', thisPlayerRemove);
	thisInsertRemove.innerHTML = ' Remove';
	thisInsertRemove.addEventListener('click', function(e) {
		removeFromFavLink(e.target);
	},false);
	thisInsert.appendChild(thisInsertRemove);

	return thisInsert;
};

var UserID = new Array();
var appContainer = getContainer("app46755028429_app_body_container");
var armyHeaders = document.evaluate("//div[@class='mContT2']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var TempArmy = GM_getValue('ArmyMembers', "");
var ArmyMembers;
if (TempArmy.length > 0)
{
	ArmyMembers = TempArmy.split(',');
} else {
	ArmyMembers = new Array();
}

function CheckPage() {

    // create management menu. If user doesn't have an army, quit

	createManagementBox();
	if (window.location.href.indexOf('army_member.php') === -1)
	{
		return;
	}
	
	// RETRIEVE ARMY LIST INTO AN ARRAY
	// --------------------------------

    // More about how the document.evaluate function works can be found at:
	// https://developer.mozilla.org/en/DOM/document.evaluate

	// More about the 4th parameter, resultType, is at:
	// https://developer.mozilla.org/en/DOM/document.evaluate#Result_types
    
    // More about the return data structure, XPathResult, can be found at:
	// https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsIDOMXPathResult

	var objArmyList = document.evaluate("//a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 

    // MAIN LOOP (this is the loop that prints out the army list)

	for (var i = 0; i < objArmyList.snapshotLength; i++)
	{  
        // the 'objArmyMember' variable is one record in the Army List. A snapshotItem() is a DOM node.
		var objArmyMember = objArmyList.snapshotItem(i);

		// Check link to fix the Page links. <== the original author wrote this. Don't know what it means.
        // The 'Remove Member [x]' text is from the unaltered Castle Age markup.

		if (objArmyMember.href.indexOf("army_member.php?page=") != -1)
		{
			objArmyMember.addEventListener('click', function(e) {
				window.location.href = e.target.href;
				event.stopPropagation();
				event.preventDefault();
			},true);
		}
		else if (objArmyMember.textContent.indexOf("Remove Member [x]") != -1)
		{
			// this section creates the 'Join Elite Guard' link

			var thisPlayer = objArmyMember.href.substring((objArmyMember.href.indexOf("_id=")+4));
			var thisPlayerFav = 'favLink_' + thisPlayer;

			// This line creates the 'Join Elite Guard' link
			var joinLink = createJoinLink(thisPlayer, i);

			objArmyMember.parentNode.appendChild(joinLink);
			var addToFavLink = createAddToFav(thisPlayer);
			objArmyMember.parentNode.appendChild(addToFavLink);
			if (ArmyMembers.indexOf(thisPlayer) != -1)
			{
				var removeLink = createRemoveFromFav(thisPlayer);
				objArmyMember.parentNode.appendChild(removeLink);
			} 
			else 
			{
			  // do nothing	
			}
            
			// push() is a javascript method to add another item to an array
			if (UserID.indexOf(thisPlayer) == -1)
			{
				UserID.push(thisPlayer);
			}
		}
	}
    
	// Now we check to make sure UserID list is even populated. 
	//If it is, they have working army list on the page and we 
	//can add the Mass Add button!
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
		newHTML += '<span style="color: #ffffff; font-size: 14px; font-weight: bold;">Slowlys Elite Guard Builder v' + scriptVersion + ': <a href="#" id="MassAddBtn">Mass Add Random</a></span>';
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