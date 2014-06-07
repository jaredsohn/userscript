// ==UserScript==
// @name           BattleRoyaleKeyCut
// @namespace      ZxMYS
// @include        */game.php
// @author Zx.MYS
// @Homepage http://ZxMYS.COM       
// ==/UserScript==




function $(id){
	return document.getElementById(id);
}

function sl(id){
	$(id).checked=true;
}

km="QWERTYUIOPASDFGHJKLZXCVBNM";
kmap = new Array(km.length*2) ;
for(i=0;i<km.length;i++){
	kmap[i]=km[i];
	kmap[i+26]="Alt+"+km[i];
}
moveto=document.getElementsByTagName('option');
for(i=0,j=0;i<moveto.length&&j<kmap.length;i++){
	if(moveto[i].innerHTML.indexOf("全员")!=-1)break;
	if(moveto[i].parentNode.id=="attmode"||moveto[i].innerHTML.indexOf("■")!=-1)continue;
	shortcut(kmap[j],function(e){
		$("key_"+(e.altKey?"Alt+":"")+String.fromCharCode(e.keyCode)).selected=true;
		eval($("key_"+(e.altKey?"Alt+":"")+String.fromCharCode(e.keyCode)).parentNode.parentNode.getAttribute('onclick'));
		$("submit").click();
	});
	j++;
}

shortcut("Alt+1",function(e){
$("cmd2").innerHTML="攻击？<br/><br/>向对手大喊：<br/><input type=\"text\" maxlength=\"60\" name=\"message\" size=\"30\"/><br/><br/><input type=\"hidden\" value=\"combat\" name=\"mode\"/>wid:<input type=\"text\" value=\""+document.getElementById('lastwid').innerHTML+"\" name=\"wid\"/><br/><input type=\"radio\" checked=\"\" value=\""+document.getElementsByName('attmode')[0].value+"\" id=\"_a\" name=\"command\"/><a href=\"javascript:void(0);\" onclick='sl(\"_a\");'>攻击</a><br/><input type=\"radio\" value=\"back\" id=\"back\" name=\"command\"/><a href=\"javascript:void(0);\" onclick='sl(\"back\");'>逃跑</a><br/><br/><br/><input type=\"button\" value=\"提交\"  onclick=\"var oXmlHttp = zXmlHttp.createRequest(); var sBody = getRequestBody(document.forms[\'cmd2\']); oXmlHttp.open(\'post\', \'command.php\', true); oXmlHttp.setRequestHeader(\'Content-Type\', \'application/x-www-form-urlencoded\'); oXmlHttp.onreadystatechange = function () { if (oXmlHttp.readyState == 4) { if (oXmlHttp.status == 200) { 	showGamedata(oXmlHttp.responseText); } else { showNotice(oXmlHttp.statusText); }}}; oXmlHttp.send(sBody); return false;\" id=\"submit\"/>";
});

shortcut("Alt+2",function(e){
$("cmd2").innerHTML="想要拾取什么？<br><br><input type=\"hidden\" name=\"mode\" value=\"corpse\">wid:<input type=\"text\" name=\"wid\" value=\""+document.getElementById('lastwid').innerHTML+"\"><br/><input type=\"radio\" name=\"command\" id=\"menu\" value=\"menu\" checked><a onclick=sl('menu'); href=\"javascript:void(0);\" >返回</a><br><br><input type=\"radio\" name=\"command\" id=\"wep\" value=\"wep\"><a onclick=sl('wep'); href=\"javascript:void(0);\" >武器</a><br><input type=\"radio\" name=\"command\" id=\"arb\" value=\"arb\"><a onclick=sl('arb'); href=\"javascript:void(0);\" >防具1</a><br><input type=\"radio\" name=\"command\" id=\"arh\" value=\"arh\"><a onclick=sl('arh'); href=\"javascript:void(0);\" >防具2</a><br><input type=\"radio\" name=\"command\" id=\"ara\" value=\"ara\"><a onclick=sl('ara'); href=\"javascript:void(0);\" >防具3</a><br><input type=\"radio\" name=\"command\" id=\"arf\" value=\"arf\"><a onclick=sl('arf'); href=\"javascript:void(0);\" >防具4</a><br><input type=\"radio\" name=\"command\" id=\"art\" value=\"art\"><a onclick=sl('art'); href=\"javascript:void(0);\" >防具5</a><br><input type=\"radio\" name=\"command\" id=\"itm0\" value=\"itm0\"><a onclick=sl('itm0'); href=\"javascript:void(0);\" >道具0</a><br><input type=\"radio\" name=\"command\" id=\"itm1\" value=\"itm1\"><a onclick=sl('itm1'); href=\"javascript:void(0);\" >道具1</a><br><input type=\"radio\" name=\"command\" id=\"itm2\" value=\"itm2\"><a onclick=sl('itm2'); href=\"javascript:void(0);\" >道具2</a><br><input type=\"radio\" name=\"command\" id=\"itm3\" value=\"itm3\"><a onclick=sl('itm3'); href=\"javascript:void(0);\" >道具3</a><br><input type=\"radio\" name=\"command\" id=\"itm4\" value=\"itm4\"><a onclick=sl('itm4'); href=\"javascript:void(0);\" >道具4</a><br><input type=\"radio\" name=\"command\" id=\"itm5\" value=\"itm5\"><a onclick=sl('itm5'); href=\"javascript:void(0);\" >道具5</a><br><input type=\"radio\" name=\"command\" id=\"money\" value=\"money\"><a onclick=sl('money'); href=\"javascript:void(0);\" >钱</a><br><br/><input type=\"button\" value=\"提交\"   onclick=\"var oXmlHttp = zXmlHttp.createRequest(); var sBody = getRequestBody(document.forms[\'cmd2\']); oXmlHttp.open(\'post\', \'command.php\', true); oXmlHttp.setRequestHeader(\'Content-Type\', \'application/x-www-form-urlencoded\'); oXmlHttp.onreadystatechange = function () { if (oXmlHttp.readyState == 4) { if (oXmlHttp.status == 200) { 	showGamedata(oXmlHttp.responseText); } else { showNotice(oXmlHttp.statusText); }}}; oXmlHttp.send(sBody); return false;\" id=\"submit\"/>";
});

