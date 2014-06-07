// ==UserScript==
// @name Watchlist
// @description Allows you to watch and unwatch animes at the countdown anime website
// @namespace http://userscripts.org/users/120977
// @include http://countdown.mandragon.info/*
// ==/UserScript==

(function (opera, storage){
if (window.addEventListener)
{
  window.addEventListener('load', addSeries, false); 
}

function addSeries(){

var series = document.getElementsByClassName('series');

var myDivs = new Array(series.length);
for(var i = series.length - 1; i >= 0; i--)
{	myDivs[i] = document.createElement('div');
	myDivs[i].innerHTML = "[]";
	myDivs[i].setAttribute("id", "myDivs"+i);
	myDivs[i].addEventListener("click",function(e){clicked(e);},false);
	series[i].appendChild(myDivs[i]);
	seriesName = series[i].childNodes[3].childNodes[0].innerHTML;
	if (seriesName && seriesName.indexOf("<") != -1)
		seriesName = seriesName.substring(0,seriesName.indexOf("<"));
	if (storage && storage.storedSeries) 
	{	
		if(storage.storedSeries.indexOf(seriesName) != -1) 
		{	myDivs[i].watched = true;
			series[i].style.backgroundColor = "#33bb33";
		}
	}
}

function clicked(e){
	
	if(e.target.parentNode && e.target.parentNode.childNodes[3] && e.target.parentNode.childNodes[3].childNodes[0])
	{
		var seriesName = e.target.parentNode.childNodes[3].childNodes[0].innerHTML;
		if(seriesName.indexOf("<") != -1)
			seriesName = seriesName.substring(0,seriesName.indexOf("<"));
	}

	if(!e.target.watched) //if it's not yet watched
	{	e.target.watched = true;
		if(e.target.parentNode) e.target.parentNode.style.backgroundColor = "#33bb33";
		
		if (storage && !storage.storedSeries) //store the series if the storage is empty
		{	storage.storedSeries = seriesName;
		}
		
		if (storage && storage.storedSeries) //if storage has something
		{		
			//if (storage.storedSeries.indexOf(seriesName) == -1)
			storage.storedSeries += seriesName;
		}	
	}
	
	else //if it's already watched
	{
		//remove background color
		e.target.watched = false;
		if(e.target.parentNode) e.target.parentNode.style.backgroundColor = "";
		
		//remove from storage
		if(storage && storage.storedSeries && seriesName) 
		{
			storage.storedSeries = storage.storedSeries.replace(seriesName, "");
		}
	}
}

}
})(opera, opera.scriptStorage);
