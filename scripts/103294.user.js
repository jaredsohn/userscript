// ==UserScript==
// @name           Langicon for Google translate
// @author         Bastien Colmard
// @namespace      http://codeblessyou.com/
// @description    Adds stars on Google Translate for your preferred languages
// @include        http://translate.google.*
// ==/UserScript==

var langicon = {
	plusImgOrig : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHVQTFRFwcHBwMDA+/v7u7u7/Pz8rq6uMzMz/v7+9/f37u7utLS0////5+fnDw8P7+/vQEBA5ubms7OzsLCw29vb3NzcysrKKysr6+vrODg49fX1+fn59vb27e3t+vr63t7esbGxvr6+ubm57Ozs8/Pzurq69PT0/f39808chgAAAGZJREFUeNokyAcSgzAMRFGBCYEUUiDFVcTy+v5HDMZ/ZkdvRIHTr5Q40MPnmrkQlXvcNoy0FjdtNhKrb87q3eemv76fXf23n+9rmbDby2GO2EydAbwTiKOTtQAEWt8psEolxeEvwACFcA1c1mQTHgAAAABJRU5ErkJggg==",
	plusImgFade : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEhQTFRF9fX18fHx39/fs7Ozn5+fqqqq4eHh/Pz8+fn56urqr6+vra2t+Pj48vLy4uLi4ODg+vr69/f3/f395ubm4+Pj+/v7/////v7+YjGLWwAAAFRJREFUeNokjUkOwCAMA0P3JTQhYPj/TwtkJMsjX0xRyjcoEkmsOUaUR9eek92zNdPkvjIwveZ325fmu6XnDhfcdQkJ0w0wVijTgYH2EPVfR+IvwAApRgg/uGTlgQAAAABJRU5ErkJggg==",
	starPng : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTREOUE0QzQ4MzI0MTFFMEI2QTFFNThCMzkxRkU1NDIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTREOUE0QzM4MzI0MTFFMEI2QTFFNThCMzkxRkU1NDIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5kaWQ6RTE5NkJBRjkyMzgzRTAxMThENDdCNzA4Qjk3OTU5MUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTE5NkJBRjkyMzgzRTAxMThENDdCNzA4Qjk3OTU5MUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5YpVj6AAAAvVBMVEX/9Da/0uT/9oLy9vrQ3ev/+QAuaam2wlf6+/zZ5O/+/v+otzzw9fmdr0/K1+eGoXvz7UBXiLL/8ADH1+lMfrqjtnL98ont8vZEeatrlKyCnnj09/o/dqj/9ACowNhZiLj/8wBbgoWXstCWstBFd57//65/n7z58Yb//612msLEySOYrZJEdp6XrZJulsY/daj/9QAJTJdtlsZZh7hXhaB/nrv/8jfEySL/9YhXhZ/w5gt/m5758oZ2mcL///+4sNZ0AAAAP3RSTlP//////////////////////////////////////////////////////////////////////////////////wCOJnwXAAAAfElEQVR42izMxxKCABAD0KX33kHFRrFSLKDg/v9nuc54yORdEkBEle94lRooWTk9sr+5c73nfv4sYvFevMS4OcDtws7hGFbsKYfISW14gp06EaDuG8t1a/g6beXrILyFYy+TTcvVNpprmWRPCrarXSB5ZCZR6FtJGPwKMACa4hBgqt1ZGAAAAABJRU5ErkJggg==",
	iconGenerated : [],

	utils : {
		/* CSS class utils */
		/* comes from http://demos.hacks.mozilla.org/openweb/classList/classList.js */
		containsClass : function (elm, className) {
			if (document.documentElement.classList) {
				containsClass = function (elm, className) {
					return elm.classList.contains(className);
				};
			} else {
				containsClass = function (elm, className) {
					if (!elm || !elm.className) {
						return false;
					}
					var re = new RegExp('(^|\\s)' + className + '(\\s|$)');
					return elm.className.match(re);
				};
			}
			return containsClass(elm, className);
		},
		addClass : function (elm, className) {
			if (document.documentElement.classList) {
				addClass = function (elm, className) {
					elm.classList.add(className);
				};
			} else {
				addClass = function (elm, className) {
					if (!elm) {
						return false;
					}
					if (!langicon.utils.containsClass(elm, className)) {
						elm.className += (elm.className ? " " : "") + className;
					}
				};
			}
			addClass(elm, className);
		},
		removeClass : function (elm, className) {
			if (document.documentElement.classList) {
				removeClass = function (elm, className) {
					elm.classList.remove(className);
				};
			} else {
				removeClass = function (elm, className) {
					if (!elm || !elm.className) {
						return false;
					}
					var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
					elm.className = elm.className.replace(regexp, "$2");
				};
			}
			removeClass(elm, className);
		},
		toggleClass : function (elm, className) {
			if (document.documentElement.classList) {
				toggleClass = function (elm, className) {
					return elm.classList.toggle(className);
				};
			} else {
				toggleClass = function (elm, className) {
					if (langicon.utils.containsClass(elm, className)) {
						langicon.utils.removeClass(elm, className);
						return false;
					} else {
						langicon.utils.addClass(elm, className);
						return true;
					}
				};
			}
			return toggleClass(elm, className);
		}
	},

	addCss : function(){
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '.langicon-box {background-repeat:no-repeat; background-position:right center; margin:5px 5px 0px 0px; width:11px; height:11px; float:left; } .langicon-plus { background-image:url("' + langicon.plusImgFade + '"); } .langicon-plus:hover { background-image:url("' + langicon.plusImgOrig + '"); cursor:pointer; } .langicon-star { background-image:url("' + langicon.starPng + '"); }';
		style.innerHTML += '.goog-menuitem{margin-left:13px;margin-right:0px;}';
		document.getElementsByTagName('head')[0].appendChild(style);
	},

	toggleLangPref : function(idButton, lang){
		var ar = [];
		var val = GM_getValue(idButton+"-langs");
		if(val !== undefined && val !==""){
			ar = val.split(",");
		}
		var indexLang = ar.indexOf(lang);
		if(indexLang !== -1){
			// exists
			while (indexLang !== -1){
				// remove every instance, just in case
				ar.splice(indexLang, 1);
				indexLang = ar.indexOf(lang);
			}
		} else {
			// does not exist
			ar.push(lang);
		}
		GM_setValue(idButton+"-langs", ar.toString());
	},
	toggleLang : function(idButton, elmt){
		langicon.toggleLangPref(idButton,elmt.nextSibling.textContent);
		langicon.utils.toggleClass(elmt, "langicon-plus");
		langicon.utils.toggleClass(elmt, "langicon-star");
	},

	buildMenu : function(idButton){
		
		if(langicon.iconGenerated.indexOf(idButton)===-1){
			langicon.iconGenerated.push(idButton); // remember so we don't insert icons 2 times
			/* util - prepare array so we load it just 1 time*/
			var ar = [];
			var val = GM_getValue(idButton+"-langs");
			if(val !== undefined && val !==""){
				ar = val.split(",");
			}
			
			/* Prepare the div */
			var div = document.createElement('div');
			langicon.utils.addClass(div,"langicon-box");
			
			/* get the right menu */
			var menu = document.getElementById(idButton+'-menu');
			var langArray = menu.getElementsByClassName('goog-option');
			
			/* insert new elements */
			var newElementsArray = [];
			var arLen=langArray.length;
			while (arLen--) {
				var newDiv = div.cloneNode(true);
				if(ar.indexOf(langArray[arLen].textContent) !== -1){
					langicon.utils.addClass(newDiv,"langicon-star");
				} else {
					langicon.utils.addClass(newDiv,"langicon-plus");
				}
				newElementsArray.push(langArray[arLen].parentNode.insertBefore(newDiv, langArray[arLen]));
			}
			
			/* add event listener and style to new elements */
			arLen=newElementsArray.length;
			while (arLen--) {
				newElementsArray[arLen].addEventListener("click", function(evt){langicon.toggleLang(idButton, evt.target)}, true);
			}
		}
	},

	init : function(nb_try) {		
		if (document.getElementById('gt-sl-gms')) {
			var srcButton = document.getElementById('gt-sl-gms');
			var tgtButton = document.getElementById('gt-tl-gms');
			srcButton.addEventListener("click", function(){langicon.buildMenu("gt-sl-gms");}, true);
			tgtButton.addEventListener("click", function(){langicon.buildMenu("gt-tl-gms");}, true);
		} else if (nb_try--){
			window.setTimeout(function(){langicon.init(nb_try)}, 50); // loop for waiting
		}
	}
};
window.addEventListener("load", function() {
	langicon.addCss();
	langicon.init(20);
}, false);