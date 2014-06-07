// ==UserScript==
// @name           Livemocha Audio Download
// @namespace      LivemochaAudio
// @description    Download Audios from reviews on livemocha
// @include        http://www.livemocha.com/*
// ==/UserScript==


var nHtml={
	FindAllByXPath:function(obj,xpath) {
		var ss=document.evaluate(xpath,obj,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var iconEdits=[];
		for(var s=0; s<ss.snapshotLength; s++) {
			var a=ss.snapshotItem(s);
			iconEdits.push(a);
		}
		return iconEdits;
	}
};

window.addEventListener('load',function() {
//	var divs=nHtml.FindAllByXPath(document,"//div[contains(@id,'swfobject_div_')]");
	var divs=nHtml.FindAllByXPath(document,"//param | //embed");

	for(var d=0; d<divs.length; d++) {
		var div=divs[d];
		var ins=div.parentNode;
		var fvar=div.getAttribute('flashvars');
		var src=null;
		if(!fvar) {
			if(div.name=='flashvars') {
				fvar=div.value;
				ins=ins.parentNode;
				var m=/audioUrl=([^\&]+)\&/.exec(fvar);
				if(m) {
					src=unescape(m[1]);
				}
			}
		} else {
			var m=/audioUrl=([^\&]+)\&/.exec(fvar);
			if(m) { src=m[1]; }
		}
		if(!src) continue;
		GM_log('Found Audio:'+m[1]);

		var a=document.createElement('a');
		a.className='AudioLink';
		a.href=src;
		a.title='Right click and save';
		a.innerHTML="Download audio";

//		ins.style.border='3px solid #f00';
		ins.parentNode.insertBefore(a,ins);
	}
},false);
