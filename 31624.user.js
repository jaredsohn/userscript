// ==UserScript==
// @name           heise-leserforum
// @namespace      heise
// @description    Passt die Leserforen-Übersicht des neuen Designs an
// @include        http://www.heise.de/foren/
// ==/UserScript==
(function(){
 userid=214555 // Hier eigene User-ID eintragen, damit Link funktioniert
 style=document.createElement("style");
 style.innerHTML="#mitte_nav {float:left;padding:0.2em 11px;}#mitte_rechts{width: 30% !important; background: #eeeeee !important} #mitte{width:83% !important; !important;background: none} #mitte_links{width: 70% !important;background: none !Important;margin: 0 auto !important;} #container  {position: relative !important;top: -100px !important;width: 100% !important;margin: 0 auto !important;} #bannerzone{display: none !important;} .online-markt{display: none !important;} .col100preisvergleich{display: none !important;} .sales{display: none !important;} #sitemap{display: none !important}";
 document.getElementsByTagName("head")[0].appendChild(style);
 
 nav=document.createElement("div");
 nav.id="mitte_nav";
 nav.innerHTML='<p class="navi_links_news"><a href="http://www.heise.de/newsticker/" class="navi_links">7-Tage-News</a><br><a href="http://www.heise.de/newsticker/archiv/" class="navi_links">News-Archiv</a><br>    <a href="http://heise-online.mobi/" class="navi_links" title="Newsticker für mobile Endgeräte">News unterwegs</a><br>    <a href="http://www.heise.de/newsletter/" class="navi_links">Newsletter</a><br><a href="http://www.heise-online.co.uk/" class="navi_links">English News</a><br>	    <a href="http://www.heise.de/news-extern/" class="navi_links">News einbinden</a><br></p>';
 nav.innerHTML +='<p class="navi_links_dienste"><a href="http://www.heise.de/telefontarife/" class="navi_links">Telefontarife</a><br>    <a href="http://www.heise.de/internettarife/" class="navi_links">Internettarife</a><br>    <a href="http://www.heise.de/netze/tools/imonitor-internet-stoerungen/" class="navi_links">Internet-Störungen</a><br></p>';
 nav.innerHTML +='<p class="navi_links_dienste_zwei"><a href="http://www.heise.de/software/" class="navi_links">Software/Download</a><br>	<a href="http://www.heise.de/itmarkt/" class="navi_links">IT-Markt</a><br> <a href="http://www.heisetreff.de/" class="navi_links">heisetreff</a><br></p>';
 nav.innerHTML +='<p class="navi_links_user"><a href="http://www.heise.de/foren/" class="navi_links">Leserforum</a><br><a href="http://www.heise.de/extras/foren/user_postings/user-'+userid+'/" class="navi_links">Eigene Beitr&auml;ge</a></p>';
 nav.innerHTML +='<p class="navi_links_kontakt"><a href="http://www.heise.de/abo/" class="navi_links">Abo &amp; Heft</a><br><a href="http://www.heise.de/events/" class="navi_links">Veranstaltungen</a><br>    <a href="http://www.heise.de/kontakt/" class="navi_links">Kontakt</a><br>    <a href="http://www.heise.de/mediadaten/" class="navi_links">Mediadaten</a><br></p>'
 //nav.innerHTML +='<p class="navi_links_kontakt"><a href="http://www.heise.de/extras/foren/user_postings/user-'+userid+'/" class="navi_links">Eigene Beitr&auml;ge</a>';
 document.getElementById("container_content").appendChild(nav);
 })();