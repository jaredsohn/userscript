// ==UserScript==
// @name          The Student room space maximiser v2
// @namespace     http://none/
// @description   Removes TSR header and 'featured content'
// @include       http://www.thestudentroom.co.uk/*
// @include       http://thestudentroom.co.uk/*
// @date          2009-01-26
// @version       0.2
// @GM_version    0.5.4
// ==/UserScript==

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];	
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style); 
}

var headerlogo = document.getElementById('header_logo');
dummyDiv = document.createElement('div');
dummyDiv.innerHTML = '<div style="font-weight:bold;"><a href="' + document.location.host + '">TSR Home</a></div>';
document.body.insertBefore(dummyDiv.firstChild, headerlogo);

// var headerlogo, gmheader;
// headerlogo = document.getElementById('header_logo');
// if (headerlogo) {
//    gmheader = document.createElement("div");
//    gmheader.innerHTML = '<a href="http://www.thestudentroom.co.uk/">TSR Home</a>';
//    main.parentNode.insertBefore(gmheader, headerlogo);
// }


// add css
addGlobalStyle('#header_logo { display:none!important; }');
addGlobalStyle('#featuredContent { display:none!important; }');
addGlobalStyle('.mainmenu { display:none!important; }');
