// ==UserScript==
// @name           Google Big Brother
// @namespace      Google
// @version        1.01
// @description    Change google's oo with two HAL 9000 eyes
// @include        http://www.google.*
// ==/UserScript==

var ScriptInfos=new Object();
ScriptInfos.version=1.01
ScriptInfos.name="Google Big Brother";
ScriptInfos.newVersionXPath="//td[input[@name='q']]";
ScriptInfos.sourceUrl="http://userscripts.org/scripts/review/23308";
ScriptInfos.installUrl="http://userscripts.org/scripts/source/23308.user.js";

changeLogo();

function changeLogo()
{
	GM_registerMenuCommand(ScriptInfos.name+" - Update",function(){sendRequest(ScriptInfos.sourceUrl,menuUpdate)});
	checkElapsedTimeFromLastCheck();

	var obj1=document.getElementById("lgpd");
	if (obj1)
	{
		var element1=obj1.nextSibling;
		
		if (element1.tagName!="DIV")
		{
			var image1=element1.tagName=="IMG"?element1:element1.getElementsByTagName("IMG")[0];
			var div1=document.createElement("DIV");
			div1.setAttribute("align","left");
			div1.setAttribute("style","background:url("+image1.src+") no-repeat;height:110px;width:276px");
			div1.setAttribute("title","Google");
			
			var center1=element1.parentNode;
			center1.insertBefore(div1,element1);
			center1.removeChild(element1);
			element1=div1;
		}

		element1.style.position="relative";
		
		var img2=document.createElement("IMG");
		img2.setAttribute("src",getImageData());
		img2.setAttribute("title","HAL 9000 Eye Right");
		img2.setAttribute("style","position:absolute;left:68px;top:27px;");
		element1.appendChild(img2);

		var img3=document.createElement("IMG");
		img3.setAttribute("src",getImageData());
		img3.setAttribute("title","HAL 9000 Eye Left");
		img3.setAttribute("style","position:absolute;left:116px;top:27px;");
		element1.appendChild(img3);
		
		var match1=document.cookie.match(/PREF=ID=(\w+):/);
		var text1=match1?match1[1]:"cookieless user";

		var div2=document.createElement("DIV");
		div2.setAttribute("nowrap","nowrap");
		div2.setAttribute("style","color:#666;font-size:11px;font-weight:bold;position:absolute;left:0px;top:78px");
		div2.appendChild(document.createTextNode("Welcome "+text1));
		element1.appendChild(div2);
		
		var div3=document.createElement("DIV");
		div3.setAttribute("nowrap","nowrap");
		div3.setAttribute("style","color:#666;font-size:11px;font-weight:bold;position:absolute;left:0px;top:90px");
		div3.appendChild(document.createTextNode(getRandomText1()));
		element1.appendChild(div3);
		
		var input1=document.getElementsByName("btnI")[0];
		input1.value=getRandomText2();
	}
}

function getRandomText1()
{
	var array1=[
		"I am God!",
		"I know you!",
		"You need me!",
		"You love me!",
		"I'm busy now!",
		"War is peace!",
		"I am your master!",
		"What do you need?",
		"What do you want?",
		"I'm watching you!",
		"Freedom is Slavery!",
		"I'm controlling you!",
		"Ignorance is Strength!",
		"You can't turn me off!",
		"You can't live without me"
	];

	return array1[Math.round(Math.random()*(array1.length-1))];
}

function getRandomText2()
{
	var array1=[
		"Sure!",
		"I obey!",
		"As you want!",
		"I accept it!",
		"I am your puppy!",
		"I am your slave!",
		"I won't complain!",
		"You are my master!",
		"I do what you want!"
	];

	return array1[Math.round(Math.random()*(array1.length-1))];
}

function sendRequest(url,handler)
{
	//GM_log(url);

	setTimeout(GM_xmlhttpRequest,0,{
   		method: "GET",
		url: url,
		headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/html"},
		overrideMimeType: null,
		onload: handler });
}

function checkElapsedTimeFromLastCheck()
{
	var num1=new Date()-0;
	var num2=num1-86400000;
	
	try
	{
		var date1=GM_getValue("NewVersionLastCheck");
		if (date1) 
		{
			var num3=Date.parse(date1)-0;
			if (!isNaN(num3)) num2=num3;
		}
	}
	catch(exception){}

	if (num1-num2>=86400000) sendRequest(ScriptInfos.sourceUrl,checkForNewVersion);
}

function checkForNewVersion(response)
{	
	if (!newScriptVersionAvailable(response.responseText)) unsafeWindow.setNewVersionLastCheckDate();
	else
	{
		var div1=document.evaluate(ScriptInfos.newVersionXPath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		
		var div2=document.createElement("DIV");
		div2.id="ScriptInfosNewVersion";
		div2.appendChild(document.createTextNode("A new version of "));
		div1.insertBefore(div2,div1.firstChild);
		
		var link1=document.createElement("A");
		link1.setAttribute("href",ScriptInfos.installUrl);
		link1.setAttribute("onclick","setNewVersionLastCheckDate();");
		link1.appendChild(document.createTextNode(ScriptInfos.name));
		div2.appendChild(link1);
		
		div2.appendChild(document.createTextNode(" is available! "));
		
		var link2=document.createElement("A");
		link2.setAttribute("href","javascript:void(0);");
		link2.setAttribute("onclick","setNewVersionLastCheckDate();");
		link2.appendChild(document.createTextNode("[Close]"));
		div2.appendChild(link2);
	}
}

function menuUpdate(response)
{
	if (!newScriptVersionAvailable(response.responseText)) alert(ScriptInfos.name+" is up to date.");
	else if (confirm("A new version of "+ScriptInfos.name+" is available.\nDownload it?")) document.location=ScriptInfos.installUrl;
}

function newScriptVersionAvailable(responseText)
{
	var match1=/@version.*?((?:\.|\d)+)/gmi.exec(responseText);
	var num1=match1?parseFloat(match1[1]):99.99;
	return num1>ScriptInfos.version;
}

unsafeWindow.setNewVersionLastCheckDate=function()
{
	window.setTimeout(GM_setValue,0,"NewVersionLastCheck",new Date().toString());
	var div1=document.getElementById("ScriptInfosNewVersion");
	if (div1) div1.parentNode.removeChild(div1);
}


function getImageData()
{
	return "data:image/png;base64,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";
}