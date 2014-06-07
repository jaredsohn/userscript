// ==UserScript==
// @name           Disable espn logout
// @namespace      http://userscripts.org/users/9999
// @include        http://www.espnplayer.com/espnplayer/console
// @include        http://www.espnplayer.com/espnplayer/nhl
// ==/UserScript==
//

var script = document.createElement("script");
script.setAttribute('type','text/javascript');
script.text="function logout(){window.status='uloskirjautuminen estetty';}; function checkUserStat(type){window.status='uloskirjautuminen estetty'; return false;};";
document.body.appendChild(script); 
