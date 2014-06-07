// ==UserScript==
// @name           FWZ DERP
// @namespace      DERP
// @description    DERP 
// @include        http://forumwarz.com/discussions/view/*
// @include        http://*.forumwarz.com/discussions/view/*
// ==/UserScript==

function next(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    return elem;                
}

function random_part(lol){
	while((word=lol[Math.round(Math.random() * lol.length)])===undefined){}
	return word;
}

var h1 = document.getElementsByTagName("h1");
avatars = [
"http://img291.imageshack.us/img291/9693/derpppp.png",
"http://img408.imageshack.us/img408/4563/derp2.png",
"http://img96.imageshack.us/img96/8497/derp3.png",
"http://img823.imageshack.us/img823/1255/derp4.png",
"http://img801.imageshack.us/img801/2210/derp6.png",
"http://img101.imageshack.us/img101/5715/derp5.png"
];

for(i in h1) {
    //name
    h1[i].children[0].innerHTML = "derp";
  
    //post and sig
    if(sig = h1[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[2])
    sig.innerHTML = "<hr>derp";
  
    //avatar peen and medalz
    h1[i].parentNode.parentNode.parentNode.children[1].children[0].children[0].src = random_part(avatars);
    h1[i].parentNode.parentNode.parentNode.children[1].children[1].children[0].children[0].innerHTML = "derp";
    if(medalz = h1[i].parentNode.parentNode.parentNode.children[1].children[1].children[1])
        medalz.innerHTML = "derp";
  
    //klan class and title
    if(klan = h1[i].parentNode.parentNode.parentNode.children[2].children[0].children[0].children[0])
		klan.innerHTML = "derp";
    h1[i].parentNode.parentNode.parentNode.children[2].children[0].children[1].innerHTML = h1[i].parentNode.parentNode.parentNode.children[2].children[0].children[1].innerHTML.replace(/ [^ ]*?$/," Derp");
    if(title = h1[i].parentNode.parentNode.parentNode.children[2].children[0].children[2])
		title.innerHTML = "derp";
  
    //oh and for good measure I guess I should do the bottom links as well
    bottom_links = next(h1[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
	bottom_links.children[1].children[1].innerHTML = "View derp's Profile";
	bottom_links.children[1].children[3].innerHTML = "Tubmail derp";
}