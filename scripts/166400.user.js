// ==UserScript==
// @name        UserScripts.org Personal Menu Reloaded
// @namespace   http://userscripts.org/users/burn
// @description Adds the user Menu as dropdown sub-menu of existing link in the top bar. Hovering your username will display the personal Menu. 
// @author      Burn
// @copyright   2013+, Burn (http://userscripts.org/users/burn)
// @license     GNU GPL
// @include     http://userscripts.org/*
// @include     https://userscripts.org/*
// @require     http://code.jquery.com/jquery.min.js
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @version     3
// ==/UserScript==

(function(){
	var storeName = "PersonalMenuReloaded";
	var domParentPath = "#top ul.login_status ";
	var domTargetPath = "li:eq(1) ";
	var nameEQ = "_uso_token=";
	
	var checkAuthToken = function() {
		var ca = document.cookie.split(';');
		for(var i=0,iL=ca.length;i<iL;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return true;
		}
	    return null;
	};
	var doXhr = function(targetUrl) {
        try{GM_deleteValue(storeName);}catch(e){}
		GM_xmlhttpRequest({
			method: "GET",
			url: targetUrl,
			headers: {
			"Accept": "text/xml"
			},
			onload: function(response) {
				xhrOnLoad(response);
			}
		});
	};
	var xhrOnLoad = function(r) {
		var responseXML = null;
		if (!r.responseXML) {
		        responseXML = new DOMParser()
			.parseFromString(r.responseText, "text/xml");
		}
		if (r.status != 200 || r.statusText != "OK") {
			return;
		}
		
		var menu = $(".subnav", responseXML);
		$(menu).children("li").removeClass("menu");
		var RExmlns = /\s?xmlns="http:[\/\w\d\.]+"/gi;
        menu = menu.html().toString();
		menu = menu.replace(RExmlns, "");
		menu = "<ul class=\"personalMenu\">"+menu+"</ul>";
		saveMenu(storeName, menu);
		$(domParentPath + domTargetPath).append(menu);
	};
	var saveMenu = function(name, val) {
		 GM_setValue(name, val);
	};
	var getMenu = function(name, def) {
		return GM_getValue(name, def || "");
	};
	// end initialization
	
	if(null===checkAuthToken())return;
	var m = getMenu(storeName);
	if (m == "") {
		doXhr("http://userscripts.org/home");
	} else {
		$(domParentPath + domTargetPath).append(m);
	}
	
	GM_addStyle(domParentPath + "{\
		position:relative !important;\
		z-index:1020 !important\
	}\
	#header {height:38px !important}\
	#top .container{height:38px !important;overflow:visible !important}\
	#top ul.personalMenu {\
		display: none;\
		left: 10px;\
		margin: 0;\
		padding: 0;\
		position: absolute;\
		top: 24px;\
		z-index: 1021;\
	}\
	" + domParentPath + " li ul.personalMenu li {\
		background-color: #FF8800 !important;\
		clear: left !important;\
		list-style: none outside none;\
		margin: 0;\
		padding: 0 12px;\
		width: 146px;\
		z-index: 1021;\
	}\
	" + domParentPath + " li ul.personalMenu li:last-child {\
		border-radius:0 0 4px 4px;\
		padding-bottom:6px\
	}\
	" + domParentPath + " li ul.personalMenu li a {\
		color:white !important;\
		display:block;\
		text-align:right !important;\
	}\
	" + domParentPath + " li ul.personalMenu li a:hover {\
	}\
	" + domParentPath + " li:hover > ul {\
		display:block !important;\
	}\
	");
})();
