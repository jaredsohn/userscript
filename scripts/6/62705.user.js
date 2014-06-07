// ==UserScript==
// @name           Remove Twitter Follower Count
// @namespace      m_aki
// @description    I have the heart of a chicken, so I couldn't stand it.
// @include        http://twitter.com/
// ==/UserScript==

(function(){

	var $r = function(id) {
		var target = document.getElementById(id);
		if(target) {
			var parent = target.parentNode;
			parent.removeChild(target);
		}
	};

	$r('follower_count_link');

})();