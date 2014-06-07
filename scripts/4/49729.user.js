/*
Replace Narutoforums logo to with NaruHina logo
Version 0.3
(C) 2005 Lenny Domnitser
(C) 2007, 2008 Child of Destiny (Banner by him)
(C) 2009-2010 Maracunator
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

Classic banner original fanart by KUNGPOW333
Sunny Sky banner original fanart by Bandico
Hokage Mountain banner original fanart by *Nishi06
Franchise banner original fanart by sbel02
Anbu Lovers banner original fanart drawn by Charu-san and colored by Samurai-Pet

Classic and Hokage Mountain banners by Child of Destiny
Sunny Sky, Franchise, Anbu Lovers and Manga Confession banners by Onihikage


VERSION HISTORY
????-??-??   flickr remove spaceball
2007-02-18 - fix for new img src
2007-12-17 - port code for naruhina forums project
2008-01-11 - added extra skins
2009-05-20 - port code for URL changes in the skins
2009-05-25 - Akatsuki skin, alt text and menu options added
2010-12-24 - Kakashi and OP skins, multiple banners, alt texts and User Options page skin selector added. 
2011-03-02 - forum URL updated
*/

// ==UserScript==
// @name           naruhinaforumslogo
// @namespace      gm_scripts
// @description    Replace narutoforums logo to naruhina logo
// @include        http://www.narutoforums.com/*
// ==/UserScript==

var logo1 = document.evaluate('//img[contains(@src, "images/logo.gif")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var logo2 = document.evaluate('//img[contains(@src, "http://i236.photobucket.com/albums/ff286/nfforums/nfsasuke.jpg")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var logo3 = document.evaluate('//img[contains(@src, "http://i236.photobucket.com/albums/ff286/nfforums/sakura.png")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var logo4 = document.evaluate('//img[contains(@src, "http://img.photobucket.com/albums/v609/spriteninja/Gfx/Akatsuki/akatsukibanner3.jpg")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var logo5 = document.evaluate('//img[contains(@src, "http://www.anifreak.com/forums/skin_kakashi/header.jpg")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var logo6top = document.evaluate('//img[contains(@src, "http://www.anifreak.com/forums/skin_manga/header2.jpg")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var logo6bottom = document.evaluate('//img[contains(@src, "http://www.anifreak.com/forums/skin_manga/footer1.jpg")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var skin=document.evaluate('//select[contains(@name, "styleid")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var newskin=document.evaluate('//select[contains(@name, "newstyleset")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (logo1) 
{
  logo1.src = "http://a.imageshack.us/img35/6682/naruhinaforums.jpg";
  logo1.title = 'NaruHina Forums';
}
if (logo2) 
{
  logo2.src = "http://img571.imageshack.us/img571/4830/naruhinaforums2.png";
  logo2.title = 'A bright day and a bright future together';
}
if (logo3) 
{
  logo3.src = "http://img27.imageshack.us/img27/8325/naruhinaforums3.jpg";
  logo3.title = 'A moment of solitude for the secret lovers';
}
if (logo4) // called the Franchise? :pimp
{
  logo4.src = "http://img443.imageshack.us/img443/1729/naruhinaforums4.png";
  logo4.title = 'Hot pairing making the next generation';
}
if (logo5)
{
  logo5.src = "http://img571.imageshack.us/img571/2803/naruhinaforums5.png";
  logo5.title = 'Anbu love in the night';
}
if (logo6top)
{
  logo6top.src = "http://img214.imageshack.us/img214/6597/naruhinaforums6top.jpg";
  logo6top.title = 'The long awaited moment';
}
if (logo6bottom)
{
  logo6bottom.src = "http://img577.imageshack.us/img577/8813/naruhinaforums6bottom.jpg";
  logo6bottom.title = 'The seed of love';
}

if(skin) 
{
  skin.options[0].text="-- Classic";
  skin.options[1].text="-- Sunny Sky";
  skin.options[2].text="-- Hokage Mountain";
  skin.options[3].text="-- The Franchise";
  skin.options[4].text="-- Anbu Lovers";
  skin.options[5].text="-- Manga Confession";
}

if(newskin) 
{
  newskin.options[0].text="Default";
  newskin.options[1].text="Classic";
  newskin.options[2].text="Sunny Sky";
  newskin.options[3].text="Hokage Mountain";
  newskin.options[4].text="The Franchise";
  newskin.options[5].text="Anbu Lovers";
  newskin.options[6].text="Manga Confession";
}
