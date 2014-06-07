Share / Save
E-mail
Bookmark
FacebookYahoo MessengerDeliciousYahoo BuzzWindows Live FavoritesYahoo BookmarksMister-WongNetvibes ShareMSDNExpressionTipdAIMIdenti.caTypePad PostNetlogFurlCiteULikeWindows Live SpacesFunPPhoneFavsNetvouzDiigoTagglyTailrankKledyMeneameBookmarks.frNewsVineFriendFeedPingProtopage BookmarksFavesWebnewsPushaSlashdotAllvoicesImera BrazilLinkaGoGoFeedmarker BookmarksHuggNowPublicTumblrCurrentSpurlOneviewSimpyGlobal GrindAsk.com MyStuffMapleGraveeBackflipSiteJotHealth RankerCare2 NewsDesign FloatBitty BrowserSymbaloo FeedsFoxiewireVodPodAmazon Wish List
GmailYahoo MailAOL Mail
	
MySpaceTwitterDiggGoogle BookmarksRedditStumbleUponBeboEvernoteStumpediaStrandsTechNetArtoSmakNewsBlogger PostMixxTechnorati FavoritesShoutwireJumptagsHemidemiInstapaperXerpiWinkBibSonomyBlogMarksStartAidKhabbrYoolinkTechnotizieMultiplyPlaxo PulseSquidooBlinklistYiGGSegnaloYouMobFarkJamespotTwiddlaMindBodyGreenunalogDiglogPropellerLiveJournalHelloTxtYampleLinkatopiaLinkedInBuddyMarksViadeoWistsConnoteaMyLinkVaultSphinnDZoneHyvesSphereGabbrTagzaFolkdNewsTrust
HotmailBuzzster
Send from any other e-mail address or e-mail program:
Any e-mail
Powered by AddToAny
Userscripts.org
Search all scripts

    * Signup
    * Login

    * Scripts
    * Tags
    * Forums
    * People
    * Blog
    * Books

Emoticons for Blogger
By raijinhro — Last update Mar 21, 2009 — Installed 43 times.

    * About
    * Source Code
    * Reviews 0
    * Discussions 0
    * Fans 0
    * Issues
    * Share

// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("yum", "http://farm3.static.flickr.com/2429/3699995470_5ae9");
	buttons += emoticonButton("stress", "http://farm3.static.flickr.com/2647/3699994370_952af921d7_o.gif");
	buttons += emoticonButton("emo", "http://farm3.static.flickr.com/2446/3699994146_9c449efc38_o.gif");
	buttons += emoticonButton("bye", "http://farm4.static.flickr.com/3499/3699994134_0fedd31a73_o.gif");
	buttons += emoticonButton("dizzy", "http://farm3.static.flickr.com/2595/3699183055_7af03cb2b9_o.gif");
	buttons += emoticonButton("hehe", "http://farm3.static.flickr.com/2572/3699182897_fcf2e11c1e_o.gif");
	buttons += emoticonButton("haha", "http://farm3.static.flickr.com/2576/3699993866_89ea32fca9_o.gif");
	buttons += emoticonButton("hi", "http://farm3.static.flickr.com/2644/3699182835_ac7c7cfe73_o.gif");
	buttons += emoticonButton("nono", "http://farm3.static.flickr.com/2436/3699182863_63e51f2498_o.gif");
	buttons += emoticonButton("love", "http://farm3.static.flickr.com/2453/3699184779_e1567bf127_o.gif");
	buttons += emoticonButton("mad", "http://farm3.static.flickr.com/2527/3699183765_eb7fb0cc07_o.gif");
	buttons += emoticonButton("confused", "http://farm3.static.flickr.com/2520/3699995042_5c518c0565_o.gif");
	buttons += emoticonButton("wth", "http://farm4.static.flickr.com/3512/3699182935_1801f25e90_o.gif");
	buttons += emoticonButton("cry", "http://farm4.static.flickr.com/3115/3699183739_61a174d173_o.gif");
	buttons += emoticonButton("happytear", "http://farm3.static.flickr.com/2599/3699994622_679fd85f2d_o.gif");
	buttons += emoticonButton("shy", "http://farm3.static.flickr.com/2556/3699994190_b826b53d53_o.gif");
	buttons += emoticonButton("lazybum", "http://farm4.static.flickr.com/3634/3699994302_d8396c5550_o.gif");
	buttons += emoticonButton("phew", "http://farm4.static.flickr.com/3430/3699995250_e8fa71b260_o.gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);

Because it's your web

Support userscripts.org by donating

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
