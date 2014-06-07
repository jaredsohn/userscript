// ==UserScript==
// @name           scroll wheel of love
// @namespace      http://userscripts.org/users/300356
// @description    Make good
// @include        http://www.laurencolchamiro.com/*
// ==/UserScript==

function hookEvent(element, eventName, callback)
{
  if(typeof(element) == "string")
    element = document.getElementById(element);
  if(element == null)
    return;
  if(element.addEventListener)
  {
    if(eventName == 'mousewheel')
      element.addEventListener('DOMMouseScroll', callback, false);  
    element.addEventListener(eventName, callback, false);
  }
  else if(element.attachEvent)
    element.attachEvent("on" + eventName, callback);
}

function cancelEvent(e)
{
  e = e ? e : window.event;
  if(e.stopPropagation)
    e.stopPropagation();
  if(e.preventDefault)
    e.preventDefault();
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}

function scrollTheOtherWay(e)
{
  e = e ? e : window.event;
  var raw = e.detail ? e.detail : e.wheelDelta;
  var normal = e.detail ? e.detail * -1 : e.wheelDelta / 40;
  window.scrollBy(-normal*40,0); 
  cancelEvent(e);
}

hookEvent(window, 'mousewheel', scrollTheOtherWay);