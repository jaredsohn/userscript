// ==UserScript==
// @name           Emoti
// @namespace      http://userscripts.org
// @include        *facebook.com*
// ==/UserScript==

function rep(mess){
	for (var i=0; i < mess.length; i++) {
		var mes = mess[i];
		var inmes = mes.innerHTML;
		var img = document.createElement('img');
		img = "<img src=\"http://pro.local/smileys/-).png";
		img = "<img src=\"http://pro.local/smileys/-).png\" />";
		inmes = inmes.replace(':)', img);
		inmes = inmes.replace(':-)', img);
		img = "<img src=\"http://pro.local/smileys/-(.png\" />";
		inmes = inmes.replace(':(', img);
		inmes = inmes.replace(':(', img);
		img = "<img src=\"http://pro.local/smileys/-D.png\" />";
		inmes = inmes.replace(':D', img);
		inmes = inmes.replace(':-D', img);
		img = "<img src=\"http://pro.local/smileys/;).png\" />";
		inmes = inmes.replace(';)', img);
		inmes = inmes.replace(';-)', img);
		img = "<img src=\"http://pro.local/smileys/-o.png\" />";
		inmes = inmes.replace(':o', img);
		inmes = inmes.replace(':-o', img);
		img = "<img src=\"http://pro.local/smileys/8).png\" />";
		inmes = inmes.replace('8)', img);
		inmes = inmes.replace('8-)', img);
		img = "<img src=\"http://pro.local/smileys/-p.png\" />";
		inmes = inmes.replace(':p', img);
		inmes = inmes.replace(':-p', img);
		img = "<img src=\"http://pro.local/smileys/-*.png\" />";
		inmes = inmes.replace(':*', img);
		inmes = inmes.replace(':-*', img);
		img = "<img src=\"http://pro.local/smileys/^_^.png\" />";
		inmes = inmes.replace('^_^', img);
		img = "<img src=\"http://pro.local/smileys/>-o.png\" />";
		inmes = inmes.replace('>:o', img);
		img = "<img src=\"http://pro.local/smileys/-3.png\" />";
		inmes = inmes.replace(':3', img);
		img = "<img src=\"http://pro.local/smileys/>-(.png\" />";
		inmes = inmes.replace('>:(', img);
		img = "<img src=\"http://pro.local/smileys/-').png\" />";
		inmes = inmes.replace(':\')', img);
		img = "<img src=\"http://pro.local/smileys/8|.png\" />";
		inmes = inmes.replace('8|', img);
		img = "<img src=\"http://pro.local/smileys/O.o.png\" />";
		inmes = inmes.replace('O.o', img);
		mes.innerHTML = inmes;
	};
}
var type = document.getElementsByClassName('uiStreamMessage');
setTimeout("void(0)", 2000);
rep(type);
type = document.getElementsByClassName('UIStory_Message');
rep(type);
type = document.getElementsByClassName('uiStreamMessage');
setTimeout("void(0)", 2000);
rep(type);
type = document.getElementsByClassName('UIStory_Message');
rep(type);
