// ==UserScript==
// @name          Send on Enter
// @namespace     http://www.facebook.com
// @description   Transforms all of Facebooks comment boxes to send on enter hotness
// @include       http://www.facebook.com/*
// ==/UserScript==

/**
 * Sure this is clowny code... but it works!
 **/

addGlobalStyle('.commentBtn { display: none ! important; }');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var lis = document.getElementsByTagName('li');
for (var i = 0; i < lis.length; i++) {
  var classList = lis[i].className.split(' ');
  for (var j = 0; j < classList.length; j++) {
    if (classList[j] === 'uiUfiAddComment') {
      console.log(lis[i].childNodes);
      lis[i].childNodes[0].addEventListener(
        'keypress',
        function (e) {
          console.log(e.target.parentNode.childNodes[2]);
          if (e.keyCode == 13) {
            console.log(';)');
            e.target.parentNode.childNodes[2].childNodes[0].click();
          }
        }.bind(this),
        false);
    }
  }
}