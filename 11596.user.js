// ==UserScript==
// @name          Jabbim Disk Redirecting
// @namespace     www.jabbim.cz
// @description   Na neVIP Jabbim disku Vas presmeruje primo na soubor
// @include       http://disk.jabbim.cz/*/*
// ==/UserScript==

location.replace(document.getElementsByTagName('a')[1].getAttribute('href'));
