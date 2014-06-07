// ==UserScript==
// @name           Resizable Textarea
// @namespace      http://white.s151.xrea.com/
// @include        *
// ==/UserScript==

(function(){
	if(!document.body || window != window.parent) return;
	var elements = document.getElementsByTagName('textarea');
	if(!elements.length) return;
	
	var browser_type;
	if(typeof unsafeWindow != 'undefined')
	  browser_type = 'firefox';
	else if(typeof window.opera != 'undefined')
	  browser_type = 'opera';
	else browser_type = 'ie';

	var wrap = {
		'firefox': ['whiteSpace', '-moz-pre-wrap'],
		'opera':   ['whiteSpace', '-o-pre-wrap'],
		'ie':      ['wordWrap', 'break-word']
	}

	var Resize = function(){this.initialize.apply(this, arguments);}
	Resize.prototype = {
	  initialize: function(){
		  this.target = arguments[0];
		  this.min = this.target.clientHeight;
		  this.clone = document.body.appendChild(document.createElement('pre'));
		  with(this.clone.style){
			  position   = 'absolute';
			  padding    = '0px';
			  visibility = 'hidden';
			  top   = '0';
			  width = this.target.clientWidth + 'px';
		  }
		  this.clone.style[wrap[browser_type][0]] = wrap[browser_type][1];
		  
		  var self = this;
		  this.addEventListener('focus', function(){self.focus()}, false);
		  this.addEventListener('blur', function(){self.blur()}, false);
	  },
	  addEventListener: function(type, func, capture){
		  if(this.target.addEventListener) this.target.addEventListener(type, func, capture);
		  else if(this.target.attachEvent) this.target.attachEvent('on'+type, func);
	  },
	  blur: function(){
		  clearInterval(this.timer_id);
	  },
	  focus: function(){
		  var self = this;
		  this.timer_id = setInterval(function(){self.resize()}, 50);
	  },
	  resize: function(){
		  /*@cc_on this.clone.innerText = this.target.value.replace(/\r\n/g,'\n').replace(/^$/mg,' ');
		  // @*/ this.clone.textContent = this.target.value;
		  this.target.style.height = Math.max(this.min, this.clone.offsetHeight + 20) + 'px';
	  }
	}
	
	for(var i=0; i<elements.length; i++) new Resize(elements[i]);
})();
