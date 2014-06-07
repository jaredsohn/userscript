// ==UserScript==
// @name          Flickr BBCode Creator
// @namespace     http://github.com/jufemaiz/jmc_flickr_gm_flickr-bbcodeshare
// @description   Provide BBCode for Flickr's new beta page
// @include       http://*flickr.com/photos/*
//
// ==/UserScript==
//

var $;

    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');
			
		// ...then load up the jQuery interface
        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();

	// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

	// Load 'em up!
	function letsJQuery(){
		// Sharing
		var htmlShare = $('#share-menu-options-embed .share-menu-options-inner');
		var bbcodeShare = htmlShare.clone();
		bbcodeShare.attr('id','share-menu-options-embed-bbcode');
		bbcodeShare.insertAfter(htmlShare);
		bbcodeShare = $('#share-menu-options-embed-bbcode');
		
		// Update the textareas
		$('textarea.embed-markup', bbcodeShare).each(function(){
			var toBbcode = $(this);
			var bbCode = '';
			var pageUrl = location.href;
			var imageUrl = '';
			var regex = new RegExp(/(http:\/\/farm\d\.static\.flickr\.com\/\d+\/[a-zA-Z_0-9\.]+)/);
			var matches = regex.exec(toBbcode.attr('innerHTML'));
			if(matches == null) {
				toBbcode.html('[url=' + pageUrl + '][img]' + pageUrl + '[/img][/url]');
			} else {
				imageUrl = matches[0];
				toBbcode.html('[url=' + pageUrl + '][img]' + imageUrl + '[/img][/url]');
			}
		});
		
		// Update the event management for the select
		$('select#sharing_size', bbcodeShare).change(function(){
			var type = {'Square' : '-sq','Thumbnail':'-t','Small':'-s','Medium':'','Medium 640':'-z','Large':'-l','Original':'-o'};
			$("option:selected", this).each(function() {
				var option = $(this);
				var bbShareId = '#share-menu-options-embed-textarea' + type[option.attr('value')];
				$('#share-menu-options-embed-bbcode textarea.embed-markup:visible').hide();
				$('#share-menu-options-embed-bbcode textarea.embed-markup' + bbShareId).show();
			});
		});	
	}