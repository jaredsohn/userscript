// ==UserScript==
// @name        Tatoeba Flexible Linker
// @namespace   http://userscripts.org/users/515236
// @description Inserts a box below a Tatoeba sentence that the user can fill with the number or URL of a sentence, as well as buttons that allow the user to visit the new sentence or link it to the first one. Extends Zifre's "Tatoeba Linker" script.
// @author      AlanF_US
// @include     http://tatoeba.org/*/sentences/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1.1
// ==/UserScript==
// NOTE: All functions used in the script must be added to the line below
// the comment beginning "All functions that are called by this script..."
function stripLeadingURL(str) {
	// Returns the string following the final slash in str.
	// If there is no final slash, or if it is in the final position
	// in str, the unchanged string is returned. 
	// It is left to the user interface code to determine whether the
	// output from this function is a valid ID.
	// Examples:
	// "http://tatoeba.org/deu/sentences/show/2395134" -> "2395134"
	// "2395134" -> "2395134" (unchanged)
	// "http://tatoeba.org/deu/sentences/show/zzz" -> "zzz" (which eventually will cause GUI to report an error)
    var lastSlash = str.lastIndexOf("/");
    var len = str.length;
    if(lastSlash == -1 || (lastSlash > len-2)) {
    	return str;
    } else {
    	return str.substring(lastSlash+1);
    }
}
function gotoLink(id) {
	var link = document.getElementById("addLink_" + id + "_input").value;
	var newLink = stripLeadingURL(link);
	if(newLink != null && newLink != "")
		document.location = "http://tatoeba.org/sentences/show/" + newLink;
}
function addLink(id) {
	var linkInputElem = document.getElementById("addLink_" + id + "_input");
	var link = linkInputElem.value;
	var newLink = stripLeadingURL(link);
	var linkArrowElemId = id + "_new_sent_link";
	if(newLink != null && newLink != "") {
		var newUrl = "http://tatoeba.org/links/add/" + id + "/" + newLink;
		if (window.preferToStayInSameWindow) {
			document.location = newUrl;
		} else {
			window.open(newUrl);
		}
	}
}
var script = document.createElement("script");
script.type = "text/javascript";
// NOTE: All functions that are called by this script must be mentioned
// in the following line.
script.textContent = stripLeadingURL.toString() + gotoLink.toString() + addLink.toString();
/////////////////////////////////////////////////////////////////////////////// CUSTOMIZATION:
// The following variable (used only in this script) controls how the script 
// behaves after you have linked one sentence to another as a translation. At 
// this point, the script brings up the main sentence page so that you can
// determine whether or not the link was successful. By default, this is done 
// in a separate window (or a separate tab, depending on how your browser is 
// configured). However, if you edit the script to set the variable to true, 
// the main browser window will change to the main sentence page. You 
// can then use the Back button to go back to the previous page.
window.preferToStayInSameWindow = false;
//window.preferToStayInSameWindow = true;
/////////////////////////////////////////////////////////////////////////////

document.body.appendChild(script);

var divs = document.getElementsByTagName("div");
for(i = 0; i < divs.length; i++) {
	var idiv = divs[i];
	if(idiv.className == "sentences_set") {
		var id = idiv.id.substring(idiv.id.search("[1-9]"));
		for(j = 0; j < idiv.children.length; j++) {
			var jdiv = idiv.children[j];
			if(jdiv.className == "translations") {
				jdiv.innerHTML += '<div class="sentence indirectTranslation"><a class="show button" href="javascript:gotoLink(' + id + ');" title="To go to another sentence, copy its number (e.g., \'1000000000\') or URL (e.g., \'http://tatoeba.org/eng/sentences/show/1000000000\') into the field and click this button."><img src="http://flags.tatoeba.org/img/indirect_translation.png" width="18" height="16" /></a><a class="add link button" href="javascript:addLink(' + id + ');" id="' + id + '_new_sent_link" title="To link the main sentence to another sentence, copy the other sentence\'s number (e.g., \'1000000000\') or URL (e.g., \'http://tatoeba.org/eng/sentences/show/1000000000\') into the field and click this button."><img id="arrow_' + id + '" src="http://flags.tatoeba.org/img/link.png" width="16" height="16" /></a><input type="number" min="1" size="10" id="addLink_' + id + '_input" /></div>';
				break;
			}
		}
	}
}
