// ==UserScript==
// @name        Travian Plus Tool hacked
// @namespace   http://userscripts.org/scripts/show/63218
// @description these script it's Available for all Language "(v8.0)"
// @version     9.0
// @license     K.S.A License
// @author      ww_start_t
// @include     http://*.travian.*/*
// @include     http://*.travian3.*/*
// @exclude     http://*.travian.*/
// ==/UserScript==
var total = new Array();
var unit = new Array();
var PURPOSE=CROP=5;
var GMcookieID = '';
var market_all = [];
var market_fi = [];
var market_fc = [];
var res='true';
var thepop; 
var res_m;
var nav_m;
var resWidth=254;
var navWidth=150;
var toolsWidth=254;
var startform;
var lang;
var order=0;//
var fields=[];
var langfile=[]; 
var resource=[];
var ratio=[]; 
var overflow;
var autotime;
var pagetime;
var military=true;
var lang=window.location.href.match(/travian\d*(\.[a-zA-Z\.]+)/).pop();
var Linksfile=new Array();
var Allyfile=new Array();
var Notefile=new Array();
var bigIfile=new Array();
var Searchfile=new Array();

switch (lang) {default:
Searchfile=['Players', 'Villages', 'Alliances', 'Attackers', 'Defenders', 'Heroes', 'Search'];
Linksfile= ['Links', 'Link URL', 'Link Name', 'add Link', 'delete All'];
Allyfile = ['allianz', 'Login'];
Notefile = ['Notes', '- saved -'];
bigIfile = ['Marketplace', 'Barracks', 'Rally point', 'Academy'];
Buildfile=['building time end in'];
} //English

switch (lang) {case '.com.sa':case '.com.eg':case '.ae':
Searchfile=['الاعبين', 'القرى', 'التحالفات', 'المهاجمين', 'المدافعين', 'الأبطال', 'بحث'];
Linksfile =['الروابط', 'عنوان الرابط', 'اسم الرابط', 'أضافة رابط', 'مسح الكل'];
bigIfile = ['السوق', 'الثكنة', 'نقطة التجمع', 'الأكاديمية'];
Notefile = ['دفتر الملاحظات', '- حفظت -'];
Allyfile = ['عرض التحالف', 'تسجيل الدخول'];
Buildfile=['البناء ينتهي عند'];
} //Arabic

function Xhack(xpath, xpt, startnode, aDoc) {
    var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
    var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
    var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
    var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
    if (!aDoc) aDoc = document;
    if (!startnode) startnode = document;
    var xpres = XPFirst;
    switch (xpt) {
        case 'i': xpres = XPIterator; break;
        case 'l': xpres = XPList; break;
        case 'r': xpres = XPResult; break;
    };
    var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
    return (xpres == XPFirst ? ret.singleNodeValue : ret);
};

document.getElementById("ltimeWrap").innerHTML+='<div>Travian Plus Tool Hacked</div>';

var LinkN = document.createElement("span");
LinkN.innerHTML = '<div><a href="allianz.php">'+Allyfile[0]+'</a></div><div><a href="login.php">'+Allyfile[1]+'</a></div>';
TargeN = document.getElementById("side_navi").getElementsByTagName("p")[1].getElementsByTagName("a")[1];
TargeN.parentNode.appendChild(LinkN);

document.getElementById("ltimeWrap").innerHTML+= 'version 9.0 check for <a href="http://userscripts.org/scripts/show/63218" target="_blank">updates</a>';
if (document.getElementById("vlist") != null) {
var lightModEnabled = true;

function xy2id(x, y) {
return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}

function addButtons() {

var villages = document.getElementById("vlist").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
for (vn in villages)
{ 
  var getTds = villages[vn].getElementsByTagName("td");
  var getIt = getTds[1].getElementsByTagName("a")[0].getAttribute("href");
  getA = getIt.match(/\?newdid=(.*)/);
  if (getA == null) {
  alert("Error occurred");
  break;
  }
  getA = getA[1].split("&");
  
  var coords = getTds[2].getElementsByTagName("div");
  var coordsi = new Array();
  coordsi[0] = coords[0].textContent;
  coordsi[2] = coords[2].textContent;
  
  var myVid = xy2id(coordsi[0].replace("(", ""), coordsi[2].replace(")", ""));
  var myCid = getA[0];
  
  var newTD = document.createElement("sp");
  newTD.innerHTML = "<a href='a2b.php?z=" + myVid + "'><img class='iReport iReport8' src='img/x.gif'/></a> ";
  newTD.innerHTML += "<a href='build.php?z=" + myVid + "&gid=17'><img class='iReport iReport14' src='img/x.gif'/></a> ";

  villages[vn].appendChild(newTD);
}
}
if (lightModEnabled == false) {
addButtons(); // Executes button adding instantly
}
else {
window.addEventListener("load", addButtons, true);}}
function UNDF(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
function CTD(iHTML, att) {var aCell = document.createElement("TD"); aCell.innerHTML = iHTML; UNDF(aCell, att); return aCell;};
function CSP(iHTML, att) {var aCell = document.createElement("SPAN"); aCell.innerHTML = iHTML; UNDF(aCell, att); return aCell;};
function CTR(att) {var aRow = document.createElement("TR"); UNDF(aRow, att); return aRow;};
function CA(iHTML, att) {var aLink = document.createElement("A"); aLink.innerHTML = iHTML; UNDF(aLink, att); return aLink;};
function CIMG(att) {var aImg = document.createElement("IMG"); UNDF(aImg, att); return aImg;};
jsVoid = 'javaScript:void(0)';
///\///
if (document.getElementById("send_select") != null) {
targetLM = document.getElementById("send_select");
var getHack = document.getElementsByClassName("max")[0].getElementsByTagName("a")[0].innerHTML;
var marketPl = document.createElement("div")
marketPl.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
' <a class="sAll" href="javascript:void(0)" onmouseup="add_res(1);add_res(2);add_res(3);add_res(4);">'+getHack+'</a>';
targetLM.parentNode.insertBefore(marketPl, targetLM);
function DeleteAll(){
document.getElementById("r1").value=null;
document.getElementById("r2").value=null;
document.getElementById("r3").value=null;
document.getElementById("r4").value=null;};
var Creat = document.createElement("span");
Creat.innerHTML = ' / <a href="'+jsVoid+'"><img title="Delete All" src="img/x.gif" class="del"></a> ';
Creat.addEventListener("click", DeleteAll, false)
var TBtn = document.getElementsByClassName("sAll")[0];
TBtn.parentNode.appendChild(Creat);}
// teos /////////////////
acss =	"table#mbuyf {width:80%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
    "table#mbuyf tr {border-collapse:collapse; border:1px solid silver; text-align:center;}" +
    "table#mbuyf td {border:1px solid silver; background-color:transparent; padding:2px; border-collapse:collapse;}" +
    "table#mbuyf td.sf {background-color:yellow;}";

GM_addStyle(acss);

function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
    element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};

function deleteAdd() {
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/DIV[2]/FORM[1]/TABLE[1]/TFOOT[1]/TR[1]/TH[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/&nbsp;/,'<input class="check" id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox">',null);
}

function getUserID() {
    dleft = "side_navi";
    var uLink = Xhack("//div[@id='" + dleft + "']//a[contains(@href, 'spieler.php')]");
    return (uLink) ? uLink.href.split("uid=")[1] : null;
};

function applyFilter_hide() {
    var market = document.getElementById("range").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (mr in market) {
        var market_hide = [0,0,0];
        var mf = market_all[mr].split(";");
        for ( var i = 1; i < 3; i++ ) {
            for ( var j = 1; j < 5; j++ ) {
                if( mf[i-1] == market_fi[10*i+j-1]*j || market_fc[i] == 0 ) {
                    market_hide[i] = 1;
                }
            }
        }
        if( market_fi[30] == 1 && mf[2] < 1 ) { market_hide[0] = 1; }
        if( market_fi[31] == 1 && mf[2] == 1 ) { market_hide[0] = 1; }
        if( market_fi[32] == 1 && mf[2] >= 1 ) { market_hide[0] = 1; }
        if( market_fi[33] == 1 && mf[2] > 1 ) { market_hide[0] = 1; }
        if( market_fc[3] == 0 ) { market_hide[0] = 1; }
        // apply filter
        if( market_hide[0]*market_hide[1]*market_hide[2] == 1 ) {
            market[mr].style.display = '';
        } else {
            market[mr].style.display = 'none';
        }
    }
}

function applyFilter_row( row ) {
    market_fc[row] = 0;
    for ( var i = 0; i < 4; i++ ) {
        var TD = document.getElementById('filter' + (row*10+i));
        if ( market_fi[row*10+i] != 0 ) {
            market_fc[row]++;
            TD.setAttribute('class', 'sf');
        } else {
            TD.removeAttribute('class');
        }
    }
}

