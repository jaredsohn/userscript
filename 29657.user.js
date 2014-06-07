// ==UserScript==
// @name           PC
// @namespace      np
// @description    Counts potatoes
// @include        http://www.neopets.com/medieval/potatocounter.phtml?
// ==/UserScript==

setTimeout(function(){
	var x = document.getElementsByTagName('td');
	for(var i=0;i<x.length;i++){
		if(x[i].className=="content"){
			var t = x[i].childNodes[8];
			console.log(t);
			var cnt = t.getElementsByTagName('img').length;
			if(cnt==0){
				return false;
			}else if(cnt<40){
				window.location.reload();
			}else{
				var guesses = document.getElementsByTagName('input');
				for(var j=0;j<guesses.length;j++){
					if(guesses[j].name=='guess'){
						guesses[j].value = cnt;
						guesses[j].parentNode.submit();
						return true;
					}
				}
			}
		}
	}
},0);