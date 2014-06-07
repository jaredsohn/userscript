// ==UserScript==
// @name           Freshbooks - Generate Invoice ; Select All Projects
// @namespace      http://userscripts.org/users/muntzen
// @description    Adds a "select all" to the projects section of the Generate Invoice page on Freshbooks
// @include        https://*.billingarm.com/*
// @include        https://*.freshbooks.com/*
// ==/UserScript==

window.addEventListener("load", function(e) {

	// check to see if we are on the generate invoice page
	var headers = document.getElementsByTagName("h2");
	for (i = 0 ; i < headers.length ; i++) {
		if (headers[i].textContent == 'Generate Invoice') {
			// add the select all checkbox
			var checkbox = document.createElement("input");
			checkbox.setAttribute("type", "checkbox");
			checkbox.style.className = "checkbox";
			
			var div = document.getElementById("project_list");
			// create the new div and add the checkbox
			var newDiv = document.createElement("div");
			newDiv.style.className = "project_list_box";
			newDiv.style.clear = "both";
			newDiv.appendChild(checkbox);

			// create the span with the text in it and add it to new div
			var textSpan = document.createElement("span");
			textSpan.innerHTML = "&nbsp;Select All Projects";
			newDiv.appendChild(textSpan);

			// add the new div after the pay field
			div.parentNode.appendChild(newDiv);

			// add the event listener for the checkbox
			checkbox.addEventListener("click", function(e) {
				var projects = document.getElementsByTagName("input");
				for (j = 0 ; j < projects.length ; j++) {
					if (projects[j].getAttribute("type") == "checkbox" && 
						projects[j].getAttribute("name") == "projectid[]") {
						projects[j].checked = this.checked;
					}
				}
			}, false); 
		
			// done, let's get out of the for loop
			break;
		}
	}
	

}, false);