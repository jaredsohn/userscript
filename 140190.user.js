// ==UserScript==
// @name        My Little Fefe
// @namespace   *
// @icon		http://s.gullipics.com/image/l/8/z/4o7o82-jak4b3-qw1x/icon.png
// @include     http://blog.fefe.de/*
// @include     http://*refefe.de/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// ==/UserScript==

var flying = false;
var flytimer = 0;

function main() {
build();
}

function switchurl(url) {
if (url.search('refefe') != -1) {
	url = url.replace('refefe','fefe')
	if (url.search('blog.') == -1)
		url = url.replace('fefe','blog.fefe');
	if (url.search('http://') == -1)
		url = 'http://' + url;
	}
else {
	url = url.replace('fefe','refefe')	
	if (url.search('http://') == -1)
		url = 'http://' + url;
	}
return url;
}

function build() {
	if (document.URL.search('fefe.de/') == -1) return;
	var refefe = (document.URL.search('refefe') != -1);

	document.body.style.background = '#B0ECEA';
	document.body.style.backgroundImage = "url(http://s.gullipics.com/image/x/7/5/4o7osu-j9huij-xsp9/bg.jpeg)";
	document.title = 'My little Fefe';
	GM_addStyle('body {font: 12px/18px \'Lucida Grande\',\'Lucida Sans\',Arial,sans-serif}');
	GM_addStyle('a {color: #BA476F}');
	GM_addStyle('a:hover {color: #FF5E93}');

	var content = document.body.innerHTML;

	var header = '<a href="/" ><img style="position:absolute; left: 40; top: -30;" src="http://s.gullipics.com/image/i/7/x/4o7ovv-jaiec1-s56f/logos.png"></a>' 
			   + '<div align="right" style="height: 220px;"><br><input id="search" onkeypress="searchKeyPress(event);" style="color:#9100DA; margin-top: 10; margin-right:10; border: 1px solid #64B0D6; border-radius: 4px; background-color: transparent; background-image:url(http://s.gullipics.com/image/n/y/q/4o7osu-j9h01v-zmn5/searchbg.png); height:21px; width:200px; padding:2px;">'
			   + '<br><br><br> <a href="/faq.html">FAQ</a> - <a href="http://alternativlos.org">Alternativlos</a> <br> ganzer Monat - refefe - <a href="/impressum.html">Impressum</a> </div>';
			   
	if (refefe) {
		header = header.replace('refefe','<a href="' + switchurl(document.URL) + '"> fefe</a>');
		}
		else {
		header = header.replace('refefe','<a href="' + switchurl(document.URL) + '"> refefe</a>');	
		}
		
	var date = new Date();
	var month = date.getFullYear() * 100 + date.getMonth() + 1;
	header = header.replace('ganzer Monat','<a href="/?mon=' + month + '">ganzer Monat</a>');
	
	content = content.replace(/<h2>[a-zA-Z 0-9öäü.,!?:\w'-<="\\>]{0,}<\/h2>/,header);
	content = content.replace(/<b>Wer schöne[a-zA-Z 0-9öäü.,!:\w'-<="\\>]{0,}<\/b>/,'');
	content = content.replace(/<p[a-zA-Z 0-9öäü.,!?:\w'-<="\\>]{0,}<\/a>/,'');
	content = content.replace(/<div align=center><a href="[a-zA-Z 0-9öäü.,!?:\w'-<="\\>]{0,}">ganzer Monat<\/a><\/div>/,'');
	
	if (document.URL.search('faq.html') == -1) {
		content = content.replace(/<ul>\n<li>/g,'');
		content = content.replace(/<li>/g,'<br><br><div align="center"><img src="http://s.gullipics.com/image/0/s/c/4o7ovv-jajuer-urb9/div.png"><br><br></div>');
		content = content.replace(/<ul>/g,'');
		content = content.replace(/<\/ul>/,'');	
		content = content.replace('<h3></h3>','');

		n = content.match(/<h3>[a-zA-Z 0-9öäü.,!?:\w'-<="\\>]{0,}<\/h3>/g);
		if (n != null)
		for (i = 0; i < n.length; i++) {
			d = n[i];
			d = d.substr(4,d.length - 9);
			date = new Date(d);
			d2 = date.toLocaleString();
			d2 = d2.substr(0,d2.search('201') + 4);
			content = content.replace(d,d2);
			}
			
		if (!refefe) {
			n = content.match(/<a href="\?ts=[a-zA-Z 0-9öäü.,!?:\w'-<="\\>]{0,}">\[l]<\/a>/g);
			if (n != null)
			for (i = 0; i < n.length; i++) {
				d = n[i];
				id = d.substr(13,d.length-21);	
				content = content.replace(d,d + '&nbsp<a href="http://blog.refefe.de/?ts=' + id + '">[r]</a>');
				}
			}
		}

	document.body.innerHTML = '<div align="right" style="position:absolute; left:0px; top:0px; height:25px; width:100%; background-image: url(http://s.gullipics.com/image/b/3/k/4o7osu-j9hucf-rf0h/rainbow.png)">' 
		+ '<div style="width:200px;"></div></div>' 
		+ '<div id="divall" style="width: 520px; margin-left: 80px; padding-left:40px; padding-right:40px; background-image: url(http://s.gullipics.com/image/e/f/l/4o7ovv-jajtdf-rsks/bgcontent.png)"><br><br>'
		+ '' + content
		+ '<div style="height:100px"><!--<br><br>Dear Princes Celestia,<br><br>today I learned a valuable lesson about conspiracy theory. I know all about the New World Order, Peak Oil and 911.<br><br>Your faithful student, <br>Twilight Sparkle--></div></div>'
		+ '<div id="divballoon" style="position: absolute; top:100px; right:100px; pointer-events: none; z-index:23;"><img id="balloon" src="http://s.gullipics.com/image/7/9/q/4o7osu-j9hkx0-2fhi/balloon.png"></div>'
		+ '<div style="position: absolute; top:0; right:0;"><img src="http://s.gullipics.com/image/c/1/w/4o7osu-j9hv6a-qcdo/rd.png" style="pointer-events: none;"></a></div>'
		+ '<div style="position: fixed; bottom:0; right:0; pointer-events: none;" zIndex="42"><img id="ponyville" src="http://s.gullipics.com/image/k/c/c/4o7osu-j9hjfn-ls39/ponyville.png" style="pointer-events: none;"></div>';

	document.getElementById('search').onkeypress = function(event) { searchKeyPress(event); };
	window.onscroll = onscroll;
	
	/*	
	// Cloudsdale
	var divclouds = document.createElement('div');
	$(divclouds).css({position:'absolute',top:0,left:430});
	divclouds.id = 'divclouds';
	divclouds.innerHTML = '<img id="cloudsdale" src="http://s.gullipics.com/image/c/r/7/4o7osu-j9huq1-pulh/Cloudsdale1.png" style="pointer-events: none;">';
	document.body.appendChild(divclouds);  
	*/
}

function onscroll() {
if (flytimer > 20) flytimer = 300;
else {
	flytimer = 300;
	checkballoon();
	}
}

function searchKeyPress(e) {
	if (typeof e == 'undefined' && window.event) { e = window.event; }
	
	if (e.keyCode == 13)			
		window.location = 'http://blog.fefe.de/?q=' + document.getElementById('search').value;					
}

function checkballoon() {
if (flytimer > 20) {
	flytimer -= 100;
	setTimeout(function() {checkballoon();},100);	
} 
else $('#divballoon').animate({top: window.pageYOffset + 100}, 2000, function() { });
}

main();