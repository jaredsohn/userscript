// ==UserScript==
// @name           OpenHulu
// @namespace      http://www.ghostonthird.com/openhulu
// @description    OpenHulu.com videos without all the ads
// @include        http://www.openhulu.com/*
// @exclude        http://www.openhulu.com/
// ==/UserScript==

function remove(e) {
  e.parentNode.removeChild(e);
}

function removeById(ids) {
  for(var i = 0; i < ids.length; i++) {
    element = document.getElementById(ids[i]);
    if(element) {
      remove(element);
    }
  }
}

function blackOut() {
  document.body.style.backgroundColor = 'black';
}

function setTop(elementId, value) {
  element = document.getElementById(elementId);
  if(element) {
    element.style.top = value;
  }
}

function fixScreen() {
  removeCrap();
  blackOut();
  setTop('apDiv2', '0px');
  setTop('apDiv3', '0px');
}

function removeCrap() {
  removeById( new Array(
        "digg",
        "digg2",
        "ads",
        "email",
        "apDiv1",
        "sidead",
        "apDiv5",
        "apDiv4",
        "ads2"
        )
      );
}

fixScreen();
