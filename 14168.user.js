// ==UserScript==
// @name      Utamap: Lyrics without Flash
// @namespace http://8-p.info/
// @include   http://*.utamap.com/showkasi.php?surl=*
// @include   http://*.utamap.com/showtop.php?surl=*
// @version   0.1
// ==/UserScript==

(function () {
    // Override http://www.utamap.com/lyrics.js
    with (this.unsafeWindow || this) {
       document.onmousedown = document.oncontextmenu = rt;
    }

    // Define handler
    var onreadystatechange = function (req) {
       if (req.readyState == 4 && req.status == 200) {
          var text = req.responseText.replace(/^test1=[0-9]+&test2=/, '');

          var obj = document.getElementById('showkasi');
          if (obj) {
             var pre = document.createElement('pre');
             pre.style.textAlign = 'left';
             pre.appendChild(document.createTextNode(text));
             obj.parentNode.replaceChild(pre, obj);
          }
       }
    }

    // Send request
    var match;
    if (match = document.location.href.match(/surl=([A-Z0-9]+)/)) {
       var path = '/phpflash/flashfalsephp.php?unum=' + match[1];
       if (typeof(GM_xmlhttpRequest) == 'function') {
          GM_xmlhttpRequest({
                               method: 'GET',
                               url: 'http://www.utamap.com' + path,
                               onreadystatechange: onreadystatechange
                            });
       } else {
          var req = new XMLHttpRequest;
          req.onreadystatechange = function () { onreadystatechange(req); }
          req.open('GET', path, true);
          req.send(null);
       }
    }
 })();
