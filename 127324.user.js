// ==UserScript==
// @name           Baidu.Cloud.Input
// @namespace      Baidu.Cloud.Input
// @version        1.3
// @description    Baidu.Cloud.Input
// @match          http://*/*
// @match          https://*/*
// ==/UserScript==

if(self.innerWidth>500&&self.innerHeight>400){
	(function(){
		var js='var bdime_option={ch:false};';
		var url='http://www.baidu.com/olime/bdime_open.js';
		loadJS({js:js,type:'code',callback:{js:url}});
		function extObj(target,source){
			for(var i in source){
				if(!(source[i] instanceof Object)){
					target[i]=source[i];
				}else{
					target[i]=extObj({},source[i]);
				}
			}
			return target;
		}
		function loadJS(opts){
			var settings = extObj({js:'',type:'url',callback:null},opts);
			var script = document.createElement("script");
			//console.log(this.location.href);
			if(settings.type==='code'){
				script.textContent = settings.js;
				if(settings.callback){
					loadJS(settings.callback);
				}
			}else{
				script.setAttribute("src", settings.js);
				if(settings.callback){
					script.addEventListener('load', function () {
						loadJS(settings.callback);
					}, false);
				}
			}
			document.body.appendChild(script);
		}
	})();
}