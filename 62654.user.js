// ==UserScript==
// @name           Wait for money
// @namespace      moneybookers
// @description    Monitoring script that allows you to know when you can withdraw enough amount of money from moneybookers.com
// @include        https://www.moneybookers.com/app/download.pl
// ==/UserScript==

var check_url = 'https://www.moneybookers.com/app/download.pl';
var limits_exceeded_msg = '<a>Credit card withdrawal limits exceeded. Please try again next week.</a>';
var timeout = 30000;
var iter = 1;
var min_enough_limit = false;

function ajax_load_page(url, cb)
{ 
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange  = function() { if(xhr.readyState  == 4) cb(xhr); };
	xhr.open('GET', url,  true); 
	xhr.send(null); 
}

function ajax_cb(xhr) {
	if(xhr.status == 200 && xhr.responseText) {
		if (xhr.responseText.indexOf(limits_exceeded_msg) > -1) {
			console.log('Wait for money! limits are exceeded.');
			init_waiting();
		}
		else {
			var matches = /onclick="set_cft_card_limit\((.*?)\)"/.exec(xhr.responseText);
			var limit   = parseFloat(matches[1]);
			
			if (min_enough_limit === false || limit >= min_enough_limit) {
				alert('Limit is ' + limit + "\n Total iterations " + iter);
				window.location.reload();
			}
			else {
				console.log('Wait for money! limits are too small (%f)', limit);
				init_waiting();
			}
		}
	}
	else {
		alert("XHR code = " + xhr.status + "\nMessage : " + xhr.statusText);
	}
}

function init_waiting() {
	console.log('Wait for money! init ajax request. Iteration : %d, %s', iter, new Date());
	iter++;
	setTimeout(function() {
		ajax_load_page(check_url, ajax_cb);
	}, timeout);
}

GM_registerMenuCommand("Wait for money!", init_waiting);

if (!window.console) {
  console = {};
  console.log = console.dir = function() {};
}

console.log('Wait for money! is loaded');