// ==UserScript==
// @author         HSR Co
// @name           eRepublik Calc Mass Mailer
// @namespace      http://www.erepublikcalc.com
// @description    eRepublik Calc Mass Mailer Solution
// @version        2.0.0.0
// @include        http://www.erepublikcalc.com/mass-mailer
// @include        http://*.erepublik.com/*/main/messages-compose/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//----Variables START----

$ = jQuery.noConflict();

var page = location.href.split('/');
//----Variables END----

if ($.browser.webkit) {
	
	chrome.extension.sendRequest({action: 'tmpDS', data: JSON.stringify(window.localStorage)}, function(response){
		chrome.extension.sendRequest({action: 'getLD'}, function(response){
			window.localStorage.clear();
			for(var x in response = JSON.parse(response)) window.localStorage[x] = response[x];
			Main();
		});
	});
	
	function GM_addStyle(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function GM_deleteValue(name) {
		chrome.extension.sendRequest({action: 'delValue', 'name': name});
		window.localStorage.removeItem(name);
	}

	function GM_getValue(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (value == 'false') {
			return false;
		}
		return value || defaultValue;
	}

	function GM_log(message) {
		console.log(message);
	}

	function GM_registerMenuCommand(name, funk) {
	//todo
	}

	function GM_setValue(name, value) {
		chrome.extension.sendRequest({action: 'setValue', 'name': name, 'value': value});
		window.localStorage.setItem(name, value);
	}
	
	function GM_xmlhttpRequest(data) {
		if (data.method == 'GET') {
			chrome.extension.sendRequest({'url' : data.url.toString()}, data.onload);
		}
	}
	
	function GM_listValues() {
		var vals = [];
		for (var i in window.localStorage) {
			vals.push(i);
		}
		return vals;
	}
}

function EC_mm(){
    $('#EC_messager').html('<font color="green">You have the script and greasemonkey running. :)</font><br />');
    $('.EC_mm').click(function(){
	GM_setValue('EC_mm_subject_'+$(this).attr('user'),$(this).attr('subject'));
	GM_setValue('EC_mm_message_'+$(this).attr('user'),$(this).attr('message'));
	window.open($(this).attr('msgurl'));
});
}

function EC_mmerep(){
    	$('#citizen_subject').val(decodeURIComponent(GM_getValue('EC_mm_subject_'+page[6])));
	$('#citizen_message').html(decodeURIComponent(GM_getValue('EC_mm_message_'+page[6])));
        GM_deleteValue('EC_mm_subject_'+page[6]);
        GM_deleteValue('EC_mm_message_'+page[6]);
}

$(document).ready(function() {
	var pages = [
		{p: 'mass-mailer', f: EC_mm },
                {p: 'messages-compose', f: EC_mmerep }
	];
        if(typeof page[5]== 'undefined')
            {page[5] = page[3];}
	pages.forEach(function(v) {
		if(v.p == page[5]){
			v.f();
		}
	});
});
