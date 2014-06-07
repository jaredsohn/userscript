// ==UserScript==
// @name        FA Savior
// @namespace   http://neckbeardeddragon.tumblr.com
// @description A script that hides submissions on FA from the specified user(s).
// @include     http://www.furaffinity.net/msg/submissions/
// @grant	none
// @version     1
// ==/UserScript==

var users = new Array();
//	Format new entries as such:
//		users[#] = "username";
//	with "#" being the number of the entry in the list (starting with 0) and "username" being the entry.
//
//	It searches through the submission name and the author name,
//	so blocking a username also blocks anything that that user's name appears in.
//	You could also use this to block a specific series by name, e.g. RedRusker's non-con comics.
//
//	an example blocked list:
//		users[0] = "thisguy";
//		users[1] = "thisguytoo";
//		users[2] = "A Really Long Comic Series That I'm Tired Of Seeing";

//Start block list



//End block list

var subs = document.getElementsByClassName("t-image");

for (i=0; i<subs.length; i++) {
	var ihtml = subs[i].innerHTML;
	for (j=0; j<users.length; j++) {
		if(ihtml.indexOf(users[j])!=-1){
			subs[i].style.visibility = 'hidden';
		}
	}
}