// ==UserScript==
// @name mk-highlight-low-qualification
// @namespace http://mk.pisem.net/greasemonkey/
// @description This script highlights low qualification values.
// @include http://virtonomica.ru/*/main/company/view/*/unit_list/employee
// ==/UserScript==

/*
    [http://wiki.greasespot.net/DOMContentLoaded]

    The code in a Greasemonkey user script gets invoked when the DOMContentLoaded event fires which happens when the DOM (HTML content of the page) is loaded.

    Simple speaking Greasemonkey user script is executed _after_ any other (embedded or external) script referenced by the page.
*/

//GM_log("'mk-...' started");

//var GM_unsafeWindow = unsafeWindow;

function fixNumber(s)
{
    return s.replace(/[^.0-9]/g, '');
}

var employee_level_required_string = "employee_level_required_";

var inputs = document.getElementsByTagName('input');
//GM_log("inputs.length=" + inputs.length);
for (var inputN = 0; inputN < inputs.length; ++inputN) {
    var input = inputs[inputN];
    var inputId = input.id;
    if (inputId.slice(0,employee_level_required_string.length) == employee_level_required_string) {
	var qualification_required = parseFloat(input.value);
	//GM_log("inputN=" + inputN + " inputId='" + inputId + "' qualification_required='" + qualification_required + "'");
	var parentNode = input.parentNode;
/*
	GM_log("inputN=" + inputN + " inputId='" + inputId + "' parentNode.textContent='" + parentNode.textContent + "'");
	GM_log("inputN=" + inputN + " inputId='" + inputId + "' parentNode.childNodes.length='" + parentNode.childNodes.length + "'");
	for (var i=0; i<parentNode.childNodes.length; ++i) {
	    GM_log("inputN=" + inputN + " inputId='" + inputId + "' parentNode.childNodes[" + i + "].textContent='" + parentNode.childNodes[i].textContent + "'");
	}
*/
	var qualification_node = parentNode.childNodes[3];
	var textContent = qualification_node.textContent;
	//GM_log("inputN=" + inputN + " inputId='" + inputId + "' textContent='" + textContent + "'");
	var qualification = parseFloat(fixNumber(textContent));
	//GM_log("inputN=" + inputN + " inputId='" + inputId + "' qualification_required='" + qualification_required + "' qualification='" + qualification + "'");
	if (qualification < qualification_required) {
	    //GM_log("inputN=" + inputN + " inputId='" + inputId + "' textContent='" + textContent + "'");
	    //GM_log("inputN=" + inputN + " inputId='" + inputId + "' qualification='" + qualification + "'");
/*
	    var span = document.createElement('span');
	    span.textContent = textContent;
	    //span.textContent = qualification;
	    span.style.color = "#FF00FF"; // Fuchsia
	    parentNode.replaceChild(span, qualification_node);
*/
	    parentNode.style.backgroundColor = "#FF00FF"; // Fuchsia
	}
    }
}

//GM_log("'mk-...' finished");
