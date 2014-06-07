// ==UserScript==
// @name                    [TS] Generic Image Viewer
// @namespace               TimidScript
// @description             A more Powerful Image Viewer with info panel support for Pixiv and deviantArt.
// @include                 *
// @version                 1.0.13
// @versioninfo             Support for flash, deviantArt links, scrollbars and small bug fixes
// @require                 http://userscripts.org/scripts/source/159301.user.js
// @require                 http://userscripts.org/scripts/source/179396.user.js
// @resource  meta          http://userscripts.org/scripts/source/179323.meta.js
// @icon                    data:image/png;base64,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
// @versioninfo             Bug fix and added keys to change background colour (5 and Num 4).
// ==/UserScript==

/* Information
********************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/179323

Hotkeys:
  1 = Num 1 => Auto-Height
  2 = Num 2 => Auto-Width
  3 = Num 3 => Auto-Stretch
  4 = Num 5 => Enlarge/Shrink to Client Area
  ` = Num 0 => Reset Size
  5 = Num 4 => Change Background Colours
----------------------------------------------
    Version History
----------------------------------------------
1.0.13 (2014/03/25) 
 - BugFix: Using bitwise in readjustImageSize when taking into account scrollbars and also removed else if.
1.0.12 (2014/03/24)
 - Bug Fix: Remove old settings on update.
 - Bug Fix: Fixed stretch resize mode
 - Added change background colour button
 - Ability to store change background colour through settings 
1.0.11 (2014/03/22)
 - Bug fix on Pixiv to handle _p manga images besides as _big_p manga images. 
1.0.10c (2014/03/22)
 - Captures more images/swf pages by supporting links that do not end with an expected extension
 - Corrected a style
 - Bug Fix on empty extension 
1.0.9 (2014/02/12)
 - Flash Link
1.0.8b (2013/12/14)
 - Support for flash
 - More links for deviantArt 
 - When resizing take into account if scrollbar is present
 - Bug Fix: Handling of gif files on Pixiv
 - Optimised the code
 - Bug Fix in deviantArt username. Replace "_" with "-".
1.0.7 (2013/11/01) 
 - Changeable Background Colours
1.0.6 (2013/10/30)
 - [`] Key for reset added
1.0.5
 - Num 0 resets resize mode
1.0.4 
 - Still supporting Keys to 1, 2, 3 and 4. 
 - Added support for Num keys: 1, 2, 3 and 5
1.0.3 (2013/10/07)
 - imgur.com support added
 - Readjust the resize buttons and made them clickable
 - Added TimidScript Library functions 
1.0.2 (2013/10/06)
 - Generic image support
 - Restructured the code according to sites
 - deviantArt support added 
1.0.1 (2013/10/06)
 - Initial Release with Pixiv Support Only
**********************************************************************************************/

//#region TimidScript Library Functions
/* 
Copy and paste the code underneath into your script for quick reference and
auto-complete feature if available. 
*********************************************************************************/

var TSL = new Object();

//Remove node from document. Accepts id or node object
TSL.removeNode = function (node) { TimidScriptLibrary.removeNode(node); }
//Add CSS styles to document header
TSL.addStyle = function (id, CSS) { TimidScriptLibrary.addSyle(id, CSS); }

//General Functions
TSL.makeStruct = function (names) { return TimidScriptLibrary.makeStruct(names); }
TSL.isMouseEventInClientArea = function (event, element) { return TimidScriptLibrary.isMouseEventInClientArea(event, element); };

//Returns the thickness of the scrollbar
TSL.getScrollBarThickness = function () { return TimidScriptLibrary.getScrollBarThickness(); };

//String Padding
String.prototype.lPad = function (chr, length) { return TimidScriptLibrary.paddingLeft(this, chr[0], length); }
String.prototype.rPad = function (chr, length) { return TimidScriptLibrary.paddingRight(this, chr[0], length); }
/*
*********************************************************************************/

