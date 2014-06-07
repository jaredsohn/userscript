// ==UserScript==
// @name           HC_FootLine
// @namespace      HC_footline
// @include        http://bbs.hoopchina.com/*
// ==/UserScript==

ftext="\n\n________________________________________________________________\n"

var vNum

var pic=new Array();
pic[0]="http://i1.hoopchina.com/user/043/2956043/12324545340.jpg"
pic[1]="http://i1.hoopchina.com/user/043/2956043/12324545341.jpg"
pic[2]="http://i1.hoopchina.com/user/043/2956043/12327240581.jpg"
pic[3]="http://i1.hoopchina.com/user/043/2956043/12327240582.jpg"
pic[4]="http://i1.hoopchina.com/user/043/2956043/12327240580.jpg"
pic[5]="http://i1.hoopchina.com/user/043/2956043/2956043_small_5.jpg"
vNum = Math.random()
vNum = Math.round(vNum*5)+0


//ftext=ftext+"[img]"+pic[vNum]+"[/img]  "
ftext = ftext + "[flash=100,30]http://www.8box.cn/feed/000000_s_408755_/mini.swf[/flash]"

var footline=new Array();
footline[0]="不管当前有多少艰难险阻，火箭队本赛季夺冠的目标不能动摇。"
footline[1]="Alston limps off the court, foaming at the mouth Jazz fans applaud the injury."
footline[2]="我只能随意捡起地上的一块小石"+
"\n摸一摸"+
"\n猜测是否曾染有师太的气息"
footline[3]="凡是Pear作出的论断，我们都坚决维护；凡是Pear的指示，我们都始终不渝地遵循。"
footline[4]="对于Pear同志的发言，理解的要加油助威，不理解的也要加油助威。暂时不理解的在加油助威中加深理解。"
footline[5]="Pear是来自冰王国的女王\n她挥扬着快意的皮鞭\n轻轻抽打在麦密们最敏感的地方"
footline[6]="不管当前有多少艰难险阻，火箭队本赛季夺冠的目标不能动摇。"
footline[7]="只欣赏pear的畅快、真挚和可爱\n人生在世，唯有真性情！"
footline[8]="在pear的伟大领导下，横扫一切傻逼的和装逼的"
footline[9]="pear是师太映在水中的动人的身影\n师太是pear下凡之前天边璀璨的星"
footline[10]="每次看pear的帖子\n自己虽然常常想了许久也插不上话\n但是总有种温暖默然的幸福感"
footline[11]="你也许能转身离开\n也不带走一片云彩\n只是那片天空\n却不容易忘怀"

vNum = Math.random()
vNum = Math.round(vNum*11)+0
vNum = 11

ftext = ftext+ footline[vNum]




var allTextareas, thisTextarea;
allTextareas = document.getElementsByTagName('textarea');
for (var i = 0; i < allTextareas.length; i++) {
	thisTextarea = allTextareas[i];
	// do something with thisTextarea
	if(thisTextarea.name=="atc_content"){
		thisTextarea.textContent=thisTextarea.textContent+ftext+"\n\n";
	} 
}