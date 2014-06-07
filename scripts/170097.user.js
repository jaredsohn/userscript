// ==UserScript==
// @name        Reddit-Downvoter
// @namespace   reddit.downvoter.tool
// @description Downvote all links/comments on the page
// @include     *www.reddit.com*
// @version     1
// @grant       none
// ==/UserScript==


//Generate button
var header = document.querySelectorAll('#header .tabmenu')[0];
if(header) {

  var listItem = document.createElement('li');
  var clickImg = '<img style="height: 32px;" src="data:image/png;base64,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" alt="Mass Downvote" />';

  
  var clicker = document.createElement('a');
  clicker.onclick = function() {
    var items = document.querySelectorAll('div.content .sitetable .arrow.down');
    Array.prototype.forEach.call(items, function(el, i){
      setTimeout(function(){
        el.click();
      },100 + ( i * 400 ));
    });
    return false;
  };
  
  clicker.setAttribute('style','background: transparent; cursor: pointer;');
  clicker.setAttribute('title','Mass Downvote');
  clicker.innerHTML = clickImg;
  listItem.appendChild(clicker);

  header.appendChild(listItem);
}