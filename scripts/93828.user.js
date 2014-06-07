// ==UserScript==
// @name           Urban Dictionary Short Links
// @description    Adds an ability to copy a short link to each of UB’s definitions
// @namespace      urbandictionary.shorturls
// @include        http://urbandictionary.com/define.php*
// @include        http://www.urbandictionary.com/define.php*
// ==/UserScript==

(function() {
  
  var index = document.getElementById('entries');
  var subnav = document.getElementById('subnav');
  var domain = 'urbanup.com/';
  
  var stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'data:text/css,' + escape('#rightist { padding-top: 27px !important; }');
  document.getElementsByTagName("head")[0].appendChild(stylesheet);
  
  if (index && subnav) {
    var link = index.getElementsByTagName('a')[0];
    if (link) {
      var id = link.href.split(domain)[1];
      var shortlink = document.createElement('input');
      shortlink.style.cssText = 'position: absolute; right: 5px; top: 35px; width: 159px; font-size: 9px; color: #777; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box;';
      shortlink.setAttribute('value', 'http://' + domain + id);
      shortlink.setAttribute('readonly', 'readonly');
      shortlink.addEventListener('click', function() {
        shortlink.select();
      }, false);
      subnav.appendChild(shortlink);
    }
  }
  
})();