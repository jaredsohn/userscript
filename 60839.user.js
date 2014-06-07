// Url Unwrap
// version 0.2a
// 2009-11-01
// by Diego De Vita
//
// ==UserScript==
// @name          Url Unwrap
// @description   
// @include       *
// ==/UserScript==

function replaceUrls(){	
	links = document.getElementsByTagName("A");	
	if(links!=null){
		for(i=0;i<links.length;i++){
			a = links[i]; 
			url = a.href;
			a.href = url.replace(/.+?(\?|\&)(url|u)=(.+)/g, "$3");
		}			
	}
}

function main(){
	setTimeout(replaceUrls,100);
}

main();