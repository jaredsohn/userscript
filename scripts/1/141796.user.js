// ==UserScript==
// @name           دعم المحروسه تصميم سقها بس & انهيار
// @namespace      n\a
// @include      http://*.travian*.*
// @exclude      http://*.travian*.*/dorf3*
// @exclude      http://*.travian*.*/logout*
// @exclude      http://*.travian*.*/login*
// ==/UserScript==
function ID(id) {
    return document.getElementById(id)
};

function Xpath(path) {
    return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
};


function hotKeys(event) {

    if ((event.altKey == 1) && ((event.shiftKey == 0) && (event.ctrlKey == 1))) {
        if (event.keyCode == 88) //z
        {
            openPopup();
        }
    }
}
document.addEventListener("keydown", hotKeys, true);


function openPopup() {
    sel = getVillageDropDown();
    header = "<head><style type=\"text/css\">";
    header += "img.unit{width:16px;height:16px;}";
    header += "img.u1,img.u2,img.u3,img.u4,img.u5,img.u6,img.u7,img.u8,img.u9,img.u10{background-image:url(/gpack/travian_Travian_4.0_Ilyas/img/u/v1_romans2.gif);}";
    header += "img.u11,img.u12,img.u13,img.u14,img.u15,img.u16,img.u17,img.u18,img.u19,img.u20{background-image:url(/gpack/travian_Travian_4.0_Ilyas/img/u/v2_teutons2.gif);}";
    header += "img.u21,img.u22,img.u23,img.u24,img.u25,img.u26,img.u27,img.u28,img.u29,img.u30{background-image:url(/gpack/travian_Travian_4.0_Ilyas/img/u/v3_gauls2.gif);}"
    header += "img.u1,img.u11,img.u21,img.u31,img.u41,img.u51,img.uhab{background-position:0 0;}" + "img.u2,img.u12,img.u22,img.u32,img.u42,img.u52,img.ucata{background-position:-19px 0;}" + "img.u3,img.u13,img.u23,img.u33,img.u43,img.u53,img.uhero{background-position:-38px 0;}" + "img.u4,img.u14,img.u24,img.u34,img.u44,img.u54,img.uunits{background-position:-57px 0;}" + "img.u5,img.u15,img.u25,img.u35,img.u45,img.u55{background-position:-76px 0;}img.u6,img.u16,img.u26,img.u36,img.u46,img.u56{background-position:-95px 0;}" + "img.u7,img.u17,img.u27,img.u37,img.u47,img.u57{background-position:-114px 0;}img.u8,img.u18,img.u28,img.u38,img.u48,img.u58{background-position:-133px 0;}" + "img.u9,img.u19,img.u29,img.u39,img.u49,img.u59{background-position:-152px 0;}img.u10,img.u20,img.u30,img.u40,img.u50,img.u60,img.app{background-position:-171px 0;}";
    header += "img.r1,img.r2,img.r3,img.r4,img.r5{height:12px;width:18px;background-image:url(/gpack/travian_Travian_4.0_Ilyas/img/a/res2-ltr.gif);}" + "img.r1{background-position:0 0;}img.r2{background-position:0 -22px;}img.r3{background-position:0 -44px;}" + "img.r4{background-position:0 -66px;}img.r5{background-position:0 -88px;}" + ".bold_head {font-weight: bold;text-align:center;}" + ".center {text-align:center;}" + ".village_table {font-family: 'Courier New', Courier, monospace;font-size: 14px;}";
    header += "</style></head>";
    hover = '<div id="hoverpopup" style="background-color:white; visibility:hidden; position:absolute; top:100; left:100; padding:1px; border-style: solid; border-width: 1px; ">0</div>';


    massDiv = '<fieldset>' + '<legend>دعم المحروسه تصميم سقها بس & انهيار</legend>' + '<table border=0>' + '<tr>' + '<td colspan=10 class="bold_head">Cords:</td>' + '</tr>' + '<tr><td colspan=4 class="center">' + sel + '</td>' +

    '<td colspan=2 class="center">X:<input size="4" id="massX" name="X" value="-15"></td>' + '<td colspan=2 class="center">Y:<input size="4" id="massY" name="Y" value="15"></td>' +

    '<td colspan=4 class="center"><input type="button" id="massCords" value="Submit"></td>' + '</tr>' + '<tr>' + '<td colspan=10 class="bold_head">Ratios:</td>' + '<tr>' + '<td colspan=5><button id="fourth">1/4</button></td>' + '<td colspan=5><button id="third">1/3</button></td>' + '</tr>' + '</tr>' + '<tr>' + '<td><button id="leg"><img class="unit u1" src="img/x.gif"></button></td>' + '<td><button id="pret"><img class="unit u2" src="img/x.gif"></button></td>' + '<td><button id="imp"><img class="unit u3" src="img/x.gif"></button></td>' + '<td><button id="el"><img class="unit u4" src="img/x.gif"></button></td>' + '<td><button id="ei"><img class="unit u5" src="img/x.gif"></button></td>' + '<td><button id="ec"><img class="unit u6" src="img/x.gif"></button></td>' + '<td><button id="ram"><img class="unit u7" src="img/x.gif"></button></td>' + '<td><button id="kat"><img class="unit u8" src="img/x.gif"></button></td>' + '<td><button id="sen"><img class="unit u9" src="img/x.gif"></button></td>' + '<td><button id="set"><img  class="unit u10" src="img/x.gif"></button></td>' + '</tr>' + '<tr>' + '<td><button id="clu"><img class="unit u11" src="img/x.gif"></button></td>' + '<td><button id="spe"><img class="unit u12" src="img/x.gif"></button></td>' + '<td><button id="axe"><img class="unit u13" src="img/x.gif"></button></td>' + '<td><button id="sco"><img class="unit u14" src="img/x.gif"></button></td>' + '<td><button id="pal"><img class="unit u15" src="img/x.gif"></button></td>' + '<td><button id="tk"><img class="unit u16" src="img/x.gif"></button></td>' + '<td><button id="ram2"><img class="unit u17" src="img/x.gif"></button></td>' + '<td><button id="kat2"><img class="unit u18" src="img/x.gif"></button></td>' + '<td><button id="sen2"><img class="unit u19" src="img/x.gif"></button></td>' + '<td><button id="set2"><img class="unit u20" src="img/x.gif"></button></td>' + '</tr>' + '<tr>' + '<td><button id="pha"><img class="unit u21" src="img/x.gif"></button></td>' + '<td><button id="swo"><img class="unit u22" src="img/x.gif"></button></td>' + '<td><button id="pat"><img class="unit u23" src="img/x.gif"></button></td>' + '<td><button id="tt"><img class="unit u24" src="img/x.gif"></button></td>' + '<td><button id="dru"><img class="unit u25" src="img/x.gif"></button></td>' + '<td><button id="hae"><img class="unit u26" src="img/x.gif"></button></td>' + '<td><button id="ram3"><img class="unit u27" src="img/x.gif"></button></td>' + '<td><button id="kat3"><img class="unit u28" src="img/x.gif"></button></td>' + '<td><button id="sen3"><img class="unit u29" src="img/x.gif"></button></td>' + '<td><button id="set3"><img class="unit u30" src="img/x.gif"></button></td>' + '</tr>' + '<tr></tr><tr>' + '<td colspan=2 ><img class="r1" src="img/x.gif"><input size="5" id="r_wood" name="w" value="0/114300"></td>' + '<td colspan=2><img class="r2" src="img/x.gif"><input size="5" id="r_clay" name="e" value="0/114300"></td>' + '<td colspan=2><img class="r3" src="img/x.gif"><input size="5" id="r_iron" name="r" value="0/114300"></td>' + '<td colspan=2><img class="r4" src="img/x.gif"><input size="5" id="r_wheat" name="ww" value="272000/114300"></td>' + '<td colspan=2><input type="button" id="massRatios" value="Submit"></td>' + '</tr>' + '<tr>' + '<td  colspan=10 class="bold_head">Merchants:</td>' + '</tr>' + '</tr>' + '<tr>' + '<td><img class="r1" src="img/x.gif"></td><td><input size="2" id="m_wood"></td>' + '<td><img class="r2" src="img/x.gif"></td><td><input size="2" id="m_clay"></td>' + '<td><img class="r3" src="img/x.gif"></td><td><input size="2" id="m_iron"></td>' + '<td><img class="r4" src="img/x.gif"></td><td><input size="2" id="m_wheat"></td>' + '<td colspan=2><input type="button" id="massMerchants" value="Submit"></td>' + '</tr>' +

    '<tr>' + '<td colspan=10>Overflow protection<input type="checkbox" id="overflow" checked></td>' + '</tr>' + '<tr>' + '<td colspan=3><input type="button" id="twiceToggle" value="Send twice toggle"></td>' + '<td colspan=3><input type="button" id="sendAll" value="Send all"></td>' + '<td  colspan=4><input type="button" id="refresh" value="Refresh"></td>' + '</tr>' + '<tr>' + '<td colspan=2> Total </td>' + '<td colspan=2><img class="r1" src="img/x.gif"><input size="4" id="total_wood" readonly="readonly" value="0"></td>' + '<td colspan=2><img class="r2" src="img/x.gif"><input size="4" id="total_clay" readonly="readonly" value="0"></td>' + '<td colspan=2><img class="r3" src="img/x.gif"><input size="4" id="total_iron" readonly="readonly" value="0"></td>' + '<td colspan=2><img class="r4" src="img/x.gif"><input size="4" id="total_wheat" readonly="readonly" value="0"></td>' + '</tr>' + '</table>' + '<div id="sendAllCounter"></div>' + '</fieldset>';

    villages = getVillageList()
    numVillages = villages.length;


    table = '<table class="village_table" id="formTable">';
    table += '<tr><th colspan=2>Village name</th>' + '<th>X</th>' + '<th>Y</th>' + '<th>Carry capacity</th>' + '<th>Merchants</th>' + '<th><img class="r1" src="img/x.gif"></th>' + '<th><img class="r2" src="img/x.gif"></th>' + '<th><img class="r3" src="img/x.gif"></th>' + '<th><img class="r4" src="img/x.gif"></th>' + '<th>Twice</th>' + '<th>Send</th>' + '<th>Info</th>';
    table += '</tr>';


    for (x = 0; x < numVillages; x++) {
        table += '<tr id="' + villages[x] + '"></td></tr>';
    }
    table += '</table>';


    form = window.open('', '', 'scrollbars=yes,width=800,height=700');
    div = "<div id=\"formDiv\">ERROR</div>";
    form.document.write(div);
    formDiv = form.document.getElementById('formDiv');
    formDiv.innerHTML = header + hover + massDiv + table;


    form.document.getElementById('massCords').addEventListener("click", massCords, true);
    form.document.getElementById('massRatios').addEventListener("click", massRatios, true);
    form.document.getElementById('massMerchants').addEventListener("click", massMerchants, true);
    form.document.getElementById('twiceToggle').addEventListener("click", twiceToggle, true);
    form.document.getElementById('sendAll').addEventListener("click", sendAll, true);
    form.document.getElementById('refresh').addEventListener("click", refresh, true);

    form.document.getElementById('fourth').addEventListener("click", function () {
        predefinedMassRatios(1, 1, 1, 1)
    }, true);
    form.document.getElementById('third').addEventListener("click", function () {
        predefinedMassRatios(1, 1, 1, 0)
    }, true);

    form.document.getElementById('leg').addEventListener("click", function () {
        predefinedMassRatios(120, 100, 180, 40)
    }, true);
    form.document.getElementById('pret').addEventListener("click", function () {
        predefinedMassRatios(100, 130, 160, 70)
    }, true);
    form.document.getElementById('imp').addEventListener("click", function () {
        predefinedMassRatios(150, 160, 210, 80)
    }, true);
    form.document.getElementById('el').addEventListener("click", function () {
        predefinedMassRatios(140, 160, 20, 40)
    }, true);
    form.document.getElementById('ei').addEventListener("click", function () {
        predefinedMassRatios(550, 440, 320, 100)
    }, true);
    form.document.getElementById('ec').addEventListener("click", function () {
        predefinedMassRatios(550, 640, 800, 180)
    }, true);
    form.document.getElementById('ram').addEventListener("click", function () {
        predefinedMassRatios(900, 360, 500, 70)
    }, true);
    form.document.getElementById('kat').addEventListener("click", function () {
        predefinedMassRatios(950, 1350, 600, 90)
    }, true);
    form.document.getElementById('sen').addEventListener("click", function () {
        predefinedMassRatios(30750, 27200, 45000, 37500)
    }, true);
    form.document.getElementById('set').addEventListener("click", function () {
        predefinedMassRatios(5800, 5300, 7200, 5500)
    }, true);
    form.document.getElementById('fourth').addEventListener("click", function () {
        predefinedMassRatios(1, 1, 1, 1)
    }, true);

    form.document.getElementById('clu').addEventListener("click", function () {
        predefinedMassRatios(95, 75, 40, 40)
    }, true);
    form.document.getElementById('spe').addEventListener("click", function () {
        predefinedMassRatios(145, 70, 85, 40)
    }, true);
    form.document.getElementById('axe').addEventListener("click", function () {
        predefinedMassRatios(130, 120, 170, 70)
    }, true);
    form.document.getElementById('sco').addEventListener("click", function () {
        predefinedMassRatios(160, 100, 50, 50)
    }, true);
    form.document.getElementById('pal').addEventListener("click", function () {
        predefinedMassRatios(370, 270, 290, 75)
    }, true);
    form.document.getElementById('tk').addEventListener("click", function () {
        predefinedMassRatios(450, 515, 480, 80)
    }, true);
    form.document.getElementById('ram2').addEventListener("click", function () {
        predefinedMassRatios(1000, 300, 350, 70)
    }, true);
    form.document.getElementById('kat2').addEventListener("click", function () {
        predefinedMassRatios(900, 1200, 600, 60)
    }, true);
    form.document.getElementById('sen2').addEventListener("click", function () {
        predefinedMassRatios(35500, 26600, 25000, 27200)
    }, true);
    form.document.getElementById('set2').addEventListener("click", function () {
        predefinedMassRatios(7200, 5500, 5800, 6500)
    }, true);

    form.document.getElementById('pha').addEventListener("click", function () {
        predefinedMassRatios(100, 130, 55, 30)
    }, true);
    form.document.getElementById('swo').addEventListener("click", function () {
        predefinedMassRatios(140, 150, 185, 60)
    }, true);
    form.document.getElementById('pat').addEventListener("click", function () {
        predefinedMassRatios(170, 150, 20, 40)
    }, true);
    form.document.getElementById('tt').addEventListener("click", function () {
        predefinedMassRatios(350, 450, 230, 60)
    }, true);
    form.document.getElementById('dru').addEventListener("click", function () {
        predefinedMassRatios(360, 330, 280, 120)
    }, true);
    form.document.getElementById('hae').addEventListener("click", function () {
        predefinedMassRatios(500, 620, 675, 170)
    }, true);
    form.document.getElementById('ram3').addEventListener("click", function () {
        predefinedMassRatios(950, 555, 330, 75)
    }, true);
    form.document.getElementById('kat3').addEventListener("click", function () {
        predefinedMassRatios(960, 1450, 630, 90)
    }, true);
    form.document.getElementById('sen3').addEventListener("click", function () {
        predefinedMassRatios(30750, 45400, 31000, 37500)
    }, true);
    form.document.getElementById('set3').addEventListener("click", function () {
        predefinedMassRatios(5500, 7000, 5300, 4900)
    }, true);



    for (aktfalu = 0; aktfalu < numVillages; aktfalu++) {
        getInfo(villages[aktfalu]);
    }

}

