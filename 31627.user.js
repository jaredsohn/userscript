// ==UserScript==
// @name           heise-center-expand-width-nav
// @namespace      heise
// @include        http://www.heise.de/*/meldung/*
// @include        http://www.heise.de/*/foren/*
// @include        http://www.heise.de/newsticker/*
// @include        http://www.heise.de/foren/*
// @exclude       http://www.heise.de/foren/
// ==/UserScript==
(function(){
 userid=214555 // Hier eigene User-ID eintragen, damit Link funktioniert
 style=document.createElement("style");
 //style.innerHTML="#mitte_rechts, #bannerzone, #sitemap {display: None !important;} #mitte_links {width: 100% /* set your favourite width here */ !important;} #container_content {margin: 0;background: none !Important;width: 100%} #mitte {background: white !important;width: 100%} .adbottom{display: None}, #container{position: relative !important; top: -100px !important; width: 90% !important; margin: 0 auto !important; }";
 style.innerHTML="body{font-family:'Times New Roman',Times,serif !important; background: #FFFFFF !important }#mitte_nav {border-bottom:1px solid #666666;border-right:1px solid #666666;float:left;padding:0.2em 11px;background-color:#cccccc;} #container  {position: relative !important;top: -100px !important;width: 100% !important;margin: 0 auto !important;}#mitte{width:87% !important;margin-left: 0 !important;background: none !Important;}#container_content{width: 100% !important;margin: 0;background: none !Important;}#mitte_links{width: 100% !important;background: none !Important;}#mitte_rechts{width: 0px !important;display: none !important;}#sitemap{display: none !important;}#bannerzone{display: none !important;}";
 style.innerHTML+=" .forum_navi{ background:#0334A0 none repeat scroll 0 0 !important; border:1px solid #D2D0D0 !important; color:#FFFFFF !important; } .forum_navi li a:visited { color:#FFFFFF !important; } .forum_navi a, .fora_list a:hover { color:#FFFFFF !important; text-decoration:underline !important; }";
 document.getElementsByTagName("head")[0].appendChild(style);
 
 
 nav=document.createElement("div");
 nav.id="mitte_nav";

 nav.innerHTML ='<p class="navi_links_news"><a href="http://www.heise.de/newsticker/" class="navi_links">7-Tage-News</a><br><a href="http://www.heise.de/newsticker/archiv/" class="navi_links">News-Archiv</a><br>    <a href="http://heise-online.mobi/" class="navi_links" title="Newsticker für mobile Endgeräte">News unterwegs</a><br>    <a href="http://www.heise.de/newsletter/" class="navi_links">Newsletter</a><br><a href="http://www.heise-online.co.uk/" class="navi_links">English News</a><br>	    <a href="http://www.heise.de/news-extern/" class="navi_links">News einbinden</a><br></p>';
 nav.innerHTML +='<p class="navi_links_dienste"><a href="http://www.heise.de/telefontarife/" class="navi_links">Telefontarife</a><br>    <a href="http://www.heise.de/internettarife/" class="navi_links">Internettarife</a><br>    <a href="http://www.heise.de/netze/tools/imonitor-internet-stoerungen/" class="navi_links">Internet-Störungen</a><br></p>';
 nav.innerHTML +='<p class="navi_links_dienste_zwei"><a href="http://www.heise.de/software/" class="navi_links">Software/Download</a><br>	<a href="http://www.heise.de/itmarkt/" class="navi_links">IT-Markt</a><br> <a href="http://www.heisetreff.de/" class="navi_links">heisetreff</a><br></p>';
 nav.innerHTML +='<p class="navi_links_user"><a href="http://www.heise.de/foren/" class="navi_links">Leserforum</a><br/><br/><a href="http://www.heise.de/extras/foren/user_postings/user-'+userid+'/" class="navi_links">Eigene Beitr&auml;ge</a></p>';
 nav.innerHTML +='<p class="navi_links_kontakt"><a href="http://www.heise.de/abo/" class="navi_links">Abo &amp; Heft</a><br><a href="http://www.heise.de/events/" class="navi_links">Veranstaltungen</a><br>    <a href="http://www.heise.de/kontakt/" class="navi_links">Kontakt</a><br>    <a href="http://www.heise.de/mediadaten/" class="navi_links">Mediadaten</a><br></p>'
 //nav.innerHTML +='<p class="navi_links_kontakt"><a href="http://www.heise.de/extras/foren/user_postings/user-'+userid+'/" class="navi_links">Eigene Beitr&auml;ge</a>';
 document.getElementById("container_content").appendChild(nav);
 
//Navigation
 var navbar=document.getElementById("logo_bereich").getElementsByClassName("navigation")[0];
navbar.parentNode.removeChild(navbar);

var navpop=document.getElementsByClassName("heisetopnavi_navi")[0];
navpop.parentNode.removeChild(navpop);
 //bc=document.getElementById("breadcrumb");
 //content.removeChild(bc);
 
 
 // Altes Logo
 logodiv=document.getElementsByClassName("logo")[0];
 logo=logodiv.getElementsByTagName("a")[0];
 logo.parentNode.removeChild(logo);
 logodiv.innerHTML = '<a href="http://www.heise.de"><img src="http://www.heise.de/icons/ho/heise.gif" width=137 height=60 /></a>';
 // logo=document.createElemnt("a");
 // logo.href="http://www.heise.de";
 // logo.innerHTML = '<img src="http://www.heise.de/icons/ho/heise.gif" width=137 height=60 />';
 // logodiv.appendChild(logo);
 
 // Zweite Navigation weg
 nav_top=document.getElementById("navi_top");
 zeile=document.getElementsByClassName("zweite_zeile")[0];
 nav_top.removeChild(zeile);
 

 
 // Info-Zeile weg
 //info=document.getElementsByClassName("indexlist_item");
 // var info=document.getElementsByClassName("indexlist_info")[0];
 // info.parentNode.removeChild(info);
 // for (var x in info)
 // {
	// info[x].parentNode.removeChild(info[x]);
// }
 })();
