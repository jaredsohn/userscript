// ==UserScript==
// @name       Js alert box to Notification
// @namespace  ....
// @version    0.1
// @description  Replace alert popup with HTML5 notification
// @include      *
// @copyright  2012+, Rémi Benoit
// ==/UserScript==


unsafeWindow.alert = function (message) {
//  if (window.webkitNotifications.checkPermission() !== 0) {
    Notification.requestPermission();
//  }
  var notification = new Notification("Page at " + document.location.host + " says:", {
          dir: "auto",
          lang: "",
          body: message
  });
  //setTimeout("hide('notification');", 5000);

};