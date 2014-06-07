// ==UserScript==
// @name    4chan Ajax Engine
// @author  Witiko
// @version 2.1.0
// @include http://boards.4chan.org/*
// @include https://boards.4chan.org/*
// ==/UserScript==

var numberOf = /(\d+) post/, absAddr = /^https?:\/\//i, inThread = /\/res\//.test(location.href),
    refreshPeriod = 15000, dummyLink = "javascript:{}", originalTitle = document.title, timeout = 30000,
    strings = {
      empty: "",
      show: ["Show ", " previous post"],
      noNewPosts: "No new posts",
      newPosts: " new post",
      plurality: "s",
      exclamationMark: "!",
      $404: " (404'd)"
    }, beaconReady = "data:image/png;base64,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",
    beaconLoading  = "data:image/gif;base64,R0lGODlhDQANAPcQAP///+7u7t3d3bu7u6qqqpmZmYiIiHd3d2ZmZlVVVURERDMzMyIiIhEREQARAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAQACwAAAAADQANAAAIfgAhQAAgAMCABQMAABDIEMCCAgP+FQAQoCHFAwwMSKTIMIACBAIYMFBAQGGAAAoJLGBAYMBJiighCBgwIEFFgRRNHmjAoABDnCcDzCRw4ObAlwoFJEjg0qQAARUDIDAQwECBpwSEJsw5AKSBmQVjQghwwCXVAC5/wkRbUaHAgAAh+QQFBwAQACwAAAAADQANAAAIZQAhCBQoQAHBAAMFKiAgkEABBgISDiwAwQADBQgHHoCwQAECBg0EAJC4YEBEAiITRkQgcSAAAwoUDGgpcQBDmgMNsBwpECHPAxQLzIQQMUDEhAYCUDzKEwKAAiedHpU48mhGCAEBACH5BAUHABAALAAAAAANAA0AAAhnACEIDCAQgQCBCBEmgHBwwIAFCSEAgLCAAIQCCxYGmIjAAAQFCQwogDDgwIIBJEEiFGCgQYMCAAhenChQgIKDFxEgiMgTJ0+eBXzSRFgApcUASAcmFGBRAFKCMgVaBCAgZtSfAocGBAAh+QQFBwAQACwAAAAADQANAAAIbAAhCBx4YKBBCAEQCBjAQKCCAAcNKGBIQAECCAAEGhgA0QCEiwIEhoSQ4MBICAQWMPAoACLCgQEYHBgwgICBAicd/vvXYOCAgwQKFCCAsOZBABkzDggp4GTGnBBCQmyKEWbLlxkPDgQQIOvAgAAh+QQFBwAQACwAAAAADQANAAAIYgAhCBQ4IMGAgQghKDj4DwIBBgkhHIBQ4J+BBgoQKjAggIECBAsgDEAwkMCCjAQhMGgwMYBAAwkbJCCIgGRCiAkFIBzwz2DEgQNWFoAAAKFLogESNNBZ9OjAogOc/oxYdGpAACH5BAUHABAALAAAAAANAA0AAAh0ACEIFCiAgAAIAQAMhACggAABCAQMQKBw4YACEwUkOFARwgABAQwQGGBAgYACCggWIBCA4cMEDAgwhCCxI4QEBh8+bLmwQAMICgIEALlQo8gBBInSNAAhpkChCBkiaDCRwdOrNBkcGNqRp0CfBxeKBTCAZ0AAIfkEBQcAEAAsAAAAAA0ADQAACG4AIQgUGGBAgIEIIRA4aACCgAMHCTocIMDAgAMFEAo4SIAigQMCERCkCOHgQQQLBgwMwBLhAZUlWyYkwKBBAgAlBeAkiKAAyYE4OUJImRDAgAQMGAgYWpTAvwMNDACICNQpAQgMEg4cwEDlUoEBAQAh+QQFBwAQACwBAAAADAANAAAIXwAhCIQgQMDAgwEMQiAgsMBBgQYJCDDAUGAAiAYHQAgw4MBFARcPHkDw8KHDkgcHKFBwwOJBAAcqWiwIcYGCh/8YHEiwAMKBmwAgGGjQ0gCDhwKIahzAMORGjRB6PgwIACH5BAUHABAALAAAAAANAA0AAAhhACEIFBggwMCDBCEEEGBwAACEBSEwJCAAIcGCAgoI1GhxYAGOBx8OpIhQ5EABCRBofIigoscBLgs0aGAAgsgECQQKYJBgAIMFBQ4ogGAAAUYIGpMu6Ih04IClCF0mcDkwIAAh+QQFBwAQACwAAAEADQAMAAAIaAAhCBwYAEIAAQUHCkRYcIBCAAIULhToEAKAiwoDECAQccAAAgMSUhzI4N+/BRIhGDCwkYABBhI5DiTAgAEBgwURIBi44ICABTsNJNB4wKJAAxBoElBQwKjAADYFNBC4M+XBqgEACAwIACH5BAUHABAALAAAAQANAAwAAAhlACFAACCwIIQABgEEEIBQIMOCAhYgEFCwoQCKAQwwYDCAIEEBAywaaDDAIMWDCwQiMCiQAAGQEAokaCiwZMEBCxaELGjAwMmCCg64nDiggMCGHBMMOHDUoAKBKQUwTTgQwlSDAQEAIfkECQcAEAAsAAAAAA0ADQAACGIAIUAIIECgwYMCBTAwAAAhwgQNCh4MYPDAgH8JGgoMQBFAAYEHClIkmBACgQUHAXCkmECgAYQEJQ6AgGCiSIoCFBjUSODjQJ00CxQsQJDAwZM0IRSYqVEggpk1lTo06PNgQAA7";

