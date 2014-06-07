// ==UserScript==
// @name        dolibarr accessibility
// @namespace   http://www.accessolutions.fr
// @description Dolibarr accessibility features for blind users
// @include     http://www.mistigri.org/~yan/test/dolibarr/htdocs/*
// @version     1
// @grant       none
// ==/UserScript==

function fixFormLabels() {
    inputName = null;
    forms = document.getElementsByTagName("td");
    inputIndex = 0
    for (i = 0; i < forms.length; i++) {
	if (forms[i].hasAttributes() == false && forms[i].firstChild != null && forms[i].firstChild.nodeType == 3) {
	    inputName = forms[i].innerHTML;
	    inputIndex = i;
	} else if (inputName != null && forms[i].hasChildNodes()
		   && forms[i].firstChild.tagName != undefined && forms[i].firstChild.tagName.toLowerCase() == "input" && i - inputIndex < 2) {
	    iForm = forms[i].firstChild;
	    if (iForm.getAttribute("id") == null) {
		iForm.setAttribute("id", iForm.getAttribute("name"));
	    }
	    newLabel = document.createElement("label");
	    newLabel.setAttribute("for", iForm.id);
	    newLabel.innerHTML = inputName;
	    if (i > 0) {
		forms[i - 1].innerHTML = "";
		forms[i - 1].appendChild(newLabel);
		
	    }
	    inputName = null;
	    inputIndex = 0;
	} else if (i - inputIndex > 2) {
	    inputName = null;
	    inputIndex = 0;
	}
    }
}

function fixLinkTitles() {
    links = document.getElementsByTagName("a");
    for (i = 0; i < links.length; i++) {
	className = links[i].getAttribute('class');
	if (className != null && className.toLowerCase() == 'tabtitle') {
	    links[i].setAttribute('role', 'heading');
	    links[i].setAttribute('aria-level', '2');
	    links[i].setAttribute('tabindex', '42');
	}
    }
}


var divs = document.getElementsByTagName("div");
focusElement = null;
for (div = 0; div < divs.length; div++) {
    if (divs[div].getAttribute('class') == 'titre') {
	divs[div].setAttribute("role", "heading");
	divs[div].setAttribute("aria-level", "2");
	divs[div].setAttribute("tabindex", "0");
	if (focusElement == null) {
	    focusElement = divs[div];
	}
    }
}


try {
    fixLinkTitles();
    fixFormLabels();
} catch (e) {
    alert(e);
}
if (focusElement != 0) {
    setTimeout(function() {
	focusElement.focus();
    }, 600);
}
