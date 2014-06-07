// ==UserScript==
// @name MusicDownload	
// @namespace http://vk.com/musicalarchive
// @description Позоляет загружать аудио файлы из вконтакте
// @include http://vk.com/*
// @include http://vkontakte.ru/*
// @author Infoshoc (Владимир Полосухин) [http://vk.com/id16499392]
// @version 0.2
// @date 09.10.2011
// ==/UserScript==

(function(){
function work(){
	d=document;
	a=d.getElementsByClassName('play_new');
	s='background: url("http://cs5687.vk.com/u16499392/144471759/x_aabd1018.jpg") no-repeat scroll 0 0 transparent; cursor: pointer; height: 16px; width: 20px;';
	for (i=0;i<a.length;i++){
		e=a[i].parentNode.parentNode;
		if(e.parentNode.getElementsByClassName('save_btn').length==0){
			url=e.getElementsByTagName('input')[0].value;
			url=url.substring(0,url.lastIndexOf(','))+'?dl=1';
			e=e.parentNode;
			b=d.createElement('td');
			b.setAttribute("class","save_btn");
			c=d.createElement('a');
			c.setAttribute("href",url);
			c=b.appendChild(c);
			f=d.createElement('div');
			f.setAttribute('style',s);
			c.appendChild(f);
			e.insertBefore(b,e.getElementsByTagName('td')[0]);
		}
	}
	'loaded';
}
document.addEventListener('DOMAttrModified',work,true);
}
)()
