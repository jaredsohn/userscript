// ==UserScript==
// @name           All reddits
// @namespace      theimben
// @description    Shows all the reddits you are subscribed to on the submissions page
// @include        http://www.reddit.com/r/*/submit
// @include        http://www.reddit.com/submit
// ==/UserScript==

var json = 'http://www.reddit.com/reddits/mine/.json';

GM_xmlhttpRequest({
	method:	"GET",
	url:	json,
	onload:	reddits
});

function reddits(response){
	var txt = response.responseText;
	var data;
	var suggested = document.getElementById('suggested-reddits');
	if(window.JSON && JSON.parse){
		data = JSON.parse(txt);
	}
	else{
		data = eval("("+txt+")");
	}
	
	suggested.innerHTML += '<br /><span>reddits you\'re subscribed to </span><br /><span id="rsub"></span>';
	GM_addStyle('#rsub{width: 500px;}');
	var reddits = new Array();	
	var rsub = document.getElementById('rsub');
	
	for(i = 0; i < data.data.children.length; i++){
		var r = data.data.children[i].data.display_name;
		reddits.push(r);
	}
	reddits.sort();
	for(i = 0; i < reddits.length; i++){		
		//rsub.innerHTML += '<li><a href="#" onclick="set_sr_name(this); return false">' + reddits[i] + '</a></li>';
		rsub.innerHTML += '<a href="#" onclick="set_sr_name(this); return false">' + reddits[i] + '</a> ';
	}
}