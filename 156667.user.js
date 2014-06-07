// ==UserScript==
// @name       mrtzcmp3 download junkbuster
// @version    0.1
// @description  unchecks download-checkbox to prevent loading junk
// @match      http://mrtzcmp3.net/D?*
// @copyright  2013, Hooddominator
// ==/UserScript==

var load,execute,loadAndExecute;
load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
loadAndExecute("//code.jquery.com/jquery-1.7.2.min.js", function() {
  $( "input[type=\"checkbox\"]" ).click();
});