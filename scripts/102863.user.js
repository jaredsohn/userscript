// ==UserScript==
// @name           IGN++ Autorefresh Markup Enabler
// @namespace      vestitools.pbworks.com
// @description    Makes it so posts from IGN++'s autorefresh have markup
// @include        http://boards.ign.com/*
// @include        http://forums.ign.com/*
// @include        http://betaboards.ign.com/*
// ==/UserScript==

/*
Based on: http://wiki.greasespot.net/Content_Scope_Runner by arantius
Everything after the conditional is run once in the page's context
*/
if ('undefined' == typeof __IGNPPAME_PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.textContent = "var __IGNPPAME_PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.head.appendChild(script);
          document.head.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

function ignppame_xpath(xpath, el) {
	return document.evaluate(xpath, el, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

/*
Taken from heyf00L's markup enabler.
http://boards.ign.com/board_issues/b5008/199997118/p1
http://derekdev.com/mozilla/ignbq/greasemonkey/ignbq_markup_enabler.user.js

This code was originally in the markup enabler, but when IGN adopted it
they removed it for some reason.  All it does is listen for events from
IGN++ for when new posts or edits come in, then calls the parser on the content.
*/
function ignppame_ignppListener(e) {
	if(typeof window.parsePost == "function") {
		var wrapper =
			ignppame_xpath('following-sibling::TR//DIV[@class="boards_thread_post_wrapper"]', e.target) //classic theme
			||
			ignppame_xpath('.//DIV[@class="boards_thread_post"]', e.target); //non-classic theme

		if(wrapper) {
			//this function should be defined by the page
			window.parsePost(wrapper);
		}
	}
}


window.addEventListener('newReply',    ignppame_ignppListener, true);
window.addEventListener('replyEdited', ignppame_ignppListener, true);