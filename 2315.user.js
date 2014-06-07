// OpUrk.nl Webvertentie remover
// version 2.6
// 05-03-2005
// Copyright (c) 2005, JAPIO
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "OpUrk.nl Webvertentie remover", and click Uninstall.
//
//
// ==UserScript==
// @name           OpUrk.nl Webvertentie remover
// @namespace      http://jaap.maos.nl
// @description    Webvertenties verwijderen van OpUrk.nl. 
// @include        http://*opurk.nl/*
// ==/UserScript==
//
// --------------------------//
// == Script instellingen -- //
// --------------------------//
var googleads = 1; // Google ads verwijderen
var kalender = 1; // Kalender plus huizenmarkt verwijderen
var overigeads = 1; // Overige advertenties verwijderen
var pathway = 1; // Pathway verwijderen (huidige locatie bovenaan)
var forumverbreden = 0; // Forum verbreden 
var indexlinks = 0; // Hoofdpagina naar links verplaatsen
var maos = 1; // Maos plaatje boven en onder toevoegen
var swf = 1; // Geanimeerde klokjes vewijderen
var rss = 1; // RSS Feed icoontje toevoegen onderaan de hoofdpagina
var standaloneforum = 1; // het forum vergroot via http://www.opurk.nl/forum kunnen openen
var standaloneforumlink = 1; // link aanpassen naar standalone forum
var standaloneforumlinkblank = 1; // Link in nieuw venster openen
// --------------------------//

// Beveiligingscheck van forum uitzetten (frames dus negeren)
if( standaloneforum )
{
	var allBody, thisBody;
	allBody = document.getElementsByTagName('body');
	for (var i = 0; i < allBody.length; i++) {
		thisBody = allBody[i];
		thisBody.setAttribute('onLoad','geenFrame()')
	}
}

// Link naar standalone forum maken
if( standaloneforumlink )
{
	var allLink, thisLink;
	allLink = document.evaluate(
	"//a[@href='index.php?option=com_wrapper&Itemid=29']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.setAttribute('href','http://opurk.nl/forum');
		if( standaloneforumlinkblank ) thisLink.setAttribute('target','_blank');
	}
}

// Balk met linkjes bovenaan het forum zetten
if (document.URL.search(/^http:\/\/www.opurk.nl\/forum*/) != -1)
{
	var extrahtml = '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td height="48" align="right" style="background: url(http://jaap.maos.nl/opurkforum_background.gif);">' +
				'<table cellspacing="0" cellpadding="0" border="0"><tr valign="top"><td align="left" valign="top" nowrap="nowrap" width="100">&nbsp;<a href="search.php" class="forum"><img src="templates/subSilver/images/icon_mini_search.gif" width="12" height="13" border="0" alt="Zoeken" hspace="3" />Zoeken</a><br />&nbsp;<a href="profile.php?mode=editprofile" class="forum"><img src="templates/subSilver/images/icon_mini_profile.gif" width="12" height="13" border="0" alt="Wie bin jie?" hspace="3" />Wie bin jie?</a><br /></td>' +
		    	'<td valign="top">&nbsp;<a href="privmsg.php?folder=inbox" class="forum"><img src="templates/subSilver/images/icon_mini_message.gif" width="12" height="13" border="0" alt="Priv&eacute; Booskippen" hspace="3" />Priv&eacute; Booskippen</a><br />&nbsp;<a href="login.php?logout=true" class="forum"><img src="templates/subSilver/images/icon_mini_login.gif" width="12" height="13" border="0" alt="Eutloggen" hspace="3" />Eutloggen</a>&nbsp;</span></td>' +
				'</tr></table></td><td align="right" style="background: url(http://jaap.maos.nl/opurkforum_background.gif);"><img src="http://www.opurk.nl/templates/gbu_opurk/images/Header.jpg" width="900" height="48" alt="OpUrk.nl" /></td></tr></table></td>' +
				'<td valign="bottom">' +
				'<table width="100%" cellspacing="0" cellpadding="2" border="0" align="center">' +
				'<tr>' +
				'<td align="right" valign="bottom" class="forum">' +
				'<a href="search.php?search_id=newposts" class="forum">Booskippen nao je leste bezoek</a>&nbsp;|&nbsp;' +
				'<a href="search.php?search_id=egosearch" class="forum">Bekiek je Booskippen</a>&nbsp;|&nbsp;' +
				'<a href="search.php?search_id=unanswered" class="forum">Bekiek Booskippen zonger een wierwoord</a></td>' +
				'</tr>' +
				'</table>' +
				'</td>' +
				'</tr>' +
				'</table>';
		
		document.body.innerHTML = extrahtml + document.body.innerHTML;
}
		


	
// Banner midden boven verwijderen plus agenda en huizenmarkt
if( kalender )
{
	var allTable, thisTable;
	allTable = document.evaluate(
		"//table[@class='rechtsboven']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allTable.snapshotLength; i++) {
		thisTable = allTable.snapshotItem(i);
		thisTable.parentNode.removeChild(thisTable);
	}
}

