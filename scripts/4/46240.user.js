// ==UserScript==
// @name           Clean Mininova 0.1
// @namespace      xpsdeset
// @description    Removes All Adds from mininova
// @include        http://*.mininova.org/*
// ==/UserScript==

var e=document.getElementById('adspot-a');if(e){e.parentNode.removeChild(e);};
var e=document.getElementById('adspot-b');if(e){e.parentNode.removeChild(e);};
var e=document.getElementById('adspot-c');if(e){e.parentNode.removeChild(e);};
var e=document.getElementById('adspot-d');if(e){e.parentNode.removeChild(e);};
var e=document.getElementById('sidebar');if(e){e.parentNode.removeChild(e);};
var e=document.getElementById('banner-toolbar');if(e){e.parentNode.removeChild(e);};

