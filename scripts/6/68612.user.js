// ==UserScript==
// @name           Twitter Quote Button
// @description    Add QT button.
// @author         cherenkov
// @version        0.0.2
// @date           2010072115
// @license        BSD License; http://www.opensource.org/licenses/bsd-license.php
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

/*
  REPLY_MODE :
    - true: QTすると常にin_reply_toが付くようになる。
    - false: QTしてもin_reply_toは付かない。
    in_reply_toによって公開範囲が変わるので好きなほうを選んで下さい。
*/

const REPLY_MODE = false;

let $ = unsafeWindow.$;


// main
(function() {
  appendQuoteButton();
  AP();
  let status = $("#status");
  if (!status.length)
    return;

  if (REPLY_MODE)
    evalInPage(rebindSubmitEvent);

  status.css("overflow-x", "hidden").bind("keyup blur focus", changeLabel);

  // statusページからQTした場合にキャレット位置など整える。
  if (/^\sQT\s@/.test(status.val())) {
    changeLabel(status);
    status.attr("selectionEnd", 0).focus();
  }

  // Replyで飛んできて半角スペースが無かったら足す。
  else if (/^@\w+$/.test(status.val())) {
    status.val(status.val() + " ");
  }

  $("body").bind("ajaxSuccess", appendQuoteButton);
})();


function evalInPage(fun) {
  location.href = "javascript:void (" + fun + ")()";
}

function AP() {
  document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
    appendQuoteButton();
  }, false);
}

function appendQuoteButton() {
  let hentry = $('.hentry[id^="status_"]:not(.hasQT)');

  for (let i=0; i < hentry.length; i++) {
    let self = $(hentry[i]);
    let status_id = /status(?:es)?\/(\d+)$/.exec(self.find(".meta > a").attr("href"))[1];
    let user_name = /u-(\w+)/.exec(self.attr("class"))[1];
    let body = encodeURIComponent(self.find("span.entry-content, span.msgtxt").text());
    if (!REPLY_MODE) status_id = "";
    let quoteButton = createQuoteButton(user_name, status_id, body);
    self.find("ul.actions-hover").prepend(quoteButton).end().addClass("hasQT");
  }
  bindQuoteClickEvent();
}

function changeLabel() {
  let self = $(this);
  let regexp = /QT\s+@(\w+)\W/i;
  if(!regexp.test(self.val()))
    return;
  let user_name = regexp.exec(self.val())[1];
  $("label.doing").text("Quote to " + user_name + ":");
  $("#update-submit").val("quote");
}

function createQuoteButton(user_name, status_id, body) {
  return <>
    <li>
      <span class="reply" id="_quote_">
        <span class="reply-icon icon"></span>
        <a id="__QT__" title={"quote to " + user_name}
         href={"/?status= QT @" + user_name + ": " + body +
         "&in_reply_to_status_id=" + status_id +
         "&in_reply_to=" + user_name}>QT</a>
      </span>
    </li>
  </>.toXMLString();
}

