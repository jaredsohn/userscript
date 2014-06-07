// ==UserScript== 
// @name           mute plus plurk
// @namespace      bda53f2d5b1f838085d9192b97706d5b
// @include        http://www.plurk.com/*
// @exclude        http://www.plurk.com/_comet/*
// @exclude        http://www.plurk.com/User/*
// @exclude        http://www.plurk.com/i18n/*
// @exclude        http://www.plurk.com/API/*
// I, the copyright holder of this work, release this work into the public domain. This applies worldwide.
// I grant anyone the right to use this work for any purpose, without any conditions, unless such conditions are required by law.
// ==/UserScript== 

(function(){
var GM_JQ = document.createElement('script'); 
GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(GM_JQ); 
})();

//var unsafeWindow = window;

(function () { if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(arguments.callee,100); } else {

(function($){
	var blockList = ['repost', 'we_plurk'], blockUrl = [];
	Array.prototype.inArray = function(needle){
		for(i=0; i<=this.length; i++){
			if(this[i] == needle){
				return true;
			}
		}
		return false;
	}

	for(i=0;i<=blockList.length;i++){
		blockUrl.push('/'+blockList[i]);
		blockUrl.push('http://www.plurk.com/'+blockList[i]);
	}

	$("#form_holder .plurk a.name, #form_holder .plurk .text_holder a.ex_link").each(function(){
		if(blockUrl.inArray( $(this).attr("href") )){
			$(this).parentsUntil(".plurk").remove();
		}
	});
	window.setTimeout(arguments.callee, 100, $);
})(unsafeWindow.jQuery.noConflict(true));

}})();