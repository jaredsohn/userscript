// ==UserScript==
// @name			NatNit's Extraneous Undesirable Thread Eraser/Remover (NEUTER)
// @description		Revision 2
// @include			*forums.kingdomofloathing.com*/vb/forumdisplay.php?f=36*
// ==/UserScript==

// ----------------- ONLY MODIFY THIS PORTION ------------------------------------------
// These must all be arrays of lowercase strings
forbiddenWords = ['content suggestion', 'speculation thread', 'make-a-kol', 'make a kol'];
authorWhitelist = ['natnit'];
authorBlacklist = [''];
// -------------------------------------------------------------------------------------

threads = document.getElementsByTagName('tr');

for (i = 0; i < threads.length; i++) {
	thread = threads[i];

	// If it's not a proper thread, skip it
	if (thread.innerHTML.indexOf('threadstatusicon') == -1) {
		continue;
	}
	
	// Find thread author
	authorString = '';
	authors = thread.getElementsByTagName('span');
	for (j = 0; j < authors.length; j++) {
		author = authors[j];
		if (author.getAttribute('onclick') && author.getAttribute('onclick').indexOf('window.open(\'member.php?u') == 0) {
			authorString = author.innerHTML.toLowerCase();
			break;
		}
	}
	
	// Find thread title
	titleString = '';
	links = thread.getElementsByTagName('a');
	for (j = 0; j < links.length; j++) {
		link = links[j];
		if (link.getAttribute('id') && link.getAttribute('id').indexOf('thread_title_') == 0) {
			titleString = link.innerHTML.toLowerCase();
			break;
		}
	}
	
	// Find thread tags
	tagString = '';
	tags = thread.getElementsByTagName('img');
	for (j = 0; j < tags.length; j++) {
		tag = tags[j];
		if (tag.getAttribute('src') && tag.getAttribute('src').indexOf('images/misc/tag.png') == 0) {
			tagString = tag.getAttribute('alt').toLowerCase();
			break;
		}
	}
	
	// Manage author whitelist/blacklist
	authorPriority = false;
	for (j = 0; j < authorWhitelist.length; j++) {
		if (authorString == authorWhitelist[j]) {
			authorPriority = true;
			break;
		}
	}
	if (authorPriority) {
		continue;
	}
	for (j = 0; j < authorBlacklist.length; j++) {
		if (authorString == authorBlacklist[j]) {
			thread.style.display='none';
			authorPriority = true;
			break;
		}
	}
	if (authorPriority) {
		continue;
	}
	
	// Hide thread if either title or tags match our list of forbidden words!
	for (j = 0; j < forbiddenWords.length; j++) {
		theWord = forbiddenWords[j];
		if (titleString.indexOf(theWord) > -1 || tagString.indexOf(theWord) > -1) {
			thread.style.display='none';
			continue;
		}
	}
	
}