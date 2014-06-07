// ==UserScript==
// @name           Flamebate Youtube Helper
// @namespace      quangntenemy
// @include        http://forumwarz.com/discussions/*
// @include        http://*.forumwarz.com/discussions/*
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

function insertYoutube(el) {
	var url = prompt("Input Youtube URL");
	if (!url) return;
	var text = "[youtube]" + url + "[/youtube]";
	if (el) insertText(el, text);
	else Discussions.insert_text(text);
}

$$("textarea").each(function(el) {
	el.onkeyup = function(e) {
		if (e.which == 113) insertYoutube(el);
	}
});

$$("input[type='text']").each(function(el) {
	el.onkeyup = function(e) {
		if (e.which == 113) insertYoutube(el);
	}
});

$$("#post_form div.note").each(function(a) {
	var e = Element("a", {"href": "#"});
	e.onclick = function() {
		insertYoutube();
		return false;
	}
	e.insert(Element("img", {"src": "data:image/gif;base64,R0lGODlhIAAgAOe9AAABAAACAAEEAAIFAQQHAgUIBAcJBQgLBwoMCAsNChASDxMUEhUWFBYYFRcYFhgZFxkbGBscGhwdGx8gHiAhHyEjICMkIiUnJCYoJSgpJykrKCosKSstKiwtKzIzMTM0MjY4NTk6ODs9Oj5APfciJ/ckL/ApK/kmL/EqLFRVU/ooMPErMvMsLfIsM/sqMfQuLvQuNOwxMfUvL/UvNXRUVfcxMPYxNvgyMfczN/k0OPE3NfE3O3hYWfI4O/Q6NvM6PHFeW/U7N+09QPU7Pe8+O+w+RvY8Pu0/Ru9AQvc+P/c+RelDQPBBSPg/RupERvJCRPFDSflBR/NERPNESuxHSPRFRe5ISfZGRu9JSvFMUfNNTfJNUuxPUO1QUe5RUvBSU+9TWOhVXOxYWfRXXPZYWO9aW/dZWfZZXvRfX+9hXu5hY/VgYO9iZPZhYfBkZZ17fPJlZo6CgvVoaYuGhfZpavdqcflrbPVwcvFzcvV2dfR2e56SkvV+f/CChfKDhvSEgfOEh/WGifGJia+cnvOLi/WMjPaNjfaOlPKSlfWTkPWUl/OYmfiXmvednfKgpPWipvClpfakp/Wpqvaqq/isrfSurfmtrsm8vPW4uva5u/e6vPK9vPi8vfq9vvW/vvbAv/fBwPjCwfrEw/zFxfvHzPnJx/fKzfjLzvbQ0frU1f3X1/rb2vzd3PTf4vjk5vrl5/vm6Pzn6vnp4/jr7Pzu7/bw7/3w8Pjz8fr18/z29f339v749/37/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAP8ALAAAAAAgACAAAAj+AP8JHEiwoMGDCAVKYDBwAYiEEA0+CCCQQoCIGAkGyPBPgYGMIA0w+EdgwsAMGQaG+CBwA8gIBlIEGEigpgGBEAwIDCACZAACBgRSICAwAId/EAwIDDACJIEADARKQCAwQIV/EAwIDDACpIMAHARGQCCQQIV/EAwIDDACJIYAAyMgEEigwj8IBgQGGAESQ4CBERAIJFDhHwQDAgOMAIkhwMAICAQGqPAPggGBAUaAvBBgoIUA/zwE6PAPgoF/DQKMAHkhAEEDBAIgEFghAAINAUSA3BOH4BsaPAgCGXRpTsYqOJRE+YGjRg0c0F/MSFLFTBs5dNBsgajDxYsaLl7+vHBO/kUNHErG4CHkCJMkMQlR3GFEn9EZ5zhq/FDU5kUNHFWcgYcgkfSR0AuQzMLLLrPwQV4NSNhyyAvQzYBDFWvkoQdCXbwQxA+viJIEdC9AhwQthrwwg3MvQKcFGWEcREUNM6zwSigt8KEKFJRksgQtpqxiyg5alCJLJ0/g4MVBWLxQQwuvhNJCILRQ0QkqRdTiySS7eBHJK37cgogLXRwEBQ41tPBKKC0EQgsVnaBSBC2EuKFLGpmIEkMrlbzQxUFQ4FBDC6+E0kIgtFDRCSpF0GIIHLq4kQkurORCSQtdHIQFdCu8EkoLgdBCRSeoFEGLIXDo4kYmqdRhBxmlL3RxEBUu1NDCK6G0IAgtVHSCihO0FOKGLmpsIooJmCTyQhcHefHCDS28EkoLf+SyyCyoHFFLJ5PsAkYkrwCCSyMvJFRCDS2UQkkLZbwCyieZCJHKJ6ycskMWpLwiyhMoJPQCDjVA59wPL8yAQw04vIDDDDO8MMMPL9TwQkJEiPdCDeLVAN3G0JFXg3gkQBFRFSQrkUQQHG/8QxJKRBEFFCDFnFBAADs="}));
	a.insert({"after": e});
	e.insert({"after": Element("br", {"style": "margin-bottom: 1em"})});
});
