// ==UserScript==
// @name        YouTube Ordina per data di caricamento
// @namespace   arj1086
// @description Ordina i video in base alla data di caricamento (dal più recente al meno recente)
// @include     http://www.youtube.com/*
// @version     1
// ==/UserScript==

function strpos(str,find) {
	if(str.indexOf(find)!=-1){
		return true;
		}
	else {
		return false;
		}
	}

//Definisco la colonna
colonna = document.createElement("div");
colonna.setAttribute('id','mia-colonna');
colonna.setAttribute('style','display: inline-block; font-size: 11px; list-style: none outside none; margin: 10px; vertical-align: top; width:90px; height:145px;');

//Definisco il titolo
titolo = document.createElement("h4");
titolo.setAttribute('id','mio-titolo');
titolo.setAttribute('style','color: #cc3333; font-size: 11px; font-weight: bold; height: 1em; margin: 0 0 5px;');
titolo.innerHTML = 'Ordina per';

//Definisco la lista
ul = document.createElement("ul");
li = document.createElement("li");

//Definisco i link
url = self.location.href;
if (strpos(url,"&search_sort=video_date_uploaded&uni=3")){
	meno = "&search_sort=video_date_uploaded&uni=3";
	url = url.replace(meno,"");
	
	link_1 = document.createElement("span");
	link_1.setAttribute('class','filter-content filter-selected');
	link_1.innerHTML= 'Data caricamento';
	
	link_2 = document.createElement("a");
	link_2.setAttribute('class','filter-content');
	link_2.setAttribute('href',url+'&search_sort=video_view_count&uni=3');
	link_2.innerHTML= 'Visualizzazioni';
	}
	
else if (strpos(url,"&search_sort=video_view_count&uni=3")) {
	meno = "&search_sort=video_view_count&uni=3";
	url = url.replace(meno,"");
	
	link_1 = document.createElement("a");
	link_1.setAttribute('class','filter-content');
	link_1.setAttribute('href',url+'&search_sort=video_date_uploaded&uni=3');
	link_1.innerHTML= 'Data caricamento';
	
	link_2 = document.createElement("span");
	link_2.setAttribute('class','filter-content filter-selected');
	link_2.innerHTML= 'Visualizzazioni';
	}
	
else {
	link_1 = document.createElement("a");
	link_1.setAttribute('class','filter-content');
	link_1.setAttribute('href',url+'&search_sort=video_date_uploaded&uni=3');
	link_1.innerHTML= 'Data caricamento';
	
	link_2 = document.createElement("a");
	link_2.setAttribute('class','filter-content');
	link_2.setAttribute('href',url+'&search_sort=video_view_count&uni=3');
	link_2.innerHTML= 'Visualizzazioni';
	}

//Stampo a video tutto
document.getElementById('filter-dropdown').appendChild(colonna);
colonna.appendChild(titolo);
colonna.appendChild(ul);
ul.appendChild(li);
li.appendChild(link_1);
ul.appendChild(li);
li.appendChild(link_2);
colonna.appendChild(titolo);
colonna.appendChild(link_1);