// ==UserScript==
// @name       astore
// @namespace  http://astore.amazon.fr/carredusex-21/
// @version    0.1
// @description  pass command on astore carredusex-21
// @match      http://www.amazon.com/*/dp/*/ref=*
// @match      http://www.amazon.com/gp/product/*/ref=*
// @match      http://www.amazon.fr/*/dp/*/ref=*
// @match      http://www.amazon.fr/gp/product/*/ref=*
// @copyright  2014+, Thioux
// ==/UserScript==


var link_array = document.getElementsByTagName("link");
var panier = document.getElementById ("bb_atc_button");

for (var i = 0; i < link_array.length; i++) {
    if (link_array[i].rel == 'canonical') {
        var url = link_array[i].href.split('/');
        var link = "http://astore.amazon.fr/carredusex-21/detail/" + url[url.length-1];
        //GM_openInTab("http://astore.amazon.fr/carredusex-21/detail/"+product_id);
        var elem = '<a href="'+ link +'" target="blank" class="dpSprite s_bbAdd2Cart" ><span style="display: block;">Ajotuer</span></a>';
        panier.insertAdjacentHTML( 'beforeBegin', elem);
        panier.remove();
        break;
    }
}