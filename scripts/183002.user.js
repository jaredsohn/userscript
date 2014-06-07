// ==UserScript==
// @name       Clean Facebook Feed
// @namespace  http://www.ademuri.com/
// @version    1.0
// @description  Remove content puddle links from facebook feed
// @match      https://www.facebook.com/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

annoying_list = ['upworthy.com', 'buzzfeed.com', 'huffingtonpost.com'];
var nuke = false;

function hideContentPuddleLinks() {
	annoying = $();
	for (var i=0; i<annoying_list.length; i++) {
		annoying = annoying.add($('li.uiStreamStory:contains("' + annoying_list[i] + '")'));
	}
	annoying.each(function(index, el) {
		if ($(el).hasClass('override')) {
		}
		else {
			var content = $($(el).find('.fbMainStreamAttachment'));
			
			if (nuke) {
				el.hide(1000);
			}
			else {
				content.hide(1000);
			}
			
			
			$(el).click(function(e) {
				content.toggle();
				$(el).addClass("override");
			});
		}
	});	
}

hideContentPuddleLinks();
window.setInterval(function() {
	hideContentPuddleLinks();
}, 2000)
