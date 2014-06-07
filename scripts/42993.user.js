// ==UserScript==
// @name Post Numberer
// @description Puts the post number in the infobar.
// @include http://endoftheinter.net/inboxthread.php*
// @include http://boards.endoftheinter.net/showmessages.php*
// @include http://archives.endoftheinter.net/showmessages.php*
// @include https://endoftheinter.net/inboxthread.php*
// @include https://boards.endoftheinter.net/showmessages.php*
// @include https://archives.endoftheinter.net/showmessages.php*
// ==/UserScript==

//i totally improved this one
//variables that aren't present return null
//a variable with no value returns the true
function getUrlVars(urlz){
	//thanks for the function citizenray
	var vars=[];
	var hash='';
	var hashes=urlz.slice(urlz.indexOf('?')+1).split('&');
	for(var i=0;i<hashes.length;i++){
		hash=hashes[i].split('=');
		if(hash[1]!=null&&hash[1].indexOf('#')>=0)hash[1]=hash[1].substring(0,hash[1].indexOf('#'));
		if(hash[1]==undefined){
			hash[1]=true;
			if(hash[0].indexOf('#')>=0)hash[0]=hash[0].substring(0,hash[0].indexOf('#'));
		}
		vars.push(hash[0]);
		vars[hash[0]]=hash[1];
	}
	return vars;
}

//livelinks compatiblity
function livelinks(func){
	document.addEventListener(
		'DOMNodeInserted',
		function(e){
			if(e.target.firstChild&&e.target.firstChild.className=='message-container')
				func(e.target.firstChild);
		},
		false
	);
	func(document);
}

//process posts
function messagebar(place){
	var tops=place.getElementsByClassName('message-top');
	for (var i=0;i<tops.length;i++){
		if(tops[i].parentNode.className=='message-container'){
			offset++
			var count=document.createElement('span');
			count.textContent=' | #';
			if (offset<10)
				count.textContent+='000';
			else if (offset>=10&&offset<100)
				count.textContent+='00';
			else if (offset>=100&&offset<1000)
				count.textContent+='0';
			count.textContent+=offset;
			tops[i].appendChild(count);
		}
	}
}

var offset=getUrlVars(location.href)['page'];
if (offset==null)
	offset=1;
offset=(offset-1)*50;

livelinks(messagebar);