// ==UserScript==
// @name		Fanfiction.net Accesskey Navigation
// @namespace	Crazycatz00
// @match		*://www.fanfiction.net/s/*
// @icon		http://www.fanfiction.net/favicon.ico
// @downloadURL	https://userscripts.org/scripts/source/172728.user.js
// @updateURL	https://userscripts.org/scripts/source/172728.meta.js
// @version		1.1.1
// @grant		none
// @copyright	2013 Crazycatz
// ==/UserScript==

var p={click:function(){'use strict';console.log('Can\'t find PREV button!');}},n={click:function(){'use strict';console.log('Can\'t find NEXT button!');}};
Array.filter((document.getElementById('content_wrapper_inner')||document).getElementsByTagName('button'),function(e){'use strict';if(e.textContent.indexOf('Prev')>=0){p=e;}else if(e.textContent.indexOf('Next')>=0){n=e;}return false;});
document.addEventListener('keydown',function(e){'use strict';
	if(e.ctrlKey){
		switch(e.keyCode){
			case 37:p.click();break;
			case 38:window.scrollTo(0,0);break;
			case 39:n.click();break;
			case 40:window.scrollTo(0,document.body.scrollHeight);break;
		}
	}
},false);