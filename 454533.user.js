// ==UserScript==
// @name        GM_storage waster 
// @namespace   trespassersW
// @include *//userscripts.org/scripts/show/454533
// /include file:///E:/RES*
// @version 1
// @created 2014-04-08
// @updated 2014-04-09
// @run-at document-end
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_deleteValue
// @grant GM_listValues
// ==/UserScript==
function mk(p, t, s, h) {
  var e = document.createElement(t);
  if (s) e.style.cssText = s;
  if (h) e.innerHTML = h;
  p.appendChild(e);
  return e
};
//html body div#main-page div#content div.script_summary p
var ps,pt,pd,pi=0,ctr=0,
p= document.querySelector('#content .script_summary > p');
if(p){
ps =mk(p,'span','\
font-weight:bold;color:blue;cursor:pointer;\
display:inline-block;margin:.5em;width:10em;\
border:1px dotted blue;\
','START setValue');
pt =mk(p,'span','\
font-weight:bold;color:green;\
display:inline-block;width:3em;\
text-align:right;\
','0');
pd =mk(p,'span','\
font-weight:bold;color:magenta;;cursor:pointer;\
display:inline-block;margin:.5em;width:6em;\
border:1px dotted magenta;\
','deleteValue');
ps.addEventListener('click',
 function(e){
  if(!pi){
   ps.textContent='STOP setValue';
   pi=setInterval(function(){
    GM_setValue("v","1");
//    GM_setValue("w","2");
    pt.textContent=++ctr;
   },100)
  }else{
   clearInterval(pi),pi=0;
   ps.textContent='START setValue';
  }
 }, false);
pd.addEventListener('click',
 function(e){
   var g=GM_listValues();
   for (var v in g){  
    console.log(g[v]+ ' : '+'"'+v+'"');
    GM_deleteValue(g[v]);
    ctr=0;
   } 
   pt.textContent='0';
}, false);

}//endif p