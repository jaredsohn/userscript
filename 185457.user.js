// ==UserScript==
// @name       ClarkMoody with less Moody
// @namespace  http://mdk-photo.com/
// @version    0.1
// @description   ClarkMoody with less Moody, Require the UserStyle by the same name
// @match      http://bitcoin.clarkmoody.com/
// @copyright  2013+, You
// ==/UserScript==

$(".left .calc_fields").html("<div class='smallcalc'>"+
                             "<h3>Selling Bitcoin</h3>"+
                             "<p>Amount to sell in BTC:</p>"+
                             "<input type='text' id='calc_selling_btc' value='100.00'>"+
                             "</div>"+
                             
                             "<div class='smallcalc'>"+
                             "<p>Estimated proceeds:</p>"+
                             "<h4 id='calc_selling_usd' class='up'>112189.72868 USD</h4>"+
                             "<p>Slippage: <span id='calc_selling_slippage'>630.27132 USD</span></p>"+
                             "</div>"
                            )

$(".right .calc_fields").html("<div class='smallcalc'>"+
                              "<h3>Buying Bitcoin</h3>"+
                              "<p>Amount to spend in <span class='currency_label'>USD</span>:</p>"+
                              "<input type='text' id='calc_buying_usd' value='100.00'>"+
                              "</div>"+
                              
                              "<div class='smallcalc'>"+  
                              "<p>Estimated purchase:</p>"+
                              '<h4 id="calc_buying_btc" class="gold">฿0.0877193<span class="insig">0</span></h4>'+
                              '<p>Slippage: <span id="calc_buying_slippage">฿0.0<span class="insig">0000000</span></span></p>'+
                              "</div>"
                             )