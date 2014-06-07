// ==UserScript==
// @name			Enhanced MySpace Gifter
// @description		Gets rid of loot you do not want
// @include   		http://myspace.com/Modules/Applications/Pages/Canvas.aspx?appId=110226
// @include   		http://myspace.com/Modules/Applications/Pages/Canvas.aspx?appId=110226
// @version			11.02.09
// @contributor		Leyline
// ==/UserScript==

GM_registerMenuCommand('EG - Add as recipient', saveRecipient);

var sendList = [];

window.setInterval(setupPage, 4000);
window.setInterval(autoExecute, GM_getValue('autoExecuteDelay', '60')*60000);

setupPage();

var xmlHTTP=get_xmlHTTP();

if(!xmlHTTP)
{
	alert('Your browser does not support AJAX sending.');
}

function get_xmlHTTP()
{
	if(window.XMLHttpRequest)
    {
		return new XMLHttpRequest();
	}
	if(window.ActiveXObject)
	{
		return new ActiveXObject('Microsoft.XMLHTTP');
	}
	return false;
}

function setupPage()
{
	if ((document.getElementById('app110226_gift_send')) && (!document.getElementById('leftBox')))
	{
		enhanceGiftingPage();
		attachMethods();
		setupQtyInputs();
		btnLoot();
	}
	else
	{
		enhanceProfilePage();
	}
}

