// ==UserScript==
// @name        FB Nizzle Shizzle
// @namespace   benow
// @include     https://*facebook.com/
// @include     http://*facebook.com/
// @version     1
// ==/UserScript==
var shizzle="What's up, My Nizzle?";


function nsFind() {
  var tas=document.getElementsByTagName('textarea');
  for (var i=0;i<tas.length;i++) {
    var curr=tas[i];
    if (curr.getAttribute('class')=='DOMControl_placeholder uiTextareaAutogrow input mentionsTextarea textInput') 
      return curr;
  }
  return;
}

function nsReset() {
  var ta=nsFind();    
  ta.removeAttribute('id');
  ta.removeAttribute('title');
  ta.removeAttribute('paceholder');
  ta.removeAttribute('aria-label');
  
  ta.setAttribute('title',shizzle);
  ta.setAttribute('placeholder',shizzle);
  ta.setAttribute('aria-label',shizzle);
  while (ta.firstChild)
    ta.removeChild(ta.firstChild);
  ta.appendChild(document.createTextNode(shizzle));
  
}

nsReset();

//document.addEventListener('load',doShizzleMyNizzle,false);


