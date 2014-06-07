// ==UserScript==
// @name            Onlinekosten Forum Old Style
// @description     Displays the www.onlinekosten.de/forum in the honorable old style up to November 2005: remove navigation bar on left. Additionally, select user information to be displayed on the left in your onlinekosten vbulletin user configuration
// @include         http://www.onlinekosten.de/forum/*
// ==/UserScript==
// works as of June 2008

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

    addGlobalStyle('#ok-page #ok-p-content #ok-p-c-s2 {	margin-left: 12px !important ; }\n#ok-p-c-s1 { display: none !important ; }');

    var a = document.getElementsByTagName('a');
    for(var i=0; i<a.length; i++){
        if(a[i].className == 'txtad'){
            var p = a[i].parentNode;
            var r = document.createElement('span');
            r.innerHTML = a[i].innerHTML;
            p.replaceChild(r,a[i]);
            i--;
        }
    }
