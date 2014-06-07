// ==UserScript==
// @name           facebook ego_pane remove
// @namespace      http://d.hatena.ne.jp/tanku/
// @include        http://www.facebook.com/*
// ==/UserScript==

(function(){
	var f=function(idname){
		var e=document.getElementById(idname);
		if(e){e.parentNode.removeChild(e);}
	}
	f('pagelet_ego_pane');
	f('pagelet_ego_pane_w');
}())