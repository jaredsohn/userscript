// ==UserScript==
// @name           DospyAttachmentDownload
// @namespace      http://userscripts.org/notXX
// @description    Download Dospy Attachment Automatically
// @include        http://bbs.dospy.com/attachment.php?aid=*
// ==/UserScript==

(function() {
    var buttons=document.getElementsByTagName("input");
    for(var i=0,len=buttons.length;i<len;i++) {
        var button=buttons[i];
        if (button.value == "确认下载") 
            button.click();
    }
})();