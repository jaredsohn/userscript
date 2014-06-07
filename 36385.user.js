// ==UserScript==

// @name           Rapidshare Flukke's autodownloader plus refresher
// @description    based on the "Rapidshare Flukke's autodownloader" (http://userscripts.org/scripts/show/30424) + if already/still downloading refresh the page in two minutes (dont remember which script i've taken this part from). So can leave couples of tabs open for autodownload.

// @include        http://*.rapidshare.com/*

// @include        http://*.rapidshare.tld/*

// @include        http://rapidshare.tld/*

// @include        http://lix.in/*

// @include        http://*.rapidsafe.net/*

// @include        http://rapidsafe.net/*

// @exclude        http://rapidshare.tld/users/*

// ==/UserScript==

 

GM_addStyle("#counter { position: fixed; width: 60px; top: 0; left: 0; border: 3px solid #999; padding: 2px 5px; font-size: 12pt;}");

// hide stuff

GM_addStyle("p.downloadlink, div#dl h2, div#dl p, table.klapp { display: none; }");

var free = document.getElementById("ff");
if(free)
   free.childNodes[7].click();


setTimeout(function() {

	var x = unsafeWindow.c;

	unsafeWindow.c = 2;

	var div = document.createElement("div");

	with (div) {

		id = "counter",

		innerHTML = (x/60).toFixed(1);

	}

	document.body.appendChild(div);

	var rs = function() {

		var timer = window.setInterval(function() {

			x--;

			document.getElementById("counter").innerHTML = x;

			if (x == 0) {

				//alert("Download ready!");

				clearInterval(timer);
				// click en el elemento...
				var link = document.getElementById("dl");
				var X = link.childNodes[0].childNodes[2].childNodes[0];
				X.click();

			}

		}, 1000);

	}

	rs();

}, 500);












// ==UserScript==
// @name                Rapidshare Robot
// @description automatically press the "free" button, wait till that counter finish, download the file, close the page, in case of error (for example because you are already downloading another file) it keeps refreshing the page every two minutes. works better with the english version of rapidshare
// @include       http://rapidshare.com/*
// @include       http://*.rapidshare.com/*
// ==/UserScript==
// Version 20080702

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


// click on the "free" button
if (free=document.getElementById('ff'))
{
    free.submit();
}
else if (document.getElementById("dl")) //Download page
{
	window.addEventListener('load', whenLoaded(),true);
}
else //Retry after 3 minute
{
	retry(180000)
}
