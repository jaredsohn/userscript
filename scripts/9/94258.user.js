// ==UserScript==
// @name          Chrome Campfire Notifications
// @namespace     http://jonswope.com
// @description   Create a Chrome Notification on Campfire events
// @author        Jon Swope
// @homepage      http://jonswope.com
// @include       *.campfirenow.com/room*
// ==/UserScript==

ChromeCampfireNotifications = { 
  issueNotification: function(body) {
    var notification = window.webkitNotifications.createNotification('http://campfirenow.com/favicon.ico', ChromeCampfireNotifications.room, body);
    var timer;
    notification.ondisplay = function() {
      timer = setTimeout(function() {
        notification.cancel();
      }, 5000);
    }
    notification.onclose = function() {
      if(timer) {
        clearTimeout(timer);
      }
    }
    notification.show();
  },

  checkPermissions: function() {
    if (window.webkitNotifications.checkPermission() != 0) {
      var container = document.getElementById('clipper');

      //need a user gesture to enable notification
      btn = document.getElementById('btnEnableNotification');
      if(!btn){
        btn = document.createElement('input');
        btn.setAttribute('id','btnEnableNotification');
        btn.setAttribute('type','button');
        btn.setAttribute('value','Enable Notification');
        btn.setAttribute('onclick',"window.webkitNotifications.requestPermission();this.parentNode.removeChild(this);");
        container.appendChild(btn);							
      }	
    }
  },

  init: function() {
    ChromeCampfireNotifications.checkPermissions();

    ChromeCampfireNotifications.room = document.getElementById('room_name').innerHTML;
	
    document.addEventListener("DOMNodeInserted", function(e) {
      if (e.target.id && e.target.id.indexOf("message_") != -1 && e.target.id.indexOf("message_pending") == -1 && e.target.getElementsByClassName("person").length > 0) {
        var name = e.target.getElementsByClassName("person")[0].innerText;
        var body = e.target.getElementsByTagName("div")[0].innerText;
        ChromeCampfireNotifications.issueNotification(name + ": " + body);
      }
    }, false);
  }
}

ChromeCampfireNotifications.init();
