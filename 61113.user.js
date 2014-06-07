// Tiny Jumper
// v1.01.20100219
// Author: birdstudio
// Credits: UNTR.IM (short URL decoding service), TinyWall by darasion (list of URL shortening services blocked in China)
//
/* Notes: We recommend you to add the lines below into hosts.
127.0.0.1	bit.ly
127.0.0.1	post.ly
127.0.0.1	j.mp
127.0.0.1	ff.im
127.0.0.1	htxt.it
127.0.0.1	ping.fm
*/
//
// ==UserScript==
// @name			Tiny Jumper
// @namespace		http://www.cssmagic.cn/
// @description		To decode some short URLs and redirect automatically, when visit them, which blocked in China (e.g. BIT.LY).
// @include			http://bit.ly/*
// @include			http://post.ly/*
// @include			http://j.mp/*
// @include			http://ff.im/*
// @include			http://htxt.it/*
// @include			http://ping.fm/*
// ==/UserScript==

(function(){
	function $tag(s){return document.getElementsByTagName(s);}
	function $off(e){e.style.display='none';}
	function $on(e){e.style.display='';}
	document.title = 'Tiny Jumper';
	$tag('link')[0].href = '';
	document.body.innerHTML = '<div><h1>Decoding...</h1><p style="display:none;"></p><span>Powered by <a href="http://www.cssmagic.cn/blog/article/tech/tiny-jumper.html" target="_blank">CSS MAGIC</a> &amp; <a href="http://untr.im/" target="_blank">UNTR.IM</a> .</span></div>';
	var sStyle = '*{margin:0;padding:0;}html,body{height:100%;}body{display:table;width:100%;color:#2EAEE4;background:#1D4385;}div{display:table-cell;text-align:center;vertical-align:middle;}h1{display:inline-block;padding:0 0 100px 45px;font:32px/1 Arial;background:url(http://untr.im/images/spinner_1d4385.gif) no-repeat;}p{display:inline-block;padding-bottom:100px;width:500px;font:24px/1.5 Arial;}span{position:absolute;right:2em;bottom:0;font:12px/3 Arial;}a{color:inherit;}';
	GM_addStyle(sStyle);
	GM_xmlhttpRequest({
		method:'POST',
		url:'http://untr.im/api/ajax/api',
		headers:{'Content-Type':'application/x-www-form-urlencoded'},
		data:'submit=Lookup&url='+encodeURIComponent(location.href),
		onload:fnOnLoad,
		onerror:fnOnError,
	});
	var tTimer = window.setTimeout(function() {
		fnFail(3);
	},20000);
	function fnOnLoad(o) {
		window.clearTimeout(tTimer);
		var sS = o.status;
		if (sS == '200') {
			var sT = o.responseText;
			if (sT.indexOf('does not redirect')>0) {
				fnFail(1);
			} else {
				var aT = sT.split(' rel="nofollow">');
				sT = aT.length ? aT[aT.length-1] : '';
				if (sT) {sT=sT.split('</a>')[0];if(sT){fnSucceed(sT);return;}}
				fnFail(0);
			}
		} else {fnFail(2);}
	}
	function fnOnError(o) {
		window.clearTimeout(tTimer);
		fnFail(2);
	}
	function fnSucceed(s) {
		var e = $tag('h1')[0];
		$off($tag('p')[0]);
		$on(e);
		e.innerHTML = 'Decoded! Jumping...'
		location.href = s;
	}
	function fnFail(n) {
		var eW = $tag('p')[0];
		$off($tag('h1')[0]);
		$on(eW);
		eW.innerHTML = 'Oops... ';
		switch(n) {
			case 0: eW.innerHTML+='Unknown error.<br/>Please check new version of <a href="http://userscripts.org/scripts/show/61113">Tiny Jumper</a>,<br/>or <a href="http://userscripts.org/scripts/discuss/61113">post feedback to author</a>.';return;
			case 1: eW.innerHTML+='Cannot decode this URL.<br/>Please check your URL,<br/>or <a href="http://userscripts.org/scripts/discuss/61113">post feedback to author</a>.';return;
			case 2: eW.innerHTML+='Decoding server error.<br/>Please check new version of <a href="http://userscripts.org/scripts/show/61113">Tiny Jumper</a>,<br/>or <a href="http://userscripts.org/scripts/discuss/61113">post feedback to author</a>.';return;
			case 3: eW.innerHTML+='It seems that<br/>we cannot connect decoding-server.<br/>Please retry later,<br/>or <a href="http://userscripts.org/scripts/discuss/61113" target="_blank">post feedback to author</a>.';return;
		}
	}
})();
