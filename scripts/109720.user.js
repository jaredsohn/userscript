// ==UserScript==
// @name         google.com images classic view
// @include       http://www.google.com/images?*
// @include       http://www.google.com/imghp?*
// @include       https://www.google.com/*
// @include       https://www.google.com/search*
// ==/UserScript==

(function() {
var loc=location+'';
if (loc.match(/www.google.com\/images?/)){
    var f = document.getElementById('tsf');
    if(!f.innerHTML.match(/<input name="sout" value="1" type="hidden">/)){
        f.innerHTML = '<input name="sout" value="1" type="hidden">' + f.innerHTML;
    }
}
else if (loc.match(/www.google.com\/imghp?/)){
    var g= document.getElementsByClassName('lst');
    var h=g[0];
    i=h.parentNode;
    if(!i.innerHTML.match(/<input name="sout" value="1" type="hidden">/)){
        i.innerHTML = '<input name="sout" value="1" type="hidden">' + i.innerHTML;
    }
}
if (document.getElementById('gb_2')){
      var bar = document.getElementById('gb_2');
      if (!bar.href.match(/sout=1/)){
            bar.href=bar.href+'&sout=1';
        }
    }
})();