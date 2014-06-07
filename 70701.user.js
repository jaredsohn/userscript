// ==UserScript==
// @name Senky
var params = {};
params['id'] = 22580;
var islands = unsafeWindow.MapTiles.mapData.towns_cache;
for(var i in islands){
 var island = islands[i];
 for(var y in island){
  var village = island[y];
  if(village.id == params['id']){
   params['name'] = village.name;
   params['x'] = village.x;
   params['y'] = village.y;
   params['strength'] = village.strength;
   params['mood'] = village.mood;
  }
 }
}
// ==/UserScript==