// ==UserScript==
// @name           Twilog checker
// @namespace      http://efcl.info/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
window.addEventListener("load", function() {
    if (!unsafeWindow.$LAB) {
        try {
            var userName = document.getElementsByName("page-user-screen_name")[0].content;
            isAccount(userName);
        } catch(e) {
        }
    } else { // 新UI
        var newUI = true;
        (function() {
            if (!(unsafeWindow.twttr && unsafeWindow.twttr.profileUser)) {
                setTimeout(arguments.callee, 100);
                return;
            }
            var userName = unsafeWindow.twttr.profileUser.screenName;
            isAccount(userName);
        })();
    }


    function makeLink(isAccount, userName) {

        var setPoint = document.getElementById("profile-image");
        var aTag = document.createElement("a");
        aTag.href = "http://twilog.org/" + userName;
        var imgTag = document.createElement("img");
        if (isAccount == 1) {
            imgTag.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA8ElEQVQ4jaWTwQmEMBBFrSkV2IAVbANWkApswApswArsQBA8CDkIAQ+CB0HIQdhD4O/hExKzuih7GJxJZl5mfkxSTEC1AKK7b2FN0hoAeAaoFkDtEQAAmu24KTXXX4qxsUA5M87HCNAaboYdlTN9l+zywpyvEc4AUgNpT79eI4BLUjsLwthY+sYC85t+MUUAJ4rTIO15CsCiavEgp/xBRNGxqNm8WE8sER1FAtj+3wCp/bz1yu7isaT+ATCWpna/diZsNlwAwlHO7j3+Nx51kI8XgGxgkdTXGhQTv+7KD4A7Fr4ZYwl7BHDvpF69gKIDPhgLYvdnwxfVAAAAAElFTkSuQmCC";
        } else {
            imgTag.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgElEQVQ4jZWTPUvDYBDHn49hv4C4iBIHNymIOGVSB3EQhICjUza3foEuDqngJviCkxXpoE95lrYEMggRhULBYEFBCDQgGPw5HGlT+4IOR57L3f1y978nqtSBky5Y/t8tq9k+DVDNGOB/gJMudG419RV7AACofUgwTCTRbcv7nVD8OIVyBIfnLV7mFnA8PQA0YwnmOypHct5/Fh8grGqS+UVotbB8RkcYB3DbUAyAIOB13Sas6n6OypLCRAryfpzKOU7hzTRAKSo3wdBHVCZKpkExgMt38aNPifXqBjY2uK42+iJmOinLl6Lax0CsvDme5nHOYu/YjN2IsnwRCaT938X+UhHH0xNXOgJw29I6xhDZmxxU7kfGcttTAHEqM3/NFMCYicLaDxMAGEO4tcvesenfj2l3YwhwcWX4LhTo1Q1hMoDmi8YC7Afo3WnCVZujMyMaIHMXA7FSR57ZyocAjqdpLK9NVTv/z8SpwCwflONpnmYXphZnszdj6SoT0PLhB/Y0R/5buIOKAAAAAElFTkSuQmCC";
        }
        aTag.appendChild(imgTag);
        if (newUI) {
            var ins = document.querySelector(".full-name");
        } else if (setPoint) {
            var ins = setPoint.parentNode.parentNode;
        } else {
            var ins = document.getElementsByClassName("thumb clearfix")[0];
        }
        ins.appendChild(aTag);
    }

    function isAccount(userName) {
        if (userName) {
            GM_xmlhttpRequest({
                method : 'get',
                url    : 'http://twilog.org/user-exist.cgi?id=' + userName,
                onload : function(res) {
                    var result = res.responseText;
                    makeLink(result, userName);
                },
                onerror: function(res) {
                    GM_log(res.responseText)
                }
            })
        }
    }

}, false)