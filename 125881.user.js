// ==UserScript==
// @name          JLINizer
// @namespace     http://allhailthejlin
// @description   basic <a href="https://addons.mozilla.org/firefox/addon/748" target="_blank">Greasemonkey</a> script
// @include       *
// ==/UserScript==



try{
        document.body.innerHTML = document.body.innerHTML.replace(/[ \t][ei][mn]/g, " LIN");
}
catch(e){};

