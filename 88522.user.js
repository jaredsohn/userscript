// ==UserScript==
// @name           中国之声
// @namespace      http://bfq.cnr.cn/bfq2010/
// @include        http://bfq.cnr.cn/bfq2010/*
// ==/UserScript==

window.create_embed = function() {
	try {
		// Clear all interval
		for (i=0; i<65536; i++)
			window.clearInterval(i);

		// Get <object ...
		obj = document.getElementById("shinyvPlayer");
		// Try to get URL
		len = obj.childNodes.length;
		URL = "mms://cdnmms.cnr.cn/cnr001?MzE5MTg0IzEjIzI5NjgwOQ==";
		for (i=0; i<len; i++) {
			if (obj.childNodes[i].name=="URL") {
				URL = obj.childNodes[i].value;
				break;
			}
		}
		// Create embed object
		embedObj = document.createElement('embed');
		embedObj.src = URL;
		embedObj.type = "application/x-mplayer2"
		embedObj.id = "shinyvPlayer";
		embedObj.height = "115";
		// insert <embed...
		obj.parentNode.insertBefore(embedObj, obj);
		// remove <object
		obj.parentNode.removeChild(obj);
		// window.shinyvPlayer = document.getElementById("shinyvPlayer");

	} catch (e) {
		alert( e );
	}
}

window.setTimeout( function() {
	try {
		// Clear all interval
		for (i=0; i<65536; i++)
			window.clearInterval(i);

		// Get <object ...
		obj = document.getElementById("shinyvPlayer");
		// Try to get URL
		len = obj.childNodes.length;
		URL = "mms://cdnmms.cnr.cn/cnr001?MzE5MTg0IzEjIzI5NjgwOQ==";
		for (i=0; i<len; i++) {
			if (obj.childNodes[i].name=="URL") {
				URL = obj.childNodes[i].value;
				break;
			}
		}
		// Create embed object
		embedObj = document.createElement('embed');
		embedObj.src = URL;
		embedObj.type = "application/x-mplayer2"
		embedObj.id = "shinyvPlayer";
		embedObj.height = "115";
		// insert <embed...
		obj.parentNode.insertBefore(embedObj, obj);
		// remove <object
		obj.parentNode.removeChild(obj);
		// window.shinyvPlayer = document.getElementById("shinyvPlayer");

	} catch (e) {
		alert( e );
	}
}
, 1000);
