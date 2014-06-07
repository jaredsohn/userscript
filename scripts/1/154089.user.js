// ==UserScript==
// @name          Toggle YouTube comment visibility
// @description   Allows YouTube comments to be shown or hidden (default: hidden)
// @grant         none
// @match         http://*.youtube.com/watch?*
// @match         http://youtube.com/watch?*
// @match         https://*.youtube.com/watch?*
// @match         https://youtube.com/watch?*
// ==/UserScript==

/* This script is basically a modified version of the following scripts:
 *
 * http://userscripts.org/scripts/show/79097
 * http://userscripts.org/scripts/show/14530
 *
 * ...which was made to work with YouTube's new site design rolled out
 * during late 2012 (roughly November/December).
 *
 * This script also differs substantially from this:
 *
 * http://userscripts.org/scripts/show/111093
 *
 * ...which (IMO) tries to do too much and makes quite a mess of the
 * general YouTube page layout.  The scripts' author also does not appear
 * to truly understand pattern matching/wildcards, as is evident when
 * reviewing his @include metablocks (many are superfluous).
 */

/*
 * Test URLs for different "kinds" of Youtube videos:
 *
 * 1) With comments:       http://www.youtube.com/watch?v=YnnDMvdVDz4
 * 2) Disabled comments:   http://www.youtube.com/watch?v=yzuCraI3gE0
 * 3) Zero (0) comments:   http://www.youtube.com/watch?v=-dUxZAvSF2M
 * 4) Uploaders' comments: http://www.youtube.com/watch?v=C4jPce3EJsM
 */

/*
 * For those not familiar with XPath, these pages should help make sense of
 * the syntaxes used:
 *
 * http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Master_XPath_Expressions
 * https://developer.mozilla.org/en-US/docs/Introduction_to_using_XPath_in_JavaScript
 * https://developer.mozilla.org/en-US/docs/DOM/document.evaluate
 */

var xpr              = null;
var watch_discussion = null;

xpr = document.evaluate(
      ".//div[@id='watch7-main']/div[@id='watch7-content']/div[@id='watch-discussion']",
      document.body,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
);
watch_discussion = xpr.snapshotItem(0);

/*
 * If <div id="watch-discussion"> is missing, Youtube has probably
 * redesigned their site, in which case this script needs to be updated.
 * Fall back on behaviour (modify absolutely nothing on the page).
 */
if (!watch_discussion) {
    return;
}

/*
 * Debugging (if needed)
 *
 * Recommended Firebug be installed, with the following about:config
 * variable set to true: extensions.firebug.showChromeErrors
 */
/*
console.log("watch_discussion:");
console.dir(watch_discussion);
*/

/*
 * Now append our own <div> + Show/Hide Comments button after
 * <div id="watch-discussion">.  The reason for all the CSS: we have to
 * mimic #watch-discussion to ensure borders don't get erased/lost, etc..
 * We do minimise the top/bottom padding a bit.  It's too bad they didn't
 * put the CSS in a class and use the id for reference.  :-(
 * And to get the "wide" button, we use width:100% on the <button> itself.
 */
var comment_toggle     = document.createElement("div");
var comment_toggle_css = 'border-color: #e6e6e6; border-image: none; border-right: 1px solid #e6e6e6; border-style: solid; border-width: 0 1px 1px; color: #333333; padding: 12px 20px; text-align: center;';
var show_text          = "Show Comments";
var hide_text          = "Hide Comments";
var visible            = true;

comment_toggle.innerHTML = '<div id="comment-toggle" style="' + comment_toggle_css + '"><button class="metadata-inline yt-uix-button yt-uix-button-text" role="button" type="button" style="width:100%;"><span id="comment-toggle-text" class="yt-uix-button-content"></span></button></div>';

watch_discussion.parentNode.insertBefore(comment_toggle.firstChild, watch_discussion);

document.getElementById("comment-toggle").addEventListener("click", comment_toggle_js, true);

function comment_toggle_js(event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  if (visible) {
    watch_discussion.style.display = "none";
    document.getElementById("comment-toggle-text").innerHTML = show_text;
    visible = !visible;
  } else {
    watch_discussion.style.display = "block";
    document.getElementById("comment-toggle-text").innerHTML = hide_text;
    visible = !visible;
  }
  return false;
}

comment_toggle_js(false);
