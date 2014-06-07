// ==UserScript==
// @name		News
// @version		1.2
// @description add News bloc on every forum page of JeuxVideo.com. Original Idea Thiht 1/05/2013
// @namespace   http://userscripts.org/scripts/show/166367
// @include		http://www.jeuxvideo.com/forums/*
// @grant       none
// ==/UserScript==


function hideContent(div) {
	div.setAttribute("onmouseover", "this.getElementsByTagName('div')[0].style.display = '';");
	div.setAttribute("onmouseout", "this.getElementsByTagName('div')[0].style.display = 'none';");	
	div.getElementsByTagName('div')[0].style.display = 'none';
}

var xhr, col, div, content;

div = document.createElement("div");
div.className = "bloc3";
col = document.getElementById('col2');
if (col) {
	col.insertBefore(div, col.firstChild);
	div.innerHTML = '<h3 class="titre_bloc"><span>Les dernières news</span></h3>';
	content = document.createElement("div");
	content.className = "bloc_inner";
	div.appendChild(content);
	hideContent(div);
	xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://www.jeuxvideo.com/news.htm', false);
	xhr.onreadystatechange = function(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			news = xhr.responseText.split('<div class="bloc_inner bloc_inner2">')[1].split('</div>')[0];
			content.innerHTML = news;
		}
	}
	xhr.send(null);
}