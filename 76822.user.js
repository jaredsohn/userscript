// ==UserScript==
// @name        Always show Google Universal Search & Search Options panel
// @include     http://www.google.com/search*
// @include     http://www.google.com/webhp*
// @include     http://www.google.com/images*
// @include     http://www.google.*/search*
// @include     http://www.google.*/webhp*
// @include     http://www.google.*/images*
// @include     https://www.google.com/search*
// @include     https://www.google.com/webhp*
// @include     https://www.google.com/images*
// @include     https://www.google.*/search*
// @include     https://www.google.*/webhp*
// @include     https://www.google.*/images*
// @include     https://*.google.com/search*
// @include     https://*.google.com/webhp*
// @include     https://*.google.com/images*
// ==/UserScript==

function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();';}
  var script = document.createElement('script');
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(function(){
  (function(){
      var f=function(){
          if(!google || google.srp == undefined || google.srp.toggleModes == undefined || !document.getElementById("ms"))
window.setTimeout(f, 100);
          else {
               if(document.getElementById("ms").className!="open")google.x("msm", google.srp.toggleModes);
if(!/\btbo\b/.test(document.body.className))google.x(document.getElementById("tbpi"),function(){return google.Toolbelt.togglePromotedTools(document.getElementById("tbpi"))});
          }
        
     };
     f();
 })();
});