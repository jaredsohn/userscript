// ==UserScript==
// @name           Facebook Like Button
// @namespace      http://www.facebook.com/home.php?#!/profile.php?id=1475323696
// @description    add Facebook like button on Economist
// @include        http://*economist.com/*
// @include        http://www.youtube.com/*
// ==/UserScript==

// ver 0.1.2 @ 2010-09-12
// changed using more simple interface
// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html


(function(){

     var SITEINFO = {
	 "Youtube" : "watch-headline",
	 "Economist" : "headline"
     };

     function FBLK(site){
	 this.insertafter = SITEINFO[site];
     }

     FBLK.prototype.addButton = function(d){
	 var url = location.href;
	 
	 var f = document.createElement('iframe');
	 f.setAttribute("src",
			"http://www.facebook.com/plugins/like.php?href=" +
			encodeURIComponent(url) +
			"&amp;layout=button_count&amp;" +
			"show_faces=false&amp;width=300&amp;" +
			"action=like&amp;font=arial&amp;" +
			"colorscheme=light&amp;height=25");
	 f.setAttribute("scrolling", "no");
	 f.setAttribute("frameborder", "0");
	 f.style.border = "medium none";
	 f.style.overflow = "hidden";
	 f.style.width = "300px";
	 f.style.height = "25px";
	 f.setAttribute("allowTransparency", "true");
	 
	 d.appendChild(f);
     };

     if(location.href.match(/http:\/\/www\.youtube\.com\/*/)){
	 var fblk = new FBLK("Youtube");
	 fblk.addButton(document.getElementById(fblk.insertafter));
     }else{
	 var fblk = new FBLK("Economist");
	 fblk.addButton(document.getElementsByClassName(fblk.insertafter).item(0));
     }
			
 })();


