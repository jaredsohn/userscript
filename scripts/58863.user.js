// ==UserScript==
// @name		Enhanced Gifter (Development)
// @description		Gets rid of loot you do not want
// @include   		http://mwfb.zynga.com/*
// @version		11.13.09
// @contributor		Leyline
// ==/UserScript==

window.setInterval(setupPage, 6000);
setupPage();

var sendList = [];
var recipient;
var executionInProgress = false;

//=========================================SENDING METHODS===================================================================
function setupExecution()
{
	var recipientList = document.getElementById('recipientList');
	recipient = recipientList.childNodes[recipientList.selectedIndex].id;

	sendList = [];
	var toSendQty = 0;
	var arrElemID = [];
	var inputElements = document.getElementsByClassName('EGtextBox');
	var category = document.getElementById('gift_category').value;
	for (var i = 0, j = inputElements.length; i < j; i++)
	{
		if (document.getElementById('btnSendMode').textContent == 'Keep Quantities') 
		{
			toSendQty = inputElements[i].getAttribute('EGonHand') - inputElements[i].value;
		}
		else
		{
			toSendQty = inputElements[i].value;
		}
		arrElemID = inputElements[i].id.split(':');
		if (toSendQty > 0)
		{
			arrElemID[3] = toSendQty;
			sendList[sendList.length] = arrElemID;
		}
	}
	if (sendList.length > 0)
	{
		execute();
	}
}

function execute()
{
	var gift = 'item_box_'+ sendList[0][1] + '_' + sendList[0][2];
	var giftBox = document.getElementById(gift);
	clickElement(giftBox);
	clickElement(document.getElementById('cb_recip_' + recipient));
	clickElement(document.getElementsByClassName('sexy_gift')[0]);
}

function checkIfReady()
{
	var ready = false;
	if (document.getElementsByClassName('message_body')[0])
	{
		var messageBox = document.getElementsByClassName('message_body')[0];
		if (messageBox.textContent != 'Continuing with next item')
		{
			sendList[0][3]--;
			messageBox.textContent = 'Continuing with next item';
			ready = true;
		}
	}
	while ((sendList[0][3] < 1) && (sendList.length > 1))
	{
		sendList = sendList.slice(1);
	}
	if ((sendList[0][3] == 0) & (sendList.length == 1))
	{
		if (document.getElementsByClassName('message_body')[0])
		{
			var messageBox = document.getElementsByClassName('message_body')[0];
			messageBox.textContent = 'Done Sending';
		}
		executionInProgress = false;
		ready = false;
	}
	if (ready)
	{
		execute();
	}
}

//=========================================SETUP PAGE========================================================================
function setupPage()
{
	if (executionInProgress)
	{
		checkIfReady();
	}
	else
	{
		if ((document.getElementById('gift_send')) && (!document.getElementById('divViews')))
		{
			enhanceGiftingPage();
			setupQtyInputs();
			attachMethods();
		}
		else
		{
			enhanceProfilePage();
		}
	}
}

