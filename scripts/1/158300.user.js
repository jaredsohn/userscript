// ==UserScript==
// @name        Meatphit
// @namespace   http://forums.atlusonline.com/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @namespace	http://baconipsum.com/api/?type=meat-and-filler
// @include     http://forums.atlusonline.com/forums/*
// @version     1
// ==/UserScript==

function meatify(mpost)
{
$.getJSON('https://baconipsum.com/api/?callback=?', 
    { 
          'type':'all-meat', 
          'start-with-lorem': false, 
          'paras':2, 
          'sentences':0
    }, function(baconGoodness)
    {
        if (baconGoodness && baconGoodness.length > 0)
        {
          mpost.innerHTML = baconGoodness;
		}
	});
}

var posts = document.getElementsByClassName("author vcard");
var postbds = document.getElementsByClassName("post entry-content "); 
for(var i=0;i<posts.length;i++)
{
	if (posts[i].innerHTML.search("Misphit")>0)
	{
	meatify(postbds[i]);
	}
}

var snaps = document.getElementsByClassName("citation");
var quotes = document.getElementsByClassName("quote"); 
for(var i=0;i<snaps.length;i++)
{
	if (snaps[i].innerHTML.search("Misphit")>0)
	{
	meatify(quotes[i]);
	}
}