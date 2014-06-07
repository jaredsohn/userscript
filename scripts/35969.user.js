// ==UserScript==
// @name           Picasaweb Download Links
// @description    Add direct download links to images in the RSS Feed page
// @include        http://picasaweb.google.com/data/feed/*
// @author	   abhimeetsu[AT]gmail[DOT]com
// ==/UserScript==

// Class for image links div is enclosure


var PicasaWebDL = {
	openFunc: GM_openInTab,
	evtFunc: function(link) {
		return function clicFunc(evt) {
			//if (evt.currentTarget.nodeName.toLowerCase != 'a') return;
			evt.stopPropagation();
			evt.preventDefault();
			evt.returnValue = false;
			PicasaWebDL.openFunc(link);
		};
	},
	initLinks: function() {
		
		var pics=document.getElementsByClassName("enclosure");
                for(var i=0;i<pics.length;i++){
		
		var r=pics[i].getElementsByTagName("a")[0];
		var a=document.createElement("a");
		var href=r.getAttribute("href");
		a.setAttribute("href", href);
		a.setAttribute("class", "dLink");
		a.setAttribute("title", "Click for image");
		a.appendChild(document.createTextNode('download image'));
		r.parentNode.appendChild(a);

                r.addEventListener("click", PicasaWebDL.evtFunc(href), false);
                }

	},
	init: function() {
		var btn = document.createElement('input');
		btn.setAttribute('type', 'button');
		btn.setAttribute('value', 'Init Download Links');
		btn.addEventListener('click', PicasaWebDL.initLinks, false);
		btn.style.position = 'fixed';
		btn.style.top = '40px';
		btn.style.right = '120px';
		btn.style.zIndex = '9999';
		var bdys = document.getElementsByTagName('body');
		bdys[0].appendChild(btn);
		GM_addStyle("a.dLink { color: blue; z-index: 999 }");
	}
};

PicasaWebDL.init();

