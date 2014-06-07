// ==UserScript==
// @name       SDB/Shop Search Linker
// @version    1.0
// @match      http://www.neopets.com/safetydeposit.phtml*
// @match      http://www.neopets.com/market.phtml?*type=your*
// @copyright  2014, diceroll123
// ==/UserScript==

var searchers = new Array();

var link = new Object();
link.url = "http://items.jellyneo.net/index.php?go=show_items&name_type=exact&name=%s";
link.img = "http://images.neopets.com/items/toy_plushie_negg_fish.gif";
link.mouseover = "Search on JellyNeo!";

searchers.push(link);

link = new Object();
link.url = "http://www.neopets.com/market.phtml?type=wizard&string=%s";
link.img = "http://images.neopets.com/shopkeepers/shopwizard.gif";
link.mouseover = "Search the Shop Wiz!";

searchers.push(link);

link = new Object();
link.url = "http://www.neopets.com/island/tradingpost.phtml?type=browse&criteria=item_exact&search_string=%s";
link.img = "http://images.neopets.com/games/betterthanyou/contestant256.gif";
link.mouseover = "Search the Trading Post!";

searchers.push(link);

link = new Object();
link.url = "http://www.neopets.com/genie.phtml?type=process_genie&criteria=exact&auctiongenie=%s";
link.img = "http://images.neopets.com/shopkeepers/auctiongenie.gif";
link.mouseover = "Search the Auctions!";

searchers.push(link);

function itemlink(itemname, before) {
    link = "";
    $.each(searchers, function(k,v) {
        link += "<a target='_blank' href='" + v.url + "'><img title='" + v.mouseover + "' src='" + v.img + "' height=20 width=20></a> ";
    });

	link = link.replace(/%s/g, itemname);
    if (before == false || before == undefined) {
        link += "<br>";
    } else {
        link = "<br>" + link;
    }
    return link;
}

// SDB

trs = $("[cellpadding=4]").find("tr[bgcolor]:not(:first-child):not(:last-child)");

$.each(trs, function(k,v) {
    item = $($(v).find("td[align=left]")[0]);
    itemname = item.text();
    itemname = itemname.replace(item.find(".medText").text(), "");
    if(itemname.length) { // this avoids a bunch of awful errors
        $(item.find(".medText")).before(itemlink(itemname));
    }
});

// Shops

trs = $("[action='process_market.phtml']").find("tr:not(:first-child):not(:last-child)");

$.each(trs, function(k,v) {
    item = $($(v).find("td")[0]);
    itemname = item.text();
    if(itemname.length) { // this avoids a bunch of awful errors
        $(item.find("b")).after(itemlink(itemname, true));
    }
});