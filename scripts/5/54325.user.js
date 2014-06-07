// ==UserScript==
// @name           epenis.nl
// @namespace      http://www.somethingafal.com/
// @description    An epenis script to get a persons calculated "epenis" and shows it on their page. Inspired by epenis.nl.
// @include        http://www.twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==
(function() { 
    var followers = document.getElementById("follower_count").innerHTML;
    var following = document.getElementById("following_count").innerHTML;
    var epenis = Math.round((followers/following)*15*100)/100;
    var update = "<br />e-penis: "+epenis+"cm";
    document.getElementById("profile").innerHTML += update;
    var inches = Math.round((followers/following)*0.393700787*15*100)/100;
    var update = "<br />That's "+inches+" inches";
    document.getElementById("profile").innerHTML += update;
})();