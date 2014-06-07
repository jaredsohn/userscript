// ==UserScript==
// @name Pardus Title Msgs
// @namespace http://monsterthreat.somethingnice.net/
// @description Puts message notifications into page title
// @include http://*.pardus.at/msgframe.php
// @author Influence D
// @version 1.1
// ==/UserScript==

// ---- CONFIGURATION ----
//
// set doUniIcon to true if you want the specific Universe icon to replace the default Pardus icon, false otherwise
const doUniIcon = true;

// set doCombat to true if you want Combat notifications to appear in the title, false otherwise
const doCombat = true;

// set doMsg to true if you want Msg notifications to appear in the title, false otherwise
const doMsg = true;

// set doAlly to true if you want Combat notifications to appear in the title, false otherwise
const doAlly = true;

// set doTrade to true if you want Trade notifications to appear in the title, false otherwise
const doTrade = true;

// set doMissions to true if you want Mission notifications to appear in the title, false otherwise
const doMissions = true;

// if you want to change the basic title - e.g. for work :) - edit this string
const baseTitle = 'Pardus';

//
// ---- END CONFIGURATION ----

function setFavicon(dd,iconURL)
{
var i,link;
var d = dd.getElementsByTagName("head")[0];
var links = d.getElementsByTagName("link");

for (i=0; i<links.length; ++i)
{
 link = links[i];
 if (link.rel=="shortcut icon")
 {
  d.removeChild(link);
  break;
 }
}

link = document.createElement("link");
link.rel = "shortcut icon";
// link.type = "image/png";
link.href = iconURL;
d.appendChild(link);
}



var iconURL = null;
var titlX = ''

var imgs = document.getElementsByTagName('img');
for(i = 0; i < imgs.length; i++)
{
var s = imgs[i].src;
// GM_log(s);
if (doUniIcon)
{
 if (s.match(/various\/universes\/.*_16x16\.png$/))
 {
  iconURL=s;
  continue;
 }
}

if (doCombat && s.match(/icon_combat\.png$/))
{
 titlX += '[!!!]';
 continue;
}
if (doMsg && s.match(/icon_msg\.png$/))
{
 titlX += '[Msg]';
 continue;
}
if (doAlly && s.match(/icon_amsg\.png$/))
{
 titlX += '[Ally]';
 continue;
}
if (doTrade && s.match(/icon_trade\.png$/))
{
 titlX += '[Tr]';
 continue;
}
if (doMissions && s.match(/icon_mission\.png$/))
{
 titlX += '[Msn]';
 continue;
}
}
var titl = baseTitle;
if (titlX != '')
titl += ' ' + titlX;


if (window.parent != null && window.parent.document != null)
{
if (window.parent.document.title != null)
 window.parent.document.title = titl;

if (iconURL != null)
 setFavicon(window.parent.document, iconURL);
}