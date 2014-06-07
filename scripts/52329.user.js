// ==UserScript==
// @name          RuneScape Extras
// @description   Adds some new tools while playing on any runescape world.  Works for non-members and members.  Features include - Quick World Change, Runescape Map, price checker and more!
// @include       http://world*.runescape.com/m0,a2
// @include       http://www.runescape.com/game.ws*
// ==/UserScript==

/* Thanks to all the websites I found giving me the information I needed
** Zybez.net
** Rsbandb.com
** Maps.Google.com (For the maps provided on Rsbandb.com)
** Userscripts.org
** Greasemonkey!                                                       */

unsafeWindow.worldChange = function () {
id = document.getElementById('world').value;
alert(id);
document.location.href = "http://world" + id + ".runescape.com/m0,a2";

}

unsafeWindow.openMap = function () {
alert("The map may take some time to load.");
window.open("http://www.rsbandb.com/interactive_runescape_world_map/all_skills_and_categories");

}

unsafeWindow.checkPrice = function () {
term = document.getElementById('item').value;
window.open("http://www.zybez.net/priceguide.php?search_terms=" + term + "&search_area=1&price_low=&price_high=&member=1");

}

unsafeWindow.searchQuest = function () {
quest = document.getElementById('questname').value;
newquest = quest.replace(/ /g,"+");
window.open("http://runescape.salmoneus.net/site_search.html?domains=RuneScape.Salmoneus.net&q=" + newquest  + "&sa=Search&sitesearch=RuneScape.Salmoneus.net&client=pub-4791859739793551&forid=1&ie=UTF-8&oe=UTF-8&safe=active&flav=0000&sig=I-qCcJg2eTxWx4e1&cof=GALT%3A%23008000%3BGL%3A1%3BDIV%3A%23006699%3BVLC%3A003399%3BAH%3Acenter%3BBGC%3ACCCCCC%3BLBGC%3ACCCCCC%3BALC%3A003399%3BLC%3A003399%3BT%3A000000%3BGFNT%3A003399%3BGIMP%3A003399%3BLH%3A100%3BLW%3A88%3BL%3Ahttp%3A%2F%2Frunescape.salmoneus.net%2Fimages%2Fgrouplogo_small.gif%3BS%3Ahttp%3A%2F%2Frunescape.salmoneus.net%2F%3BLP%3A1%3BFORID%3A11&hl=en");

}

var unsignedmessage, newElement;
unsignedmessage = document.getElementById('unsignedmessage');
if (unsignedmessage) {
    newElement = document.createElement('div');
    newElement.innerHTML = "<div style='color: #0000FF'><input type='text' id='world' value='World Number'><input type='button' value='Change World' onClick='worldChange()'>&nbsp;&nbsp;<input type='button' value='Open Map' onClick='openMap()'>&nbsp;&nbsp;<input type='text' id='item' value='Price Check Item'><input type='button' value='Check Price' onClick='checkPrice()'>&nbsp;&nbsp;<input type='text' id='questname' value='Quest Name'><input type='button' value='Search For Quest' onClick='searchQuest()'>";
    unsignedmessage.parentNode.insertBefore(newElement, unsignedmessage.nextSibling);
}
