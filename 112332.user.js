// ==UserScript==
// @name           Google PLus Kitteh
// @namespace      google.com
// @include        http://www.google.com/*
// @include        https://www.google.com/*
// @grant          none
// ==/UserScript==

(function(){
	var super_search_for = "kittens";

	var search_box = document.getElementsByName("q")[0];		
	var on_search_page = document.getElementById("rso");
	
	var last_typed_time = 0;
	search_box.addEventListener("keydown", (function(){ last_typed_time = new Date(); }), false);
	
	if(search_box){
		function wait_fo_search_page(){
			var search_box = document.getElementsByName("q")[0];
			var on_search_page = document.getElementById("rso");
			
			if(on_search_page){
				if(!last_typed_time || ((new Date()) - last_typed_time) > 600){
					try { if(search_box.value && search_box.value.indexOf("kittens") == -1 ){
						if(search_box.value.substr(-1) != " " && super_search_for.substr(0,1) != " "){
							super_search_for = " " + super_search_for;
						}
						if(search_box.value.substr(-1) == " " && super_search_for.substr(0,1) == " "){
							super_search_for = super_search_for.substring(1);
						}
						
						search_box.value += super_search_for;
						
						setTimeout((function(){
							document.getElementsByTagName("form")[0].submit();
						}),500);
					} }catch(ex){}
				}
			}

			setTimeout(wait_fo_search_page, 100);
		}
		
		wait_fo_search_page();
	}
})();