function enhanceGiftingPage()
{
	var windowHeight = GM_getValue('windowHeight', '600');
	var leftBoxHTML =
		'<td style="border-right: 1px solid rgb(153, 153, 153); padding: 3px; width: 160px; vertical-align: top; background-color: rgb(51, 51, 51);" id="leftBox">'+
		'<div style="width: 160px; height: 225px;">============= View:'+
		'<a title="" class="sexy_button gift_category_button" style="width: 130px;" id="btnLoot">Loot</a>'+
		'<a title="" class="sexy_button gift_category_button" style="width: 130px;" id="btnCollections">Collections</a>'+
		'<a title="" class="sexy_button gift_category_button" style="width: 130px;" id="btnBoosts">Boosts</a>'+
		'<a title="" class="sexy_button gift_category_button" style="width: 130px;" id="btnAllCategories">All Categories</a>'+
		'<a title="Shows Setting" class="sexy_button gift_category_button" style="width: 130px;" id="btnSettings">Settings</a>'+
		'<a title="" class="sexy_button gift_category_button" style="width: 130px;" id="btnSendingProgress">Sending Progress</a>'+
		'</div>'+
		'<div style="width: 160px; height: 220px;">============= Recipient:'+
		'<select style="width: 142px; margin-bottom: 4px; margin-right: 8px;" id="recipientList">'+
		'</select>============= Action:'+
		'<a title="Sends the loot items" class="sexy_button gift_category_button" style="width: 130px;" id="btnExecute">Execute</a>'+
		'<a title="Sends the currently displayed loot items" class="sexy_button gift_category_button" style="width: 130px;" id="btnExecuteCategory">Execute Category</a>'+
		'<a title="Sends the currently highlighted loot item" class="sexy_button gift_category_button" style="width: 130px;" id="btnExecuteSingle">Execute Single</a>'+
		'<a title="Stops Sending" class="sexy_button gift_category_button" style="width: 130px;" id="btnCancelSend">Cancel Send</a>'+
		'</div>'+
		'<div style="overflow: auto; width: 160px; height: ' + (windowHeight - 458) +'px;" id="logDiv"/>'+
		'</td>';
	var sexyElements = document.getElementsByClassName('sexy_button gift_category_button');
	sexyElements[0].parentNode.innerHTML = leftBoxHTML;
	var settingsHTML = 
		'<div style="overflow: auto; display: none;" id="settingsTable"><table style="vertical-align: text-top"><tbody>'+
		'<tr style="height: 150px; vertical-align: text-top"><td><h3>Manage Recipients</h3><br/>'+
		'<a title="Delete the currently displayed recipient" class="sexy_button gift_category_button" style="width: 130px;" id="btnDeleteCurrent">Delete Current</a><br/>'+
		'<a title="Make the currently displayed recipient default" class="sexy_button gift_category_button" style="width: 130px;" id="btnDefaultCurrent">Default Current</a></td>'+
		'<td><h3>Update Options</h3><br/>'+
		'<a title="Checks for a script update" class="sexy_button gift_category_button" style="width: 130px;" id="btnCheckNow">Check Now</a><br/>'+
		'<a title="Automatically checks for updates daily" class="sexy_button gift_category_button" style="width: 130px;" id="btnAutoUpdate">AutoUpdate Off</a></td>'+
		'<td><h3>Appearence Options</h3><br/><span>Window Height:</span><input style="border-color: black; background: rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(188, 210, 234); text-align: right;" size="2" id="txtWindowHeight" title="height in pixels \nRefresh to see changes"/></td></tr>'+
		
		'<tr style="height: 150px; vertical-align: text-top"><td><h3>Manage Quantities</h3><br/>'+
		'<a title="Saves all values in the text boxes" class="sexy_button gift_category_button" style="width: 130px;" id="btnSaveQuantities">Save Quantities</a><br/>'+
		'<a title="Resets all the text boxes to value in text box and saves" class="sexy_button gift_category_button" style="width: 130px;" id="btnResetQuantities">Reset Quantities</a><br/>'+
		'<span>Default value:</span><input style="border-color: black; background: rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(188, 210, 234); text-align: right;" size="2" id="txtDefaultTextValue"/></td>'+
		'<td><h3>Sending Options</h3><br/>'+
		'<a title="Will Keep/Send the value in each box" class="sexy_button gift_category_button" style="width: 130px;" id="btnSendMode">Keep Quantities</a><br/>'+
		'<a title="Autorefresh reloads this page after sending is complete" class="sexy_button gift_category_button" style="width: 130px;" id="btnAutoRefresh">AutoRefresh On</a><br/>'+
		'<a title="Beta testing - Works only if AJAX is working" class="sexy_button gift_category_button" style="width: 130px;" id="btnAutoExecute">AutoExecute Off</a><br/>'+
		'<span>AutoExecute Delay:</span><input style="border-color: black; background: rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(188, 210, 234); text-align: right;" size="2" id="txtAutoExecuteDelay" title="delay in minutes"/><br>'+
		'<span>Sending Delay:</span><input style="border-color: black; background: rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(188, 210, 234); text-align: right;" size="2" id="txtSendingDelay" title="delay in seconds"/></td><td></td></tr>'+
		'<tr><td colspan=2>====================================<br/>'+
		'Settings are saved instantly.<br/>'+
		'Click a loot type button on the left to return.</td></tr>'+
		'</tbody></table></div><div style="overflow: auto; display: none;" id="sendingTable"></div>' ;
	document.getElementById('app10979261223_table_collection').parentNode.innerHTML += settingsHTML;	
	document.getElementById('app10979261223_table_collection').parentNode.style.height = windowHeight + 'px';
	recipientList = document.getElementById('recipientList');
	var userNames = eval(GM_getValue('userNames', []));
	var userIDs = eval(GM_getValue('userIDs', []));
	for (var i = 0; i < userNames.length; i++)
	{
		recipientList.innerHTML += '<option id="' + userIDs[i] + '" title="' + userIDs[i] + '">' + userNames[i] + '</option>';
	}
}

