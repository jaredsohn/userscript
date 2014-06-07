// ==UserScript==
// @name           gaga
// @version        0.0.1
// @namespace      
// @author         crims
// @description    gaga
// @match        http://gaga.aliexpress.com/*
// @grant       none
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at         document-end
// ==/UserScript==

//wait for jQuery to be loaded
function waitForJquery(){
	if (typeof unsafeWindow.jQuery == 'undefined') {  
		window.setTimeout(waitForJquery, 100);
	} else {
		$ = unsafeWindow.jQuery;
		//your code here
		 var txt = $('#cost cost-now b').text();
            alert(txt);
            
   
	}
}
waitForJquery();

//var hour = document.getElementsByClassName('discount-icon').innerHtml; 
//var minute =  document.getElementsByClassName('minute'); 
//var second = document.getElementsByClassName('second'); 

//alert(hour);