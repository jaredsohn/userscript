// ==UserScript==
// @name   Teste
// @namespace  
// @description Teste
// @include  https://wwwss.bradesco.com.br/*
// ==/UserScript==

// go jQuery, go!
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
  var pree = $('pre hr:eq(2)').next('b').parent();

var linhas = pree.html().split('\n');

console.log(pree);

var newlinhas = Array();

$.each(linhas,function(a,b){

var data = b.substr(0,"DD/MM".length);

newlinhas[a] = b;

if (data.indexOf('/') > -1){
    //console.log(data)
   newlinhas[a] = b.replace(data,'22/22');
}
console.log(b)

})

  console.log(newlinhas[3]);

//pree.html(newlinhas.join('\n'));
/*
^((\d*\/\d*)).(.{24}).(.{7}).{25}.(\d*\,\d*)



^(\d*\/\d*).(.{25})(\d*)\s*(\d*\,\d*)\s*(<b>\d*\,\d*</b>)


^(<b>)?(.{5}).((.{26})(\d*)\s*(\d*\,\d*)|.*(?=\n))(\s*(<b>\d*\,\d*</b>))?
*/


}