function attachMethods()
{
	document.getElementById('btnLoot').addEventListener('click', btnLoot, false);
	document.getElementById('btnCollections').addEventListener('click', btnCollections, false);
	document.getElementById('btnBoosts').addEventListener('click', btnBoosts, false);
	document.getElementById('btnAllCategories').addEventListener('click', btnAllCategories, false);
	document.getElementById('btnSettings').addEventListener('click', btnSettingss, false);
	document.getElementById('btnSendingProgress').addEventListener('click', btnSendingProgress, false);
	document.getElementById('btnExecute').addEventListener('click', btnExecute, false);
	document.getElementById('btnExecuteCategory').addEventListener('click', btnExecuteCategory, false);
	document.getElementById('btnExecuteSingle').addEventListener('click', btnExecuteSingle, false);
	document.getElementById('btnCancelSend').addEventListener('click', btnCancelSend, false);
	document.getElementById('btnDeleteCurrent').addEventListener('click', btnDeleteCurrent, false);
	document.getElementById('btnDefaultCurrent').addEventListener('click', btnDefaultCurrent, false);
	document.getElementById('btnSaveQuantities').addEventListener('click', btnSaveQuantities, false);
	document.getElementById('btnResetQuantities').addEventListener('click', btnResetQuantities, false);
	document.getElementById('btnSendMode').addEventListener('click', btnSendMode, false);
	document.getElementById('btnAutoRefresh').addEventListener('click', btnAutoRefresh, false);
	document.getElementById('btnAutoExecute').addEventListener('click', btnAutoExecute, false);
	document.getElementById('btnCheckNow').addEventListener('click', btnCheckNow, false);
	document.getElementById('btnAutoUpdate').addEventListener('click', btnAutoUpdate, false);
	document.getElementById('txtWindowHeight').addEventListener('change', txtWindowHeight, false);
	document.getElementById('txtAutoExecuteDelay').addEventListener('change', txtAutoExecuteDelay, false);
	document.getElementById('txtSendingDelay').addEventListener('change', txtSendingDelay, false);
	document.getElementById('btnSendMode').textContent = GM_getValue('sendMode', 'Keep Quantities');
	document.getElementById('btnAutoRefresh').textContent = GM_getValue('autoRefresh', 'AutoRefresh Off');
	document.getElementById('btnAutoExecute').textContent = GM_getValue('autoExecute', 'AutoExecute Off');
	document.getElementById('btnAutoUpdate').textContent = GM_getValue('autoUpdate', 'AutoUpdate Off');
	document.getElementById('txtDefaultTextValue').value = GM_getValue('defaultTextValue', 'Skip');
	document.getElementById('txtWindowHeight').value = GM_getValue('windowHeight', '600');
	document.getElementById('txtAutoExecuteDelay').value = GM_getValue('autoExecuteDelay', '60');
	document.getElementById('txtSendingDelay').value = GM_getValue('sendingDelay', '4');
}

function enhanceProfilePage()
{
	if (!document.getElementById('addAsRecipient'))
	{	
		var allElements = document.getElementsByClassName('tab_content');	
		for (var i = 0; i < allElements.length; i++)
		{
			if (allElements[i].textContent.match('Profile') == 'Profile')
			{
				var content = document.getElementById('app10979261223_content_row');
				var anchorElements = content.getElementsByTagName('A');
				for(var j = 0; j < anchorElements.length; j++)
				{
					if(anchorElements[j].innerHTML == 'Profile')
					{
						var match=/[;&]user=(\d+)/.exec(anchorElements[j].href).toString();
						var comma = match.indexOf(',');
						comma++;
						var tabsElements = document.getElementsByClassName('tabs');
						var tabsElementsHTML = 	'<li class="tab_off tab_last"><div class="tab_content" style="width: 220px;">'+
										'<a id="addAsRecipient">Add as recipient</a>'+
										'<input style="border-color: black; background: rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(188, 210, 234);" size="30" class="EGtextBox" title="' + match.substring(comma) + '" id="recipientNameBox"/>'+
										'</div></li>';
						tabsElements[1].innerHTML += tabsElementsHTML;
						document.getElementById('recipientNameBox').value = anchorElements[j].parentNode.textContent.substr(8, anchorElements[j].parentNode.textContent.indexOf(')') - 8);
						document.getElementById('addAsRecipient').addEventListener('click', saveRecipient, true);
					}
				}
			}
		}
	}
}

