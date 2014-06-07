// ==UserScript==
// @name           Bux.to auto close ad
// @namespace      http://www.Tenfold.co.nr
// @description    Auto closes the ad when it's done
// @include        http://*bux.to/view.php?ad=*
// @author         Tenfold
// ==/UserScript==

// ==UserScript==
// @name           Bux.to auto close ad
// @namespace      http://www.Tenfold.co.nr
// @description    Auto closes the ad when it's done
// @include        http://*bux.to/view.php?ad=*
// @author         Tenfold
// ==/UserScript==

function start()
{
setTimeout("window.close();", 41500);
}

if (document.addEventListener) {
window.addEventListener("load", start, false);
}
else {
window.document.onLoad = start();
}