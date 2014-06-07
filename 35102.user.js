// ==UserScript==
// @name           Hide Facebook Ads
// @namespace      blah
// @include        http://www.facebook.com/*
// ==/UserScript==


function getElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for(var i=0,j=els.length; i<j; i++)
    if(re.test(els[i].className))a.push(els[i]);
  return a;
}


elements = getElementsByClassName('social_ad');

for (var i=0; i < elements.length; i++) {
  elements[i].style.display = 'none';
}

elements = getElementsByClassName('admarket_ad');

for (var i=0; i < elements.length; i++) {
  elements[i].style.display = 'none';
}

