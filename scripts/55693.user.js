// ==UserScript==
// @name           Make it start
// @namespace      metafilter
// @description    MAKE IT START
// @include        http://www.metafilter.com/*
// @include        http://metafilter.com/*
// ==/UserScript==
// The MeFi April Fools' 2008 Background Changer        
// Thanks to Eric Costello
// http://glish.com/css/blogger/
 
            var r = 000;
            var g = 102;
            var b = 153;

            var ri = 1;
            var gi = 1;
            var bi = 1;
            

            var toprgb = 255;
            var bottomrgb = 5;
            

            function changeLinkColor() {
            	if (!document.getElementsByTagName) {return false;} // unclean! unclean!
            	if (r>toprgb) {
            	    ri=ri*-1;
            	} 
            	else if (r<bottomrgb) {
            	    ri=ri*-1;
            	}
            	if (g>toprgb) {
            	    gi=gi*-1;
            	} 
            	else if (g<bottomrgb) {
            	    gi=gi*-1;
            	}
            	if (b>toprgb) {
            	    bi=bi*-1;
            	} 
            	else if (b<bottomrgb) {
            	    bi=bi*-1;
            	}
            	r+=ri;
            	g+=gi;
            	b+=bi;
            	setStyleById('body','background','rgb('+r+', '+g+', '+b+')');
            	setTimeout(changeLinkColor,5200);
            }

            function setStyleById(i, p, v) {
            	var n = document.getElementById(i);
            	n.style[p] = v;
            }

            function init() {
            	changeLinkColor();
            }

            // Thanks scott andrew!
            // http://www.scottandrew.com/weblog/articles/cbs-events
            function addMasterEvent(obj, evType, fn){ 
             if (obj.addEventListener){ 
               obj.addEventListener(evType, fn, false); 
               return true; 
             } else if (obj.attachEvent){ 
               var r = obj.attachEvent("on"+evType, fn); 
               return r; 
             } else { 
               return false; 
             } 
            }

            // Add the icon insurance function to onLoad...
            addMasterEvent(window, 'load', init);
