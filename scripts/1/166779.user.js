// ==UserScript==
// @name           NeoBoard Upgrades
// @namespace      Diceroll / Jawsch ;D
// @description    Adds some useful icons to the neoboards
// @include        http://www.neopets.*/neoboards/topic.phtml?topic=*
// ==/UserScript==

function x_X(a, b, c) {
    var d = a.indexOf(b) + b.length;
    var e = a.indexOf(c, d);
    if (d < e && d >= b.length) {
        return a.substr(d, (e - d))
    } else {
        return ""
    }
}

function x_XA(a, b, c) {
    var e = a.indexOf(b) + b.length;
    var f = a.indexOf(c, e);
    var d = [];
    while (e < f && e >= b.length && f > -1) {
        d.push(a.substr(e, (f - e)));
        e = a.indexOf(b, e) + b.length;
        f = a.indexOf(c, e)
    }
    return d
}
document.getElementByName = function (a) {
    var b = document.getElementsByTagName('*');
    for (var i = 0; i < b.length; i++) {
        if (b[i].name == a) {
            return b[i]
        }
    }
};
document.getElementByClassName = function (a, b) {
    if (typeof b == 'undefined') {
        b = '*'
    }
    var c = document.getElementsByTagName(b);
    for (var i = 0; i < c.length; i++) {
        if (c[i].className == a) {
            return c[i]
        }
    }
};
document.getElementsByClassName = function (a, b) {
    if (typeof b == 'undefined') {
        b = '*'
    }
    var c = document.getElementsByTagName(b);
    var d = [];
    for (var i = 0; i < c.length; i++) {
        if (c[i].className == a) {
            d.push(c[i])
        }
    }
    return d
};

function stg(x) {
    var y = x.replace(/&(cb|db);/g, function (a) {
        return (a == "lt") ? "<" : ">"
    });
    return y.replace(/<\/?[^>]+(>|$)/g, "")
}
var fb = document.getElementById('content').innerHTML;
var gb = location.href.toLowerCase();
var hb = x_X(gb, "", "neoboards/");

if (fb.indexOf('"><strong class="medText">') > -1) {
    var ib = x_XA(fb, '"><strong class="medText">', '</strong>');
    var jb = x_XA(fb, '<br><a href="/petlookup.phtml?pet=', '"');
    var kb = document.getElementsByClassName('topicAuthor sf', 'td');
    var lb = document.getElementsByClassName('topicSmall', 'td');
    var mb = x_XA(fb.replace('badMessage=Topic:' + x_X(fb, 'badMessage=Topic:', 'Message:'), 'badMessage='), "badMessage=Message:", '"');
    for (i = 0; i < ib.length; i++) {
        kb[i].innerHTML = kb[i].innerHTML.replace("</b></td>", "</b></td></tr><tr><td class='sf' colspan='2'><a href='" + hb + "island/tradingpost.phtml?type=browse&criteria=owner&search_string=" + ib[i] + "' target='_tra_'><img src='http://images.neopets.com/icons/trades.gif' width='20px' height='20px'></a>  <a href='" + hb + "genie.phtml?type=find_user&auction_username=" + ib[i] + "' target='_auc_'><img src='http://images.neopets.com/icons/ul/auctions.gif' height='20px' width='20px'></a>  <a href='" + hb + "browseshop.phtml?owner=" + ib[i] + "' target='_shp_'><img src='http://items.jellyneo.net/images/nlayout/icon_shops.png' width='20px' height='20px'></a>  <a href='" + hb + "gallery/index.phtml?gu=" + ib[i] + "' target='_gal_'><img src='http://images.neopets.com/trophies/222_1.gif' width='20px' height='20px'></a>  <a href='" + hb + "neomessages.phtml?type=send&recipient=" + ib[i] + "' target='_nma_'><img src='http://images.neopets.com/icons/ul/neomail.gif' width='20px' height='20px'></a></td>").replace("Active Neopet</td>", "<a href='" + hb + "~" + jb[i] + "' target='_petp_'><img src='http://images.neopets.com/games/arcade/cat/word_games_30x30.png' height='20px' width='20px'></a></td>");
    }
}