// ==UserScript==
// @name           Auto clicker for some buxsite with gen3 script
// @namespace      Bux auto clicker
// @Author         Indohacker85
// @email          Indohacker85@yahoo.co.id
// @description    Auto clicks ads for some buxsite with gen3 script 
// @include        http://buxdollar.com/ads.php
// @include        http://*buxdollar.com/ads.php*
// @include        http://*buxdollar.com/cks.php*
// @include        http://scopebux.com/ads.php
// @include        http://*scopebux.com/ads.php*
// @include        http://*scopebux.com/cks.php*
// @include        http://increasebux.com/ads.php
// @include        http://*increasebux.com/ads.php*
// @include        http://*increasebux.com/cks.php*
// @include        http://amirbux.com.com/ads.php
// @include        http://*amirbux.com/ads.php*
// @include        http://*amirbux.com/cks.php*
// @include        http://stablebux.com/ads.php
// @include        http://*stablebux.com/ads.php*
// @include        http://*stablebux.com/cks.php*
// @include        http://bux65.com/ads.php
// @include        http://*bux65.com/ads.php*
// @include        http://*bux65.com/cks.php*
// @include        http://gammabux.com/ads.php
// @include        http://*gammabux.com/ads.php*
// @include        http://*gammabux.com/cks.php*
// @include        http://justbux.com/ads.php
// @include        http://*justbux.com/ads.php*
// @include        http://*justbux.com/cks.php*
// @include        http://bankbux.net/ads.php
// @include        http://*bankbux.net/ads.php*
// @include        http://*bankbux.net/cks.php*
// @include        http://cutebux.com/ads.php
// @include        http://*cutebux.com/ads.php*
// @include        http://*cutebux.com/cks.php*
// @include        http://buxyou.com/ads.php
// @include        http://*buxyou.com/ads.php*
// @include        http://*buxyou.com/cks.php*
// ==/UserScript==


var nHtml={
TestClick:function(obj) {
	obj.style.border='3px solid #f00'; return;
},
Click:function(obj) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
		1, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
}
};

buxdollar={
CheckClickedPage:function() {
	var secs=document.getElementById('secs');
	if(!secs) {
		GM_log('need to reload page, cannot find secs');
		window.setTimeout(function() {
			window.history.go(0);
		},60*1000);
		return;
	}
	var secsNum=parseInt(secs.innerHTML);
	if(secsNum==0) {
		window.setTimeout(function() {
			GM_log('close window');
			// wait for the ajax to record your ad viewing
			window.close();
		},8000);
		return;
	}
	secsNum++;
	window.setTimeout(function() {
		buxdollar.CheckClickedPage();
	},secsNum*1000);
},

IsHidden:function(obj) {
	var hidden=false;
	var pdiv=obj;
	var count=0;
	while(pdiv && count<200) {
		if(pdiv.tagName=='BODY') {break; }
		if(pdiv.style.display=='none') {
			hidden=true;
			break;
		}
		pdiv=pdiv.parentNode;
		count++;
	}
	return hidden;
},

clicked:{},
ClickRedDot:function() {
	var as=document.getElementsByTagName('a');

	var clicked=0;
	for(var a=0; a<as.length; a++) {
		var aObj=as[a];
		if(this.IsHidden(aObj)) {
			continue;
		}
		if(!aObj.href || aObj.href.indexOf('cks.php')<0 || this.clicked[aObj.href]) {
			continue;
		}
		this.clicked[aObj.href]=1;
		GM_log('click ad:'+aObj.href);
		window.open(aObj.href);
//		nHtml.Click(aObj);
		window.setTimeout(function() {
			// wait till the ad page closes then reload.
			window.history.go(0);
		},60*1000);
		break;
	}
},
ClickLinks:function() {
	var as=document.getElementsByTagName('a');

	var resetRe=/reset.*balance/;
	var notClickRe=/not *click/i;
	var clicked=0;
	for(var a=0; a<as.length; a++) {
		var aObj=as[a];
		var oncl=aObj.getAttribute('onclick');
		if(!oncl || oncl.indexOf('clt(')<0) { continue; }
		if(this.IsHidden(aObj)) {
			GM_log('is hidden:'+sobj.href);
			continue;
		}
		var tr=aObj;
		var trOk=false;
		while(tr && tr.tagName!="BODY") {
			if(tr.tagName=="TR") {
				if(tr.innerHTML.indexOf('novo_32.png')>=0) {
					trOk=true;
				}
			}
			tr=tr.parentNode;
		}
		if(!trOk) { continue; }

		var ahtml=aObj.innerHTML.toLowerCase();
		if(resetRe.exec(ahtml) || notClickRe.exec(ahtml)) { continue; }
		if(ahtml.indexOf('cheat')>=0) { continue; }
		GM_log('click link:'+oncl);
		nHtml.Click(aObj);
		clicked++;
		window.setTimeout(function() {
			buxdollar.ClickRedDot();
		},5*1000);
		return;
	}

	if(!clicked) {
		window.setTimeout(function() {
			window.history.go(0);
		},24*60*60*1000);
	} else {

	}
}

};

window.addEventListener("load", function(e) {
	var pathname=location.pathname;
	if(pathname=="/ads.php") {
		buxdollar.ClickLinks();
	} else if(pathname.substring(0,8)=="/cks.php") {
		buxdollar.CheckClickedPage();
	}
},false);


