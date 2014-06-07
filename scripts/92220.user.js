// ==UserScript==
// @name           ZenBlogger
// @namespace      *
// @description    Zen-coding for Blogger
// @include        http://*.blogger.com/post-create*
// @include        http://*.blogger.com/post-edit*
// ==/UserScript==

function addPanelZenButton() {
	clearInterval(panel_wait);
	document.getElementById('postingHtmlBox').className += ' zc-use_tab-true zc-pretty_break-true';
	var zen_but_img = document.createElement('img');
			zen_but_img.src = 'http://zen-coding.ru/textarea/zc-powered.png';
			zen_but_img.alt = '';
			zen_but_img.setAttribute('onclick','zen_textarea.showInfo()');
	var zen_but_div = document.createElement('div');
			zen_but_div.id = 'zen-but';
			zen_but_div.style.display = 'inline-block';
			zen_but_div.style.cssFloat = 'right';
			zen_but_div.style.cursor = 'pointer';
			zen_but_div.style.margin = '5px 5px 0 0';
			zen_but_div.appendChild(zen_but_img);
	var post_panel = document.getElementById('postingHtmlToolbar').firstChild;
			post_panel.appendChild(zen_but_div);
	zen_textarea.setup();
}

var zen_js = document.createElement('script');
zen_js.src = 'http://zen-coding.ru/textarea/zen_textarea.js';
zen_js.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(zen_js);

var panel_wait = setInterval(function(){
	if ( document.getElementById('postingHtmlToolbar') ) {
		addPanelZenButton();
	}
},1000);
