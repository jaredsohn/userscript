// ==UserScript==
// @name          Keenspot forums
// @description   Keenspot forums tweaks
// @include       http://forums.keenspot.com/*
// ==/UserScript==

/* This script now has configuration variables. :) */

/* Constants for hiding things. */
const BAR_BBCODE = 1;
const BAR_FONT   = 2;
const BAR_HELP   = 4;
const BAR_POST   = 8;

/* Constants for giving focus. */
const FOCUS_SUBJECT = 1;
const FOCUS_TEXT    = 2;

/* Configuration array with default values. Self-evident? */
var settings =
{
	"text_width": 600, /* pixels */
	"text_height": 450, /* pixels */
	"hide_emoticons": true,
	"hide_signatures": true,
	"hide_data": true /* location, post count etc. */
};

/**
 * Get the ith ancestor of n. The zeroth ancestor is n itself, the first
 * ancestor is the parent of n etc.
 * @param n the node for which to find the ancestor; must actually be a
 * 	node
 * @param i number of levels to go up the tree
 * @return the ancestor or <code>null</code>
 */
function ancestor(n, i)
{
	while(i-- > 0 && n != null)
		n = n.parentNode;
	return n;
}

/**
 * Hide the emoticon list. This works only on the posting page.
 */
function hide_emotes()
{
	var emotes = document.evaluate(
		"//a[contains(@href, 'javascript:emoticon')]", document,
		null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var x = ancestor(emotes.snapshotItem(0), 9);
	x.parentNode.removeChild(x);
}

/**
 * Expand the message textarea. This works only on the posting page.
 * @param w width in pixels
 * @param h height in pixels
 */
function expand_area(emotes_gone, w, h)
{
	var area = document.getElementsByTagName("textarea")[0];
	if(emotes_gone)
		ancestor(area, 7).setAttribute("colspan", "18");
	area.setAttribute("style", "width: " + w + "px; height: " + h +
		"px");
}

/**
 * Theoretically make the subject line longer. Does not actually do
 * anything. Works only on the posting page.
 */
function expand_subject()
{
	var subject = document.getElementsByName("subject")[0];
	subject.setAttribute("size", "60");
}

/**
 * Give an element focus.
 * @param where element on which to focus; <code>FOCUS_*</code>
 * 	constants are defined at the top of this file
 */
function set_focus(where)
{
	switch(where)
	{
	case FOCUS_SUBJECT:
		document.getElementsByName("subject")[0].focus();
	case FOCUS_TEXT:
		document.getElementsByName("message")[0].focus();
	}
}

/**
 * Disable the helpline. This means the helpline’s contents will not be
 * submitted. Works only on the posting page. This is what helps avoid
 * the ‘from bug’ (because the line contains ‘select’).
 */
function disable_helpline()
{
	var help = document.getElementsByName("helpbox")[0];
	help.setAttribute("disabled", "disabled");
}

/**
 * Hide a variety of mostly useless things to make more space for rather
 * useful things. Works only on the posting page.
 * @param which An integer consisting of the <code>OR</code>ed
 * 	<code>BAR_*</code> constants defined at the top of this file
 */
function hide_bars(which)
{
	var help = document.getElementsByName("helpbox")[0];
	var font = document.getElementsByName("addbbcode18")[0];
	var bbcode = document.getElementsByName("addbbcode0")[0];
	var post_bar = document.evaluate(
		"//th[contains(., 'Post a reply') or contains(.," +
			"'Send a new private message')]", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
		).singleNodeValue;
	var help_bar = ancestor(help, 3);
	var font_bar = ancestor(font, 7);
	var bbcode_bar = ancestor(bbcode, 3);
	var tbody = bbcode_bar.parentNode;
	if(which & BAR_HELP)
		tbody.removeChild(help_bar);
	if(which & BAR_FONT)
		tbody.removeChild(font_bar);
	if(which & BAR_BBCODE)
		tbody.removeChild(bbcode_bar);
	if(which & BAR_POST)
		post_bar.parentNode.removeChild(post_bar);
}

/**
 * Transform the Keenspot logo bar. Remove the big Keenspot image and
 * give the space to the links formerly to the right of it. Should not
 * work on review page.
 */
function xform_ks()
{
	var faq = document.evaluate("//a[contains(., 'FAQ')]", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
		).singleNodeValue;
	var bigrow = ancestor(faq, 7);
	var image = document.evaluate(".//img", bigrow, null,
		XPathResult.FIRST_ORDERED_NODE_TYPE, null
		).singleNodeValue;
	var smallrow = ancestor(faq, 3);
	var spans = document.evaluate(".//span", smallrow.parentNode,
		null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var middlerow = ancestor(smallrow, 3);
	var i;
	bigrow.removeChild(ancestor(image, 2));
	while(middlerow.hasChildNodes())
		middlerow.removeChild(middlerow.firstChild);
	for(i = 0; i < spans.snapshotLength; i++)
		middlerow.appendChild(spans.snapshotItem(i));
}

/**
 * Move the bandwidth-eating revenue generator that takes up preciousss
 * space to the bottom.
 */
function move_adbar()
{
	var bar = document.getElementsByTagName("table")[0];
	var ip = document.lastChild.lastChild;
	bar.parentNode.removeChild(bar);
	ip.appendChild(bar);
}

/**
 * Traverse posts and perform various operations for each. This works
 * only when viewing a topic and it does not work in review mode.
 * @param hide_location hide the data around the avatar
 * @param hide_sig hide the signature
 */
function do_posts(hide_location, hide_sig)
{
	var spans = document.evaluate("//span[@class='postbody']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var posts = new Array();
	var i, j, n;
	/* Remove quotes etc. FIXME: ugly, inefficient. */
	for(i = 0, j = 0; i < spans.snapshotLength; i++)
	{
		n = spans.snapshotItem(i).parentNode;
		while(n.nodeName.toLowerCase().indexOf("td") != 0)
			n = n.parentNode;
		if(n.getAttribute("class") != null)
			continue;
		if(j == 0 || posts[j - 1] != n)
			posts[j++] = n;
	}
	/* How arduous. At least now we have the TDs with the posts. */
	for(i = 0; i < posts.length; i++)
	{
		if(hide_sig)
			hide_signature(posts[i]);
		if(hide_location)
			rm_location_etc(posts[i]);
	}
}

/**
 * Hide the signature in a post. This only works when viewing a topic
 * not in review mode. What we are looking for is the string
 * <code>&lt;br/&gt;_________________&lt;br/&gt; divided into three
 * parts. FIXME: ugly!
 * @param post TD containing the post
 */
function hide_signature(post)
{
	var breaks = document.evaluate(".//br", post, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var i;
	var br, t, br_;
	var sig, con, bar;
	/* part 1: construct the hiding elements */
	sig = document.createElement("div");
	con = document.createElement("div");
	bar = document.createElement("div");
	con.appendChild(bar);
	con.appendChild(sig);
	con.style.marginTop = "5mm";
	sig.style.display = "none";
	bar.style.border = "solid grey 1px";
	bar.style.color = "grey";
	bar.style.fontSize = "smaller";
	bar.style.width = "100%";
	bar.innerHTML = "Click here to view signature.";
	bar.addEventListener("click",
		function()
		{
			var s = this.nextSibling;
			if(s.style.display.indexOf("none") != -1)
			{
				s.style.display = "block";
				this.innerHTML =
					"Click here to hide signature.";
			}
			else
			{
				s.style.display = "none";
				this.innerHTML =
					"Click here to view signature.";
			}
		},
		false);
	/* part 2: find the signature */
	for(i = breaks.snapshotLength - 1; i > 0; i--)
	{
		br = breaks.snapshotItem(i);
		t = br.previousSibling;
		if(t == null || t.previousSibling == null)
			continue;
		br_ = t.previousSibling;
		if(t.textContent == "_________________" &&
			br_ == breaks.snapshotItem(i - 1))
		{
			/* part 3: move the signature into the hiding
			 * element and put that at the end of the post
			 */
			var p = br_.parentNode;
			p.removeChild(t);
			while(br_.nextSibling != null)
				/* this means move, not copy */
				sig.appendChild(br_.nextSibling);
			/* parts may be outside; let’s get them */
			while(p.nextSibling != null)
				sig.appendChild(p.nextSibling);
			p.removeChild(br_);
			p.appendChild(con);
			break;
		}
	}
}

/**
 * Format the cell to the left of a post to save space. This works only
 * when viewing a topic not in review mode.
 * @param post the post
 */
function rm_location_etc(post)
{
	var row = ancestor(post, 5);
	/* Opera leaves out a whitespace text node in the tree, so we
	 * have to use a different index there.
	 */
	var n_child = (window.opera == undefined) ? 1 : 0;
	var span = row.childNodes[n_child].childNodes[2];
	var p = span.parentNode;
	var avatar = span.childNodes[2];
	var con = document.createElement("div"),
		lbl = document.createElement("div");
	con.appendChild(lbl);
	con.appendChild(span);
	span.removeChild(span.childNodes[1]);
	lbl.style.color = "grey";
	lbl.style.fontSize = "smaller";
	lbl.innerHTML = "view data";
	span.style.display = "none";
	lbl.addEventListener("click",
		function()
		{
			var s = this.parentNode.lastChild;
			if(s.style.display.indexOf("none") == -1)
			{
				s.style.display = "none";
				this.innerHTML = "view data";
			}
			else
			{
				s.style.display = "inline";
				this.innerHTML = "hide data<br/>";
			}
		},
		false);
	p.removeChild(p.lastChild);
	p.appendChild(avatar);
	p.appendChild(con);
}

/**
 * Hide the copyright notice. Everyone knows what it is and where to
 * find it and it wastes space. This works only after move_adbar.
 */
function rm_copyright()
{
	var body = document.lastChild.lastChild;
	var copy = body.childNodes[body.childNodes.length - 3];
	body.removeChild(copy);
}

/**
 * Read configuration (or supply default values). Where default values
 * are used, the defaults are saved. (So after the first time this
 * function runs, the default values are no longer used.)
 */
function init_conf()
{
	var item, value;
	for(item in settings)
		if((value = GM_getValue(item, null)) == null)
			GM_setValue(item, settings[item]);
		else
			settings[item] = value;
}

/* Initialise the configuration. */
init_conf();

/* Figure out where we are. */
l = document.location.toString();
/* Review mode (the iframe below the posting form with the last few
 * posts in reverse chronological order).
 */
on_review_page = l.indexOf("topicreview") != -1;
/* Posting page. FIXME: filter the ‘wait to be redirected’ pages. */
on_posting_page = l.indexOf("posting.php") != -1;
/* Topic view (normal or review mode). */
on_topic_page = l.indexOf("viewtopic.php") != -1;
/* Posting preview. */
preview_header = document.getElementsByTagName("th");
if(preview_header.length > 0 &&
	preview_header[0].textContent.indexOf("Preview") != -1)
	on_preview_page = true;
else
	on_preview_page = false;
/* PM compose page. */
on_pm_compose_page = l.indexOf("privmsg.php?mode=post") != -1 ||
	(l.indexOf("privmsg.php") != -1 &&
	document.evaluate("count(//table[contains(., 'Flag') or " +
		"contains(., 'Inbox :: Message')])", document, null,
		XPathResult.NUMBER_TYPE, null).numberValue == 0);

move_adbar();
rm_copyright();
if(!on_review_page)
	xform_ks();
if(!on_review_page && (on_posting_page || on_pm_compose_page))
{
	disable_helpline();
	if(settings["hide_emoticons"])
		hide_emotes();
	expand_area(!settings["hide_emotes"], settings["text_width"],
		settings["text_height"]);
	expand_subject();
	hide_bars(BAR_BBCODE | BAR_FONT | BAR_HELP | BAR_POST);
	set_focus(FOCUS_TEXT);
	/* if previewing, scroll to the preview instead of the form */
	if(on_preview_page)
		window.scroll(0, 0);
}
if(on_topic_page && !on_review_page)
{
	do_posts(settings["hide_data"], settings["hide_signatures"]);
	/* we may want to see a specific post, but all the formatting
	 * has changed the page layout, so go there explicitly now
	 */
	if(document.location.hash.length > 1)
	{
		targets = document.getElementsByName(
			document.location.hash.substr(1));
		if(targets.length > 0)
			targets[0].focus();
	}
}

