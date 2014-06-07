// ==UserScript==
// @name EnglishPodLessonMp3Player
// @namespace englishpod.lesson
// @description let you listen EnglishPod lesson more convenient. 1. play lesson mp3 and open lesson transcript PDF at once when you open a lesson; 2. loop play mp3; 3. click those mp3 links on the right will play it online on the current page.
// @include http://englishpod.com/lessons/*
// @match http://englishpod.com/lessons/*
// @author www.douban.com/people/ufologist/
// @version 1.0
// ==/UserScript==
/**
 * 让你更方便地收听EnglishPod的课程
 * 1. 打开Lesson页面立刻播放Full Lesson (Radio Quality) mp3, 打开Lesson Transcript PDF
 * 2. 循环播放mp3
 * 3. 点击右侧的(mp3)链接即可在线播放
 * 
 * FIXME Firefox目前实现的video, audio不支持mp3, 因此无法在线收听
 * http://www.w3schools.com/html5/html5_audio.asp
 */
(function() {
    var mp3Player;

    function initMp3Player() {
        var flashMp3Player = document.getElementsByTagName("embed")[0];

        var relativeOffset = getOffset(flashMp3Player);
        // element.height is a string
        relativeOffset.top = relativeOffset.top + Number(flashMp3Player.height);
        var fullLessonMp3Url = getUrlParam(flashMp3Player.getAttribute("flashvars"), "url2");

        mp3Player = document.createElement("video");
        mp3Player.src = fullLessonMp3Url;
        mp3Player.autoplay = true;
        mp3Player.loop = true;
        mp3Player.controls = true;
        mp3Player.width = flashMp3Player.width;
        mp3Player.height = flashMp3Player.height;
        mp3Player.style.position = "absolute";
        mp3Player.style.left = relativeOffset.left + "px";
        mp3Player.style.top = relativeOffset.top + "px";

        document.body.appendChild(mp3Player);
    }

    function initClickLessionMp3Behavior() {
        var lessionDownloadTable = document.getElementsByClassName("table-lessondown")[0];
        var anchors = lessionDownloadTable.getElementsByTagName("a");

        for (var i = 0, length = anchors.length; i < length; i++) {
            var anchor = anchors[i];
            if (anchor.href.indexOf(".mp3") != -1) {
                anchor.addEventListener("click", function(event) {
                    event.preventDefault();
                    mp3Player.src = event.currentTarget.href;
                }, false);
            }
        }
    }

    /**
     * 打开课件教材的PDF文档.
     * 需要设置浏览器"始终允许显示 englishpod.com 的弹出式窗口" 
     */
    function openLessonTranscriptPdf() {
        var lessionDownloadTable = document.getElementsByClassName("table-lessondown")[0];
        var anchors = lessionDownloadTable.getElementsByTagName("a");

        var screenWidth = screen.availWidth;
        var screenHeight = screen.availHeight;

        for (var i = anchors.length - 1; i >= 0; i--) {
            var anchor = anchors[i];
            var url = anchor.href;
            if (url.indexOf(".pdf") != -1) {
                var pdfWindow = window.open(url, "LessonTranscriptPdfWindow",
                    "width=" + screenWidth + ", height=" + screenHeight);
                // FIXME 全屏打开窗口, 造成整个屏幕都是这个窗口, Windows的任务栏都被遮挡住了.
                break;
            }
        }
    }

    /**
     * @see http://www.quirksmode.org/js/findpos.html
     */
    function getOffset(element) {
        var x = y = 0;
        if (element.offsetParent) {
            do {
                x += element.offsetLeft;
                y += element.offsetTop;
            } while (element = element.offsetParent);
        }
        return {left: x, top: y};
    }

    /**
     * @see http://snipplr.com/view/26662/
     */
    function getUrlParam(url, name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
        if (!results) { return 0; }
        return results[1] || 0;
    }

    // 对chrome特殊照顾, 判断哪些网站应该运行该脚本
    // 虽然chrome原生态支持Greasemonkey script, 但script中的@include会失效, 为虾米?
    // http://www.chromium.org/developers/design-documents/user-scripts
    // 这里说@match能行, 但我试过后还是不行, 再度失望, 只好自己通过正则来实现.
    var regExp = /englishpod.com\/lessons\/[^\/]+$/i;
    var url = document.location.href;
    if (regExp.test(url)) {
        initMp3Player();
        openLessonTranscriptPdf();
        initClickLessionMp3Behavior();
    }
})();
