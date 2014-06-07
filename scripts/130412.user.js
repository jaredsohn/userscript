// ==UserScript==
// @name          Sasayaki plus
// @namespace     http://userstyles.org
// @description   自分宛のメンションを強調し、アイコン画像からプロフィールに飛べるようにする 
// @author        kawau
// @match         https://croudia.com/*
// @version       0.1
// ==/UserScript==

var cookies, username, atname;

// Add class name
function add_class_name(obj,add_classes){
    var tmp_hash = new Array();
    var new_class_names = new Array();
    var class_names = obj.className.split(" ").concat(add_classes.split(" "));
    for(var i in class_names){if(class_names[i] != ""){tmp_hash[class_names[i]] = 0;}}
    for(var key in tmp_hash){new_class_names.push(key);}
    obj.className = new_class_names.join(" ");
}

// Delete class name 
function delete_class_name(obj,delete_classes){
    var new_class_names = new Array();
    var class_names = obj.className.split(" ");
    var delete_class_names = delete_classes.split(" ");
    for(var i in class_names){
        var flag = true;
        for(var j in delete_class_names){
            if(class_names[i] == delete_class_names[j]){flag = false;break;};
        }
        if(flag){new_class_names.push(class_names[i])}
    }
    obj.className = new_class_names.join(" ");
}


// usernameの取得 
function  getUserName() {
    var cookies, name;
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
    var range, a;
    var tanzaku, voices, yomihito, sasayaki;
    voices = document.querySelectorAll('li[data-theme] div.ui-btn-text a[href^="/voices/show"]:not([fixed])');
    //console.log(voices.length);

    if (voices) {
        for (var i=0, max=voices.length; i<max; i++) {

            // アイコン画像のリンク先をその人のプロフィール画面にする
            yomihito = voices[i].querySelector('p:nth-child(2) span.gray').textContent.replace(/^ @/, '');
            range = document.createRange(),
            a = document.createElement("a");
            range.selectNode(voices[i].querySelector('img:first-child'));
            range.surroundContents(a);
            voices[i].querySelector('a:first-child').href = '/' + yomihito;

            // 自分宛のささやきの色を変更
            sasayaki = voices[i].querySelector('p:nth-child(3)').textContent;
            if (sasayaki.match(atname)) {
                tanzaku = voices[i].parentNode.parentNode.parentNode;
                delete_class_name(tanzaku, 'ui-btn-up-c');
                add_class_name(tanzaku, 'ui-btn-up-e');
            }
            voices[i].setAttribute('fixed' ,'1');
        }
    }
}

getUserName();
setInterval(fixSasayaki, 1000);

