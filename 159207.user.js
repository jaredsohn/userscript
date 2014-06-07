// ==UserScript==
// @name        ip138自动修改适合hosts
// @namespace   ip138自动修改适合hosts
// @include     http://www.ip138.com/ips*
// @version     1
// ==/UserScript==
tags = document.getElementsByTagName("font");
for(var i=0;i<tags.length;i++){
	var showvalue=tags[i].innerHTML;
	var onclickvalue=tags[i].outerHTML;
	if(onclickvalue.indexOf("blue")>0){
		//alert();
		str=showvalue.substring(showvalue.indexOf(' &gt;&gt; ')+9)+" "+showvalue.substring(0,showvalue.indexOf(' '));
		tags[i].innerHTML=str;
	}
}