// ==UserScript==
// @name           Subtitulos Extra
// @namespace      http://www.magarzon.com
// @description    Opciones extras para subtitulos.es
// @include        http://www.subtitulos.es/*
// ==/UserScript==

if (window.top != window.self) 
    return;

var span = document.getElementById('lista');

if (span)
{
	addGlobalStyle('.doblecontador{ font-size:16px;padding:15px 20px 10px 20px;float:right;display:block;width:25px}');
	span.addEventListener("DOMSubtreeModified", changeTD, false);
}

function changeTD(event)
{
	var td = document.evaluate("//td[@class='cursorEdit' and starts-with(@onclick,'mouse')]",event.target, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if (td.snapshotLength==0) return;

	//event.target.removeEventListener("DOMSubtreeModified",changeTD,false);

	for (var i = 0; i < td.snapshotLength; i++) 
	{
		var elm = td.snapshotItem(i);
		elm.addEventListener('click',showCounter);		
	}
}

function showCounter(event)
{
	if (event.target.nodeName!="TEXTAREA" && event.target.nodeName!="TD") return;

	var text = null;
	var elm = null;
	if (event.target.nodeName=="TEXTAREA")
	{
		elm= event.target.parentNode;
		text = event.target;
	}
	else
		elm = document.evaluate("form",event.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (elm==null) return;

	var newcounter = document.evaluate("span[@id='nuevocontador']",elm, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if (newcounter)
	{
		checkCounter(text,newcounter);
		return;
	}

	var oldcounter = document.evaluate("span[@class='contador']",elm, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (oldcounter && text!=null)
	{
		oldcounter.style.display="none";
	}
	
	counter = document.createElement("span");
	counter.setAttribute("class","contador");
	counter.setAttribute("id","nuevocontador");
	counter.setAttribute("style","color: rgb(0, 0, 0);");
	var text = document.evaluate("textarea",elm, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	text.addEventListener('keyup',counting);
	text.addEventListener('keydown',counting);
	counter.appendChild(document.createTextNode(text.value.length));
	elm.insertBefore(counter,text);
	checkCounter(text,counter);


}

function checkCounter(text,counter)
{
	var l = text.value.length;
	var pos = text.value.indexOf("\n");
	if (pos!=-1)
	{
		counter.className="doblecontador";
		counter.firstChild.nodeValue=pos+"\n"+(l-pos-1);
	}
	else
	{
		counter.className="contador";
		counter.firstChild.nodeValue=l;
	}

	if ((pos==-1 && l>40) || (pos!=-1 && (l>81 || pos>40 || l-pos-1>40)))
		counter.setAttribute("style","color: rgb(255, 0, 0);");
	else
		counter.setAttribute("style","color: rgb(0, 0, 0);");
}

function counting(event)
{
	var form = event.target.parentNode;
	var counter = document.evaluate("span[@id='nuevocontador']",form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	checkCounter(event.target,counter);
	
}

function addGlobalStyle(css) {
		try {
			var elmHead, elmStyle;
			elmHead = document.getElementsByTagName('head')[0];
			elmStyle = document.createElement('style');
			elmStyle.type = 'text/css';
			elmHead.appendChild(elmStyle);
			elmStyle.innerHTML = css;
		} catch (e) {
			if (!document.styleSheets.length) {
				document.createStyleSheet();
			}
			document.styleSheets[0].cssText += css;
		}
	}

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_203', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_203', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=203&version=1.2';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / (one_day/24); /*Find out how much time has passed since the last check - If more than one hour has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();