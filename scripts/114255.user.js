// ==UserScript==
// @name freeAntiblock
// @description This makes the use of antiblock.ru free for ever.
// @author Evengard
// @license GPL
// @version 2.5
// ==/UserScript==

(function(window, undefined ) {

  var w;
  if (typeof unsafeWindow != undefined){
    w = unsafeWindow 
  } else {
    w = window;  
  }
   if (w.self != w.top){
    return;
  }

  if (/antiblock.ru/.test(w.location.href)){
	var popup=document.getElementsByName("proxy_buy_now_popup");
	for(i=popup.length-1;i>=0;i--)
	{
		popup[i].parentNode.removeChild(popup[i]);
	}
	var adv=document.getElementsByName("proxy_adv");
	for(i=adv.length-1;i>=0;i--)
	{
		adv[i].parentNode.removeChild(adv[i]);
	}
  }
})(window);