// ==UserScript==
// @name       Auto withdrawal
// @namespace  http://eic-ee.com/
// @version    0.2.2
// @description  enter something useful
// @match		https://ishop.qiwi.ru/*
// @match		https://visa.qiwi.com/*
// @copyright  2012+, You
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==


var qiwi_interval;
$(document).load(function() {
	if (document.location.href.indexOf("https://ishop.qiwi.ru/start.action?account") == 0) {
    	page.content.load('favorite/payment.action?id=302058720', true);
    	qiwi_interval = setInterval(do_qiwi, 1000);
	} else if (document.location.href.indexOf("https://visa.qiwi.com/payment/form.action?provider=99") == 0) {
		do_qiwi2();      
    }
    
    function do_qiwi() {
        var p = getJsonFromUrl();
        $('#account').val(p.account);
        var cents = p.amount - parseInt(p.amount)
    
        if($('#value').length > 0 && $('#comment').length > 0) {
            clearInterval(qiwi_interval);
            $('#value').val(parseInt(p.amount));
            $('#change').val(Math.round(cents * 100));
            $('#comment').val("Withdrawal from EIC");
        }
    }
    
    function do_qiwi2() {
        var p = getJsonFromUrl();
        if(!p.amt || !p.acc) return;
        $('#account').val(p.acc);
        var cents = p.amt - parseInt(p.amt);
        
        $('input[name="amountInteger"]').val(parseInt(p.amt));
        $('input[name="amountFraction"]').val(Math.round(cents * 100));
        $('input[name="extra[\'comment\']"]').val("Withdrawal from EIC");
    }
    
    
    function getJsonFromUrl() {
        var query = location.search.substr(1);
        var data = query.split("&");
        var result = {};
        for (var i = 0; i < data.length; i++) {
            var item = data[i].split("=");
            result[item[0]] = item[1];
        }
        return result;
    }
});