// Google Ads verwijderen
if( googleads )
{

	var allTable, thisTable;
	allTable = document.evaluate(
		"//table[@class='moduletablegoogle']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allTable.snapshotLength; i++) {
		thisTable = allTable.snapshotItem(i);
		thisTable.parentNode.removeChild(thisTable);
	}
}

// Pathway verwijderen
if( pathway )
{
	var allTable, thisTable;
	allTable = document.evaluate(
		"//td[@class='pathway']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allTable.snapshotLength; i++) {
		thisTable = allTable.snapshotItem(i);
		thisTable.parentNode.removeChild(thisTable);
	}
}

// SWF klokje verwijderen
if( swf )
{
	var allObjects, thisObject;
	allObjects = document.getElementsByTagName('object');
	for (var i = 0; i < allObjects.length; i++) {
		thisObject = allObjects[i];
		thisObject.parentNode.removeChild(thisObject);
	}
}

// Alle overige advertenties verwijderen
if( overigeads )
{
	var allWebvertentie, thisWebvertentie;
	allWebvertentie = document.evaluate(
		"//table[@class='moduletableartbanner1']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allWebvertentie.snapshotLength; i++) {
		thisWebvertentie = allWebvertentie.snapshotItem(i);
		thisWebvertentie.parentNode.removeChild(thisWebvertentie);
	}
	
	var allWebvertentie, thisWebvertentie;
	allWebvertentie = document.evaluate(
		"//table[@class='moduletableartbanner2']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allWebvertentie.snapshotLength; i++) {
		thisWebvertentie = allWebvertentie.snapshotItem(i);
		thisWebvertentie.parentNode.removeChild(thisWebvertentie);
	}
	
	var allWebvertentie, thisWebvertentie;
	allWebvertentie = document.evaluate(
		"//table[@class='moduletableartbanner3']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allWebvertentie.snapshotLength; i++) {
		thisWebvertentie = allWebvertentie.snapshotItem(i);
		thisWebvertentie.parentNode.removeChild(thisWebvertentie);
	}
	
	var allWebvertentie, thisWebvertentie;
	allWebvertentie = document.evaluate(
		"//table[@class='moduletableartbanner4']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allWebvertentie.snapshotLength; i++) {
		thisWebvertentie = allWebvertentie.snapshotItem(i);
		thisWebvertentie.parentNode.removeChild(thisWebvertentie);
	}
	
	var allWebvertentie, thisWebvertentie;
	allWebvertentie = document.evaluate(
		"//table[@class='moduletableartbanner5']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allWebvertentie.snapshotLength; i++) {
		thisWebvertentie = allWebvertentie.snapshotItem(i);
		thisWebvertentie.parentNode.removeChild(thisWebvertentie);
	}
}

// Maos Plaatje toevoegen
if( maos )
{
	var allImg, thisImg;
	allImg = document.evaluate(
		"//img[@src='http://www.opurk.nl/templates/gbu_opurk/images/Topmenu_nnp.jpg']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allImg.snapshotLength; i++) {
		thisImg = allImg.snapshotItem(i);
		thisImg.setAttribute('src','http://jaap.maos.nl/Topmenu_maos.jpg');
		thisImg.setAttribute('alt','Maos.nl');
		thisImg.setAttribute('width','70');
	}
	var allLink, thisLink;
	allLink = document.evaluate(
		"//a[@href='http://www.nnp.nl/']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.setAttribute('href','http://www.maos.nl');
		thisLink.setAttribute('alt','Maos.nl');
		thisLink.setAttribute('title','Maos.nl');
	}
}

