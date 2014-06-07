// ==UserScript==

// @name		Site blocker

// @description		Blocks time wasting sites you define

// @include		Add your sites here




// ==/UserScript==

(function() {

//Removes body content (basically everything)

	if(document.getElementById("body")) {
		document.getElementById("body").innerHTML = '';
alert('Site Blocked');  
	}
else
{
window.location = "about:blank";
alert('Site Blocked'); 
}
})();