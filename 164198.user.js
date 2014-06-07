// ==UserScript==
// @name        Komica myth background override
// @namespace   home.ben2613
// @description override the bg of the myth
// @include     http://myth.nagatoyuki.org/*
// @exclude     http://myth.nagatoyuki.org/src/*
// @version     1
// @grant       none
// ==/UserScript==
var body = document.getElementsByTagName('body')[0];
body.style.backgroundImage = 'url(http://myweb.polyu.edu.hk/~11513984d/bg.php?.png)';
body.style.backgroundRepeat ='no-repeat';
body.style.backgroundPosition ='bottom right';
body.style.backgroundAttachment = 'fixed';
document.getElementById('postform').innerHTML=document.getElementById('postform').innerHTML.replace('名 稱','褲襪的名字').replace('E-mail','Panty-Mail').replace('標 題','褲襪的品牌').replace('內 文','褲襪的描述').replace('附加圖檔','附加褲襪').replace('刪除用密碼','脫褲襪密碼');
document.getElementById('contents').innerHTML = document.getElementById('contents').innerHTML.replace(/無名氏/g, '褲襪信者').replace(/無標題/g, '褲襪萬歲').replace(/無內文/g, '無褲襪');
document.getElementsByTagName('h1')[0].innerHTML=document.getElementsByTagName('h1')[0].innerHTML.replace('流言終結','褲襪');
document.getElementsByTagName('span')[0].innerHTML=document.getElementsByTagName('span')[0].innerHTML.replace('流言止於智者，廚由C4解決...','裸足止於褲襪，褲襪歸於褲襪太郎...');
