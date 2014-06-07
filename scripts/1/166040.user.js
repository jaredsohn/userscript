// ==UserScript==
// @name			Shortcut By Yayan Adipraja
// @namespace		        http://userscripts.org/scripts/show/120770
// @version			28/05/2012
// @copyright		        Yayan Adipraja
// @description		        You can mass like or mass confirm friend request
// @author			yand1109 (http://www.diskusapzha.blogspot.com/)
// @icon		        http://odin.mobile9.com/download/media/41/anonymousm_rahcwn6z.gif
// @include			htt*://www.facebook.com/*
// @include			htt*://*.facebook.com/*
// @include			htt*://www.kaskus.co.id/*
// @include			htt*://www.tokobagus.com/*
// @include			htt*://www.Yahoo.com/*
// @include			htt*://www.yahoo.co.id/*
// @include			htt*://www.tokobagus.com/*
// @exclude			htt*://m.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*onnect.facebook.com/*
// @exclude			htt*://*acebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/games*
// @exclude			htt*://apps.facebook.com/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
//
// Copyright (c) 2012, Yayan Adipraja
// Twitter/LinkedIn, Yahoo Mail, Gmail, Live, Toko Bagus, Kaskus.co.id

// ==/UserScript==

/* START: This part of the code was written (partialy) by Yayan Adipraja for cyberUTY, special thanks to him n' them :) */

	storage = 'none';

	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			GM_setValue('testkey', 'testvalue');
			if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
		}
	} catch(x) {}
	if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

	function setValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				GM_setValue('0-'+key, value);
				break;
			case 'localstorage':
				localStorage['femotbar-0-'+key] = value;
				break;
		}
	}

	function getValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				return GM_getValue('0-'+key, value);
			case 'localstorage':
				var val = localStorage['femotbar-0-'+key];
				if (val=='true') { return true; }
				else if (val=='false') { return false; }
				else if (val) { return val; }
				break;
		}
		return value;
	}
	
	function xmlhttpRequest(params, callBack) {
		if (typeof GM_xmlhttpRequest !== 'undefined') {
			params['onload'] = callBack;
			return GM_xmlhttpRequest(params);
		}
		return null;
	}

	function openInTab(url) {
		if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
		else { window.open(url); }
	}

	function UpdateCheck() {
		if(parseInt(getValue('LastUpdate', '0')) + 86400000 <= (new Date().getTime())) {
			try {
				xmlhttpRequest( { method: 'GET',
								  url: 'http://userscripts.org/scripts/source/120770.meta.js?' + new Date().getTime(),
								  headers: {'Cache-Control': 'no-cache'} },
								  handleUpdateResponse);
			}
			catch (err) {
				alert('An error occurred while checking for updates:\n' + err);
			}
		}
	}
	
	function handleUpdateResponse(r) {
		setValue('LastUpdate', new Date().getTime() + '');
		if (r.responseText.match(/@versionnumber\s+(\d+\.\d+)/)[1] > version) {
			if(confirm("There's an update available for 'Shortcut By Yayan Adipraja'.\nDo you wish to install it?")) openInTab('http://userscripts.org/scripts/source/120770.user.js');
		}
	}
	
// END


// ==Picture==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+105px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<center><a href='http://www.diskusapzha.blogspot.com/'><img src='http://odin.mobile9.com/download/media/41/anonymousm_rahcwn6z.gif' alt='cyserrex' width='125' height='175' </a></center>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+82px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px dashed #555";
	div2.style.padding = "2px";
	div.style.width = "125px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='https://www.facebook.com/yandz1109/' style='color: #FFFFFF;' onclick='alert(\'Thanks for instal this script\');'>Shortcut By Yayan Adipraja</a></center></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='https://www.facebook.com/yandz1109/' title='Thanks for instal this script'>Shortcut By Yayan Adipraja</a></center> "
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Show Widget'>&raquo;</a></center>"
		}
	}
	};
}
