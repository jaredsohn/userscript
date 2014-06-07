// ==UserScript==
// @name           BuyukBang IMDb Bar
// @description    BuyukBang IMDb Bar
// @version        3.1
// @author         Buyukbang
// @updateURL      https://userscripts.org/scripts/source/29190.meta.js
// @downloadURL    https://userscripts.org/scripts/source/29190.user.js
// @scriptsource   http://userscripts.org/scripts/show/29190
// @uso:script     29190
// @namespace      http://buyukbang.blogspot.com
// @homepage       http://buyukbang.blogspot.com
// @icon           http://s3.amazonaws.com/uso_ss/icon/29190/large.jpg
// @screenshot     http://s3.amazonaws.com/uso_ss/11669/large.jpg
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/maindetails*
// @include        http://*.imdb.com/title/*/?*
// @include        http://imdb.com/title/*/
// @include        http://imdb.com/title/*/#*
// @include        http://imdb.com/title/*/combined*
// @include        http://imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/?*
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_addStyle
// ==/UserScript==

/*

Here is the list of all supported direct searches:

Subtitle search
----------------
Divxplanet.com
Divxforever.us
Turkcealtyazi.org
Yedincigemi.com
Opensubtitles.org
Subscene.com
Podnapisi.net
Google.com

Rapidshare search
-----------------
ShareBus.org
Tehparadox.com
Filestube.com

ED2k search
-----------------
Divxplanet.com
Divxforever.us
Verycd.com
Osloskop.net

Torrent search
-----------------
Torrentz.com
Youtorrent.com
Thepiratebay.org
Isohunt.com
Scrapetorrent.com
Fenopy.com

Movie Information (Turkish)
---------------------------
Beyazperde.com
Film.com.tr
Filimadami.com
Sinemalar.com
Sinematurk.com
intersinema.com

Movie Information (English)
---------------------------
Metacritic.com
Rotten Tomatoes
Criticker.com
Allmovie.com
Mrqe.com

TV
-----------------
Episodeworld.com
TV.com

General Information
-----------------
Google.com
Youtube.com
MoviePosterDB.com
Wikipedia.org
Sozluk.sourtimes.org

-----------------------------------------------------

This script is based on following scripts:
- "IMDb->DirectSearch Fixed" from mohanr
- "itas" from tukankaan
- "KG-IMDb" from KaraGarga
- "IMDb Search A2f" from Akif

-----------------------------------------------------

Changelog
---------
v3.1  (23.03.2013)
------------------
- IMDB ID search instead of title for Turkcealtyazi.org
- Direct IMDB ID search instead of G-Search for Divxplanet.net
- Added Mrqe.com
- Added MoviePosterDB.com
- Code cleanup

v3.0  (23.12.2012)
------------------
- Added new IMDB search result compability for URLs ended with ?ref_=fn_al_tt_1

v2.9  (09.11.2012)
------------------
- Metadata update for compability to the latest greasemonkey versions.

v2.8  (09.11.2012)
------------------
- Added Sinemalar.com
- Added Filimadami.com
- Added Sinematurk.com
- Added intersinema.com
- Changed Sharebus.com to Sharebus.org
- Removed closed sites: Btjunkie.org and Demonoid.me
- Removed Sinema.com

v2.7  (11.11.2011)
------------------
- Fixed all links effected by IMDB title change

v2.6  (10.28.2011)
------------------
- Fixed broken TV.com

v2.5  (10.28.2011)
------------------
- Added Tehparadox.com
- Fixed broken Beyazperde.com
- Updated Yedincigemi
- Updated Google subtitle search
- Updated Google torrent search
- Updated Demonoid.com
- Removed closed sites: Rapid.org and Torrent-Finder.com

v2.4  (10.20.2010)
------------------
- Updated for the new IMDB design
- Added Episodeworld.com
- Added Film.com.tr
- Removed Film.gen.tr
- Fixed broken Rapidfind.org
- Fixed broken Metacritic.com
- Updated Torrentz.com icon


v2.3  (03.24.2010)
------------------
- Added English subtitle search for Opensubtitles.org
- Added English subtitle search for Podnapisi.net
- Added Google subtitle search
- Added Btjunkie.org
- Added Demonoid.com
- Added Rapid.org
- Added FilesTube.com
- Removed closed site: Rapidfind.org
- Removed Mininova.org
- Removed Rollyo.com searches

v2.2
----
- Fixed broken Yedincigemi and Allmovie search links
- Updated DivxForever subtitle search to use imdb code instead of movie name

v2.1
----
- Fixed wrong search problems caused by strings like " (V) " in IMDB title

v2.0
----
- Fixed broken search links
- All search engines are optimized for better result
- Fixed the problem caused by " character used in the IMDB title of the TV shows
- Added Torrent-Finder.com
- Removed closed sites: FindHash and SpyTorrent

v1.5
----
Updated DivxPlanet.com subtitle and ed2k searches

v1.4
----
Updated DivxPlanet.com subtitle search 

v1.3
----
Sharebus.com search updated

v1.2
----
TV.com added

v1.1
----
DivxForever.us replaced by DivxForever.in

v1.0
----
initial version

*/

// --------------- SEARCH ENGINES --------------- 
//  You can remove or comment out below lines if you disable a search engine from the script.

var trackers = new Array();
var cleanTitle = new String(getCleanTitle());
var imdbCode = new String(getImdbCode());

//-----------------------------------
//------------SUBTITLES-------------- 
//-----------------------------------
//TurkceAltyazi - Subtitle
trackers.push(new SearchEngine("Subtitle: TurkceAltyazi", "http://www.turkcealtyazi.org/find.php?cat=sub&find=%imdbkod", true, "data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAADo7PAUbqPajmKg3ppioN6aYqDemmKg3ppioN6aYqDemmKg3ppioN6aYqDemmKg3ppioN6aYqDemmyj2pDk6e4Ygq3aewB8+v0Affv9AH37/QB7+P0AefX9AHn1/QB59f0AefX9AHn1/QB59f0Ae/n9AH37/QB9+/0AfPr9eKnahmih3JQAffv9AH37/QB8+f2VueP91d/u/dXf7v3V3+791d/u/dXf7v3U3+79gLDl/QB8+v0Affv9AH37/WKg35pioN+aAH37/QB9+/0AfPr9C3rt/anG6P3////9/////f////3////9lLrm/Ql67/0Affv9AH37/QB9+/1ioN+aYqDfmgB9+/0Affv9AH37/QB9+/2Gtej9/////f////3////9/////Wem6f0Affv9AH37/QB9+/0Affv9YqDfmmKg35oAffv9AH37/QB9+/0Affv9hrXo/f////3////9/////f////1npun9AH37/QB9+/0Affv9AH37/WKg35pioN+aAH37/QB9+/0Affv9AH37/Ya16P3////9/////f////3////9Z6bp/QB9+/0Affv9AH37/QB9+/1ioN+aYqDfmgB9+/0Affv9AH37/QB9+/2Gtej9/////f////3////9/////Wem6f0Affv9AH37/QB9+/0Affv9YqDfmmKg35oAffv9AHz6/QB9+/0Affv9hrXo/f////3////9/////f////1npun9AH37/QB9+/0AfPr9AH37/WKg35pioN+aF4Hu/Y+66v0Pfe/9AH37/Ya16P3////9/////f////3////9Z6bp/QB9+/0zjOr9gLHn/QB69v1ioN+aYqDfmkST5/3////9XJ/n/QB8+v2Gtej9/////f////3////9/////Wem6f0AfPn9qMbp/e7x9/0Cdu79YqDfmmKg35pFk+f9/////cna7/0Hee/9hrXo/f////3////9/////f////1npen9LIXk/ff5+/3u8fb9Anbt/WKg35pioN+aRZPn/f////3////9nMDp/Ya16f3////9/////f////3////9baDc/env9v3////97vH3/QJ27v1ioN+aZqHdlhSB8f1Llub9S5bm/TOL6f0niOz9S5bm/UuW5v1Llub9S5bm/SGD6v1Jlef9S5bm/UaU5/0Ae/f9YqDfmn6r2n4AfPr9AH37/QB9+/0Affv9AH37/QB9+/0Affv9AH37/QB9+/0Affv9AH37/QB9+/0Affv9AHz6/XKl2org5uwcWJjYpUKP3rtCj967Qo/eu0KP3rtCj967Qo/eu0KP3rtCj967Qo/eu0KP3rtCj967Qo/eu1SV2Kjc5OwhgAEAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAgAEAAA=="));

