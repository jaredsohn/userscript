// ==UserScript==
// @name          Delete Friend Link for Kongregate
// @namespace     ventero.de
// @description   Adds a "delete friend"-link to each of your friends' profiles.
// @include       http://www.kongregate.com/accounts/*
// @author        Ventero
// @version       1.0
// @date          03/21/2010
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 06/22/10
// Licensed under MIT/X11 license
// Copyright (c) 2010 Ventero
// Full text of license here:
// http://www.opensource.org/licenses/mit-license.php

if(document.getElementById('add_as_friend')){
	var k = document.getElementById('add_as_friend').firstChild;

	if (k.innerHTML.match(/is a friend/)){
		var z = document.getElementById('relationship_links'),
				l = document.createElement('li'),
				a = document.createElement('a');
		a.setAttribute('onclick', "if (confirm('Really remove this friend?')) { var f = document.createElement('form'); f.style.display = 'none'; this.parentNode.appendChild(f); f.method = 'POST'; f.action = this.href;var m = document.createElement('input'); m.setAttribute('type', 'hidden'); m.setAttribute('name', '_method'); m.setAttribute('value', 'delete'); f.appendChild(m);f.submit(); };return false;");
		a.setAttribute('href', k.href+"/"+location.pathname.split("/")[2]);
		a.innerHTML = 'delete friend';
		l.appendChild(a)
		z.appendChild(l);
	}
}
