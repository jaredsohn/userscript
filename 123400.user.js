
// ==UserScript==
// @name           Script KKN
// @namespace      kknTool
// @include        http://*.sangokushi.in.th/*
// Sangokushi Tool
// Develop By KKN
// Upload By Jadeson
// 23/12/2554
// ==/UserScript==


var LOCAL_STORAGE = 'kknTool';

//CSS
var PageHead = document.getElementsByTagName('head')[0];
var CssStyle = document.createElement('style');
var StyleStr;

//Array
var VillageName = new Array();
var VillageTitle = new Array();
var VillageHref = new Array();
var AreaClass = new Array();
var AreaShow = new Array();

//Toolbar หลัก
var KKNToolBar = document.createElement('div');
var Credit = document.createElement('span');
var ToolBar = document.createElement('div');
var ToolBarUl = document.createElement('UL');

//จุดยุทธศาสตร์
var StrategyLi = document.createElement('li');
var StrategyA = document.createElement('a');
var StrategySpan = document.createElement('span');
var StrategySubDiv = document.createElement('div');
var StrategyUL = document.createElement('ul');

//เลือกฐาน
var VillageLi = document.createElement('li');
var VillageA = document.createElement('a');
var VillageSpan = document.createElement('span');
var VillageSubDiv = document.createElement('div');
var VillageUL = document.createElement('ul');

//ระดับอาณาเขต
var WarPowerLi = document.createElement('li');
var WarPowerA = document.createElement('a');
var WarPowerSpan = document.createElement('span');
var WarPowerSubDiv = document.createElement('div');
var WarPowerUL = document.createElement('ul');

initGMWrapper();
CreateCSS();
CreateMainDiv();
PageHead.appendChild(CssStyle);
document.body.insertBefore(KKNToolBar, document.body.firstChild);
SetVillageMenu();
SetStrategy();
GenerateAreaClass();
ShowAreaPower(false);
SetAreaPowerCheckBoxListener();

/*GM_deleteValue('VillageName');
GM_deleteValue('VillageTitle');
GM_deleteValue('VillageHref');*/

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
	    '.nav a .menu-mid { height: 18px; line-height: 21px; display: block; float: left; width:75px; } ' +
        '.nav li:hover .sub,.nav li.hover .sub { display:block; } ' +
        '.nav li .sub { display: none; position: absolute; top: 15px; padding-top: 3px; width: 186px; left: -10px; } ' +
        '.nav li ul { background-color:Black; width: 125px; height: auto; margin: 0; padding: 0 12px 0px; list-style: none; } ' +
        '.nav li ul li { width: 125px; } ' +
        '.hidden { display:none; }';
    CssStyle.appendChild(document.createTextNode(StyleStr));
}

function CreateMainDiv() {
    KKNToolBar.id = 'KKNToolBar';
    KKNToolBar.className = 'Container';

    ToolBar.id = 'ToolBar';
    ToolBar.className = 'nav';

    //เลือกฐาน
    VillageLi.id = 'VillageLi';
    VillageUL.id = 'VillageUL';
    VillageSubDiv.className = 'sub';
    VillageSpan.className = 'menu-mid';
    VillageSpan.innerHTML = 'เลือกฐาน'
    VillageA.href = '#';

    VillageSubDiv.appendChild(VillageUL);
    VillageA.appendChild(VillageSpan);
    VillageLi.appendChild(VillageA);
    VillageLi.appendChild(VillageSubDiv);
    ToolBarUl.appendChild(VillageLi);

    //จุดยุทธศาสตร์
    StrategyLi.id = 'StrategyLi';
    StrategyUL.id = 'StrategyUL';
    StrategySubDiv.className = 'sub';
    StrategySpan.className = 'menu-mid';
    StrategySpan.innerHTML = 'จุดยุทธศาสตร์'
    StrategyA.href = '#';

    StrategySubDiv.appendChild(StrategyUL);
    StrategyA.appendChild(StrategySpan);
    StrategyLi.appendChild(StrategyA);
    StrategyLi.appendChild(StrategySubDiv);
    ToolBarUl.appendChild(StrategyLi);

    //ระดับอาณาเขต
    if (location.pathname == '/map.php') {
        WarPowerLi.id = 'WarPowerLi';
        WarPowerUL.id = 'WarPowerUL';
        WarPowerSubDiv.className = 'sub';
        WarPowerSpan.className = 'menu-mid';
        WarPowerSpan.innerHTML = 'ระดับอาณาเขต'
        WarPowerA.href = '#';

        WarPowerSubDiv.appendChild(WarPowerUL);
        WarPowerA.appendChild(WarPowerSpan);
        WarPowerLi.appendChild(WarPowerA);
        WarPowerLi.appendChild(WarPowerSubDiv);
        ToolBarUl.appendChild(WarPowerLi);

        for (i = 1; i <= 10; i++) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            var span = document.createElement('span');
            var Input = document.createElement('input');
            span.innerHTML = ' ระดับ ' + i;
            Input.type = 'checkbox';
            Input.id = 'Power' + i;

            a.href = '#';
            a.appendChild(Input);
            a.appendChild(span);

            li.appendChild(a);
            WarPowerUL.appendChild(li);
        }
        var li = document.createElement('li');
        var a = document.createElement('a');
        var span = document.createElement('span');
        a.href = '#';
        a.title = 'ซ่อน-แสดง ทั้งหมด'
        a.id = 'aToggle'
        li.appendChild(a);
        WarPowerUL.appendChild(li);
    }

    ToolBar.appendChild(ToolBarUl);
    KKNToolBar.appendChild(ToolBar);

    //Credit
    Credit.id = 'Credit';
    Credit.className = 'Credit';
    Credit.innerHTML = 'Develop By KKN v2.11';
    KKNToolBar.appendChild(Credit)
}

