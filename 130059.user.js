// ==UserScript==
// @name           Youtube Earth Day Erry Day
// @namespace      userscripts.org/users/yotaxp
// @author         YotaXP
// @description    Adds the Youtube Earth Day switch to Youtube year-round.
// @version        1.0
// @include        /https?://www\.youtube\.com/($|watch|results|channels|my_|view_all_playlists|videos|music|movies|shows|trailers|live|sports|education|news)/
// ==/UserScript==

(function () {
    function toggleEarthHour() {
        var cssId = "earth-hour-css";
        var tag = document.getElementById(cssId);
        if (tag) {
            tag.parentNode.removeChild(tag);
            GM_setValue("ytEarthDayTheme", false);
        } else {
            tag = document.createElement('link');
            tag.rel = 'stylesheet';
            tag.id = cssId;
            tag.href = "//dl.dropbox.com/u/939405/perm/ytea/2012_earth_hour.css";
            document.getElementsByTagName('head')[0].appendChild(tag);
            GM_setValue("ytEarthDayTheme", true);
        }
    }
    
    var tag = document.createElement('link');
    tag.rel = 'stylesheet';
    tag.href = "//dl.dropbox.com/u/939405/perm/ytea/2012_earth_hour_prep.css";
    document.getElementsByTagName('head')[0].appendChild(tag);
    
    if (GM_getValue("ytEarthDayTheme")) toggleEarthHour();
    
    var div = document.getElementById("earth-hour-switches");
    if (div) div.parentNode.removeChild(div);
    
    var divP = document.getElementById("watch-headline");
    if (!divP) divP = document.getElementById("masthead");
    if (divP) {
      div = document.createElement("div");
      div.id = "earth-hour-switches";
      div.innerHTML = '<a id="earth-hour-switch-on" title="Toggle the lights."><div></div></a><a id="earth-hour-switch-off" title="Toggle the lights."><div></div></a>';
      div.onmousedown = toggleEarthHour;
      divP.insertBefore(div, divP.firstChild);
    }
})();
