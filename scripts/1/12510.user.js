// ==UserScript==
// @name          MusicBrainz.org Enhanced Searches
// @author        Aurelien Mino <aurelien.mino@gmail.com> & Scott <ian@norcimo.com>
// @version       2008-09-14_01
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

// ==/UserScript==

(function () {

// Script Update Checker
// -- http://userscripts.org/scripts/show/20145
var version_scriptNum = 12510; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1258363735739; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
try {
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);
} catch(e) {}

//See the end of the script for adding more engines

/* Based on the last.fm searches version at the request of Aaron Cooper */

/* Changelog: 
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

	this.makeSearchLinks = function (searchTerm) {
		var container=document.createElement("span");
		addClass(container,"mbCont");
		for (var itor=0; itor<engines["names"].length; itor++) {
			if (GM_getValue("mbzs"+itor,true)) {
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
		
	this.insertMusicLinks = function()
	{
		var tableRows=this.getTargetTitles();
		for (var tr=0; tr<tableRows.length; tr++) {
			var links = tableRows[tr].getElementsByTagName("a");
						var titleContainerNode;
            if (links.length > 0)
                titleContainerNode = links[0];
			var searchTerm;
			
			if(titleContainerNode.getElementsByTagName("span")[0]) {
				// Special case when there is a pending edit on an artist
				searchTerm = titleContainerNode.getElementsByTagName("span")[0].firstChild.nodeValue;
			} else {
				searchTerm = titleContainerNode.firstChild.nodeValue;
			}
			searchTerm=this.sanitizeSearchTerm(searchTerm);
			searchTerm=escape(searchTerm);
			var ourLinks=this.makeSearchLinks(searchTerm);
			if (ourLinks!=null) {
				tableRows[tr].appendChild(ourLinks);
			}				
		}
	}
	
	this.removeMusicLinks = function ()
	{
		var tableRows=this.getTargetTitles();
		for (var tr=0; tr<tableRows.length; tr++) {
			var node = getFirstElementByClassName(tableRows[tr], "span", "mbCont");
			tableRows[tr].removeChild(node);
		}
	}
	
	this.getTargetTitles = function ()
	{
		// Select all releases in compact listing on the artist page
		var xpathExpr = "//td[@class='rname']";
		// And all td elements with class='title', except those from the track listing table
		xpathExpr += "|" + "//table[@class!='releasetracks']//td[@class='title']";
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
 * 		the options menu or activate/desactive MBSearches
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

function addSite(eName, eURL, eAbbr, eLoc, eImg) {
	if (!eName || !eURL || !eAbbr)
		return;
	eLoc=eLoc || false;
	eImg=eImg || "";
	if (eLoc) { //Localise TLD
		eURL=eURL.replace("TLD",GM_getValue("mbzsTLD","co.uk"));
	}
	engines["names"].push(eName);
	engines["urls"].push(eURL);
	engines["abbrs"].push(eAbbr);
	engines["img"].push(eImg);
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

addGlobalStyle('.mbCont {display:none;} .rname:hover .mbCont, .rname:focus .mbCont, .title:hover .mbCont, .title:focus .mbCont {display:inline} mbCont img {width:16px; height:16px; border:none;');
addGlobalStyle('#mbzsOptBox {position:fixed; top:100px; left:150px; width:75%; background-color:#736DAB; color:white; -moz-border-radius:20px; margin:20px;} #mbzsOptBox form { margin: 5px;} #mbzsOptBox ul {list-style:none; margin:5px 10px; padding:0; -moz-column-count:3} #mbzsOptBox li {padding:5px, margin:0;}');
addGlobalStyle('#mbzsBar {position:fixed; bottom:0px; right:0px; background-color:#736DAB; color:white; -moz-border-radius-topleft:10px; padding-left:4px;} #mbzsBar span {color:white; cursor:pointer;}');


/*---------------------------*/
//Search Engines added here
/*---------------------------*/

/*
addSite("Site_Name","Search_URL", "Site_Abbreviation", [use TLD]), "Favicon_URL";
The search URL will have the artist name appended
Add new searches to the end to avoid messing up preferences
TLD magic--for localisation you can replace the top level domain (com, co.uk, etc) with TLD and pass
true as the penultimate parameter to addSite. This will replace TLD with the user set top level domain (com 
by default). eg http://www.google.TLD/search?q=
To use an image pass the url for the image (if you include this, you must pass a value for localisation, typically false)
*/

addSite("MusicBrainz artists","http://musicbrainz.org/search/textsearch.html?type=artist&limit=25&handlearguments=1&query=","MB artists",false,"http://musicbrainz.org/images/aicon.png");
addSite("MusicBrainz releases","http://musicbrainz.org/search/textsearch.html?type=release&limit=25&handlearguments=1&query=","MB releases",false,"http://musicbrainz.org/images/licon.png");
addSite("Amazon","http://www.amazon.TLD/exec/obidos/external-search/?mode=music&field-keywords=","Am",true,"http://amazon.co.uk/favicon.ico");
addSite("Google","http://www.google.TLD/search?q=","G",true,"http://www.google.com/favicon.ico");
addSite("WikiPedia","http://www.google.com/search?sourceid=navclient&q=site%3A*.wikipedia.org+","WikiPedia",false,"http://www.wikipedia.org/favicon.ico"); 
addSite("Discogs","http://www.discogs.com/search?type=all&btn=Search&q=","Discogs",false,"http://www.discogs.com/images/favicon.ico");
addSite("All Music","http://www.allmusic.com/cg/amg.dll?P=amg&x=0&y=0&opt1=1&sql=","AllMusic",false,"http://www.allmusic.com/favicon.ico");
addSite("IMDB","http://www.imdb.com/find?s=all&q=","IMDB",false,"http://www.imdb.com/favicon.ico");
addSite("CD Baby","http://cdbaby.com/found?allsearch=","CD Baby",false,"http://cdbaby.com/favicon.ico");

// Torrents
addSite("All of Mp3","http://music.allofmp3.com/search.shtml?range=all&search=","mp3",false,"http://img.allofmp3.com/img/i/favicon.ico");
addSite("Torrent Reactor","http://www.torrentreactor.net/search.php?search=cid=6&B1.x=0&B1.y=0&words=","TR",false,"http://www.torrentreactor.net/favicon.ico");
addSite("Torrentspy","http://torrentspy.com/search?query=","TSpy",false,"http://www.torrentspy.com/favicon.ico");
addSite("The Pirate Bay","http://thepiratebay.org/search.php?audio=on&q=","TPB",false,"http://thepiratebay.org/favicon.ico");
addSite("MiniNova","http://mininova.org/search/?search=","MN",false,"http://www.mininova.org/images/favicon.ico");
addSite("IsoHunt","http://isohunt.com/torrents.php?ihq=","IH",false,"http://isohunt.com/favicon.ico");
addSite("TorrentTyphoon","http://www.torrenttyphoon.com/loading.aspx?cat=music&q=","TYT",false,"http://www.torrenttyphoon.com/favicon.ico");

// French resources
addSite("Alapage","http://www.alapage.com/mx/?tp=L&type=3&fulltext=","Alapage",false,"http://www.alapage.com/favicon.ico");
addSite("Priceminister","http://www.priceminister.com/navigation/se/category/104724/kw/","Priceminister",false,"http://www.priceminister.com/favicon.ico");
addSite("CDMail","http://www.google.com/search?sourceid=navclient&q=site%3Acdmail.fr+","CDMail",false,"http://www.cdmail.fr/images2006/favicon.png"); 
addSite("MusicMe","http://www.musicme.com/page.php?q=","MusicMe",false,"http://www.musicme.com/favicon.ico"); 
addSite("Chapitre.com","http://www.google.com/search?sourceid=navclient&q=site%3Achapitre.com+","Chapitre.com",false,"http://www.chapitre.com/App_Themes/CHAPITRE/images/favicon.ico"); 

// Covers
addSite("CDCovers.to","http://cdcovers.to/search.php?c=1&q=","CDCovers.to",false,"http://cdcovers.to/favicon.ico"); 

// Add yours... ;-)


/*---------------------------*/
// main()
/*---------------------------*/

var mbSearchesDecorator = new MBSearchesDecorator();
if(GM_getValue("mbzsEnabled",true)) {
	mbSearchesDecorator.insertMusicLinks();
}
var mbSearchesBar = new MBSearchesCompanionBar(mbSearchesDecorator);
mbSearchesBar.create();

})();