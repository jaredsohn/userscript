// ==UserScript==
// @name          MusicBrainz.org Searches
// @namespace     http://www.norcimo.com/fun/greasemonkey
// @description   Shows links to search various sites when viewing MusicBrainz.org
// @include       http://musicbrainz.org/*
// ==/UserScript==



//See the end of the script for adding more engines

/* Based on the last.fm searches version at the request of Aaron Cooper */

/* 2006-12-12 v1.0 Search Engines cleaned up. Now with optional loading of favicons rather than abbreviations (kudos to Aaron Cooper for the suggestion) */
/* 2006-12-11 Initial Release */

// Includes options dialogue to choose which engines to display and set localised TLD


(function() 
{
	function makeSearchLinksMB(searchTerm) {
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
				container.appendChild(newLink);
			}
		}
		return container;
	}
		
			

	function insertMusicLinks()
	{
		var tableRows=evaluateXPath(document,"//td[@class='rname']");
		var tableRows=tableRows.concat(evaluateXPath(document,"//td[@class='title']"));
		for (var tr=0; tr<tableRows.length; tr++) {
			var searchTerm=tableRows[tr].getElementsByTagName("a")[0].firstChild.nodeValue;
			searchTerm=searchTerm.replace(/ /g,"+");
			var ourLinks=makeSearchLinksMB(searchTerm);
			if (ourLinks!=null) {
				tableRows[tr].appendChild(ourLinks);
			}				
		}
	}
	
	function SelectSearches(){
		var optionsBox=document.createElement("div");
		optionsBox.id="mbzsOptBox";
		optionsBox.appendChild(document.createElement("form"));
		optionsBox.firstChild.id="mbzsfrm";
		var optionsList=optionsBox.firstChild.appendChild(document.createElement("ul"));
		for (var itor=0; itor<engines["names"].length; itor++) {
			var thisInput=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("label"));
			thisInput.appendChild(document.createTextNode(engines["names"][itor]));
			thisInput=thisInput.appendChild(document.createElement("input"));
			thisInput.setAttribute("type","checkbox");
			thisInput.id="mbzsch"+itor;
			thisInput.checked=GM_getValue("mbzs"+itor,true);
		}
		var thisTxt=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("label"));
		thisTxt.setAttribute("for","mbzsTLD");
		thisTxt.appendChild(document.createTextNode("Top Level Domain"));
		thisTxt=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("input"));
		thisTxt.id="mbzsTLD";
		thisTxt.setAttribute("type","text");
		thisTxt.setAttribute("value",GM_getValue("mbzsTLD","com"));
		thisTxt=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("label"));
		thisTxt.appendChild(document.createTextNode(" Use Images "));
		thisTxt=thisTxt.appendChild(document.createElement("input"));
		thisTxt.setAttribute("type","checkbox");
		thisTxt.id="mbzsImg";
		thisTxt.checked=GM_getValue("mbzsImg",true);
		var thisSub=optionsList.appendChild(document.createElement("li")).appendChild(document.createElement("input"));
		thisSub.setAttribute("type","submit");
		thisSub.setAttribute("value","OK");
		thisSub.id="mbzsSub";
		document.getElementsByTagName("body")[0].appendChild(optionsBox);
		document.getElementById("mbzsSub").addEventListener("click",SetSearches,true);
	}
	
	function SetSearches(event) {
		for (var itor=0; itor<engines["names"].length; itor++) {
			GM_setValue("mbzs"+itor,document.getElementById("mbzsch"+itor).checked);
		}
		if (document.getElementById("mbzsTLD").value!="") {
			GM_setValue("mbzsTLD",document.getElementById("mbzsTLD").value);
		}
		GM_setValue("mbzsImg",document.getElementById("mbzsImg").checked);
		alert(GM_GetValue("mbzsImg"));
		var optionsBox=document.getElementById("mbzsOptBox");
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
	addGlobalStyle('#mbzsOptBox {position:fixed; top:100px; left:150px; width:85%; background-color:#736DAB; color:white; -moz-border-radius:20px;} #mbzsOptBox ul {list-style:none; margin:20px 10px; padding:0; text-align:center;} #mbzsOptBox li {padding:5px, margin:0; text-align:center; display:inline;}');
	
	
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
	
	
	GM_registerMenuCommand("musicbrainz.org Searches Options", SelectSearches);
	
	insertMusicLinks();
	
})();
