// ==UserScript==
// @id             Tast.Cbox
// @name           Tast Cbox
// @version        1.0
// @namespace      http://www.lv1.in
// @author         Tast
// @include        				http://www7.cbox.ws/box/?boxid=432020&boxtag=vzzstq&sec=form
// @description    
// ==/UserScript==
// @run-at         document-end

var url = window.location.href;

if(url.match('sec=form')){
	var nme = document.getElementsByName('nme')[0]
	var eml = document.getElementsByName('eml')[0]
	
	nme.value = GM_getValue("TalkingName",'使用者名稱');
	eml.value = GM_getValue("TalkingAddress",'電子郵件/個人網址');
	
	nme.addEventListener("change", function (){
		GM_setValue("TalkingName",nme.value);
	}, false);
	
	eml.addEventListener("change", function (){
		GM_setValue("TalkingAddress",eml.value);
	}, false);
}


//alert(url + "\n" + GM_getValue("TalkingName",'') + "\n" + GM_getValue("TalkingAddress",'電子郵件/個人網址'));