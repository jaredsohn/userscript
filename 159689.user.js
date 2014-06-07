// ==UserScript==
// @name        Menüleiste in den Hintergrund
// @namespace   Grepolis
// @description Verschiebt die Menüleiste in den Hintergrund, außer die Maus fährt darüber.
// @include     http://*.grepolis.*/game/index*
// @version     1
// ==/UserScript==

(unsafeWindow || window).jQuery ('<style type="text/css">#main_menu{z-index:5}#main_menu:hover{z-index:5000}</style>').appendTo (document.head);

