// ==UserScript==
// @name        HKGolden Auto LM
// @namespace   userscripts.org
// @author      CKL
// @description Auto LM after replied a post on hkgolden.com
// @include     http://*.hkgolden.com/view.aspx?*
// @include     http://*.hkgolden.com/post.aspx?*
// @grant       GM_xmlhttpRequest
// @version     1.0
// ==/UserScript==

try{
    var sumbitBtn = document.getElementById("ctl00_ContentPlaceHolder1_btn_Submit");
    sumbitBtn.onclick = function(){
        var url = window.location.toString();
        if(url.match(/post\.aspx/))
            var postId = url.match(/\&id=(\d+)/)[1];
        else
            var postId = url.match(/message=(\d+)/)[1];
            
        var textarea = document.getElementById("ctl00_ContentPlaceHolder1_messagetext");
        if(textarea.value != ""){
            bookmarkPost(postId);
        }
    };
    
    function bookmarkPost(str) {
        GM_xmlhttpRequest({
            method: "POST",
            url: "/js/saveBookmark.aspx?messageID=" + str,
            synchronous: false,
        });
    }
}
catch(err){
    console.log(err);
}