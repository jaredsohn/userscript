// ==UserScript==
// @name            TwitterAutoReloader
// @namespace       http://hazisarashi.com/
// @description     Twetterの差分更新を自動的に実行
// @version 0.2
// @include         http://twitter.com/
// @include         http://twitter.com/#/list/*
// @include         http://twitter.com/#list/*
// @include         http://twitter.com/#replies
// ==/UserScript==

(function(){

if (typeof(unsafeWindow) === 'undefined') {
	unsafeWindow = window;
}

function AutoReloader(){
	var AutoReloaderInterval = setInterval(function(){
		try{
			if ( unsafeWindow.page.newResults && unsafeWindow.page.timelineRefresher && unsafeWindow.jQuery("#results_update").length == 1 ){
				clearInterval(AutoReloaderInterval);
				
				unsafeWindow.page.timelineRefresher._run = unsafeWindow.page.timelineRefresher.run;
				unsafeWindow.page.timelineRefresher.run = function(){
					this._run();
					setTimeout ( function(){results_update_click();}, 1500 );
				}
				unsafeWindow.jQuery("#results_update").click();
			}
		}catch(errordebug){
			console.debug('AutoReloaderError:'+errordebug);
			clearInterval(AutoReloaderInterval);
			AutoReloader();
		}
	}, 10000 );
}
AutoReloader();

function results_update_click(){
	if ( unsafeWindow.jQuery("#results_update").length == 1 ){
		unsafeWindow.jQuery("#results_update").click();
	}else{
		setTimeout ( function(){results_update_click();}, 500);
	}
}
	
})();