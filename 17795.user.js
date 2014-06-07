// ==UserScript==
// @namespace     tag:edward.grech.name,2007:/dev/greasemonkey
// @name          Flickr disable/enable photo notes
// @description   Disables notes on a Flickr photo page, and strikes out the “This photo has notes…” message. Clicking on that message then re-enables/disables notes.
// @author        Edward Grech | edward@grech.name | alto maltés | http://flickr.com/people/dwardu
// @date          2010-08-01
// @version       2.0
// @include       http://flickr.com/photos/*/*
// @include       http://*.flickr.com/photos/*/*
// ==/UserScript==

// More info at http://flickr.com/groups/flickrhacks/discuss/72157603565687671/

//  Date        Version   Comments
//  2010-08-01  2.0       Updated to work with new Flickr photo page; Flickr removed "This photo has notes" message, so now if there are notes this scripts inserts the message and then works as it did before.
//  2007-12-30  0.1       If a page has notes but for some reason has no span[@id='noteCount'], it gets created and inserted before div[@id='DiscussPhoto']
//  2007-12-28  0.0       Original version

(function() {

	// look for element with id "notes" that has 1 or more children (notes)
	var notes_element = document.evaluate("//*[@id='notes'][*]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	if(!notes_element)
		return;

	// Create "This photo has notes" message and insert it before comments section
	note_count_span = document.createElement('span');
	note_count_span.setAttribute('id', 'noteCount');
	note_count_span.appendChild(document.createTextNode('This photo has notes. Move your mouse over the photo to see them.'));
	var discuss_photo_div = document.evaluate("//div[@id='comments']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	discuss_photo_div.parentNode.insertBefore(note_count_span, discuss_photo_div);
	
	function apply_setting(enabled) {
		notes_element.setAttribute('style', 'display: '+(enabled ? 'block' : 'none'));
		note_count_span.setAttribute('style', 'text-decoration: '+(enabled ? 'none' : 'line-through')); 
	}
	
	function current_setting() {
		return GM_getValue('notes_enabled', false);
	}
	
	function toggle_setting(e) {
		var enabled = !current_setting();
		GM_setValue('notes_enabled', enabled);
		apply_setting(enabled);
		alert(enabled ? 'Notes enabled.' : 'Notes disabled.');
	}

	note_count_span.addEventListener('click', toggle_setting, false);
	note_count_span.addEventListener('mouseover', function(e) { apply_setting(!current_setting()); }, false);
	note_count_span.addEventListener('mouseout',  function(e) { apply_setting( current_setting()); }, false);

	apply_setting(current_setting());

})();