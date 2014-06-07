// ==UserScript==
// @name            Piratepad Chat Notifier
// @namespace       bpwned
// @version         0.1
// @author          Alexander 'b.pwned' Bock
// @description     Notify of new chat messages in classic piratepad
// @match           http://*.piratenpad.de/*
// @match           https://*.piratenpad.de/*
// @updateVersion   1
// ==/UserScript==


idtocheck = "chatlines";
lastcontent = ''
tmptitle = document.title;

function checkchat() {
    div = document.getElementById(idtocheck);
    if (div == null) return;
    if (lastcontent == '') {
        lastcontent = div.innerHTML;
        return;
    }
    if (lastcontent != div.innerHTML) {
        document.title = document.title + ' new chat messages';
        lastcontent = div.innerHTML;
        window.setTimeout(restoreTitle, 50);
    }
}

function restoreTitle() {
    document.title = tmptitle;
}

window.setInterval(checkchat, 2000);