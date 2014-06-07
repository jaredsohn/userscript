typeof(CheckForUpdate)!='undefined' && CheckForUpdate.init(<>
// ==UserScript==
// @name           Neopets - Main Shop Autobuyer
// @namespace      Backslash
// @description    Autobuyers Neopets items from the main shops.
// @note           Autobuyer has been released!
// @lisence        GNU GPL
// @include        http://www.neopets.com*
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
// @require	       http://userscripts.org/scripts/source/38788.user.js
// @cfu:url        http://userscripts.org/scripts/source/60969.user.js
// @cfu:version    1
// ==/UserScript==
</>);


/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

**************************************************************************/



//<|-------------------------------------------------------------------|>\\
//<|---------------------GRAPHICAL USER INTERFACE----------------------|>\\
//<|-------------------------------------------------------------------|>\\
document.body.innerHTML = document.body.innerHTML.replace(/Merchandise/g, "Restock Log")
document.body.innerHTML = document.body.innerHTML.replace(/\/shopping\/index.phtml/g, "/pronounce.phtml")
var Drop1Open = false;
var Drop2Open = false;
var Drop3Open = false;
var LogOpen = false;
var BarOpen = false;
var SettingsOpen = false;
var ListOpen = false;
var RefreshOpen = false;
var TopOpen = false;
var shopToAB     = GM_getValue('shopId', '1');
var shopURL     = "http://www.neopets.com/objects.phtml?type=shop&obj_type=";
var shopFull    = shopURL + shopToAB;
	var TopBar = document.createElement("div");
	TopBar.setAttribute("style", "position: fixed;top: 0;left: 0;z-index: 9999;width: 100%;height: 19px;background-image: url('http://img94.imageshack.us/img94/4113/25290893.png');visibility:visible;");
	setOpacity(TopBar,5)
	TopBar.addEventListener('click', TopBarOpacity, false);
	document.body.appendChild(TopBar);
	var CoverObject = document.createElement("div");
	CoverObject.setAttribute("style", "top:0px;left:0px;width:100%;height:100%;position:fixed;background-color:#000000;z-index:999;opacity:0.6;filter:alpha(opacity=60);visibility:hidden;overflow:hidden;");

	document.body.appendChild(CoverObject);
		var Item1 = document.createElement("div");
	    Item1.innerHTML  = "File";
	    Item1.setAttribute("style", "position:absolute;left:5px;top:1px;font-family:MS Sans Serif;font-size:10pt;cursor:default");
		Item1.addEventListener('click', Item1Actions, false);
	    TopBar.appendChild(Item1);
		var Drop1 = document.createElement("div");
	    Drop1.innerHTML = "";
		Drop1.setAttribute("style", "padding:3px;text-align:center;position:absolute;position:absolute;left:0px;top:18px;font-family:MS Sans Serif;font-size:10pt;cursor:default;width:150px;height:50px;background-color:#f0f0f0;border:1px solid #979797;visibility:hidden;");
	    TopBar.appendChild(Drop1);
		var Drop2 = document.createElement("div");
		Drop2.setAttribute("style", "padding:3px;text-align:center;position:absolute;left:40px;top:18px;font-family:MS Sans Serif;font-size:10pt;cursor:default;width:150px;height:83px;background-color:#f0f0f0;border:1px solid #979797;visibility:hidden;");
	    TopBar.appendChild(Drop2);
		var Drop3 = document.createElement("div");
	    Drop3.innerHTML  = '<a href="http://digitize.2kmegs.com/chat/" target="_blank">Launch Chat Room</a>';
		Drop3.setAttribute("style", "padding:3px;text-align:center;position:absolute;left:113px;top:18px;font-family:MS Sans Serif;font-size:10pt;cursor:default;width:150px;height:20px;background-color:#f0f0f0;border:1px solid #979797;visibility:hidden");
	    TopBar.appendChild(Drop3);
		var Item2 = document.createElement("div");
	    Item2.innerHTML  = "Settings";
	    Item2.setAttribute("style", "position:absolute;left:50px;top:1px;font-family:MS Sans Serif;font-size:10pt;cursor:default");
	    Item2.addEventListener('click', Item2Actions, false);
		TopBar.appendChild(Item2);
		var Options = document.createElement("div");
	    Options.innerHTML  = 'Pause';
	    Options.setAttribute("style", "visibility:visible;position:absolute;left:123px;top:1px;font-family:MS Sans Serif;font-size:10pt;cursor:default");
	    Options.addEventListener('click', tOptions, false);
		TopBar.appendChild(Options);
		var EndNote = document.createElement("div");
	    EndNote.innerHTML  = "Neopets Backslash Buyer®";
	    EndNote.setAttribute("style", "position:absolute;right:5px;top:1px;font-family:MS Sans Serif;font-size:10pt;cursor:default");
	    EndNote.addEventListener('click', EndNoteActions, false);
		TopBar.appendChild(EndNote);
		var HideBar = document.createElement("div");
	    HideBar.innerHTML  = "Hide Bar<hr>";
	    HideBar.setAttribute("style", "font-family:MS Sans Serif;font-size:10pt;cursor:default;");
	    HideBar.addEventListener('click', toggleBar, false);
		Drop1.appendChild(HideBar);
		
		var HiddenBar = document.createElement("div");
	    HiddenBar.innerHTML  = "Show Bar";
	    HiddenBar.setAttribute("style", "position:fixed;left:3px;top:1px;visibility:hidden;font-family:MS Sans Serif;font-size:10pt;cursor:default");
	    HiddenBar.addEventListener('click', toggleBar, false);
		document.body.appendChild(HiddenBar);
		
		var ViewLog = document.createElement("div");
	    ViewLog.innerHTML  = "RS Log";
	    ViewLog.setAttribute("style", "position: relative;font-family:MS Sans Serif;font-size:10pt;cursor:default;");
	    ViewLog.addEventListener('click', toggleLog, false);
		Drop1.appendChild(ViewLog);
		
		var viewList = document.createElement("div");
	    viewList.innerHTML  = "Restock List<hr>";
	    viewList.setAttribute("style", "position: relative;font-family:MS Sans Serif;font-size:10pt;cursor:default;");
	    viewList.addEventListener('click', toggleList, false);
		Drop2.appendChild(viewList);
		
		var viewRefresh = document.createElement("div");
	    viewRefresh.innerHTML  = "Refresh Rates<hr>";
	    viewRefresh.setAttribute("style", "position: relative;font-family:MS Sans Serif;font-size:10pt;cursor:default;");
	    viewRefresh.addEventListener('click', toggleRefresh, false);
		Drop2.appendChild(viewRefresh);
		
		var viewSettings = document.createElement("div");
	    viewSettings.innerHTML  = "Misc Settings";
	    viewSettings.setAttribute("style", "position: relative;font-family:MS Sans Serif;font-size:10pt;cursor:default;");
	    viewSettings.addEventListener('click', toggleSettings, false);
		Drop2.appendChild(viewSettings);
		
		
		var logBox = document.createElement("div");
	logBox.innerHTML = GM_getValue('itemLog', 'There are no log items.');
	logBox.setAttribute("style", "height:300px;width:400px;position:fixed;top:100px;left:30%;border:1px solid black;background-color:#ffffff;z-index:9999999;visibility:hidden;padding:3px;text-align:left;font-family:courier new;");
	
	var miscBox = document.createElement("div");
	miscBox.setAttribute("style", "height:100px;width:400px;position:fixed;top:100px;left:30%;border:1px solid black;background-color:#ffffff;z-index:9999999;visibility:hidden;padding:3px;text-align:left;font-family:tahoma;");
	document.body.appendChild(miscBox);
			var shopId = document.createElement("div");
			shopId.innerHTML  = "<center>Shop ID: <input type='text'  value='"+GM_getValue('shopId', '13')+"' id='shopId' size='1'></center>";
			shopId.setAttribute("style", "position: relative;");
			miscBox.appendChild(shopId);
			var RSCheck = document.createElement("div");
			RSCheck.innerHTML  = "<center><input type='checkbox' id='RSCheck' value='checked' "+GM_getValue('RSCheck', 'checked')+"> Check for Restock Ban every <input type='text'  value='"+GM_getValue('rscheckt', '30')+"' id='rscheckt' size='1'> minutes</center>";
			RSCheck.setAttribute("style", "position: relative;");
			miscBox.appendChild(RSCheck);
			var WaitBB = document.createElement("div");
			WaitBB.innerHTML  = "<center> Wait Before Buy: <input type='text'  value='"+GM_getValue('WBB', '500')+"' id='WBB' size='3'> milliseconds</center>";
			WaitBB.setAttribute("style", "position: relative;");
			miscBox.appendChild(WaitBB);
	
	
	var ListBox = document.createElement("div");
	ListBox.setAttribute("style", "height:300px;width:400px;position:fixed;top:100px;left:30%;border:1px solid black;background-color:#ffffff;z-index:9999999;visibility:hidden;padding:3px;text-align:left;font-family:tahoma;");
	document.body.appendChild(ListBox);
			var restockList = document.createElement("div");
			restockList.innerHTML  = "<center>Please paste a restock list in the following text area.<br /><textarea style='width: 220px; height: 250px;' id='restockList'>"+GM_getValue('restockList', '')+"</textarea></center>";
			restockList.setAttribute("style", "position: relative;");
			ListBox.appendChild(restockList);
	
	var refreshBox = document.createElement("div");
	refreshBox.setAttribute("style", "height:100px;width:400px;position:fixed;top:100px;left:30%;border:1px solid black;background-color:#ffffff;z-index:9999999;visibility:hidden;padding:3px;text-align:left;font-family:tahoma;");
	document.body.appendChild(refreshBox);
			var refreshTimes = document.createElement("div");
			refreshTimes.innerHTML  = "<center>Refresh every <input type='text'  value='"+GM_getValue('from', '8000')+"' id='from' size='4'>  to <input type='text'  value='"+GM_getValue('to', '16000')+"'id='to' size='4'> milliseconds<br><br><div style='color:grey'>I reccommend keeping this at around 8,000 to 16,000 milliseconds. If you are planning on freezing after autobuying, 2,000 to 4,000 is a good rate.</div></center>";
			refreshTimes.setAttribute("style", "position: relative;");
			refreshBox.appendChild(refreshTimes);

			var clrLogButton = document.createElement("div");
	    clrLogButton.innerHTML = "clear log";
	    clrLogButton.setAttribute("style", "position: absolute; left: 12px; top: 20px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
	    clrLogButton.addEventListener('click', clearLog, false);
	    document.body.appendChild(clrLogButton);
		
//<|-------------------------------------------------------------------|>\\
//<|-------------------------------END---------------------------------|>\\
//<|---------------------GRAPHICAL USER INTERFACE----------------------|>\\
//<|-------------------------------------------------------------------|>\\




//Please only edit below if you know what you are doing! With one
//Aleration, this specific script can stop operating. Thank you.





//<|-------------------------------------------------------------------|>\\
//<|-----------------------------FUNCTIONS-----------------------------|>\\
//<|-------------------------------------------------------------------|>\\
	function saveSettings()
{
	GM_setValue('restockList', document.getElementById('restockList').value);

	alert("settings saved.");
}
	
	function Item1Actions(){
		toggleDrop1()}
	function Item2Actions(){
		toggleDrop2()}
	function EndNoteActions(){
		alert('Thank you for using BackSlash Buyer®! \n\nThis script autobuys items from the Neopets Main Shops, located in the "Shops" section of Neopets.\n\nThe makers of this script are notheld responsible if you are frozen for using this script! This is for educational purposes only.');}

	function toggleDrop1(){
	if(Drop1Open == false)
	{
		Drop1Open = true;
		Drop1.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
		Drop3.style.visibility = "hidden";
	}
	else
	{
		Drop1Open = false;
		Drop1.style.visibility = "hidden";

	}
	}
function toggleDrop2()
{
	if(Drop2Open == false)
	{
		Drop2Open = true;
		Drop2.style.visibility = "visible";
		Drop1.style.visibility = "hidden";
		Drop3.style.visibility = "hidden";
	}
	else
	{
		Drop2Open = false;
		Drop2.style.visibility = "hidden";

	}
}
function tOptions()
{
var pausing = prompt("Enter the ammount of seconds you wish to pause, and click 'OK'.","5");
var newnum = pausing * 1000
if (pausing){
setTimeout(function(){alert('The awaited time you wished to pause has elapsed.')}, newnum);
}
else
{
alert('Pause was aborted.')
}
}

if(location.href.indexOf('pronounce.phtml') != -1 )
{
document.getElementById("content").innerHTML = "<center><div style='margin:10px;padding:10px;font-family:courier new;font-size:20px;'>" + GM_getValue('itemLog', '') + "</div>" + "<br><br><br><br><br></center>";
}

function toggleBar()
{
	if(BarOpen == false)
	{
		BarOpen = true;
		TopBar.style.visibility = "visible";
		HiddenBar.style.visibility = "hidden";
		Drop1.style.visibility = "hidden";
	}
	else
	{
		BarOpen = false;
		TopBar.style.visibility = "hidden";
		HiddenBar.style.visibility = "visible";
		Drop1.style.visibility = "hidden";
	}
}

function LogItem(line)
{
	GM_setValue('itemLog', GM_getValue('itemLog', '')+line+"<br />")
}


function toggleLog()
{
	if(LogOpen == false)
	{
		LogOpen = true;
		document.location = location.href;
		ViewLog.innerHTML = "Hide RS Log";
		CoverObject.style.visibility = "visible";
		logBox.style.visibility = "hidden";
		Drop1.style.visibility = "hidden";
	}
	else
	{
		LogOpen = false;
		CoverObject.style.visibility = "hidden";
		ViewLog.innerHTML = "RS Log";
		logBox.style.visibility = "hidden";
		Drop1.style.visibility = "hidden";
	}
}


function toggleSettings()
{
	if(SettingsOpen == false)
	{
		SettingsOpen = true;
		viewSettings.innerHTML = "Hide Misc Settings";
		CoverObject.style.visibility = "visible";
		miscBox.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
	}
	else
	{
		SettingsOpen = false;
		CoverObject.style.visibility = "hidden";
		viewSettings.innerHTML = "Misc Settings";
		miscBox.style.visibility = "hidden";
		Drop2.style.visibility = "hidden";
		
		if(document.getElementById('RSCheck').checked == true)
	{
		GM_setValue('RSCheck', 'checked');
	}
	else
	{
		GM_setValue('RSCheck', '0');
	}
	GM_setValue('shopId', document.getElementById('shopId').value);
	GM_setValue('WBB', document.getElementById('WBB').value);
	GM_setValue('rscheckt', document.getElementById('rscheckt').value);
	}
}


function toggleList()
{
	if(ListOpen == false)
	{
		ListOpen = true;
		viewList.innerHTML = "Hide Restock List<hr>";
		CoverObject.style.visibility = "visible";
		ListBox.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
	}
	else
	{
		ListOpen = false;
		GM_setValue('restockList', document.getElementById('restockList').value);
		CoverObject.style.visibility = "hidden";
		viewList.innerHTML = "Restock List<hr>";
		ListBox.style.visibility = "hidden";
		Drop2.style.visibility = "hidden";
	}
}



function TopBarOpacity()
{
	if(TopOpen == false)
	{
		TopOpen = true;
		setOpacity(TopBar,10)

	}
	else
	{
		TopOpen = false;
		setOpacity(TopBar,10)

	}
}

function clearLog()
{
	GM_setValue('itemLog', '');
	logBox.innerHTML = GM_getValue('itemLog', '');
}

function toggleRefresh()
{
	if(RefreshOpen == false)
	{
		RefreshOpen = true;
		viewRefresh.innerHTML = "Hide Refresh Rates<hr>";
		CoverObject.style.visibility = "visible";
		refreshBox.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
	}
	else
	{
		RefreshOpen = false;
		GM_setValue('to', document.getElementById('to').value);
	    GM_setValue('from', document.getElementById('from').value);
		CoverObject.style.visibility = "hidden";
		viewRefresh.innerHTML = "Refresh Rates<hr>";
		refreshBox.style.visibility = "hidden";
		Drop2.style.visibility = "hidden";
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



function haggle_price(raw_price)
    {
        var iVal = new Array(2);
       
        iVal[0] = raw_price.substr(0,1);
        iVal[1] = raw_price.substr(1,1);

        var x = 0;
        var end_price = "";
       
        for(x=0; x<raw_price.length; x++)
        {
            end_price += iVal[(x%2)];
        }

        return end_price;
    }
	
	
	function run_cap()
		   {
            allForms = document.evaluate("//form[@name='haggleform']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
           
            for (var i = 0; i < allForms.snapshotLength; i++)
            {
                thisForm = allForms.snapshotItem(i);
               
                allImgs = document.evaluate("//input[@type='image']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
           
                for (var i = 0; i < allImgs.snapshotLength; i++)
                {
                    var image = allImgs.snapshotItem(i);
                   
                    if(image)
                    {
                        var newImg = document.createElement("img");
                        newImg.src = image.src;
                       
                        var canvas = unsafeWindow.document.createElement("canvas");
                        canvas.width = newImg.width;
                        canvas.height = newImg.height;
                   
                        canvas.getContext("2d").drawImage(newImg, 0, 0);
                       
                        var image_data = canvas.getContext("2d").getImageData(0, 0, newImg.width, newImg.height);
                       
                        var lowy = 999;
                        var lowx = 999;
                        var low = 999;
                       
                        for (var x = 0; x < image_data.width; x++)
                        {
                            for (var y = 0; y < image_data.height; y++)
                            {
                                var i = x*4+y*4*image_data.width;
                               
                                var avg = Math.floor((image_data.data[i]+image_data.data[i+1]+image_data.data[i+2])/3);
                               
                                if (avg < low)
                                {
                                    low = avg;
                                    lowx = x;
                                    lowy = y; 
                                }
                            }
                        }
                             
                        var newInput = document.createElement("input");
                        newInput.type="hidden";
                        newInput.name="x";
                        newInput.value=lowx;
                        thisForm.appendChild(newInput);
                       
                        var newInput = document.createElement("input");
                        newInput.type="hidden";
                        newInput.name="y";
                        newInput.value=lowy;
                        thisForm.appendChild(newInput);
                       
                        thisForm.submit();
				
				
                    }else{
                        alert("Image error");
                    }
                }           
            }
        }
		
		
		
		
		
		function enterhaggle()
    {
        if (document.location.href.match('haggle.phtml') && (document.body.innerHTML.indexOf("captcha_show.phtml") > -1))
        {
            if(document.body.innerHTML.indexOf("I wont take less than ") > -1)
            {
                start_pos = document.body.innerHTML.indexOf("I wont take less than ") + 22;
                end_pos = document.body.innerHTML.indexOf(" Neopoints for it");
                raw_price = document.body.innerHTML.substr(start_pos,end_pos-start_pos);
                raw_price = raw_price.replace(",","");
               
                document.body.innerHTML = document.body.innerHTML.replace("value=\"0\"","value=\""+haggle_price(raw_price)+"\"");   
            }
           
            if(document.body.innerHTML.indexOf("I want at least ") > -1)
            {
                start_pos = document.body.innerHTML.indexOf("I want at least ") + 16;
                end_pos = document.body.innerHTML.indexOf(" Neopoints for this great item");
                raw_price = document.body.innerHTML.substr(start_pos,end_pos-start_pos);
                raw_price = raw_price.replace(",","");
      
                document.body.innerHTML = document.body.innerHTML.replace("value=\"0\"","value=\""+haggle_price(raw_price)+"\"");
            }   
           }
		   }
		   
		   
		   function setOpacity(object,value) {
	object.style.opacity = value/10;
	object.style.filter = 'alpha(opacity=' + value*10 + ')';
}




//<|-------------------------------------------------------------------|>\\
//<|--------------------------------END--------------------------------|>\\
//<|-----------------------------FUNCTIONS-----------------------------|>\\
//<|-------------------------------------------------------------------|>\\



//Especially don't edit below. Thanks.



//<|-------------------------------------------------------------------|>\\
//<|------------------------THE SCRIPT ITSELF--------------------------|>\\
//<|-------------------------------------------------------------------|>\\
if( location.href.indexOf('objects.phtml?type=shop&obj_type=') != -1 )
{
var refreshtimes = Math.floor(Math.random() * parseFloat((GM_getValue('to', '')-GM_getValue('from', '')))) + parseFloat(GM_getValue('from', ''));

setTimeout(function(){location.href = document.location}, refreshtimes)

var ArrItems;
ArrItems = GM_getValue('restockList', '').split("\n"); // split by line
for (i=0;i<ArrItems.length;i++)
	{
		if (document.body.innerHTML.indexOf(ArrItems[i]) != -1) {
	var item = document.evaluate('//b[. = "'+ArrItems[i]+'"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (item.snapshotLength > 0) {
		item = item.snapshotItem(0);
		var selectedlink = item.previousSibling.previousSibling;
		window.location = selectedlink
	}
	}
	else
	{
	document.location = shopFull;
	}
	}
	}

	
	var shopFull = "http://www.neopets.com/objects.phtml?type=shop&obj_type=" + GM_getValue('shopId', '13')
			
			var reachedBuyPage = document.getElementById("content").innerHTML.match("Enter the amount you wish to pay");
		    var soldOut    = document.getElementById("content").innerHTML.match("SOLD OUT!");

		    if(reachedBuyPage != null)
		    {
			var itemName = GetStringBetween(document.body.innerHTML, 'Buying :  ', '</b>')
			LogItem('[' + document.getElementById('nst').innerHTML + '] Attempting to buy <b>' + itemName + '</b>')
			  enterhaggle()
			  setTimeout(run_cap, GM_getValue('WBB', '500'))
			  
		    }
		    else if(soldOut != null)
		    {
			 LogItem('[' + document.getElementById('nst').innerHTML + '] <b>' + itemName + '</b> was SOLD OUT!')
			 document.location = shopFull;
		    }

		    

			
			var boughtItem = document.getElementById("content").innerHTML.match("I accept your offer");
		    var tooSlow    = document.getElementById("content").innerHTML.match("SOLD OUT!");

		    if(boughtItem != null)
		    {
			var itemName2 = GetStringBetween(document.body.innerHTML, 'Buying :  ', '</b>')
			var itemPrice = GetStringBetween(document.body.innerHTML, 'I accept your offer of <b>', '</b>')
			setTimeout("document.location = '"+shopFull+"'", 6000);
			LogItem('[' + document.getElementById('nst').innerHTML + '] Bought <b>' + itemName2 + '</b> for <b>' + itemPrice + '</b> NP')
			}
		    else if(tooSlow != null)
		    {
			 LogItem('[' + document.getElementById('nst').innerHTML + '] <b>' + itemName + '</b> was SOLD OUT!')
			 document.location = shopFull;
		    }