shortcut("Alt+3",function(e){
$("cmd2").innerHTML="送东西<br/><input type=\"radio\" name=\"command\" id=\"menu\" value=\"menu\" checked><a onclick=sl('menu'); href=\"javascript:void(0);\" >返回</a><br>wid：<input type=\"text\" name=\"wid\" value=\""+document.getElementById('lastwid').innerHTML+"\"><br/>留言：<br><input size=\"30\" type=\"text\" name=\"message\" maxlength=\"60\" value=\"\"><br><br>想要转让第几个道具？：<br/><input type=\"text\" onchange=\"$('itmtosend').value='itm'+this.value;\"><input type=\"hidden\" name=\"mode\" value=\"senditem\"><br><input type=\"radio\" name=\"command\" id=\"itmtosend\" value=\"itm4\" checked><input type=\"button\" value=\"提交\"   onclick=\"var oXmlHttp = zXmlHttp.createRequest(); var sBody = getRequestBody(document.forms[\'cmd2\']); oXmlHttp.open(\'post\', \'command.php\', true); oXmlHttp.setRequestHeader(\'Content-Type\', \'application/x-www-form-urlencoded\'); oXmlHttp.onreadystatechange = function () { if (oXmlHttp.readyState == 4) { if (oXmlHttp.status == 200) { 	showGamedata(oXmlHttp.responseText); } else { showNotice(oXmlHttp.statusText); }}}; oXmlHttp.send(sBody); return false;\" id=\"submit\"/>";
});

shortcut("Alt+4",function(e){
$("cmd2").innerHTML="连击100次?<br/><br/>向对手大喊：<br/><input type=\"text\" maxlength=\"60\" name=\"message\" size=\"30\"/><br/><br/><input type=\"hidden\" value=\"combat\" name=\"mode\"/>wid:<input type=\"text\" value=\""+document.getElementById('lastwid').innerHTML+"\" name=\"wid\"/><br/><input type=\"radio\" checked=\"\" value=\""+document.getElementsByName('attmode')[0].value+"\" id=\"_a\" name=\"command\"/><a href=\"javascript:void(0);\" onclick='sl(\"_a\");'>攻击</a><br/><input type=\"radio\" value=\"back\" id=\"back\" name=\"command\"/><a href=\"javascript:void(0);\" onclick='sl(\"back\");'>逃跑</a><br/><br/><br/><input type=\"button\" value=\"提交\" onclick=\"for(var i=0;i<100;i++){var oXmlHttp = zXmlHttp.createRequest(); var sBody = getRequestBody(document.forms[\'cmd2\']); oXmlHttp.open(\'post\', \'command.php\', true); oXmlHttp.setRequestHeader(\'Content-Type\', \'application/x-www-form-urlencoded\'); oXmlHttp.onreadystatechange = function () { if (oXmlHttp.readyState == 4) { if (oXmlHttp.status == 200) { 	showGamedata(oXmlHttp.responseText); } else { showNotice(oXmlHttp.statusText); }}}; oXmlHttp.send(sBody);} return false;\" id=\"submit\"/>";
});

