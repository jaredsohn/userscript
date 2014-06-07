// ==UserScript==
// @name			JUMPer
// @namespace		http://daisukeyamanaka.blogspot.com/
// @description		Jump up to top of the page.
// @include			*
// @resource		jump_up http://lh6.ggpht.com/yamanaka.daisuke/SIP_ekW48LI/AAAAAAAAAKg/vhExTJW63wk/jump_up.gif
// @resource		jump_dwn http://lh5.ggpht.com/yamanaka.daisuke/SIP_eVek5oI/AAAAAAAAAKY/3E-5RHRN6lU/jump_dwn.gif
// ==/UserScript==
//
// Auther	86
// version	0.5.6 2008-08-09
// 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "JUMPer", and click Uninstall.
//
// --------------------------------------------------------------------
//

var diffHeight = document.height - window.innerHeight
if(diffHeight > 0 && window == window.parent) {
	var navDiv = document.createElement('div');
		navDiv.setAttribute('id', 'jumper');
		navDiv.setAttribute('style', 'padding:5px;position:fixed;' +
			'bottom:30%;right:3px;font-size:10px;' +
			'background:#fff;color:#000;border:1px solid #ccc;' +
			'z-index:256;text-align:left;font-weight:normal;' +
			'line-height:120%;font-family:verdana;');
	var objBody = document.getElementsByTagName("body")[0];
	objBody.appendChild(navDiv);

	var imgDiv = document.createElement('img');
		var imgUp = GM_getResourceURL('jump_up');
		var imgDown = GM_getResourceURL('jump_dwn');
		var dwnImg = "this.src='" + imgDown + "'";
		var upAct = "this.src='" + imgUp + "';backToTop()";
		var upImg = "this.src='" + imgUp + "'";
		imgDiv.setAttribute('src', imgUp);
		imgDiv.setAttribute('onMouseDown', dwnImg);
		imgDiv.setAttribute('onMouseUp', upAct);
		imgDiv.setAttribute('onMouseOut', upImg);
	document.getElementById('jumper').appendChild(imgDiv);

	var scrDiv = document.createElement('script');
		scrDiv.type = 'text/javascript';
		scrDiv.innerHTML = 'function backToTop() {' +
					'var x1 = x2 = x3 = 0;' +
					'var y1 = y2 = y3 = 0;' +
					'if (document.documentElement) {' +
						'x1 = document.documentElement.scrollLeft || 0;' +
						'y1 = document.documentElement.scrollTop || 0; }' +
					'if (document.body) {' +
						'x2 = document.body.scrollLeft || 0;' +
						'y2 = document.body.scrollTop || 0; }' +
					'x3 = window.scrollX || 0;' +
					'y3 = window.scrollY || 0;' +
					'var x = Math.max(x1, Math.max(x2, x3));' +
					'var y = Math.max(y1, Math.max(y2, y3));' +
					'window.scrollTo(Math.floor(x / 2), Math.floor(y / 2));' +
					'if (x > 0 || y > 0) {' +
					'window.setTimeout("backToTop()", 25); } }'
	objBody.appendChild(scrDiv);
}
