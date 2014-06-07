// ==UserScript==
// @author 		Anudeep2011
// @name        Codeforces Indians Highlighter
// @namespace   
// @include     *codeforces.com*
// @version     beta
// @grant       none
// ==/UserScript==

var users = document.getElementsByClassName('contestant-cell');
for(var i=0; i<users.length; i++) {
	if(users[i].getElementsByTagName('a')[0].toString().search('/India')!=-1) {
		users[i].style.backgroundColor='#BAE4E5';
	}
}