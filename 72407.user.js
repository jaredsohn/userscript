// ==UserScript==
// @name           What.CD Quick Quote
// @namespace      http://userscript.org
// @description    What.CD Quick Quote
// @include        http*://*what.cd/inbox.php?action=viewconv&id=*
// @include        http*://*what.cd/forums.php?*action=viewthread&threadid=*
// ==/UserScript==

function removeQuote() {
	var links = document.getElementsByTagName('a');
	for (var e = 0; e < links.length; e++) {
		if (links[e].innerHTML == '[Quote]') {
			links[e].parentNode.removeChild(links[e]);
		}
	}
}
function copySel() {
	var quoteID = this.getAttribute('quoteID');
	var userName = this.getAttribute('userName');
	var selText = document.getSelection().toString();

	if (selText != '' && selText != null) {
		if (document.URL.match(/viewconv/))
			var inputBox = document.forms.namedItem('messageform').elements.namedItem('quickpost');
		else
			var inputBox = document.getElementById('quickpost');

		var bad = ['index.php',
			'forums.php',
			'requests.php',
			'collages.php',
			'torrents.php',
			'top10.php',
			'rules.php',
			'wiki.php',
			'user.php',
			'inbox.php',
			'comments.php',
			'userhistory.php',
			'bookmarks.php',
			'donate.php',
			'upload.php',
			'staffpm.php'];

		for (var e = 0; e < bad.length; e++)
			selText = selText.split(bad[e]).join('http://what.cd/' + bad[e]);

		inputBox.value += '[quote=' + userName + ']' + selText + '[/quote]';

	}
	else { unsafeWindow.Quote(quoteID,userName); }

}

if (document.URL.match(/viewconv/)) {
	var posts = document.getElementsByClassName('box vertical_space');
	for (var i = 0; i < posts.length; i++) {
		var o = posts[i].getElementsByTagName('div')[1].id.split('message')[1];
		var p = posts[i].getElementsByTagName('div')[0];
		var e = document.createElement('a');
		e.innerHTML = '[Quick Quote]';
		e.href = '#quickpost';
		var user = p.getElementsByTagName('a')[0].innerHTML;
		e.setAttribute('quoteID', o);
		e.setAttribute('userName', user);
		e.addEventListener('click', copySel, true);
		p.appendChild(e);
	}
}
else {
	var posts = document.getElementsByClassName('forum_post');
	for (var i = 0; i < posts.length; i++) {
		var p = posts[i].getElementsByTagName('span')[0];
		var e = document.createElement('a');
		e.innerHTML = '[Quick Quote]';
		e.className = 'newQuote';
		e.href = '#quickpost';
		var quoteID = p.getElementsByTagName('a')[0].innerHTML.split('#')[1];
		var user = p.getElementsByTagName('a')[1].innerHTML;
		e.setAttribute('quoteID', quoteID);
		e.setAttribute('userName', user);
		e.addEventListener('click', copySel, false);
		p.appendChild(e);
	}
}
removeQuote();