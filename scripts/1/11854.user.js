// ==UserScript==
// @name 		Jogger specified ABBR and ACRONYM tags list
// @description 	Add specified ABBR/ACRONYM tags through one click (OK, two clicks :P)
// @author		Dziudek
// @version 		0.1
// @include 		http://login.jogger.pl/entries/compose/add/
// @include 		http://login.jogger.pl/entries/compose/edit/*
// @include 		https://login.jogger.pl/entries/compose/add/
// @include 		https://login.jogger.pl/entries/compose/edit/*
// @include 		http://login.jogger.pl/manage/drafts/edit/*
// @include 		https://login.jogger.pl/manage/drafts/edit/*
// ==/UserScript==

var d = document;
var mv = false;var mvv = false;
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

var l = d.createElement("ul");

l.setAttribute("style","position: absolute;z-index: 2;display: none;margin-left: 478px;background: #A2D1E0;padding: 5px;font-size: 12px;font-family: 'Trebuchet MS';list-style-type: none;");

ABBR.forEach(function(el){
	var i = d.createElement("li");
	i.innerHTML = "<big>&raquo;</big> " + el[0];
	i.setAttribute("title",el[1]);
	i.addEventListener("mouseover",function(){i.setAttribute("style","cursor: pointer;background: #3E789C;color: #FFF;");},false);
	i.addEventListener("mouseout",function(){i.setAttribute("style","cursor:;background:;color: #000;");},false);
	i.addEventListener("click",function(){l.style.display = "none";mv = false;	
		if(t.selectionStart || t.selectionStart == '0'){
		var s = t.selectionStart;var e = t.selectionEnd;
		t.value = t.value.substring(0, s) + '<abbr title="' + el[1] + '">' + el[0] + '</abbr>' + t.value.substring(e, t.value.length);
		}else{t.value += '<abbr title="' + el[1] + '">' + el[0] + '</abbr>';}
	},false);
	l.appendChild(i);
});

b.addEventListener("click",function(){(!mv) ? l.style.display = "block" : l.style.display = "none";mv = !mv;},false);



var bb = d.createElement("input");

bb.setAttribute("type","button");
bb.setAttribute("value","ACRONYM");
bb.setAttribute("title","Określone przez użytkownika tagi ACRONYM");
bb.setAttribute("class","function");

var ll = d.createElement("ul");

ll.setAttribute("style","position: absolute;z-index: 2;display: none;margin-left: 528px;background: #A2D1E0;padding: 5px;font-size: 12px;font-family: 'Trebuchet MS';list-style-type: none;");

ACRONYM.forEach(function(el){
	var i = d.createElement("li");
	i.innerHTML = "<big>&raquo;</big> " + el[0];
	i.setAttribute("title",el[1]);
	i.addEventListener("mouseover",function(){i.setAttribute("style","cursor: pointer;background: #3E789C;color: #FFF;");},false);
	i.addEventListener("mouseout",function(){i.setAttribute("style","cursor:;background:;color: #000;");},false);
	i.addEventListener("click",function(){ll.style.display = "none";mvv = false;	
		if(t.selectionStart || t.selectionStart == '0'){
		var s = t.selectionStart;var e = t.selectionEnd;
		t.value = t.value.substring(0, s) + '<acronym title="' + el[1] + '">' + el[0] + '</acronym>' + t.value.substring(e, t.value.length);
		}else{t.value += '<acronym title="' + el[1] + '">' + el[0] + '</acronym>';}
	},false);
	ll.appendChild(i);
});

bb.addEventListener("click",function(){(!mvv) ? ll.style.display = "block" : ll.style.display = "none";mvv = !mvv;},false);

d.getElementById("qtPrimary").appendChild(b);d.getElementById("qtPrimary").appendChild(l);
d.getElementById("qtPrimary").appendChild(bb);d.getElementById("qtPrimary").appendChild(ll);