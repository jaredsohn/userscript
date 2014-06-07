// ==UserScript==
// @name           FixbugFlashLinuxChrome16
// @licence        Summary: Free for personal non-commercial use; http://userscripts.org/scripts/show/126963
// @description    Fixbug: Chrome on ubuntu CAN NOT display flash when missing attribute type=application/x-shockware-flash
// @version        2.0.0
// @include        *
// @unwrap
// @run-at document-end
// ==/UserScript==
version = "2.0.0";


var xs = document.getElementsByTagName('embed');

for (var i = 0; i < xs.length; i++){
	var x = xs[i];
	var y = x.parentNode;
	//xac dinh xem co phai la flash hay ko
	var src = x.getAttribute('src');
	if (x.getAttribute('type') == null  &&  src != null  &&  (src.indexOf('.swf') >0 || src.indexOf('.spl') >0)) {
		//xoa x;
		y.removeChild(x);
		//them attr
		x.setAttribute('type','application/x-shockwave-flash');
		//add x lai
		y.appendChild(x);	
	}
}
