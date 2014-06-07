// ==UserScript==
// @name           IMDb New Dutch Links
// @namespace      http://userscripts.org/users/68293
// @description    IMDb dutch search bar
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/*
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/?*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/
// @include        http://imdb.com/title/*/#*
// @include        http://imdb.com/title/*/combined*
// @include        http://imdb.com/title/*/maindetails*

// ==/UserScript==

// Update 2013-10-21 Removed isoHunt (RIP); added FilmVandaag.nl, DUTplanet
// Update 2013-08-06 Torrent Butler link, hide some other links, new moviemeter ico  
// Update 2012-11-27 fixed marktplaats.nl
// Update 2012-10-25 New PirateBay link
// Update 2012-07-07 Fix: demonoid
// Update 2012-06-03 Several chances, current links for:
//                   Moviemeter, Google, Youtube, nl.trailer,
//                   IsoHunt, PirateBay, Demonoid, Spotplanet, NZBindex, Megarapid,
//                   Subscene, Opensubtitles, Freecovers,
//                   Vergelijk, Beslist, Bol, Freerecordshop.

//This script is based on "IMDb->DirectSearch Fixed" from mohanr and "itas" from tukankaan
// and KaraGarga 15/03/2010 version 0.3

// Modification by Mimimi
// 07-10-2010
// version 0.1 

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/


// --------------- SEARCH ENGINES --------------- 
//  You can remove or comment out below lines if you disable/enable a search engine from the script.
// use this site to embed favicon.ico http://www.greywyvern.com/code/php/binary2base64


var trackers = new Array();


//-----------------------------------
//--------NL FILM INFO----------- 
//-----------------------------------

