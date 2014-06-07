// ==UserScript==
// @name           Loli.su Pending Enlarger
// @author         Shadox3
// @description    Makes pending image previews larger by default
// @include        http://www.loli.su/pending*
// @version        1.2
// ==/UserScript==


var classList = document.getElementById("conte").getElementsByTagName('img');
for (var i = 0; i < classList.length; i++) {
   if (classList[i].className == 'pendimg') {
     classList[i].src = classList[i].src.replace("/loli-su-","/fresh_loli-su-");
   }
}

classList = document.getElementById("conte").getElementsByTagName('div');
for (var i = 0; i < classList.length; i++) {
   if (classList[i].className == 'pendt') {
     classList[i].style.visibility = 'hidden'; 
   }
}