function makeStruct(names)
{
    var names = names.split(' ');
    var count = names.length;
    function constructor()
    {
        for (var i = 0; i < count; i++)
        {
            this[names[i]] = null;
        }
    }
    return constructor;
}
//#endregion ---------------------------------------------

//#region Global Variables
/*
==============================================================================================
 VYCC: Variables You Can Change
==============================================================================================*/
//GM_setValue("BGColors", '["#252525", "#EDE9E9", "#E7FDF7", "#F1E8D2"]')  //Image Background Colours


var ResizeMode = GM_getValue("ResizeMode", 0); //Bit operator for fitting and expanding images. (1 = FV, 2 = FH, 4 = Expand)
var BGColor = GM_getValue("BGColor", 0);
var BGCOLORS = JSON.parse(GM_getValue("BGColors", '["#252525", "#EDE9E9", "#E7FDF7", "#F1E8D2"]'));
var ScrollBarThickness = TSL.getScrollBarThickness();
//#endregion Global Variables


function DisplayMessage(msg)
{
    //text-align: center; display:inline-block; width: 100px; background-color: #D3D3D3; border: 1;
    var msgBox = document.getElementById("msgBox");
    if (!msgBox)
    {
        msgBox = document.createElement("span");
        msgBox.id = "msgBox";
        msgBox.setAttribute("style", "position: fixed; bottom: 30px; left: 10px; min-width: 200px; background-color: #D3D3D3; padding-left:10px; border-style: solid; border-color: #FF0000; text-align:left;");
        document.body.appendChild(msgBox);
    }
    msgBox.style.visibility = null;
    var div = document.createElement("div");
    div.textContent = msg;
    msgBox.appendChild(div);

    setTimeout(function (el) { if (el.parentElement.children.length == 1) el.parentElement.style.visibility = "hidden"; el.parentElement.removeChild(el); }, 2000, div);
}

function CreatePanelControl(text, href)
{
    var panel = document.createElement("span");
    panel.setAttribute("style", "text-align: center;vertical-align: middle;display: table-cell;margin: 0;padding: 0;");
    var link = document.createElement("a");

    if (text) link.textContent = text;
    if (href) link.href = href;

    panel.appendChild(link);
    return panel;
}

function CreatePanelControlImage(href, imgSrc)
{
    var panel = CreatePanelControl(null, href, imgSrc);
    var image = document.createElement("img");
    image.src = imgSrc;
    panel.firstElementChild.appendChild(image);
    return panel;
}

