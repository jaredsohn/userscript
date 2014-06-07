// ==UserScript==
// @name           Mangastream Full Chapter Loader
// @namespace      sillymokona
// @include        http://readms.com/r/*/*/*
// ==/UserScript==


function makeXMLHttpRequest(url, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if(e.target.readyState == 4 && e.target.status == 200)
        {
            callback(e.target.responseText, data);
        }
    }
    xhr.open("GET", url, true);
    xhr.send(null);
    
    console.log("loading " + url);
}

function onError(event) {
	event.target.src = event.target.src.replace(/#.*$/, '') + "#" + new Date().getTime();
}

function getPage(responseText, data) {
    responseText = responseText.replace(/(\r|\n)/g, "");
    image = responseText.match(/<img[^>]*img.mangastream.com\/cdn\/manga\/[0-9]+[^>]*>/)[0];
    var img = document.createElement("img");
    img.addEventListener("error", onError, false);
    img.src = image.match(/src="([^"]+)"/)[1];
    data.appendChild(img);
    data.style.cssText = "padding: 5px";

    // OLD CODE FOR THE FRAGMENTED IMAGES
    /*data.style.cssText = responseText.match(/position[^"]+width[^"]+height[^"]+px/)[0];
    styles = responseText.match(/position[^"]+z-index[^"]+width[^"]+height[^"]+top[^"]+left[^"]+px/g);
    images = responseText.match(/<img[^>]*img.mangastream.com\/m\/[0-9]+[^>]*>/g);
    // If styles and images grabbed are not of the same count, there's something wrong
    //if(styles.length != images.length) console.log("trouble");
    for(i = 0; i < styles.length; i++)
    {
        var div = document.createElement("div");
        div.style.cssText = styles[i];
        var img = document.createElement("img");
        img.addEventListener("error", onError, false);
        img.src = images[i].match(/src="([^"]+)"/)[1];
        div.appendChild(img);
        data.appendChild(div);
    }*/
}

var anchors = document.getElementsByTagName("a");
var urls = [];
var firstPage = null;
var lastPage = null;
var anchorCount = anchors.length;
for(var anchorIndex = 0; anchorIndex < anchorCount; anchorIndex++) {
    var anchor = anchors[anchorIndex];
    if(anchor.text.match(/First Page/)) {
        firstPage = anchor.href;
    }
    else if(anchor.text.match(/Last Page/)) {
        lastPage = anchor.href;
    }
}

var firstSplit = firstPage.split('/');
var firstIndex = firstSplit.pop();
var lastIndex = lastPage.split('/').pop();
var baseURL = firstSplit.join('/');

console.log(baseURL);

container = document.getElementsByClassName("page")[0];
container.style.cssText = "width: 100%";
while(container.hasChildNodes()) container.removeChild(container.firstChild);

for(var pageIndex = firstIndex; pageIndex <= lastIndex; pageIndex++) {
    var pageUrl = baseURL + '/' + pageIndex;
    var div = document.createElement("div");
    container.appendChild(div);
    makeXMLHttpRequest(pageUrl, getPage, div);
}

var readerSky = document.getElementById("reader-sky");
if(readerSky) {
    readerSky.parentNode.removeChild(readerSky);
}