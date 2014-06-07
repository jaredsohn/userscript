// ==UserScript==
// @name XVideos download video
// @namespace http://userscripts.org/users/471458
// @author pegasusph
// @version 1
// @description Includes a download link. Adapted from "XVideos Enhanced" (http://userscripts.org/scripts/show/142671)
// @include http://www.xvideos.com/video*
// @require http://code.jquery.com/jquery.min.js
// ==/UserScript==

(function () {
	$('<a>')
		.css({
			'background': 'url("../img/xv-button-bg.png") repeat-x scroll left top #F7F7F7',
			'border': '1px solid #918E8C',
			'cursor': 'pointer',
			'font-size': '14px',
			'padding': '3px 10px',
			'float': 'left',
			'margin': '0 10px 0 0',
			'text-decoration': 'none'
		})
		.attr('href', unescape($('embed').attr('flashvars').match(/flv_url=(.*)&url/)[1]))
		.text('Download')
		.insertAfter('li[data-ref="tabEmbed"]');
}
)();