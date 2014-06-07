// ==UserScript==
// @name		OdnoklassnikiMediaEmbedder4Opera
// @namespace	su.gornostaev
// @description	Заменят ссылки на картинки самими картинками, а ссылки на youtube-ролики роликами (Версия для Opera)
// @version		1.4
// @author		Sergey TheDeadOne Gornostaev
// @license		GPL
// @include		http://www.odnoklassniki.ru/*
// @include		https://www.odnoklassniki.ru/*
// @include		http://odnoklassniki.ru/*
// @include		https://odnoklassniki.ru/*
// @grant		none
// @updateURL		https://userscripts.org/scripts/source/145005.user.js
// @downloadURL		https://userscripts.org/scripts/source/145005.user.js
// ==/UserScript==

function su_gornostaev_resize(img, maxh, maxw) {
  var ratio = maxh/maxw;
  if(img.height/img.width > ratio) {
    if(img.height > maxh) {
//      img.width = Math.round(img.width*(maxh/img.height));
//      img.height = maxh;
    }
  }
  else {
    if(img.width > maxw) {
      img.height = Math.round(img.height*(maxw/img.width));
      img.width = maxw;
    }
  } 
}

var docBody = document.getElementsByTagName("body")[0];

function su_gornostaev_parse() {
  var anchors = document.getElementsByTagName('a');
  for(var i = 0, a; a = anchors[i]; ++i){
    if(a.textContent.search(/^https?:\/\/(?:[\da-z\.\-]+)\.([a-z\.]{2,6})(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/i) != -1) {
      docBody.removeEventListener('DOMNodeInserted', su_gornostaev_parse, false);
			
      var img = document.createElement('img');
      img.src = a.textContent;
      su_gornostaev_resize(img, 500, 500);
      a.parentNode.insertBefore(img, a);
      a.parentNode.removeChild(a);
			
      docBody.addEventListener('DOMNodeInserted', su_gornostaev_parse, false);
    }
    if(a.textContent.search(/youtube\.com\/watch\?/) != -1) {
      docBody.removeEventListener('DOMNodeInserted', su_gornostaev_parse, false);

      var id = aNode.textContent.split("v=")[1].substring(0, 11);
      var obj = document.createElement('object');
      obj.width = 500;
      obj.height = 400;
      obj.innerHTML = '<param value="http://www.youtube.com/v/' + id + '" name="movie"/><param value="transparent" name="wmode"/><embed width="500" height="400" wmode="transparent" type="application/x-shockwave-flash" src="http://www.youtube.com/v/' + id + '"/><a href="http://www.youtube.com/v/' + id + '" />';
      a.parentNode.insertBefore(obj,a);
      a.parentNode.removeChild(a);
			
      docBody.addEventListener('DOMNodeInserted', su_gornostaev_parse, false);
    }
  }
}

docBody.addEventListener('DOMNodeInserted', su_gornostaev_parse, false);