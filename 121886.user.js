// ==UserScript==
// @name DeveloptedbyKNN
// ==/UserScript==

var LOCAL_STORAGE = 'kknTool'
var PageHead = document.getElementsByTagName('head')[0];
var CssStyle = document.createElement('style');
var StyleStr;
var VillageName = new Array();
var VillageTitle = new Array();
var VillageHref = new Array();

var KKNToolBar = document.createElement('div');
var Credit = document.createElement('SPAN');
var ToolBar = document.createElement('DIV');
var ToolBarUl = document.createElement('UL');
//เลือกเมือง
var VillageLi = document.createElement('LI');
var VillageA = document.createElement('A');
var VillageSpan = document.createElement('SPAN');
var VillageSubDiv = document.createElement('DIV');
var VillageUL = document.createElement('UL');

initGMWrapper();
CreateCSS();
CreateMainDiv();
GetVillageData();

/*GM_deleteValue('VillageName');
GM_deleteValue('VillageTitle');
GM_deleteValue('VillageHref');*/

if (document.body.firstChild) {
    PageHead.appendChild(CssStyle);
    document.body.insertBefore(KKNToolBar, document.body.firstChild);
} else {
    PageHead.appendChild(CssStyle);
    document.body.appendChild(div);
}

function CreateCSS() {
    CssStyle.type = 'text/css';
    StyleStr = '.Container { display:block; width:100%; height:20px; background-color:Black; font-family:Tahoma; font-size: 11px; text-align:right; } ' +
        '.Container a { text-decoration:none; } ' +
        '.Credit { float: right; height:auto; color:White; } ' + 
        '.nav { float: left; height:auto; margin:0 0 0 15px; } ' + 
        '.nav ul { height: 24px; float: left; list-style: none; }' + 
        '.nav li { float:left; background-color:Black; position: relative; z-index: 1; } ' +
        '.nav li a { display: block; line-height: 24px; overflow: hidden; float: left; color:White; width: 95%; text-align:left; } ' +
        '.nav li a:hover { color:Gold; } ' +
	    '.nav a .menu-mid { height: 18px; line-height: 21px; display: block; float: left; width:50px; } ' + 
        '.nav li:hover .sub,.nav li.hover .sub { display:block; } ' +
        '.nav li .sub { display: none; position: absolute; top: 15px; padding-top: 3px; width: 186px; left: -10px; } ' + 
        '.nav li ul { background-color:Black; width: 125px; height: auto; margin: 0; padding: 0 12px 0px; list-style: none; } ' + 
        '.nav li ul li { width: 125px; } ';
    CssStyle.appendChild(document.createTextNode(StyleStr));
}

function CreateMainDiv() {
    KKNToolBar.id = 'KKNToolBar';
    KKNToolBar.className = 'Container';

    //เพิ่มรายการ
    VillageUL.id = 'VillageUL';
    VillageSubDiv.className = 'sub';
    VillageSpan.className = 'menu-mid';
    VillageSpan.innerHTML = 'เลือกฐาน'
    VillageA.href = '#';

    ToolBar.id = 'ToolBar';
    ToolBar.className = 'nav';

    VillageSubDiv.appendChild(VillageUL);
    VillageA.appendChild(VillageSpan);
    VillageLi.appendChild(VillageA);
    VillageLi.appendChild(VillageSubDiv);

    ToolBarUl.appendChild(VillageLi);
    ToolBar.appendChild(ToolBarUl);
    KKNToolBar.appendChild(ToolBar);

    //เพิ่ม Credit
    Credit.id = 'Credit';
    Credit.className = 'Credit';
    Credit.innerHTML = 'Develop By KKN';
    KKNToolBar.appendChild(Credit)

    /*KKNToolBar.innerHTML = '<div id="ToolBar" class="nav"> ' +
                            '    <ul> ' +
                            '        <li> ' +
                            '            <a href="#"> ' +
                            '                <span class="menu-mid">เลือกเมือง</span> ' +
                            '            </a> ' +
                            '            <div class="sub"> ' +
                            '                <ul id="VillageUL"> ' +
                            '                    <li><a href="#1">Village1</a></li> ' +
                            '                    <li><a href="#2">Village2</a></li> ' +
                            '                    <li><a href="#3">Village3</a></li> ' +
                            '                    <li><a href="#4">Village4</a></li> ' +
                            '                    <li><a href="#6">Village4</a></li> ' +
                            '                    <li><a href="#7">Village4</a></li> ' +
                            '                    <li><a href="#8">Village4</a></li> ' +
                            '                    <li><a href="#9">Village4</a></li> ' +
                            '                    <li><a href="#10">Village4</a></li> ' +
                            '                    <li><a href="#11">*โหลดรายชื่อเมืองอีกครั้ง</a></li> ' +
                            '                </ul> ' +
                            '            </div> ' +
                            '        </li> ' +
                            '    </ul> ' +
                            '</div> ';*/
}

