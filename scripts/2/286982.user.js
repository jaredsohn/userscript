// ==UserScript==
// @name           Gl1TCHr.COM Spam Bot
// @namespace      Kyle Butler
// @description    Spam across your message with Gl1TCHr.com
// @include        http://wwar.storm8.com/fight.php*
// ==/UserScript==
var numClick = GM_getValue('autoclicknum', 0);
var codes = ['6X9F7J',

]




function submitHandler()
{
	var nc = parseInt(document.getElementById("acdn").value);
	if (nc > 0)
		GM_setValue('autoclicknum', nc-1);
	if (index < codes.length - 1)
		if (f.getElementsByTagName('input')[0].value == codes[index])
			GM_setValue('index',index+1);
}
function include(arr,obj) {
	return (arr.indexOf(obj) != -1);
}

// auto-click mechanism
var wwash = document.getElementsByClassName('fightSectionHeader')[0];
wwash.innerHTML += '<br><p style="font-size: 10px; color: #0f0; padding: 5px 0">AutoSpam <input id="acdn" type="text" value="'+numClick+'" style="background: #000; color: #0f0; border: #0f0 1px solid; width: 30px"> times</p>';
wwash.style.height = 'auto';
if (numClick > 0)
	click(document.getElementsByClassName('btnMed')[0]);

// Click by JoeSimmons
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
if(!e) {return;}
if(typeof e=='string') e=document.getElementById(e);
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
}