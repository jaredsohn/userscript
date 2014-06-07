// ==UserScript==
// @name        Coursera Downloader
// @namespace   http://userscripts.org/users/maxb3k
// @description Download Coursera resources(mp4, pdf, ppt, txt, srt...) from 'Video Lectures' page. Link 'Download All Materials' should appear left of the Coursera link 'Help'.
// @match       https://class.coursera.org/*/lecture/index
// @match       https://class.coursera.org/*/lecture/*
// @match       https://class.coursera.org/*/lecture
// @version     1.0
// ==/UserScript==

/**
 * The function will be injected as <script> node and executed within Coursera page.
 * No unsafeWindow available, only the plain original window.
 * This GreaseMonkey recipe has the following advantages:
 * 1. cross-browser(Firefox, Chrome, Chrome+TamperMonkey, ?Opera?).
 * 2. you can use jQuery available on target page.
 */
function GM_main() {
    //private members
    const delayBetweenDownloadStart = 1000; //ms
    const downloadResources = [];

    var previewStyles = '<style> \
    .cd-download-preview { display:none; top: 0; position: fixed; width: 100%; background: rgba(0,0,0,.85); z-index: 100 } \
    .cd-container { padding-top: 20px; color: #ffffff; vertical-align: top; width: 80%; margin: 0 auto 0 auto; } \
    .cd-header { float:left; font-size: 24px; line-height: 42px; font-weight: bold} \
    .cd-btn { float:right; vertical-align: top; font-size: 14px; margin-left: 10px} \
    .cd-resources-list {float:left; width: 100%; height: 340px; overflow: auto; margin: 10px 0px; padding-left: 40px} \
    </style>';

    var previewHtml =
        '<div class="cd-download-preview"> \
        <div class="container-fluid cd-container" > \
        <div class="cd-header">The following files will be downloaded</div> \
        <a onclick="CD.showHidePreview()" class="cd-header cd-btn">&nbsp;Close</a> \
        <a onclick="CD.downloadAll()" class="cd-header cd-btn">&nbsp;Download</a> \
        <ol class="cd-resources-list"><li class="cd-resources-file-item"></li></ol> \
        </div> \
        </div>';

    var previewBtn =
        '<a class="coursera-reporter-link" \
        style="padding-right:20px" \
        title="Click here to get preview of video materials download" \
        onclick="CD.showHidePreview()">\
        Download All Materials\
        </a>';

    function injectButton() {
        var btnContainer = $("h2.course-page-header");
        if (btnContainer.length) {
            btnContainer.append(previewBtn);
        } else {
            return false;
        }
        return true;
    }

    function injectPreview() {
        $("head").append(previewStyles);
        $("body").append(previewHtml);
        var fileNamesContainer = $(".cd-resources-list");
        var li = $(".cd-resources-file-item");
        li.remove();
        for (var i = 0; i < downloadResources.length; i++) {
            var fileName = downloadResources[i][1];
            var newLi = li.clone();
            newLi.text(fileName);
            fileNamesContainer.append(newLi);
        }
    }

    function extractResources() {
        $(".course-item-list .course-item-list-header + ul.course-item-list-section-list").each(
            function () {
                // ul elem
                var groupName = $(this).prev().find("h3").text().trim();

                $(this).find("li").each(
                    function () {
                        var lessonName = formatLessonName($(this).find("a.lecture-link").text().trim());
                        $(this).find(".course-lecture-item-resource a").each(
                            function () {
                                var resourceName = $(this).attr('title').trim();
                                var resourceUrl = $(this).attr('href').trim();
                                var fileExtension = guessResourceExtension(resourceUrl);
                                var fileName = formatFileName(groupName + " - " + lessonName + ' - ' + resourceName + "." + fileExtension);
                                downloadResources.push([$(this), fileName]);
                            }
                        )
                    }
                )
            }
        )
    }

    function downloadResource(index) {
        //jQuery element
        var resourceElem = downloadResources[index][0];
        //native element
        var resourceNativeElem = resourceElem[0];
        //computed file name
        var fileName = downloadResources[index][1];

        //add new HTML5 'download' attribute in order to make <a> resource downloadable by programmatically click
        resourceElem.attr('download', fileName);

        //the click MUST be native, not jQuery
        var clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        resourceNativeElem.dispatchEvent(clickEvent);

        //restore state of <a>
        resourceElem.removeAttr('download');
        if (index + 1 < downloadResources.length) {
            setTimeout(function () {
                downloadResource(index + 1)
            }, delayBetweenDownloadStart);
        }
    }

    function formatLessonName(str) {
        return str.replace(/\(\d+:\d*:?\d*\)\s*$/, "").trim();
    }

    function formatFileName(str) {
        var replaceChar = '';
        return str
            .replace(/[,/\:*?""<>|]/g, replaceChar) // forbidden characters
            .replace(/^\./, replaceChar); // cannot start with dot (.)
    }

    function guessResourceExtension(url) {
        var urlParts = url.split('?');
        var ext = /\.(\w{1,5})$/g.exec(urlParts[0]) || /format=(\w{1,5})$/g.exec(urlParts[1]);
        return ext ? ext[1] : "";
    }

    function doTheJob() {
        if (injectButton()) {
            extractResources();
            injectPreview();
        }
    }

    //public members
    return {
        init: function () {
            if (window.$) {
                doTheJob();
            } else {
                //don't know why, but Courseras jQuery not available from the very beginning, we should wait about 1 sec
                setTimeout(arguments.callee, 2000);
            }
        },
        showHidePreview: function () {
            $(".cd-download-preview").slideToggle("fast");
        },
        downloadAll: function () {
            downloadResource(0);
        }
    };
}

/**
 * Insert new <script> node to DOM
 * @param text script text
 */
function addJS(text) {
    var scriptNode = document.createElement('script');
    scriptNode.type = "text/javascript";
    scriptNode.textContent = text;
    var targ = document.getElementsByTagName('head')[0] || document.body || document.documentElement;
    targ.appendChild(scriptNode);
}

addJS('var CD = (' + GM_main.toString() + ')(); CD.init();');