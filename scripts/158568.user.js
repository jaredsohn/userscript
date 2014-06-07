// ==UserScript==
// @name       Blok mediotiempo
// @namespace  
// @version    0.5
// @description  Para bloquear la publicidad de las paginas de medio tiempo etc
// @match      http://www.mediotiempo.com/*
// @match      http://www.record.com.mx/*
// @match      http://www.bolavip.*/*
// @copyright  2012+, You
// ==/UserScript==
(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,1000);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery); });
  }
  window.setTimeout(GM_wait,5000);//esperamos 5 seg

  function letsJQuery($)
  {
    var objs = $('iframe, object');
    
    Jquery.each(objs, function(){
      if(this.data != null && this.data.indexOf("mediotiempo")>-1){
      	return;
      }
      this.remove();
    });
    console.log("pubs eliminados >>>> " + objs.length);
  }
})();