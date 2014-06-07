// ==UserScript==
// @name        Show Youtube Video Length Time
// @namespace   Jefferson Scher
// @updateURL	http://userscripts.org/scripts/show/138785
// @icon        https://cdn1.iconfinder.com/data/icons/iconsweets2/40/timer.png
// @include     *youtube.com*
// @version     1.01
// ==/UserScript==

function ShowRunningTime(e){
  if (window.self != window.top) return;
  var emb = document.querySelector('#movie_player');
  if (!emb){
    window.setTimeout(ShowRunningTime, 250); // doesn't work??
    return;
  }
  var fvars = emb.getAttribute("flashvars");
  fvars = fvars.substr(fvars.indexOf("length_seconds=") + "length_seconds=".length);
  var trt = fvars.split("&")[0];
  var vidtitle = document.getElementById("watch-headline-title");
  if (trt > 0 && vidtitle){
    var min = Math.floor(parseInt(trt)/60);
    var sec = parseInt(trt) - (min * 60);
    vidtitle.appendChild(document.createTextNode(" (runtime: " + min + ":" + sec + ")"));
  }
}
ShowRunningTime();