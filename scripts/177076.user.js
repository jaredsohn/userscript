// ==UserScript==
// @name        HITPTHelper
// @namespace   PT
// @description helper for pt.hit.edu.cn
// @include     http://pt.hit.edu.cn/torrents.php*
// @version     1.2
// ==/UserScript==

(function(){
	var torrents = document.getElementsByClassName('torrentname');
	
	for (i=0, l=torrents.length; i<l; i++){

		tor = torrents[i].getElementsByTagName('a')[0];
		
		var msg = document.createElement("span");
		
		tor.onmouseover = function(){
		
			var req = new XMLHttpRequest();
			req.open('GET', this.href, null);
			req.send(null);
			if (req.status != 200)
				return;
			var doc = document.implementation.createHTMLDocument("torInfo");
			doc.documentElement.innerHTML = req.responseText;
			var docel = doc.documentElement;
			var text = docel.textContent||docel.innerText; //textContent for firefox and innerText for chrome
			var scoreInfo = text.match(/豆瓣评分：[^\u4e00-\u9fa5]*/g);
			
			
			msg.innerHTML = scoreInfo;
			
			msg.style.cssFloat = "right";
			this.appendChild(msg);
		};
		tor.onmouseout = function(){
			this.removeChild(msg);
		};
	}
})();