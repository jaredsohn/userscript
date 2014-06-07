// ==UserScript==
// @name Block User Stories on FB
// @namespace http://userscripts.org
// @description hides all the posts by a specific user
// @include http://www.facebook.com
// @exclude *
// ==/UserScript==

var story = document.getElementsByClassName('storyContent');

for (var i=0;i<story.length;i++){
var users = story.item(i).getElementsByTagName('a');
for (var j=0;j<users.length;j++){
if(users.item(j).innerHTML == "Kasun Herath"){
story.item(i).style.visibility='hidden';
}
}
}