// ==UserScript==
// @name PornHub Downloader!
// @include http://www.pornhub.com/view_video.php?viewkey=*
// @author DJHell
// @description A UserScript which gives you a link to download PornHub movies!
// @version 1.1
// ==/UserScript==

/* http://www.pornhub.com/view_video.php?viewkey=1865925319 */

var m,reg_1,reg_2,reg_3;

var v1,v2,v3;

var root = document.documentElement.innerHTML;

reg_1 = /to.addVariable\("video_url","(.*)"\);/;
//reg_2 = /to.addVariable\("video_title","(.*)"\);/;
//reg_3 = /to.addVariable\("related_url","(.*)"\);/;


//	to.addVariable("link_url","http%3A%2F%2Fwww.pornhub.com%2Fview_video.php%3Fviewkey%3D320220551");
m = root.match(reg_1);
if (m !== null) {
	//Video Url!
	v1 = m[1];
	v1 = urldecode(v1);
} else {
	v1 = "";
}

m = v1.match(/\?/);
if (m != null) {
	var tmp = v1.split('?');
	v1 = tmp[0];
}

if (v1 != "") {
	try {
		//document.write("<div style=''>Automated downloader. Click <a href='"+v1+"' target='_blank'>here to download this FLV!</a> by DJHell.</div>");
		appendDiv("Automated downloader. Click <a href='"+v1+"' target='_blank'>here to download this FLV!</a> by <a href='http://djhellclub.com' target='_blank'>DJHell</a>.");
	} catch (e) {
		alert(e.message);
	}
}

//I thank -->phpjs.org<-- for this function:
function urldecode(str) {
    // Decodes URL-encoded string  
    // 
    // version: 1107.2516
    // discuss at: http://phpjs.org/functions/urldecode
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
    // +   improved by: Orlando
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +      bugfixed by: Rob
    // +      input by: e-mike
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    // %        note 2: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
    // %        note 2: pages served as UTF-8
return decodeURIComponent((str + '').replace(/\+/g, '%20'));
}

function appendDiv(str) {
	var newdiv = document.createElement('div');
	newdiv.setAttribute("style", "position:fixed; border:2px solid red; width:380px; height:15px;padding:4px; background-color:green;top:50px;left:100px;z-index:8000!impotant;");
	newdiv.innerHTML = str;
	document.body.appendChild(newdiv);
}