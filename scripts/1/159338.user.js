// ==UserScript==
// @name            添加翻页快捷键
// @namespace       http://userscripts.org/123
// @description     添加翻页快捷键
// @include         *
// @version         1.0
// @author          qingshan
// ==/UserScript==
window.onload = function(e) {
    console.log("start");
    var nodeList = document.getElementsByTagName("a");
    console.info(nodeList.length);
    var pre = [
        "«",
        "previous", "上一页"
    ];
    
    var next = [
        "»",
        "next", "下一页"
    ];
    function containValue(array,value) {
        if (array.length < 1) {
            return false;
        }
        //console.log(array+" >> "+ array.length);
        for (var h = 0; h < array.length; h++) {
            //console.log(array[h].toLowerCase()+"---"+value.toLowerCase());
            if (array[h].toLowerCase() === value.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    //alert(containValue(pre,"previous"));
   // return ;
    for (var i = 0; i < nodeList.length; i++) {
        var temp = nodeList[i].innerText;
        //console.dir(nodeList[i]);
        if (containValue(pre, temp)) {
            nodeList[i].accessKey = "p";
            console.log("p > " + i);
        	continue;
        }
        if (containValue(next, temp)) {
            nodeList[i].accessKey = "n";
            console.log("n > " + i);
        	continue;
        }
    }

   console.log("end");
}