// ==UserScript==
// @name          Reddit hide kid comments
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  Self-explanatory
// @author        poopstain
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// ==/UserScript==
(function(u) {
	var a = document.querySelectorAll('div.commentarea a.author'), i;
        var gorg = {};

 	for (i in a) {
            var req = new XMLHttpRequest();
		if (true) {
                        req.thingy = a[i];
                        req.open("GET", "http://www.reddit.com/user/"+a[i].text+"/about.json", true);
                        req.onreadystatechange = function () {
                           if (req.readyState == 4 && req.status == 200){
                             user = JSON.parse( this.responseText );
                             if (user.data.created > 1231815976.0) {
	  	       this.thingy.parentElement.parentElement.parentElement.style.display = 'none';
		    }
                           }
                        };
	                req.send(null);
                        u.push(a[i].text);
		}
	}
        
})([]);