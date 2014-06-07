// ==UserScript==
// @name			IGN Boards Image Expander
// @namespace		vestitools.pbworks.com
// @description		Expands posted images when you click on them
// @include			http://boards.ign.com/*
// @include			http://betaboards.ign.com/*
// @include			http://forums.ign.com/*
// @exclude			http://boards.ign.com/QuickPost/*
// @exclude			http://betaboards.ign.com/QuickPost/*
// @exclude			http://forums.ign.com/QuickPost/*
// @version			1.0.0	8/13/2011
// ==/UserScript==

var isThread = /^\/.*\/b\d+\/\d+(\/((p|r)\d+\/?)?)?$/.test(window.location.pathname);
if(!isThread) {
	return;
}
	
/*****
Utility stuff
*****/
	
// Determine if a reference is defined
function defined(o) {
	return (typeof(o)!="undefined");
	}
	
// Determine if an object or class string contains a given class.
// If given no className, it will return true if the element has any class
function hasClass(obj,className) {
	if (!defined(obj) || obj==null || !RegExp) return false;
	if(!defined(className)) {
		return (typeof obj == "string" ? obj : obj.className ? obj.className : '')
				.replace(/\s/gi, '') != '';
		}
	var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
	if (typeof(obj)=="string") 
		return re.test(obj);
	else if (typeof(obj)=="object" && obj.className)
		return re.test(obj.className);
	return false;
	}
	
function getParentByClassName(el, name, depth) {
	if(typeof depth != "number") depth = -1;
	if(depth == 0) return null;
	var p = el.parentNode;
	if(!p || p.tagName == 'HTML') return null;
	else if(hasClass(p, name)) return p;
	else return getParentByClassName(p, name, depth-1);
	}
	
function getFirstByClassName(el, name) {
	if(el && (el = el.getElementsByClassName(name)) && (el = el[0]))
		return el;
	return null;
	}
	
function getParentByTagName(el, name) {
	var p;
	if(!el || !(p = el.parentNode) || p.tagName == 'HTML') return null;
	else if(p.tagName==name.toUpperCase()) return p;
	else return getParentByTagName(p, name);
	}

	
	
/*****
Meat and potatoes
*****/
	
function ImageExpander() {
	this.isFresh = !getFirstByClassName(document, this.classicBackgroundClassName);
	this.ref = document.createElement("div");
	this.help = document.createElement("div");
	this.image = document.createElement("img");
	this.linkContainer = document.createElement("div");
	this.link = document.createElement("a");
	this.ref.appendChild(this.help);
	this.ref.appendChild(this.image);
	this.linkContainer.appendChild(this.link);
	this.ref.appendChild(this.linkContainer);
	
	this.ref.className = "ignBoardsImageExpander";
	this.ref.style.cssText = "\
		position: fixed;\
		z-index: 99999;\
		top: 0;\
		right: 0;\
		bottom: 0;\
		left: 0;\
		text-align: center;\
		-moz-user-select: -moz-none;\
		-webkit-user-select: none;\
		user-select: none;\
		color: white;\
		text-shadow: 0 0 5px black;\
	";
	
	this.help.textContent =
"IGN Boards Image Expander by gamerX1011: \
Left Click anywhere to close.  Control + Left Click anywhere to toggle zoom.";
	this.help.style.cssText = "\
		position: fixed;\
		top: 2px;\
		left: 0;\
		right: 0;\
		cursor: default;\
		-moz-user-select: -moz-none;\
		-webkit-user-select: none;\
		user-select: none;\
	";
	
	var backgroundColorSource = this.isFresh ? getFirstByClassName(document, this.grayBackgroundClassName)
								: getFirstByClassName(document, this.classicBackgroundClassName);
	this.image.style.backgroundColor = window.getComputedStyle(backgroundColorSource, null)
										.getPropertyValue("background-color");
	this.image.style.boxShadow = "0 0 3px 0 black";
	
	this.linkContainer.style.cssText = "\
		position: fixed;\
		bottom: 2px;\
		left: 0;\
		right: 0;\
		-moz-user-select: -moz-none;\
		-webkit-user-select: none;\
		user-select: none;\
	";
	
	this.link.target = "_blank";
	this.link.style.color = "white";
	
	this.self = [this.ref, this.image, this.help, this.linkContainer];
	this.setZoom(false);
	this.setOriginal(null);
	this.addListeners();
}

