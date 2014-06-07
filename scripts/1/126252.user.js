// ==UserScript==
// @name           ASB Currency Conversion
// @namespace      http://userscripts.org/users/231879
// @description    Convert balances to different currencies (HKD and USD by default)
// @include        https://fnc.asbbank.co.nz/1/*/
// @include        https://fnc.asbbank.co.nz/1/*/Balances/Index
// ==/UserScript==

var p = unsafeWindow;

if(window.navigator.vendor.match(/Google/)) {
  var div = document.createElement("div");
  div.setAttribute("onclick", "return window;");
  p = div.onclick();
};

var $ = p.$;
var console = p.console;

// 'unique' function for arrays
Array.prototype.unique = function() { var o = {}, i, l = this.length, r = [];    for(i=0; i<l;i+=1) o[this[i]] = this[i];    for(i in o) r.push(o[i]);    return r;};

// Configuration
// -------------------------------------------------
// Use 'auto' to automatically detect your current
// location's currency, based on your IP address.
p.convert_to = ["auto", "USD"];

// -------------------------------------------------
// Wait for money.js library to load, then execute callback
p.wait_for_money_js = function(callback) {
  p.setTimeout(function() {
    typeof p.fx !== "undefined" ? callback() : p.wait_for_money_js(callback);
  }, 200)
}

// Load conversion rates from openexchangerates.org
p.load_conversion_rates = function(callback) {
  $.getJSON("http://openexchangerates.org/latest.json", function(data) {
    p.fx.rates = data.rates;
    p.fx.base = data.base;
    if (typeof callback !== "undefined") callback();
  });
}

// Add currency conversions to values in balances table
p.convert_currencies = function() { 
  p.fx.settings = {
    from : "NZD"
  };

  // Process 'to' currencies (unique, remove 'auto' and 'NZD')
  var final_convert_to = $.grep(p.convert_to.unique(), function(val) {
    return (val != 'auto' && val != "NZD");
  });

  // Replace all NZD balances with additional currencies
  $('.balRight:not(.header)').each(function(){
    var nzd_amt = $(this).text().replace(/\$/, "").trim();
    var new_val = "<strong>$" + nzd_amt + " NZD</strong>";

    // Append each additional currency
    $.each(final_convert_to, function( i, curr ){     
      var curr_amt = p.fx(nzd_amt).to(curr).toFixed(2);
      new_val += "<br /><small>$" + curr_amt + " " + curr + "</small>";
    });

    // Replace original value with multiple currencies
    $(this).html(new_val);
  });
};


p.geolocate_currency = function(){
  $.ajax({
    url: "http://www.geoplugin.net/json.gp",
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    success: function(data){
      if (!data.geoplugin_currencyCode) {
        alert('Currency information could not be found from IP address. (using http://www.geoplugin.net/json.gp)');
      } else {
        // Add the geolocated currency
        p.convert_to.push(data.geoplugin_currencyCode);
      }
      
      // Convert currencies
      p.convert_currencies();
    }
  });
}


// Begin script
// -------------------------------------------------

// Load money.js library
var script=document.createElement('script');
script.type='text/javascript';
script.src="https://raw.github.com/ndbroadbent/money.js/master/money.min.js";
$("head").append(script);

$(function(){
  // Wait for money.js to load
  p.wait_for_money_js(function(){
    // Load conversion rates
    p.load_conversion_rates(function(){
      // Load geolocated currency, if p.convert_to contains 'auto'
      if ($.inArray('auto', p.convert_to) > -1) {
        // Geolocate currency
        p.geolocate_currency();
      } else {
        // Otherwise, skip geolocation and just convert given currencies
        p.convert_currencies();
      }
    });
  });

  // Add account number to top of page, for selecting and copying.
  var account_num = $('.balanceBlock .nodrag div span:eq(1)').text();
  $(".pageHeader").append(" for " + account_num);
});

