// ==UserScript==
// @name           100 Google Results v0.1
// @description    Display 100 Google results or less 
// @author         anh_surprised
// @include        http://*google.*
// @exclude        http://maps.google.*
// ==/UserScript==
(function(){
	var setValue = function(e) {
    		var num = prompt("Results per page Google should show (1-100):", 
                GM_getValue("results_per_page"));
    		if (num == null) return;
    
    		while (isNaN(num) || num < 0 || num > 100) {
        		alert("Please enter a number between 1 and 100");
        		num = prompt("Results per page Google should show (1-100):", num);
        		if (num == null) return;
    		}
    		GM_setValue("results_per_page", num);
	}

	var num = GM_getValue("results_per_page");
	if (typeof(num) == "undefined") {
    		GM_setValue("results_per_page", 100);
    		num= 100;
	}
	GM_registerMenuCommand("Set Google results per page", setValue);

	var isSearchIn = /search/;
	var isNumIn =/num/;
	var c=window.location;

	if (isSearchIn.test(c)){
		if(!(isNumIn.test(c))){
			c=c+"&num="+num;
			window.location=c;
		}
	}
})();
