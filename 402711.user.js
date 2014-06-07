// ==UserScript==
// @name           DXWebSearchSS
// @namespace      net.eshuyuan.dxss.search
// @version        0.1.0
// @include        *duxiu.com/search*
// @description    在DX的书籍搜索结果页面显示SS
// @copyright      2013, rotk@eshuyuan.net
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var version = "0.1.0";
var date = "2013-4-26";

app = {
	run: function() {
        var book1class = document.getElementsByClassName("book1");
        var scorediv = document.getElementsByClassName("score");
        console.log("scorediv:" + scorediv.length);
        for (var i=0; i<book1class.length; i++) {
            var ssidInput = document.getElementById("ssid"+i);
            var ssid = ssidInput.getAttribute("value");
            console.log("ssid:"+ssid);
            var parent = scorediv[i].parentNode;
            var ssDiv = document.createElement("div");
            ssDiv.innerHTML = '<p id="myssid"><font color="Red"><b>SS: ' + ssid + '</b></font></p>';
            parent.insertBefore(ssDiv, scorediv[i]);
        }
    }
};

try {
    app.run();
} catch (e) {
    //alert(e.message);
}