function bindQuoteClickEvent() {
  if (/\/status\//.test(location))
    return;

  $("#_quote_:not(.hasClickEvent)").click(function(e){
    setTimeout(function() {
      let self = $(e.target);
      let status_body = self.closest("span.status-body");
      let body = status_body.find("span.entry-content, span.msgtxt").text();
      let user_name = /u-(\w+)/.exec(self.closest("li.hentry").attr("class"))[1];
      $("#status").val(" QT @" + user_name + ": " + body)
        .focus() // 先にbindしたchangeLabelを呼んでいる。
        .attr("selectionEnd", 0);
      $("#in_reply_to_status_id, #in_reply_to").val("");

      if (REPLY_MODE) {
        // 公式RTへQTする場合に必要。
        let status_id = /status(?:es)?\/(\d+)$/.exec(status_body
                        .find(".meta > a").attr("href"))[1];
        $("#in_reply_to_status_id").val(status_id);
        $("#in_reply_to").val(user_name);
      }
    });
  }).addClass("hasClickEvent");
}

// formのsubmitイベントをunbindして、QTを考慮したsubmitイベントを新たにbindする。
function rebindSubmitEvent() {
  $("#status_update_form").unbind("submit");
  var O = $("#status_update_form");
  var A = O.find("#tweeting_button, #update-submit");
  var H = O.find("textarea").isCharCounter();
  var F = /^\s*@(\w+)\W+/;
  var QT = /QT\s+@(\w+)\W/i; // QT判定。
  var J = O.find(".char-counter");
  var E;

  O.submit(function () {
    if (M()) {
      twttr.googleAnalytics("/status/update/refresh");
      var T = H.val();
      E = {
            authenticity_token : twttr.form_authenticity_token,
            status : T,
            twttr : true
      };
      var Q = window.location.href;
      if ($("body").attr("id") == "home" && ((Q.indexOf("page=") ==- 1) || Q.match(/page=1(?!\d)/))) {
        E.return_rendered_status = true;
      }
      var P = $("#in_reply_to_status_id").val();
      var S;
      if ((P && (S = T.match(F) || T.match(QT)))) { // QTでも。
        if (S[1] == $("#in_reply_to").val()) {
          E.in_reply_to_status_id = P;
          //twttr.countAdsReplies && twttr.countAdsReplies(P);
        }
      }
      var R = $("#source").val();
      if (R) {
        E.source = R;
      }
      E.lat = $("#lat").val();
      E.lon = $("#lon").val();
      
      E.place_id = $("#place_id").val();
      E.display_coordinates = $("#display_coordinates").val();
      G(E);
    }
    return false;
  });

  //twitter側のtypo直し。
  function M() {
    var P = H.val();
    if (twttr.isReplyOnlyTweet(P)) {
      location.href = RegExp.$1;
      return false;
    }
    if (P.length > 140) {
      alert(_("That tweet is over 140 characters!"));
      return false;
    }
    else {
      //if (P.replace(/s\+/g, "") == "") { 旧typo
      if (P.replace(/\s+/g, "") == "") { //これが正しいはず。
      //if (P.replace(/s\*/g, "") == "") {//新typo? 「s*」が投稿できない
        return false;
      }
      else {
        A.addClass("btn-disabled").attr("disabled", true);
        return true;
      }
    }
  }

  function G(P) {
    $.ajax({
      type : "POST", dataType : "json", url : "/status/update", data : P,
        beforeSend: function () {
          J.addClass("loading");
          if (document.all) {
            J.html("&nbsp;&nbsp;&nbsp;&nbsp;");
          }
          else {
            J.css("color", "transparent");
          }
        },
      success : K,
      //http://userscripts.org/topics/54844
      error : function(Q) { twttr.statusUpdateError.decider(Q) }
    });
  }

  // C()の記述をカットした。
  // C()はtextareaの内容に合わせてlabelやボタンの表記を変える処理。
  // $("#status").bind("keyup blur focus"にてC()は生きてる。
  function K(P) {
    if (twttr.is.def(P.users)) {
      twttr.User.merge(P.users, true);
    }
    A.removeClass("btn-disabled").removeAttr("disabled");
    var Q = P.text;
    if (P.messageForFlash) {
      (new ShortNotification()).setMessage(P.messageForFlash).show();
    }
    else {
      if (P.errorForFlash) {
        (new InfoNotification()).setMessage(P.errorForFlash).show();
      }
      else {
        if ($("body").attr("id") != "home") {
          (new ShortNotification()).setMessage(_("Your status has been updated!")).show();
        }
        else {
          if (P.status_li) {
            $("#timeline tr.hentry:first").removeClass("latest-status");
            $.Timeline.prepend(P.status_li);
          }
        }
        setCount("#update_count", P.status_count, 250);
        if (P.latest_status) {
          updateTimeAgo();
          $("#latest_status").html(P.latest_status).isCurrentStatus(true);
        }
        $("#place_content").trigger("tweet");
      }
    }
    H.val("").focusEnd();
    $("#in_reply_to_status_id").val("");
    $("#in_reply_to").val("");
    //C("");
    H.trigger("change");
    J.removeClass("loading");
    if (document.all)
      J.text("140");
    else
      J.css("color", "#ccc");
  }
}