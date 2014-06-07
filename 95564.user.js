// ==UserScript==
// @name           Enlarge Blogger HTML Editor
// @namespace      http://templatefaerie.blogspot.com
// @description    Enlarges the HTML editor and aligns the buttons to the side in a fixed position
// @include        http://*.blogger.com/html*
// ==/UserScript==


addGlobalStyle('#save-button-wrapper {position:fixed; top:485px; left:90%;}');

addGlobalStyle('#preview-button-wrapper {position:fixed; top:450px; left:90%;}');

addGlobalStyle('#cancel-button-wrapper {position:fixed; top:415px; left:90%; }');

addGlobalStyle('.cssButtonInner {font-size:80% !important; width:75px;}');

document.getElementById('wrap2').style.width = '89%';
document.getElementsByTagName('textarea')[0].setAttribute('rows', 36);

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  
  if (!head)
  { 
    return;
  }
  
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild (style);
  }