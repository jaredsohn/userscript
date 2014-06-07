// ==UserScript==
// @name        显示用户头像
// @namespace   显示用户头像
// @description 显示用户头像
// @include     http://bbs.iavira.com/home.php?mod=spacecp*&ac=search*&username=*
// @include     http://bbs.iavira.com/home.php?mod=spacecp*&username=*&ac=search*
// @version     0.1
// @grant       none
// @author      loms126
// ==/UserScript==


//url='http://bbs.iavira.com/home.php?username=3&uid=&gender=0&startage=&endage=&resideprovince=&birthprovince=&birthyear=0&birthmonth=0&birthday=0&searchsubmit=true&op=&mod=spacecp&ac=search&type=all'

function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

function refresh_list()
{
uid_1 = document.getElementById('uid_1').value;
uid_2 = document.getElementById('uid_2').value;
if (uid_1>uid_2)
    uid_2= uid_1+100;
list_node = document.getElementsByClassName('buddy cl')[0];
list_node.innerHTML='';
innter_code='';
for(uid=uid_1;uid<=uid_2;uid++)
{
uid_s = pad(uid, 9);
html_cod='<li class="bbda cl"><div class="avt"><a href="http://bbs.iavira.com/home.php?mod=space&uid='+uid+'&do=profile" target="_blank" c="1"  initialized="true"><img src="http://bbs.iavira.com/uc_server/data/avatar/'+ uid_s.substr(0,3) +'/'+ uid_s.substr(3,2) +'/'+ uid_s.substr(5,2) +'/'+ uid_s.substr(7,2) +'_avatar_small.jpg" ></a></div><h4><a href="http://bbs.iavira.com/home.php?mod=space&uid='+uid+'&do=profile" title="'+uid+'" target="_blank" style="color:#0000FF;">'+uid+'</a></h4></li>';
innter_code=innter_code+html_cod;
}
list_node.innerHTML=innter_code;
}

list_node = document.getElementsByClassName('buddy cl')[0];

input_node=document.createElement('a');
input_node.innerHTML='<input id="uid_1" onkeypress="return event.keyCode>=48&&event.keyCode<=57||event.keyCode==46"onpaste="return !clipboardData.getData(\'text\').match(/\D/)" ondragenter="return false" style="ime-mode:Disabled" ><input id="uid_2" onkeypress="return event.keyCode>=48&&event.keyCode<=57||event.keyCode==46"onpaste="return !clipboardData.getData(\'text\').match(/\D/)" ondragenter="return false" style="ime-mode:Disabled" >             <input type="button" value="显示" onclick="refresh_list()">';
list_node.parentNode.insertBefore(input_node,list_node);



