// ==UserScript==
// @name          MusicBrainz.org artist/release searches
// @author        Jaakko Perttilä <jormangeud@gmail.com> & Aurelien Mino <aurelien.mino@gmail.com> & Scott <ian@norcimo.com>
// @version       2010-02-06
// @description   Shows links to search various sites when editing MusicBrainz.org
// @include       http://*musicbrainz.org/artist/*
// @include       http://*musicbrainz.org/show/artist/*
// @include       http://*musicbrainz.org/release-group/*
// @include       http://*musicbrainz.org/release/*
// @include       http://*musicbrainz.org/album/*
// @include       http://*musicbrainz.org/show/release/*
// @include       http://*musicbrainz.org/label/*
// @include       http://*musicbrainz.org/show/label/*
// @include       http://*musicbrainz.org/mod/*
// @exclude       http://*musicbrainz.org/mod/inlinemod.html

// ==/UserScript==

(function () {
// Script Update Checker
// -- http://userscripts.org/scripts/show/20145

var SUC_script_num = 68131; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


//See the end of the script for adding more engines

/* Changelog: 
  2010-02-05 - J.Perttilä - Separation of release and artist
				* Separated functions for release and artist
				* Removed dead engines and added some new
				* Fixed icon height to 16px - fixes style bug if icon is bigger than 16px
				* Removed the settings from inlinemod
  2007-05-xx - A.Mino
				* Rewritten: code is more object oriented friendly
				* Fix special case when the tagger icon is present
  2007-04-16 - A. Mino - Added MBSearchesBar, fixed SetSearches() and switch to instant apply instead of reloading
  2007-04-15 - A. Mino - Correctly escape the search term
  2007-04-14 - A. Mino - Various improvements:
				* fix a bug with pending edit on artist
				* exlude tracks
				* open in new window
				* add a sanitizeSearchTerm function to sanitize titles
				* new search engines (French ones + some from Aaron Cooper)
  2006-12-12 - Ian Scott - v1.0 Search Engines cleaned up. Now with optional loading of favicons rather than abbreviations (kudos to Aaron Cooper for the suggestion)
  2006-12-11 - Ian Scott - Initial Release 
*/

// Includes options dialogue to choose which engines to display and set localised TLD


/**
 * MBSearchesDecorator: do the work of changing the MusicBrainz page
 */
MBSearchesDecorator = function() {

	this.makeSearchLinks = function (searchTerm, eType)
	{
		var container = document.createElement("span");
		addClass(container,"mbCont");
		for (var itor=0; itor<engines["names"].length; itor++) {
			if (((engines["type"][itor] === eType)
			|| (engines["type"][itor] === 3))
			&& (GM_getValue("mbzs"+itor,true))) {
				container.appendChild(document.createTextNode(" "));
				var newLink=document.createElement("a");
				newLink.setAttribute("href",engines["urls"][itor]+searchTerm);
				if (GM_getValue("mbzsImg",true) && engines["img"][itor]) {
					newImg=newLink.appendChild(document.createElement("img"));
					newImg.setAttribute("src",engines["img"][itor]);
					newImg.setAttribute("alt",engines["abbrs"][itor]);
					newImg.setAttribute("title","Search using "+engines["names"][itor]);
				} else {
					newLink.appendChild(document.createTextNode("("+engines["abbrs"][itor]+")"));
				}
				// Open in new window (or tab) instead of current one
				if(GM_getValue("mbzsLinkInNewWin", true)){
					newLink.addEventListener('click', function(ev) { window.open(ev.currentTarget.href); ev.preventDefault(); }, false);
				}
				container.appendChild(newLink);
			}
		}
		return container;
	}

	this.insertMusicLinks = function ()
	{
		this.insertMusicLinksArtist();
		this.insertMusicLinksRelease();
		this.insertMusicLinksReleaseGroup();
	}

	this.insertMusicLinksArtist = function ()
	{
		this.insertMusicLinksRelease(1);
	}

	this.insertMusicLinksRelease = function (eType)
	{
		eType = eType||2;
		var tableRows;
		if (eType === 1) tableRows = this.getTargetArtist();
		else tableRows = this.getTargetReleases();

		for (var tr=0; tr<tableRows.length; tr++) {
			var links = tableRows[tr].getElementsByTagName("a");
			var titleContainerNode;
			if (links.length > 0)
				titleContainerNode = links[0];
			var searchTerm;

			if (titleContainerNode.getElementsByTagName("span")[0]) {
				// Special case when there is a pending edit on an artist
				searchTerm = titleContainerNode.getElementsByTagName("span")[0].firstChild.nodeValue;
			} else {
				searchTerm = titleContainerNode.firstChild.nodeValue;
			}
			searchTerm = this.sanitizeSearchTerm(searchTerm);
			searchTerm = escape(searchTerm);
			var ourLinks = this.makeSearchLinks(searchTerm,eType);
			if (ourLinks != null) {
				tableRows[tr].appendChild(ourLinks);
			}
		}
	}

	this.insertMusicLinksReleaseGroup = function () {
		var tableRows = this.getTargetReleaseGroups();
		for (var tr=0; tr<tableRows.length; tr++) {
			var links = tableRows[tr].getElementsByTagName("a");
			var titleContainerNode;
			if (links.length > 0)
				titleContainerNode = links[0];
			var searchTerm;

			if (titleContainerNode.getElementsByTagName("span")[0]) {
				// Special case when there is a pending edit on an artist
				searchTerm = titleContainerNode.getElementsByTagName("span")[0].firstChild.nodeValue;
			} else {
				searchTerm = titleContainerNode.firstChild.nodeValue;
			}

			if (searchTerm == "[non-album tracks]") continue;

			searchTerm = this.sanitizeSearchTerm(searchTerm);
			searchTerm = escape(searchTerm);
			var ourLinks = this.makeSearchLinks(searchTerm,2);
			if (ourLinks != null) {
				tableRows[tr].appendChild(ourLinks);
			}
		}
	}

	// TODO update to support artist/releasegroups?
	this.removeMusicLinks = function ()
	{
		var tableRows=this.getTargetTitles();
		for (var tr=0; tr<tableRows.length; tr++) {
			var node = getFirstElementByClassName(tableRows[tr], "span", "mbCont");
			tableRows[tr].removeChild(node);
		}
	}

	this.getTargetArtist = function ()
	{
		var xpathExpr = "//table[@class='artisttitle']//td[@class='title']";
		return evaluateXPath(document,xpathExpr);
	}

	this.getTargetReleases = function ()
	{
		var xpathExpr = "//td[@class='rname']";
		xpathExpr += "|" + "//table[contains(@id,'release::')]/tbody/tr[@class='title']/td[@class='title']";
		return evaluateXPath(document,xpathExpr);
	}

	this.getTargetReleaseGroups = function ()
	{
		// get releasegroups
		var xpathExpr = "//span[@class='linkreleasegroup-icon']";
		return evaluateXPath(document,xpathExpr);
	}

	this.sanitizeSearchTerm = function (searchTerm) 
	{
		// Remove all "(disc...)"
		searchTerm=searchTerm.replace(/(\(disc.+\))$/g,"");
		// Remove additional spaces at end
		searchTerm=searchTerm.replace(/( )+$/g,"");
		return searchTerm;
	}
}

/**
 * MBSearchesCompanionBar: the bar on the bottom right allowing quick acess to 
 * the options menu or activate/disactive MBSearches
 */
MBSearchesCompanionBar = function(mbSearchesDecorator) {
	
	this.create = function ()
	{
		var MBSearchesBar=document.createElement("div");
		MBSearchesBar.id="mbzsBar";
		
		var button = document.createElement("span");
		button.appendChild(document.createTextNode("MB Searches"));
		button.addEventListener('click', this.switchOptionsScreenDisplay, false);
		MBSearchesBar.appendChild(button);
		
		var checkBox = document.createElement("input");
		checkBox.setAttribute("type","checkbox");
		checkBox.checked = GM_getValue("mbzsEnabled",true);
		checkBox.addEventListener('click', this.switchMBSearchesActivation, false);
		MBSearchesBar.appendChild(checkBox);
		
		document.getElementsByTagName("body")[0].appendChild(MBSearchesBar);
	}
	
	this.switchOptionsScreenDisplay = function (event) 
	{
		//var optionsBox=document.getElementById("mbzsOptBox");
		if(this.optionsScreen) {
			this.optionsScreen.optionsBox.style.display = (this.optionsScreen.optionsBox.style.display == 'none') ? 'block' : 'none';
		} else {
			this.optionsScreen = new MBSearchesOptionsScreen(this.mbSearchesDecorator);
			this.optionsScreen.create();
		}
	}
	
	this.switchMBSearchesActivation = function (event)
	{
		// Save preference
		GM_setValue("mbzsEnabled",event.currentTarget.checked);
		
		// Instant apply
		if(GM_getValue("mbzsEnabled",true)) {
			mbSearchesDecorator.insertMusicLinks();
		} else {
			mbSearchesDecorator.removeMusicLinks();
		}
	}
	
	this.optionsScreen = undefined;
	this.mbSearchesDecorator = mbSearchesDecorator;

}	


/**
 * MBSearchesOptionsScreen: the options menu
 */
MBSearchesOptionsScreen = function(mbSearchesDecorator) {
	this.mbSearchesDecorator = mbSearchesDecorator;
	this.optionsBox;
	
	this.create =	function () {
		this.optionsBox=document.createElement("div");
		this.optionsBox.mbSearchesDecorator = this.mbSearchesDecorator;
		this.optionsBox.id="mbzsOptBox";
		var optionsForm = this.optionsBox.appendChild(document.createElement("form"));
		optionsForm.id="mbzsfrm";
		
		// Options
		var generalOptionsFieldSet = optionsForm.appendChild(document.createElement("fieldset"));
		generalOptionsFieldSet.appendChild(document.createElement("legend")).appendChild(document.createTextNode("Options"));
		var optionsList=generalOptionsFieldSet.appendChild(document.createElement("ul"));
		
		// TLD
		var thisTxt=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("label"));
		thisTxt.setAttribute("for","mbzsTLD");
		thisTxt.appendChild(document.createTextNode("Top Level Domain: "));
		
		thisTxt=thisTxt.appendChild(document.createElement("input"));
		thisTxt.id="mbzsTLD";
		thisTxt.setAttribute("type","text");
		thisTxt.setAttribute("size","5");
		thisTxt.setAttribute("value",GM_getValue("mbzsTLD","com"));
		
		// Use image ?
		thisTxt=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("label"));
		thisTxt=thisTxt.appendChild(document.createElement("input"));
		thisTxt.setAttribute("type","checkbox");
		thisTxt.id="mbzsImg";
		thisTxt.checked=GM_getValue("mbzsImg",true);
		thisTxt.parentNode.appendChild(document.createTextNode("Use Images "));

		// Open in new window ?
		thisTxt=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("label"));
		thisTxt=thisTxt.appendChild(document.createElement("input"));
		thisTxt.setAttribute("type","checkbox");
		thisTxt.id="mbzsLinkInNewWin";
		thisTxt.checked=GM_getValue("mbzsLinkInNewWin",true);
		thisTxt.parentNode.appendChild(document.createTextNode("Open links in a new window"));

		// Search sites
		var searchSitesFieldSet = optionsForm.appendChild(document.createElement("fieldset"));
		searchSitesFieldSet.appendChild(document.createElement("legend")).appendChild(document.createTextNode("Search sites"));
		var optionsList=searchSitesFieldSet.appendChild(document.createElement("ul"));
		for (var itor=0; itor<engines["names"].length; itor++) {
			var thislabel=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("label"));
			var thisInput=thislabel.appendChild(document.createElement("input"));
			thisInput.setAttribute("type","checkbox");
			thisInput.id="mbzsch"+itor;
			thisInput.checked=GM_getValue("mbzs"+itor,true);
			thislabel.appendChild(document.createTextNode(engines["names"][itor]));
		}
		// Apply button
		var thisSub=optionsForm.appendChild(document.createElement("input"));
		thisSub.setAttribute("type","submit");
		thisSub.setAttribute("value","Apply");
		thisSub.id="mbzsSub";
		thisSub.addEventListener("click", this.applyChanges, true);

		// Cancel button
		var thisSub=optionsForm.appendChild(document.createElement("input"));
		thisSub.setAttribute("type","submit");
		thisSub.setAttribute("value","Cancel");
		thisSub.id="mbzsCancel";
		thisSub.addEventListener("click", this.CancelChanges, true);

		document.getElementsByTagName("body")[0].appendChild(this.optionsBox);
	}

	this.applyChanges = function (event) {
		for (var itor=0; itor<engines["names"].length; itor++) {
			GM_setValue("mbzs"+itor,document.getElementById("mbzsch"+itor).checked);
		}
		if (document.getElementById("mbzsTLD").value!="") {
			GM_setValue("mbzsTLD",document.getElementById("mbzsTLD").value);
		}
		GM_setValue("mbzsImg",document.getElementById("mbzsImg").checked);
		GM_setValue("mbzsLinkInNewWin",document.getElementById("mbzsLinkInNewWin").checked);
		
		var optionsBox = document.getElementById("mbzsOptBox");
		optionsBox.style.display = 'none';
		event.stopPropagation();
		event.preventDefault();

		// instant apply ;-)
		optionsBox.mbSearchesDecorator.removeMusicLinks();
		optionsBox.mbSearchesDecorator.insertMusicLinks();
	}

	this.CancelChanges = function (event) {
		for (var itor=0; itor<engines["names"].length; itor++) {
			document.getElementById("mbzsch"+itor).checked = GM_getValue("mbzs"+itor);
		}
		document.getElementById("mbzsTLD").value = GM_getValue("mbzsTLD");
		document.getElementById("mbzsImg").checked = GM_getValue("mbzsImg");
		document.getElementById("mbzsLinkInNewWin").checked = GM_getValue("mbzsLinkInNewWin");

		document.getElementById("mbzsOptBox").style.display = 'none';
		event.stopPropagation();
		event.preventDefault();
	}

}

