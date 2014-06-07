// ==UserScript==
// @name        add github insert image link
// @namespace   http://nowhere.man
// @include     https://github.com/*/issues/*
// @version     1
// @grant       none
// ==/UserScript==

function init() {
	var gitforms = document.getElementsByTagName("form");
	for (i=0; i < gitforms.length; i++) {
		if (gitforms[i].className.indexOf("js-new-comment-form") > -1 || gitforms[i].className.indexOf("js-new-issue-form") > -1 ) {
			bindEvents(gitforms[i]);
			return;
		}
	}
}


function bindEvents(frm) {

	var lists = frm.getElementsByTagName("ul")
	for (i=0; i < lists.length; i++) {
	  	if (lists[i].className.indexOf("tabnav-tabs") > -1  ) {
	  		
	  		var a = document.createElement('a');
	  		a.setAttribute("class", "tabnav-tab");
	  		a.innerHTML = 'Insert Image';
	
	  		a.addEventListener("click", function handler(evt){ 
	  			var textarea = frm.getElementsByTagName("textarea");
	  			var thisURL = prompt("Enter the URL", "");
	  			if ( thisURL == null || thisURL == "" || thisURL == "null") {
	  				return;	
	  			}
	  			var thisText = prompt("Enter the Alt Text", "Picture");
	  			textarea[0].value = textarea[0].value + " ![" + thisText + "](" + thisURL + ") " 
	  		}, true);
	  		
			var li = document.createElement('li');
			li.appendChild(a);
			lists[i].appendChild(li);
		}
	}
}

setTimeout( function () {
	init();
}, 500);