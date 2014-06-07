// ==UserScript== 
// @name LL Ignorator 
// @description ignore users 
// @include http://*boards.endoftheinter.net/showtopics.php?board=* 
// @include https://*boards.endoftheinter.net/showtopics.php?board=* 
// @include http://*boards.endoftheinter.net/showmessages.php* 
// @include https://*boards.endoftheinter.net/showmessages.php* 
// ==/UserScript== 

// comma separated list of users. for example:
//var users = 'prcu, rainbow dash';
var users = ''; 

var d = 0; 
var ignores = users.toLowerCase().split(','); 
for(var r = 0; r < ignores.length; r++){ 
	d = 0; 
	while(ignores[r].substring(d, d + 1) == ' '){ 
		d++; 
	} 
	ignores[r] = ignores[r].substring(d,ignores[r].length); 
} 
rmby(ignores); 
if(window.location.href.indexOf("showtopics") == -1){ 
	document.addEventListener('DOMNodeInserted', function(e){rm_livelinks(ignores, e);}, false); 
} 

function rmby(ignores){ 
	var w = "" + window.location.href; 
	if(w.indexOf("showtopics") != -1){ 
		var g = document.getElementsByTagName('tr'); 
		var title; 
		for(var i = 1; g[i]; i++){ 
			if(g[i].getElementsByTagName('td')[1]){ 
				title = g[i].getElementsByTagName('td')[1]; 
				for(var f = 0; f < ignores.length; f++){ 
					if(title.getElementsByTagName('a').item(0).innerHTML.toLowerCase() == ignores[f]){ 
						title.parentNode.style.display = 'none'; 
					} 
				} 
			} 
		} 
	} 
	if(w.indexOf("showmessages") != -1){ 
		var s; 
		for(var j = 0; document.getElementsByClassName('message-top').item(j); j++){ 
			s = document.getElementsByClassName('message-top').item(j); 
			for(var f = 0; ignores[f]; f++){ 
				if(s.getElementsByTagName('a').item(0).innerHTML.toLowerCase() == ignores[f]){ 
					s.parentNode.style.display = 'none'; 
				} 
			} 
		} 
	} 
} 

function rm_livelinks(ignores, el){ 
	try{ 
		var m = el.target.getElementsByClassName('message-top')[0]; 
		for(var f = 0; ignores[f]; f++){ 
			if(m.getElementsByTagName('a')[0].innerHTML.toLowerCase() == ignores[f]){ 
				m.parentNode.style.display = 'none'; 
			} 
		} 
	}catch(e){ 
	} 
}