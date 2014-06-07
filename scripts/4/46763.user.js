// ==UserScript==
// @name           myqcqc_BBS
// @namespace      http://userscripts.org/users/74739
// @description    由于“法语魁北克”论坛在发贴中禁止出现“http://”字样，故编写此脚本，其用途是在发贴时增加一个“修复URL”的按钮，点击它可以批量将帖子中的“http://”改写为“ht_tp://”以避免检查。
// @include        http://myqcqc.com/*
// ==/UserScript==

// 修复发贴内容的按钮
var s_fixBtn = '发帖前请点击这里修改文中的URL，避免错误提示';
var s_href = location.href;
if(s_href.indexOf('post.php') > 1){
    var node_Btn = document.getElementById('previewbutton');
    var node_Td = node_Btn.parentNode;
    var js = "javascript:obj = document.getElementById('posteditor_textarea');obj.value = obj.value.replace(/http:/g,'ht_tp:');";

    node_Td.innerHTML += "<button type=\"button\" onclick=\"" + js + "\">" + s_fixBtn + "</button>";
}

if(s_href.indexOf('forumdisplay.php') > 1 || s_href.indexOf('viewthread.php') > 1){
    var node_Btn = document.getElementById('postsubmit');
    var node_Td = node_Btn.parentNode;
    var js = "javascript:obj = document.getElementsByTagName('textarea');obj[0].value = obj[0].value.replace(/http:/g,'ht_tp:');";

    node_Td.innerHTML += "<button type=\"button\" onclick=\"" + js + "\">" + s_fixBtn + "</button>";
}

// 移除顶端碍事的广告和 logo
var aryDiv = document.getElementsByTagName('div');
var f = 0;
for(i = 0; i < aryDiv.length; i++){
    if(aryDiv[i].getAttribute('class') == 'maintable'){
        f = i;
        break;
    }
}
aryDiv[aryDiv.length - 10].style.display = 'none';
aryDiv[f].style.display = 'none';

// 移除上部横幅广告
var aryTable = document.getElementsByTagName('table');
aryTable[2].style.display = 'none'; 