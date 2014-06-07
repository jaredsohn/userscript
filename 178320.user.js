// ==UserScript==
// @name       Erepublik WRM Seller
// @namespace  http://userscripts.org/scripts/show/178320
// @version    0.12
// @description  Puts WRM on sale
// @match      http://www.erepublik.com/en/economy/inventory
// @copyright  2013+, user_184736
// ==/UserScript==


// below is the workflow
var string, error, stock = 0,
    pattern = /[0-9]+/g;

string = $j("#stock_12_1").text().replace(/,/g, '');
if ((string != null) && (string > 0)) {
    stock = string.match(pattern);
    $j("#product_select").trigger('click');
    $j(".resource_list a").each(function() {
        if ($j(this).attr("industry") == "12") {
            $j(this).trigger('click');
            $j(".offers_quantity input").attr("value", stock);
            $j("#post_offer").trigger('click');
        }
    });
}

error = $j(".notcool");
if ((error != null) && (error.text() == "You are trying to put on-sale more units than you actually have in the storage.")) {
    setTimeout(
        'location.reload()',
        300000
    );
} else {
    setTimeout(
        'location.reload()',
        60000
    );
}
