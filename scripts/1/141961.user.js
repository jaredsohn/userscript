// ==UserScript==
// @name            TvNetIL Fast Download & FaveZone adf.ly Remove
// @namespace       http://userscripts.org/users/367653
// @description     Add Download Button to TvNetIL & Remove adf.ly Links From FaveZone Site.
// @version         1.1
// @author          TzAnAnY
// @include         http://www.tvnetil.net/review/*/*
// @include         http://tvnetil.net/review/*/*
// @include         http://www.favezone.net/search.php*
// @include         http://favezone.net/search.php*
// @include         http://www.favez0ne.net/search.php*
// @include         http://favez0ne.net/search.php*
// @grant           none
// ==/UserScript==
function tvnetil() {
	var href, item, end;
	href = "http://www.favezone.net/search.php?srch=" + 
			document.getElementsByTagName("input").item(0).value;
	item = 	document.getElementsByClassName("dbimgc").item(0);
	end  = 	item.innerHTML.indexOf("<div class=\"clear\">");
	item.innerHTML = item.innerHTML.substr(0,end) 	+ 
					 "<div class=\"clear\"></div>" 	+ "\r\n" + 
					 "<div align=\"center\">" + "\r\n" + 
					 "<a href=\"" + href + "\" target=\"_blank\" style=\"background-image: url('http://i49.tinypic.com/2pqosgj.png'); width:88px; height:25px; display:block;\"></a>" + "\r\n" + 
					 "</div>" + "\r\n" + 
					 "<div class=\"clear\"></div>" 	+ "\r\n";
}
function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
 
	for(var i = 0; i < hashes.length; i++) 	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}
function favezone() {
	var ref = document.referrer;
	if (ref.match(/^http?:\/\/([^\/]+\.)?tvnetil\.net(\/|$)/i)) {
		var vars = getUrlVars();
		document.getElementsByName(vars[0]).item(0).value = vars[vars[0]];
		document.getElementsByName("submit").item(0).click();
	}
	else {
		var a, item, href, start;
		a = document.getElementsByTagName("a");
		for(var i=0; i<a.length ; i++) {
			item = a.item(i);
			href = item.href;
			start = href.lastIndexOf("http://");
			if(start == -1 || start == 0)
				start = href.lastIndexOf("https://");
			if(start != -1 && start != 0)
				item.href = href.substring(start);
		}
	}
}
function mainStart() {
	var location = window.location.href;
	if (location.match(/^http?:\/\/([^\/]+\.)?tvnetil\.net(\/|$)/i)) {
		tvnetil();
	}
	else {
		favezone();
	}
}
mainStart();