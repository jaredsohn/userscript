// ==UserScript==
// @name        Old Kongregate Profiles
// @namespace   http://www.example.com/donaldguy
// @description Gives you the old Kongregate profiles automatically
// @include     http://www.kongregate.com/accounts/*
// @exclude     http://www.kongregate.com/accounts/*/*
// @exclude     http://www.kongregate.com/accounts/*.xhtml
// @version     1
// ==/UserScript==

link = window.location
location.replace(link+".xhtml")