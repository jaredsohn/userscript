// ==UserScript==
// @name           What.cd Sticky's Are Grey!
// @namespace      What.cd Sticky's Are Grey!
// @description    Makes Stickys a different colour than normal posts
// @include        http://www.what.cd/viewforum.php?forumid=*
// @include        http://what.cd/viewforum.php?forumid=*
// ==/UserScript==

var td, links, backgroundcolour, link, StyleSheet, SS;
links = unsafeWindow.document.getElementsByTagName('td');
StyleSheet = unsafeWindow.document.getElementsByTagName('link');

var stylesheets=new Array(1)
for (i=0; i <7; i++)
stylesheets[i]=new Array(6)

stylesheets[0][0] = 'http://images.what.cd/styles/default/style.css';
stylesheets[1][0] = 'http://images.what.cd/styles/bluebit/style.css';
stylesheets[2][0] = 'http://images.what.cd/styles/darkspace/style.css';
stylesheets[3][0] = 'http://images.what.cd/styles/holiday/style.css';
stylesheets[4][0] = 'http://images.what.cd/styles/oink/style.css';
stylesheets[5][0] = 'http://images.what.cd/styles/wood/style.css';
stylesheets[6][0] = 'http://images.what.cd/styles/year/style.css';

stylesheets[0][1] = '#dbcee0';
stylesheets[1][1] = '#d7d5c5';
stylesheets[2][1] = '#1f1f1f';
stylesheets[3][1] = '#bcd8e6';
stylesheets[4][1] = '#be90c5';
stylesheets[5][1] = '#bb9c6d';
stylesheets[6][1] = '#e8e1c2';

for (var t = 0; t < StyleSheet.length; t++) {
    link = StyleSheet[t];
	for (var l = 0; l < stylesheets.length; l++) {
		if(link.href == stylesheets[l][0]){
			backgroundcolour = stylesheets[l][1];
		}
	}
}

for (var i = 0; i < links.length; i++) {
    td = links[i];
	if(td.innerHTML.substr(1, 7) == 'Sticky:'){
		td.parentNode.parentNode.parentNode.parentNode.parentNode.style.background = backgroundcolour;
		td.parentNode.style.background = backgroundcolour;
	}
}