function SetVillageMenu() {
    if (location.pathname == '/village.php') {
        var VillageList = document.evaluate('//*[@id="lodgment"]/div[@class="floatInner"]/ul/li', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        GM_setValue('TotalVillage', VillageList.snapshotLength);

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

        for (var i = 0; i < VillageList.snapshotLength; i++) {
            var list = VillageList.snapshotItem(i)
            if (list.hasChildNodes()) {
                var children = list.childNodes;

                for (var j = 0; j < children.length; j++) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    
                    if (children[j].tagName == 'span') {
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
        VillageName = GM_getValue('VillageName').split(",");
        VillageTitle = GM_getValue('VillageTitle').split(",");
        VillageHref = GM_getValue('VillageHref').split(",");

        for (var i = 0; i < GM_getValue('TotalVillage'); i++) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML = VillageName[i];
            a.title = VillageTitle[i];
            var oldpage = getParameterFromString(VillageHref[i], 'page').replace('/', '%2F');
            var href = VillageHref[i];
            var Newhref = href.replace(oldpage, location.pathname.replace('/', '%2F')) + getQuertString(href).replace('?', '%3f');
            a.href = Newhref;
            li.appendChild(a);
            VillageUL.appendChild(li);
        }
    }
}

function SetStrategy() {
    var Strategy = document.evaluate('//*[@class="footer_box"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    var StrategyList = document.evaluate('//*[@class="bookmarkList"]/li', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var li = document.createElement('li');
    var a = document.createElement('a');

    a.href = '/map_bookmark.php'
    a.title = 'แก้ไข'
    a.innerHTML = '>> แก้ไข <<'
    a.className = 'edit'
    li.appendChild(a);
    StrategyUL.appendChild(li);

    Strategy.className = 'hidden';

    for (var i = 0; i < StrategyList.snapshotLength; i++) {
        var list = StrategyList.snapshotItem(i)
        if (list.hasChildNodes()) {
            var children = list.childNodes;

            for (var j = 0; j < children.length; j++) {
                var li = document.createElement('li');
                var a = document.createElement('a');

                a.href = children[j].href
                a.title = children[j].title
                a.innerHTML = children[j].innerHTML
                li.appendChild(a);
                StrategyUL.appendChild(li);
            }
        }
    }
}

function GenerateAreaClass() {
    for (i = 0; i < 400; i++) {
        AreaClass[i] = 'mapAll' + padZero(i + 1);
    }

    var TempAreaShow = GM_getValue('AreaShow');
    if (TempAreaShow == undefined) {
        AreaShow = new Array();
        for (i = 0; i < 10; i++) {
            AreaShow[i] = 'checked';
        }
        GM_setValue('AreaShow', AreaShow);
    } else {
        AreaShow = TempAreaShow.split(",");
    }
}

function SetAreaPowerCheckBox() {
    var IsShow = false;

    for (i = 0; i < 10; i++) {
        var checkbox = document.getElementById('Power' + (i + 1));
        checkbox.checked = AreaShow[i];
        if (AreaShow[i] == 'checked') {
            IsShow = true;
        }
    }

    var aToggle = document.getElementById('aToggle');
    if (IsShow) {
        aToggle.innerHTML = 'ซ่อนทั้งหมด';
    } else {
        aToggle.innerHTML = 'แสดงทั้งหมด';
    }
}

function SetAreaPowerCheckBoxListener() {
    if (location.pathname == '/map.php') {
        var checkbox = document.getElementById('Power1');
        checkbox.addEventListener("click", function () { AreaCheckBoxChange(1) }, true);
        checkbox = document.getElementById('Power2');
        checkbox.addEventListener("click", function () { AreaCheckBoxChange(2) }, true);
        checkbox = document.getElementById('Power3');
        checkbox.addEventListener("click", function () { AreaCheckBoxChange(3) }, true);
        checkbox = document.getElementById('Power4');
        checkbox.addEventListener("click", function () { AreaCheckBoxChange(4) }, true);
        checkbox = document.getElementById('Power5');
        checkbox.addEventListener("click", function () { AreaCheckBoxChange(5) }, true);
        checkbox = document.getElementById('Power6');
        checkbox.addEventListener("click", function () { AreaCheckBoxChange(6) }, true);
        checkbox = document.getElementById('Power7');
        checkbox.addEventListener("click", function () { AreaCheckBoxChange(7) }, true);
        checkbox = document.getElementById('Power8');
        checkbox.addEventListener("click", function () { AreaCheckBoxChange(8) }, true);
        checkbox = document.getElementById('Power9');
        checkbox.addEventListener("click", function () { AreaCheckBoxChange(9) }, true);
        checkbox = document.getElementById('Power10');
        checkbox.addEventListener("click", function () { AreaCheckBoxChange(10) }, true);
        checkbox = document.getElementById('aToggle');
        checkbox.addEventListener("click", function () { ToggleShowArea() }, true);
    }
}

function AreaCheckBoxChange(id) {
    if (AreaShow[id - 1] == 'checked') {
        AreaShow[id - 1] = '';
    } else {
        AreaShow[id - 1] = 'checked';
    }
    GM_setValue('AreaShow', AreaShow);
    ShowAreaPower(true);
}

function ToggleShowArea() {
    var IsShow = false;

    for (i = 0; i < 10; i++) {
        if (AreaShow[i] == 'checked') {
            IsShow = true;
            break;
        }
    }

    for (i = 0; i < 10; i++) {
        if (IsShow) {
            AreaShow[i] = '';
        } else {
            AreaShow[i] = 'checked';
        }
    }

    var aToggle = document.getElementById('aToggle');
    if (IsShow) {
        aToggle.innerHTML = 'แสดงทั้งหมด';
    } else {
        aToggle.innerHTML = 'ซ่อนทั้งหมด';
    }

    GM_setValue('AreaShow', AreaShow);
    ShowAreaPower(true);
}

function ShowAreaPower(Reload) {
    if (location.pathname == '/map.php') {
        var mapElem = document.evaluate('//*[@id="mapsAll"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        var AreasPos = document.evaluate('//*[@id="mapOverlayMap"]//area', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var Areas = document.evaluate('//*[@id="mapOverlayMap"]//area/@onmouseover', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        SetAreaPowerCheckBox();
        for (var i = 0; i < Areas.snapshotLength; i++) {
            //<img src=\'/20110921-01/extend_project/thai/img/common/star_warpower_b.gif\' />            
            try {
                var AreaPower = Areas.snapshotItem(i).textContent.match(/star_warpower_b/gi).length;
                if (AreaPower != 'undefined') {
                    var addElemPow = document.createElement("img");

                    addElemPow.id = 'AreaPower' + i
                    addElemPow.className = AreaClass[i]

                    if (Reload) {
                        var oldImg = document.getElementById('AreaPower' + i);
                        if (oldImg != null) {
                            mapElem.removeChild(oldImg);
                        }
                    }

                    if (AreaShow[AreaPower - 1] == 'checked') {
                        switch (AreaPower) {
                            case 1:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
                                            '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sFCQoFB+9BYoYAAAAmaVRYdENv' +
                                            'bW1lbnQAAAAAAFNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlsZBjQgAAAHVJREFUaN7t1zEOgCAM' +
                                            'BVA0Lp6acGpHnRxNWAolvjcx8tPShlIAAAAAAACgz5blIu1q93uuZw271zEz2O8q/BU+ssJ7tjcW' +
                                            'GTZl4GgCW0sDB1b0+9XSAgtsaC01sLS0wAKv/z1MUeFRA8taytLCIysOAAD0eQCn9xwmxjFO5QAA' +
                                            'AABJRU5ErkJggg==';
                                break;
                            case 2:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
                                            '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sFCQoFFRz4E84AAAAmaVRYdENv' +
                                            'bW1lbnQAAAAAAFNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlsZBjQgAAAJtJREFUaN7t1kEKgzAQ' +
                                            'BdBEsumpxVN32a4EcdUimRn0PXCjQvhJJpPWAAAAAAAA4Dc9c/DtvX3O79bX2m8XeA96DHcOPzt4' +
                                            '6qoev+3PrPGXKmGv/PuPkb3K0Vt3aQ/zuMC9ynaOOqXDazi73ZTodZE9uFwN3/KmVaVFpYSdeasS' +
                                            'tmLY2ZMwMuo1s1Z7dNjsU3pUCeouLTAAAJDpC/JbU8OqPFjnAAAAAElFTkSuQmCC';
                                break;
                            case 3:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
                                            '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sFCQksJ5IvY/wAAAAmaVRYdENv' +
                                            'bW1lbnQAAAAAAFNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlsZBjQgAAAbtJREFUaN7t2L1rFEEU' +
                                            'APDfnomCWARMo10KtbGKplAsAmJhF4iIYLqcn4j4J4wEwVItVDCdTapgYeyUxEoQSWWnWKggItgo' +
                                            '4kdcC6c4Fw+rXdzl/ZrduRnYeTc77+0uIYQQQgghhBBCCCGEEEIIIYS/Kpq+YCpN4zQOYAdKvMMT' +
                                            '3EmFR3Vev9dgoCOptIj7eIApbMN+vMQJPMxjajPS4OJexjw20EuFD/n356nUx6vcnke/9SuMM/m4' +
                                            'CdcqfW+bmkSTAf8cOP9a6RvvYsAX8RHvcb7SN9XUJBrbw6mwhKUh3XND7oRWr/Cw7H0Qs7n5GSc7' +
                                            'VYcHyxRmcAujuIurqag3gRUNB7mKSbzJ22kCK1hIhWedfNKq/AHbcRPHsY5LqfC4swHnoMdy9obv' +
                                            'OJIKa51NWvgxcD6KK53O0thdaU+2tg6n0lEsYivO5VpcNV1pf2vzCt/GTozh+pAxM5X2apsDHv/H' +
                                            'HbALhyr7eaHNAa/k4yecrQTbw42BSrGBft31uO5n6QvYg9f5vXdzfj3ch4TDedyLHOxazfOpvw6n' +
                                            '0hacwjHszfv5i9+fdZ5iGfdS8Ud5CiGEEEII4X/3CyrNXcervOTXAAAAAElFTkSuQmCC';
                                break;
                            case 4:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
                                            '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sFCQksNWGWErQAAAAmaVRYdENv' +
                                            'bW1lbnQAAAAAAFNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlsZBjQgAAAV5JREFUaN7t178vBEEY' +
                                            'xvHvrI1CodG4RhSiQcXdKVWUovA/oPA3vB3JdRL9iVIjEoVOS5QSGq1EIpEoRYxmCtkModjZH55P' +
                                            'OTN37z77bmZnQURERERERERERERERESiXF0uxDyrwDmQmyvvurKahJ0HToC87FpZDcJOhs6Op6iX' +
                                            'VRx2DDgDplLVzCoMmwFDoJuybpUd3gduI+OPZRbNK+ruFvACPEWmr1vVYfOsAV1z7AH9yJKr1nTY' +
                                            'PAvALrARhvqpO5wnDNsBDoBNc7yFHXqusOwDuGn8Ix3CHQM75ngOw4uRG35vjtdGBw6vnyNgYI67' +
                                            'L1PJH+dUHR4Al+a4KIz3YoHNM9HYwObZBkbNcRiZ/q7Ds439WjLPOzDy59+V+LVU6i5tLv7/5lkH' +
                                            'TovvX3Msm2fYxqNl74cDx8q/CmyO6bYdLR2wlPpImWTTKgR9BDq/WPpgjhlEREREROrtE/XnShDs' +
                                            'IA+0AAAAAElFTkSuQmCC';
                                break;
                            case 5:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
                                            '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sFCQktFDTkM6sAAAAmaVRYdENv' +
                                            'bW1lbnQAAAAAAFNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlsZBjQgAAAUhJREFUaN7t1r8rhVEc' +
                                            'x/FPfpYSyh/wZGCVxWpSMhiUhcGou9illL/D4E+QxaqkDCg2Bl2KMvhR4ir0tjzqdjyuUu7tnOfz' +
                                            'qjs8nTs87+73nHMlMzMzMzMzMzMzMzMzswiB2kELqUUtgR5B/PRJLfiiUWxSwaDst1jQwX++Q0eT' +
                                            'mycarNUknUoJ7WHQJmixTKdwFZSVJTYDVVv9Hm1N3r+7ZQseAZ2AXkEvoHPQBmg0xZE+AlVAg6Ae' +
                                            '0AzoNr+KPkArZdjX08EdPJt6cFcQvJd68EAQ/JTSoVVkOHjujDoYNAW6Bt2B5gu+Mh48n8U+spd1' +
                                            '4/pQsL4djPRq7MG1upirYK0/XAf1xh688/XrgiaDtfW62Psk/nyAhvKx3geNgbrzk3kZ9JbHHsK3' +
                                            'wyvq6D7QGugY9Ax6B92AtkBz0PKbwszMzMzsLz4B1idF0pi1GJAAAAAASUVORK5CYII=';
                                break;
                            case 6:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
                                            '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sFCQktJvwzYisAAAAmaVRYdENv' +
                                            'bW1lbnQAAAAAAFNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlsZBjQgAAAYtJREFUaN7t1r9LVWEc' +
                                            'x/HPEaEkRC4mgniJHMTpgoN3bbigjs6NDS2O4iguLRnVEFxa/BMcHRwUErRwcIkQBclJg6BBNA8N' +
                                            'vVuOcPhyaLvKefi8tu/5PsPzOQ/PD8nMzMzMzMzMzMzMzMzMKmX3PQHQgKRZSR1JM5Ims0zDyf1p' +
                                            'UBP0AXQJ+gXqguZBo6kF7QetgHLQX9Ab0FCS+wf0GPQJBOgPaCHZw6II+7UIC+hlymEfgPZKYbeT' +
                                            'vgpA70thAT1LOWy7OJxuw56CJkDroAvQDegQ9CKVwDthdY9B30Ad0EPQYqn3se5hWyEsoN+gqbC/' +
                                            'y/3ndQ78qiLwWhgzHvqf6xx4tyLw0zBmNvSvezmnvh5nngr1lyzT9/Bt+i7n1OvAjVBvVYyZCfVJ' +
                                            'nQPnod6vGNMO9Wad9/BB2J/N0H8S+legsTqv8Eaof4Z6LtTLWabzOq/wIOistIKP/nOKv0vlpdUC' +
                                            '/ShCdUHDoAZotfiWg5ZSe0+PgF6DjoqXVl48L9/Ge9nMzMzMrCb+AY8aZFRsHCZ+AAAAAElFTkSu' +
                                            'QmCC';
                                break;
                            case 7:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
                                            '/wD/oL2nkwAAAAd0SU1FB9sFCQoLLN1+tkgAAAAmaVRYdENvbW1lbnQAAAAAAFNvZnR3YXJlOiBN' +
                                            'aWNyb3NvZnQgT2ZmaWNlsZBjQgAAAHxJREFUaN7t17ENgDAMBMDggRiLoRiLgYCWMgUkwbmrkeDl' +
                                            'x5JLAQAAAAAAgDpLj5ee+3rVPhvb8eo3xshhvxAj1+/t6TavdM8ql1H/3d6VF/bvyywKeac7Zdgw' +
                                            '2YZhewSebmnFbFV2PKh0sq1swtk1vzmftU5x8wIAwCRuYPg0GwM+uboAAAAASUVORK5CYII=';
                                break;
                            case 8:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
                                            '/wD/oL2nkwAAAAd0SU1FB9sFCQoLHYygtnIAAAAmaVRYdENvbW1lbnQAAAAAAFNvZnR3YXJlOiBN' +
                                            'aWNyb3NvZnQgT2ZmaWNlsZBjQgAAAKxJREFUaN7t10ESgjAMBVDogTyWh/JYHkjdIqNOu2ib1PeW' +
                                            'sIA/SRPYNgAAAAAAAKizz3rw43Z5frpervd9qcDnoMeAx3u9gpcoYWs7IE3gXgFCV/ivA5/beVQH' +
                                            'hK1w+qHVEqDnaioRqjZiHU398GhZT6kDf6vkchWuqeio0CGndM8VVTK/fIoKjxxQYVt6ZBeEPMOp' +
                                            'h9bsFp5S4Zb/3qW+tH6d1WidAAAAvHsBb4FL1JBrLwgAAAAASUVORK5CYII=';
                                break;
                            case 9:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
                                            '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sFCQkuM7rD1QMAAAAmaVRYdENv' +
                                            'bW1lbnQAAAAAAFNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlsZBjQgAAAWVJREFUaN7t178rhVEc' +
                                            'x/H34yp0lUEGyqCUDGIwS0pKKf4Jmz/AplgNIn/ALYvNcEeDSQY/ymAwoBh0U64k+dHHcug4f8AT' +
                                            'p8+rnrrnnOn9fLv3Pg+YmZmZmZmZmZmZmZmZ2d8hWBDUBQ3Bm+BOUBMM5xbaFUIleBJMCqqClbD3' +
                                            'IpjNJbZdcBjCJFiNzjqj/WYuwZtRlASjyc34OcshdkjwEUU9CIrovL+s4JaSmheBSrQ+Kn6HDZZ1' +
                                            '88sKnk7Wp8l6PLfgdILnyXoit7+jt+QHayw6axM85/Ydvk3W19HnOaCa24Q3kgm3hv2K4Dg5e88h' +
                                            'uEdwE0XNhL1twWUSXMtlyn2CHUEzXHuCkfA8/R37KhjI+SViLpnucs6xRfJsva/fDyfZBS9FsReC' +
                                            '7pxj5wXvIfZE0JtraFWwJvgM15agI7fIHsGUYF1wHya7G78elqkoIfgRuALOgAOgXkADMzMzM7P/' +
                                            '7QvzstsAdJuWxgAAAABJRU5ErkJggg==';
                                break;
                            case 10:
                                addElemPow.src = 'data:image/gif;base64,' +
                                            'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
                                            '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sFCQkvC4vaXNwAAAAmaVRYdENv' +
                                            'bW1lbnQAAAAAAFNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlsZBjQgAAAhxJREFUaN7tmD1rVEEU' +
                                            'hp+bDYrB+MVixIga4gYJIWJjSsHGQuxEEFKKxMLOVlCwEC0sQ7D3D6QKgWCjoDYqkQ0EFRa/EDSK' +
                                            'SBCJx2aCw2Hu3QUjmYX3gcveOfPOcN97Zs7OLgghhBBCCCGEEEIIIYQQQgghkhQbOZlBL7AL2A3U' +
                                            'gQFgPzAMjAGHgNECflfM0QdcBSaD/g1wt4CZ7N6ewVsDq7gW2ow/bNA0+GYwbnAqGnst66VjcD1h' +
                                            '+FaFfq/B66C7E2K1aOwvg5F/fa6e/+h5IhF7XGK2AO4DQyE0Gz53RLJeYCrnDH9OZHiwRDsVadbC' +
                                            'PsZgzI1/lqvZRsLsuxLtTvdylqK+s26O77ku6Y6XM3AF2BO1X0T3Dafd1k2GnySyWwMuu/Dz6P6o' +
                                            '61vtasPAyfA9TUmGR13fxxz371aDn27vrRn0J7S3E3v9YNT/xfXN5pjh48AWF1sq0gXnhGt/LaAV' +
                                            'zA6GE1sndWBTDXe6nFNFKV7O4wn9XLcYLstM3bVfVhh+VcDTbs9wzbWb0f0x1zedY8GqJ4rQavgV' +
                                            '1clp7HTU14zinwy252j4TMLwwwr9I6dthHh/qOzr8Usb9Yw9m7icAeZd+31Uvdef7QFwL9cz9Fwi' +
                                            'wxcq9AcMfkTaWojfDO2Wwb5czRYGKwnDw23GXYy05w2GDD4YLBscyc1kq80/HP5qlcxzzmAxnNCW' +
                                            'DW5kWaSEEEIIIYT4yx9/kknxLpg8MAAAAABJRU5ErkJggg==';
                                break;
                        }
                        mapElem.appendChild(addElemPow);
                    } else {
                    
                    }
                }
            }
            catch (ex) {
                //alert(ex.ToString);
            }
        }
    }
}

function getParameter(key) {
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

//先頭ゼロ付加
function padZero(num) {
    var result;
    if (num < 10) {
        result = "0" + num;
    } else {
        result = "" + num;
    }
    return result;
}