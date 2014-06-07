// ==UserScript==
// @name        JVCensure
// @namespace   JVScript
// @include     http://www.jeuxvideo.com/forums/1-*
// @include     http://www.jeuxvideo.com/forums/3-*
// @version     1
// ==/UserScript==

var script = {
	initialize: function() {
		var nodes = document.evaluate('//div[@class="msg msg1" or @class="msg msg2"]', document, null, 7, null)
		for (var i=0 ; i < nodes.snapshotLength; i++ ) 
			this.run(nodes.snapshotItem(i))
	}, 
	run: function(node) {
		var icon = document.createElement('a')
		icon.innerHTML = '<img src="http://image.jeuxvideo.com/pics/forums/bt_forum_bann_48h.gif" alt="Censurer" />'
		icon.setAttribute('style', 'cursor: pointer; margin-right: 3px;')
		var _this = this
		icon.addEventListener('click', function() {			node.style.display = 'none'
		}, false)		
		node.getElementsByClassName('pseudo')[0].appendChild(icon)
	}
}

script.initialize()

