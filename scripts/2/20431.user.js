// ==UserScript==
// @name          ibl_ref
// @version      1.1
// @description   Usefulness probably limited to IBDoF Linkev Data Editors. Display the IBL number for an author/series/book link.
// @include       http://www.iblist.com/list.php?type=author*
// @include       http://www.iblist.com/author*
// @include       http://www.iblist.com/series*
// @include       http://www.iblist.com/book*
// @include       http://iblist.com/book*
// @include       http://iblist.com/series*
// @include       http://iblist.com/author*
// ==/UserScript==

/*
  DESCRIPTION
  When performing Linkdev operations it can be difficult to see the book/series id#
  Normally one would either click on the item, or hover and look on the status bar.
  This script exposes the id# alongside the entry
 
   Check for 'author/series/book' followed by a number reference
    e.g. http://www.iblist.com/book57651.htm
  Pick out the numbers following [author||series||book]
    e.g. 57651
  Print the number alongside that entry
    e.g. Ages of Chaos, the (2002) - 57651
  Apply some minimal styling
*/

/** changelog
2007-10-24
  New:
    Now cross-browser - Firefox, Opera, IE7
2008-05-05
  New:
    Now displays Edition and Manifesation id's
    Greasemonkey AUTO-UPDATE code added
*/

/**
  Main function
*/
(function () {
  var link, result, ne, name;

  if (GM_getValue) {
    // SCRIPT UPDATE CHECKER by 'Jarett' http://userscripts.org/scripts/show/20145
    var version_scriptNum = 20431; // Change this to the number given to the script by userscripts.org (check the address bar)
    var version_timestamp = 1209963910296; // (new Date()).getTime() Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
    function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand("++ " + GM_getValue("targetScriptName", "ibl_ref") + " - Manual Update Check ++", function() {updateCheck(true);}); updateCheck(false);
    // ENDS UPDATE CHECKER
  }

  link = document.getElementsByTagName('a')
  for (var i=0; i < link.length; i++) {
    name = false;
    if (/(author|series|book)/.test(link[i].href)) {
      result = link[i].href.match(/.*(author|series|book)([0-9]*).htm?/);
    } else {
      name = true;
      result = link[i].name.match(/(man|E)(\d*)/);
    }
    if (result) {
      ne = document.createElement('span');
      ne.innerHTML = ' - ' + result[2];
      ne.style.color = '#666';
      ne.style.fontStyle = 'normal';
      ne.style.fontWeight = 'normal';
      ne.style.fontSize = '11px';
      if (!name) {
        link[i].parentNode.insertBefore(ne, link[i].nextSibling)
      } else {
        link[i].parentNode.appendChild(ne);
      }
    }
  }
})(); 