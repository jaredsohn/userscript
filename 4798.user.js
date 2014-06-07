// ==UserScript==
// @name	Only Fark News/Comments
// @namespace	http://fark.gedekran.com
// @author	Kristopher
// @description	Removes all content on Fark except News and Comments.
// @include	http://fark.com/*
// @include	http://*.fark.com/*
// ==/UserScript==

(function() {

head = document.getElementsByTagName('head')[0];
	if (head)
	{
		style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML =
			'body { background: #ffffff; margin:0px; padding:0px;}\n' +
			'#siteContainer { position: absolute; width: 100%; margin: 0px; min-width:0px; padding:0px;}\n' +
			'#bodyContainer { width: 100%; margin: 0px; min-width:0px;}\n' +
			'#bodyMainContainer { width: 100%; padding: 0px; margin: 0px; min-width:0px;}\n' +
			'#headerTop, #topMenu, #bodyTabContainer, #footer, #bodyRightSideContainer, .ncbar, .mainerr, .notifyBigBrother, .comlinkcount { display: none; }\n' +
			'#bodyHeadlineContainer { width: 100%; padding: 0px; border:0px; background: #ffffff;}\n' +
			'.mainDate { border-top:solid #3d3d3d 2px; border-bottom:solid #3d3d3d 2px;}\n' +
			'.headlineRow:hover { background:#fff; }\n' +
			'.loginTable { margin:0px; }\n' +
			'#bodyFarkives, #bodyFarkives a { color: #000; }\n' +
			'#commentsArea { width: 100%;}\n' +
			'#commentsArea .ctable, #commentsArea .ctableTF  { width: 100%; padding:0 0 0 8px; margin:0px; border:0px; border-top:2px solid #3d3d3d; border-bottom:2px solid #3d3d3d;}\n' +
			'#commentsPostingArea, #commentsPostingArea .commentPostingTable { width: 100%; margin:0px; border: 0px;}\n' +
			'#commentsPostingArea .mainsmall { margin:5px;}\n' +

		head.appendChild(style);
	}
})();