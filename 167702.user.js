// ==UserScript==
// @name        drrr_pic
// @namespace   function
// @include     http://drrrchat.com/room/
// @include     http://www.drrrchat.com/room/
// @version     1
// @run-at document-start 
// ==/UserScript==

var mySetInterval = setInterval;
window.setInterval2 = function(callback, interval){
	var args = Array.prototype.slice.call(arguments, 2);
	function callFn(){callback.apply(null, args);}
	return mySetInterval(callFn, interval);
} 
window.setInterval=function(a,b){
	return window.setInterval2(function(a){
		var f=a[0];
		f();
		$('p').css('height',"auto")
		$('.bubble').each(function(){
			$("p",this).each(function(){
				var p2=this.innerHTML;
				if(p2.match(/^http.*?(?:\.jpg|\.png|\.gif)$/ig)){
					p2.replace(/"/g,"%22");
					this.innerHTML='<img style="width:100%;height:auto;" src="'+p2+'"/>';
					$(this).css('background',"#ccc");
				}
			});
			
		});
	},b,[a]);
};