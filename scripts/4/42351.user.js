// ==UserScript==
// @name           Add This! Anywhere
// @namespace      http://h3xploit.com
// @description    Ever wanted to share a cool website to the world but didn't know how? With this script, you can easily email, subscribe, bookmark and share over dozens of networks!
// @include        http://*
// @include        https://*
// @exclude       *.addthis.*
// ==/UserScript==
var version_scriptNum = 42351; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1234495467250; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);



var body1 = document.getElementsByName("body");
var div =  document.createElement('div');
var addthis_pub="h3xploit";

var link = document.createElement('a');

link.setAttribute("onmouseout", 'addthis_close()');


link.setAttribute("onmouseover", "return addthis_open(this, '', '[URL]', '[TITLE]')");


link.setAttribute("onclick", 'return addthis_sendto()');

link.href= "http://www.addthis.com/bookmark.php?v=20";

link.innerHTML= '<img src="http://s7.addthis.com/static/btn/sm-share-en.gif" width="83" height="16" alt="Bookmark and Share" style="border:0"/>';

div.setAttribute("id", "boomarker123")
div.innerHTML= '<script type="text/javascript" src="http://s7.addthis.com/js/200/addthis_widget.js"></script>'

div.appendChild(link);

document.body.appendChild(div);

GM_addStyle ('#boomarker123{position:fixed;bottom:1px;left:1px;}')