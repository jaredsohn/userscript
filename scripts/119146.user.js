// ==UserScript==
// @name        Play Mp3 with Yahoo
// @exclude     https://mail.google.com/*
// ==/UserScript==


var t = setTimeout(function() {

var o=document.createElement("script");
o.type="text/javascript";
o.src="http://mediaplayer.yahoo.com/js";
document.body.appendChild(o);
}, 500)



//<script type="text/javascript" src="http://mediaplayer.yahoo.com/js"></script>