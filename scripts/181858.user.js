// ==UserScript==
// @name        Loading.se
// @namespace   http://loading.se/
// @version     0.1.0
// @description 
// @match       http://loading.se/*
// @copyright   vieekk 2013
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

var L = (function ($) {
	function L() {
		this.$title = $('title');

		this.notifications = 0;

		this.init();
		this.ajax();
	}

	function ajax() {
		var that = this;

		setInterval(function () {
			$.ajax(window.location.pathname, {
				type: 'GET',
				dataType: 'html',
				success: function (html) {
					$('div.rgt').html($(html).find('div.rgt').html());
					that.update();
				}
			});
		}, 60000);
	}

	function checkForNotifications() {
		var sum = 0;

		$('div.rgt > a.pictos > span').each(function () {
		    sum += parseInt($(this).text().trim());
		});

		var temp = this.notifications;
		this.notifications = sum;

		return temp !== this.notifications;
	}

	function init() {
		this.skipAds();
	}

	function skipAds() {
		// very, very ugly, will fix
		if (document.getElementsByTagName('body')[0].innerHTML.match(/Fortsätt till Loading.se/).length > 0) location.reload();
	}

	function update() {
		if (this.checkForNotifications())
			this.updateTitle();
	}

	function updateTitle() {
		var title = this.$title.html().trim();

		if (this.notifications > 0)
			this.$title.html('(' + this.notifications + ') ' + title);
	}

	L.prototype.constructor = L;
	L.prototype.ajax = ajax;
	L.prototype.checkForNotifications = checkForNotifications;
	L.prototype.init = init;
	L.prototype.skipAds = skipAds;
	L.prototype.update = update;
	L.prototype.updateTitle = updateTitle;

	return L;
})(jQuery);

new L();