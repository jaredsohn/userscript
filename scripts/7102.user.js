// ==UserScript==
// @name           Loch Ness Jesus
// @namespace      tag:brainonfire.net,2007-01-14:lochnessjesus
// @description    "And on the third day, he rose again from the waters." Replace theistic language with Loch Ness Monster references.
// @include        */wp-admin/post.php?action=editcomment&comment=*
// @include        */wp-admin/comment.php?action=editcomment&c=*
// @version        0.2
// @license        GPL
// ==/UserScript==

//This stays in scope because of the lochnessOnce closure kept by the button event handler.
var hasNessied = false;

/**
 * Nessie the comment, but only once. Called by the nessie button's click event.
 * This is the meat of the script.
 */
function nessieOnce()
{
	if(hasNessied === false)
	{
		var tbox = document.getElementById('content');
		var content = tbox.value;
		content = content.replace('Theist', 'Lochnessmonsterist');
		content = content.replace('theist', 'lochnessmonsterist');
		content = content.replace('THEIST', 'LOCHNESSMONSTERIST');
		content = content.replace(/theist/gi, 'LochNessMonsterist');

		content = content.replace('Theism', 'Lochnessmonsterism');
		content = content.replace('theism', 'lochnessmonsterism');
		content = content.replace('THEISM', 'LOCHNESSMONSTERISM');
		content = content.replace(/theism/gi, 'LochNessMonsterism');

		content = content.replace(/([^a-z]|^)god([^a-z]|$)/gmi, "$1Loch Ness Monster$2");

		content = content.replace(/jesus christ/gi, "Indiana Jones (His Ruggedness)");

		content = content.replace(/([^a-z]|^)jesus([^a-z]|$)/gmi, "$1Indiana Jones$2");

		content = content.replace(/([^a-z]|^)christ([^a-z]|$)/gmi, "$1Indiana Jones$2");

		content = "<i>[Editor's note: /s/God/Loch Ness Monster/, /s/Jesus/Indiana Jones/]</i>\n\n" + content;

		tbox.value = content;

		hasNessied = true;
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
function addNessieButton()
{
	var bar = ensureButtonBar();

	var butt = document.createElement('input');
	butt.id = 'ed_nessie_gm';
	butt.className = 'ed_button';
	butt.setAttribute('type', 'button');
	butt.setAttribute('value', 'Nessie');
	butt.setAttribute('title', "Replace 'theism' and 'God' language with Loch Ness Monster references.");
	butt.addEventListener('click', nessieOnce, false);

	bar.appendChild(butt);
}

//Add hooks to document
addNessieButton();

