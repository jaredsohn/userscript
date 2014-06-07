// ==UserScript==
// @name           4Shared.com
// @namespace      4Shared.com
// @include        *4shared.com/get/*
// ==/UserScript==
clearTimeout("fcwait()");
var c = 0;
fcwait = function(){
  if(document.getElementById("divDLWait")==null || document.getElementById("divDLStart")==null){
    setTimeout("fcwait()", 1000);
    return;
  }
  if (c > 0) {
     var el = document.getElementById("downloadDelayTimeSec");
        if( el ){
           el.innerHTML = "" + c;
        }
        c = c - 1;
        setTimeout("fcwait()", 1000);
  }
  else {
     document.getElementById("divDLWait").style.display = 'none';
     document.getElementById("divDLStart").style.display = 'block';
  }
}
fcwait();
document.title = 'Wait Interval Hijacked by Uwa Semar '+document.title;