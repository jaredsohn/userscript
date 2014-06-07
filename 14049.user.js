// ==UserScript==
// @name           bigpond movies imdb rating.
// @description    adds ratings to titles in big pond search results.
// @namespace      theog
// @include        http://dvd.bigpondmovies.com/*
// @include        https://dvd.bigpondmovies.com/*
// ==/UserScript==

/* watch for any changed attributes */
document.addEventListener("DOMAttrModified", documentChanged, false);
document.addEventListener('DOMNodeInserted', documentChanged, false);
var debug = true;

function tGM_log(logString) {
     if (debug)
         GM_log(logString);
}

function documentChanged(event) {

     tGM_log("DOMAttrModified,DOMNodeInserted triggered : " + event.target.id);
     
    if (event.target.id!=undefined) {
        if (event.target.id == "listingDisplay" || event.target.id == "loadingQueue" || event.target.id.search(/panelcarousel/) != -1 || event.target.id == "queueNum" || event.target.id == "largePanel1") {
            tGM_log("targed DOMAttr or DOM Node found : " + event.target.id);
            updatelinks();   
        }
    }   
}

function safeWrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments, 1)));
  };
}

updatelinks = safeWrap(function() {
//function updatelinks() {
    var links = document.links;
    for (i = 0; i < links.length; i++) {

    if (links[i].href.indexOf("member/dvd/") != -1) {
        if (links[i].firstChild.className==undefined && links[i].getAttribute('processed')==null) {
            tGM_log("attributes value " + links[i].getAttribute('processed') );
            links[i].setAttribute('processed', "true");
            var imdbURL = encodeURI(links[i].innerHTML) + "&btnI=I'm Feeling Lucky&site:www%2eimdb%2ecom;"
            links[i].parentNode.insertBefore( document.createElement("loading"),links[i].nextSibling).innerHTML = "<img src=\"http://www.sanbaldo.com/wordpress/wp-content/tiny_red.gif\">"

              //window.setTimeout(function() {
          GM_xmlhttpRequest({
              method: 'GET',
              url: " http://www.google.com/search?hl=en&q=" + imdbURL,
              headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Content-type': 'application/x-www-form-urlencoded'
              },
              onload: function (node) {return function(result) {
                res=result.responseText;

                    tGM_log("node URL : " + node.innerHTML);
                    tGM_log("loading : " + node.parentNode.getElementsByTagName("loading")[0].innerHTML );
                    node.parentNode.getElementsByTagName("loading")[0].innerHTML = "";                   

                    var imdbURL = "http://www.google.com/search?hl=en&q=" + encodeURI(node.innerHTML) + "&btnI=I\'m Feeling Lucky&site:www%2eimdb%2ecom;"
                    var imdbURL2 = "http://imdb.com/find?q=" + encodeURI(node.innerHTML) + ";tt=on;nm=on;mx=20"
                    rating = res.match(/<div class="meta">\s*<b>([^<]*)<\/b>/);
                    tGM_log("rating : " + rating);

                    if (rating) node.parentNode.insertBefore(document.createElement("b"),node.nextSibling ).innerHTML = " <a href=\"" + imdbURL + "\" target=\"_blank\">" + rating[1] + "</a>";
                    else node.parentNode.insertBefore(document.createElement ("b"),node.nextSibling).innerHTML = " <a href=\"" + imdbURL2 + "\" target=\"_blank\">??/10</a>";
                }}(links[i])
                });
        //}, 10);
          }
  }
}

});

updatelinks();