function setupQtyInputs() 
{
	var lootTable = document.getElementById('app110226_table_loot');
	var boostsTable = document.getElementById('app110226_table_expendables');
	var collectionsTable = document.getElementById('app110226_table_collection');
	
	var divElements = lootTable.getElementsByTagName('DIV');
	var divElementsB = boostsTable.getElementsByTagName('DIV');
	var divElementsC = collectionsTable.getElementsByTagName('DIV');

	var keeps = eval(GM_getValue('keeps', []));
	for (var i = 0; i < divElements.length; i++)
	{
		if (/app110226_item_box/.test(divElements[i].id))
		{
			makeGiftQtyInput(divElements[i]);
		}
	}
	for (var i = 0; i < divElementsB.length; i++)
	{
		if (/app110226_item_box/.test(divElementsB[i].id))
		{
			makeGiftQtyInput(divElementsB[i]);
		}
	}
	for (var i = 0; i < divElementsC.length; i++)
	{
		if (/app110226_item_box/.test(divElementsC[i].id))
		{
			makeGiftQtyInput(divElementsC[i]);
		}
	}
	
	var keeps = eval(GM_getValue('keeps', []));
	for (var i = 0; i < keeps.length; i++)
	{
		if (document.getElementById(keeps[i][0]))
		{
			 document.getElementById(keeps[i][0]).value= keeps[i][1];
		}
	}

	var inputElements = document.getElementsByClassName('EGtextBox');
	var defaultInputValue = document.getElementById('txtDefaultTextValue').value;
	for (var i = 0, j = inputElements.length; i < j; i++)
	{
		if (inputElements[i].value == '')
		{
			inputElements[i].value = defaultInputValue;
		}
	}
}

function makeGiftQtyInput(parElement)
{
	parElement.innerHTML = parElement.innerHTML.replace(/[\t\r\n]/g, '');
	var tableHTML = '<table><tbody><tr><td><div class="EGinputText">' + document.getElementById('btnSendMode').textContent.substr(0,4) + ':</div></td>'+
					'<td><input style="border-color: black; background: rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding;'+
					'-moz-background-inline-policy: continuous; color: rgb(188, 210, 234); text-align: right;" size="2" class="EGtextBox" id="' + 
					trim(parElement.childNodes[0].textContent) + ':' + parElement.id.charAt(24) + ':' + parElement.id.substr(26) + '" egonhand="' + 
					parElement.childNodes[2].textContent.substring(1) + '"/></td></tr></tbody></table>';
	parElement.innerHTML += tableHTML;
	parElement.style.height = '150px';
}

function autoExecute()
{
	if ((document.getElementById('app110226_gift_send')) && (document.getElementById('btnAutoExecute').textContent == 'AutoExecute On'))
	{
		//dummy data, ment to just get table data from server
		var url = 	'http://mwms.zynga.com/mwms/remote/html_server.php?xw_controller=gift&xw_exp_sig=ec00bcc9b938a3f15b82a0cc27368990&xw_time=1258665802&xw_action=view&xw_city=1&tmp=eac61f5cce5d491964a3059e464d0573&xhd=1258665802&lwh=3491560558&html_server.php?xw_controller=gift&'+
					'gift_category=' + '15' + 
					'&gift_id=' + '5948' + 
					'&gift_key=' + 'abcedefghijklmnopqrstuvwxyz' + 
					'&xw_action=send&recipients[0]=' + '1234567890';
		if (xmlHTTP)
		{
			xmlHTTP.onreadystatechange = function()
			{
				if ((xmlHTTP.readyState == 4) && (xmlHTTP.status == 200))
				{
					refreshInventoryLevels(xmlHTTP.responseText);
					buildSendList('All');
				}
			};
			xmlHTTP.open('GET', url, true);
			xmlHTTP.send(null);
		}
	}
}