function addSite(eName, eURL, eAbbr, eLoc, eImg, eType) {
	if (!eName || !eURL || !eAbbr)
		return;
	eLoc=eLoc || false;
	eImg=eImg || "";
	if (eLoc) { //Localise TLD
		eURL=eURL.replace("TLD",GM_getValue("mbzsTLD","co.uk"));
	}
	eType=eType || 3;
	engines["names"].push(eName);
	engines["urls"].push(eURL);
	engines["abbrs"].push(eAbbr);
	engines["img"].push(eImg);
	engines["type"].push(eType);
}

function addGlobalStyle(css) {
	//taken from Dive into Greasemonkey
	//http://diveintogreasemonkey.org
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function evaluateXPath(aNode, aExpr) {
	// Evaluate an XPath expression aExpression against a given DOM node
	// or Document object (aNode), returning the results as an array
	// thanks wanderingstan at morethanwarm dot mail dot com for the
	// initial work.
	// Taken from http://developer.mozilla.org/en/docs/Using_XPath
	var xpe = new XPathEvaluator();
	var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
		aNode.documentElement : aNode.ownerDocument.documentElement);
	var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
	var found = [];
	var res;
	while (res = result.iterateNext())
		found.push(res);
	return found;
}

// Helper function for getting the first html element with specified class name
// derived from function getElementsByClassName()
function getFirstElementByClassName(oElm, strTagName, strClassName)
{
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];      
		if(oRegExp.test(oElement.className)){
			return oElement;
		}   
	}
	return null;
}