function applyFilter( fi ) {
    var row = Math.round(fi/10);
    if( market_fi[fi] == 0 && ( market_fc[row] > 2 || row > 2 )) {
        for ( var i = 0; i < 4; i++ ) {
            market_fi[row*10+i] = 0;
        }
    }
    market_fi[fi] = 1 - market_fi[fi];
    applyFilter_row( row );
    applyFilter_hide();

    var mf_cookie = '';
    for( var i=1; i < 4; i++ ) {
        for ( var j=0; j < 4; j++ ) {
            mf_cookie += market_fi[i*10+j] + ',';
        }
        mf_cookie += ';';
    }
    GM_setValue(GMcookieID + "-mf", mf_cookie);
}

function market_restore() {
    var mf_cookie;
    mf_cookie = GM_getValue(GMcookieID + "-mf", "0,0,0,0,;0,0,0,0,;0,0,0,0,;");
    if ( mf_cookie == undefined ) return;
    var rows = [];
    rows = mf_cookie.split(";");
    for( var i=1; i < 4; i++ ) {
        var cels = [];
        cels = rows[i-1].split(",");
        for ( var j=0; j < 4; j++ ) {
            market_fi[i*10+j] = cels[j];
        }
        applyFilter_row( i );
    }
    applyFilter_hide();
}

function marketBuy() {

    if ( crtPath.indexOf('&t=1') == -1 && crtPage.indexOf('&t=1&u=') != -1 ) return;

    var resIMG = [];
    for ( var i=0; i<4; i++ ) {
        resIMG[i] = document.getElementById("resWrap").getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[i*2].getElementsByTagName("img")[0].getAttribute("alt");
    }

    // add new 2 field (ally & x/y)
    var market = document.getElementById("range").getElementsByTagName("thead")[0].getElementsByTagName("tr");
    market[0].getElementsByTagName("th")[0].setAttribute("colspan","7");

    var TM = [];
//	TM.push(market[1].getElementsByTagName("td")[0].childNodes.item(0).nodeValue);
    TM.push(market[1].getElementsByTagName("td")[0].innerHTML.replace(/<.*>/g, ""));
    TM.push(market[1].getElementsByTagName("td")[1].innerHTML.replace(/<.*>/g, ""));

    document.getElementById("range").getElementsByTagName("tfoot")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].setAttribute("colspan","7");

    // create filter table
    var d = document.getElementById('build');
    var p = document.createElement('p');
    var newTABLE = document.createElement('table');
    p.appendChild(newTABLE);

    newTABLE.setAttribute('id', 'mbuyf');
    d.insertBefore(p, document.getElementById('range'));

    for( var i=1; i<3; i++ ) {
        var newTR = document.createElement('tr');
        var newTD = document.createElement('td');
        newTD.appendChild(document.createTextNode(TM[i-1]));
        newTR.appendChild(newTD);
        for( var j = 0; j < 4; j++ ) {
            var newTD = CTD('', [['id', 'filter' + i + j]]);
            var newIMG = CIMG([['alt', resIMG[j]],['title', resIMG[j]],['class', 'r' + (j+1)],['src', 'img/x.gif']]);
            newTD.appendChild(newIMG);
            newTD.addEventListener('click', function(x) { return function() { applyFilter(x); }}(i*10+j), 0);
            newTR.appendChild(newTD);
            market_fi[i*10+j] = 0;
        }
        newTABLE.appendChild(newTR);
        market_fc[i] = 0;
    }
    var aLabels = ['->1', '1:1', '<-1', '->>1'];
    for (var i = 0; i < 4; i++){
        var newTD = CTD('', [['id', 'filter' + 3 + i]]);
        var ref = CA(aLabels[i], [['href', jsVoid]]);
        newTD.addEventListener('click', function(x) { return function() { applyFilter(x); }}(30+i), 0);
        newTD.appendChild(ref);
        newTR.appendChild(newTD);
        market_fi[30+i] = 0;
    };
    newTABLE.appendChild(newTR);

    // calculate offer/wanted rate
    var market = document.getElementById("range").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (mr in market)
    {
        var offer
        var wanted;

        offer = market[mr].getElementsByTagName("td")[0];
        wanted = market[mr].getElementsByTagName("td")[1];
        market[mr].getElementsByTagName("td")[4].setAttribute("style","font-size:8pt;");

        offer.value = parseInt( offer.childNodes.item(2).nodeValue );
        offer.type = offer.childNodes.item(1).getAttribute('class').substring(1);

        wanted.value = parseInt( wanted.childNodes.item(2).nodeValue );
        wanted.type = wanted.childNodes.item(1).getAttribute('class').substring(1);

        var mrate = Math.round(offer.value/wanted.value * 100)/100;
        market_all[mr] = offer.type + ';' + wanted.type + ';' + mrate;
    }
    // restore filter settings
    market_restore();
}

function start_script() {
    GMcookieID = crtName + '-' + getUserID();

    if (crtPath.match(/(?:nachrichten|berichte).php/)) deleteAdd();
    if (crtPath.match(/build.php\?(.*)&t=1/)) marketBuy();
}

var crtPath = window.location.href;
var	crtName = crtPath.replace(/.*\/(.*)\/.*/, "$1");
window.addEventListener('load', start_script , false);
//window.onLoad = start_script();

/*********\begin building Links/*******/
document.getElementById("plus").removeAttribute("href")
if ( document.location.href.indexOf("/dorf1.php") != -1) {
for (var i = 1; i < 11; i++) {
var new1 = document.createElement("span");
var new2 = document.getElementById("troops");
new1.innerHTML='<a href="allianz.php?s=3&f=' + i + '"><img class="iReport iReport' + i + '" src="img/x.gif"></a>';
new2.parentNode.insertBefore(new1, new2);}}
var new4 = document.getElementById("plus");
new4.innerHTML='<table style="align="right" width: auto; background-color: transparent; border-collapse: collapse;">'+
               '<tbody><tr><td border: 1px solid silver; background-color: white;><a href="build.php?id=39">'+
               '<img title="'+bigIfile[2]+'" src="http://img43.imageshack.us/img43/5084/g16l.gif"></a></td>'+
               '<td border: 1px solid silver; background-color: white;><a href="build.php?gid=17">'+
               '<img title="'+bigIfile[0]+'" src="http://img412.imageshack.us/img412/1706/g17.gif"></a></td></tr>'+
               '<td border: 1px solid silver; background-color: white;><a href="build.php?gid=22">'+
               '<img title="'+bigIfile[3]+'" src="http://img10.imageshack.us/img10/9353/g22w.gif"></a></td>'+
               '<td border: 1px solid silver; background-color: white;><a href="build.php?gid=19">'+
               '<img title="'+bigIfile[1]+'" src="http://img293.imageshack.us/img293/61/g19.gif"></a></td></tr>';

