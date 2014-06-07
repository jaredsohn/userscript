// ==UserScript==
// @name          Unhide Referrer
// @namespace     http://userscripts.org/scripts/show/64990
// @description   Removes the slow and annoying anonymizer redirecting delay pages (anonym.to etc.), and links to the real URLs.
// @version       1.26
// @include       *
// @grant         none
// ==/UserScript==

/*

Made by Chupacabra
Last updated: 2014/04/15

CODER MOTIVATION
================

Like this script? Say thanks by leaving me a tip at PayPal (http://j.mp/yj2Kfg) or Pledgie (http://j.mp/xeCPDy)! It would encourage me to improve the script and program more free scripts and tools. Thank you!

REQUIREMENTS
============

For Mozilla Firefox users:
--------------------------

You'll need (1) Mozilla Firefox (http://j.mp/xj8lwE) and (2) one of the following Firefox add-ons: Greasemonkey (http://j.mp/A7PgPE) or Scriptish (http://j.mp/JRd5B2). Make sure that Greasemonkey or Scriptish is enabled before you press the green "Install" button on this page. (Tested with Firefox 28.0, Greasemonkey 1.15 and Scriptish 0.1.7)

For Google Chrome users:
------------------------

You'll need Google Chrome (http://j.mp/xqDpMW) v4 or higher. Right click to the green "Install" button on this page, choose "Save link as...", save the file to a temporary directory, then select Chrome's wrench icon > Tools > Extensions, drag and drop the temporarily saved JavaScript file there (which you can delete after this from its temporary directory), and press Add. Don't panic if you see the "Extensions, apps, and themes can harm your computer." or "It can access: Your data on all websites" warnings, even if you're not a JavaScript programmer, you can see from the clean and compact source code that Unhide Referer is harmless. (Tested with Google Chrome 22.0.1229.79)

For Opera users:
----------------

You'll need Opera (http://j.mp/wGhPD3) and you have to enable User JavaScripts by selecting (if you need to, after creating) a directory for them in Menu > Settings > Preferences > Advanced > Content > JavaScript Options. Then right click to the green "Install" button on the script's page (http://j.mp/y6fBdr), choose "Save Linked Content As...", and save it to your User JavaScript directory you have chosen before. (Tested with Opera 11.64)

For Mozilla SeaMonkey users:
----------------------------

You'll need (1) Mozilla SeaMonkey (http://j.mp/A6sRmW) and a SeaMonkey add-on called (2) Scriptish (http://j.mp/xFU57G) (a Greasemonkey fork, Greasemonkey isn't compatible with SeaMonkey anymore). Make sure that Scriptish is enabled before you press the green "Install" button on the script's page (http://j.mp/y6fBdr). (Tested with 2.12.1 and Scriptish 0.1.7)

For Internet Explorer and Safari users:
---------------------------------------

Use Google (http://j.mp/yUBemM). There seem to be several options for Internet Explorer and Safari users (unfortunately there's no Windows solution for Safari yet). I don't have a Mac or a newer Windows version which is needed to run the latest stable Internet Explorer, still I plan to write more tutorials when I'll find time to experiment on these fronts.

For Flock, Epiphany and Songbird users:
---------------------------------------

According to Wikipedia (http://j.mp/wP3DgG), the script should work with Flock, Epiphany and Songbird. To be more precise, Wikipedia says Epiphany may have some problems with some scripts, but Unhide Referrer isn't a complex one. Anyway, I'm lazy to test it with these lesser known browsers, and Songbird is mainly a music player, rarely shows anonymized links, if ever. Since I don't test these, I don't officially support them. Maybe I will in the future.

FEATURES
========

This script is skipping the slow and annoying redirecting delay pages of the anonymizer services (anonym.to etc.) by removing these services from the URLs and linking to the real URLs instead. It has its pros and cons, you may have to sacrifice  some privacy for the much faster browsing experience, so use it with a little bit of caution.

Pros:

- Almost every anonymizer service has a delay page with ads. You can skip those to gain a lot of speed and some bandwidth.
- Some older anonymizer services don't work anymore (you can guess running one isn't the biggest business in the world, so people behind some of these probably gave up their sites or domain names, or simply lost their interests), this script is fixing these problems too.

Cons:

- By default you will reveal the HTTP referrer (also known by the common misspelling referer (http://j.mp/zxPsa6)) to the landing page, against the will of the people behind the referring page. In most of the cases this isn't a serious security issue, sites can collect more serious informations about their visitors (IP addresses etc.), but there are ways to hide the referer with browser settings (http://j.mp/yDT4eA) or add-ons like RefControl (http://j.mp/w3ZMIo). I must add, these tricks can break some sites (which are verifying their inner links) and I had some problems with RefControl, so stopped using and recommending it.

CHANGELOG
=========

v1.26 (2014-04-15)
Removed bitGAMER and Underground Gamer, both sites are dead now. Added Anoney, HideRef.org and Layer7 Cache.

v1.25 (2012-09-12)
Removed Demonoid since it went down and the old domain name was obsolete anyway. Updated bitGAMER with its new domain name. Added the required grant metadata. Updated the Google Chrome installation instructions.

v1.24 (2012-06-08)
Added some new sites, requested by aireca.

v1.23 (2012-02-09)
Refined the documentation and the service order. Documented the script itself to the case it will be mirrored elsewhere. Added the www or plain version of every service where one of these was missing.

v1.22 (2012-02-02)
Added new sites and a simple profiler (disabled by default).

v1.21 (2010-05-28)
Fixed a problem which prevented the script to work on some sites with escape problems. Added a few more sites requested by users (updated the test links below, will always list every supported site in the Testing Zone). Started to use 2 digit minor version numbers. Changed @namespace to the script's homepage. Changed the included pages from http://* to *.

v1.2 (2010-05-05)
Added Demonoid's inner anonymizer to the list (was requested by 7of9).

v1.1 (2009-12-28)
Speeded up with "switch / case". I can't benchmark it (I'm quite new in JavaScript and Greasemonkey), but as I know it's a lot faster than "if / else if" and supported by the newer browsers for a while. Really old ones may not support it.

v1.0 (2009-12-26)
First release. I had problems with the abandoned anonym.to Link Remover (http://j.mp/zxp1bA) under Firefox 3.5.6 (its JavaScript engine doesn't understand "elseif"), fixed it for myself, then rewrote it, and expanded it with some similar services.

KNOWN ISSUES
============

It works only if the anonymizer is at the beginning of the link, so it won't remove it from the inside, if there are stacked forwarding services. But I guess nobody is using them that way out of testing purposes or by accident.

And it obviously works only on fully rendered sites. Some sites are generating the anonymized link on the fly, while forwarding from an inner link. Others are dynamically loading new contents with JavaScript, which could have anonymized links. This script can't change those, no Greasemonkey script could as far as I know.

SUPPORTED SERVICES AND FORMATS
==============================

anoney.com
www.anoney.com
anonym.to
www.anonym.to
antirefer.com
www.antirefer.com
dereferer.org
www.dereferer.org
www.deviantart.com
hideref.info
www.hideref.info
hideref.l7cache.com
www.hideref.l7cache.com
hideref.org
www.hideref.org
hiderefer.com
www.hiderefer.com
hiderefer.org
www.hiderefer.org
www.esconde.me
itaringa.net/go
itaringa.net/out
lik.cl
www.lik.cl
no-ref.com.ar
www.no-ref.com.ar
norefer.org
www.norefer.org
sjmp.eu
www.sjmp.eu
smartjump.eu
www.smartjump.eu
unrefer.com
www.unrefer.com
www.youtube.com

I will add more if more will be needed. Feel free to contact me (http://j.mp/yMdyWa) if your most hated service is missing from the list. :)

*/

