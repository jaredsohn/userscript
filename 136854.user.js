// ==UserScript==
// @id             www.nicovideo.jp-ab847204-b23a-4a76-8703-014f6139485e@http://lpha38.net/
// @name           Niconico Simple add mylist
// @description    ニコニコ動画の動画視聴ページからマイリストを追加します。
// @version        0.2.2
// @namespace      http://lpha38.net/
// @author         lpha38
// @include        http://www.nicovideo.jp/watch/*
// @run-at         document-end
// @iconURL        http://uni.res.nimg.jp/img/favicon.ico
// @updateURL      http://userscripts.org/scripts/source/136854.user.js
// ==/UserScript==
(function () {
    // ---------  initilize ------------
    var w = typeof unsafeWindow == "undefined" ? window : unsafeWindow, document = w.document;
    var DEBUG_MODE = false, VERSION = "0.2.2", TAG = "[nsam]";
    var log = function () { if (DEBUG_MODE) return w.console.log.apply(w.console, Array.prototype.concat.apply([TAG], arguments)); };
    var $ = w.jQuery;

    log("start");
    
    // ページ読み込み後
    $(function () {
        log("page loaded");

        // ---------- constant values --------------
        var API_DEFLIST_ADD = "/api/deflist/add";
        var API_MYLIST_ADD = "/api/mylist/add";
        var API_MYLISTGROUP_LIST = "/api/mylistgroup/list";
        var succesMessage = "登録が完了しました";
        var faildMessage = "登録中にエラーが発生しました";
        
        // ----------- mylist apis ------------------
        var apis = {
            call: function (url, params, callback) {
                new $.ajax({
                    url: url,
                    data: params,
                    complete: function (xhr) {
                        var data;
                        var succes = false;
                        if (xhr.statusText == "OK") {
                            data = JSON.parse(xhr.responseText);
                            succes = data.status == "ok";
                        }
                        callback(data, succes);
                    }
                });
            },
            // マイリストグループの取得
            listMylistGroup: function (callback) {
                this.call(API_MYLISTGROUP_LIST, {}, function (data, succes) {
                    callback(succes, data.mylistgroup, data.error);
                });
            },
            // とりあえずマイリストへ追加
            addDeflist: function (videoId, description, token, callback) {
                this.call(API_DEFLIST_ADD, {
                    item_type: 0,
                    item_id: videoId,
                    description: description,
                    token: token
                }, function (data, succes) {
                    callback(succes, data.error);
                });
            },
            // マイリストへ追加
            addMylist: function (videoId, groupId, description, token, callback) {
                this.call(API_MYLIST_ADD, {
                    item_type: 0,
                    item_id: videoId,
                    group_id: groupId,
                    description: description,
                    token: token
                }, function (data, succes) {
                    callback(succes, data.error);
                });
            }
        };
        
        // HTMLエスケープ
        var escapeHTML = function (str) {
            return str == null ? "" : str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#039");
        }
        
        // メッセージ用jQueryプラグイン
        $.fn.nsam_message = (function () {
            var timer = 0;
            return function (message) {
                clearTimeout(timer);
                var $target = $(this);
                $target.stop().hide().text(message).fadeIn(300, function () {
                    timer = setTimeout(function () {
                        $target.fadeOut(300);
                    }, 8000);
                });
            }
        })();
        
        // マイリストの更新
        var initilize = function () {
            log("initilize()");
            
            apis.listMylistGroup(function (succes, mgroups, error) {
                $(".nsan_mylistgroup").text("").each(function (i, select) {
                    if (succes) {
                        var $select = $(select);
                        $select.append($('<option />').val(-1).text("とりあえずマイリスト"));
                        $(mgroups).each(function (i, g) {
                            $select.append($('<option />').val(escapeHTML(g.id)).text(escapeHTML(g.name)));
                        });
                        if (mgroups.length > 0) {
                            $select[0].selectedIndex = 1;
                        }
                    }
                });
            });
        }
        
        // マイリスト登録
        var isRunning = false;
        var run = function () {
            var $message = $("#nsam_message");
            if (isRunning) {
                $message.nsam_message("処理中です。");
                return;
            }
            isRunning = true;
            
            var $isOrigin = $(".nsam_isorigin:visible");
            var isOrigin = $isOrigin.length > 0 ? $isOrigin[0].checked : false;
            var $isReview = $(".nsam_isreview:visible");
            var isReview = $isReview.length > 0 ? $isReview[0].checked : false;
            var vid = w.WatchJsApi.video.getVideoID();
            var cid = location.href.match(/^http:\/\/www\.nicovideo\.jp\/watch\/((so|sm|nm|)\d+)/);
            if (cid) cid = cid[1];
            var id = isOrigin ? vid || cid : cid || vid;
            
            log("run:", isOrigin, isReview, vid, cid);
            
            var group = $(".nsan_mylistgroup:visible").val();
            var comment = $(".newVideoReview:visible").val();
            var data = JSON.parse($("#watchAPIDataContainer").text());
            var token = data.flashvars.csrfToken;
            
            log("run:", id, group, comment, token);
            
            var registerCallback = function (s, e) {
                if (s) {
                    $message.nsam_message(succesMessage);
                    if (isReview) {
                        $("#videoReviewForm .inputSubmit input[type='submit']").click();
                    } else {
                        $("#videoReviewForm textarea").val("");
                    }
                } else {
                    $message.nsam_message(e ? (e.description || "").replace("\n", "<br>") : faildMessage);
                }
                isRunning = false;
            }
            
            if (id) {
                if (group < 0) {
                    apis.addDeflist(id, comment, token, registerCallback);
                } else {
                    apis.addMylist(id, group, comment, token, registerCallback);
                }
            }
        }
        
        $("head").append('\
<style type="text/css">\
  .nsam_clear { clear: right; }\
  .nsan_mylistgroup { display: block; float: right; }\
  .nsam_footer { clear: right; text-align: right; }\
  .nsam_addmylist { background: #333; border: 0; color: #fff; padding: 0px 12px; height: 24px; line-height: 24px; cursor: pointer; }\
  #nsam_message { position: relative; display: inline; height: 0; padding: 1px 3px; background: #000; color: #fff; opacity: 0.8;  }\
</style>\
');

        $('\
<div id="nsam_message" style="display: none;" />\
<div class="nsam_container nsam_clear">\
  <select class="nsan_mylistgroup" style="margin: 0 0 3px 0;"></select>\
  <div class="nsam_footer">\
    <input type="checkbox" class="nsam_isreview" value="1" />レビュー\
    <input type="checkbox" class="nsam_isorigin" value="1" checked />元動画\
    <button class="nsam_addmylist">登録</button>\
  </div>\
</div>\
').insertAfter($("#videoReviewForm"));
        
        $(".videoReviewAllow").removeClass("videoReviewAllow").show();
        $(".videoReviewDeny").removeClass("videoReviewDeny").hide();
        
        $(".nsam_addmylist").click(run);
        setTimeout(initilize, 2000);
        
        log("end");
    });
})();