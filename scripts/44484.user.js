// ==UserScript==
// @name          Kaskus Fixups *Edited
// @namespace     http://userstyles.org
// @description	  By Pandu E Polua
// @author        pcgamer
// @homepage      http://userstyles.org/styles/14548
// @include       http://119.110.77.3/*
// @include       https://119.110.77.3/*
// @include       http://*.119.110.77.3/*
// @include       https://*.119.110.77.3/*
// @include       http://119.110.77.4/*
// @include       https://119.110.77.4/*
// @include       http://*.119.110.77.4/*
// @include       https://*.119.110.77.4/*
// @include       http://kaskus.co.id/*
// @include       https://kaskus.co.id/*
// @include       http://*.kaskus.co.id/*
// @include       https://*.kaskus.co.id/*
// @include       http://kaskus.us/*
// @include       https://kaskus.us/*
// @include       http://*.kaskus.us/*
// @include       https://*.kaskus.us/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* * Kaskus Clean Set */ div.page { width: 100% !important; } table[id^=\"post\"] td.alt2 { max-width: 175px !important; min-width: 175px !important; overflow: hidden !important; } td.alt2 div.smallfont+div.smallfont div { overflow: hidden !important; } div[id^=\"post_message\"] { overflow: auto !important; } form > table.tborder > tbody > tr > td.panelsurround > div.panel > div { width: 790px !important; margin: auto !important; } td[id^=\"td_post\"] { max-width: 100px !important; } div.page > div { padding-left: 20px !important; padding-right: 20px !important; } #Middlenahome { height: 210px !important; } #InfoFoLeft { padding-left: 8px !important; } #Middlenahome1 { height: 10px !important; } #Textatas { display: none !important; } #TextInfo { margin-top: -30px !important; } #Middlehome021 { display: none !important; } #exp { display: none !important; } #MiddleBanner { display: none !important; } #Middle_blue { display: none !important; } #MiddleBanner03 { display: none !important; } #MidGaris { display: none !important; } #advertisement { display: none !important; } #MidGaris03 { display: none !important; } #RightNya { display: none !important; } #MiddleBanner1 { display: none !important; } #JB_Middlehome021 { padding-top: 1px !important; } #JB_Middlenahome1 { height: 0px !important; } #MidGaris1 { display: none !important; } .home_fjb_lv2_1 > div + div + div > div #navigation { margin-top: -94px !important; } div .home_fjb_lv2_1 > div > div > div > a > img { margin-left: 210px !important; position:absolute !important; margin-top: -125px !important; } .home_fjb_lv4_1 { padding-top: 10px !important; } #lingForumIsifr { width: 723px !important; padding-left: 3px !important; } #Conho01midd { display: none !important; } #Conho01Left, #Conho01right { display: none !important; } div#lingForumIsifr_mid > div + div { width: 720px !important; } #lingForumIsifr_upright, #lingForumIsifr_downright { float: right !important; } #lingForumIsifr_upmid, #lingForumIsifr_downmid { width: 712px !important; margin-left: 0px; } #TextInfo > div > div.TextInterest { display: none !important; } #drForum { padding-left: 132px !important; } #drForum > div { width: 728px !important; } #ContenForum { padding-bottom: 10px !important; } #RightEnjoy { display: none !important; } #JudulForumBlue { width: 720px !important; } form[action=\"forumdisplay.php\"] > table { width: 728px !important; } form[action=\"forumdisplay.php\"] + div { width: 728px !important; } #IsForum { width: 729px !important; } div#IsForum > table { width: 728px !important; } #LingBawah { width: 728px !important; } div#LingBawah > table { width: 728px !important; } .MenuBawahna, .LingBottom { width: 892px !important; } .Menubwh2, .MenuBawahna2 { padding-left: 80px !important; } #navbawah ul li { width: 600px !important ; } #dfFooter { padding-left: 55px !important; } form[action^=\"editpost.php\"] td.panelsurround > div.panel > div { margin-left: 25px !important; width: 40% !important; } form[action^=\"newreply.php\"] td.panelsurround > div.panel > div { margin-left: 25px !important; margin-right: 25px !important; width: 51% !important; } form[action^=\"newreply.php\"] > table.tborder > tr + tr > td.panelsurround { text-align: left !important; } td.panelsurround div.smallfont { float: none !important; margin-bottom: 10px !important; }";
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
