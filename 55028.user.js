// ==UserScript==
// @name           阿里巴巴批量重发
// @namespace      dengsa
// @include        http://china.alibaba.com/offer/manage.htm?tracelog=myali_menu_manageoffer
// ==/UserScript==

(function(){

	var links = document.getElementById('content').getElementsByTagName('a'),
		temp = [];

	if (links){

		for (var i=0,j=links.length;i<j;i++){
			if (links[i].getAttribute('onmousedown') == "return aliclick(this,'?tracelog=gl_onweb_repost');"){
				temp.push(links[i].href);
			}
		}

		if (temp.length){
			(function(i){
				if (i>=0){
					//console.log(i);

					var XHR = new XMLHttpRequest();
					XHR.open('GET', temp[i], true);
					XHR.send(null);

					i--;
					var arg = arguments;
					setTimeout(function(){
						arg.callee(i);
					}, 1000);
				}
				else{
					location.href='http://china.alibaba.com/offer/manage.htm?tracelog=myali_menu_manageoffer';
				}
			})(temp.length-1);
		}
		else{
			return;
		}

	}
})();