shortcut("Alt+5",function(e){
$("cmd2").innerHTML="抢商店？<br/><input type=\"hidden\" name=\"mode\" value=\"shop\"><br/>道具类型：<br/><select id=\"shoptype\" name=\"shoptype\"><option value=\"1\">回复道具</option><option value=\"2\">武器【斩】</option><option value=\"3\">武器【投】</option><option value=\"4\">武器【爆】</option><option value=\"5\">武器【殴】</option><option value=\"6\">武器【枪】</option><option value=\"7\">防具</option><option value=\"8\" selected=\"selected\">特殊道具</option></select><br/>道具编号（自行查找，谢谢合作）：<br/><input type=\"text\" value=\"13\" name=\"command\"/><br/>数量：<br/><input type=\"text\" size=\"5\" name=\"buynum\" value=\"20\"><br/><br/><input type=\"button\" value=\"提交\"  onclick=\"var oXmlHttp = zXmlHttp.createRequest(); var sBody = getRequestBody(document.forms[\'cmd2\']); oXmlHttp.open(\'post\', \'command.php\', true); oXmlHttp.setRequestHeader(\'Content-Type\', \'application/x-www-form-urlencoded\'); oXmlHttp.onreadystatechange = function () { if (oXmlHttp.readyState == 4) { if (oXmlHttp.status == 200) { 	showGamedata(oXmlHttp.responseText); } else { showNotice(oXmlHttp.statusText); }}}; oXmlHttp.send(sBody); return false;\" id=\"submit\"/>";
});

shortcut("Ctrl+1",function(e){
	$("lastform").innerHTML=$("cmd").innerHTML;
});

shortcut("Ctrl+2",function(e){
	$("cmd").innerHTML=$("lastform").innerHTML;
});

shortcut("space",function(e){
	$("submit").click();
});

/*for(i=1;i<=5;i++){
	shortcut("Ctrl"+i,function(e){
		$("itm"+String.fromCharCode(e.keyCode)).click();
		$("submit").click();
	});
}*/

for(i=0;i<=9;i++){
	shortcut(i+"",function(e){
		if(e.altKey||e.ctrlKey)return;
		document.getElementsByName("command")[(parseInt(String.fromCharCode(e.keyCode))-1)%10].checked=true;
		$("submit").click();
	});
}

s=document.createElement("span");
s.style.display="none";
s.id="lastattmode";
s.innerHTML='modeP';
document.getElementsByTagName("body")[0].appendChild(s);
s=document.createElement("span");
s.style.display="none";
s.id="lastwid";
document.getElementsByTagName("body")[0].appendChild(s);
s=document.createElement("div");
s.style.display="none";
s.id="lastform";
document.getElementsByTagName("body")[0].appendChild(s);
$("cmd").parentNode.innerHTML+="<br/><hr/><form style=\"margin: 0px;\" name=\"cmd\" id=\"cmd2\" method=\"post\"></form>";
s=document.createElement("div");
s.id="_notice";
$("notice").parentNode.insertBefore(s,$("notice"));
s=document.createElement("script");
s.setAttribute("language","javascript");
s.text="var km='"+km+"';var help='Zx.MYS的GreaseMonkey脚本快捷键：Space:提交 Alt+1:攻击 Alt+2:扒尸  Alt+3:赠送 Alt+4:连击 Alt+5:抢劫商店 Ctrl+1:记录表单 Ctrl+2:读取表单 1/2/3/4/5/6/7/8/9/0:执行一般命令 设置攻击类型:<select id=\"attmode\" name=\"attmode\" onclick=\"modechange();\"><option id=\"modeC\" value=\"C\">投</option><option id=\"modeD\" value=\"D\" >暴</option><option id=\"modeP\" value=\"P\">殴</option><option id=\"modeK\" value=\"K\">斩</option><option id=\"modeG\" value=\"G\">射</option><option value=\"N\" id=\"modeN\">空手殴</option></select><span id=\\'keymap\\'></span>'; function insertAfter(newElement,targetElement) {  var parent = targetElement.parentNode;  if(parent.lastChild == targetElement) {    parent.appendChild(newElement);  }else{    parent.insertBefore(newElement,targetElement.nextSibling);  }} function init(){if(document.getElementsByName('wid')[0]!=null&&document.getElementsByName('wid')[0].parentNode.id!='cmd2'){document.getElementsByName('wid')[0].type='text';document.getElementById('lastwid').innerHTML=document.getElementsByName('wid')[0].value;}if(document.getElementsByName('command')[0].value.length==1)document.getElementsByName('command')[0].value=document.getElementsByName('attmode')[0].value;$('submit').disabled=false;$('_notice').innerHTML=help;var commands=document.getElementsByName('command');for(var i=0;i<Math.min(commands.length,10);i++){if(commands[i].parentNode.id==\"cmd2\")continue; var s=document.createElement('span');s.innerHTML='['+(i+1==10?0:i+1)+'] ';insertAfter(s,commands[i]);}var moveto=document.getElementsByTagName('option');var kmap = new Array(km.length*2);for(i=0;i<km.length;i++){kmap[i]=km[i];kmap[i+26]='Alt+'+km[i];}for(var i=0,j=0;i<moveto.length&&j<kmap.length;i++){if(moveto[i].innerHTML.indexOf('全员')!=-1)break;if(moveto[i].parentNode.id==\"attmode\"||moveto[i].parentNode.parentNode.id==\"cmd2\")continue;if(moveto[i].innerHTML.indexOf('■')!=-1){$('keymap').innerHTML+='<br/>';$('keymap').innerHTML+=moveto[i].innerHTML+' ';continue;}$('keymap').innerHTML+=kmap[j]+':'+moveto[i].innerHTML+' ';moveto[i].id='key_'+kmap[j];moveto[i].innerHTML='['+kmap[j]+'] '+moveto[i].innerHTML;j++}$($('lastattmode').innerHTML).selected=true;} function showGamedata(sGamedata){gamedata = sGamedata.parseJSON();if(gamedata['url']) {window.location.href = gamedata['url'];} else if(!gamedata['main']) {window.location.href = 'index.php';}if(gamedata['team']) {$('team').value = gamedata['team'];gamedata['team'] = '';}for(var id in gamedata) {if((id == 'toJSONString')||(!gamedata[id])) {continue;}$(id).innerHTML = gamedata[id];}init();} function modechange(){var commands=document.getElementsByName('command');for(var i=0;i<commands.length;i++){if(commands[i].value.length==1)commands[i].value=document.getElementsByName('attmode')[0].value;} $('lastattmode').innerHTML='mode'+document.getElementsByName('attmode')[0].value;} init(); ";
document.getElementsByTagName("body")[0].appendChild(s);

