// ==UserScript==
// @name           Userscripts.org Remove Spam Scripts
// @namespace      http://userscripts.org/users/23652
// @description    Removes the userscripts that there are too many of. Keywords option inside the script source
// @include        http://userscripts.org/
// @include        http://userscripts.org/tags/*
// @include        http://userscripts.org/scripts
// @include        http://userscripts.org/scripts*?*=*
// @include        http://userscripts.org/users/*/scripts*
// @include        https://userscripts.org/
// @include        https://userscripts.org/tags/*
// @include        https://userscripts.org/scripts
// @include        https://userscripts.org/scripts*?*=*
// @include        https://userscripts.org/users/*/scripts*
// @copyright      Alfian Alfhareezhy
// @version        1.1.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @require        http://usocheckup.dune.net/34652.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==

// inArray ( syntax: somearray.inArray('cheese'); )
Array.prototype.inArray = function (value) {
		for(var i=0; i < this.length; i++) {
			if(this[i] === value) {return true;}
		}
	return false;
};

// partInArray ( syntax: somearray.inArray('cheese'); )
Array.prototype.partInArray = function (value) {
	for(var i=0; i < this.length; i++) {
		if(value.indexOf(this[i])!=-1) {return true;}
	}
	return false;
};

// Delete id/node by Alfianalfhareezhy
// Syntax: del('gbar');
function del(e) {
	var node = (typeof e=='string')?document.getElementById(e):((typeof e=='object')?e:false);
	if(node&&node.parentNode&&node.nodeType==1&&node.parentNode.nodeType==1) node.parentNode.removeChild(node)
}

function addKeyword() {
	var k = prompt('Keyword to block'),
		keywords = GM_getValue('keywords','');
	if(!k || k=='') {return;}
		else k=k.replace(/,/g, '').toLowerCase();
	if(!keywords.split(",").inArray(k)) {
		GM_setValue('keywords',((keywords!='')?keywords+','+k:k));
		if(confirm('Add another?')) addKeyword();
			else main();
	} else alert('Keyword already exists');
}

function removeKeyword() {
	var keywords=GM_getValue('keywords', ""), ob=/(^,)|(,$)|(^\w*,$)/g;
	alert('The current keywords are...\n\n'+keywords.replace(/,/g, "\n"));
	var k=prompt('Keyword to remove?');
	if(!k || k=='') return;
		else k=k.replace(/,/g, '').toLowerCase();
	if(keywords.split(",").inArray(k)) {
		keywords=keywords.replace(k,'').replace(/,,/g, ',');
		if(ob.test(keywords)) keywords=keywords.replace(ob,'');
		GM_setValue('keywords', keywords);
		if(confirm('Remove another?')) removeKeyword();
			else main();
	}
		else alert('Keyword doesn\'t exist.');
}

function resetKeywords() {
	if(confirm('Are you sure you want to reset the keywords?')) GM_setValue('keywords','');
}

GM_registerMenuCommand('Add a keyword to block', addKeyword);
GM_registerMenuCommand('Remove a blocked keyword', removeKeyword);
GM_registerMenuCommand('Reset blocked keywords', resetKeywords);

function main() {
	var keysArr = GM_getValue('keywords', '').split(',');
	if(keysArr.length==1 && keysArr[0]=="") return;
	var x = document.evaluate("//a[contains(@href,'/scripts/show/')]",document,null,6,null),
		scriptNum=/scripts\/show\/(\d+)/;
	for(var i=x.snapshotLength-1,X; (X=x.snapshotItem(i)); i--) {
		if(keysArr.partInArray(X.parentNode.innerHTML.toLowerCase())) del('scripts-'+X.href.match(scriptNum)[1]);
	}
}

window.addEventListener('load', main, false);