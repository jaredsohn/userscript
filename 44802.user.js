// ==UserScript==
// @name           Flamebate Hotkey Helper
// @include        http://forumwarz.com/discussions/*
// @include        http://*.forumwarz.com/discussions/*
// @include        http://forumwarz.com/inbox/mail
// @include        http://*.forumwarz.com/inbox/mail
// @include        http://forumwarz.com/idc
// @include        http://*.forumwarz.com/idc
// @include        http://forumwarz.com/incit
// @include        http://*.forumwarz.com/incit
// ==/UserScript==

$ = unsafeWindow["window"].$;
$$ = unsafeWindow["window"].$$;
Discussions = unsafeWindow["window"].Discussions;
Element = unsafeWindow["window"].Element;

function insertText(el, ins) {
	// (Help from http://www.codingforums.com/showthread.php?t=57217)
	if (el.setSelectionRange){
		el.value = el.value.substring(0,el.selectionStart) + ins + el.value.substring(el.selectionStart,el.selectionEnd) + el.value.substring(el.selectionEnd,el.value.length);
	} else if (document.selection && document.selection.createRange) {
		el.focus();
		var range = document.selection.createRange();
		range.text = ins + range.text;
	}
}

$$("textarea").each(function(el) {
	el.onkeyup = function(e) {
		if (e.which == 113) insertText(el, ":ronpaul:");
	}
});

$$("input[type='text']").each(function(el) {
	el.onkeyup = function(e) {
		if (e.which == 113) insertText(el, ":ronpaul:");
	}
});

$$("#post_form div.note").each(function(a) {
	var e = Element("a", {"href": "#"});
	e.onclick = function() {
		Discussions.insert_text(":ronpaul:");
		return false;
	}
	e.insert(Element("img", {"src": "http://uploads.forumwarz.com/cdn/65/15c5869a-1401-11de-bd52-001c23d677ba.gif"}));
	a.insert({"after": e});
});
