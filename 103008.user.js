// ==UserScript==
// @name          Fp logo changer
// @namespace     http://jaycee.game=host.org:8000
// @description   Changes fp logo to a bigger one
// @include       http://*.facepunch*.com/*
// ==/UserScript==

document.getElementById("logo").innerHTML = '<a name="top" href="forum.php"><img src="http://i54.tinypic.com/282ksww.png" alt="Facepunch" title="Facepunch"></a>';
