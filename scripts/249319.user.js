// ==UserScript==
// @name        百度网盘磁力链接下载
// @namespace   http://use.i.E.your.homepage/
// @version     0.41
// @modified    ledudu
// @description 给百度网盘离线下载增加磁力链功能
// @match       http://pan.baidu.com/disk/home*
// @copyright   2014+,ledudu,手搓火球又一年，卡饭p584582439
// ==/UserScript==

/**
 * Chrome 扩展更新地址
 * http://chromeapp.duapp.com/chrome-apps/chrome-dupan-update.xml
 * 仅做保存，细微修改
 */
(function() {
var $ = unsafeWindow.jQuery;
var FileUtils = unsafeWindow.FileUtils,
    Utilities = unsafeWindow.Utilities,
    disk = unsafeWindow.disk,
    Page = unsafeWindow.Page;

$("#barCmdOffline").parent().after("<li class='b-list-item'><a class='icon-btn-download' href='javascript:;' id='mangnet'>磁力链接</a></li>");

var txt1 = "<div id='mangnetbox' class='b-panel b-dialog box-shadow4 bdr-rnd-3 newoffline-dialog' style='display: none; left: 402px; top: 191.5px;'><div class='dlg-hd b-rlv'><span title='关闭'  class='dlg-cnr dlg-cnr-r guanbi'></span><h3>磁力链接任务</h3></div><div class='dlg-bd clearfix'><div class='tab-content-mail'><form action='' onsubmit='return false'><dt class='dlg-inner-t left gray2'>填写要下载的文件链接</dt><dl class='form-flds'><dt>文件链接：</dt><dd class='clearfix'><div class='b-input b-fl b-share-n'><input id='mangnet-link' style='background: none repeat scroll 0 0 #FFF;border: 1px solid #C4C4C4;padding: 3px;width: 500px;height: 18px;' type='text'><label style='left: 5px;top: 4px;width: 300px;color: #B7B5B5;font-size: 12px;'>magnet:?xt=urn:btih:</label></div></dd><dt class='dlg-inner-f error center red hidden youwu'>链接格式有误</dt></dl><dt class='dlg-inner-bottom'><span class='dlg-inner-bottom-path ellipsis' title='我的网盘/全部文件'>保存到：我的网盘/全部文件</span><div href='javascript:;' hidefocus='true' class='mbtn'><b>更改</b></div></dt></form></div></div><div class='dlg-ft b-rlv'><div class='alert-dialog-commands b-rlv clearfix'><a href='javascript:;' class='abtn b-fr guanbi'><b>关闭</b></a><a href='javascript:;' id='queren' class='sbtn b-fr'><b>确定</b></a></div></div></div>";
$("body").append(txt1);

var script = document.createElement("script");
script.textContent = '$("div.mbtn").click(function(){disk.ui.NewOfflineDialog.prototype.openSelectDirDialog()});';
(document.head || document.documentElement).appendChild(script);

$("#mangnet").click(function() {
    $("#mangnet-link").val("");
    $("#mangnetbox").css("display", "block");
});

$(".guanbi").click(function() {
    $("#mangnetbox").css("display", "none");
    $(".b-canvas").css("display", "none");

});

var str = $("script").text();
n = str.indexOf("FileUtils.bdstoken");
m = str.indexOf("FileUtils.is_vip", n);
bdstoken = str.slice(n + 20, m - 2);

var url = "http://pan.baidu.com/rest/2.0/services/cloud_dl?bdstoken=" + bdstoken

$("#queren").click(function() {
    var path = $(".dlg-inner-bottom-path").attr("title").substring(9);
    if (path == "") path = "/";
    var str = $("#mangnet-link").val();
    a1 = str.indexOf('xt=urn:btih:');
    if (a1 == -1) {
        $(".youwu").attr("class", "dlg-inner-f error center red youwu");
    } else {
        a2 = str.indexOf("&", a1);
        if (a2 == -1) {
            str = str.substring(a1 + 12);
        } else {
            str = str.substring(a1 + 12, a2);
        }
        str = str.toUpperCase();
        $.getJSON("http://pan.baidu.com/api/categorylist?channel=chunlei&category=7&num=1&page=1", function(json) {
            $.post(url, {
                    method: "add_task",
                    app_id: "250528",
                    source_path: json.info[0].path,
                    file_sha1: str,
                    save_path: path,
                    type: "2",
                    task_from: "2"
                },
                function(data, status) {
                    if (status == "success") {
                        location.reload();
                        //$("#mangnetbox").css("display", "none");
                        //$(".b-canvas").css("display", "none");
                        //$("#barCmdOfflineList").click();
                    } else {
                        Utilities.useToast({
                            toastMode: disk.ui.Toast.MODE_CAUTION,
                            msg: '离线下载失败',
                            sticky: false
                        });
                    }
                })
            .fail(function(xhr, textStatus, errorThrown) {
                console.error(xhr.responseText);
                Utilities.useToast({
                    toastMode: disk.ui.Toast.MODE_CAUTION,
                    msg: '离线下载失败，文件不存在',
                    sticky: false
                });
            });
        });
    }
});
})();