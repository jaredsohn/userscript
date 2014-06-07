// ==UserScript==
// @name          BB.Com Ignore Red Morons
// @description	  Removes posts by people who are red. Removes some posts that reply to red trolls.
// @include       http://forum.bodybuilding.com/showthread.php*
// @exclude       
// ==/UserScript==

(function() {
	var allT;
	var plonk = new Array();
	    	
    	
	allT = document.getElementsByClassName('tborder');
	for (var i = 0; i < allT.length; i++) {
	    if(allT[i].innerHTML.match(/reputation_neg.gif/)){
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
