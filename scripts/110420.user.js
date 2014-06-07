{\rtf1\ansi\ansicpg1252\deff0\deflang1036{\fonttbl{\f0\fnil\fcharset0 Calibri;}}
{\colortbl ;\red0\green0\blue255;}
{\*\generator Msftedit 5.41.21.2509;}\viewkind4\uc1\pard\sa200\sl276\slmult1\lang12\f0\fs22 // ==UserScript==\par
\par
// @name           Roblox - Funny Money Script\par
\par
// @namespace      {\field{\*\fldinst{HYPERLINK "http://userscripts.org/users/130357"}}{\fldrslt{\ul\cf1 http://userscripts.org/users/130357}}}\f0\fs22\par
\par
// @description    Install this extention and then watch in amazement as you rapidly get more and more money on your Roblox acccount! Please note that this extention only makes it appear that you are making lots of money, it does not actually change the ammount of money in your Roblox account. Also, this script is the first userscript I have ever made, so it may be a bit buggy.\par
\par
// @include        {\field{\*\fldinst{HYPERLINK "http://www.roblox.com/*"}}{\fldrslt{\ul\cf1 http://www.roblox.com/*}}}\f0\fs22\par
// @version       1.3\par
\par
// ==/UserScript==\par
bux = document.getElementById("ctl00_ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_RobuxAlertCaptionHyperLink")\par
tix = document.getElementById("ctl00_ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_TicketsAlertCaptionHyperLink")\par
\par
// Object IDs are different on the pages that are not under My Roblox\par
if (bux == null)\par
\{\par
bux = document.getElementById("ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_RobuxAlertCaptionHyperLink")\par
\}\par
if (tix == null)\par
\{\par
tix = document.getElementById("ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_TicketsAlertCaptionHyperLink")\par
\}\par
\par
buxValue = bux.innerHTML\par
tixValue = tix.innerHTML\par
\par
// Convert to Numbers\par
buxValue = buxValue.replace("ROBUX", "")\par
buxValue = buxValue.replace(" ", "")\par
buxValue = buxValue.replace(",", "")\par
buxValue = buxValue * 1\par
\par
tixValue = tixValue.replace("Tickets", "")\par
tixValue = tixValue.replace(" ", "")\par
tixValue = tixValue.replace(",", "")\par
tixValue = tixValue * 1\par
\par
buxSpeed = 30\par
tixSpeed = 30\par
\par
// This function is taken from {\field{\*\fldinst{HYPERLINK "http://www.mredkj.com/javascript/nfbasic.html"}}{\fldrslt{\ul\cf1 http://www.mredkj.com/javascript/nfbasic.html}}}\f0\fs22\par
function addCommas(nStr)\par
\{\par
\tab nStr += '';\par
\tab x = nStr.split('.');\par
\tab x1 = x[0];\par
\tab x2 = x.length > 1 ? '.' + x[1] : '';\par
\tab var rgx = /(\\d+)(\\d\{3\})/;\par
\tab while (rgx.test(x1)) \{\par
\tab\tab x1 = x1.replace(rgx, '$1' + ',' + '$2');\par
\tab\}\par
\tab return x1 + x2;\par
\}\par
\par
function doBuxCount()\par
\{\par
\tab bux.innerHTML = addCommas(buxValue) + " ROBUX"\par
\tab buxValue++\par
\tab buxT = setTimeout("doBuxCount()", buxSpeed);\par
\}\par
\par
function doTixCount()\par
\{\par
\tab tix.innerHTML = addCommas(tixValue) + " Tickets"\par
\tab tixValue++\par
\tab tixT = setTimeout("doTixCount()", tixSpeed);\par
\}\par
\par
doBuxCount()\par
doTixCount()\par
\par
}
