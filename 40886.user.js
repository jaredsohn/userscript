// ==UserScript==
// @name           Fix links in personalized search
// @namespace      webmonkey
// @description    Fix the javascript handlers that mudge the link's href attributes with redirect urls on mousedown in personalized search. You can copy the link's real address from the context menu with this userscript.
// @include        http://www.google.*/search?*
// ==/UserScript==

var links = $x("//h3//a[@onmousedown]");


for (var i=0; i<links.length; i++) {
  var a = links[i];
  a.addEventListener('mousedown', i_know_how_to_handle, true);
  var onmdown = a.getAttribute('onmousedown');
  if (onmdown && onmdown.length) {
    a.setAttribute('craphandler', onmdown);
    a.setAttribute('properhref', a.getAttribute('href'));
    a.setAttribute('onmousedown', "");
  }
}

delete links;

var rwt = unsafeWindow.rwt; // 
/* eg: window.rwt=function(b,d,e,g,h,f,i){
    var a=encodeURIComponent||escape,
        c=b.href.split("#");
    b.href="/url?sa=t\x26source\x3dweb"+(d?"&oi="+a(d):"")+(e?"&cad="+a(e):"")+"&ct="+a(g)+"&cd="+a(h)+"&url="+a(c[0]).replace(/\+/g,"%2B")+"&ei=NGWBSeTUKY_Q0QWy74FT"+(f?"&usg="+f:"")+i+(c[1]?"#"+c[1]:"");
    b.onmousedown="";
    return true
};
*/

function i_know_how_to_handle(event) {
  var el = event.currentTarget;
  unsafeWindow.console.log(event.wrappedJSObject);
  var fake_el = {href:el.getAttribute('href')};
  var handler = new Function(el.getAttribute('craphandler'));
  handler.apply(fake_el);
  if (event.button==2) {
    el.setAttribute('href', el.getAttribute('properhref'));
  } else {
    el.setAttribute('href', fake_el.href);
  }

  //~ document.location = fake_el.href;
}

////////// utils

function $(id) {
  return document.getElementById(id);
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, 
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
