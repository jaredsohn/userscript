// ==UserScript==
// @name           DXWebAdvSearchSS
// @namespace      net.eshuyuan.dxss.advsearch
// @version        0.1.0
// @include        *duxiu.com/advsearch*
// @description    在DX的图书高级搜索结果页面显示SS
// @copyright      2013, rotk@eshuyuan.net
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

//*duxiu.com/expsearch*

var version = "0.1.0";
var date = "2013-5-24";

function showSS()
{
    var book1class = document.getElementsByClassName("book1");
    console.log("book1class length: " + book1class.length);
    // var coverdiv = document.getElementById("bb");
    // console.log("coverdiv:" + coverdiv);
    for (var i=0; i<book1class.length; i++) {
        var ssidInput = document.getElementById("ssid"+i);
        var ssid = ssidInput.getAttribute("value");
        console.log("ssid:"+ssid);
        var title = document.getElementById("title"+i);
        var parent = title.parentNode;
        var ssDiv = document.createElement("div");
        ssDiv.innerHTML = '<p id="myssid"><font color="Red"><b>SS: ' + ssid + '</b></font></p>';
        parent.insertBefore(ssDiv, title);
    }
}

// window.onload = function()
// {
    // var book1class = document.getElementsByClassName("book1");
    // console.log("book1class length: " + book1class.length);    
// }

app = {
	run: function() {
        var btnInput = document.getElementsByClassName("btnInput");
        console.log("btnInput: " + btnInput);
        var parent = btnInput[0].parentNode;
        var showSSDiv = document.createElement("div");
        showSSDiv.innerHTML = '<br><input id = "showSSBtn" class="showSSBtn" type="button" value="显示SS"></input><br>';
        parent.appendChild(showSSDiv);
        
		var btnShowSS = document.getElementById("showSSBtn");
		btnShowSS.addEventListener("click", showSS, false);
    }
};

try {
    app.run();
} catch (e) {
    //alert(e.message);
}