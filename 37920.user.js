// ==UserScript==
// @name           Cthulhuizer: Rewrite theistic-outrage spam.
// @namespace      tag:brainonfire.net,2007-02-12:nyarlatheism
// @description    Do you have theists flaming you in the comments on your WordPress blog? This script will give you a button on the Edit Comment screen to replace theistic language with Lovecraft references. See source code for details.
// @include        */wp-admin/post.php?action=editcomment&comment=*
// @include        */wp-admin/comment.php?action=editcomment&c=*
// @version        0.2
// @changelog      Since 0.1: Cleaned code slightly. (Reducing cyclomatic complexity.) Renamed from "nyarlatheism" to "cthulhuizer".
// @license        GPL
// ==/UserScript==

var hasCthulhuized = false;

/**
 * Cthulhuize the comment, but only once. Called by the Cthulhu! button's click event.
 * This is the meat of the script.
 */
function cthulhuizeOnce()
{
	if(hasCthulhuized)
		return;
	var tbox = document.getElementById('content');
	var content = tbox.value;
	content = content.replace('Theist', 'Cultist');
	content = content.replace('theist', 'cultist');
	content = content.replace('THEIST', 'CULTIST');
	content = content.replace(/theist/gi, 'cultist');

	content = content.replace('Theism', 'Cultism');
	content = content.replace('theism', 'cultism');
	content = content.replace('THEISM', 'CULTISM');
	content = content.replace(/theism/gi, 'cultism');

	content = content.replace('Bible', 'Necronomicon');

	content = content.replace(/biblic/gi, 'Necronomic');

	content = content.replace(/([^a-z]|^)god([^a-z]|$)/gi, "$1Azathoth$2");

	content = content.replace(/holy ghost/gi, "Crawling Horror");
	content = content.replace(/holy spirit/gi, "Crawling Horror");

	content = content.replace(/Christianity/gi, 'Lovecraftianism');
	content = content.replace(/Christian/gi, 'Lovecraftian');

	content = content.replace(/Moses/gi, 'Cthulhu');

	content = content.replace(/Virgin Mary/gi, 'Black Goat of the Woods');

	content = content.replace(/jesus christ/gi, "Nyarlathotep");
	content = content.replace(/([^a-z]|^)jesus([^a-z]|$)/gi, "$1Nyarlathotep$2");
	content = content.replace(/([^a-z]|^)christ([^a-z]|$)/gi, "$1Nyarlathotep$2");

	content = content.replace(/gospel[s]?/gi, "Cryptical Books of Hsan");

	content = "<i>[Editor's note: Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn.]</i>\n\n" + content;

	tbox.value = content;

	hasCthulhuized = true;
	
	content.focus();
}

/**
 * Find (or create) and return button bar.
 */
function ensureButtonBar()
{
	var butts = document.getElementById('ed_toolbar');
	
	if(butts)
		return butts;

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

	return butts;
}

/**
 * Called once on page load to set up button.
 */
function addCthulhuizeButton()
{
	var bar = ensureButtonBar();

	var butt = document.createElement('input');
	butt.id = 'ed_cthulhuize_gm';
	butt.className = 'ed_button';
	butt.setAttribute('type', 'button');
	butt.setAttribute('value', 'Cthulhuize!');
	butt.setAttribute('title', "Replace theistic language with Lovecraft references.");
	butt.addEventListener('click', cthulhuizeOnce, false);

	bar.appendChild(butt);
}

//Add hooks to document
addCthulhuizeButton();

