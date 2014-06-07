// ==UserScript==
// @name         tourette
// @namespace     http://www.webmonkey.com
// @description   tourette sur les mails, blogs et forums
// @namespace     http://www.webmonkey.com
// @include       /https?:\/\/(.*?\.)?.*(mail).*/
// @include       /https?:\/\/(.*?\.)?.*(forum).*/
// @include       /https?:\/\/(.*?\.)?.*(blog).*/
// ==/UserScript==


var bw = ['vilain','méchant','filou'];
var elems = document.getElementsByTagName('input');
for (var i=0; i < elems.length; i++) {
	elems[i].addEventListener('keypress',function(e){
		if(e.charCode==32){
			var alea=Math.random()*2;
			if (alea<1){
				var rand = Math.floor(Math.random()*bw.length)
				var word = bw[rand];
				this.value = this.value+' '+word
			}
		}
	});
};