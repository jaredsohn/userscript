// ==UserScript==
// @name          Temporary Booru Fix
// @namespace     
// @include       *.donmai.us/posts/*
// @description   
// @version       1.0
// ==/UserScript==

  function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function waitForBBB(){
  if(!document.getElementById('image'))
		window.setTimeout(waitForBBB,50);
	else
	{
		img = document.getElementById('image');
		if (img.src.indexOf('undefined') != -1)
		{
			var resp = httpGet('http://danbooru.donmai.us/post/index.xml?tags=id:'+document.URL.substring(document.URL.lastIndexOf('/')+1));
			resp = resp.match(/file_url="(.*?)" /)[1];
			img.src = resp;
		}
	}
  };
  
	waitForBBB();
	