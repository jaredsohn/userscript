// ==UserScript==
// @name        Reddit-Upvoter
// @namespace   reddit.upvoter.tool
// @description Upvote all links/comments on the page
// @include     *www.reddit.com*
// @version     1
// @grant       none
// ==/UserScript==

//Generate button
var header = document.querySelectorAll('#header .tabmenu')[0];
if(header) {

  var listItem = document.createElement('li');
  var clickImg = '<img style="height: 32px;" src="data:image/png;base64,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" alt="Mass Upvote" />';
  
  var clicker = document.createElement('a');
  clicker.onclick = function() {
    var items = document.querySelectorAll('div.content .sitetable .arrow.up');
    Array.prototype.forEach.call(items, function(el, i){
      setTimeout(function(){
        el.click();
      },100 + ( i * 400 ));
    });
    return false;
  };
  
  clicker.setAttribute('style','background: transparent; cursor: pointer;');
  clicker.setAttribute('title','Mass Upvote');
  clicker.innerHTML = clickImg;
  listItem.appendChild(clicker);

  header.appendChild(listItem);
}