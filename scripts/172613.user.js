// ==UserScript==
// @name        小説家になろう お気に入り解除ボタン追加
// @namespace   ncode
// @include     http://ncode.syosetu.com/*
// @version     1.1
// @grant       GM_xmlhttpRequest
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return s;
		} catch(er) {}
	}

	$.cookie = function (key, value, options) {
		// read
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decoded(parts.shift());
			var cookie = decoded(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};
}));

/*!
 * スクリプトはここから
 */

var markon = $(".booklist_markon");
var ncode;
var ua = window.navigator.userAgent.toString();
if (location.href.match(/\/(n[0-9a-z]+)\//g)){
    ncode = RegExp.$1;
    if (markon.text() == "お気に入り登録済み") {
        markon.html("<a href=\"#\" id=\"favnovel_id\">お気に入り解除</a>");
        $("#favnovel_id").click(function () {
            get_kanrino(ncode, 1);
            return false;
        });
    }
}

function get_kanrino(ncode, p)
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://syosetu.com/favnovel/list/index.php?p='+ p,
        headers: {
          "User-Agent": ua,
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Cookie": "ses="+ encodeURIComponent($.cookie('ses')) +
                    "; autologin="+ encodeURIComponent($.cookie('autologin')) +
                    "; over18="+ encodeURIComponent($.cookie('over18')) +
                    "; nlist1="+ encodeURIComponent($.cookie('nlist1')) +
                    "; istate="+ encodeURIComponent($.cookie('istate')) +
                    "; sasieno="+ encodeURIComponent($.cookie('sasieno')) +
                    "; __utma="+ encodeURIComponent($.cookie('__utma')) +
                    "; __utmb="+ encodeURIComponent($.cookie('__utmb')) +
                    "; __utmz="+ encodeURIComponent($.cookie('__utmz')) +
                    "; __utmc="+ encodeURIComponent($.cookie('__utmc'))
        },
        onload: function(response) {
             var res = response.responseText.replace(/[\n\r]/g,"");
             var re1 = new RegExp("value=\"([0-9]+)\" /></li><li class=\"info\"><a class=\"title\" href=\"http://ncode.syosetu.com/"+ ncode +"/");
             if (res.match(re1)) {
                 var kanrino = RegExp.$1;
                 var re2 = new RegExp("token=([0-9a-zA-Z]+)");
                 if (res.match(re2)) {
                     var t = RegExp.$1;
                     return delete_run(kanrino, t);
                 }
                 
                 return false;
             } else if(p < 10) {
                 return get_kanrino(ncode, p + 1);
             }
        }
    });
}
function delete_run(kanrino, token)
{
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://syosetu.com/favnovel/update/?token='+ token,
        data: "kanrino%5B%5D="+ kanrino +"&del=%E3%81%8A%E6%B0%97%E3%81%AB%E5%85%A5%E3%82%8A%E3%81%8B%E3%82%89%E5%89%8A%E9%99%A4%E3%81%99%E3%82%8B",
        headers: {
          "User-Agent": ua,
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Cookie": "ses="+ encodeURIComponent($.cookie('ses')) +
                    "; autologin="+ encodeURIComponent($.cookie('autologin')) +
                    "; over18="+ encodeURIComponent($.cookie('over18')) +
                    "; nlist1="+ encodeURIComponent($.cookie('nlist1')) +
                    "; istate="+ encodeURIComponent($.cookie('istate')) +
                    "; sasieno="+ encodeURIComponent($.cookie('sasieno')) +
                    "; __utma="+ encodeURIComponent($.cookie('__utma')) +
                    "; __utmb="+ encodeURIComponent($.cookie('__utmb')) +
                    "; __utmz="+ encodeURIComponent($.cookie('__utmz')) +
                    "; __utmc="+ encodeURIComponent($.cookie('__utmc'))
        },
        onload: function(response) {
             markon.html("解除しました");
        }
    });
}