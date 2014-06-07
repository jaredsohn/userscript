// ==UserScript==
// @name inci sözlük inline image
// @description a href linki olarak gösterilen bütün resimleri img tagına çevirir
// @include http://inci.sozlukspot.com/*
// @include http://*ccc.incisozluk.cc/*
// ==/UserScript==

var elements = document.getElementsByTagName("a");
var scale = '50%';
	for (var i=0; (anchor=elements[i]); i++) {
		src = anchor.getAttribute("href");
		if(src.indexOf('.gif') > -1 || src.indexOf('.jpg') > -1 || src.indexOf('.png') > -1 || src.indexOf('.bmp') > -1 || src.indexOf('.jpeg') > -1)
		{
			img = document.createElement('img');
			img.setAttribute('src',src);
			img.setAttribute('height',scale);
			img.setAttribute('border','0');
			anchor.innerHTML = '';
			anchor.appendChild(img);
		}else 
		if(src.indexOf('.swf') > -1)
		{
			img = document.createElement('embed');
			img.setAttribute('src',src);
			img.setAttribute('height',scale);
			anchor.innerHTML = '';
			anchor.appendChild(img);
		}

	}