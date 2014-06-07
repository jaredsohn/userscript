// ==UserScript==
// @name       Get rid of red header on greenhopper
// @namespace  http://davidmason.org
// @version    0.1
// @description  Someone made the header red for greenhopper. This changes it back.
// @match      https://projects.engineering.redhat.com/*
// @copyright  2013+, David Mason
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function () {
  var headers = document.getElementsByClassName('aui-header');
  for (var i = 0; i < headers.length; i++) {
    headers[i].style.background = '#205081';
    headers[i].style.borderBottomColor = '#2e3d54';
  }
});
