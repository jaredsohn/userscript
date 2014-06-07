// ==UserScript==
// @name           Register Bux.to
// @namespace      GMJS
// @include        http://www4.bux.to/register.php
// @include        http://www4.bux.to/login.php
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
var timer=
GM_JQ.src = 'http://jquery.com/src/jquery-latest.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; $(document).ready(letsJQuery); }
}
GM_wait();

function storeval(val){
	GM_setValue('up',val);
}

function getval(){
	val = GM_getValue('up');
	$("input[name='COOKIEusername']").val(val);
	$("input[name='COOKIEpass']").val(val);
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}



// All your GM code must be inside this function
function letsJQuery() {
	loc = document.location.href;
	if(loc.indexOf("register.php")!=-1){
		if($("input[name='username']").length){
			deleteAllCookies();
			$("img").each(function(i, elem){
				if($(elem).attr('src')=="captcha/imagebuilder.php"){
					$(elem).click();
				}
			});
			up = randomString();
			window.setTimeout(storeval, 0, up); 
			$("input[name='username']").val(up);
			$("input[name='pass']").val(up);
			$("input[name='verpass']").val(up);
			$("input[name='email']").val("someone.someone@something.com");
			$("input[name='veremail']").val("someone.someone@something.com");
			$("input[name='paypal']").val("someone.someone@something.com");
			$("select[name='country'] > option[value='1']").attr('selected','selected');
			$("input[name='chkAccept']").attr('checked','checked');
			$("input[name='r']").val("");
			$("input[name='verify']").after("Just fill in the verification code");
		}else{
			document.location = 'login.php';
		}
	}else{
		window.setTimeout(getval,0); 
	}
}

function randomString() {
	var chars = "abcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}