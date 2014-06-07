// ==UserScript==
// @name RedTube Downloader!
// @include http://www.redtube.com/*
// @author DJHell
// @description A UserScript which gives you a link to download RedTube movies!
// @version 1.0
// ==/UserScript==

/* http://www.redtube.com/53747 */

var m,reg_1,v1;
var style_A = "style='color:orange'";
var hideButton = "<a href='javascript:void(0);' onclick='switchStateDiv();'>X</a>";

//do only if url has digits.
var url = window.location.href;
m = url.match(/\/(\d*)/);
if (m !== null) {

	var root = document.documentElement.innerHTML;

	reg_1 = /flv_h264_url=(.*)"/;

	m = root.match(reg_1);
	if (m !== null) {
		//Video Url!
		v1 = m[1];
		v1 = urldecode(v1);
	} else {
		v1 = "";
	}

	if (v1 != "") {
		try {		
			appendDiv("Automated downloader. Click <a "+style_A+" href='"+v1+"' target='_blank'>here to download this FLV!</a> by <a "+style_A+" href='http://djhellclub.com' target='_blank'>DJHell</a>.");
		} catch (e) {
			alert(e.message);
		}
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


function switchStateDiv() {
	var dv = document.getElementById('DIV_videoDownloader_112');
	if (dv.style.display == hide) {
		dv.style.display = "block";
	} else {
		dv.style.display = "none";
	}
}

function appendDiv(str) {
	var newdiv = document.createElement('div');
	//newdiv.setAttribute('id',"DIV_videoDownloader_112");
	newdiv.setAttribute("style", "position:fixed; border:2px solid red; width:420px; height:15px;padding:4px; background-color:green;top:50px;left:100px;z-index:8000!impotant;");
	newdiv.innerHTML = str;
	document.body.appendChild(newdiv);
}