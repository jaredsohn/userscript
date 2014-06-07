// ==UserScript==
// @name				FA Tooltip Fix
// @namespace		berleberly@aim.com
// @description	Fixes tooltips to not stick off the page.
// @include			http://www.furaffinity.net/
// @include			http://www.furaffinity.net/user/*
// @include			http://www.furaffinity.net/gallery/*
// @include			http://www.furaffinity.net/scraps/*
// @include			http://www.furaffinity.net/favorites/*
// ==/UserScript==

// berleberly@aim.com / AIM:berleberly
// 20 Feb 2007.

// Replacement functions #################################### (replacements) ###
// Just ripped the functions from FA's tooltip.js and edited them.

// Modified to keep the tooltip inside the stinkin' page.
function moveWindow2Mouse() {
	// How far can we go without running off the page?
	var maxX = innerWidth - divID.firstChild.getWidth() - 20;
	// How far to position relative the mouse?
	var newX = mouseX - mouseOffsetX;
	// And do the check/choose in place here...
	divID.style.left = (newX>maxX?maxX:newX)+'px';
	divID.style.top = (mouseY - mouseOffsetY)+'px';
}

// Modified to right-align the usericon and wrap the text around it.
function EnterContent(id,title,content,width) {
	var div = get_by_id(id);
	div.innerHTML = '<table border="0" width="' +width
		+'" cellspacing="1" cellpadding="3" class="hovertable">'
		+'<tr><td class="hovertable_head">' +title
		+'</td></tr><tr><td class="hovertable_body">'
		// I don't much care for the user-icon sitting proud of the text,
		// so I'm gonna change the alignment and remove the break so it'll
		// wrap-around.  If there isn't an image followed by a break then this
		// changes nothing.  (remove the .replace() if you don't like the wrap)
		+content.replace(/\salign='top'\/>\s<br\/>/i, " align='right'> ")
		+'</td></tr></table>';
}

// Do the insertion ############################################ (insertion) ###
// New element
var repblock = document.createElement('div');
// Stuff the element
repblock.innerHTML = '<script type="text/javascript"><!--\n'
	// Move the tooltips to just under the mouse instead of to the right.
	// (We must do this to keep the mouse off the tooltip when the tooltip
	// bounces off the edge of the screen.)
	+'mouseOffsetX=0; mouseOffsetY=-20;\n'
	// I love how easy it is to barf a function into the page like this!  :D
	+moveWindow2Mouse +'\n'
	+EnterContent +'\n'
	+'--></script>\n';
// Now make it part of the page (we'll stick near the very end)
document.body.insertBefore(repblock,document.body.lastChild);

// That's all doc!

///// ///// ///////////////////////////////////////////////////////////////////////////////// berleberly                                                vim:ts=3