function showHoverPopup(hoveritem, info) {
    hover = form.document.getElementById('hoverpopup');
    hover.innerHTML = info;
    hover.style.top = findPosY(hoveritem) + 25;
    hover.style.left = findPosX(hoveritem) + 10;

    hover.style.visibility = "Visible";
}

function hideHoverPopup() {
    hover = form.document.getElementById('hoverpopup');
    hover.style.visibility = "Hidden";
}

//by by Peter-Paul Koch & Alex Tingle
function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) while (1) {
        curleft += obj.offsetLeft;
        if (!obj.offsetParent) break;
        obj = obj.offsetParent;
    } else if (obj.x) curleft += obj.x;
    return curleft;
}

//by by Peter-Paul Koch & Alex Tingle
function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent) while (1) {
        curtop += obj.offsetTop;
        if (!obj.offsetParent) break;
        obj = obj.offsetParent;
    } else if (obj.y) curtop += obj.y;
    return curtop;
}

function getVillageList() {
    var ex = "//a[contains(@href,'newdid')]";
    tag = document.evaluate(
    ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var link = new Array();
    for (var i = 1; i <= tag.snapshotLength; i++) {
        temp = tag.snapshotItem(i - 1).href.split("?")[1].split('=')[1].split('&')[0];
        link[i - 1] = temp;
    }
    return link;
}

function getVillageName(did) {
    var ex = "//a[contains(@href,'newdid=" + did + "')]";
    tag = document.evaluate(
    ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var link = new Array();
    return tag.snapshotItem(0).innerHTML
}

function getXYFromActive(doc) {

    var searchNames = ".//a[contains(@href,'newdid')]";
    var DidS = document.evaluate(searchNames, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var searchXs = ".//li[contains(@class,'entry')]/a";
    var Xs = document.evaluate(searchXs, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


    /*   var searchYs = ".//span[@class='coordinateY']";
    
    var Ys = document.evaluate(searchYs, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    */
    var thisName = ".//li[@class='entry active']/a";
    //var thisName = ".//td[@class='dot hl']//a";


    var did = document.evaluate(thisName, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


    correctDid = did.snapshotItem(0).href.split("?")[1].split('=')[1];



    for (var i = 0; i < DidS.snapshotLength; i++) {
        testDid = DidS.snapshotItem(i).href.split("?")[1].split('=')[1];

        if (correctDid == testDid) {
            /*
          x =(Xs.snapshotItem(i).innerHTML.split('(')[1])
          y = (Ys.snapshotItem(i).innerHTML.split(')')[0])
        */
            var div = document.createElement("div");
            div.innerHTML = Xs.snapshotItem(i).getAttribute("title");
            var text = div.textContent || div.innerText || "";

            // falu_nev = text.substring(0,text.indexOf("("));
            xkordi = text.substring(text.indexOf("(") + 1, text.indexOf("|"));
            ykordi = text.substring(text.indexOf("|") + 1, text.indexOf(")"));

            return [xkordi, ykordi];
        }

    }

}

function getVillageDropDown() {
    // array of the village data (populated later)
    var villages = [];


    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", location.href, false);
    xhttp.send("");
    respText = xhttp.responseText;

    var xBody = document.createElement("xbody");
    xBody.setAttribute('id', 'xbody');
    xBody.setAttribute('style', 'display: none;');
    xBody.innerHTML = respText;
    document.body.parentNode.appendChild(xBody);

    var Length = ID('villageList').getElementsByTagName('div')[1].getElementsByTagName('ul')[0].getElementsByTagName('li').length;

    for (c = 0; c < Length; c++) {
        var Xp = Xpath("/html/xbody/div[@id='wrapper']/div[@class='bodyWrapper']/div[@id='mid']/div[@id='side_info']/div[@id='villageList']/div[@class='list']/ul/li[" + (c + 1) + "]/a").snapshotItem(0).getAttribute("title");


        var div = document.createElement("div");
        div.innerHTML = Xp;
        var text = div.textContent || div.innerText || "";

        falu_nev = text.substring(0, text.indexOf("("));
        xkord = text.substring(text.indexOf("(") + 1, text.indexOf("|"));
        ykord = text.substring(text.indexOf("|") + 1, text.indexOf(")"));

        villages.push({
            name: falu_nev,
            x: xkord,
            y: ykord
        });



    }

    villages.reverse();



    // build the select list
    var sel = "<select>";
    var i = villages.length;

    while (-1 < --i) {

        sel += "<option value = '" + i + "' onClick='document.getElementById(\"massX\").value=" + villages[i].x + ";document.getElementById(\"massY\").value=" + villages[i].y + ";'>" + villages[i].name + "</option>";
    }
    sel += "</select>";
    document.body.parentNode.removeChild(xBody);
    return sel;
}


function saveVilageList(list, name) {
    GM_setValue(name, list);
    return true;
}

function loadVillageList(name) {
    return GM_getValue(name, 0);
}


function sendResources(newDID, wood, clay, iron, wheat, twice, mId, x, y) {

    rx = 5 + Math.floor(Math.random() * 30);
    ry = 5 + Math.floor(Math.random() * 15);
    url = "http://" + document.domain + "/build.php?" + 'id=' + mId + '&newdid=' + newDID;

    data = 'id=' + mId + '&r1=' + wood + '&r2=' + clay + '&r3=' + iron + '&r4=' + wheat + '&dname=&x=' + x + '&y=' + y;
    //GM_log(data);
    if (twice) {
        data = 'id=' + mId + '&r1=' + wood + '&r2=' + clay + '&r3=' + iron + '&r4=' + wheat + '&dname=&x=' + x + '&y=' + y + '&x2=2';
    }
    //alert(data);
    req1 = new XMLHttpRequest;

    req1.open("POST", url, false);
    req1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req1.onreadystatechange = function () {
        if (req1.readyState == 4) {
            pulled = document.createElement('div');
            pulled.innerHTML = req1.responseText;
            var ex = ".//p[@class='error']";


            hiba = document.evaluate(ex, pulled, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (hiba.snapshotLength > 0) {
                info(newDID, "Error : '"+hiba.snapshotItem(0).textContent+"'");
                return false;
            }
            idValue = getValue(pulled, 'id');
            aValue = getValue(pulled, 'a');
            szValue = getValue(pulled, 'sz');
            kidValue = getValue(pulled, 'kid');
            cValue = getValue(pulled, 'c');
            r1Value = wood;
            r2Value = clay;
            r3Value = iron;
            r4Value = wheat;

            url2 = "http://" + document.domain + "/build.php?" + 'newdid=' + newDID;
            data2 = 'id=' + idValue + '&a=' + aValue + '&sz=' + szValue + '&kid=' + kidValue + '&c=' + cValue + '&r1=' + r1Value + '&r2=' + r2Value + '&r3=' + r3Value + '&r4=' + r4Value;
            if (twice) {
                data2 = 'id=' + idValue + '&a=' + aValue + '&sz=' + szValue + '&kid=' + kidValue + '&c=' + cValue + '&r1=' + r1Value + '&r2=' + r2Value + '&r3=' + r3Value + '&r4=' + r4Value;
            }

            req2 = new XMLHttpRequest;
            req2.open("POST", url2, false);
            req2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            req2.onreadystatechange = function () {
                if (req2.readyState == 4) {
                    pulled = document.createElement('div');
                    pulled.innerHTML = req2.responseText;
                    info(newDID, 'Done');
                    total_wood = parseInt(form.document.getElementById("total_wood").value);
                    total_clay = parseInt(form.document.getElementById("total_clay").value);
                    total_iron = parseInt(form.document.getElementById("total_iron").value);
                    total_wheat = parseInt(form.document.getElementById("total_wheat").value);

                    total_wood += r1Value;
                    total_clay += r2Value;
                    total_iron += r3Value;
                    total_wheat += r4Value;

                    form.document.getElementById("total_wood").value = total_wood;
                    form.document.getElementById("total_clay").value = total_clay;
                    form.document.getElementById("total_iron").value = total_iron;
                    form.document.getElementById("total_wheat").value = total_wheat;
                    if (sendall) {
                        setTimeout(function () {
                            sendAll()
                        }, 500)
                    }
                    return true;
                }
            }
            req2.send(encodeURI(data2));
        }





    }
    req1.send(encodeURI(data));
}


function getValue(doc, name) {
    var ex = ".//input[@name='" + name + "']";
    //alert("lolz");
    tag = document.evaluate(
    ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (tag.snapshotLength) {
        aTag = tag.snapshotItem(0);
        return (aTag.value);
    } else {
        return 0;
    }

}

function getInfo(DID) {

    url = "http://" + document.domain + "/build.php?" + 'id=32&gid=17&newdid=' + DID;


    req = new XMLHttpRequest;
    req.open("GET", url, false);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            pulled = document.createElement('div');
            pulled.innerHTML = req.responseText;
            temp = getMerchantInfo(pulled);
            if (temp != false) {
                numMerchants = temp[0];
                carrycap = temp[1];
                res = getResourceInfo(pulled);
                if (res != false) {

                    wood = res[1]
                    clay = res[2];
                    iron = res[3];
                    wheat = res[4];
                    w_prod = res[5];

                    max = getResourceInfoMax(pulled);

                    coords = getXYFromActive(pulled);
                    mId = getValue(pulled, 'id');
                    printForm(numMerchants, carrycap, wood, clay, iron, wheat, w_prod, DID, mId, max, coords);
                } else {
                    return false;
                }

            } else {
                return false;
            }
        }


    }
    req.send(null);
}

function getMerchantInfo(doc) {
    var ex = ".//script";
    tag = document.evaluate(
    ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    //alert(tag.snapshotLength);
    for (x = 0; x < tag.snapshotLength; x++) {
        if (tag.snapshotItem(x).innerHTML.search('haendler') > 0) {
            temp = tag.snapshotItem(x).innerHTML.split('\n');
            numMerchants = temp[6].split('=')[1].replace(';', '');

            carryCap = temp[7].split('=')[1].replace(';', '');

            return [numMerchants, carryCap];


        }
    }
    return false;

}

function getResourceInfo(doc) {

    resource = new Array();
    for (x = 5; x >= 1; x--) {
        var ex = ".//span[@id='l" + x + "']";
        res = document.evaluate(
        ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        if (res.snapshotLength > 0) {
            if (x == 5) {

                resource[x] = (res.snapshotItem(0).innerHTML.split('/')[1]) - (res.snapshotItem(0).innerHTML.split('/')[0]);
            } else {
                resource[x] = (res.snapshotItem(0).innerHTML.split('/')[0]);
            }

        } else {
            return false;
        }

    }
    return resource;

}

function getResourceInfoMax(doc) {

    resource = new Array();
    for (x = 0; x >= 1; x--) {
        var ex = ".//span[@id='l" + (x + 3) + "']";
        res = document.evaluate(
        ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        if (res.snapshotLength > 0) {
            resource[x] = (res.snapshotItem(0).innerHTML.split('/')[1]);

        } else {
            return false;
        }

    }
    return resource;

}

function printForm(numMerchants, carrycap, wood, clay, iron, wheat, wp, DID, mId, max, coords) {


    td = form.document.getElementById(DID);

    td.innerHTML = '<tr>' + '<input type="checkbox" name="active" id="active_' + DID + '" value="' + DID + '" checked></td>' + '<td  id="fieldset_' + DID + '" style="color:green;" class="center">' + getVillageName(DID) +


    '</td><td><input size="3" name="Xs" id="x_' + DID + '"></td>' + '<td><input size="3" name="Ys" id="y_' + DID + '"></td>' + '<td class="center">' + carrycap + ' </td>' + '<td class="center">' + numMerchants + '</td>' +

    '<td><input size="6" name="wood" id="wood_' + DID + '" style="background-color:#FAFFBD"></td>' + '<td><input size="6" name="clay" id="clay_' + DID + '" style="background-color:#FAFFBD"></td>' + '<td><input size="6" name="iron" id="iron_' + DID + '" style="background-color:#FAFFBD"></td>';
    if (wp < 0) {
        td.innerHTML += '<td><input size="6" name="wheat" id="wheat_' + DID + '" style="background-color:#FAFFBD;color:red"  title="Negative crop production!"></td>';
    } else {
        td.innerHTML += '<td><input size="6" name="wheat" id="wheat_' + DID + '" style="background-color:#FAFFBD"></td>';
    }




    td.innerHTML += '<td class="center"><input type="checkbox" name="twice" id="twice_' + DID + '"></td>' +

    '<td><input type="button" name="send" id="send_' + DID + '" value="Send"></td>' +

    '<td><div id="info_' + DID + '">Ready</div></td>' + '</tr>' +

    '<input type="hidden" name="numMerchants" id="numMerchants_' + DID + '" value="' + numMerchants + '">' + '<input type="hidden" name="carryCap" id="carryCap_' + DID + '" value="' + carrycap + '">' + '<input type="hidden" name="Mwood" id="Mwood_' + DID + '" value="' + wood + '">' + '<input type="hidden" name="Mclay" id="Mclay_' + DID + '" value="' + clay + '">' + '<input type="hidden" name="Miron" id="Miron_' + DID + '" value="' + iron + '">' + '<input type="hidden" name="Mwheat" id="Mwheat_' + DID + '" value="' + wheat + '">' + '<input type="hidden" name="maxR" id="maxR_' + DID + '" value="' + max[0] + '">' + '<input type="hidden" name="maxW" id="maxW_' + DID + '" value="' + max[1] + '">' + '<input type="hidden" name="coords" id="' + coords[0] + '|' + coords[1] + '" value="' + DID + '">' + '<input type="hidden" id="mId_' + DID + '" value="' + mId + '">';

    form.document.getElementById('wood_' + DID).addEventListener("mouseover", function () {
        showHoverPopup(this, 'Max: ' + wood)
    }, true);
    form.document.getElementById('wood_' + DID).addEventListener("mouseout", function () {
        hideHoverPopup()
    }, true);

    form.document.getElementById('clay_' + DID).addEventListener("mouseover", function () {
        showHoverPopup(this, 'Max: ' + clay)
    }, true);
    form.document.getElementById('clay_' + DID).addEventListener("mouseout", function () {
        hideHoverPopup()
    }, true);

    form.document.getElementById('iron_' + DID).addEventListener("mouseover", function () {
        showHoverPopup(this, 'Max: ' + iron)
    }, true);
    form.document.getElementById('iron_' + DID).addEventListener("mouseout", function () {
        hideHoverPopup()
    }, true);

    form.document.getElementById('wheat_' + DID).addEventListener("mouseover", function () {
        showHoverPopup(this, 'Max: ' + wheat)
    }, true);
    form.document.getElementById('wheat_' + DID).addEventListener("mouseout", function () {
        hideHoverPopup()
    }, true);

    form.document.getElementById('active_' + DID).addEventListener("click", function () {
        changeActiveStyle(this.value)
    }, true);

    form.document.getElementById('send_' + DID).addEventListener("click", function () {
        send(DID)
    }, true);


}

function changeActiveStyle(DID) {
    fieldset = form.document.getElementById('fieldset_' + DID);
    if (fieldset.style.color == 'green') {
        info(DID, "Disabled")
        fieldset.style.color = 'red';
        fieldset.style.borderColor = 'red';
    } else {
        info(DID, "Ready")
        fieldset.style.color = 'green';
        fieldset.style.borderColor = 'green';
    }
}


function send(DID) {
    info(DID, 'Processing')

    X = parseInt(form.document.getElementById('x_' + DID).value, 10)
    Y = parseInt(form.document.getElementById('y_' + DID).value, 10)

    wood = parseInt(form.document.getElementById('wood_' + DID).value, 10)
    clay = parseInt(form.document.getElementById('clay_' + DID).value, 10)
    iron = parseInt(form.document.getElementById('iron_' + DID).value, 10)
    wheat = parseInt(form.document.getElementById('wheat_' + DID).value, 10)

    twice = form.document.getElementById('twice_' + DID).checked

    Mwood = parseInt(form.document.getElementById('Mwood_' + DID).value, 10)
    Mclay = parseInt(form.document.getElementById('Mclay_' + DID).value, 10)
    Miron = parseInt(form.document.getElementById('Miron_' + DID).value, 10)
    Mwheat = parseInt(form.document.getElementById('Mwheat_' + DID).value, 10)

    mId = parseInt(form.document.getElementById('mId_' + DID).value, 10)


    numMerchants = form.document.getElementById('numMerchants_' + DID).value
    carryCap = form.document.getElementById('carryCap_' + DID).value

    if (form.document.getElementById(X + '|' + Y)) {
        if (DID == form.document.getElementById(X + '|' + Y).value) {
            info(DID, "Error: Can't send to yourself.")
            if (sendall) {
                setTimeout(function () {
                    sendAll()
                }, 50)
            }
            return;
        }
    }

    if (IsNumeric(X) && IsNumeric(Y) && IsNumeric(wood) && IsNumeric(clay) && IsNumeric(iron) && IsNumeric(wheat)) {
        if ((wood + clay + iron + wheat) > (numMerchants * carryCap)) {
            info(DID, "Error: Not enough capacity")
            if (sendall) {
                setTimeout(function () {
                    sendAll()
                }, 50)
            }
            return;
        }

        overflowCheck = form.document.getElementById('overflow').checked
        if (overflowCheck) {
            if (form.document.getElementById(X + '|' + Y)) {

                if (twice) {
                    wood = wood * 2;
                    clay = clay * 2;
                    iron = iron * 2;
                    wheat = wheat * 2;
                }

                rDid = form.document.getElementById(X + '|' + Y).value;

                //Capacity of the warehouse and granary
                warehouseC = parseInt(form.document.getElementById('maxR_' + rDid).value, 10)
                GranaryC = parseInt(form.document.getElementById('maxW_' + rDid).value, 10)
                //Amount stored in the village
                rWood = parseInt(form.document.getElementById('Mwood_' + rDid).value, 10)
                rClay = parseInt(form.document.getElementById('Mclay_' + rDid).value, 10)
                rIron = parseInt(form.document.getElementById('Miron_' + rDid).value, 10)
                rWheat = parseInt(form.document.getElementById('Mwheat_' + rDid).value, 10)
                //Amount that can be received before overflow
                rWoodC = warehouseC - rWood;
                rClayC = warehouseC - rClay;
                rIronC = warehouseC - rIron;
                rWheatC = GranaryC - rWheat;
                //If the amount to send is to big set it to the max the town can receive
                if (wood > rWoodC) {
                    wood = rWoodC
                }
                if (clay > rClayC) {
                    clay = rClayC
                }
                if (iron > rIronC) {
                    iron = rIronC
                }
                if (wheat > rWheatC) {
                    wheat = rWheatC
                }
                //Add to the amount stored in the village
                form.document.getElementById('Mwood_' + rDid).value = rWood + wood;
                form.document.getElementById('Mclay_' + rDid).value = rClay + clay;
                form.document.getElementById('Miron_' + rDid).value = rIron + iron;
                form.document.getElementById('Mwheat_' + rDid).value = rWheat + wheat;

                if (twice) {
                    wood = wood / 2;
                    clay = clay / 2;
                    iron = iron / 2;
                    wheat = wheat / 2;
                }

            } else {
                //Unable to do overflow check
            }

        }

        if (wood > Mwood) {
            wood = Mwood;
        }
        if (clay > Mclay) {
            clay = Mclay;
        }
        if (iron > Miron) {
            iron = Miron;
        }


        if (wood < 1 && clay < 1 && iron < 1 && wheat < 1) {
            info(DID, "Error: No resource input")
            if (sendall) {
                setTimeout(function () {
                    sendAll()
                }, 50)
            }
            return;
        }

        info(DID, "Sending");

        sendResources(DID, wood, clay, iron, wheat, twice, mId, X, Y);


    } else {
        info(DID, "Error: som(e) values are not numeric")
        if (sendall) {
            setTimeout(function () {
                sendAll()
            }, 50)
        }
    }





}

function IsNumeric(strString)
//  check for valid numeric strings	
{
    var strValidChars = "0123456789-";
    var strChar;
    var blnResult = true;

    if (strString.length == 0) return false;

    //  test strString consists of valid characters listed above
    for (i = 0; i < strString.length && blnResult == true; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1) {
            blnResult = false;
        }
    }
    return blnResult;
}

function info(DID, msg) {
    form.document.getElementById('info_' + DID).innerHTML = msg;
}

function getValue(doc, name) {
    var ex = ".//input[@type='hidden'][@name='" + name + "']";
    tag = document.evaluate(
    ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (tag.snapshotLength) {
        aTag = tag.snapshotItem(0);
        return (aTag.value);
    } else {
        return 0;
    }

}

function massCords() {
    X = form.document.getElementById('massX').value;
    Y = form.document.getElementById('massY').value;

    Xs = form.document.getElementsByName('Xs');
    Ys = form.document.getElementsByName('Ys');

    for (i = 0; i < Xs.length; i++) {
        Xs[i].value = X;
        Ys[i].value = Y;
    }


}

function massRatios() {
    r_wood = parseFloat(eval(form.document.getElementById('r_wood').value));
    r_clay = parseFloat(eval(form.document.getElementById('r_clay').value));
    r_iron = parseFloat(eval(form.document.getElementById('r_iron').value));
    r_wheat = parseFloat(eval(form.document.getElementById('r_wheat').value));

    if (isNaN(r_wood)) {
        r_wood = "0";
    }
    if (isNaN(r_clay)) {
        r_clay = "0";
    }
    if (isNaN(r_iron)) {
        r_iron = "0";
    }
    if (isNaN(r_wheat)) {
        r_wheat = "0";
    }

    wMax = form.document.getElementsByName('Mwood');
    cMax = form.document.getElementsByName('Mclay');
    iMax = form.document.getElementsByName('Miron');
    whMax = form.document.getElementsByName('Mwheat');

    nmerchants = form.document.getElementsByName('numMerchants');
    thisCCap = form.document.getElementsByName('carryCap');

    wood = form.document.getElementsByName('wood');
    clay = form.document.getElementsByName('clay');
    iron = form.document.getElementsByName('iron');
    wheat = form.document.getElementsByName('wheat');

    for (i = 0; i < wood.length; i++) {
        tot = nmerchants[i].value * thisCCap[i].value;
        if (Math.floor(r_wood * tot) < wMax[i].value) {
            wood[i].value = Math.floor(r_wood * tot);
        } else {
            wood[i].value = wMax[i].value
        }
        if (Math.floor(r_clay * tot) < cMax[i].value) {
            clay[i].value = Math.floor(r_clay * tot);
        } else {
            clay[i].value = cMax[i].value
        }
        if (Math.floor(r_iron * tot) < iMax[i].value) {
            iron[i].value = Math.floor(r_iron * tot);
        } else {
            iron[i].value = iMax[i].value
        }
        if (Math.floor(r_wheat * tot) < whMax[i].value) {
            wheat[i].value = Math.floor(r_wheat * tot);
        } else {
            wheat[i].value = whMax[i].value
        }
    }



}

function massMerchants() {

    m_wood = parseInt(form.document.getElementById('m_wood').value, 10);
    m_clay = parseInt(form.document.getElementById('m_clay').value, 10);
    m_iron = parseInt(form.document.getElementById('m_iron').value, 10);
    m_wheat = parseInt(form.document.getElementById('m_wheat').value, 10);

    if (isNaN(m_wood)) {
        m_wood = "0";
    }
    if (isNaN(m_clay)) {
        m_clay = "0";
    }
    if (isNaN(m_iron)) {
        m_iron = "0";
    }
    if (isNaN(m_wheat)) {
        m_wheat = "0";
    }



    wood = form.document.getElementsByName('wood');
    clay = form.document.getElementsByName('clay');
    iron = form.document.getElementsByName('iron');
    wheat = form.document.getElementsByName('wheat');

    wMax = form.document.getElementsByName('Mwood');
    cMax = form.document.getElementsByName('Mclay');
    iMax = form.document.getElementsByName('Miron');
    whMax = form.document.getElementsByName('Mwheat');


    thisCCap = form.document.getElementsByName('carryCap');
    nmerchants = form.document.getElementsByName('numMerchants');

    for (i = 0; i < wood.length; i++) {
        if (m_wood * thisCCap[i].value < wMax[i].value) {
            wood[i].value = m_wood * thisCCap[i].value;
        } else {
            wood[i].value = wMax[i].value
        }
        if (m_clay * thisCCap[i].value < cMax[i].value) {
            clay[i].value = m_clay * thisCCap[i].value;
        } else {
            clay[i].value = cMax[i].value
        }
        if (m_iron * thisCCap[i].value < iMax[i].value) {
            iron[i].value = m_iron * thisCCap[i].value;
        } else {
            iron[i].value = iMax[i].value
        }
        if (m_wheat * thisCCap[i].value < whMax[i].value) {
            wheat[i].value = m_wheat * thisCCap[i].value;
        } else {
            wheat[i].value = whMax[i].value
        }
    }


}

function twiceToggle() {
    checkBoxes = form.document.getElementsByName('twice');
    for (x = 0; x < checkBoxes.length; x++) {
        if (checkBoxes[x].checked) {
            checkBoxes[x].checked = false
        } else {
            checkBoxes[x].checked = true
        }
    }

}

var sendloopcount = 0;

sendall = false;

function sendAll() {
    sendall = true;

    sendAllCounter = form.document.getElementById('sendAllCounter');
    button = form.document.getElementsByName('send');
    active = form.document.getElementsByName('active');



    if (sendloopcount < button.length) {
        sendAllCounter.innerHTML = "Processing: [" + (sendloopcount + 1) + '/' + button.length + ']';

        if (active[sendloopcount].checked) {
            button[sendloopcount].click();
            sendloopcount++;
            return;
        } else {
            sendloopcount++;
            setTimeout(function () {
                sendAll()
            }, 50)
            return;
        }

    } else {
        sendAllCounter.innerHTML = "Done processed " + button.length + " shipments";
        sendall = false;
        sendloopcount = 0;
        return;
    }
}

function refresh() {
    villages = getVillageList()
    numVillages = villages.length;

    //Remove old info
    for (x = 0; x < numVillages; x++) {
        td = form.document.getElementById(villages[x]);
        td.innerHTML = '';
    }
    //Get new info
    for (x = 0; x < numVillages; x++) {
        getInfo(villages[x]);
    }

}



function mpTarget(i) {
    word = prompt("Set marketplace target " + i + " (format: Villagename|Xcoord|Ycoord)\nPress Cancel to delete the old village.", GM_getValue('marketplaceTarget' + i, ''));
    if (word == null) {
        GM_setValue('marketplaceTarget' + i, "");
        return false;
    }
    GM_setValue('marketplaceTarget' + i, word);
    return true;
}

document.addEventListener("keydown", MPhotKeys, true);

function MPTSetup() {
    var i = 0;
    for (i = 1; i <= 5; i++) {
        if (mpTarget(i) != true) break;
    }
}

function MPhotKeys(event) {

    if ((event.altKey == 1) && ((event.shiftKey == 0) && (event.ctrlKey == 1))) {
        if (event.keyCode == 77) //m
        {
            MPTSetup();
        }
    }
}

function predefinedMassRatios(w, c, i, wh) {
    tot = w + c + i + wh;

    form.document.getElementById('r_wood').value = w + '/' + tot;
    form.document.getElementById('r_clay').value = c + '/' + tot;
    form.document.getElementById('r_iron').value = i + '/' + tot;
    form.document.getElementById('r_wheat').value = wh + '/' + tot;
}