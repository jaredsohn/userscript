// ==UserScript==
// @name           matches
// @namespace      http://org.anderhil/vkontakte/matches
// @include        http://vkontakte.ru/matches.php*
// ==/UserScript==
var mycars = new Array();
var counter = 0;
var lnk;
function Remember()
{
	var element = document.getElementById('oneMatch');
	mycars[counter] = element.innerHTML;
	counter++;
	lnk = element.getElementsByTagName('a')[0];
}
function GetPrev()
{
	if(counter>0)
	{
		counter--;
		var element = document.getElementById('oneMatch');
		var car = mycars[counter];
		element.innerHTML = car;
	}
}
function CheckNew()
{
var element = document.getElementById('oneMatch');
var lnks = element.getElementsByTagName('a');
if(lnk != null && lnk != lnks[0])
{
//alert('incheckif');
	Start();
	lnk = lnks[0];
}
}

function Start()
{
//alert('start');
var els = document.getElementsByClassName('ncc');
for(var i=0;i<els.length;i++)
{
	els[i].addEventListener("click", Remember, false);
}
}
unsafeWindow.setInterval(function(){CheckNew();},500);
var element = document.getElementById('content');
var el = document.createElement('button');
el.innerHTML = '<button type="button">Prev</button>';
el.addEventListener("click", GetPrev, false);
//alert(el);
element.insertBefore(el,element.firstChild);
//unsafeWindow.setTimeout(CheckNew,1000);
Start();