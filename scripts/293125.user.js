// ==UserScript==
// @name           p2 Auto Login
// @namespace      http://p2.2ch.net/
// @include        http://p2.2ch.net/p2/
// @include        http://*.p2.2ch.net/p2/
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
        location.replace(location.href);
    }
});

var settings = Config.load();
// P2ログイン用メールアドレス
var myMailAddress = settings.mail;
// P2ログイン用パスワード
var myPassword = settings.pass;
var info = document.querySelector("p.infomsg:nth-child(3)");
if (info && myPassword) {
 if (info.innerHTML.match(/error/)) {
  myPassword = "";
 }
}

var nURL = location.href;
if (nURL.indexOf("2ch.net/p2/") != -1) {
    var mailBox = document.querySelector("#login > input[name='form_login_id']");
    var passBox = document.querySelector("#login > input[name='form_login_pass']");
    if (mailBox && passBox && myMailAddress && myPassword) {
        mailBox.value = myMailAddress;
        passBox.value = myPassword;
        document.querySelector("#login > input[name='submit_userlogin']").click();
   }else {
        Config.open()
    } 
}


