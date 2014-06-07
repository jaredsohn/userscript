// ==UserScript==
// @name           Tone Down MSDN 'Switch View' Button
// @namespace      http://www.stealthmonkey.com
// @description    Changes the the MSDN 'Switch View' button to be less assaulting
// @include        http*://msdn.microsoft.*/*
// ==/UserScript==

function toneDownButton (id) {
  if (document.getElementById(id) != null) {
    document.getElementById(id).style.background = 'white';
    document.getElementById(id).style.borderColor = 'gray';
    var items = document.getElementById(id).getElementsByTagName('a');
    for (i = 0; i < items.length; i++) {
      items[0].style.color = 'gray';
    }
  }
}

toneDownButton('ctl00_LwViewSwitcher1_ViewSwitcherButton');
toneDownButton('ctl00_LwFeedback1_Button');