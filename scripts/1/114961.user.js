// ==UserScript==
// @name           MouseHunt - Trophy Share Button AutoClick
// @include        *www.mousehuntgame.com/*
// @include		   *apps.facebook.com/mousehunt/*
// ==/UserScript==

String.prototype.find = function(s) {
	return (this.indexOf(s) != -1);
};
	
var getClass = function(clssName, rootNode /*optional root node to start search from*/){

  var root = rootNode || document,
      clssEls = [],
      elems,
      clssReg = new RegExp("\\b"+clssName+"\\b");

  // use the built in getElementsByClassName if available
  if (document.getElementsByClassName){
    return root.getElementsByClassName(clssName);
  }
  
  // otherwise loop through all(*) nodes and add matches to clssEls
  elems = root.getElementsByTagName('*');
  for (var i = 0, len = elems.length; i < len; i+=1){
    if (clssReg.test(elems[i].className)) clssEls.push(elems[i])
  }

  return clssEls;
  
};

function click(e) {
	if(!e && typeof e=='string') e=document.getElementById(e);
	if(!e) return;
	var evObj = e.ownerDocument.createEvent('MouseEvents');
	evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
	e.dispatchEvent(evObj);
	evObj=null;
};

function checkforshare() {
	var doc=document.documentElement
	var html=doc.innerHTML
	var link = getClass('shareButton shareArrow closeArrow');
	if (link[0] != null) click(link[0]);
}

window.setInterval(checkforshare,5000);