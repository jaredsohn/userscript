// ==UserScript==
// @name           令人发指视频搜索
// @namespace      http://userscripts.org/users/74146
// @description    为豆瓣(douban.com)、时光网(mtime.com)等影评网站的电影增加谷歌视频、土豆、迅雷等搜索。
// @include        http://*
// @include        https://*
// @require http://www.json.org/json2.js
// @require	http://m.lrfz.com/gmjsloader.js
// @author         Yale Huang
// @version        0.2
// ==/UserScript==

(function(){
    var debug = false;
    var script_site = debug?"http://localhost:8080":"http://m.lrfz.com";

    if(!unsafeWindow.GMJSLoader){
    	unsafeWindow.GMJSLoader = GMJSLoader;
    }
    unsafeWindow.GMJSLoader.lrfz_video_search={};
    unsafeWindow.GMJSLoader.lrfz_video_search.debug = debug;

    GMJSLoader.loadJS(script_site + "/greasemonkey/lrfz_video_search.js");
})();

// END FILE
