// ==UserScript==
// @name        Insert illust uri instead of posting
// @namespace   http://lowreal.net/
// @include     http://h.hatena.ne.jp/*
// ==/UserScript==
// Load before ->
//  * Fixing illust posting
//  * Use tumblr instead of fotolife

// DO NOT USE with (unsafeWindow)  { }

unsafeWindow.Hatena.Haiku.EntryForm.postDrawing = function (uri) {
	if (!uri) return;
	var form = unsafeWindow.Hatena.Haiku.EntryForm.currentForm;
	if (!form) return;
	form.textarea.value += uri;
	form.submit.disabled = false;
	form.showTextForm();
	// form.form.submit();
};

