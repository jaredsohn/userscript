// ==UserScript==
// @name        Print Scribd
// @namespace   piranga8.desarrollo
// @description Print Scribd files
// @include     *.scribd.com*
// @version     2
// ==/UserScript==
ready = 0;
url = document.URL;
//doc = document;
//doc.documentURI = url;
var x = document.scripts;
if(x.length > 70){
	for(k = 0;k < x.length; k++){
		if(x[k] != null){
			arreglo = x[k].innerHTML.split(",");
			for(i = 0;i < arreglo.length;i++){
				a = arreglo[i].split(":");
				if(a[0].substring(1,a[0].length - 1) == "access_key"){
					access_key = a[1].substring(1,a[1].length - 1);
					ready++;
					i = arreglo.length + 1;
				}
			}
			for(j = 0;j < url.split("/").length; j++){
				b = url.split("/");
				if(b[j] == "doc"){
					id = b[j + 1];
					ready++;
					j = b.length + 1;
				}
			}
		}
		if(ready > 1){
			k = x.length + 1;
			register();
		}
		ready = 0;
	}
}
function print(){
	url= "http://d1.scribdassets.com/ScribdViewer.swf?document_id=" + id + "&access_key=" + access_key; 
	window.open(url);
}

function register(){
	GM_registerMenuCommand('Print Scribd', print, 'p');
}