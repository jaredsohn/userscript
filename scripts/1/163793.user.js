// ==UserScript==
// @name            get-urls-from-kuai.xunlei.js
// @description     get urls from kuai.xunlei.com
// @namespace       http://yourwebsite.com
// @version         0.1.0
// @author          Jokester ( github/jokester )
// @license         MIT
// @released        2013-04-02
// @updated         2013-04-02
// @match           *://kuai.xunlei.com/*
// @run-at          document-start
// ==/UserScript==
(function () {
    'use strict';
 
	// before the DOM has loaded
	
	document.addEventListener('DOMContentLoaded', function (e) {
		// after the DOM has loaded
		
		// silently fails in Firefox if placed outside when `document-start`
		var helper = $('<div id="get-urls-helper">');
		var button = $('<button>').text('get url');
		var url_list = $('<textarea>');
		
		button.click(function(){
		  var a_s = $('a.file_name');
		  a_s.map(function(index,a){
		      var old_text = url_list.text();
		      var line = a.href + "\n";
		      url_list.text( old_text + line );
		  });
		} );
		helper.append(button,url_list);
		$('div.adb_txt').after(helper);
	});
})();