// ==UserScript==
// @name Yarmap for iframe
// @namespace http://userscripts.org/scripts/show/121421
// @description Remove some blocks from Yarmap.map to use an iframe
// @author theHellDog
// @license MIT
// @version 1.0
// @include http://*.yarmap.*/*
// ==/UserScript==

(function(window, undefined) {
	var w;
	
	if (unsafeWindow != "undefined"){
		w = unsafeWindow;
	} else {
		w = window;	
	}
	if (w.self == w.top){
		return;
	}
  function removeElement(klass_name){
   var targetelement="div"
   var targetattr="class"
   var allsuspects=document.getElementsByTagName(targetelement)
   for (var i=allsuspects.length; i>=0; i--){ 
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(klass_name)!=-1)
     allsuspects[i].parentNode.removeChild(allsuspects[i])
   }
  }
  function removeById(id) {
  var element = document.getElementById(id);
  if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
	if (/yarmap/.test(w.location.href)){
	  var map_elem = document.getElementById("map");
	  var all_elem = document.getElementById("all");
	  document.body.insertBefore(map_elem, document.body.firstChild);
    all_elem.style.cssText="border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; visibility: hidden;";
	  //removeById("osm");
	  //removeById("all");
	  map_elem.style.cssText="width:100%;height:100%;";
	  removeElement("hide_but_hide");
	  removeElement("olControlRadiusItemInactive");
	  removeElement("ym_permlink_blk");
	  removeElement("ts");
	  removeElement("rs");
	}
})(window);
