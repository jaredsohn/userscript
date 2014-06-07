// ==UserScript==
// @name           QuickFlix IMDB
// @namespace      http://www.fileoffset.com
// @include        http://www.quickflix.com.au/*
// ==/UserScript==

var title = document.getElementById('Title').childNodes[1];

if (title)
{
    var titleText = title.innerHTML.replace(/\s/g, '+');
    
    var imdbLink = document.createElement('a');
    imdbLink.href = 'http://www.imdb.com/find?s=all&q=' + encodeURI(titleText);
    imdbLink.innerText = "imdb";
    imdbLink.style.fontSize = "8px";
    imdbLink.style.fontFamily = "Verdana, Arial, Courier New";
    imdbLink.style.color = "#0000FF";
    imdbLink.target = "_new";

    title.appendChild(imdbLink);
}