var ControlHQ =
{
    data: new (makeStruct("imgTitle imgURL userIcon userHome userName userGallery"))(),
    flash: false,

    displayImage: function (imageSrc)
    {
        for (var i = document.head.children.length - 1; i >= 0; i--)
        {
            var child = document.head.children[i];
            if (child.tagName != "title") document.head.removeChild(child);
        }

        for (var i = document.body.children.length - 1; i >= 0; i--)
        {
            var child = document.body.children[i];
            if (child.id != "USOUpdaterMenu") document.body.removeChild(child);
        }

        /* Add Image
        ********************/
        document.body.setAttribute("style", "padding:0;margin:0;color:black;background-color:#252525;");
        var div = document.createElement("div");
        var img = document.createElement("img");
        img.id = "theImage";
        img.onload = ControlHQ.readjustImageSize;
        img.src = imageSrc;
        setTimeout(ControlHQ.readjustImageSize, 500);

        div.setAttribute("style", "vertical-align: middle; text-align:center; display:table-cell;");
        div.appendChild(img);
        img.setAttribute("style", "top:0;bottom:0;margin:0");
        document.body.appendChild(div);

        ControlHQ.resizeButtonsAdd();
        ControlHQ.readjustImageSize();
        ControlHQ.setBGColor();

        window.addEventListener("keydown", ControlHQ.keyDownCallback, true);
        window.onresize = ControlHQ.readjustImageSize;
    },

    setBGColor: function (change)
    {
        if (change)
        {
            BGColor++;
            if (BGColor >= BGCOLORS.length) BGColor = 0;
            GM_setValue("BGColor", BGColor);
        }

        //document.getElementById("BGColorBtn").style.backgroundColor = BGCOLORS[BGColor];
        document.body.style.backgroundColor = BGCOLORS[BGColor];
    },

    registerLinkPanel: function ()
    {
        var linkPanel = document.getElementById("LinkPanel");
        linkPanel.setAttribute("style", "position: fixed; left: 10px; top: 10px; z-index:100; border: 1px ridge gray; padding: 5px; background-color:lightgray;");

        ControlHQ.infoID = setTimeout(function () { document.getElementById("LinkPanel").style.visibility = "hidden"; }, 1500);
    },

    createLinkPanel: function ()
    {
        var panel;
        var linkPanel = document.createElement("div");
        linkPanel.id = "LinkPanel";

        var data = ControlHQ.data;

        if (data.imgURL)
        {
            panel = CreatePanelControl(data.imgTitle, data.imgURL);
            linkPanel.appendChild(panel);
        }

        if (data.userHome)
        {
            if (!data.userIcon) data.userIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABW0lEQVR42mNkwAECAoNZGBkYVgKZCv8ZGFw2rF/7Hps6RmyCvn7+TIwMjIuAstFggf8MJ/4z/HfZvGnjV6IM8Pb2nQakMtGE9wBN8tm6dctPvAZ4eHh1AAXLsRkM9Mo6IBm+Y8f2P1gNcHN1rwBS7Qz4wYL///8n796z6x+KAc5OzkAnM05jIAr8n7h3394CuAEO9g7AwGJcjCtMcBjScODggUZGWxtbb6C+DUARFuI1ww3JZrSxslEEsuSB/nIH0hVE6lzAyMi4EEi/gTvZwsw8AUjNJ9KAxhOnTjagBKKpsQlJBpw+ewbVACMDQxQDGEHhwshwEeJVoBcZ/icgG3DuwnlUAwx09dBdkHjh8qUFUDkHILUf2QCgHKoBulraGAZcvnZ1AVQOwwCgHKoBWuoaGAZcu3ljAVQOwwCgHKoB6iqqIEW7gJgVZsDNO7cXIMnBDPgPlQNFIwMAOj56D6356V8AAAAASUVORK5CYII";
            panel = CreatePanelControlImage(data.userHome, data.userIcon);

            var image = panel.getElementsByTagName("IMG")[0];
            image.style.margin = "0 5px 0 10px";
            image.style.height = "20px";
            image.style.width = "20px";
            linkPanel.appendChild(panel);
        }

        if (data.userGallery)
        {
            panel = CreatePanelControl(data.userName, data.userGallery);
            linkPanel.appendChild(panel);
        }


        if (ControlHQ.flash)
        {
            document.getElementsByTagName("embed")[0].height = "96%";
            linkPanel.setAttribute("style", "background-color:#FBFBD6;");
            document.body.insertBefore(linkPanel, document.body.firstElementChild);

            var flash = document.getElementsByTagName("Embed")[0];
            panel = CreatePanelControl("[SWF]", flash.src);
            panel.firstElementChild.style.marginLeft = "10px";
            linkPanel.appendChild(panel);
        }
        else
        {
            document.body.appendChild(linkPanel);
            ControlHQ.registerLinkPanel();
        }
    },

    resizeButtonsAdd: function ()
    {
        var panel = document.createElement("div");
        panel.id = "ButtonPanel";
        panel.setAttribute("style", "position:fixed; top: 50px; left: 10px; display:inline-block; z-index: 450;");

        TSL.addStyle("SideButtons", "#BGColorBtn{background-color: #F9FAFA; margin-top:10px; height:32px;width: 32px; border: 2px ridge #05F505; border-radius: 20px; cursor:pointer;} .resizeBTN{height:32px;width: 32px; background-color: #F9FAFA; border: 2px ridge #05F505; border-radius: 5px; background-position: center center; background-repeat: no-repeat; cursor:pointer;} .resizeBTN:hover, #BGColorBtn:hover{border-color:red;}");

        for (var i = 0; i < 5; i++)
        {
            var btn = document.createElement("div");
            btn.className = "resizeBTN";
            btn.onclick = ControlHQ.resizeButtonClick;
            panel.appendChild(btn);
        }

        var btns = panel.getElementsByClassName("resizeBTN");
        btns[0].style.backgroundImage = "URL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAgklEQVR42mNkGGDAOOoAcjWeOXPmPzLfxMSELLNGHTC0HIBuKS5AimNIdjUhR5AaEmQFGy5HkBMNQysN4HIEuZZT7ABqgKHrAGDwL0bmA6MhdiAcEAPlLhmxDoADujuAWmBoO2BAC6IBLYoHtDIa0Op4UDRIcDlmZLQJRx1ACzDqAABrqFohocSl/AAAAABJRU5ErkJggg==')";
        btns[0].title = "Auto-Fit Height (1, Num 1)";
        btns[1].style.backgroundImage = "URL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAeElEQVR42u3UbQqAIAwG4HanHcdOV8fZnbLAQERzLnIE7/4I6l4e8IMW5yIAAAAAAACeFkXkYOZXyF5GF3CNVoSmXwWwILS91GqqVR507t2KtdWSMwTImxMgpOn9Boxk/A/w+RGUNf0StkJcn6HrRzSjAAAAAAAAiN9oYiGanAXaAAAAAElFTkSuQmCC')";
        btns[1].title = "Auto-Fit Width (2, Num 2)";
        btns[2].style.backgroundImage = "URL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAs0lEQVR42u2XYQqAIAyF804ep05Xx/FOlZAgw7k5zSW5P4L43j5zyjKLcpgJUCN2zp1+tNaKfcTCkDyEFEIkgslrIIoFWHIpRNFiKrkEYswa+A+AT4IZcwFyHlmAFo8Mx4fcXSsAzMvkBKkIJve6HcxvJfokAOeeA4D1mT64ABDiWwAln/CVI0hBdC9CKFS5hrFY7SHi7owCoGICjNeQqLZkFESXphSD6F6EMYTKj0mrmAAX79KqIbEwc3wAAAAASUVORK5CYII=')";
        btns[2].title = "Stretch (3, Num 3)";
        btns[3].title = "Fill Client Area while keeping ratio (4, Num 5)";


        var btn = btns[4];
        btn.id = "BGColorBtn";
        btn.className = "";

        btn.setAttribute("style", "");
        btn.onclick = function ()
        {
            ControlHQ.setBGColor(true);
        };

        document.body.appendChild(panel);
    },

    resizeButtonsShow: function ()
    {
        clearTimeout(ControlHQ.btnID);

        document.getElementById("ButtonPanel").style.visibility = null;

        var btns = document.getElementsByClassName("resizeBTN");
        btns[0].style.backgroundColor = (ResizeMode & 2) ? "yellow" : null;
        btns[1].style.backgroundColor = (ResizeMode & 4) ? "yellow" : null;
        btns[2].style.backgroundColor = (ResizeMode & 8) ? "yellow" : null;
        btns[3].style.backgroundColor = (ResizeMode & 16) ? "red" : null;

        ControlHQ.btnID = setTimeout(function () { document.getElementById("ButtonPanel").style.visibility = "hidden"; }, 1000);
    },

    resizeButtonClick: function ()
    {
        var btns = document.getElementsByClassName("resizeBTN");
        for (var i = 0; i < btns.length; i++)
        {
            if (btns[i] == this)
            {
                ControlHQ.adjustSizeMode(i + 1);
                return;
            }
        }
    },

    readjustImageSize: function ()
    {
        var img = document.getElementById("theImage");
        var div = img.parentElement;

        div.style.height = window.innerHeight + "px";
        div.style.width = window.innerWidth + "px";

        img.style.maxHeight = (ResizeMode & 2) ? window.innerHeight + "px" : null;
        img.style.maxWidth = (ResizeMode & 4) ? window.innerWidth + "px" : null;

        if (ResizeMode & 16)
        {
            var imageRatio = img.naturalWidth / img.naturalHeight;
            var clientRatio = window.innerWidth / window.innerHeight;

            img.style.width = (imageRatio >= clientRatio) ? window.innerWidth + "px" : null;
            img.style.height = (imageRatio < clientRatio) ? window.innerHeight + "px" : null;
        }
        else if (ResizeMode & 8)
        {
            img.style.height = (ResizeMode & 2) ? window.innerHeight + "px" : null;
            img.style.width = (ResizeMode & 4) ? window.innerWidth + "px" : null;

            //Resize taking into account ScrollBars
            if (ResizeMode & 2 && document.body.scrollWidth > document.body.clientWidth) img.style.height = (window.innerHeight - ScrollBarThickness) + "px";
            if (ResizeMode & 4 && document.body.scrollHeight > document.body.clientHeight) img.style.width = (window.innerWidth - ScrollBarThickness) + "px";
        }
        else
        {
            img.style.height = null;
            img.style.width = null;
        }

        //console.log(ResizeMode);
        //console.log(document.body.scrollHeight, document.body.clientHeight);
        //console.log();
        ControlHQ.resizeButtonsShow();
    },

    adjustSizeMode: function (mode)
    {
        var n = Math.pow(2, mode);
        var enabled = (ResizeMode & n);
        if (enabled) ResizeMode -= n; else ResizeMode += n;

        var msg = "";
        switch (mode)
        {
            case 1:
                msg = "Auto-height";
                break;
            case 2:
                msg = "Auto-width";
                break;
            case 3:
                msg = "Stretch";
                break;
            case 4:
                msg = "Fill Area";
                break;
        }

        if (mode > 0) DisplayMessage(msg + ((!enabled) ? " ON" : " OFF"));
        else DisplayMessage("Resize Off");

        ControlHQ.readjustImageSize();
        GM_setValue("ResizeMode", ResizeMode);
    },

    keyDownCallback: function (e)
    {
        //Hotkeys Set 1     : `, 1, 2, 3 & 4
        //Hotkeys Num Keys  : 0, 1, 2, 3 & 5

        if (e.keyCode == 53 || e.keyCode == 100)
        {
            ControlHQ.setBGColor(true);
            return false;
        }

        var mode = e.keyCode - 48;
        if (e.keyCode == 101) mode = 4;
        else if (e.keyCode != 100 && mode > 10) mode = mode - 48;
        if (e.keyCode == 192 || e.keyCode == 96) mode = 0;

        //console.log(mode, e.keyCode);
        if (mode >= 0 && mode < 5)
        {
            e.stopImmediatePropagation();
            if (mode == 0) ResizeMode = 0;
            ControlHQ.adjustSizeMode(mode);
            return false;
        }        
        //109 Minus
        //107 Plus        
    },

    monitorMouse: function (e)
    {
        ControlHQ.isMouseOverPanel(e, "ButtonPanel");
        ControlHQ.isMouseOverPanel(e, "LinkPanel");
    },

    isMouseOverPanel: function (e, id)
    {
        var panel = document.getElementById(id);
        if (!panel) return;
        if (TSL.isMouseEventInClientArea(e, panel))
        {
            if (panel.style.visibility)
            {
                clearTimeout(ControlHQ.btnID);
                ControlHQ.btnID = null;
                panel.style.visibility = null;
            }
        }
        else if (!panel.style.visibility && !ControlHQ.btnID)
        {
            ControlHQ.btnID = setTimeout(function () { panel.style.visibility = "hidden"; ControlHQ.btnID = null; }, 500);
        }

    }
};

