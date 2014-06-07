// ==UserScript==
// @name        bug986886 test case
// @namespace   trespassersW
// @description bug986886 test case
// @include */bug986886.*
// @version 1
// @created 2014-03-24
// @updated 2014-03-24
// @run-at document-end
// @grant GM_log
// ==/UserScript==
//https://bugzilla.mozilla.org/show_bug.cgi?id=986886
function $(I){return document.getElementById(I);}
if($('bz986886')){
$('gs').textContent='RUN';
$('gs').className='y';
var C=0;
$('gclik').addEventListener('click',
function(e){
$('gclik').textContent='clicked['+ ++C +']';
$('gclik').className='y';
},false)
var T=0;
setInterval(
function(e){
$('gtime').textContent=++T;
$('gtime').className='y';
}, 1000)
}