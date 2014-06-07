// ==UserScript==
// @name           Yet Another Facebook Auto Like Script
// @namespace      facebook.com
// @version        0.3
// @copyright      2012, DerET
// @include        http://www.facebook.com/*
// @exclude        http://www.facebook.com/plugins/*
// @exclude        http://www.facebook.com/sharer/*
// ==/UserScript==

var rahmen = document.createElement('div');
rahmen.style.position = 'fixed';
rahmen.style.zIndex = '5';
rahmen.style.bottom = '0px';
rahmen.style.left = '0px';
rahmen.style.width = '120px';
rahmen.style.height = '75px';
rahmen.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
rahmen.style.borderTopRightRadius = '10px';
rahmen.style.textAlign = 'center';

var buttonlike = document.createElement('button');
buttonlike.innerHTML = 'Like All';
buttonlike.style.position = 'relative';
buttonlike.style.width = '100px';
buttonlike.style.top = '10px';
buttonlike.onclick = likeall;

var buttondislike = document.createElement('button');
buttondislike.innerHTML = 'Dislike All';
buttondislike.style.position = 'relative';
buttondislike.style.width = '100px';
buttondislike.style.top = '15px';
buttondislike.onclick = dislikeall;

document.getElementsByTagName('body')[0].appendChild(rahmen);
rahmen.appendChild(buttonlike);
rahmen.appendChild(buttondislike);

function likeall() {
  var likelink = document.getElementsByClassName('like_link');
  
  for (i = 0; i < likelink.length; i++) {
    if (likelink[i].name == 'like') {
	  likelink[i].click();
	}
  }
}

function dislikeall() {
  var likelink = document.getElementsByClassName('like_link');
  
  for (i = 0; i < likelink.length; i++) {
    if (likelink[i].name == 'unlike') {
	  likelink[i].click();
	}
  }
}
