// ==UserScript==
// @name          Last.fm Searches
// @namespace     http://www.norcimo.com/fun/greasemonkey
// @description   Shows links to search various sites when viewing last.fm
// @include       http://*.last.fm/*
// @include       http://last.fm/*
// ==/UserScript==



//See the end of the script for adding more engines

/* Originally a hack by Peppe Bergqvist, based I believe on an even older script. I then developed the script to add a couple of more engines before rewriting again to get this version. I'm indebted to the userscripts.org community for help, suggestions and the occasional code snippet */

// 2006-12-13 v1.4 Add support for favicons instead of abbreviations. Cleaned up search engines
// 2006-11-27 v1.3 Added a single CSS line so that it now works with the Chart Changes userscript--probably slightly more robust in general
// 2006-10-19 v1.2 General clean up. No longer duplicated links on the Title of Artist pages. Better display of links. Search links only appear on hover
// 2006-10-02 v1.1 Added more torrent engines, courtesy of redux
// Fiddled around with the design and placement of the search engine selection box

// 2006-03-22 v1.0 by norcimo http://www.norcimo.com/fun/greasemonkey/
/* Initial release

Includes options dialogue to choose which engines to display and set localised TLD

*/

(function() 
{
	function isMusicUrl(theUrl)
	{
		if (theUrl == null)
			return(false);
		
		var searchStr = "/music/";
		
		var pos = theUrl.indexOf(searchStr);
		// Is the prefix correct?
		if (pos == 0) {//link starts /music/
			//chop the rest of the url	
			var temp = theUrl.substring(pos + searchStr.length);
						//Ignore flashplayer links
			searchStr="?autostart";
			if (temp.indexOf(searchStr)>-1 && temp.lastIndexOf(searchStr)==temp.length-searchStr.length)
				return false;
			// Are there any more slashes? One more is ok.
			var pos = temp.indexOf("/");
			// If there are no more slashes, then success.
			if (pos == -1)
				return(true);
			//there was an additional slash--was it at the end?
			if (pos==temp.length-1)
				return true; //then it's ok
			else
				return false;
		}		
	}		
	
	function makeSearchLinksLFM(ourLink) {
		var searchstr="/music/";
		ourLink=ourLink.substr(ourLink.indexOf(searchstr)+searchstr.length);
		var container = document.createElement("span");
		addClass(container,"lfmsCont");
		for (var itor=0; itor<engines["names"].length; itor++) {
			if (GM_getValue("lfms"+itor,true)) {
				container.appendChild(document.createTextNode(" "));
				var newLink=document.createElement("a");
				newLink.setAttribute("href", engines["urls"][itor]+ourLink);
				if (GM_getValue("lfmsImg",true) && engines["img"][itor]) {
					newImg=newLink.appendChild(document.createElement("img"));
					newImg.setAttribute("src",engines["img"][itor]);
					newImg.setAttribute("alt",engines["abbrs"][itor]);
					newImg.setAttribute("title","Search using "+engines["names"][itor]);
				} else {
					newLink.appendChild(document.createTextNode("("+engines["abbrs"][itor]+")"));
				}
				container.appendChild(newLink);
			}
		}
		return container;
	}
		
			

	function insertMusicLinks()
	{
		var hyperlinks = document.getElementsByTagName("a");
		for (var i = 0; i < hyperlinks.length; ++i)
		{
			var node = hyperlinks[i];
			var href = node.getAttribute("href");
			if (isMusicUrl(href))
			{
				//var ourLinks = makeSearchLinks(getNodeText(node, true));
				var ourLinks=makeSearchLinksLFM(href);
				if (ourLinks != null)
				{
					addClass(node.parentNode, "lfmsPos");
					if (node.nextSibling == null) {
						node.parentNode.appendChild(ourLinks);
					} else {
						node.parentNode.insertBefore(ourLinks, node.nextSibling);
					}
				}
			}				
		}
	}
	
	function SelectSearches(){
		var optionsBox=document.createElement("div");
		optionsBox.id="lfmsOptBox";
		optionsBox.appendChild(document.createElement("form"));
		optionsBox.firstChild.id="lfmsfrm";
		var optionsList=optionsBox.firstChild.appendChild(document.createElement("ul"));
		for (var itor=0; itor<engines["names"].length; itor++) {
			var thisInput=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("label"));
			thisInput.appendChild(document.createTextNode(engines["names"][itor]));
			thisInput=thisInput.appendChild(document.createElement("input"));
			thisInput.setAttribute("type","checkbox");
			thisInput.id="lfmsch"+itor;
			thisInput.checked=GM_getValue("lfms"+itor,true);
		}
		var thisTxt=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("label"));
		thisTxt.setAttribute("for","lfmsTLD");
		thisTxt.appendChild(document.createTextNode("Top Level Domain"));
		thisTxt=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("input"));
		thisTxt.id="lfmsTLD";
		thisTxt.setAttribute("type","text");
		thisTxt.setAttribute("value",GM_getValue("lfmsTLD","com"));
		thisTxt=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("label"));
		thisTxt.appendChild(document.createTextNode(" Use Images "));
		thisTxt=thisTxt.appendChild(document.createElement("input"));
		thisTxt.setAttribute("type","checkbox");
		thisTxt.id="lfmsImg";
		thisTxt.checked=GM_getValue("lfmsImg",true);
		var thisSub=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("input"));
		thisSub.setAttribute("type","submit");
		thisSub.setAttribute("value","OK");
		thisSub.id="lfmsSub";
		document.getElementsByTagName("body")[0].appendChild(optionsBox);
		document.getElementById("lfmsSub").addEventListener("click",SetSearches,true);
	}
	
	function SetSearches(event) {
		for (var itor=0; itor<engines["names"].length; itor++) {
			GM_setValue("lfms"+itor,document.getElementById("lfmsch"+itor).checked);
		}
		if (document.getElementById("lfmsTLD").value!="") {
			GM_setValue("lfmsTLD",document.getElementById("lfmsTLD").value);
		}
		GM_setValue("lfmsImg",document.getElementById("lfmsImg").checked);
		var optionsBox=document.getElementById("lfmsOptBox");
		optionsBox.parentNode.removeChild(optionsBox);
		window.location.reload();
		event.stopPropagation();
		event.stopDefault();
	}
	
	function addSite(eName, eURL, eAbbr, eLoc, eImg) {
		if (!eName || !eURL || !eAbbr)
			return;
		eLoc=eLoc || false;
		eImg=eImg || "";
		if (eLoc) { //Localise TLD
			eURL=eURL.replace("TLD",GM_getValue("lfmsTLD","co.uk"));
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
	
	addGlobalStyle('#lfmsOptBox {position:fixed; top:160px; left:5%; width:90%; background-color:#D20039; opacity:0.8; color:white; -moz-border-radius:20px} #lfmsOptBox ul {list-style:none; margin:20px 10px; padding:0; text-align:center;} #lfmsOptBox li {padding:5px; margin:0; text-align:center; display:inline;} .lfmsCont img {width:16px !important; height:16px !important; border:none;}');
	addGlobalStyle('.lfmsCont {font-size:0.8em;} span.lfmsCont {display:inline !important;} #SecondaryNav span.lfmsCont {display:none !important;} .lfmsCont a {display:none !important;} .lfmsPos:hover .lfmsCont a, td.subject:hover .lfmsCont a {display:inline !important;} .sidebarResourceList .lfmsCont a {border:none !important;} .sidebarResourceList .lfmsCont {padding-left:2px;} .sidebarResourceList .lfmsCont a:hover {background-image:none !important;} table.barChart td.subject span.lfmsPos:hover {height:auto !important;}');
	
	
	//Search Engines added here
	/*---------------------------*/
	
	/*
	addSite("Site_Name","Search_URL", "Site_Abbreviation",[use TLD]);
	The search URL will have the artist name appended
	Add new searches to the end to avoid messing up preferences
	TLD magic--for localisation you can replace the top level domain (com, co.uk, etc) with TLD and pass
	true as the penultimate parameter to addSite. This will replace TLD with the user set top level domain (com 
	by default). eg http://www.google.TLD/search?q=
	To use an image pass the url for the image (if you include this, you must pass a value for localisation, typically false)
	*/
	
	addSite("Amazon","http://www.amazon.TLD/exec/obidos/external-search/?mode=music&field-keywords=","Am",true,"http://amazon.co.uk/favicon.ico");
	addSite("Google","http://www.google.TLD/search?q=","G",true,"http://www.google.com/favicon.ico");
	addSite("All Music","http://www.allmusic.com/cg/amg.dll?P=amg&x=0&y=0&opt1=1&sql=","All",false,"http://www.allmusic.com/favicon.ico");
	addSite("All of Mp3","http://music.allofmp3.com/search.shtml?range=all&search=","mp3",false,"http://img.allofmp3.com/img/i/favicon.ico");
	addSite("Torrent Reactor","http://www.torrentreactor.net/search.php?search=cid=6&B1.x=0&B1.y=0&words=","TR",false,"http://www.torrentreactor.net/favicon.ico");
	addSite("Torrentspy","http://torrentspy.com/search?query=","TSpy",false,"http://www.torrentspy.com/favicon.ico");
	addSite("The Pirate Bay","http://thepiratebay.org/search.php?audio=on&q=","TPB",false,"http://thepiratebay.org/favicon.ico");
	addSite("MiniNova","http://mininova.org/search/?search=","MN",false,"http://www.mininova.org/images/favicon.ico");
	addSite("IsoHunt","http://isohunt.com/torrents.php?ihq=","IH",false,"http://isohunt.com/favicon.ico");
	addSite("TorrentTyphoon","http://www.torrenttyphoon.com/loading.aspx?cat=music&q=","TYT",false,"http://www.torrenttyphoon.com/favicon.ico");
	
	GM_registerMenuCommand("last.fm Searches Options", SelectSearches);
	
	insertMusicLinks();
	
})();
