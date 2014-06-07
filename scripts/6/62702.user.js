// ==UserScript==
// @name           NoIconBritneySpam
// @namespace      http://twitter.com/rokudenashi
// @include        http://twitter.com/*
// @description        Britneyスパムのアイコンを消す
// ==/UserScript==

(function(){
	var w = this.unsafeWindow || window
	var consoleWindow = null
	var log = function(s) {
		if(!consoleWindow)consoleWindow = open('','console')
		consoleWindow.console.log(s)
	}

	if (w.document.body.innerHTML.match(/Click the link/)) {
		w.$('#profile-image,.profile-pic').hide()
		w.$('.report-for-spam-sidebar-action').css('font-size','xx-large')
	}

})()


