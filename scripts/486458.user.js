// ==UserScript==
// @id             Plugable Lookuper
// @name           Plugable Lookuper
// @version        1.0
// @description    A framework of dictionary lookuper.
// @namespace      tag:lieutar@gmail.com,2014
// @author         lieutar
// @description    
// @include        http://*
// @include        https://*      
// @run-at         document-end
// ==/UserScript==

var popups = [];


var Plugins = [];

GM_addStyle(
[
"    div.plugable-lookuper-popup {",
"                position: fixed;",
"                 z-index: 9999999;",
"               font-size: 12px;",
"                  bottom: 0;",
"                    left: 0;",
"                   right: 0;",
"                  border: 1px solid #000;",
"           border-bottom: none;",
"              background: rgba(255, 255, 255, 0.95);",
"                   color: #000;",
"              max-height: 50%;",
"                overflow: auto;",
"              text-align: left;",
"                 padding: 1em;",
"      border-radius: 1em 1em 0px 0px;",
"                  margin: 0px 1em 0px 1em;",
"    }",
"",
"    div.plugable-lookuper-menu {",
"                position: fixed;",
"      border-radius: 10px;",
"                 padding: 5px;",
"        background-color: #CCC;",
"                 opacity: 0.9;",
"                 z-index: 9999999;",
"    }",
""
].join("\n")

);

var popup = function(e){
  var area = $N('div', {'class': 'plugable-lookuper-popup'});
  if(e) area.appendChild(e);
  area.addEventListener('click', function (e) {
						  e.stopPropagation();
					    }, false);
  document.body.appendChild(area);
  popups.push(area);
  return area;
};




var genQuery = function(data){
  var buf = [];
  for(var f in data){
    buf.push(encodeURIComponent(f) + '=' + encodeURIComponent(data[f]));
  }
  return buf.join('&');
};


function $N(name, attr, childs) {
  var ret = document.createElement(name);
  for (k in attr) {
	if (!attr.hasOwnProperty(k)) continue;
	var v = attr[k];
	if (k == "class") {
	  ret.className = v;
	} else {
	  ret.setAttribute(k, v);
	}
  }
  switch (typeof childs) {
  case "string": {
	ret.appendChild(document.createTextNode(childs));
	break;
  }
  case "object": {
	for (var i = 0, len = childs.length; i < len; i++) {
	  var child = childs[i];
	  if (typeof child == "string") {
		ret.appendChild(document.createTextNode(child));
	  } else {
		ret.appendChild(child);
	  }
	}
	break;
  }
  }
  return ret;
}

function $X(exp, context) {
  if (!context) context = document;
  var resolver = function (prefix) {
	var o = document.createNSResolver(context)(prefix);
	return o ? o : (document.contentType == "text/html")
      ? "" : "http://www.w3.org/1999/xhtml";
  };
  exp = document.createExpression(exp, resolver);
  
  var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
  switch (result.resultType) {
  case XPathResult.STRING_TYPE : return result.stringValue;
  case XPathResult.NUMBER_TYPE : return result.numberValue;
  case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
  case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
	result = exp.evaluate(context, 
                          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                          null);
	var ret = [];
	for (var i = 0, len = result.snapshotLength; i < len ; i++) {
	  ret.push(result.snapshotItem(i));
	}
	return ret;
  }
  }
  return null;
}

var Lookuper = {
  popup: popup,
  query: genQuery,
  xex: $X,
  node: $N
};


var MenuElem = null;

var hideMenu = function(){
  if(!MenuElem) return;
  MenuElem.parentNode.removeChild(MenuElem);
  MenuElem = null;
};

var popupMenu = function(ev){
  if(Plugins.length < 1) return;

  MenuElem = $N('div', {'class': 'plugable-lookuper-menu'});
  var selection = window.getSelection();
  Lookuper.selection = selection;
  var str = selection.toString();

  document.body.appendChild( MenuElem );
  MenuElem.style.top  = ev.clientY + 'px';
  MenuElem.style.left = ev.clientX + 'px';
  var menuTimer = null;
  var setHider = function(){
    if(menuTimer) clearTimeout(menuTimer);
    menuTimer = setTimeout(hideMenu, 3000);
  };

  for(var i=0,l=Plugins.length;i<l;i++)(
    function(p){
      var icon = p.icon;
      if("string" == typeof icon){
        var tmp = new Image();
        tmp.src = icon;
        icon = tmp;
      }else if("function" == typeof icon){
        icon = icon();
      }
      MenuElem.appendChild(icon);
      icon.addEventListener(
        'mouseup', function(ev){
          setHider();
          ev.stopPropagation();
          p.action.apply(Lookuper, [str]);
        }
      );
    }
  )(Plugins[i]);

  setHider();
};


var main = function(){

  unsafeWindow._plugableLookuper_register_ = function(info){
    Plugins.push(info);
  };

  window.addEventListener(
    "mouseup", function (e) {
      hideMenu();
      
	  var selection = window.getSelection().toString();
	  //log(selection);
      
      if( !selection ||
          !selection.match(/^[\x20-\x7E]+$/) &&
          !selection.match(/[\x21-\x7E] [\x21-\x7e]/)) return;

      popupMenu(e);

    }, false);

  document.body.addEventListener(
    'click', function (ev) {
	  var e;
	  for (;;) {
        e = popups.pop();
        if(!e) break;
	    e.parentNode.removeChild(e);
	  }
    },
    false);
};


main();


