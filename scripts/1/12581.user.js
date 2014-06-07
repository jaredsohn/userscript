// ==UserScript==
// @name           Smooth Scroll
// @description    Smooths scroll for links within the page.
// @version        2.1.1
// @author         Shinya <code404sk@gmail.com>
// @namespace      http://code404.org/
// @homepage       http://userscripts.org/scripts/show/12581
// @id             Smooth-Scroll@code404.org
// @run-at         document-end
// @license        
// @include        *
// ==/UserScript==

// =============================================
// This script is based on LDRize.
// http://userscripts.org/scripts/show/11562
// 
// Thanks snj14.
// =============================================

(function(){
	function SmoothScroll(aNode){
		this.node = aNode;
		this._destX = null;
		this._destY = null;
		this._id_list = [];
	}
	
	SmoothScroll.USE_HISTORY = true;
	SmoothScroll.STEPS = 200;
	SmoothScroll.DURATION = 6000;
	
	SmoothScroll.prototype = {
		getPosition: function(){
			this.stop();
			
			// for nested HTML elements
			while(this.node.tagName.toLowerCase() != "a"){
				this.node = this.node.parentNode;
			}
			
			// get target node
			var fragment = this.node.hash.substr(1);
			var node = document.getElementById(fragment) || (function(){
				var anchors = document.getElementsByTagName("a");
				for(var i = 0, l = anchors.length; i < l; i++){
					if(
					  anchors[i].hasAttribute("name") &&
					  anchors[i].getAttribute("name") == fragment
					){
						return anchors[i];
					}
				}
			})();
			if(!node) return;
			
			// get target position
			var x = node.offsetLeft, y = node.offsetTop;
			while(node = node.offsetParent){
				x += node.offsetLeft;
				y += node.offsetTop;
			}
			if(x > window.scrollMaxX) x = window.scrollMaxX;
			if(y > window.scrollMaxY) y = window.scrollMaxY;
			
			// scroll!
			this.scrollTo(x, y);
			
			if(SmoothScroll.USE_HISTORY){
				document.location.hash = "#" + fragment;
			}
		},
		
		scrollTo: function(destX, destY){
			this._destX = destX;
			this._destY = destY;
			
			var y = window.pageYOffset, x = window.pageXOffset, time;
			for(var i = 1, l = SmoothScroll.STEPS; i < l; i++){
				x = destX - ((destX - x) / 2);
				y = destY - ((destY - y) / 2);
				time = (SmoothScroll.DURATION / SmoothScroll.STEPS) * i;
				if((Math.abs(destY - y) < 1 && Math.abs(destX - x) < 1) || i + 1 == SmoothScroll.STEPS){
					var id = setTimeout(this.makeScrollTo(destX, destY), time);
					var id2 = setTimeout(this.resetDestination, time);
					this._id_list.push(id);
					this._id_list.push(id2);
					break;
				}else{
					var id = setTimeout(this.makeScrollTo(x, y), time);
					this._id_list.push(id);
				}
			}
		},
		
		makeScrollTo: function(x, y){
			return function(){
				window.scrollTo(x, y);
			}
		},
		
		resetDestination: function(){
			this._destX = null;
			this._destY = null;
		},
		
		stop: function(){
			if(this._id_list.length){
				this.clearTimer();
				if(this._destX || this._destY){
					this.makeScrollTo(this._destX, this._destY).call();
				}
			}
			this.resetDestination();
		},
		
		clearTimer: function(){
			this._id_list.forEach(function(id){
				clearTimeout(id);
			});
			this._id_list = [];
			
		},
	}
	
	var anchors = document.getElementsByTagName("a");
	for(var i = 0, l = anchors.length; i < l; i++){
		if(
		  anchors[i].hasAttribute("href") &&          // web link
		  !anchors[i].hasAttribute("onclick") &&      // not have event
		  anchors[i].href.match(/#/) &&               // have fragment
		  (anchors[i].getAttribute("href") != "#") && // not like have event
		  // same page
		  anchors[i].href.replace(/#.*$/, "") == document.location.href.replace(/#.*$/, "")
		){
			anchors[i].addEventListener("click", function(aEvent){
				var scroller = new SmoothScroll(aEvent.target);
				scroller.getPosition();
				aEvent.preventDefault();
			}, false);
		}
	}
})();
