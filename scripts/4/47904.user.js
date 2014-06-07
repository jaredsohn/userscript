// ==UserScript==
// @name           Nuke Individual Post -- editpost
// @namespace      Nuke Individual Post
// @description    Performs an advanced edit of an individual post in nbf.
// @include        http://www.notebookforums.com/editpost.php?do=editpost&p*
// ==/UserScript==

window.setTimeout( function() {
	const replaceMsg = ".";
	var hash = document.location.hash;
	
	if (hash == "#nuke_message") {
		// find the text to be replaced		


		var foundForm = document.forms.namedItem("vbform");
		var input = foundForm.elements.namedItem("vB_Editor_001_textarea");
		input.value = replaceMsg;		
// new
		input.defaultValue = replaceMsg;
		input.innerHTML = replaceMsg;
		input.textContent = replaceMsg;

// end new
		
		var iframeX = document.getElementById("vB_Editor_001_iframe").contentDocument;
		//alert(iframeX);
		var inputX = iframeX.body;
		inputX.innerHTML = replaceMsg;

		
		var inputElements = document.getElementsByTagName('input');
		// The following code finds all text, hidden, submit, radio inputs of the "vbform" form.
		// Note that this is NOT the actual post contents.....
		for (var i = 0; i < inputElements.length; i++) {
			if (inputElements[i].form.name == "vbform") {
				if (inputElements[i].type == "text") {
					inputElements[i].value = replaceMsg;
				}			
			}
		}
	
		var SaveChanges = foundForm.elements.namedItem("vB_Editor_001_save");
		SaveChanges.click();
		closeTab();


		
		


	} else {
	}
	


	
	
	
	
	function closeTab(){
		window.open('', '_self', '');
		window.close();
	}








	
},1000);
