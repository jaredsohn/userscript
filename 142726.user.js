// ==UserScript== 
// @name           World.php Roomid
// @namespace      http://quiver.outwar.com
// @include        http://*.outwar.com/world.php*
// ==/UserScript== 

setInterval(function(){document.title = "Room: " +curRoom},50);
