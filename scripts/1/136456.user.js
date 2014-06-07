// ==UserScript==
// @id            	   7654
// @name           utmRemover
// @version        1.0
// @namespace  
// @author         
// @description    
// @include        *
// @run-at         document-end
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js

// ==/UserScript==

// function remover() {

	
// }

// remover();

// var src = document.location.href;
// var src2 = document.location;

// alert(src);


if(document.referrer == "") {
	idx = (document.location.href).indexOf("utm_");
	if(idx != -1) {
		finalArray = Array();
		argsArray = Array();
		src = document.location.href;
		
		main = src.split("?");
		
		finalArray[0] = main[0];		
		argsArray = main[1].split("&");
		
		for(i = 0; i < argsArray.length; i++) {
			if(argsArray[i].indexOf("utm_") != -1) {
				argsArray.splice(i, 1);
				i--;
			}
		}
		
		finalArray = finalArray.concat(argsArray);
		finalString = "";
		
		for(i = 0; i < finalArray.length; i++) {
			if(i == 1) {
				finalString += "?";
			} else if(i > 1) {
				finalString += "&";
			}
			
			finalString += finalArray[i];
		}
		
		// window.location.replace(finalString);
		window.history.pushState({},"", finalString);
		
	}
}