// ==UserScript==
// @name        TA Chat UI Mod
// @namespace   com.tacui
// @include     http://www.trueachievements.com/chat.aspx
// @version     1.2
// ==/UserScript==

var HOUR = 36000000;	// 36000000 milliseconds in 1 hour
setInterval(function() { refreshGraphics() }, HOUR);

var version = 1.02;
var onlineversion = 1.02;
var oPrefs = getCookie("ChatPreferences");

var modcolour = true;	// CHANGE THIS TO TRUE IF YOU WANT TO FIX MOD TEXT TO BLACK, IT WILL HOWEVER GIVE MODS BLUE NAMES

if(oPrefs == null || oPrefs == "") {
	oPrefs = "checked,checked,checked";
	setCookie("ChatPreferences", oPrefs, 365);
}
var aPrefs = oPrefs.split(",");

var maincontent = document.getElementById("main");	// get main content div object
var settings = document.createElement("DIV");
var divChatHolder = document.getElementById("divChatHolder");

var settings_visible = false;

settings.className = "bigtext";
settings.style.cssFloat = "right";
settings.style.cursor = "pointer";
settings.innerHTML = "<a>Settings</a>";
settings.addEventListener("click", function() { settingsClicked() }, true);

maincontent.insertBefore(settings, maincontent.childNodes[2]);

var update = document.createElement("DIV");
update.className = "bigtext";
update.style.cssFloat = "right";
update.innerHTML = "..";
//update.innerHTML = "Version " + version;
//	if(onlineversion > version) {
//		update.innerHTML += " (Update available)";
//	}
maincontent.insertBefore(update, maincontent.childNodes[1]);



/*
	create settings DIV
*/

var settingscontainer = document.createElement("DIV");
settingscontainer.className = "bigtext";

settingscontainer.innerHTML = "<p><input type=\"checkbox\" id=\"icons\" " + aPrefs[0] + " /> Icons</p>";
settingscontainer.innerHTML += "<p><input type=\"checkbox\" id=\"smileys\" " + aPrefs[1] + " /> Smileys</p>";
settingscontainer.innerHTML += "<p><input type=\"checkbox\" id=\"g_refresh\" " + aPrefs[2] + " /> Refresh graphics once per hour</p>";

var isIcons = true;
var isSmilies = false;

/* ICONS and SMILIES */
var iconurl = "http://www.trueachievements.com/forum/viewthread.aspx?threadid=2630215";
var smileurl = "http://www.trueachievements.com/forum/viewthread.aspx?threadid=2639288";

var iconobj = {};
var smileobj = {};

var firstrun = true;


document.getElementById("divChatList").addEventListener("DOMSubtreeModified", function() {getChatList()}, true);

var chatbody = document.getElementById("divChatBody");
chatbody.addEventListener("DOMSubtreeModified", function() { updateSmilies() }, true);


function addNewStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

addNewStyle('.chattime {color:gray !important;}')

var xmlhttp;
if(window.XMLHttpRequest) {
	xmlhttp = new XMLHttpRequest();
} else {
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.onreadystatechange = function() {
	
	if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
		data = xmlhttp.responseText;
		
		if(isIcons) {
			var n = data.search("{ \"gamertag\":"); n--;
			var n1 = data.search("<input type=\"hidden\" name=\"txtQuickQuote2630215\"");
			var len = n1-n;
			var str = data.substr(n, len);
				
			str = "{ \"chatlist\" : " + str + " }";
			iconobj = JSON.parse(str);
			
			isIcons = false;
			isSmilies = true;

			xmlhttp.open("GET", smileurl, true);
			xmlhttp.send();

		}else if(isSmilies) {
		
			data = xmlhttp.responseText;
			var n = data.search("{ \"text\":"); n--;
			var n1 = data.search("<input type=\"hidden\" name=\"txtQuickQuote2639288\"");
			var len = n1-n;
			var str = data.substr(n, len);
			str = "{ \"smilies\" : " + str + " }";
			smileobj = JSON.parse(str);


		}
	}

};

isIcons = true;
isSmilies = false;

xmlhttp.open("GET", iconurl, true);
xmlhttp.send();



