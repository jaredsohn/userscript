// ==UserScript==
// @name		LepraNicer
// @author		Arthur Chafonov
// @datecreated	2009-09-08
// @lastupdated	2009-09-08
// @namespace	autoAccessAnalytics
// @include		http://leprosorium.ru/*
// @include		http://*.leprosorium.ru/*
// @version		1.0
// @description	Some useful staff for leprobrowsing.
// ==/UserScript==

/*global,
  $$
  
*/

function main() {
  // var images = document.getElementsByTagName('img');
  
  var links = $$('#content a');
  links.each( function(link, idx) {
    // var link = image.getParent('a');
    if (link.href.match(/youtube/)) {
      console.log(link);
      var videoIdMatch = link.href.match(/\?v=([\-\w\d]+)/),
        videoURL = null,
        embedElement = null;
        
      if (videoIdMatch) {
        var videoId = videoIdMatch[1];
      }
      if (videoId) {
        videoURL = 'http://www.youtube.com/v/' + videoId + '&hl=en&fs=1&rel=0';
        var flashParams = {
          movie: videoURL,
          allowFullScreen: 'true',
          allowscriptaccess: 'always'
        };
        var flashObject = document.createElement('object');
        flashObject.width = 640;
        flashObject.height = 385;
        for (var param in flashParams) {
          var paramElement = document.createElement('param');
          paramElement.name = param;
          paramElement.value = flashParams[param];
          flashObject.appendChild(paramElement);
        }
        embedElement = document.createElement('embed');
        embedElement.src = videoURL;
        embedElement.type = 'application/x-shockwave-flash';
        embedElement.allowscriptaccess = 'always';
        embedElement.allowfullscreen = 'true';
        embedElement.width = 640;
        embedElement.height = 385;
        flashObject.appendChild(embedElement);
        var flashContainer = document.createElement('div');
        flashContainer.appendChild(flashObject);
        flashContainer.replaces(link);
      }
    }
    if (link.href.match(/\.mpg\b|\.mov\b/)) {
      console.log(link);
      embedElement = document.createElement('video');
      embedElement.src = link.href;
      // embedElement.autohref = 'false';
      embedElement.autobuffer = 'false';
      embedElement.loop = 'false';
      embedElement.autoplay = 'false';
      // embedElement.enablejavascript = 'true';
      embedElement.controls = 'true';
      embedElement.width = 640;
      embedElement.height = 385;
      embedElement.style.backgroundColor = 'black';
      embedElement.replaces(link);
    }
  });
}

// (function() {
  window.addEventListener('load', main, false);
// })();
