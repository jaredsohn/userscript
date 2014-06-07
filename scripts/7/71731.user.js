// ==UserScript==
// @name           PUPPY WARZ
// @namespace      JOHNALD THE ROBOT IS AWESOME JUST FYI
// @description    PUPPIES? ON MY PROFILE? YOU BET YOUR ASS THERE IS!
// @include        http://*.forumwarz.com/profiles/*
// @include        http://forumwarz.com/profiles/*
// ==/UserScript==

var img = '<img src="/images/abilities/puppiez/'+(Math.floor(Math.random()*10)+1)+'.jpg" />'
document.getElementById('middle_column').innerHTML = img+document.getElementById('middle_column').innerHTML;