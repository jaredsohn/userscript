// ==UserScript==
// @name        YWOT Hacks
// @namespace   http://localhost
// @description These are a collection of hacks for Your World Of Text. So far the abilites are: pasting. They may be expanded in the future.
// @version     2
// @include     http://www.yourworldoftext.com/*
// @exclude     http://www.yourworldoftext.com/home
// @exclude     http://www.yourworldoftext.com/accounts/*
// ==/UserScript==

if(!unsafeWindow.Permissions.can_paste(unsafeWindow.state.userModel, unsafeWindow.state.worldModel)) {
	var canpaste = null;
    s = unsafeWindow.$(unsafeWindow.document.createElement("div"));
    s.text("Paste Hack");
    i = unsafeWindow.document.createElement("input");
    i.type = "checkbox";
    s.click(function() {
		if (canpaste) {
            unsafeWindow.$(i).prop("checked", false);
			unsafeWindow.Permissions.can_paste = canpaste;
			canpaste = null;
		} else {
            unsafeWindow.$(i).prop("checked", true);
			canpaste = unsafeWindow.Permissions.can_paste;
			unsafeWindow.Permissions.can_paste = function(user, world) {
				return true;
			}
		}
	});
    s.prepend(i);
    unsafeWindow.$("#nav").append("<li></li>");
    var newItem = unsafeWindow.$("#nav").find('li:last');
    newItem.append(s[0]);
    newItem.css('borderTop', '1px solid #ccc');
    newItem.hover(function () {
        unsafeWindow.$(this).addClass('hover');
        unsafeWindow.$('> a', this).addClass('hover');
    }, function () {
        unsafeWindow.$(this).removeClass('hover');
        unsafeWindow.$('> a', this).removeClass('hover');
    });
}