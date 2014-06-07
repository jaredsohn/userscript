// ==UserScript==
// @name           eRepublic Company net value
// @namespace      Devenv
// @include        http://www.erepublik.com/en/company/*
// ==/UserScript==

prod_cost = 0.378;
gold_cost = 50;

function calc() {
  amount = parseInt($('.ammount').eq(0).val());
  queued = parseInt($('#number_of_products').html());
  cost = $('.ammount').eq(1).val();
  sum = Math.round((queued + amount) * cost);
  gold = parseInt($('.accountdisplay .special').eq(0).html());
  golds = Math.round(gold * gold_cost);
  money = parseInt($('.accountdisplay .special').eq(1).html());
  products = parseInt($('.goleft .big').eq(1).html());
  prods = Math.round(products * prod_cost);
  $('.holder .section').eq(0).html(money + " + " + sum + " + " + prods + " = " + (sum + money + prods) + " &nbsp;&nbsp; + " + golds + " = " + (sum + money + prods + golds));
}

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
      window.setTimeout(calc, 5000);
    }