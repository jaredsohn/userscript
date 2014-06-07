// ==UserScript==
// @name KF Buy Confirmation Utility
// @include http://*.knightfight.*/index.php?ac=shop*
// @author HaNgUs Van Denn
// @description This script is ment to add usability to buy procedure on browser game Knight Fight
// ==/UserScript==

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    }
    else {
        jQuery = unsafeWindow.jQuery;
        jQuery.noConflict();
        main(); 
    }
}

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
GM_wait();

function main() {
  var gold_price = jQuery('#result_gold').val();
  var gems_price = jQuery('#result_gems').val();
  var current_gold = jQuery('#gold-header').text();
  var current_gems = jQuery('#edelsteine-header').text();
  var num = 1;
  if(gold_price>0){
    num = parseInt(current_gold/gold_price);
  }
  else if(gems_price>0){
    num = parseInt(current_gems/gems_price);
  }
  var select = jQuery('<select id="amount" name="amount"><option value="1">1</option></select>');
  for(var i=2;i<=num;i++){
    select.append(jQuery('<option value="'+i+'">'+i+'</option>'));
  }
  jQuery('#amount').replaceWith(select);
  var btnMax = jQuery('<button>Max</button>');
  btnMax.click(function(e){ 
    e.preventDefault();
    select.val(num+'');
  });
  select.parent().append(btnMax);
}