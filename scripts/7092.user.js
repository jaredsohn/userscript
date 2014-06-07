// ==UserScript==
// @name           Disemvoweler for WordPress
// @namespace      tag:brainonfire.net,2007-01-13:disemvowelwordpress
// @description    Add a "Disemvowel" button to the comment moderation screen in WordPress. This removes the vowels from the comment text (and escapes any HTML), adds "Disemvoweled troll: " to the beginning of the commenter's name, and changes the commenter's homepage link to the URL of the Wikipedia article on disemvoweling.
// @include        */wp-admin/post.php?action=editcomment&comment=*
// @include        */wp-admin/comment.php?action=editcomment&c=*
// @version        0.3.1
// @changelog      Branch from 0.3.0, adding edit-comment URL inclusion.
// @license        GPL
// ==/UserScript==

//This stays in scope because of the disemvowelOnce closure kept by the button event handler.
var hasDisemvoweled = false;

/**
 * Disemvowel the comment, but only once. Called by the disemvowel button's click event.
 * This is the meat of the script.
 */
function disemvowelOnce()
{
	if(hasDisemvoweled === false)
	{
		var nameField = document.getElementById('name');
		nameField.value = "Disemvoweled troll: " + nameField.value;
		
		document.getElementById('newcomment_author_url').value = "http://en.wikipedia.org/wiki/Disemvoweling";
		
		var tbox = document.getElementById('content');
		var content = tbox.value;
		content = content.replace(/[aeiou]/gi, '');
		content = content.replace('<', '&lt;');
		content = content.replace('>', '&gt;');
		tbox.value = content;
		
		hasDisemvoweled = true;
	}
}

/**
 * Find (or create) and return button bar.
 */
function ensureButtonBar()
{
	var butts = document.getElementById('ed_toolbar');
	if(!butts)
	{
		//create quicktags div
		var qts = document.createElement('div');
		qts.id = 'quicktags';
		
		//insert quicktags div
		var contentBox = document.getElementById('content').parentNode;
		contentBox.parentNode.insertBefore(qts, contentBox);
		
		//create ed_toolbar div
		butts = document.createElement('div');
		butts.id = 'ed_toolbar';
		
		//insert ed_toolbar div
		qts.appendChild(butts);
	}
	return butts;
}

/**
 * Called once on page load to set up button.
 */
function addDisemvowelButton()
{
	var bar = ensureButtonBar();
	
	var butt = document.createElement('input');
	butt.id = 'ed_disemvowel_gm';
	butt.className = 'ed_button';
	butt.setAttribute('type', 'button');
	butt.setAttribute('value', 'Disemvowel');
	butt.setAttribute('title', 'Irreversibly remove all vowels from the comment text.');
	butt.addEventListener('click', disemvowelOnce, false);
	
	bar.appendChild(butt);
}

//Add hooks to document
addDisemvowelButton();
