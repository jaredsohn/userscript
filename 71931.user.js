// ==UserScript==
// @name           incsteal
// @include        http://*incrasebux.com/ads.php*
// @include        http://*incrasebux.com/cks.php*
// @include        http://*stealthbux.com/ads.php*
// @include        http://*stealthbux.com/cks.php*
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

incsteal={
CheckClickedPage:function() {
	var progress =document.getElementById('progress');
	if(!progress) {
		GM_log('need to reload page, cannot find secs');
		window.setTimeout(function() {
			alert("something went wrong")
			window.close();
		},Math.floor(Math.random() * 5) * 1000);
		return;
	}
	var secsNum=parseInt(secs.innerHTML);
	if(secsNum==0) {
		window.setTimeout(function() {
			GM_log('close window');
			// wait for the ajax to record your ad viewing
			window.close();
		},Math.floor(3 + Math.random() * 5) * 1000);
		return;
	}
	secsNum++;
	window.setTimeout(function() {
		incsteal.CheckClickedPage();
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

		var oncl = aObj.getAttribute('onclick');
		if (!oncl || oncl.indexOf('openad')<0){ continue; }
		nHtml.Click(aObj);
			
		window.setTimeout(function() {
			// wait till the ad page closes then reload.
			window.location.reload();
		}, Math.floor(38 + Math.random() * 5) * 1000);
		break;
	}
},
ClickLinks:function() {
	var as=document.getElementsByTagName('a');

	var resetRe=/reset.*balance/;
	var notClickRe=/not *click/i;
	var clicked=0;
	for(var a = 0; a < as.length; a++) {
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
				var novo = tr.innerHTML.indexOf('novo_32.png');
                var plus = tr.innerHTML.indexOf('plus_32.png');
				if(novo >= 0 || plus >= 0) {
					trOk=true;
				}
			}
			tr=tr.parentNode;
		}
		if(!trOk) { continue; }

		var ahtml=aObj.innerHTML.toLowerCase();
		if(resetRe.exec(ahtml) || notClickRe.exec(ahtml)) { continue; }
		if(ahtml.indexOf('cheat')>=0) { continue; }
		if (ahtml.indexOf('suspend') >= 0){ continue; }

		GM_log('click link:'+oncl);
		nHtml.Click(aObj);
		clicked++;
		window.setTimeout(function() {
			incsteal.ClickRedDot();
		},Math.floor(Math.random() * 5) * 1000);
		return;
	}

	if(!clicked) {
		window.setTimeout(function() {
			window.history.go(0);
		},Math.floor(60 + Math.random() * 250) * 1000);
	} else {

	}
}

};

window.addEventListener("load", function(e) {
	var pathname=location.pathname;
	if(pathname=="/ads.php") {
		incsteal.ClickLinks();
	} else if(pathname.substring(0,8)=="/cks.php") {
		incsteal.CheckClickedPage();
	}
},false);


