// ==UserScript==
// @name			GoToLivepreview for Envato's marketplaces
// @creator			userscripts@revaxarts.com
// @namespace		revaxarts.com
// @description		Envato Livepreviews for Thumbs
// @date			2012-08-22
// @version			0.4
// @include			http://activeden.net/*
// @include			http://themeforest.net/*
// @include			http://3docean.net/*
// @include			http://codecanyon.net/*
// ==/UserScript==
(function () {



	function gotolivepreview() {
		
			var marketplace = location.hostname.split('.').shift();

	$('img[data-preview-url]').each(function () {
		var _this = $(this),
			itemname = _this.data('itemName');
		wrapper = _this.parent().parent();
		if (!wrapper.is('.thumbnail')) return false;

		var href = wrapper.find('a').attr('href').split('?')[0],
			id = href.split('/').pop(),
			livepreview = href.replace(id, 'full_screen_preview/' + id);
		wrapper.hover(function () {
			$(this).find('a.gotolivepreview').fadeIn(100);
		}, function () {
			$(this).find('a.gotolivepreview').fadeOut(100);
		});

		$('<a>', {
			"class": "gotolivepreview",
			title: 'Livepreview of ' + itemname,
			href: livepreview
		}).css({
			"position": "absolute",
			"display": "block",
			"border": "0 !important",
			"padding": "2px 4px"
		}).html('<img src="http://0.envato-static.com/images/' + marketplace + '/buttons/sticky.png" width="11" height="11" title="Livepreview of ' + itemname + '" alt="" />').hide().prependTo(wrapper);

	});

	$('a.gotolivepreview').live('click', function (event) {
		event.stopPropagation();
		event.preventDefault();
		window.open(this.href);
	});
	
	

	if (location.href.match(/full_screen_preview/)) {
		if($.trim($('h1').html()) == 'Page Not Found'){
			location.href = location.href.replace('full_screen_preview/','');
		}
	}



	}

	var inject = document.createElement("script");

	inject.setAttribute("type", "text/javascript");
	inject.appendChild(document.createTextNode("(" + gotolivepreview + ")()"));

	(document.head || document.documentElement).appendChild(inject);


})();