// ==UserScript==
// @name           auto-refresh
// @namespace      tools
// @description    在页面获得焦点的时候自动刷新页面
// @include        http*
// ==/UserScript==

(function() {
	window.addEventListener('load', function() {
		//iframe中的页面不应当自动刷新
		if(window.top !== window) return;
		function shrinkSize() {
			var box = elem.getBoundingClientRect();
			elem.style.left = -(box.right - box.left - paddingRight) + 'px';
		}
		var paddingRight = 8;
		var top = 50;
		var html = "<div id='_auto_fresh_btn' style='z-index: 65535; cursor: pointer; padding: 5px 8px; font-family: \"Microsoft Yahei\", sans-serif; background-color: black; color: white; position: fixed; top: 100px; left: 0; -moz-transition: all 0.3s linear; -webkit-transition: all 0.3s linear; transition: all 0.3s linear;'>开启自动刷新</div>";
		var div = document.createElement('div');
		div.innerHTML = html;
		var elem = document.body.appendChild(div.lastChild);
		elem.style.paddingRight = paddingRight + 'px';
		elem.style.top = top + 'px';
		
		shrinkSize();
		elem.addEventListener('mouseover', function(e) {
		    elem.style.left = 0;
		});
		elem.addEventListener('mouseout', function(e) {
		    shrinkSize();
		});
		elem.addEventListener('click', function(e) {
		    if(elem.innerHTML.indexOf('关闭') != -1 || localStorage.autoRefresh === '1') {
		    	unbind();
		    } else {
		    	bind();
		    }
		});

		function writeText(str) {
			elem.innerHTML = str;
		}
		function bind(timeout) {
			writeText('关闭自动刷新');
			if(timeout)
				setTimeout(function() {
					window.addEventListener('focus', focusHandler);
					}, timeout);
			else
				window.addEventListener('focus', focusHandler);
			localStorage.autoRefresh = 1;
		}
		function unbind() {
			window.removeEventListener('focus', focusHandler);	
			writeText('开启自动刷新');
			localStorage.autoRefresh = 0;
		}
		function focusHandler(e) {
			if(e.target === this && localStorage.autoRefresh === '1')
				window.location.reload();
				//当页面最后有hash的时候，页面是不会刷新的，如http://www.douban.com/group/topic/27609184/?start=100#last
				//window.location = window.location;
		}
		localStorage.autoRefresh === '0' ? writeText('开启自动刷新') : writeText('关闭自动刷新');
		if(/^https?:\/\/((127\.0\.0\.1)|(localhost))/i.test(window.location) && localStorage.autoRefresh !== '0' || localStorage.autoRefresh == 1) {
			bind(3);
		} else {
			unbind();
		}
	});
})();