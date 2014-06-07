// ==UserScript==
// @name           webshots search link to image thingo
// @namespace      blurg!
// @description    webshots search link to image thingo
// @include        http://www.webshots.com/search?*
// ==/UserScript==

[].forEach.call(document.querySelectorAll('#containerB .title>p>a'), function (element, index, array) {
	GM_xmlhttpRequest({
		method: "GET",
		url: element.href,
		el:element,
		onload: function(r) {
			var rt = r.responseText;
			var io1 = rt.indexOf('<param name="flashvars" value="src=');
			if(io1){
				var imgSrc = rt.substring(io1+35, rt.indexOf('_ph.jpg"',io1));
				var newP = document.createElement('p');
				var newA = document.createElement('a');
				newA.textContent='Full';
				newA.href=imgSrc+'_fs.jpg';
				newA.setAttribute('style','border-bottom:1px solid grey;font-size:10px;');
				newP.appendChild(newA);
				var pn=this.el.parentNode;
				pn.insertBefore(newA, pn.firstElementChild);
			}
				if(io1){
				var imgSrc = rt.substring(io1+35, rt.indexOf('_ph.jpg"',io1));
				var newP = document.createElement('p');
				var newA = document.createElement('a');
				newA.textContent='small';
				newA.href=imgSrc+'_ph.jpg';
				newA.setAttribute('style','border-bottom:1px solid grey;font-size:10px;');
				newP.appendChild(newA);
				var pn=this.el.parentNode;
				pn.insertBefore(newA, pn.firstElementChild);
			}
		}
	});
});