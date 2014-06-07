// ==UserScript==
// @name          Naruto Shippuden test
// @version       1.2.0
// @include       http://naruto.fb.crunchyroll.com/*
// ==/UserScript==

function cheat()
{
	/*var config={"renderTo":"stat_62202065_601595","targetDateDiff":127000,"resetInterval":10000,"type":"plain-min","allowSingleDigits":true,"finishedMessage":"0:HH"};
	config.callback=function()
	{
		increment_stat(62202065,1,37,this);
	};
	(new CountdownTimer(config)).start();*/
	alert('maincode');
	test();
}
function test()
{
	var body = document.getElementsByTagName("body").item(0);
	var div = document.createElement("div");
	div.id = "cheatbar";
	div.innerHTML = 'TEST TEST TEST TEST TEST';
	body.appendChild(div);
	alert('test');
}
function inject(code)
{
	var div = document.createElement("div");
	div.innerHTML = '<script>' + code + '</script>';
	document.getElementsByTagName("body").item(0).appendChild(div);
	return;
}

alert('main1');

if (navigator.userAgent.indexOf("Opera")>=0)
	cheat();
else // GreaseMonkey is stupid
	inject(cheat().toString() + 'cheat();');

alert('main2');