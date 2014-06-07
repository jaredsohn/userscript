// ==UserScript==
// @name          JumpToReadme
// @description   Jump to the Readme section of a repository on GitHub 
// @include       http://github.com/*
// @include       https://github.com/*
// ==/UserScript==

(function() {
  window.onkeydown = function (event) {
    if ( !window.location.href.match(/\#readme$/) && event.keyCode == 40 ) {
      window.location.href += "#readme";
      console.log(event.keyCode);
    }
  }
}
)();
