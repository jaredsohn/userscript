// ==UserScript==
// @name           multi RT NG
// @namespace      http://twitter.com/rokudenashi
// @include        http://twitter.com/*
// @description        多重RT禁止！
// ==/UserScript==

(function(){
	var rtre = /^(.*)RT:? @\w*:? ?\1 ?RT @/
	var hide = false
	var bgcolor = '#333333'

	var w = this.unsafeWindow || window
	var consoleWindow = null
	var log = function(s) {
		if(!consoleWindow)consoleWindow = open('','console')
		consoleWindow.console.log(s)
	}

	function setMultiRTStyle() {
		w.$('.hentry').each(function() {
			var e = w.$(this)
			if (w.$('.entry-content',e).text().match(rtre)) {
				e.css('background-color',bgcolor)
				if (hide) e.hide()
			}
		})
	}
	setMultiRTStyle()

	var originalOnPageChange = w.onPageChange
	w.onPageChange=function(A) {
		setMultiRTStyle()
		return originalOnPageChange(A)
	}

})()
