// ==UserScript==
// @name           KLDP Frontpage Changer
// @namespace      purluno@gmail.com
// @include        http://kldp.org/
// @include        http://kldp.org/front-1007
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////
// KLDP Frontpage Changer
// by
// Purluno <purluno@gmail.com>
//
// This work is licensed under the Creative Commons Attribution 3.0 Unported
// License. To view a copy of this license, visit
// http://creativecommons.org/licenses/by/3.0/ or send a letter to Creative
// Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
//

var s = document.styleSheets[document.styleSheets.length - 1];

// Frontpage Changer
(function() {
	// init
	s.insertRule('tbody { border-top: none }', s.cssRules.length)

	var header = document.getElementById('header')
	var content = document.getElementById('content')
	var footer = document.getElementById('footer')
	var wrapper = document.createElement('div')
	header.parentNode.removeChild(header)
	content.parentNode.removeChild(content)
	footer.parentNode.removeChild(footer)

	// header/wrapper
	wrapper.style.width = '910px'
	wrapper.style.background = '#fff url(http://www.phpbb.com/theme/images/bg_body.gif) repeat-y scroll 0 0'
	wrapper.style.margin = '10px auto'
	wrapper.style.textAlign = 'left'
	wrapper.innerHTML =
		'<table cellspacing="0" cellpadding="0" style="table-layout: fixed; width: 910px; background: url(http://www.phpbb.com/theme/images/bg_header.gif) repeat-x scroll 0 0; clear: both">' +
		'<tr>' +
		'<td style="width: 20px; height: 150px; background: transparent url(http://www.phpbb.com/theme/images/sides_top.gif) no-repeat scroll 0 0; display: block"></td>' +
		'<td style="width: 870px; height: 150px; text-align: center; vertical-align: middle; font-family: Arial Black, sans-serif; font-size: 72px; color: #333"><img src="files/bluemarine_logo.png" />KLDP</td>' +
		'<td style="width: 20px; height: 150px; background: transparent url(http://www.phpbb.com/theme/images/sides_top.gif) no-repeat scroll 100% 0; display: block"></td>' +
		'</tr>' +
		'</table>' +
		'<div id="content-wrapper" style="width: 850px; margin: 10px auto"></div>' +
		'<div id="footer-wrapper" style="background: url(http://www.phpbb.com/theme/images/bg_footer.gif) repeat-x scroll 0 100%; clear: both">' +
		'<span style="height: 20px; background: url(http://www.phpbb.com/theme/images/corners_bottom.gif) no-repeat 0 0; display: block"><span style="height: 20px; background: url(http://www.phpbb.com/theme/images/corners_bottom.gif) no-repeat 100% -20px; display: block"></span></span>' +
		'</div>'
	document.body.style.textAlign = 'center'
	document.body.style.backgroundColor = '#aca8a1'
	document.body.insertBefore(wrapper, document.body.firstChild)

	// content
	document.getElementById('content-wrapper').appendChild(content)
	var fw = document.getElementById('footer-wrapper')
	fw.insertBefore(footer, fw.firstChild)
	footer.style.backgroundColor = 'transparent'

	// remove a right sidebar
	var rightSidebar = document.getElementById('sidebar-right')
	rightSidebar.parentNode.removeChild(rightSidebar)

	// remove a mission div
	var mission = document.getElementById('mission')
	mission.parentNode.removeChild(mission)

	// remove a list of old topics
	var googleAd = document.getElementById('block-block-15')
	googleAd.parentNode.removeChild(googleAd.nextSibling.nextSibling)
	//googleAd.parentNode.removeChild(googleAd)

	// change styles (id)
	s.insertRule('#sidebar-left { border: 1px solid #aca8a1; background-color: #f2f0eb; width: 11em }', s.cssRules.length)
	s.insertRule('#main { padding-top: 0 }', s.cssRules.length)

	// change styles (special)
	s.insertRule('.panel-3col-33-stacked .panel-col-top, .panel-3col-33-stacked .panel-col-bottom, .panel-3col-33-stacked .panel-col-first, .panel-3col-33-stacked .panel-col, .panel-3col-33-stacked .panel-col-last { width: 210px; border: 1px solid #aca8a1; background-color: #f2f0eb; padding: 4px; margin-bottom: 10px }', s.cssRules.length)
	s.insertRule('.panel-3col-33-stacked .panel-col-top, .panel-3col-33-stacked .panel-col-bottom { width: auto; }', s.cssRules.length)
	s.insertRule('.panel-3col-33-stacked .panel-col-first, .panel-3col-33-stacked .panel-col, .panel-3col-33-stacked .panel-col-last { width: 209px; }', s.cssRules.length)
	s.insertRule('.panel-3col-33-stacked .panel-col-first, .panel-3col-33-stacked .panel-col { margin-right: 9px }', s.cssRules.length)
	s.insertRule('.view-content-Front-Page table { width: 100% }', s.cssRules.length)

	// change styles (class)
	s.insertRule('.node .picture { border: 1px solid #aca8a1 }', s.cssRules.length)
	s.insertRule('tr.odd, tr.even { background-color: #f2f0eb; border-bottom: 1px solid #aca8a1 }', s.cssRules.length)
	s.insertRule('thead th { border-bottom: 3px solid #aca8a1 }', s.cssRules.length)

	// change styles (general)
	s.insertRule('a:link, a:visited { color: #8a806e }', s.cssRules.length)

})();
