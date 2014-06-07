// ==UserScript==
// @name		twit-mod
// @namespace		http://userscripts.org/users/287094 
// @description		Remove sections of the new twitter dashboard.
// @author		Mpluginspace
// @version		2.0
// @license		GPL; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2011-02-2
// @lastupdated		2011-02-2
// @include		https://twitter.com*
// @include		http://twitter.com*
// @exclude		https://api.twitter.com*
// @exclude		http://api.twitter.com*
// ==/UserScript==


///
// Comment out the sections you would like to leave on the page.
// * Yes, there should be two of "tweet-activity and "footer inline-list".
///
var sections = [
	        //"tweet-activity","tweet-activity",
                //"your-activity",
                "trends-inner",
                "user-rec-inner ",
                "definition",
                "footer inline-list","footer inline-list"
		];

document.addEventListener("DOMNodeInserted", removeClassParents, false);

function removeClassParents() {
	for each(var section in sections){
		var elements = this.getElementsByClassName(section);
		var element = elements[0];
		if(element != null){
			element.parentNode.parentNode.removeChild(element.parentNode);
			var index = sections.indexOf(section);
			if (index != -1){
				sections.splice(index,1);
			}
		}
		if(sections.length == 0){
			document.removeEventListener("DOMNodeInserted", removeClassParents, false);
		}
	}
}
