// ==UserScript==
// @name           click-n-hold
// @namespace      http://localhost/
// @include        http://*
// @include        https://*
// @include        ftp://*
// ==/UserScript==

var clickNhold_Timer = null;
var clickNhold_X = null;
var clickNhold_Y = null;
var clickNhold_Id = 0;
var clickNhold_MovingNote = null;
var clickNhold_LastElement = null;

var clickNhold_services = [
  {
    name: "Google",
    href: "http://www.google.com/search?q=",
    favicon: "http://www.google.com/favicon.ico"
  },
  {
    name: "Google This Site",
    favicon: "http://www.google.com/favicon.ico",
    href: function(str,ref,isaLink) {
      var href = "http://www.google.com/search?q=site%3a";
      var w = window.top;
      if (w == null)
        w = window;
      href += w.location.hostname + '+' + escape(str);
      return href;
    }
  },
  {
    name: "Google Translate",
    href: "http://translate.google.com/translate_t?hl=en&langpair=auto|en&tbb=1&text=",
    favicon: 'data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
    'ACgAKAAoCxlgGAAAAmBJREFUOMuVkjtoFGEUhb/7z8wmm51EE01METVBxCkUxUcT0hhCQPEJ' +
    '2oqFCCIoWomYRixEsLJMoZWNIDbaaJogwTbGwgf4SBZTJDGJ7mN25///axFdn4We9nA/zrkc' +
    'SZKEl1tvKUBvYY7iQsbVkzu4/miO58UbzNRKdIxPsFkMgfeAoSaeVKE/SUQ49lgBjmx3PHgh' +
    'mHgNsS5xaX9nA9I08ZSuUgWRAMVRAyoaUjIWwzc9mAwgXoUPAj5XI1wg3y1q/QNYBG8cFiFA' +
    'ULGoh0YCAL03xL+obgzzqpRN8CPB/8oayNQR/m7I8Se05T0Lp48SDpQB2HChj5nN6wgkhz0z' +
    'zt5TWwE4MjGNbDlxW19VehqAO2c3cbh6HrHjrDq4BEA4OgBecd4BBskENRFSCgg/pXlWZx/Y' +
    '2dvC4K7uxvHPcmrBgNho5VfeInUPKKYjqBPnmpl4k3Lz7uu/9jXeYFyIYhGvCBECqKljsqV5' +
    'evI1Du1ey9tzD4lbx/4AaKWEVwEN8AIKeAWyiPDaxUEA9mUjxK1jlBcjCu0Z5cWoAehJ11Pk' +
    'PZprAxdgrMX7AATMvmyE4839vKvPUVyAQnv21xpxrROcEFgBH4IzYA0mbh1jcmYbfeEzNnam' +
    'AGSZUk+XfwF0F7qgluFE8Q4iGyGWlR3EtkhztJovJYvYAO+gJd/xCyAtlUEijM3hJcOpQ72u' +
    'LLGpc4jyJ4umLajLEUpM4UCxcTx9+SEfl2cRZxDnoWrwdQ8+hyRJwtTotC6Zi4TLU5isgo+a' +
    'aeoepl68wp53w1RnSxTNHMYU8AioBY1I7s/KV0eJD2+qosIlAAAAAElFTkSuQmCC'
  },
  {
    name: "Google Docs",
    href: "http://docs.google.com/viewer?url=",
    favicon: "http://docs.google.com/favicon.ico",
    need_ref: 1,
  },
  {
    name: "Google Image by Image",
    href: "http://images.google.com/searchbyimage?image_url=",
    favicon: "http://www.google.com/favicon.ico",
    need_ref: 1,
  },
  {
    name: "Wikipedia(EN)",
    href: "http://en.wikipedia.org/wiki/Special:Search?search=",
    favicon: "http://en.wikipedia.org/favicon.ico"
  },
  {
    name: "Wiktionary(EN)",
    href: "http://en.wiktionary.org/wiki/Special:Search?search=",
    favicon: 'data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
    'AP8A/wD/oL2nkwAAAcRJREFUOMt9kz1r21AUhh8pGUqgOGno2EwyCJLgP2CMhDwFDyn5KtxM' +
    'xhlS8BC6e2l+gEPH5h8UG20pVKozeCkZmpR0EzgtmMYkbuoldJB6OxgrurLjFw7cczjnPR/3' +
    'HC2MQkkCK8srSZXL75dMRRiFMimAIqZpyrRPUmYnEMbvGX0GTdOmFqD7vo8QgtJaCd/3AWh8' +
    'aFBaKylEtVoNIQRBEBAEAdVqFSEEuuM4rC6vcvXjKg7Y2NoYyzT3ZA7bsjEMg4XMAgC2ZaMD' +
    'bG5vMvgzwHVd+jd9ANZfrisE3V9dKnsVxVbZqwwJDMOgYBVwmy6dTgcAy7YUZ6vwoJ9/O491' +
    'fWQsl8sAeJ7HiDSJUVv9mz5nX86YfzavEjiOQy6Xo91uEwTBo1O/G9xx//cex3FUAoB8Po/3' +
    'yePi68VY4OiHTlunLL1YenyRTNOUO692ZO+6J6WUEpBSSrn/el+GUSgP3x7K3nUv9tfTmXbF' +
    'Lt2fXY7eHSn21ucWx++PAVh8vviwSGmCbDbL7e9bmo3mWBv1ep1isajYtPQxAfEWnnw8QdM0' +
    'hp0MEf2LFN/ZSZM+eHNA5mkGANM0x+4heS8TK0hj2on/B49n7jwSskh1AAAAAElFTkSuQmCC'
  },
  {
    name: "Wolfram|Alpha",
    href: "http://www.wolframalpha.com/input/?i=",
    favicon: "http://www.wolframalpha.com/favicon.ico"
  },
  {
    name: "Make it http:// link",
    favicon: "http://a.fsdn.com/fm//images/icon-download-wh.png",
    href: function(str,ref,isaLink) {
      var href = str.replace(/^\s+/, '').replace(/\s+$/, '');
      if (href.substr(0, 7) == "hxxp://")
        href = "http" + href.substr(4);
      else if (href.substr(0, 7) != "http://")
        href = "http://" + href;
      return href;
    }
  },
  {
    name: "Search for a CVE",
    favicon: "http://cve.mitre.org/favicon.ico",
    href: function(str,ref,isaLink) {
      if (!/^\s*CVE(-\d+)+/.test(str))
        return null;
      return str.replace(/\s*(CVE(-\d+)+).*/, "http://cve.mitre.org/cgi-bin/cvename.cgi?name=$1");
    }
  },
];

