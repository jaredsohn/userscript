// ==UserScript==
// @name        Facebook Screenshot Name Censor Script
// @namespace   http://www.oepping.com/
// @description Adds a button to censor names on Facebook to falicitate screenshots
// @version     1.1
// @license        GNU General Public License version 3 or any later version; https://www.gnu.org/licenses/gpl-3.0.html
// @include        https://*.facebook.com/*
// @include        http://*.facebook.com/*
// @exclude        https://apps.facebook.com/ai.php
// @exclude        http://apps.facebook.com/ai.php
// @grant          none
// ==/UserScript==

var runtimes = 0;
var censormode = new Boolean();
var lastmode = new Boolean();
censormode = false;
lastmode = censormode;
function toggleCensor(){
	censormode = !censormode;
	checkDoc(undefined);
}
function initPage(){
	try {
		var target = document;
		var uri = document.baseURI;
		//var jewelContainer = target.getElementById('jewelContainer');
		var navContainer = target.getElementById('pageNav');
		//var newEle=navContainer.lastChild.cloneNode(false);
		newEle = document.createElement('li');
		newEle.setAttribute('id','oepp-censorBtn');
		newEle.setAttribute('class','navItem middleItem');
		newEle.innerHTML = '<a class="navLink bigPadding" data-gt="{"chrome_nav_item":"timeline_chrome"}" accesskey="8">C</a>';
		var insHere = navContainer.lastChild.nextSibling;
		navContainer.insertBefore(newEle,insHere);
		var btn = target.getElementById('oepp-censorBtn');
		btn.addEventListener('click', toggleCensor, false);
	} catch(err) {
		if(err.lineNumber){
			unsafeWindow.console.log('fb_censor err=' + err.message + ' at line ' + err.lineNumber);
		} else {
			unsafeWindow.console.log('fb_censor err=' + err.message);
		}
		if(err.message == 'target.getElementsByTagName is not a function'){
			unsafeWindow.console.log('fb_censor err detail=' + target);
		}
	}
}
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function censor(ele, toggle){
	var colorc = '#000000';
	var hc = ele.getAttribute('data-hovercard');
	if(hc != null){
		//var id = hc.match(/id\=(\d+)/)[1];
		//var id = hc.match(/\?id\=(\d+)/)[1];
		var id;
		var hcm = hc.match(/(user|page)\.php\?id\=(\d+)/);
		if(hcm == null){
			hcm = hc.match(/\.php\?id\=(\d+)/);
			if(hcm != null && hcm.length > 0){
				id = hcm[1];
			}
		} else {
			if(hcm != null && hcm.length > 1){
				id = hcm[2];
			}
		}
		if(id != null){
			var id32 = id & 0xFFFFFF;
			colorc = '#' + pad(id32.toString(16),6);
			if(toggle){
				ele.setAttribute('style','color: ' + colorc + '; background-color: ' + colorc + ';');
				var subimg = ele.getElementsByTagName('img');
				var ilen = subimg.length;
				for(i=0;i<ilen;i++){
					subimg[i].setAttribute('style','color: ' + colorc + '; background-color: ' + colorc + ';');
					var isrc = subimg[i].getAttribute('src');
					if(isrc != null){
						subimg[i].setAttribute('tsrc',isrc);
						subimg[i].removeAttribute('src');
					}
				}

			} else {
				ele.removeAttribute('style');
				var subimg = ele.getElementsByTagName('img');
				var ilen = subimg.length;
				for(i=0;i<ilen;i++){
					subimg[i].setAttribute('style','color: ' + colorc + '; background-color: ' + colorc + ';');
					var isrc = subimg[i].getAttribute('tsrc');
					if(isrc != null){
						subimg[i].setAttribute('src',isrc);
						subimg[i].removeAttribute('tsrc');
					}
				}
			}
		}
	}
}
function checkDocT(){
	checkDoc(undefined);
}

function checkDoc(event){
	try {
		var target = document;
		var uri = document.baseURI;
		if(event){
			target = event.target;
			if(!target || target == '[object HTMLScriptElement]' || target == '[object Text]'){
				return;
			}
			uri = target.baseURI;
		}

		if(uri.indexOf('/ai.php') != -1 || uri.indexOf('/apps/application.php?id=') != -1){
			return;
		}

		var fcg = target.getElementsByClassName('fcg');
		var fcglen = fcg.length;
		for(g=0;g<fcglen;g++){
			var fwb = fcg[g].getElementsByClassName('fwb');
			var fwblen = fwb.length;
			for(b=0;b<fwblen;b++){
				var alink = fwb[b].getElementsByTagName('a');
				var alinklen = alink.length;
				for(l=0;l<alinklen;l++){
					censor(alink[l],censormode);
				}
			}
		}
		//var pf = target.getElementsByClassName('profilelink');
		//var pf = document.getElementsByClassName('_5pb8');
		var pf = target.getElementsByTagName('a');
		//var pf = document.getElementsByTagName('a');
		var pflen = pf.length;
		for(p=0;p<pflen;p++){
			censor(pf[p],censormode);
		}
		var cmt = document.getElementsByClassName('UFICommentActorName');
		var cmtlen = cmt.length;
		for(c=0;c<cmtlen;c++){
			censor(cmt[c],censormode);
		}

	} catch(err) {
		if(err.lineNumber){
			unsafeWindow.console.log('fb_censor err=' + err.message + ' at line ' + err.lineNumber);
		} else {
			unsafeWindow.console.log('fb_censor err=' + err.message);
		}
		if(err.message == 'target.getElementsByTagName is not a function'){
			unsafeWindow.console.log('fb_censor err detail=' + target);
		}
	}
	if(!event){
		if(runtimes < 15){
			runtimes++;
			if(runtimes == 15){
				window.addEventListener("DOMNodeInserted", checkDoc, false);
				runtimes = 30;
			}
		}
		window.setTimeout(checkDocT, 1000 * runtimes);
	}
}


window.setTimeout(initPage, 1000);

//checkDoc();

