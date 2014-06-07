// ==UserScript==
// @name           F'up Internet
// @namespace      Everywhere
// @description    F'ups the Internet
// @include        *
// ==/UserScript==

(function(){
	var prev_style;
	var successful_applied = 0;
	try{
	for(var i=0; i<document.styleSheets.length; i++){
		for(var j=0; j<document.styleSheets[i]["cssRules"].length; j++){
			for(k in document.styleSheets[i]["cssRules"][j].style){
				if(prev_style){
					try { document.styleSheets[i]["cssRules"][j].style[k] = prev_style; successful_applied++; prev_style = null;} catch(ex) {}
				}
				if(!prev_style)
					prev_style = document.styleSheets[i]["cssRules"][j].style[k];
			}
		}
	}}catch(ex){}
	
	if(successful_applied > 0){
		console.log("f'up done " + successful_applied);
	}else{
		// nothing got f'uped. take more drastic measures
		console.log("f'up will try harder...");
		try {
			var divs = document.getElementsByTagName("div");
			var ps = document.getElementsByTagName("ps");
			var inps = document.getElementsByTagName("input");
			var as = document.getElementsByTagName("a");
			var imgs = document.getElementsByTagName("img");
			var transform_elements = [divs, ps, inps, as, imgs];
			for(i in transform_elements){
				for(j in transform_elements[i]){
					try{
						transform_elements[i][j].style.lineHeight = "50%";
						transform_elements[i][j].style.letterSpacing = "-4px";
						transform_elements[i][j].style.cssFloat = (Math.random() < .5) ? "left" : "right";
						if(Math.random() < 0.1){
							transform_elements[i][j].style.position = "absolute";
							transform_elements[i][j].style.left = Math.random() * window.innerWidth;
							transform_elements[i][j].style.top = Math.random() * window.innerHeight;
						}
						
						if(transform_elements[i][j].style.display == "none"){
							// show ALL the elements!
							transform_elements[i][j].style.display = "block";
						}
						
						if(transform_elements[i][j].tagName == "img"){
							transform_elements[i][j].style.width = "10%";
							transform_elements[i][j].style.height = "200%";
						}
						
						successful_applied++;
					}catch(ex1){}
				}
			}
		}catch(ex){
			console.log("f'up tried :( " + ex.message);
		}
		
		console.log("f'up really done: " + successful_applied);
	}
		
})();