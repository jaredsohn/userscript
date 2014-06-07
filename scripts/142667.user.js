// ==UserScript==
// @name           Trust Your Guests for Google Calendar
// @description    Automatically allow people you invite to modify events
// @author         anthonysapien
// @include        https://www.google.com/calendar/*
// @version        1.0
// ==/UserScript==
document.body.addEventListener('click', function(e) {
  if (e.target.className.indexOf("ep-gs-ta") != -1) {
    var guestOptions = document.getElementsByClassName("ep-go-for")[0];
    if (guestOptions) {
      var modifyOption = guestOptions.getElementsByTagName("input")[0];
      if (!modifyOption.checked) {
        var clickEvent = document.createEvent("MouseEvents");
        clickEvent.initEvent('click', true, true); // event type, bubbling, cancelable
        modifyOption.dispatchEvent(clickEvent);
      }
    }
  }
});