GM_addStyle("\
  DIV.click-n-hold {          \
      color: #000000;         \
      background: #ff8787;    \
      float: right;           \
      border-top: 6px solid #ff8787;    \
      border-bottom: 6px solid #ff8787; \
      border-left: 6px solid #ff8787;   \
      border-right: 6px solid #ff8787;  \
      text-decoration: none;  \
      text-align: left;       \
      z-index: 10000;         \
      -moz-border-radius: 2px; \
      -moz-box-shadow: 2px 2px 2px #bf9d9d;\
      -webkit-border-radius: 2px;\
      -webkit-box-shadow: 2px 2px 2px #bf9d9d;\
  }                           \
  IMG.click-n-hold-close {    \
      position: absolute;     \
      top: -14px;               \
      right: -14px;             \
      z-index: 10002;         \
  }                           \
  DIV.click-n-hold IMG {      \
      border: none;           \
      display: inline         \
  }                           \
  DIV.click-n-hold-text {     \
      font-size: 10pt;        \
      color: black;           \
      padding: none;          \
      margin: none;           \
      border: none;           \
      /*background: #ff9f9f;*/\
      /*margin-top: 2px;*/      \
  }                           \
  DIV.click-n-hold SPAN.click-n-hold { \
      background: #ff8787;    \
  }                           \
  DIV.click-n-hold-text A {   \
      color: blue;            \
      /*background: #ffafaf;*/\
  }                           \
  A.click-n-hold-as-link {    \
      font-size: 6pt;         \
      color: blue;            \
      /*background: #ffafaf;*/\
  }                           \
  DIV.click-n-hold > TABLE:first-of-type { \
      position: absolute; \
      top: -28px;         \
      height: 24px;       \
      background: #ff8787;    \
      border-top: 2px solid #ff8787;    \
      border-bottom: 2px solid #cf6767; \
      border-left: 2px solid #ff8787;   \
      border-right: 2px solid #ff8787;  \
      text-decoration: none;  \
      text-align: left;       \
      z-index: 10001;         \
      -moz-border-radius: 2px; \
      -webkit-border-radius: 2px;\
  } \
  DIV.click-n-hold > TABLE:first-of-type TD { \
    padding-left: 2px; \
    padding-top: 0; \
    padding-right: 0; \
    padding-bottom: 0; \
    margin: 0; \
    border: 0; \
  } \
  ");

