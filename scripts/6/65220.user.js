// ==UserScript==
// @name          BB.Com Super Ignore - Thread View
// @description	  Removes posts by people on your ignore list, instead of just replacing them with a message that the post is hidden.  Removes some posts that reply to people on your ignore list.
// @include       http://forum.bodybuilding.com/showthread.php*
// @exclude       
// ==/UserScript==

(function() {
	var allT;
	var plonk = new Array();
	    	
    	
	allT = document.getElementsByClassName('tborder');
	for (var i = 0; i < allT.length; i++) {
	    if(allT[i].innerHTML.match(/This message is hidden because <strong>(\w+)<\/strong> is on your <a href=\"profile/)){
		    allT[i].parentNode.parentNode.parentNode.parentNode.style.display="none";
	    	
	    	//Add ignored user to list of ignored users
	    	plonk[RegExp.$1] = RegExp.$1;
	    	}
		}

	// Remove posts that quote a user on the ignore list
	for (var i = 0; i < allT.length; i++) {
		for (var x in plonk) {
		    if(allT[i].innerHTML.match("Originally Posted by <strong>"+plonk[x]+"</strong>")){
			    allT[i].parentNode.parentNode.parentNode.parentNode.style.display="none";
	    		}
    		}
    	}
    	
})();