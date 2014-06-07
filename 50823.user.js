// ==UserScript==
// @name           Facebook Odkazy (Shortcuts)
// @namespace      fbx
// @description    Plugin for Facebook, which allows to "status" bar to insert links.
// @include        http://*.facebook.com/* 
// @author         Pavel ViPPeR Pech
// ==/UserScript==
	
var links;
var currentLang = null;
var buttons = null;
var groupRE = new RegExp("^/group\.php\.*$", "gi");

var supportedLangs1 = new Array(2);
supportedLangs1[0] = "en";
supportedLangs1[1] = "cs";

var localizedStrings = new Array(2);
localizedStrings["en"] = new Array(2);
localizedStrings["en"]["Clear"] = "Clear shortcuts";
localizedStrings["en"]["ClearQuestion"] = "Are yeu sure?";
localizedStrings["en"]["AddShortcut"] = "Add shortcut";
localizedStrings["en"]["ShortcutAdded"] = "Shortcut added";
localizedStrings["en"]["ShortcutExists"] = "Shortcut exists";
localizedStrings["en"]["ShortcutNotAdded"] = "Shortcut not added. Allowed only for groups.";
localizedStrings["en"]["RemoveShortcut"] = "Remove shortcut";
localizedStrings["en"]["ShortcutRemoved"] = "Shortcut removed";
localizedStrings["en"]["ShortcutNotRemoved"] = "Shortcut not exists";
localizedStrings["cs"] = new Array(2);
localizedStrings["cs"]["Clear"] = "Vycistit odkazy";
localizedStrings["cs"]["ClearQuestion"] = "Ses si jisty?";
localizedStrings["cs"]["AddShortcut"] = "Pridat odkaz";
localizedStrings["cs"]["ShortcutAdded"] = "Odkaz pridan";
localizedStrings["cs"]["ShortcutExists"] = "Odkaz jiz existuje";
localizedStrings["cs"]["ShortcutNotAdded"] = "Odkaz nebyl pridan. Muzete pridat odkaz pouze pro skupiny.";
localizedStrings["cs"]["RemoveShortcut"] = "Odebrat odkaz";
localizedStrings["cs"]["ShortcutRemoved"] = "Odkaz odebran";
localizedStrings["cs"]["ShortcutNotRemoved"] = "Odkaz neexistuje";

var plusIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFQ1uSf5O8oK7P7O/1////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+PZ4gAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAADVJREFUGFdjYEQBDIwsSICJKC4DA1gLTDEKlwEMILLMzMwQLpAB4YIEwBQOLlgOIYuLy4QCANkyAgHYN2TKAAAAAElFTkSuQmCC";

var minusIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFQ1uSf5O8oK7P7O/1////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+PZ4gAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAChJREFUGFdjYEQBDIwsSICJYi4DGACNBBrFzMwM4QIZEC4cUMZlQgEA5SYCHTxnBUUAAAAASUVORK5CYII%3D";

function getLocalizedString(key) {
  return localizedStrings[currentLang][key];
}

function addShortcut() {
	var url = getValidUrl();
	if(url.match(groupRE))
	{
		for(var i = 0; i < links.length; i++) {
			if(links[i][0] == url) {
				alert(getLocalizedString("ShortcutExists"));
				return;
			}
		}
		
		var pi = document.getElementById("profileimage");
		
		if(pi == null)
			return;
		
		var piIMG = pi.childNodes[0];
		
		if(piIMG == null)
			return;
		
		links.push(new Array(url, piIMG.src));
		saveLinks();
		
		alert(getLocalizedString("ShortcutAdded"));
	}
	else
	{
		alert(getLocalizedString("ShortcutNotAdded"));
	}
}

function removeShortcut() {
  var removed = false;
	var x = Array();
	var url = getValidUrl();
	for(var i = 0; i < links.length; i++) {
		if(links[i][0] == url) {
			removed = true;
		}
		else {
			x.push(links[i]);
		}
	}
	links = x;
	saveLinks();
	
	if(removed)
		alert(getLocalizedString("ShortcutRemoved"));
	else
		alert(getLocalizedString("ShortcutNotRemoved"));
}

