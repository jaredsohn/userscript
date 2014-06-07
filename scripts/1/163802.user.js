// ==UserScript==
// @name        Ctrl+Enter Submits Any Form to New Tab/Window
// @namespace   http://userscripts.org/users/SystemDisc
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant       none
// @include     *
// @version     0.05
// @downloadURL	https://userscripts.org/scripts/source/163802.user.js
// @updateURL	https://userscripts.org/scripts/source/163802.meta.js
// ==/UserScript==

$ = jQuery.noConflict(true); //stop jQuery from breaking some pages that use $ as a var already

$(window).bind('keypress', function(e)
{
		if (e.ctrlKey && e.keyCode == 13 && $(e.target).closest("form").length > 0)
		{
			console.log(e.keyCode);
			target = $(e.target).closest("form").attr('target');
			console.log(target);
			$(e.target).closest("form").attr('target', '_blank');
			$(e.target).closest("form").submit();
			setTimeout(
				function(a=$(e.target).closest("form"),b=target)
				{
					if(b)
						a.attr('target', b);
					else
						a.removeAttr('target');
				},100);
		}
});
