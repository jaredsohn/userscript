// ==UserScript==
// @name            Fix External Links in OWA for usage with fluid.app
// @namespace       http://blog.ginader.de/dev/fix-external-links.owa.fluid.user.js
// @description     Removes the redirection of the External Links in Outlook Web Access to allow them to be opened in default Browser without logging in
// @include         https://*/exchange/*
// ==/UserScript==

var links = document.getElementsByTagName('a');
for(var i=0,l=links.length;i<l;i++){
    var link = links[i];
    if(link.href.indexOf('/exchweb/bin/redir.asp?URL=') > -1){
        var tmp = link.href.split('?URL=');
        var a = tmp[1];
        link.href = a;
    }
}
