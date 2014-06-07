// ==UserScript==
// @name           PipeIt IMDb
// @description    PipeIt IMDb adds RSS news feed for movies listed on IMDb
// @namespace      http://userscripts.org/users/vovcacik 
// @include        http://*imdb.com/*
// @license        Creative Commons Attribution-Share Alike http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.1
// ==/UserScript==

// README
// Uses Yahoo Pipes to create the RSS feed itself.
// CHANGELOG:
// 0.1
//   + initial version

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// All the magic is here
function main() {
  var self = this;
  var IMDbRegex = /imdb\.com\/title\/tt\d{6,8}\/?$/i;
  var titleRegex = /^"*(.+?)"* *\(\d{4}[\D\W\S].*$/ig;
  var id = "#ovcacik_IMDbPipeIt";
  var doc = document;
  var url = location.href;
  
  function getElementHTML() {
      return '<span id="' + id.substring(1,id.length) + '"><a href="' + getRssUrl() + '">' + getRssImage() + '</a></span>';
  };
  
  function getTitle() {
      var match = titleRegex.exec(doc.title);
      if (match == null) {
          return "Title N/A";
      } else {
          return match[match.length-1];
      }
  };
  
  function getRssUrl() {
      var pipeUrl = 'http://pipes.yahoo.com/pipes/pipe.run?_id=8eb0237ccff85c2c25b35a99a7b43fb1&_render=rss&url=' + url;
      return "http://fusion.google.com/add?feedurl="+encodeURIComponent(pipeUrl);
  };
  
  function getRssImage() {
      return '<img src="http://gmodules.com/ig/images/plus_google.gif" border="0" alt="Add to Google">';
  };

  if (IMDbRegex.test(url)){
    if ($(id, doc).length==0) {
        $("a[title='Share on MySpace']", doc).after(getElementHTML());
    } else {
        $(id, doc).replaceWith(getElementHTML());
    }
  
    $(id, doc).css(
        {'font-size' : '100%',
        'font-weight' : 'bold',
        'line-height' : '100%'}
    );
  };
}

// load jQuery and execute the main function
addJQuery(main);