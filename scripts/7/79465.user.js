// ==UserScript==
// @name    RayFile下载
// @namespace   http://userstyle.org
// @description 在RayFile页面显示直接下载链接
// @version 1.0
// @author  A936468
// @include http://www.rayfile.com/zh-cn/files/*
// ==/UserScript==

Init = function() {
    var xmlHttp = new XMLHttpRequest();
    var divinfo_1 = document.getElementById("divinfo_1");
    if (!divinfo_1)
        return false;
    else
    {
        var ndFileInfo_list = divinfo_1.getElementsByClassName("ndFileinfo_list");
        var downLink1;
        var downLinkText;
        for (i in ndFileInfo_list) {
            if (ndFileInfo_list[i].firstChild == undefined)
                continue;
            var nFi = ndFileInfo_list[i].firstChild;
            var nFiClass = nFi.getAttribute("class");
            if (nFiClass && nFiClass.substring(0, 10) == 'btn_indown')
                downLink1 = nFi.firstChild;
        }
        xmlHttp.onreadystatechange = function ()
        {
            if (xmlHttp.readyState == 4)
            {
                downLinkText = xmlHttp.responseText;
                GetLink(downLinkText); 
            }
        }
        xmlHttp.open("GET", downLink1, true);
        xmlHttp.send(null);
    }
}

function GetLink(downLinkText) {
    if (!downLinkText)
        return false;
    var down1, down2, setKey;
    var down1Temp, down2Temp;
    down1Temp = downLinkText.match(/downloads_url.*\'\]\;/i)[0];
    down1 = down1Temp.replace(/^down.*\[\'(.*)\'\]\;/i, '$1')
    down2Temp = downLinkText.match(/vod_urls.*\'\]\;/i)[0];
    down2 = down2Temp.replace(/^vod.*\[\'(.*)\'\]\;/i, '$1');
    setKey = downLinkText.match(/\'ROX.*?\)\;/)[0];
    setKey = setKey.replace(/(\'ROX.*?)\)\;/, '$1');
    var Values = setKey.split(/\,/);
    for (i in Values)
        if (/\'.*?\'/.test(Values[i]))
            Values[i] = Values[i].replace(/\'(.*?)\'/, '$1');
    document.cookie = Values[0] + "=" + Values[1]
        + "; path=" +Values[3]
        + "; domain=" + Values[4];
    if (down1 || down2)
    {
        var divDown1 = document.createElement("div");
        var divDown2 = document.createElement("div");
        divDown1.setAttribute("class", "btn_down_1 btn_down");
        divDown2.setAttribute("class", "btn_down_2 btn_down");
        divDown1.innerHTML = "<a href='" + down1 + "'>\u76F4\u63A5\u4E0B\u8F7D</a>";
        divDown2.innerHTML = "<a href='" + down2 + "'>\u7528RayFile\u4E0B\u8F7D</a>";
        var divinfo_1 = document.getElementById("divinfo_1");
        var ndFileInfo_list = divinfo_1.getElementsByClassName("ndFileinfo_list");
        var downLink1;
        var downLinkText;
        for (i in ndFileInfo_list) {
            if (ndFileInfo_list[i].firstChild == undefined)
                continue;
            var nFi = ndFileInfo_list[i].firstChild;
            var nFiClass = nFi.getAttribute("class");
            if (nFiClass && nFiClass.substring(0, 10) == 'btn_indown')
            {
                ndFileInfo_list[i].appendChild(divDown2);
                ndFileInfo_list[i].insertBefore(divDown1, divDown2);
            }
        }
    }
GM_addStyle(" \
.btn_down_1 { \
    margin-left: 30px; \
    backgroud: #111; \
} \
.btn_down_2 { \
    margin-left: 120px; \
} \
.btn_down { \
    position: absolute; \
    margin-top: 35px; \
    -moz-border-radius: 3px 3px 3px 3px; \
    background-color: #CCCCCC; \
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5); \
    padding: 5px; \
    -moz-box-shadow: 0 0 2px rgba(0, 0, 0, 0, 0.5); \
} \
.btn_down:hover { \
    background-color: #8AFF00; \
} \
.btn_down a { \
    padding: 3px; \
} \
.btn_down a:hover { \
    text-decoration: none; \
    background-color: #CCCCCC; \
    -moz-box-shadow: 0 0 2px rgba(0, 0, 0, 0, 0.5); \
    -moz-border-radius: 3px 3px 3px 3px; \
    text-shadow: -1px -1px 3px #FFB69A, 1px 1px 3px #922E09, -1px -1px #FFB69A, 1px 1px #922E09; \
}");
}
Init();