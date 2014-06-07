// ==UserScript==
// @name           Artist Rating
// @namespace      http://celestialmechanics.net/
// @include        http://www.furaffinity.net/user/*
// ==/UserScript==

var e = document.getElementsByClassName("bdot");

var d = e[0].parentNode.nextSibling.nextSibling.firstChild.nextSibling;
var dset = d.innerHTML;

var watches = document.body.innerHTML.match(/mode=watched_by\"\>Full List \(([0-9]+)\)/);
watches = watches[1];

var pageviews = dset.match(/Pageviews:\<\/b\>[ \n\r]*([0-9]+)[ \n\r]*/);
pageviews = pageviews[1];

var submissions = dset.match(/Submissions:\<\/b\>[ \n\r]*([0-9]+)[ \n\r]*/);
submissions = submissions[1];

var journals = dset.match(/Journals:\<\/b\>[ \n\r]*([0-9]+)[ \n\r]*/);
journals = journals[1];

var comments_in = dset.match(/Comments Received:\<\/b\>[ \n\r]*([0-9]+)[ \n\r]*/);
comments_in = comments_in[1];

var comments_out  = dset.match(/Comments Given:\<\/b\>[ \n\r]*([0-9]+)[ \n\r]*/);
comments_out = comments_out[1];

var favorites = dset.match(/Favorites:\<\/b\>[ \n\r]*([0-9]+)[ \n\r]*/);
favorites = favorites[1];

var rawscore = (watches * favorites) / submissions;
var score = Math.log(Math.abs(rawscore));

var e2rawscore = (watches * favorites) / (submissions * submissions);
var e2score = Math.log(Math.abs(e2rawscore));

var favrate = (favorites / submissions);
var watchrate = (watches / submissions);
var chattiness_1 = (comments_out / comments_in)
var chattiness_2 =  (journals / submissions);

d.innerHTML += "<b>Watchers:</b> " + watches + "<br>";
d.innerHTML += "<nobr><b>Effectiveness:</b> " + (Math.round(score * 100) / 100 * (rawscore / Math.abs(rawscore))) + "</nobr><br>";
d.innerHTML += "<nobr><b>E<sup>2</sup>:</b> " + (Math.round(e2score * 100) / 100 * (e2rawscore / Math.abs(e2rawscore))) + "</nobr><br>";
d.innerHTML += "<b>Favoriting Rate:</b> " + (Math.round(favrate * 100)) + "%<br>";
d.innerHTML += "<b>Watch Rate:</b> " + (Math.round(watchrate * 100)) + "%<br>";
d.innerHTML += "<nobr><b>Chattiness:</b> " + 
                                      // (Math.round(chattiness_1 * 100) / 100) + " + " + 
                                      // (Math.round(chattiness_2 * 100) / 100) + " = " + 
                                       (Math.round((chattiness_1 + chattiness_2) * 100) / 100) + "</nobr><br>";

