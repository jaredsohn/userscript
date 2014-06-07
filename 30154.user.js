// ==UserScript==
// @name          orkut gray stripe version 1.2
// @namespace     orkut gray stripe version 1.2
// @description	  orkut gray stripe version 1.2
// @author        meliski 
// @homepage      http://www.orkut.com.br/Profile.aspx?uid=18106491074574264075
// @include       http://www.orkut.*/*
// ==/UserScript==

var css = "   ul.intabs li.sel {background-image: url(http://img133.imageshack.us/img133/9089/tabselrzq4.png);}     ul.intabs li.sel .ltab {background-image: url(http://img151.imageshack.us/img151/7475/tabsellpj4.png);}   .listdivi In{ background-color: transparent  !important; }  .spacer, .newGaia { background-color: transparent  !important; }  .newMain { background-color: transparent  !important; }  .newFooter { background-color: transparent  !important; }  .JoinNow  { background-color: transparent  !important; }  parain promobg {display: none;}     .userinfodivi, .ln, .userinfodivi { background-color: #cdcdcd  !important; }   .listdivi In { background-color: #cdcdcd  !important; }   .logobg { background-color: transparent  !important; }  .logo{background: transparent url(\"http://img157.imageshack.us/img157/9617/orkutlogocopyly7.png\") !important; background-color: transparent  !important; }     #headerin{ background: transparent  !important; }      #header { background: transparent  !important; }    .boxgrid{background-color: #FFFFFF !important;}   .boxmid{background-color: #FFFFFF !important;}    .listfl{color:#696969 !important; font-weight: bold !important;}   .listitemchk{background-color: #FFFFFF !important;}   .listitem{background-color: #FFFFFF !important;}   .relbutton, .userbutton, .listdark{background: #f5eeee !important;}   .listlight{background: #FFFFFF !important;}   p,h1,h2,h3,h4,table,tr,b,form,ul,li,td,div{color: #696969 !important;}      a[href] { color: #696969 !important; text-decoration: none !important; }      a[href]:hover { color: #cdcdcd !important; text-decoration: none !important; }       textarea, input, option, select {repeat-x fixed !important; color: #696969 !important; }     body { background: fixed transparent url(\"http://img183.imageshack.us/img183/3205/01zg9.jpg\") !important; }     .newsitem, .promobg, .promo, .warning{background: #f5eeee !important; color: #696969 !important; text-align:left !important; }";
   
   
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
