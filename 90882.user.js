// ==UserScript==
// @name           MangaStream Read all
// @include        http://mangastream.com/read/*
// @include        http://www.mangastream.com/read/*
// @version        1.1.0
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==

function makeXMLHttpRequest(url, callback, data)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if(e.target.readyState == 4 && e.target.status == 200)
        {
            callback(e.target.responseText, data);
        }
    }
    xhr.open("GET", url, true);
    xhr.send(null);
}

function onError(event)
{
	event.target.src = event.target.src.replace(/#.*$/, '') + "#" + new Date().getTime();
}

function getPage(responseText, data)
{
    imgString = responseText.match(/<img[^>]+http:\/\/[^>]+.mangastream.com\/manga\/[^>]+\/[^>]+\/[^>]+(png|jpg|jpeg|gif)[^>]+>/);
    url = imgString[0].match(/http:\/\/[^>]+.mangastream.com\/manga\/[^>"]+\/[^>"]+\/[^>"]+(png|jpg|jpeg|gif)/);
    data.src = url[0];
}

selects = document.getElementsByTagName("select");
pageSelect = selects[1];

anchor = document.getElementById("p").parentNode;
container = anchor.parentNode;
container.removeChild(anchor);

for(i = 0; i < pageSelect.options.length; i++)
{
    pageUrl = pageSelect.options[i].value;
    img = document.createElement("img");
    img.addEventListener("error", onError, false);
    container.appendChild(img);
    makeXMLHttpRequest(pageUrl, getPage, img);
}