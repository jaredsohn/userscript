// ==UserScript==
// @name           DXWebGuideSearchSS
// @namespace      net.eshuyuan.dxss.guidesearch
// @version        0.1.0
// @include        *duxiu.com/book.do?go=guidesearch*
// @description    在DX的图书图书导航结果页面显示SS
// @copyright      2013, rotk@eshuyuan.net
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

//*duxiu.com/expsearch*

var version = "0.1.0";
var date = "2013-5-29";

function calcSS(iid)
{
    var bs = Array();
    var cnt = 0;
    console.log("iid: " + iid);
    console.log("iid length: " + iid.length);
    for (var i = 0; i < iid.length; i = i + 2) {
        if ( i != 4 && i != 12) {
            bs[cnt] = iid.slice(i, i+2);
            cnt++;
        }
    }
    console.log("bs: " + bs);
    cnt--;
    var lastByte = parseInt(bs[cnt], 16) + 48;
    var firstByte = parseInt(bs[0], 16);
    var ss = "";
    if (firstByte - lastByte > 0) {
        for (var i = 0; i < 8; i++) {
            var s = parseInt(bs[i], 16) - lastByte;
            ss = ss + s.toString();
        }
    }
    return ss;
}

function showSS()
{
    var coverClass = document.getElementsByClassName("cover");
    console.log("coverClass length: " + coverClass.length);
    // var coverdiv = document.getElementById("bb");
    // console.log("coverdiv:" + coverdiv);
    
    var imgTags = document.getElementsByTagName("img");
    var iids =  Array();
    var cnt = 0;
    for (var i = 0; i < imgTags.length; i++) {
        var src = imgTags[i].getAttribute("src");
        var pattern = /http:\/\/cover.duxiu.com\/cover\/Cover.dll/i;
        if (pattern.test(src)) {
            var iidPat = /iid=(.*)/i;
            iids[cnt] = (iidPat.exec(src))[1];
            cnt++;
        }
    }
    
    for (var i=0; i<coverClass.length; i++) {
        var ssid = calcSS(iids[i]);
        var inputB = document.getElementById("b"+i);
        var parent = inputB.parentNode;
        var ssDiv = document.createElement("div");
        ssDiv.innerHTML = '<p id="myssid"><font color="Red"><b>SS: ' + ssid + '</b></font></p>';
        parent.insertBefore(ssDiv, inputB);
    }
}

// window.onload = function()
// {
    // var book1class = document.getElementsByClassName("book1");
    // console.log("book1class length: " + book1class.length);    
// }

app = {
	run: function() {
        var btnSearch = document.getElementById("ch_search");
        console.log("btnSearch: " + btnSearch);
        var parent = btnSearch.parentNode;
        var showSSDiv = document.createElement("div");
        showSSDiv.innerHTML = '<br><input id = "showSSBtn" class="showSSBtn" type="button" value="显示SS"></input><br><br>';
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