// ==UserScript==
// @name           LUEser First Names
// @namespace      TheAmazingOne@gamefaqs.com
// @description    Adds first names to LUE
// @include        http://www.gamefaqs.com/boards/402-*
// @version        1.0
// ==/UserScript==
//
//   LUEser First Names script
//   Author: The Amazing One (the.amazing.one@gmail.com)
//
//   This script adds the first name of LUEsers next to their usernames. To
//   get your first name added, removed, or changed, ask me on LUE. If you
//   can't find me on LUE, shoot me an e-mail.
// __________________________________________________________________________

var updateNamesTime = parseInt(GM_getValue("updateNames", 0));
if (updateNamesTime <= (new Date().getTime()))
  updateNames(false);
var names = getNames();

GM_registerMenuCommand('LUEser First Names - Update names', function(){ updateNames(true); });

if (/\/boards\/.*\/[0-9]+/.test(window.location.href)) {
  var allLinks = docEval('//table[@class="board message"]//a[@href]');
  for (var i = 0; i < allLinks.snapshotLength; i++) {
    var userLink = allLinks.snapshotItem(i);
    if (!userLink.href.match(/user\.php.*user=[0-9]+/))
      continue;
    var username = userLink.textContent;
    if (names[username] != undefined) {
      var nameNode = document.createTextNode(" (" + names[username] + ")");
      setTimeout(function(nameNode, userLink) { return function() {
        insertAfter(nameNode, userLink);
      };}(nameNode, userLink), 0);
    }
  }
}

if (/\/boards\/[^\/]+$/.test(window.location.href)) {
  var tlUsernames = docEval("//table[@class='board topics']//tr[not(@class='head')]/td[3]/text()");
  for (var i = 0; i < tlUsernames.snapshotLength; i++) {
    var username = tlUsernames.snapshotItem(i);
    if (names[username.nodeValue] != undefined)
      username.nodeValue = username.nodeValue + " ("+ names[username.nodeValue]+")";
  }
}

function updateNames(getConfirm) {
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://www.princeton.edu/~eferreir/names.txt?"+(new Date().getTime()),
    onerror: function(response) {
      // Try again in an hour
      GM_setValue("updateNames", (new Date().getTime()) + 3600000 + "");
      if(getConfirm)
         alert("Unable to update names. Please try again later.");
    },
    onload: function(response) {
      // Next update in 24 hours
      GM_setValue("updateNames", (new Date().getTime()) + 86400000 + "");
      GM_setValue("names", response.responseText);
      if(getConfirm)
        alert("Names were successfully updated.");
    }
  });
}

function getNames() {
  var result = new Array();
  var names = GM_getValue("names", "").split("\n");
  var trim = /^\s+|\s+$/g;
  for(var i = 0; i < names.length; i++) {
    var parse = names[i].split(": ");
    if(parse[1] != undefined)
      result[parse[0]] = parse[1].replace(trim, "");
  }
  return result;
}

function insertAfter(elemToInsert, node) {
   node.parentNode.insertBefore(elemToInsert, node.nextSibling);
}

function docEval(str) {
  return document.evaluate(
    str,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
}

//---------------------------------------------------------------------------
// Check for updates
// 
// Much thanks to Jarett - http://userscripts.org/users/38602 - for the code
//---------------------------------------------------------------------------
var version_scriptNum = 82743;
var version_timestamp = 1280666436201;
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/&#x000A;/g,"\n").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);
