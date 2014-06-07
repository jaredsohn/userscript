// ==UserScript==
// @name           Xrel2ddl-warez
// @namespace      abbel
// @description    Adds a direct link to ddl-warez
// @include        http://*.xrel.to/*nfo/*
// @include        http://*.xrel.to/p2p/*
// @author         Jonatan
// ==/UserScript==



var site_name = "ddl-warez suchen";
var torrent_site = "http://ddl-warez.in";
var query_url = "/?search=";
var relnamebig = escape(document.getElementsByTagName("h2")[0].innerHTML);


var relname2 = relnamebig.split("%20");
var relname = relname2[0];

var find_movie_url = torrent_site + query_url + relname;

document.getElementsByTagName("p")[0].innerHTML += "<br/><span style='font-size:13px;'><a href='" +
                                                 find_movie_url +
                                                 "'><img src='" +
                                                 torrent_site +
                                                 "/favicon.ico'/> Download bei " +
                                                 site_name +
                                                 "</a></span>";