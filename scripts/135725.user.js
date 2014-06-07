// ==UserScript==
// @name        Block Trolls on KickStarter
// @namespace   http://userscripts.org/users/471507
// @include     http://www.kickstarter.com/projects/*/comments
// @version     1
// ==/UserScript==

// By intelligen

var authors = document.getElementsByClassName('author');
var usersToBlock = {};
// Add copy and paste the line below, replacing the profile URL and username
// for each user you want to block. (Note: username is just a label for your
// own convenience, so it doesn't have to be exact.)
usersToBlock['http://www.kickstarter.com/profile/524890642']='TimGT';

for (i=authors.length-1; i>=0; i--) {
  var author=authors[i];
  if (usersToBlock.hasOwnProperty(author.href)) {
	var toRemove=author.parentElement.parentElement;
	toRemove.parentElement.removeChild(toRemove);
  }
}
