// ==UserScript==
// @name       NicoMylistScript
// @namespace  http://www.nicovideo.jp/user/1021926
// @description  マイリス全選択/解除ボタン追加、削除リンク常時表示
// @version    0.1
// @include     http://www.nicovideo.jp/my/mylist*
// @copyright  STRP
// ==/UserScript==

(function(){setTimeout(function(){var e=document.getElementById("SYS_box_check_editor").childNodes;var c=document.getElementsByName("checkbox");var b=document.getElementsByClassName("mylistVideo");e[0].innerHTML+='<br><input type="button" id="allCheck" value="全選択" onclick="return false;"><input type="button" id="allUnCheck" value="全解除" onclick="return false;">';document.getElementById("allCheck").addEventListener("click",function(){for(var f=0;f<c.length;f++){c[f].checked=true}});document.getElementById("allUnCheck").addEventListener("click",function(){for(var f=0;f<c.length;f++){c[f].checked=false}});for(var d=0;d<b.length;d++){var a=b[d].getElementsByClassName("pullout")[0];a.style.display="block";a.getElementsByTagName("dd")[0].style.display="block";b[d].addEventListener("mousemove",function(){setTimeout(function(){dispDeleteLink()},1)})}},1000);document.addEventListener("mousemove",function(){setTimeout(function(){dispDeleteLink()},1)});function dispDeleteLink(){var b=document.getElementsByClassName("mylistVideo");for(var c=0;c<b.length;c++){var a=b[c].getElementsByClassName("pullout")[0];a.style.display="block";a.getElementsByTagName("dd")[0].style.display="block"}};})();