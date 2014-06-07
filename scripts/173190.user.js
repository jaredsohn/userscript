// ==UserScript==
// @name        IMDB - Hide Things Button
// @namespace   imdb_hide_tv-episodes_button
// @description Adds Hide Things -button to IMDB actor's filmorate page
// @include     http://www.imdb.com/name/*/filmorate
// @version     1
// @grant
// ==/UserScript==

function hideTVepisodes()
{
	var actorList = false;
	var elem = document.getElementsByClassName('filmo'); // Get all 'filmography as' -lists
	
	document.getElementById('tv').style.display = 'none';
	document.getElementById('show').style.display = 'inherit';
	
	for (var i = 0; i < elem.length; i++)
	{
		var li = elem[i].getElementsByTagName('li'); // Get all rows from filmo lists
		
		for (var n = 0; n < li.length; n++)
		{
			if (li[n].innerHTML.indexOf("(#") > -1) // Episodes have # before season.episode -style numbering
				li[n].style.display = 'none'; // Hide li
			
			else
				li[n].style.whiteSpace = 'nowrap';
		}
	}
}

function hideVideoGames()
{
	var actorList = false;
	var elem = document.getElementsByClassName('filmo'); // Get all 'filmography as' -lists
	
	document.getElementById('games').style.display = 'none';
	document.getElementById('show').style.display = 'inherit';
	
	for (var i = 0; i < elem.length; i++)
	{
		var li = elem[i].getElementsByTagName('li'); // Get all rows from filmo lists
		
		for (var n = 0; n < li.length; n++)
		{
			if (li[n].innerHTML.indexOf("(VG)") > -1) // Video Games have (VG) tag
				li[n].style.display = 'none'; // Hide li
			
			else
				li[n].style.whiteSpace = 'nowrap';
		}
	}
}

function showAll()
{
	var actorList = false;
	var elem = document.getElementsByClassName('filmo'); // Get all 'filmography as' -lists
	
	document.getElementById('tv').style.display = 'inherit';
	document.getElementById('games').style.display = 'inherit';
	document.getElementById('show').style.display = 'none';
	
	for (var i = 0; i < elem.length; i++)
	{
		var li = elem[i].getElementsByTagName('li'); // Get all rows from filmo lists
		
		for (var n = 0; n < li.length; n++)
		{
			li[n].style.display = 'inherit'; // Hide li
		}
	}
}

window.onload = function(){
	var title = document.getElementById('tn15title'); // Where place the link
	var div = document.createElement('div');
	div.id = 'tv';
	div.style.backgroundColor = '#FAFAFA';
	div.style.width = '100px';
	div.style.cssFloat = 'right';
	div.style.padding = '5px';
	div.style.boxShadow = '0px 0px 5px #CCC';
	div.style.marginTop = '9px';
	div.style.marginRight = '-7px';
	div.style.lineHeight = '25px';
	div.style.font = 'normal normal 12px arial,serif';
	div.innerHTML = '<a name="Hide" style="cursor:pointer;">Hide TV-episodes</a>'; // Place the link
	div.addEventListener("click", hideTVepisodes, true); // Connect hideTVepisodes -function with onClick event to div
	
	var title = document.getElementById('tn15title'); // Where place the link
	var div2 = document.createElement('div');
	div2.id = 'games';
	div2.style.backgroundColor = '#FAFAFA';
	div2.style.width = '103px';
	div2.style.cssFloat = 'right';
	div2.style.padding = '5px';
	div2.style.boxShadow = '0px 0px 5px #CCC';
	div2.style.marginTop = '9px';
	div2.style.marginRight = '8px';
	div2.style.lineHeight = '25px';
	div2.style.font = 'normal normal 12px arial,serif';
	div2.innerHTML = '<a name="Hide" style="cursor:pointer;">Hide VideoGames</a>'; // Place the link
	div2.addEventListener("click", hideVideoGames, true); // Connect hideVideoGames -function with onClick event to div2
	
	var title = document.getElementById('tn15title'); // Where place the link
	var div3 = document.createElement('div');
	div3.id = 'show';
	div3.style.backgroundColor = '#FAFAFA';
	div3.style.width = '50px';
	div3.style.cssFloat = 'right';
	div3.style.padding = '5px';
	div3.style.boxShadow = '0px 0px 5px #CCC';
	div3.style.marginTop = '9px';
	div3.style.marginRight = '8px';
	div3.style.lineHeight = '25px';
	div3.style.display = 'none';
	div3.style.font = 'normal normal 12px arial,serif';
	div3.innerHTML = '<a name="Hide" style="cursor:pointer;">Show All</a>'; // Place the link
	div3.addEventListener("click", showAll, true); // Connect hideVideoGames -function with onClick event to div3
	
	title.appendChild(div);
	title.appendChild(div2);
	title.appendChild(div3);
};