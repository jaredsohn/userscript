// ==UserScript==
// @name           TechnoRocker Redirect
// @namespace      http://darkztar.com/
// @include        http://www.technorocker.info/download/*/*/
// ==/UserScript==

var waitTime=0; //Optional wait time before being redirected in milliseconds. 1000 ms = 1 sec

var ins = document.getElementsByTagName('input'); var i;
for(i=0;i<ins.length;i++){
	if(ins[i].size=='95' && ins[i].type=='text'){
		setTimeout("location.href='"+ins[i].value+"'",waitTime);
	}
}