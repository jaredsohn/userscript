Share / Save
Email
Bookmark
Google BuzzDeliciousGoogle BookmarksMySpaceYahoo BuzzStumbleUponBeboWordPressOrkutEvernoteStumpediaPosterousMSDNExpressionTipdPlurkYahoo MessengerMozillacaTypePad PostMixxTechnorati FavoritesCiteULikeHemidemiInstapaperXerpiWinkBibSonomyTailrankKledyMeneameBookmarks.frNewsVineFriendFeedPingProtopage BookmarksFavesWebnewsPushaSlashdotAllvoicesImera BrazilLinkaGoGounalogDiglogTumblrCurrentSpurlOneviewSimpyBuddyMarksViadeoWistsBackflipSiteJotDZoneHyvesBitty BrowserSymbaloo FeedsFolkdNewsTrustPrintFriendlyTuenti
Google GmailHotmail
	
FacebookTwitterDiggRedditMessengerYahoo BookmarksMister-WongGoogle ReaderXINGNetvibes ShareStrandsDailyMeTechNetArtoSmakNewsAIMIdenti.caBlogger PostBox.netNetlogShoutwireJumptagsFunPPhoneFavsNetvouzDiigoBlogMarksStartAidKhabbrYoolinkTechnotizieMultiplyPlaxo PulseSquidooBlinklistYiGGSegnaloYouMobFarkJamespotTwiddlaMindBodyGreenHuggNowPublicLiveJournalHelloTxtYampleLinkatopiaLinkedInAsk.com MyStuffMapleConnoteaMyLinkVaultSphinnCare2 NewsSphereGabbrTagzaVodPodAmazon Wish ListRead It LaterEmail
Yahoo MailAOL Mail
Send from any other email service:
Any email    
Powered by AddToAny
Userscripts.org
HmmyeahxD

    * comments
    * favorite scripts
    * monitored topics
    * script management
    * settings
    * public profile

| Logout
0 unread messages

    * Scripts
    * Jetpacks
    * Tags
    * Forums
    * People
    * Blog
    * Groups
    * Guides
    * Books

Kiss the Morthog
By Wil_01 — Last update Apr 3, 2009 — Installed 2,194 times.

    * About
    * Source Code
    * Reviews 0
    * Discussions 4
    * Fans 2
    * Issues
    * Share

There are 1 previous version of this script.

// ==UserScript==
// @name           Kiss the Morthog
// @description	   Auto"kisser"
// @namespace      http://userscripts.org/users/83296
// @include        http://www.neopets.com/medieval/kissthemortog.phtml*
// set to stop at 35000 neopoints, just change it higher or lower if needed.
// ==/UserScript==

var x = 1000 //change the delay here; 1000 = 1 second

function delay() {
if(document.body.innerHTML.indexOf('35,000 NP') != -1){
return
}

if(document.body.innerHTML.indexOf('Continue') != -1){
  var button = document.evaluate('//form[contains(@action,"kissthemortog.phtml")]/input[@type = "submit" and @value = "Continue"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}
if (document.body.innerHTML.indexOf('Try again...') != -1){
  var button = document.evaluate('//form[contains(@action,"kissthemortog.phtml")]/input[@type = "submit" and @value = "Try again..."]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}

if (document.body.innerHTML.indexOf('Select your Mortog') != -1){
var links = document.evaluate("//a[@href]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < links.snapshotLength; ++i)
{
    flip = links.snapshotItem(i);

    if (flip.href.match('kissthemortog.phtml.type=frogprince&num=1'))
    {
	document.location=flip.href;						
	return;
    }
}
}
}
window.setTimeout(delay, x)

Because it's your web | Donate

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
