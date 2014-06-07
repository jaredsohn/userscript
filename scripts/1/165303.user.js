// ==UserScript==
// @name           DXWebSS
// @namespace      
// @version        0.1.0
// @include        *duxiu.com/bookDetail.jsp?dxNumber=*
// @description    浏览DX书籍信息网页时，自动显示该书籍SS
// @copyright      2013, rotk@eshuyuan.net
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var version = "0.1.0";
var date = "2013-4-17";

app = {
	run: function() {
        var gradeStarDiv = document.getElementById("grade1");
        var parent = gradeStarDiv.parentNode;
        var ssidInput = document.getElementById("ssidfav");
        var ssid = ssidInput.getAttribute("value");
        var ssDiv = document.createElement("div");
        ssDiv.innerHTML = '<p id="myssid"><font color="Red"><b>SS: ' + ssid + '</b></font></p>';
        parent.insertBefore(ssDiv, gradeStarDiv);
        var dxidInput = document.getElementById("dxidfav");
        var dxid = ssidInput.getAttribute("value");
        var dxDiv = document.createElement("div");
        dxDiv.innerHTML = '<p id="mydxid"><font color="Red"><b>dxid: ' + dxid + '</b></font></p>';
        parent.insertBefore(dxDiv, gradeStarDiv);
        
    }
};

try {
    app.run();
} catch (e) {
    //alert(e.message);
}