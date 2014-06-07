// ==UserScript==
// @name           Video/Link Grabber
// @namespace      Outofhere
// @description    Grab the links and/or videos from webpages (embeded videos)
// @include        *
// ==/UserScript==



var prefs = function prefSet() {
	readLinks = true;
	readEmbed = true;
	
	readOnLoad = false;
	saveLinks = false;
}


function showLinks() {
	var fixedLinks = "";
	var theURL = new Array();
	var linkList = "";
	
	if(document.getElementById('GmonkeyAdded').style.visibility == 'hidden') {
		decodeEmbed();
		getLinks();
		document.getElementById('GmonkeyAdded').value = "Links From: " + document.title + "\nUrl: " + window.location.href + "\n" + fixedLinks + "\n" + linkList;
		document.getElementById('GmonkeyAdded').style.visibility = 'visible';	
		document.getElementById('gMButton').textContent = 'x';
		document.getElementById('gMPrefButton').style.visibility = 'visible';
	}else {
		document.getElementById('GmonkeyAdded').style.visibility = 'hidden';
		document.getElementById('gMPrefButton').style.visibility = 'hidden';
		document.getElementById('gMButton').textContent = '+';
	}
	
	function getLinks() {
		var links = new Array("megavideo.com", "veoh.com");

		var allA, cLink, i, x, xp='';
		for(e in links) {
			if(e!=links.length-1) {xp += "//a[contains(@href, '"+links[e]+"')] | ";}
			else {xp += "//a[contains(@href, '"+links[e]+"')]";}
		}
		allA = document.evaluate(xp,document,null,7,null);
		for(i=0; i<allA.snapshotLength; i++) {
			if(allA.snapshotItem(i) != undefined)
			linkList += (allA.snapshotItem(i) + "\n");
		}
	}

	
	
	function getEmbed() {
	allLocations = document.evaluate(
    "//object[@data] | //embed",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);	
	
	
	for(var i = 0; i < allLocations.snapshotLength; i++) {
	thisLocation = allLocations.snapshotItem(i);
	
	//how to get URL information depends on what kind of tags are used to embed the video
	switch (thisLocation.nodeName.toUpperCase()) {
        case 'OBJECT':
			
			theURL[i] = thisLocation.data;
			break;
		
		case 'EMBED':
		
			theURL[i] = thisLocation.src;
			break;
		
	}
	}
}


	function decodeEmbed() {
		getEmbed();
		var temp;
		for(i = 0; i < theURL.length; i++)
		{
			if(((theURL[i].split("/"))[2]) == "www.veoh.com") {
				temp = (theURL[i].split("permalinkId="))[1]
				fixedLinks += "http://www.veoh.com/videos/" + (temp.split("&"))[0] + "\n";
			}else if(((theURL[i].split("/"))[2]) == "www.megavideo.com" ) {
				temp = (theURL[i].split("v?="))[1];
				fixedLinks += "http://www.megavideo.com/?v=" + temp + "\n";
			}else {
				fixedLinks += "Could not fix link:" + theURL[i] + "\n";
			}
		}
	}


}

function pref() {
	if(!document.getElementById('gMPrefs')) {
		var prefPage = '<form>Save Links (from page to page)<br><input type="radio" name="saveLinks" value="true" />Yes<br><input type="radio" name="saveLinks" value="false" />No<br><br>Instert Links (doesnt matter if you dont save links)<br><input type="radio" name="instertLinks" value="before" />Before<input type="radio" name="instertLinks" value="after" />After<br><br>Get Links (if you choose on load it will get links from every page you visit that the + shows up on)<br><input type="radio" name="getLinks" value="open" />On Open (when you click the +)<input type="radio" name="getLinks" value="load" />On Load (when the + shows up)<br><br>Get What?<br>Embed<input type="checkbox" name="getWhat" value="embed" /><br>Links<input type="checkbox" name="getWhat" value="links" /><br><br>Get Links To (ignore if you didnt check get links)<br>Megavideo<input type="checkbox" name="getLinksTo" value="mv" /><br>Veoh<input type="checkbox" name="getLinksTo" value="ve" />';
		var iframe = document.createElement('iframe');
		iframe.setAttribute('style', 'position:fixed; z-index:9998; bottom:3em; left:2em; border:0; margin:0; padding:0; ' + 'overflow:hidden;');
		iframe.src = 'about:blank';
		iframe.setAttribute('id', 'gMPrefs');
		document.body.appendChild(iframe);
		iframe.addEventListener("load", function() {
		var doc = iframe.contentDocument;
		doc.body.style.background = 'white';
		doc.body.innerHTML = prefPage;
		iframe.style.width = '500px';
		iframe.style.height = "500px";
		}, false);
		document.getElementById('GmonkeyAdded').style.visibility = 'hidden';
		document.getElementById('gMButton').textContent = '+';
	}else {
		if(document.getElementById('gMPrefs').style.visibility == 'hidden') {
		document.getElementById('gMPrefs').style.visibility = 'visible';
		}else {
			document.getElementById('gMPrefs').style.visibility = 'hidden';
			document.getElementById('gMPrefButton').style.visibility = 'hidden';
			updatePrefs();
			}
	}
	
	function updatePrefs() {
		//GM_setValue('prefs', prefs);
	}
	
	
	
}
	


//add the + and script to popup window
var head, script;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = showLinks;
head.appendChild(script);

script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = pref;
head.appendChild(script);

var a = document.createElement('a');
a.setAttribute('href', 'javascript:void(0);');
a.setAttribute('onClick', 'showLinks();');
a.setAttribute('id', 'gMButton');
a.setAttribute('style', 'color:#FFF; background:#000; font:12px arial; position:fixed; bottom:0; left:0; padding:3px; z-index: 99999;');
a.textContent = '+';
document.body.insertBefore(a, document.body.firstChild);

var a = document.createElement('a');
a.setAttribute('href', 'javascript:void(0);');
a.setAttribute('onClick', 'pref();');
a.setAttribute('id', 'gMPrefButton');
a.setAttribute('style', 'color:#FFF; background:#000; font:12px arial; position:fixed; bottom:0; left:1em; padding:3px; z-index: 99999;');
a.textContent = 'P';
a.style.visibility = 'hidden';
document.body.insertBefore(a, document.body.firstChild);

var textarea = document.createElement('textarea');
textarea.setAttribute('cols', '100');
textarea.setAttribute('rows', '10');
textarea.setAttribute('id', 'GmonkeyAdded');
textarea.setAttribute('style', 'background-color:#ffffff; color:#000000; position:fixed; bottom:0; left:0; z-index: 99999;');
textarea.style.visibility = 'hidden';
document.body.insertBefore(textarea, document.body.firstChild);

// Clear up memory
head=null; delete head;
script=null; delete script;
a=null; delete a;
textarea=null;delete textarea;