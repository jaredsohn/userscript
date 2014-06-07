// ==UserScript==
// @name Facebook autopoke
// @namespace Kjwon15
// @description Facebook auto revenge poke
// @include http://*.facebook.com/pokes*
// @include https://*.facebook.com/pokes*
// ==/UserScript==

auto_poke=function(){
	var poked=false;
	var lst=document.querySelectorAll("a");
	for(i=0;i<lst.length; i++){
		if(lst[i].getAttribute("ajaxify")){
			if(lst[i].getAttribute("ajaxify").match(/is_suggestion=0/)){
				lst[i].click();
				poked=true;
			}
		}
	}
	if(poked) {
		//alert("POKED");
		window.setTimeout(auto_poke, 1000);
	}else{
		window.setTimeout(auto_poke, 3000);
	}
}
//auto_poke();
window.setTimeout(auto_poke,5000);
