// ==UserScript==
// @name          Orkut sem  azul  chato
// @namespace     http://userstyles.org
// @description	  cortesia www.emersonbelanda.com
// @author        modificado de Templah.com
// @homepage      http:www.emersonbelanda.com
// @include       http://www.orkut.*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Outros modelos confira em http://templah.com */ body{ background:url(http://i264.photobucket.com/albums/ii171/ppiedade/ironfundo.jpg) !important; font-family: arial !important; font-size: 100% !important; }a{ color: #000000!important; font-family: arial !important; font-size: 100% !important; } a:hover{ color: #342bd1!important; text-decoration: None !important; } a.userbutton{background:url(http://i264.photobucket.com/albums/ii171/ppiedade/estiloiron1.jpg ) !important} .listitemlight,.listitem,.listitemchk{background-color: white!important} .listdark,.listitemdark,.listitemsel{background-color: #000000 white!important} .userinfodivi,.ln,a.userbutton:hover{background-color: white!important} img[src*=\"/chhota/\"], img[src*=\"/medium/\"], img[src*=\"/small/\"], img[src*=\"/milieu/\"], img[src*=\"/klein/\"]{ opacity: 0.80 !important; } img[src*=\"/chhota/\"]:hover,img[src*=\"/medium/\"]:hover, img[src*=\"/small/\"]:hover, img[src*=\"/milieu/\"]:hover, img[src*=\"/klein/\"]:hover { opacity: 1.00 !important; } #header,#header li.logobg{background:url(http://i264.photobucket.com/albums/ii171/ppiedade/barrairon2.jpg ) !important} #header li.logobg .logo{background:url(http://i264.photobucket.com/albums/ii171/ppiedade/iconiron.jpg ) !important} #header{height:30px !important;} #header li a{color:#4dc941} #header li a:hover{color: #000000 !important;} #header li{color:#000000!important;} .module .boxmid,.module .boxmidsml,.module .boxmidlrg,.module .boxmidlock,.module box_top_lh.png{background-color:white !important} .module .topl_lrg h1{font-family: arial !important;} .module h2{color:white!important;font-family: Ript !important;} .module h2:first-letter{text-transform: uppercase !important;color: white!important;font-size: 200% !important;} .userratings .lf{margin-right:25px !important;color:#000000!important;font-size:14px !important;line-height:12px !important;text-transform:lowercase !important;padding:5px 0 !important;font-family: arial !important;} .boxgrid{background-color:white !important;} .thumbbox{background-color: white!important;} body:before{content:url(none ?imgmax=1280)} .listitemsel{border-color: #8F8F8F !important}div.feedparent{color: white!important} .exampletxt{color: white !important} .ltxt,.rfdte{color: white!important} .formerror{color: Gray !important} .promo,.warning{color: #787878!important} .alttxt{color: #727272!important} .orkuttitle{color: #ff0000!important}.inlineerror{color: #666666 !important}.percentbar{border-color: #666666!important} .requiredfield{color: #626262!important} a.userbutton{color: #000000!important} .useremail{color: #000000!important}.floatanchorselected{background-color: white!important}a,.floatanchornormal{color: #000000!important}span.adsurl{color: #fffcfc!important}.inlinecorrect{color: #333333 !important}a:hover,.parabtns a.btn:hover,.inlinebtns a.btn:hover{color: #ffffff!important}a.userbutton:hover{color: #ffffff!important}#header li a,ul.intabs li.sel a{color:#ffffff!important}/* Autor do usercss */";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
