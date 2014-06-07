// ==UserScript==
// @name          Preto - Templah.com
// @namespace     http://userstyles.org
// @description	  Modelo cores - preto. Para mais modelos acesse http://www.templah.co
// @author        Templah.com
// @homepage      http://userstyles.org/styles/6991
// @include       http://orkut.com.br/*.aspx?uid=5471148158504032555
// @include       https://orkut.com.br/*.aspx?uid=5471148158504032555
// @include       http://*.orkut.com.br/*.aspx?uid=5471148158504032555
// @include       https://*.orkut.com.br/*.aspx?uid=5471148158504032555
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Para mais modelos Visite: TEMPLAH.COM */ body{ background:url(http://i264.photobucket.com/albums/ii171/ppiedade/pretocor.jpg ) !important; font-family: arial !important; font-size: 100% !important; } a{ color: #9b9b9b!important; font-family: arial !important; font-size: 100% !important; } } a:hover{ color: #9b9b9b!important; text-decoration: None !important; } a.userbutton{background-color:#000000!important} .listitemlight,.listitem,.listitemchk{background-color: #abaaaa!important} .listdark {background-color: #000000!important} .listitemdark,.listitemsel{background-color: #000000!important} .userinfodivi,.ln,a.userbutton:hover{background-color: #3e3e3e!important} img[src*=\"/chhota/\"], img[src*=\"/medium/\"], img[src*=\"/small/\"], img[src*=\"/milieu/\"], img[src*=\"/klein/\"]{ opacity: 0.80 !important; } img[src*=\"/chhota/\"]:hover,img[src*=\"/medium/\"]:hover, img[src*=\"/small/\"]:hover, img[src*=\"/milieu/\"]:hover, img[src*=\"/klein/\"]:hover { opacity: 1.00 !important; } #header,#header li.logobg{background-color:#000000!important } #header li.logobg .logo{background:url(http://i264.photobucket.com/albums/ii171/ppiedade/iconpreto.jpg ) !important} #header{height:30px !important;} #header li a{color:#ffffff} #header li a:hover{color: #ffffff !important;} #header li{color:#ffffff!important;} .module .boxmid,.module .boxmidsml,.module .boxmidlrg,.module .boxmidlock,.module box_top_lh.png{background-color:#b7b6b6 !important} .module .topl_lrg h1{font-family: Ript !important;} .module h2{color:#000000!important;font-family: Ript !important;} .module h2:first-letter{text-transform: uppercase !important;color: #000000!important;font-size: 200% !important;} .userratings .lf{margin-right:30px !important;color:#000000!important;font-size:12px !important;line-height:12px !important;text-transform:lowercase !important;padding:5px 0 !important;font-family: arial !important;} .boxgrid{background-color:#939393 !important;} .thumbbox{background-color: #939393!important;} #footer .logosml{margin-right: 10px !important;} #footer .foottxt{font-size:0px !important; letter-spacing: 0px !important;line-height:32px !important;color:#ff0b0b!important;position:relative !important;z-index:69 !important} #footer .foottxt a{padding: 10px 10px 10px 10px !important;font-size: 12px !important;} #footer .foottxt a:hover{background:transparent !important;} /* Para mais modelos Visite: TEMPLAH.COM */";
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
