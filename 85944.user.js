// ==UserScript==
// @name           Facebook Poke All
// @namespace      sizzlemctwizzle
// @description    Adds a button on the homepage to poke everyone who has poked you
// @require        http://userscripts.org/scripts/source/84596.user.js?
// @include        http://*.facebook.com/*
// ==/UserScript==

function forEach(lst, cb) {
    if(!lst) 
        return;
    if (lst.snapshotItem)
        for (var i = 0, len = lst.snapshotLength; i < len; ++i)
            cb(lst.snapshotItem(i), i, lst);
    else if (lst.iterateNext) {
        var item, next = lst.iterateNext;
        while (item = next()) 
            cb(item, lst);
    } else if (typeof lst.length !== 'undefined') 
        for (var i = 0, len = lst.length; i < len; ++i)
            cb(lst[i], i, lst);
    else if (typeof lst === "object")
        for (var i in lst) 
            cb(lst[i], i, lst);
}

function create() {
    switch(arguments.length) {
        case 1:
            var A = document.createTextNode(arguments[0]);
	    break;
        default:
            var A = document.createElement(arguments[0]),
                B = arguments[1];
            for (var b in B) {
	        if (b.indexOf("on") == 0)
		    A.addEventListener(b.substring(2), B[b], false);
		else if (",style,accesskey,id,name,src,href,which".indexOf("," +
                         b.toLowerCase()) != -1)
		    A.setAttribute(b, B[b]);
		else
		    A[b] = B[b];
            }
            for(var i = 2, len = arguments.length; i < len; ++i)
	        A.appendChild(arguments[i]);
    }
    return A;
}

function $x(x, t, r) {
    if (t && t.nodeType) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case 1:
        p = 'numberValue';
        break;
    case 2:
        p = 'stringValue';
        break;
    case 3:
        p = 'booleanValue';
        break;
    case 8: case 9:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || 6, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}

// Optional shortcut functions I like
function $x1(x, r) { return $x(x, 9, r) }
function $xb(x, r) { return $x(x, 3, r) }

function $(element) { return document.getElementById(element); }

function xhr(url, cb, data) {
  var res =  new XMLHttpRequest();
  res.onreadystatechange = function() { if (res.readyState==4 && res.status==200) cb(res.responseText) };
  res.open(data ? 'POST' : 'GET', url, true);
  res.setRequestHeader('User-agent', window.navigator.userAgent);
  if (data) {
    res.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    res.setRequestHeader("Connection", "close");
    res.setRequestHeader("Content-length", data.length);
  }
  res.send(data||null);
}

// Simulate Facebook's Ajax calls
function fbAjax(url, params) {
  xhr(url, function() {}, params + "&post_form_id=" + unsafeWindow.Env["post_form_id"] + 
      "&__a=1&post_form_id_source=AsyncRequest&fb_dtsg=" + unsafeWindow.Env["fb_dtsg"] + 
      "&nctr[nid]=" + unsafeWindow.Env["nctrlid"] + '&nctr[ct]=' + unsafeWindow.Env["start"]);
}

function process() {
  var content;
  (content=($('contentArea')||$('content'))).removeEventListener('DOMNodeInserted', process, false);
  if (!$('poke_all_btn') && $xb('//div[contains(@class, "pokes")]')) addPokeBtn();
  content.addEventListener('DOMNodeInserted', process, false);
}

if (self.location == top.location)
    var checker=setInterval(function(){
        if ($('content')) {
          clearInterval(checker);
          process();
        }
      }, 200);

function addPokeBtn() {
  // Begin of the actual script
  var container = $x1('//div[contains(@class, "pokes")]');
    if (pokes) {
      var pokes = $x('.//a[starts-with(@id, "poke_")]', container);
      if (pokes.snapshotLength > 0)
        container.appendChild(create('div', { className: 'ci_submit_button' }, 
          create('input', { id: 'poke_all_btn', type: 'button', value: 'Poke All', 
            onclick: function() {
              forEach(pokes, function(link) {
                fbAjax('http://www.facebook.com/ajax/poke.php?__a=1', 'uid=' +
                       link.id.split('poke_')[1] +
                       '&pokeback=1' +
                       '&opp=' +
                       '&pk01=Poke' +
                       '__d=1');
              });
        }})));
    }
}