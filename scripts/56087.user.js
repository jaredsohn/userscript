// ==UserScript==
// @name  IxQuick Googlifier
// @description Changes the appearance of ixquick.com to something Google like
// @include  http://*.ixquick.com/do/metasearch.pl*
// @include  http://ixquick.com/do/metasearch.pl*
// ==/UserScript==
//

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getElementsByClass(node,searchClass,tag) {
  var classElements = new Array();
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp(searchClass);
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}

var spans = getElementsByClass(document,'linkx','font');
for (var i=0; i<spans.length; i++) {
  var span = spans[i];
  var url = span.innerHTML;
  var re = /.pdf[ ]*$/i;
  if (re.test(url)) {
      span.parentNode.parentNode.childNodes[1].innerHTML = "[pdf] "+ span.parentNode.parentNode.childNodes[1].innerHTML ;
  }

}