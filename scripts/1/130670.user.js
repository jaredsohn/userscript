// ==UserScript==
// @name          Croudia Plain Sasayaki
// @namespace     http://userstyles.org
// @description   ささやきから引用文を削除する　発言者名の@を取る
// @author        kawau
// @match         https://croudia.com/*
// @version       0.1
// ==/UserScript==

var cookies, username, atname;

// usernameの取得 
function  getUserName() {
    if (document.cookie) {
        cookies = document.cookie.split("; ");
        for (var i=0, max=cookies.length; i < max; i++) {
            var str = cookies[i].split("=");
            if (str[0] === 'username') {
                username = str[1];
                atname = '@' + username;
                break;
            }
        }
    }
}

function fixSasayaki() {
    var tanzaku, voices, yomihito, sasayaki;
    voices = document.querySelectorAll('li[data-theme] div.ui-btn-text a[href^="/voices/show"]:not([fixed_s])');

    if (voices) {
        for (var i=0, max=voices.length; i<max; i++) {

            // 名前横の@を取る
            yomihito = voices[i].querySelector('p:nth-child(2) span.gray');
            yomihito.textContent = yomihito.textContent.replace(/^ @/, ' ');

            // 自分に関係のない引用文以下全削除
            sasayaki = voices[i].querySelector('p:nth-child(3)');
            if (!sasayaki.textContent.match(atname)) {
                sasayaki.textContent = sasayaki.textContent.replace(/ *SP @\w{6,} (.|\n)*$/, '');
            }
            voices[i].setAttribute('fixed_s' ,'1');
        }
    }
}

getUserName();
setInterval(fixSasayaki, 1000);

