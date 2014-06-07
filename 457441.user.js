// ==UserScript==
// @name       OpenSubtitles.org - Uncheck 'Use OpenSubtitles Download Manager' checkbox on page load
// @namespace  http://userscripts.org/users/menixator
// @version    0.1
// @description  Unchecks that annoying 'Use OpenSubtitles Download Manager' checkbox over at opensubtitles.org whenever a subtitle page loads.
// @match      http://www.opensubtitles.org/en/subtitles/*/*
// @run-at		document-start
// @copyright  2014, Menixator
// ==/UserScript==
var id, interval;

interval = 100; // This decides how fast the interval function is run. If the speed at which the checkbox unticks is too slow, decrease this.
id = setInterval(function(){
    if (document.querySelectorAll("#cbDownloader").length > 0){
        document.querySelectorAll("#cbDownloader")[0].checked = false;
        clearInterval(id);
    }
}, interval)