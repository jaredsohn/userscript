// Based on the original smilies by bibi1004 (http://www.bibi1004.com/)
// Modified by miss.mika (http://chrispy-cookies.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Bibi
// @namespace      http://www.bibi1004.com/
// @description    You can use emoticons in Blogger. by chrispy-cookies.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	

buttons += emoticonButton(".D.", "http://img24.imageshack.us/img24/1252/girl28.gif");
buttons += emoticonButton(">j<", "http://img651.imageshack.us/img651/8972/girl27.gif");
buttons += emoticonButton("*3*", "http://img532.imageshack.us/img532/1695/girl26.jpg");
buttons += emoticonButton("$_$", "http://img694.imageshack.us/img694/8028/girl25.jpg");
buttons += emoticonButton("O_O", "http://img688.imageshack.us/img688/2531/girl24.jpg");
buttons += emoticonButton("oDo", "http://img199.imageshack.us/img199/791/girl23u.jpg");
buttons += emoticonButton("u_u", "http://img83.imageshack.us/img83/4205/girl21.jpg");
buttons += emoticonButton(">m<", "http://img705.imageshack.us/img705/4314/girl22f.jpg");
buttons += emoticonButton(":drool:", "http://img532.imageshack.us/img532/7104/girl20.jpg");
buttons += emoticonButton("|D", "http://img258.imageshack.us/img258/8451/girl19.jpg");
buttons += emoticonButton("@v@", "http://img40.imageshack.us/img40/4751/girl18s.jpg");
buttons += emoticonButton(":o", "http://img43.imageshack.us/img43/1216/girl17g.jpg");
buttons += emoticonButton("/cry", "http://img221.imageshack.us/img221/8873/girl16.jpg");
buttons += emoticonButton(";P", "http://img502.imageshack.us/img502/708/girl15.jpg");
buttons += emoticonButton(":P", "http://img91.imageshack.us/img91/885/girl14f.jpg");
buttons += emoticonButton(">(", "http://img3.imageshack.us/img3/1613/girl13e.jpg");
buttons += emoticonButton(">3<", "http://img121.imageshack.us/img121/3910/girl12.jpg");
buttons += emoticonButton("-3-", "http://img706.imageshack.us/img706/4010/girl11.jpg");
buttons += emoticonButton(":runnynose2:", "http://img52.imageshack.us/img52/6177/girl10.jpg");
buttons += emoticonButton(":)", "http://img686.imageshack.us/img686/2108/girl9m.jpg");
buttons += emoticonButton(":runnynose:", "http://img132.imageshack.us/img132/527/girl8.gif");
buttons += emoticonButton("LOLWUTFAEC", "http://img710.imageshack.us/img710/6642/girl7c.gif");
buttons += emoticonButton(":D", "http://img718.imageshack.us/img718/5056/girl6.jpg");
buttons += emoticonButton(":lovestruck:", "http://img203.imageshack.us/img203/9026/girl5c.jpg");
buttons += emoticonButton(">u<", "http://img651.imageshack.us/img651/6427/girl4h.jpg");
buttons += emoticonButton("D8<", "http://img714.imageshack.us/img714/6323/girl3j.jpg");
buttons += emoticonButton(":puke:", "http://img62.imageshack.us/img62/5523/girl2zo.jpg");
buttons += emoticonButton("^^", "http://img716.imageshack.us/img716/1480/girl1.jpg");
buttons += emoticonButton(":drops:", "http://img693.imageshack.us/img693/206/61412818.gif");
buttons += emoticonButton(":ghost:", "http://img227.imageshack.us/img227/2069/60718762.gif");
buttons += emoticonButton(":bee:", "http://img59.imageshack.us/img59/2647/27206356.gif");
buttons += emoticonButton(":mushroom:", "http://img301.imageshack.us/img301/8949/94816901.gif");
buttons += emoticonButton(":toilet:", "http://img535.imageshack.us/img535/8918/40477343.gif");
buttons += emoticonButton(":ladybug:", "http://img510.imageshack.us/img510/1373/89922543.gif");
buttons += emoticonButton(":cutlery:", "http://img694.imageshack.us/img694/5316/20415216.gif");
buttons += emoticonButton(":flower2:", "http://img340.imageshack.us/img340/2770/98500296.png");
buttons += emoticonButton(":snowflake:", "http://img715.imageshack.us/img715/1065/50066646.gif");
buttons += emoticonButton(":apple2:", "http://img168.imageshack.us/img168/3640/98240981.gif");
buttons += emoticonButton(":book:", "http://img233.imageshack.us/img233/7070/88342057.gif");
buttons += emoticonButton(":huff:", "http://img153.imageshack.us/img153/2831/37848844.gif");
buttons += emoticonButton(":oo:", "http://img101.imageshack.us/img101/5655/78501665.gif");
buttons += emoticonButton(":x:", "http://img148.imageshack.us/img148/2261/63876544.gif");
buttons += emoticonButton(":lightbulb:", "http://img402.imageshack.us/img402/732/15797421.gif");
buttons += emoticonButton("(y)", "http://img176.imageshack.us/img176/1603/30098783.gif");
buttons += emoticonButton(":sparkle:", "http://img707.imageshack.us/img707/3025/72387733.gif");
buttons += emoticonButton(":GRR:", "http://img718.imageshack.us/img718/1132/21054745.gif");
buttons += emoticonButton(":ducky:", "http://img59.imageshack.us/img59/6610/33646665.gif");
buttons += emoticonButton(":no:", "http://img693.imageshack.us/img693/8879/14127098.gif");
buttons += emoticonButton(":strawberry:", "http://img233.imageshack.us/img233/8233/43522148.gif");
buttons += emoticonButton(":coffee:", "http://img3.imageshack.us/img3/4007/92325924.gif");
buttons += emoticonButton(":bday:", "http://img716.imageshack.us/img716/5069/97470783.gif");
buttons += emoticonButton(":car:", "http://img687.imageshack.us/img687/2916/45026578.gif");
buttons += emoticonButton(":camera:", "http://img249.imageshack.us/img249/4520/40199712.gif");
buttons += emoticonButton(":poo:", "http://img100.imageshack.us/img100/1010/47427780.gif");
buttons += emoticonButton(":house:", "http://img153.imageshack.us/img153/3739/81562810.gif");
buttons += emoticonButton(":tree:", "http://img188.imageshack.us/img188/8647/47366844.gif");
buttons += emoticonButton(":plant:", "http://img405.imageshack.us/img405/5263/86873316.gif");
buttons += emoticonButton(":clover:", "http://img96.imageshack.us/img96/2905/54671253.gif");
buttons += emoticonButton(":flower:", "http://img694.imageshack.us/img694/8871/51720827.gif");
buttons += emoticonButton(":star:", "http://img139.imageshack.us/img139/1797/37705761.gif");
buttons += emoticonButton(":right:", "http://img696.imageshack.us/img696/157/18623031.gif");
buttons += emoticonButton(":cherry:", "http://img522.imageshack.us/img522/6985/035k.gif");
buttons += emoticonButton("<3", "http://img532.imageshack.us/img532/6817/19337257.gif");
buttons += emoticonButton(":lala:", "http://img442.imageshack.us/img442/9200/96390277.gif");
buttons += emoticonButton(":la:", "http://img248.imageshack.us/img248/623/80416458.gif");
buttons += emoticonButton(":teapot:", "http://img338.imageshack.us/img338/9259/038f.gif");
buttons += emoticonButton(":smiley:", "http://img352.imageshack.us/img352/5284/49200767.gif");
buttons += emoticonButton(":clock:", "http://img11.imageshack.us/img11/3248/92298805.gif");
buttons += emoticonButton(":cloud:", "http://img229.imageshack.us/img229/7927/12649029.gif");
buttons += emoticonButton(":rainbow:", "http://img19.imageshack.us/img19/1632/93852920.gif");
buttons += emoticonButton(":cloud2:", "http://img403.imageshack.us/img403/548/96783312.gif");
buttons += emoticonButton(":ribbon:", "http://img246.imageshack.us/img246/8776/96793184.gif");
buttons += emoticonButton(":cat:", "http://img249.imageshack.us/img249/2007/71247202.gif");
buttons += emoticonButton(":girl2:", "http://img176.imageshack.us/img176/3014/79148827.gif");
buttons += emoticonButton(":girl:", "http://img100.imageshack.us/img100/4314/54351384.gif");
buttons += emoticonButton(":boy2:", "http://img202.imageshack.us/img202/9364/60334825.gif");
buttons += emoticonButton(":boy:", "http://img204.imageshack.us/img204/3522/88770576.gif");
buttons += emoticonButton("/wave", "http://img696.imageshack.us/img696/6737/92899362.gif");
buttons += emoticonButton(":!:", "http://img407.imageshack.us/img407/515/36762211.gif");
buttons += emoticonButton(":?:", "http://img229.imageshack.us/img229/3141/13340658.gif");
buttons += emoticonButton(":mail:", "http://img98.imageshack.us/img98/1353/054q.gif");
buttons += emoticonButton(":plane:", "http://img687.imageshack.us/img687/5627/13420261.gif");
buttons += emoticonButton(":scribble:", "http://img11.imageshack.us/img11/4571/56243950.gif");
buttons += emoticonButton("=", "http://img220.imageshack.us/img220/9476/64125975.gif");
buttons += emoticonButton(":shirt:", "http://img716.imageshack.us/img716/7400/70620998.gif");
buttons += emoticonButton(":cake:", "http://img716.imageshack.us/img716/8450/52188568.gif");
buttons += emoticonButton(":shrub:", "http://img710.imageshack.us/img710/2880/45916331.gif");
buttons += emoticonButton(":cow:", "http://img217.imageshack.us/img217/3456/35522897.png");
buttons += emoticonButton(":butterfly:", "http://img87.imageshack.us/img87/3200/062n.gif");
buttons += emoticonButton("=P", "http://img90.imageshack.us/img90/1537/49554479.png");
buttons += emoticonButton(">3<", "http://img687.imageshack.us/img687/5930/44607478.png");
buttons += emoticonButton(":o:", "http://img683.imageshack.us/img683/4715/57414256.gif");
buttons += emoticonButton(":phone:", "http://img687.imageshack.us/img687/214/15488096.gif");
buttons += emoticonButton(":peach:", "http://img411.imageshack.us/img411/9736/74644267.gif");
buttons += emoticonButton(":pencil:", "http://img641.imageshack.us/img641/2520/84090753.gif");
buttons += emoticonButton(":apple:", "http://img340.imageshack.us/img340/728/28425782.gif");
buttons += emoticonButton(":crown:", "http://img532.imageshack.us/img532/9433/13814988.gif");
buttons += emoticonButton(":skull:", "http://img704.imageshack.us/img704/1853/89867801.gif");
buttons += emoticonButton(":left:", "http://img80.imageshack.us/img80/7127/72531707.gif");
buttons += emoticonButton(":umbrella:", "http://img248.imageshack.us/img248/9904/82150306.gif");
buttons += emoticonButton(":worm:", "http://img263.imageshack.us/img263/3020/31685953.gif");
buttons += emoticonButton(":dog:", "http://img294.imageshack.us/img294/7616/44984350.gif");
buttons += emoticonButton(":paw:", "http://img405.imageshack.us/img405/9594/93096960.gif");
buttons += emoticonButton(":doggy:", "http://img708.imageshack.us/img708/9145/68936622.gif");
buttons += emoticonButton(":HOT:", "http://img204.imageshack.us/img204/4088/87438437.gif");
buttons += emoticonButton(":hanastalk:", "http://img441.imageshack.us/img441/3887/18513956.gif");
buttons += emoticonButton(":train:", "http://img191.imageshack.us/img191/7201/24552072.gif");
buttons += emoticonButton(":xmastree:", "http://img502.imageshack.us/img502/176/88145674.gif");
buttons += emoticonButton(":santa:", "http://img535.imageshack.us/img535/7425/79924871.gif");
buttons += emoticonButton(":present:", "http://img407.imageshack.us/img407/4212/40230470.gif");
buttons += emoticonButton(":sock:", "http://img683.imageshack.us/img683/1363/80220827.gif");
buttons += emoticonButton(":dog:", "http://img339.imageshack.us/img339/2828/97234111.gif");
	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);