function addClass(node, addedClass) {
	if (node.getAttribute("class"))
		node.setAttribute("class",node.getAttribute("class")+" "+addedClass);
	else
		node.setAttribute("class",addedClass);
}

// Setup

var engines=new Array();
engines["names"]=new Array();
engines["urls"]=new Array();
engines["abbrs"]=new Array();
engines["img"]=new Array();
engines["type"]=new Array();

addGlobalStyle(
'.mbCont {display:none;}'
+' .rname:hover .mbCont,'
+' .rname:focus .mbCont,'
+' .title:hover .mbCont,'
+' .linkreleasegroup-icon:hover .mbCont,'
+' .title:focus .mbCont {display:inline;}'
+' .title:focus .mbCont>a {background-color:#0F0;}'
+' .mbCont>a>img {height:16px;}'
+' .mbCont>a:hover>img {border-bottom:1px solid black;}'
);
//+' mbCont a {width:16px; height:16px; max-width:16px; max-height:16px; border:none;}');
addGlobalStyle('#mbzsOptBox {position:fixed; top:100px; left:150px; width:75%; background-color:#736DAB; color:white; -moz-border-radius:20px; margin:20px;} #mbzsOptBox form { margin: 5px;} #mbzsOptBox ul {list-style:none; margin:5px 10px; padding:0; -moz-column-count:3} #mbzsOptBox li {padding:5px, margin:0;}');
addGlobalStyle('#mbzsBar {position:fixed; bottom:0px; right:0px; background-color:#736DAB; color:white; -moz-border-radius-topleft:10px; padding-left:4px;} #mbzsBar span {color:white; cursor:pointer;}');


