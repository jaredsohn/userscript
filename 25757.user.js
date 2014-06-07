// ==UserScript==
// @name           MusicBrainz - Import Last.FM tags
// @namespace      mb
// @description    Import Last.FM tags
// @include        http://*musicbrainz.org/artist/*
// @include        http://*musicbrainz.org/show/artist/*
// ==/UserScript==

(function () {

// Script Update Checker
// -- http://userscripts.org/scripts/show/20145
var version_scriptNum = 25757; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1213392938180; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
try {
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);
} catch(e) {}

GM_xmlhttpRequest({
  method:"GET",
  url:'http://ws.audioscrobbler.com/1.0/artist/' + document.title.substr(8, (document.title.lastIndexOf('-')) - 9) +'/toptags.xml',
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/monkey,text/xml",
    },

  onload:function(details) {
	var xmlDoc = new DOMParser().parseFromString(details.responseText,"text/xml");
	var names = xmlDoc.documentElement.getElementsByTagName("name");
	var divs = document.getElementsByTagName("div")

	for (var j =0; j < divs.length; j++) {
		if (divs[j].className == "RelationshipBox") {
			divs[j].innerHTML += "<br /><h3>Imported Last.FM Tags:</h3>";
			for (var i = 0; i < 20; i++) {
				if (names[i].childNodes[0]) {
					divs[j].innerHTML += '<nobr><a href="http://musicbrainz.org/show/tag/?tag=' + names[i].childNodes[0].nodeValue + '">' + names[i].childNodes[0].nodeValue + '</nobr></a>, ';
				}
			}
		}
	}

  }

});

})();