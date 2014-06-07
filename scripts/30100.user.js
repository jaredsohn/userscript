// ==UserScript==
// @name           ATT Order in Line
// @namespace      http://userscripts.org/users/4129
// @description    This adds up and down arrows to show up who is before and after you in line
// @include        https://www.wireless.att.com/order_status/order_status_results.jsp*
// ==/UserScript==

function Querystring(qs) { // optionally pass a querystring to parse
	this.params = {};
	
	if (qs == null) qs = location.search.substring(1, location.search.length);
	if (qs.length == 0) return;

	qs = qs.replace(/\+/g, ' ');
	var args = qs.split('&'); // parse out name/value pairs separated via &
	for (var i = 0; i < args.length; i++) {
		var pair = args[i].split('=');
		var name = decodeURIComponent(pair[0]);
		
		var value = (pair.length==2)
			? decodeURIComponent(pair[1])
			: name;
		
		this.params[name] = value;
	}
}

Querystring.prototype.get = function(key, default_) {
	var value = this.params[key];
	return (value != null) ? value : default_;
}

Querystring.prototype.contains = function(key) {
	var value = this.params[key];
	return (value != null);
}

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }

// All your GM code must be inside this function
function letsJQuery() {
    main(); // check if the dollar (jquery) function works
}

function get_new_url(zipcode, order_id) {
  var url = "https://www.wireless.att.com/order_status/order_status_results.jsp?fromwhere=order_status&vMethod=ordernum&x=32&y=5";
  url += "&vNumber=" + escape(order_id);
  url += "&ZipCode=" + escape(zipcode);
  return url;
}
function main() {
  var canvas = $("#dynamic-border");

  var qs = new Querystring();
  var zipcode = new Number(qs.get('ZipCode'));
  var order_id = new Number(qs.get('vNumber'));

  var down_button = $("<a>Down</a>").appendTo(canvas);
  $("<span>&nbsp;</span>").appendTo(canvas);  
  var up_button = $("<a>Up</a>").appendTo(canvas);

  down_button.click(function() {
    var new_url = get_new_url(zipcode, order_id-1);
    window.location = new_url;	 
  });  

  up_button.click(function() {
    var new_url = get_new_url(zipcode, order_id+1);
    window.location = new_url;	 
  });  

}

GM_wait();
