// ==UserScript==
// @name          Babelfisher
// @namespace     http://userscripts.org/users/14536
// @description   Adds buttons to babelfish to allow for easier translation between two user-selected languages.
// @include       http://world.altavista.com/
// @include       http://world.altavista.com/tr
// @include       http://babelfish.altavista.com/
// @include       http://babelfish.altavista.com/tr
// @include       http://babelfish.yahoo.com/
// @include       http://babelfish.yahoo.com/translate_txt
// @author        Vaughan Chandler
// ==/UserScript==

// Last updated on 2008-01-23

/*
 The following variables define the languages to be used for the buttons, codes are:
 en = English
 es = Spanish
 el = Greek
 de = German
 fr = French
 it = Italian
 ja = Japanese
 ko = Korean
 nl = Dutch
 pt = Portuguese
 ru = Russian
 zh = Chinese (Simp)
 zt = Chinese (Trad)
 
 NOTE: Be sure to make sure the language combination you want to use is in the list on the website.
*/
language1 = 'en';
language2 = 'es';

(function(){

	l1u = language1.toUpperCase();
	l1l = language1.toLowerCase();
	l2u = language2.toUpperCase();
	l2l = language2.toLowerCase();

	var buttons = document.createElement('span');
	buttons.innerHTML = ' <input type="button" value="' + l1u + '&rarr;' + l2u + '" onclick="document.frmTrText.lp.value=\'' + l1l + '_' + l2l + '\'; document.frmTrText.submit();" accesskey="1"/>' + 
			    ' <input type="button" value="' + l2u + '&rarr;' + l1u + '" onclick="document.frmTrText.lp.value=\'' + l2l + '_' + l1l + '\'; document.frmTrText.submit();" accesskey="2"/> ';

	if (location.href.toLowerCase().indexOf('yahoo')!=-1) {
		buttons.innerHTML = "<br /><br />" + buttons.innerHTML;
	}

	var elms = document.getElementsByTagName('input');
	var o='';
	for (var i=0; i<elms.length; i++) {
		if (elms[i].name=='btnTrTxt') { elms[i].parentNode.insertBefore(buttons, elms[i].nextSibling); break; }
	}

})();


