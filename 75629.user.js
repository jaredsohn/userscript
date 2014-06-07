// ==UserScript==
// @name	PHPbb Plus!
// @description  Find posts relevant to you! Search the page for posts relevant to your username/nick and do page searches.
// @include	  *topic*.html*
// @include *post*.html*
// @require   http://usocheckup.redirectme.net/75629.js?maxage=5
// @version       1.0.4
// ==/UserScript==
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if(is_chrome == true) {
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}}
(function() {
	function searchPosts() {
		var usernames = GM_getValue('usernames');
		if (usernames !== undefined) {
			var queryRegExp = new RegExp("("+usernames.replace(/,\s*/g, '|')+")", "gi");
			console.info(queryRegExp);
			var divs = document.getElementsByTagName('div');
			var count = 0;
			for (var i=0;i<divs.length;i++) {
				if (divs[i].className == 'postbody') {
					if (divs[i].textContent.search(queryRegExp) != -1) {
						highlightSubject(divs[i], 'yellow');
						count++;
					}
				}
			}
		}
	}
	function customSearch() {
		var query = prompt('PHPbb Plus!\n\nSearch:','');
		var queryRegExp = new RegExp(query, 'im');
		var divs = document.getElementsByTagName('div');
		var count = 0;
		for (var i=0;i<divs.length;i++) {
			if (divs[i].className == 'postbody') {
				if (divs[i].textContent.search(queryRegExp) > 0) {
					highlightSubject(divs[i], 'orange');
					count++;
				}
			}
		}
		if (count == 0)
			alert('PHPbb Plus!\n\nNothing found :(');
		else
			alert('PHPbb Plus!\n\nFound '+count+' posts :)\nResults highlighted!');
	}
	function highlightSubject(post, color) {
		var subject = post.previousSibling;
		while (subject.className == undefined || subject.className != 'postsubject') {
			subject = subject.previousSibling;
		}
		subject.style.backgroundColor = color;
	}
	function editUserNames() {
		var usernames = GM_getValue('usernames');
		usernames = usernames?usernames:'';
		var query = prompt('PHPbb Plus!\n\nEnter your username:\n\nSeparate multiple usernames/nicknames with commas\nExample: Username One,UsernameTwo,UsErNaMe tHreE',usernames);
		if (query !== false) {
			GM_setValue('usernames', query);
		}
		searchPosts();
	}
	document.addEventListener("keydown", function(e) {
	if(!e.ctrlKey) return;
	switch(e.keyCode) {
		case 90: customSearch(); return;
		case 81: editUserNames(); return;
	} }, false);
	GM_registerMenuCommand('PHPbb: Enter Your Username', editUserNames);
	GM_registerMenuCommand('PHPbb: Search Page', customSearch);
	
	
	searchPosts();
}
)();