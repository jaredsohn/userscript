// ==UserScript==
// @name        JVPost
// @namespace   JVScripts
// @include     http://www.jeuxvideo.com/forums/1-*
// @version     0.1
// @grant       none
// ==/UserScript==

"use strict"

var script = {
	initialize: function() {
		var nodes = document.evaluate('//div[@class="msg msg1" or @class="msg msg2"]', document, null, 7, null)
		for (var i=0 ; i < nodes.snapshotLength; i++ ) 
			this.run(nodes.snapshotItem(i))
	}, 
	run: function(node) {
	   var postNumber = node.getElementsByClassName('ancre')[0].getElementsByTagName('a')[0].getAttribute('href').match(/.+#message_([0-9]+)$/)[1]
	   var target = node.getElementsByClassName('date')[0]
	   target.textContent += '- N°' + postNumber
	}
}

script.initialize()