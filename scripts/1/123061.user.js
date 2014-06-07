// ==UserScript==
// @name           Craigslist Post Renew in New Window
// @namespace      Craigslist Post Renew in New Window
// @description    This modifies your post renewal links in your account, to popup in a new window. I was annoyed that CL would use the same window, and then I would have to click back, and click the next renew link, etc etc.
// @include        https://accounts.craigslist.org/
// @include	   https://accounts.craigslist.org/login
// ==/UserScript==

var autoclick = "no"; //Change this to yes (and make sure you allow popups from accounts.craigslist.org) if you want it to click the links for you
/*
DO NOT CHANGE ANYTHING BELOW
*/
for (i=0; i<document.forms.length; i++) {
	var form = document.forms[i];
	var counter = 0;
	if(form.elements.namedItem("go")){
		var input = form.elements.namedItem("go");
		var go_val = input.value;
		if(go_val == "renew"){
			document.forms[i].setAttribute('target','_blank');
			autoclick = autoclick.toLowerCase();
			if(autoclick == "yes"){
				counter = 1;
				document.forms[i].submit();
			}
		}
	}
}

if(counter == 1){ //this will cause the page to refresh to display the renewed posting
	location.reload(true);	
}