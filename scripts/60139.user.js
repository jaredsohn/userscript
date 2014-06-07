// ==UserScript==
// @name           Nico Autologin
// @namespace      http://efcl.info/
// @include        http://www.nicovideo.jp/watch/*
// @include        https://secure.nicovideo.jp/secure/login_form*
// @require https://raw.github.com/azu/usconfig/v1.2.1/usconfig.js
// @resource usconfigcss https://raw.github.com/azu/usconfig/v1.2.1/usconfig.css.template
// ==/UserScript==

//-------------------------------------
// 処理
//-------------------------------------
Config.define('usc_basic', function() {
    with (this.builder) {
        dialog(
                "ログイン設定",
        { width: 500, height: 250 },

                section(
                        "ユーザー設定",
                        "メールアドレスとパスワードを設定して下さい",

                        grid(
                            // text area
                                text("ログインメールアドレス", 'mail', "", { size: 20 }), '\n',
                                text("パスワード", 'pass', "", { size: 20 })
                                )
                        )
                )
    }
}, {
    aftersave: function() {
        location.reload();
    }
});

GM_registerMenuCommand("Nico Autologin Config", function(){
    Config.open();
});
var settings = Config.load();
// ニコニコ動画ログイン用メールアドレス
var myMailAddress = settings.mail;
// ニコニコ動画ログイン用パスワード
var myPassword = settings.pass;

var nURL = location.href;
if (nURL.indexOf("http://www.nicovideo.jp/watch/") != -1) {
    var pl = document.getElementById("flvplayer_container");
    if (!pl) {
        var loginA = document.querySelector(".loginButton");
        location.href = loginA.getAttribute("href");
    } else {
        return false;
    }
} else if (nURL.indexOf("https://secure.nicovideo.jp/secure/login_form") != -1) {
    var mailBox = document.getElementById("mail");
    var passBox = document.getElementById("password");
    if (mailBox && passBox && myMailAddress && myPassword) {
        mailBox.value = myMailAddress;
        passBox.value = myPassword;
        if (!document.querySelector(".wrongPass").hasChildNodes()) {
            document.querySelector(".loginFormWrap form").submit();
        }
    } else {
        Config.open()
    }
}

