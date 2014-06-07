// ==UserScript==
// @name           AmazonCartHelper
// @namespace      http://ma.la/
// @author         ma.la <timpo@ma.la>
// @include        http://*amazon*/cart/*
// @description    roll the mouse wheel to adjust the numeric value. A little good for Amazon's cart.
// ==/UserScript==

// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html

(function(){
	var inp=document.getElementsByTagName("input");
	for(var i=0;i<inp.length;i++){
		var c=inp[i];
		if(c.type=="text"&&c.value!=""&&!isNaN(c.value)){
			var mkfunc=function(t){
				return function(e){
					var ct=e.wheelDelta||(e.preventDefault(),-e.detail);
					ct<0?t.value++:(t.value>0)?t.value--:0;
					return false;
				}
			};
			var func=mkfunc(c);
			c.attachEvent?
				c.attachEvent("onmousewheel",func)
				:c.addEventListener("DOMMouseScroll",func,false);
		}
	}
})();