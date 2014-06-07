// ==UserScript==
// @name           Freshbooks Timesheet Project/Tasks Auto-Select
// @namespace      http://userscripts.org/users/muntzen
// @description    Auto-selects projects and tasks on the timesheet page when there is only one option.
// @include        https://*.billingarm.com/*
// @include        https://*.freshbooks.com/*
// ==/UserScript==

window.addEventListener("load", function(e) {
	var projectSelect = document.getElementById("projectid");
	// if it's not there, let's see if we can find it via XPath in the weekly view
	if (!projectSelect) {
		// maybe we are in weekly view
		var projectSelectNode = document.evaluate(
			"/html/body/div[3]/form/div[4]/div[2]/table/tbody/tr[2]/td/select", 
			document, null, XPathResult.ANY_TYPE, null);
		
		if (projectSelectNode) {
			projectSelect = projectSelectNode.iterateNext();
		}
	}
	if (projectSelect) {
		projectSelect.addEventListener("change", function(e) {
			// we'll run our code after a brief timer to make sure the cascading selects are done
			// this should probably be run in a different event listener, if one exists that would work
			window.setTimeout(function() {
				var tasksSelect = document.getElementById('taskid');
				// if it's not there, let's see if we can find it via XPath in the weekly view
				if (!tasksSelect) {
					var tasksSelectNode = document.evaluate(
						"/html/body/div[3]/form/div[4]/div[2]/table/tbody/tr[2]/td[2]/select",
						document, null, XPathResult.ANY_TYPE, null);
					if (tasksSelectNode) {
						tasksSelect = tasksSelectNode.iterateNext();
					}
				}
				if (tasksSelect) {
					if (tasksSelect.options.length == 3){
						tasksSelect.selectedIndex = 1;
					}
					
					var hoursField = document.getElementById('hours');
					if (hoursField) {
						hoursField.focus();
					}
				}
			}, 250);
		}, false);
		
		// set the project to the default project, if there is only one
		if (projectSelect.options.length == 3) {
			projectSelect.selectedIndex = 1;		
			
			// fire the onchange event so everything necessary to run from that will be fired
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent('change', true, true ); // event type,bubbling,cancelable
			projectSelect.dispatchEvent(evt);		
		}
	}

}, false);

