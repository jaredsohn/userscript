// ==UserScript==
// @name        douban友邻备注
// @namespace   http://userscripts.org/users/yhben
// @description 提供快捷发送到友邻留言板、备注友邻、批量发送留言到备注过的友邻留言板（爆留言板）功能。源码来自豆瓣精灵，针对火狐以及油猴做了修改，适用于各种支持油猴脚本的浏览器上。
// @require       http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.1.min.js
// @include     http://*.douban.com/*
// @version     2.0.1
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// ==/UserScript==
var backupNames, ck, peopleCustomize;

peopleCustomize = function() {
  var a, backupNames, ck, i, userid;
  userid = location.href.split(/people|\//)[5];
  ck = $(".top-nav-info a:last")[0].href.split("=")[1];
  i = 0;
  $("li.mbtrdot").each(function() {
    var action;
    i++;
    action = $(this).find("a").attr("href");
    return $(this).append("<br><a href='javascript:void(0)' id='showdiv_" + i + "' onclick=\"document.getElementById('mydiv_" + i + "').style.display='block'\">快捷回复至TA的留言板 </a>" + "<div id='mydiv_" + i + "' style='display:none'>" + "<input name='bp_text' id='bp_text_" + i + "' size='70'>" + "<input type='button' value='回复' onclick='this.disabled=true;obj=$(\"#bp_text_\"+" + i + ")[0];bp_text=obj.value;$.post(\"" + action + "\",{ck:\"" + ck + "\", bp_text:bp_text, bp_submit:\"留言\"},function(){$(obj).hide();alert(\"提交成功\");});'/></div>");
  });
  backupNames = {};
  if (localStorage.doubanBackupNames) {
    backupNames = JSON.parse(localStorage.doubanBackupNames);
  }
  $(".user-info .pl").append("<br /><span style='color:red' class='backupName'>" + (backupNames[userid] ? backupNames[userid] : "") + "</span>");
  a = $("<a href=\"javascript:void(0)\">备注此人</a>");
  a.click(function() {
    var backup;
    backup = $("<a href='javascript:void(0)'>备注好友</a>");
    backup.click(function() {
      var newName;
      if (localStorage.doubanBackupNames) {
        backupNames = JSON.parse(localStorage.doubanBackupNames);
      }
      newName = $("#backup").val();
      $(".backupName").html(newName);
      backupNames[userid] = newName;
      localStorage["doubanBackupNames"] = JSON.stringify(backupNames);
      $(this).remove();
      return alert("备注成功");
    });
    return $(".backupName").html("<input type='text' size='10' id='backup' style='border:1px solid #ccc'/><br />").append(backup);
  });
  return $(".user-group-list").prepend(a);
};

if (location.href.match(/.*\/people\/.*/)) {
  peopleCustomize();
}

if (/contacts\/list/.test(location.href)) {
  backupNames = {};
  if (localStorage.doubanBackupNames) {
    backupNames = JSON.parse(localStorage.doubanBackupNames);
  }
  ck = $(".top-nav-info a:last")[0].href.split("=")[1];
  $(".menu-list").append("<li><a href='javascript:void(0)' id='backupPeople'>我备注过的人</a></li>");
  $("#backupPeople").click(function() {
    var li, submitBtn, t;
    $(".menu-list li").each(function() {
      if ($(this).hasClass("on")) {
        return $(this).removeClass("on");
      }
    });
    $(this).parent().addClass("on");
    $(".user-list li").hide();
    $(".paginator").hide();
    for (t in backupNames) {
      li = $("<li></li>");
      li.append("<a target='_blank' href='http://www.douban.com/people/" + t + "'>" + backupNames[t] + "</a>");
      li.append("<a style='float:right' href='javascript:void(0)' class='deleteBackup' name='" + t + "'>删除备注</a>");
      $(".user-list").append(li);
    }
    li = $("<li><textarea id='reply_content' rows='5' cols='60'>{nickname}</textarea><br /></li>");
    submitBtn = $("<input type='button' value='留言板群发' />");
    submitBtn.click(function() {
      for (t in backupNames) {
        $.post("http://www.douban.com/people/" + t + "/", {
          ck: ck,
          bp_text: $("#reply_content").val().replace("{nickname}", backupNames[t]),
          bp_submit: "留言"
        });
      }
      return alert("点击一次就行了，点多了就成机器人了");
    });
    $(".user-list").append(li.append(submitBtn).append(" <p class='pl'>PS：<b>{nickname}</b>将被自动替换成你备注的好友昵称。<br>PPS：如果因大量刷留言板被关小黑板俺可不负责啊。</p>"));
    return $(".deleteBackup").click(function() {
      delete backupNames[$(this).attr("name")];
      localStorage["doubanBackupNames"] = JSON.stringify(backupNames);
      return $(this).parent().remove();
    });
  });
}
