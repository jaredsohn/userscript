// ==UserScript==
// @name nesil arama olayi
// @namespace Ek$iPatch
// @description ek$i patch
// @include http://www.eksisozluk.com/*
// @include http://eksisozluk.com/*
// @include http://sozluk.sourtimes.org/*
// @include http://sourtimes.org/*
// @include http://www.sourtimes.org/*
// @include http://84.44.114.44/*
// ==/UserScript==
if(window.location.href.indexOf("show.asp") >= 0){
	function pageloaded() {
		var li = document.getElementsByTagName('li');
		if( !li){
			return;
		}
		else{
			clearTimeout(dreamscape);
		}
		for(var i = 0; i < li.length; i++ ){
			var tds = li[i].getElementsByTagName('td');
			if(tds.length !== 12){
				continue;
			}
			var nextChild = tds[8], y = nextChild.previousSibling.childNodes[0], yazar = y.getAttribute('href').substr(11), kimdirNedir = document.createElement('td'), b = document.createElement('a'), t = document.createTextNode("kimlerden");
			y.setAttribute('target', '_blank');
			b.className = 'but';
			b.href = 'http://sozluk.sourtimes.org/show.asp?t=' + yazar + '&kw=nesil+yazar';
			b.title = 'kacinci nesil bu yazar';
			b.setAttribute('style', "padding: 0 5px 0 6px;");
			b.setAttribute('onmouseout', 'bn(this)');
			b.setAttribute('onmouseover', 'ov(this)');
			b.setAttribute('onmouseup', 'bn(this)');
			b.setAttribute('onmousedown', 'md(this)');
			b.setAttribute('target', '_blank');
			b.appendChild(t);
			kimdirNedir.appendChild(b);
			nextChild.parentNode.insertBefore(kimdirNedir, nextChild);
		}
	}
	
	var dreamscape = setTimeout(pageloaded, 500);
}