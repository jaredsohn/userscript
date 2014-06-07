// ==UserScript==
// @name        IXWEB自动修改DNS把WWW的CNAME到不带WWW的域名
// @namespace   IXWEB自动修改DNS把WWW的CNAME到不带WWW的域名
// @description IXWEB自动修改DNS把WWW的CNAME到不带WWW的域名
// @include     https://*.ixwebhosting.com/psoft/servlet/psoft.hsphere.*
// @version     1
// ==/UserScript==
var url=document.URL;
if(url.indexOf('add_cname.html')>-1){
/*把域名添加到改CNAME的链接并点击*/
	tags = document.getElementsByTagName("input");
	for(var i=0;i<tags.length;i++){
		if(tags[i].name=="name"){
			tags[i].value="www";
		}else if(tags[i].name=="data"){
			tags[i].value=url.substring(url.indexOf('#')+1);
			break;
		}
	}
	document.f_add_cip.submit();
}else if(url.indexOf('dns/list.html')>-1){
/*取域名*/
	tags = document.getElementsByTagName("a");
	for(var i=0;i<tags.length;i++){
		if(tags[i].outerHTML.indexOf('psoft.hsphere.CP?template_name=domain/edit.html')>-1){
			str=tags[16].innerHTML;
			str=str.substring(str.indexOf('>')+1,str.indexOf('<',2));
			break;
		}
	}
/*把域名添加到改CNAME的链接并点击*/
	tags = document.getElementsByTagName("a");
	for(var i=0;i<tags.length;i++){
		if(tags[i].outerHTML.indexOf('Add DNS CNAME Record')>-1){
			tags[i].setAttribute("href",tags[i].href+"#"+str);
			tags[i].click();
			break;
		}
	}
}else if(url.indexOf('domain/edit.html')>-1){
/*自动点击修改DNS*/
	tags = document.getElementsByTagName("a");
	for(var i=0;i<tags.length;i++){
		if(tags[i].outerHTML.indexOf('Edit DNS configuration')>-1){
			tags[i].click();
			break;
		}
	}
}