(function allInOneOpera () {
var crtPath = window.location.href;
var crtName = crtPath.replace(/.*\/(.*)\/.*/, "$1");
var speedAK = [0,0.5,1,2];
var bgcolor = ['#66ff66','yellow','red'];
var pageElem = [
'side_navi', // 0- left side. include menu, profile etc.
'content', // 1- main block in center
'side_info', // 2- right side. include village list, links, quest.
'mid', // 3- central block. include left menu, main content and right menu
];
var RB = new Object();
RB.XY = [200, 10, 700, 430, 200, 100, 5, 400, 400, 50,];
var flOpera;
var flChrome;
var flFirefox;
var noGM = /Chrome\/[0-6]/;
if (typeof GM_addStyle == 'undefined' ) {
 function GM_addStyle(css) {
var head = document.getElementsByTagName('head')[0];
if (head) {
var style = document.createElement("style");
style.type = "text/css";
style.appendChild($t(css));
head.appendChild(style);}}}
var useDOMs = typeof window.localStorage == 'undefined' ? false: true;
function ajaxRequest(url, aMethod, param, onSuccess, onFailure) {
var aR = new XMLHttpRequest();
aR.onreadystatechange = function() {
//if (aR.readyState == 4 && aR.status == 200 )
if( aR.readyState == 4 && (aR.status == 200 || aR.status == 304))
onSuccess(aR);
else if (aR.readyState == 4 && aR.status != 200) onFailure(aR);};
aR.open(aMethod, url, true);
if (aMethod == 'POST') aR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
aR.send(param);};
function getID(aID) {return (aID != '' ? document.getElementById(aID) : null);};
function UNDF(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
function CTD(iHTML, att) {var aCell = document.createElement("TD"); aCell.innerHTML = iHTML; UNDF(aCell, att); return aCell;};
function CA(iHTML, att) {var aLink = document.createElement("A"); aLink.innerHTML = iHTML; UNDF(aLink, att); return aLink;};
function CELM(nElem, att) {var Elem = document.createElement(nElem); UNDF(Elem, att); return Elem;};
function CELMe(nElem, oElem, att) {var Elem = document.createElement(nElem); if (oElem !== undefined) if( typeof(oElem) == 'object' ) Elem.appendChild(oElem); else Elem.innerHTML = oElem; UNDF(Elem, att); return Elem;};
function $t(iHTML) {return document.createTextNode(iHTML);};
function toNumber(aValue) {return parseInt(aValue.replace(/\W/g, "").replace(/\s/g, ""));};
function ajaxNDIV(aR) {var ad = CELMe('div',aR.responseText,[['style','display:none;']]); return ad;};
function dummy() {return;};
jsVoid = 'javaScript:void(0)';
jsNone = 'return false;';
NPC102 = '<a id="NPC" href="build.php?gid=17&t=3"><img class="npc" src="img/x.gif"></a>';
var allIDs = [
'rb_tooltip', // 3-rb_tooltip
'flDIV', // 4-flDIV (class)
'newDd', // 5-newDd (class)
'gnTable', // 7-gnTable (class)
'rbLinks', // 9-rbLinks
'sf', // 18-sf
];
function randomizeIDs () {}
acss ="table#"+allIDs[0]+" {width:100%; border-collapse:collapse; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
"table#"+allIDs[1]+" th a {color:black; font-size:11px;}" +
"."+allIDs[4]+" {position:absolute;z-index:501;border:1px solid silver;text-align:center;background-color:gray;}" +
"."+allIDs[13]+" {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:#FFC0C0; padding:2px; margin:1px;}" ;
GM_addStyle(acss);
var dragMaster = (function() {
var dragObject;
var mouseOffset;
var mouseDownAt;
function getMouseOffset(target, e) {
var docPos	= getPosition(target);
return {x:e.pageX - docPos.x, y:e.pageY - docPos.y};}
function mouseUp(){
if (mouseDownAt) {
mouseDownAt = null;} else {
dragObject = null;}
document.removeEventListener('mousemove', mouseMove, true);
document.removeEventListener('mouseup', mouseUp, true);
//document.ondragstart = null;
//document.body.onselectstart = null;
}function mouseMove(e){
if (mouseDownAt) if (Math.abs(mouseDownAt.x-e.pageX)<10 && Math.abs(mouseDownAt.y-e.pageY)<10) return;
with(dragObject.style) {
position = 'absolute';
top = e.pageY - mouseOffset.y + 'px';
left = e.pageX - mouseOffset.x + 'px';}
mouseDownAt = null;
return false;}
function mouseDown(e) {
if (e.which!=1) return;
dragObject  = this.parentNode;
mouseOffset = getMouseOffset(this, e);
mouseDownAt = { x: e.pageX, y: e.pageY, dragObject: this };
document.addEventListener('mousemove', mouseMove, true);
document.addEventListener('mouseup', mouseUp, true);
//document.ondragstart = function() { return false };
//document.body.onselectstart = function() { return false };
return false;}
return {
makeDraggable: function(element){
element.addEventListener('mousedown', mouseDown, true);}}}())
function getPosition(e){
var left = 0; var top = 0;
while (e.offsetParent){
left += e.offsetLeft; top += e.offsetTop; e = e.offsetParent;}
left += e.offsetLeft; top += e.offsetTop;
return {x:left, y:top};}
//end drag //
function makeFloat(flObj, ix, iy, sid) {
flId = sid !== undefined ? sid : ++divSN;
bd = CELM('div',[['id',allIDs[14] + flId],['class',allIDs[4]],['style','left:'+ ix +'px;top:'+ iy +'px;']]);
bdr = CELMe('div','&nbsp;',[['class',allIDs[5]],['onmousedown',jsNone]]);
bd.appendChild(bdr);
bd.appendChild(flObj);
document.body.appendChild(bd);
dragMaster.makeDraggable(bdr);
return allIDs[14] + flId;}
function makeFloatD(flObj, mNum) {
var ix = RB.XY[mNum*2] < 1 ? 1: RB.XY[mNum*2];
var iy = RB.XY[mNum*2+1] < 1 ? 1: RB.XY[mNum*2+1];
return makeFloat(flObj, ix, iy, mNum);}
function viewMessageIW() {
var allRows = Xhack('//table//tr[td[@class="sel"]]','l');
for( var i = 0; i < allRows.snapshotLength; i++ ) {
var td = allRows.snapshotItem(i).getElementsByTagName('TD')[1];
var newImg = CELM('IMG',[['src',"http://userscripts.org/images/script_icon.png"]]);
newImg.addEventListener('click', function(x) { return function() { selectMessage(x); }}(i), false);
td.insertBefore(newImg, td.firstChild);}
var viewMessageID = '';
function messageClose () {
var vMID = getID(viewMessageID);
if( vMID ) document.body.removeChild(vMID);}
var viewPref = [
['//form[@action="nachrichten.php"]','messages','width:440px;background-color:white;padding:5px;text-align:left;'],
['//table[@id="report_surround"]','reports','width:500px;background-color:white;padding:5px;']];
function selectMessage (num) {
var allRows = Xhack('//table//tr[td[@class="sel"]]','l');
var tds = allRows.snapshotItem(num).getElementsByTagName('TD');
var aLink = tds[1].getElementsByTagName('A')[0].getAttribute('href');
var tV = /berichte/.test(aLink) ? 1: 0;
ajaxRequest(aLink, 'GET', null, function(ajaxResp) {
messageClose();
var ad = ajaxNDIV(ajaxResp);
if( ! flFirefox ) getID(pageElem[0]).appendChild(ad);
var aV = Xhack(viewPref[tV][0], 'f', ad);
ad = null;
if (aV) {
var newD = CELMe('DIV',aV,[['class',viewPref[tV][1]],['style',viewPref[tV][2]]]);
var newBTX = CELMe('BUTTON','Close',[['onClick',jsNone],['style','margin:5px 5px 0px;direction:ltr']]);
newBTX.addEventListener('click', messageClose, true);
newD.appendChild(CELMe('DIV',newBTX,[['style','text-align:center;']]));
viewMessageID = makeFloatD(newD, 4);}}, dummy);}}
//function start_script() {
if( /(?:nachrichten|berichte).php/.test(crtPath) ) {viewMessageIW(); }//}
//start_script();
})();
/////  Plus Links  //////////
function PlusLinks1(){
links1 = eval(GM_getValue('a1', '[]')); 
var target = document.getElementById("side_info");
target.appendChild(document.createElement('br'));
var tbl     = document.createElement("table");
var tblHead = document.createElement("thead");
var tblBody = document.createElement("tbody");
for (var j = 0; j < links1.length/2; j++) {
var row = document.createElement("tr");
for (var i = 0; i < 2; i++) {
var cell = document.createElement("td");
if (i == 0) {
var test = document.createElement("span");
test.innerHTML = "&#x25CF";
var cellText = test;
if (document.location.href == links1[2*j+1]) {
cell.setAttribute("class", "dot hl");}else {
cell.setAttribute("class", "dot");}}
else if (i == 1) {
var curId = i - 1;
var alink = document.createElement("a");
alink.setAttribute("href", links1[2*j+1]);
cell.setAttribute("class", ""+Linksfile[0]+"");
alink.appendChild(document.createTextNode(links1[2*j]));
var cellText = alink;}
cell.appendChild(cellText);
row.appendChild(cell);}
tblBody.appendChild(row);}
var row = document.createElement("tr");
var cell = document.createElement("td");
var alink = document.createElement("span");
var alink2 = document.createElement("span");
var alink3 = document.createElement("span");
var alink4 = document.createElement("span");
alink3.innerHTML= '<a> '+Linksfile[0]+' </a>';
alink.innerHTML = ' <a href="javascript:void(0)" title="'+Linksfile[3]+'"> (+ </a> ';
alink.addEventListener("click", AddNewLink, false);
alink4.innerHTML = ' / ';
alink2.innerHTML = ' <a href="javascript:void(0)" title="'+Linksfile[4]+'"> -) </a> ';
alink2.addEventListener("click", DeleteLinks, false);
cell.appendChild(alink3);
cell.appendChild(alink);
cell.appendChild(alink4);
cell.appendChild(alink2);
cell.setAttribute("colspan", "5");
row.appendChild(cell);
tblHead.appendChild(row);	
tbl.appendChild(tblHead);
tbl.appendChild(tblBody);	
target.appendChild(tbl);	
tbl.setAttribute("cellspacing", "1");
tbl.setAttribute("cellpadding", "1");
tbl.setAttribute("id", "llist");
function AddNewLink(){
 GM_log("AddNewLink() :: called");
 loc =  document.location.href;
 GM_log("links1 :" + links1.length);
 new_link = prompt(Linksfile[1],loc);
 if(!new_link) { return}
 new_link_name = prompt(Linksfile[2],"");
 if(!new_link_name) { return; }
// links1[links1.length][0] = new_link_name;
// links1[links1.length][1] = new_link;
links1.push(new_link_name);
links1.push(new_link);
 GM_setValue('a1', uneval(links1));
// GM_log(links1);
document.location.href = loc;}
function DeleteLinks(){
 GM_deleteValue("a1");
 window.location.reload()}}
/////////////////////////

var eventSource= (navigator.appName.indexOf('Opera') == -1) ? window : document; // I use this because I might want to make it cross browser later
eventSource.addEventListener( 'load', function( e ) { onLoad(); }, false); //to be run on load of the page
var loc=eventSource.location.href; // the current page href

//for drag effect
var dragObj = new Object(), x, y;
dragObj.zIndex = 500;

function location(){
    lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/);
    if(!lang) {
        lang = loc.match(/travian3(\.[a-zA-Z]{2,3})+/).pop(); 
    } else {
        lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/).pop();
    }
}