//Label
trackers.push(new SearchEngine("Informatie Links", "http://userscripts.org/users/68293", false, 
"data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));


//FILMVANDAAG.NL
trackers.push(new SearchEngine("FilmVandaag.nl", "http://www.filmvandaag.nl/zoek/%title", false, "http://www.filmvandaag.nl/images/favicon.ico"));

//MOVIEMETER.NL
trackers.push(new SearchEngine("Moviemeter.nl", "http://www.moviemeter.nl/film/search/%title", false, "http://www.moviemeter.nl/images/favicon.ico"));

//FILM1 AKA FILMFOCUS.NL
//trackers.push(new SearchEngine("Film1.nl", "http://www.film1.nl/zoek/?cx=009153552854938002534%3Aaf0ze8etbks&cof=FORID%3A9&ie=ISO-8859-1&q=%title&sa=%A0#918", false, "http://www.film1.nl/images/film1/favicon.ico"));

//CINEMA.NL
//trackers.push(new SearchEngine("Cinema.nl", "http://www.cinema.nl/zoeken/?query=%title&btnG=Search", false, "http://www.cinema.nl/images/favicon.ico"));

//FILMTOTAAL.NL
//trackers.push(new SearchEngine("FilmTotaal.nl", "http://www.filmtotaal.nl/search.php?q=%title&btnG=Search", false, "http://www.filmtotaal.nl/favicon.ico"));

//Wikipedia
//trackers.push(new SearchEngine("Wikipedia NL", "http://nl.wikipedia.org/wiki/Special:Search?search=%title&go=Go", false, "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAEAgQAhIOEAMjHyABIR0gA6ejpAGlqaQCpqKkAKCgoAPz9/AAZGBkAmJiYANjZ2ABXWFcAent6ALm6uQA8OjwAiIiIiIiIiIiIiI4oiL6IiIiIgzuIV4iIiIhndo53KIiIiB/WvXoYiIiIfEZfWBSIiIEGi/foqoiIgzuL84i9iIjpGIoMiEHoiMkos3FojmiLlUipYliEWIF+iDe0GoRa7D6GPbjcu1yIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//Google
trackers.push(new SearchEngine("Google", "http://www.google.com/search?hl=en&q=%22%title%22 movie&btnG=Search", false, "http://www.fabricoffolly.co.uk/images/google_favicon.gif"));

//Youtube
trackers.push(new SearchEngine("Youtube", "http://www.youtube.com/results?search_query=%22%title%22&search=Search", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAD//////////4OD//9paf//bm7//2Fh//9ZWf//Wlr//1pa//9WVv//ZGT//3Bw//9jY///goL//////////////////11d//8sLP//QUH//ygo//84OP//RET//y4u//8xMf//UVH//y4u//8PD///ZWX//x0d//9aWv////////////88PP//Cgr///////8zM///1NT///////+lpf//ubn///////+urv//fHz////////g4P//Fhb/////////////MzP//woK////////NDT//8vL//9ycv//paX//7Cw//9jY///s7P//8nJ//9XV///eXn//yIi/////////////zMz//8LC///+/v//zMz///Gxv//hYX//6Ki//+srP//W1v//6ys//+3t///2tr//93d//8PD/////////////80NP//AgL///b2//8nJ///5ub//56e//+5uf//oaH//+/v//+5uf//oKD//+Li///f3///AgL/////////////MzP//wUF////////Skr//0pK//9NTf//NTX//97e//+ysv//Nzf//xIS//+mpv//Kyv//z09/////////////xkZ///Y2P////////////8nJ///EBD//wAA///y8v//Ly///wAA//8mJv//Hh7//6mp//92dv////////////+vr///Jib//xMS//8eIP//MzP//zY2//84OP//Hh///y4u//9XV///hoj//8LC///R0f//qqr/////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAA/8zMzP/u7u7/IiIi/wAAAP8iIiL//////zMzM/8AAAD/AAAA/////////////////////////////////wAAAP/MzMz//////yIiIv/u7u7/ERER/7u7u/8AAAD/iIiI/xEREf///////////////////////////+7u7v8AAAD/zMzM//////8iIiL/7u7u/xEREf+7u7v/AAAA/8zMzP8RERH///////////////////////////93d3f/AAAA/1VVVf/u7u7/IiIi/wAAAP8iIiL//////wAAAP/MzMz/ERER///////////////////////d3d3/AAAA/4iIiP8AAAD/3d3d/////////////////////////////////////////////////////////////////wAAAP//////AAAA////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D%3D"));

//NL.Trailer.com
//trackers.push(new SearchEngine("Nl.filmtrailer.com", "http://nl.filmtrailer.com/cinema/search-30/?q=%title", false, "http://nl.filmtrailer.com/favicon.ico"));



//-----------------------------------
//--------DOWNLOAD--------------
//-----------------------------------

//Label
trackers.push(new SearchEngine("Download Links", "http://userscripts.org/users/68293", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));

//Torrent Butler
trackers.push(new SearchEngine("TorrentButler", "http://torrentbutler.eu/search/%title#better-than:0%", false, "http://favicon.domainsigma.com/torrentbutler.eu.ico"));

//ThePirateBay
trackers.push(new SearchEngine("PirateBay", "http://pirateproxy.net/search/%title/0/99/200", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAACbUlEQVQ4y5XRS08TURjG8f+ZablYwEK4KRGE1AsXEYSALjTRxIWGhRuXuvCr+A3cGHdudEHcaQgYNUGMiFEsNhS51xZoSykMdDq9zPQcF0QiKQnx2bzJWfzynucVUkrFETGNbSq8NRwX7ahHK2Uw/20cADufQ0r5f8D30WE8J2vIpPcIBacRQqCUOh7I57JshpfImAaeqmrGnj0mGZrDSGwQX1tBSolS6tBGB0DBsQlMjGLubjMw9IDFqbdY8VXyVoqJl08o91RhpQySsQhZyywGMuYuuttNLpMmtjzLmn+C89eH2I3Mc/bSAPl0ip1YhMgvP+WeymJAKkVVTT3+N89JbYZp6bvJ8uQYe5trnL7QS2x1ji+vntLS0YcQohio9NaSWAlQSO8QX/xJYmmGOl83CI1STxVbv+cpKy3FW9t4dIlCCLIpg+rmdvLpPVqv3cE3eBu9zEPI/4nI9AdOeGvRdL0YsPM57HyO+nM9FLImlpHA3IoyOzFCXVsngbEX6JqGnTGLzukC0HSdtYUAq9Pj7CXWEUIQDU5RyFpougulJAowoiGMWITqU82HN9B1F4nwEtH5HzjoOFopuMpo6L5BRUsX5Q2tlFQ34m1uJ/h5/9RFHdQ0neXy3YfIEg+7pollS2LhFQoK4usRyutaqPX1cPXeI3SX++Arrr9Aa2c/dU1tJBNxFvyTNFzsxzSSzPm/Igs221MfydgFvI3N+LquHO4AwLFtYhthJsffoQGLwRlWg35kwUEBynFIGiNk8g6ay03GStPRO4iQUiopJe9fD7MeWsLJWiAEKLU//4lAAArdXcIZXzu3hu7zBwwEMI4IoRqNAAAAAElFTkSuQmCC"));

//Torrentz
trackers.push(new SearchEngine("Torrentz", "http://torrentz.eu/search?f=%title", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAW0lEQVQ4je2SSw6AMAhEH6Q38k7eydPiqo32k1ro0tkRmBcgI8d5ARg+iQbMAKYBMwApr9KjV3V3RgeNr5LwCT9gAyDNR15qUrsKeGbGCOTAMswDKGbw/6D84gaYjgxYAHIgrQAAAABJRU5ErkJggg=="));

//EXTRATORRENT
//trackers.push(new SearchEngine("ExtraTorrent", "http://extratorrent.com/search/?search=%title&new=1&x=0&y=0", false, "http://extratorrent.com/images/favicon.ico"));

//1337X
//trackers.push(new SearchEngine("1337X", "http://1337x.org/search/=%title/0/", false, "http://1337x.org/favicon.ico"));

//Spotplanet
//trackers.push(new SearchEngine("Spotplanet.org", "http://www.spotplanet.org/index.php?cat=head&subid=0&section=&search=%title&stype=1", false, "http://www.spotplanet.org/favicon.ico"));

//NZBindexSSL
trackers.push(new SearchEngine("NZBindex", "https://nzbindex.com/search/?q=%title&age=&max=250&minage=&sort=agedesc&minsize=&maxsize=&dq=&poster=&nfo=&hidespam=0&hidespam=1&more=0", false, "https://nzbindex.com/template/nzbindex/images/icon.png"));

//dutplanet
trackers.push(new SearchEngine("DUTplanet", "http://dutplanet.net/list.php?idfound=0&infoidfound=0&idsource=all&search=%title&searchParam=title", false, "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXoI20_qxIXaXMRHFU49QCi-5D-HCz7dd4Q069Lr_E23a5sRdx"));

//Megarapid.net
//trackers.push(new SearchEngine("MegaRapid - Rapidshare e.d links", "http://megarapid.net/search/SearchResults.aspx?cx=001492128908768193523%3Ayhnew8d9zxm&cof=FORID%3A10&ie=UTF-8&q=%title&sa=Search&siteurl=w2.megarapid.net%2F&ref=", false, "http://megarapid.net/favicon.ico"));

//FENOPY
//trackers.push(new SearchEngine("Fenopy", "http://fenopy.com/?select=c_3&order=0&sort=0&minsize=&maxsize=&search.x=29&search.y=26&search=Search&keyword=%title", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACcklEQVR4nF2TwU7qUBCGv55T2mK10kYwgibUlRhWxtd270MYDCEBU2KUQA0xDY1CsdD29C68cK9+yWwmM3P++TNHA7i/vy+32y2apgEgpaQoCnZIKQF+5JRS2LYNd3d3ZVEU5Y4wDMsoisrf/F+zo9frlcIwDIQQAGRZxmQyYTAYEEXR/rXn52fG4zG/sSwL/f/EYrHAdV0ajQaj0QghBJ7nsV6v8TwPgOVyiRAC27YpyxLxe4BpmnieR7vdJggClsslUkoODw+ZzWYMh0M2mw0AZVn+VKBpGkopAFqtFrZts16viaKI1WqFaZp0Oh0cx9nX/1BQluW3s3+p1WosFgu22y3Hx8d0u9198479gKIoSJKELMtIkoSiKHh7e+P9/Z2Liwt83+fp6YkgCFitVt/NQvxbQUpJtVrl4eGBRqNBu91mNptRrVZptVoYhkGz2WQ+nzMajajX68RxjK5pGkmS0O/3yfOcbrfLyckJ0+mUr68vfN/Htm3yPKdWq+G6LovFgsfHRz4/P9GVUhRFgRACKSVpmvL6+spqtaLRaJCmKfP5nLOzM9I0JYoiwjDk8vKSj4+P7xUcx+H29pbNZkMcxwyHQ7Is4/r6miAICMMQgMlkwmazodls4vs+g8EAvSxLAPI8R0pJvV7n5uaGl5cXptMplmURxzHj8Zjz83NOT0/RdX1v/N5EpRS7YUdHR3Q6Hfr9PnEc0+12cV0X0zRRSpHnOYZhfN9BlmVkWYZhGPvQNA3btrm6ukLXdQ4ODnAcBykllUoFwzBQSrFer9Ety6LX66HrOpqm7VXsvnalUmE8HhOG4f5KhRCkaUqSJPwBAbVgOHZYuE8AAAAASUVORK5CYII%3D"));

//FilesTube
//trackers.push(new SearchEngine("FilesTube (RapidShare links)", "http://www.filestube.com/search.html?q=%title&select=rar&sort=dd", false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAp1JREFUKM9tUEtIFHEc/s1rH5M7GJhLtauELTJUdDEkVgpBO3UKwkMJ4kXYzoFg4LWziQge9BCGQYcOuiUIgiAkhl10d9kNxtUp120fzrozO//Xr8Me6zt9D77D90mIWCqVstmsT/zE7UStVovFY6WzkmmaqqrCv0DEhYUFSZL6+vrm382nUqn0l3RyKFmpVPB/kAGAEDIyOlIoFFKvUqNPRmM3Y7Ish0Kh/f395eVlxpjruktLSzs7OwCgAoCmaeVyeXNzc3h4eHZ2dubNTCQSyefzU1NTuq5nMhlCyNHRkW3bGxsbcrtwUjxZWV7xPE/XdUVWNE3L5XKU0uRQcmtrq1qtxuPxdDodjUZlAHBdd+DBwOqHVcMwOOftbaqq2rZdOiuNvxxfXFy0LGt6elqSJLkdU0rbRAiBiEIIzrlpmhMTE5lsZm1tbW5u7uDgYG9vTwYASZI0TWsXAoGAIitCiMHBQV3XJycn+/v7z8vnY2NjhmH09PYAItZqtWKx2H7Nsiyn4bSl4zjZbLbtHx4elstlRJQQ8fiCbh83HSI0BThHwoEDMAGUg0DgQvicEQadQe2ZaagAsJ53dnP207tRgfL7gntYYQ2Cj28ouoqf8i2fCWAIvggjXnjdKgCApPyoSCmdf7ZoPMQSceFQybymmt36dSO8e9p81BsRPlnZPQbaoQKAz4XlipLLD/7Q+x0sFiStsCZh4LvdCnP/RS9LREW1QbdDDvM7VQBoMmx6LBJQgbMW4V1XA5dMuSStsIBWy710vd9ACucXjVpV5lEVAOoukz3+ca+Y/yX+cCfoKFUCJ3Vyq0O4nvft9PJOVzDEvPPTOr3XKyHieu7i7defp/VGQEFglBMfBAHkMuOITKAARoHTeOTK6+cP/wJqALI5kVvkRQAAACJ6VFh0U29mdHdhcmUAAHjac0zJT0pV8MxNTE8NSk1MqQQAL5wF1K4MqU0AAAAASUVORK5CYII%3D"));

//KATZ
//trackers.push(new SearchEngine("Katz Downloads", "http://katz.cd/search?q=%title&type=movies", false, "http://katz.cd/favicon.ico"));

//---------------------------------------
//--------SUBTITLES------------------
//---------------------------------------


//Label
trackers.push(new SearchEngine("Subtitle & Covers", "http://userscripts.org/users/68293", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));

//Subscene
trackers.push(new SearchEngine("Subscene", "http://subscene.com/filmsearch.aspx?q=%title", false, "data:image/x-icon;base64,Qk02AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MAAAAAAAAZP/MZP/MZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MZP/MZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MZP/MAAAAAAAAZP/MZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZP/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//opensubtitles.org  via IMDb-ID
trackers.push(new SearchEngine("opensubtitles via IMDb-ID", "http://www.opensubtitles.org/nl/search/imdbid-%imdb-id", true, "data:application/octet-stream;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqqqr///////+qqqoAAAAAAADMzMzu7u7///////9VVVUAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACZmZmIiIgAAACIiIgAAAAAAABERETd3d0AAAAAAAAAAAAAAADu7u4REREAAAAAAAARERHu7u4AAABERET////////d3d0zMzMAAAAAAAAAAAAAAADd3d0iIiIAAAAAAAARERHd3d0AAADd3d1EREQAAAAAAAAAAAAAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACqqqp3d3cAAADMzMxEREQAAAARERHd3d0AAAAAAAAAAAAAAAAAAACZmZn///////+qqqoAAAAAAAAiIiLu7u7////////u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//FREECOVERS.NET
trackers.push(new SearchEngine("Freecovers.net", "http://www.freecovers.net/search.php?search=%title", false, 
"http://freecovers.net/favicon.ico"));

//---------------------------------
//----------KOPEN?-------------
//---------------------------------

//Label
trackers.push(new SearchEngine("Kopen?", "http://userscripts.org/users/68293", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));

//VERGELIJK.NL
trackers.push(new SearchEngine("Vergelijk.nl", "http://www.vergelijk.nl/?cat_id=2464&searchwords=%title", false, 
"http://www.vergelijk.nl/images/favicon.ico"));

//BESLIST.NL
trackers.push(new SearchEngine("Beslist.nl", "http://www.beslist.nl/products/dvd-video/r/%title/", false, "http://img.pho.to/img/thumbs/beslist.nl_favicon.jpg"));

//BOL.COM DVD
trackers.push(new SearchEngine("Bol.com - DVD", "http://www.bol.com/nl/s/dvd/zoekresultaten/Ntt/%title/sc/dvd_all/Nty/1/suggestedFor/title/N/0/Ne/0/search/true/searchType/qck/index.html", false,
"http://www.bol.com/nl/static/images/favicon.ico"));

//Freerecordshop.nl
trackers.push(new SearchEngine("Freerecordshop.nl - DVD", "http://www.freerecordshop.nl/is-bin/INTERSHOP.enfinity/WFS/shop-FRS_nl-Site/nl_NL/-/EUR/FHSearch-Start?enfaction=msearch&action=search&fh_search_type=mus&se_type=simple&findSimple=zoek&fh_location_search=%2F%2Froot%2Fnl_NL%2Fassortment%3E{nlfr}&fh_search=%title&searchcategory=03", false, "http://www.freerecordshop.nl/INTERSHOP/static/WFS/shop-frs_nl-Site/-/-/nl_NL/images/favicon.ico"));

//MARKTPLAATS.NL
trackers.push(new SearchEngine("Marktplaats.nl", "http://www.marktplaats.nl/z.html?query=%title&categoryId=1744", false, 
"http://i277.photobucket.com/albums/kk49/all1409/sys/d92f3128.gif"));


// If you want ...

//-----------------------------------
//--------OTHER SITES-------------
//-----------------------------------

//Label
//trackers.push(new SearchEngine("Other References", "http://userscripts.org/users/68293", false, "data:image/gif;base64,R0lGODlhCgAQAIAAAP///wAAACH5BAAAAAAALAAAAAAKABAAAAILhI+py+0Po5y0rgIAOw%3D%3D"));

//MoviePostersDB
//trackers.push(new SearchEngine("MoviePostersDB", "http://www.movieposterdb.com/movie/%imdb-id/", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAABjElEQVQ4y6WTT0sbURTFf/e+N39iiIIUu6i1Lgx1VQpFoaBQcOHOhYi74kdw7wfowu/goqtuShf9Al0VDKWItF0phKZqLUJiyiQmxsm4mMxz0u7M3Z3zzjvcd+598mj1dcIIZQHKazv3unz08U1qYHTEDozKaAZ2YPB+a46Cp+xVLvjwrTEkXCmPs738kOs4YePtseMVwDOCZ4SCp1TrXdafTRJYcbxnhM3nk1TrXQqeOs4Z+EbwB8ThWRur8GK66Pj5qZCJ0HB41uZfvQIEVglsmmQ/gS+1Fq/mxh2/Up7gczVCJL2U16cdWMG36aFRqPxqsfi4SClUxnzl5ZMi+7XITSuvtwAl37hQAqP8+duj2YlZmi1x1evT7MRctmOCgUNebzPHrIym+OC0xcJMkeubhK8nbXwrQx0MTSH/JqNCYJXv5x3KD0KeToX8OL8isOr2Ja+3WapZgEKacNSN+dno0ukl3PQTfCMIQj+50zuDbKa7n36Tx+8O6kO4Uouo1CKH/9vE+5SM+p1vAYV8ZwooQAvxAAAAAElFTkSuQmCC"));

//Wikipedia
//trackers.push(new SearchEngine("Wikipedia ENG", "http://en.wikipedia.org/wiki/Special:Search?search=%title&go=Go", false, "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAEAgQAhIOEAMjHyABIR0gA6ejpAGlqaQCpqKkAKCgoAPz9/AAZGBkAmJiYANjZ2ABXWFcAent6ALm6uQA8OjwAiIiIiIiIiIiIiI4oiL6IiIiIgzuIV4iIiIhndo53KIiIiB/WvXoYiIiIfEZfWBSIiIEGi/foqoiIgzuL84i9iIjpGIoMiEHoiMkos3FojmiLlUipYliEWIF+iDe0GoRa7D6GPbjcu1yIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));


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
	title = title.match(/^(.*) \(/)[1];
	
	/*
	regexp = /'|,|:/g;
	title = title.replace(regexp, " ");
	*/
	
	return title;
}


function getId() {
	with (location.href) {
		var id = match(/title\/tt(.*?)\//i)[1];
	}
	return id;
}


function addIconBarIcons(title, id, trackers) {
 var iconbar = xpath("//h1", document);
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
		aopenall.innerHTML = ""; //Open all stopped (by mimimi)
		aopenall.href = "javascript:;";
		aopenall.setAttribute("class", "openall");
		aopenall.addEventListener("click", function () { openAllInTabs(title, id, true); }, false);
		tdopenall.appendChild(aopenall);
		
		iconbar.appendChild(tdopenall);
	}
}
/*
function addAkaIcons(id, trackers) {
	var xpath_exp = "//i[@class='transl']";
	var akas = xpath(xpath_exp, document);
	
	if (!akas || akas.snapshotLength == 0) {
		GM_log("Error! Couldn't find akas. Quitting!");
		return;
	}
	
	var aka;
	for (var i = 0; aka = akas.snapshotItem(i); i++) {
		unsafeWindow.aka = aka.textContent;
		
		var title = aka.textContent.match(/(.*?)\s+\(.*?\)\s+\[.*?\]/)[1];
		GM_log(title);
		
		for (var ii = 0; ii < trackers.length; ii++) {
			if (!trackers[ii].usesIMDBID) {
				link_span = document.createElement("span");

				link_span.innerHTML = trackers[ii].getHTML(title, id);
				aka.appendChild(link_span);
				
				delim_text = document.createTextNode(" ");
				aka.appendChild(delim_text);
			}
		}
		
		if (GM_openInTab) { //If this API exists.
			var aopenall = document.createElement("a");
			aopenall.innerHTML = "OPEN ALL";
			aopenall.href = "javascript:;";
			aopenall.setAttribute("class", "openall");
			
			function creator (a, b) {
				return function () { openAllInTabs(a, b, false); }
			}
			
			aopenall.addEventListener("click", creator(title, id), false);

			aka.appendChild(aopenall);
		}
	}
}
*/

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

