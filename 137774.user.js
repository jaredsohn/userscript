// ==UserScript==
// @name        Chat Shoutbox para LLD14
// @namespace   http://userscripts.org/scripts/show
// @include     http://uni60.ogame.com.es/game/index.php?page=*
// @version     1
// ==/UserScript==

(function ()
{

var myshoutboxID = "******";

// var usernameText = document.getElementById('playerName').getElementsByTagName("span")[0].innerHTML;
var chatHTML = '<div id="shoutboxbox"><iframe id="shoutbox" src="http://' + myshoutboxID + '.myshoutbox.com/" width="180" height="300" frameborder="0" allowTransparency="true"></iframe></div>'

var targetElement = document.getElementById('menuTable');
var origHTML = targetElement.innerHTML;

targetElement.innerHTML = chatHTML + origHTML;
}
) ();
