// ==UserScript==
// @name           TwitterRTIcon
// @namespace      http://twitter.com/rokudenashi
// @include        http://twitter.com/*
// @description        twitterの公式Retweetにアイコンを表示
// ==/UserScript==

(function(){
	var w = this.unsafeWindow || window
	var consoleWindow = null
	var log = function(s) {
		if(!consoleWindow)consoleWindow = open('','console')
		consoleWindow.console.log(s)
	}

	function filter() {
		w.$('.shared-content a:not(.TwitterRTIcon)').each(function() {
			var link = w.$(this)
			link.append('<img src="http://usericons.relucks.org/twitter/'+this.href.match(/\w+$/)+'" width=24 height=24>')
			link.addClass('TwitterRTIcon')
		})
	}
	filter()

	var originalOnPageChange = w.onPageChange
	w.onPageChange = function(A) {
		filter()
		return originalOnPageChange(A)
	}
	var originalProcessTimelineRefresh = w.processTimelineRefresh
	w.processTimelineRefresh = function(J,D) {
		originalProcessTimelineRefresh(J,D)
		filter()
	}

})()