function onLoad(){ 
    switch(lang){
    default:
        langfile[lang]=[];						
        break;
    }    if(!langfile[lang]) {
        return;
    }
    
    readSettings();
    
    var side=document.getElementById('side_navi');
    if(side){}
    
    if(links=='true') {
        msg();
        linksPlus();
    }
    

    if(res=='true'){
        if(returnObjById('ResBlock')){ 
            autotime = window.setTimeout(countdown, 1000); 
        } else { 
            return;
        }
    }
}

function returnObjById( id ){ //compatibility, gets the object by id, based on different returns of document 
  if (document.getElementById)
    return document.getElementById(id);
  else if (document.all)
    return document.all[id];
  else if (document.layers)
    return document.layers[id];
}

function getElementsByClassName(oElm, strTagName, strClassName){ // searches the oElm for strTagName objects with strClassName class
  var arrElements = (strTagName == '*' && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, '\\-');
  var oRegExp = new RegExp('(^|\\s)' + strClassName + '(\\s|$)');
  var oElement;
  for(var i=0; i<arrElements.length; i++){
    oElement = arrElements[i];  
    if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
    } 
  }
  return arrReturnElements;
}

function addElement(theElement) { // adds an element to the page either by the center object lmidlc or appends to html
    var htmldoc=returnObjById('lmid2');
    if(!htmldoc) {
        htmldoc=document.getElementsByTagName('body')[0];
        if(!htmldoc) return;
        theElement.style.marginLeft='192px';  
        theElement.style.marginBottom='10px';
        theElement.style.width = '550px';
        
        if(loc.indexOf('dorf2')!=-1){
            theElement.style.top='192px';
        }
        else {
            theElement.style.top='50px';
        }
            
    } else {
        theElement.style.width = '500px';
        theElement.style.top='50px';  		
        if(loc.indexOf('karte.php?d=')!=-1){
        theElement.style.top='400px'; 
        }else if(loc.indexOf('karte.php?newdid')!=-1 && loc.indexOf('d=')!=-1 ){
        theElement.style.top='400px'; 
        } else if(loc.indexOf('karte.php?newdid')!=-1){
        theElement.style.top='50px'; 
        } 
    }
    
    htmldoc.appendChild(theElement);
}

function addElementArray(root,element){
    if(root && element){
        var end=element.length;
        for (var i = 0; i < end; i++) {
            var c=element[i];
            if(c) root.appendChild( c );
        }
    }
}

/************************ Drag n drop*******************************/
if (document.location.href.indexOf("/dorf1.php") != -1) {
(function troopwatch() {
    var ALL=3;
    function getClass(aName) {return (aName != '' ? document.getElementsByClassName(aName) : null);};
    function cropT(v){if (v>10000){v = v>100000? Math.round(v/1000): Math.round(v/100)/10;v = v+"k";}return v;};
    var total = new Array();
    var unit = new Array();
    var PURPOSE=0,TYPE=1,CROP=2;
    unit[1] = new Array(ALL,false,1);
    unit[2] = new Array(ALL,false,1); 
    unit[3] = new Array(ALL,false,1);
    unit[4] = new Array(ALL,true,2);
    unit[5] = new Array(ALL,true,3); 
    unit[6] = new Array(ALL,true,4); 
    unit[7] = new Array(ALL,false,4);
    unit[8] = new Array(ALL,false,6); 
    unit[9] = new Array(ALL,false,5); 
    unit[10] = new Array(ALL,false,1); 
    unit[11] = new Array(ALL,false,1);
    unit[12] = new Array(ALL,false,1); 
    unit[13] = new Array(ALL,false,1); 
    unit[14] = new Array(ALL,false,1); 
    unit[15] = new Array(ALL,true,2); 
    unit[16] = new Array(ALL,true,3); 
    unit[17] = new Array(ALL,false,3); 
    unit[18] = new Array(ALL,false,6); 
    unit[19] = new Array(ALL,false,5);
    unit[20] = new Array(ALL,false,1); 
    unit[21] = new Array(ALL,false,1); 
    unit[22] = new Array(ALL,false,1); 
    unit[23] = new Array(ALL,true,2);
    unit[24] = new Array(ALL,true,2);
    unit[25] = new Array(ALL,true,2);
    unit[26] = new Array(ALL,true,3); 
    unit[27] = new Array(ALL,false,3);
    unit[28] = new Array(ALL,false,6);
    unit[29] = new Array(ALL,false,4);
    unit[30] = new Array(ALL,false,1); 
    unit[31] = new Array(ALL,false,1); 
    unit[0] = new Array(ALL,false,6);
    Total = 0;
    var u = getClass("unit");
    var n = getClass("num");
    var t = getClass("un");
    for (var i=0; i<u.length; i++) {
    var x = u[i].className.split(" u")[1];
    var tip = document.createElement("span");
    if (x.match(/hero/)) {x = 0;}
    if (unit[x]){var y = new Number(n[i+4].innerHTML);
    t[i].appendChild(tip);Total+= unit[x][CROP]*y;}}
    var getTitle = document.getElementsByClassName("r5")[0].title;
    var getTroop = document.getElementById("troops");
    var getThaed = getTroop.getElementsByTagName("thead")[0];
    var getTheTr = getThaed.getElementsByTagName("tr")[0];
    var getPlace = getTheTr.getElementsByTagName("th")[0];
    getPlace.innerHTML+=' = <span><img title="'+getTitle+'" class="r5" src="img/x.gif"/>'+cropT(Total)+'</span>';})();}


/************************ Links ++ *******************************/
function msg(){
    if(loc.indexOf('berichte')!=-1  || (loc.indexOf('nachrichten')!=-1 && loc.indexOf('t=4')==-1  && loc.indexOf('t=1')==-1) ) {
        addChkAll();
    }
}

function sel(){
form_all=startform;
var topend=form_all.length;
    for(var i=0;i<topend;i++){
        form_input=form_all[i].getElementsByTagName('input');
        var end=form_input.length;
        for(var x=0;x<end;x++){
            var y=form_input[x];
            if(y.name.indexOf('del')==-1 && y.name!='s10' ) y.checked=!y.checked;
        }
    }
}

