// ==UserScript==
// @name           AntiFavotterCensorship for GreaseKit
// @namespace      http://kataho.net/
// @include        http://favotter.matope.com/*
// @description    Add popups of uncensored tweets to Favotter pages.
// @license        New BSD License
// ==/UserScript==

function onMouseOver(eventArg) {
  var a = eventArg.target;
  if (a.title != '') {
    return;
  }
  a.title = 'loading';

  var idName = a.id.substring(14);
  var id = idName.substring(0, idName.indexOf('_'));
  var screenName = idName.substring(idName.indexOf('_') + 1);
  var statusUri = 'http://twitter.com/status/show/' + id + '.json';

  $.ajax({
    dataType:'jsonp',
    url:statusUri,
    success:function(data) {
      a.title = data['text'];
    }
  });
}

var spans = document.getElementsByTagName('span');
for (var i = 0; i <spans.length; ++i) {
  if (spans[i].className.indexOf('status_text') >= 0) {
    var id = spans[i].parentNode.parentNode.id.substring(7);
    var screenName = '';
    var divs = spans[i].parentNode.parentNode.getElementsByTagName('div');
    for (var j = 0; j < divs.length; ++j) {
      if (divs[j].className == 'info') {
      try{
        screenName = divs[j].getElementsByTagName('strong')[0].getElementsByTagName('a')[0].title;
        }catch(e){alert(e);}
      }
    }
    spans[i].id = "status_span_" + id + "_" + screenName;
    var a = document.createElement('a');
    a.id = 'a_' + spans[i].id;
    a.name = a.id;
    a.title = '';
    a.style.fontSize = '13px';
    a.style.fontWeight = 'normal';
    a.appendChild(document.createTextNode('*'));
    var firstChild = spans[i].firstChild
    spans[i].insertBefore(a, firstChild);
    spans[i].insertBefore(document.createTextNode(' '), firstChild);
    a.addEventListener("mouseover", onMouseOver, false)
  }
}
