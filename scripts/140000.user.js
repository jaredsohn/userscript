// ==UserScript==
// @id             www.imdb.com-98287b6f-1e4b-9844-af4c-09301322a5ed@wp
// @name           imdb add link to search youtube for trailer
// @version        1.2
// @namespace      wp
// @author         
// @description    
// @include        http://www.imdb.com/title/*
// @include        https://www.imdb.com/title/*
// @run-at         document-end
// @noframes
// ==/UserScript==


var iBar = document.querySelector('#overview-top .infobar');

var newSpan = document.createElement('span');
newSpan.innerHTML = ' | ';

var docT = document.title;

if(docT.indexOf("(TV Series")>-1){

	var spdt = docT.split(" (TV Series");
	docT = spdt[0]+' tv';

}
else{

	docT = docT.slice(0,-14);

}

var newA = document.createElement('a');
newA.href = 'http://www.youtube.com/results?search_query='+docT+' trailer';
newA.textContent = 'Search Youtube for trailer';
newA.setAttribute('target','_blank');

iBar.appendChild(newSpan);
iBar.appendChild(newA);