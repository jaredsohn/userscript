// ==UserScript==
// @name           fs-filter
// @namespace      http://userscripts.org/users/133663
// @include        http://www.formspring.me/*
// @description    Hide responses by undesirables
// ==/UserScript==

if (/http:\/\/www\.formspring\.me\/fs-filth/.test(window.location.href)) {
	document.title = 'Formspring filter settings';
	document.body.innerHTML = '<p>Enter a list of people to filter, separated by the "|" character.  For example, to filter Alice and Bob, enter "Alice|Bob".</p></br><form name="filthform"><textarea name="filth" id="filth"></textarea><input type="button" value="Update Filter" id="jawwy"></form>';
	var a = document.getElementById('filth');
	var b = document.getElementById('jawwy');
	var c = GM_getValue('filth', false);
	if (!c) { c = 'Enter names here...'; }
	b.addEventListener('click', function(){GM_setValue('filth', document.getElementById('filth').value);alert('Updated!');}, false);
} else {
	var i = document.getElementById('main');
	var j = document.createElement('li');
	j.innerHTML = '<a href="http://www.formspring.me/fs-filth">Filter Settings</a>';
	i.appendChild(j);

	var filth = GM_getValue('filth', false);
	if (!filth) { window.location.href = 'http://www.formspring.me/fs-filth'; }

	var jawwy = new RegExp('>('+filth+')<','gi');

	var a = document.getElementById('questions');
	var b = document.getElementById('responses');
	if (b) { a = b; } delete b;

	if (a) {
		for (var b in a.childNodes) { 
			if (a.childNodes[b].innerHTML) {
				if (a.childNodes[b].innerHTML.match(jawwy)) {
					a.removeChild(a.childNodes[b]);
}	}	}	}	}