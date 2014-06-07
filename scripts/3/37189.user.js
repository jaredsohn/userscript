// ==UserScript==
// @name           Ebay Title Adjust
// @namespace      none
// @description    cleans the ebay search results title of all that irrelevant crap
// @include        http://*.ebay.tld/*
// ==/UserScript==

function eta(){
	var doc = window.document;
	var url = doc.URL;
	var newTitle = "";
	
	var ures = /^http:\/\/([\w\.-]+).ebay[\w\.]{2,6}\/(?:\w+\/)?(.*)$/.exec(url);
	if (ures === null || ures.length < 3) return;
	var subdomain = ures[1];
	var file = ures[2];

	if (/^(?:.+\.)?shop$/.test(subdomain)){
		var res = /^.*[\?&]_nkw=([^&]*).*$/.exec(file);
		if (res !== null && res.length == 2){
			newTitle = res[1].replace(/\+/g, " ");
			newTitle = decodeURIComponent(newTitle);
		} else {
			res = /^[\w-]*?_W0QQ(.+)/.exec(file);
			if (res !== null && res.length == 2){
				splits = res[1].split("QQ");
				for (i = 0; i < splits.length; i++) {
					kv = splits[i].split("Z", 2);
					if (kv[0] == "_nkw")
						newTitle += kv[1].replace(/Q/g, "%") + " ";
				}
				newTitle = decodeURIComponent(newTitle);
			} else {
				res = /^.*__([^_]+?)(?:_W0QQ|\?).*$/.exec(file);
				if (res !== null && res.length == 2){
					newTitle = res[1];
					newTitle = newTitle.replace(/-/g, " ");
				}
			}
		}
	}
	else if (/^(?:.*search|search-desc)$/.test(subdomain)){
		var res = /^.*?_W0QQ(?:satitleZ|.+QQsatitleZ|pf_queryZ|.+pf_queryZ)(.*?)(?:QQ.*|$)/.exec(file);
		if (res !== null && res.length == 2){
			newTitle = res[1].replace(/Q/g, "%");
			newTitle = decodeURIComponent(newTitle);
		} else {
			res = /^([^_]+?)(?:(?:_.*?)?_W0QQ.*)?$/.exec(file);
			if (res !== null && res.length == 2){
				newTitle = res[1];
				newTitle = newTitle.replace(/-/g, " ");
			}
		}
	}

	if (newTitle !== "") doc.title = newTitle;
};
eta();