ImageExpander.prototype = {
	grayWrapperClassName: "boards_thread_post",
	classicWrapperClassName: "boards_thread_post_wrapper",
	grayBackgroundClassName: "boards_thread_post_wrapper",
	classicBackgroundClassName: "boards_thread_post_column",
	
	setUrl: function(url) {
		this.image.src = this.link.href = this.link.textContent = url;
	},
	setOriginal: function(orig) {
		if(orig !== null) {
			this.setUrl(orig.src);
		}
		else this.setUrl(null);
		this._orig = orig;
	},
	show: function(url) {
		if(typeof url == "string") this.setUrl(url);
		else if(typeof url == "object") this.setOriginal(url);
		document.body.appendChild(this.ref);
		if(this._orig) {
			this._orig.style.boxShadow = "0 0 20px 0 rgba(255,255,0, 0.5)";
			this._orig.setAttribute("expanded", null);
		}
	},
	hide: function() {
		document.body.removeChild(this.ref);
		if(this._orig) {
			this._orig.style.boxShadow = null;
			this._orig.removeAttribute("expanded");
		}
		this.setOriginal(null);
		this.setZoom(false);
	},
	focusOriginal: function() {
		var parentLink = getParentByTagName(this._orig, "A");
		if(parentLink) {
			parentLink.focus();
		}
	},
	padding: "20px",
	setZoom: function(zoom) {
		this.ref.style.overflow = zoom ? "auto" : null;
		this.image.style.maxHeight = this.image.style.maxWidth = zoom ? null : "100%";
		this.ref.style.padding = zoom ? null : this.padding;
		this.image.style.margin = zoom ? this.padding : null;
		this.help.style.display = this.linkContainer.style.display = zoom ? "none" : null;
		this.ref.style.backgroundColor = zoom ? "rgba(0,0,0, .75)" : "rgba(0,0,0, .5)";
		this._zoom = zoom;
		this.ref.setAttribute("zoom", zoom);
	},
	
	addListeners: function() {
		var that = this;
		document.addEventListener("click", function(e){return that.onClick(e)}, true);
		this.link.addEventListener("focus", function(e){return that.onLinkFocus(e)}, true);
	},
	onClick: function(e) {
		if(e.which != 1) return;
		if(e.shiftKey || e.altKey || e.metaKey) return;
		
		if(this.self.indexOf(e.target) != -1) {
			if(e.ctrlKey) {
				return this.onSelfControlClick(e);
			}
			return this.onSelfClick(e);
		}
		if(!e.ctrlKey) {
			var image = null;
			if(e.target.tagName == "A" && e.target.firstChild.tagName == "IMG"
			&& e.target.firstChild == e.target.lastChild) {
				image = e.target.firstChild;
			} else if(e.target.tagName == "IMG") {
				image = e.target;
			}
			
			//javascript href check is for video embed thumbnails
			if(image && !hasClass(e.target, "BoardFace") && !/^javascript:/.test(image.parentNode.href)) {
				var inPost = this.isFresh ? getParentByClassName(e.target, this.grayWrapperClassName)
							: getParentByClassName(e.target, this.classicWrapperClassName);
				if(inPost) {
					return this.onImageClick(e, image);
				}
			}
		}
	},
	onSelfClick: function(e) {
		e.preventDefault();
		this.focusOriginal();
		this.hide();
	},
	onSelfControlClick: function(e) {
		e.preventDefault();
		this.setZoom(!this._zoom);
		this.focusOriginal();
	},
	onImageClick: function(e, image) {
		e.preventDefault();
		this.show(image);
	},
	onLinkFocus: function(e) {
		e.preventDefault();
		this.focusOriginal();
	}
}

var expander = new ImageExpander();