// ==UserScript==
// @name           random-trip
// @namespace      http://userscripts.org/users/133663
// @description    Post as a random name from a list of names
// @include        http://boards.4chan.org/*
// ==/UserScript==

var trippin = new Array ("Anonymous of Croatia#mew",
    "White Ren#chilly",
    "Remilia Scarlet#junk",
    "anon2007#anime",
    "Jesus Yamato##bob",
    "Sylph#tempest",
    "reiserFS#delicious",
    "GreenTrashcan#cassowary",
    "ponpo#patriot",
    "Anonymous2007#anime",
    "Mariya Shidou ♥#JR",
    "Dolor#Dolor",
    "mormon guy#barf",
    "NukuAnon#groovy",
    "The /jp/ Police#shit",
    "ponpo#pan",
    "Vector#people a",
    "NewFriend#fuck",
    "Alicia Melchiott#panda",
    "miles##deer",
    "Hiroyuki#Whiplash",
    "thoughtless celestial##knight",
    "Kooh#yum",
    "Taiko Drum Master#Reporting",
    "Anonymous#anonymous",
    "General Malcolm Granger#lala",
    "Anonymous of Colombia#Balalaika",
    "Dr. Doujin#green",
    "Flandrenonymous#moe",
    "Kirakishou#bananas",
    "Norwayfag#nihon",
    "Jesus Yamato#jim",
    "formerly-anon#tacos",
    "Currespect#Ciel",
    "/jp/ Quality Control#QUALITYCONTROL",
    "Anownymous#homo",
    "Sir Romance#euphoric",
    "Nightjumper#hedda",
    "Anonymous of UC Berkeley#cal",
    "Kelrey#chocolate",
    "魚油#Dolor",
    "☃nonymous#chilly",
    "CGrascal##password" );
if (document.forms[0].elements[1].name=="name"){ document.forms[0].elements[1].value = trippin[Math.floor(Math.random()*(trippin.length))]; }
if (document.forms[0].elements[1].name=="resto"){ document.forms[0].elements[2].value = trippin[Math.floor(Math.random()*(trippin.length))]; }