//DivXPlanet - Subtitle 
trackers.push(new SearchEngine("Subtitle: DivXPlanet", "http://divxplanet.com/index.php?page=arama&arama=%imdbkod", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+0lEQVR4nKWTXWhTZxzGn/d9z0eTNl9N0iS2SZs2fnW1yrSsEymDOnVuF5tOGANRURDvVBhuMHc1dO7j1u1iA/FCGILix4bKLIqoII6pnU2UmURLbWLTJienyTkn57zn7Ernx0DE5/IP/x888HuI4zh4nQj/dzS5SQrqo1hBqcVlgRjJUPSuR/bUXwrgNsfZ0evv/XT89p5qSVgScDd5tIbJq7peXLHcf3T3h0MHot5w8ekf8riCaZnk2xNnvh65UN8zvChIEmERhBFUVRtqnWOiYiJdGb+/f8fQ+qUd8/96AihUy+Frk2MDV9MTQyPn7M/e6gyCSxzUxxASHTgqhc/PUFYt5CoabuUfZA99uerjoqa0vZNYfIGcyd/enH2k/HL9Vg197UHcuFPGtF5DpLUFdVNHzC0C4Biv2TAaHL3RMFSpaBqSevOHleuGaZPIbKnhwtSUjprewLx4AGG3jK5WLwzNxoKuKBJzImgiFDGZoDvSgjfDXWKHR8pKAmkIss0mxqen7s+NhzpLVQ0P/ynh78kGqEjRH/fiUroAgxMoswCtcVxJZ1CaUbFze6jNsGwXHexInTdV/VT27jSoDYhUhN8roazaEB0CyXGB8iaYkzouHykgc6wIJVcxP+rt3eF3uRUBAN5v/+ONDcwApGaMpuZg1FgKcm8EraKIlN+CYTEgkMMHayXw2SKkRJBOTeS+SAa+3yYAQDQoe6jmAtcVvNsjoCd/DKnVEQiEgzoWZjlFrFvATEsf/vwtg8SSJBPk+BgllAsAwEJD3x28ltuSSfevGeiogNhdODzmwCnMor3TDX80Bp/jQt1muFgcrO9K9ezrS67/mVH2n0jlmuL75MDJ3/OFtkFfwIWGUoGlGPDPiwAmASwLpZmiuXtT666ty4d/ZIw9ayIAlOuK96tfz35z+lLjU9l2eYJtXpQUG3Wt5sTCSmbvxoWfr+0fOM0oe1Hlp/eQn3mYvJzOrnhQ0hcIgq0t645deTs192qz3Kw9P6YXAK+afwFFBlABNzEZ7AAAAABJRU5ErkJggg%3D%3D"));
//GSearch: trackers.push(new SearchEngine("Subtitle: DivXPlanet", "http://divxplanet.com/cse.php?ie=ISO-8859-9&oe=ISO-8859-9&hl=tr&cof=FORID%3A9&q=%imdbkod&sa=Tekrar+Ara&cx=009015947334585847211%3A6djglhionb4#949", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+0lEQVR4nKWTXWhTZxzGn/d9z0eTNl9N0iS2SZs2fnW1yrSsEymDOnVuF5tOGANRURDvVBhuMHc1dO7j1u1iA/FCGILix4bKLIqoII6pnU2UmURLbWLTJienyTkn57zn7Ernx0DE5/IP/x888HuI4zh4nQj/dzS5SQrqo1hBqcVlgRjJUPSuR/bUXwrgNsfZ0evv/XT89p5qSVgScDd5tIbJq7peXLHcf3T3h0MHot5w8ekf8riCaZnk2xNnvh65UN8zvChIEmERhBFUVRtqnWOiYiJdGb+/f8fQ+qUd8/96AihUy+Frk2MDV9MTQyPn7M/e6gyCSxzUxxASHTgqhc/PUFYt5CoabuUfZA99uerjoqa0vZNYfIGcyd/enH2k/HL9Vg197UHcuFPGtF5DpLUFdVNHzC0C4Biv2TAaHL3RMFSpaBqSevOHleuGaZPIbKnhwtSUjprewLx4AGG3jK5WLwzNxoKuKBJzImgiFDGZoDvSgjfDXWKHR8pKAmkIss0mxqen7s+NhzpLVQ0P/ynh78kGqEjRH/fiUroAgxMoswCtcVxJZ1CaUbFze6jNsGwXHexInTdV/VT27jSoDYhUhN8roazaEB0CyXGB8iaYkzouHykgc6wIJVcxP+rt3eF3uRUBAN5v/+ONDcwApGaMpuZg1FgKcm8EraKIlN+CYTEgkMMHayXw2SKkRJBOTeS+SAa+3yYAQDQoe6jmAtcVvNsjoCd/DKnVEQiEgzoWZjlFrFvATEsf/vwtg8SSJBPk+BgllAsAwEJD3x28ltuSSfevGeiogNhdODzmwCnMor3TDX80Bp/jQt1muFgcrO9K9ezrS67/mVH2n0jlmuL75MDJ3/OFtkFfwIWGUoGlGPDPiwAmASwLpZmiuXtT666ty4d/ZIw9ayIAlOuK96tfz35z+lLjU9l2eYJtXpQUG3Wt5sTCSmbvxoWfr+0fOM0oe1Hlp/eQn3mYvJzOrnhQ0hcIgq0t645deTs192qz3Kw9P6YXAK+afwFFBlABNzEZ7AAAAABJRU5ErkJggg%3D%3D"));

//DivXForever - Subtitle
trackers.push(new SearchEngine("Subtitle: DivXForever", "http://www.divxforever.in/index.php?act=subz&CODE=66&imdb_id=%imdbkod", true, "data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA4AAEdoAApnlwALaJkAA1mAAAAoQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVHUALdP/AFj0/wBh+P8AZPn/AGb9/wBb+f8AOtn5AA51kQAADxYAAAAAAAAAAAAAAAAAAAAAAAAAAAACcZUATO3/AGn4/wBm9f8Aafn/H3b5/xdH0vIOJZCyARFtjwAPZI0AAHOZAAAXFwAAAAAABGGBAAl2mgAARGMASer/AGj2/wBk9f8We/3/LU3H5wAAOlEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCBrABT8/8ANNf/AGf2/wBk9f8ef/7/Kj2z1AAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWmcIAafn/AGX0/wBl9f8Kbvj/RWvZ9gAABBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOYwAALDoAGKDIAGn5/wBm9f8AZPT/NYz9/zFHu94AABAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC1EABak0ABj/v8CC2CGABWKugBp+v8AZfX/AGP1/xF2+/9dqv//LkjW/wAALjoAAAAAAAAdKwADYIIAG7XlAEfp/wBm+P8Aavz/FiuRtgALb5oAavz/D3b9/0mF9f8tP7DTAABLbAAADRQAAAAAAAAjKgAWuvEAUfX/AGX2/wBo9v8AZvX/AGj5/yZErtUAAENnCWn+/x8tocUAACE2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAqNwQBS7v8AZ/X/AGX0/wBn+P8yUcLiAAAZHwAAQ10AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCwAjwO4AY/X/AGX1/xBy9/8AZvn/N1Gz2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwASoc8AYfb/AGb1/wBm9v9Tgur/VJj//yk/o8MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5WQAkvuoAY/f/AGb1/wBi9f9Ejf//AgBIaQMBTW0JD26LAAAAAAAADQ8AAIKqABqFrgAciq4AIaTHADXU+gBa9P8AaPj/AGT1/wBo9/9Djf//DxJ7mQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwIIV3IUQcnlI3L4/yeI//8jg///Kof//z+O//8/Zdz6AwJMbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFygDAEFlDhJigAwQY4AAADNUAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAA+B8AAPADAADgAQAAAH8AAAD/AAAB/AAAAfAAAACAAAABAAAAD4AAAD+AAAD/AAAA/gAAAIAHAADADwAA+B8AAA%3D%3D"));

//Yedincigemi - Subtitle
trackers.push(new SearchEngine("Subtitle: Yedincigemi", "http://altyazi.yedincigemi.com/ssearch.php?q=%imdbkod", true, "data:image/png;base64,R0lGODlhEAAQAPeBAP///xpJbXTV6zKL0DSS2jSR2DSR2TKN0jWT2h9WgUOi3lh6lSlzqzCHyVy85XjZ7Jmuvu/y9WXG50htiix9uhxOdCx8ujqY3DuZ3CNik27P6jua3JuwvzOQ10al3yBahiZqn1Gx4vD2+qPF30mo4CdsoiVSdGPD56LJ51u75avR7zmX2/P6/TCGyI3b7vT7/TmFv8Dr9mHB5iVmmUuq4EVwkUd3nCRll1y75aG0w3HS6m/Q6it6tjCHyiVonHG/57/m9YLd7p64zT6d3e/z9jKM0Vm040Cf3Vt8liFejHiUqabE2yl0ritfh8Tu9yZqnmjI6FKy4lOy4mLC5mzN6Uem35DV7ix8uSdUdq/Y8bjh9HbQ6nS35qvn80Kh3i1+vCNklUyr4D2b3GSStVW14yZpnR9XgsXv92jJ6GrL6fD3+4zP7S6Cwpzi8SZsoVe35Eqq4PX8/jiIxSJhkHfZ7BtMcYW/6R1SezOO1Fi45B5VfxtNc3+nxy19u4nW7Wi35Sdvpf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIEALAAAAAAQABAAAAjsAAMJDBTHSRsXfqxoYTGw4ZkgDwTsQCMjj5EsDQN1eUBHgAYoU3BIIXHEzsAYAgToSHPCwRsAMAHgQRHoxRYNVCSkCEEDgAcFGwC0gCECiISYMDEAuLCiQ48+TJascQCADJwhABBkNRATxJgfUQCE8ZKVAAACHRoAKDHHxp8qP8WcNVvgABsAGRLU4LIBwwUABgoERpqgDhIVBwYMADCgSOIGV56YCRAghxo5XywAsECBAg8GN/RQNhEh0AgGgNyU8TEjw4cKlANwGMgHTJIPCe7siR1ASUYhTWDzxjI7YyAiEBZMmLAAQumBAQEAOw=="));

//Subscene - Subtitle
trackers.push(new SearchEngine("Subtitle: Subscene", "http://subscene.com/filmsearch.aspx?q="+cleanTitle, false, "data:image/x-icon;base64,Qk02AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MAAAAAAAAZP/MZP/MZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MAAAAAAAAZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//podnapisi - Subtitle (Turkce)
trackers.push(new SearchEngine("Subtitle: Podnapisi - Turkce", "http://www.podnapisi.net/index.php/ppodnapisi/search?tbsl=1&sJ=30&sY=&submit=Search&sK="+cleanTitle, false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVR4nGNkgID/DMQBRlwCcAPevXuHVaeQkBBWQ5gIaUQGUDUoroUbgGQDToCkBm4I0S6AyaOrwwgDEgAjAwMDAwuyDUJCQnhdApNH9i5JYYBNHUmxgE3dwLtgNBaoEAYAkKI8fEy0ctAAAAAASUVORK5CYII%3D"));

//podnapisi - Subtitle (English)
trackers.push(new SearchEngine("Subtitle: Podnapisi - English", "http://www.podnapisi.net/index.php/ppodnapisi/search?tbsl=1&sJ=2&sY=&submit=Search&sK="+cleanTitle, false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVR4nGNkgID/DMQBRlwCcAPevXuHVaeQkBBWQ5gIaUQGUDUoroUbgGQDToCkBm4I0S6AyaOrwwgDEgAjAwMDAwuyDUJCQnhdApNH9i5JYYBNHUmxgE3dwLtgNBaoEAYAkKI8fEy0ctAAAAAASUVORK5CYII%3D"));

//opensubtitles.org - Subtitle (Turkce)
trackers.push(new SearchEngine("Subtitle: Opensubtitles - Turkce", "http://www.opensubtitles.org/tr/search/sublanguageid-tur/imdbid-%imdb-id", true, "data:application/octet-stream;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqqqr///////+qqqoAAAAAAADMzMzu7u7///////9VVVUAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACZmZmIiIgAAACIiIgAAAAAAABERETd3d0AAAAAAAAAAAAAAADu7u4REREAAAAAAAARERHu7u4AAABERET////////d3d0zMzMAAAAAAAAAAAAAAADd3d0iIiIAAAAAAAARERHd3d0AAADd3d1EREQAAAAAAAAAAAAAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACqqqp3d3cAAADMzMxEREQAAAARERHd3d0AAAAAAAAAAAAAAAAAAACZmZn///////+qqqoAAAAAAAAiIiLu7u7////////u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//opensubtitles.org - Subtitle (English)
trackers.push(new SearchEngine("Subtitle: Opensubtitles - English", "http://www.opensubtitles.org/en/search/sublanguageid-eng/imdbid-%imdb-id", true, "data:application/octet-stream;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqqqr///////+qqqoAAAAAAADMzMzu7u7///////9VVVUAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACZmZmIiIgAAACIiIgAAAAAAABERETd3d0AAAAAAAAAAAAAAADu7u4REREAAAAAAAARERHu7u4AAABERET////////d3d0zMzMAAAAAAAAAAAAAAADd3d0iIiIAAAAAAAARERHd3d0AAADd3d1EREQAAAAAAAAAAAAAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACqqqp3d3cAAADMzMxEREQAAAARERHd3d0AAAAAAAAAAAAAAAAAAACZmZn///////+qqqoAAAAAAAAiIiLu7u7////////u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//Rollyo - Subtitle
//trackers.push(new SearchEngine("Subtitle: Rollyo", "http://rollyo.com/search.html?q=%title&sid=327654", false, "data:image/gif;base64,R0lGODdhEAAQAN0AAPr//8ABAdgAALEAANEAALgAAMgAAP319fjKyuEzM9oSEup1deAjI+EqKvvm5qsAANkKCuhYWOFAQOZNTdkfH8gSErcSEqEAAN8cHN4SEtESEut7e/W8vOhmZu+Li+VRUex7e9qYmPOSkt+OjsESEvjPz/bAwJ4AAP3p6fKhoeyamvW5ueSqquQ5OeM5Obc4N8o7O+RAQMtbW9Q7O7cdHdIYGO2EhO1kZO1bW84zM+hfXwAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAGl0CAcEgsGo9GBGjSSjRqJIulosiADpGI5DA8iCSBgkEAWSwAJk8nEdkgUDdDQJBpAEofwZCMcBAKBAoYHgAcNmsfCwgAOAEDBgoMAhMrRAccMY4DARqSAmQYDRQEBgUDDw+cngSkAWEDsA8XBRUun6xyrqYDFycDISkCrKRyBbsvRBujBrnGNCxGDio6MzkwMiMOSNvc3EEAOw%3D%3D"));

//Google - Subtitle
trackers.push(new SearchEngine("Subtitle: Google", "http://www.google.com/search?hl=en&lr=&q=subtitle intitle:'"+cleanTitle+"'", false, "data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAICAgAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8A//3/AP39/wD6/f8A+P3/AP/8/wD9/P8A+vz/AP/7/wD/+v8A/vr/APz6/wD4+v8A+/n/APP5/wD/+P8A+vj/AO/4/wDm+P8A2fj/AP/3/wD/9v8A9vb/AP/1/wD69f8A9PT/AO30/wD/8/8A//L/APnx/wD28P8A///+APj//gD2//4A9P/+AOP//gD//f4A6f/9AP///AD2//wA8//8APf9/AD///sA/v/7AOD/+wD/+vsA9/X7APr/+gDv/voA///5AP/9+QD/+/kA+e35AP//+ADm//gA4f/4AP/9+AD0+/gA///3APv/9wDz//cA8f/3AO3/9wD/8fcA//32AP369gDr+vYA8f/1AOv/9QD/+/UA///0APP/9ADq//QA///zAP/18wD///IA/fzyAP//8QD///AA9//wAPjw8AD//+8A8//vAP//7gD9/+4A9v/uAP/u7gD//+0A9v/tAP7/6wD/+eoA///pAP//6AD2/+gA//nnAP/45wD38eYA/fblAP/25AD29uQA7N/hAPzm4AD/690AEhjdAAAa3AAaJdsA//LXAC8g1gANH9YA+dnTAP/n0gDh5dIADyjSABkk0gAdH9EABxDRAP/l0AAAJs4AGRTOAPPczQAAKs0AIi7MAA4UywD56soA8tPKANTSygD/18kA6NLHAAAjxwDj28QA/s7CAP/1wQDw3r8A/9e8APrSrwDCtqoAzamjANmPiQDQj4YA35mBAOmefgDHj3wA1qR6AO+sbwDpmm8A2IVlAKmEYgCvaFoAvHNXAEq2VgA5s1UAPbhQAFWtTwBStU0ARbNNAEGxTQA7tEwAObZIAEq5RwDKdEYAULhDANtuQgBEtTwA1ls3ALhgMQCxNzEA2FsvAEC3LQB0MCkAiyYoANZTJwDLWyYAtjMlALE6JACZNSMAuW4iANlgIgDoWCEAylwgAMUuIAD3Vh8A52gdALRCHQCxWhwAsEkcALU4HACMOBwA0V4bAMYyGgCPJRoA218ZAJM7FwC/PxYA0msVAM9jFQD2XBUAqioVAIAfFQDhYRQAujMTAMUxEwCgLBMAnxIPAMsqDgCkFgsA6GMHALE2BAC9JQAAliIAAFYTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AsbGxsbGxsbGxsbGxsbGxd7IrMg8PDw8PDw8PUBQeJXjQYE9PcKPM2NfP2sWhcg+BzTE7dLjbmG03YWaV4JYye8MPbsLZlEouKRRCg9SXMoW/U53enGRAFzCRtNO7mTiAyliw30gRTg9VbJCKfYs0j9VmuscfLTFbIy8SOhA0Inq5Y77GNBMYIxQUJzM2Vxx2wEmfyCYWMRldXCg5MU0aicRUms58SUVeRkwjPBRSNIfBMkSgvWkyPxVHFIaMSx1/0S9nkq7WdWo1a43Jt2UqgtJERGJ5m6K8y92znpNWIYS1UQ89Mmg5cXNaX0EkGyyI3KSsp6mvpaqosaatq7axsQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="));


//-----------------------------------
//-----RAPIDSHARE & HTTP LINKS-------
//-----------------------------------

//Label
trackers.push(new SearchEngine("", "", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));

//ShareBus
trackers.push(new SearchEngine("Rapidshare: ShareBus", "http://www.sharebus.org/index.php?act=Search&CODE=01&forums=all&search_in=imdbid&result_type=topics&keywords=%imdbkod", true,
"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACwUlEQVQ4jWWSa0jTURjGf+fftv+slW5O02mpZEhmWJhF2YUCo5KCosQuYGVgUVFYRPSh6EoRBVlQRPQpELvZ1UJMK03IrlbeyjScZhenbVluzu30oZw6X3jgnPec5znneXkEIPCrzzV7w0qfPEuo+/Aj1uWC6cmBzW63q6b8fGXLhZf0+t8XfcjNjVVfVmSeOXY4xa2qSPgHvV6RazNiZWPdplpr04W5Azk+gcLCRSF1b7Jfr82YIAFpMuokIKOjRsjCm+ny7fMsaWvbL9vbjnlsbafX9/EUgEu5s80nT1SV37hdMznvai0ABoOG8eNMZGUm8qDoPcHmYEAgcCrw6+KzstUrAIYBosctLxeVtKY8LG1Gyn++7A43lnAVu72LJWkTiYuL+e8IwCtU1TD9t7P8rLh/a2HchuxHdW1fnYMGo9EIli2NITLChBASVaewM2fx/6kJBApfvr5boCl7+j3DnwwQPTYQu72byhfVBOg1eLyCdZnJmM2hAEjpISQ4YZrmfXV7kD85db6Fc2eWYxg5gu/fOqmutfKpoQOHo5vHZa+w2f4QYRlJQrwlXuNyuYe8HhM1CqPJDEBEZAARkRZ653k4eCifopIvfGzoAmDTxslBSnSU2esvcLWgic1b86iqavD17I4e8q83+sgAOq2nRUlKDLodoFcGCXT+dHHlej1btt/hl6MTEOzafY12W38ItVqYGG8qVrp6myqnTjG/GuID+NjYhdMJ0gtvqloHnSUnhbYYR/fcBRDncudMMRpVN/THtw8F+atkU/0eqdP190YHq54j+5LSGBjlrPWTssPDAz3+Atu2zJBrMib59mEhes/RXcm+KDNgIa7k7UhbszLRahyuDPmJwaCVC1PHfDp+ICV1IMen0ldW6yl9RUlR+q179bNc3V6Loh2OJSyweea0sOLWjheFOTktg1L3F21WIL5Z0YKNAAAAAElFTkSuQmCC"));

//Tehparadox.com
trackers.push(new SearchEngine("Rapidshare: Tehparadox.com via Google", "http://www.google.com.tr/search?q=site%3Atehparadox.com intitle:'"+cleanTitle+"'", true,
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAyFJREFUOI11kztonWUch5//e/m+75jrSXJOaNrUplVEO2kppWBQi5M33DJIxEHBqYuIYEso2eoFFDpKwSs4iS21IrUOItoOhZZAtMUKTUNiSNP05CTnfJf3/TtEu/nbnuWZnp+o6uyJE7NHhodHOkWRO2MEEf53qkqaptXq6mptZmbmojt58v3nTp368EB/fw9FHlCEEEB1W6SqgCCi9wXee9rtNmmaZm7HjkY7hKGy0+krXVK6xKpmmYoIxAhJosQoxLjNVaXivC+NMb7ZbLbdnTuVf2161e+daHP+bOLudS0Li55QgRi4e9eQeCXNlDSJJEkUNFIUpc/z3Lk0zUCFV17e1Kcfb7Nrooq3lh1vHxuhp0d5cnJL5udTFhYci4uOlVWH9069F0BwY2M1PX58hG/POQYHCx6ZKOXjD1b44tMl3j3WoDkU2fXMJt4pVRBCVC78OMg3ZwTvFeN9Tfbs6cGYoBstq2cv9HBidoTmzsDBgx2OvtVgo2P48ut+3jne4POvBjj65jp7J0paG4JRjQwMNLDWi7UqjaGg12967SwLRya39MXn27z+xj0+eu9vaply/vterl/3vPTsJqtrDhNC0FotY3S0SadTqbVGbi05ufF7wsOPliICf1xJGH8wsP+xnM9OLzL51CY3bzkGeiPGGCNVVTE6Okp9aFjQgvaW49LVjKsXhbGRSubmUtEE2TdRyCenB2Xq1Z1y5oc+6vWAARARYoyMj48zWB+kyEsuXa7R3wv7H8r19pJTUfTwga5euZbp8rLXB7JICIIBtqv5t9Tdu/ewc6zJnwuW5phw6ImC+bmU9RuGTkfo7YmkiVIFAMXFGEVVUVUBlbJU3bdvB3fWeuXKtZZOHt6QG7eFF6bH2Cos1ogUBWKtICK4LMsq733pvS9FREHUmCAD/Q3O/XKIv5aWaW3UWFvfBM1JkyhRbamqWGsrt7Ky0ttqtXwIwYcQ7r9OpM1vly0//7qb4ZFAvd5Hp9ul2y0QEe+cJYTQ56anp7+z1nbr9Xo3z3NnjNH/JMZEnFW6uWCMxRgBkDRNq7W1tWxqauqnfwC1iHGc3mwYnQAAAABJRU5ErkJggg=="));

//FilesTube
trackers.push(new SearchEngine("Rapidshare: FilesTube", "http://www.filestube.com/search.html?q=%title&select=rar&sort=dd", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAp1JREFUKM9tUEtIFHEc/s1rH5M7GJhLtauELTJUdDEkVgpBO3UKwkMJ4kXYzoFg4LWziQge9BCGQYcOuiUIgiAkhl10d9kNxtUp120fzrozO//Xr8Me6zt9D77D90mIWCqVstmsT/zE7UStVovFY6WzkmmaqqrCv0DEhYUFSZL6+vrm382nUqn0l3RyKFmpVPB/kAGAEDIyOlIoFFKvUqNPRmM3Y7Ish0Kh/f395eVlxpjruktLSzs7OwCgAoCmaeVyeXNzc3h4eHZ2dubNTCQSyefzU1NTuq5nMhlCyNHRkW3bGxsbcrtwUjxZWV7xPE/XdUVWNE3L5XKU0uRQcmtrq1qtxuPxdDodjUZlAHBdd+DBwOqHVcMwOOftbaqq2rZdOiuNvxxfXFy0LGt6elqSJLkdU0rbRAiBiEIIzrlpmhMTE5lsZm1tbW5u7uDgYG9vTwYASZI0TWsXAoGAIitCiMHBQV3XJycn+/v7z8vnY2NjhmH09PYAItZqtWKx2H7Nsiyn4bSl4zjZbLbtHx4elstlRJQQ8fiCbh83HSI0BThHwoEDMAGUg0DgQvicEQadQe2ZaagAsJ53dnP207tRgfL7gntYYQ2Cj28ouoqf8i2fCWAIvggjXnjdKgCApPyoSCmdf7ZoPMQSceFQybymmt36dSO8e9p81BsRPlnZPQbaoQKAz4XlipLLD/7Q+x0sFiStsCZh4LvdCnP/RS9LREW1QbdDDvM7VQBoMmx6LBJQgbMW4V1XA5dMuSStsIBWy710vd9ACucXjVpV5lEVAOoukz3+ca+Y/yX+cCfoKFUCJ3Vyq0O4nvft9PJOVzDEvPPTOr3XKyHieu7i7defp/VGQEFglBMfBAHkMuOITKAARoHTeOTK6+cP/wJqALI5kVvkRQAAACJ6VFh0U29mdHdhcmUAAHjac0zJT0pV8MxNTE8NSk1MqQQAL5wF1K4MqU0AAAAASUVORK5CYII%3D"));


//-----------------------------------
//--------------ED2K-----------------
//-----------------------------------

//Label
trackers.push(new SearchEngine("", "", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));

//Ed2k: Divxplanet 
trackers.push(new SearchEngine("ED2k: Divxplanet", "http://divxplanet.com/cse.php?ie=ISO-8859-9&oe=ISO-8859-9&hl=tr&cof=FORID%3A9&q="+imdbCode+"+ed2k+eMule+Download+linkler+kurulumu+gerektirir -lofiversion&sa=Tekrar+Ara&cx=009015947334585847211%3Aovbkgowgb9k#981", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+0lEQVR4nKWTXWhTZxzGn/d9z0eTNl9N0iS2SZs2fnW1yrSsEymDOnVuF5tOGANRURDvVBhuMHc1dO7j1u1iA/FCGILix4bKLIqoII6pnU2UmURLbWLTJienyTkn57zn7Ernx0DE5/IP/x888HuI4zh4nQj/dzS5SQrqo1hBqcVlgRjJUPSuR/bUXwrgNsfZ0evv/XT89p5qSVgScDd5tIbJq7peXLHcf3T3h0MHot5w8ekf8riCaZnk2xNnvh65UN8zvChIEmERhBFUVRtqnWOiYiJdGb+/f8fQ+qUd8/96AihUy+Frk2MDV9MTQyPn7M/e6gyCSxzUxxASHTgqhc/PUFYt5CoabuUfZA99uerjoqa0vZNYfIGcyd/enH2k/HL9Vg197UHcuFPGtF5DpLUFdVNHzC0C4Biv2TAaHL3RMFSpaBqSevOHleuGaZPIbKnhwtSUjprewLx4AGG3jK5WLwzNxoKuKBJzImgiFDGZoDvSgjfDXWKHR8pKAmkIss0mxqen7s+NhzpLVQ0P/ynh78kGqEjRH/fiUroAgxMoswCtcVxJZ1CaUbFze6jNsGwXHexInTdV/VT27jSoDYhUhN8roazaEB0CyXGB8iaYkzouHykgc6wIJVcxP+rt3eF3uRUBAN5v/+ONDcwApGaMpuZg1FgKcm8EraKIlN+CYTEgkMMHayXw2SKkRJBOTeS+SAa+3yYAQDQoe6jmAtcVvNsjoCd/DKnVEQiEgzoWZjlFrFvATEsf/vwtg8SSJBPk+BgllAsAwEJD3x28ltuSSfevGeiogNhdODzmwCnMor3TDX80Bp/jQt1muFgcrO9K9ezrS67/mVH2n0jlmuL75MDJ3/OFtkFfwIWGUoGlGPDPiwAmASwLpZmiuXtT666ty4d/ZIw9ayIAlOuK96tfz35z+lLjU9l2eYJtXpQUG3Wt5sTCSmbvxoWfr+0fOM0oe1Hlp/eQn3mYvJzOrnhQ0hcIgq0t645deTs192qz3Kw9P6YXAK+afwFFBlABNzEZ7AAAAABJRU5ErkJggg%3D%3D"));

//ED2k: DivXForever
trackers.push(new SearchEngine("ED2k: DivXForever", "http://www.divxforever.in/index.php?act=ed2k&CODE=00&cid=1&keyword="+cleanTitle, false, "data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA4AAEdoAApnlwALaJkAA1mAAAAoQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVHUALdP/AFj0/wBh+P8AZPn/AGb9/wBb+f8AOtn5AA51kQAADxYAAAAAAAAAAAAAAAAAAAAAAAAAAAACcZUATO3/AGn4/wBm9f8Aafn/H3b5/xdH0vIOJZCyARFtjwAPZI0AAHOZAAAXFwAAAAAABGGBAAl2mgAARGMASer/AGj2/wBk9f8We/3/LU3H5wAAOlEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCBrABT8/8ANNf/AGf2/wBk9f8ef/7/Kj2z1AAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWmcIAafn/AGX0/wBl9f8Kbvj/RWvZ9gAABBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOYwAALDoAGKDIAGn5/wBm9f8AZPT/NYz9/zFHu94AABAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC1EABak0ABj/v8CC2CGABWKugBp+v8AZfX/AGP1/xF2+/9dqv//LkjW/wAALjoAAAAAAAAdKwADYIIAG7XlAEfp/wBm+P8Aavz/FiuRtgALb5oAavz/D3b9/0mF9f8tP7DTAABLbAAADRQAAAAAAAAjKgAWuvEAUfX/AGX2/wBo9v8AZvX/AGj5/yZErtUAAENnCWn+/x8tocUAACE2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAqNwQBS7v8AZ/X/AGX0/wBn+P8yUcLiAAAZHwAAQ10AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCwAjwO4AY/X/AGX1/xBy9/8AZvn/N1Gz2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwASoc8AYfb/AGb1/wBm9v9Tgur/VJj//yk/o8MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5WQAkvuoAY/f/AGb1/wBi9f9Ejf//AgBIaQMBTW0JD26LAAAAAAAADQ8AAIKqABqFrgAciq4AIaTHADXU+gBa9P8AaPj/AGT1/wBo9/9Djf//DxJ7mQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwIIV3IUQcnlI3L4/yeI//8jg///Kof//z+O//8/Zdz6AwJMbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFygDAEFlDhJigAwQY4AAADNUAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAA+B8AAPADAADgAQAAAH8AAAD/AAAB/AAAAfAAAACAAAABAAAAD4AAAD+AAAD/AAAA/gAAAIAHAADADwAA+B8AAA%3D%3D"));

//ED2K: VeryCD
trackers.push(new SearchEngine("ED2K: VeryCD", "http://www.verycd.com/search/folders/"+cleanTitle, false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC1ElEQVR4nJ2TzW9UZRjFf+9779x7p0yYQtthgOA0LUpsK62twdIYiE1YqWCltImRP4GNiQZ1Y8JGE8WIxriBhlQ3RoMKppq0jQmmXUANFqYzUPthSWko04EwH/f7vi4ITUgMUc/2ec4vZ3EO0dyv+8L53wT/Q9Ffkz06UdiJCsrA7w8PV/b2JIK3jgw+YVTfBFjyak6aX1z45pnRsdLDnzA30orvdIno5qW+cP7iZ3r6yS8r15eGFj//saf6x/Q7hlttj1u6BHDcIHLMmumaltYPdhwbHEt2ZI6EN3Nvyx3PHdcV6ge824PhbP6Ec638hnNpIrNZalZteiNS0x9EDQJ5r1jqKE5OnHVf2DITmhufjaT1vYzavhMAYf7bp6OZD8cr86tpb0IgrkbETAtpWIAg8h28cpWwCeIHJBuealiTre/2artem9YBnDuZvP1nYi75/GraqLfwAWYNDGsDCIHngtGsMAc09F0296cSc/HabVkACXD36+HOhU+vdjm3JXpnQOyQIrZTg0CCL9G2ahj9Aq3bx7srWTiV3V0YHupaB7gLM43OctVaO2cjDBB7bMRLNmFtlSBWQR60EfschKlYO29jL1Ysd+lGI4AOIKUMpSkpXrDZdNjE6oboQBlRVuAIeLmCNATulYDCORtpCjQpgvUEyd7evJ6I23bJp3DGhkA+SNJfQr5eQsQVUkkKww520UNPWHZy//78OiCWarie3N0y4lOlMOpSGvXRhAQlQIJEUp4MWf3JxadKsq3ll1gqlXukloUT7++Z2r79zjio6c5Nys02KieXUXY2o/zZJpV9sU6Ngbq8JbV2b+h09z92u3jqk0OX6zevjCPV4nsp5eWblTfTrJY/TqtxNDVVX7dSPPnRq48dyPJAX3u+vev0tZattyo/Nyn3YpPK7d22kmvrOHNr8HDHY82PgF7pryud7f3KGek7vzxwtOFfG/+r/gaJ6DlfZUWfzQAAAABJRU5ErkJggg%3D%3D"));

//ED2K: Oskolop
trackers.push(new SearchEngine("ED2K: Osloskop", "http://www.osloskop.net/search.php?q="+cleanTitle, false, "data:image/png;base64,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%3D"));

//ED2K: Rollyo
//trackers.push(new SearchEngine("ED2K: Rollyo ED2K", "http://rollyo.com/search.html?sid=145155&q="+cleanTitle, false, "data:image/gif;base64,R0lGODdhEAAQAN0AAPr//8ABAdgAALEAANEAALgAAMgAAP319fjKyuEzM9oSEup1deAjI+EqKvvm5qsAANkKCuhYWOFAQOZNTdkfH8gSErcSEqEAAN8cHN4SEtESEut7e/W8vOhmZu+Li+VRUex7e9qYmPOSkt+OjsESEvjPz/bAwJ4AAP3p6fKhoeyamvW5ueSqquQ5OeM5Obc4N8o7O+RAQMtbW9Q7O7cdHdIYGO2EhO1kZO1bW84zM+hfXwAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAGl0CAcEgsGo9GBGjSSjRqJIulosiADpGI5DA8iCSBgkEAWSwAJk8nEdkgUDdDQJBpAEofwZCMcBAKBAoYHgAcNmsfCwgAOAEDBgoMAhMrRAccMY4DARqSAmQYDRQEBgUDDw+cngSkAWEDsA8XBRUun6xyrqYDFycDISkCrKRyBbsvRBujBrnGNCxGDio6MzkwMiMOSNvc3EEAOw%3D%3D"));


//-----------------------------------
//------------TORRENT----------------
//-----------------------------------

//Label
trackers.push(new SearchEngine("", "", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));

//Torrentz
trackers.push(new SearchEngine("Torrent: Torrentz", "http://www.torrentz.com/search?q="+cleanTitle, false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAA0ZpxMG+fNAAAAAXRSTlMAQObYZgAAACNJREFUCJljqP/H8P8/CDUfZGA+gA3dZ2A+xMB8hIH5BJANAL3/EC6qfK0AAAAAAElFTkSuQmCC"));

// YouTorrent
trackers.push(new SearchEngine("Torrent: YouTorrent", "http://www.youtorrent.com/tag/?q="+cleanTitle, false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABXklEQVR4nJ2Ry0rDQBRAz8QgujIVwW6ULHThk+AP2I3rBvwbQaif4B9Il4JdC26KX9BuFEGkAUFBoaFoQZiZ62KinUQF9cIs5j7OnJsoOZ3OgGX+F48h9t/DAPUQIwCcXFoGT0JjPaCxpmidGQBa+1Owdfh19K4Nrxkhro/8BY46ln4GmICjjiVeULRSvgc8XMIoI8AABtJEAdC9tnSvLADpjgIDnO/BbdsN3rbd/bkPBgK0gBbiCJIlRT6G4wsH2F1RoAXuuzDKHGCUuft4CFoI0PBxmtvOIh9DNAvplvqsYQt1O+lHewZoId2crNhYVfg1rBQAKeVLBkldEc+7vuaGKr30KwO0ENfcGvGcVAx8wCQfoiu/pzDFFK/gDfoGRYRooRQiHsCrVb/BJ8D8YGALSDUv5bySQ1VS6D1C/gbJIkQzXiGKoRbDcAD5wAMcUNnhT2ECLD1sofz3c/MO3WPKaE68p4wAAAAASUVORK5CYII%3D"));

//ThePirateBay
trackers.push(new SearchEngine("Torrent: Pirate Bay (Video)", "http://thepiratebay.org/search/%title/0/7/0", false, "data:image/x-icon;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA/////////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBAv7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////AAA="));

//Demonoid
//trackers.push(new SearchEngine("Torrent: Demonoid", "http://www.demonoid.me/files/?category=1&query=%title", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAACR0lEQVQ4y8WTz0sUYRjHP7M7O+4P29zdljQE3RKULCSLQIyKiYLoUBBdO+TFoEuXKCjoWgQdPRlEd/sLHC+F6aVwbUstcl01WRvd3dlxdmaceTvIatIPvPWcvrwP75eH5/l84X+WqqpCqov6o6Zp0l4+1rVcF3ceRfGEAHaaf6uBey7gMPw0tmOgr3pkOhp5+DzK4kKV9iMJQqEAnu8DgrJuo+s2TUmwLJtvX2pAjEDdoFyykQJg1wQfP5TRV2s4jsAyfSzTJxJVqJQcFuaLhCMNzOR0NE2Ttg2cWgghBIGAxOVrbSRSYRxb8HZsGc/32PQ8WjM+zYeaqJolioXY7h1I8gaIOEHZp1hcx6x6hGSFrmMp1leDGNVFIjEPOeQSCsaxnO+oqiqCqqqKwQcNtB+OkZ8vk52UUNxLdLTcYGpykwv9d+lqu85sNsyb0R9IUpQNZ4HTZ32mxpNbEywvVZh+34jinqPvxBlOnuohnU5RqRjIskwy1UTzwRauXrlJOt3Kk2f36Tmf25q8fteBW7fp7T1OONqAtWGhKAqu62IYBolEgkKhQDKZJJ+fp1QyeflqCHxl6wqapknDL4ao2Q4tza3Mzc2xsrJCZ2cnpmmSy+Xo7u7GdX1KJYNKRQdfQdM0KVhfYiaTeZxfHqdxH4yNTrA/foBYNM67iQk+f5ohEIDc7BgjI6+Zzs5sE7sLW1VVRd9FC09UCAZ9fCEQvoTtlNHX1iivC4yl/l24/8b9r5xnjuqEwxEct8bXbPKPWflncPYSsp+9dAnY5lgLkAAAAABJRU5ErkJggg%3D%3D"));

//isoHunt
trackers.push(new SearchEngine("Torrent: isoHunt (Video/Movies)", "http://isohunt.com/torrents/%title?ihp=1&iht=1&ihs1=2&iho1=d", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39vX28e/5+fUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkim2EWjTazb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkimdmMwDBq5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQv6qymH4AAACulH1mMwCpi3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08O16UCaAXDPs5N/Mu6xmMwCgfl8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7+viadFNzRRPl3tjn39dyRBaJYz4AAAAAAAAAAAC7qJaQbUvfzsYAAAAAAAAAAAAAAAC1m4ZmMwDGs57p4tqFXjh9VCXo4dgAAAAAAADZyrx1SByMbEUAAAAAAAAAAAAAAADJvKtsPQujh2n7+/qUd1dmMwB1Rxl3SRx3SRx1RxlmNAGKZj/l2NMAAAAAAAAAAADk1c5wQBGNZ0H18O2niGNmMwBtPA52SRx2SRx2SRxtPQxoNQPl2tQAAAAAAAAAAADz8eyHXz9xQxXt6OTMvrNpNwW1mYQAAAAAAAAAAACxloNmMwC6p40AAAAAAAAAAAAAAACjgGJsOgrTx7Xs49uFXjeXdlXv6uMAAAAAAADXzb9sPAujgWYAAAAAAAAAAAAAAAC/rZlmNAG4n4gAAAAAAAAAAAAAAAAAAAAAAADn39d3TCGDWS7PwbQAAAAAAAAAAADx7ei6pI7Yyr0AAAAAAAAAAAAAAAAAAAAAAAAAAACJZD9rOgrIs54AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGsZxmMwCkjnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSwLdtPQqDWjL08vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7uju6eQAAADx/wAA8f8AAPH/AACR/wAAAf8AAAHHAACAxwAAgAMAAIADAACA4wAAwGMAAMfhAADH8QAA//EAAP/wAAD/+QAA"));

//ScrapeTorrent
trackers.push(new SearchEngine("Torrent: ScrapeTorrent", "http://scrapetorrent.com/Search/index.php?sort=seed&fz=&rd=&cat=x&search="+cleanTitle, false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACGUlEQVR4nI2Tz2uScRzHX9/n8cfUqTModRtjW6MGrRxECFEEQrcHCSLwtFuXrh3a/oDo1rVD0GGXZXTo5M1Y4ERYRNZsQQeN0WzYY84ne5Z+59NBEZdN9obP6fv5vH98PnxFqVSS+/v7Yn19XSaTSZnNZg85OQyq1arVj1QqZc3OzlrAiUqsra01E4mEvZ+20WgQjUYpFAoDkr7JeUKLN/FNnEMIVYpYLNZIp9Pufxt1XScUCiGlBMDhO83CnRWCCzegK3940LDUYrG4HI/HneFw+AiB2+3GNE0ymQx2f5BrD54zNnm+9y6AyqfMoQKgaRq6rg/Y1TQNgPHEY0Y8/o5sH3Zyr1oKQLlcJhKJkE6njzQEAgGit+7iDU4PkNdKH6hsb0gVWAGchmGwurpKLpdDVVVcLhd+v5/3XOCnKfE41G72NvWdbd49u49qH2kJoA54BySAmfmLhJaeMuq0YVMEAG3ZpFb6iGJ34jkzZdn+N9jL+P0H03YVc/czbaHgHZ9DsTk4NXe5c4Xmb4Y6sLt8OEYDCFVlcekR3tBZUERvmfqXTTnUQcus0zLrXF9+yWhwBovO+Tq7gK8bLzpXGIaJK1rfsNVTb+wV2cu/Hu4AYOrqbRBdZUtgAc1fVTaf3APAdlx+ANXpZmzmEpbVJRBQ2XrDVvIhfwwdwGsDdo8jcXjGlKZRdR/UdatWystvb1OyVsz3f3fjL6093MsDo910AAAAAElFTkSuQmCC"));

//Fenopy Torrent
trackers.push(new SearchEngine("Torrent: Fenopy", "http://fenopy.com/?select=c_3&order=0&sort=0&minsize=&maxsize=&search.x=29&search.y=26&search=Search&keyword="+cleanTitle, false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACcklEQVR4nF2TwU7qUBCGv55T2mK10kYwgibUlRhWxtd270MYDCEBU2KUQA0xDY1CsdD29C68cK9+yWwmM3P++TNHA7i/vy+32y2apgEgpaQoCnZIKQF+5JRS2LYNd3d3ZVEU5Y4wDMsoisrf/F+zo9frlcIwDIQQAGRZxmQyYTAYEEXR/rXn52fG4zG/sSwL/f/EYrHAdV0ajQaj0QghBJ7nsV6v8TwPgOVyiRAC27YpyxLxe4BpmnieR7vdJggClsslUkoODw+ZzWYMh0M2mw0AZVn+VKBpGkopAFqtFrZts16viaKI1WqFaZp0Oh0cx9nX/1BQluW3s3+p1WosFgu22y3Hx8d0u9198479gKIoSJKELMtIkoSiKHh7e+P9/Z2Liwt83+fp6YkgCFitVt/NQvxbQUpJtVrl4eGBRqNBu91mNptRrVZptVoYhkGz2WQ+nzMajajX68RxjK5pGkmS0O/3yfOcbrfLyckJ0+mUr68vfN/Htm3yPKdWq+G6LovFgsfHRz4/P9GVUhRFgRACKSVpmvL6+spqtaLRaJCmKfP5nLOzM9I0JYoiwjDk8vKSj4+P7xUcx+H29pbNZkMcxwyHQ7Is4/r6miAICMMQgMlkwmazodls4vs+g8EAvSxLAPI8R0pJvV7n5uaGl5cXptMplmURxzHj8Zjz83NOT0/RdX1v/N5EpRS7YUdHR3Q6Hfr9PnEc0+12cV0X0zRRSpHnOYZhfN9BlmVkWYZhGPvQNA3btrm6ukLXdQ4ODnAcBykllUoFwzBQSrFer9Ety6LX66HrOpqm7VXsvnalUmE8HhOG4f5KhRCkaUqSJPwBAbVgOHZYuE8AAAAASUVORK5CYII%3D"));

//Google torrents
//trackers.push(new SearchEngine("Google search for torrents", "http://www.google.com/search?hl=en&lr=&q=torrents intitle:'"+cleanTitle+"'", false, "data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAICAgAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8A//3/AP39/wD6/f8A+P3/AP/8/wD9/P8A+vz/AP/7/wD/+v8A/vr/APz6/wD4+v8A+/n/APP5/wD/+P8A+vj/AO/4/wDm+P8A2fj/AP/3/wD/9v8A9vb/AP/1/wD69f8A9PT/AO30/wD/8/8A//L/APnx/wD28P8A///+APj//gD2//4A9P/+AOP//gD//f4A6f/9AP///AD2//wA8//8APf9/AD///sA/v/7AOD/+wD/+vsA9/X7APr/+gDv/voA///5AP/9+QD/+/kA+e35AP//+ADm//gA4f/4AP/9+AD0+/gA///3APv/9wDz//cA8f/3AO3/9wD/8fcA//32AP369gDr+vYA8f/1AOv/9QD/+/UA///0APP/9ADq//QA///zAP/18wD///IA/fzyAP//8QD///AA9//wAPjw8AD//+8A8//vAP//7gD9/+4A9v/uAP/u7gD//+0A9v/tAP7/6wD/+eoA///pAP//6AD2/+gA//nnAP/45wD38eYA/fblAP/25AD29uQA7N/hAPzm4AD/690AEhjdAAAa3AAaJdsA//LXAC8g1gANH9YA+dnTAP/n0gDh5dIADyjSABkk0gAdH9EABxDRAP/l0AAAJs4AGRTOAPPczQAAKs0AIi7MAA4UywD56soA8tPKANTSygD/18kA6NLHAAAjxwDj28QA/s7CAP/1wQDw3r8A/9e8APrSrwDCtqoAzamjANmPiQDQj4YA35mBAOmefgDHj3wA1qR6AO+sbwDpmm8A2IVlAKmEYgCvaFoAvHNXAEq2VgA5s1UAPbhQAFWtTwBStU0ARbNNAEGxTQA7tEwAObZIAEq5RwDKdEYAULhDANtuQgBEtTwA1ls3ALhgMQCxNzEA2FsvAEC3LQB0MCkAiyYoANZTJwDLWyYAtjMlALE6JACZNSMAuW4iANlgIgDoWCEAylwgAMUuIAD3Vh8A52gdALRCHQCxWhwAsEkcALU4HACMOBwA0V4bAMYyGgCPJRoA218ZAJM7FwC/PxYA0msVAM9jFQD2XBUAqioVAIAfFQDhYRQAujMTAMUxEwCgLBMAnxIPAMsqDgCkFgsA6GMHALE2BAC9JQAAliIAAFYTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AsbGxsbGxsbGxsbGxsbGxd7IrMg8PDw8PDw8PUBQeJXjQYE9PcKPM2NfP2sWhcg+BzTE7dLjbmG03YWaV4JYye8MPbsLZlEouKRRCg9SXMoW/U53enGRAFzCRtNO7mTiAyliw30gRTg9VbJCKfYs0j9VmuscfLTFbIy8SOhA0Inq5Y77GNBMYIxQUJzM2Vxx2wEmfyCYWMRldXCg5MU0aicRUms58SUVeRkwjPBRSNIfBMkSgvWkyPxVHFIaMSx1/0S9nkq7WdWo1a43Jt2UqgtJERGJ5m6K8y92znpNWIYS1UQ89Mmg5cXNaX0EkGyyI3KSsp6mvpaqosaatq7axsQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="));


//-------------------------------------------
//-----------General Information-------------
//-------------------------------------------

//Label
trackers.push(new SearchEngine("", "", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));

//Google
trackers.push(new SearchEngine("Google", "http://www.google.com/search?hl=en&q=%22%title%22 movie&btnG=Search", false, "data:image/x-icon;base64,R0lGODlhEAAQAPfLAAATVikwdA8SnxUfgAsWpAAilholjxw4jBc7kwAlvQQ2sRMsoBUqqhMzuhY/vxw4tSgmiyM1mSUztiQ6sTE3sQ4qyxMxxRoyxiAuxR1CtBxJsBxasSJuuTFguBte0Rlf2xVc9h9W9xVjzxVr0gdj6BRh4R1o5yBcyiZbyydT1i9b2Ddb1iFY6CJg2Vpor1dzvEJu20Z0yi23QDy1REi2OUy0O1WzOVC4PU+tVUe5Sk2xQU2zRUO4UE21Ula2SmKEqWWF2HyPx2+a6X6e6Xqk1m+s78sUDs4UGdEQB9YfDdwaANEfHd0YEscjAM4mAM0qANIoD9IkGdslGswuItYgL4aP0ImP2YGZ36Opzaq2wq/S+rzX/7/e8MrS1MLO/sTb48rT8snX/83c89PZ+crq+cH1/9Dl/9Ln/93r/9fy/+Hf7P/42eDm/O7u/+T29uX2/eT2/+f4/+f5/+j/9u//8+3/9u7/9ur5/+j//+n//+v//u3//+7//e7//+////b66/T/6vX/6/f/7f/07fj/4fv/4Pj/5v/45v7/4/r+7/3/6fDw+Pfx//D/9/X/8fT/8/f/8ff/8/D///H///L8/fL///P///X7//b6/ff/+/T///b9//f///v19//w9v/09P/29v/x+f/y///z///1+v/1///2///3//j79P/58/z/8/z99/z/9v7/9P7/9vn7//v6//j9//n9//j///n///v//vv////4+v/5+//6+P/4///6/P/6/v/6///7///9+P/8+v/9+v7/+Pz////8/f/9/f79///8///9//7//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMsALAAAAAAQABAAAAj/AEn4oIFjBw8bOnrMuJGjhowZM1T8UdYJUZ5ZcNRYWjSrVK5QU0DMmtUnzRAXEy4o6FCEy6NDTkQIq1MmRgM0eZTlCXMgQJtRSE4gmgUkwh1EiZTNUiamy6NUUExcuoJgDCdDjQg9KgVL2SNFT1hwEvKglLBWuixZ+jSrlSBdRlL04bBBkTBdpZTpIqWsFaBcTEr0QaEhl6dWlswKW6poDRUPlmAUQKWMkTJLc76QMQNGUZMWgIgkCFJnlq5WXigwkFClVZQQyuRgELAlk7JBymCZGYAF0ZEPrQixgUDAihxVdPpoAZAFUZIRfThxgvPCwAILDipk+OFG2ZIVoxApERtPfvwlvZ+kQFzPvv0MJQEBADs="));

//Youtube
trackers.push(new SearchEngine("Youtube", "http://www.youtube.com/results?search_query=%22%title%22&search=Search", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAD//////////4OD//9paf//bm7//2Fh//9ZWf//Wlr//1pa//9WVv//ZGT//3Bw//9jY///goL//////////////////11d//8sLP//QUH//ygo//84OP//RET//y4u//8xMf//UVH//y4u//8PD///ZWX//x0d//9aWv////////////88PP//Cgr///////8zM///1NT///////+lpf//ubn///////+urv//fHz////////g4P//Fhb/////////////MzP//woK////////NDT//8vL//9ycv//paX//7Cw//9jY///s7P//8nJ//9XV///eXn//yIi/////////////zMz//8LC///+/v//zMz///Gxv//hYX//6Ki//+srP//W1v//6ys//+3t///2tr//93d//8PD/////////////80NP//AgL///b2//8nJ///5ub//56e//+5uf//oaH//+/v//+5uf//oKD//+Li///f3///AgL/////////////MzP//wUF////////Skr//0pK//9NTf//NTX//97e//+ysv//Nzf//xIS//+mpv//Kyv//z09/////////////xkZ///Y2P////////////8nJ///EBD//wAA///y8v//Ly///wAA//8mJv//Hh7//6mp//92dv////////////+vr///Jib//xMS//8eIP//MzP//zY2//84OP//Hh///y4u//9XV///hoj//8LC///R0f//qqr/////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAA/8zMzP/u7u7/IiIi/wAAAP8iIiL//////zMzM/8AAAD/AAAA/////////////////////////////////wAAAP/MzMz//////yIiIv/u7u7/ERER/7u7u/8AAAD/iIiI/xEREf///////////////////////////+7u7v8AAAD/zMzM//////8iIiL/7u7u/xEREf+7u7v/AAAA/8zMzP8RERH///////////////////////////93d3f/AAAA/1VVVf/u7u7/IiIi/wAAAP8iIiL//////wAAAP/MzMz/ERER///////////////////////d3d3/AAAA/4iIiP8AAAD/3d3d/////////////////////////////////////////////////////////////////wAAAP//////AAAA////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D%3D"));

//MoviePosterDB
trackers.push(new SearchEngine("MoviePosterDB", "http://www.movieposterdb.com/movie/%imdb-id/", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAABjElEQVQ4y6WTT0sbURTFf/e+N39iiIIUu6i1Lgx1VQpFoaBQcOHOhYi74kdw7wfowu/goqtuShf9Al0VDKWItF0phKZqLUJiyiQmxsm4mMxz0u7M3Z3zzjvcd+598mj1dcIIZQHKazv3unz08U1qYHTEDozKaAZ2YPB+a46Cp+xVLvjwrTEkXCmPs738kOs4YePtseMVwDOCZ4SCp1TrXdafTRJYcbxnhM3nk1TrXQqeOs4Z+EbwB8ThWRur8GK66Pj5qZCJ0HB41uZfvQIEVglsmmQ/gS+1Fq/mxh2/Up7gczVCJL2U16cdWMG36aFRqPxqsfi4SClUxnzl5ZMi+7XITSuvtwAl37hQAqP8+duj2YlZmi1x1evT7MRctmOCgUNebzPHrIym+OC0xcJMkeubhK8nbXwrQx0MTSH/JqNCYJXv5x3KD0KeToX8OL8isOr2Ja+3WapZgEKacNSN+dno0ukl3PQTfCMIQj+50zuDbKa7n36Tx+8O6kO4Uouo1CKH/9vE+5SM+p1vAYV8ZwooQAvxAAAAAElFTkSuQmCC"));

//Wikipedia
trackers.push(new SearchEngine("Wikipedia", "http://en.wikipedia.org/wiki/Special:Search?search=%title", false, "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAEAgQAhIOEAMjHyABIR0gA6ejpAGlqaQCpqKkAKCgoAPz9/AAZGBkAmJiYANjZ2ABXWFcAent6ALm6uQA8OjwAiIiIiIiIiIiIiI4oiL6IiIiIgzuIV4iIiIhndo53KIiIiB/WvXoYiIiIfEZfWBSIiIEGi/foqoiIgzuL84i9iIjpGIoMiEHoiMkos3FojmiLlUipYliEWIF+iDe0GoRa7D6GPbjcu1yIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//EksiSozluk
trackers.push(new SearchEngine("Eksisozluge Git", "http://sozluk.sourtimes.org/show.asp?t="+cleanTitle, false, "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAXElEQVR4nM3TMQoAIAwDwDzd5zl28D9xKyI0Verg0ElygWIxrCMaAFTvwzpkGA3MkE8BD7cckQDJe2Btd0AgefsNELYLRC/vGcAKwArACrCHTwC5h9N/4Mg20c1MGxAM9mt5Y18AAAAASUVORK5CYII="));

//Label
trackers.push(new SearchEngine("", "", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));


//---------------------------------------------
//---- Movie Information/Critics (Turkish) ----
//---------------------------------------------

//Beyazperde.com
trackers.push(new SearchEngine("Beyazperde.com", "http://www.beyazperde.com/ara/?q="+cleanTitle, false, "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAABOUlEQVQI12NggIC0mQxpMxmIAIwIDchgVjohDcgArhmbNkacduPVxoBPG3F+w2YVeXqwe9pBTYqPk/XgrecfJyYi9MxKZ2BgYEFTysTI2BtqUeCsy8DAcOzuyyDWRS8/fUf2N3o86MsIX6gNhkuXrzvZtfMicvwwoTmHl4MVmSvEzY6mgAnNT+cfvzl+7yWE/fnH79Vn76FpYGZgYGAw9rVTlbRVlfz88/erzz+2XH709defi4/fla07efrBa0URXh9deQEu9ofvvjAY+zIypM2s9jJs8TdlYGB4/vFbwLRdpx68gptnqiC6Mctdkp+LgYEha9mR6QevMckK8lR7GUKkJfm5Stz0kB1Q6qYPUc3AwFDipsfDzsrCycb8+vMPHnaoX//8+4es4c+/f+++/oSwP3z7xcrMBABQ2W0R+3SKhgAAAABJRU5ErkJggg=="));

//Film.com.tr
trackers.push(new SearchEngine("Film.com.tr", "http://film.com.tr/search.cfm?keyword=%title", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABkElEQVQ4jZWTTS8DURSGn2kvnUY601SJj0VFLKxId11opj9A+AVIbGyleyJIrCz8AP6BBEsJWixs1caCMKRJF5hMfZaZXguJBHeKk9zNPc8573tO7tWklJzOzMjK5ibPl5f8JaI9PXSMjtK/sKCFxw1DXiwt4TsOISn/dHzHwT06QtP1OW2nq0t6rhuoFjEMOsfGaB8e5vnqipOpqc+cME20XV2Xjeymt7eJZ7N4roswTfai0S950ez7gcXJiQni2Sz24iI3GxvEczm+86KRupHLAVBdXeWlXKZSKv1gRLheD2yQGBqiZts8Xl8TDmBCqsvWkREynkcklSKSSpHxPNqmp5UNRJNiB9JxuC8WiVkW98UiD4UCT+vrqFjxFv5p7u7gAOP4mJhlUVlZ4XZr6yOhYJUjALQMDgLg7u8HIR8O/JC6R8yyqNk2tWoVAphAB/rAAAB3h4cN1QFEPZHg+1NOptMAVAsFXhVzfxabJtr58rI8m539VUkVffPziN58XgNkeW3tX9+5e3KS3nxeewfTC5/hNeEvAgAAAABJRU5ErkJggg=="));

//Sinemalar.com
trackers.push(new SearchEngine("Sinemalar.com", "http://www.sinemalar.com/filmler/ara/%title", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////APr6+gPm5uYYysrKM8fHxjjU1NQq/Pz8Af///wD///8A////AP///wD///8A////AMTDyTyLh5d4fXaQi2xki59eVoaxcIqg0ISque1/qLnwboiV4Jydn2XS0tIr////AP///wD///8A////AO/v8Q9NNrTdPCfZ/zY23v88IN7/TDLh/8Tv/P/k/v//tub+/+P///+Hl6CrsrW4UP///wD///8A////AP///wDZ190oQDXP8xSb+/8QoPj/DKj5/yw/2/+Tkt3/5v///9z7//+93+b4v8HFUO/v8BL///8A////AP///wD///8Av73LREIm2P9BL+D/Ojng/wXF/f8df+3/TRax/6XB6v/F7fX9pKmva////wD///8A////AP///wD///8A////AKmjv2BKJOP/JnHu/wS9/f8Sn/f/Pzrk/0gStP9RKKr/f3+Pkf///wD///8A////AP///wD///8A////AP///wCRhLOBPVD0/wDS//8wYu3/TSLh/0wl5P9NHr3/TROq/2RgeJ////8A////JP///xz///8A////AP///wD///8Aemizo0g/9v8It/z/C6n6/wit+/8zWvL/UxfC/1UYsP9PN3jP8/PzDP7+/gP///8G////AP///wD///8A////AGZSur9QIPT/QTLs/y9w8v84evL/Tlbv/1Acx/9TC6n/RhqD7tbW1ij///8A////AP///wD///8A////AO3s7xKdn9LerrD//4KA7v+ctO7/yeH3/6XI9f94cOH/eGLK/2E8rP+SkpZx////AP///wD///8A////AP///wDw8PIOvMjQ2fv////f/f7/1PX3/9v2+v/P8Pv/zfT9/872/v/d9v7/lJqjrv///wD///8A////AP///wD///8A////ALe3wGDH2uD34vz//9Xz+v+z4vb/6vz//9n3/v/W/f//nq+387GxtFD///8A////AP///wD///8A////AP///wDU1douq7nC88ra4P/m/P//zev3/8Td5/3S9/3/3Pr//9Ht9f90gYe1+vr6A////wD///8A////AP///wD///8A1dTaMLW8xcWeoq6Otcza5ej7/v/A3+n/ssHL3aOpsc2su8Tuo6iwqP///wD///8A////AP///wD///8A////AP///wD9/f0B////AL+/x029ytTe1ubq+La3vVCPoLDPeH+DufHw8g7///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2trfKMrK0D/19fYKr7O/jrS1vWf///8A////AP///wD///8A//8AAPwHAADwAwAA8AcAAPAPAADwDwAA4A8AAOAPAADgDwAA4A8AAOAHAADwDwAA8AcAAPAHAAD+TwAA/98AAA=="));

//Sinematurk.com
trackers.push(new SearchEngine("Sinematurk.com", "http://www.sinematurk.com/arama/?a=%title", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFRkY5N0JGREQzRTIxMUUxODZDOTk2MTVEN0E3QTJFMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFRkY5N0JGRUQzRTIxMUUxODZDOTk2MTVEN0E3QTJFMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVGRjk3QkZCRDNFMjExRTE4NkM5OTYxNUQ3QTdBMkUzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVGRjk3QkZDRDNFMjExRTE4NkM5OTYxNUQ3QTdBMkUzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+yuwHlAAAASNJREFUeNq007FLQlEUx3E1iYYSAqdocXJIGpqcihYbghoiXPwfWsNBwUGDBqe2BrEGQWippakhKAhS1AYNCtxcC0oE0b4XfslF3osX0YUP7/IO57xz3rsv4PvjCrjcj+AaA7Sx89uiDfSQw60KrbklhHGGOxxiFWPsKT6HNxw5JQeVPIsSslhSbF7XkOIDtw5MIK79Mcqa/xNVdNVBxCl5BhtY11MOcI4MFjVOByk8W3mbiH3fMy1XUENaL9GMtoIk8rjEo7rYRR+F6W5Sar+mscYOTId17a/s5G2XhGmn2MKFRpusG48F7q2ckH0Sox4PmXkvfu3f7QKvHgssYNkpkMDwh9Y/8ICivtBk+a39Pk50aMy/8IQWmnjByPcf60uAAQBUPFXCxT/d7gAAAABJRU5ErkJggg=="));

//Sinema.com
//trackers.push(new SearchEngine("Sinema.com", "http://www.sinema.com/Search.aspx?Search=%title", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////APj4+AXg4OAd0tLSK8TExDjc3Nwh+vr6A////wD///8A////AP///wD///8A////AP///wD///8A+Pj4BdTU1CisrKxTrKyskNLS0qvZ2dmhs7Ozf6amplbQ0NAu+vr6A////wD///8A////AP///wD///8A8vLyDKSkpFfCwsKO4urn5b3c0f2k0L/9qtPE/drs5f3d3d3ww8PDfry8vD/09PQH////AP///wD///8A+Pj4BaSkpFnPz8+u2+zm/T6bd/08mnb9PZt3/T2adv07mXX9gL2m/fr7+/3MzMyeqqqqU/r6+gP///8A////AMbGxjfX19d5/////dLn4P06mXT9O5l1/Uafff09m3f9PZt3/Tyadv2o0sL9/f39/bq6uoHg4OAd////APj4+AOpqalW9PT04/////3R59/9aLGV/dXp4v39/v792uzl/T6bd/09m3f9c7ed/f////3s7OzVuLi4Rfz8/ADg4OAesLCwjP////3////99vr5/f39/f3////98Pf0/ZzMuf07mnX9PJp2/XG1m/3////9/v7+/bCwsGfy8vIKwsLCOtbW1qj////9/////f////3q8/D9o83A/XGynP1ssJn9bLCZ/Wiulv2x1cn9/////f////3FxcV15ubmFcjIyDPMzMyu/////f////3p8/D9erek/Xa1oP12taD9dbSg/XW0oP2q0MT9/P39/f////3////9v7+/e+jo6BXc3Nwhzs7OZP////3////9tNbL/Xa1oP12taD9g7uq/bva0P3u9fP9/////f////3////9/f39/bi4uFr09PQJ+vr6A7i4uEXp6enj/////a3Sxv12tKD9c7Oe/eHv6v3////98vj2/ajQw/3+/v79/////eDg4NfMzMwx/Pz8AP///wDMzMwx1NTUbv7+/v3O5N39dLSf/XW0oP2FvKr9oMu9/Xy4pf19uab9/////fr6+vy6urp11NTUKf///wD///8A+vr6A7KyskrNzc2e/Pz8/ajQw/10s5/9drSg/Xa1oP11tKD9frmm/fn5+fzQ0NCFwsLCOvr6+gH///8A////AP///wD09PQHzs7OLq6uro7d3d3j3ezo/bfYzf2y1cr9yODZ+t7i4c6rq6uEtra2Rvj4+AX///8A////AP///wD///8A////APr6+gPY2NgkrKysUJycnHnS0tJqsLCwicTExE24uLhF3t7eHvr6+gH///8A////AP///wD///8A////AP///wD///8A////APz8/ADy8vIK6OjoFejo6BX09PQJ/Pz8AP///wD///8A////AP///wD///8A//8AAPx/AADwHwAA4AcAAOADAADAAwAAgAMAAIADAACAAwAAwAMAAMADAADgBwAA4AcAAPAPAAD/fwAA//8AAA=="));

//Filimadami.com
trackers.push(new SearchEngine("intersinema.com", "http://www.filimadami.com/arama/?arama=film-ara&state_input=%title", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAU3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja40qtyEzjUgADExMuE1NzCzNLMzMDIDCxNLE0SgQyLAwgwAhMGhqYgEkoxwDGQBHngktAARcATu4UINhypRgAAAMxSURBVDjLJdE/TxtnAMDh3/23z2dIAIsGcEMdJzQEE6QWi4g5SOmAmEjGZGVA6sbWj9AViQ/RSM3KEmAAA6WiBAqpwFYljGMf2I7tu3vv3uvQ5ys8yurqqkTGTE5OIqUkBvyeRyACRrNjTExMoCgKURShaRqWZbGzvcNV+Yr5+Xn0ubm5X0u7ez/7nk8YhQRBQCgEIgxp1Bu4Qy6u6+L5HsQx3V6P4+NjZn/4kW63i7KysiJPTk4YeTACCiQTCWzbxrQsbl0X3/MRIgBFwdANrEQC120wls2Sz+fRZ2ZmcFIOLxde0uv1ME0T0zLRVI3TT5+oXlcRYYimqqiqCoqC46T49uFDhB+gdjodWq0WjuNgWRYDAwN02h1O/jqhXK4wODhIMpnE8zx8zyOKQsIwZGdnh0hKVMuyCKMQVVWRUlIulzk8PKB2c0Or1cS9uyX/OE+6L00kJVEYIaVkaWkJ27ZRPc/DbTRoNpsIIdjfK+H7Pre3t/z+4QPr6+tcX18z+ewZA4ODBIGPaZhsbGxw9OcRan9/P7ZtY5gGzbs7giDANE0ODg/+b5US3/cxTZNMJkOn2yWMIn569YrC1BT61dUVN7UawhfU6w1SqRQX5xecnp1RnJ1la3ub8/NziGNEGCKl5P79AX57//7fQqGAns1mubi4oFQqUa9/oVgscvr3Ge12m49bW3iex+bmJvf67+F5PZ5+/5ThB98QhoJcLof+z+fPVCoVnk9PY5kWSdvm3du3LC8v4/s+a2trFGeLWKaBrmmMP/oOQzco7e+PfanX0RYWFn7RVBXHcTB1g3q9zuMnT0in00RRhKHpZLNZUGB0bIzx8XGEEHQ6HV7MvUDXNA0Zx4hA0NfXR7fTYW93j6nCFAC2bQMwOjJK4fk0mqaRyWS4vLyk0Wig93o97KRNKuXgpFIYug6qwkFpn0hG2LZNLv+IoaEharUage8j45jh4WEWFxfR+9JpvrbbHB39QTJl87Xdpud5qIoKCrSaTT5ub0EMqqqi6RqGYVCtVqlUKuigoBsGy29ek8vlaN41ESJAVTUSyQSl3T1iwNQNNEMnEiFhFHJdrfL6zWv+A4GGjFO2A7hjAAAAAElFTkSuQmCC"));

//intersinema.com
trackers.push(new SearchEngine("intersinema.com", "http://www.intersinema.com/ara.asp?ara=%title", false, "data:image/gif;base64,R0lGODlhEAAQAIQcAFpaW1tbXF1dXl5eX2FhYmNjZGRkZWZmZ2dnaGpqampqa2tra2trbGxsbW5ucG9vcHBwcXFxcXFxcnJyc3Nzc3NzdHR0dXd3d3d3eHh4eXh4enl5ev///////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAB8ALAAAAAAQAA8AAAVl4CeOZClu2jZumVpe2IfF1/XBZTVaH7WXE19k8plIisQSxPEYPR4Qk3QqYliv10S10fgkvmDFQqH4HA4GwwfBPhcIAwHgA6jPCYKAPmCf7wN0dX97dIR8fXp1H4mAfYJzJJBUJiEAOw=="));

//Label
trackers.push(new SearchEngine("", "", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));

//Label
trackers.push(new SearchEngine("", "", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));

//---------------------------------------------
//---- Movie Information/Critics (English) ----
//---------------------------------------------

//Metacritic
trackers.push(new SearchEngine("Metacritic", "http://www.metacritic.com/search/all/%title/results", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAEgAAABIAAAAAAEAAAAAAAAzAAAAsp+fAJl/fwD///8A5d/fAE0gIADMv78AQBAQANnPzwBZMDAAv6+vAKWPjwDy7+8AmYCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJDAgHAAAAAAAAAAAAAAAJDAMDAgAAAAAAAAAAAAAJDAMDAQAAAAAAAAAAAAAJDAMDAQAAAAIHAAAAAAAJDAMDAQAAAAEDCAcAAAAFDAMDBAAAAAEDAwwJAAAAAAEMDAoAAAEDAwwJAAAAAAAABQYDCwYDAwwJAAAHAQcAAAACAwMDAwMJAAAHCAMIAAAAAAYDAwMLAAAHCAMDCAAAAAAACQkDAgAJCAMDCAcAAAAAAAAAAwMGAwMDCAcAAAAAAAAAAAEDAwMDBgcAAAAAAAAAAAAHCgMMDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="));

//Rotten Tomatoes via IMDb-ID
trackers.push(new SearchEngine("Rotten Tomatoes via IMDb-ID", "http://www.rottentomatoes.com/alias?type=imdbid&s=%imdb-id", true, "data:image/x-icon;base64,AAABAAEAEBAAAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ51AAMjQ1AAAAAAAAAAAABC+AAAs8BIAzO8SAD+61QAYXEAAsgYIABC+AAABALIAsgYIAAEAAACyBggAAAAAERAAAAAAAAEREQAAAAAAARERAAEQERAAERAAEREREQAREBEREAEREBEREREAAAEREREQAAAAABEREQAAAAAREBEREQAAAREAEREREAABEQARABEREAERAREAEREQAAAREQABEQAAABERAAAAAAAAEREAAAAAAAAREAAAAAD8f3cA+D93hfg5AAAccADwDEF3rIQDAADgH3eA8D8AAMQPAJyMBwAAjMF3aIjBAALw43dQ8P93//D//2nx/3ei"));

//Criticker
trackers.push(new SearchEngine("Criticker", "http://www.criticker.com/?st=movies&h=%title&g=Go", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAABMLAAATCwAAAAEAAAAAAADq5N4A+vn4ALyolQCojncAuKOPAGEyBABkNggAxralAK+XgQDPwbMAqpJ5ANrQxQC5pJAAq5J9ANnOwwCZe10A1Me6ALSeiQC0nYgAvKmVANrPxAD39fIAxLKiAMi4qADm39cAbUIYAPXx7gCVdlgAqY93ANfMwQCznYcA9PHuALunlADh2NAA7+rmALiijgBaKgAAjWxMAOHXzwDSxbgA08a5APXy8ABxRx8Ajm1OAOXe1wCslHwA3tXLAN3UygD7+fgAhGA8ANnOwgDb0MYA6+XgAIlnRgDGtaQA59/ZAKWKcAC3oYwA5+DZANHDtQD9/PwA6ePdAGU3DACQcFAAo4hwANzSxwDJuqoAnYBkAKeOdgCuln8A4tnQAO3o4wDNvq8A/v39AGU3CgB5USoAqI11AKuSewDKuqsAsJmBAGI0BgC+q5gAhmI/AM6/sACjiG4ArpaBAPj39QDXyr8AimdGAF8wAQCJZUMAYTMEAIhlQgCWd1kA2s7DAKeNdAC2oYwA3dPIALWgiwDv6+YAybipAGIzBgBrQBUAiWZFANbJvQDg184A8+/rAOni3ADl3NUAXi8FAN/WzACnjXUArZV9ANjMwQDUx7sA7ObhAKaMcgBjNQgA0cS3AN3TyQC4pI8AooZrAM7AsgCfgmcAoodvAMKwoABgMQMArpaCAPDr5wBfMQEAuaWTAPby7wDArZsAZjgMAGAyBQCulX4A8+/sAHBGGwDGtaUA3NHGAPf08gCObU0AyLinAJp8XgCqknwAm35hAJZ2WAC5pJEAr5eAAOLYzwD6+fcA7unlALCYhADVybwAkG9PAMm5qgC6pZIA18vAAMWzogDBr54Awa+cAPLt6QCTc1QApYtzAPbz8AC9qpcAt6KNAOTc1ACRcVMAspuFAPXy7wCJZkQArZR9AKeOdQB7VC0A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr6+vr6+vSRU0FAeUP5+iNq8hDl9Uja4ZBmUFbasycFOvik9LUpJ0pgdXGGt7Iytyr55/F6+vr6+vr6+ICJUNHTx9giivr6+vr6+vc12YNWkBAlWLr6+vr6+vrwASN0RsVnisUXGZECc7CQmTmodaR4OlqT6FSgZQW35ZJAQ9OIAaERwLOqdGbmELXgQbTWeMoQgKqq+vr6+vr69ooCx8KSKcOR+vr6+vr6+vm0MDqDAAYkVqr6+vr6+vrxaEL6MBJmAlKlwPLRN6LpcgA62Rr0Fkb5CPMYl1BYGGZkJ2Cq+knTOvr6+WY3eOHlgMQHmvr6+vr6+vr6+vr68CSE5MrwAAdQAAAGUAAABRAAAAZQAAAHkAAAB5AAAAZQAAAEEAAABsAAAAaQAAAHMAAABlAAAAAAAAAGMAAAABCgAAAAw="));

//AllMovie
trackers.push(new SearchEngine("AllMovie", "http://www.allmovie.com/search/all/"+cleanTitle, false, "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7DAAAOwwHHb6hkAAACBklEQVQokWP4////gwsXVzc0T4qJx4OWVdZc3rsPqJjh7pmzPcHhPUFhxKBTGzYxrKhtwCIXHN7hE9Dm6QtiB4a2uHt3+QX1BIfNzsxhmByTgKmh0zcQaNDOqTO6A0MnhEcfXrJsbk5Bl1/wpOh4BiAGqugOCAEaCURd/sFAbqub14m1618/fATkTo5NBDp9Q1dvu6c/0DMMQAw0pj88eklp5cq6xmmJqUBtre7eR5avfHrjJkhDTMLPr9/WtXW2e8E0AB1wbuv2z2/fvnn8+OOr1yuq6xqd3PBp6PYPWVhYCrQa6Nx7Z889vHipydn9yLIVuG3wC5qenHZ6w6bbJ0+9uHvv4aXLQCcdXrocu4YJkbFT45PePXl6/9z5OVm5J9dteHTlKjAcDy9b8eT6DaBrIRrWNLVBPd0fFgX0659fvydExlRb2p5cux6orsXVE2jD64cPe0MigMH498/f3bPmAKMFagMwZN4+fvL4ytULO3YBrQL6fnpi6vLquj+//1w/cgRoyY0jR///+7+upb0vJAIUD52+QTNSM4Bm75u3AMjdNmnKvLzCdm9/oJ6d02Z0BYRMiIjZO2fesspaoHMYFhWXg6LWL6jFzavNwxfoS6DVkOjr8IamDmC0tnr4AK2amZbFcPXAISJTHhDtX7CIARjtZ7duA7oBf/IGBiAwRf35/RsAknmV/hUMm9MAAAAASUVORK5CYII="));

//Mrqe.com
trackers.push(new SearchEngine("Movie Reviews Query Engine", "http://www.mrqe.com/search?utf8=%E2%9C%93&q=%title&commit=%C2%A0", false, 
"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QNSRXhpZgAASUkqAAgAAAACADIBAgAUAAAAJgAAAGmHBAABAAAAOgAAAEAAAAAyMDEyOjEwOjI1IDE0OjEzOjA4AAAAAAAAAAMAAwEEAAEAAAAGAAAAAQIEAAEAAABqAAAAAgIEAAEAAADgAgAAAAAAAP/Y/+AAEEpGSUYAAQEAAAEAAQAA/9sAQwAGBAUGBQQGBgUGBwcGCAoQCgoJCQoUDg8MEBcUGBgXFBYWGh0lHxobIxwWFiAsICMmJykqKRkfLTAtKDAlKCko/9sAQwEHBwcKCAoTCgoTKBoWGigoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8AAEQgAEAAQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8AxdN8J6nqNjHd28QMDoHDZHQsVHGc5yp4x6Hoap3ujz2lrNPKyhYpfII77sAkDBP94VdSbUYbdYIry5jgXpGshCjkHp9QD+FUnjuitwklxNJHPL5zo5BG/ABPrzgfkK8W0OXrc/SufFe13jy3872P/9n/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAAQABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDzL4bfsSfHP4p+CbP4g+F9DjfS72xW7guGmjO5GuZrZQFEm9m82FwVC5UFGICurHmfGXwF8WeB/C2o+K9auYEh0zW/7JniJG5roJE7Iu1mBAWaM7uhz8pODXT2Wv8Axj0Hw/F4S0T4leILPSoABDp1rqckcMeJI5RtVTgfPFG/HdFPauZu9L8ezwavp+qeM9UvrPWtYOqXtneyLIpuyiI8ysy7lZhFHnBAIjUYwAK/JvZ5f9Xek+eytta/Xzt2P9BI4njJ5vGXtaDwzm7q0+dQumtdnK109LXtbS7X/9k="
));

//Label
trackers.push(new SearchEngine("", "", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));


//-----------------------------------
//---- TV Information/Critics ----
//-----------------------------------

//Episodeworld.com
trackers.push(new SearchEngine("TV.com", "http://www.episodeworld.com/search/?searchitem=%title", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABhlBMVEUAAAAERqzc6vzU2uQcbtycstT8/vwELnTM4vwEJmyEuvwcaszk5uyswtzs7vQELoQEUrxsqvyMwvz08vRkfqRMmvwENoy82vwMXsQ0guzs6uwETqzc3uSkzvxkjsSErtwUZsxkqvzE1uzs8vwEPoQkctyMpszk4uw8huQEVrykvtxMkvRsrvwERpycxvz09vRUhsxMnvzc5vTU2twcbtQMYsQ0iuycrsT8+vzs7uwELmwETrTc4uSszvxcluTE2vQkdtxMhszM3vQEWrwEImT09vxUmvTc2twMYszU4vSs0vxsksR8tvwcZswsdszk5uTM5vykxuwUYsTk7vwELnwEUqy00vxknuwUatxsqvQEOpw0dszs5uSMvvwcUpz08uwsfuRcdpxMmvQENmzU5vy01vzU1tz89vQUbtwMXrwshvSMrtT0+vzs6uQEKnQESqTc3tykyvxcjsx0svwUZsRcpvzE0uTs8vQEOoQkctR0krzk4uQ8gtzE3vwEVrSkttREjvQEGlQQJ3XTAAAAAXRSTlMAQObYZgAAAPlJREFUGJVjYAMDYSk+S1cwiwFE8FRL8fHFx/AIQwXcXZW8i8LtspX9pcACaWxKkoHisYoZ0U65fEABHtcUjsIcNtla24yS4AILBgt3pjA2vSTPVMViDQFHNh4GqfJA2RxXQSFbrgQW03yOagYefUEujpxCH1kdExNTMVaggLCbIZdXrKiPqINJaJ6aPwOPhV2WaGmDQ4ODgoeuC6s/g2W8fISkWYKEaZCCtFWykQwDm7FRkIKJQ1Cdh3QFvxzQFjYeCy1Ga2dNad2KKD9ld5BL3dl440LyXBrZDcp5+MB+sYnnMxdJrCpjk+GD+pZP3b+cr9yfxwLIBgDQQzBObpZsJwAAAABJRU5ErkJggg=="));

//TV.com
trackers.push(new SearchEngine("TV.com", "http://www.tv.com/search?type=11&q=%title", false, "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcZJREFUeNpi/P//PwMlgImBQsCycdf5/5u2HAFzxEV5GF6+/kK0Zj8fGwZGFZei/6F2OgzyhvpgwefvvoLp+09fMdx59w1Fw+v3nxm+vvsAZnN9fgtxgZ2mAgObvAqKZhCw0lVksALSiw5eRTGEW0gATINUesjwPmI4dPLmMZAr4trW/McFjl559F8qsPU/UO3/+oWH/luVLPoP0rNh57lpTBKSQnUgE0HOvf34DRiDwMwt5xgaFh0Gs3UURME225qpMRQFm8Jdo6Upu4ZJVVbkEJD998HdxwzejasYEiZthyvYffkBnB1lpwumcydtZXh14QKI+U5ciOcgKBp/AcNhLthf0AD69PUHg5O+HDjQQGw+bg6GaEdNhsOnbjEc23eM4RuvMEjZDqD4X3A6kDUxmAgLVZBLrjx4zQB0GZgPYoMAiF+x+iRMMwMw5rbCExLQ9OtA6iPMuTM3nYL7f+7MDRCbrz4GOx0UFkDL/iYm+O4AyTOCkjLImcYB1YVAfh/IBphrYGxkGpoGjpzd0GoL8hrYBSAGMByWIicQZDYyDcJAtVtBesAJCaY4OT3glfi6PaBUo00oCXu6Wy+DsRkHPDcCBBgAHDLi/ODvW+cAAAAASUVORK5CYII="));



// --------------- END OF SEARCH ENGINES ---------------  


function xpath(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function SearchEngine(shortname, searchurl, usesIMDBID, icon) {
	this.shortname = shortname;
	this.searchurl = searchurl;
	this.usesIMDBID = usesIMDBID;
	this.icon = icon;
	
	this.getHTML = function (title, id) {
		var html = "<a href=\"" + this.getSearchUrl(title, id) + "\"><img class=\"img\" style=\"-moz-opacity: 0.4;\" border=\"0\" src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
		return html;
	}
	
	this.getSearchUrl = function (title, id) {
		var searchUrl = this.searchurl;
		if (this.usesIMDBID) {


			searchUrl = searchUrl.replace(/%imdb\-id/, id);
			
			var adres=window.location.href;
			var ilk='imdb.com/title/';

			var imdbKod=adres.substring(adres.indexOf(ilk)+15);
			//remove everything after first slash
			//regexp = /\/.*/g;
			//remove everything after first alphanumeric character
			regexp = /[^a-zA-Z0-9].*/g;
			imdbKod = imdbKod.replace(regexp, "");

			searchUrl = searchUrl.replace(/%imdbkod/, imdbKod);
		}
		else {
			searchUrl = searchUrl.replace(/%title/, encodeURIComponent(title));
		}
		
		return searchUrl;
	}	
}

function openAllInTabs(title, id, inclIMDBID) {
	for (var i = 0; i < trackers.length; i++) {
		if (trackers[i].usesIMDBID && !inclIMDBID)
			continue;
		else
			GM_openInTab(trackers[i].getSearchUrl(title, id));
	}
}

function getTitle() {
	var title = document.title;
	title = title.replace("IMDb - ", "");
	title = title.match(/^(.*) \(/)[1];
	regexp = /\(.*\)/g;
	title = title.replace(regexp, "");
	return title;
}

function getCleanTitle() {
	var title = document.title;
	title = title.replace("IMDb - ", "");
	title = title.match(/^(.*) \(/)[1];
	regexp = /\(.*\)/g;
	title = title.replace(regexp, "");
	regexp = /,|:|;/g;
	title = title.replace(regexp, " ");
	regexp = /'|"/g;
	title = title.replace(regexp, "");
	return title;
}

function getImdbCode() {
	var adres=window.location.href;
	var ilk='imdb.com/title/';
	var imdbCode=adres.substring(adres.indexOf(ilk)+15);
	//remove everything after first slash
	//regexp = /\/.*/g;
	//remove everything after first alphanumeric character
	regexp = /[^a-zA-Z0-9].*/g;
	imdbCode = imdbCode.replace(regexp, "");
	return imdbCode;
}


function getId() {
	with (location.href) {
		var id = match(/title\/tt(.*?)\//i)[1];
	}
	return id;
}


function addIconBarIcons(title, id, trackers) {
 var iconbar = xpath("//td[@id='overview-top']", document); //xpath("//h1", document);
    if (!iconbar || iconbar.snapshotLength != 1) {
    GM_log("Error! Couldn't find icon bar. Quitting!");
    return;
  }

	iconbar = iconbar.snapshotItem(0);
	iconbar.id = "iconbar";
	
   var tdimg;
  for (var i = 0; i < trackers.length; i++) {
    tdimg = document.createElement("span");
    tdimg.innerHTML = trackers[i].getHTML(title, id);
    iconbar.appendChild(tdimg);
	}

	
	if (GM_openInTab) {
		var tdopenall = document.createElement("a");
		var aopenall = document.createElement("a");
		aopenall.innerHTML = ""; //Open all stopped
		aopenall.href = "javascript:;";
		aopenall.setAttribute("class", "openall");
		aopenall.addEventListener("click", function () { openAllInTabs(title, id, true); }, false);
		tdopenall.appendChild(aopenall);
		
		iconbar.appendChild(tdopenall);
	}
}

function addStyles() {
	var open_all_class = "a.openall {\n" +
	"	font-weight: bold;\n" + 
	"	font-family: Calibri, Verdana, Arial, Helvetica, sans-serif;\n" +
	"	font-size: 10px\n" +
	"}";
	
	GM_addStyle(open_all_class);
}


addStyles();
var title = getTitle();
var id = getId();
addIconBarIcons(title, id, trackers);
//addAkaIcons(id, trackers);


(function()
{
    try
    {
        var tr = document.evaluate("//TR[TD/@class='lhscol'][1]/TD[last()]//TR[1]",
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null).snapshotItem(0);
        if (tr)
        {
            tr.deleteCell(tr.cells.length - 1);
        }
    }
    catch (e)
    {
        alert("UserScript exception: " + e);
    }
}
)();
