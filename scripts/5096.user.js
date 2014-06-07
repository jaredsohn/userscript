// ==UserScript==
// @name	Only Piratebay Torrents/Comments
// @namespace	http://piratebay.gedekran.com
// @author	Kristopher
// @description	Removes all content on Piratebay except Torrents and Comments.
// @include	http://*thepiratebay.org*
// ==/UserScript==

(function() {
head = document.getElementsByTagName('head')[0];
	if (head)
	{
		style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML =
			'#content { width: 100%; padding: 0px; background: #fff; }\n' +
			'#main-content { width: 100%; padding: 0px; margin: 0px }\n' +
			'img { display: none; }\n' +
			'img.dl { display: inline }\n' +
			'script { display: none; }\n' +
			'noscript { display: none; }\n' +
			'h3 { display: none; }\n' +
			'.ad { display: none; }\n' +
			'.ads { display: none; }\n' +
			'adbrite-banner { display: none; }\n' +
			'.spons-link { display: none; }\n' +
			'.nfo { width: 96%; border: none; font-size: 100%; line-height: 110%;  }\n' +
			'#sky-banner { display: none; }\n' +
			'#fbanners { display: none; }\n' +
			'#p.info { display: none; }\n' +
			'#details { font-size: 1.0em; }\n' +
			'#details pre { font-size: 1.0em; }\n' +
			'#detailsframe { width: 100%; }\n' +
			'#detailsouterframe { width: 100%; }\n' +
			'#comments { font-size: 1.0em; }\n' +
			'#footer { display: none; }\n' +
			'#foot { display: none; }\n' +
			'#p.info textarea { display: none; }\n' +
		head.appendChild(style);
	}
})();