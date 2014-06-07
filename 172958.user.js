// ==UserScript==
// @name        DW decoder
// @namespace   calihax
// @description adds apostrophe as hotkey for instant puzzle/chest solving
// @include     *.playmage*
// @run-at      document-end
// ==/UserScript==
document.body.addEventListener("keyup",function(e){if(e.keyCode==222)decode()},false);function locref(str){return location.href="javascript:(function(){"+str+"})()";}function decode(){var dqn=document.getElementById("divquestn"),dq2=document.getElementById("divquestn2"),abi=document.getElementById("actionbuttonimg1"),ab2=document.querySelector("span.btn100#actionbuttonimg2"),qns=document.getElementById("qns");if(dqn!=null&&ab2!=null&&ab2.innerHTML.trim()=="Decode")return locref("loadDiv2('/dream/explore?action=openBox1&answer=force')");if(dq2!=null&&abi!=null&&abi.innerHTML.trim()=="Decode")return locref("loadDiv2('/dream/explore?action=openBox2&answer=force')");if(qns!=null&&ab2!=null&&ab2.innerHTML.trim()=="Pick")return locref("loadDiv2('/dream/explore?action=pickChest&force=1')");}