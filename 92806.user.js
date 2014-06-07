// ==UserScript==
// @name           CB_HELLO_WORLD
// @namespace      CB_HELLO_WORLD
// @description    A sample Hello world script.
// @include        http://www.codebyter.com
// ==/UserScript==

//------------------------------------------------------------------------------
(function(window, document, undefined){
	function test(){
		var self = this;
		self.init = function(){
			alert('hello world');
		};
	};
	window.$test = new test();
	$test.init();
})(window, document);
//------------------------------------------------------------------------------