// ==UserScript==
// @name          Vasco - Templah.com
// @namespace     http://userstyles.org
// @description	  Modelo times - Vasco. Para mais modelos acesse http://www.templah.co
// @author        Templah.com
// @homepage      http://userstyles.org/styles/7049
// @include       http://orkut.com.br/*?uid=4526768893120695132
// @include       https://orkut.com.br/*?uid=4526768893120695132
// @include       http://*.orkut.com.br/*?uid=4526768893120695132
// @include       https://*.orkut.com.br/*?uid=4526768893120695132
// ==/UserScript==

// Example:
// alert( readCookie("myCookie") );
function readCookie(name)
{
  var cookieValue = "";
  var search = name + "=";
  if(document.cookie.length > 0)
  { 
    offset = document.cookie.indexOf(search);
    if (offset != -1)
    { 
      offset += search.length;
      end = document.cookie.indexOf(";", offset);
      if (end == -1) end = document.cookie.length;
      cookieValue = unescape(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}

x = readCookie("GAUSR")

qs=new Array()
variaveis=location.search.replace(/\x3F/,"").replace(/\x2B/g," ").split("&")

if(variaveis!="")
{
	for(i=0;i<variaveis.length;i++)
	{
		nvar=variaveis[i].split("=")
		qs[nvar[0]]=unescape(nvar[1])
	}
}

function QueryString(variavel){
	return qs[variavel]
}

uid = QueryString("uid")

if(uid = "4526768893120695132"){
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Outros modelos confira em http://www.templah.com */ body{ background:url(http://i264.photobucket.com/albums/ii171/ppiedade/fundovasco1.jpg ) !important; font-family: arial !important; font-size: 100% !important; } a{ color: #000000 !important; font-family: arial !important; font-size: 100% !important; } a:hover{ color: #e9e9e9!important; text-decoration: None !important; } a.userbutton{background-color:#ffffff!important} .listitemlight,.listitem,.listitemchk{background-color: #adadad!important} .listdark,.listitemdark,.listitemsel{background-color: #000000!important} .userinfodivi,.ln,a.userbutton:hover{background-color: #fbfbd2!important} img[src*=\"/chhota/\"], img[src*=\"/medium/\"], img[src*=\"/small/\"], img[src*=\"/milieu/\"], img[src*=\"/klein/\"]{ opacity: 0.80 !important; } img[src*=\"/chhota/\"]:hover,img[src*=\"/medium/\"]:hover, img[src*=\"/small/\"]:hover, img[src*=\"/milieu/\"]:hover, img[src*=\"/klein/\"]:hover { opacity: 1.00 !important; } #header{background-color:#000000!important } #header li.logobg{background-color:#000000!important } #header li.logobg .logo{background:url(http://i264.photobucket.com/albums/ii171/ppiedade/iconvasco.jpg ) !important} #header{height:30px !important;} #header li a{color:#ffffff} #header li a:hover{color: #ffdd66 !important;} #header li{color:#ffffff!important;} .module .boxmid,.module .boxmidsml,.module .boxmidlrg,.module .boxmidlock,.module box_top_lh.png{background-color:#4b4848 !important} .module .topl_lrg h1{font-family: Ript !important;} .module h2{color:#000000!important;font-family: arial!important;} .module h2:first-letter{text-transform: uppercase !important;color: #c10506!important;font-size: 200% !important;} .userratings .lf{margin-right:30px !important;color:#ffffff!important;font-size:12px !important;line-height:12px !important;text-transform:lowercase !important;padding:5px 0 !important;font-family: arial !important;} .boxgrid{background-color:#4d4444 !important;} .thumbbox{background-color: #4d4444!important;} body:before{content:url(http://i264.photobucket.com/albums/ii171/ppiedade/vasco1copy-1.jpg ?imgmax=1280)} .listitemsel{border-color: #000000!important}div.feedparent{color: #888888 !important} .exampletxt{color: Gray !important} .ltxt,.rfdte{color: #000000!important} .formerror{color: Gray !important} .promo,.warning{color: #000000!important} .alttxt{color: #ffffff!important} .orkuttitle{color: #fbfd4b!important}.inlineerror{color: #666666 !important}.percentbar{border-color: #666666 !important} .requiredfield{color: #ffffff!important} a.userbutton{color: #000000!important} .useremail{color: #ffdd66!important} .floatanchorselected{background-color: #19fb99!important} a {color: #939393!important} .floatanchornormal{color: #ffffff!important} span.adsurl{color: #b70505!important} .inlinecorrect{color: #000000!important} .parabtns a.btn:hover,.inlinebtns a.btn:hover{color: #b70505!important}ul.intabs li.sel a{color:#fff !important}/* CONFIRA OUTROS MODELOS EM WWW.TEMPLAH.COM */";
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

}