// ==UserScript==
// @name           Visual Scroll
// @namespace      http://white.s151.xrea.com/
// @include        *
// ==/UserScript==

var duration = 300 // (ms)

var init = function() {
	// css
	GM_addStyle(['div#visualScroll > div{', 'opacity:0.5;','background-color:#000;','position:fixed;','left:0px;','right:0px;','height:5px;','}',
				 'div#visualScrollTop{',    'top:0px;',   '-moz-border-radius: 0px 0px 10px 10px;','}',
				 'div#visualScrollBottom{', 'bottom:0px;','-moz-border-radius: 10px 10px 0px 0px;','}',
				 ].join(''));

	// html
	var getdiv = function(id){
		var div = document.createElement("div");
		div.id = id;
		return div;
	}
	var box = getdiv('visualScroll');
	var _top = getdiv('visualScrollTop');
	var _bottom = getdiv('visualScrollBottom');
	box.appendChild(_top);
	box.appendChild(_bottom);
	box.addEventListener('click',function(){
		this.style.display='none';
		document.removeEventListener('scroll',handler,false);
	  },true);
	document.body.appendChild(box);

	var last_pageYOffset = pageYOffset;
	var base_pageYOffset = pageYOffset;
	var timer, timer_too_scroll;
	var clear = function(obj){
		obj.style.height = '5px';
	}
	var reset = function(){
		clear(_top);
		clear(_bottom);
		last_pageYOffset = pageYOffset;
		base_pageYOffset = pageYOffset;
		timer=null;
	}

	var too_scroll = function(){
		if(timer_too_scroll) clearTimeout(timer_too_scroll);
		_top.style.height = '0px';
		_bottom.style.height = '0px';
		timer_too_scroll = setTimeout(function(){timer_too_scroll=null;reset()}, duration);
	}
	var handler = function(e) {
		if(timer_too_scroll) {too_scroll();return;}

		if(Math.abs(base_pageYOffset - pageYOffset) > innerHeight) {
			if(timer) clearTimeout(timer);
			reset();
			too_scroll();
			return;
		}
		if(Math.abs(last_pageYOffset - pageYOffset) > innerHeight) return;

		var top_height = base_pageYOffset - pageYOffset;
		if(top_height > 0){
			_top.style.height = top_height + 'px';
			_bottom.style.height = '0px';
		}else{
			_top.style.height = '0px';
			_bottom.style.display = 'none';
			_bottom.style.height  = pageYOffset - base_pageYOffset + 'px';
			_bottom.style.display = 'block';
		}
		last_pageYOffset = pageYOffset;

		// timer
		if(timer) clearTimeout(timer);
		timer = setTimeout(reset, duration);
	}
	
	document.addEventListener('scroll',handler,false);
}

if(document.body) init();
