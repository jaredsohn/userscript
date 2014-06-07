// ==UserScript==
// @name BigmirShitRemoval
// @description Remove any shit as SKITTLES from Bigmir.net
// @author theHellDog
// @license MIT
// @version 1.0
// @include http://bigmir.net/*
// @include http://www.bigmir.net/*
// ==/UserScript==

(function(window, undefined ) {
	var w;
	if (unsafeWindow != "undefined"){
		w = unsafeWindow 
	} else {
		w = window;	
	}
	if (w.self != w.top){
		return;
	}
	function removecssfile(filename){
   var targetelement="link"
   var targetattr="href"
   var allsuspects=document.getElementsByTagName(targetelement)
   for (var i=allsuspects.length; i>=0; i--){ 
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
     allsuspects[i].parentNode.removeChild(allsuspects[i])
   }
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
	if (/bigmir\.net/.test(w.location.href)){
	  removeElement("skittles_box");
		removecssfile("skittles.css")
	}
})(window);
