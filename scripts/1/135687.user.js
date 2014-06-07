// ==UserScript==
// @name        Block TimGT on KickStarter
// @namespace   http://userscripts.org/users/471507
// @include     http://www.kickstarter.com/projects/texmurphy/tex-murphy-project-fedora/comments
// @version     1
// ==/UserScript==
var authors = document.getElementsByClassName('author');
var userProfileToFilter = "/profile/524890642";

for (i=authors.length-1; i>=0; i--) {
  var author = authors[i];
  if (author.href.match(userProfileToFilter+"$")==userProfileToFilter) {
	var toRemove=author.parentElement.parentElement;
	toRemove.parentElement.removeChild(toRemove);
  }
}
  