function saveLinks(){
	clearLinks();
	var s = "";
	for (var i = 0; i < links.length; i++){
		s += links[i][0] + ";" + links[i][1] + "|";
	}
	
	GM_setValue("links", s);
}

function clearLinks(){
	GM_deleteValue("links");
}
	
function loadLinks(key)
{
	links = new Array();
	var a = GM_getValue("links", "").split('|');
	for(var i = 0; i < a.length; i++)
	{
		var b = a[i].split(';', 2);
		if(b[0] != "")
			links.push(new Array(b[0], b[1]));
	}
}

function removeLinks()
{
	if(confirm(getLocalizedString("ClearQuestion"))) {
		links = new Array();
		clearLinks();
	}
}

function removeMenu()
{
	if(buttons != null)
		buttons.parentNode.removeChild(buttons);
}

loadLinks();
if(links == null)
	links = new Array();

var h = document.getElementsByTagName("html");
currentLang = window.document.childNodes[1].getAttribute("lang", "en");

var isSupported = false;
for (var i = 0; i <= supportedLangs1.length-1;  i++) {
  if (supportedLangs1[i] == currentLang) {
    isSupported = true;
    break;
  }
}

if (isSupported == false)
  currentLang = "en";

function getValidUrl(){
	return document.location.href.substring(document.location.href.lastIndexOf('/'));
}

function starter(){
	var garden = document.getElementById("presence_bar_left");
	
	if(garden == null)
		return;

	if(buttons == null) {
		buttons = document.createElement("div");
		buttons.setAttribute("id", "fbShortcuts");
		buttons.setAttribute("style", "border-left:1px solid #B5B5B5; float:left; padding-top: 1px;");
		garden.appendChild(buttons);
	}
	
	while(buttons.hasChildNodes()){
		buttons.removeChild(buttons.lastChild);
	}
	
	var url = getValidUrl();
	var canAdd = url.match(groupRE);
	var isAdded = false;
	
	for(var i = 0; i < links.length; i++){
		var linkButton = document.createElement("div");
		linkButton.setAttribute("style", "float:left;");
		var linkButtonAnchor = document.createElement("a");
		linkButtonAnchor.setAttribute("style", "display: block; width: 16px; height: 16px; padding: 4px 5px 5px;");
		linkButtonAnchor.setAttribute("href", links[i][0]);
		var linkButtonIcon = document.createElement("img");
		linkButtonIcon.setAttribute("style", "width: 16px; height: 16px;");
		linkButtonAnchor.appendChild(linkButtonIcon);
		linkButton.appendChild(linkButtonAnchor);
		linkButtonIcon.src = links[i][1];
		buttons.appendChild(linkButton);
		
		if(url == links[i][0])
			isAdded = true;
	}
	
	if(canAdd)
	{
		var modifyButton = document.createElement("div");
		modifyButton.setAttribute("style", "float:left;");
		var modifyButtonAnchor = document.createElement("a");
		modifyButtonAnchor.setAttribute("style", "display: block; width: 16px; height: 16px; padding: 4px 5px 5px;");
		var modifyButtonIcon = document.createElement("img");
		modifyButtonIcon.setAttribute("style", "width: 16px; height: 16px;");
		modifyButtonAnchor.appendChild(modifyButtonIcon);
		modifyButton.appendChild(modifyButtonAnchor);
		
		if(isAdded)
		{
			modifyButtonAnchor.addEventListener("click", removeShortcut, false);
			modifyButtonIcon.src = minusIcon;
		}
		else
		{
			modifyButtonAnchor.addEventListener("click", addShortcut, false);
			modifyButtonIcon.src = plusIcon;
		}
		
		buttons.appendChild(modifyButton);
	}
	
	setTimeout(starter, 1000);
  return false;
}

window.addEventListener("load", starter, false);