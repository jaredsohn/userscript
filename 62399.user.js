// ==UserScript==
// @name        VidiVodo DL
// @version	0.7
// @namespace   *
// @description VidiVodo goruntulerini kolayca indir
// @include     http://www.vidivodo.com/*
// @updateURL   http://userscripts.org/scripts/source/62399.user.js
// @grant	GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @run-at	document-end
// ==/UserScript==

var ssvb=document.getElementById('social_sharing_video_bottom');
var indr=document.createElement('a');
indr.title='Videoyu indirmek için tıklayınız';
indr.rel='nofollow';
indr.innerHTML='indir';
indr.setAttribute('style','font-size:16px;\
background-image: url(http://www.vidivodo.com/images/general_ikon.png?v=1);\
background-position: 100px -45px;\
padding:3px 6px 3px 6px;\
-moz-border-radius:3px;border-radius:3px;');
indr.href=getSource();
//indr.addEventListener('click',getSource,false);
ssvb.appendChild(indr);


function getSource(){
GM_xmlhttpRequest({
method:'GET',url: 'http://www.vidivodo.com/player/getxml?mediaid='+unsafeWindow.star_params.params.vid+'&publisherid=vidivodo&type=',
overrideMimeType: 'text/xml; charset=UTF-8',
onerror: function(){
			indr.href='javascript:confirm(\'Hata: Dosyaya erişilemiyor. Sayfayı yenilemeyi denediğiniz halde bu hatayı alıyorsanız, geliştiriciye bildiriniz.\n\n\tŞimdi bildirmek ister misiniz?\')?window.location.href=\'http://userscripts.org/topics/new?script_id=62399\':void(0);'
			},
onload: function(cevap) {
			var rsxml = new DOMParser().parseFromString(cevap.responseText, "text/xml");
			GM_setValue('retval',rsxml.getElementsByTagName('url')[0].childNodes[0].nodeValue);
			}
});
return GM_getValue('retval');
}