function addChkAll(){
    var form_all=getElementsByClassName(document, 'table', 'tbg' );
    if(!form_all) return;
    var topend=form_all.length;
    for(var i=0;i<topend;i++){
        var form_input=form_all[i].getElementsByTagName('input');
        var end=form_input.length;
        for(var x=0;x<end;x++){
        var y=form_input[x];
            if(y.name.indexOf('del')!=-1) {  
                var select=document.createElement( 'input' );
                select.type='button';
                select.setAttribute('style','font-weight: bold; font-size: 8pt; height: 14pt;');
                select.value='Inverse Select';
                select.style.marginLeft='4px';
                select.addEventListener('click',sel,true);
                y.parentNode.appendChild(select);
            }
        }
    }
    startform=form_all;
}
//******************************//
{var isFF36up = false; 
if (navigator.userAgent)
{var ffver = navigator.userAgent.match(/Firefox\/3\.(\d+)/); isFF36up = ffver && parseInt(ffver[1], 10) >= 6; }
var nsResolver =  {lookupNamespaceURI:function (prefix) 
{if (isFF36up && prefix == "ns"){return "http://www.w3.org/1999/xhtml"; } 
else {return "";}}};}
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
function funcDummy(){}
function funcGetElemByID(_id){ return document.getElementById(_id); }
function funcElem(tag, content){ var ret = document.createElement(tag);  ret.innerHTML = content;  return ret; }
function funcFindElem(xpath, xpres)
{var ret = document.evaluate(xpath, document, null, xpres, null); return  xpres == XPFirst ? ret.singleNodeValue : ret;}
function func2Zero(_number){ return (_number > 9 ? _number : '0' + _number); }
function funcTime2Seconds(myElement)
{var p = myElement.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);}
function funcSeconds2Time(s)
{if(s > -1)
{var horas = Math.floor(s/3600); var minutos = Math.floor(s/60) % 60;
var segundos = s % 60; var t = horas + ":" + func2Zero(minutos) + ":" + func2Zero(segundos);}
else var t = "0:00:0?";
return t;}    function funcCalculateFillTime()
{for (var i = 0; i < 4; i++) { if (resources_per_sec[i] < 0)
{var tiempo = Math.round(actual_resources[i] / - resources_per_sec[i]);}else if (resources_per_sec[i] == 0)
{var tiempo = -1;}else
{var tiempo = Math.round((total_resources[i] - actual_resources[i]) / resources_per_sec[i]);}
var produccionHora = funcGetElemByID('l' + (4-i)).title;
var tiempoRestante = "<span id='TimeOut' style='font-weight:bold;'>" + funcSeconds2Time(tiempo) + "</span>";
var celda = funcElem("div", "<span style=' font-size:9px; color:#408080; position: absolute; align:center; top: 13px; text-align:center;'>&nbsp;&nbsp;(" + (produccionHora > 0 ? '+' : '') + produccionHora + '<b> / </b>' + (produccionHora < 0 ? '<font color="red">' + tiempoRestante + '</font>' : tiempoRestante) + ' )</span>');
var a = funcGetElemByID('l'+(4-i)).previousSibling;
if (a.nodeName == '#text') a = a.previousSibling;
a.appendChild(celda);}}

/*** End Calc. resource info ***/
if (document.getElementById("contract") != null){
(function buildwatch(){
    function $id(id){return (id !=''? document.getElementById(id): null);};
    function $class(aName){return (aName != '' ? document.getElementsByClassName(aName): null);};
    function $tag(aTag){return (aTag != ''? document.getElementsByTagName(aTag): null);};
    function getTimeFromDivision(a, p) {
   var h,m,s; h = Math.floor(a/p);m = Math.floor(((a/p)%1)*60)>9? Math.floor(((a/p)%1)*60): "0"+Math.floor(((a/p)%1)*60);return h+":"+m;};
    function getTimeReady(delay){
        var time = $id("tp1").innerHTML.split(":");
        var d = delay.split(":");
        time[2] = new Number(time[2])+new Number(d[2]);
        time[1] = new Number(time[1])+new Number(d[1])+Math.floor(time[2]/60);
        time[0] = new Number(time[0])+new Number(d[0])+Math.floor((time[1]+1)/60);
        time[2] = time[2]%60;
        time[1] = time[1]%60;
        time[0] = time[0]%24>9? time[0]%24: "0"+time[0]%24;
        time[1] = time[1]>9? time[1]: "0"+time[1];
        time[2] = time[2]>9? time[2]: "0"+time[2];
        return time[0]+":"+time[1]; +":"+time[2];};
    function getCapacityLevel(cost){};
    function parseConstructionCosts(){
        var r = new Array();
        var STORE=0,CAPACITY=1,FREE=2,PRODUCTION=4;
        var needWarehouse = 0;
        var needGranary = 0;
        var c = $tag("p")[$tag("p").length-1];
        var s = document.createElement("div");
        s.innerHTML = "";
        for (var i=0; i<4; i++) {
        var cost = new Number(c.innerHTML.match(/\d+/g)[2*(i+1)]);
        var res = $class("r"+(i+1))[0].alt;
        if (cost > r[CAPACITY]) {
        if (i!=3 && cost>needWarehouse) {
        needWarehouse = cost;}
        if (i==3) {needGranary = cost;}}}
var e = $class("build").length>1? document.getElementsByClassName("build")[1]: false;
        if (e) {var time = document.createElement("div");time.innerHTML ="<span style='color:black;'>"+Buildfile[0]+"</span><span style='color:blue;font-size : small;'><b> (<span id='TimeOut'>"+ getTimeReady(c.childNodes[14].textContent) +"</span>)</b>";
            if (document.getElementsByClassName("none").length){
                time.className = "none";}c.insertBefore(time,c.childNodes[c.lastChild]);}
        if (needWarehouse) {c.lastChild.innerHTML = c.lastChild.innerHTML +" ("+getCapacityLevel(needWarehouse)+")";}
        if (needGranary) {c.lastChild.innerHTML = c.lastChild.innerHTML +" ("+getCapacityLevel(needGranary)+")";}
        c.insertBefore(s,c.childNodes[c.lastChild]);};
    if(( $id("build").className.match(/25/) || $id("build").className.match(/26/) || $id("build").className.match(/17/) ) && window.location.href.match(/[s,t]=\d/)){return;}
    parseConstructionCosts();})();}
/////////////////////////////////
if ( document.location.href.indexOf("/statistiken.php") != -1) {
function createCookie(name,value,days){
if (days){var date = new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var expires = "; expires="+date.toGMTString();
}else var expires = ""; document.cookie = name+"="+value+expires+"; path=/";}
function readCookie(name){
var nameEQ = name + "="; var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++){var c = ca[i];while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);}return null;}
function selected(opt){
var selectedOption = readCookie('traviansearch_selected_option');
if(opt == selectedOption){return ' selected="yes" ';}return false;}
window.selectOption = function(opt){
if(opt != "" && opt != 0){document.getElementById('hidden_field_placeholder').innerHTML='<input type="hidden" name="id" value="' + opt + '">';
createCookie('traviansearch_selected_option',Number(opt),365);}else{
document.getElementById('hidden_field_placeholder').innerHTML='';createCookie('traviansearch_selected_option',0,365);}}
var searchform='<form align="center" action="statistiken.php?id=1" id="searchform" method="POST" id="searchform" style="background-image:url(http://travian.com/img/en/pic/travian_signup.jpg); background-position:top; padding:5px; border:1px solid #c0c0c0;">';
searchform += '<span id="hidden_field_placeholder"></span>';
searchform += '<div align="center"><input class="text name" name="name" maxlength="20" size="12" value="" name="spieler" id="searchbox_player" class="fm f80" style="margin:3px;" />';
searchform += '<span align="center"><select class="fm f80" style="margin:2px; padding:1px;" id="opsel">';
searchform += '<option value="0"' + selected(0) + '>' + Searchfile[0] + '</option>';
searchform += '<option value="2"' + selected(2) + '>' + Searchfile[1] + '</option>';
searchform += '<option value="4"' + selected(4) + '>' + Searchfile[2] + '</option>';
searchform += '<option value="31"' + selected(31) + '>'+Searchfile[3] + '</option>';
searchform += '<option value="32"' + selected(32) + '>'+Searchfile[4] + '</option>';
searchform += '<option value="8"' + selected(8) + '>' + Searchfile[5] + '</option>';
searchform += '</select><span align="center"><input type="submit" value="' + Searchfile[6] + '" class="std" /></div>';
searchform += '</form>';
var rightSidebar = document.getElementById('textmenu').innerHTML+= searchform;
window.addEventListener("load", function(e) {var cookieVal = readCookie('traviansearch_selected_option');
if(cookieVal){selectOption(cookieVal);}document.getElementById('opsel').addEventListener("change",function(){
selectOption(this.value);document.getElementById("searchbox_player").focus();},false);}, false);}


/**** The menus actions*******/

function selfoff(e){
    if(e.id=='ResBlock') {
        clearTimeout(autotime); 
        returnObjById('Resource++').value='false'
        res='false';
        resTog();
        updateSetCookie();
    }
}

function resize(e){}

function jump(on){
    on=on.target;
    var opt_key = on.selectedIndex;
    if(!opt_key) return;
    var uri_val = on.options[opt_key].value;
    window.open(uri_val,'_top');
}


function makeOption(text, value){
var co=document.createElement('option');
    co.appendChild(  document.createTextNode(  text  )    );
    co.value=value;
    return co;
}


function showSettings(){}

function toggle() {
        var frame=document.getElementById('NavPop');
        if(!frame) return;

        var state=frame.style.visibility;
        if(state.indexOf('visible')==-1){
            frame.style.visibility = 'visible';
        } else {
            frame.style.visibility = 'hidden';
        }
}

