// ==UserScript==
// @name           Prev/next page navigation by the keyboard shortcut
// @namespace      http://userscripts.org/users/ponchan
// @description    Navigate the prev/next page by shift+left/right key.
// @author         Masaaki Honda
// @include        *
// ==/UserScript==

(function(){
  var prevMatchers = new Array(
    new LinkHrefMacher("/prev$"),                     // goo blog
    new LinkHrefMacher("&direction=prev&"),           // mixi
    new LinkParentNodeMatcher("前の記事<br>"),        // bogus news
    new LinkParentNodeMatcher("class=\"forwardEntry\""),
                                                      // yahoo jp blog
    new LinkInnerHTMLMacher("img src.*back.gif"),     // coco blog
    new LinkInnerHTMLMacher("前の記事"),              // livedoor blog
    new LinkInnerHTMLMacher("&lt;&lt; 前へ"),         // rakuten blog
    new LinkClassNameMatcher("blog-pager-older-link"),// blogger
    new LinkClassNameMatcher("previousPage"),         // ameba blog
    null
  )
  var nextMatchers = new Array(
    new LinkHrefMacher("/next$"),                     // goo blog
    new LinkHrefMacher("&direction=next&"),           // mixi
    new LinkInnerHTMLMacher("img src.*next.gif"),     // coco blog
    new LinkParentNodeMatcher("次の記事<br>"),        // bogus news
    new LinkParentNodeMatcher("class=\"nextEntry\""), // yahoo jp blog
    new LinkInnerHTMLMacher("次の記事"),              // livedoor blog
    new LinkInnerHTMLMacher("次へ &gt;&gt;"),         // rakuten blog
    new LinkClassNameMatcher("blog-pager-newer-link"),// blogger
    new LinkClassNameMatcher("nextPage"),             // ameba blog
    null
  )

  function LinkHrefMacher(pattern) {
    this.match = function(link) {
      var re = new RegExp(pattern);
      return (re.exec(link.href) != null);
    };
  }
  function LinkInnerHTMLMacher(pattern) {
    this.match = function(link) {
      var re = new RegExp(pattern);
      return (re.exec(link.innerHTML) != null);
    };
  }
  function LinkParentNodeMatcher(pattern) {
    this.match = function(link) {
      var re = new RegExp(pattern);
      return (re.exec(link.parentNode.innerHTML) != null);
    };
  }
  function LinkIdMatcher(pattern) {
    this.match = function(link) {
      var re = new RegExp(pattern);
      return (re.exec(link.id) != null);
    };
  }
  function LinkClassNameMatcher(pattern) {
    this.match = function(link) {
      var re = new RegExp(pattern);
      return (re.exec(link.className) != null);
    };
  }

  function openMatchedLink(matchers, debug) {
    links = document.getElementsByTagName("a");

    for (i = 0; i < matchers.length; i++) {
      if (matchers[i] == null) {
        continue;
      }
      for (j = 0; j < links.length; j++) {
        link = links[j];
        if (link.href == "") {
          continue;
        }
        if (matchers[i].match(link)) {
          if (debug) {
            alert("link.href=" + link.href);
            alert("link.innerHTML=" + link.innerHTML);
            alert("link.id=" + link.id);
            alert("link.className=" + link.className);
          } else {
            window.location.href = link.href;
          }
        }
      }
    }
  }

  // Register keypress event
  document.addEventListener("keypress", function(e) {
    if (!e) e = window.event;
    var key = e.keyCode ? e.keyCode : e.which;

    if (e.shiftKey && key == 37) {
      openMatchedLink(prevMatchers, e.altKey);
    } else if (e.shiftKey && key == 39) {
      openMatchedLink(nextMatchers, e.altKey);
    }
  }, false);
})();