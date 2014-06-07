// ==UserScript==
// @name           DiggGMTestScript
// @namespace      http://www.Dycacian.com
// @description    testing a GM script
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// ==/UserScript==

blah = document.getElementById("enclosure1");
foo = document.createElement("div");
foo.id = "foo"
foo.style.fontSize = "40px";
foo.style.color = "Red";
foo.innerHTML = "Dycacian is Awesome, but Brian taught Dycacian!!!";
blah.parentNode.insertBefore(foo, blah.nextSibling);
blah.style.border = "solid 1px #00FF00";
blah.parentNode.style.border = "solid 1px #FF0000";
