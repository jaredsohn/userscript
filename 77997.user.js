// ==UserScript==
// @name           Better Brizzly Social Icons
// @namespace      http://tylersticka.com/
// @version        1.1
// @description    Replaces Brizzly's new Twitter and Facebook tab icons with prettier ones. Also fixes the tab's font for those without Helvetica Neue.
// @include		   http://brizzly.com/*
// ==/UserScript==

function resetInterval() {
	clearInterval(interval);
	attempts = 0;
}

function updateAttempts() {
	attempts++;
	if (attempts >= maxAttempts) {
		consoleLog('Sorry, but we failed to locate the necessary DOM elements after ' + attempts + ' attempts.');
		resetInterval();
	}
}

function consoleLog(msg) {
	if (console) console.log('Better Brizzly Social Icons: '+msg);
}

function findDock() {
	var divs = document.getElementsByTagName('div');
	for (var i=0; i<divs.length; i++) {
		var div = divs[i];
		if (div.getAttribute('class') == 'dock') {
			resetInterval();
			dock = div;
			interval = setInterval(swapIcons,250);
			break;
		}
	}
	updateAttempts();
}

function swapIcons() {
	var icons = dock.getElementsByTagName('img');
	if (icons.length) {
		console.log(icons);
		resetInterval();
		for (var i=0; i<icons.length; i++) {
			var icon = icons[i];
			var src = icon.getAttribute('src');
			if (src.indexOf('twitter')>-1) {
				var base64 = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdNJREFUeNqkVE1PFEEQff2xs5CNcSMCil5JjDdOXL1z8H/gxR8AB7K/hETj1cR48CQRLng1kXAgIYRds+ySgCTs9vSX1T3tOrOTPSA1qdSku+r161fdzbz3uI/Jnb2TracPmp3/Kf51o7Ylxc7zpcfIpLhTcW4sAXQ7MtIQHEPl4J2D80UMxjgHZzzGaXuUFWMRwJBra2F0jvXFJl4utOLkz8sRDgcKspHVQAzYPwBLOmpaVSlFxW3s9VWcfLU8j69n12g4Dy4EOIGwxMgm7QsGlKBoT0qbOKhLjXmz9mTy/2M4wn5/HBmZRomBplbmxCBPLc0LCfC5pyq0N1bm8YUYNYmN9qLEgAq1KzyYsrPPhtIajNiatNhkC6HYJIBxAnj9LKsUf+9d13ITA6KdPNhoBoOwMx1EpM9URPQFi7+oKsXd03EFYHP1IT6e/gYPuQmAT0QM4lE86F5RYgs5sZj2Qh/qFgmupzUIB8NygQ/HAwQCb1+0a1v4dn4VC9m0BjY6h6f+euvwnkDeHfVrAOEAieYcLOlgUdJAU1tWWpLuAE3McZhcwllTA+BCQmYZRENW2rg9vhhOrrOPl8kXsfRWMMbgaWXHb+NxTvaJ3fdB+SPAAPYlFfMUxXwIAAAAAElFTkSuQmCC';
				consoleLog('Twitter icon found and replaced.');
			} else if (src.indexOf('facebook')>-1) {
				var base64 = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARpJREFUeNpi/P//PwMlgEUjZFeNthJfMzmar977VMsCpJslxLkZONiYSdL849dfkAHNIAMY2FmZGO48/kKSAcoy3BAvgMn/fxn+AzEuYKYlyJARIMsgIgjR5Fd6HKwHbsC/f3+B+A9OA5A1Q9T/AeuBG/D//z+G//9wuwCm2bvwAFwMpAdhwF+gC/7+IehvZDUgPUgu+AN0AaYBO6Z4oPC3T3IB0x45O8B6kMIA5KffGAa8ef8VxQswPkgtLMwgLgD6/z8WL0RW7ALTu2cGovBhelAMwBcLyKGP0wBtBS6CBiCr+QUOREYGJlg6IBXA9DBB44f0nITshZ9//jP8Z8AdBql1G3FnZyCuPXmLo5nM4mAzI6UFCkCAAQAaz5ZIUYfK+QAAAABJRU5ErkJggg==';
				consoleLog('Facebook icon found and replaced.');
			} else {
				continue;
			}
			icon.setAttribute('src','data:image/png;base64,'+base64);
		}
		interval = setInterval(fixFont,250);
	} else updateAttempts();
}

function fixFont() {
	var names = dock.getElementsByTagName('div');
	if (names.length) {
		resetInterval();
		for (var i=0; i<names.length; i++) {
			if (names[i].getAttribute('class').indexOf('name') > -1) {
				names[i].style.fontFamily = 'Helvetica Neue,Helvetica,sans-serif';
			}
		}
		consoleLog('Tab text found and font corrected.');
	} else updateAttempts();
}

var dock;
var attempts = 0;
var maxAttempts = 500;
var interval = setInterval(findDock,250);