// ==UserScript==
// @name          Last.fm Searches
// @namespace     http://www.norcimo.com/fun/greasemonkey
// @description   Shows links to search various sites when viewing last.fm
// @include       http://*.last.fm/*
// @include       http://last.fm/*
// ==/UserScript==



//See the end of the script for adding more engines

/* Originally a hack by Peppe Bergqvist, based I believe on an even older script. I then developed the script to add a couple of more engines before rewriting again to get this version. I'm indebted to the userscripts.org community for help, suggestions and the occasional code snippet */

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
		if (pos == 0)
		{
			var temp = theUrl.substring(pos + searchStr.length);
			
			// Are there any more slashes? One more is ok.
			var pos = temp.indexOf("/");
			// If there are no more slashes, then success.
			if (pos == -1)
				return(true);
			temp = temp.substring(pos+1);
			
			// Is there anything left?
			return (temp == null || temp.length == 0);
		}
	}		
	
	function getNodeText(node, goDeep)
	{
		var nodeText = node.nodeValue;
		
		if (goDeep && nodeText == null && node.childNodes != null && node.childNodes.length > 0)
		{
			nodeText= "";
			
			for (var i=0; i < node.childNodes.length; ++i)
			{
				nodeText += getNodeText(node.childNodes.item(i), goDeep);	
			}
		}
		return(nodeText == null ? "" : nodeText);
	}
	
	function makeSearchLinks(musicName)
	{
		if (musicName != null && musicName.length > 0 && musicName != "Overview" && musicName != "Music")
		{
			var container = document.createElement("span");
			addClass(container,"lfmsCont");
			for (var itor=0; itor<engines["names"].length; itor++) {
				if (GM_getValue("lfms"+itor,true)) {
					//replace spaces with +
					musicName=musicName.replace(" ","+","g");
					container.appendChild(document.createTextNode(" "));
					var newLink=document.createElement("a");
					newLink.setAttribute("href", engines["urls"][itor]+escape(musicName));
					newLink.appendChild(document.createTextNode("("+engines["abbrs"][itor]+")"));
					container.appendChild(newLink);
				}
			}
			return (container);
		}
		
		return(null);
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
				var ourLinks = makeSearchLinks(getNodeText(node, true));
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
		
	//Add links for title of artist pages
	
		var header1=document.getElementsByTagName("h1");
	 	for (var i=0;i<header1.length;i++) {
			var ourClass=header1[i].getAttribute("class");
			if (ourClass.indexOf("h1artist")>=0) {
				var ourLinks=makeSearchLinks(getNodeText(header1[i], true));
				if (ourLinks) {
					header1[i].appendChild(ourLinks);
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
		var optionsBox=document.getElementById("lfmsOptBox");
		optionsBox.parentNode.removeChild(optionsBox);
		window.location.reload();
		event.stopPropagation();
		event.stopDefault();
	}
	
	function addSite(eName, eURL, eAbbr, eLoc) {
		if (!eName || !eURL || !eAbbr)
			return;
		eLoc=eLoc || false;
		if (eLoc) { //Localise TLD
			eURL=eURL.replace("TLD",GM_getValue("lfmsTLD","co.uk"));
		}
		engines["names"].push(eName);
		engines["urls"].push(eURL);
		engines["abbrs"].push(eAbbr);
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
	
	addGlobalStyle('#lfmsOptBox {position:fixed; top:110px; left:200px; background-color:#D20039; opacity:0.8; color:white; -moz-border-radius:20px} #lfmsOptBox ul {list-style:none; margin:20px; padding:0; text-align:center;} #lfmsOptBox li {padding:5px 0; margin:0; text-align:center;} .lfmsCont {font-size:0.8em;} h1 span.lfmsCont {display:inline;}');
	
	
	//Search Engines added here
	/*---------------------------*/
	
	/*
	addSite("Site_Name","Search_URL", "Site_Abbreviation",[use TLD]);
	The search URL will have the artist name appended
	Add new searches to the end to avoid messing up preferences
	TLD magic--for localisation you can replace the top level domain (com, co.uk, etc) with TLD and pass
	true as the last parameter to addSite. This will replace TLD with the user set top level domain (com 
	by default). eg http://www.google.TLD/search?q=
	*/
	
	addSite("Oink","http://oink.me.uk/browse.php?incldead=1&search=","ONK");
	addSite("The Pirate Bay","http://thepiratebay.org/search.php?audio=on&q=","TPB");
	addSite("MiniNova","http://mininova.org/search/?search=","MN");
	addSite("IsoHunt","http://isohunt.com/torrents.php?ihq=","IH");
	addSite("TorrentTyphoon","http://www.torrenttyphoon.com/loading.aspx?cat=music&q=","TYT");
	addSite("Tbot","http://www.torr-bott.com/index.aspx?txtSearch=","TB");
	addSite("Jabber Walker","http://jabberwalker.com.ar/search.php?o%5B0%5D=seeds&o%5B1%5D=desc&o%5B2%5D=1&o%5B3%5D=20&o%5B4%5D=1&o%5B5%5D=1&o%5B6%5D=1&s%5B0%5D=1&s%5B1%5D=1&s%5B2%5D=1&s%5B3%5D=1&s%5B4%5D=1&q=","JW");

	GM_registerMenuCommand("Last.fm Searches Options", SelectSearches);
	
	insertMusicLinks();
	
})();
