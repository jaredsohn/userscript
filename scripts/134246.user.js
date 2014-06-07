// ==UserScript==
// @name           Super Ignore Ross
// @namespace      328FTW
// @description    completely ignore Retarded users
// @include        http://honda-tech.com/*
// @exclude        http://honda-tech.com/private.php
// @exclude	   http://honda-tech.com/private*
// ==/UserScript==

(function() {
	var allT; 
	var allR;
	var plonk = new Array(); 
	var ignore_threads_from = ["Ross"];
	
	for (var i = 0; i < ignore_threads_from.length; i++){
    plonk[ignore_threads_from[i]] = ignore_threads_from[i];
	}
	
	
	allT = document.getElementsByTagName('table');
	for (var i = 0; i < allT.length; i++) {
	    if(allT[i].innerHTML.match(/This message is hidden because <strong>(\w+)<\/strong> is on your <a href=\"profile/)){
		    allT[i].style.display="none";
	    	
	    	//Add ignored user to list of ignored users
	    	plonk[RegExp.$1] = RegExp.$1;
	    	}
		}

	// Remove posts that quote a user on the ignore list
	for (var i = 0; i < allT.length; i++) {
		for (var x in plonk) {
		    if(allT[i].innerHTML.match("Originally Posted by <strong>"+plonk[x]+"</strong>")){
			    allT[i].style.display="none";
	    		}
	    	if(allT[i].innerHTML.match("<div>[^]*This message is hidden because <strong>"+plonk[x]+"<\/strong> is on your <a href=\"profile")){
		    allT[i].style.display="none";
		    }
		    
	    	if(allT[i].innerHTML.match("<a.*>"+plonk[x]+"</a>[^]*?<img.*alt=\""+plonk[x])){
		    allT[i].style.display="none";
		    }
    		}
    	}

  allR = document.getElementsByTagName('tr');

	// Remove posts started by a user on the ignore list
	for (var i = 0; i < allR.length; i++) {
   		for (var x in plonk) {
		    if(allR[i].innerHTML.match("<span .*>"+plonk[x]+"</span>")){
			    allR[i].style.display="none";
	    		}
    		}
    	}

        // remove links to ignored users
	var allA; 
	allA = document.getElementsByTagName('a');
	for (var i = 0; i < allA.length; i++) {
   		for (var x in plonk) {
	    	if(allA[i].innerHTML.match(plonk[x])){
		    allA[i].style.display="none";
		    }
		  }
	}

    	
})();