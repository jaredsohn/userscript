// ==UserScript==
// @name gooverbatim
// @namespace http://polpo.org/
// @description Puts a verbatim button on Google for when you want to tell it yes, you really meant what you typed.
// @include http://www.google.*/search*
// @include https://www.google.*/search*
// @include http://www.google.*/webhp*
// @include https://www.google.*/webhp*
// @include http://www.google.*/
// @include https://www.google.*/
// @include https://encrypted.google.*/search*
// @include https://encrypted.google.*/webhp*
// @include https://encrypted.google.*/
// @version 0.5
// ==/UserScript==
(function () {
  // Only enable for the "Everything" results page.
  var ms = document.getElementById('ms');
  if (ms) {
    var elms = ms.getElementsByTagName('li');
    if (elms[0].className.indexOf("msel") === -1) {
      return false;
    }
  }
  var btn = document.createElement('button');
  btn.setAttribute('style', 'height: 100%; background-color: #fff; border: 1px solid #999; margin-left: 10px');
  var btntxt = document.createTextNode('Yes,\u00a0really');
  btn.appendChild(btntxt);
  btn.addEventListener('click', function () {
    var verboseItem = document.createElement('input');
    verboseItem.setAttribute('type', 'hidden');
    verboseItem.setAttribute('name', 'tbs');
    verboseItem.setAttribute('value', 'li:1');
    var tsf = document.forms.namedItem('tsf');
    if (tsf) {
      tsf.appendChild(verboseItem);
      tsf.submit();
    }
  }, true);
  var td = document.createElement('td');
  td.appendChild(btn);
  var bar = document.getElementById('sftab').parentNode;
  if (bar) {
    bar.appendChild(td);
  }
})();
