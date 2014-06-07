// ==UserScript==
// @name          Flickr's Left Panel Sucks
// @namespace     http://e-chiceros.com/flickr/lps
// @description   Change the left panel on flickr for something useful.
// @include       http://www.flickr.com/
// @include       http://flickr.com/
// ==/UserScript==


function commentsReceived(request) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(request.responseText, "application/xml");

    var items = document.evaluate("/rss/channel/item", xmlDoc, null,
                 XPathResult.ANY_TYPE,null);
    var currentItem = null;

    var lastDot = null;
    do {
       currentItem = items.iterateNext();
       if (currentItem != null) {
          var title = currentItem.getElementsByTagName("title").item(0).firstChild.nodeValue;
          title = title.substring("Comment About ".length);

          var link = currentItem.getElementsByTagName("link").item(0).firstChild.nodeValue;

          var anchor = document.createElement("a");
          anchor.href = link;
          anchor.appendChild(document.createTextNode(title));

          commentsRegion.appendChild(anchor);
          lastDot = document.createTextNode(", ");
          commentsRegion.appendChild(lastDot);
       }
    } while (currentItem != null);

    if (lastDot != null) {
        commentsRegion.removeChild(lastDot);
        commentsRegion.appendChild(document.createTextNode("."));
    }
}

function friendImagesReceived(request) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(request.responseText, "application/xml");

    var items = document.evaluate("/rss/channel/item", xmlDoc, null,
                 XPathResult.ANY_TYPE,null);
    var currentItem = null;

    do {
       currentItem = items.iterateNext();
       if (currentItem != null) {
          var thumb = currentItem.getElementsByTagName("thumbnail").item(0).getAttribute("url");
          

          var link = currentItem.getElementsByTagName("link").item(0).firstChild.nodeValue;


          var anchor = document.createElement("a");
          anchor.href = link;
          var img = document.createElement("img");
          img.width= 75;
          img.height=75;
          img.src = thumb;
          img.border = 0;
          img.hspace = 2;
          img.vspace = 2;
   
          anchor.appendChild(img);

          friendsRegion.appendChild(anchor);

       }
    } while (currentItem != null);

}


GM_log('Iniciando FLPS.');

var container = document.evaluate("//*[@class='LeftCol']", document, null, XPathResult.ANY_TYPE,null).iterateNext();
 
var alerts = document.evaluate("//*[@class='StartAlert']", container, null, XPathResult.ANY_TYPE,null).iterateNext();

container.innerHTML = "";

if (alerts != null) {
    container.appendChild(alerts);
}

    var header = document.createElement("h3");
    header.appendChild(document.createTextNode("Images from your Friends"));
    container.appendChild(header);

    var friendsRegion = document.createElement("div");
    container.appendChild(friendsRegion);

    var header = document.createElement("h3");
    header.appendChild(document.createTextNode("Recent Comments"));
    container.appendChild(header);

    var commentsRegion = document.createElement("div");
    container.appendChild(commentsRegion);



var url = "http://www.flickr.com/recent_comments_feed.gne?id=" + 
          unsafeWindow.global_nsid + "&format=rss_200&dummy=" + escape(new Date());

GM_xmlhttpRequest({method: 'GET',url: url, onload: commentsReceived});

var url = 
      "http://www.flickr.com/services/feeds/photos_friends.gne?user_id=" + 
       unsafeWindow.global_nsid + "&friends=1&display_all=1&format=rss_200&" +
      "dummy=" + escape(new Date());


GM_xmlhttpRequest({method: 'GET',url: url, onload: friendImagesReceived});

