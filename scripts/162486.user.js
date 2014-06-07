// ==UserScript==
// @name        Youtube invisible fixer
// @namespace   Mithorium
// @description Makes the Youtube homepage the My Subscriptions page and displays the More Videos playlist on videos not in a playlist
// @include     /^https?://(www\.)?youtube\.com/.*/
// @version     1.0.4
// @grant       none
// ==/UserScript==
(function() {
var iframe = false,
  list = false,
  kvs = window.location.search.replace(/^\?/, '').split('&').filter(function(n) {
    return n;
  }),
  cleanyt = function() {
    if (window.yt) {
      if (window.yt.timeouts_) {
        window.yt.timeouts_.forEach(function(id) {
          window.clearTimeout(id);
        });
      }
      if (window.yt.intervals_) {
        window.yt.intervals_.forEach(function(id) {
          window.clearInterval(id);
        });
      }
    }
  },
  makeiframe = function(pathname) {
    cleanyt();
    document.body.style.overflow = "hidden";
    document.body.innerHTML =
      '<iframe seamless name="inner" style="width:100%;height:100%;border:0;" src="' +
      window.location.protocol +
      '//' +
      window.location.host +
      pathname +
      (kvs.length?"?":"") +
      kvs.join('&') +
      window.location.hash +
      '"></iframe>';
    window.addEventListener("hashchange", function(event) {
      window.inner.location.hash = window.location.hash;
      event.preventDefault();
      event.stopPropagation();
      return false;
    }, false);
  },
  startsWith = function(str1, str2) {
    return str1.slice(0, str2.length) === str2;
  },
  getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
  };
if (window.self !== window.top) {
  iframe = true;
}
for (var i = 0; i < kvs.length; i++) {
  if (startsWith(kvs[i], "list")) {
    list = true;
  }
}
if (iframe) {
  /* Inside iframe, make all links break out */
  document.body.addEventListener("click", function(event) {
    var cur = event.target;
    for ( ; cur !== this; cur = cur.parentNode || this) {
      if (cur.nodeType === 1 && cur.disabled !== true) {
        if (cur.nodeName.toLowerCase() === "a") {
          if (cur.href === "" || cur.onclick !== null || cur.target === "_blank") {
            return;
          }
          if (cur.hostname === window.location.hostname && cur.pathname === "/watch") {
            var ckvs = cur.search.replace(/^\?/, '').split('&').filter(function(n) {
              return n;
            });
            for (var i = ckvs.length; i--;) {
              if (startsWith(ckvs[i], "list") && startsWith(ckvs[i].split('=')[1], "UL")) {
                ckvs.splice(i, 1);
              }
            }
            cur.search = "?" + ckvs.join('&');
          }
          window.top.location.href = cur.href;
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      }
    }
  }, false);
  (function(history){
    var pushState = history.pushState;
    history.pushState = function(state,title,url) {
        var target = getLocation(url),
          tkvs = target.search.replace(/^\?/, '').split('&').filter(function(n) {
            return n;
          }),
          tlist = false;
        for (var i = tkvs.length; i--;) {
          if (startsWith(tkvs[i], "list")) {
            tlist = true;
            if (startsWith(tkvs[i].split('=')[1], "UL")) {
              tkvs.splice(i, 1);
              tlist = false;
            }
          }
        }
        target.search = "?" + tkvs.join('&');
        window.top.history.pushState(state,title,target.href);
        setTimeout(function(){
          window.top.document.title = document.title;
        }, 1000);
        if (!tlist) {
          tkvs.push("list=UL");
          target.search = "?" + tkvs.join('&');
        }
        arguments[2] = target.href;
        return pushState.apply(history, arguments);
    }
  })(window.history);
} else if (window.location.pathname === "/") {
  /* Homepage */
  makeiframe("/feed/subscriptions");
} else if (window.location.pathname === "/watch") {
  /* Video */
  for (var i = kvs.length; i--;) {
    if (startsWith(kvs[i], "feature")) {
      kvs.splice(i, 1);
      window.location.replace(window.location.href.replace(window.location.search, "?" + kvs.join('&')));
      return;
    }
  }
  if (!list) {
    kvs.push("list=UL");
    makeiframe("/watch");
  }
}
})();