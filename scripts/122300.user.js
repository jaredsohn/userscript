// ==UserScript==
// @name 			Lectio.dk auto login
// @namespace		lectio_dk_auto_login
// @description		Lectio.dk auto login
// @version			0.005
// @require			http://sizzlemctwizzle.com/updater.php?id=122300&days=1
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @include			http*://*lectio.dk*
// ==/UserScript==


var skoleID = false;

var loginTry = 0;
var loginSkoleID = false;
var username = '';
var password = '';

var url = new String(document.location);

var route = url.split('/');

if(route[4] == 'login_list.aspx'){
	return false;
}

if(url.match('^http\:\/\/.*lectio\.dk.*') || url.match('^https\:\/\/lectio\.dk.*')){
	document.location = url.replace('http://','https://').replace('https://lectio','https://www.lectio');
	return false;
}else if (url.match('^https\:\/\/www\.lectio\.dk\/lectio\/.*')){

	if(isNaN(route[4]) == false) {
		skoleID = route[4];
	}
}

if(GM_getValue('loginTry')) {
	loginTry = GM_getValue('loginTry');
}

if(GM_getValue('loginSkoleID')) {
	loginSkoleID = GM_getValue('loginSkoleID');
}

$(document).ready(function(){
	setInterval(TimerSessionCheck, 1000*60*15);
	
	if(GM_getValue('username')) {
		username = GM_getValue('username');
	}
	if(GM_getValue('password')) {
		password = GM_getValue('password');
	}

	setTimeout(function(){
		if(cookie('isloggedin3') == 'Y') {
			GM_setValue('loginTry',0);
		} else if (loginTry != 0 && cookie('isloggedin3') == 'N') {
			GM_setValue('loginTry',0);
			GM_setValue('password','');
		}
	
		if ( loginSkoleID == skoleID && (username != '' || password != '') ){
			$('#m_Content_LectioDetailIsland1_pa table').append('<tr><td><a href="javascript:void(0);" id="resetSkoleID">Reset auto login</a></td></tr>');
		}

		if(loginSkoleID != false && route[3] == ''){
			$('.textRight').prepend('<a href="https://www.lectio.dk/lectio/'+loginSkoleID+'/login.aspx">Auto login</a> | ');
		}

		if ($('#m_Content_submitbtn2').length != 0 && loginSkoleID == skoleID && (username  != '' || password  != '') ) {
			$('#m_Content_username2').val(username);
			$('#m_Content_password2').val(password);
			
			if (username != '' && password != '') {
				$('#m_Content_submitbtn2').click();
			}
		}
		
		if ($('#s_m_LoginOutLink').length != 0) {
			var url = $('#s_m_LoginOutLink').attr('href');
			$('#s_m_LoginOutLink').attr('href','javascript:void(0);');
		
			$('#s_m_LoginOutLink').click(function() {
				GM_setValue('password','');
				document.location = url;
				return false;
			});
		}
		
		$('#m_Content_submitbtn2').click(function() {
			onLogin();
		});
		
		$('#resetSkoleID').click(function() {
			GM_setValue('username','');
			GM_setValue('password','');
			GM_setValue('loginSkoleID','');

			document.location = 'https://www.lectio.dk';
			return false;
		});
		
		$('#m_Content_password2').keypress(function(e){
			if( loginSkoleID == skoleID && e.which == 13){
				onLogin();
			}
		});
	},1);
	
	function onLogin(){
		GM_setValue('loginTry',1);
		GM_setValue('loginSkoleID',skoleID);
		
		GM_setValue('username',$('#m_Content_username2').val());
		GM_setValue('password',$('#m_Content_password2').val());
	}

	function TimerSessionCheck() {
		$.get('https://www.lectio.dk/lectio/' + skoleID + '/ping.aspx', null, function () {
			cookie('LastAuthenticatedPageLoad', new Date(), {path: '/'});
		});
	}
});


/*!
* jQuery Cookie Plugin
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2011, Klaus Hartl
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/GPL-2.0
*/
function cookie(key, value, options) {
	// key and at least value given, set cookie...
	if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
		options = $.extend({}, options);

		if (value === null || value === undefined) {
			options.expires = -1;
		}

		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			t.setDate(t.getDate() + days);
		}

		value = String(value);

		return (document.cookie = [
			encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
			options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join(''));
	}

	// key and possibly options given, get cookie...
	options = value || {};
	var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

	var pairs = document.cookie.split('; ');
	for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
		if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
	}
	return null;
};