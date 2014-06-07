// ==UserScript==
// @name        Remove peyvandha.ir
// @namespace   http://userscripts.org/users/293637
// @description Replaces the Islamic Republic of Iran censored content notice page with this message: "Content has been censored by the Islamic Republic of Iran!"
// @include     *
// ==/UserScript==

(function (window) {
  var document = window.document,
      urls = ['http://10.10.34.34/'],
      iframe,
      p,
      a,
      found = false;
    
  // peyvandha.ir iframe is always the first iframe in censored pages
  iframe = document.getElementsByTagName('iframe')[0];
  
  if (iframe === undefined) {
    return;
  }
  
  urls.some(function (url) {
    found = iframe.src.indexOf(url) !== -1;
    return found;
  });
  
  if (found === false) {
    return;
  }
    
  p = document.createElement('p');
  p.innerHTML = 'Content has been censored by the Islamic Republic of Iran!';
  
  a = document.createElement('a');
  a.href = window.location.href;
  a.innerHTML = 'here';
  a.addEventListener('click', function (e) {
    window.location.reload();
    e.preventDefault();
  }, true);
  
  p.appendChild(document.createTextNode(' Click '));
  p.appendChild(a);
  p.appendChild(document.createTextNode(' to refresh.'));
  
  iframe.parentNode.replaceChild(p, iframe);
}(window));