//Forum verbreden
if( forumverbreden && document.location.href == "http://opurk.nl/index.php?option=com_wrapper&Itemid=29" )
{
	// Resolutie instellingen
	var width1 = 800; var height1 = 600;
	var width2 = 1024; var height2 = 768;
	var width3 = 1280; var height3 = 1024;
	
	if (screen.width == width1 || screen.height == height1){
		document.getElementById('contentblock').setAttribute('style','width: 750px;');
	}
	else if(screen.width == width2 || screen.height == height2){
		document.getElementById('contentblock').setAttribute('style','width: 850px;');
	}
	else if(screen.width == width3 || screen.height == height3){
		document.getElementById('contentblock').setAttribute('style','width: 1110px;');
	}
	
	// Proberen om de header te verbreden
	var allLink, thisLink;
	allLink = document.evaluate(
		"//table[@class='Topmenu_Table']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.setAttribute('style','width:1260px;');
	}
	var allLink, thisLink;
	allLink = document.evaluate(
		"//table[@class='Topmenu_Table']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.setAttribute('style','width:1260px;');
	}
	
	document.getElementById("HorMenu").setAttribute('style','width:1260px;');
	
	var allLink, thisLink;
	allLink = document.evaluate(
		"//table[@width='900']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.setAttribute('style','width:1260px;');
	}
	
	var allLink, thisLink;
	allLink = document.evaluate(
		"//td[@colspan='10']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.setAttribute('style','background-color:#df1e2a;');
	}
	
	// Knoppenbalk mooier maken
	var allLink, thisLink;
	allLink = document.evaluate(
		"//td[@width='313']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.setAttribute('width','673');
	}
	
	//Bovenste balk mooier maken
	var allLink, thisLink;
	allLink = document.evaluate(
		"//td[@width='281']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.setAttribute('width','562');
	}

	// Forum balk verbreden
	var allLink, thisLink;
	allLink = document.evaluate(
		"//div[@class='componentheading']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.setAttribute('style','background-image:url(/templates/gbu_opurk/images/Contentbalk_Forum.jpg); background-repeat: repeat-x;');
	}
	
	// Rechterkolom bij het forum verwijderen
	var allTable, thisTable;
	allTable = document.evaluate(
	    "//td[@class='bannerkolom']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allTable.snapshotLength; i++) {
	    thisTable = allTable.snapshotItem(i);
		thisTable.parentNode.removeChild(thisTable);
	}
}

if( forumverbreden  && document.location.href == "http://opurk.nl/index.php?option=com_wrapper&Itemid=29")
{
	// Alles naar links verplaatsen om een correcte stijl te hanteren
	var allLink, thisLink;
	allLink = document.evaluate(
		"//div[@class='background']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.setAttribute('align','left');
	}
}
if( indexlinks && ( document.location.href == "http://www.opurk.nl/" | document.location.href == "http://www.opurk.nl/index.php?option=com_frontpage&Itemid=1" ))
{
	// Alles naar links verplaatsen om een correcte stijl te hanteren
	var allLink, thisLink;
	allLink = document.evaluate(
		"//div[@class='background']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.setAttribute('align','left');
	}
}

// RSS Feed Icon
if( rss )
{
	var allLink, thisLink;
	allLink = document.evaluate(
		"//div[@class='blog_more']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.innerHTML = thisLink.innerHTML + "<div align='right' style='margin: 4px;'><a href='http://opurk.nl/index2.php?option=com_rss&feed=RSS2.0&no_html=1' title='RSS Feed'><img src='http://jaap.maos.nl/feed-icon-16x16.gif' alt='RSS Feed' border='0'></a></div>";
	}
}

	var allLink, thisLink;
	allLink = document.evaluate(
		"//a[@href='/index.php?option=com_content&task=archivesection&id=1&Itemid=48']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.innerHTML = thisLink.innerHTML + "<a href='/index.php?option=com_content&task=archivesection&id=1&Itemid=48' class='hormenu_color'>Archief</a>";
	}

//.user.js