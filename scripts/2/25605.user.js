// ==UserScript==
// @name           Google Movies - IMDB
// @namespace      Bajal
// @description    Shows a tiny link to go to IMDB link from a Google movie search
// @include        http://www.google.co*/movies*
// ==/UserScript==

window.addEventListener("load", function(e) {
var movies = document.getElementsByTagName("td"); 
for(var i = 0; i < movies.length;i++)
	if(movies[i].getAttribute('style') == "width: 34em;")
	{
	 var filmName = movies[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;

	var imdbLink = document.createElement('a');
	imdbLink.href='http://www.imdb.com/find?s=all&q='+filmName;
        imdbLink.target="_blank";
	var aElemTN = document.createTextNode('  IMDB  ');
	aElemTN.style ="color:yellow";
	imdbLink.appendChild(aElemTN);
 
	 movies[i].childNodes[0].appendChild(imdbLink);
	}
	
},false);