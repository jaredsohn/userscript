// ==UserScript==
// @name       MangaUpdate link preview
// @namespace  http://www.mangaupdates.com/series.html
// @version    0.03
// @description  enter something useful
// @include      *mangaupdates.com/*
// @copyright  2013+, Joseph
// ==/UserScript==

var a = document.createElement('div'); 
a.style.opacity = 0;
a.style.position = 'absolute';
a.style.paddingRight = '467px';
a.style.paddingBottom = '225px';
a.style.background = 'rgb(226, 231, 237)';
a.style.border = 'solid 2px';
a.style.borderColor = 'rgb(139, 149, 162)';
document.body.appendChild(a);

var title = document.createElement('div');
title.style.position = 'absolute';
title.style.top = '5px';
title.style.left = '245px';
title.style.color = 'rgb(73, 92, 116)';
title.style.fontSize = "10pt";
title.style.fontWeight = "bolder";
a.appendChild(title);

var cover = document.createElement('img');
cover.style.position = 'absolute';
cover.style.height = '200px';
cover.style.top = '13px';
cover.style.left = '12px';


var description = document.createElement('div');
description.style.position = 'absolute';
description.style.top = '30px';
description.style.left = '175px';
description.style.right = '12px';
description.style.color = 'rgba(60, 87, 121, 0.93)';
description.style.textAlign = 'justify';
description.style.fontSize = '8.5pt';
a.appendChild(description);

var genres = document.createElement('div');
genres.style.position = 'absolute';
genres.style.top = '190px';
genres.style.left = '175px';
genres.style.color = 'rgb(73, 92, 116)';
genres.style.fontSize = "8pt";
a.appendChild(genres);

var rating = document.createElement('div');
rating.style.position = 'absolute';
rating.style.top = '203px';
rating.style.left = '175px';
rating.style.color = 'rgb(73, 92, 116)';
rating.style.fontSize = "8pt";
a.appendChild(rating);

var scanlated = document.createElement('div');
scanlated.style.position = 'absolute';
scanlated.style.top = '203px';
scanlated.style.left = '315px';
scanlated.style.color = 'rgb(73, 92, 116)';
scanlated.style.fontSize = "8pt";
a.appendChild(scanlated);

var titles = document.getElementsByClassName('pad');

for (var i = 0; i < titles.length; i++) {
	if (titles[i].childNodes[0] && titles[i].childNodes[0].href && titles[i].childNodes[0].href.search('series.html?') !== -1){
		titles[i].childNodes[0].onmouseover = 
		function(){
			a.style.opacity = 100;
			createwindow(this);
			a.appendChild(cover);
		}
		titles[i].childNodes[0].onmouseout = 
		function(){
			if (a.style.opacity = 100){
				a.style.opacity = 0;
				genres.innerHTML = "<b> Genres: </b>";
				scanlated.innerHTML = "<b> Completely Scanlated?  </b>";
				description.innerHTML = "";
				cover.src = 'http://dl.dropbox.com/u/22473819/load.jpg';
				title.innerHTML = "";
				rating.innerHTML = "<b> Rating: </b>";
			}
			a.removeChild(cover);
		}
	}
};

function createwindow(elem){
		GM_xmlhttpRequest({
  		method: "GET",
  		url: elem.href,
 		onload: function(response) {
    	receiveddata = document.createElement('div');
		receiveddata.innerHTML = response.responseText;

		receivedgenres = receiveddata.getElementsByClassName('sContent')[14].getElementsByTagName('u');
		var allgenres = "";

		title.innerHTML = receiveddata.getElementsByClassName('releasestitle')[0].textContent;

		if (receiveddata.getElementsByClassName('sContent')[0].innerHTML.match(/<br>/g)) {
			if (receiveddata.getElementsByClassName('sContent')[0].innerHTML.match(/<br>/g).length > 3 && receiveddata.getElementsByClassName('sContent')[0].innerHTML.match(/<br>/g).length < 5){
				description.innerHTML = receiveddata.getElementsByClassName('sContent')[0].innerHTML.substring(0,570) + '...';
			}
			else if (receiveddata.getElementsByClassName('sContent')[0].innerHTML.match(/<br>/g).length > 5) {
				description.innerHTML = receiveddata.getElementsByClassName('sContent')[0].innerHTML.substring(0,430) + '...';
			}
		}
		else if (receiveddata.getElementsByClassName('sContent')[0].textContent.length > 975){
			description.innerHTML = receiveddata.getElementsByClassName('sContent')[0].innerHTML.substring(0,975) + '...';
		}

		else if (description.innerHTML.length === 4){
			description.innerHTML = 'Not Available.';
		}
		else {
			description.innerHTML = receiveddata.getElementsByClassName('sContent')[0].innerHTML;
		}

		if (description.innerHTML.length === 4){
			description.innerHTML = 'Not Available.';
		}

		if (receiveddata.getElementsByTagName('img')[11].src !== 'http://www.mangaupdates.com/images/stat_decrease.gif' && receiveddata.getElementsByTagName('img')[11].src !== 'http://www.mangaupdates.com/images/tickmark.png' && receiveddata.getElementsByTagName('img')[11].src !== 'http://www.mangaupdates.com/images/stat_increase.gif'){
			cover.src = receiveddata.getElementsByTagName('center')[1].childNodes[0].src;
			cover.style.opacity = '100';
		}
		else {
			cover.src = 'http://dl.dropbox.com/u/22473819/na.jpg';
			cover.style.opacity = '100';
		}
		for (var i = 0; i < (receivedgenres.length - 1); i++) {
			if (i !== receivedgenres.length - 2){
				allgenres += receivedgenres[i].textContent + ", ";
			}
			else {
				allgenres += receivedgenres[i].textContent + ".";
			}
		};
		if (!allgenres){
			genres.innerHTML = '<b> Genres: </b>' + 'Not Available.';
		}
		else {
			genres.innerHTML = '<b> Genres: </b>' + allgenres;
		}
		if (receiveddata.getElementsByClassName('sContent')[11].getElementsByTagName('b')[0]){
			rating.innerHTML = '<b> Rating: </b>' + receiveddata.getElementsByClassName('sContent')[11].getElementsByTagName('b')[0].textContent;
		}
		else {
			rating.innerHTML = '<b> Rating: </b>' + 'Not Available.'
		}
		if (receiveddata.getElementsByClassName('sContent')[11].getElementsByTagName('b')[0]){
			scanlated.innerHTML = '<b> Completely Scanlated?  </b>' + receiveddata.getElementsByClassName('sContent')[7].textContent;
		}
		else {
			scanlated.innerHTML = '<b> Completely Scanlated?  </b>' + "No."
		}
  		}
		});

	a.style.left = absPos(elem).x;
	a.style.top = absPos(elem).y;
}

function absPos(element) {
	var currentleft = 0;
	var currenttop = 0;
	if (element.offsetParent) {
		do {
			currentleft += element.offsetLeft;
			currenttop += element.offsetTop;
		} while (element = element.offsetParent);
	}
	return {'x': (currentleft + 75).toString() + 'px', 'y': currenttop.toString() + 'px'};
}