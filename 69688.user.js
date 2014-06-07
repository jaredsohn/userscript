// ==UserScript==
// @name          TDWTF Forums Tag Cloud Balancer
// @namespace     http://uglyhorst.de/tdwtf/tagselect
// @description   Selects a number of random, but already existing tags for each new post on TDWTF forums.
// @include       http://forums.thedailywtf.com/forums/AddPost.aspx*
// ==/UserScript==

// Adjust the number of tags to get
var tag_count = 5;

// IDs of needed fields (in case they change)
var allTagsId = 'ctl00_ctl00_bcr_bcr_PostForm_ctl04_TagsSubForm_AllTags';
var tagInputId = 'ctl00_ctl00_bcr_bcr_PostForm_ctl04_TagsSubForm_ctl00_Tags'

// Get array of all tags
var tags = document.getElementById(allTagsId).value;
tags = tags.split('&');

// Choose tag_count random tags
var my_tags = new Array(tag_count);
for (i = 0; i < tag_count; i++) {
	// Get a random index from the tags array. Each tag is in that array twice in a
	// row, but the second occurrence is escaped for HTML, and we don't want that
	j = Math.round(Math.random() * tags.length / 2) * 2
	my_tags[i] = tags[j];
	// Avoid duplicates
	tags.splice(j, 2);
}

// Tags are UTF-8 and then URL encoded, with a + sign for spaces
my_tags = decodeURIComponent(my_tags.join(', ').replace(/\+/g, ' '));
document.getElementById(tagInputId).value = my_tags;