// ==UserScript==
// @name           garena dark orbit
// @namespace      whatisthisfor
// @description    first attemp to make garena's dark orbit more plaintext like & also autorefresh.
// @include        http://darkorbit.game.garena.com/indexInternal.es?action=*
// ==/UserScript==

window.ourheader = null;
window.ticks = 60;

window.dotick = function() {
 window.ticks--;
 if (window.ticks == 0) {
  window.location.href=window.location.href;
 }
 if (window.ourheader != null)
  window.ourheader.innerHTML = "refreshing in " + window.ticks;
 window.setTimeout(dotick,1000);  
}

function main() {
GM_log("script starts");
if (!/internalMapRevolution/.test(document.href))
 window.setTimeout(dotick,1000);
 
var iframes = document.getElementsByTagName("iframe");
  for(i in iframes)
  {
    iframes[i].innerHTML = "fu.";
  }
 
 var topnav = document.getElementById("topnav");
 if (topnav != null) {
  myregexp = new RegExp("uid=(.*?)&amp;rank=(.*?)&amp;lvl=(.*?)&amp;xp=(.*?)&amp;cred=(.*?)&amp;xcred=(.*?)&amp;ouser=(.*?)&amp;");
  matches = myregexp.exec(topnav.innerHTML);
  
  topnav.innerHTML = "\
  <br>\
  <center>\
  <a href='/indexInternal.es?action=internalStart'>home</a> |\
  <a href='/indexInternal.es?action=internalDock'>hangar</a> |\
  <a href='/indexInternal.es?action=internalGalaxyGates'>galaxy gate</a> |\
  <a href='/indexInternal.es?action=internalHandel'>trade</a> |\
  <a href='/indexInternal.es?action=internalSkylab'>skylab</a> |\
  <a href='/indexInternal.es?action=internalClan'>clan</a> |\
  <a href='/indexInternal.es?action=internalPayment'>credits</a> |\
  <a href='/indexInternal.es?action=internalQuestJobs'>quest</a> |\
  <a href='javascript:void(0)' onclick='openMiniMap(820,653);'>start?</a>|\
  </center><br>";
  if (matches.length > 0)
  {
   topnav.innerHTML += "uid = " + matches[1] + " ";
   topnav.innerHTML += "rank = " + matches[2] + " ";
   topnav.innerHTML += "level = " + matches[3] + " ";
   topnav.innerHTML += "exp = " + matches[4] + " ";
   topnav.innerHTML += "creds = " + matches[5] + " ";
   topnav.innerHTML += "uri = " + matches[6] + " ";
   topnav.innerHTML += "on users = " + matches[7] + " ";
  }
  }
	window.ourheader = document.body.insertBefore(document.createElement('div'), document.body.firstChild )
	window.ourheader.style.marginLeft = window.ourheader.style.marginTop = "1em"
	window.ourheader.innerHTML="hello world";
	//window.ourheader.appendChild(document.createElement('span')).innerHTML="hello!";

GM_log("script ends.");

};

main();