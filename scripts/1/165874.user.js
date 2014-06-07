// ==UserScript==
// @name        Google Translation Listener
// @namespace   jamespgilbert
// @include     http://translate.google.com*
// @version     1
// @grant       none
// ==/UserScript==

var phrases = new Array('home','car','phone','computer','television','purse','keys','tree','pen','paper','scissors','tissues','book','vacuum','airplane','chair','school','college','diaper','bottle','crib','seat','blanket','clothes','shirt','pants','socks','shoes','hat','sweater','coat','scarf','gloves','underwear','glasses','slippers','body','leg','foot','hand','mouth','eye','nose','lip','face','head','arm','hair','back','belly','neck','butt','ear','place','door','drawer','shelf','basket','box','closet','cabinet','window','curtain','underneath','next to','on top','inside','kitchen','bedroom','living room','rug','floor','oven','stove','microwave','sink','refrigerator','bathroom','shower','bed','couch','food','chopsticks','fork','knife','spoon','restaurant','menu','rice','noodle','table','plate','bowl','cup','milk','yogurt','banana','orange','kiwi','apple','pear','oatmeal','vegetables','towel','wet','dry','clean','dirty','soap','bubbles','hot','warm','done','finished','family','daughter','son','baby','mother','grandmother','father','grandfather','sister','brother','water','heat','electricity','gas','oil','movie','tv show','music','song','game','photo','idea','thought','friend','favorite','favor','feeling','wish','prayer','word','light','darkness','shadow','noise','trash','drink','meal','road','river','path','step','night','day','morning','afternoon','evening','minute','hour','second');
var secs = 0;
var phrase = "";
var itv = -1;
var repeatx = 1;
var repeatidx = 0;

if(getCookie("translatewords"))
{
	phrases = ("" + getCookie("translatewords")).split("|");
}
else
{
	setCookie("translatewords", phrases.join("|"), 30);
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
	return false;
}

var bg = document.createElement("div");
bg.id = "hello";
bg.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
bg.style.left = "0"; 
bg.style.minHeight = "100%"; 
bg.style.position="absolute"; 
bg.style.top="0";
bg.innerHTML = "ok";
bg.style.width = "100%";
document.getElementById("gt-text-c").appendChild(bg);
var modal = document.createElement("div");
modal.id = "translations";
modal.innerHTML = "<h3>Phrases</h3><textarea id='txtwords' style='width:100%; height:100px'>"+phrases.join("\n")+"</textarea><label>Repeat:</label><select id='repeattimes'><option value='0'>No</option><option value='1'>1x</option><option value='2'>2x</option><option val='3'>3x</option></select><input type='button' onclick='loadTranslations()' value='Okay'/><br/>";
modal.style.width = "300px";
modal.style.height = "200px";
modal.style.margin="auto";
modal.style.padding="10px";
modal.style.backgroundColor="white";
bg.appendChild(modal);

unsafeWindow.loadTranslations=function()
{
	repeatx = parseInt(document.getElementById("repeattimes").value);
	phrases = document.getElementById("txtwords").value.split("\n");
	setCookie("translatewords", phrases.join("|"), 30);
	itv = setInterval(step, 2000);
	bg.style.display="none";
}

function step()
{
	// 1 sec play first word
	// 
	if(secs == 0)
	{
		pidx = Math.floor(Math.random() * phrases.length);
		phrase = phrases[pidx];
		var src = document.getElementById("source");
		src.value = phrase;
	}
	else if(secs == 1)
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 10, 10, false, false, false, false, 0, null);
		var cb = document.getElementById("gt-src-listen").dispatchEvent(evt);
		evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 10, 10, false, false, false, false, 0, null);
		cb = document.getElementById("gt-src-listen").dispatchEvent(evt);
	}
	else if(secs == 3)
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 10, 10, false, false, false, false, 0, null);
		var cb = document.getElementById("gt-res-listen").dispatchEvent(evt);
		evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 10, 10, false, false, false, false, 0, null);
		cb = document.getElementById("gt-res-listen").dispatchEvent(evt);
	}
	
	if(secs > 5)
	{
		repeatidx++;
		if(repeatidx > repeatx)
		{
			repeatidx = 0;
			secs = 0;
		}
		else
		{
			secs = 1;
		}
	}
	else
	{
		secs++;
	}
}