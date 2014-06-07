// ==UserScript==
// @name           PHPBB Redirect Remover
// @description    Should work on any PHPBB install. It removes the delay between when you post and when you go back to the thread you were viewing (cuts out the please waitÂ page). I have not noticed any adverse affects on any of the PHPBB boards I frequent. If it doesnÂt work, please double check that it is running, I canÂt know the locations of all the PHPBB installs! Should be able to detect most PHPBB sites tho. This script will probably also work with the deleting page as well, just update the includes.
// @include        http://*.tld/forum/posting.php
// @include        http://*.tld/Forum/posting.php
// ==/UserScript==
var goto = "";
function isIt(i) {
goto = document.getElementsByTagName("a")[i].href;
if (goto.match("viewtopic.php") != null) {
	window.location = goto;
} else {
isIt(i + 1);
}
}
//var goto = document.getElementsByTagName("a")[29].href;
//window.location = goto;
isIt(1);