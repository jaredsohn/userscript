// ==UserScript==
// @name           CSFD obrazky hercu
// @namespace      none
// @description    Zobrazi obrazek po najeti na jmeno
// @include        http://*.csfd.cz/*
// ==/UserScript==

function jQueryIsReady($) {
  
  $("a").mouseover(function(e) {
    if (this.href.search("http://www.csfd.cz/herec/") === 0)
    {
       var id = this.href.replace("http://www.csfd.cz/herec/", "");
       if (id.indexOf("-") > 0)
        id = id.substring(0, id.indexOf("-"));
       else if (id.indexOf("/") > 0)
        id = id.substring(0, id.indexOf("/"));
       var imgUrl = "http://img.csfd.cz/photos/herci/"+id+".jpg";
       $("#hlavni_tabulka").append('<div id="fotka_herce" style="position: absolute; top: '+(e.pageY+20)+'px; left: '+e.pageX+'px;"><img src="'+imgUrl+'" /></div>');
    }
    else if (this.href.search("http://www.csfd.cz/reziser/") === 0)
    {
       var id = this.href.replace("http://www.csfd.cz/reziser/", "");
       if (id.indexOf("-") > 0)
        id = id.substring(0, id.indexOf("-"));
       else if (id.indexOf("/") > 0)
        id = id.substring(0, id.indexOf("/"));
       var imgUrl = "http://img.csfd.cz/photos/herci/"+id+".jpg";
       $("#hlavni_tabulka").append('<div id="fotka_herce" style="position: absolute; top: '+(e.pageY+20)+'px; left: '+e.pageX+'px;"><img src="'+imgUrl+'" /></div>');
    }
  });
  
  $("a").mouseout(function() {
    $("#fotka_herce").remove();
  });
}


// ----------------------------------------------------------------------
// jQuery
// ----------------------------------------------------------------------

var script = document.createElement('script');
script.src = 'http://jquery.com/src/jquery-latest.js';
script.type = 'text/javascript';
script.addEventListener("load", function() {
  jQueryIsReady(unsafeWindow.jQuery);
}, false);
document.getElementsByTagName('head')[0].appendChild(script);