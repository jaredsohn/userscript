// ==UserScript==
// @name        MoeFM Upload Helper
// @namespace   http://shinshi.org/
// @description 萌否电台音乐上传助手
// @include     http://moe.fm/upload*
// @version     1.2
// @author      SpringNyan
// @updateURL   https://userscripts.org/scripts/source/185280.meta.js
// @downloadURL https://userscripts.org/scripts/source/185280.user.js
// @grant       none
// ==/UserScript==

//同时上传的最大数目
var MaxTotal = 2;

$(function () {
    var total = 0;

    function uploadifyJson(script) {
        return {
            'uploader': 'http://moe.fm/public/js/uploadify/uploadify.swf',
            'script': escape(script),
            'cancelImg': 'http://moe.fm/public/js/uploadify/cancel.png',
            'buttonImg': 'http://moe.fm/public/images/fm/upload_select.png',
            'height': 33,
            'width': 122,
            'folder': '/upload',
            'auto': false,
            'multi': false,
            'removeCompleted': false,
            'fileExt': '*.mp3',
            'fileDesc': 'Audio Files (.mp3)',
            'sizeLimit': 1024000 * 30,
            'onSelectOnce': function (event, data) {
                $('.upload_link').show();
                $('.upload_doing').hide();
                $('.upload_done').hide();
            },
            'onCancel': function (event, ID, fileObj, data) {
                if ($(".upload_doing").is(":visible")) {
                    $(window.parent.document).find("#btnFinishUpload").click();
                }

                $('.upload_link').hide();
                $('.upload_done').hide();
                $('.upload_doing').hide();
            },
            'onOpen': function (event, ID, fileObj) {
                $('.upload_doing').show();
                $('.upload_link').hide();
                $('.upload_done').hide();
            },
            'onError': function () {
                if ($(".upload_doing").is(":visible")) {
                    $(window.parent.document).find("#btnFinishUpload").click();
                }

                $('.upload_link').hide();
                $('.upload_done').hide();
                $('.upload_doing').hide();
            },
            'onProgress': function (event, ID, fileObj, data) {
                if (data.percentage >= 100) {
                    $('.upload_doing').hide();
                    $('.upload_done').show();
                } else if (data.percentage >= 90) {
                    $('.upload_doing .upload_doing_go').addClass('hide');
                    $('.upload_doing .upload_doing_wait').removeClass('hide');
                } else {
                    $('.upload_doing .upload_doing_go').removeClass('hide');
                    $('.upload_doing .upload_doing_wait').addClass('hide');
                }
                return true;
            },
            'onComplete': function (event, ID, fileObj, response, data) {
                $('#file_uploadUploader').hide();
                $(window.parent.document).find("#btnFinishUpload").click();

                response = str2json(response);
                //console.log(response);
                if (response.status) {
                    $('#file_uploadUploader').hide();
                } else {
                    $('.upload_link').show();
                }
                $('.upload_doing').hide();
                $('.upload_done').html(response.msg).show();
            }
        };
    }

    function uploadFile() {
        var iframes = $("iframe[id^=iframe_]");

        for (var index = 0; index < iframes.length; ++index) {
            if (total >= MaxTotal)
                return;
            if ($(iframes[index]).contents().find(".upload_link").is(":visible")) {
                ++total;
                $(iframes[index]).contents().find("#btnUpload").click();
            }
        }

        if (total == 0)
            $("#btnStartUpload").show();
    }

    function finishUpload() {
        --total;
        uploadFile();
    }

    function startUpload() {
        $("#btnStartUpload").hide();
        total = 0;
        uploadFile();
    }

    function processUpload() {
        $("a:contains('展开上传框')").click();

        $("div[id^=sub_]").first().before('<button id="btnStartUpload">开始上传</button>');
        $("#btnStartUpload").click(startUpload);

        $("div[id^=sub_]").first().before('<button id="btnFinishUpload">完成上传</button>');
        $("#btnFinishUpload").click(finishUpload);
        $("#btnFinishUpload").hide();
    }

    function processForm() {
        $(".upload_link").empty();
        $("[id^=file_upload]").remove();
        $("div").first().prepend('<input id="file_upload" name="file_upload" type="file" />');

        $("div").first().append('<button id="btnUpload">上传</button>');
        $("#btnUpload").click(function () {
            $("#file_upload").uploadifyUpload();
        });
        $("#btnUpload").hide();

        var scriptRegex = new RegExp("'script'\\s*:\\s*escape\\('(.+)'\\),");
        var script = $("script").last().text().match(scriptRegex)[1];

        $("#file_upload").uploadify(uploadifyJson(script));
    }

    switch (location.pathname) {
        case "/upload":
            processUpload();
            break;
        case "/upload/form":
            processForm();
            break;
    }
});