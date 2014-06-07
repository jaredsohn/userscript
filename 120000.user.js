// ==UserScript==
// @name Monster Game Commander CO
// @namespace http://zahlenzerkleinerer.de
// @description A Script to manage the MMOG Monster Game tutorial
// @include *
// ==/UserScript==
var jetzt = new Date();
var BenchST = jetzt.getTime();
var NamenArr = new Array(“test”);
var Host = window.location.host;
var SucheS = /spielwelt([0-9]+)\.monstersgame\.net/;
var Domain = SucheS.exec(Host);
if(Domain != null) { var Server = Domain[1]; }
var GoldLimit = GM_getValue(‘GoldLimit’+Server,100);
var GoodGoldie = GM_getValue(‘GoodGoldie’+Server,70);
GM_log(‘<--------- Tutorial 04 ------- Benchmarking ---> ‘);
var Para = window.location.search;
if(Para != “”) {
var SucheP = /=([a-z0-9]+)/gi;
var UrPara = Para.match(SucheP);
} else { var UrPara = new Array(); }
function NeuesElement(Tag, Inhalt)
{dem oGame Script bedient
var Neu = document.createElement(Tag);
if (Inhalt.indexOf(“<") != -1 || Inhalt.indexOf("&") != -1)
Neu.innerHTML = Inhalt;
else if (Inhalt.length > 0)
Neu.appendChild(document.createTextNode(Inhalt));
if (NeuesElement.arguments.length > 2) {
for (var i = 2; i < NeuesElement.arguments.length-1; i += 2) {
if (!NeuesElement.arguments[i+1].length) continue;
Neu.setAttribute(NeuesElement.arguments[i], NeuesElement.arguments[i+1]);
}
}
return Neu;
}
function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}
function tooltiph(name) {
wmtt = document.getElementById('NamenInfo');
softInfo = GM_getValue(name+Server);
var infoz = softInfo.split('@_@');
//if(wmtt.style.display == "none") {
// wmtt.style.display = "block";
// var TTI = NeuesElement("div", "", "align", "center", "bgcolor","#0000FF");
Code = '
Name ‘+name+’ QUER Gold: ‘+infoz[1]+’ LetzterKamp: ‘+infoz[2];
Code += ‘
‘;
Code += ‘
‘;
Code += ‘
‘;
Code += ‘
‘;
Code += ‘

'+name+'‘; 
Code += ‘
‘;
Code += ‘ 
+,5h ‘;
Code += ‘ +1h ‘;
Code += ‘ +2,5h ‘;
Code += ‘ __-
‘;
Code += ‘
‘;
Code += ‘
‘;
Code += ‘
‘;
Code += ‘
‘;
Code += ‘
‘;
var softVar = GM_getValue(‘lName’+Server,0);
var hardVar = 0;
if(softVar!=0) var hardVar = softVar.split(‘@_@’);
if(hardVar.length!=0) {
var HaveTime = ”;
var NoTime = ”;
var Goldie = ”;
var TimeR = BenchST;
for (var n=0; n
softInfo = GM_getValue(hardVar[n]+Server);
var infoz = softInfo.split('@_@');
var restT = TimeR-infoz[0];
var DiffTime = 43200000; // 12 Stunden
if(restT
var restT = DiffTime-restT;
var nTime = new Date();
nTime.setTime(restT);
var ZeitInfo = ' T:';var Abbruch = 1;
if(nTime.getHours() >= 2) { ZeitInfo += ‘ H:’+ (nTime.getHours()-1); Abbruch = 0;}
if(nTime.getMinutes() >= 1 && Abbruch) { ZeitInfo += ‘ M:’+ nTime.getMinutes(); Abbruch = 0; }
if(nTime.getSeconds() >= 1 && Abbruch) ZeitInfo += ‘ S:’+ nTime.getSeconds();
HaveTime += ‘

'+hardVar[n]+'’ ‘; 
                                } else {
                                if(infoz[2] >= GoodGoldie) {
                                        Goldie += ‘ 
'+hardVar[n]+' ‘; 
                                } else {
                                         NoTime += ‘ 
'+hardVar[n]+'‘; 
}
}
}
Code += ‘
‘;
Code += ‘
‘;
}
Code += ‘
‘;
Testi.innerHTML=Code;
return Testi;
}
function HoleGegner(startLine) {
var endLine = startLine-50;
GM_log(‘ ———— Beginne mit der Zeile ‘+startLine+’ und ende mit ‘+endLine+’ ——————–’); 
for(goUP=startLine;goUP>endLine;goUP=goUP-5) {
if(document.getElementsByTagName(‘td’)[goUP].firstChild.data == “Gegner:”) break;
GM_log(‘<---- Begin --------- > ‘);
var GName = document.getElementsByTagName(‘td’)[goUP].firstChild.firstChild.data;
GM_log(‘<---- Begin --------- > ‘+GName);
var GWinR = document.getElementsByTagName(‘td’)[goUP+1].firstChild.data;
if(GWinR.length==22) GName = GName.substring(0,22);
if(GName == GWinR) { GM_log(‘<--------------------- Looser ----------------------- >‘); continue; }
var Datum = document.getElementsByTagName(‘td’)[goUP-1].firstChild.data;
var DateAr = /([0-9]+)\.([0-9]+)\.([0-9]+)\s([0-9]+):([0-9]+):([0-9]+)/.exec(Datum);
var DaUTC = Date.UTC(RegExp.$3,RegExp.$2-1,RegExp.$1,RegExp.$4,RegExp.$5,RegExp.$6);
DaUTC = parseInt(DaUTC)-7200000;
var WGold = document.getElementsByTagName(‘td’)[goUP+2].firstChild.data.match(/[0-9]+/)[0];
GM_log(‘<---- GOLD gewonnen --> ‘+WGold);
var softVar = GM_getValue(GName+Server,0);
if(softVar == 0) {
if(GoldLimit>WGold) { GM_log(‘<-------- GoldLimit -> ‘+GoldLimit+’ Gewonnen ‘+WGold); continue; }
GM_log(‘<----------- Neuers Goldopfer ----------> ‘);
un_ser = new Array(DaUTC,WGold,WGold,1);
var hard = un_ser.join(“@_@”);
GM_setValue(GName+Server,hard);
var listName = GM_getValue(‘lName’+Server);
if(listName) {
var unListName = listName.split(‘@_@’);
var numIT = unListName.length+1;
GM_log(‘Anzahl der Namen ‘+numIT);
unListName.push(GName);
} else {
var unListName = new Array(GName);
}
var listName = unListName.join(“@_@”);
GM_setValue(‘lName’+Server,listName);
} else {
var hardVar = softVar.split(“@_@”);
if(hardVar[0]
hardVar[0] = DaUTC; // the of fight
hardVar[1] = Math.floor((parseInt(hardVar[1]) + parseInt(WGold))/2); // Durschnitt an Beute
hardVar[2] = WGold; // zuletzt gewonnendes Gold
hardVar[3] = parseInt(hardVar[3])+1; // Schlachten oder flag fï¿½r TeamKampf
var softVar = hardVar.join("@_@");
GM_setValue(GName+Server,softVar);
GM_log('<----------- Update eines Goldopfers ----------> ‘);
}
GM_log(‘<------- End -------- > ‘+GName);
}
if(goUP>120) break;
if(goUP<1) break;
}
}
function Optionz() {
addGlobalStyle(
'.Optionz td{' +
' text-align:center;' +
' }' +
'.Optionz table{' +
' background-color:#E0E0E0;'+
' }'+
'.curx {'+
' cursor:crosshair;'+
'}'); 
newOption = NeuesElement("div", "");
var listName = GM_getValue('lName'+Server);
var unListName = listName.split('@_@');
var numIT = unListName.length-1;
Code = '
Goldies + ‘+GoodGoldie+’ -‘;
Code += ‘
Free
Time
‘+Goldie+’
‘+NoTime+’
‘+HaveTime+’
‘;
Code += ‘
‘;
for(o=0;o<=numIT;o++) {
var NDaten = GM_getValue(unListName[o]+Server,"1@_@2@_@3@_@4@_@5");
var hardVar = NDaten.split("@_@");
Code += '
‘;
TTime = new Date();
TTime.setTime(parseInt(hardVar[0]));
Code += ‘ 
‘;
Code += ‘ 
‘;
Code += ‘ 
‘;
var len = hardVar[3].length;
for(s=0;s<=len;s++) {
var nr = hardVar[3].substr(s, 1);
}
Code += ' 
‘;
Code += ‘ 
‘;
}
Code += ‘
‘;
Code += ‘
‘;
Code += ‘

<tr>
<th>Name</th>
<th>LezterKamp</th>
<th>SCH</th>
<th>Gold</th>
<th>Kï¿½mpfe</th>
<th>Lï¿½schen</th>
</tr>
<p>&#8216;;<br />
        for(o=0;o<=numIT;o++) {<br />
                var NDaten = GM_getValue(unListName[o]+Server,"1@_@2@_@3@_@4@_@5");<br />
                var hardVar = NDaten.split("@_@");<br />
                Code += '<br />
<tr>
<td align="right">&#8216;+unListName[o]+&#8217;</td>
<p>&#8216;;<br />
                TTime = new Date();<br />
                TTime.setTime(parseInt(hardVar[0]));</p>
<p>             Code += &#8216;
<td>&#8216;+TTime.toLocaleString()+&#8217;</td>
<p>&#8216;;<br />
                Code += &#8216;
<td>&#8216;+hardVar[1]+&#8217;</td>
<p>&#8216;;<br />
                Code += &#8216;
<td>&#8216;+hardVar[2]+&#8217;</td>
<p>&#8216;;<br />
                var len = hardVar[3].length;<br />
                for(s=0;s<=len;s++) {<br />
                        var nr = hardVar[3].substr(s, 1);<br />
                }<br />
                Code += '
<td>&#8216;+hardVar[3]+&#8217;</td>
<p>&#8216;;<br />
                Code += &#8216;
<td onClick="loescheNamen(\''+unListName[o]+'\')" class="curx">Lï¿½schen</td>
<p>&#8216;;<br />
        }<br />
        Code += &#8216;<br />
<tr>
<td colspan="6" onClick="loescheNAMEZ()">Lï¿½sche alle Namen</td>
</tr>
<p>&#8216;;<br />
        Code += &#8216;<br />
<tr>
<td colspan="6">&#8216;;<br />
        for(i=10;i<=251;i=i+10) {<br />
                Code += '<a href="http://spielwelt'+Server+'.monstersgame.net/index.php?ac=nachrichten&#038;sac=angriff&#038;count='+i+'">&#8216;;<br />
                Code += (parseInt(i)+1) +&#8217;-'+ (parseInt(i)+10) +&#8217;</a> : &#8216;;<br />
        }<br />
        Code += &#8216;</td>
</tr>
<p>&#8216;;<br />
        Code += &#8216;</table>
‘;
newOption.innerHTML=Code;
return newOption;
}
var all_tdz = document.getElementsByTagName(“td”);
var NamenJ = 0;var profil = 0;
for(a=0;a
if(all_tdz[a].innerHTML.match('Werwolfjagd') != null) {
var NamenJ = a;
}
if(all_tdz[a].innerHTML.match('showuserid') != null) {
var showuserid = a;
}
if(all_tdz[a].innerHTML.match('Profileinstellungen') != null) {
var profil = a;
}
}
if(NamenJ != 0) {
document.getElementsByTagName("td")[NamenJ].appendChild(kampf_name());
}
if(profil != 0) {
document.getElementsByTagName("td")[profil].appendChild(Optionz());
}
if(showuserid != 0) {
if(UrPara[1] == "=angriff") { HoleGegner(showuserid);}
}
unsafeWindow.neueZeiten = neueZeiten;
unsafeWindow.tooltiph=tooltiph;
unsafeWindow.ChangeGG=ChangeGG;
unsafeWindow.loescheNAMEZ=loescheNAMEZ;
// ---------------------------------------------------------------------------------------
var dannB = new Date();
var BenchEn = dannB.getTime()
var BenDiff = BenchST+BenchEn;
GM_log('<--------- '+Server+' ------- Millisec diff---> ‘+(BenchEn-BenchST));
// —————————————————————————————