// ==UserScript==
          // @name ziket
          // @author  Malanin Pavel
          // @include http://vkontakte.ru/*
          // @include http://www.vkontakte.ru/*
          // ==/UserScript==
          //some parts of script were taken from Lex scripts
          /*  Prototype JavaScript framework
           *  (c) 2005 Sam Stephenson <sam@conio.net>
           *  Prototype is freely distributable under the terms of an MIT-style license.
           *  For details, see the Prototype web site: http://prototype.conio.net/
          /*--------------------------------------------------------------------------*/
          
          //note: modified & stripped down version of prototype, to be used with moo.fx by mad4milk (http://moofx.mad4milk.net).
          
          var Class = {
          	create: function() {
          		return function() {
          			this.initialize.apply(this, arguments);
          		}
          	}
          }
          
          Object.extend = function(destination, source) {
          	for (property in source) destination[property] = source[property];
          	return destination;
          }
          
          Function.prototype.bind = function(object) {
          	var __method = this;
          	return function() {
          		return __method.apply(object, arguments);
          	}
          }
          
          Function.prototype.bindAsEventListener = function(object) {
          var __method = this;
          	return function(event) {
          		__method.call(object, event || window.event);
          	}
          }
          
          function $() {
          	if (arguments.length == 1) return get$(arguments[0]);
          	var elements = [];
          	$c(arguments).each(function(el){
          		elements.push(get$(el));
          	});
          	return elements;
          
          	function get$(el){
          		if (typeof el == 'string') el = document.getElementById(el);
          		return el;
          	}
          }
          
          if (!window.Element) var Element = new Object();
          
          Object.extend(Element, {
          	remove: function(element) {
          		element = $(element);
          		element.parentNode.removeChild(element);
          	},
          
          	hasClassName: function(element, className) {
          		element = $(element);
          		if (!element) return;
          		var hasClass = false;
          		element.className.split(' ').each(function(cn){
          			if (cn == className) hasClass = true;
          		});
          		return hasClass;
          	},
          
          	addClassName: function(element, className) {
          		element = $(element);
          		Element.removeClassName(element, className);
          		element.className += ' ' + className;
          	},
            
          	removeClassName: function(element, className) {
          		element = $(element);
          		if (!element) return;
          		var newClassName = '';
          		element.className.split(' ').each(function(cn, i){
          			if (cn != className){
          				if (i > 0) newClassName += ' ';
          				newClassName += cn;
          			}
          		});
          		element.className = newClassName;
          	},
          
          	cleanWhitespace: function(element) {
          		element = $(element);
          		$c(element.childNodes).each(function(node){
          			if (node.nodeType == 3 && !/\S/.test(node.nodeValue)) Element.remove(node);
          		});
          	},
          
          	find: function(element, what) {
          		element = $(element)[what];
          		while (element.nodeType != 1) element = element[what];
          		return element;
          	}
          });
          
          var Position = {
          	cumulativeOffset: function(element) {
          		var valueT = 0, valueL = 0;
          		do {
          			valueT += element.offsetTop  || 0;
          			valueL += element.offsetLeft || 0;
          			element = element.offsetParent;
          		} while (element);
          		return [valueL, valueT];
          	}
          };
          
          document.getElementsByClassName = function(className) {
          	var children = document.getElementsByTagName('*') || document.all;
          	var elements = [];
          	$c(children).each(function(child){
          		if (Element.hasClassName(child, className)) elements.push(child);
          	});  
          	return elements;
          }
          
          //useful array functions
          Array.prototype.iterate = function(func){
          	for(var i=0;i<this.length;i++) func(this[i], i);
          }
          if (!Array.prototype.each) Array.prototype.each = Array.prototype.iterate;
          
          function $c(array){
          	var nArray = [];
          	for (var i=0;i<array.length;i++) nArray.push(array[i]);
          	return nArray;
          }
          //***************************************************************************************************************
          /*
          moo.fx, simple effects library built with prototype.js (http://prototype.conio.net).
          by Valerio Proietti (http://mad4milk.net) MIT-style LICENSE.
          for more info (http://moofx.mad4milk.net).
          Sunday, March 05, 2006
          v 1.2.3
          */
          
          var fx = new Object();
          //base
          fx.Base = function(){};
          fx.Base.prototype = {
          	setOptions: function(options) {
          	this.options = {
          		duration: 500,
          		onComplete: '',
          		transition: fx.sinoidal
          	}
          	Object.extend(this.options, options || {});
          	},
          
          	step: function() {
          		var time  = (new Date).getTime();
          		if (time >= this.options.duration+this.startTime) {
          			this.now = this.to;
          			clearInterval (this.timer);
          			this.timer = null;
          			if (this.options.onComplete) setTimeout(this.options.onComplete.bind(this), 10);
          		}
          		else {
          			var Tpos = (time - this.startTime) / (this.options.duration);
          			this.now = this.options.transition(Tpos) * (this.to-this.from) + this.from;
          		}
          		this.increase();
          	},
          
          	custom: function(from, to) {
          		if (this.timer != null) return;
          		this.from = from;
          		this.to = to;
          		this.startTime = (new Date).getTime();
          		this.timer = setInterval (this.step.bind(this), 13);
          	},
          
          	hide: function() {
          		this.now = 0;
          		this.increase();
          	},
          
          	clearTimer: function() {
          		clearInterval(this.timer);
          		this.timer = null;
          	}
          }
          
          //stretchers
          fx.Layout = Class.create();
          fx.Layout.prototype = Object.extend(new fx.Base(), {
          	initialize: function(el, options) {
          		this.el = $(el);
          		this.el.style.overflow = "hidden";
          		this.iniWidth = this.el.offsetWidth;
          		this.iniHeight = this.el.offsetHeight;
          		this.setOptions(options);
          	}
          });
          
          fx.Height = Class.create();
          Object.extend(Object.extend(fx.Height.prototype, fx.Layout.prototype), {	
          	increase: function() {
          		this.el.style.height = this.now + "px";
          	},
          
          	toggle: function() {
          		if (this.el.offsetHeight > 0) this.custom(this.el.offsetHeight, 0);
          		else this.custom(0, this.el.scrollHeight);
          	}
          });
          
          fx.Width = Class.create();
          Object.extend(Object.extend(fx.Width.prototype, fx.Layout.prototype), {	
          	increase: function() {
          		this.el.style.width = this.now + "px";
          	},
          
          	toggle: function(){
          		if (this.el.offsetWidth > 0) this.custom(this.el.offsetWidth, 0);
          		else this.custom(0, this.iniWidth);
          	}
          });
          
          //fader
          fx.Opacity = Class.create();
          fx.Opacity.prototype = Object.extend(new fx.Base(), {
          	initialize: function(el, options) {
          		this.el = $(el);
          		this.now = 1;
          		this.increase();
          		this.setOptions(options);
          	},
          
          	increase: function() {
          		if (this.now == 1 && (/Firefox/.test(navigator.userAgent))) this.now = 0.9999;
          		this.setOpacity(this.now);
          	},
          	
          	setOpacity: function(opacity) {
          		if (opacity == 0 && this.el.style.visibility != "hidden") this.el.style.visibility = "hidden";
          		else if (this.el.style.visibility != "visible") this.el.style.visibility = "visible";
          		if (window.ActiveXObject) this.el.style.filter = "alpha(opacity=" + opacity*100 + ")";
          		this.el.style.opacity = opacity;
          	},
          
          	toggle: function() {
          		if (this.now > 0) this.custom(1, 0);
          		else this.custom(0, 1);
          	}
          });
          
          //transitions
          fx.sinoidal = function(pos){
          	return ((-Math.cos(pos*Math.PI)/2) + 0.5);
          	//this transition is from script.aculo.us
          }
          fx.linear = function(pos){
          	return pos;
          }
          fx.cubic = function(pos){
          	return Math.pow(pos, 3);
          }
          fx.circ = function(pos){
          	return Math.sqrt(pos);
          }
          //*******************************************************************************************************
          var fileLoadingImage = 'data:image/gif;base64,' +
          		'R0lGODlhIAAgAPcAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'ACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAAACwAAAAAIAAgAAAI+gABCBxIkOCCAwsKKlzIcOCBhwUJ' +
          		'FGiocICBgg8PEBzAkSLBAg8DEMw4sADHAR5HPkQpkKTAkwRSDjTwkIFDiAAInJRJkMHDiwBcwuQ5cMAB' +
          		'nxMfOsi5c6DOATFfMmCQcGCAnwp1ljwJdeCCqVNZGq3akGvHnmCnRvVodu3GtDZTPnW78CsDlnJ5EgBK' +
          		'tC9RsxxNLjBAuHBfwBwLK+Yr8+QCmAMGL/ZLWSZdipcZzvW4OaXZiQpNcuUJuGBpzHifclyruuvLy6oJ' +
          		'dmbq+uVqAE1PgiYqWuzZ2Idv4z47vLbcpsWdIvcsPHlR4szxOneamWEBussrZzVOMSAAIfkEBQoAAAAs' +
          		'AAAAABgAEgAACIAAAQgcSLAggAEGEypkAIAhQQMLFEZUOJDBgQMJGWgs6FDggosYDWrsmBCkgYQLNhLs' +
          		'aAAkxYYMJhIkAFJmxoYEBFps6FIgAQMGEFZUWbBlToEDgAI9SoCB0JdIlUIsADXhT6lVFSY9mVVhgadd' +
          		'w3odQLYs2KpmzYolUHZBWbEBAQAh+QQFCgAAACwBAAAAHQAOAAAIiQABCBxIcOAABgUTKlwoEGHCAQwH' +
          		'EoBIkIFFggEiEjRggGJDAA4BUAzJkKMBAgMthiSpcYDJlApZMlzAceTFAiBFFsSpkIBJnAgRGvg40MCB' +
          		'A0MHDEA5kGYAj00JLjh69KRSpTwLDI14kOpRg1cJMNXo9QBUkVfPLjR6IGNPpWM1MoibUKxGjQEBACH5' +
          		'BAUKAAAALAcAAAAZABEAAAiBAAEIHAiAgAGCCBMqBLDAwAKEDxcWIIDQgEWCDDIuHDCg4sWBGjdyLDDQ' +
          		'4kGQDCImJMCxo0CTAheEXAigJUUAMAkwALCTpkCbOD/OROjyJ8ebBAf0rLk04QCkCpHuDOCTZs+mVSHG' +
          		'zOrTAEmuYMMmPEC27AGVYM2aFQuArAOzCwICACH5BAUKAAAALA4AAAASABgAAAiCAAEsIACgoMGDCAcs' +
          		'QAhgAEGGAhcsNLjAgAGIEScCIGDxIkSJGjsOwAiy4ICOGDMCKNDx4UeJDQMY0CiQAYOUBgoctMmAJkab' +
          		'AICmDBr05tCdRo8edKm0adOkKW9KdXrAIIORTpsaYHrUwIEDAah+/eoT4gAGYw9AxZnWo9IAZAEEBAAh' +
          		'+QQFCgAAACwOAAAAEgAeAAAImQABDCgAoKDBgwgFDkjIsOCAhwcHLFjQ8OFCgxMvJrRoUCLFihALTvzI' +
          		'kCOAkQ0dhswY0YABAgwJaCTg0qXGhgtqGiDZUOfLlB1tAkU4cKhRowySKhUIlAEAp1Cdplya9KjVgwSt' +
          		'fjRw1SCDmw0JBDg4lqGBAzAFVm3I4IDbgwacggVAwO0BnkDPvrVql+vRAXav2s161CXDgAAh+QQFCgAA' +
          		'ACwPAAEAEQAfAAAIjAABCBwIgEABgggTDhiQsGGBhQ0jLiQQkSCBhQwrCrwIUePGjgM5ehSIcQDFihwx' +
          		'aiyZUSPHkyMJwBxJE6GBmzgXaMTJ00DFngZ01hxKcwADBkI9Hj1ac+nShjpbCjyaVKBPpgN1MhB4oCuA' +
          		'gyQjdj1AEGvCsQO3VkRLk+1UtWcPOFDY0K3HBQeqagwIACH5BAUKAAAALAgADgAYABIAAAh9AAEIHEiw' +
          		'IIABCBMOKGCw4UCFCh06TLggIQGJGDNiHKAxowEDHDsa/EjyosiBBRaQNLBA5AAGJgmsDHnwgIGGDAwO' +
          		'+GgSAIMDB3ISJMCgKMYFQA+YFApgAVOHSW86LNpyZFKCT30aNZi0KsasAq9iPVDQa1mpA3OCPUmzY0AA' +
          		'IfkEBQoAAAAsAgASAB0ADgAACIkAAQgcSLCgQQAEDhIkwEChQQIDBiQ8aODAAQMOCUbcWECjxY8ZNW6M' +
          		'KJDBxwMMBmQkgHHgSJYnWyZcYHCAAQM0B0JUWfFAAII/AWBkQBRAgZsGJj4sqBJAQ6dQAdi8GXLgU4JF' +
          		'BS642bRqVKhXWVINWbQr0asAtrasihatS6UOu2IN6pXt2owBAQAh+QQFCgAAACwAAA8AGQARAAAIgAAX' +
          		'HBhI8ACAgwgTKjxYsODChwkFEnQwEKLFixgxFjCQseOCjg8ZgIQYIGEAAhgHQGTAQOXBlgsJDJiZ0CVH' +
          		'hCxFAjDAE4DMmQUSBlXIEiHPmz9dWmT5cWfPgzMHoHy4oKjRp1BpLk14tKbWhVav3kQ4FWJThAsMnB2p' +
          		'0EDZhAEBACH5BAUKAAAALAEACAARABgAAAh3AAccOGAAgMGDCA8aGDhwQcKHABgOZDAAIsIFEg9YTBhg' +
          		'YMGNHEGKHEmypMmTKDcuYMCgJEuWIF++BLmyJcICHx+ydHhwgQEDFQcINUggIYGfBgoAEFoRItKmTCEO' +
          		'QHow6kOkRQ1aTfizqdahDwl4/ToWpFgAAQEAIfkEBQoAAAAsAAACAA4AHQAACIoAAQgcCGCBAYIIBx44' +
          		'wCAhwoUHBjgcGADiRIULD15cYJFgQ4IQP3qUCIDAgQAEUYokMHHAR5ETFwiUeRFAAY01WzLYyROmwJ49' +
          		'E7rcCYBnzqMISV4cYMCAUoQEmkp1aFDqggJCrQ4kMACrwKhOCQ4Yy1Kg14EFxg4o61At24Rcx9ZUm1Nu' +
          		'zgJvAwIAOw==';		
          var fileBottomNavCloseImage = 'data:image/gif;base64,' +
          		'R0lGODlhQgAWAOYAAMDAwMHBwZ2dnVlZWdLS0oODg6+vr/X19eTk5FBQULi4uIyMjJSUlFRUVFZWVtzc' +
          		'3FJSUsnJyVFRUVhYWFVVVezs7FNTU/b29v39/erq6vr6+qampldXV6KiokxMTE9PT2ZmZvf3993d3czM' +
          		'zGBgYHt7e6Ghofz8/PDw8N7e3mxsbLW1tfv7+5WVlc3NzcrKynh4eOvr60tLS+Dg4F9fX7m5ud/f37S0' +
          		'tIaGhnBwcGNjY+Xl5ZKSkoiIiKmpqW5ubpeXl29vb9XV1Y6Oju3t7WVlZXZ2dpiYmG1tbXx8fO/v7+fn' +
          		'57GxsbOzs/Hx8Xl5eVpaWmRkZE1NTXNzc2dnZ5aWloeHh+Pj405OTmlpadvb23p6ev////7+/gAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
          		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAABCABYAAAf/gFyC' +
          		'g4SFhoeIiYqLjI2Oj4xdkpOUlZaXl5BcJ42Ynp+YkZJcLEdCXJZcIwIaqKCvoKJdIUAeUSKuXYIuNB5V' +
          		'F5QVWgiwXQjDlwdaWrqLo00yAxZFWq6qJA0DHj6SBAtb4AsEXQBbzJUABeBbBQCUCusFL1wB6+uDoxlb' +
          		'HwMJVDaCRtCwMAALDhRdImxZEEFLhAIGyJmrZGALAwJaCDDYElGigYwbLtDjGKBkAHz5SiQY0EDFDBfY' +
          		'BkixEgJVgQIHJuWUeE4Sgi0CKgmYOJSSoHoPDhmtUIIfBSTYJiToIbKLli3uLJXrybPSVQVdKirYeXRL' +
          		'UkOVuMRIAmGAAw4D/yAMqSlp6yW7k4paAtqlgrotGxCUbSGgsAKURlEYoTBgQoMOrSbhRTcx75ZLfLsc' +
          		'APDN7EjChhFP4qIkCGOWDHRNIoD1bmVJ8MZRYp1VMseRZwulnTElGwUHcU1gcHXg5k5jOSdbzWyZmOZJ' +
          		'QHErHZ1ChQRpWUA4mAChw3BJChk6LLBgM0cA6JlVvJhxI9iw7DdsOVnPgMkARARRB3E9AYwrLziwnQTC' +
          		'ueJNPOOUY09W6ayzQG0NgnPYSPZ4Zo0IIEAARQIlZCBIDQJOIEEHJ1ByjHOvnHjJMjlFwsUDOqzkXwyo' +
          		'CLKCBBxwIMMNxfSYijNcOMEABB9s4aFRK1iQQDAOIvjo5CjO6MICD09UkAuUTPyww5VPwiILFxpUdQkG' +
          		'S3DZ5SuyNOOJfmf6mGaPgQAAOw==';
          
          var resizeSpeed = 7;	// controls the speed of the image resizing (1=slowest and 10=fastest)
          var borderSize = 10;	//if you adjust the padding in the CSS, you will need to update this variable
          
          var imageArray = new Array;
          var activeImage;
          
          if(resizeSpeed > 10){ resizeSpeed = 10;}
          if(resizeSpeed < 1){ resizeSpeed = 1;}
          resizeDuration = (11 - resizeSpeed) * 100;
          
          Object.extend(Element, {
          	hide: function() {
          		for (var i = 0; i < arguments.length; i++) {
          			var element = $(arguments[i]);
          			element.style.display = 'none';
          		}
          	},
          	show: function() {
          		for (var i = 0; i < arguments.length; i++) {
          			var element = $(arguments[i]);
          			element.style.display = '';
          		}
          	},
          	getWidth: function(element) {
          	   	element = $(element);
          	   	return element.offsetWidth; 
          	},
          	setWidth: function(element,w) {
          	   	element = $(element);
          		element.style.width = w +"px";
          	},
          	getHeight: function(element) {
          		element = $(element);
          		return element.offsetHeight;
          	},
          	setHeight: function(element,h) {
             		element = $(element);
          		element.style.height = h +"px";
          	},
          	setTop: function(element,t) {
          	   	element = $(element);
          		element.style.top = t +"px";
          	},
          	setSrc: function(element,src) {
          		element = $(element);
          		element.src = src; 
          	},
          	setInnerHTML: function(element,content) {
          		element = $(element);
          		element.innerHTML = content;
          	}
          });
          //
          //	Extending built-in Array object
          //
          Array.prototype.removeDuplicates = function () {
          	for(i = 1; i < this.length; i++){
          		if(this[i][0] == this[i-1][0]){
          			this.splice(i,1);
          		}
          	}
          }
          
          Array.prototype.empty = function () {
          	for(i = 0; i <= this.length; i++){
          		this.shift();
          	}
          }
          
          Array.prototype.copy = function(start,end)
          {
            var start = start||0;
            var end = end||this.length;
            if(end<0)end=this.length+end+1;
            return Array.apply(this,this.slice(start,end));
          }
          
          var Lightbox = Class.create();
          
          Lightbox.prototype = {
          	
          	initialize: function() {
          		if (!document.getElementsByTagName){ return; }
          		var anchors = document.getElementsByTagName('a');
          
          		// loop through all anchor tags
          		for (var i=0; i<anchors.length; i++){
          			var anchor = anchors[i];
          			
          			var relAttribute = String(anchor.getAttribute('rel'));
          			
          			// use the string.match() method to catch 'lightbox' references in the rel attribute
          			if (anchor.getAttribute('href') && (relAttribute.toLowerCase().match('lightbox'))){
          				anchor.onclick = function () {myLightbox.start(this); return false;}
          			}
          		}
          
          		var objBody = document.getElementsByTagName("body").item(0);
          		
          		var objOverlay = document.createElement("div");
          		objOverlay.setAttribute('id','overlay');
          		objOverlay.onclick = function() { myLightbox.end(); return false; }
          		objBody.appendChild(objOverlay);
          		
          		var objLightbox = document.createElement("div");
          		objLightbox.setAttribute('id','lightbox');
          		objLightbox.style.display = 'none';
          		objBody.appendChild(objLightbox);
          	
          		var objOuterImageContainer = document.createElement("div");
          		objOuterImageContainer.setAttribute('id','outerImageContainer');
          		objLightbox.appendChild(objOuterImageContainer);
          
          		var objImageContainer = document.createElement("div");
          		objImageContainer.setAttribute('id','imageContainer');
          		objOuterImageContainer.appendChild(objImageContainer);
          	
          		var objLightboxImage = document.createElement("img");
          		objLightboxImage.setAttribute('id','lightboxImage');
          		objImageContainer.appendChild(objLightboxImage);
          	
          		var objHoverNav = document.createElement("div");
          		objHoverNav.setAttribute('id','hoverNav');
          		objImageContainer.appendChild(objHoverNav);
          	
          		var objPrevLink = document.createElement("a");
          		objPrevLink.setAttribute('id','prevLink');
          		objPrevLink.setAttribute('href','#');
          		objHoverNav.appendChild(objPrevLink);
          		
          		
          		var objNextLink = document.createElement("a");
          		objNextLink.setAttribute('id','nextLink');
          		objNextLink.setAttribute('href','#');
          		objHoverNav.appendChild(objNextLink);
          
          		var objLoading = document.createElement("div");
          		objLoading.setAttribute('id','loading');
          		objImageContainer.appendChild(objLoading);
          		
          		var objLoadingLink = document.createElement("a");
          		objLoadingLink.setAttribute('id','loadingLink');
          		objLoadingLink.setAttribute('href','#');
          		objLoadingLink.onclick = function() { myLightbox.end(); return false; }
          		objLoading.appendChild(objLoadingLink);
          	
          		var objLoadingImage = document.createElement("img");
          		objLoadingImage.setAttribute('src', fileLoadingImage);
          		objLoadingLink.appendChild(objLoadingImage);
          
          		var objImageDataContainer = document.createElement("div");
          		objImageDataContainer.setAttribute('id','imageDataContainer');
          		objImageDataContainer.className = 'clearfix';
          		objLightbox.appendChild(objImageDataContainer);
          
          		var objImageData = document.createElement("div");
          		objImageData.setAttribute('id','imageData');
          		objImageDataContainer.appendChild(objImageData);
          	
          		var objImageDetails = document.createElement("div");
          		objImageDetails.setAttribute('id','imageDetails');
          		objImageData.appendChild(objImageDetails);
          	
          		var objCaption = document.createElement("span");
          		objCaption.setAttribute('id','caption');
          		objImageDetails.appendChild(objCaption);
          	
          		var objNumberDisplay = document.createElement("span");
          		objNumberDisplay.setAttribute('id','numberDisplay');
          		objImageDetails.appendChild(objNumberDisplay);
          		
          		var objBottomNav = document.createElement("div");
          		objBottomNav.setAttribute('id','bottomNav');
          		objImageData.appendChild(objBottomNav);
          	
          		var objBottomNavCloseLink = document.createElement("a");
          		objBottomNavCloseLink.setAttribute('id','bottomNavClose');
          		objBottomNavCloseLink.setAttribute('href','#');
          		objBottomNavCloseLink.onclick = function() { myLightbox.end(); return false; }
          		objBottomNav.appendChild(objBottomNavCloseLink);
          	
          		var objBottomNavCloseImage = document.createElement("img");
          		objBottomNavCloseImage.setAttribute('src', fileBottomNavCloseImage);
          		objBottomNavCloseLink.appendChild(objBottomNavCloseImage);
          		
          		overlayEffect = new fx.Opacity(objOverlay, { duration: 300 });	
          		overlayEffect.hide();
          		
          		imageEffect = new fx.Opacity(objLightboxImage, { duration: 350, onComplete: function() { imageDetailsEffect.custom(0,1); }});
          		imageEffect.hide();
          		
          		imageDetailsEffect = new fx.Opacity('imageDataContainer', { duration: 400, onComplete: function() { navEffect.custom(0,1); }}); 
          		imageDetailsEffect.hide();
          		
          		navEffect = new fx.Opacity('hoverNav', { duration: 100 });
          		navEffect.hide();
          	},
          	start: function(imageLink) {	
          
          		hideSelectBoxes();
          
          		// stretch overlay to fill page and fade in
          		var arrayPageSize = getPageSize();
          		Element.setHeight('overlay', arrayPageSize[1]);
          		overlayEffect.custom(0,0.8);
          		
          		imageArray = [];
          		imageNum = 0;		
          
          		if (!document.getElementsByTagName){ return; }
          		var anchors = document.getElementsByTagName('a');
          
          		// if image is NOT part of a set..
          		if((imageLink.getAttribute('rel') == 'lightbox')){
          			// add single image to imageArray
          			imageArray.push(new Array(imageLink.getAttribute('href'), imageLink.getAttribute('title')));			
          		} else {
          		// if image is part of a set..
          
          			// loop through anchors, find other images in set, and add them to imageArray
          			for (var i=0; i<anchors.length; i++){
          				var anchor = anchors[i];
          				if (anchor.getAttribute('href') && (anchor.getAttribute('rel') == imageLink.getAttribute('rel'))){
          					imageArray.push(new Array(anchor.getAttribute('href'), anchor.getAttribute('title')));
          				}
          			}
          			imageArray.removeDuplicates();
          			while(imageArray[imageNum][0] != imageLink.getAttribute('href')) { imageNum++;}
          		}
          
          		// calculate top offset for the lightbox and display 
          		var arrayPageSize = getPageSize();
          		var arrayPageScroll = getPageScroll();
          		var lightboxTop = arrayPageScroll[1] + (arrayPageSize[3] / 15);
          
          		Element.setTop('lightbox', lightboxTop);
          		Element.show('lightbox');
          		this.changeImage(imageNum);
          	},
          
          	changeImage: function(imageNum) {
          		
          		activeImage = imageNum;	// update global var
          
          		// hide elements during transition
          		Element.show('loading');
          		imageDetailsEffect.hide();
          		imageEffect.hide();
          		navEffect.hide();
          		Element.hide('prevLink');
          		Element.hide('nextLink');
          		Element.hide('numberDisplay');
          		
          		imgPreloader = new Image();
          		// once image is preloaded, resize image container
          		imgPreloader.onload=function(){
          			Element.setSrc('lightboxImage', imageArray[activeImage][0]);
          			myLightbox.resizeImageContainer(imgPreloader.width, imgPreloader.height);
          		}
          		imgPreloader.src = imageArray[activeImage][0];
          	},
          
          	//
          	//	resizeImageContainer()
          	//
          	resizeImageContainer: function( imgWidth, imgHeight) {
          
          		// get current height and width
          		this.wCur = Element.getWidth('outerImageContainer');
          		this.hCur = Element.getHeight('outerImageContainer');
          
          		// calculate size difference between new and old image, and resize if necessary
          		wDiff = (this.wCur - borderSize * 2) - imgWidth;
          		hDiff = (this.hCur - borderSize * 2) - imgHeight;
          		
          		// Resize the outerImageContainer very sexy like
          		reHeight = new fx.Height('outerImageContainer', { duration: resizeDuration });
          		reHeight.custom(Element.getHeight('outerImageContainer'),imgHeight+(borderSize*2)); 
          		reWidth = new fx.Width('outerImageContainer', { duration: resizeDuration, onComplete: function() { imageEffect.custom(0,1); }});
          		reWidth.custom(Element.getWidth('outerImageContainer'),imgWidth+(borderSize*2));
          
          		// if new and old image are same size and no scaling transition is necessary, 
          		// do a quick pause to prevent image flicker.
          		if((hDiff == 0) && (wDiff == 0)){
          			if (navigator.appVersion.indexOf("MSIE")!=-1){ pause(250); } else { pause(100);} 
          		}
          
          		Element.setHeight('prevLink', imgHeight);
          		Element.setHeight('nextLink', imgHeight);
          		Element.setWidth( 'imageDataContainer', imgWidth + (borderSize * 2));
          		Element.setWidth( 'hoverNav', imgWidth + (borderSize * 2));
          		
          		this.showImage();
          	},
          	
          	showImage: function(){
          		Element.hide('loading');
          		myLightbox.updateDetails(); 
          		this.preloadNeighborImages();
          	},
          
          	updateDetails: function() {
          
          		Element.show('caption');
          		Element.setInnerHTML( 'caption', imageArray[activeImage][1]);
          		
          		// if image is part of set display 'Image x of x' 
          		if(imageArray.length > 1){
          			Element.show('numberDisplay');
          			Element.setInnerHTML( 'numberDisplay', "Image " + eval(activeImage + 1) + " of " + imageArray.length);
          		}
          
          		myLightbox.updateNav();
          	},
          
          	updateNav: function() {
          
          		// if not first image in set, display prev image button
          		if(activeImage != 0){
          			Element.show('prevLink');
          			document.getElementById('prevLink').onclick = function() {
          				myLightbox.changeImage(activeImage - 1); return false;
          			}
          		}
          
          		// if not last image in set, display next image button
          		if(activeImage != (imageArray.length - 1)){
          			Element.show('nextLink');
          			document.getElementById('nextLink').onclick = function() {
          				myLightbox.changeImage(activeImage + 1); return false;
          			}
          		}
          		
          		this.enableKeyboardNav();
          	},
          
          	enableKeyboardNav: function() {
          		document.onkeydown = this.keyboardAction; 
          	},
          
          	disableKeyboardNav: function() {
          		document.onkeydown = '';
          	},
          
          
          	keyboardAction: function(e) {
          		if (e == null) { // ie
          			keycode = event.keyCode;
          		} else { // mozilla
          			keycode = e.which;
          		}
          
          		key = String.fromCharCode(keycode).toLowerCase();
          		
          		if((key == 'x') || (key == 'o') || (key == 'c') || (key == 'ч')){	// close lightbox
          			myLightbox.end();
          		} else if((key == 'p')||(key == 'з')){	// display previous image
          			if(activeImage != 0){
          				myLightbox.disableKeyboardNav();
          				myLightbox.changeImage(activeImage - 1);
          			}
          		} else if((key == 'n')||(key == 'т')){	// display next image
          			if(activeImage != (imageArray.length - 1)){
          				myLightbox.disableKeyboardNav();
          				myLightbox.changeImage(activeImage + 1);
          			}
          		}
          	},
          
          	preloadNeighborImages: function(){
          
          		if((imageArray.length - 1) > activeImage){
          			preloadNextImage = new Image();
          			preloadNextImage.src = imageArray[activeImage + 1][0];
          		}
          		if(activeImage > 0){
          			preloadPrevImage = new Image();
          			preloadPrevImage.src = imageArray[activeImage - 1][0];
          		}
          	
          	},
          
          	end: function() {
          		this.disableKeyboardNav();
          		Element.hide('lightbox');
          		imageEffect.toggle();
          		overlayEffect.custom(0.8,0);
          		showSelectBoxes();
          	}
          }
          
          function getPageScroll(){
          
          	var yScroll;
          
          	if (self.pageYOffset) {
          		yScroll = self.pageYOffset;
          	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
          		yScroll = document.documentElement.scrollTop;
          	} else if (document.body) {// all other Explorers
          		yScroll = document.body.scrollTop;
          	}
          
          	arrayPageScroll = new Array('',yScroll) 
          	return arrayPageScroll;
          }
          
          function getPageSize(){
          	
          	var xScroll, yScroll;
          	
          	if (window.innerHeight && window.scrollMaxY) {	
          		xScroll = document.body.scrollWidth;
          		yScroll = window.innerHeight + window.scrollMaxY;
          	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
          		xScroll = document.body.scrollWidth;
          		yScroll = document.body.scrollHeight;
          	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
          		xScroll = document.body.offsetWidth;
          		yScroll = document.body.offsetHeight;
          	}
          	
          	var windowWidth, windowHeight;
          	if (self.innerHeight) {	// all except Explorer
          		windowWidth = self.innerWidth;
          		windowHeight = self.innerHeight;
          	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
          		windowWidth = document.documentElement.clientWidth;
          		windowHeight = document.documentElement.clientHeight;
          	} else if (document.body) { // other Explorers
          		windowWidth = document.body.clientWidth;
          		windowHeight = document.body.clientHeight;
          	}	
          	
          	// for small pages with total height less then height of the viewport
          	if(yScroll < windowHeight){
          		pageHeight = windowHeight;
          	} else { 
          		pageHeight = yScroll;
          	}
          
          	// for small pages with total width less then width of the viewport
          	if(xScroll < windowWidth){	
          		pageWidth = windowWidth;
          	} else {
          		pageWidth = xScroll;
          	}
          
          	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
          	return arrayPageSize;
          }
          
          
          function getKey(e){
          	if (e == null) { // ie
          		keycode = event.keyCode;
          	} else { // mozilla
          		keycode = e.which;
          	}
          	key = String.fromCharCode(keycode).toLowerCase();
          	
          	if(key == 'x'){
          	}
          }
          
          function listenKey () {	document.onkeypress = getKey; }
          
          // ---------------------------------------------------
          
          function showSelectBoxes(){
          	selects = document.getElementsByTagName("select");
          	for (i = 0; i != selects.length; i++) {
          		selects[i].style.visibility = "visible";
          	}
          }
          
          // ---------------------------------------------------
          
          function hideSelectBoxes(){
          	selects = document.getElementsByTagName("select");
          	for (i = 0; i != selects.length; i++) {
          		selects[i].style.visibility = "hidden";
          	}
          }
          function pause(numberMillis) {
          	var now = new Date();
          	var exitTime = now.getTime() + numberMillis;
          	while (true) {
          		now = new Date();
          		if (now.getTime() > exitTime)
          			return;
          	}
          }
          // ---------------------------------------------------
          var not_whitespace = new RegExp(/[^\s]/);//This can be given inside the funciton - I made it a global variable to make the scipt a little bit faster.
          var parent_count = new Object;
          //Process the xml data
          function xml2array(xmlDoc) {
          	var arr;
          	var parent = "";
          	var attribute_inside = 0; /*:CONFIG: Value - 1 or 0
          	*	If 1, Value and Attribute will be shown inside the tag - like this...
          	*	For the XML string...
          	*	<guid isPermaLink="true">http://www.bin-co.com/</guid>
          	*	The resulting array will be...
          	*	array['guid']['value'] = "http://www.bin-co.com/";
          	*	array['guid']['attribute_isPermaLink'] = "true";
          	*	
          	*	If 0, the value will be inside the tag but the attribute will be outside - like this...	
          	*	For the same XML String the resulting array will be...
          	*	array['guid'] = "http://www.bin-co.com/";
          	*	array['attribute_guid_isPermaLink'] = "true";
          	*/
          
          	if(xmlDoc.nodeName && xmlDoc.nodeName.charAt(0) != "#") {
          		if(xmlDoc.childNodes.length > 1) { //If its a parent
          			arr = new Object;
          			parent = xmlDoc.nodeName;
          			
          		}
          	}
          	var value = xmlDoc.nodeValue;
          	if(xmlDoc.parentNode && xmlDoc.parentNode.nodeName && value) {
          		if(not_whitespace.test(value)) {//If its a child
          			arr = new Object;
          			arr[xmlDoc.parentNode.nodeName] = value;
          		}
          	}
          
          	if(xmlDoc.childNodes.length) {
          		if(xmlDoc.childNodes.length == 1) { //Just one item in this tag.
          			arr = xml2array(xmlDoc.childNodes[0]);
          		} else { //If there is more than one childNodes, go thru them one by one and get their results.
          			var index = 0;
          
          			for(var i=0; i<xmlDoc.childNodes.length; i++) {//Go thru all the child nodes.
          				var temp = xml2array(xmlDoc.childNodes[i]);
          				if(temp) {
          					var assoc = false;
          					var arr_count = 0;
          					for(key in temp) {
          						if(isNaN(key)) assoc = true;
          						arr_count++;
          						if(arr_count>2) break;//We just need to know wether it is a single value array or not
          					}
          
          					if(assoc && arr_count == 1) {
          						if(arr[key]) { 	//If another element exists with the same tag name before,
          										//		put it in a numeric array.
          							//Find out how many time this parent made its appearance
          							if(!parent_count || !parent_count[key]) {
          								parent_count[key] = 0;
          
          								var temp_arr = arr[key];
          								arr[key] = new Object;
          								arr[key][0] = temp_arr;
          							}
          							parent_count[key]++;
          							arr[key][parent_count[key]] = temp[key]; //Members of of a numeric array
          						} else {
          							arr[key] = temp[key];
          							if(xmlDoc.childNodes[i].attributes.length) {
          								for(var j=0; j<xmlDoc.childNodes[i].attributes.length; j++) {
          									var nname = xmlDoc.childNodes[i].attributes[j].nodeName;
          									if(nname) {
          										/* Value and Attribute inside the tag */
          										if(attribute_inside) {
          											var temp_arr = arr[key];
          											arr[key] = new Object;
          											arr[key]['value'] = temp_arr;
          											arr[key]['attribute_'+nname] = xmlDoc.childNodes[i].attributes[j].nodeValue;
          										} else {
          										/* Value in the tag and Attribute otside the tag(in parent) */
          											arr['attribute_' + key + '_' + nname] = xmlDoc.childNodes[i].attributes[j].nodeValue;
          										}
          									}
          								} //End of 'for(var j=0; j<xmlDoc. ...'
          							} //End of 'if(xmlDoc.childNodes[i] ...'
          						}
          					} else {
          						arr[index] = temp;
          						index++;
          					}
          				} //End of 'if(temp) {'
          			} //End of 'for(var i=0; i<xmlDoc. ...'
          		}
          	}
          
          	if(parent && arr) {
          		var temp = arr;
          		arr = new Object;
          		
          		arr[parent] = temp;
          	}
          	return arr;
          }
          // ---------------------------------------------------
          function getQueryVariable(variable) { 
            var query = window.location.search.substring(1); 
            var vars = query.split("&"); 
            for (var i=0;i<vars.length;i++) { 
              var pair = vars[i].split("="); 
              if (pair[0] == variable) { 
                return pair[1]; 
              } 
            }
          }  
          function initLightbox() { myLightbox = new Lightbox(); }
          //*************************************************************
          function BuildPhoto(){
          if((String(location).indexOf('http://vkontakte.ru/photos.php?act=album')!=0)&&(String(location).indexOf('http://vkontakte.ru/album')!=0)&&(String(location).indexOf('http://vkontakte.ru/photos.php?act=user')!=0))return;
          var url=document.getElementById('gallery').href;
          //var ww=window.location;
          
          var st=getQueryVariable("st");
          
          if(String(location).indexOf('http://vkontakte.ru/album')==0)
          {
          ids = String(location).split("http://vkontakte.ru/album");
          var id=ids[1];
          }
          else{
          var id=getQueryVariable("id");
          }
          
          if(st>0) st--;
          url="http://vkontakte.ru/photos.php?act=rss&id="+id+"&st="+st;
          xhr = new XMLHttpRequest();
          xhr.open("GET",url,true);
          	xhr.setRequestHeader("Cache-Control", "no-cache");
          	xhr.setRequestHeader("Pragma", "no-cache");
          	xhr.onreadystatechange = function() {
          		if (xhr.readyState == 4)
          		{
          			if (xhr.status == 200)
          			{
          				if (xhr.responseText != null)
          				{
          					WeGotItBaby(xhr.responseXML);
                  }else
          				{
          					alert("Failed to receive RSS file from the server - file not found.");
          					return false;
          				}
          			}
          			else
          				alert("Error code " + xhr.status + " received: " + xhr.statusText);
          		}
          	}
          
          	xhr.send(null);
          
          
          
          }
          
          function WeGotItBaby(rssxml){
          
           var s = new XMLSerializer();
           var d = rssxml;
           var str = s.serializeToString(d);
          
          var links=new Array;
          var images=new Array;
          var xmlobject = (new DOMParser()).parseFromString(str, "text/xml");
          
          var items = xmlobject.getElementsByTagName("item");
          
          for (var it=0; it<items.length; it++){
          var item = items[it];
          links[it]=item.getElementsByTagName("link")[0].firstChild.nodeValue;
          images[it]=item.childNodes(7).getAttribute('url');
          }
          
          
          
          var albums=document.getElementById('content').getElementsByTagName('a');
          var counter=0;
          
          for(var c1=0;c1<albums.length;c1++)
          {
            if(albums[c1].href.indexOf('act=show')!==-1)
            {
              hrefs[counter]=albums[c1];
              counter++;
            }
          }
          
            for(var c=0;c<hrefs.length;c++)
             {
             e=hrefs[c];
             e.href2=images[c];
             e.href3=links[c];
             e.rel="lightbox[nice_pics]";
             e.title='<a href='+links[c]+'>'+links[c]+'</a>';
             }
             
          
          
          initLightbox();
          
          for(var dr=0;dr<hrefs.length;dr++)
          {
           r=hrefs[dr];
           r.onclick='';
           r.href=r.href3;
          }
          
          var style_code;
          
          style_code='#lightbox{position:absolute;top:40px;left:0;width:100%;z-index:100;text-align:center;line-height:0;}';
          style_code+='#lightbox a img{border:none; }';
          style_code+='#outerImageContainer{position:relative;background-color:#fff;width:250px;height:250px;margin:0 auto;}';
          style_code+='#imageContainer{padding:10px;}';
          style_code+='#loading{position:absolute;top:40%;left:0%;height:25%;width:100%;text-align:center;line-height:0;}';
          style_code+='#hoverNav{position:absolute;top:0;left:0;height:100%;width:100%;z-index:10;}';
          style_code+='#imageContainer>#hoverNav{left:0;}';
          style_code+='#hoverNav a{outline:none;}';
          style_code+='#prevlink,#nextlink{width:49%;height:100%;background:transparent url(data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==) no-repeat;display:block;}';
          style_code+='#prevLink{left:0; float:left;width:49%;}';
          style_code+='#nextLink{right:0; float:right;width:49%;}';
          style_code+='#prevLink:hover,#prevLink:visited:hover{background:url(data:image/gif;base64,' +
          		'R0lGODlhPwAgAMQaALGxsYSEhNLS0v39/WJiYm1tbenp6dzc3MfHx7q6upqamo+Pj6Wlpby8vN3d3Xl5' +
          		'efT09OXl5bu7u9ra2v7+/ra2tvv7+8zMzFdXV////zMzMwAAAAAAAAAAAAAAAAAAACH5BAEAABoALAAA' +
          		'AAA/ACAAAAXwYCaOZGmeaKqamra+cPy6cm3feK7vfO//wKBwSCwaj8jkDoBpYh4IkbO5cGQE06ZAgWmQ' +
          		'GhhAkKkAMAgYQwZTAJgJhCsm4HYbHE9SID3GCEQIYWsBIwx+WGIlD3wZBhgLQkx/GYFicyMLaYgmYIlM' +
          		'UX1lZ3wYBAEBBZdYBaenIhAEBSIFspFOpqClAWgAEHKsrSNcDpVDkiaXZCKbJngMXGq2kySXGalqzCYP' +
          		'qZDGfsiEcoRYdHXTYBig0uCYh1mCr7FK8/T1IhETB/r7+gP2KxcqJBhIMIEEC/9UUBjAsGHDhBAjSpxI' +
          		'seIQGhZTtAgBADs=) left 15% no-repeat; }';
          style_code+='#nextLink:hover,#nextLink:visited:hover{background:url(data:image/gif;base64,' +
          		'R0lGODlhPwAgAMQcAHp6eqqqqs7OzmFhYfPz89DQ0MLCwtvb221tbZ6enpycnFVVVYaGhra2tufn59bW' +
          		'1oeHh8/Pz76+vvr6+sHBwZKSkvn5+d/f383NzXJycklJSf///zMzMwAAAAAAAAAAACH5BAEAABwALAAA' +
          		'AAA/ACAAAAXfIMdtZGmeaKquLDq2cCzPdG3feK7vfO//wKBwSCwaj8igRsMwATSk53IJ2DA0gVJAU9lO' +
          		'pwIfuPSMYgPoxoYw0Bw2jsWAIFAoMhqI3SFuz82AKAIaVU9hWhqHP4RbCYFlKQlMGo4mW4piVQiJG5BP' +
          		'AKAAaiRsGn+WnECEGwemBJ6EoaOsY6iYPasbjbAqCAsHcgS2SlUkmwtQncknW1mNw6rFtEtmaNa0CCWb' +
          		'ipfEqMlSXwTbJYOn3Unp6ukTEQXv8O8YF+stFhQG+fr5Eg/1/wADChxIsOCLgjBEIIQRAgA7) right 15% no-repeat; }';
          style_code+='#imageDataContainer{font:10px Verdana,Helvetica,sans-serif;background-color:#fff;margin:0 auto;line-height:1.4em;}';
          style_code+='#imageData{padding:0 10px;}';
          style_code+='#imageData #imageDetails{width:70%; float:left; text-align:left; }';
          style_code+='#imageData #caption{font-weight:bold;}';
          style_code+='#imageData #numberDisplay{display:block; clear:left; padding-bottom:1.0em;}';
          style_code+='#imageData #bottomNavClose{width:66px; float:right;  padding-bottom:0.7em;}';
          style_code+='#overlay{position:absolute;top:0;left:0;z-index:90;width:100%;height:500px;background-color:#000;filter:alpha(opacity=60);-moz-opacity:0.6;opacity:0.6;}';
          style_code+='.clearfix:after{content:"."; display:block; height:0; clear:both; visibility:hidden;}';
          style_code+='* html>body .clearfix{display:inline-block; width:100%;}';
          style_code+='* html .clearfix{height:1%;}';
          
           var s = document.createElement("style");
           s.appendChild(document.createTextNode(style_code));
          headr=document.getElementsByTagName('head')[0];
          headr.appendChild(s);
          
          w=document.getElementById('content').firstChild.nextSibling.firstChild.nextSibling
          d=document.createElement('span')
          d.setAttribute('class','divider');
          d.innerHTML=' | '
          w.appendChild(d)
          
          q=document.createElement('a')
          q.id='albphoto'
          q.rel='0'
          q.setAttribute('class','notbold')
          q.style='cursor:pointer;'
          q.onclick='View()'
          q.appendChild(ontxt)
          w.appendChild(q)
          }
          
          function View()
          {
          for(var c=0;c<hrefs.length;c++)
          {
           e=hrefs[c];
           
           if(e.href!=e.href2)
           {
           e.href=e.href2;
           e.onclick = function () {myLightbox.start(this); return false;}
           }
           else
           {
           e.href=e.href3;
           e.onclick='';
           }
          }
          button=document.getElementById('albphoto');
          button.innerHTML='';
          if(button.rel=='0')
          {
          button.rel='1';
          button.appendChild(offtxt);
          }
          else
          {
          button.rel='0';
          button.appendChild(ontxt);
          }
          }
          
          var ontxt= document.createTextNode('Show ON');
          var offtxt= document.createTextNode('Show OFF');
          var hrefs=new Array;
          document.addEventListener("DOMContentLoaded", BuildPhoto, false);
          