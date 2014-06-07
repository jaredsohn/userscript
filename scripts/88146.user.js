// ==UserScript==
// @name           price.ro - link-uri directe
// @version        1.04
// @date           2012-02-08
// @author         George Pop
// @namespace      gp
// @description    Transformă link-urile către magazine în link-uri cu comportament normal, în loc de pop-up.
// @include        http://price.ro/*
// @include        http://www.price.ro/*
// ==/UserScript==

var popups = [
    { jsfn: 'prod_referal', ofn: function (ids) { return '/preturi/referal_product.php?store_id=' + ids[0] + '&prod_id=' + ids[1] + '&pret_id=' + ids[2]; } },
    { jsfn: 'special_offer', ofn: function (ids) { return '/preturi/click_on_special_offer.php?store_id=' + ids[0] + '&prod_id=' + ids[1] + '&pret_id=' + ids[2] + '&zone_id=' + ids[3]; } },
    { jsfn: 'store_prod_referal', ofn: function (ids) { return '/preturi/click_on_store_prod.php?prod_id=' + ids[0]; } },
    { jsfn: 'store_url_referal', ofn: function (ids) { return '/preturi/click_on_store_url.php?store_id=' + ids[0] + '&url=' + ids[1] + '&id=' + ids[2]; } },
];
for (var p_i = 0; p_i < popups.length; p_i++) {
    var p = popups[p_i];
    var links = document.evaluate('//a[starts-with(@href, "javascript:' + p.jsfn + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (links.snapshotLength) {
        for (var l_i = 0; l_i < links.snapshotLength; l_i++) {
            var pattern = '^javascript:' + p.jsfn + '\\(([^)]+)\\)$';
            var re = new RegExp(pattern);
            var ids = decodeURIComponent(links.snapshotItem(l_i).href.match(re)[1]).replace(/[\s']/g, '').split(',');
            var new_href = p.ofn(ids);
            links.snapshotItem(l_i).href = new_href;
        }
    }
}
