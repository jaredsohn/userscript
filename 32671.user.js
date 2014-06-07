// ==UserScript==
// @name           Syrnia - Forum Ignore
// @namespace      http://userscripts.org/users/63546
// @description    Allows you to ignore posts by certain players in the Syrnia forums.
// @include        http://www.syrnia.com/theGame/mainincludes/forum.m2h?pop=yes&action=viewtopic*
// ==/UserScript==

var tBody=document.getElementsByTagName('table')[0].firstChild;
var ignore;
var name;
var nameTd;

function ignorePlayer(name) {
	GM_setValue(name,1);
	location.reload();
}

function unignorePlayer(name) {
	GM_setValue(name,0);
	location.reload();
}

function showPost(post) {
	document.getElementById('post' + post).style.display='block';
	document.getElementById('show' + post).style.display='none';
}

function addIgnoreButton(post) {
	var nameTd=tBody.childNodes[x].firstChild;
	var name=nameTd.firstChild.innerHTML;
	var ignoreLink=document.createElement('a');
	ignoreLink.href='#';
	if (GM_getValue(name,0)==0) { //If the player is not ignored
		//Set the ignoreLink click event and text
		ignoreLink.addEventListener("click", function() { ignorePlayer(name) },true);
		ignoreLink.innerHTML='Ignore Player';
	} else {
		var postTd;
		var showLink;
		//Set the ignoreLink click event and text
		ignoreLink.addEventListener("click", function() { unignorePlayer(name) },true);
		ignoreLink.innerHTML='Unignore Player';
		//Hide the post text
		postTd=nameTd.parentNode.lastChild;
		postTd.innerHTML='<div id="post' + post + '" style="display:none">' + postTd.innerHTML + '</div>';
		//Create a link to show the post text
		showLink=document.createElement('a');
		showLink.href='#';
		showLink.id='show' + post;
		showLink.addEventListener("click", function() { showPost(post); }, true);
		showLink.innerHTML='Show Post';
		postTd.appendChild(showLink);
	}
	nameTd.insertBefore(document.createElement('br'),nameTd.childNodes[1]);
	nameTd.insertBefore(ignoreLink,nameTd.childNodes[2]);
}

for (var x=0; x<tBody.childNodes.length; x++) {
	addIgnoreButton(x);
}
