// ==UserScript==
// @name        Ship It Button
// @namespace   http://userscripts.org/users/537150
// @description Adds a ship it button to GitHub pull requests
// @include     https://github.com/*/*/pull/*
// @version     2.1
// @grant       none
// ==/UserScript==

(function(){
  var img             = document.createElement('img'),
      imageAttributes = {
        width: "20",
        height: "20",
        align: "absmiddle",
        src: "https://github.global.ssl.fastly.net/images/icons/emoji/shipit.png",
        alt: ":shipit:",
        title: ":shipit:",
        class: "emoji"
      },
      button          = document.createElement('button'),
      wrapperDiv      = document.getElementById('js-new-comment-form-actions'),
      correctPage     = !!document.querySelector('div.view-pull-request'),
      handleClick     = function(e){
        var textarea = document.querySelector('.js-new-comment-form .js-comment-field'),
            form     = document.querySelector('.js-new-comment-form');
        e.preventDefault();
        textarea.value = textarea.value + " :shipit:";
        form.submit();
      },
      key;

  if(correctPage){
    for(key in imageAttributes){
      img.setAttribute(key, imageAttributes[key]);
    }
    button.setAttribute('class', 'button');
    button.appendChild(img);
    button.addEventListener('click', handleClick, false);
    wrapperDiv.appendChild(button);
  }
})();
