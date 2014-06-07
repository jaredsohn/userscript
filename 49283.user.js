// ==UserScript==
// @name          imdb demonoid searcher
// @namespace      braddersss
// @description    adds a "get this from" link directly to demonoid torrent search from imdb
// @include        http://*.imdb.com/title/tt*/
// @author         braddersss (based on IMDb friends iSOHUNT (or other torrent search) By Freeloader Morris) 
// ==/UserScript==

var site_name = "Demonoid";
var torrent_site = "http://demonoid.com";
var query_url = "/files/?query=";

var find_movie_url = torrent_site + query_url + document.title.substring(0,document.title.indexOf('(')-1) 
document.getElementsByTagName("h1")[0].innerHTML += '<br/><span style="font-size:13px;"><a href="' + 
                                                    find_movie_url + 
                                                    '"><img src="' + 
                                                    torrent_site + 
                                                    '/favicon.ico"/> Get This From Demonoid!'; 