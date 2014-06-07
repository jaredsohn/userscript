// ==UserScript==
// @name	Only Digg News/Comments, Toggle Header
// @namespace	http://digg.gedekran.com
// @author	Kristopher
// @description	Removes all content on Digg except News and Comments and allows the user to toggle the header.
// @include	http://digg.com/*
// @include	http://www.digg.com/*
// ==/UserScript==

(function() {

header = document.getElementById('h');
		header.style["display"] = "none";

if(document.getElementById('h')) {
	var ls = document.createElement('div');
	ls.id = 'lsHeader';
	ls.title = 'Enable Header';
	ls.setAttribute('style', 'background: #1B5790; width: 100%; margin: auto; height: 8px; position: absolute; top:0; z-index: 5; left:0%; cursor: pointer; border-bottom : 1px solid #B2D281;');
	ls.addEventListener('click', function(event) {



if(!header.style.display) {
		header.style.display = 'none';
		this.title = 'Enable Header';
		GM_setValue('disableLeft', true);
	} else {
		header.removeAttribute('style');
		this.title = 'Disable Header';
		GM_setValue('disableLeft', false);
	}
	}, false);
		document.body.insertBefore(ls, document.body.firstChild);
	}


head = document.getElementsByTagName('head')[0];
	if (head)
	{
		style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML =
			'html {  min-width: 0px; }\n' +
			'body {  padding: 0px; background: #fff; }\n' +
			'#container {  width: 100%; margin: auto; padding-top:9px; }\n' +
			'#contents {  width: 100%; padding: 0px; background: #fff; margin: 0px; }\n' +
			'#wrapper {  width: 100%; padding: 0px; padding-top: 3px;  background: #fff; min-height: 0px; }\n' +
			'#announce, #announce-invite, #header-short, #join-digg, #sethome, #sub-nav, #footer, .sidebar, .news-submitted, .copyright, .user-info  {  display: none; }\n' +
			'#item_ad, .item_ad_image, .banner_ad_unit, .top_ad_unit, .top_ad_image, .single_ad_unit, .comments_ad_image, .sidebar-short { display: none; }\n' +
			'.c-body {  padding-left:10px; }\n' +	'.extra-nav, .sub-menu, .news-full, .comment, .main { width: 100%; }\n' +
			'.pages { margin-left: 15%; }\n' +
			'.comment ol li { padding-right: 0px; padding-left: 0px; padding-top: 4px; padding-bottom: 4px; }\n' +
		head.appendChild(style);
	}
})();