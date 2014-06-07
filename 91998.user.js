// ==UserScript==
// @name           video.sibnet.ru without flash
// @version	   4
// @namespace      khades
// @description    заменяет флеш-плеер на сервисе video.sibnet.ru на встраиваемый нативный медиаплеер
// @include        http://video.sibnet.ru/*
// ==/UserScript==

var SibObj=document.getElementById('player');
if (SibObj) {
        var SibVidLink = document.location.href.match(/video([0-9]+)/);
        var SibReplacer = document.createElement('embed');
 	SibReplacer.innerHTML = '<embed height="100%" width="100%" type="video/x-flv" src="http://video.sibnet.ru/upload/video/' + SibVidLink + '.flv"></embed>';
        SibObj.parentNode.replaceChild(SibReplacer,SibObj);
}
