// ==UserScript==
// @name           Clickable Tiles
// @namespace      Malmis
// @description    Makes the entire tile in Scrollwars clickable
// @include        http://scrollwars.com/game.php*
// @include        http://www.scrollwars.com/game.php*
// ==/UserScript==
var tiles = document.evaluate("//table[@bgcolor='#333333']//tr//td[@class]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var tile, tileLink;
for (var i = 0; i < tiles.snapshotLength; i++) {
    tile = tiles.snapshotItem(i);
    tileLink = tile.getElementsByTagName('a');
    tileLink = tileLink[0].getAttribute("href");
    tile.setAttribute("onClick","location.href='http://"+location.host+"/"+tileLink+"';");
}