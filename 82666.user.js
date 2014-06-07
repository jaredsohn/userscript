// ==UserScript==
// @name           mages google.co.nz image classic
// @namespace      http://userscripts.org/users/125692
// @description    trys to force old google image behaviour
// @include        http://www.google.co.nz/images?*
// @include        http://www.google.co.nz/imghp?*
// @include        http://www.google.co.nz/*
// ==/UserScript==
//dodgy as hell 5min cludge
//but hey it seems to work
//31/07/10 kiwimage
//(function() {
var loc=location+'';
if (loc.match(/www.google.co.nz\/images?/)){
    var f = document.getElementById('tsf');
    if(!f.innerHTML.match(/<input name="sout" value="1" type="hidden">/)){
        f.innerHTML = '<input name="sout" value="1" type="hidden">' + f.innerHTML;
    }
}
else if (loc.match(/www.google.co.nz\/imghp?/)){
    var g= document.getElementsByClassName('lst');
    var h=g[0];
    i=h.parentNode;
    if(!i.innerHTML.match(/<input name="sout" value="1" type="hidden">/)){
        i.innerHTML = '<input name="sout" value="1" type="hidden">' + i.innerHTML;
    }
}
else if (loc.match(/www.google.co.nz\/#/)){
   // var g= document.getElementsByClassName('lst');
   // var h=g[0];
   // i=h.parentNode;
   // if(!i.innerHTML.match(/<input name="sout" value="1" type="hidden">/)){
   //     i.innerHTML = '<input name="sout" value="1" type="hidden">' + i.innerHTML;
   // }
    var bar = document.getElementById('gbar');
    var targetlink=bar.firstChild.firstElementChild.nextElementSibling;
    if (targetlink.text=='Images'){
        targetlink.href=targetlink.href + '&sout=1';
    }
    if (document.getElementById('gb_2')){
        bar = document.getElementById('gb_2');
        if (!bar.href.match(/sout=1/)){
            bar.href=bar.href+'&sout=1';
        }
    }
}
else if (loc.match(/www.google.co.nz\/$/)){
var bar = document.getElementById('gbar');
    var targetlink=bar.firstChild.firstElementChild.nextElementSibling;
    if (targetlink.text=='Images'){
        targetlink.href=targetlink.href + '&sout=1';
    }
 if (document.getElementById('gb_2')){
        bar = document.getElementById('gb_2');
        if (!bar.href.match(/sout=1/)){
            bar.href=bar.href+'&sout=1';
        }
    }
}

//}})();