// ==UserScript==
// @name           Watchlist Firefox
// @namespace      http://userscripts.org/users/120977
// @description    Allows you to watch and unwatch animes at the countdown anime website
// @include        http://countdown.mandragon.info/*
// ==/UserScript==

(function (){
if (window.addEventListener)
{
  window.addEventListener('load', addSeries, false); 
}

function addSeries(){

var series = document.getElementsByClassName('series');

var myDivs = new Array(series.length);
for(var i = series.length - 1; i >= 0; i--)
{	
	myDivs[i] = document.createElement('div');
	myDivs[i].innerHTML = "[]";
	myDivs[i].setAttribute("id", "myDivs"+i);
	myDivs[i].addEventListener("click",function(e){clicked(e);},false);
	series[i].appendChild(myDivs[i]);
	seriesName = series[i].childNodes[3].childNodes[0].innerHTML;
	if (seriesName && seriesName.indexOf("<") != -1)
		seriesName = seriesName.substring(0,seriesName.indexOf("<"));

	if (localStorage && localStorage.getItem('storedSeries')) 
	{	
		if(localStorage.getItem('storedSeries').indexOf(seriesName) != -1) 
		{
			series[i].style.backgroundColor = "#33bb33";
		}
	}

}

function clicked(e){
	var seriesName;
	if(e.target.parentNode && e.target.parentNode.childNodes[3] && e.target.parentNode.childNodes[3].childNodes[0])
	{
		seriesName = e.target.parentNode.childNodes[3].childNodes[0].innerHTML;
		if(seriesName.indexOf("<") != -1)
			seriesName = seriesName.substring(0,seriesName.indexOf("<"));
	}

	if(localStorage.getItem('storedSeries').indexOf(seriesName) == -1) //if it's not yet watched
	{
		if(e.target.parentNode) e.target.parentNode.style.backgroundColor = "#33bb33";

		if (localStorage) //if localStorage has something
		{		
			localStorage.setItem('storedSeries',localStorage.getItem('storedSeries') + seriesName);
		}	
	}
	else //if it's already watched
	{
		//remove background color
		e.target.watched = false;
		if(e.target.parentNode) e.target.parentNode.style.backgroundColor = "";
		//remove from localStorage
		if(localStorage && localStorage.getItem('storedSeries') && seriesName) 
		{
			var lol = localStorage.getItem('storedSeries');
			lol = lol.replace(seriesName, "");
			localStorage.setItem('storedSeries',lol);
		}
	}
}

}
})();
