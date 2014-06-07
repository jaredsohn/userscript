// ==UserScript==
// @id             ccpedit
// @name           Charahub CP Edit
// @version        1.0b
// @namespace      Product of Studio TAKUMI
// @author         J. "TAKUMI" Burton
// @description    Inserts a new edit button for each of your characters in the Charahub Character control panel and cleans up the interface.
// @include        http://charahub.com/characters
// @include        http://www.charahub.com/characters
// @include        http://keith.dev.charahub.com/characters
// @run-at         document-end
// ==/UserScript==


GM_addStyle('h1 + a, h1 + a + a {margin-top: 4px; margin-bottom: 26px !important;}');
GM_addStyle('.btn + .btn + .btn {margin-left: 3px !important;}');
GM_addStyle('select.span2 {margin-top: -10px;}');

Btns = document.getElementsByClassName('btn');
Ed = '';

for (i = 4; i < Btns.length; i++) {
	if (/Group/.test(Btns[i].innerHTML) == false) {
		for (j = 1; j < Btns[i].childNodes.length; j++) {
			if (/Move|Delete/.test(Btns[i].childNodes[j].textContent)) {
				Btns[i].title = Btns[i].childNodes[j].textContent;
			}
				
			if (Btns[i].childNodes[j]) {
				Btns[i].removeChild(Btns[i].childNodes[j]);
			}
		}
		
		if (/danger/.test(Btns[i].className)) {
			Ed = document.createElement('a');
			Ed.href = Btns[i].href.replace('characters/delete', 'character/edit');
			Ed.className = 'btn btn-info';
			Ed.title = 'Edit';
			Ed.innerHTML = '<i class="icon-edit"></a>';
			
			Btns[i].parentNode.insertBefore(Ed, Btns[i].nextSibling);
		}
	}
}

for (i = 1; i < Btns.length; i++) {
	if (/Group|New/.test(Btns[i].innerHTML) == false && Btns[i].type != 'submit') {
		if (/danger/.test(Btns[i].className)) {
			Btns[i].className = 'btn btn-info';
		}
		
		/*else {
			Btns[i].className = 'btn btn-primary pad';
		}*/
	}
	
	else if (/(Delete|Edit) Group/.test(Btns[i].innerHTML) == true) {
		Btns[i].className = 'btn btn-primary';
	}
}
