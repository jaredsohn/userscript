// ==UserScript==
// @name           PMOG Message Urchin
// @namespace      http://userscripts.org/scripts/show/29358
// @include        http://pmog.com/users/*/messages*
// ==/UserScript==
// disable send button unless a recipient is listed: pmog_mu_sp_
// define elements
var pmog_mu_sp_textarea = document.getElementById('message_body');
var pmog_mu_sp_submit = pmog_mu_sp_textarea.nextSibling.nextSibling;
// define function
function pmog_mu_sp_check_for_recipient () {
	if (/^@\w/.test(pmog_mu_sp_textarea.value)) {
		pmog_mu_sp_submit.disabled = false;
	}
	else {
		pmog_mu_sp_submit.disabled = true;
	}
}
//define events
pmog_mu_sp_textarea.addEventListener("keyup", pmog_mu_sp_check_for_recipient, true);
// submit button should start off disabled
pmog_mu_sp_submit.disabled = true;
// put a copy of the pagination div at the top of the page: pmog_mu_pa_
// find the pageination div
var pmog_mu_pa_divs = document.getElementsByTagName('div');
for (var pmog_mu_pa_div in pmog_mu_pa_divs) {
	if (pmog_mu_pa_divs[pmog_mu_pa_div].className == 'pagination') {
		var pmog_mu_pa_pagediv = pmog_mu_pa_divs[pmog_mu_pa_div];
	}
}
// only need to dupe if there is more than one page
if (pmog_mu_pa_pagediv) {
	var pmog_mu_pa_clone = pmog_mu_pa_pagediv.cloneNode(true);
	var pmog_mu_pa_posts = document.getElementsByTagName('ul')[0];
	var pmog_mu_pa_container = pmog_mu_pa_posts.parentNode;
	pmog_mu_pa_container.insertBefore(pmog_mu_pa_clone, pmog_mu_pa_posts);
}
// add a link that will allow players to delete all messages from PMOG on a given page: pmog_mu_md_
// add together onclicks
function pmog_mu_md_appendClicks (pmog_mu_md_part) {
	return ' ' + pmog_mu_md_part.replace(/^if \(confirm\('Really delete\? This cannot be undone\.'\)\) \{ (.*) \}; return false;$/g, '$1');
}
// slap beginning and ending bits to onclick
function pmog_mu_md_bookendClicks (pmog_mu_md_whole) {
	return "if (confirm('Delete all system messages on this page? This cannot be undone.')) { " + pmog_mu_md_whole + " }; return false;";
}
// run through all of the messages, feed the onclicks from system messages to appendClicks and then return bookendClicks
function pmog_mu_md_createClick () {
	pmog_mu_md_click = ''; // where all the appending will go
	pmog_mu_md_messages = document.getElementsByTagName('ul')[0].getElementsByTagName('li');
	for (pmog_mu_md_message in pmog_mu_md_messages) {
		pmog_mu_md_this_message = pmog_mu_md_messages[pmog_mu_md_message];
		// only care about PMOG messages
		pmog_mu_md_sender = pmog_mu_md_this_message.getElementsByTagName('a')[1].href;
		if (pmog_mu_md_sender.match("/users/pmog")) {
			pmog_mu_md_anchors = pmog_mu_md_this_message.getElementsByTagName('a');
			for (pmog_mu_md_anchor in pmog_mu_md_anchors) {
				pmog_mu_md_this_anchor = pmog_mu_md_anchors[pmog_mu_md_anchor];
				if (pmog_mu_md_this_anchor.innerHTML.match('Delete')) {
					pmog_mu_md_click += pmog_mu_md_appendClicks(pmog_mu_md_this_anchor.getAttribute('onclick'));
				}
			}
		}
		pmog_mu_md_anchors = pmog_mu_md_this_message.getElementsByTagName('a');
		
	}
	return pmog_mu_md_bookendClicks(pmog_mu_md_click);
}
// add a link to delete system messages
var pmog_mu_md_words = document.createTextNode(' | Clear System Messages on ');
var pmog_mu_md_linky = document.createElement('a');
pmog_mu_md_linky.innerHTML = 'This Page';
pmog_mu_md_linky.href = '#';
pmog_mu_md_linky.setAttribute('onclick', pmog_mu_md_createClick());
var pmog_mu_md_header = document.getElementsByTagName('h3')[1];
pmog_mu_md_header.appendChild(pmog_mu_md_words);
pmog_mu_md_header.appendChild(pmog_mu_md_linky);