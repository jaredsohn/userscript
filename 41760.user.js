// ==UserScript==
// @name           questionablecontent.net RSS text
// @namespace      http://z3c.info/
// @description    Displays text from RSS feed below the comic
// @include        http://www.questionablecontent.net/
// @include        http://www.questionablecontent.net/index.php
// @include        http://www.questionablecontent.net/view.php?comic=*
// @include        http://questionablecontent.net/
// @include        http://questionablecontent.net/index.php
// @include        http://questionablecontent.net/view.php?comic=*
// ==/UserScript==

var Util = {
  loadScript: function (url, callback) {
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.setAttribute('src', url);
    script.setAttribute('type', 'text/javascript');
    script.addEventListener('load', callback, false);

    head.appendChild(script);
  }
};

var Url = {
  jQuery:
    "http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js",
  qcRss: "/QCRSS.xml",
  isSpecificComic: !!location.search.match(/^\?comic=(\w+)$/),
  comicId: location.search.match(/^\?comic=(\w+)$/) ?
    Number(location.search.match(/^\?comic=(\w+)$/)[1]) : null
};

var Page = {
  insertRssText: function (content) {
    if (!content) {
      content = 
        "<p>No additional RSS content is available for this comic :(</p>";
    }

    $("#news")
      .append(
        $("<h2/>")
          .text("RSS text"))
      .append(content);
  }
};

var Handle = {
  rss: {
    onLoad: function (data) {
      var text, comicId;
      
      if (Url.isSpecificComic) {
        if (Url.comicId < 1000) {
          // there are no comics < 1000 in RSS feed, but trying to find them
          // can lead to problems (e.g. 1213 contains 12, 213 etc.)
          text = null;
        } else {
          text = $("item > link:contains('=" + Url.comicId + "')", data)
            .parent().find("description").text();          
        }
      } else {
        // last item in RSS feed for main page
        text = $("item > description", data).eq(0).text();
      }
      
      if (text) {
        text = $("<div/>").append(text).find("p:not(:first)");
        if (text.length == 0) {
          text = null;
        }
      }
      
      Page.insertRssText(text);
    }
  },
  
  jQuery: {
    onLoad: function () {
      var
          oldestComic = 1268;

      $ = unsafeWindow.$;
      if (!Url.isSpecificComic || 
        (Url.isSpecificComic && Url.comicId >= oldestComic)) {
        $.get(Url.qcRss, Handle.rss.onLoad);
      } else {
        Page.insertRssText(null);
      }
    }
  }
};

Util.loadScript(Url.jQuery, Handle.jQuery.onLoad);
