// ==UserScript==
// @name           Download Links Checker
// @namespace      #aVg
// @description    Displays helpful information about links from various download servers.
// @include        *
// @version        0.1
// ==/UserScript==
var parse = {
	rs : function(A, B) {
		if(A.match(/8F;">\| ([^<]+)/))
		{
			B.innerHTML += " (" + RegExp.$1 + ")";
		}
		else if(A.indexOf("The file could not") != -1)
		{
			B.style.color = "red";
			B.innerHTML += " (not found)";
		}
	},
	mu : function(A, B) {
		if(A.match(/([\d\.]+ [GMK]B)/i))
		{
			B.innerHTML += " (" + RegExp.$1 + ")";
		}
	},
	ms : function(A, B) {
		if(A.match(/size: ([^<]+)/))
			B.innerHTML += " (" + RegExp.$1 + ")";
	},
	hf : function(A, B) {
		if(A.match(/ze">\| ([^<]+)/))
			B.innerHTML += " (" + RegExp.$1 + ")";
	},
	vip : function(A, B) {
		if(A.match(/Size: <b style="padding-left:5px;">([^<]+)/))
			B.innerHTML += " (" + RegExp.$1 + ")";
	},
	st : function(A, B) {
		if(A.match(/light">([^<]+)/))
			B.innerHTML += " " + RegExp.$1;
	},
	ug : function(A, B) {
		if(A.match(/<td>Filesize:<\/td>\n\t {12}<td>([^<]+)/))
			B.innerHTML += " (" + RegExp.$1 + ")";
	},
	ut : function(A, B) {
		if(A.match(/size: &nbsp;<\/td><td>      (.+)\t/))
			B.innerHTML += " (" + RegExp.$1 + ")";
	},
	ul : function(A, B) {
		if(A.match(/\/font> (\([^<]+)/))
			B.innerHTML += " " + RegExp.$1;
	},
	gs : function(A, B) {
		if(A.match(/Size: <span>([^<]+)/))
			B.innerHTML += " (" + RegExp.$1 + ")";
	},
	lib : function(A, B) {
		if(A.match(/ze::<\/span> ([^<]+)/))
			B.innerHTML += " (" + RegExp.$1.toUpperCase() + ")";
	},
	df : function(A, B) {
		if(A.match(/e: <b>([^<]+)/))
			B.innerHTML += " (" + RegExp.$1.replace(/&nbsp;/g, " ") + ")";
	},
	ff : function(A, B) {
		if(A.match(/[^>]+ file/))
			B.innerHTML += " (" + RegExp.$1 + ")";
	}
};
function handle(B, C) {
	GM_xmlhttpRequest({
		url : B.href,
		method : "GET",
		onload : function(A) {
			parse[C](A.responseText, B);
		},
		headers : {
			"Referer" : B.href
		}
	});
}
var links = document.evaluate("//a", document, null, 6, null);
var trials = {
	rs : /rapidshare\.(?:com|de)\/files/,
	mu : /megaupload\.com\/\?d=/,
	ms : /d\d+\.megashares\./,
	hf : /hotfile\.com\/dl\//,
	vip : /vip-file\.com\/download\//,
	st : /storage\.to\/get\//,
	ug : /ugotfile\.com\/file\//,
	ut : /ul\.to\/./,
	ul : /uploadline\.com\/\d/,
	gs : /gigasize\.com\/get\.php/,
	lib : /letitbit\.com\/download\//,
	df : /depositfiles\.com\/.+\/files\//,
	ff : /filefactory\.com\/file\//
};
for(var i = links.snapshotLength - 1; i >= 0; --i) {
	var link = links.snapshotItem(i);
	for(var t in trials)
		if(trials[t].test(link.href))
		{
			handle(link, t);
			break;
		}
}