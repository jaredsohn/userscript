// --------------------------------------------------------------------------------
// Copyright (C) 2009  Cui Mingda [ cuimingda@gmail.com ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Koubei City Switcher
// @namespace       http://oragg.com
// @description     Add a city navigation bar on the topmost of website
// @include         http://*.koubei.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version         0.2.20090723
// @update          重构了下代码
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first.
// --------------------------------------------------------------------------------

;(function() {
    var changeLink = $("a.yk-h-change-city:first");
    if(changeLink.length === 0) {
        return false;
    }
    
    var baseUrl = changeLink.attr("href").replace("selectcitynew.html?city", "cityjumpnew.html?selectCity")
                                         .concat("&fromURL=" + encodeURIComponent(location.href));
    var cities = {
      "99"   : "北京",
      "2076" : "上海",
      "2595" : "杭州",
      "287"  : "广州",
      "359"  : "深圳",
      "2696" : "重庆",
      "2098" : "成都",
      "2260" : "天津",
      "1322" : "苏州",
      "106"  : "福州",
      "1309" : "南京",
      "1126" : "长沙",
      "2031" : "西安",
      "2517" : "丽江",
      "613"  : "三亚",
      "1252" : "吉林"      
    };
    
    var urls = [];
    var k;
    for(k in cities) {
      urls.push("<a href=\"" + baseUrl.replace(/selectCity=\d+/, "selectCity=" + k) + "\">" + cities[k] + "</a>");
    }
    
    var styles = [];
    styles.push("#city-nav-bar {width:100%;margin:0 auto;font-size:12px;text-align:center;background:#c00;color:white;padding:0;height:24px;line-height:24px;}");
    styles.push("#city-nav-bar a:link, #city-nav-bar a:visited, #city-nav-bar a:hover, #city-nav-bar a:active {color:white;}");
    GM_addStyle(styles.join(""));
   
    $(document.createElement("div"))
      .attr("id", "city-nav-bar")
      .html(urls.join("&nbsp;|&nbsp;"))
      .insertBefore($("div:first"));

})();
