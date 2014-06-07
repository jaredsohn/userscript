// ==UserScript==
// @name           Envato marketplaces estimated earnings and sales
// @creator      Web Factory Ltd, www.webfactoryltd.com
// @namespace      webfactoryltd.com
// @description    See how much you'll earn this month. It's magic!
// @date      2011-07-06
// @version      1.1
// @include      http://codecanyon.net/user/*/earnings*
// @include      http://activeden.net/user/*/earnings*
// @include      http://audiojungle.net/user/*/earnings*
// @include      http://themeforest.net/user/*/earnings*
// @include      http://videohive.net/user/*/earnings*
// @include      http://graphicriver.net/user/*/earnings*
// @include      http://3docean.net/user/*/earnings*
// @include      http://marketplace.tutsplus.com/user/*/earnings*
// @include      http://photodune.net/user/*/earnings*
// ==/UserScript==


function wf_magic() {
    function wf_add_commas(nStr) {
      nStr += '';
      x = nStr.split('.');
      x1 = x[0];
      x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    } // wf_add_commas

    var today = new Date();
    var days = new Date(today.getFullYear(), today.getMonth()+1, 0);
    days = days.getDate();
    today = today.getDate();
    
    sales = $('#sales_graph div:last.value').html();
    sales = parseInt(sales.replace(',', ''),10);
    var total_sales = parseInt(sales / today * days, 10);
    $('#sales_graph div:last.value').append('; ESTIMATED SALES: ' + total_sales)
    
    earnings = $('#earnings_graph div:last.value').html();
    earnings = earnings.replace(',', '');
    earnings = parseFloat(earnings.replace('$', ''));
    
    var total_earnings = earnings / today * days;
    total_earnings = wf_add_commas(total_earnings.toFixed(2));
    $('#earnings_graph div:last.value').append('; ESTIMATED EARNINGS: $' + total_earnings)
    
    $('#sales_graph div:last.value').css('padding-top', '8px');
    $('#earnings_graph div:last.value').css('padding-top', '8px');
} //wf_magic

// a function that loads jQuery and calls a callback function when jQuery has finished loading
// (c) http://stackoverflow.com/questions/2246901/include-jquery-inside-greasemonkey-script-under-google-chrome
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(wf_magic);