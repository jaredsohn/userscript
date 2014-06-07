// ==UserScript==
// @name          Movie NZB Search Linker (for IMDB)
// @description   Adds nzb search link instead of 'IMDb pro' link right next to the title of movies on IMDb
// @include       http://*imdb.com/title/*
// ==/UserScript==

// Adds Torrent Links and Drop-downs
function startAddingLinks() 
{
	var movieTitle = "";
	
	if(/imdb/.test(document.location.href) && GM_getValue("imdbEnabled", true) )//obtain IMDB page elements
	{
		movieTitle = (jQ("title").text()).split("-")[0];
	}
	
	if( movieTitle.length > 0 )
	{
		movieTitle = movieTitle.replace(/^\s+|\s+$/g, ''); //trim the title
		movieTitle = movieTitle.replace(/\s/g, "+"); //replace spaces with +'s
		movieTitle = movieTitle.replace(/[\?#]!\"/g, ""); //remove bad chars 
		movieTitle = movieTitle.replace(/[()]/g, ""); //remove braces in movie title

		jQ('#warplink').html("<a href='https://www.nzbindex.com/search/?q="+movieTitle+"+-german+-french&age=&max=25&sort=agedesc&minsize=1000&maxsize=&dq=&poster=&nfo=&hidespam=0&hidespam=1&more=1'>NZBIndex</a>");
	}
}

if (/imdb/.test(document.location.href)) //If its on Rotten Tomatoes, obtain the rotten tomatoes elements
{
	//Adding jQuery is not required as RT already uses that.
	jQ = unsafeWindow.jQuery;
	
	startAddingLinks();			
}
