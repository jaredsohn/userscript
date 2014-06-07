// ==UserScript==
// @name           highlight input box onfocus
// @namespace      com.zhangkf
// ==/UserScript==

(function() {
	var inputs = document.getElementsByTagName("input");

	for(var i=0;i<inputs.length;i++){
		var inp = inputs[i];
		if(inp.type == "text" || inp.type == "password"){
			var oriOutline = inp.style.outline;			
				
			inp.addEventListener('focus', function(event) {
				this.style.outline = "5px outset green";
			}, false);

			inp.addEventListener('blur', function(event) {
				this.style.outline = oriOutline;
			}, false);
		}
	}
})();
