// ==UserScript==
// @name       Facebook Bullshit Remover
// @version    1.0
// @description  Masks <li> elements containing some bullshit
// @include      /^https?://www.facebook.com/?(\?.+)?$/
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @copyright  Dylan L, http://twitter.com/barkimmadog
// ==/UserScript==

//example <li> stream
//<li class="uiUnifiedStory uiStreamStory genericStreamStory aid_656096765"
//	data-ft="{&quot;qid&quot;:&quot;5841280275679356703&quot;,&quot;mf_story_key&quot;:&quot;-1711735661414525582&quot;,&quot;has_expanded_ufi&quot;:&quot;1&quot;}"
//	id="stream_story_511065773093a3b65080090" aria-haspopup="true">
//</li>

//create array of regex patterns to match posts we want to
var patterns = [];
patterns.push(/click *(.)?(like|share)(.)? *if/i);


$(document).ready(function() {
	//for each regex, return <li>'s containing matches and hide (or delete, could be better)
	//we're not using a for(var key in x) loop because this isn't an object :/
	for(var ii=0; ii<patterns.length; ii++) {
	    $('li.uiStreamStory').filter(function () {
	      return $(this).text().match(patterns[ii]);
	    }).html("");
	}
});