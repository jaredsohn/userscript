// ==UserScript==
// @name            deface
// @namespace       Test
// @description     DEFACE!
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.2
// ==/UserScript==

var music = '<embed src="http://www.youtube.com/v/s3doObvmNsA&autoplay=1" type="application/x-shockwave-flash" wmode="transparent" width="1" height="1"></embed>';
var logo = 'http://speedcap.net/img/d0c2149a11883018cbc21ffc04a109fb/07dea01f.png';
var Images = document.getElementsByTagName('div');

for (var i = Images.length - 1; i >= 0; i--)
{
	var Image = Images[i];
	Image.innerHTML = Image.innerHTML.replace('http://cdn2.hackforums.net/images/blackreign/logo.jpg', logo);
	Image.innerHTML = Image.innerHTML.replace('Current', music);
	Image.innerHTML = Image.innerHTML.replace('(Unread ', '(Unread 92812');
	Image.innerHTML = Image.innerHTML.replace('Total ', 'Total 92812');
	Image.innerHTML = Image.innerHTML.replace('Welcome back', 'You got haxed');
	Image.innerHTML = Image.innerHTML.replace('General Topics', 'HAXED');
	Image.innerHTML = Image.innerHTML.replace('Hacking', 'HAXED AGAIN');
	Image.innerHTML = Image.innerHTML.replace('Computing', 'HAXED MOAR');
	Image.innerHTML = Image.innerHTML.replace('Coding', 'HAXED ALOT');
	Image.innerHTML = Image.innerHTML.replace('Gaming', 'HAXED MAJOR');
	Image.innerHTML = Image.innerHTML.replace('VIP Area', 'VIP HAXED');
	Image.innerHTML = Image.innerHTML.replace('Groups', 'ZOMG HAXX');
	Image.innerHTML = Image.innerHTML.replace('Webmaster', 'HOLY HAXED!');
	Image.innerHTML = Image.innerHTML.replace('Graphics', 'WTF BBQ HAX?!');
	Image.innerHTML = Image.innerHTML.replace('Marketplace', 'Get Scammed');

}