// ==UserScript==
// @name          Flickr Reload Backer
// @namespace     http://livejournal.com/users/jes5199/
// @description	  Reload keeps the Back Button for Interesting Flickr
// @include       http://www.flickr.com/explore/interesting/7days/*
// ==/UserScript==

var forms = document.getElementsByTagName("form");
for (var n = 0; n < forms.length; n++){
	var form = forms[n];
	hidden = document.createElement("input"); 
	hidden.name = "reloader";
	hidden.value = Math.floor(Math.random() * 100000);
	hidden.type = "hidden";
	form.appendChild(hidden);
}

