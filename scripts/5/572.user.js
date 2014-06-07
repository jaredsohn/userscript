// ==UserScript==
// @name          Slashdot No Games
// @namespace     http://anvard.org/userscripts
// @include       http://*slashdot.org/*
// @description   Removes games prefix from Slashdot links
// ==/UserScript==

(function() {
    for (var i = 0; i < document.links.length; i++) 
    {
      var ln = document.links[i];
      ln.href = ln.href.replace(/games\.slashdot\.org/g, "slashdot.org");
    }

})();
