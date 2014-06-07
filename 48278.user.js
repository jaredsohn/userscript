// ==UserScript==
// @name           Cocks Everywhere!
// @namespace     
// @description   By MercWithMouth. Press F4 to bring up a "cock" emoticon in the Flamebate boards on FWZ.
// @include        http://forumwarz.com/discussions/*
// @include        http://*.forumwarz.com/discussions/*
// ==/UserScript==


// press F4 to bring up a "cock" emoticon in the Flamebate boards on FWZ.  More information available at http://userscripts.org/users/83206 along with other script downloads

$ = unsafeWindow["window"].$;
Discussions = unsafeWindow["window"].Discussions;

$("discussion_post_body").onkeyup = function(e) {
  if (e.which == 115) Discussions.insert_text(":cock:");
}
