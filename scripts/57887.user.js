// ==UserScript==
// @name           RPS Liquid Layout v0.4
// @include        http://www.rockpapershotgun.com
// @include        http://www.rockpapershotgun.com/*
// @namespace	www.rockpapershotgun.com
// Note: Use in conjunction with http://userstyles.org/styles/24632
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].className))a.push(els[i]);
	return a;
}

//liquid footer
var footerCols = document.getElementsByClassName('footer-col',document.getElementById('footer'));
for (i = 0; i < footerCols.length; i++) {
	footerCols[i].setAttribute('class','footer-col col' + (i+1));
}

// increase avatar size to 64
var avatars = getElementsByClassName('avatar', document.getElementById('comments'));

for (i = 0; i < avatars.length; i++) {
	src = avatars[i].getAttribute('src');
	src = src.replace('s=32&','s=64&');
	avatars[i].setAttribute('src',src)
	avatars[i].setAttribute('width',64)
	avatars[i].setAttribute('height',64)
}

// alt to title
var images = document.getElementById('left-column').getElementsByTagName('img');
for (i = 0; i < images.length; i++) {
	images[i].setAttribute('title',images[i].getAttribute('alt'));
}