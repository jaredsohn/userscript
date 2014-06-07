// ==UserScript==
// @name           DospyAttachmentDirectDownload
// @namespace      exzhawk
// @version    0.1
// @description    Download Dospy Attachment Directly
// @include        http://bbs.dospy.com/*
// ==/UserScript==

(function() {
    var att=document.getElementsByTagName("a");
    for(var i=0,len=att.length;i<len;i++) {
        try { att[i].href = att[i].href.replace("attachment","1111258attachdown");
        } catch(e){};
    }
})();