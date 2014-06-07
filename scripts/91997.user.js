// ==UserScript==
// @name           "Video.sibnet.ru without flash"
// @version	   1
// @namespace      khades
// @description    заменяет флеш-плеер на сервисе video.sibnet.ru на встраиваемый нативный медиаплеер
// @include        http://video.sibnet.ru/*
// ==/UserScript==

var SibObj=document.getElementById('player');
if (SibObj) {
        var SibLink = SibObj.innerHTML;
        var SibVidLink = SibLink.match(/\d+(?=.flv)/);
        var SibReplacer = document.createElement('embed');
 	SibReplacer.innerHTML = '<embed height="100%" width="100%" type="video/avi" src="http://video.sibnet.ru/upload/video/' + SibVidLink + '.flv"></embed>';
        SibObj.parentNode.replaceChild(SibReplacer,SibObj);

}
