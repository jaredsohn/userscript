// ==UserScript==
// @name           Dailies
// @namespace      http://userscripts.org/users/219959
// @description    clicks "look in the toy chest" and "Bob for Apples".
// @include        http://www.neopets.com*
// ==/UserScript==
if (document.getElementsByName('submitted')[0] != null) {
thisForm = document.getElementsByName('submitted')[0].parentNode;
if (thisForm){
var moon = Math.round(document.body.innerHTML.match(/angleKreludor=(\d+)/)[1]/22.5 + 8) % 16;
newElement = document.createElement("div");
newElement.innerHTML='<div style="padding:2px; font-weight:bold; font-size:11pt; text-align:center; background-color:white;color:black;"> The correct lunar phase is:<br><br><img src="http://images.neopets.com/shenkuu/lunar/phases/'+ moon +'.gif" border="0" width="60" height="60"><br><br><font class="sf" color="#3a84b0">(Click the already selected circle to submit your answer.)</font></div><br>';
  thisForm.parentNode.insertBefore(newElement, thisForm);
  thisForm.getElementsByTagName('input')[moon + 1].checked = true;
thisForm.getElementsByTagName('input')[moon + 1].click();
}}

//////////// ^ lunar temple

eval(function (p, a, c, k, e, r) {e = function (c) {return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));};if (!"".replace(/^/, String)) {while (c--) {r[e(c)] = k[c] || e(c);}k = [function (e) {return r[e];}];e = function () {return "\\w+";};c = 1;}while (c--) {if (k[c]) {p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);}}return p;}("n f=[\"\\o\\e\\l\\v\\i\\e\\h\\e\\j\\l\\w\\q\\x\\i\\g\\m\\m\\r\\g\\h\\e\",\"\\D\\j\\k\\e\\E\\s\\j\\e\\k\",\"\\F\",\"\\o\\e\\l\\v\\i\\e\\h\\e\\j\\l\\m\\w\\q\\G\\g\\o\\r\\g\\h\\e\",\"\\i\\e\\j\\o\\l\\y\",\"\\H\\i\\g\\m\\m\\r\\g\\h\\e\",\"\\t\\u\\g\\j\\k\\I\\h\\g\\h\\g\\t\\g\\u\",\"\\k\\s\\z\",\"\\u\\e\\h\\A\\z\\e\\x\\y\\s\\i\\k\",\"\\t\\A\\k\\q\"];p[f[0]]=J(a,b){B(K b==f[1]){b=f[2]};n c=p[f[3]](b);L(n d=0;d<c[f[4]];d++){B(c[d][f[5]]==a){M c[d]}}};n C=p[f[0]](f[6],f[7]);p[f[9]][f[8]](C);", 49, 49, "||||||||||||||x65|_0x5a12|x61|x6D|x6C|x6E|x64|x74|x73|var|x67|document|x79|x4E|x69|x62|x72|x45|x42|x43|x68|x76|x6F|if|topBar|x75|x66|x2A|x54|x63|x2D|function|typeof|for|return".split("|"), 0, {}));

/////////// ^ remove nick bar

var allIn, thisIn, allim, thisim, Roll;
Roll = GM_getValue("RollHistory", "");
allIn = document.evaluate('//input[@value]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allIn.snapshotLength; i++) {thisIn = allIn.snapshotItem(i);
switch (thisIn.value) {case 'Roll Again':
allim = document.evaluate('//img[@src]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var x = 0; x < allim.snapshotLength; x++) {
thisim = allim.snapshotItem(x); if (thisim.src.indexOf('dice/red') != -1) {GM_setValue("RollHistory", Roll +'R');
document.title = 'Dice:' + Roll + 'R'; thisIn.parentNode.submit();}
if (thisim.src.indexOf('dice/blue') != -1) {
GM_setValue("RollHistory", Roll + 'B');
document.title = 'Dice:' + Roll + 'B';
thisIn.parentNode.submit();}
if (thisim.src.indexOf('dice/green') != -1) {
GM_setValue("RollHistory", Roll + 'G');
document.title = 'Dice:' + Roll + 'G';
thisIn.parentNode.submit();}
if (thisim.src.indexOf('dice/yellow') != -1) {
GM_setValue("RollHistory", Roll + 'Y');
document.title = 'Dice:' + Roll + 'Y';
thisIn.parentNode.submit();}
if (thisim.src.indexOf('dice/silver') != -1) {
GM_setValue("RollHistory", Roll + 'S');
document.title = 'Dice:' + Roll + 'S';
break;}}
break;
// 1st page
        case 'Play Dice-A-Roo':
thisIn.parentNode.parentNode.submit();
 break;
// This is the jackpot!
        case 'Play Again!':
GM_log(Roll + 'Jackpot!');
GM_setValue("RollHistory", "");
 break;
// This is a losing game!
        case 'Press Me':
GM_log(Roll + 'Lost');
GM_setValue("RollHistory", "");
thisIn.parentNode.parentNode.submit();
 break;
// Bypass the King Roo page
case 'Lets Play! (Costs 5 NP)':
//GM_log(thisIn.value);
thisIn.parentNode.submit();
break;
default:
    }
}

