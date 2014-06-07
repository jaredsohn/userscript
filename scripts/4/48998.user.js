scr_meta=<><![CDATA[
// ==UserScript==
// @name           JavaScript Expression Tester
// @namespace      http://userscripts.org/users/23652
// @description    Adds a box to the page where you can test JavaScript expressions in realtime
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==
]]></>.toString();

// Get ID
function $(ID) {return document.getElementById(ID);}

function dragStart(e, id) {
e.preventDefault();
scrollY = window.scrollY;
scrollX = window.scrollX;
dragObj.elNode = $(id) || e.target;
if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
dragObj.cursorStartX = e.clientX + window.scrollX;
dragObj.cursorStartY = e.clientY + window.scrollY;
dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
dragObj.elNode.style.zIndex = ++dragObj.zIndex;
maxY = window.innerHeight-dragObj.elNode.offsetHeight;
maxX = window.innerWidth-dragObj.elNode.offsetWidth;
document.addEventListener("mousemove", dragGo,   true);
document.addEventListener("mouseup",   dragStop, true);
}

function dragGo(e) {
var newY = ((dragObj.elStartTop+e.clientY)+scrollY)-dragObj.cursorStartY,
	newX = ((dragObj.elStartLeft+e.clientX)+scrollX)-dragObj.cursorStartX;
if(newY>-1 && newY<maxY) dragObj.elNode.style.top = newY+'px';
if(newX>-1 && newX<maxX) dragObj.elNode.style.left = newX+'px';
}

function dragStop(e) {
document.removeEventListener("mousemove", dragGo,   true);
document.removeEventListener("mouseup",   dragStop, true);
}

// alignCenter by JoeSimmons
// Instructions: Supply an id string or node element as a first argument
function alignCenter(e) {
var node = (typeof e=='string') ? $(e) : ((typeof e=='object') ? e : false);
if(!window || !node) {return;}
var beforeDisplay = node.style.display;
node.style.display = '';
node.style.top = ((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
node.style.left = ((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
node.style.display = beforeDisplay;
node.style.opacity = '1';
}

moveSrc = 'data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///yH5BAEAABAALAAAAAAUABQAAAhQAP8JHEgQBcGDCAeiWJiw4b+FEB0ehEhRIkKDFhNitLhRYMeHFz+K7Bix4ESGDymqXFmypMKTJEWevDixZsaPGT3mVLhyp8qdHlECBTk0Y0AAOw==';

var dragObj = new Object(), x, y, scrollY, scrollX, maxY, maxX;
dragObj.zIndex = 0;
var box = document.createElement('div'),
	field = document.createElement('input'),
	but = document.createElement('button'),
	res = document.createElement('div'),
	move = document.createElement('img'),
	close = document.createElement('a');
	move.src = moveSrc;
	move.setAttribute('style', 'margin-left:4px;margin-top:4px;');
	move.id = 'drag_command_expr_div';
	move.addEventListener('mousedown', function(e){dragStart(e, 'command_expr_div')}, false);
	/////////
	box.id = 'command_expr_div';
	box.setAttribute('style', 'position:fixed; top:0; left:0; border:1px solid #000; color:#000; background:#fff; padding:30px; z-index:99; text-align:center;');
	/////////
	field.size = 50;
	field.id = 'command_expr';
	res.id = 'command_expr_result';
	res.setAttribute('style', 'border:1px solid #000; padding:4px;');
	close.textContent = 'Close';
	close.href = 'javascript:void(0);';
	close.addEventListener('click', function(){
	var div = $('command_expr_div');
	if(div) div.parentNode.removeChild(div);
	}, false);
	/////////
	but.innerHTML = 'Evaluate Expression';
	but.addEventListener('click', function(){
	try {
	$('command_expr_result').innerHTML = 'Expression Result: <b>'+eval($('command_expr').value)+'</b>.';
	} catch(e) {alert('Error: '+e);}
	}, false);
////////////////////
box.appendChild(move);
box.appendChild(document.createElement('br'));
box.appendChild(document.createTextNode('Enter a JavaScript expression: '));
box.appendChild(field);
box.appendChild(but);
box.appendChild(document.createElement('br'));
box.appendChild(document.createElement('br'));
box.appendChild(res);
box.appendChild(document.createElement('br'));
box.appendChild(close);
document.body.appendChild(box);

alignCenter('command_expr_div');
window.addEventListener('resize', function(){alignCenter('command_expr_div');}, false);

// Auto-Update by sizzlemctwizzle
aaus_38017={
i:'48998', // Script id on Userscripts.org
d:1, // Days to wait between update checks
n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_38017.ch();