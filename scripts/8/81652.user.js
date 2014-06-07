// ==UserScript==
// @name        Reddit.min
// @description Minimize Reddit
// @creator     Gideon Gauss (gideonvd)
// @include     http://reddit.com
// @include     http://*.reddit.com
// @include     http://reddit.com
// @include     http://*.reddit.com/
// @include     http://reddit.com/*
// @include     http://*.reddit.com/*
// @version     0.2 
// @date         5-7-2011
// ==/UserScript==

// Uses: Front Page Tabs by violentacrez
//       Toggle Side by theplaceboeffect 

// Known Bugs: Login remains visible after login
//	       Top border flashes on toggle
//             Front page should be more accessible			   

// Check if jQuery's loaded
    function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { 
			window.setTimeout(GM_wait,100); 
		}else{ 
			letsJQuery(); 
		}
    }
    GM_wait();

// Add Row Color and Padding
var color = '#f0f0f0';

	GM_addStyle(".odd {background-color: " + color + " !important}");
	GM_addStyle('.even {padding: 5px;}');
	GM_addStyle('.tabmenu li.min a {background-color: #f8d4ce;}');
 
// Add Style Login
	GM_addStyle('.side {background-image: none; padding: 20px; margin-top:-1px;border:1px solid #5F99CF}');
	
// Minimise	
	GM_addStyle('.footer-parent,.organic-listing,.thumbnail,#header-img,.create,.promoted,.rank,#ad-frame{display:none}');

// Add Tabs
(function() {

var menu = document.getElementsByClassName('tabmenu')[0];

var newtabs = new Array()
	newtabs[0] = "http://www.reddit.com/submit";
	newtabs[1] = "http://www.reddit.com/reddits/create";
	newtabs[2] = "http://www.reddit.com/search";
	newtabs[3] = "http://www.reddit.com";

var titles = new Array()
	titles[0] = "submit";
	titles[1] = "create";
	titles[2] = "search";
	titles[3] = "home";

for (var i = 0; i < newtabs.length; i++) {

	var li = document.createElement('li');
		li.className = 'min';
	var a = document.createElement('a');
	var text = document.createTextNode(titles[i]);

	a.setAttribute('href', newtabs[i]);
	a.appendChild(text);
	li.appendChild(a);
	menu.appendChild(li);
}

})();



// Infinite Lolz