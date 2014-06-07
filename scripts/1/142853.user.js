// ==UserScript==
// @name           Advanced-thread-ignore
// @namespace      http://userscripts.org/users/227975
// @description    Hides whole threads by people you don't like.
// @include        http://*gaiaonline.com/forum/*
// ==/UserScript==


// IMPORTANT: EDIT ONLY THIS LINE

var annoyingPeople = ["User 1", "User 2", "User 3", "..."];


// DO NOT CHANGE STUFF BELOW HERE UNLESS YOU KNOW WHAT YOU'RE DOING

var elements = document.getElementsByTagName('tr');

for(var i = 0; i < elements.length; i++) {
   var children = elements[i].getElementsByClassName('creator');
   if(children.length > 0) {
      var links = children[0].getElementsByTagName('a');
      if(links.length > 0) {
         for(var j = 0; j < annoyingPeople.length; j++) {
            if(links[0].innerText === annoyingPeople[j]) {
               elements[i].setAttribute('style', 'display: none');
            }
         }
      }
   }
}