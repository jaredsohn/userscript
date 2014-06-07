// ==UserScript==
// @name           dropbox_comments_multiline
// @namespace      http://userscripts.org/users/76357
// @description    Multiline comments in shared folders of Dropbox
// @include        https://*.getdropbox.com/share*
// @include        https://getdropbox.com/share/*
// ==/UserScript==

function inicio() {
	unsafeWindow['window'].$('comment').remove();
	unsafeWindow['window'].$('add-comment').insert('<textarea class="textinput with-small-text" id="comment" rows="10" onfocus="Sharing.clear_input(this, !this.cleared);" onblur="Sharing.blur(this, \'Add a comment to the Recent Events feed\');" value="Add a comment to the Recent Events feed">Add a comment to the Recent Events feed</textarea>');
	unsafeWindow['window'].$('comment').observe('click', function(event){});
	//unsafeWindow['window'].$('add-comment-link').writeAttribute('onclick', 'javascript: return Feed.addComment();');
	saltos();
}
window.setTimeout(inicio, 250);

function saltos() {
	var blo = document.getElementsByTagName('blockquote');
	for(c=0;c<blo.length;c++) {
		t = blo[c].innerHTML;
		t = (t + '').replace(/([^>]?)\n/g, '$1'+ '<br />' +'\n');
		blo[c].innerHTML = t;
	}
}