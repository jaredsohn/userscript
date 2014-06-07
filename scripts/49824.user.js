// ==UserScript==
// @name           star on tumblr
// @namespace      
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/twitter*
// ==/UserScript==

	if (typeof window.Minibuffer != 'undefined') with (window.Minibuffer) {
	        var click = function(n) {
	                var e = document.createEvent('MouseEvents');
	                e.initMouseEvent("click",true,true,unsafeWindow,1,10,50,10,50,0,0,0,0,1,n);
	                n.dispatchEvent(e);
	        };



  addShortcutkey({
	        key: "s",
	        description: 'twitter.star',
	        command: function() {
	            try { execute( 'twitter.star', execute('current-node')); } catch(e) { }
	        }});
	        
	        
   addCommand({
	        name: "twitter.star",
	        command: function(stdin) {
	            try {
	                if (!stdin.length) stdin = execute('current-node');
	                var count = $X('.//input[contains(concat(" ",@class," "), " star_button ")]', stdin[0]);
	                for (var n = 0; n < count.length; n++) {
	                    if(!count[n].clientWidth) continue;
	                    count[n].click();
	                    return stdin;
	                }
	            } catch(e) {}
	            return stdin;
	         }});
}