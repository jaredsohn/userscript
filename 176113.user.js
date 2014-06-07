// ==UserScript==
// @name           Adf.ly Instant Skipper
// @namespace      Adf.ly Instant Skipper
// @description    Script made by Khenzuro
// @author      khenzuro
// @authorURL            http://www.facebook.com/liang.mail
// @homepage            http://www.facebook.com/liang.mail
// @include        *adf.ly/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version 1.3.5
// ==/UserScript==
/**	
Original Adf.ly skipper made by Khenzuro
Last update: 19-07-2013
Last JS file: view10.js
*/

$(document).ready(function () {

	window.onbeforeunload = null;

	 function decode_base64(s) {
		 var e = {}, i, k, v = [],
			 r = '',
			 w = String.fromCharCode;
		 var n = [
			 [65, 91],
			 [97, 123],
			 [48, 58],
			 [43, 44],
			 [47, 48]
		 ];
		 for (z in n) {
			 for (i = n[z][0]; i < n[z][1]; i++) {
				 v.push(w(i));
			 }
		 }
		 for (i = 0; i < 64; i++) {
			 e[v[i]] = i;
		 }
		 for (i = 0; i < s.length; i += 72) {
			 var b = 0,
				 c, x, l = 0,
				 o = s.substring(i, i + 72);
			 for (x = 0; x < o.length; x++) {
				 c = e[o.charAt(x)];
				 b = (b << 6) + c;
				 l += 6;
				 while (l >= 8) {
					 r += w((b >>> (l -= 8)) % 256);
				 }
			 }
		 }
		 return r;
	 }
	 
	if($("div[id='_bd']").is(":visible")) $("div[id='_bd']").text("It appears that adf.ly had detected our script!<br /><br /><u>Don't worry adf.ly can't beat me</u> :-)<br /><br /><font color='lime' size='6'>r3x0</font>");

    var url = window.location.href;
    document.title = 'Adf.ly Instant Skipper 1.3.5 - Made by r3x0(Userscripts.org)';

    function killtime() {
        var domain = document.domain;
        var domain2 = document.domain.replace(/^www\./, "");
        var domain3 = document.domain.replace(/^(\w+\.)+?(\w+\.\w+)$/, "$2");

        var cookieList = document.cookie.split(';');

        for (var J = cookieList.length - 1; J >= 0; --J) {
            var cookieName = cookieList[J].replace(/\s*(\w+)=.+$/, "$1");

            document.cookie = cookieName + "=;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=;path=/;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=;path=/;domain=" + domain + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=;path=/;domain=" + domain2 + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=;path=/;domain=" + domain3 + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        }
    }
	
	function removePar(str){
		if(str.indexOf("&") > -1){
			return str.split("&")[0];
		}else{
			return str;
		}
	}

	if(url.indexOf("/int/") > -1){
		var easyURL = url.split("/int/")[1];
		window.location = easyURL;
    }else if (url.indexOf("locked?") > -1) {
        killtime();
        var unblock = url.split("url=");
	var code_red = removePar(unblock[1]);
        window.location = "http://adf.ly/" + code_red;
    } else {
        killtime();
        $.each($("script"), function (i) {
            if ($(this).text().indexOf("var ysmm = '") > -1) {
                var split_one = $(this).text().split("var ysmm = '")[1];
				var security_code = split_one.split("';")[0];
				
				var C = "",
					h = "";
				
				/** Full FOR Cycle extracted from the original Adf.ly API (view10.js) */
				for (var i = 0; i < security_code.length; i++) {
					if (i % 2 == 0){
						C += security_code.charAt(i);
					}else{
						h  = security_code.charAt(i) + h;
					}
				}				
				var sec_tot = decode_base64(C + h);
				finalurl = sec_tot.substring(sec_tot.length - (sec_tot.length - 2));
                window.location = finalurl;
            }
        });
    }
});