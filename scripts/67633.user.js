// ==UserScript==
// @name           pstar.com
// @namespace      pstar.com
// @include        http://*pornstar.com/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
   if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
   else { $ = unsafeWindow.jQuery; jq(); }
}
GM_wait();

function jq() {
      $.each($("img[name^=photo]"),function(){
      var asrc=$(this).attr("src").split("/");
      var n=asrc[5];var i=asrc[7];
      var nr=asrc[8].split("_")[1];
      var lbr=i.length<4?'1500':'2048';   
      i=i.length<4?n+i:i;
      var as=$(this).parents("table").find("a[href='javascript:noDownloads()']");
      $(as[0]).attr('href','http://pornstar.com/members/download/streams/'+n+'/768_'+i+'_'+nr+'.wmv');
      $(as[1]).attr('href','http://pornstar.com/members/download/movies/'+n+'/'+lbr+'_'+i+'_'+nr+'.wmv');
   });
}