// ==UserScript==
// @name           thehackernews.com enhancer
// @namespace      tukkek
// @description    Shows only the content on post pages
// @include        http://thehackernews.com/*/*/*
// ==/UserScript==
var postBody=document.getElementsByClassName('post-body')[0].childNodes;
var content="";
for (i in postBody){
  var child = postBody[i];
  if (child.tagName=="DIV" && child.id) {
    content+=child.innerHTML;
  }
}
document.body.innerHTML=content+document.getElementById('comments').innerHTML;