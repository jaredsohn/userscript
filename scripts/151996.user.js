// ==UserScript==
// @name           Facebook Auto-Pokeback
// @namespace      http://tokor.org/
// @include        https://www.facebook.com/pokes*
// ==/UserScript==

(function(){
	function $x(path,d){
		if(!d) d=document;
		return document.evaluate(path,d,null,7,null);
	}
	
	var retnum=0;
	
	var reply = function(){
		var pokelinks=$x('//*[contains(@ajaxify,"pokes")]'),pokelink,timeval;
		//console.log("poke-back");
		if(!pokelinks){
			return;
		}
		if(retnum>1&&pokelinks.snapshotLength>0){
			timeval=Math.floor(Math.random()*4300);
		} else {
			timeval=0;
		}
		retnum=0;
		for(i=0;i<pokelinks.snapshotLength;i++){
			pokelink=pokelinks.snapshotItem(i);
			if(pokelink.ajaxify!=""){
				pokelink.click();
				retnum++;
			}
		}
		setTimeout(reply,500+timeval);
	};
	reply();
})();