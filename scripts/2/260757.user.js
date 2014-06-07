// ==UserScript==
// @name           Sina Video upload auto resumer
// @namespace      http://m13253.blogspot.com/
// @author         Star Brilliant <m13253@hotmail.com>
// @description    Automatic resume uploading for Sina Video
// @include        http://upload.video.sina.com.cn/nupload.php*
// @copyright      General Public License version 3
// @warranty       No warranty, use at your own risk
// @grant          none
// ==/UserScript==

function _find_resume_btn() {
    var a = document.getElementsByTagName("a");
    for(i in a)
        if(a[i].innerHTML=="继续上传") // No ID, no name, I have to use innerHTML
            return a[i]; // FIXME: You can only upload one video at a time
    return null;
}

function _click_resume_btn(a) {
    if(a.style.display!="none") { // Upload failure
        a.click();
        console.log("Automatically resumed.");
    }
}

function _start_auto_resume() {
    var a = _find_resume_btn();
    if(a) {
        console.log("Found resume button:");
        console.log(a[i]);
        setInterval(function () { _click_resume_btn(a); }, 1000);
    } else { // Upload has not started
        console.log("Did not find resume button, retrying.");
        setTimeout(_start_auto_resume, 3000);
    }
}

setTimeout(_start_auto_resume, 3000);
