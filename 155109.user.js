// ==UserScript==
// @name           Skip shortnews.de/adf.ly redirect
// @version        3.0
// @description    Skips the waiting time on the Shortnews.de redirect screen
// @updateURL      http://userscripts.org/scripts/source/155109.meta.js
// @include        http*://adf.ly/*/*
// @run-at         document-start
// ==/UserScript== 

(function(){
	var newLocation = window.location.href.replace(/adf\.ly\/[0-9]*\//g, "");
    
    if (newLocation.indexOf("locked?user_id") != -1) {
        var regexExpr = /ad\/locked\?user_id=[0-9]*&url=(.*)&folder_id=&t=e/g;
        regexExpr.exec(newLocation);
        newLocation = decodeURIComponent(RegExp.$1);
    }
	
	location.replace(newLocation);
})();