function enhanceGiftingPage()
{
	var userNames = eval(GM_getValue('userNames', []));
	var userIDs = eval(GM_getValue('userIDs', []));
	var windowHeight = GM_getValue('windowHeight', '600');
	var sexyElements = document.getElementsByClassName('sexy_button gift_category_button');
	sexyElements[0].parentNode.innerHTML = 
		'<div style="width: 160px; height: 225px;" id="divViews"></div>'+
		'<div style="width: 160px; height: 60px;" id="divRecipients"></div>'+
		'<div style="width: 160px; height: 160px;" id="divActions"></div>'+
		'<div style="width: 160px; height: ' + (windowHeight - 458) +'px;" id="divLog"/>';
	document.getElementById('divViews').innerHTML = '============== View:'+
		'<a class="sexy_button gift_category_button" style="width: 130px;" id="btnLoot">Loot</a>'+
		'<a class="sexy_button gift_category_button" style="width: 130px;" id="btnCollections">Collections</a>'+
		'<a class="sexy_button gift_category_button" style="width: 130px;" id="btnBoosts">Boosts</a>'+
		'<a class="sexy_button gift_category_button" style="width: 130px;" id="btnAllCategories">All Categories</a>'+
		'<a class="sexy_button gift_category_button" style="width: 130px;" id="btnSettings">Settings</a>'+
		'<a class="sexy_button gift_category_button" style="width: 130px;" id="btnSendingProgress">Sending Progress</a>';
	document.getElementById('divRecipients').innerHTML = '============== Recipient:'+
		'<select style="width: 142px; margin-bottom: 4px; margin-right: 8px;" id="recipientList"></select>';
	document.getElementById('divActions').innerHTML = '============== Action:'+
		'<a title="Sends the loot items" class="sexy_button gift_category_button" style="width: 130px;" id="btnExecute">Execute</a>'+
		'<a title="Sends the displayed loot" class="sexy_button gift_category_button" style="width: 130px;" id="btnExecuteCategory">Execute Category</a>'+
		'<a title="Sends the highlighted loot" class="sexy_button gift_category_button" style="width: 130px;" id="btnExecuteSingle">Execute Single</a>'+
		'<a title="Stops Sending" class="sexy_button gift_category_button" style="width: 130px;" id="btnCancelSend">Cancel Send</a>';
	document.getElementById('table_collection').parentNode.innerHTML += 
		'<div style="display: none;" id="table_settings"></div>'+
		'<div style="display: none;" id="table_sending"></div>';
	document.getElementById('table_settings').innerHTML = 
		'<table style="vertical-align: text-top"><tbody>'+
		'<tr style="height: 150px; vertical-align: text-top">'+
		
		'<td style="width: 175px;"><h3>Manage Recipients</h3><br/>'+
		'<a title="Delete the currently displayed recipient" class="sexy_button gift_category_button" style="width: 130px;" id="btnDeleteCurrent">Delete Current</a><br/>'+
		'<a title="Make the currently displayed recipient default" class="sexy_button gift_category_button" style="width: 130px;" id="btnDefaultCurrent">Default Current</a></td>'+
		
		'<td style="width: 175px;"><h3>Manage Quantities</h3><br/>'+
		'<a title="Saves all values in the text boxes" class="sexy_button gift_category_button" style="width: 130px;" id="btnSaveQuantities">Save Quantities</a><br/>'+
		'<a title="Resets all the text boxes to value in text box and saves" class="sexy_button gift_category_button" style="width: 130px;" id="btnResetQuantities">Reset Quantities</a><br/>'+
		'<span>Resetvalue:</span><input style="border-color: black; background: rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(188, 210, 234); text-align: right;" size="2" id="txtDefaultTextValue"/></td>'+
		
		'</tr>'+
		'<tr style="height: 150px; vertical-align: text-top">'+
		
		'<td style="width: 175px;"><h3>Sending Options</h3><br/>'+
		'<a title="Will Keep/Send the value in each box" class="sexy_button gift_category_button" style="width: 130px;" id="btnSendMode">'+GM_getValue('sendMode', 'Keep Quantities')+'</a><br/>'+
		'<a title="Autorefresh reloads this page after sending is complete" class="sexy_button gift_category_button" style="width: 130px;" id="btnAutoRefresh">'+GM_getValue('autoRefresh', 'AutoRefresh Off')+'</a><br/>'+
		'<a title="Beta testing" class="sexy_button gift_category_button" style="width: 130px;" id="btnAutoExecute">'+GM_getValue('autoExecute', 'AutoExecute Off')+'</a><br/>'+
		'<span>AutoExecute Delay:</span><input style="border-color: black; background: rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(188, 210, 234); text-align: right;" size="2" id="txtAutoExecuteDelay" title="delay in minutes"/><br></td>'+
		
		'<td style="width: 175px;"><h3>Appearence Options</h3><br/>'+
		'<span>Window Height:</span><input style="border-color: black; background: rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(188, 210, 234); text-align: right;" size="2" id="txtWindowHeight" title="height in pixels \nRefresh to see changes"/></td>'+
		
		'</tr>'+
		'<tr><td colspan=2>====================================<br/>'+
		'Settings are saved instantly.<br/>'+
		'Click a loot type button on the left to return.</td></tr>'+
		'</tbody></table>';
	document.getElementById('table_collection').parentNode.style.height = windowHeight + 'px';
	recipientList = document.getElementById('recipientList');
	for (var i = 0; i < userNames.length; i++)
	{
		recipientList.innerHTML += '<option id="' + userIDs[i] + '" title="' + userIDs[i] + '">' + userNames[i] + '</option>';
	}
	document.getElementById('txtDefaultTextValue').value = GM_getValue('defaultTextValue', 'Skip');
	document.getElementById('txtAutoExecuteDelay').value = GM_getValue('autoExecuteDelay', '60');
	document.getElementById('txtWindowHeight').value = GM_getValue('windowHeight', '600');
}

