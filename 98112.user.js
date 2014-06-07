// ==UserScript==
// @name           google-code-rawfile
// @namespace      http://userscripts.org/scripts/show/98112
// @description    get google code revision rawfile-link
// @author         idx (http://userscripts.org/users/idx)
// @include        http://code.google.com/p/*
// @version        0.1
// @timestamp      1298980778837
// ==/UserScript==

(function(){

/*
javascript:window.alert(new Date().getTime());
*/
function init(){

 var tr = $D('.af');
 var td,par,cucok,el,lnk,chref='';
 if(tr){
  for(var i=0; i<tr.length; i++){
   var td=getTag('td', tr[i]);
   if(td) {
    el=$D(".//a[contains(@href, 'diff?')]",tr[i],true);
	if(el) chref = el.href;
    par=td[td.length-1];
	if( cucok=chref.match(/google\.com\/p\/([^\/]+)[^\?]+.spec=svn([^&]+)[^\/]+(\/.+)/i) ){
	  lnk='http://'+cucok[1]+'.googlecode.com/svn-history/r'+cucok[2]+cucok[3];
	  el=createEl('a',{href:lnk,style:'margin-left:25px'},'raw ('+cucok[2]+')');
	  Dom.add(el,par);
	}
   }
  }
 }
}

//=====
// static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function createEl(type, attrArray, html){
 var node = document.createElement(type);
 for (var attr in attrArray) 
   if (attrArray.hasOwnProperty(attr))
    node.setAttribute(attr, attrArray[attr]);
 if(html) node.innerHTML = html;
   return node;
}
function getTag(name, parent){
  var ret = (typeof(parent)!='object' ? document.getElementsByTagName(name) : parent.getElementsByTagName(name) );
  return (isDefined(ret[0]) ? ret : false);
}

// Get Elements
var $D=function (q, root, single) {
  if (root && typeof root == 'string') {
      root = $D(root, null, true);
      if (!root) { return null; }
  }
  if( !q ) return false;
  if ( typeof q == 'object') return q;
  root = root || document;
  if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
      if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
      return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  }
  else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
  else { return root.getElementById( (q[0]=='#' ? q.substr(1):q.substr(0)) ); }
  return root.getElementsByTagName(q);
};
var Dom = {
  g: function(el) {
   if(!el) return false;
   return ( isString(el) ? document.getElementById(el) : el );
  },
  add: function(el, dest) {    
    var el = this.g(el);
    var dest = this.g(dest);
    if(el && dest) dest.appendChild(el);
  }
};


// -----------
init();
// -----------


})()