function GetVillageData() {
    if (location.pathname == '/village.php') {
        var Villagelist = document.evaluate('//*[@id="lodgment"]/div[@class="floatInner"]/ul/li', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        GM_setValue('TotalVillage', Villagelist.snapshotLength);

        var TempVillageName = GM_getValue('VillageName');
        var TempVillageTitle = GM_getValue('VillageTitle');
        var TempVillageHref = GM_getValue('VillageHref');

        if (TempVillageName == undefined) {
            VillageName = new Array();
        }
        else {
            VillageName = TempVillageName.split(",");
        }

        if (TempVillageTitle == undefined) {
            VillageTitle = new Array();
        }
        else {
            VillageTitle = TempVillageTitle.split(",");
        }

        if (TempVillageHref == undefined) {
            VillageHref = new Array();
        }
        else {
            VillageHref = TempVillageHref.split(",");
        }

        for (var i = 0; i < Villagelist.snapshotLength; i++) {
            var list = Villagelist.snapshotItem(i)
            if (list.hasChildNodes()) {
                //var ul = document.getElementById('VillageUL');
                var children = list.childNodes;

                for (var j = 0; j < children.length; j++) {
                    var li = document.createElement('li');
                    var a = document.createElement('A');
                    
                    if (children[j].tagName == 'SPAN') {
                        a.href = ''
                        a.title = ''
                        a.innerHTML = children[j].innerHTML
                        li.appendChild(a);
                        VillageUL.appendChild(li);
                        VillageName[i] = children[j].innerHTML
                    }
                    else if (children[j].tagName == 'A') {
                        a.href = children[j].href
                        a.title = children[j].title
                        a.innerHTML = children[j].innerHTML
                        li.appendChild(a);
                        VillageUL.appendChild(li);
                        VillageName[i] = children[j].innerHTML
                        VillageTitle[i] = children[j].innerHTML
                        VillageHref[i] = children[j].href
                    }
                }
            }
        }
        GM_setValue('VillageName', VillageName);
        GM_setValue('VillageTitle', VillageTitle);
        GM_setValue('VillageHref', VillageHref);
    } else {
        VillageName = GM_getValue('VillageName');
        VillageTitle = GM_getValue('VillageTitle');
        VillageHref = GM_getValue('VillageHref');

        for (var i = 0; i < GM_getValue('TotalVillage'); i++) {
            var li = document.createElement('li');
            var a = document.createElement('A');
            a.innerHTML = VillageName.split(',')[i];
            a.title = VillageTitle.split(',')[i];
            var oldpage = getParameterFromString(VillageHref.split(',')[i], 'page').replace('/', '%2F');
            var href = VillageHref.split(',')[i];
            var Newhref = href.replace(oldpage, location.pathname.replace('/', '%2F')) + getQuertString(href).replace('?', '%3f');
            a.href = Newhref;
            li.appendChild(a);
            VillageUL.appendChild(li);
        }
    }
}

function getParameterFromString(URL, key) {
    var str = URL.split("?");
    if (str.length < 2) {
        return "";
    }

    var params = str[1].split("&");
    for (var i = 0; i < params.length; i++) {
        var keyVal = params[i].split("=");
        if (keyVal[0] == key && keyVal.length == 2) {
            return decodeURIComponent(keyVal[1]);
        }
    }
    return "";
}

function getParameter(str, key) {
    var str = location.search.split("?");
    if (str.length < 2) {
        return "";
    }

    var params = str[1].split("&");
    for (var i = 0; i < params.length; i++) {
        var keyVal = params[i].split("=");
        if (keyVal[0] == key && keyVal.length == 2) {
            return decodeURIComponent(keyVal[1]);
        }
    }
    return "";
}

function getQuertString(str) {
    var str = location.search.split("?");
    if (str.length < 2) {
        return "";
    }
    var returnString = str[1].replace(/=/gi, '%3D').replace(/&/gi, '%26')
    return '?' + returnString;
}

//Google Chrome用GM_*系ラッパー関数
function initGMWrapper() {

    // @copyright      2009, James Campos
    // @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
    if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
        GM_addStyle = function (css) {
            var style = document.createElement('style');
            style.textContent = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        }

        GM_deleteValue = function (name) {
            localStorage.removeItem(LOCAL_STORAGE + "." + name);
        }

        GM_getValue = function (name, defaultValue) {
            var value = localStorage.getItem(LOCAL_STORAGE + "." + name);
            if (!value)
                return defaultValue;
            var type = value[0];
            value = value.substring(1);
            switch (type) {
                case 'b':
                    return value == 'true';
                case 'n':
                    return Number(value);
                default:
                    return value;
            }
        }

        GM_log = function (message) {
            console.log(message);
        }

        GM_registerMenuCommand = function (name, funk) {
            //todo
        }

        GM_setValue = function (name, value) {
            value = (typeof value)[0] + value;
            try {
                localStorage.setItem(LOCAL_STORAGE + "." + name, value);
            } catch (e) {
                alert("localStorage (" + e + ")");
                throw e;
            }
        }

        //by froo
        GM_listValues = function () {
            var res = new Array();
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(LOCAL_STORAGE + ".", 0) == 0) {
                    res.push(key.replace(/^.*?\./, ""));
                }
            }
            return res;
        }
    }
}