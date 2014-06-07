// ==UserScript==
// @name           icefile.info download delay bypasser
// @namespace      http://www.digivill.net/~joykillr
// @description    Immediate download link for icefile.info when javascript is blocked
// @include        http://*.icefile.info/index.php*
// @include        http://icefile.info/index.php*
// ==/UserScript==
//

var nu = document.getElementsByTagName("script");
for (var x=0; x<nu.length; x++) {
	if (nu[x].textContent.indexOf("show_wait")!=-1) {
		var y = nu[x].textContent.toString();
		y = y.split("window.location=")[1].split(">")[0];
		y = y.split("\\\'")[1].split("\\\'")[0];
		break;
		}
}

if (y) {document.getElementById("show_wait").innerHTML = '<a href="'+y+'">Download File Now</a>';
GM_addStyle('#show_wait>a {font-size:110%!important; font-weight:bolder!important; background-color:#eeeeee!important; text-decoration:underline!important;}');}
