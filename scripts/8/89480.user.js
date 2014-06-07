Compartilhar / Salvar
E-mail
Marcador
FacebookdiHITTDeliciousGoogle BookmarksMySpaceYahoo BuzzStumbleUponBeboWordPressOrkutEvernoteStumpediaPosterousMSDNExpressionTipdPlurkYahoo MessengerMozillacaTypePad PostMixxTechnorati FavoritesCiteULikeHemidemiInstapaperXerpiWinkBibSonomyTailrankKledyMeneameBookmarks.frNewsVineFriendFeedPingProtopage BookmarksFavesWebnewsPushaSlashdotAllvoicesImera BrazilLinkaGoGounalogDiglogTumblrCurrentSpurlOneviewSimpyBuddyMarksViadeoWistsBackflipSiteJotDZoneHyvesBitty BrowserSymbaloo FeedsFolkdNewsTrustPrintFriendlyTuenti
Google GmailHotmail
	
TwitterDiggGoogle BuzzRedditMessengerYahoo BookmarksMister-WongGoogle ReaderXINGNetvibes ShareStrandsDailyMeTechNetArtoSmakNewsAIMIdenti.caBlogger PostBox.netNetlogShoutwireJumptagsFunPPhoneFavsNetvouzDiigoBlogMarksStartAidKhabbrYoolinkTechnotizieMultiplyPlaxo PulseSquidooBlinklistYiGGSegnaloYouMobFarkJamespotTwiddlaMindBodyGreenHuggNowPublicLiveJournalHelloTxtYampleLinkatopiaLinkedInAsk.com MyStuffMapleConnoteaMyLinkVaultSphinnCare2 NewsSphereGabbrTagzaVodPodAmazon Wish ListRead It LaterEmail
Yahoo MailAOL Mail
Enviar de qualquer e-mail ou programa de e-mail:
Any email    
Fornecido por AddToAny
Userscripts.org
Luana Buainain

    * comments
    * favorite scripts
    * monitored topics
    * script management
    * settings
    * public profile

| Logout
0 unread messages
Search all scripts

    * Scripts
    * Jetpacks
    * Tags
    * Forums
    * People
    * Blog
    * Groups
    * Guides
    * Books

GMail Without Ads!
By xMDKx — Last update Oct 9, 2009 — Installed 29,195 times. Daily Installs: 46, 37, 35, 35, 25, 41, 26, 14, 25, 20, 28, 36, 34, 28, 20, 21, 40, 31, 37, 38, 31, 34, 35, 26, 48, 34, 35, 39, 28, 33, 40, 48

    * About
    * Source Code
    * Reviews 8
    * Discussions 26
    * Fans 97
    * Issues
    * Share

There are 5 previous versions of this script.

// ==UserScript==
// @name	  GMail Without Ads!
// @version	  2.02
// @description	  GMail without ads, simple as it!
// @author	  MDK (http://thecoreme.org/mdk) - based on original GMail in Blue: Professional skin from jbmarteau
//			* 1.01 - Thanks to kris7topher for fix the border on the right
//			* 1.02 - Fixed the overriding problem with large subjects
//			* 2.0  - Fixed the "right-side" labs features (chat and labels)
//			       - Bumped to a new version
//			* 2.01 - Fixed some dependencies (like Create a document lab feature)
//			* 2.02 - Fixed quick link positioning
// @include	  http://mail.google.com/*
// @include	  https://mail.google.com/*
// @include	  http://*.mail.google.com/*
// @include	  https://*.mail.google.com/*
// ==/UserScript==

(function(){
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* QUICK LINKS*/ table.iY > tr > td:first-child + td > div { width: auto !important } table.iY > tr > td:first-child + td + td > div { width: 0 !important; position: relative !important; font-size: 85% !important; } table.iY > tr > td:first-child + td + td > div > div { position: absolute !important; right: 10px !important; top: -2px !important} table.iY div.hj { width: auto !important;} table.iY div.hj div.hk { display: inline !important; padding-right: 3px !important;} /* NO ADS! */ .u5, .u8 { display: none !important;} table[class=\"T1HY1 nH iY\"] { width: 100% !important;} div[class=\"ip iq\"] { margin-right: 13px !important;} textarea.ir { width: 100% !important;}";

if (typeof GM_addStyle != "undefined"){
	GM_addStyle(css);
} else if (typeof addStyle != "undefined"){
	addStyle(css);
} else{
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0){
		var node = document.createElement("style");
		
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

Because it's your web

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
