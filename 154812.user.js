// ==UserScript==
// @name Remove AD for ck101
@-moz-document domain("ck101.com"), domain("www.ck101.com") {
div[id^="ad_"], div[id="menuad"],div[class^="ad_"],div[id^="ysm"], div[class="postinfo"], div[id^="google"],div[id="footer"], div[class="adTopics"],[class="postauthor"],font[color="white"]{display:none !important;}
}
// ==/UserScript==