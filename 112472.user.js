// ==UserScript==
// @name 		   JSON formatter
// @version        1.0
// @description	   Formats JSON if the document only contains JSON
// @compability    Only tested with Opera, might work with others
// @author		   Martin Hansen
// @website        http://martinhansen.no
// ==/UserScript==
(function(){
	var indentation = 4;//Change this to vary the indentation

	var pre = document.querySelector('body pre:only-child');
	if(!pre) return; //Don't do anything if this don't seem to be a json only document
	try{		
		pre.innerHTML = JSON.stringify(JSON.parse(pre.innerHTML), null,indentation);
	}
	catch(e){
		console.log(e);	
	}
})();
