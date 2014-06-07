// ==UserScript==
// @name           Habrahabr text icons
// @description    Replace grafics button on text
// @namespace      habrahabr.ru
// @include        http://habrahabr.ru/*
// @include        http://*.habrahabr.ru*
// @license        GPLv3
// @copyright      2009 Apkawa Inc
// @contributor    Apkawa      
// ==/UserScript==
var debug = 0;

function log(msg) {
    if (debug){
        console.debug(msg);
    };
};
var replaced = [
            [".vote_plus", "⬆"],
            [".vote_minus", "⬇"],
            [".tm-control", "⤊"],
            [".double_locked", "☒☒"],
            ["#js-removeBlogMember", "-҉"],
            ["#js-addBlogMember", "+҉"],
            [".to-favs", "a", "☆"],
            [".fav_added", "a", "★"],
            ["div[class~='twitter']", "a", "[tw]"],
            ];

log(replaced);

for (var i = 0; i < replaced.length; i++) {
   var elems = document.querySelectorAll(replaced[i][0]);

   if (elems) {
       for (var j = 0; j < elems.length; j++) {

           if ( replaced[i].length == 2){
               elems[j].innerHTML = replaced[i][1];

           } else {
               var el = elems[j].querySelector( replaced[i][1]);

               if (el){
                   el.innerHTML = replaced[i][2];
               };
           };
       };
   };
      
};