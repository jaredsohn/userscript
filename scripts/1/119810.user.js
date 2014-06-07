// ==UserScript==
// @name           The-West Map debugger
// @include        http://*.the-west.*
// @version        1.0
// @author         Jaroslav Jursa, The-West game nick: Blood Killer
// ==/UserScript==

new function debugMap(){
setInterval('if(WMap.mapData.data.toSource()=="({})"){WMap.mapData = new MapData(); WMap.scroll_map_to_pos(pos.x, pos.y, true);};', 3000);
setTimeout('if(WMap.mapData.data.toSource()=="({})"){WMap.mapData = new MapData(); WMap.scroll_map_to_pos(pos.x, pos.y, true);};', 2000);
};