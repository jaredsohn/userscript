// ==UserScript== 
// @name           tema_antislideshow
// @description    Remove stupid slideshows from http://www.tema.ru/travel/
// @version        0.1
// @include        http://www.tema.ru/travel/*
// @include        http://tema.ru/travel/*
// @author         mailto:legolegs@yandex.ru
// ==/UserScript== 
// 
// * Wed, 30 Jun 2010 15:45:47 +0400
//
function tema_antislideshow()
{
	function unroll(image)
	{
		var slides=eval(image.getAttribute('onclick').replace("return",""));
		var bullshit = image.parentNode;
		bullshit.parentNode.insertBefore(image,bullshit);
		image.parentNode.removeChild(bullshit);
		image.removeAttribute('onclick');
		image.onclick = undefined;
		image.removeAttribute('class');
		var afterthis = image.parentNode;
		for (var i=0;i<slides.length;i++)
		{
			afterthis=addimage(afterthis,slides[i],image.width,image.height);
		}
	}
	function addimage(afterthis,src,width,height)
	{
		var div = document.createElement('div');
		div.setAttribute('class','image');
		var img = document.createElement('img');
		img.setAttribute('src',src);
		img.setAttribute('border','1');
		img.setAttribute('width',width);
		img.setAttribute('height',height);
		div.appendChild(img);
		afterthis.parentNode.insertBefore(div,afterthis.nextSibling)
		return div;
	}
	var images = document.getElementsByTagName('img');
	for(var i = 0; i < images.length; i++){
		if(images[i].className.match(/(^|\s)slideshow($|\s)/)){
			unroll(images[i]);
		}
	}
}
tema_antislideshow();