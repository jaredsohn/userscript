// Author Josiah Decker
// ==UserScript==
// @name           SubmitButton.user.js
// @namespace      http://josiahdecker.com/SubmitButton
// @description    a script that adds an "UNSECURE" tooltip to submit buttons, password fields, and images in forms that have an "action" attribute that doesn't target an https:// (secure) site
// @include        *
// ==/UserScript==

var forms = document.getElementsByTagName("form");

for (var i = 0; i < forms.length; i++){

	var address = forms[i].getAttribute("action");
	
	var secure = false;

	if (address.length > 9){
		var importantPart = address.substr(0, 8);
	
		if (importantPart == "https://"){
			secure = true;
		}
	}
	
	var submitButtons = forms[i].getElementsByTagName("input");
	
	
	for (var j = 0; j < submitButtons.length; j++) {
		var type = submitButtons[j].getAttribute("type");
		if (type) {
			type = type.toLowerCase();
		}
		if ((type == "submit") ) {
				//var content = submitButtons[j].getAttribute("value");
				//submitButtons[j].setAttribute("value", "*unsecure* " + content);
				var title = submitButtons[j].getAttribute("title");
				if (!title){
					title = "";
				}
				if (!secure) {
					submitButtons[j].setAttribute("title", "UNSECURE " + title);
				} else {
					submitButtons[j].setAttribute("title", "secure " + title)
				}
		}
		if ((type == "password") || (type == "image")){
			
				var title = submitButtons[j].getAttribute("title");
				if (!title) {
					title = "";
				}
				if (!secure) {
					submitButtons[j].setAttribute("title", "UNSECURE " + title);
				} else {
					submitButtons[j].setAttribute("title", "secure " + title);
				}	
		}
		
	}

}





