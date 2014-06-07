// ==UserScript==
// @name				GrooveShark Anywhere Enabler
// @namespace			http://blog.vienalga.net
// @description			GreaseMonkey script to enable GrooveShark Anywhere functionality
// @author				Cukurgalva
// @version				0.4.1
// @include				http://grooveshark.com/*
// @include				https://grooveshark.com/*
// ==/UserScript==


(function(win, doc, func, _getTime){
	_getTime = win.Date.prototype.getTime;
	func = function() {
		if (win.tokenData && win.tokenData.getGSConfig && win.tokenData.getGSConfig.user){
			if (win.tokenData.getGSConfig.user.IsActive){
				win.tokenData.getGSConfig.user.Flags = 4194303;
				win.tokenData.getGSConfig.user.IsPremium = "1";
				
				win.Date.prototype.getTime = _getTime;
			}
		}
	};

	win.Date.prototype.getTime = function(){func(); return _getTime.call(this)};
	func();
})(unsafeWindow || window || this, document);