function setupQtyInputs() 
{
	var lootTable = document.getElementById('table_loot');
	var boostsTable = document.getElementById('table_expendables');
	var collectionsTable = document.getElementById('table_collection');
	
	var divElements = lootTable.getElementsByTagName('DIV');
	var divElementsB = boostsTable.getElementsByTagName('DIV');
	var divElementsC = collectionsTable.getElementsByTagName('DIV');

	var keeps = eval(GM_getValue('keeps', []));
	for (var i = 0; i < divElements.length; i++)
	{
		if (/item_box/.test(divElements[i].id))
		{
			makeGiftQtyInput(divElements[i]);
		}
	}
	for (var i = 0; i < divElementsB.length; i++)
	{
		if (/item_box/.test(divElementsB[i].id))
		{
			makeGiftQtyInput(divElementsB[i]);
		}
	}
	for (var i = 0; i < divElementsC.length; i++)
	{
		if (/item_box/.test(divElementsC[i].id))
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
					trim(parElement.childNodes[0].textContent) + ':' + parElement.id.charAt(9) + ':' + parElement.id.substr(11) + '" egonhand="' + 
					parElement.childNodes[2].textContent.substring(1) + '"/></td></tr></tbody></table>';
	parElement.innerHTML += tableHTML;
	parElement.style.height = '150px';
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
	document.getElementById('txtAutoExecuteDelay').addEventListener('change', txtAutoExecuteDelay, false);
	document.getElementById('txtWindowHeight').addEventListener('change', txtWindowHeight, false);
	
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
				var profileTab = allElements[i];
				var profileLink = profileTab.childNodes[0];
				
				var match=/user=(\d+)/.exec(profileLink.href).toString();
				var comma = match.indexOf(',');
				comma++;
				
				profileTab.parentNode.parentNode.innerHTML += 
					'<li class="tab_off tab_last"><div class="tab_content" style="width: 220px;">'+
					'<a id="addAsRecipient">Add as recipient</a>'+
					'<input style="border-color: black; background: rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(188, 210, 234);" size="30" class="EGtextBox" title="' + match.substring(comma) + '" id="recipientNameBox"/>'+
					'</div></li>';
				document.getElementById('recipientNameBox').value = profileTab.childNodes[2].textContent.replace(/[()]/g, '');
				document.getElementById('addAsRecipient').addEventListener('click', saveRecipient, true);
			}
		}
	}
}

//=========================================BUTTON METHODS====================================================================

function btnLoot(){showTable('table_loot');document.getElementById('gift_category').value = '1';}

function btnCollections(){showTable('table_collection');document.getElementById('gift_category').value = '0';}

function btnBoosts(){showTable('table_expendables');document.getElementById('gift_category').value = '2';}

function btnAllCategories(){showTable('all');}

function btnSettingss(){showTable('table_settings');}

function btnSendingProgress(){showTable('table_sending');}

function showTable(table)
{
	var tablesArray = new Array(document.getElementById('table_collection'),
								document.getElementById('table_loot'),
								document.getElementById('table_expendables'),
								document.getElementById('table_settings'),
								document.getElementById('table_sending'));
	for (var i = 0; i < tablesArray.length; i++)
	{
		if ((tablesArray[i].id == table) || (table == 'all' && tablesArray[i].id != 'table_settings'))
		{
			tablesArray[i].style.display = 'block';
		}
		else
		{
			tablesArray[i].style.display = 'none';
		}
	}
}

function btnExecute() {executionInProgress = 'All'; setupExecution();}

function btnExecuteCategory() {executionInProgress = 'Category'; setupExecution();}

function btnExecuteSingle() {executionInProgress = 'Single'; setupExecution();}

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
			window.location.href = 'http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=gift&xw_action=view&xw_city=2';
		}
	}
	else
	{
		alert('Mafia is not a member of your family\nThey cannot be added as a recipient');
	}
}

//=========================================HELPER METHODS====================================================================
function isArray(obj){if(obj.constructor.toString().indexOf("Array")==-1)return false;else return true;}

function refreshGiftingPage(){allElements=document.getElementsByTagName('A');for(var i=0;i<allElements.length;i++){if(allElements[i].text=='Gifting'){clickElement(allElements[i]);}}}

function clickElement(elt){var evt=document.createEvent('MouseEvents');evt.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);elt.dispatchEvent(evt);}

function trim(str){return str.replace(/^\s+|\s+$|\&quot;|["]/g,'');}

