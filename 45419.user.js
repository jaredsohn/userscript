// ==UserScript==
// @name              Mouseover textarea focus
// @namespace         Yamamaya
// @include           *
// @version           0.0.1
// ==/UserScript==

(function(){
 
 var area = {
 	focus: function(){
		document.addEventListener("mouseover",this,false);
	},
	handleEvent: function(e){
		var target  = e.target;
		var element = target.nodeName.toLowerCase(); 
		var eleType = target.type;
		switch(e.type){
			case "mouseover":
			 if(target.parentNode.parentNode.id === "quickLuncher") return;
			 if(element === "textarea" || element === "input" && (eleType === "text" || eleType === "password")){
			 	target.focus();
			 }			  
			 break;
		}
	}
 };

 area.focus();
})();