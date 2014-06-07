// ==UserScript==
// @name        Doit.im Plus
// @namespace   http://doit.im
// @description doit.im today tasks badge, and new message growl
// @include     *
// @author      Cyril Liu & Leeiio
// ==/UserScript==

(function () {

  if (!window.fluid) {
    return;
  }

  var intervalID = window.setInterval(updateStatus,2000);
  var lastGrowlMsg = "-"

  function updateStatus () {
    updateBadge();
    notify(getNewMessage());
  }

  function updateBadge(){
    window.fluid.dockBadge = window.Doit.today_count;
  };

  function getNewMessage () {
    newMessageCount = parseInt($("#user_info_msg_count").html(),10);
    if (newMessageCount > 0) {
      latestMessage = $("dl dt:first")
      if (latestMessage.html() == lastGrowlMsg) {
        return null
      }
      else {
        lastGrowlMsg = latestMessage.html();
        return { "title" : latestMessage.text(),
                 "description" : $("dl dd:first").text()
               }
      }
    }
  }

  // Growl message
  function notify(m) {
    if(m == null) { return }

    fluid.showGrowlNotification({
      title: m.title,
      description: m.description,
      sticky: false
    });
  }

})();

