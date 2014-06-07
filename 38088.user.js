// ==UserScript==
// @name           豆瓣视频搜索
// @namespace      http://userscripts.org/users/74146
// @description    为豆瓣(www.douban.com)的电影增加谷歌视频、土豆、迅雷等搜索。
// @include        http://www.douban.com/movie/*
// @include        http://www.douban.com/subject/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// @require http://www.json.org/json2.js
// @require	http://m.lrfz.com/gmjsloader.js
// @author         Yale Huang
// @version        0.6
// ==/UserScript==

(function(){
    var debug = false;
    var script_site = debug?"http://localhost:8080":"http://m.lrfz.com";

    unsafeWindow.jQuery = jQuery;
    unsafeWindow.GMJSLoader = GMJSLoader;
    unsafeWindow.GMJSLoader.douban_video_search={};
    unsafeWindow.GMJSLoader.douban_video_search.debug = debug;

    GMJSLoader.loadJS(script_site + "/greasemonkey/douban_video_search.js");

})();

// END FILE
