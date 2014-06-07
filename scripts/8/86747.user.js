// ==UserScript==
// @name           Narod.Disk no captcha
// @description    Get direct links wihtout captcha
// @namespace      script
// @include        http://narod*.ru/disk/*
// @version        2.2
// @history        2.2 Обновлён инклюд
// @history        2.1 Добавлен updateURL и обновлён useragent
// @history        2.0 Новая версия, теперь работает только в firefox или в тех браузерах кто может эмулировать GM_xmlhttpRequest
// @history        1.0 Получает прямую ссылку и выдаёт вместо каптчи. Спасибо nobodyzzz за идею.
// @updateURL      http://userscripts.org/scripts/source/86747.meta.js
// ==/UserScript==

document.addEventListener('DOMContentLoaded',function(){
var captcha=document.getElementById('f-capchaform')
if(captcha)captcha.parentNode.removeChild(captcha)
function parseText(text){
    var iframe=document.createElement('iframe');
    iframe.style.visibility='hidden';
    iframe.style.width="0";
    iframe.style.height="0";
    document.documentElement.appendChild(iframe);
    var doc=iframe.contentDocument;
    document.documentElement.removeChild(iframe);
    doc.documentElement.innerHTML=text;
    return doc;
}
	var res = GM_xmlhttpRequest({
		method:"GET",
		url:location.href,
		headers:{
			"User-Agent":navigator.userAgent+" YB/5.3",           
			"Accept":"text/xml"
		},
		onload:function(response) {
			if (response.readyState == 4) {
				var doc = parseText(response.responseText)
				var ar=doc.querySelectorAll("p.direct-link-")[0]
				document.querySelectorAll('div.b-get-link')[0].innerHTML = ar.innerHTML
           					      } 
			else {
				document.querySelectorAll('div.b-get-link')[0].innerHTML = 'Тут скоро появится ссылка, пожалуйста подождите...'
			     }
					  }
});
},false)