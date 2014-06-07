// ==UserScript==
// @id             tieba.baidu.com-432e4848-6efc-4af1-8b8d-a81ed2d8ba8f@scriptish
// @name           移除百度贴吧未登陆跳转
// @version        1.0
// @namespace      
// @author         dowl
// @description    
// @include        http://tieba.baidu.com/*
// @run-at         document-start
// ==/UserScript==

(function(){
//	document.location = document.location.href.replace(/http:\/\/tieba\.baidu\.com\/f\/user\/passport\?jumpUrl=/,"");
	function init() {
		unsafeWindow.PageData.user.is_login = true;
	};
	if(unsafeWindow.PageData){
		init();
	} else {
		window.setTimeout(init,1000);
	};
//	unsafeWindow.alert(unsafeWindow.PageData.user.is_login);
})();