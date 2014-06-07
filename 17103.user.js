// ==UserScript==
// @name           q3boy's smart scroller
// @namespace      q3boy1@gmail.com
// @include        *
// ==/UserScript==

if (top == window){
	function Q3boyScroller(){
		
		this.refreshConfTimer = null,
		this.scrollerTimer = null,
		this.scrollTime = null,
		this.isScrolling = null,
		this.keyPressing = null,
		this.isFocus = null,

		this.keydown = function(){
			Q3boyScroller.keyPressing = true;
		}
		this.keyup = function(){
			Q3boyScroller.keyPressing = false;
		}

		this.wheel = function(event){
			if(Q3boyScroller.isScrolling){
				top.scroll(0, window.pageYOffset + event.detail*20);
			}
		}
		this.focus = function(){
			Q3boyScroller.isFocus = true;
		}
		this.blur = function(){
			Q3boyScroller.isFocus = false;
		}
		this.setSpeed = function(time) {
			Q3boyScroller.scrollTime = time;
			window.setTimeout(GM_setValue, 0, 'q3scr_speed', time);
		}
		this.setIsScrolling = function(scrolling){
			Q3boyScroller.isScrolling = scrolling;
			window.setTimeout(GM_setValue, 0, 'q3scr_autobegin', scrolling);
		}
		this.begin = function(){
			this.setIsScrolling(true);
			this.scroller();
		}
		this.end = function(){
			this.setIsScrolling(false);
		}
		this.click = function(){
			if(Q3boyScroller.isScrolling){
				this.stop()
			}else{
				this.start()
			}
		},
		this.start = this.begin;
		this.stop = this.end;
		this.refreshConfig = function(){
			Q3boyScroller.scrollTime = GM_getValue('q3scr_speed');
			Q3boyScroller.isScrolling = GM_getValue('q3scr_autobegin');
			if (!Q3boyScroller.scrollTime){
				Q3boyScroller.scrollTime = 25;
			}
			if (!Q3boyScroller.isScrolling){
				Q3boyScroller.isScrolling = false;
			}
			var self = arguments.callee;
			Q3boyScroller.refreshConfTimer = window.setTimeout(self, 1000);
		}
		this.scroller = function(){
			if (Q3boyScroller.keyPressing == undefined){
				Q3boyScroller.keyPressing = false;
			}
			if (Q3boyScroller.isFocus == undefined){
				Q3boyScroller.isFocus = false;
			}
			if (Q3boyScroller.isFocus && !Q3boyScroller.keyPressing && Q3boyScroller.isScrolling && top.scroll != window.pageYOffset){
				top.scroll(0,window.pageYOffset + 1, Q3boyScroller.scrollTime);
			} else if (Q3boyScroller.isScrolling != undefined && Q3boyScroller.isScrolling == false){
				clearInterval(Q3boyScroller.scrollerTimer);
				Q3boyScroller.scrollerTimer = null;
				return;
			}
			if (Q3boyScroller.scrollerTimer == null){
				var self = arguments.callee;
				Q3boyScroller.scrollerTimer = window.setInterval(self, Q3boyScroller.scrollTime);
			}
		}
		this.stopScroller = function(){
			clearInterval(Q3boyScroller.scrollerTimer);
			Q3boyScroller.scrollerTimer = null;
		}

		this.init = function(){
			this.refreshConfig();
			window.addEventListener('keydown', this.keydown, false);
			window.addEventListener('keyup', this.keyup, false);
			window.addEventListener('DOMMouseScroll', this.wheel, false);
			window.addEventListener('blur', this.blur, false);
			window.addEventListener('focus', this.focus, false);
			if (Q3boyScroller.isScrolling)
			{
				this.start();
			}
		}
		
		this.init();
	}
	unsafeWindow.q3scr = new Q3boyScroller();
}
