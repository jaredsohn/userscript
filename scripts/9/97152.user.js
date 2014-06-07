// ==UserScript==
// @name         KF Buy Confirmation Utility
// @include      http://*knightfight.*/index.php?ac=shop*
// @author       HaNgUs Van Denn
// @description  KF Buy Confirmation Utility
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load',function(){
    var s = document.createElement("script");
    s.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(s);
  }, false);
  document.body.appendChild(script);
}

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

addJQuery(main);