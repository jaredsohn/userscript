// ==UserScript==
// @name           Text Compare By URLs
// @namespace      Pi
// @description    Allows calling text-compare.com with any two URLs on the internet ! 
// @include        *
// @version        1.5
// ==/UserScript==

/*********************Constants/global variables************************************/
/***********************************************************************************/
var debug = false;
var url = new String(location.href).toLowerCase();
var toDisableClick = false;
var mouseModifiers = "ctrl+alt"; //will probably get this from GM_set/get - later.
var keyModifiers = "ctrl+alt";
var diffKey = 68; //'D' for Diff. 
var eraseKey = 69; //'E' for erase. 
var addKey = 65; //'A' for add. 

//text-compare.com's two textArea id's here:
var textBox1ID = 'inputText1';
var textBox2ID = 'inputText2';
var textBox1;
var textBox2;
var diffLink1 = "";
var diffLink2 = "";

/*********************Helper Methods************************************************/
/***********************************************************************************/
//General: 
function log(message)
{
    if(debug)
        GM_log(message);
}

function encode(str)
{
    str = str.replace(/\./g, "(dot)");
    return encodeURIComponent(str);
}

function decode(str)
{
    return decodeURIComponent(str.replace(/\+/g,  " ")).replace(/\(dot\)/g,".");
}

function getQuerystring(key, default_)
{
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]").toLowerCase();
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  url = new String(window.location.href).toLowerCase();
  var qs = regex.exec(url);
  if(qs == null)
    return default_;
  else
    return qs[1];
}

//For all pages - mouse button handlers. 
function onClick(e)
{
	if(toDisableClick)
	{
		e.stopPropagation();
		e.preventDefault();
		toDisableClick = false;
	}
	return true;
}

function onMouseDown(e)
{
	if(e.target.tagName.toUpperCase() != 'A')
		return true;
	
	var link = e.target;		
	var ctrlRequired = mouseModifiers.indexOf("ctrl") >= 0;
	var altRequired = mouseModifiers.indexOf("alt") >= 0;
	var shiftRequired = mouseModifiers.indexOf("shift") >= 0;
	
	var shiftPressed = e.shiftKey;
	var altPressed = e.altKey;
	var ctrlPressed = e.ctrlKey;
	
	if((ctrlRequired && !ctrlPressed) || (shiftRequired && !shiftPressed) || (altRequired && !altPressed))
		return true;
		
	//We are here, that means all the required keys have been pressed while clicking the mouse down. 	
	toDisableClick = true;
	
	GM_log ("Storing link with href: " + link.href);
	
	var oldDiffLink1 = GM_getValue("difflink1", "");
	var oldDiffLink2 = GM_getValue("difflink2", "");
	
	if(oldDiffLink1 == "")
	{
		GM_setValue("difflink1", link.href);
	}
	else
	{
		GM_setValue("difflink2", link.href);
		if(oldDiffLink2 != "")
			GM_setValue("difflink1", oldDiffLink2);
	}
	log("     ");
	log("Link 1 : " + GM_getValue("difflink1", ""));
	log("Link 2 : " + GM_getValue("difflink2", ""));
	
	e.stopPropagation();
	e.preventDefault();
	return false;
}

function handleKeyPress(e)
{
	if(e.keyCode != diffKey)
		return;
		
	var ctrlRequired = keyModifiers.indexOf("ctrl") >= 0;
	var altRequired = keyModifiers.indexOf("alt") >= 0;
	var shiftRequired = keyModifiers.indexOf("shift") >= 0;
	
	log(ctrlRequired + ", " + altRequired + ", " + shiftRequired);
	
	var shiftPressed = e.shiftKey;
	var altPressed = e.altKey;
	var ctrlPressed = e.ctrlKey;
	
	log(ctrlPressed + ", " + altPressed + ", " + shiftPressed);
	
	if((ctrlRequired && !ctrlPressed) || (shiftRequired && !shiftPressed) || (altRequired && !altPressed))
		return true;
		
	log((shiftPressed ? " shift ":"") + (ctrlPressed ? " control" : "") + (altPressed ? " alt " : "") + " Key " + diffKey + " pressed.");
		
	//So our desired combination for getting the diff has been pressed. 
	InitiateComparison();
}

function InitiateComparison()
{
	GM_setValue('compareSavedURLs', true);
	GM_openInTab("http://www.text-compare.com");
}

//text-compare.com specific - to populate the text boxes and pressing the 'Compare' button. 
function updateContents(element, text)
{
    element.value = text;
    if(textBox1.value.length > 0 && textBox2.value.length > 0) //means both of them have got some text now (after initially being cleared up)
        document.forms[0].submit();
}

function getContents(inUrl, callBack, callBackArgumentFirstArgument/*second is the response text*/)
{
    GM_xmlhttpRequest({
      method: "GET",
      url: inUrl,
      onload: function(response) {
        if(response.responseText.length > 0)
        {
            callBack(callBackArgumentFirstArgument, response.responseText);
        }
      }
    });
}

function Compare()
{
	diffLink1 = decode(getQuerystring("queryLink1",""));
	diffLink2 = decode(getQuerystring("queryLink2",""));

	log("diffLink1: " + diffLink1);
	log("diffLink2: " + diffLink2);

	textBox1 = document.getElementById(textBox1ID);
	textBox2 = document.getElementById(textBox2ID);
	
	if(diffLink1 == "" && diffLink2 == "" && GM_getValue('compareSavedURLs', false))
	{
		diffLink1 = GM_getValue("difflink1", "");
		diffLink2 = GM_getValue("difflink2", "");
		GM_setValue('compareSavedURLs', false); //So that it is only initiated by the key combination for diff.
	}

	//If the diff is already shown, this will be non null. Don't auto compare in that case. 
	var diffTable = document.getElementById('top'); 

	if(textBox1 && textBox2 && diffLink1.length > 0 && diffLink2.length > 0 && !diffTable)
	{
		updateContents(textBox1, "");
		updateContents(textBox2, "");
		getContents(diffLink1, updateContents, textBox1);
		getContents(diffLink2, updateContents, textBox2);
	}
}



/*****************************Main work starts here :*******************************/
/***********************************************************************************/
//Set up mouse, key capturing stuff for getting links to compare. 
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('click', onClick, false);
window.addEventListener('keyup', handleKeyPress, false);

//Compare URLs when we are on the diff site. 
if(url.indexOf('text-compare.com') >= 0)
{
	Compare();
}