(function ()
{
    if (window !== window.top) return;

    //Removes old settings
    var Version = 1002;
    if (GM_getValue("Version", 0) != Version)
    {
        var names = GM_listValues();
        for (var i = 0; name = names[i], i < names.length; i++)
        {
            var skipNames = ["USO-Updater"];
            var found = false;
            for (var j = 0; j < skipNames.length; j++) found = found || (name.indexOf(skipNames[j]) == 0);
            if (!found) GM_deleteValue(name);
            GM_setValue("Version", Version)
        }

        ResizeMode = 0;
        GM_setValue("ResizeMode", 0)        
    }


    if (document.URL.match(/.+\.swf(\?\d+)?$/) && document.body.children[0].tagName == "EMBED")
    {
        ControlHQ.flash = !(document.getElementsByTagName("embed")[0] == null);
        if (!ControlHQ.flash) return;
    }
    else if ((document.URL.match(/.+\.(jpg|gif|jpeg|png|bmp)(\?\d+)?$/) || document.URL.match(/\/[a-zA-Z0-9]+$/) || document.URL.match(/^http:\/\/www\.pixiv\.net\/member_illust\.php\?mode=big&illust_id/)) &&
             document.body.children[0].tagName == "IMG")
    {
        var imgs = document.getElementsByTagName("img");
        if (imgs.length == 0 || imgs.length > 1 || document.body.children.length > 2) return;
        ControlHQ.displayImage(imgs[0].src);
    }
    else return;


    if (document.URL.match(/http:\/\/[^\.]+\.pixiv\.net/gi))  //Pixiv Site
    {
        console.info("GIViewer: Pixiv");
        var APIMetaNames = "illustID userID illustExt illustTitle unknown1 userName illust128URL unused1 unused2 illust480URL unused3 unused4 time tags software ratings totalRatings viewCount description pageCount unused5 unused6 bookmarkCount unknown2 userLoginName unused7 unknown3 unused8 unused9 userProfileImageURL endMarker";
        var APIDataFull = makeStruct(APIMetaNames);
        var MangaData = new (makeStruct("userID userName userProfileImageURL illustID illustTitle illustBaseURL pageCount description time tags software ratings totalRatings viewCount bookmarkCount responseCount"))();

        //http://www.pixiv.net/member_illust.php?mode=medium&illust_id=34645665
        //http://spapi.pixiv.net/iphone/illust.php?illust_id=34117192
        //http://spapi.pixiv.net/iphone/illust.php?PHPSESSID=673982_98a848b3f187cdb7b45df373a1c7d7e2&illust_id=34117192

        var id = document.URL.replace(/.*big&illust_id=(\d+).*$/, "$1");
        id = id.replace(/.*\/(\d+)((_big_p\d+)?|(_p\d+)?)\.(png|jpg|gif)$/, "$1");

        if (isNaN(id)) return;
        var m = document.cookie.match(/PHPSESSID=[^;]+/);
        var sessionID = (m[0] != null) ? (m[0].split("=")[1]) : "";
        var apiLink = "http://spapi.pixiv.net/iphone/illust.php?PHPSESSID=" + sessionID + "&illust_id=" + id;


        //Does not work with XMLHttpRequest as you are unable to set the Referer. 
        GM_xmlhttpRequest({
            url: apiLink,
            method: "GET",
            timeout: 15000,
            headers: { "User-agent": navigator.userAgent, "Accept": "text/html", Referer: "http://www.pixiv.net" },
            onload: function (response)
            {
                if (response.status == 200) //Response 200 implies that link exist and then most likely a Manga (or an Error XD)
                {
                    var rawlist = response.responseText.split(",");
                    var datalist = new APIDataFull();
                    var dataNames = APIMetaNames.split(" ");
                    for (var i = 0, n = 0; rawdata = rawlist[i], i < rawlist.length; i++)
                    {
                        var j = 0;

                        while ((rawdata.split('"').length - 1) % 2 == 1) //Quote number should always be even. If odd then you need to combine
                        {
                            j++;
                            rawdata += "," + rawlist[i + j]; //We add the comma that we removed as it was part of the value
                        }
                        i += j; //We appended items               
                        rawdata = rawdata.replace(/^"|"$/g, ""); //We remove any starting or ending quotes               
                        datalist[dataNames[n]] = rawdata;
                        n++;
                    }

                    for (var i = 0; i < dataNames.length; i++)
                    {
                        //Null if item exists otherwise it would be undefined. 
                        if (MangaData[dataNames[i]] === null)
                        {

                            MangaData[dataNames[i]] = datalist[dataNames[i]];
                            if (MangaData[dataNames[i]].length > 0 && !isNaN(MangaData[dataNames[i]])) MangaData[dataNames[i]] = parseInt(MangaData[dataNames[i]]);
                        }
                    }

                    var baseURL = datalist["illust480URL"];
                    baseURL = baseURL.replace(/(\/mobile\/)([^\/]+)$/gi, "/$2"); //Remove "Mobile" if one exists

                    if (MangaData.pageCount > 0) MangaData.illustBaseURL = document.URL;
                    else MangaData.illustBaseURL = baseURL.replace(/(\/\d+)[^\/]+\.(jpe?g|gif|png)(\?\d+)?$/gi, "$1." + datalist.illustExt); //Remove extra information

                    ControlHQ.data.imgTitle = MangaData.illustTitle;
                    ControlHQ.data.imgURL = "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + MangaData.illustID;
                    ControlHQ.data.userIcon = MangaData.userProfileImageURL;
                    ControlHQ.data.userHome = "http://www.pixiv.net/member.php?id=" + MangaData.userID;
                    ControlHQ.data.userName = MangaData.userName;
                    ControlHQ.data.userGallery = "http://www.pixiv.net/member_illust.php?id=" + MangaData.userID;

                    ControlHQ.createLinkPanel();
                }
                else DisplayMessage("An error occurred");
            }
        });


    }
    else if (document.URL.match(/http:\/\/[^\.]+\.deviantart\.net/gi)) //deviantart
    {
        console.info("GIViewer: deviantArt");

        var id = document.URL.replace(/\.(jpg|bmp|png|gif|swf)$/gi, "");
        id = id.substr(id.length - 7).toLowerCase();
        if (id[0] != "d") return;

        ControlHQ.data.imgTitle = "Illustration Page";
        ControlHQ.data.imgURL = "http://www.deviantart.com/gallery/#/" + id;

        var user = document.URL.replace(/.+_by_(.+)-d.+$/i, "$1");
        user = user.replace(/_/g, "-");

        if (user != document.URL)
        {
            ControlHQ.data.userName = user;
            ControlHQ.data.userHome = "http://" + user + ".deviantart.com";
            ControlHQ.data.userGallery = "http://" + user + ".deviantart.com/gallery/?catpath=/";
        }

        ControlHQ.createLinkPanel();
    }
    else if (document.URL.match(/http:\/\/[^\.]+\.imgur\.com/gi)) //imgur
    {
        console.info("GIViewer: imgur");
        var id = document.URL.replace(/.+\/(.+)\.(jpg|bmp|png|gif)$/gi, "$1");

        ControlHQ.data.imgTitle = "Image Page";
        ControlHQ.data.imgURL = "http://imgur.com/gallery/" + id;

        ControlHQ.createLinkPanel();
    }    
    else if (ControlHQ.flash) ControlHQ.createLinkPanel();

    window.onmousemove = ControlHQ.monitorMouse;
})();