// var start = new Date().getMilliseconds(); // profiler part 1

for (var i = 0; i < document.links.length; i++) {
  linkx = document.links[i];
  switch(0) {
    case linkx.href.indexOf("http://anoney.com/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 19)));break;
    case linkx.href.indexOf("http://www.anoney.com/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 23)));break;
    case linkx.href.indexOf("http://anonym.to/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 18)));break;
    case linkx.href.indexOf("http://www.anonym.to/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 22)));break;
    case linkx.href.indexOf("http://antirefer.com/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 22)));break;
    case linkx.href.indexOf("http://www.antirefer.com/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 26)));break;
//    case linkx.href.indexOf("http://bitgamer.su/redir.php?url=") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 33)));break;
//    case linkx.href.indexOf("http://www.bitgamer.su/redir.php?url=") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 37)));break;
//    case linkx.href.indexOf("http://demonoid.com/redirect.php?url=") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 37)));break;
//    case linkx.href.indexOf("http://www.demonoid.com/redirect.php?url=") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 41)));break;
    case linkx.href.indexOf("http://dereferer.org/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 22)));break;
    case linkx.href.indexOf("http://www.dereferer.org/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 26)));break;
    case linkx.href.indexOf("http://www.deviantart.com/users/outgoing?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 41)));break;
    case linkx.href.indexOf("http://www.esconde.me/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 23)));break;
    case linkx.href.indexOf("http://hideref.info/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 21)));break;
    case linkx.href.indexOf("http://www.hideref.info/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 25)));break;
    case linkx.href.indexOf("http://hideref.l7cache.com/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 28)));break;
    case linkx.href.indexOf("http://www.hideref.l7cache.com/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 32)));break;
    case linkx.href.indexOf("http://hideref.org/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 20)));break;
    case linkx.href.indexOf("http://www.hideref.org/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 24)));break;
    case linkx.href.indexOf("http://hiderefer.com/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 22)));break;
    case linkx.href.indexOf("http://www.hiderefer.com/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 26)));break;
    case linkx.href.indexOf("http://hiderefer.org/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 22)));break;
    case linkx.href.indexOf("http://www.hiderefer.org/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 26)));break;
    case linkx.href.indexOf("http://links.itaringa.net/go?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 29)));break;
    case linkx.href.indexOf("http://links.itaringa.net/out?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 30)));break;
    case linkx.href.indexOf("http://lik.cl/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 15)));break;
    case linkx.href.indexOf("http://www.lik.cl/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 19)));break;
    case linkx.href.indexOf("http://no-ref.com.ar/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 22)));break;
    case linkx.href.indexOf("http://www.no-ref.com.ar/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 26)));break;
    case linkx.href.indexOf("http://norefer.org/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 20)));break;
    case linkx.href.indexOf("http://www.norefer.org/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 24)));break;
    case linkx.href.indexOf("http://sjmp.eu/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 16)));break;
    case linkx.href.indexOf("http://www.sjmp.eu/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 20)));break;
    case linkx.href.indexOf("http://smartjump.eu/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 21)));break;
    case linkx.href.indexOf("http://www.smartjump.eu/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 25)));break;
//    case linkx.href.indexOf("http://underground-gamer.com/redir.php?url=") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 43)));break;
//    case linkx.href.indexOf("http://www.underground-gamer.com/redir.php?url=") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 47)));break;
    case linkx.href.indexOf("http://unrefer.com/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 20)));break;
    case linkx.href.indexOf("http://www.unrefer.com/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 24)));break;
    case linkx.href.indexOf("http://www.youtube.com/redirect?q=") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 34)));break;
  }
}

// var end = new Date().getMilliseconds(); // profiler part 2
// var time = end - start;
// if (time != 0)
//   GM_log('Execution time: ' + time);

