scr_meta=<><![CDATA[
// ==UserScript==
// @name			SU Page Control
// @version			1.0
// @namespace		http://www.foresthippy.com
// @description		ForestHippy
// @include			http://*.stumbleupon.com/
// @include			http://*.stumbleupon.com/blog/*
// @include			http://*.stumbleupon.com/archive/*
// @include			http://*.stumbleupon.com/favorites/*
// @include			http://*.stumbleupon.com/discoveries/*
// @include			http://www.stumbleupon.com/url/*
// @include			http://www.stumbleupon.com/urlarchive/*
// @exclude			http://www.stumbleupon.com/
// @license			http://www.opensource.org/licenses/gpl-2.0.php
// ==/UserScript==
]]></>.toString();

// Removed fans/sunscriptions entries - only page 1 has correct last page link and reviews pages are dodgy

addPageSelect ();

function getElementsByClassName (cn, tn) {
	var el = new Array ();
	var i;
	var alltn = document.getElementsByTagName (tn);
	for (i=0; i<alltn.length; i++) {
		if (alltn[i].className == cn) {
			el.push (alltn[i]);
		}
	}
	return el;
}

function addPageSelect () {
	var homeurl = window.location.toString();
	var urlstr = homeurl.substr (homeurl.toLowerCase().search ('stumbleupon.com') + 'stumbleupon.com'.length);
	var pagenum = 0;
	
	if (urlstr.search ('/url/') > -1) {
		urlstr = urlstr.replace ('/url/', '/urlarchive/0/');
	} else if (urlstr == '/' || urlstr.search ('/blog/') > -1) {
		urlstr = '/archive/0/';
	} else {
		var pageexec = /\/([0-9]+)\//;
		var pagestr = pageexec.exec(homeurl);
		if (pagestr != null) {
			pagenum = Number (pagestr[1]);
		} else {
			urlstr += '0/';
		}
	}

	var pagemult;
	if (urlstr.search ('/fans/') > -1 || urlstr.search ('/subscriptions/') > -1) { // Not unless pagination on these pages gets fixed - legacy in case it does
		pagemult = 50;
		pagenum /= 50;
	} else if (urlstr.search ('/favorites/') > -1 || urlstr.search ('/discoveries/') > -1) {
		pagemult = 25;
		pagenum /= 25;
	} else {
		pagemult = 10;
		pagenum /= 10;
	}

	var pagelist = getElementsByClassName ('listPagination', 'ul')[0];
	var lastpage;
	
	if (pagelist) {
		if (isNaN(Number(pagelist.childNodes[pagelist.childNodes.length-1].textContent))) {
			lastpage = Number(pagelist.childNodes[pagelist.childNodes.length-2].textContent);
		} else {
			lastpage = Number(pagelist.childNodes[pagelist.childNodes.length-1].textContent);
		}
		
		GM_log ('Page number: '+pagenum);
		GM_log ('Last page: '+lastpage);
		
		var pageselect = document.createElement ('select');
		var firstbutton = document.createElement ('button');
		var nextbutton = document.createElement ('button');
		var prevbutton = document.createElement ('button');
		var lastbutton = document.createElement ('button');
		var shufflebutton = document.createElement ('button');
		var toption, timg;
		var i;
		var div = document.createElement ('div');
		var tn = document.createTextNode ('Page: ')
		
		div.style.height = '1.5em';
		div.style.marginTop = '10px';
		div.appendChild (tn);
		div.appendChild (pageselect);
		
		for (i=0; i<lastpage; i++) {
			toption = document.createElement ('option');
			toption.value = urlstr.replace (/\/[0-9]+\//, '/'+ (i * pagemult) + '/');
			toption.textContent = i+1;
			pageselect.appendChild (toption);
		}
		
		pageselect.selectedIndex = pagenum;
		pageselect.id = 'JDMpageselect';
		
		timg = document.createElement ('img');
		timg.src = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
			'CxMBAJqcGAAAAE1JREFUKM9jYKAH+I+EcQFWBgYGYwYGhrOENHAyMDC4MTAwrEJWg0tDCAMDww4GBoav' +
			'6GrQNbhBrf6JJP4PxmaipqeJdhLZnsYZrLQFAIWBLeihTvUDAAAAAElFTkSuQmCC';
		firstbutton.appendChild (timg);
		firstbutton.style.padding = '0px 0px 2px 0px';
		firstbutton.style.height = '20px';
		firstbutton.title = 'First page';
		firstbutton.addEventListener ('click', function () {
			window.location.href = urlstr.replace (/\/[0-9]+\//, '/0/');
		}, true);
		if (pagenum == 0) {
			firstbutton.disabled = true;
			timg.style.opacity = '0.3';
		}
		div.appendChild (firstbutton);
		
		timg = document.createElement ('img');
		timg.src = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
			'CxMBAJqcGAAAAE1JREFUKM9jYBhowMrAwGDMwMBwlpBCTgYGBjcGBoZVDAwM/6EYJwhhYGDYwcDA8BVJ' +
			'MVYNblCrfyIp+oeugYkaHiXaSWR7mqxgpR4AAKOcGP04d+yrAAAAAElFTkSuQmCC';
		prevbutton.appendChild (timg);
		prevbutton.style.padding = '0px 0px 2px 0px';
		prevbutton.style.height = '20px';
		prevbutton.title = 'Previous page';
		prevbutton.addEventListener ('click', function () {
			window.location.href = urlstr.replace (/\/[0-9]+\//, '/'+ ((pagenum-1) * pagemult) + '/');
		}, true);
		if (pagenum == 0) {
			prevbutton.disabled = true;
			timg.style.opacity = '0.3';
		}
		div.appendChild (prevbutton);
				
		timg = document.createElement ('img');
		timg.src = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
			'CxMBAJqcGAAAAExJREFUKM9jYKAnOMvAwGDMwMDASqyG/1C8ioGBwY2BgYGTWA3/GRgYvjIwMOxgYGAI' +
			'IUbDPyT2T6hT3WCKmCjxNNlOItrTJAcrbQAA1FsY/el3FAoAAAAASUVORK5CYII=';
		nextbutton.appendChild (timg);
		nextbutton.style.padding = '0px 0px 2px 0px';
		nextbutton.style.height = '20px';
		nextbutton.title = 'Next page';
		nextbutton.addEventListener ('click', function () {
			window.location.href = urlstr.replace (/\/[0-9]+\//, '/'+ ((pagenum+1) * pagemult) + '/');
		}, true);
		if (pagenum == (lastpage - 1)) {
			nextbutton.disabled = true;
			timg.style.opacity = '0.3';
		}
		div.appendChild (nextbutton);
		
		timg = document.createElement ('img');
		timg.src = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
			'CxMBAJqcGAAAAE5JREFUKM9jYKAHOMvAwGDMwMDAikfNfyQMZ6xiYGBwY2Bg4CRWw38GBoavDAwMOxgY' +
			'GEKI0fAPif0T6lQ3dA1M5HiabCcR7WmSg5W2AABUxS3oZbETVgAAAABJRU5ErkJggg==';
		lastbutton.appendChild (timg);
		lastbutton.style.padding = '0px 0px 2px 0px';
		lastbutton.style.height = '20px';
		lastbutton.title = 'Last page';
		lastbutton.addEventListener ('click', function () {
			window.location.href = urlstr.replace (/\/[0-9]+\//, '/'+ ((lastpage-1) * pagemult) + '/');
		}, true);
		if (pagenum == (lastpage - 1)) {
			lastbutton.disabled = true;
			timg.style.opacity = '0.3';
		}
		div.appendChild (lastbutton);
		
		timg = document.createElement ('img');
		timg.src = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAAAK1JREFUKM+V0jFqQkEUBdBjdAPWsXMPqdyJW5CUgor5KrERKxeRDVi4AtdhYRlIr0h+' +
		'mvtBvgH5D4bh3rnvvftmhufRw1iD6OIHu4o4o8RHTTgKX61frOBwR87xgknwFSfcgjfwilmIAp+pVmKB' +
		'QfAErap9C2+Y3omLnPUxrISd7GUS1sHLWH2Idiy9Yxuvq3T5iuYb+8xzrA9dpMg8+PLf0Oea56fX2vjh' +
		'Gn2NP7bMOfUlqg+BAAAAAElFTkSuQmCC';
		shufflebutton.appendChild (timg);
		shufflebutton.style.padding = '0px 0px 2px 0px';
		shufflebutton.style.height = '20px';
		shufflebutton.title = 'Random page';
		shufflebutton.addEventListener ('click', function () {
			window.location.href = urlstr.replace (/\/[0-9]+\//, '/'+ (Math.floor(Math.random() * lastpage) * pagemult) + '/');
		}, true);
		if (lastpage < 3) {
			shufflebutton.disabled = true;
			timg.style.opacity = '0.3';
		}
		div.appendChild (shufflebutton);
		

		
		pagelist.parentNode.insertBefore (div, pagelist);
		pagelist.parentNode.removeChild (pagelist);
		
		pageselect.addEventListener ('change', function () {
			window.location.href = this.options[this.selectedIndex].value;
		}, true);
	}	
}

//////////////////////////////////////////////
// Update Code:
// http://userscripts.org/scripts/show/38017
// by sizzlemctwizzle

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '49970', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match('Uh-oh! The page could not be found!')) || (this.xname[1] != this.name) ) GM_setValue('updated', 'off');
      return false;
    }
    if ( (this.xversion > this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion > this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') CheckScriptForUpdate.check();

