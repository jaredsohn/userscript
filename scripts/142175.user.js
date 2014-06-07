// ==UserScript==
// @name	Anti-bot By SandySweet
// @version	1.2
// @include	/^http:\/\/www\.jeuxvideo\.com/forums\/.*$/
// @include	/^http:\/\/m\.jeuxvideo\.com/forums\/.*$/
// ==/UserScript==

/** Anti-bot **/


(function() {
	var Posts = document.querySelectorAll('.post');
	for(var i=0, c=Posts.length; i<c; i++) 
		{		
			var div=Posts[i].parentNode.parentNode;
			
					var ht=getComputedStyle(div,null).height;
					var nombre=parseFloat(ht);
					if (nombre>3000)
					{
					
					div.style.display='none';
					
					}
		}
	
})();
/** FIN Anti-bot **/