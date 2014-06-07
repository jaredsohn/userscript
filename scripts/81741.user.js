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
    var main1 = document.getElementById("main1");
    if (!main1)
        return false;
    else
    {
        var a = main1.getElementsByTagName("a");
        if (!a)
            return false;
        var downLink1;
        for (i in a) {
            if (a[i].innerHTML != "\u8FDB\u5165\u4E0B\u8F7D\u9875")
                continue;
            downLink1 = a[i];
            //alert(downLink1)
        }
        xmlHttp.onreadystatechange = function ()
        {
            if (xmlHttp.readyState == 4)
            {
                downLink1 = xmlHttp.responseText;
                GetLink(downLink1); 
            }
        }
        xmlHttp.open("GET", downLink1, true);
        xmlHttp.send(null);
    }
}

function GetLink(downLink1) {
    if (!downLink1)
        return false;
    //alert(downLink1)
    var down1, down2, setKey;
    var down1Temp, down2Temp;
    down1Temp = downLink1.match(/downloads_url.*\'\]\;/i)[0];
    down1 = down1Temp.replace(/^down.*\[\'(.*)\'\]\;/i, '$1')
    down2Temp = downLink1.match(/vod_urls.*\'\]\;/i)[0];
    down2 = down2Temp.replace(/^vod.*\[\'(.*)\'\]\;/i, '$1');
    setKey = downLink1.match(/\'ROX.*?\)\;/)[0];
    setKey = setKey.replace(/(\'ROX.*?)\)\;/, '$1');
    var Values = setKey.split(/\,/);
    for (i in Values)
        if (/\'.*?\'/.test(Values[i]))
            Values[i] = Values[i].replace(/\'(.*?)\'/, '$1');
    document.cookie = Values[0] + "=" + Values[1]
        + "; path=" +Values[3]
        + "; domain=" + Values[4];
    //alert(down1);
    //alert(down2);
    if (down1 || down2)
    {
        var dtDown1 = document.createElement("dt");
        var dtDown2 = document.createElement("dt");
        dtDown1.setAttribute("class", "btn_down_1 btn_down");
        dtDown2.setAttribute("class", "btn_down_2 btn_down");
        dtDown1.innerHTML = "<a href='" + down1 + "'>\u76F4\u63A5\u4E0B\u8F7D</a>";
        dtDown2.innerHTML = "<a href='" + down2 + "'>\u7528RayFile\u4E0B\u8F7D</a>";
        var main1 = document.getElementById("main1");
        var dt = main1.getElementsByClassName("dt");
        dt[0].appendChild(dtDown2);
        dt[0].insertBefore(dtDown1, dtDown2);

    }


GM_addStyle(" \
.btn_down_1 { \
    margin-left: 30px; \
    backgroud: #111; \
} \
.btn_down_2 { \
    margin-left: 135px; \
} \
.btn_down { \
    position: absolute; \
    margin-top: 10px; \
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