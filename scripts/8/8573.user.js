// ==UserScript==
// @name           Googlestream
// @namespace      http://dttvb.yi.org/
// @description    Stream Google Resules
// @include        http://www.google.*/search*q=*
// ==/UserScript==

//
// Googlestream - Stream search results...
//

(function() {

var streamEnabled = false;
var streamTimer = 0;

//
// Get the top
//
function t(el) {
	var tmp = el.offsetTop;
	el = el.offsetParent;
	while (el) {
		tmp += el.offsetTop;
		el = el.offsetParent;
	}
	return tmp;
}

//
// The hooked element.
//
var hookedElement = false;

//
// Height
//
var addHeight = 0;

//
// Search for it first.
//
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i ++) {
	if (divs[i].firstChild && divs[i].firstChild.nodeName == 'DIV' && divs[i].firstChild.className == 'g') {
		hookedElement = divs[i];
		break;
	}
}

//
// Scroll effects.
//
function addMoreTo() {
	//
	// Add the height.
	//
	addHeight += 1;
	
	//
	// Calculate the final height using an equation.
	// Note that 3.1846579849 and 9.498435255614 were just a random number!
	// So that it gives a unique effect.
	//
	var ah = Math.pow(addHeight / 3.1846579849, 2.2) * 9.498435255614;
	
	//
	// Finally, the height exceeds.... Stop the animation now!!
	//
	if (ah > hookedElement.firstChild.offsetHeight) {
		//
		// Start hooking again.
		//
		hookedElement.style.height = '';
		setTimeout (alal, 500);
		return;
	}
	
	//
	// Not yet, set it.
	//
	hookedElement.style.height = Math.round(ah) + 'px';
	setTimeout (addMoreTo, 5);
}

//
// On document loaded:
//
function ndocl(rd) {
	//
	// Search for the navbar, we need it.
	//
	var rt = rd.responseText.match(/<div[^>]*?id=navbar[^>]*?>(.*?)<\/table><\/div>/i);
	
	//
	// But if IT DOESNT EXISTS!!!! Bye!
	//
	if (!rt)
		return false;

	//
	// Oops, it exists. However we also need to get the results.
	//
	var rs = rd.responseText.match(/<!--a--><div>((.|\r|\n)*?)<!--z-->/i);
	
	//
	// But if IT DOESNT.. am I shouting too loud?
	//
	if (!rs)
		return false;
	
	//
	// Everything is ok, so change the navbar, and then create more...
	//
	document.getElementById('navbar').innerHTML = rt[1];
	
	//
	// Create another div.
	//
	var newdiv = [document.createElement('div'), document.createElement('div')];
	newdiv[0].appendChild (newdiv[1]);
	newdiv[0].style.overflow = 'hidden';
	newdiv[0].style.height = '0';
	newdiv[0].style.paddingTop = '1px';
	newdiv[0].style.marginTop = '-1px';
	
	//
	// Set its HTML.
	//
	newdiv[1].innerHTML = rs[1];
	
	//
	// Insert it and hook it.
	//
	hookedElement.parentNode.insertBefore (newdiv[0], hookedElement.nextSibling);
	hookedElement = newdiv[0];
	
	//
	// Cool scroll effect!
	//
	addHeight = 0;
	setTimeout (addMoreTo, 100);
}

//
// The function..
//
function alal() {

	//
	// Stream must be enabled
	//
	if (!streamEnabled)
		return;

	//
	// Get the scroll offset need.
	//
	var targ = (t(hookedElement) + hookedElement.offsetHeight) - window.innerHeight;
	
	//
	// And then compare with the current one.
	//
	if (window.scrollY > targ) {
		//
		// Check what we need.
		//
		if ((!document.getElementById('nn')) || (!document.getElementById('nn').parentNode) || (!document.getElementById('nn').parentNode.href))
			return;
		
		//
		// Get the next page's URL.
		//
		var unp = document.getElementById('nn').parentNode.href;
		
		//
		// Send the request!
		//
		GM_xmlhttpRequest ({
			'method' : 'GET',
			'url'    : unp,
			'onload' : ndocl
		});
		
		//
		// Until...
		//
		return;
	}
	
	streamTimer = setTimeout(alal, 200);
	
}

//
// The element was not found -- was not a google search page.
//
if (hookedElement === false)
	return;

//
// Found -- Googlestream ready?
//
var toggler = unsafeWindow.document.createElement('a');
toggler.style.position   = 'fixed';
toggler.style.top        = '2.4em';
toggler.style.right      = '0.8em';
toggler.style.background = '#ffe';
toggler.style.padding    = '0.6em';
toggler.style.border     = '1px solid #000';
toggler.style.font       = '0.75em Verdana, "Bitstream Vera Sans", Helvetica, sans-serif';
toggler.style.color      = '#00f';
toggler.href = '#';
toggler.innerHTML = 'Enable Googlestream';
toggler.onclick = function() {
	streamEnabled = !streamEnabled;
	clearTimeout (streamTimer);
	toggler.innerHTML = 'Enable Googlestream';
	if (streamEnabled) {
		streamTimer = setTimeout(alal, 200);
		toggler.innerHTML = 'Disable Googlestream';
		GM_setValue ('enabld', '1');
		return false;
	}
	GM_setValue ('enabld', '0');
	return false;
}

document.body.appendChild (toggler);

if (GM_getValue('enabld', '0') == '1') {
	toggler.onclick ();
}

})();