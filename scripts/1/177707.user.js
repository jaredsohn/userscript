// ==UserScript==

// @name          SuperPoster

// @namespace     http://www.sovas.lv

// @description   Possible to post data outside page using greasemonkey. [Notice , it makes your browser security LOW. I know what I'm doing using it... Hope you know it too]

// @include      *

// ==/UserScript==



unsafeWindow.superAjax = function (url , data , callback){
	if (typeof unsafeWindow == 'undefined'){
		unsafeWindow = window;
	}
	jsonized = {};
	if (typeof url != 'undefined' && data != 'undefined'){
		jsonized.url = url;
		jsonized.data = data;
		unsafeWindow.localStorage.posterData = JSON.stringify(jsonized);

		if (typeof callback != 'undefined'){
			unsafeWindow.superAjaxCallBackWaitress(callback);
		}		
		unsafeWindow.localStorage.saveOppInnVal = true;
	}
};


unsafeWindow.superAjaxCallBackWaitress = function (callback){
	if (typeof unsafeWindow == 'undefined'){
		unsafeWindow = window;
	}
	if (typeof unsafeWindow.localStorage.responseData != 'undefined' && unsafeWindow.localStorage.responseData != '' ) {
		console.log('callback');
		callback(unsafeWindow.localStorage.responseData);
		unsafeWindow.localStorage.responseData = '';
	} else {
		window.setTimeout(function(){
			if (typeof unsafeWindow == 'undefined'){
				unsafeWindow = window;
			}
			unsafeWindow.superAjaxCallBackWaitress(callback);
		}, 1000);
	}
};


function GM_wait_post_inn() {
	//console.log(unsafeWindow.localStorage.saveOppInnVal == true || unsafeWindow.localStorage.saveOppInnVal == 'true');
	if (unsafeWindow.localStorage.saveOppInnVal == true || unsafeWindow.localStorage.saveOppInnVal == 'true') {
		try{
			obj = eval("(" + unsafeWindow.localStorage.posterData + ")");
		} catch(e) {
			console.log('nValid Json');
		}
		unsafeWindow.localStorage.posterData = '';
		unsafeWindow.localStorage.saveOppInnVal = false;
		if (typeof obj.url != 'undefined' && typeof obj.data != 'undefined'){
			GM_xmlhttpRequest({
			  method: "POST",
			  url: obj.url ,
			  data: obj.data,
			  headers: {
			    "Content-Type": "application/x-www-form-urlencoded"
			  },
			  onload: function(response) {
			  	unsafeWindow.localStorage.responseData = JSON.stringify(response.responseText);
			  }
			});
		}
	}
	window.setTimeout(GM_wait_post_inn, 300);
}


GM_wait_post_inn();