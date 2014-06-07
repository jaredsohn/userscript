// ==UserScript==
// @name 		Jogger specified ABBR and ACRONYM tags list 2
// @description 	Add specified ABBR/ACRONYM tags through one click
// @author	        Dziudek
// @version 		0.2
// @include 		http://login.jogger.pl/entries/compose/add/
// @include 		http://login.jogger.pl/entries/compose/edit/*
// @include 		https://login.jogger.pl/entries/compose/add/
// @include 		https://login.jogger.pl/entries/compose/edit/*
// @include 		http://login.jogger.pl/manage/drafts/edit/*
// @include 		https://login.jogger.pl/manage/drafts/edit/*
// ==/UserScript==

var d = document;
var t = d.getElementById("entryBody");

var ABBR = [
	["mln","milion(ów)"]
];

var ACRONYM = [
	["IMHO","In My Humble Opinion"],
	["TIA","Thanks In Advance"],
	["OMG","Oh My God !"]
];

var b = d.createElement("input");

b.setAttribute("type","button");
b.setAttribute("value","ABBR");
b.setAttribute("title","Określone przez użytkownika tagi ABBR");
b.setAttribute("class","function");

b.addEventListener("click",function(){
	ABBR.forEach(function(el){t.value = t.value.replace(new RegExp("\\$"+el[0],"g"),'<abbr title="'+el[1]+'">'+el[0]+'</abbr>');});
	ACRONYM.forEach(function(el){t.value = t.value.replace(new RegExp("\\$"+el[0],"g"),'<acronym title="'+el[1]+'">'+el[0]+'</acronym>');});
},false);

d.getElementById("qtPrimary").appendChild(b);