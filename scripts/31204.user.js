// ==UserScript==
// @name                Rapidshare Robot
// @description automatically press the "free" button, wait till that counter finish, download the file, close the page, in case of error (for example because you are already downloading another file) it keeps refreshing the page every two minutes. works better with the english version of rapidshare
// @include       http://rapidshare.com/*
// @include       http://*.rapidshare.com/*
// ==/UserScript==
// Version 20080702

function sucess ()
{
	window.close();
}

function retry(time)
{
    var txt = document.getElementById('inhaltbox').innerHTML;
    var i = txt.indexOf("The download session has expired.");
    if (i < 0)
    {
	txt = document.location;
     }
     else //If session expiered go back to the original link
     {
	txt = txt.match("http://[a-z\./0-9\-A-Z_]*");
     }
     setTimeout("document.location = '" + txt + "'", time);
     setTimeout(sucess, time + 15000);
}

function whenLoaded()
{
	var x = unsafeWindow.c + 1;
	setTimeout("document.dlf.submit()", x * 1000);
	x = x + 15;
	setTimeout("window.close()", x * 1000);
	//window.setTimeout(sucess, x * 1000);
	unsafeWindow.c = 20;
}

// click on the "free" button
if (free=document.getElementById('ff'))
{
    free.submit();
}
else if (document.getElementById("dl")) //Download page
{
	window.addEventListener('load', whenLoaded(),true);
}
else //Retry after 1 minute
{
	retry(160000)
}
