// ==UserScript==
// @name           ek$i sözlük kimdir nedir yeni pencere aparati
// @namespace      http://userscripts.org/users/62169
// @include        http://sozluk.sourtimes.org/index.asp?*
// @include        http://sozluk.sourtimes.org/
// @include        http://sozluk.sourtimes.org/show.asp?*
// @include        http://sozluk.sourtimes.org/info2.asp?*
// @include        http://sozluk.sourtimes.org/msg.asp?*
// @include        http://sozluk.sourtimes.org/top.asp
// @include        http://sozluk.sourtimes.org/cc.asp?sec=ma*
// @include        http://www.eksisozluk.com/index.asp?*
// @include        http://www.eksisozluk.com/
// @include        http://www.eksisozluk.com/show.asp?*
// @include        http://www.eksisozluk.com/info2.asp?*
// @include        http://www.eksisozluk.com/msg.asp?*
// @include        http://www.eksisozluk.com/top.asp
// @include        http://www.eksisozluk.com/cc.asp?sec=ma*
// ==/UserScript==

const defaultwidth = 460;
const defaultheight = 420;

function replaceUserLink(userLink) {
	w = defaultwidth;
	h = defaultheight;
	try {
		w = GM_getValue("kimdirnedir_width", w);
		h = GM_getValue("kimdirnedir_height", h);
	} catch(err) { }
	if (!w) w = defaultwidth;
	if (!h) h = defaultheight;
	userLink.href = "javascript:od('" + userLink.href.replace(/info.asp/i, "info2.asp") + "'," + w + ", " + h + ")";
	userLink.removeAttribute("target");
}

try {
	GM_registerMenuCommand("kimdir nedir ayarlari", configureScript);
	} catch(err) { }

if (window.location.href.indexOf("show.asp") >= 0) {
	entries = document.getElementById("el").childNodes;
	
	for (i = 0; i < entries.length; i++) {
		buttons = entries[i].lastChild;
		links = buttons.getElementsByTagName("a");
		
		for (j = 0; j < links.length; j++) {
			if (links[j].href.match(/info.asp\?n=/i)) {
				replaceUserLink(links[j]);
			}
		}	
	}
	
} else if (window.location.href.indexOf("info2.asp") >= 0) {
	document.getElementById("panel").parentNode.parentNode.removeChild(document.getElementById("panel").parentNode);
	
} else if ((window.location.href.indexOf("top.asp") >= 0) || (window.location.href.indexOf("cc.asp?sec=ma") >= 0)) {
	links = document.getElementsByTagName("a");
	for (j = 0; j < links.length; j++) {
		if (links[j].href.match(/info.asp\?n=/i)) {
			replaceUserLink(links[j]);
		}
	}	
	
} else if (window.location.href.indexOf("msg.asp") >= 0) {
	button = document.getElementsByTagName("a")[0];
	if (button) {
		replaceUserLink(button);
	}
}

function configureScript() {
	configroot = document;
	if (document.getElementById("sozmain")) {
		configroot = document.getElementById("sozmain").contentDocument;
	}
	configurationPanel = configroot.getElementById("kimdirnedir_config");
	w = GM_getValue("kimdirnedir_width", 460);
	h = GM_getValue("kimdirnedir_height", 420);
	if (!configurationPanel) {
		maskPanel = configroot.createElement("div");
		maskPanel.id = "kimdirnedir_mask";
		maskPanel.style.cssText = "position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; background-color: black; opacity: 0.5; z-index: 10;";
		configurationPanel = configroot.createElement("div");
		configurationPanel.id = "kimdirnedir_config";
		configurationPanel.style.cssText = "padding: 5px; display: block; border: black 1px solid; position: fixed; min-width: 300px; left: 30%; top: 30%; width: 40%; background-color: #DDDDDD; z-index: 11;";
		configurationPanel.innerHTML = "<b>ek$i sözlük kimdir nedir yeni pencere aparati</b><hr />" +
			"pencere genişliği: <br /><input style='width: 90%; margin: 4px 0px 10px 0px;' id='kimdirnedir_width' value='' /><br />" +
			"pencere yüksekliği: <br /><input style='width: 90%; margin: 4px 0px 10px 0px;' id='kimdirnedir_height' value='' /><br />" +
			"<a href='http://userscripts.org/scripts/show/69542'>http://userscripts.org/scripts/show/69542</a>" +
			"<div style='margin-top: 8px; text-align: right'><button id='kimdirnedir_save' style='height: 19pt; width: 80pt; margin-right: 10px; font-size: 0.9em'>Kaydet</button>" +
			"<button id='kimdirnedir_cancel' onclick='' style='height: 19pt; width: 80pt; font-size: 0.9em'>Vazgeç</button></div>";
		configroot.body.appendChild(maskPanel);
		configroot.body.appendChild(configurationPanel);
	}
	configroot.getElementById("kimdirnedir_width").value = w;
	configroot.getElementById("kimdirnedir_height").value = h;
	configroot.getElementById("kimdirnedir_save").addEventListener("click", saveConfig, false);
	configroot.getElementById("kimdirnedir_cancel").addEventListener("click", closeConfig, false);
	
	function closeConfig() {
		configroot.body.removeChild(configroot.getElementById("kimdirnedir_config"));
		configroot.body.removeChild(configroot.getElementById("kimdirnedir_mask"));
	}
	function saveConfig() {
		GM_setValue("kimdirnedir_width", configroot.getElementById("kimdirnedir_width").value);
		GM_setValue("kimdirnedir_height", configroot.getElementById("kimdirnedir_height").value);
		closeConfig();
	}

}