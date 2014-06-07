// ==UserScript==
// @name           Reddit - Hide sidebar
// @author        gavin19
// @description    Hide sidebar
// @include          http://*.reddit.com/*
// @match          http://*.reddit.com/*
// @version    1.01
// ==/UserScript==
(function() {
	var hideSidebar = {
		init: function() {
			var header = document.querySelector('#header'),
				collapseButton = document.createElement('div'),
				userBar = document.querySelector('#header-bottom-right'),
				side = document.querySelector('.side');
			collapseButton.setAttribute('id', 'collapseButton');
			if (userBar.className.match(/navTop/) || window.getComputedStyle(userBar, null).getPropertyValue('top') === '19px') {
				collapseButton.setAttribute('style', 'cursor:pointer;position:absolute;bottom:0;right:0;font-size:20px;');
			} else {
				collapseButton.setAttribute('style', 'cursor:pointer;position:absolute;bottom:23px;right:0;font-size:20px;');
			}
			collapseButton.innerHTML = '&#x25B6;';
			collapseButton.addEventListener('click', function() {
				hideSidebar.toggleSidebar(side);
			});
			header.appendChild(collapseButton);
			if (localStorage.getItem('hideSidebar') === 'true') {
				hideSidebar.toggleSidebar(side, 'off');
			}
		},
		toggleSidebar: function(side, state) {
			var sidebarButton = document.querySelector('#collapseButton'),
				aContent = document.querySelector('a[name="content"]');
			if (state === 'off' || document.querySelector('.side')) {
				side.parentNode.removeChild(side);
				sidebarButton.innerHTML = '&#x25C0;';
				localStorage.setItem('hideSidebar', 'true');
			} else {
				document.body.insertBefore(side, aContent);
				sidebarButton.innerHTML = '&#x25B6;';
				localStorage.setItem('hideSidebar', 'false');
			}
		}
	}
	if (document.body && document.querySelector('#header-bottom-right') && localStorage) {
		setTimeout(function() {
			hideSidebar.init();
		}, 1000);
	}
}());
