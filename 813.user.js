// CHANGES
//
// 2005.03.30 - handle google redirects
//
// This file is licensed under the BSD-new license:
// http://www.opensource.org/licenses/bsd-license.php

// ==UserScript==
// @name          annotate google
// @namespace     http://ponderer.org
// @description   Add extra information to google search results
// @include       http://google.com/*
// @include       http://www.google.com/*
// @exclude       http://mail.google.com/*
// ==/UserScript==

(function() {
  var AG_XML_ICON = '<img src="data:image/gif;base64,R0lGODlhEwAJAPcAAP9kAP+obv+rdP+sdf9yFOh+N/9tDP9gAI9DFI5BFI9GFfnk1v6WUPTu6Y5D\nFPjZxPjs4/9lAP96ImIqBPx6I+vJs/h2IP1lAP9vDrJHAf707v9uDaxCAPXg0adPFf+8juZ+OP/R\nseF1Le5zIfmvftlbB+pWAOppE/7r3u7RvufErv9rAO9dAOXHs/TbyfXp4P9jA/Pr5dJ1Nvrn2o9B\nFP+cWP3Mq45CFPOndPWBNOe1lOlPAP338+7SwfR5J/3z7P91GfKcYv/Xu/bFpf92GOZ5MfCpeN2f\nef1eANeSZI9CFP+qco5GFf/07P7z6/5kBP1ZAO6zjPjDnfN+MP91GP9rBv9tBP+KOP9xG/zBmPfn\n3OWIS/94GO+BN+d4Lo9GFPqTT/GugrhKAf54H/+7jP5fAPjr4ut9NP+WUI9AFPzy6f/TtOhrGP94\nFt9ZAPxpCOKvjud3LOB5NOi+of+ALf///+prFo9FFOdsG/rx6vz///Ldz/+pcP/Lqf3w59yAQv9y\nE////rNIAf+rc44/FP+nbP+ENP9fAP9mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAATAAkA\nAAi8AMnwKTRoUKElAQoJEFAogMFBAwb8oWMAyKFDVKoYAHToAIENEQgA6MjBEAMeYGosONPHiQUJ\nTYbkQDGlDCJBhp5kyTMjiZs1eqKQqKMCxA85SG4aOjQmUIwSF0L0gNDBRYUCfkRAAYATxgctDXAA\nEKIjzJE5KQpo2IIFA040L2QYMdPFBhwTO6S0KKJmz4MgGa5wGcHCio8TROwgWtEGzxsKcbywEePh\nRpovDgghSKBEAZMENO4QGo1gQkAAOw==\n" style="border:none;" />';
  var REDIRECT = 'http://www.google.com/url?';

  function createLink(href, txt) {
    var link = document.createElement('a');
    link.setAttribute('href', href);
    //link.appendChild(document.createTextNode(txt));
    link.innerHTML = txt;
    return link;
  }

  function removeGoogleRedirect(url) {
    if (url.substr(0, REDIRECT.length) == REDIRECT) {
      var url_tokens = url.split('&');
      for (var t in url_tokens) {
        var token = url_tokens[t];
        if (token.substr(0, 2) == 'q=') {
          url = decodeURIComponent(token.substr(2));
          break;
        }
      }
    }
    return url;
  }

  function getDelLink(url) {
    return 'http://del.icio.us/url?url=' 
             + encodeURIComponent(removeGoogleRedirect(url))
  }
  
  function xpath(expr, doc) {
    if (!doc) {
      doc = document;
    }
    var iter = document.evaluate(expr, doc, null,
                                 XPathResult.ANY_TYPE, null);
    var ret = [];
    var n;
    while (n = iter.iterateNext()) {
      ret.push(n);
    }
    return ret;
  }
  
  // from http://www.quirksmode.org/js/findpos.html
  function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
      while (obj.offsetParent) {
        curleft += obj.offsetLeft
        obj = obj.offsetParent;
      }
    }
    else if (obj.x)
      curleft += obj.x;
    return curleft;
  }

  function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
      while (obj.offsetParent) {
        curtop += obj.offsetTop
        obj = obj.offsetParent;
      }
    }
    else if (obj.y)
      curtop += obj.y;
    return curtop;
  }
  
  function makeDelClosure(url) {
    return function(ev) {
      var x = findPosX(this);
      var y = findPosY(this);

      GM_xmlhttpRequest({
        headers: [{'User-Agent': 'annotate_google; http://ponderer.org/download/annotate_google.user.js'}],
        method: 'GET',
        url: url,
        onload: function(res) {
          //turn the text into a dom object
          var doc = document.createElement('div');
          doc.innerHTML = res.responseText;

          var divs = doc.getElementsByTagName('div');
          for (var i in divs) {
            var div = divs[i];
            if (div.getAttribute && div.getAttribute('class') == 'right list') {
              div.removeChild(div.childNodes[1]);
              //div.childNodes[1].innerHTML = 'tags';
              var links = div.getElementsByTagName('a');
              var numLinks = 0;
              for (var l in links) {
                if (links[l].href) {
                  numLinks++;
                  var href = links[l].getAttribute('href');
                  links[l].href = 'http://del.icio.us' + href;
                }
              }
              if (0 == numLinks) {
                div.innerHTML = 'no tags';
              }
              div.style.position = 'absolute';
              div.style.top = y + 'px';
              div.style.left = (x + 25) + 'px';
              div.style.backgroundColor = '#afa';
              div.style.opacity = '0.9';
              div.style.fontSize = '70%';
              div.style.padding = '4px 14px 4px 4px';
              
              var close = document.createElement('a');
              close.innerHTML = 'X';
              close.style.position = 'absolute';
              close.style.top = '4px';
              close.style.right = '4px';
              close.style.cursor = 'pointer';
              close.onclick = function(ev) {
                this.parentNode.parentNode.removeChild(this.parentNode);
              };
              div.appendChild(close);
              document.body.appendChild(div);
              break;
            }
          }
        }
      });
    };
  }

  function checkFeed(id, url) {
    GM_xmlhttpRequest({
      headers: [{'User-Agent': 'annotate_google; http://ponderer.org/download/annotate_google.user.js'}],
      method: 'GET',
      url: url,
      onload: function(res) {
        // remove the '?' layer
        var elt = document.getElementById(id);
        var nl = elt.childNodes;
        for (var i = 0; i < nl.length; i++)
          elt.removeChild(nl.item(i));

        // try to turn the text into a dom object
        var doc = document.createElement('div');
        doc.innerHTML = res.responseText;

        // see if there's a rss or atom file
        var links = doc.getElementsByTagName('link');
        var rss = '', atom = '';
        for (var l in links)
        {
          var link = links[l];
          if (link.getAttribute && link.getAttribute('rel') == 'alternate'
              && link.getAttribute('type') == 'application/rss+xml')
          {
            rss = link.getAttribute('href');
          }
          else if (link.getAttribute 
                   && link.getAttribute('rel') == 'alternate'
                   && link.getAttribute('type') == 'application/atom+xml')
          {
            atom = link.getAttribute('href');
          }
        }
        if (rss)
        {
          elt.appendChild(createLink(rss, AG_XML_ICON));
          elt.appendChild(document.createTextNode(' '));
        } 
        else if (atom)
        {
          elt.appendChild(createLink(atom, AG_XML_ICON));
          elt.appendChild(document.createTextNode(' '));
        }
      }
    });
  }
  
  function annotate() {
    // get all the links
    // also compatible with the add headings to google user script
    var nodes = xpath("//p[@class='g']/a[1] | //p[@class='g']/h2/a[1]", 
                      document);
    for (var n in nodes) {
      var node = nodes[n];
      // create a span element for feed query
      var span = document.createElement('span');
      span.appendChild(document.createTextNode('? '));
      var id = 'r' + n;
      span.setAttribute('id', id);
      node.parentNode.insertBefore(span, node);

      // make the feed request
      checkFeed(id, removeGoogleRedirect(node.href));

      // create a span element for delicious query
      span = document.createElement('span');
      span.setAttribute('style', 'font-size:70%');
      span.appendChild(document.createTextNode(' '));
      
      var delUrl = getDelLink(node.href);
      var link = createLink(delUrl, 'info');
      link.title = 'go to del.icio.us';
      span.appendChild(link);
      
      span.appendChild(document.createTextNode(' '));
      link = createLink('#', 'tags');
      link.title = 'show tags';
      link.onclick = makeDelClosure(delUrl);
      span.appendChild(link);
      node.parentNode.insertBefore(span, node.nextSibling);
    }
  }
  

  // make sure this is a google search result page
  var nodes = document.getElementsByTagName('title');
  var isSERP = 0;
  for (var n in nodes) {
    var node = nodes[n];
    if (node.text && node.text.substr(0, 14) == 'Google Search:') {
      isSERP = 1;
      break;
    }
  }
  if (isSERP)
    annotate();
})();
