// ==UserScript==
// @name          Application filter
// @description	  Only shows Application posts on filtered page
// @author        ZliS
// @include       http://www.facebook.com/home.php?filter=app_*
// ==/UserScript==
(function () {
	var tmp = new Array();		
	var tmp2 = new Array();		
	var param = new Array();

	var get = location.search;	
	if(get != "") {
		tmp = (get.substr(1)).split("&");	
		for(var i=0; i < tmp.length; i++) {
			tmp2 = tmp[i].split("=");		
			param[tmp2[0]] = tmp2[1];		
		}
	}

	var appid = param["filter"].substr(4);
	var css = "#contentArea div[id^=\"div_story_\"]:not([class*=\"" + appid + "\"]) {\ndisplay:none !important;\n}";
		
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node);
		}
	}
})();