// ==UserScript==
// @name		niconico Keyboard Shortcuts
// @version		v1.0 (2011/03/28)
// @namespace	hecomi
// @description	ニコニコ動画でキーボードショートカットを使えるようにします．
// @require		http://code.jquery.com/jquery-latest.js
// @include		http://www.nicovideo.jp/*
// ==/UserScript==

(function(){
	var marginTop = 200; // 選択したリンクの上部マージン
	var i = -1;
	var isInput = false;
	var getItem = function(i) { return $("a.watch").filter(":eq(" + i + ")"); };
	document.addEventListener(
		'keydown',
		function(event) {
			if (isInput || event.ctrlKey) return;
			switch (event.keyCode) {	
				case 65:	// 'a' key　：　先頭へ戻る 
					i = 0;
					// このままbreakしないで下へ
	
				case 74: case 75:	// 'j' or 'k' key　：　進む / 戻る
					if       (event.keyCode == 74 && getItem(i+1).size())	i++;	// j: 進む
					else if (event.keyCode == 75 && getItem(i-1).size())	i--;	// k: 戻る
					else									break;
					
					// フォーカス
					getItem(i).focus();
					$.scrollTo(getItem(i).offset().top - marginTop, 100);
						
					// 前の要素は色を戻す
					$("a.watch").css( {background: "", color: ""} );

					// 選択したaタグの色を反転
					getItem(i).css( {background: "#555", color: "#fff"} );
					break;
					
				case 79:	// 'o' key　：　リンクを新しいタブで開く
					if (i >= 0) {
						var url = getItem(i).attr("href");
						window.open(url, "_balnk");
					}
					break;
					
				case 47:	// '/' key　：　検索窓へ移動
					$("#bar_search").focus();
					break;

				case 83:	// 's' key　：　動画位置へ移動
					$(".__nicopedia_loaded")[0].name = "scroll_to";
					location.href = location.href + "#scroll_to";
					break;
			}
		},
		false
	);

	// 検索バーにフォーカスがあるときはキーボードショートカットをOFF
	$("#bar_search").focus(
		function(event) {
			isInput = true;
		}
	);
	$("#bar_search").blur(
		function(event) {
			isInput = false;
		}
	);

	/**
	 * jQuery.ScrollTo - Easy element scrolling using jQuery.
	 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
	 * Dual licensed under MIT and GPL.
	 * Date: 5/25/2009
	 * @author Ariel Flesler
	 * @version 1.4.2
	 *
	 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
	 */
	;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
})();
