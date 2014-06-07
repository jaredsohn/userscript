// ==UserScript==
// @name            Shanbay message assistant
// @namespace       http://userscripts.org/scripts/show/183146
// @description     扇贝网短信助手
// @version         0.2.0
// @author          mozillazg
// @updateURL       https://userscripts.org/scripts/source/183146.meta.js
// @downloadURL     https://userscripts.org/scripts/source/183146.user.js
// @include         http://www.shanbay.com/*
// ==/UserScript==

function htmlSendMsgLink (username) {
    return '<br /><a href="/message/compose/?r=' + username +
            '" class="no-hover" title="发短信">发短信</a>';
};

// 打卡记录页面
function addSendLinkOnCheckin () {
  var username = $('h2').text().split(' ')[0];
  var sendLink = htmlSendMsgLink(username);
  var checkins = $("#checkin .checkin");
  $.each(checkins, function (index, value) {
    $(".avatar", value).append(sendLink);
  });
}

// 未读短信通知
function newMsgNotify () {
  var title = $("title");
  var sourceTitle = title.html().replace(/\[你有 \d+\+ 条未读短信\] \| /, '');
  $.ajax({
    url: "http://www.shanbay.com/api/v1/message/",
    dataType: "json",
    success: function(data) {
      if (data.status_code != 0) {
        return;
      }

      var messages = data.data.messages;
      var count = 0;
      for (var i=0; i<messages.length; i++) {
        var d = messages[i];
        if (d.is_new) {
          count ++;
        }
      }
      if (count > 0) {
        title.html('[你有 ' + count + '+ 条未读短信] | ' + sourceTitle);
      } else {
        title.html(sourceTitle);
      }
    }
  });
};

// run
(function () {
  var currentLink = $(location).attr('href');
  if (currentLink.match(/\/checkin\/user\/\d+/)) {
    // 打卡列表
    addSendLinkOnCheckin();
  }
  newMsgNotify();
  window.setInterval(function() {
    newMsgNotify();
  }, 60000);
})();
