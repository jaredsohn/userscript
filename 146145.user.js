// ==UserScript==
// @name        Copy Paste Issue
// @namespace   http://nowhere.man
// @include     https://github.com/*/issues/*
// @version     3
// ==/UserScript==

var url = window.location.href;

var $ = unsafeWindow.jQuery;

var linktype = "issue";
if (url.indexOf("/new") > 0) {
	linktype = "newIssue";	
}

if (linktype = "newIssue") {
	//add paste button
	var divs = document.getElementById("issues_next").getElementsByTagName("div");
	for (i=0; i < divs.length; i++) {
		if (divs[i].className == "tabnav-widget selected" ) {

	  		var a = document.createElement('a');
	  		a.setAttribute("class", "minibutton selected bigger js-new-issue-button");
	  		a.innerHTML = 'Paste';
			a.setAttribute("href", "javascript:void(0)");
	  		a.addEventListener("click", function handler(evt){ 

				if (localStorage.gm_Title) {
					document.getElementById("issue_title").value = localStorage.gm_Title;
					localStorage.removeItem("gm_Title");
				}
				
				if (localStorage.gm_Description) {
					var ta = document.getElementById("js-new-issue-form").getElementsByTagName("textarea");
					for (i=0; i < ta.length; i++) {
						if (ta[i].getAttribute("name") == "issue[body]"  ) {
							ta[i].value = localStorage.gm_Description;
							localStorage.removeItem("gm_Description");
							break;
						}
					}
				}
				setTimeout(function () {
					$("button.primary").prop("disabled",false);	
				}, 200)

				return false;
				
	  		}, true);
			divs[i].appendChild(a);
			
			return;
		}
	}
}

if (linktype = "issue") {
	//add copy button
	var uls = document.getElementById("discussion_bucket").getElementsByTagName("ul");
	for (i=0; i < uls.length; i++) {
		if (uls[i].className == "comment-topic-actions" ) {

	  		var a = document.createElement('a');
	  		a.setAttribute("class", "minibutton");
	  		a.innerHTML = 'Copy';
			a.setAttribute("href", "javascript:void(0)");
	  		a.addEventListener("click", function handler(evt){ 
	  			
	  			var d = document.getElementById("issue_body").value;
	  			var t =  document.getElementById("issue_title").value;
	  			
	  			//append meta-text for refernce
	  			var urlParts = url.split("/");
	  			if ( urlParts.length > 5) {
	  				d = d + "\r\n\r\nIssue copied from " + urlParts[3] + "/" + urlParts[4] + "#" + urlParts[urlParts.length-1].replace("#", "");
	  			}
	  			localStorage.gm_Title = t;
	  			localStorage.gm_Description = d;
	  			return false;
	  		}, true);
	  		
			var li = document.createElement('li');
			li.appendChild(a);
			uls[i].appendChild(li);
			
			li.appendChild(a);
			
			//set widths for LI's
			var lis = uls[i].getElementsByTagName("li");
			for (k=0; k < lis.length; k++) {
				lis[k].setAttribute("style", "width: 50px; float: left;");
			}
			return;
		}
	}
}