// ==UserScript==
// @name           Kaixin Toolkit
// @namespace      http://userscripts.org/users/74146
// @description    Toolkit for www.kaixin001.com
// @include        http://www.kaixin001.com/*
// @require http://www.json.org/json2.js
// @require	http://m.lrfz.com/gmjsloader.js
// @version        0.3
// ==/UserScript==

(function(){
    var debug = false;
    var script_site = debug?"http://localhost:8080":"http://m.lrfz.com";

    if(!unsafeWindow.GMJSLoader){
    	unsafeWindow.GMJSLoader = GMJSLoader;
    }
    unsafeWindow.GMJSLoader.kaixin_toolkit={};
	unsafeWindow.GMJSLoader.kaixin_toolkit.debug = debug;
	
	GMJSLoader.loadJS(script_site + "/kaixin_toolkit.js");

})();
