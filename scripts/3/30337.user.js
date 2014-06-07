// ==UserScript==
// @name           Mask Embarrassing Tab Titles
// @namespace      http://userscripts.org/users/42648
// @description    Changes the tab title from something embarrassing to something more innocuous.
// @include Add sites to be masked here.
// ==/UserScript==

var fakesites = <><![CDATA[
Google
Amazon.com: Online Shopping for Electronics Apparel
PortableApps.com - Portable software for USB drives
Welcome to StumbleUpon
Newegg.com - Computer Parts PC Components Laptop
HowStuffWorks - Learn How Everything Works!
MySQL :: Developer Zone
Dictionary.com | Find the Meanings and Definitions of Words at Dictionary.com
Mozilla.org - Home of the Mozilla Project
YouTube - Broadcast Yourself.
Wikipedia the free encyclopedia
The Internet Movie Database (IMDb)
Hulu - Watch your favorites. Anytime. For free.
Add-ons for Firefox
Digital Blasphemy 3D Wallpaper
]]></>.toString();

var fakefavicons = <><![CDATA[
http://www.google.com
http://www.amazon.com
http://www.portableapps.com
http://www.stumbleupon.com
http://www.newegg.com
http://www.howstuffworks.com/
http://dev.mysql.com/
http://dictionary.reference.com/
http://www.mozilla.org/
http://www.youtube.com/
http://en.wikipedia.org/wiki/Main_Page
http://www.imdb.com
http://www.hulu.com/
https://addons.mozilla.org/en-US/firefox/
https://www.digitalblasphemy.com
]]></>.toString();



var trim=/^\n+|\n+$/g;
fakesites=fakesites.replace(trim,"").split("\n");
fakefavicons=fakefavicons.replace(trim,"").split("\n");
var picker = Math.floor(Math.random()*(fakesites.length)), head=document.getElementsByTagName('head')[0], onpage=false;

document.title = fakesites[picker];

var ico=document.evaluate("//link[@rel='icon' and @href]", document, null, 9, null).singleNodeValue;
if(ico) onpage=true;
else ico=document.createElement("link");
ico.setAttribute("rel", "icon");
ico.setAttribute("href", "http://www.google.com/s2/favicons?domain_url="+fakefavicons[picker]);
if(!onpage) head.insertBefore(ico, head.firstChild);