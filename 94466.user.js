// ==UserScript==
// @name           404chan
// @namespace      http://userscripts.org/users/257845
// @description    redirect with a 3sec countdown back to the parent board
// @include        *boards.4chan.org*
// @include        *images.4chan.org*
// ==/UserScript==
window.location.href="javascript:void(counter=new Object())";
window.location.href="javascript:void(counter.countdown=function(){document.getElementById(\'count\').innerHTML=counter.count;if(counter.count==0)window.location.replace('"+window.location.href.replace(/\w*\/\d*$/,'').replace(/\w*\/\d*\.\w*$/,'').replace(/\w*\/\d*\#\d*$/,'')+"');else counter.count--})";

function takeMeHome(){
	document.getElementsByClassName('boxbar')[0].innerHTML='<h2 style="text-align:center">redirecting back to '+window.location.href.replace(/http\:\/\/boards\.4chan\.org/,'').replace(/http\:\/\/images\.4chan\.org/,'').replace(/\/r.*/,'/').replace(/\/s.*/,'/')+' in <span id="count">3</span></h2>'+document.getElementsByClassName('boxbar')[0].innerHTML;
	window.location.href="javascript:void(counter.count=2)";
	window.location.href="javascript:void(setInterval('counter.countdown()',1000))";
}
if(document.title=='4chan - 404' && (window.location.href.indexOf('res')!=-1||window.location.href.indexOf('src')!=-1))takeMeHome();