
// ==UserScript==
// @name			yt reload
// @description		xd
// @include			pl.reddit.com/*
// ==/UserScript==

if (window.document.addEventListener) {
   window.document.addEventListener("keydown", touche, false);
} 
else {
   window.document.attachEvent("onkeydown", touche);
}


var block = document.createElement('div');
block.style.borderTop='1px solid #000000';
block.style.borderLeft='1px solid #000000';
block.style.position='fixed';
block.style.right='0px';
block.style.bottom='0px';
document.body.appendChild(block);



var sep = document.createElement('span');
block.appendChild(sep);

var lien2 = document.createElement('a');
if (window.document.addEventListener) {
   lien2.addEventListener("click", reload, false);
} else {
   lien2.attachEvent("onclick", reload);
}
lien2.href='#';
lien2.innerHTML="reload";
block.appendChild(lien2);

//~ alert(div.innerHTML);


function reload()
{
	setInterval(location.reload(),5000);
}




