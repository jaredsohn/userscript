// ==UserScript==
// @name           4chan word defilterer by !./lC9VnWyM
// @namespace      none
// @description    defilter teh chans
// @include        *4chan.org/*
// @exclude        *4chan.org/f/*
// ==/UserScript==
(function() {
    var body = document.getElementsByTagName('body')[0];
    body.innerHTML = body.innerHTML.replace(/PENIS/g, "</span>PENIS");
    body.innerHTML = body.innerHTML.replace(/missingno/g, "</span>moot");
    body.innerHTML = body.innerHTML.replace(/the people's champions/g, "</span>mods");
    body.innerHTML = body.innerHTML.replace(/candy-ass/g, "</span>faggot");
    body.innerHTML = body.innerHTML.replace(/jabronis/g, "</span>brony");
    body.innerHTML = body.innerHTML.replace(/steve jobs/g, "</span>ponies");
    body.innerHTML = body.innerHTML.replace(/roody-poo/g, "</span></span>nigger");
    body.innerHTML = body.innerHTML.replace(/newt gingrich/g, "</span></span>4chan");
    body.innerHTML = body.innerHTML.replace(/VAGINA/g, "</span>VAGINA"); 
    body.innerHTML = body.innerHTML.replace(/youtube/g, "jewtube");
    body.innerHTML = body.innerHTML.replace(/swf/g, "nope");

})();