function buildSendList(sendType)
{
	sendList = [];
	var logDiv = document.getElementById('logDiv');
	var toSendQty = 0;
	var arrElemID = [];
	var inputElements = document.getElementsByClassName('EGtextBox');
	var category = document.getElementById('app110226_gift_category').value;
	
	for (var i = 0, j = inputElements.length; i < j; i++)
	{
		toSendQty = addToSendListQty(inputElements[i]);
		arrElemID = inputElements[i].id.split(':');
		if((toSendQty > 0) &&((sendType == 'All')||
		  ((sendType == 'Category') && (arrElemID[1] == category))||
		  ((sendType == 'Single') && (inputElements[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.border == '1px solid rgb(255, 255, 0)'))))
		{
			arrElemID[3] = toSendQty;
			sendList[sendList.length] = arrElemID;
		}
	}
	if (sendList.length == 0)
	{
		logDiv.innerHTML = 'There is nothing to send';
	}
	else
	{
		logDiv.innerHTML = '<iframe id="giftingFrame" style="width: 10px; height: 10px;"/>';
		setupSendingTable();
		btnSendingProgress();
		sendItem();
	}
}

function addToSendListQty(elem)
{
	if (document.getElementById('btnSendMode').textContent == 'Keep Quantities') 
	{
		return elem.getAttribute('EGonHand') - elem.value;
	}
	else
	{
		return elem.value
	}
}

function setupSendingTable()
{
	var totalCount = 0;
	for (var i = 0; i < sendList.length; i++)
	{
		totalCount += sendList[i][3];
	}
	var recipientList = document.getElementById('recipientList');
	sendingTableHTML = 	'<table><tbody><tr><td width="250"><div>Sending to:' + recipientList.childNodes[recipientList.selectedIndex].value + '</div></td>'+
						'<td width="250"><table><tbody><tr><td>'+
						'<div style="border: 1px solid white; width: 130px; height: 10px; margin-top: 5px;">'+
						'<div id="progressBar" style="margin: 0pt; padding: 0pt; background: transparent url(http://mwfb.static.zynga.com/mwfb/graphics/statusbar_blue.gif) repeat-x scroll 0% 0%; overflow: visible; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; width: 0%; vertical-align: middle; font-size: 8px; font-weight: bold; text-align: left; color: rgb(255, 255, 255);">0</div></div></td>'+
						'<td><div id="progressCurrentCount">0</div></td><td><div style="width: 20px; text-align: center;">of</div></td><td>'+
						'<div id="progressTotalCount">'+totalCount+'</div></td></tr></tbody></table></td></tr><tr><td colspan="2" style="text-align: center;"><div>'+
						'<table border="1"><tbody><tr><th width="75">Have Sent</th><th width="75">To Send</th><th width="350">Item Name</th></tr>';
	for (var i = 0; i < sendList.length; i++)
	{
		sendingTableHTML += '<tr><td><div id="' + sendList[i][1] + ':' + sendList[i][2] + '">0</div></td><td><div>' + sendList[i][3] + '</div></td><td><div>' + sendList[i][0] + '</div></td></tr>';
	}
	sendingTableHTML +=	'</tbody></table></div></td></tr></tbody></table>';
	sendingTable = document.getElementById('sendingTable');
	sendingTable.innerHTML = sendingTableHTML;
  	document.getElementById('btnCancelSend').textContent = 'Cancel Send';
}

function updateSendingTable(item)
{
	document.getElementById(item).textContent++;	
	var progressCurrentCount = document.getElementById('progressCurrentCount');
	progressCurrentCount.textContent++;
	var progressTotalCount = document.getElementById('progressTotalCount');
	var progressBar = document.getElementById('progressBar');
	var percentDone = progressCurrentCount.textContent / progressTotalCount.textContent;
	progressBar.textContent = Math.round(percentDone * 100);
	progressBar.style.width = percentDone * 130 + 'px';
}

function sendItem()
{
	var recipientList = document.getElementById('recipientList');
	var recipientID = recipientList.childNodes[recipientList.selectedIndex].id;
	var giftingFrame = document.getElementById('giftingFrame');
	if (document.getElementById('btnCancelSend').textContent != 'Cancel Send')
	{
		sendList.length = 0;
		appendToSendingTable('<br/>MANUALLY STOPPED');
		giftingFrame.src = '';
	}
	else if ((sendList[0][3] == 0) & (sendList.length == 1))
	{
		appendToSendingTable('<br/>DONE SENDING');
		giftingFrame.src = '';
		if (document.getElementById('btnAutoRefresh').textContent == 'AutoRefresh On')
		{
			window.setTimeout(refreshGiftingPage, 4000)
		}
	}
	else
	{
		while (sendList[0][3] == 0)
		{
			sendList = sendList.slice(1);
		}
		GM_log('sending ' + sendList[0][0] + ' to ' + recipientID);
		var url = 'http://mwms.zynga.com/mwms/remote/html_server.php?xw_controller=gift&xw_exp_sig=ec00bcc9b938a3f15b82a0cc27368990&xw_time=1258665802&xw_action=view&xw_city=1&tmp=eac61f5cce5d491964a3059e464d0573&xhd=1258665802&lwh=3491560558&=gift&gift_category=' + sendList[0][1] + '&gift_id=' + sendList[0][2] + '&gift_key=' + document.getElementById('app110226_gift_key').value + '&xw_action=send&recipients[0]=' + recipientID;
		if  (xmlHTTP)
		{
			xmlHTTP.onreadystatechange = ajaxResponse;
			xmlHTTP.open('GET',url,true);
			xmlHTTP.send(null);
		}
		else
		{
			sendList[0][3]--;
			updateSendingTable(sendList[0][1] + ':' + sendList[0][2]);
			giftingFrame.src = url;
			window.setTimeout(function() {sendItem()}, GM_getValue('sendingDelay', '4')*1000);
		}
	}
}

function ajaxResponse()
{
	if(xmlHTTP.readyState==4)
	{
		if(xmlHTTP.status==200)
		{
			var response = '';
			response=xmlHTTP.responseText;
			if(/You gave the/.test(response))
			{
				var text=/You gave the (.+) to (.+)<\/td>/.exec(response);
				text[1] = trim(text[1]);
				//getting category and item number based on loot name
				var itemDetails = [];
				for (var i = 0; i < sendList.length; i++)
				{
					if (sendList[i][0] == text[1])
					{
						itemDetails[0] = sendList[i][1] + ':' + sendList[i][2];
						itemDetails[1] = i;
					}
				}
				updateSendingTable(itemDetails[0]);
				sendList[itemDetails[1]][3]--;
				refreshInventoryLevels(response);
				sendItem();
			}
			else if (/Error while loading page from/.test(response))
			{
				appendToSendingTable('<br/>Mafia Wars overloaded, waiting 30 seconds...');
				window.setTimeout(sendItem, 30000);
			}
			else if (/have enough of that/.test(response))
			{
				appendToSendingTable('<br/>You do not have enough of that item to give');
				for (var i = 0, j = sendList.length; i < j; i++)
				{
					if (sendList[i][3] > 0)
					{
						sendList[i][3] = 0;
						i = j;
					}
				}
				refreshInventoryLevels(response);
				sendItem();
			}
			else if(/Some recipient(s) were invalid users./.test(response))
			{
				appendToSendingTable('<br/>Some recipient(s) were invalid users<br/>Canceling sending');
			}
			else
			{
				appendToSendingTable('<br/>Problem retrieving XML data ' + xmlHTTP.status + '<br/>Reverting to frame based sending');
				xmlHTTP = false;
				sendItem();			
			}
		}
		else
		{
			appendToSendingTable('<br/>Problem retrieving XML data ' + xmlHTTP.status + '<br/>Reverting to frame based sending');
			xmlHTTP = false;
			sendItem();
		}
	}
}

function refreshInventoryLevels(response)
{
	response = response.replace(/[\t\r\n]/gm, '');
	var splitTables = response.split(/<div id="app110226_table_[^>]+>|<\/div><\/td><\/tr><\/table><div><span style="color: #666666;">Dimmed items/);
	var collectionsTable = document.getElementById('app110226_table_collection');
	var lootTable = document.getElementById('app110226_table_loot');
	var boostsTable = document.getElementById('app110226_table_expendables');
	collectionsTable.innerHTML = splitTables[1].substring(0, splitTables[1].length - 6);
	lootTable.innerHTML = splitTables[2].substring(0, splitTables[2].length - 6);
	boostsTable.innerHTML = splitTables[3].substring(0, splitTables[3].length - 6);
	setupQtyInputs();	
}

function displaySendListDebug()
{
	var text = '';
	for (var i = 0; i < sendList.length; i++)
	{
		text += sendList[i][0] + '\t' + sendList[i][1] + '\t' + sendList[i][2] + '\t' + sendList[i][3] + '\n';
	}
	alert(text);
}

function appendToSendingTable(sendingTableHTML)
{
	sendingTable = document.getElementById('sendingTable');
	sendingTable.innerHTML += sendingTableHTML;
}

function saveRecipient()
{
	var inMafia = false;
	var anchorElements = document.getElementsByTagName('A')
	for (var i = 0; i < anchorElements.length; i++)
	{
		if (anchorElements[i].textContent == 'Remove from Mafia')
		{	
			inMafia = true;
		}
	}
	if (inMafia)
	{	
		var recipientNameBox = document.getElementById('recipientNameBox');
		var userNames = eval(GM_getValue('userNames', []));
		var userIDs = eval(GM_getValue('userIDs', []));
		var newSpot = userNames.length;
		var isDuplicate = false;
		for (var i = 0; i < userIDs.length; i++)
		{
			if (recipientNameBox.title == userIDs[i])
			{
				isDuplicate = true;
			}
		}
		if (isDuplicate)
		{
			alert('You have already saved this recipient');
		}
		else
		{
			userNames[newSpot] = recipientNameBox.value;
			userIDs[newSpot] = recipientNameBox.title;
			GM_setValue('userNames', uneval(userNames));
			GM_setValue('userIDs', uneval(userIDs));
			alert('Mafia Name:' + recipientNameBox.value + '\nMafia ID:' + recipientNameBox.title + '\nNow going to the gifting page.');
			window.location.href = 'http://mwms.zynga.com/mwms/remote/html_server.php?xw_controller=gift&xw_exp_sig=ec00bcc9b938a3f15b82a0cc27368990&xw_time=1258665802&xw_action=view&xw_city=1&tmp=eac61f5cce5d491964a3059e464d0573&xhd=1258665802&lwh=3491560558&city=2';
		}
	}
	else
	{
		alert('Mafia is not a member of your family\nThey cannot be added as a recipient');
	}
}

function btnLoot(){showTable('app110226_table_loot');document.getElementById('app110226_gift_category').value = '1';}

function btnCollections(){showTable('app110226_table_collection');document.getElementById('app110226_gift_category').value = '0';}

function btnBoosts(){showTable('app110226_table_expendables');document.getElementById('app110226_gift_category').value = '2';}

function btnAllCategories(){showTable('all');}

function btnSettingss(){showTable('settingsTable');}

function btnSendingProgress(){showTable('sendingTable');}

function showTable(table)
{
	var tablesArray = new Array(document.getElementById('app110226_table_loot'),
								document.getElementById('app110226_table_collection'),
								document.getElementById('app110226_table_expendables'),
								document.getElementById('settingsTable'),
								document.getElementById('sendingTable'));
	for (var i = 0; i < tablesArray.length; i++)
	{
		if ((tablesArray[i].id == table) || (table == 'all' && tablesArray[i].id != 'settingsTable'))
		{
			tablesArray[i].style.display = 'block';
		}
		else
		{
			tablesArray[i].style.display = 'none';
		}
	}
}

function btnExecute() {buildSendList('All');}

function btnExecuteCategory() {buildSendList('Category');}

function btnExecuteSingle() {buildSendList('Single');}

function btnCancelSend(){document.getElementById('btnCancelSend').textContent = 'Send Cancelled';}

function btnDeleteCurrent()
{
	var recipientList = document.getElementById('recipientList');
	recipientList.remove(recipientList.selectedIndex);
	var userNames = new Array();
	var userIDs = new Array();
	for (var i = 0; i < recipientList.length; i++)
	{
		userNames[i] = recipientList.childNodes[i].value;
		userIDs[i] = recipientList.childNodes[i].id;
	}
	GM_setValue('userNames', uneval(userNames));
	GM_setValue('userIDs', uneval(userIDs));	
}

function btnDefaultCurrent()
{
	var recipientList = document.getElementById('recipientList');
	var userNames = new Array();
	var userIDs = new Array();
	userNames[0] = recipientList.childNodes[recipientList.selectedIndex].value;
	userIDs[0] = recipientList.childNodes[recipientList.selectedIndex].id;
	for (var i = 0; i < recipientList.length; i++)
	{
		if (i == recipientList.selectedIndex)
		{
			continue;
		}
		else
		{
			userNames[userNames.length] = recipientList.childNodes[i].value;
			userIDs[userIDs.length] = recipientList.childNodes[i].id;
		}
	}
	GM_setValue('userNames', uneval(userNames));
	GM_setValue('userIDs', uneval(userIDs));
}

function btnCheckNow(){updateCheck(true);}

function btnAutoUpdate()
{
	var btn = document.getElementById('btnAutoUpdate');
	btn.textContent=(btn.textContent=='AutoUpdate On')?'AutoUpdate Off':'AutoUpdate On';
	GM_setValue('autoUpdate', btn.textContent);
} 

function txtWindowHeight()
{
	var txtWindowHeight = document.getElementById('txtWindowHeight');
	if (txtWindowHeight.value < 415)
	{
		txtWindowHeight.value = 415;
	}
	if (txtWindowHeight.value > 1000)
	{
		txtWindowHeight.value = 1000;
	}
	GM_setValue('windowHeight', txtWindowHeight.value);
}

function btnSaveQuantities()
{
	var keeps = eval(GM_getValue('keeps', []));
	var inputElements = document.getElementsByClassName('EGtextBox');
	var saved = false;
	for (var i = 0, j = inputElements.length; i < j; i++)
	{
		saved = false;
		for (var k = 0; k < keeps.length; k++)
		{
			if (keeps[k][0] == inputElements[i].id)
			{
				keeps[k][1] = inputElements[i].value;
				saved = true;
				break;
			}
		}
		if (!saved)
		{
			keeps[keeps.length] = [inputElements[i].id, inputElements[i].value];
		}
	}	
	GM_setValue('keeps', uneval(keeps));
	alert('Quantities have been saved');
}

function btnResetQuantities()
{
	var defaultInputValue = document.getElementById('txtDefaultTextValue').value;
	var inputElements = document.getElementsByClassName('EGtextBox');
	var keeps = [];
	for (var i = 0, j = inputElements.length; i < j; i++)
	{
		inputElements[i].value = defaultInputValue;
		keeps[keeps.length] = [inputElements[i].id, defaultInputValue];
	}
	GM_setValue('defaultTextValue', defaultInputValue);
	GM_setValue('keeps', uneval(keeps));
	alert('All quantities have been set to ' + defaultInputValue + ' and saved');
}

function btnSendMode()
{
	var btn = document.getElementById('btnSendMode');
	btn.textContent=(btn.textContent=='Keep Quantities')?'Send Quantities':'Keep Quantities';
	var textElements = document.getElementsByClassName('EGinputText');
	for (var i = 0, l = textElements.length; i < l; i++)
	{
		textElements[i].textContent = btn.textContent.substr(0,4) + ':';
	}

	GM_setValue('sendMode', btn.textContent);
}

function btnAutoRefresh()
{
	var btn = document.getElementById('btnAutoRefresh');
	btn.textContent=(btn.textContent=='AutoRefresh On')?'AutoRefresh Off':'AutoRefresh On';
	GM_setValue('autoRefresh', btn.textContent);
}

function btnAutoExecute()
{
	var btn = document.getElementById('btnAutoExecute');
	btn.textContent=(btn.textContent=='AutoExecute On')?'AutoExecute Off':'AutoExecute On';
	GM_setValue('autoExecute', btn.textContent);
}

function txtAutoExecuteDelay(){GM_setValue('autoExecuteDelay', document.getElementById('txtAutoExecuteDelay').value);}

function txtSendingDelay(){GM_setValue('sendingDelay', document.getElementById('txtSendingDelay').value);}

function isArray(obj){if(obj.constructor.toString().indexOf("Array")==-1)return false;else return true;}

function refreshGiftingPage(){allElements=document.getElementsByTagName('A');for(var i=0;i<allElements.length;i++){if(allElements[i].text=='Gifting'){clickElement(allElements[i]);}}}

function clickElement(elt){var evt=document.createEvent('MouseEvents');evt.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);elt.dispatchEvent(evt);}

function trim(str){return str.replace(/^\s+|\s+$|\&quot;|["]/g,'');}

