// ==UserScript==
// @include *
// @name Embedded YouTube On Demand
// @description If you click on the link to YouTube it opens embedded player under the link.
// ==/UserScript==

// 2014-01-01   HTTP changed to HTTPS to make it work on HTTPS pages without "mixed content" error.

try {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var href = link.getAttribute('href');
    if (href && (href.indexOf('youtube.com/watch') > -1 || href.indexOf('youtu.be/') > -1)) {
      link.addEventListener("click", function() {
        var hrefcopy = href.trim();
        return function(event) {
          var movieid; 
          if (hrefcopy.indexOf('youtu.be/') > -1) {
            movieid = hrefcopy.substr(hrefcopy.lastIndexOf('/') + 1);
          } else {
            movieid = hrefcopy.substr(hrefcopy.lastIndexOf('v=') + 2);
            movieid = movieid.split('&', 1)[0]; 
          }
          movieid = movieid.split('#', 1)[0];
          hrefcopy = 'https://youtube.com/v/' + movieid + '?version=3';
          var div = document.createElement('div');
          div.setAttribute('class', 'embeddedPlayer');
          var emb = document.createElement('embed');
          emb.setAttribute('src', hrefcopy);
          emb.setAttribute('width', '560');
          emb.setAttribute('height', '315');
          emb.setAttribute('allowscriptaccess', "always");
          emb.setAttribute('allowfullscreen', "true");
          emb.setAttribute('type', "application/x-shockwave-flash");
          div.appendChild(emb);
          event.currentTarget.removeAttribute("href"); 
          event.currentTarget.parentNode.appendChild(div);
          //event.currentTarget.wrappedJSObject.parentNode.appendChild(div);
        }
      }(), false);
    }
  }
}

catch(exception) {
  alert(exception.message);
}
