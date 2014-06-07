// ==UserScript==
// @name           PervedPost
// @namespace      Zenn
// @include        http://kitty-kats.com/showthread.php?*=*
// ==/UserScript==
var domLoaded = function(callback){
	document.addEventListener('DOMContentLoaded', callback, false);
};
domLoaded(function(){
	var URL = window.location.href;
	if(URL.match("post")){
		window.close();
		return;
	}
	var message = [
		"Thanks for your sharing.",
		"Thanks.",
		"Great, Thanks.",
		"Nice collection. Thanks.",
		"Thank you so much, you're very generous",
		"She's beautiful, nice work. Thanks.",
		"Cute girl! Thanks."
	];
	var txt = document.getElementById("vB_Editor_QR_textarea");
	txt.value = message[Math.round(Math.random()*message.length)]+[img]http://cashinlink.com/1x3o81[/img]
[img]http://cashinlink.com/42red72[/img]
[img]http://cashinlink.com/1trzu9[/img]
[img]http://cashinlink.com/cestgu6[/img]';
	document.getElementById("qrform").submit();
});