// ==UserScript==
// @name          othersite
// @description   Click Adultwork Continue / Enter links and disable image right-click blocker
// @include       http://*adultwork.com/*
// @include       http://*adultwork.com/*
// ==/UserScript==

function find_link(text) {
  var link = null;
  var anchors = document.getElementsByTagName("a");
  for (var i in anchors) {
    var anchor = anchors[i];
    if (anchor.textContent == text) {
      link = anchor;
      break;
    }
  }
  return link;
}

function click_enter_or_continue_buttons() {
  // .click() wasn't working for me in Google Chrome, so use enterSite
  var path = document.location.pathname;
  if (path == "/Default.asp") {
    var continue_link = find_link("Continue");
    if (continue_link) {
      document.location.assign("javascript:enterSite(0);void 0");
      //continue_link.click();
    }
  } else if (path == "/") {
    var enter_link = find_link("Enter");
    if (enter_link) {
      document.location.assign("javascript:enterSite();void 0");
      //enter_link.click();
    }
  }
}

function defeat_right_click_popups() {
  if (document.location.pathname == "/dlgViewImage.asp" ||
      document.location.pathname == "/dlgViewGImage.asp") {
    for (i = 0; i < document.images.length; i++) {
      document.images[i].setAttribute("oncontextmenu", "return true;");
    }
  }
}

click_enter_or_continue_buttons();
defeat_right_click_popups();
