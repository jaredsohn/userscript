// ==UserScript==
// @id             google_plus_motionless
// @name           Google+ Motionless
// @version        1.0.4.2
// @namespace      http://userscripts.org/scripts/show/111484
// @author         SkyArrow
// @description    Pause the stream so that you can read posts or watch videos. Auto load next page.
// @include        https://plus.google.com/*
// ==/UserScript==

GM_addStyle('#motionless_ctrl{border:1px solid #ccc;border-radius:16px;cursor:pointer;height:32px;width:32px;position:fixed;bottom:40px;right:10px;box-shadow:0 0 5px #aaa;background:#fff;z-index:10;transition:.25s;-moz-transition:.25s;-webkit-transition:.25s;-o-transition:.25s;-moz-user-select:none;-webkit-user-select:none}#motionless_ctrl:hover{box-shadow:0 0 10px #999}#motionless_ctrl.playing:before{position:absolute;top:6px;left:8px;height:20px;width:6px;border-left:5px solid #000;border-right:5px solid #000;content:""}#motionless_ctrl.pause:before{position:absolute;top:6px;left:8px;height:0;width:0;border-bottom:10px solid transparent;border-top:10px solid transparent;border-left:18px dashed #000;content:""}#motionless_ctrl.loading:after{position:absolute;top:-2px;left:-2px;width:36px;height:36px;border-radius:36px;box-shadow:0 -1px 2px #ffa500;content:"";animation:loading 1s linear infinite;-moz-animation:loading 1s linear infinite;-webkit-animation:loading 1s linear infinite}#motionless_ctrl .navi{border-radius:16px;color:#fff;position:relative;height:32px;text-align:center;opacity:1;font-size:14px;line-height:32px;font-weight:bold;z-index:10;overflow:hidden;transition:.5s;-moz-transition:.5s;-webkit-transition:.5s;-o-transition:.5s;background-image:-webkit-gradient(radial,center,center,from(#f33),to(#c00));background-image:-webkit-radial-gradient(center,#f33,#c00);background-image:-moz-radial-gradient(center,#f33,#c00);background-image:-ms-radial-gradient(center,#f33,#c00);background-image:-o-radial-gradient(center,#f33,#c00);background-image:radial-gradient(center,#f33,#c00)}#motionless_ctrl .navi:hover{opacity:0}#motionless_ctrl .navi *{position:absolute;width:32px;transition:.25s;-moz-transition:.25s;-webkit-transition:.25s;-o-transition:.25s}#motionless_ctrl .navi .new{top:-32px}#motionless_ctrl .navi .old{top:0}.motionless_hide{display:none!important;opacity:0;visibility:hidden}.motionless_guide{background:#f5f5f5;border-bottom:1px solid #ebebeb;color:#999;font-size:12px;margin:-16px -21px 15px;padding:10px;text-align:right}@keyframes loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@-webkit-keyframes loading{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@-moz-keyframes loading{0%{-moz-transform:rotate(0deg)}100%{-moz-transform:rotate(360deg)}}');

(function(){
	var content = document.getElementById('content').parentNode,
		contentPane = document.getElementById('contentPane'),
		stream, date, timer;
		
	var ctrl = document.createElement('div');
	ctrl.id = 'motionless_ctrl';
	ctrl.className = 'playing';
	content.appendChild(ctrl);
	
	contentPane.addEventListener('DOMNodeInserted', function(){
		streamP = document.getElementsByClassName('lzqA1d');
		for (var i=0; i<streamP.length; i++){
			if (streamP[i].style.display != 'none'){
				stream = streamP[i];
				stream.addEventListener('DOMNodeInserted', enable, false);
			}
		}
	}, false);
	
	ctrl.addEventListener('click', function(){
		if (ctrl.className.match('playing')) {
			ctrl.setAttribute('class', 'pause');
			
			var	time = new Date(),
				month = time.getMonth() + 1,
				day = time.getDate(),
				hour = time.getHours(),
				minute = time.getMinutes(),
				second = time.getSeconds();
				if (minute < 10) minute = '0' + minute;
				if (second < 10) second = '0' + second;
			
			date = month+'/'+day+' '+hour+':'+minute+':'+second;
		} else {
			var guide = document.createElement('div');
			guide.className = 'motionless_guide';
			guide.innerHTML = 'Paused at <strong>'+date+'</strong>';
			stream.childNodes[after-origin].insertBefore(guide, stream.childNodes[after-origin].childNodes[0]);
			
			for (var i=0; i<after-origin; i++){
				stream.childNodes[i].setAttribute('class', 'Wbhcze Te');
			}
			
			window.scrollTo(0, stream.childNodes[after-origin].offsetTop);
			
			ctrl.setAttribute('class', 'playing');
			ctrl.innerHTML = '';
			origin = stream.childNodes.length;
			after = origin;
		}
	});
	
	function enable(e){
		if (ctrl.className.match('playing')) {
			origin = this.childNodes.length;
			after = origin;
			clearTimeout(timer);
			clear();
		} else {
			after = this.childNodes.length;
			clearTimeout(timer);
			if (ctrl.className.match('loading')) {
				origin = after-document.getElementsByClassName('motionless_hide').length;
				clear();
			}
			newcomes = after-origin;
		
			for (var i=0; i<newcomes; i++) {
				this.childNodes[i].setAttribute('class', 'Wbhcze Te motionless_hide');
			}
		
			if (newcomes > 0) {
				ctrl.innerHTML = '<div class="navi"><div class="new">'+newcomes+'</div><div class="old">'+parseInt(newcomes-1)+'</div></div>';
				timer = setTimeout(function(){
					ctrl.childNodes[0].childNodes[1].style.top = 32 + 'px';
					ctrl.childNodes[0].childNodes[0].style.top = 0 + 'px';
				}, 0);
			}
		}
		
		for (var i=0; i<after; i++){
			this.childNodes[i].addEventListener('DOMNodeInserted', function(e){e.stopPropagation()}, false);
		}
		
		function clear(){
			timer = setTimeout(function(){
				if (ctrl.className.match('loading')) ctrl.className = ctrl.className.replace(/ loading/, '');
			}, 50);
		}
		
		e.stopPropagation();
	}
	
	window.addEventListener('scroll', function(){
		var scrollTop =  document.documentElement.scrollTop + document.body.scrollTop,
			scrollHeight = document.body.scrollHeight;
			point = scrollHeight - 2000;
			
		if (scrollTop > point) {
			if (!ctrl.className.match('loading')) ctrl.className+=' loading';
			
			var button = document.getElementsByClassName('ir')[0];
			if (document.all) {
				button.click();
			} else {
				var evt = document.createEvent('MouseEvents');
				evt.initEvent('click', true, true);
				button.dispatchEvent(evt);
			}
		}
	}, false);
})();