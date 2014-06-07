// ==UserScript==
// @name           RKKA Request
// @namespace      www.erepublik.com
// @description    Adds a button to the citizen profile page that fills RKKA donation request
// @include        http://www.erepublik.com/*/citizen/profile/*
// @author         Rubinovich(Roman), ich76 (Igor)
// @version        1.4
// ==/UserScript==

function embedFunction(func) 
{
	document.body.appendChild(document.createElement('script')).innerHTML = func.toString();
}

function getItemName(ItemName_str)
{
    return /[\u0410-\u044F\u0401\u0451\w\x20]+/.exec(ItemName_str);
}
embedFunction(getItemName);


function getItemsCount(ItemName)
{
    var holderDiv = document.getElementById("owninv");
    var childNodeArray = holderDiv.getElementsByTagName("li");
    var nItems = 0;
    // var str = "Looking for: " + ItemName + "\n";
    for (i = 0; i < childNodeArray.length; i++) 
    { 
        
        var CurrentItemName_str = childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt');
        var Quality_str = childNodeArray[i].getElementsByTagName('span')[0].getElementsByTagName('span')[0].getAttribute('style');
        var Quality = parseInt(/\d+/.exec(Quality_str));
        
        //alert("CIN = *" + CurrentItemName_str +"*\n"); 
        var CurrentItemName = getItemName(CurrentItemName_str);
        //alert(CurrentItemName);
        //str = str + "*" + CurrentItemName + "*       *" + Quality + "*\n";     
        if (ItemName == CurrentItemName && Quality == 20) 
        { 
		nItems++; 
        };
    }
    //alert(str);	
    return(nItems);
}
embedFunction(getItemsCount);


function getItemsMaxQuality(ItemName)
{
    var holderDiv = document.getElementById("owninv");
    var childNodeArray = holderDiv.getElementsByTagName("li");
    var nItems = 0;
    for (i = 0; i < childNodeArray.length; i++) 
    { 
        var CurrentItemName = getItemName(childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt'));
        var Quality = parseInt(/\d+/.exec(childNodeArray[i].getElementsByTagName('span')[0].getElementsByTagName('span')[0].getAttribute('style'))[0]);
        if (ItemName == CurrentItemName && Quality > nItems) 
        { 
		nItems = Quality; 
        };
    }
    return(nItems);
}
embedFunction(getItemsMaxQuality);


function PKKARequest()
{
    /// **** CHANGE ME ****
    var linkToForm = " http://spreadsheets.google.com/viewform?hl=ru&formkey=dE55d3lOdEdOdUo1bDhFZ0paMk5SMXc6MA";    
    var holderDiv = document.getElementById("sidebar");
    var a_holder = holderDiv.getElementsByTagName("a")[1];
    var citizen_name = a_holder.innerHTML;
    var nGuns = getItemsCount("Weapon") + getItemsCount("оружие");
    var nTickets = getItemsCount("Moving Tickets") + getItemsCount("билеты");
		var qFood = getItemsMaxQuality("Food") + getItemsMaxQuality("еда");
		var qHouse = getItemsMaxQuality("House") + getItemsMaxQuality("дом");
    var day_erep = parseInt(document.getElementById("clock").getElementsByTagName("strong")[0].innerHTML);

    window.open(linkToForm + "&entry_0=" + citizen_name +
           "&entry_1=" + nGuns + "&entry_2=" + nTickets + "&entry_4=" + (qFood/20) + "&entry_5=" + (qHouse/20) + "&entry_9=" + day_erep);
}

embedFunction(PKKARequest);

var eRepublikSendRKKARequest = function() 
{ 	 
    if(location.hostname.indexOf('erepublik.com') != -1 &&
       location.href.indexOf('/citizen/profile/') != -1 ) 
    {
  
	var holderDiv = document.getElementById("owninv").parentNode;
  	var div_delta = document.createElement("div");
  	div_delta.innerHTML = '<a class="registersmall padded" href="javascript:PKKARequest();">PKKA Request</a><a class="tourstart padded" href="http://orders.ecpsu.ru/" target="_blank">PKKA Orders</a>'; 
  	holderDiv.appendChild(div_delta);
    }
}; 

eRepublikSendRKKARequest();