function readSettings() {	
    var value = GM_getValue('TravNavSet','Resource++:=true||');
    if (value == '' ) {resetSetting();return;}
    
    var arr = value.split(/[|]{2}/);
    var ret = new Array();
    
    for (var i = 0; i < arr.length; i++) {
        var b = arr[i].split(/[:][=]/);
        if(b.length==2)	ret.push(b);
    }
        
    if(ret.length!=4) {resetSetting();return;}
    if(ret[1][0]!='Resource++')  {resetSetting();return;}
    //I know that this seems strange but just go with it, I have reasons....
    if(ret[0][1]=='true' ) {links='true'; } else {links='false';}
    if(ret[1][1]=='true' ) {res='true'; } else {res='false';}
    if(ret[2][1]=='true' ) {nav='true'; } else {nav='false';}
    if(ret[3][1]=='true' ) {tools='true'; } else {tools='false';}
}


function resetSetting(){
    defSetting();
    links='true';
    res='true';
    nav='true';
    tools='true';
}

function eraseSetting() {
    GM_setValue('TravNavSet', '');
}

function defSetting(){
    GM_setValue('TravNavSet', 'Resource++:=true||');
}

function makeEventlink(text, href, event ){
var link=document.createElement( 'a' );
    link.href=href;
    link.title=text;
    link.appendChild(  document.createTextNode(  text ) );
    link.addEventListener('click',event,true);
return link;
}

function onoff(targ){
    if(targ.target.value=='true'){
        targ.target.value='false';} 
    else {
        targ.target.value='true';	
    }
    var res_start;
    var nav_start;
    var tools_start;
    if(targ.target.id=='Links++') {tools_start=links; links=targ.target.value;} 
    else if(targ.target.id=='Resource++') {	res_start=res; res=targ.target.value;} 
    if(res_start!=res) {resTog();} 
    if(nav_start!=nav) {navTog();}
    if(tools_start!=tools) {toolsTog();}
    updateSetCookie();
}

function resTog(){}

function navTog(){
    if(nav=='true'){
        if(!nav_m){quickLinks('visible');}
        nav_m.style.visibility = 'visible';
    } else {
        nav_m.style.visibility = 'hidden';
    }
}

function toolsTog(){}

function updateSetCookie(){
    GM_setValue('TravNavSet', 'Resource++:='+res+'||');
}

function makebutton(opt0, opt1){
    var one=document.createElement('tr');
    var incell=document.createElement('td');
    incell.appendChild(document.createTextNode(opt0));
    one.appendChild(incell);
    incell=document.createElement('td');
    var but=document.createElement('input');
    but.type='button';
    but.style.width='100px';
    but.id=opt0;
    but.value=opt1;
    but.addEventListener('click',function (e){onoff(e);},true);
    incell.appendChild(but);
    one.appendChild(incell);
    return one;
}

function countdown(){ //updates all countdown values and displays

    var go=false;
    getResourceInfo();
    if(!resource) return;
        
    for(var i=0; i<4; i++){
    
        if(overflow[i][0]>0){
            go=true;
            overflow[i][0]--;
            var leftval=parseInt(resource[i][1]/resource[i][2] *100);
            var color=(overflow[i][0]<300) ? 'red' : 'green';
            var newSpan = document.createElement('div');
            newSpan.style.cssFloat='right';
            
            newSpan.id=fields[lang][i]+'timer';
            newSpan.appendChild(  document.createTextNode(formatTimeString(overflow[i][0])));
            
            if(newSpan.style.color.indexOf(color)==-1){
                newSpan.style.color=color;
            }
            
            var old=returnObjById(fields[lang][i]+'timer');
                    
            old.parentNode.replaceChild(newSpan,old );
            old=returnObjById(fields[lang][i]+'value');

            if(parseInt(old.title)!=leftval){
                calOverflow();
                old=returnObjById('resbar'+i);
                var n=rowOpera(i,leftval);
                n.style.cssFloat='right';
                old.parentNode.replaceChild(n,old );
            }
            
        } else {
                var old=returnObjById(fields[lang][i]+'timer') ;
    
                if(old.textContent.indexOf('0:00:00 h')==-1){  
                    old.textContent='0:00:00 h';
                    old.style.color='red';
                    old=returnObjById('resbar'+i);
                    old.parentNode.replaceChild(rowOpera(i,100),old );
                }
        }
    }
    
    if(go){
        autotime = window.setTimeout(countdown, 1000);
        } 
    else {
        clearTimeout(autotime); //kill the timeout
        return;
    }
    
}
/**** End The menus actions*******/
/**** The menus*******/
function linksPlus(){var source=document.getElementById('content');
var links=source.getElementsByTagName('a');
var end=links.length;

for (var j=end-1; j>=0; j--) {
    var currentLink=links[j].getAttribute('href');
    if(!currentLink) break;
    var linkparts = currentLink.split('=');
                        
        if (currentLink.match('karte.') == 'karte.' && (linkparts[0].match('z')=='z' || linkparts[0].match('d')=='d') ) {
                
            linkparts[1]=linkparts[1].replace('&c','');
                                
            var imgattack = new Image(); 
            imgattack.innerHTML = ' <img src="img/x.gif" class="iReport iReport8">';
            imgattack.border=0;
            imgattack.title='Attack';
        
            var imgsend = new Image(); 
            imgsend.innerHTML = '<img src="img/x.gif" class="iReport iReport14">';
            imgsend.border=0;
            imgsend.title='Send resource';
        
          var attklink = document.createElement('a');
          attklink.href='a2b.php'+'?z='+linkparts[1];
          attklink.appendChild( imgattack );
            
            var bizlink = document.createElement('a');
            bizlink.href='build.php'+'?z='+linkparts[1]+'&gid=17';
            bizlink.appendChild( imgsend );
            links[j].parentNode.appendChild( attklink);
            links[j].parentNode.appendChild( bizlink);
            if ( document.location.href.indexOf("/spieler.php?uid") != -1) {
            links[j].parentNode.insertBefore( attklink ,links[j]);
            links[j].parentNode.insertBefore( bizlink ,links[j]);}
                                    
        } else if(currentLink.match('spieler.') == 'spieler.' && linkparts[0].match('uid')=='uid' ){
            
                var imgsend = new Image(); 
                imgsend.innerHTML = '<img src="http://img245.imageshack.us/img245/3530/121212a.png">&nbsp;';
                imgsend.border=0;
                imgsend.title='Send message';
                var msglink = document.createElement('a');
                msglink.href='nachrichten.php?t=1&'+'id='+linkparts[1];
                msglink.appendChild( imgsend );
                links[j].parentNode.insertBefore( msglink ,links[j]);
        }
            
    }
}
// teos
var Elm1 = document.getElementById("l1").title;
document.getElementById("resWrap").getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[9].innerHTML+= '='+Elm1+'';
// teos
var Lang   = new Array();
var local;

local = 'com';
Lang[local] = new Array();
Lang[local]['ro_'] = '';Lang[local]['ro0'] = '';Lang[local]['ro1'] = '';
Lang[local]['ro2'] = '';Lang[local]['ro3'] = '';Lang[local]['ro4'] = '';
Lang[local]['ro5'] = '';Lang[local]['ro6'] = '';Lang[local]['ro7'] = '';
Lang[local]['ro8'] = '';Lang[local]['ro9'] = '';
Lang[local]['ga_'] = '';Lang[local]['ga0'] = '';Lang[local]['ga1'] = '';
Lang[local]['ga2'] = '';Lang[local]['ga3'] = '';Lang[local]['ga4'] = '';
Lang[local]['ga5'] = '';Lang[local]['ga6'] = '';Lang[local]['ga7'] = '';
Lang[local]['ga8'] = '';Lang[local]['ga9'] = '';Lang[local]['u99'] = '';
Lang[local]['ge_'] = '';Lang[local]['ge0'] = '';Lang[local]['ge1'] = '';
Lang[local]['ge2'] = '';Lang[local]['ge3'] = '';Lang[local]['ge4'] = '';
Lang[local]['ge5'] = '';Lang[local]['ge6'] = '';Lang[local]['ge7'] = '';
Lang[local]['ge8'] = '';Lang[local]['ge9'] = '';
var einheit = new Array();

