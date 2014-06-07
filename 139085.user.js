// ==UserScript==
// @name		kg_samechars
// @author		un4given (u.menya.vse@zzzae.biz)
// @version		1.1
// @description	extends __same_chars[] for comfort typing different quote signs. also allow to type < and > (should be replaced in vocabulary with \u2039 and \u203a respectively)
// @include		http://klavogonki.ru/g/*
// @include		http://www.klavogonki.ru/g/*
// ==/UserScript==

//----

function samechars_extend()
{
	//prevent execution in iframes (FF especially likes this)
	if (parent.location.href != self.location.href) return;

	//extend __same_chars array
	__same_chars.push("<");
	__same_chars.push("\u2039");
	__same_chars.push(">");
	__same_chars.push("\u203A");
	//different quote signs
	__same_chars.push("\u201c");
	__same_chars.push("\"");
	__same_chars.push("\u201d");
	__same_chars.push("\"");
	__same_chars.push("\u201e");
	__same_chars.push("\"");
	__same_chars.push("\u201f");
	__same_chars.push("\"");
	__same_chars.push("\u2033");
	__same_chars.push("\"");
	__same_chars.push("\u2018");
	__same_chars.push("'");
	__same_chars.push("\u2019");
	__same_chars.push("'");
	__same_chars.push("\u201a");
	__same_chars.push("'");
	__same_chars.push("\u201b");
	__same_chars.push("'");
	__same_chars.push("\u2032");
	__same_chars.push("'");
}

//inject script
var s = document.createElement('script');
s.innerHTML = '(' + samechars_extend + ')();';
document.body.appendChild(s);