// ---------------------------------------- The script body

$($class("thread"), function(thread) { // For every thread
  var Listeners = { // Event Listeners
    $404: [],
    threadRequested: [],
    threadLoaded: [],
    cacheRequested: [],
    cacheReturned: []
  },  Requesters = Object.create(null), /*{
    requestThread: function() { ... }
    requestCache:  function() { ... }
  }*/ Globals    = Object.create(null),
  ThreadURL, CacheAvailable, $404d;

  // -------------------------------------- Modules

  (function(originalNode) { // *Summary anchor handler*
    if(!originalNode) return (Globals.numberOfHidden = 0);
    var originalText = originalNode.firstChild,
        firstVisibleNode = $class(thread, "replyContainer")[0],
        number = Globals.numberOfHidden = +numberOf.exec(originalText.nodeValue)[1],
        newNode = el("a");

    Listeners.$404.push(function() {
      if(!CacheAvailable) {
        newNode.onclick = null;
        newNode.href = null;
      } app(newNode, tNode(strings.$404));
    }); newNode.onclick = function() {
      Listeners.cacheReturned.push(function(thread) {
        var parent = firstVisibleNode.parentElement;
        for(var i = $class(thread, "replyContainer"),
                j = 0, k, l = firstVisibleNode.id, m = i.length; j !== number && j !== m && (k = i[j]).id !== l; j++)
          parent.insertBefore(fixLinks(imp(k, true), ThreadURL), firstVisibleNode);
        originalNode.parentElement.removeChild(originalNode); return true;
      }); Requesters.requestCache();
    };

    newNode.href = dummyLink; createBeacon(newNode);
    with(strings) app(
      newNode, tNode(show[0] + number + show[1] + (number === 1?empty:plurality))
    ); while(originalNode.hasChildNodes()) originalNode.removeChild(originalNode.firstChild);
    app(originalNode, newNode);
  })($class(thread, "summary")[0]);

  // -----

  (function() { // *New posts watcher*
    // ## Requires global variables defined within the "Summary anchor handler" module
    var hr = thread.nextSibling, hrParent = hr.parentElement, textNodes, lastNodeIndex,
        anchor = el("a", "bottomLink"), container = el("span"),
        posts = { // Preparing cached posts
      cached: map($class(thread, "replyContainer"), idHarvest), latest: 0
    }; posts.total = posts.cached.length + Globals.numberOfHidden;

    with(strings) textNodes = { // Preparing text nodes
      noNewPosts: tNode(noNewPosts),
      number: tNode(empty),
      newPosts: tNode(newPosts),
      plurality: tNode(plurality),
      exclamationMark: tNode(exclamationMark)
    };

    Listeners.threadLoaded.push(function(thread) { // Finding the last "old" Node
      var lastElement, i = posts.cached.length, j, latest,
          allPosts = $class(thread, "replyContainer"), l = allPosts.length;
      while(i--) if(j = $id(thread, posts.cached[i])) {
        lastElement = j; break;
      } lastNodeIndex = lastElement?
          indexOf(allPosts, lastElement):l - (l - posts.total) - 1;
      latest = l - lastNodeIndex - 1;

      with(textNodes) { // Redrawing
        number.nodeValue = latest;
        if(xor(posts.latest, latest)) { // 0 <-> x
          if(latest) { // 0 -> x
            anchor.replaceChild(number, noNewPosts);  anchor.href = dummyLink;
            app(anchor, newPosts, latest > 1?plurality:null, exclamationMark);
          } else { // x -> 0
            anchor.replaceChild(noNewPosts, number);  anchor.href = null;
            rem(anchor, newPosts, posts.latest > 1?plurality:       null);
          }
        } else if(posts.latest !== latest) // x -> y
          if(posts.latest === 1) anchor.insertBefore(plurality, exclamationMark);
          else if (latest === 1) anchor.removeChild( plurality);
        if(inThread) document.title = latest?"(" + latest + ") " + originalTitle:originalTitle;
      }

      posts.latest = latest;
      posts.total  = l;
      posts.queueCached = map(allPosts, idHarvest);
    });

    Listeners.$404.push(function() {
      hrParent.insertBefore(tNode(strings.$404), hr);
    });

    anchor.onclick = function() {
      if(!posts.latest) return; with(textNodes) {
        anchor.replaceChild(noNewPosts, number); // Redrawing
        rem(anchor, newPosts, posts.latest > 1?plurality:null); // x -> 0
        if(inThread) document.title = originalTitle;
        posts.latest = 0; posts.cached = posts.queueCached; anchor.href = null;
      } Listeners.cacheReturned.push(function(cache) {
        var i = lastNodeIndex + 1, j = $class(cache, "replyContainer"), l = j.length, k;
        while(i !== l && (k = imp(j[i++], true))) thread.appendChild(
          inThread?k:fixLinks(k, ThreadURL)
        ); return true;
      }); Requesters.requestCache();
    };

    if(inThread) (function() { // Keyboard handling
      var enabled = true; addEventListener("focus", function(e) {
        if(e.target.tagName === "TEXTAREA" ||
          (e.target.tagName === "INPUT" && (!e.target.type || e.target.type === "text" || e.target.type === "password"))) enabled = false;
      }, true); addEventListener("blur", function(e) {
        if(e.target.tagName === "TEXTAREA" ||
          (e.target.tagName === "INPUT" && (!e.target.type || e.target.type === "text" || e.target.type === "password"))) enabled = true;
      }, true); addEventListener("keydown", function(e) {  e = e || event;
        if(e.keyCode === 32 && enabled) return (e.returnValue = false) || !!anchor.onclick();
      }, false);
    })();

    createBeacon(container);
    with(textNodes) hrParent.insertBefore(app(container,
      app(anchor, noNewPosts, exclamationMark)
    ), hr);
  })();

  // -----

  (function() { // *Link unabberviator*
    addEventListener("click", function(e) { e = e || event;
      var target = e.target, parent = target.parentElement, post;
      if(($404d && !CacheAvailable) || parent.className !== "abbr" || !thread.contains(target)) return;
      post = parent.parentElement; Listeners.cacheReturned.push(function(cache) {
        if(cache = $id(cache, post.id))
          post.parentElement.replaceChild(fixLinks(imp(cache, true), ThreadURL), post);
        return true;
      }); Requesters.requestCache();
      return e.returnValue = false;
    }, false);
  })()

  // -----

  if(inThread) {

    // ------------------------------------ In-thread specific modules

    (function() { // *Ctrl+F5 quick-reloading support*
      addEventListener("keydown", function(e) {  e = e || event;
        if(e.keyCode === 116 && e.ctrlKey) return (e.returnValue = false) || !!Requesters.requestThread();
      }, false);
    })();

    // ---

  }

  // -------------------------------------- Ajax engine implementation

  (function() { // The implementation itself
    var loading, loadingCache, cache;
    ThreadURL = $class(thread, "replylink")[0];
    ThreadURL = (ThreadURL?ThreadURL:location).href;

    // ---

    Requesters.requestCache = function() {
      if(loadingCache) return; loadingCache = true;
      handleEvent(Listeners.cacheRequested);
      if(cache) return finish();
      if($404d) return;
      Listeners.threadLoaded.push(finish);
      Requesters.requestThread();

      function finish() {
        handleEvent(Listeners.cacheReturned, cache);
        loadingCache = false;
      }
    };

    // ---

    Requesters.requestThread = function() {
      if($404d || loading) return; loading = true;
      handleEvent(Listeners.threadRequested);
      ajax(ThreadURL, function(thread) { // Success
        if(!CacheAvailable) CacheAvailable = true;
        cache = thread; handleEvent(Listeners.threadLoaded, thread);
      }, function() { // 404'd
        $404d = true; handleEvent(Listeners.$404);
        Listeners.threadRequested = null;
        Listeners.threadLoaded    = null;
      }, function() { // Executed in every case
        loading = false;
      });
    };
  })();

  // -----

  (function() { // *Periodic refresher*
    var intervalID, timeoutID;
    Listeners.$404.push(function() {
      clearInterval(intervalID);
      clearTimeout(timeoutID);
    }); timeoutID = setTimeout(function() {
      intervalID = setInterval(Requesters.requestThread, refreshPeriod);
    }, refreshPeriod * Math.random());    
  })();

  // -----

  function createBeacon(parentElement) {
    var beacon = el("img");
    Listeners.$404.push(stop);
    Listeners.threadRequested.push(spin);
    Listeners.threadLoaded.push(stop);
    app(parentElement, beacon); stop();

    function stop() {
      beacon.src = beaconReady;
    } function spin() {
      beacon.src = beaconLoading;
    }
  }
});

