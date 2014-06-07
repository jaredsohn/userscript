// ==UserScript==
// @name	Only Digg News/Comments
// @author	Kristopher
// @description	Removes all content on Digg except News and Comments.
// @include	http://digg.com/*
// @include	http://www.digg.com/*
// ==/UserScript==


(function() {

head = document.getElementsByTagName('head')[0];
	if (head)
	{
		style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML =
			'html {  min-width: 0px; }\n' +
			'body {  padding: 0px; background: #fff; }\n' +
			'#h { display: none; }\n' +
			'#container {  width: 100%; margin: auto; border-top:0px; padding-top:0px; }\n' +
			'#contents {  width: 100%; padding: 0px; background: #fff; margin: 0px; }\n' +
			'#wrapper {  width: 100%; padding: 0px; padding-top: 0px;  background: #fff; min-height: 0px; }\n' +
			'#announce, #announce-invite, #header-short, #join-digg, #sethome, #sub-nav, #footer, .sidebar, .news-submitted, .copyright, .user-info, .selector {  display: none; }\n' +
			'#item_ad, .item_ad_image, .banner_ad_unit, .top_ad_unit, .top_ad_image, .single_ad_unit, .comments_ad_image, .sidebar-short { display: none; }\n' +
			'.c-body {  padding-left:10px; }\n' +			
			'.extra-nav, .sub-menu, .news-full, .comment, .main { width: 100%; }\n' +
			'.comment ol li { padding-right: 0px; padding-left: 0px; padding-top: 4px; padding-bottom: 4px; }\n' +
			'.pages { margin-left: 15%; }\n' +
		head.appendChild(style);
	}
})();