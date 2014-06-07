// ==UserScript==
// @name           DS - Accountname
// @version        v1.0
// @author         bodhiBrute
// @description    Zeigt den Accountnamen oben an
// @icon           http://www.die-staemme.de/graphic/rabe_38x40.png
// @include        http://de*.die-staemme.de/game.php*
// @exclude        
// ==/UserScript==
document.evaluate('//div[contains(@class,"bg")]/a[contains(text(), "Rangliste")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML = unsafeWindow.game_data["player"]["name"];
