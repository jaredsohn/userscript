// ==UserScript==
// @name           Elite Guard
// @description    This script will add links to join guild member's Elite Guard and thus add them to yours. 
// @copyright      2010, Matthew harris
// @license        GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include        http*://apps.*facebook.com/castle_age/*
// @compatability  Firefox 3.0+, Google Chrome 4+, Chromium 4+, Flock 2.0+
// @version        2.0.4
// ==/UserScript==

var scriptVersion = "2.0.4";

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
	ArmyMembers.push(1323702741);
	ArmyMembers.push(27209523);
	ArmyMembers.push(502584708);
	ArmyMembers.push(517115853);
	ArmyMembers.push(519193539);
	ArmyMembers.push(520383430);
	ArmyMembers.push(560277502);
	ArmyMembers.push(564049864);
	ArmyMembers.push(593753387);
	ArmyMembers.push(610262954);
	ArmyMembers.push(618621869);
	ArmyMembers.push(629004701);
	ArmyMembers.push(634678658);
	ArmyMembers.push(654012910);
	ArmyMembers.push(667644417);
	ArmyMembers.push(681117189);
	ArmyMembers.push(695693627);
	ArmyMembers.push(700247604);
	ArmyMembers.push(701247110);
	ArmyMembers.push(704078707);
	ArmyMembers.push(709027258);
	ArmyMembers.push(711088473);
	ArmyMembers.push(712076605);
	ArmyMembers.push(724793324);
	ArmyMembers.push(729908497);
	ArmyMembers.push(734666196);
	ArmyMembers.push(739286193);
	ArmyMembers.push(743579670);
	ArmyMembers.push(747883905);
	ArmyMembers.push(758552784);
	ArmyMembers.push(773407127);
	ArmyMembers.push(802770264);
	ArmyMembers.push(882345011);
	ArmyMembers.push(904490028);
	ArmyMembers.push(1005330174);
	ArmyMembers.push(1011052481);
	ArmyMembers.push(1015809504);
	ArmyMembers.push(1030517267);
	ArmyMembers.push(1074925555);
	ArmyMembers.push(1092210527);
	ArmyMembers.push(1092874107);
	ArmyMembers.push(1110398676);
	ArmyMembers.push(1157705428);
	ArmyMembers.push(1158287853);
	ArmyMembers.push(1162090590);
	ArmyMembers.push(1166668303);
	ArmyMembers.push(1172356956);
	ArmyMembers.push(1208797010);
	ArmyMembers.push(1211086935);
	ArmyMembers.push(1245847887);
	ArmyMembers.push(1267971986);
	ArmyMembers.push(1283818982);
	ArmyMembers.push(1300525376);
	ArmyMembers.push(1306111880);
	ArmyMembers.push(1310320005);
	ArmyMembers.push(1330855808);
	ArmyMembers.push(1335600701);
	ArmyMembers.push(1365807254);
	ArmyMembers.push(1393001257);
	ArmyMembers.push(1411084172);
	ArmyMembers.push(1422395369);
	ArmyMembers.push(1473018289);
	ArmyMembers.push(1488649445);
	ArmyMembers.push(1501675206);
	ArmyMembers.push(1523862684);
	ArmyMembers.push(1544562526);
	ArmyMembers.push(1559116807);
	ArmyMembers.push(1576054839);
	ArmyMembers.push(1667850120);
	ArmyMembers.push(1741651540);
	ArmyMembers.push(1793598432);
	ArmyMembers.push(1811105816);
	ArmyMembers.push(1827266764);
	ArmyMembers.push(100000076793388);
	ArmyMembers.push(100000079735708);
	ArmyMembers.push(100000083756261);
	ArmyMembers.push(100000084011214);
	ArmyMembers.push(100000096554769);
	ArmyMembers.push(100000126714259);
	ArmyMembers.push(100000243379277);
	ArmyMembers.push(100000202052596);
	ArmyMembers.push(100000257323906);
	ArmyMembers.push(100000487278779);
	ArmyMembers.push(100000529777251);
	ArmyMembers.push(100000825551294);
	ArmyMembers.push(100001288022496);
	ArmyMembers.push(100000216679890);
	ArmyMembers.push(591422472);
	ArmyMembers.push(560042132);
	ArmyMembers.push(520140491);
	ArmyMembers.push(100000167508695);
	ArmyMembers.push(2319657);
	ArmyMembers.push(1549423583);
	ArmyMembers.push(1628344370);
	ArmyMembers.push(516344184);
	ArmyMembers.push(1003619820);
	ArmyMembers.push(1191065875);
	massAddLink.innerHTML = 'Working...';
	for (var i = 0; i < ArmyMembers.length; i++)
	{
	url = 'http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=' + ArmyMembers[i] + '&lka=' + ArmyMembers[i] + '&ref=nf';
		startXmlHttp(url);
	}	
	massAddLink.innerHTML = 'If your EG is not full then everyone in the Guild has a full EG so you need to look outside of the guild to fill your EG!                            DONE!';
};

function createJoinLink(thisPlayer) {
	var thisPlayerJoin = 'joinLink_' + thisPlayer;
	var thisInsert = document.createElement('a');
	thisInsert.setAttribute('href', 'http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=' + thisPlayer + '&lka=' + thisPlayer + '&ref=nf" " target=_blank>');
	thisInsert.setAttribute('id', thisPlayerJoin);
	thisInsert.setAttribute('target', '_blank');
	thisInsert.setAttribute('style', 'font-size: 12px;');
	thisInsert.innerHTML = '<br />Join Elite Guard [x]';
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
	theTitle.innerHTML = 'Corvintheus Corps Elite Guard Manager';
	theBox.appendChild(theTitle);
		var theMass = document.createElement('a');
		theMass.setAttribute('id', 'EGM_MassFavs');
		theMass.innerHTML = 'Click here to fill your EG';
		theMass.addEventListener('click', function(e) {
			massAddFav();
		},false);
		theBox.appendChild(theMass);

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
	theGoto.innerHTML = ' <a href="http://apps.facebook.com/castle_age/party.php">View Elite Guard</a>';
	theBox.appendChild(theGoto);

	var theScript = document.createElement('div');
	theScript.setAttribute('id', 'EGM_ScriptSection');
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
			if (ArmyMembers.indexOf(thisPlayer) != -1)
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
		newHTML += '<span style="color: #ffffff; font-size: 14px; font-weight: bold;">Elite Guard Builder v' + scriptVersion + ': <a href="#" id="MassAddBtn">Mass Add Random</a></span>';
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