function einheitenFestlegen(local) {
  var volk = 'roemer';
  einheit[volk]   = new Array();
  einheit[volk][0] = new Array(Lang[local]['ro0'], 120, 100, 180, 40, 440);
  einheit[volk][1] = new Array(Lang[local]['ro1'], 100, 130, 160, 70, 460);
  einheit[volk][2] = new Array(Lang[local]['ro2'], 150, 160, 210, 80, 600);
  einheit[volk][3] = new Array(Lang[local]['ro3'], 140, 160, 20, 40, 360);
  einheit[volk][4] = new Array(Lang[local]['ro4'], 550, 440, 320, 100, 1410);
  einheit[volk][5] = new Array(Lang[local]['ro5'], 550, 640, 800, 180, 2170);
  einheit[volk][6] = new Array(Lang[local]['ro6'], 900, 360, 500, 70, 1830);
  einheit[volk][7] = new Array(Lang[local]['ro7'], 950, 1350, 600, 90, 2990);
  einheit[volk][8] = new Array(Lang[local]['ro8'], 30750, 27200, 45000, 37500, 140450);
  einheit[volk][9] = new Array(Lang[local]['ro9'], 5800, 5300, 7200, 5500, 23800);

  volk = 'gallier';
  einheit[volk]   = new Array();
  einheit[volk][0] = new Array(Lang[local]['ga0'], 100, 130, 55, 30, 315);
  einheit[volk][1] = new Array(Lang[local]['ga1'], 140, 150, 185, 60, 535);
  einheit[volk][2] = new Array(Lang[local]['ga2'], 170, 150, 20, 40, 380);
  einheit[volk][3] = new Array(Lang[local]['ga3'], 350, 450, 230, 60, 1090);
  einheit[volk][4] = new Array(Lang[local]['ga4'], 360, 330, 280, 120, 1090);
  einheit[volk][5] = new Array(Lang[local]['ga5'], 500, 620, 675, 170, 1965);
  einheit[volk][6] = new Array(Lang[local]['ga6'], 950, 555, 330, 75, 1910);
  einheit[volk][7] = new Array(Lang[local]['ga7'], 960, 1450, 630, 90, 3130);
  einheit[volk][8] = new Array(Lang[local]['ga8'], 30750, 45400, 31000, 37500, 144650);
  einheit[volk][9] = new Array(Lang[local]['ga9'], 5500, 7000, 5300, 4900, 22700);
  einheit[volk][10] = new Array(Lang[local]['u99'], 20, 30, 10, 20, 80);

  volk = 'germanen';
  einheit[volk]   = new Array();
  einheit[volk][0] = new Array(Lang[local]['ge0'], 95, 75, 40, 40, 250);
  einheit[volk][1] = new Array(Lang[local]['ge1'], 145, 70, 85, 40, 340);
  einheit[volk][2] = new Array(Lang[local]['ge2'], 130, 120, 170, 70, 490);
  einheit[volk][3] = new Array(Lang[local]['ge3'], 160, 100, 50, 50, 360);
  einheit[volk][4] = new Array(Lang[local]['ge4'], 370, 270, 290, 75, 1005);
  einheit[volk][5] = new Array(Lang[local]['ge5'], 450, 515, 480, 80, 1525);
  einheit[volk][6] = new Array(Lang[local]['ge6'], 1000, 300, 350, 70, 1720);
  einheit[volk][7] = new Array(Lang[local]['ge7'], 900, 1200, 600, 60, 2760);
  einheit[volk][8] = new Array(Lang[local]['ge8'], 35500, 26600, 25000, 27200, 114300);
  einheit[volk][9] = new Array(Lang[local]['ge9'], 7200, 5500, 5800, 6500, 25000);
}

//Unicode characters and other characters

var summenzeichen = '\u99';
var fragezeichen  = '?';


//Variables

var vorrat = new Array();
var lager = new Array();
var elAllDiv, newTABLE, newTEXT, newTR, newTD, newB, newBR;


// Features

function seite() {return window.location.pathname.substr(window.location.pathname.indexOf(fragezeichen)+1);}
// provides the referring site, without parameters

function seite_parameter() {return window.location.href.substr(window.location.href.indexOf(fragezeichen)+1);}
// provides the parameters of the referring page

function contains(a,b) { return (a.indexOf(b) != -1) }
// returns true if b is contained in a

function maxValue (arr) {
// returns the index number of the elmentem in the array 'arr' with the largest wert
  var maxV;
  if (arr.length > 0) { // If the array contains any elements
    maxV = 0;
    for (i = 1; i < arr.length; i++) {
      if (arr[i]>arr[maxV]) { maxV = i; }
    }
  } else {
    maxV = null
  }
  return maxV;  
}

function language() {
// provides the 'language' = XXX server address travian.XXX
  var host = window.location.host;
  var sprache = host.substr(host.indexOf('travian.')+8)
  if (Lang[sprache] == null) { sprache = 'com' }
  // if no translation exists for this server -> English
  return sprache;
}

function ressisAuslesen() {
// analyzes the original page and read the existing Ressis
  var elAllTD, kn;
  var cnt = 0;   // Counts the found Ressi species (max = 4: WoodLehm, Eisen, Getreide)
  vorrat[4] = 0; // the sum total here is going to come

  var elAllTD = document.getElementsByTagName('TD');
  for ( i=0; ((i<elAllTD.length) && (cnt<4));i++ ) { 
                              // Examine all the TD elements, until all 4 Ressi-Arten gefunden wurden
    kn = elAllTD[i].firstChild;
    while ((kn != null) && (cnt<4)){
      if (kn.nodeType == 3) { // if there is a text node
        zeile = kn.data;
        if (contains(zeile,'/')) { 
          vorrat[cnt] = parseInt(zeile.substr(0,zeile.indexOf('/')));
          lager[cnt] = parseInt(zeile.substr(zeile.indexOf('/')+1));            
          vorrat[4] += vorrat[cnt];
          cnt += 1;
        }
      }
      kn = kn.nextSibling;
    }
  }
}

function insertTruppenLink(v,nr,elt,addy) {
// Adds a Link
  var setupLink = document.createElement('A');
  setupLink.innerHTML = '<font size="-2"> (' + berechneAnzahl(v, nr, vorrat[4])  + ') ' + einheit[v][nr][0]+'</FONT>';
  setupLink.setAttribute("href", 'javascript:void(0)');
  setupLink.addEventListener("click", function() {berechneRessis (v, nr, vorrat[4]);},false);

  newIMG = document.createElement('span');
  newIMG.innerHTML = ' <img src="img/x.gif" class="unit u' + parseInt(addy) + '"> ';
  elt.appendChild(newIMG);
  elt.appendChild(setupLink);
}

function insertRessiLink(r, elt) {}

function berechneAnzahl(v, nr, sum) {
// the maximum number of troops to be created
  var anzahl;
  anzahl = (sum / einheit[v][nr][5]);
  for (i=0; i<4; i++) {
    if ((anzahl * einheit[v][nr][i+1]) > lager[i]) {
      anzahl = lager[i] / einheit[v][nr][i+1];
    }
  }
  anzahl = Math.floor(anzahl)
  return anzahl
}

function setRessis (v, nr, anzahl, sum) {
  var rest = sum;
  var tmpRes = new Array(0,0,0,0);
  var resObj=document.getElementsByName("m2[]");
  var vorzeichen = '';
  for (i=0; i<4; i++) {
    tmpRes[i] = anzahl * einheit[v][nr][i+1]
    rest = rest - tmpRes[i];
  }

  // divide the remaining ressis
  while (rest > 0) {
    for (i=0; i<4;i++) {
      if (tmpRes[i] < lager[i]) {
        tmpRes[i] += 1;
        rest -= 1;
      }
    }
  }
  
  for (i=0; i<4; i++) {
    resObj[i].value = tmpRes[i];
    if ((tmpRes[i] - vorrat[i]) > 0) {vorzeichen = '+'} else {vorzeichen = ''}
    document.getElementById("diff"+i).innerHTML= vorzeichen + (tmpRes[i] - vorrat[i]);
  }
}

function setRessisRessi (r, sum) {
  var rest = sum;
  var tmpRes = new Array(0,0,0,0);
  var resObj=document.getElementsByName("m2[]");
  var vorzeichen = '';

  for (i=0; i<4; i++) { tmpRes[i] = 0}

  if (rest > lager[r]) {
    tmpRes[r] = lager[r]; 
    rest -= lager[r]
  } else {
    tmpRes[r] = rest;
    rest = 0;
  }

  // divide the remaining ressis
  while (rest > 0) {
    for (i=0; i<4;i++) {
      if (tmpRes[i] < lager[i]) {
        tmpRes[i] += 1;
        rest -= 1;
      }
    }
  }
  
  for (i=0; i<4; i++) {
    resObj[i].value = tmpRes[i];
    if ((tmpRes[i] - vorrat[i]) > 0) {vorzeichen = '+'} else {vorzeichen = ''}
    document.getElementById("diff"+i).innerHTML= vorzeichen + (tmpRes[i] - vorrat[i]);
  }
  
  document.getElementById("remain").innerHTML=0;
  document.getElementById("submitText").innerHTML="";
  document.getElementById("submitButton").style.display="block";
}

function berechneRessis (v, nr, sum) {
// calculates the individual Ressis for the maximum number of erschaffenden Truppen
  setRessis(v, nr, berechneAnzahl(v, nr, sum), sum);
  document.getElementById("newsum").innerHTML=sum;
  document.getElementById("remain").innerHTML=0;
  document.getElementById("submitText").innerHTML="";
  document.getElementById("submitButton").style.display="block";
}

