// ==UserScript==
// @name       Alibaba Code-128 track
// @namespace  http://dvinsoft.com/
// @version    0.9
// @description  Adds track number as Code-128
// @match      http://escrow.alibaba.com/trade/*_detail.htm?trade_id=*
// @match      http://trade.alibaba.com/order_detail.htm?orderId=*
// @match      http://trade.aliexpress.com/order_detail.htm?orderId=*
// @copyright  2012+, Dmitry A. Vinogradov
// ==/UserScript==

(function () {
  
    run();

    function run() {
        window.unsafeWindow = window.unsafeWindow || window;
        
        // for old
    	if (/http:\/\/escrow.alibaba.com/.test(window.unsafeWindow.location.href)) {
        	var trackTable = document.body.getElementsByClassName("track-table");
        	var trackTag = trackTable[0].getElementsByClassName("ml10")[0];
        	//trackTag.innerHTML += "<br /><img src='http://chart.apis.google.com/chart?cht=qr&chs=120x120&chl=" + trackTag.innerHTML + "' />";
        	trackTag.innerHTML += "<br /><img src='http://barcode.tec-it.com/barcode.ashx?code=Code128&modulewidth=0.9999999999999999&unit=px&data=" + trackTag.innerHTML + "&dpi=98&imagetype=gif&rotation=0&color=&bgcolor=&fontcolor=&quiet=0&qunit=mm' />";
        } 
        // new
        else {
        	var trackRow = document.body.getElementsByClassName("shipping-bd")[0];
        	var trackTag = trackRow.getElementsByClassName("no")[0];
        	//trackTag.innerHTML += "<br /><img src='http://chart.apis.google.com/chart?cht=qr&chs=120x120&chl=" + trackTag.innerHTML + "' />";
        	trackTag.innerHTML += "<br /><img src='http://barcode.tec-it.com/barcode.ashx?code=Code128&modulewidth=0.9999999999999999&unit=px&data=" + trackTag.innerHTML + "&dpi=98&imagetype=gif&rotation=0&color=&bgcolor=&fontcolor=&quiet=0&qunit=mm' />";
        }
    }
    
})();