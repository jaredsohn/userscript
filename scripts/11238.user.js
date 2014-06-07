// ==UserScript==
// @name 				Wykop Spam Cleaner
// @description 			Remove spam links from Wykop
// @author				Dziudek
// @version 				0.2
// @include 				http://*wykop.pl/
// @include 				http://*wykop.pl/#*
// @include 				http://*wykop.pl/kategoria/*
// @include 				http://*wykop.pl/wykopalisko*
// @include 				http://*wykop.pl/search?*
// ==/UserScript==

// Główny obiekt zbiorów reguł usuwania spamu
var userR = {
users: [
		{
			user: '',
			type: 'border',
			params: '2px solid #F00'
		}
	],
links: [
		{
			link: 'onet',
			type: 'remove',
			params: ''
		}
	]
};

// skróty
var d = document;

// funkcje do selekcji elementów
function $(el){return d.getElementById(el);}

function $$(c){
  var a = new Array();
  var es = d.getElementsByTagName("*");
  var exp = new RegExp("^(.* )?"+c+"( .*)?$", "g");
  for(var i=0;i<es.length;i++){
  if(exp.test(es[i].className)){a.push(es[i]);}}
  return a;
}

// funkcja rozszerzajaca obiekt String
String.prototype.test = function(regexp, parametry){return ((regexp) ? new RegExp(regexp, parametry) : regexp).test(this);}

//// tablice reguł wywalania spamu
var userRules = userR.users;
var linkRules = userR.links;

//// funkcja usuwająca spam
function spam_remove(){
	var iloscSpamu = 0;
	var usuniete = 0;
	var linkTable = [];
	var i = 0;
	var j = 0;
	
	$$('details').forEach(function(element){
		linkTable[i] = element;
		i++;
	});
	
	linkTable.forEach(function(element){
		k = 0;
		var spelniaWarunki = 0;
		while(userRules[k]){
			if(element.childNodes[3].href.test(userRules[k].user,'i')){
				switch(userRules[k].type){
					case 'opacity': linkTable[j].parentNode.parentNode.style.opacity = userRules[k].params;break;
					case 'remove': (linkTable[j].parentNode.parentNode).parentNode.removeChild(linkTable[j].parentNode.parentNode);usuniete++;break;
					case 'border': linkTable[j].parentNode.parentNode.style.border = userRules[k].params;break;
				}
				iloscSpamu++;
				spelniaWarunki = 1;
			}
			k++;
		}
		
		l = 0;
		while(linkRules[l]){
			if(element.childNodes[7].href.test(linkRules[l].link,'i') && element.childNodes[7]){
				switch(linkRules[l].type){
					case 'opacity': linkTable[j].parentNode.parentNode.style.opacity = linkRules[l].params;break;
					case 'remove': (linkTable[j].parentNode.parentNode).parentNode.removeChild(linkTable[j].parentNode.parentNode);usuniete++;break;
					case 'border': linkTable[j].parentNode.parentNode.style.border = linkRules[l].params;break;
				}
				if(spelniaWarunki == 0){iloscSpamu++;}
			}
			l++;
		}
		j++;
	});
	
	// tworzenie diva z informcją
	var info = document.createElement("div");
	info.appendChild(document.createTextNode('Ilość zmodyfikowanych linków: ' + iloscSpamu + ' (' + usuniete + ') '));
	// wygląd tekstu zinformacją o ilości usuniętych linków
	info.style.fontFamily = "Trebuchet MS";
	info.style.padding = "30px";
	info.style.fontSize = "24px";
	info.style.color = "#26495C";
	info.style.textAlign = "center";
	// umieszczenie diva z informacją w topie
	document.getElementById("top").appendChild(info);
}

//// wywalanie tego badziewia
spam_remove();