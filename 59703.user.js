// ==UserScript==
// @name           Scroll Acceleration
// @namespace      http://ss-o.net/
// @include        http*
// @version        0.2
// ==/UserScript==

(function ScrollAcceleration(){
	if (!document.body)
		return document.addEventListener('DOMContentLoaded',ScrollAcceleration,false);

	var useSmoothScroll = true;
	var AccelerationValue = 5;
	var ScrollTimeValue = 0.3;

	var Root = /BackCompat/i.test(document.compatMode) ? document.body : document.documentElement;
	var _Root = window.getMatchedCSSRules ? document.body : Root;
	var _NotRoot = _Root == document.documentElement ? document.body : document.documentElement;
	var LOG_SEC = Math.log(1000);

	function SmoothScrollByElement(target){
		this.target = target;
		this._root = (target == _Root) ? _Root : target;
		this._target = window.getMatchedCSSRules && target == document.body ? Root : target;
	}
	SmoothScrollByElement.noSmooth = function(){
		SmoothScrollByElement.prototype.scroll = function(_x, _y){
			var self = this, target = this.target;
			target.scrollLeft += _x;
			target.scrollTop  += _y;
		};
	};
	SmoothScrollByElement.prototype = {
		scroll:function(_x, _y, _duration){
			var self = this, target = this.target, _target = this._target, _root = self._root, isDown = _y > 0;
			if (self.timer >= 0) {
				_x += self.X - target.scrollLeft;
				_y += self.Y - target.scrollTop;
				self.fin();
			}
			var x = target.scrollLeft;
			var y = target.scrollTop;
			self.X = _x + x;
			self.Y = _y + y;
			var duration = _duration || 400;
			var easing = easeOutQuart;
			var begin = +new Date;
			self.fin = function(){
				clearInterval(self.timer);
				self.timer = void 0;
			};
			self.timer = setInterval(scroll, 10);
			function scroll(){
				var now = +new Date;
				var time = now-begin;
				if (time > duration || (!isDown && target.scrollTop === 0) || (isDown && (target.scrollTop + _target.clientHeight + 16 >= _target.scrollHeight))) {
					self.fin();
					target.scrollLeft = x + _x;
					target.scrollTop  = y + _y;
					return;
				}
				var prog_x = easing(time, x, _x, duration);
				var prog_y = easing(time, y, _y, duration);
				target.scrollLeft = prog_x;
				target.scrollTop  = prog_y;
			}
		},
		isScrollable:function(dir){
			var self = this, target = this.target, _root = self._root;
			if (target.clientHeight <= target.scrollHeight) {
				if (dir === 'down') {
					if ((target.scrollTop + _root.clientHeight) < _root.scrollHeight){
						return true;
					}
				} else if (dir === 'up' && target.scrollTop > 0) {
					return true;
				}
			}
			return false;
		}
	};

	if (!useSmoothScroll) {
		SmoothScrollByElement.noSmooth();
	}
	var targets = [], prev_scroll_time;
	window.addEventListener("mousewheel", scroller, false);
	window.addEventListener("DOMMouseScroll", scroller, false);
	function scroller(e){
		var target = e.target, scroll_object;
		if (e.wheelDeltaY === void 0 && e.detail) {
			e.wheelDeltaY = e.detail * -20;
			e.wheelDeltaX = 0;
		}
		if (e.wheelDeltaY === void 0 && e.wheelDelta) {
			e.wheelDeltaY = e.wheelDelta;
			e.wheelDeltaX = 0;
		}
		var dir = e.wheelDeltaY > 0 ? 'up' : 'down';
		if (document.TEXT_NODE === target.nodeType) {
			target = target.parentNode;
		}
		if (target == document.documentElement && Root == document.body) {
			target = document.body;
		}
		do {
			if (!targets.some(function(_so){
				if (_so.target == target) {
					scroll_object = _so;
					return true;
				}
			})){
				if (target.clientHeight > 0 && (target.scrollHeight - target.clientHeight) > 16 && target !== _NotRoot) {
					var overflow = getComputedStyle(target,"").getPropertyValue("overflow");
					if (overflow === 'scroll' || overflow === 'auto' || (target == Root && overflow !== 'hidden')) {
						scroll_object = new SmoothScrollByElement(target);
						targets.push(scroll_object);
					}
				}
			}
			if (scroll_object && scroll_object.isScrollable(dir)) {
				var x = -e.wheelDeltaX, y = -e.wheelDeltaY;
				var prev = prev_scroll_time || 0;
				var now = prev_scroll_time = Number(new Date);
				var accele = (1 - Math.min(Math.log(now - prev + 1), LOG_SEC)/LOG_SEC) * AccelerationValue + 1;
				x *= accele;
				y *= accele;
				var ax = Math.abs(x), ay = Math.abs(y);
				scroll_object.scroll(x, y, Math.log(Math.max(ax, ay)) * ScrollTimeValue * 100);
				e.preventDefault();
				return;
			}
		} while ((target = target.parentNode) && target != document);
	}
	function easeOutCubic(t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	}
	function easeOutQuart(t, b, c, d) {
		return -c *((t=t/d-1)*t*t*t - 1) + b;
	}

})();