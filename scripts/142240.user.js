// ==UserScript==
// @name           Conejo
// @namespace      http://www.plurk.com/
// @downloadURL    http://www.plurk.com/
// @include        http://www.plurk.com/*
// author: yo
// @version        0.500
// ==/UserScript==

if (typeof(timestamp) == "undefined") {
	var timestamp = new Date().getTime();
}

if(window.location.host!="www.plurk.com"){
		//alert("Blablabla");
}else{
	
	if(typeof(CTPLURK) !== 'undefined' && CTPLURK != null) {
    	//alert('Blablabla');
	}else{

		var CTPLURK = true;
		var _unique_main = function () {
			var jquery_oop 	= document.createElement('script');
			jquery_oop.type = 'text/javascript';
			jquery_oop.src 	= 'http://citytalk.tw/jquery-oop.js?' + timestamp;

			var jquery_tpl 	= document.createElement('script');
			jquery_tpl.type = 'text/javascript';
			jquery_tpl.src 	= 'http://citytalk.tw/jquery-tpl.js?' + timestamp;

			var plurk 	= document.createElement('script');
			plurk.type 	= 'text/javascript';
			plurk.src 	= 'http://citytalk.tw/plugin_plurk_plurk.js?' + timestamp;
			
			document.body.appendChild(jquery_oop);
			document.body.appendChild(jquery_tpl);
			document.body.appendChild(plurk);

			
				/*
			var plurkjs = document.createElement('script');
			plurkjs.setAttribute('type', 'text/javascript');
			plurkjs.setAttribute('src', 'http://statics.plurk.com/74da709f3eebb942ade9da6ad760056f.js.jgz?');
				
			document.body.appendChild(plurkjs);
			
			var plurkjs2 = document.createElement('script');
			plurkjs2.setAttribute('type', 'text/javascript');
			plurkjs2.setAttribute('src', 'http://statics.plurk.com/3020c9e73b812e4d59520d1a73893933.js.jgz?');
				
			document.body.appendChild(plurkjs2);
		
			var plurkjs3 = document.createElement('script');
			plurkjs3.setAttribute('type', 'text/javascript');
			plurkjs3.setAttribute('src', 'http://statics.plurk.com/62ad00a411a9ab43fc18d0767ebe8e91.js.jgz?');
				
			document.body.appendChild(plurkjs3);
			
			var plurkjs4 = document.createElement('script');
			plurkjs4.setAttribute('type', 'text/javascript');
			plurkjs4.setAttribute('src', 'http://statics.plurk.com/5ebcb5c9dab23ea6a88bc40b35dbc061.js.jgz?');
				
			document.body.appendChild(plurkjs4);
			
			var plurkjs5 = document.createElement('script');
			plurkjs5.setAttribute('type', 'text/javascript');
			plurkjs5.setAttribute('src', 'http://statics.plurk.com/5a289dd05bcf8ffde291cffeef1c8946.js.jgz?');
				
			document.body.appendChild(plurkjs5);
			*/
		};
		
		// if (typeof jQuery != 'function' || typeof jQuery().jquery != 'string') {
			// var _unique_doc = document.getElementsByTagName('head')[0];
			// var _unique_js = document.createElement('script');
			// _unique_js.setAttribute('type', 'text/javascript');
			// _unique_js.setAttribute('src', 'http://citytalk.tw/jquery142.js?' + timestamp);
			// _unique_doc.appendChild(_unique_js);
			// _unique_trytrygo = function () {
				// if (typeof jQuery == 'function' && typeof jQuery().jquery == 'string') {
					// clearInterval(_unique_mainIntv);
					// _unique_main();
				// }
			// };
			// var _unique_mainIntv = setInterval(_unique_trytrygo, 300);
			
		// } else {
			//jQuery.noConflict();
			// _unique_main();
		// }
		_unique_main();
	}
}
