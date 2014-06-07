// ==UserScript==
// @name       Facebook Redirect to "Most Recent" News Feed
// @version    1.0
// @description Redirects facebooks homepage to show the "Most Recent" News Feed rather than "Top Stories"
// @include      https://www.facebook.com/
// @include      http://www.facebook.com/
// @include      https://www.facebook.com/home.php*
// @include      http://www.facebook.com/home.php*
// @grant none
// @updateURL http://userscripts.org/scripts/source/153075.user.js
// ==/UserScript==
window.location.href = "https://www.facebook.com/?sk=h_chr";