(
function()
{
  function services(str, ref, isaLink, noteid)
  {
    // TODO: use str if isaLink is set
    var s = '';
    for (var i = 0; i < clickNhold_services.length; ++i) {
      if (clickNhold_services[i].need_ref && ref == null)
        continue;

      var svc = '<a target="click-n-hold-' + clickNhold_services[i].name + '" ';
      svc += 'href="';
      if (typeof(clickNhold_services[i].href) == 'function') {
        var h = clickNhold_services[i].href(str,ref,isaLink);
        if (h == null)
          continue;
        svc += h;
      } else {
        svc += clickNhold_services[i].href;
        if (clickNhold_services[i].need_ref)
          svc += encodeURIComponent(ref);
        else
          svc += encodeURIComponent(str);//escape(str);
      }
      svc += '">';

      if (clickNhold_services[i].favicon == null)
        svc += clickNhold_services[i].name;
      else {
        svc += '<img alt="(' + clickNhold_services[i].name + ')"' +
               ' title="' + clickNhold_services[i].name + '"' +
               ' src="' + clickNhold_services[i].favicon + '">';
      }
      svc += '</a>';

      s += '<td>' + svc + '</td>';
    }
    return '<table class="click-n-hold">' + s + '</table>';
  }
  function closeBtn(i)
  {
    var s =
        '<img class="click-n-hold-close" ' +
        'onclick="(function(){'+
        "document.body.removeChild(document.getElementById('"+i+"'));" +
        '})()" ' +
        'src="data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0' +
'dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLAxUpE0aVxhYA' +
'AAGkSURBVDjLY2RAApMZGCT1Q0Ja///5k8iABfz/86dly5Yt3T0MDJ9gYowMDAwMa8XFRT' +
'nExDoFjYwcLDU0FBnwgMOnT9/5+vDhWmELiwazqVN/MK+Xk2NiFxGZziUrG29rbCzIQADI' +
'S0sLPXrxwubrvXt/ljx9epDp06NHCoL6+m4OtrYMxAInJycGLllZV1EGBhYmlaioGkstLX' +
'GYpEFlJU6NyHK2JibWKz09a5j+fPuGEmCTAgKwGmJQWckwKSAARYyZnb2eCV2hnbk5hiEw' +
'zXbm5hgGs2Bzqp25OcMkJCfj0szAwMDAhMu/yBpwacZrAMzZuMIErxfQ/QzzzoX2dkwXsH' +
'BxLcSnGVfAMjAwMPz7+bOZ2eXGjWtfpaTCZUREuBkYGBi0eHmx+lleRoZBi5eXQV5GhoGB' +
'gYHhyPnzJ1Zt3JjCJBsU9PDDlSt7Dh4/TjDAYHIHDh9m+P7s2Z6pDAw/mGxXrvzJJihY9u' +
'PFi0Un79x5QCgZH7lw4e7vz5975EJDu+G5EQYWMDDIqYSHN//9+TMOh/72yxs29OYwMLyF' +
'CQAAow2VUhIYHVYAAAAASUVORK5CYII='
        +'">';
    return s;
  }

  function doMenu(sel,ref)
  {
    var m = document.createElement("div");
    var note = { e: m, x: 0, y: 0, dx: 0, dy: 0, };
    m.id = 'click-n-hold-' + clickNhold_Id;
    clickNhold_Id++;
    m.className = 'click-n-hold';

    var seltext = sel.toString();
    var isaLink = RegExp('^[a-zA-Z_-]{2,}://[a-zA-Z0-9_]+').test(seltext);
    var html = '';
    html += services(seltext, ref, isaLink, m.id);
    html += closeBtn(m.id);
    html += '<div class="click-n-hold-text">';
    if (isaLink) {
      html += '<a class="click-n-hold-as-link" target=_blank href="';
      html += seltext;
      html += '">[Link]</a>';
    }
    if (ref != null)
      html += '<a target=_blank href="' + ref + '">';
    html += seltext;
    if (ref != null)
      html += '</a>';
    html += '</div>';
    m.innerHTML = html;

    m.style.opacity = "0.85";
    //m.style.filter = "alpha(opacity=80)";
    m.style.position = "absolute";
    if (clickNhold_X) {
      note.x = clickNhold_X - 3;
      note.y = clickNhold_Y - 3;
    } else {
      note.x = 20;
      note.y = 15;
    }
    m.style.left = note.x + "px";
    m.style.top = note.y + "px";

    function showMenu(topelm,show) {
      topelm.children[0].style.display = show ? 'inline': 'none';
      topelm.children[1].style.display = show ? 'inline': 'none';
    }
    // hide the span with services after first mouse over
    m.addEventListener('mouseover',
      function(e) {
        if (clickNhold_MovingNote == null) {
          showMenu(m, 1);
          m.style.backgroundColor = '#ff8787';
          m.style.borderColor = '#ff8787';
          //m.style.opacity = '0.85';
        }
      },
      false);
    m.addEventListener('mouseout',
      function(e) {
        if (clickNhold_MovingNote == null) {
          showMenu(m, 0);
          m.style.backgroundColor = '#ffa7a7';
          m.style.borderColor = '#ffa7a7';
          //m.style.opacity = '0.85';
        }
      },
      false);

    // Note moving code
    function noteMover(e)
    {
      if (clickNhold_MovingNote == null)
        return true;
      var x = window.scrollX + e.clientX;
      var y = window.scrollY + e.clientY;
      x -= clickNhold_MovingNote.dx;
      y -= clickNhold_MovingNote.dy;
      clickNhold_MovingNote.x = x;
      clickNhold_MovingNote.y = y;
      clickNhold_MovingNote.e.style.left = x + "px";
      clickNhold_MovingNote.e.style.top = y + "px";
      e.stopPropagation();
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.returnValue = false;
      e.cancelBubble = true;
      return false;
    }
    // Note resizing code
    function noteSizerLeft(e)
    {
      if (clickNhold_MovingNote == null)
        return true;
      var elem = clickNhold_MovingNote.e;
      var x = window.scrollX + e.clientX;
      x -= clickNhold_MovingNote.dx;
      var dw = x - clickNhold_MovingNote.x;
      clickNhold_MovingNote.x = x;
      elem.style.left = x + "px";
      elem.style.width = (elem.clientWidth - dw) + "px";
      e.stopPropagation();
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.returnValue = false;
      e.cancelBubble = true;
      return false;
    }
    function noteSizerRight(e)
    {
      if (clickNhold_MovingNote == null)
        return true;
      var x = window.scrollX + e.clientX;
      var w = x - clickNhold_MovingNote.x - 6 /* I don't know */;
      clickNhold_MovingNote.e.style.width = w + "px";
      e.stopPropagation();
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.returnValue = false;
      e.cancelBubble = true;
      return false;
    }
    m.addEventListener("mousedown",
      function(e) {
        if (e.button != 0) // left button
          return;
        if (e.target.id != m.id)
          return;
        clickNhold_MovingNote = note;
        if (clickNhold_MovingNote == null)
          return;
        showMenu(clickNhold_MovingNote.e, 0);
        var elem = clickNhold_MovingNote.e;
        var x = window.scrollX + e.clientX;
        var y = window.scrollY + e.clientY;
        clickNhold_MovingNote.dx = x - clickNhold_MovingNote.x;
        clickNhold_MovingNote.dy = y - clickNhold_MovingNote.y;
        elem.style.opacity = '0.3';
        var offL = e.clientX - elem.offsetLeft;
        var offR = elem.offsetLeft + elem.offsetWidth - e.clientX;
        var bordr = (elem.offsetWidth - elem.clientWidth) / 2;
        if (offL <= bordr) {
          elem.style.borderLeftColor = 'red';
          document.addEventListener("mousemove", noteSizerLeft, true);
        } else if (offR <= bordr) {
          elem.style.borderRightColor = 'red';
          document.addEventListener("mousemove", noteSizerRight, true);
        } else {
          //elem.style.borderColor = 'red';
          if (!elem.style.width)
            elem.style.width = elem.clientWidth + "px";
          document.addEventListener("mousemove", noteMover, true);
        }
        e.stopPropagation();
        if (e.preventDefault) {
          e.preventDefault();
        }
        e.returnValue = false;
        e.cancelBubble = true;
        return false;
      }, true);
    document.addEventListener("mouseup",
      function(e) {
        document.removeEventListener("mousemove", noteMover, true);
        document.removeEventListener("mousemove", noteSizerLeft, true);
        document.removeEventListener("mousemove", noteSizerRight, true);
        if (clickNhold_MovingNote != null) {
          clickNhold_MovingNote.e.style.borderColor = '#ff8787';
          clickNhold_MovingNote.e.style.opacity = '0.85';
          showMenu(clickNhold_MovingNote.e, 1);
        }
        clickNhold_MovingNote = null;
      }, false);
    document.body.appendChild(m);
  }
  function stopMenuTimer()
  {
    if (clickNhold_Timer)
      window.clearTimeout(clickNhold_Timer);
    clickNhold_Timer = null;
  }
  function startMenuTimer(ae)
  {
    var start = false;
    var sel = null;
    var ref = null;
    if (ae.tagName == 'A') {
      start = true;
      sel = ae.textContent;
      ref = ae.href;
    } else {
      sel = window.getSelection();
      if (sel && sel.toString().length) {
        start = true;
      } else { // empty selection
        if (ae.tagName == 'IMG') {
          sel = ae.title;
          ref = ae.src;
          if (!sel || !sel.toString().length)
            sel = ae.alt;
          if (!sel || !sel.toString().length)
            sel = ref;
          start = true;
        }
      }
    }
    if (!start)
      return; //  TODO: default menu?
    clickNhold_Timer = window.setTimeout(
      function() { clickNhold_Timer = null; doMenu(sel, ref); },
      600); /* Time before popup */
  }
  function mouseMoveHandler(e)
  {
    if (clickNhold_Timer)
    {
      stopMenuTimer();
      clickNhold_X = window.scrollX + e.clientX;
      clickNhold_Y = window.scrollY + e.clientY;
      startMenuTimer(clickNhold_LastElement);
    }
  }
  document.addEventListener("mousedown",
    function(e) {
      if (e.button != 0) // left button
        return;
      clickNhold_X = window.scrollX + e.clientX;
      clickNhold_Y = window.scrollY + e.clientY;
      clickNhold_LastElement = e.target;
      startMenuTimer(clickNhold_LastElement);
      document.addEventListener("mousemove", mouseMoveHandler, false);
    }, false);
  document.addEventListener("mouseup",
    function() {
      document.removeEventListener("mousemove", mouseMoveHandler, false);
      stopMenuTimer();
      clickNhold_LastElement = null;
    }, false);
}
)();
// vim: sw=2 et ts=8 si