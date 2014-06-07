// ==UserScript==
// @name          Shacknews Gallery Keyboard Nav
// @version			1.0
// @author			DOOManiac
// @namespace     http://doomaniac.shackspace.com/greasemonkey/
// @description   Use the left & right arrow keys to browse images on Shacknews Image Gallery
// @include       http://*.shacknews.com/screenshots.x*
// ==/UserScript==

function evtShackKey(e)
{
	var key = e.keyCode;
	var o = null;

	if (key == 37) // left arrow
		o = unsafeWindow.document.getElementById('overlay_prev');
	else if (key == 39) // right arrow
		o = unsafeWindow.document.getElementById('overlay_next');

	// If we didn't hit the left/right arrow keys OR we don't have a prev image (arrow will be in the DOM, but hidden)
	if (!o || o.style.display == 'none')
		return;

	var fullshot = unsafeWindow.document.getElementById('fullshot');
	var aIMG = fullshot.getElementsByTagName('IMG');
	var wantresize = (aIMG[0] && aIMG[0].width > 775);

	// If we're looking at a big image, we need to resize it down before we switch
	if (wantresize)
	{
		// No idea why I need DOM event stuff for this but eval() for the other crap.  Â¯\(o_Âº)/Â¯
		var evt = document.createEvent('MouseEvents');
		evt.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
		fullshot.dispatchEvent(evt);
	}

	// Go to next or previous image
	eval('unsafeWindow.' + o.href.replace('javascript:', ''));

	// If we had the big image, go back to it
	if (wantresize)
	{
		var enlarger = unsafeWindow.document.getElementById('enlarge_onpic');
		if (enlarger)
			eval('unsafeWindow.' + enlarger.href.replace('javascript:', ''));
	}
}

document.addEventListener('keypress', evtShackKey, false);