function refreshGraphics() {

	oPrefs = getCookie("ChatPreferences");
	aPrefs = oPrefs.split(",");

	if(aPrefs[2] != "checked") { return; }

	isIcons = true;
	isSmilies = false;

	xmlhttp.open("GET", iconurl, true);
	xmlhttp.send();
}


function getChatList() {

	oPrefs = getCookie("ChatPreferences");
	aPrefs = oPrefs.split(",");

	if(aPrefs[0] != "checked") { return; }

	var nodes = document.getElementById('divChatList').childNodes;
	
	for(i=0; i<nodes.length; i++) {
	
			for(x=0; x<iconobj.chatlist.length; x++) {
				if(nodes[i].innerHTML == iconobj.chatlist[x].gamertag) {
					nodes[i].style.background = "url(\"http://" + iconobj.chatlist[x].icon + "\") no-repeat scroll 0 0 transparent";
				}

			}
	
	}
	
}

function updateSmilies() {

	oPrefs = getCookie("ChatPreferences");
	aPrefs = oPrefs.split(",");

	if(aPrefs[1] != "checked") { return; }

	// this is called everytime the dom updates the divchatbody
	var flag = 0;
	
    if(smileobj.smilies.length == 0) { return; }

	
	//if(chatbody.lastChild.nodeName != "BR") { return; }
	
	var sibling = chatbody.lastChild.previousSibling;	// last child is usually <br /> so grab the sibling
	var str = sibling.nodeValue;						// the #text isn't actually an element, so grab the nodevalue
	
	if(sibling.nodeName == "#text") {					// if the nodename is #text, that's what we want
		
		var node = document.createElement("SPAN");		// create a new span element to encapsulate the #text, that way we can have images
		node.innerHTML = str;							// set the innerhtml to the text
		
		node.className = "chattext";
		
		for(i = 0; i < smileobj.smilies.length; i++) {		// now loop through all smiles and replace the bbcode with it	
			var img = "<img src=\"http://" + smileobj.smilies[i].url + "\" />";
			////node.innerHTML = node.innerHTML.split(obj.smilies[i].text).join(img);	// replaces all occurances of [bbcode] with <img />
			if(node.innerHTML.indexOf(smileobj.smilies[i].text) > -1) {
				if(flag == 0) {
					node.innerHTML = node.innerHTML.replace(smileobj.smilies[i].text, img);
					flag = 1;	// forces first smiley occurance to be replaced and none other
					break;
				}
				
			}
		}
		
		
		chatbody.replaceChild(node, sibling);			// replace the sibling with the new element
		
	} else if(sibling.nodeName == "SPAN") {
	
		if((sibling.className == "mod")||(sibling.className == "admin")) {
		
			if(modcolour) {
					sibling.style.color = "black";
					sibling.previousSibling.previousSibling.style.color = "blue";
			}
		
			for(i = 0; i < smileobj.smilies.length; i++) {		// now loop through all smiles and replace the bbcode with it	
				var img = "<img src=\"http://" + smileobj.smilies[i].url + "\" />";
				
				if(sibling.innerHTML.indexOf(smileobj.smilies[i].text) > -1) {
					if(flag == 0) {
						sibling.innerHTML = sibling.innerHTML.replace(smileobj.smilies[i].text, img);
						flag = 1;
						break;
					}
					
				}
			}	
		}
	} 
}

function settingsClicked() {
	
	if(settings_visible) {
		maincontent.removeChild(settingscontainer);
		settings_visible = false;
	} else {
		maincontent.insertBefore(settingscontainer, divChatHolder);
		settings_visible = true;
		
		var icons = document.getElementById("icons");
		var smileys = document.getElementById("smileys");
		var g_refresh = document.getElementById("g_refresh");
		
		
		icons.addEventListener("click", function() { updatePrefs(); });
		smileys.addEventListener("click", function() { updatePrefs(); });
		g_refresh.addEventListener("click", function() { updatePrefs(); });

	}
}

function updatePrefs() {
	var icons = document.getElementById("icons");
	var smileys = document.getElementById("smileys");
	var g_refresh = document.getElementById("g_refresh");

		
	
	
	var strPrefs = (icons.checked?"checked":" ") + "," + (smileys.checked?"checked":" ")+ "," + (g_refresh.checked?"checked":" ");
	
	setCookie("ChatPreferences", strPrefs, 365);
	
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
