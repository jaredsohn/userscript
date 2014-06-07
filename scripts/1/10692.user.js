// ==UserScript==
// @name          Google Another Japanese Search
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description   Google Japanese Search by inserting hiragana(Japanese letters)
// @include       http://*.google.tld/*
// @version       1.1
// ==/UserScript==

(function(){
	var s=0;
	var sw=0;
	var eq=0;
	var maxq=31;
	var adduri;
	var newuri;
	var link=document.createElement('a');
	var orh=new Array;
	var hira=new Array('\u3044','\u306e','\u3066','\u304b','\u306a','\u3067','\u3063','\u306a','\u3093','\u3068','\u3057','\u305f','\u306b','\u308b','\u3046','\u306f','\u3060','\u3089','\u304c','\u3059','\u30fc','\u3082','\u3092','\u307e','\u3042','\u3063\u3066','\u3057\u3066','\u3067\u3059','\u3066\u3044','\u306a\u3044','\u307e\u3059');
	var q=decodeURI(document.URL).match(/(as_(e|o|ep))?q=.*?(&|$)/g);
	for(var i=0;i<q.length;i++){
		var t=q[i].match(/[^=|&|\+|\u3000]+/g);s+=t.length-1;
		for(var j=0;j<t.length;j++){
			if(t[j].match(/^(OR|AND)$/)){
				sw++;
			}
		}
	}
	maxq=maxq-s-sw;
	for(var k=0;k<maxq;k++){
		orh.push(hira[k]);
	}
	if(document.URL.match(/as_oq=/)){
		adduri=encodeURI(orh.join("+"));
		newuri=document.URL.replace(/([&\?]as_oq=.*?)((&|$))/,"$1"+'+'+adduri+"$2");
	}
	else{
		adduri=encodeURI(orh.join(" OR "));
		newuri=document.URL.replace(/([&\?]q=.*?)((&|$))/,"$1"+'+'+adduri+"$2");
	}
	var insertpoint = document.evaluate("//label[@for='il']", document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if(insertpoint.snapshotItem(0)){
		link.setAttribute('href',newuri);
		link.innerHTML='\u30fbAnother Japanese Search';
		insertpoint.snapshotItem(0).parentNode.appendChild(link);
	}
})();