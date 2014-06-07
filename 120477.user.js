// ==UserScript==
// @name           Ads Warrior [r3x0]
// @namespace      https://userscripts.org/users/r3x0
// @description    This script allow you to skip instantly the ads/timer from link redirectors
// @author r3x0
// @include        *
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version 1.4.4
// @downloadURL https://userscripts.org/scripts/source/120477.user.js
// @updateURL https://userscripts.org/scripts/source/120477.meta.js
// @homepageURL https://userscripts.org/scripts/show/120477
// ==/UserScript==

$(document).ready(function () {

    var url = window.location.href;

    checkwebsite();

    function checkwebsite() {
		/** ADFLY */
        var adf_icon = "http://adf.ly/static/image/favicon.ico";
        var adf_title = "AdF.ly - shrink your URLs and get paid!";
        var adf_id = "adfly_html";
		/** ADFOC.US */
        var adfoc_url = "adfoc.us/";
        var adfoc_title = "AdFoc.us";
		/** LINKBUCKS */
        var linkbucks_title = "LinkBucks.com - Get your share!";
        var linkbucks_css = "http://static.linkbucks.com/tmpl/mint/css/ads.css";
		/** URLZ.SO */
        var urlzso_url = "urlz.so/l/";
		/** URLCASH */
        var urlcash_title = "URLCASH.COM - GET PAID TO POST OR SHARE LINKS!";
        var urlcash_jstag = '<script type="text/javascript" src="http://go.urlcash.net/click.js"></script>';
		/** ZPAG.ES */
		var zpages_url = "zpag.es/";
		var zpages_title = "zPag.es";
		/** ULMT.IN */
		var ulmtin_url = "ulmt.in/";
		/** LNXLU */
		var lnxlu_url = "lnx.lu/";
		var lnxlu_icon = "lnx.ico";
		/** REDUCELINK */
		var rdlnkco_url = "rdlnk.co/";
		var reduceco_url = "reducelnk.com/";
		/** IIIIN */
		var iiiiiin_url = "iiiii.in/";
		/** BC.VC */
		var bcvc_url = "bc.vc/";
		/** LIENCASH */
		var liencash_url = "lienscash.com/l/";
		/** AJAX FLY SCRIPT */
		var adcrunch_url = "adcrun.ch/";
		var adlipw_url = "adli.pw/";
		var fly2_url = "fly2url.com/";
		var linktl_url = "link.tl/";
		var sslgs_url = "ssl.gs/";
		var tr5in_url = "tr5.in/";
		var wwyme_url = "wwy.me/";
		var xipir_url = "xip.ir/";
		var zpoznet_url = "zpoz.net/";
		
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
		} else if ((url.indexOf(adcrunch_url) > -1) || 
					(url.indexOf(adlipw_url) > -1) || 
					(url.indexOf(fly2_url) > -1) || 
					(url.indexOf(linktl_url) > -1) || 
					(url.indexOf(sslgs_url) > -1) ||
					(url.indexOf(wwyme_url) > -1) ||
					(url.indexOf(xipir_url) > -1) || 
					(url.indexOf(zpoznet_url) > -1)
		) {
			custom_preload(8);
		} else if ((url.indexOf(lnxlu_url) > -1) || ($("link[rel='icon']").attr('href') == lnxlu_icon)){
			custom_preload(9);
		} else if ((url.indexOf(rdlnkco_url) > -1) || (url.indexOf(reduceco_url) > -1)){
			custom_preload(10);
		} else if ((url.indexOf(iiiiiin_url) > -1)){
			custom_preload(11);
		} else if ((url.indexOf(bcvc_url) > -1)){
			custom_preload(12);
		} else if ((url.indexOf(liencash_url) > -1)){
			custom_preload(13);
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
	
	function string_between(source, right, left) {
		var temp_right = source.split(left)[1];
		var result = temp_right.split(right)[0];
		return result;
	}

    function custom_preload(id) {
        window.onbeforeunload = null;
        document.title = 'Ads Warrior 1.4.4 - Made by r3x0(Userscripts.org)';
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
		case 8:
			ajaxfly_killer();
			break;
		case 9:
			lnxlu_killer();
			break;
		case 10:
			rdlnkco_killer();
			break;
		case 11:
			iiiiiin_killer();
			break;
		case 12:
			bcvc_killer();
			break;
		case 13:
			liencash_killer();
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
        } else if ($("iframe[id='omnigy_ad']").length) {
			var easyURL = $("iframe[id='rf']").attr('src');
            window.location = easyURL;
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
	
	function bcvc_killer() {
		fst_cleaner();
		 $.each($("script"), function (i) {
            if ($(this).text().indexOf('var rr = function() {') > -1) {
				var temp_scp = $(this).text();
				
				var aid = string_between(temp_scp,",lid:","'make_log',args:{aid:");
				var lid = string_between(temp_scp,",oid:",",lid:");
				var check_file = string_between(temp_scp,"',{opt:'check_log'","$.post('");
				var post_file = string_between(temp_scp,"',","$.post('");
				
				var timestamp_2012 = "1325379661";
				document.cookie = "SITE_view_" + lid + "_0=" + timestamp_2012 + ";"
				
				GM_xmlhttpRequest({
					method: "POST",
					url: check_file,
					data: "opt=check_log&args%5Blid%5D=" + lid + "&args%5Boid%5D==0",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function(response) {}
				});
				
				GM_xmlhttpRequest({
					method: "POST",
					url: post_file,
					data: "opt=make_log&args[aid]=" + aid + "&args[lid]=" + lid + "&args[oid]=0&args[ref]=",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function(response) {
						var jj = eval('(' + response.responseText + ')');
						if (jj.message) {
							top.location.href = jj.message.url;
						}
					}
				});
            }
        });
	}
	
	function ajaxfly_killer() {
		fst_cleaner();
	    $.each($("script"), function (i) {
            if ($(this).text().indexOf('eval(function(p,a,c,k,e,d)') > -1) {
				var temp_scp = $(this).text();
				temp_scp = temp_scp.replace("eval","");
				var unpack = eval(temp_scp);
				var aid = string_between(unpack,",lid:","'make_log',args:{aid:");
				var lid = string_between(unpack,",oid:",",lid:");
				var check_file = string_between(unpack,"',{","<0){$.post('");
				var post_file = string_between(unpack,"',{","(function(){$.post('");
				
				var timestamp_2012 = "1325379661";
				document.cookie = "SITE_view_" + lid + "_0=" + timestamp_2012 + ";"
				
				GM_xmlhttpRequest({
					method: "POST",
					url: check_file,
					data: "opt=check_log&args%5Blid%5D=" + lid + "&args%5Boid%5D==0",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function(response) {}
				});
				
				GM_xmlhttpRequest({
					method: "POST",
					url: post_file,
					data: "opt=make_log&args[aid]=" + aid + "&args[lid]=" + lid + "&args[oid]=0&args[ref]=",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function(response) {
						var jj = eval('(' + response.responseText + ')');
						if (jj.message) {
							top.location.href = jj.message.url;
						}
					}
				});
            }
        });
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
	
	function liencash_killer(){
		var div = $("div[id='header']").find('noscript').html();
		var link = div.split('<a href="')[1];
		window.location = link.split('">')[0];
	}
	
	function iiiiiin_killer() {
		simple_parser("$('.skipads').html('<a href=", " onclick=javascript:AdWin()", 1);
	}
	
	function lnxlu_killer() {
		fst_cleaner();
		window.location.href = $("a[href*='click']").attr('href');
	}
	
	function rdlnkco_killer(){
		fst_cleaner();
		window.location = $("#urlholder").attr('value');
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