// ==UserScript==
// @name       百度众测俱乐部【快捷键共享版】
// @namespace  http://zhongce.sinaapp.com/
// @version    1.0
// @description  共享版包含基本功能，欢迎百度众测测友测试使用。
// @match      http://test.baidu.com/crowdtest*
// @copyright  众测俱乐部 @ 2014版权所有
// ==/UserScript==

window.document.onkeydown = disableRefresh;
function disableRefresh(evt){
    evt = (evt) ? evt : window.event
    if (evt.keyCode) {
        if(evt.keyCode == 72 || evt.keyCode == 49){//1 or h
            document.getElementsByTagName("label")[0].click();document.getElementById("next_eva").click()
        }else if(evt.keyCode == 74 || evt.keyCode == 50){//2 or j
            document.getElementsByTagName("label")[1].click();document.getElementById("next_eva").click();
        }else if(evt.keyCode == 75 || evt.keyCode == 51){//3 or k
            document.getElementsByTagName("label")[2].click();document.getElementById("next_eva").click()
        }else if(evt.keyCode == 76 || evt.keyCode == 52){//4 or l
            document.getElementsByTagName("label")[3].click();document.getElementById("next_eva").click()
        }else if(evt.keyCode == 73 || evt.keyCode == 87){//i or w
            document.location=document.location
        }else if(evt.keyCode == 9){//tab
            document.getElementById("next_eva").click()
        }
            }
}