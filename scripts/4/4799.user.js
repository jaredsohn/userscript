// ==UserScript==
// @name	Only Slashdot News/Comments
// @namespace	http://slashdot.gedekran.com
// @author	Kristopher
// @description	Removes all content on Slashdot except News and Comments.
// @include	http://slashdot.org/*
// @include	http://*.slashdot.org/*
// ==/UserScript==    

(function() {
head = document.getElementsByTagName('head')[0];
	    if (head)
    {
		style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML =
			'body { width: 100%; min-width: 0px; background: #ffffff; border: 0px; padding: 0; }\n' +
			'#wrapper, #contents  { width: 100%; border: 0px; padding: 0px; margin: 0px; }\n' +
			'#articles { width: 98%; margin: 1% }\n' +
			'#frame { padding: 0px; border-top: 0px; background: #ffffff; }\n' +
			'.ad1, .lb, .ad6, .content, .copyright, .btmnav, .google, .tags { display: none; }\n' +
			'#ostgnavbar, #topnav, #slashboxes, #fad1, #fad6, #links, #message, #footer, #advertisement-content, 

#poll-content, #olderstuff-content { display: none; }\n' +
			'#art1, #art2, #slink1, #slink1 .comments, #slink2, #slink2 .comments { margin-right:0; 

padding:0;}\n' +
			'.article  {width: 100%;}\n' +
			'#commentlisting {padding:0;}\n' +
			'.nbutton, .nbutton {background:transparent !important; padding:0 !important;}\n' +
			'.nbutton p {margin:0 !important;}\n' +
			'.nbutton p b a {color:#005555 !important; font-weight:bold !important; text-decoration:underline 

!important;}\n' +




		head.appendChild(style);
	}
})();