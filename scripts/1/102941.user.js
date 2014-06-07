// ==UserScript==
// @name           cleanHeise 
// @author         twuertele
// @version        0.3
// @description    Removes the Sitebar, and other areas
// @include	   http://*.heise.de/*
// ==/UserScript==

(function(){
	GM_addStyle("#mitte #mitte_rechts { display: none; min-height: 0;}");
    GM_addStyle("#mitte #mitte_links { width: 100%; min-height: 0; }");
	GM_addStyle("#sitemap { display: none; }");
	GM_addStyle("#social_bookmarks { display: none; }");
	GM_addStyle(".related_items { display: none; }");
	GM_addStyle("#navi_top_container { display: none; }");
	GM_addStyle("#bannerzone { display: none; }");
	GM_addStyle("#container_content { top: 0; }");
	GM_addStyle("#login_suche { display: none; }");
	GM_addStyle("#navigation { display: none; }");
	GM_addStyle("#breadcrumb { display: none; }");
	GM_addStyle("p.themenseiten { display: none; }");
	GM_addStyle("p.news_option { display: none; }");
	GM_addStyle("p.news_navi { display: none; }");
	GM_addStyle("p.permalink { display: none; }");
	GM_addStyle("#navi_bottom { display: none; }");
    GM_addStyle("#logo_bereich { display: none; }");
    GM_addStyle("#themen_aktuell { display: none; }");
    
	GM_addStyle("#mitte_news p { font-size: 16px; color: #222; line-height: 24px; font-family: 'Droid Serif', georgia, serif; }");
})();