// ==UserScript==
// @name          RelatedEntry
// @namespace     http://zeromemory.sblo.jp/article/3073707.html
// @description   show related entry for the pages from HATENA.
// @include       http://*
// @exclude       http://*.google.*
// @exclude       http://*.yahoo.*
// @exclude       http://b.hatena.ne.jp/*
// @version       0.2.0
// @author        suVene
// ==/UserScript==
// Copyright(c) 2007 suVene
// freely distributable under the terms of an MIT-style license.
// http://www.opensource.jp/licenses/mit-license.html

function debug(aMsg) {
  // uncomment for debugging messages
  // GM_log(aMsg);
}

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

addGlobalStyle(
    '.relatedEntry { position: fixed; width: 333px; height: 10px; right: 0px; top: 0px; z-index:1999px; font: normal normal normal 10pt arial; }' +
    '.relatedEntrytitle { background:#EE1233; cursor:move; color:white; padding: 2px; font-weight: bold; text-align: left; }' +
    '.relatedEntrytitle a { color:#cccccc; text-decoration: none; }' +
    '.relatedEntryinner { border:1px solid #06060a; padding: 2px; background:#ffffff;  text-align: left; opacity:0.85; }' +
    '.relatedEntryinnerTitle {  color: black; font-weight: bold; }' +
    '.relatedEntryinner ul { list-style-type: disc ; margin-left: 1px; padding-left: 15px}' +
    '.relatedEntryinner li { margin-top: 1px; margin-bottom: 1px; margin-left: 1px; color: gray;  }' +
    '.relatedEntryinner a:link {  color: #0000DD;   }' +
    '.relatedEntryinner a:visited {  color: #AF00AF;  }' +
    '.relatedEntryinner a:hover {  background-color: #f4dc8d;}'
);


function getElementText(node) {
  return node.firstChild.nodeValue;
}

