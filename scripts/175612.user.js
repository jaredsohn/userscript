// ==UserScript==
// @name	 Basecamp Enhancer
// @author	 Filip Bech-Larsen
// @version	 0.1
// @namespace
// @scriptsource
// @match https://basecamp.com/*
// @match http://basecamp.com/*
// @published    2013-08-12 12:55
// @description  Add some styling to the todo-view of Basecamp
// @grant	 none
// ==/UserScript==



var elems=document.querySelectorAll(".todos .todo");function markMe(a){a.style.backgroundColor="#ffa";a.style.borderRadius="10px";a.style.padding="0 10px";return}function makeBar(a){a.style.backgroundColor="#333";a.style.display="inline-block";a.style.color="#fff";a.style.borderRadius="10px";a.style.padding="0 10px";a.style.width="550px";return}for(i=0;i<elems.length;i++){try{if(elems[i].querySelector('span[data-behavior="todo_assignee_present"]').innerHTML=="Filip Bruun Bech-Larsen"){var e=elems[i].querySelector("span.content a");markMe(e)}}catch(e){}try{var c=elems[i].querySelector("span.content a").innerHTML;var s="***";if(!c.indexOf(s)){var e=elems[i].querySelector("span.content a");makeBar(e)}}catch(e){}};