/*---------------------------*/
//Search Engines added here
/*---------------------------*/

/*
addSite("Site_Name","Search_URL", "Site_Abbreviation", [use TLD]), "Favicon_URL", [Search type];
The search URL will have the artist name appended
Add new searches to the end to avoid messing up preferences
TLD magic--for localisation you can replace the top level domain (com, co.uk, etc) with TLD and pass
true as the penultimate parameter to addSite. This will replace TLD with the user set top level domain (com 
by default). eg http://www.google.TLD/search?q=
To use an image pass the url for the image (if you include this, you must pass a value for localisation, typically false)
Search type defines where to add the search links. 1 = artist, 2 = release, 3 = both. Default is 3.
*/

/* artist */
addSite("MusicBrainz artists","http://musicbrainz.org/search/textsearch.html?type=artist&limit=25&handlearguments=1&query=","MB:a",false,"http://musicbrainz.org/images/aicon.png",1);
addSite("Metal-Archives artists","http://www.metal-archives.com/search.php?type=band&string=","M-A:a",false,"http://static.metal-archives.com/images/favicon.ico",1);
addSite("Musik Sammler artists","http://www.musik-sammler.de/index.php?do=search&artist=","MS:a",false,"http://www.musik-sammler.de/favicon.ico",1);
addSite("Discogs artists","http://www.discogs.com/search?type=artists&q=","Dc:a",false,"http://www.discogs.com/images/favicon.ico",1);

