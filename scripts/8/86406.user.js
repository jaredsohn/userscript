Share / Save
Email
Bookmark
FacebookMultiplyDeliciousGoogle BookmarksYahoo BuzzStumbleUponBeboWordPressOrkutEvernoteStumpediaPosterousMSDNExpressionTipdPlurkYahoo 

MessengerMozillacaTypePad PostMixxTechnorati FavoritesCiteULikeWindows Live 

SpacesFunPPhoneFavsNetvouzDiigoBlogMarksStartAidKhabbrYoolinkTechnotiziePlaxo 

PulseSquidooBlinklistYiGGSegnaloYouMobFarkJamespotTwiddlaMindBodyGreenHuggNowPublicTumblrCurrentSpurlOneviewSimpyBuddyMarksViadeoWistsBackflipS

iteJotDZoneHyvesBitty BrowserSymbaloo FeedsFolkdNewsTrustPrintFriendlyTuenti
Google GmailHotmail
	
TwitterMySpaceDiggGoogle BuzzRedditWindows Live FavoritesYahoo BookmarksMister-WongGoogle ReaderXINGNetvibes 

ShareStrandsDailyMeTechNetArtoSmakNewsAIMIdenti.caBlogger 

PostBox.netNetlogShoutwireJumptagsHemidemiInstapaperXerpiWinkBibSonomyTailrankKledyMeneameBookmarks.frNewsVineFriendFeedPingProtopage 

BookmarksFavesWebnewsPushaSlashdotAllvoicesImera BrazilLinkaGoGounalogDiglogPropellerLiveJournalHelloTxtYampleLinkatopiaLinkedInAsk.com 

MyStuffMapleConnoteaMyLinkVaultSphinnCare2 NewsSphereGabbrTagzaVodPodAmazon Wish ListRead It LaterEmail
Yahoo MailAOL Mail
Send from any other email service:
Any email    
Powered by AddToAny
Userscripts.org
williamchen0613

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

spam
By tripplezix — Last update 6 hours ago — Installed 55 times. Daily Installs: 3, 7

    * About
    * Source Code
    * Reviews 0
    * Discussions 0
    * Fans 0
    * Issues
    * Share

There are 4 previous versions of this script.

// ==UserScript==
// @name			spam
// @namespace		666
// @description	Spams Facebook Wall with Message
// @include		http://www.facebook.com/*
// ==/UserScript==

function sendclick(el){
var clickevent=document.createEvent("MouseEvents");
clickevent.initEvent("click", true, true);
el.dispatchEvent(clickevent);}

function spamtastic(){
var ray = ["betul,,,betul,,,betul.....","mau kemana"].sort(function() {return 0.5 - Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UIComposer_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();UIComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["Are you nudist？let's do something on http://www.naturalkiss.com","http://naturalkiss.com"].sort(function() {return 0.5 - Math.random

()});
setTimeout(a,2000);

}
a();

}

GM_registerMenuCommand("nyepam dolo ah",function(){spamtastic()});

Because it's your web

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
