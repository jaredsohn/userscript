// ==UserScript==
// @name           pixiv auto login
// @namespace      http://efcl.info/
// @include        http://www.pixiv.net/*
// @description    pixivに自動ログインする
// ==/UserScript==
new function(_doc){
    // 各自のログインIDとPASSを入れる
    var opts = {
        id : "",
        pass: "",
    }
    var loginForm = _doc.getElementsByName("loginForm");
    if(!loginForm) return;
    var user = _doc.getElementsByName("pixiv_id")[0];
    var pass = _doc.getElementsByName("pass")[0];
    var check = _doc.getElementsByName("skip")[0];
    if((user && pass) && (opts.id && opts.pass)){
        user.value = opts.id;
        pass.value = opts.pass;
        check.checked = true;
        loginForm[0].submit();
    }
}(document);