/* release */
addSite("MusicBrainz releases","http://musicbrainz.org/search/textsearch.html?type=release&limit=25&handlearguments=1&query=","MB:r",false,"http://musicbrainz.org/images/licon.png",2);
addSite("Metal-Archives releases","http://www.metal-archives.com/search.php?type=album&string=","M-A:r",false,"http://static.metal-archives.com/images/favicon.ico",2);
addSite("Musik Sammler releases","http://www.musik-sammler.de/index.php?do=search&title=","MS:r",false,"http://www.musik-sammler.de/favicon.ico",2);
addSite("Discogs releases","http://www.discogs.com/search?type=releases&q=","Dc:r",false,"http://www.discogs.com/images/favicon.ico",2);

/* both */
addSite("Imperiumi","http://www.imperiumi.net/index.php?act=global_search&criteria=","Imp",false,"http://imperiumi.net/images/favicon.ico");
addSite("Amazon","http://www.amazon.TLD/exec/obidos/external-search/?mode=music&field-keywords=","Amz",true,"http://amazon.co.uk/favicon.ico");
addSite("Google","http://www.google.TLD/search?q=","Google",true,"http://www.google.com/favicon.ico");
addSite("WikiPedia","http://www.google.com/search?sourceid=navclient&q=site%3A*.wikipedia.org+","Wiki",false,"http://www.wikipedia.org/favicon.ico");
addSite("All Music","http://www.allmusic.com/cg/amg.dll?P=amg&x=0&y=0&opt1=1&sql=","AllM",false,"http://www.allmusic.com/favicon.ico");
addSite("IMDB","http://www.imdb.com/find?s=all&q=","IMDB",false,"http://www.imdb.com/favicon.ico");
addSite("CD Baby","http://cdbaby.com/found?allsearch=","CDB",false,"http://cdbaby.com/favicon.ico");

addSite("btjunkie","http://btjunkie.org/search?q=","Btj",false,"http://btjunkie.org/favicon.ico");
addSite("The Pirate Bay","https://thepiratebay.org/search.php?audio=on&q=","TPB",false,"http://thepiratebay.org/favicon.ico");
addSite("IsoHunt","https://isohunt.com/torrents.php?ihq=","IH",false,"http://isohunt.com/favicon.ico");

addSite("CDCovers.to","http://cdcovers.to/search.php?q=","CDC",false,"http://cdcovers.to/favicon.ico");
addSite("Megasearch","http://www.mega-search.net/search.php?group=audio&x=0&y=0&terms=","Mega",false,"http://www.mega-search.net/favicon.ico");

/*
// French resources
addSite("Alapage","http://www.alapage.com/mx/?tp=L&type=3&fulltext=","Alapage",false,"http://www.alapage.com/favicon.ico");
addSite("Priceminister","http://www.priceminister.com/navigation/se/category/104724/kw/","Priceminister",false,"http://www.priceminister.com/favicon.ico");
addSite("CDMail","http://www.google.com/search?sourceid=navclient&q=site%3Acdmail.fr+","CDMail",false,"http://www.cdmail.fr/images2006/favicon.png");
addSite("MusicMe","http://www.musicme.com/page.php?q=","MusicMe",false,"http://www.musicme.com/favicon.ico");
addSite("Chapitre.com","http://www.google.com/search?sourceid=navclient&q=site%3Achapitre.com+","Chapitre.com",false,"http://www.chapitre.com/App_Themes/CHAPITRE/images/favicon.ico");
*/


/*---------------------------*/
// main()
/*---------------------------*/
// don't load on inlinemod
var loc = window.location;
var pat = new RegExp("inlinemod", "g");
if (!pat.test(loc)) {

	var mbSearchesDecorator = new MBSearchesDecorator();
	if (GM_getValue("mbzsEnabled",true)) {
		mbSearchesDecorator.insertMusicLinks();
	}
	var mbSearchesBar = new MBSearchesCompanionBar(mbSearchesDecorator);
	mbSearchesBar.create();

}
})();