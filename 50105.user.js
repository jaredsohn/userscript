// ==UserScript==
// @name           iplay4e Compendium Inliner
// @namespace      compendium_inliner
// @description    Add compendium results to an iframe
// @include        http://iplay4e.appspot.com/*
// @include        http://www.iplay4e.com/*
// @include        http://iplay4e.com/*
// ==/UserScript==
$ = unsafeWindow.$;
$$ = unsafeWindow.$$;
Element = unsafeWindow.Element;
Event = unsafeWindow.Event;

$$('a[target=compendium]').each(function(a) {
  var iframe = null;
  var inlineCompendium = function() {
    if(iframe === null) {
      iframe = document.createElement('iframe');
      iframe.src = a.href;
      iframe.width = '100%';
      iframe.height = '350px';
      Element.setStyle(iframe, {border: '0px'});
      if(a.down('div.primary')) {
        a.insert({after: iframe});
      } else {
        var scrollableList = a.up('div.EdgedList').down('div.ScrollableList');
        scrollableList.insert({bottom: iframe});
      }
    } else {
      Element.remove(iframe);
      iframe = null; 
    }
    return false;
  }
  a.onclick = inlineCompendium;
  if(iframe === null && 
      !(a.href.match(/(race)|(class)|(feat)|(skill)\.aspx/)) && 
      !(a.href.match('item.aspx') && !a.href.match(/ftype=1$/))) {
    inlineCompendium();
  }
});