function generiereNPCEintrag() {
// creates the entry on the page 
  elAllDiv = document.getElementsByTagName('P');
                     // all P elements are found

  for ( i=0; i<elAllDiv.length; i++ ) {
    if (i == 0 ) { elAllDiv[i].parentNode.removeChild(elAllDiv[i]); }
    if (i == 2 ) {
      elAllDiv[i].innerHTML = '';

      newDIVall = document.createElement('tr');
      elAllDiv[i].parentNode.insertBefore(newDIVall, elAllDiv[i]); 

// Table
      newBR = document.createElement('BR');
      newDIVall.appendChild(newBR);

      newDIV = document.createElement('tr');
      newDIV.className = 'f10 b';
      newDIVall.appendChild(newDIV);

      newTABLE = document.createElement('TH');
      newTABLE.className = 'f10';
      newDIVall.appendChild(newTABLE);

      newTR = document.createElement('span');
      newTABLE.appendChild(newTR);

// Roemer
      newTD = document.createElement('div');
      newTR.appendChild(newTD);
      for (j=0;j<10;j++) {insertTruppenLink('roemer',j,newTD,j+1);}

// Gauls
      newTD = document.createElement('div');
      newTR.appendChild(newTD);
      for (j=0;j<10;j++) {
      insertTruppenLink('gallier',j,newTD,j+21);}
      insertTruppenLink('gallier',0,newTD,99);

// Teutons
      newTD = document.createElement('div');
      newTR.appendChild(newTD);
      for (j=0;j<10;j++) {insertTruppenLink('germanen',j,newTD,j+11);}
    }
  }
}

function generiereNPCLink() {}
    //check if NPC page
    function isThisNPC()  {
        //var retValue = xpathResultEvaluate('//table[@id="npc"] | //tr[@class="rbg"]/td[@colspan="5"]').snapshotLength == 1 && document.getElementsByName('m2[]').length == 4;
        //if (retValue == false) retValue = document.getElementsByName("m2[]").length == 4;
        //return retValue;
        return xpathResultEvaluate('//table[@id="npc"] | //tr[@class="rbg"]/td[@colspan="5"]').snapshotLength == 1 && document.getElementsByName('m2[]').length == 4;
    }
    
    //check if NPC excluded
    function isThisNPCexcluded() {
        return (TB3O.boolUseNPCAssistant != '1' ||
            TB3O.boolIsThisNPC == true ||
            crtPage.indexOf("build.php") == -1 ||
            crtPage.match(/build.php\?(.*)&t=(\d+)/) != null ||
            get("map1") != null || find("//map[@name='map1']", XPFirst) != null);
    }

    //check if we are on the page where the NPC trade has been finished
    function boolIsThisPostNPC() {
        var xp = xpathResultEvaluate('//p/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[@class="res"]');
        return (xp.snapshotLength == 8);
    }

    //insert the NPC assistant back link
    function insertNPCHistoryLink() {
        var bname = getQueryParameters(urlNow, NPCbacklinkName);
        if (!bname) bname = "Go back";
        var div = get(dmid2);
        div.innerHTML += '<p>&nbsp;<a href="#" onclick="window.history.go(-2)"> &laquo; ' + bname + '</a></p>';
    }

    //fill in the NPC Merchant fields
    function fillinNPCfields(aURL) {
        if (aURL.indexOf('&' + NPCResources) != NPCURL.length) return false;
        var needed = getQueryParameters(aURL, NPCResources).split(',');
        var inputs = document.getElementsByName('m2[]');
        for (var i = 0; i < 4; i++) {inputs[i].value = needed[i];}
        unsafeWindow.calculateRest();
    }

// Main

einheitenFestlegen(language());
if (seite() != '/') { // z.b. www.travian.de
  generiereNPCLink();
}
if (contains(seite_parameter(),'&t=3')) {
  ressisAuslesen();
  generiereNPCEintrag();
}
// teos
function saveNote(){
var elem1 = document.createElement("div");
elem1.innerHTML = '<div id="saved">'+Notefile[1]+'</div>';
var tags0 = document.evaluate("id('saved')", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags0.snapshotLength; i++)
{var del0 = tags0.snapshotItem(i); del0.parentNode.removeChild(del0);}
var saved = document.getElementById("btn_save");
saved.parentNode.appendChild(elem1);}
if ( document.location.href.indexOf("/nachrichten.php") != -1) {
document.getElementById("textmenu").innerHTML+= '| <a href="nachrichten.php?t=5">'+Notefile[0]+'</a>';}
if ( document.location.href.indexOf("/nachrichten.php?t=5") != -1) {
var note = document.getElementById('textmenu'); var saves = GM_getValue("notepadlog");
note.innerHTML+= '<p><div id="block"><textarea id="notic"></textarea><p class="btn">'+
'<input type="image" alt="save" src="img/x.gif" class="dynamic_img" id="btn_save" value="save"></p></div></p>';
var savebutton = document.getElementById('btn_save');
function savelog() {var writtentext = document.getElementById('notic').value;
GM_setValue("notepadlog", writtentext);};
savebutton.addEventListener("click", savelog, false);
savebutton.addEventListener("click", saveNote, false);
var textboxy = document.getElementById('notic').value = saves;}
// teos
if (document.getElementById("contract") != null){
function format(maxtime){
var hrs = Math.floor(maxtime/3600);
var min = Math.floor(maxtime/60) % 60;
var sec = maxtime % 60;
var t = hrs + ":"; if(min < 10){t += "0";}
t += min + ":"; if(sec < 10){t += "0";}
t += sec; return t;}
var basee =  document.getElementById("contract");
var base = basee.innerHTML;
var test = base.split(/<img\b[^>]*>/);
var neededRes = [];
var curRes = [];
var wantsRes = [];
var mColor = [];
for (var e = 0; e < 4; e++) {
neededRes[e] = test[(e+1)].replace(" | ", "").replace(/<span\b[^>]*>(.*)<\/span>/, "$1");
curRes[e] = document.getElementById("l" + (4-e)).innerHTML.split("/")[0];
var wholeRes = document.getElementById("l" + (4 - e));
var income = wholeRes.getAttribute("title");
var incomepersecond = income / 3600;
wantsRes[e] = curRes[e] - neededRes[e];
if (wantsRes[e] >= 0) { mColor[e] = "green"; wantsRes[e] = "+" + wantsRes[e]; }
else { mColor[e] = "red";wantsRes[e] = "  " + wantsRes[e] + " ( <span id='TimeOut'>" + format(Math.abs(Math.round(wantsRes[e] / incomepersecond)), 0) +"</span> )" }}

var beforeThis = document.createElement("span");
for (var j = 0; j < 4; j++) {
beforeThis.innerHTML +='<img src="img/x.gif" class="r' + (j+1) + '"><span style="color: ' + mColor[j] + ';">' + wantsRes[j] + '</span></> ';}
basee.appendChild(beforeThis);}

window.addEventListener("load", PlusLinks1, false);
// Set timeouts
function funcSetTimers(){
setInterval(function () {
var relojes = funcFindElem("//*[@id='TimeOut']", XPList);
for (var i = 0; i < relojes.snapshotLength; i++){
var tiempo = funcTime2Seconds(relojes.snapshotItem(i).textContent) - 1;
if (tiempo >= 0) relojes.snapshotItem(i).innerHTML = funcSeconds2Time(tiempo);}},1000);}
{
    
    function funcGetResourcesData()
    {
        for (var i = 0; i < 4; i++) 
        {
            var a = funcGetElemByID('l' + (4-i));
            if ( a == null ) return;
            actual_resources[i] = a.innerHTML.split("/")[0];
            total_resources[i] = a.innerHTML.split("/")[1];
            resources_per_hour[i] =  a.title;
            resources_per_sec[i] = resources_per_hour[i]/3600;
        }
    }
        
    function funcGetGeneralData()
    {   actual_resources = new Array(4);
        actual_resources = [0,0,0,0];
        total_resources  = new Array(4);
        total_resources = [0,0,0,0];
        resources_per_sec = new Array(4);
        resources_per_sec = [0,0,0,0];
        resources_per_hour = new Array(4);
        resources_per_hour = [0,0,0,0];
        plus = false;
        autosDelay = 5000;
        funcGetResourcesData();
    }
    function funcSetAutoTimers()
    {}}

function funcMain()
{funcGetGeneralData();
 funcCalculateFillTime();
 funcSetAutoTimers();
 funcSetTimers();}
var scriptStartTime = new Date().getTime();
if (document.evaluate("//ns:div[@id='header']", document, nsResolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength < 1)
{} else {funcMain();}
if (document.getElementsByClassName("tit")[0] !=null){
document.getElementsByClassName("build_details")[0].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML+= ''+
''+NPC102+'';}