(function() {
  // Shortcut key
  // C -- control
  // S -- shift
  // A -- alt
  var BIND_KEY = 'A-r';
  var Drag = function(){ this.init.apply( this, arguments ); };

  Drag.fixE = function( e ) {
    if( typeof e == 'undefined' ) e = window.event;
    if( typeof e.layerX == 'undefined' ) e.layerX = e.offsetX;
    if( typeof e.layerY == 'undefined' ) e.layerY = e.offsetY;
    return e;
 };

  Drag.prototype.init = function( handle, dragdiv ) {
    this.div = dragdiv || handle;
    this.handle = handle;
    if( isNaN(parseInt(this.div.style.left)) ) this.div.style.left  = this.div.offsetLeft + 'px';
    if( isNaN(parseInt(this.div.style.top)) ) this.div.style.top = this.div.offsetTop + 'px';
    this.onDragStart = function(){};
    this.onDragEnd = function(){};
    this.onDrag = function(){};
    this.onClick = function(){};
    this.mouseDown = addEventHandler(this.handle, 'mousedown', this.start, this);
  };

  Drag.prototype.start = function(e) {
    e = Drag.fixE(e);
    this.started = new Date();
    var y = this.startY = parseInt(this.div.style.top);
    var x = this.startX = parseInt(this.div.style.left);
    this.onDragStart(x, y);
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    this.documentMove = addEventHandler(document, 'mousemove', this.drag, this);
    this.documentStop = addEventHandler(document, 'mouseup', this.end, this);
    if (e.preventDefault) e.preventDefault();
    return false;
  };

  Drag.prototype.drag = function( e ) {
    e = Drag.fixE(e);
    var ey = e.clientY;
    var ex = e.clientX;
    var y = parseInt(this.div.style.top);
    var x = parseInt(this.div.style.left);
    var nx = ex + x - this.lastMouseX;
    var ny = ey + y - this.lastMouseY;
    this.div.style.left = nx + 'px';
    this.div.style.top  = ny + 'px';
    this.lastMouseX = ex;
    this.lastMouseY = ey;
    this.onDrag(nx, ny);
    if (e.preventDefault) {
     e.preventDefault();
    }
    return false;
  };

  Drag.prototype.end = function() {
    removeEventHandler( document, 'mousemove', this.documentMove );
    removeEventHandler( document, 'mouseup', this.documentStop );
    var time = (new Date()) - this.started;
    var x = parseInt(this.div.style.left),  dx = x - this.startX;
    var y = parseInt(this.div.style.top), dy = y - this.startY;
    this.onDragEnd( x, y, dx, dy, time );
    if ((dx*dx + dy*dy) < (4*4) && time < 1e3) {
      this.onClick( x, y, dx, dy, time );
    }
  };

  function removeEventHandler( target, eventName, eventHandler ) {
    if (target.addEventListener) {
      target.removeEventListener( eventName, eventHandler, true );
    } else if (target.attachEvent) {
      target.detachEvent( 'on' + eventName, eventHandler );
    }
  }

  function addEventHandler( target, eventName, eventHandler, scope ) {
    var f = scope ? function(){ eventHandler.apply( scope, arguments ); } : eventHandler;
    if (target.addEventListener) {
      target.addEventListener( eventName, f, true );
    } else if (target.attachEvent) {
      target.attachEvent( 'on' + eventName, f );
    }
    return f;
  }

  function makeQueryUrl(pageUrl) {
    return 'http://b.hatena.ne.jp/entry/' + encodeURI(pageUrl).replace(/#/, '%23');
  }

  function makeMoreUrl(pageUrl) {
    return 'http://search.yahoo.com/search?p='
      + encodeURI("link:")
      + encodeURI(pageUrl);
  }

  var propVisible = GM_getValue('RelatedEntryVisible', true);
  var open = GM_getValue('RelatedEntryOpen', true);
  /* debug(
      'propVisible: ' + propVisible + '\n'
    + 'open: ' + open
  ); */
  var openCloseHandler = function() {
    open = !open;
    GM_setValue('RelatedEntryOpen', open);
    opencloseUpdate();
    if (open && !loaded & !loading) {
      doLookup();
    }
  }

  var closedivHandler = function() {
    visible(false);
  }

 var divStyled;
  var linkWindow = null;
  var openclose;

  opencloseUpdate = function() {
    if (open) {
      openclose.innerHTML = '-';
      divStyled.style.visibility = "visible";
    }
    else {
      openclose.innerHTML = '+';
      divStyled.style.visibility = "hidden";
    }
  }

  onTop = function() {
    return (top == window);
  }

  makeWindow = function() {
    if (linkWindow == null) {
      var pageUrl = document.location.href;
      var query = makeQueryUrl(pageUrl);
      var body = document.getElementsByTagName('body')[0];
      var div = document.createElement('div');
      div.setAttribute('id', 'RelatedEntry');
      div.setAttribute('class', 'relatedEntry');
      div.style.display = propVisible ? 'block' : 'none';
      var title = document.createElement('div');
      title.setAttribute('class', 'relatedEntrytitle');
      insertText(title, 'RelatedEntry ');
      //insertLinkAny(title, query, '\u2191B');
      insertText(title, ' ');
      insertImgLink(title, 'http://b.hatena.ne.jp/entry/image/normal/' + pageUrl.replace(/#/, '%23'), query);
      div.appendChild(title);

      divStyled=document.createElement('div');
      divStyled.setAttribute('class','relatedEntryinner');

      div.appendChild(divStyled);

      var naviStyle = 'position: absolute; top: 4px; cursor: pointer; background-color: #FA922A; border: 1px; border-style: solid; border-color: #FA452A; text-align: center; width: 14px; height: 14px; font-size:9pt;';
      openclose = document.createElement('div');
      openclose.setAttribute('style', naviStyle + 'right: 20px;');
      openclose.addEventListener('click', openCloseHandler, true);
      opencloseUpdate();
      title.appendChild(openclose);

      closediv = document.createElement('div');
      closediv.setAttribute('style', naviStyle + 'right: 4px;');
      closediv.addEventListener('click', closedivHandler, true);
      closediv.innerHTML = '\u00D7';
      title.appendChild(closediv);

      body.appendChild(div);
      // visible(propVisible);

      title.drag = new Drag(title, div);

      var ul = document.createElement('ul');
      divStyled.appendChild(ul);
      linkWindow = ul;
    }
    return linkWindow;
  }

  visible = function(flg) {
    var el = document.getElementById('RelatedEntry');
    if (el) {
      GM_setValue('RelatedEntryVisible', flg);
      if (flg) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    }
  }

  visibleToggle = function() {
    var el = document.getElementById('RelatedEntry');
    if (el.style.display == "block") {
      visible(false);
    } else {
      visible(true);
    }
  }
  insertLi = function(html) {
    var container = makeWindow();
    var li = document.createElement('li');
    li.innerHTML = html;
    container.appendChild(li);
  }

  insertDiv = function(container, text, clazz) {
    var div = document.createElement('div');
    if (clazz) {
      div.setAttribute('class', clazz);
    }
    insertText(div, text);
    container.appendChild(div);
  }

  insertLink = function(url, title) {
    var container = makeWindow();
    var li = document.createElement('li');
    container.appendChild(li);
    insertLinkAny(li, url, title);
  }

  insertLinkAny = function(container, url, title) {
    var link = document.createElement('a');
    link.setAttribute('href', url);
    insertText(link, title);
    container.appendChild(link);
  }

  insertImgLink = function(container, imgUrl, linkUrl) {
    var link = document.createElement('a');
    link.setAttribute('href', linkUrl);
    var img = document.createElement('img');
    img.setAttribute('src', imgUrl);
    img.setAttribute('align', 'absmiddle');
    img.setAttribute('border', '0');
    link.appendChild(img);
    container.appendChild(link);
  }

  insertEndMatter = function(pageUrl, container) {
  }

  insertText = function(container, text) {
    var node = document.createTextNode(unescapeHTML(text));
    container.appendChild(node);
  }

  // borrowed from Prototype
  unescapeHTML = function(text) {
    var div = document.createElement('div');
    div.innerHTML = text;
    return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
  }

  var loaded = false;
  var loading = false;
  var exists = false;
  var relatedTitle = [
    '\u3053\u306E\u30A8\u30F3\u30C8\u30EA\u30FC\u3092\u542B\u3080\u307B\u304B\u306E\u30A8\u30F3\u30C8\u30EA\u30FC',
    '\u3053\u306E\u30A8\u30F3\u30C8\u30EA\u30FC\u3092\u542B\u3080\u65E5\u8A18'
  ];
  var relatedStr = [
    '\u3053\u306E\u30A8\u30F3\u30C8\u30EA\u30FC\u3092\u542B\u3080\u307B\u304B\u306E\u30A8\u30F3\u30C8\u30EA\u30FC.*</div>((\n|\r|.)*?)</div>',
    '\u3053\u306E\u30A8\u30F3\u30C8\u30EA\u30FC\u3092\u542B\u3080\u65E5\u8A18.*</div>((\n|\r|.)*?)</div>'
  ];
  doLookup = function () {
    loading = true;
    var pageUrl = document.location.href;
    var query = makeQueryUrl(pageUrl);
    GM_xmlhttpRequest({
      method : 'GET',
      url : query,
      onload : function(response) {
        var container = makeWindow();
        var r = response.responseText;
        var links = new RegExp('<a href="(.*)">(.*?)</a>', 'mg');
        for (var i = 0; i < relatedStr.length; i++) {
          var s = relatedStr[i];
          if (!r.match(new RegExp(s, 'mg'))) {
            continue;
          }
          var t = relatedTitle[i];
          var ul = RegExp.$1;
          var items = ul.match(links);
          if (items) {
            insertDiv(container, t, 'relatedEntryinnerTitle');
            items.forEach(function(li, idx) {
              li = li.replace('href="/entry/', 'href="http://b.hatena.ne.jp/entry/');
              insertLi(li);
            });
          }
          exists = true;
        }
        insertEndMatter(pageUrl, divStyled);
        loading = false;
        loaded = true;
      }
    });
  }

 if (onTop()) {
    makeWindow();
    if (open) {
      doLookup();
    }
  }

  var skipEl = {'input': true, 'button': true, 'select': true, 'textarea': true, 'password': true};
  window.addEventListener('keypress', function(e) {
    if (skipEl[e.target.tagName.toLowerCase()]) {return;}
    var key = ''
      + ((e.ctrlKey)  ? 'C' : '')
        + ((e.shiftKey) ? 'S' : '')
          + ((e.altKey || e.metaKey)   ? 'A' : '')
            + '-';
    if(typeof unsafeWindow != 'undefined'){
        key += String.fromCharCode(e.charCode).toLowerCase();
    } else {
        key += String.fromCharCode(e.keyCode).toLowerCase();
    }
    if (key == BIND_KEY){
       visibleToggle();
    }
  }, false);

}
)();
