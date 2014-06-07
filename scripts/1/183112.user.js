// ==UserScript==
// @name           Ads Warrior [r3x0]
// @namespace      https://userscripts.org/users/r3x0
// @description    This script allow you to skip instantly the ads/timer from link redirectors
// @author r3x0
// @include        *
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version 1.4.3
// @downloadURL https://userscripts.org/scripts/source/120477.user.js
// @updateURL https://userscripts.org/scripts/source/120477.meta.js
// @homepageURL https://userscripts.org/scripts/show/120477
// ==/UserScript==
/**	
ADF.LY
Last update: 02-09-2013
Last JS file: view12.js
-----------------------
ADFOC.US
Last update: 17-09-2013
Last JS file: ---------
-----------------------
LINKBUCKS
Last update: 03-09-2013
Last JS file: ---------
-----------------------
URLZ.SO
Last update: 03-09-2013
Last JS file: ---------
-----------------------
URLCASH.COM
Last update: 03-09-2013
Last JS file: ---------
-----------------------
ZPAG.ES
Last update: 17-09-2013
Last JS file: ---------
-----------------------
ULMT.IN
Last update: 04-09-2013
Last JS file: ---------
-----------------------

*/
$(document).ready(function () {

    var url = window.location.href;

    checkwebsite();

    function checkwebsite() {
        var adf_icon = "http://adf.ly/static/image/favicon.ico";
        var adf_title = "AdF.ly - shrink your URLs and get paid!";
        var adf_id = "adfly_html";
        var adfoc_url = "adfoc.us/";
        var adfoc_title = "AdFoc.us";
        var linkbucks_title = "LinkBucks.com - Get your share!";
        var linkbucks_css = "http://static.linkbucks.com/tmpl/mint/css/ads.css";
        var urlzso_url = "urlz.so/l/";
        var urlcash_title = "URLCASH.COM - GET PAID TO POST OR SHARE LINKS!";
        var urlcash_jstag = '<script type="text/javascript" src="http://go.urlcash.net/click.js"></script>';
	var zpages_url = "zpag.es/";
	var zpages_title = "zPag.es";
	var ulmtin_url = "ulmt.in/";
		
        if (($("link[rel='icon']").attr('href') == adf_icon) || (document.title == adf_title) || ($("html").attr('id') == adf_id)) {
            custom_preload(1);
        } else if ((url.indexOf(adfoc_url) > -1) && (document.title == adfoc_title)) {
            custom_preload(2);
        } else if ((document.title == linkbucks_title) || ($("link[rel='stylesheet']").attr('href') == linkbucks_css)) {
            custom_preload(3);
        } else if ((url.indexOf(urlzso_url) > -1)) {
            custom_preload(4);
        } else if ((document.title == urlcash_title) || (($("head").html()).indexOf(urlcash_jstag) > -1)) {
            custom_preload(5);
        } else if ((url.indexOf(zpages_url) > -1) && (document.title == zpages_title)) {
			custom_preload(6);
        } else if ((url.indexOf(ulmtin_url) > -1)) {
			custom_preload(7);
		}
    }

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

    function fst_cleaner() {
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

    function removePar(str) {
        if (str.indexOf("&") > -1) {
            return str.split("&")[0];
        } else {
            return str;
        }
    }

    function simple_parser(left, right, cleaner) {
        if (cleaner == 1) fst_cleaner();
        $.each($("script"), function (i) {
            if ($(this).text().indexOf(left) > -1) {
                var splitting = $(this).text().split(left)[1];
                var finalurl = splitting.split(right)[0];
                window.location = finalurl;
            }
        });
    }

    function custom_preload(id) {
        window.onbeforeunload = null;
        document.title = 'Ads Warrior 1.4.3 - Made by r3x0(Userscripts.org)';
        switch (id) {
        case 1:
            if ($("div[id='_bd']").is(":visible")) $("div[id='_bd']").text("It appears that adf.ly had detected our script!<br /><br /><u>Don't worry adf.ly can't beat me</u> :-)<br /><br /><font color='lime' size='6'>r3x0</font>");
            adfly_killer();
            break;
        case 2:
            adfoc_killer();
            break;
        case 3:
            linkbucks_killer();
            break;
        case 4:
            urlzso_killer();
            break;
        case 5:
            urlcash_killer();
            break;
		case 6:
			zpages_killer();
			break;
		case 7:
			ulmtin_killer();
			break;
        }
    }

    function adfly_killer() {
        if (url.indexOf("/int/") > -1) {
            var easyURL = url.split("/int/")[1];
            window.location = easyURL;
        } else if (url.indexOf("locked?") > -1) {
            fst_cleaner();
            var unblock = url.split("url=");
            var code_red = removePar(unblock[1]);
            window.location = "http://adf.ly/" + code_red;
        } else {
            fst_cleaner();
            $.each($("script"), function (i) {
                if ($(this).text().indexOf("var ysmm = '") > -1) {
                    var split_one = $(this).text().split("var ysmm = '")[1];
                    var security_code = split_one.split("';")[0];

                    var C = "",
                        h = "";

                    /** Full FOR Cycle extracted from the original Adf.ly API (view10.js) */
                    for (var i = 0; i < security_code.length; i++) {
                        if (i % 2 == 0) {
                            C += security_code.charAt(i);
                        } else {
                            h = security_code.charAt(i) + h;
                        }
                    }
                    var sec_tot = decode_base64(C + h);
                    finalurl = sec_tot.substring(sec_tot.length - (sec_tot.length - 2));
                    window.location = finalurl;
                }
            });
        }
    }

    function adfoc_killer() {
        fst_cleaner();
        $.each($("script"), function (i) {
            if ($(this).text().indexOf('var click_url = "') > -1) {
                var split_one = (($(this).text().split('var click_url = "')[1]).indexOf("adfoc.us/serve/click/") > -1) ? $(this).text().split('var click_url = "')[2] : $(this).text().split('var click_url = "')[1];
                var finalurl = split_one.split('";')[0];
                window.location = finalurl;
            }
        });
    }

    function linkbucks_killer() {
        if (url.indexOf("/verify/") > -1) {
            var easyURL = url.split("/verify/")[0];
            window.location = easyURL;
        } else {
            simple_parser("TargetUrl = '", "';", 1);
        }
    }

    function urlzso_killer() {
        simple_parser('document.write("<a href=\\"', '\\">', 1);
    }

    function urlcash_killer() {
        simple_parser("linkDestUrl = '", "';", 1);
    }
	
	function zpages_killer(){
		simple_parser('window.location = "','";', 1);
	}
	
	function ulmtin_killer(){
		simple_parser('ifrm.src="','";', 1);
	}

});