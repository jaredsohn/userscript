// ==UserScript==
// @name         Zango remover
// @namespace     Peter Griffin
// @description   You know what really grinds my gears? Watching online TV, but every time I click a new link, for example on TV-links, you get such an annoying Zango ad. Nobody will use it if it's that frggin' annoying.
// @include       *
// ==/UserScript==

/*
Oh there's one thing sucking about this script:
it doesn't check wether it's on the page or not. If it is, fine. It get's removed.
If it's not, the fucntion still gets called. If you BugZilla it will say there's two errors.
If you don't use it, you won't get any problems.

Oh, by the way, it uses timers, because if you call the function and it screws up, it won't
execute any of the script. This is a cheap but working solution.
*/

setTimeout("document.getElementById('pog_background_protect').style.display='none';",10);
setTimeout("document.getElementById('pog_template_container').style.display='none';",10);
