// ==UserScript==
// @name           eRep exchange rate overview
// @namespace      whatever
// @include        http://ww*.erepublik.com/**/exchange*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var cname_all = ['GOLD','ARS','ATS','AUD','BAM','BEF','BGN','BOB','BRL','BYR','CAD','CHF','CLP','CNY','COP','CYP','CZK','DEM','DKK','EEK','ESP','FIM','FRF','GBP','GRD','HRK','HUF','IDR','IEP','INR','IRR','ITL','JPY','KPW','KRW','LTL','LVL','MDL','MEP','MKD','MXN','MYR','NIS','NLG','NOK','NZD','PEN','PHP','PKR','PLN','PTE','PYG','RON','RSD','RUB','SEK','SGD','SIT','SKK','THB','TRY','TWD','UAH','USD','UYU','VEB','ZAR','AED','EGP','SAR'];
var cindex_all = ['62','27','33','50','69','32','42','76','9','83','23','30','64','14','78','82','34','12','55','70','15','39','11','29','44','63','13','49','54','48','56','10','45','73','47','72','71','52','80','79','26','66','58','31','37','84','77','67','57','35','53','75','1','65','41','38','68','61','36','59','43','81','40','24','74','28','51','166','165','164'];
var startButton = '<td><span style="-moz-border-radius: 3px 3px 3px 3px; background-color: rgb(208, 228, 251); text-align: center; width: 127px; line-height: 23px; border: 1px solid rgb(102, 204, 255); font-size: 12px; font-weight: bold; padding: 5px 15px; cursor: pointer" class="rightpadded padded" id="startButton" > Start to get exchange rate</span></td>';
var rateTag = "exchange_value_amount_";

window.addEventListener('load', function(){var checker=setInterval(function(){
    if(typeof ($ = jQuery.noConflict()) != "undefined") {
        clearInterval(checker);
        addButton();
    }
},100);}, false);

function addButton(){

	$('#table_list_offers tr:eq(0)').before(startButton);

	document.getElementById('startButton').addEventListener("click", function(){
		var i=1;
		var curr_price = new Array();
		var gold_price = new Array();
		curr_price[0] = 1;
		gold_price[0] = 1;
		var all_currency="Exchange rate all over the world<br>============================================<br>";
		while (i<cname_all.length) {
			curr_price[i] = getExchange(i,0);
			gold_price[i] = getExchange(0,i);
		all_currency += "1 "+cname_all[i]+" = "+curr_price[i]+"Gold; 1 Gold = "+gold_price[i]+" "+cname_all[i]+".<br>";
		i++;
		}
		document.write(all_currency);
		}, true);

}

function getExchange(id1, id2) { 
	var price;
	
    var web_url = $('a#ajax_action_select_link').attr('href');
    var value_page = 'page='+1;
    var value_buy = 'buy_currencies='+cindex_all[id1];
    var value_sell = 'sell_currencies='+cindex_all[id2];

    $.ajax({
        type: 'GET',
        async: false,
        url: web_url,
        dataType: 'html',
        data: {'account_type':'citizen-', 'action_path': 'listOffers', 'buy_currency_history_id':value_buy, 'page':value_page, 'select_page':'select', 'sell_currency_history_id':value_sell},
        beforeSend: function() {
        },
        success: function(html, status) {
            $('#populateOffers').replaceWith(html);
            addButton();
        },
        error: function() {
            title_str = "An error has occurred due to network problem. Please try again.";
            document.title = title_str;
        },
        complete: function() {
        }
    });
	
	price = parseFloat($('span[id^='+rateTag+']:eq(0)').text());
	return(price);
}
