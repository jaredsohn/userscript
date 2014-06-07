// ==UserScript==
// @name           Picasaweb view all original images of album in one click
// @namespace      http://userscripts.org
// @description    Add one button that change all images of album to original images. It easy download album. Based in source from joe.lapoutre.com/gm/picasawebdl
// @include        http://picasaweb.google.com/*/*

/*
* Autor: Planet - Brasil
*
* Criação: 27/01/2008
* Updated: 27/01/2008 03:15h
**/

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
		var rows = document.evaluate("//img[contains(@src, '/s144/')]", 
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < rows.snapshotLength; i++) {
			var r = rows.snapshotItem(i);
			var href = r.getAttribute('src').replace(/^(.+)\/s144\/(.+)$/, "$1/$2?imgdl=1");
r.setAttribute('src',href);
r.setAttribute('width','');
r.setAttribute('height','');
r.setAttribute('onclick','');
r.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('style','');
r.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('class','');
r.parentNode.parentNode.parentNode.parentNode.setAttribute('style','');
r.parentNode.parentNode.parentNode.parentNode.setAttribute('class','');
r.parentNode.parentNode.parentNode.setAttribute('style','');
r.parentNode.parentNode.parentNode.setAttribute('class','');
r.parentNode.parentNode.parentNode.setAttribute('onclick','');
r.parentNode.parentNode.parentNode.setAttribute('onmouseover','');
r.parentNode.parentNode.parentNode.setAttribute('onmouseout','');
r.parentNode.parentNode.parentNode.childNodes[1].setAttribute('style','');//HINT
r.parentNode.parentNode.parentNode.childNodes[1].setAttribute('class','');//HINT
r.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].setAttribute('style','');//HINT
r.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].setAttribute('class','');//HINT
r.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].setAttribute('style','');r.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].setAttribute('class','');//HINT

r.parentNode.parentNode.setAttribute('style','');
r.parentNode.parentNode.setAttribute('class','');
r.parentNode.setAttribute('style','');
r.parentNode.setAttribute('class','');
r.setAttribute('style','');
r.setAttribute('class','');

/*
			var a = document.createElement('a');
			a.setAttribute("href", href);
			a.setAttribute("class", "dLink");
			a.setAttribute("title", "Click for image");
			a.appendChild(document.createTextNode('download image'));
			r.parentNode.appendChild(a);
*/
//			r.style.border='1px dotted magenta';
//			r.addEventListener("click", PicasaWebDL.evtFunc(href), false);

		}
	},
	init: function() {
		var btn = document.createElement('input');
		btn.setAttribute('type', 'button');
		btn.setAttribute('value', 'Change thumbs for original images');
		btn.addEventListener('click', PicasaWebDL.initLinks, false);
		btn.style.position = 'fixed';
		btn.style.top = '40px';
		btn.style.right = '120px';
		btn.style.zIndex = '9999';
		var bdys = document.getElementsByTagName('body');
		bdys[0].appendChild(btn);
		GM_addStyle("a.dLink { color: blue; position: absolute; left: 0; bottom: 0; z-index: 999 } a:hover { color: red ! important; }");
	}
};

PicasaWebDL.init();