/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 1.00.A
 * By Binny V A
 * License : BSD
 */
function shortcut(shortcut,callback,opt) {
//Provide a set of default options
var default_options = {
'type':'keydown',
'propagate':false,
'target':document
}
if(!opt) opt = default_options;
else {
for(var dfo in default_options) {
if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
}
}

var ele = opt.target
if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
var ths = this;

//The function to be called at keypress
var func = function(e) {
e = e || window.event;
//Don't enable shortcut keys in Input, Textarea fields
var element;
if(e.target) element=e.target;
else if(e.srcElement) element=e.srcElement;
if(element.nodeType==3) element=element.parentNode;

if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
//Find Which key is pressed
if (e.keyCode) code = e.keyCode;
else if (e.which) code = e.which;
var character = String.fromCharCode(code).toLowerCase();

var keys = shortcut.toLowerCase().split("+");
//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
var kp = 0;

//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
var shift_nums = {
"`":"~",
"1":"!",
"2":"@",
"3":"#",
"4":"$",
"5":"%",
"6":"^",
"7":"&",
"8":"*",
"9":"(",
"0":")",
"-":"_",
"=":"+",
";":":",
"'":"\"",
",":"<",
".":">",
"/":"?",
"\\":"|"
}
//Special Keys - and their codes
var special_keys = {
'esc':27,
'escape':27,
'tab':9,
'space':32,
'return':13,
'enter':13,
'backspace':8,

'scrolllock':145,
'scroll_lock':145,
'scroll':145,
'capslock':20,
'caps_lock':20,
'caps':20,
'numlock':144,
'num_lock':144,
'num':144,

'pause':19,
'break':19,

'insert':45,
'home':36,
'delete':46,
'end':35,

'pageup':33,
'page_up':33,
'pu':33,

'pagedown':34,
'page_down':34,
'pd':34,

'left':37,
'up':38,
'right':39,
'down':40,

'f1':112,
'f2':113,
'f3':114,
'f4':115,
'f5':116,
'f6':117,
'f7':118,
'f8':119,
'f9':120,
'f10':121,
'f11':122,
'f12':123
}


for(var i=0; k=keys[i],i<keys.length; i++) {
//Modifiers
if(k == 'ctrl' || k == 'control') {
if(e.ctrlKey) kp++;

} else if(k ==  'shift') {
if(e.shiftKey) kp++;

} else if(k == 'alt') {
if(e.altKey) kp++;

} else if(k.length > 1) { //If it is a special key
if(special_keys[k] == code) kp++;

} else { //The special keys did not match
if(character == k) kp++;
else {
if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
character = shift_nums[character]; 
if(character == k) kp++;
}
}
}
}

if(kp == keys.length) {
callback(e);

if(!opt['propagate']) { //Stop the event
//e.cancelBubble is supported by IE - this will kill the bubbling process.
e.cancelBubble = true;
e.returnValue = false;

//e.stopPropagation works only in Firefox.
if (e.stopPropagation) {
e.stopPropagation();
e.preventDefault();
}
return false;
}
}
}

//Attach the function with the event
if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
else ele['on'+opt['type']] = func;
}