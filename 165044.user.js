// ==UserScript==
// @name           Facepunch ticker
// @description    Re-adds the ticker to facepunch.
// @version        1.1
// @match          http://facepunch.com/*
// @match          http://www.facepunch.com/*
// ==/UserScript==

$('#navbarlinks .navbarlink:eq(3)').after('<div class="navbarlink"><a href="fp_ticker.php"><img src="fp/navbar/ticker.png" alt="Ticker" title="Ticker" style=""> Ticker</a></div>');