// -------------------------------------- Generic functions

function asyncThrow(e) {
  setTimeout(function() {throw(e);}, 1);
} function indexOf() {
  return Array.prototype.indexOf.call.apply(
    Array.prototype.indexOf, arguments);
} function map(a, b) {
  return Array.prototype.map.call(a, b);
} function $(a, b) {
  Array.prototype.forEach.call(a, b);
} function $obj(a, b) {
  for(var i in a) b(a[i], i, a);
} function toDocument(a) {
  var $ = document.implementation.createHTMLDocument("");
      $.documentElement.innerHTML = a; return $;
} function $id(a, b) {
  return b?a.getElementById(b):document.getElementById(a);
} function $class(a, b) {
  return b?a.getElementsByClassName(b):document.getElementsByClassName(a);
} function $tag(a, b) {
  return b?a.getElementsByTagName(b):document.getElementsByTagName(a);
} function tNode(a) {
  return document.createTextNode(a);
} function el(a, classList) {
  a = document.createElement(a);
  a.className = "ajaxEngine" + (classList?" " + classList:strings.empty);
  return a;
} function xor(a, b) {
  return a && !b || !a && b;
} function app(a) {
  for(var i = 1, l = arguments.length, j; i !== l; i++)
    if(j = arguments[i]) a.appendChild(j); return a;
} function rem(a) {
  for(var i = 1, l = arguments.length, j; i !== l; i++)
    if(j = arguments[i]) a.removeChild(j); return a;
} function imp(node, deep) {
  return document.importNode(node, deep);
} function fixLinks(node, threadURL) {
  $($tag(node, "a"), function(link) { // Relative and direct links filtering
    var href = link.getAttribute("href");
    if(href && !absAddr.test(href)) {
      switch(href.charAt(0)) {
        case "#": link.href = threadURL       + href; break;
        case "/": if(href.charAt(1) !== "/")
                  link.href = location.origin + href; break;
        default : link.href = "res/"          + href;
      }
    }
  }); return node;
} function idHarvest(post) {
  return post.id;
} function handleEvent(listeners, arg) {
  var i = 0, j, l = listeners.length; 
  while(i !== l) if(secureEval(listeners[i])) {
    remove(listeners, i); l--;
  } else i++;

  function secureEval(f) {try {
    return f.call(this, arg);
  } catch(e) {asyncThrow(e);}}
} function remove(a, i) {
  a.splice(i, 1);
} function ajax(address, success, $404, finished) {
  var xhr = new XMLHttpRequest, done = false, args = arguments,
      timeoutID = setTimeout(tryAgain, timeout);
  xhr.onreadystatechange = function() {
    if(done || xhr.readyState !== 4 || (xhr.status !== 200 && xhr.status !== 404)) return;
    clearTimeout(timeoutID); done = true;
    if(!xhr.responseText) return tryAgain();
    if( xhr.status === 200) success(toDocument(xhr.responseText));
    else $404(); finished();
  }; xhr.open("GET", address); xhr.send(null);

  function tryAgain() {
    ajax.apply(this, args);
  }
}

// ------------------------------ Some styling

GM_addStyle(
  "a.ajaxEngine.bottomLink[href] {font-style: italic; font-weight: bold}" +
  "a.ajaxEngine:not([href]), a.ajaxEngine.bottomLink {color: inherit}"
);