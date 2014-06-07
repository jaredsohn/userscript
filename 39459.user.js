// ==UserScript==
// @name           ebroadcast_imdb
// @namespace      http://userscripts.org/users/35791
// @description    add IMDB link to movies in TV listing guide
// @include        http://www.ebroadcast.com.au/TV/static/*
// ==/UserScript==

//var movies = document.evaluate('//a[contains(@href,"Movie")]', document, null, 6, null);
var movies = document.evaluate("//a[contains(@href,'descrip=Movie') or contains(@href,'chan=Movie') or contains(@href,'chan=Show') or contains(@href,'chan=wmov') or contains(@href,'chan=TCM') or contains(@href,'chan=SHC') or contains(@href,'chan=FoxSH2')]", document, null, 6, null);
for (var i=0; i < movies.snapshotLength;  i++)
{
  var icon = movies.snapshotItem(i).parentNode.insertBefore(document.createElement("IMG"), movies.snapshotItem(i).nextSibling);
//  var icon = movies.snapshotItem(i).parentNode.appendChild(document.createElement("IMG"));
  icon.src = "data:image/x-icon;base64,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"; 
  icon.addEventListener("click",
    function(e)
    {
		if (/Movie/.test(e.target.previousSibling.textContent))
			GM_openInTab("http://imdb.com/find?s=all&q="+e.target.previousSibling.textContent.match(/Movie: (.*)/)[1]);
		else
			GM_openInTab("http://imdb.com/find?s=all&q="+e.target.previousSibling.textContent);
    }
   ,true);
//  icon.style.cursor = "pointer";
  icon.style.marginLeft = "5px";
  icon.style.cursor = "help";
  
}