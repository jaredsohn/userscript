// ==UserScript==
// @name           eol_facebook
// @include       http://www.elotrolado.net/*
// @version        0.0.1
// @description    eol_facebook
// @namespace      http://elotrolado.net/
// @author         e3skudo
// ==/UserScript==
var url = window.location.href;
var a = document.getElementById('bignews');
if (a==undefined){
	var a = document.getElementById('rightcontent');
}
a.innerHTML='<iframe src="http://www.facebook.com/plugins/like.php?href='+url+'&amp;layout=box_count&amp;show_faces=true&amp;width=450&amp;action=recommend&amp;font=arial&amp;colorscheme=light&amp;height=65" scrolling="no" frameborder="0" style="border:none; float:right; overflow:hidden; width:100px; height:65px; margin-bottom:-35px; z-index:-1;" allowTransparency="true"></iframe>'+a.innerHTML;
