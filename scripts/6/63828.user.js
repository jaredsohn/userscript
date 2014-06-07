// ==UserScript==
// @name           SPQR Tools: spy helper
// @namespace      spqr.epsilon
// @include        http://*.ikariam.*/*
//
// @require http://userscripts.org/scripts/source/57756.user.js
//
// @version	   0.03
//
// @history        0.03 Added script updater
// ==/UserScript==

var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];

var islandId = null;

ScriptUpdater.check("63828");

init();

function init()
{
	lang = defineLanguage(domain);
	
	var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) 
    {
        if (linkElements[i].id.search(/city_[0-9]*/) != -1)
        {
			linkElements[i].addEventListener('click', function() { window.setTimeout(spyInfo, 1); }, false);
        }
    }
	
	var informationDiv = document.getElementById('information');
    if (informationDiv) 
    {
        var listElements = informationDiv.getElementsByTagName('li');
        if (listElements.length > 0) 
        {
            spyInfo();
        }
    }
}

function spyInfo()
{
	try
	{
        createSpyDiv();
		
		updateField("spqrtools_spypercentage", lang.fetch);
		
		var ownerName = getValue(getElementsByClass(document, "owner", false)[0]);
		var cityName  = getValue(getElementsByClass(document, "name", false)[0]);
		
		var cityId = getCityId(ownerName, cityName);
		var islandId = getIslandId();
		
		//alert(cityId+" | "+islandId);
		
		var savedPercentage = GM_getValue("spypercentage_"+cityId);
		if (savedPercentage != null)
		{
			updateField("spqrtools_spypercentage", savedPercentage);
		}
		else
		{
			requestSpyPercentage(cityId, islandId, 'spqrtools_spypercentage', function(responseDetails) 
			{
				var percentage = parseSpyPercentage(responseDetails.responseText);
				updateField("spqrtools_spypercentage", percentage);
				
				GM_setValue("spypercentage_"+cityId, percentage);
			});
		}
	}
	catch (sError)
	{
		if (typeof sError == "string")
		{
			alert("SPQR tools has encountered an error while attempting to process spy information.\nPlease send a message to spqrtools@wabstar.de quoting the error below and which page it was received on\n" + sError);
		}
	}
}

function parseSpyPercentage(responseText)
{
	var hiddenDiv = document.createElement("div");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
	
	hiddenDiv.setAttribute("style", "display:none;");
	
	var percentage = getElementsByClass(hiddenDiv, "percentage")[0];
	
	return percentage.innerHTML;
}

function requestSpyPercentage(cityId, islandId, type, onload)
{
	GM_xmlhttpRequest({
        method:'GET',
        url:'http://' + gameServer + '/index.php?view=sendSpy&destinationCityId='+cityId+'&islandId='+islandId,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
        },
        onload:onload
    });
}

function getValue(oElement)
{
  listParts = oElement.innerHTML.split(">");
  listParts[2] = listParts[2].split("<")[0];
  var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name// get the players name
  playerName = playerName.replace(/&nbsp;/g, " "); // replace any silly nubspaces!
  
  return playerName;
}

function getCityId(owner, cityName)
{
	var cityInfos = getElementsByClass(document, "cityinfo", false);
	
	var cityLocation = null;
	
	// start at second element
	for (var i = 1; i < cityInfos.length; i++)
	{
		var tmpOwner = getValue(getElementsByClass(cityInfos[i], "owner", false)[0]);
		var tmpCity  = getValue(getElementsByClass(cityInfos[i], "name", false)[0]);
		
		if (tmpOwner == owner && tmpCity == cityName)
		{
			cityLocation = cityInfos[i].parentNode;
			break;
		}
	}
	
	var a = cityLocation.getElementsByTagName("a")[0];
	var idParts = a.getAttribute("id").split("_");
	return idParts[1];
}

function getIslandId()
{
	if (islandId == null)
	{
		var search = top.location.search;
		
		search = search.substr(1, search.length - 1)
		
		var searchParts = search.split("&");
		
		for (var i = 0; i < searchParts.length; i++)
		{
			if (searchParts[i].indexOf("id=") > -1)
			{
				islandId = searchParts[i].split("=")[1];
				break;
			}
		}
	}
	
	return islandId;
}

function createSpyDiv()
{
	if (!document.getElementById("spqrtools_spydiv")) 
    {	
		element = document.createElement("div");
		element.setAttribute("id", "spqrtools_spydiv");
		
		var div = <>
			<li style="margin: 2px 10px;font-size:9px" id="spqrtools_spy_percentage" class="ally">
				<span style="float:left;" class="textLabel">{lang['spypercentage']}:</span>
				<div id="spqrtools_spypercentage">{lang['unknown']}</div>
			</li>
		</>;
		
		element.innerHTML = div;
		
		// get container for Island view
		var informationContainer = document.getElementById('infocontainer');
		if (!informationContainer) 
		{ 
			informationContainer = document.getElementById('information'); 
		}
		
		var allyClass = getElementsByClass(informationContainer, "ally") 
		
		insertAfter(element, allyClass[0]);
	}
}

function updateField(type, value)
{
    document.getElementById(type).innerHTML = value;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function defineLanguage(langTDL)
{
	switch (langTDL)
	{
		case "de":
			language = {
			spypercentage:"Spio %",
			unknown:"Unbekannt",
			fetch:"Laden..."};
			break;
			
		default:
			language = {
			spypercentage:"---",
			unknown:"---",
			fetch:"Loading..."};
			break;
	}
	
	return language;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function insertAfter(newElement,targetElement) 
{
    var parent = targetElement.parentNode;

    if(parent.lastchild == targetElement) 
    {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

getElementsByClass = function(inElement, className, findIn) 
{
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) 
  {
    if (findIn == true) 
    {
        if (all[e].className.indexOf(className) > 0) 
        {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) 
        {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};