// ==UserScript==
// @name           Facebook Extender
// @namespace      org.frankli.gm.facebook
// @description    Repeatedly clicks the Older Posts button
// @include        http://*.facebook.com/*
// ==/UserScript==

var emptyClicks = 0;
function FireEvent(element,event) {
  if (document.createEvent) {
    var e = document.createEvent("HTMLEvents");
    e.initEvent(event, true, true);
    return !element.dispatchEvent(e);
  } else {
    var e = document.createEventObject();
    return element.fireEvent('on' + event, e)
  }
}

function ClickOlderPosts() {
  if (document.getElementsByClassName('uiMorePagerPrimary').length == 1) {
    try {
      FireEvent(document.getElementsByClassName('uiMorePagerPrimary')[0], 'click');
      emptyClicks = 0;
    } catch (err) {
    }
  }
  else {
    emptyClicks++;
  }
  setTimeout(ClickOlderPosts, 200 * Math.exp(1.5, emptyClicks));
}
setTimeout(ClickOlderPosts, 1000);