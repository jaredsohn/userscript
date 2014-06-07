// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.UsoSourceInfo
// @name           Userscripts.org Source Info
// @version        2013.8.26
// @author         kuehlschrank
// @description    Adds key facts about a script to the source tab.
// @homepage       http://userscripts.org/scripts/show/163063
// @updateURL      https://userscripts.org/scripts/source/163063.meta.js
// @downloadURL    https://userscripts.org/scripts/source/163063.user.js
// @include        http*://userscripts.org/scripts/review/*
// @include        http*://userscripts.org/scripts/diff/*
// ==/UserScript==

(function() {

	if(location.pathname.indexOf('/scripts/review/') == 0) {

		var src = document.getElementById('source').textContent;

		var txt = ' The script is <b>' + Math.round(src.length/1024*10)/10 + ' KB</b> in size' + (src.match(/@require\s+|jquery\./) ? ' and loads <b>external libraries</b>.' : '.');
		if(src.match(/\bGM_/)) txt += ' It uses the <b>GM API</b>.';
		if(src.match(/DOMAttrModified|DOMNodeInserted|DOMSubtreeModified|MutationObserver/)) txt += ' It reacts to <b>page changes</b>.';
		if(src.indexOf('cookie') > -1) txt += ' It might read your <b>cookies</b>.';

		var p = document.querySelector('p.notice');
		if(!p) {
			p = document.createElement('p');
			p.className = 'notice';
			var c = document.getElementById('content');
			c.insertBefore(p, c.firstChild);
		}
		p.innerHTML = (p.innerHTML.indexOf('the source is over') == 0) ? txt : p.innerHTML + txt;

	} else {

		var edits = document.querySelectorAll('code > .add, code > .del'), sum = 0;
		for(var i = edits.length, edit; i-- && (edit = edits[i]);) {
			sum += (edit.classList.contains('add') ? 1 : -1) * edit.textContent.length;
		}
		document.querySelector('#content > h4').textContent += (sum < 0 ? 'removed ' : 'added ') + Math.abs(sum) + ' bytes';

	}

})();
