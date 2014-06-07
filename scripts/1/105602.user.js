// ==UserScript==
// @name           Travian Resource Needed to Build + Quick NPC
// @author         armanda
// @version        1.0.0
// @size           5.04 KB
// @description    Work With(Firefox, Chrome, Opera) - (T4 only!)
// @include        http://*.travian.*/*
// @exclude        http://*.travian*.*/hilfe.php*
// ==/UserScript==

function format(maxtime) {
    var hrs = Math.floor(maxtime / 3600);
    var min = Math.floor(maxtime / 60) % 60;
    var sec = maxtime % 60;
    var t = hrs + ":"; if (min < 10) { t += "0"; }
    t += min + ":"; if (sec < 10) { t += "0"; }
    t += sec; return t;
};
function ReLoadTime(Time) { var p = Time.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1); }
function Xpath(path) { return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); };
function ID(id) { return document.getElementById(id) };
function C(value) { return parseInt(value) };
function Time(x, y) { return format(Math.abs(Math.round(x / y))); };
function NewElm(tag) { return document.createElement(tag) };

var ResSplit = ["'l1': ", "'l2': ", "'l3': ", "'l4': "]
var res = [];
var MyRes = [];
var pro = [];
var Total = [];
var Timer = [];
var Color = [];
var sTime = [];
var NPC;
var NPC_Timer;
var NPC_Time;

res[0] = Xpath("//div[@id='contract']/div[2]/div[1]/span[1]").innerHTML.split(">")[1];
res[1] = Xpath("//div[@id='contract']/div[2]/div[1]/span[2]").innerHTML.split(">")[1];
res[2] = Xpath("//div[@id='contract']/div[2]/div[1]/span[3]").innerHTML.split(">")[1];
res[3] = Xpath("//div[@id='contract']/div[2]/div[1]/span[4]").innerHTML.split(">")[1];

MyRes[0] = ID("l1").innerHTML;
MyRes[1] = ID("l2").innerHTML;
MyRes[2] = ID("l3").innerHTML;
MyRes[3] = ID("l4").innerHTML;

pro[0] = Xpath("//div[@class='bodyWrapper']/script").innerHTML.split(ResSplit[0])[1].split(',')[0];
pro[1] = Xpath("//div[@class='bodyWrapper']/script").innerHTML.split(ResSplit[1])[1].split(',')[0];
pro[2] = Xpath("//div[@class='bodyWrapper']/script").innerHTML.split(ResSplit[2])[1].split(',')[0];
pro[3] = Xpath("//div[@class='bodyWrapper']/script").innerHTML.split(ResSplit[3])[1].split('}')[0];

for (i = 0; i < 4; i++) {
    Total[i] = C(C(MyRes[i]) - C(res[i]));
    if (Total[i] < 0) {
        Color[i] = 'style="color: red;"';
        sTime[i] = pro[i] / 3600;
        Timer[i] = Time(Total[i], sTime[i]);

    } else {
        Color[i] = 'style="color: green;"';
        Total[i] = '+' + Total[i]
        Timer[i] = '-:-:-';
    };
};


NPC = C(C(C(MyRes[0]) + C(MyRes[1]) + C(MyRes[2]) + C(MyRes[3])) - C(C(res[0]) + C(res[1]) + C(res[2]) + C(res[3])));
if (NPC < 0) {
    Color[4] = ' style="color: red; font-size: 11px;"';
    NPC_Time = C(C(pro[0]) + C(pro[1]) + C(pro[2]) + C(pro[3]));
    NPC_Time = NPC_Time / 3600;
    xNPC = C(C(Total[0]) + C(Total[1]) + C(Total[2]) + C(Total[3]));
    NPC_Timer = Time(xNPC, NPC_Time);
} else {
    Color[4] = ' style="color: green; font-size: 11px;"';
    NPC = '+' + NPC;
    NPC_Timer = '-:-:-';
};

var Target = ID("contract");
var Child = NewElm("table");
var Tbody = NewElm("tbody");
var Tfoot = NewElm("tfoot");
Tfoot.innerHTML = '<tr><td colspan="1" style="direction: ltr; text-align: center; font-size: 11px; border-top: 1px solid black;">Total NPC = [<span' + Color[4] + '>' + NPC + '</span>]<td style="direction: ltr; text-align: center; font-size: 11px; border-top: 1px solid black;" id="NPC_Timer">' + NPC_Timer + '</td></td></tr>';
Child.setAttribute("cellspacing", "0");
Child.setAttribute("style", "width: auto; border: 1px solid black;");
Tbody.innerHTML = ''
for (i = 0; i < 4; i++) { Tbody.innerHTML += '<tr><td><img src="img/x.gif" class="r' + (i + 1) + '" /><span ' + Color[i] + '>&nbsp;' + Total[i] + '</span><td style="font-size: 11px; text-align: center;" colspan="2" id="T4_Timer[' + (i + 1) + ']">' + Timer[i] + '</td></td></tr>'; };
Child.appendChild(Tfoot);
Child.appendChild(Tbody);
Target.appendChild(NewElm("br"));
Target.appendChild(Child);

function LoadTimeA() { if (ID('T4_Timer[1]').innerHTML == '-:-:-') { } else { ID('T4_Timer[1]').innerHTML = format(ReLoadTime(ID('T4_Timer[1]').innerHTML) - 1); return setTimeout(LoadTimeA, 1000); }; }; LoadTimeA();
function LoadTimeB() { if (ID('T4_Timer[2]').innerHTML == '-:-:-') { } else { ID('T4_Timer[2]').innerHTML = format(ReLoadTime(ID('T4_Timer[2]').innerHTML) - 1); return setTimeout(LoadTimeB, 1000); }; }; LoadTimeB();
function LoadTimeC() { if (ID('T4_Timer[3]').innerHTML == '-:-:-') { } else { ID('T4_Timer[3]').innerHTML = format(ReLoadTime(ID('T4_Timer[3]').innerHTML) - 1); return setTimeout(LoadTimeC, 1000); }; }; LoadTimeC();
function LoadTimeD() { if (ID('T4_Timer[4]').innerHTML == '-:-:-') { } else { ID('T4_Timer[4]').innerHTML = format(ReLoadTime(ID('T4_Timer[4]').innerHTML) - 1); return setTimeout(LoadTimeD, 1000); }; }; LoadTimeD();
function LoadTimeE() { if (ID('NPC_Timer').innerHTML == '-:-:-') { } else { ID('NPC_Timer').innerHTML = format(ReLoadTime(ID('NPC_Timer').innerHTML) - 1); return setTimeout(LoadTimeE, 1000); }; }; LoadTimeE();