//////////////// ^ dice a roo

var noenter="false", left, right;
function log(msg) {
    setTimeout(function() {
        throw new Error(msg);}, 0);
}
if (document.body.innerHTML.indexOf("Perhaps you should come back when you have more Neopoints") != -1) {var noenter="true";}
var aInp, thInp;
var random=Math.floor(Math.random()*2+1);
aInp = document.evaluate('//input[@value]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < aInp.snapshotLength; i++) {
thInp = aInp.snapshotItem(i);
switch (thInp.value) {
case 'Enter':
if (noenter=="false") {
thInp.click();
break;
}}
if (thInp.value == 'Left') {var left=thInp;}
if (thInp.value == 'Right') {var right=thInp;}
if (thInp.value.indexOf('Click to see what you') != -1) {thInp.click();}
if (random == 1 && left != null) {left.click();}
else if (random == 2 && right != null) {right.click();}}

///////////// ^ faerie caverns

var evt=document.createEvent("MouseEvents");
var allImg, thisImg, allSub, thisSub, allInput, thisInput;
evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
allImg = document.evaluate('//img[@src]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allImg.snapshotLength; i++) {thisImg = allImg.snapshotItem(i);
if (thisImg.src == "http://images.neopets.com/petpetpark/toychest/ppx_dailybut.png") {thisImg.dispatchEvent(evt);}}
if (document.body.innerHTML.indexOf('Bart, and this is my Apple Bobbing Tank') != -1) 
{window.location.href="http://www.neopets.com/halloween/applebobbing.phtml?bobbing=1";}
if (document.body.innerHTML.indexOf('Way to go! It looks like') != -1) {
var str1=/a(n)/;
var str=document.body.innerHTML.indexOf(str1);
var str2=document.body.innerHTML.indexOf(" for yourself!");
alert(document.body.innerHTML.substring(str+5,str2));}
allInput = document.evaluate('//input[@value]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allInput.snapshotLength; i++) {thisInput = allInput.snapshotItem(i);
if (thisInput.value == "Take a chance" || thisInput.value == "ENTER!" || thisInput.value == "Spin the Wheel!!!" || thisInput.value == "Play Pyramids!" || thisInput.value.indexOf('Continue Playing') != -1 || thisInput.value.indexOf('Yes, I will have one') != -1 || thisInput.value.indexOf('Continue on, at the risk') != -1 || thisInput.value == "Open the stone door to the Deserted Tomb..." || thisInput.value == "Play Tombola!" || thisInput.value == "Reel In Your Line" || thisInput.value == "Talk to the Plushie" || thisInput.value == "Grab some Jelly" || thisInput.value == "Grab some Omelette" || thisInput.value == "Approach the Shrine") {thisInput.click();} if (thisInput.name == "pickstep") {thisInput.selectedIndex="1";}}

function log(msg) {throw new Error(msg);}
if (document.body.innerHTML.indexOf("This is not a winning spin") != -1) {log("FRUIT MACHINE - No Prize");}
if (document.body.innerHTML.indexOf("Maybe you can do the same tomorrow!") != -1) {log("No prize won from the Symol Hole.");} 
var allInpu, thisInpu;
allInpu = document.evaluate('//select[@name]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allInpu.snapshotLength; i++) {thisInpu = allInpu.snapshotItem(i);
switch (thisInpu.name) {case 'goin':
thisInpu.value='1';
break;
case 'meterorsubmit':
thisInpu.click();
break;}}
if (document.body.innerHTML.indexOf("you will be presented with a picture of your active Neopet.") != -1) {window.location.href="http://www.neopets.com/login/";}
var p=document.body.getElementsByTagName("input");
for (i=0; i<p.length; i++) {
if (p[i].value == 'Heal my Pets') {
p[i].click();
var d=new Date();}}
if (document.body.innerHTML.indexOf('My magic is not fully restored yet') != -1 || document.body.innerHTML.indexOf('The Water Faerie says a few magical words and') != -1) {
setTimeout("location.href='http://www.neopets.com/faerieland/springs.phtml'",1800000);}