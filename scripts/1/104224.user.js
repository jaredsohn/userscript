// ==UserScript==
// @name           Imdb2Xrel&Imdb2Youtube-Trailer
// @namespace      random_4
// @description    Adds a direct link to Xrel and a Youtube trailer just below the movie title on IMDb
// @include        http://*.imdb.com/title/tt*/*
// @exclude        http://*.imdb.com/title/tt*/*/*
// @include        http://*.imdb.de/title/tt*/*
// @exclude        http://*.imdb.de/title/tt*/*/*
// @grant		   none
// @author         MC_J, k0nA, abbel
// ==/UserScript==
// You can add something in between the "" in modifiers
// example: adding "+German" would search for "Something Trailer German"


var site_name = "Xrel";
var site = "http://www.Xrel.to";
var query_url = "/search.html?xrel_search_query=";
var modifiers = "";

var site_name2 = "Youtube";
var site2 = "http://youtube.com";
var query_url2 = "/results?search_query=";
var modifiers2 = "+trailer";





var movie = document.getElementsByTagName("h1")[0].innerHTML;
var list1 = movie.split(">");
var firstsplit = list1[1];
var list2 = firstsplit.split("<");
var secondsplit = list2[0];
var encoded = encodeURIComponent(secondsplit);
var replaced = encoded.replace(/%26amp%3B/g,"%26");
var moviename = replaced.replace(/'/g,"&lsquo;")

var find_movie_url = site + query_url + moviename + modifiers;

var find_movie_url2 = site2 + query_url2 + moviename + modifiers2;


document.getElementsByTagName("h1")[0].innerHTML += 
"<br/><span style='font-size:13px;'><a href='" + find_movie_url + "'><img src='" + site + "/favicon.ico'/>" + "Search NfO on " + site_name + "</a></span>"

+"<br/><span style='font-size:13px;'><a href='" + find_movie_url2 + "'><img src='" + site2 + "/favicon.ico'/> Search Trailer on " + site_name2 + "</a></span>";
