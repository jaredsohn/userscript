// ==UserScript==
// @name       Anti Fucking Noob Posts
// @namespace  http://userscripts.org/scripts/edit/134025
// @version    1.1
// @description Fuck Bitches Get Money
// @match      http://*wareziens.info/*
// @copyright  TA_ <3
// ==/UserScript==

var algonoobPosts = document.getElementsByClassName('blockpost');

var sterfPosts = document.getElementsByClassName('blockpost');

var OkarynPosts = document.getElementsByClassName('blockpost');

for (i = 0; i < algonoobPosts.length; i++) {
    if (algonoobPosts[i].innerHTML.match(/<dt><strong><a href="profile\.php\?id=153722"><span class="gid4">Algonoob<\/span><\/a><\/strong><\/dt>/)) {
        algonoobPosts[i].style.display = 'none';
    }
}    
  
for (i = 0; i < sterfPosts.length; i++) {
    if (sterfPosts[i].innerHTML.match(/<dt><strong><a href="profile\.php\?id=156738"><span class="gid4">sterf<\/span><\/a><\/strong><\/dt>/)) {
        sterfPosts[i].style.display = 'none';
    }
}

for (i = 0; i < OkarynPosts.length; i++) {
    if (OkarynPosts[i].innerHTML.match(/<dt><strong><a href="profile\.php\?id=145646"><span class="gid4">Okaryn<\/span><\/a><\/strong><\/dt>/)) {
       OkarynPosts[i].style.display = 'none';
   }
}  

//for (i = 0; i < blankPosts.length; i++) {
//    if (blankPosts[i].innerHTML.match(/<dt><strong><a href="profile\.php\?id=blankid"><span class="gid4">blank<\/span><\/a><\/strong><\/dt>/)) {
//        blankPosts[i].style.display = 'none';
//   }
//}  
