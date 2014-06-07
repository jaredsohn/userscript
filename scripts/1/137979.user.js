// ==UserScript==
// @name           FShareVn Fix
// @namespace      fsvnfix
// @author         pmk_1992 - Đứa Con Của Gió
// @description    Fix lỗi ngớ ngẩn "Tài khoản này đang được sử dụng trên máy khác"
// @include        http://www.fshare.vn/file/*
// @include        http://fshare.vn/file/*
// ==/UserScript==

window.onload=function(){
    if(document.getElementsByName("frm_download")[0].method != 'post' && document.getElementsByName("frm_download")[0].method != 'POST') {
        document.getElementsByName("frm_download")[0].setAttribute('method', 'post');
        document.getElementsByClassName('bt_down')[3].setAttribute('onclick', 'document.frm_download.submit();');
        alert('Đã unlock limit,\nbây giờ bạn có thể bỏ qua thông báo\n"Tài khoản này đang được sử dụng trên máy khác...."\nChọn "Download nhanh" (VIP) để download :D\nChúc các bạn vui vẻ\n              Pmk_1992 - Đứa Con Của Gió');
    }
}

function getElementsByClassName(className, tag, elm){
    var testClass = new RegExp("(^|s)" + className + "(s|$)");
    var tag = tag || "*";
    var elm = elm || document;
    var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;
    var length = elements.length;
    for(var i=0; i<length; i++)
    {
        current = elements[i];
        if(testClass.test(current.className))
        {
            returnElements.push(current);
        }
    }
    return returnElements;
}