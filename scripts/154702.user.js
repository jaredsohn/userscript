// ==UserScript==
// @namespace      RemoveGoogleRedirect
// @name           Remove Google Redirect
// @version        0.0.2
// @include        http://www.google.*/*
// @include        https://www.google.*/*
// @run-at         document-start
// ==/UserScript==
document.addEventListener('DOMNodeInserted',checksearch,false);
//var count2=0;
////////////////////
	function checksearch(){
		var list = document.getElementById('ires');
		if(list){
    		document.removeEventListener('DOMNodeInserted',checksearch,false);
			document.addEventListener('DOMNodeInserted',clear,false)
		};
	}

	function clear(){
		//console.log('remove action:',++count2);
		var items = document.querySelectorAll('a[onmousedown]');
		for(var i =0;i<items.length;i++){
    		items[i].removeAttribute('onmousedown');
    	}
	}