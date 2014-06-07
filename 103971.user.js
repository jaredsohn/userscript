// ==UserScript==
// @name 	Travian4 - NPC helper
// @version     1.0
// @developer   ww_start_t
// @description For (Firefox, Chrome, Opera). Add NPC For Troops (T4)!
// @include 	http*://*t*.travian*.*/*
// ==/UserScript==

function ID(id) { return document.getElementById(id); };
function CL(className){return document.getElementsByClassName(className)};
function Child(tagName) { return document.createElement(tagName); };
function xpath(path) {	return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); };
function txt(value) { return document.createTextNode(value) };
function C(value) { return parseInt(value) };

function DoNPC(num) {
    var source = C(C(ID("l1").innerHTML) + C(ID("l2").innerHTML) + C(ID("l3").innerHTML) + C(ID("l4").innerHTML));

    var res_A = xpath("//form/div[@class='buildActionOverview trainUnits']/div[" + num + "]/div[2]/div[@class='showCosts']/span[@class='resources r1']").snapshotItem(0).innerHTML.split(/<img\b[^>]*>/)[1];
    var res_B = xpath("//form/div[@class='buildActionOverview trainUnits']/div[" + num + "]/div[2]/div[@class='showCosts']/span[@class='resources r2']").snapshotItem(0).innerHTML.split(/<img\b[^>]*>/)[1];
    var res_C = xpath("//form/div[@class='buildActionOverview trainUnits']/div[" + num + "]/div[2]/div[@class='showCosts']/span[@class='resources r3']").snapshotItem(0).innerHTML.split(/<img\b[^>]*>/)[1];
    var res_D = xpath("//form/div[@class='buildActionOverview trainUnits']/div[" + num + "]/div[2]/div[@class='showCosts']/span[@class='resources r4']").snapshotItem(0).innerHTML.split(/<img\b[^>]*>/)[1];

    var IMG = xpath("//div[@class='buildActionOverview trainUnits']/div[" + num + "]/div[@class='details']//img").snapshotItem(0).getAttribute("class");
    var Resource = '' + C(C(source) / C(C(res_A) + C(res_B) + C(res_C) + C(res_D))) + '';

    var Num = xpath("//form/div[@class='buildActionOverview trainUnits']/div[" + num + "]/div[@class='details']/a").snapshotItem(0).innerHTML;
    Num = C((Num * Num) + (1));
    res_A = C((res_A) * (Num));
    res_B = C((res_B) * (Num));
    res_C = C((res_C) * (Num));
    res_D = C((res_D) * (Num));

    var href = '/build.php?gid=17&t=3&r1=' + res_A + '&r2=' + res_B + '&r3=' + res_C + '&r4=' + res_D + '';
    var Target = xpath("//form/div[@class='buildActionOverview trainUnits']/div[" + num + "]").snapshotItem(0);
    var Div = Child("div");
    var Span = Child("span");
    var Link = Child("a");
    Link.setAttribute("href", href);
    Link.appendChild(txt(" NPC"));
    Span.innerHTML = '(<img src="img/x.gif" class="' + IMG + '" />&nbsp;+' + Resource + '):';
    Div.setAttribute("style", "direction: ltr;")
    Div.appendChild(Span);
    Div.appendChild(Link);
    Target.appendChild(Div);
};

if (ID("contract") && CL("unit ")[0].className.split("u")[1]) {
    for (i = 0; i < xpath("//div[@class='buildActionOverview trainUnits']/div").snapshotLength; i++) {
        DoNPC((i + 1));
    }
};