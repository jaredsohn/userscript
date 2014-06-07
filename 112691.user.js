// ==UserScript==
// @id             wenku.baidu.com-9e911fea-73c7-47f4-a7bc-e9be4e034159@scriptish
// @name           Get_Url_of_baidu_wenku
// @version        1.5
// @namespace      
// @author         wysa
// @description    
// @include        http://wenku.baidu.com/view/*
// @require	http://userscripts.org/scripts/source/112700.user.js
// @run-at         document-end
// ==/UserScript==
(function(){
	var form=unsafeWindow.document.getElementsByName("downloadForm")[0];
	var url=form.action;
	for(i=0;i<form.elements.length;i++){
		if(i == 0){
			url=url+"?";
		}else{
			url=url+"&";
		}
		url=url+form.elements[i].name+"="+form.elements[i].value;
	}
	var ps='PS:you need to set "signed.applets.codebase_principal_support" to true to allow me using your clipboard.';
	var html_str=wrapWithHtmlElement([{name:'a',value:url},{name:'br',value:''},{name:'h3',value:setCopy(url)?'URL has been copied to your clipboard.':ps}]);
	unsafeWindow.pop.show("\u4e0b\u8f7d\u8fde\u63a5",{info:html_str,width:800,height:250});
})()
	
