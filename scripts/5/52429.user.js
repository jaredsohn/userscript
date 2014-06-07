// ==UserScript==
// @name			Enhanced Gifter
// @description		Gets rid of loot you do not want
// @include   		http://mwfb.zynga.com/*
// @version			pre3.0.0
// @contributor		Leyline
// ==/UserScript==

window.setInterval(watcher, 4000);

var sendList = [];
var recipient;
var executionInProgress = false;

enhanceGiftingPage();

function watcher()
{
	if (executionInProgress)
	{
		sendItem();
	}
	else
	{
		enhanceGiftingPage();
		enhanceProfilePage();
	}
}
//=========================================SENDING METHODS===================================================================
function sendItem()
{
	if (document.getElementsByClassName('message_body')[0])
	{
		if (/You gave/.test(document.getElementsByClassName('message_body')[0].textContent))
		{
			sendList[0][3]--;
			var messages = document.getElementsByClassName('message_body');
			updateSendingSummery(messages[0].textContent);
			messages[0].textContent = 'Continuing';
			//cleanup the send list
			while ((sendList[0][3] < 1) && (sendList.length > 1))
			{
				sendList = sendList.slice(1);
			}
			if ((sendList[0][3] == 0) & (sendList.length == 1))
			{
				executionInProgress = false;
				messages[0].textContent = 'Done';
			}
			else
			{
				var gift = 'item_box_'+ sendList[0][1] + '_' + sendList[0][2];
				clickElement(document.getElementById(gift));
				clickElement(document.getElementById('cb_recip_' + recipient));
				clickElement(document.getElementsByClassName('sexy_gift')[0]);
			}
		}
	}
}

function setupExecution(method)
{
	var recipientList = document.getElementById('recipientList');
	recipient = recipientList.childNodes[recipientList.selectedIndex].id;
	makeSendList(method);
	initializeSendingSummery();
	//priming send
	if (sendList.length > 0)
	{
		executionInProgress = true;
		var gift = 'item_box_'+ sendList[0][1] + '_' + sendList[0][2];
		clickElement(document.getElementById(gift));
		clickElement(document.getElementById('cb_recip_' + recipient));
		clickElement(document.getElementsByClassName('sexy_gift')[0]);
	}
	else
	{
		executionInProgress = false;
	}
}

function makeSendList(method)
{
	//clear Send List
	sendList = [];
	var toSendQty = 0;
	var arrElemID = [];
	var category = document.getElementById('gift_category').value;
	var inputElements = document.getElementsByClassName('EGtextBox');
	for (var i = 0, j = inputElements.length; i < j; i++)
	{
		if (document.getElementById('chkKeepQuantities').checked) 
		{
			toSendQty = inputElements[i].getAttribute('EGonHand') - inputElements[i].value;
		}
		else
		{
			//fixes if user is trying to send more than on hand
			toSendQty = Math.min(inputElements[i].value, inputElements[i].getAttribute('EGonHand'));
		}
		arrElemID = inputElements[i].id.split(':');
		if((toSendQty > 0) &&((method == 'All')||
			((method == 'Category') && (arrElemID[1] == category))||
			((method == 'Single') && (inputElements[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.border == '1px solid rgb(255, 255, 0)') && (arrElemID[1] == category))))
		{
			arrElemID[3] = toSendQty;
			sendList[sendList.length] = arrElemID;
		}
	}
}

function initializeSendingSummery()
{
	var totalCount = 0;
	for (var i = 0; i < sendList.length; i++)
	{
		totalCount += sendList[i][3];
	}
	var divHTML = 
		'<div id="divSending" style="position: absolute; top: 20px; left: 180px; width: 400px; text-align: center; z-index: 100;">'+
		'<div class="action_box_container" style="width: 400px; height: 400px; margin-top: 5px;"><div class="round_border_1" style'+
		'="width: 392px;"></div><div class="round_border_2" style="width: 394px;"></div><div class="round_border_3" style="width: '+
		'396px;"></div><div class="action_box" style="height: 395px;"><div style="position: relative;"><div><div class="job_title"'+
		'></div><table style="margin-left: 10px;"><tbody><tr style="height: 40px;"><td colspan="2"><div class="business_progress_b'+
		'ar_outside" style="margin-left: 18px;"><div id="progressBar" style="width: 0px; background-image: url(&quot;http://mwfb.'+
		'static.zynga.com/mwfb/graphics/bangkok_progress_fish_380x26_01.jpg&quot;);" class="business_progress_bar_inside business_'+
		'progress_bar_inside_partial"></div><div class="business_progress_bar_current_stock" currentCount="0" totalCount="'+
		totalCount+'">Progress: 0 / '+totalCount+'</div></div></td></tr><tr><td><div style="height: 300px; width: 390px;"><table><'+
		'tbody><tr><td style="width: 242px;">Item Name</td><td style="width: 55px;">Pending</td><td style="width: 55px;">Sent</td>'+
		'</tr>';
	for (var i = 0; i < sendList.length; i++)
	{
		divHTML += '<tr><td>'+sendList[i][0]+'</td><td id="pending'+sendList[i][0]+'">'+sendList[i][3]+'</td><td id="sent'+sendList[i][0]+'">0</td></tr>';
	}
	divHTML +=
		'</tbody></table></div></td></tr><tr><td><a id="btnClose" style="cursor: pointer;" class="sexy_button_new short_black"><sp'+
		'an><span><span>Close</span></span></span></a></td></tr></tbody></table></div></div></div><div class="round_border_3" styl'+
		'e="width: 396px;"></div><div class="round_border_2" style="width: 394px;"></div><div class="round_border_1" style="width:'+
		'392px;"></div></div></div>';
	document.getElementById('verytop').innerHTML += divHTML
	document.getElementById('btnClose').addEventListener('click', btnClose, false);
}

function updateSendingSummery(message)
{
	var start = 11;
	if (message.charAt(10) == 'n')
	{
	start++;
	}
	var item = trim(message.substring(start, message.indexOf(' to ')));
	document.getElementById('pending'+item).textContent--;
	document.getElementById('sent'+item).textContent++;
	var progressBar = document.getElementById('progressBar');
	var currentCount = progressBar.nextSibling.getAttribute('currentcount');
	currentCount++;
	var totalCount = progressBar.nextSibling.getAttribute('totalcount')
	progressBar.nextSibling.setAttribute('currentcount', currentCount);
	progressBar.nextSibling.textContent = 'Progress: '+currentCount+' / '+totalCount;
	var width = 360 * currentCount / totalCount
	progressBar.style.width = width+'px';
}

//=========================================SETUP PAGE========================================================================
function enhanceGiftingPage()
{
	if ((document.getElementById('gift_send')) && (!document.getElementById('enhanced')))
	{
		setupMainUI();
		setupQtyInputs();
		attachMethods();
	}
}

function setupMainUI()
{
	var userNames = eval(GM_getValue('userNames', []));
	var userIDs = eval(GM_getValue('userIDs', []));
	var windowHeight = GM_getValue('txtWindowHeight', '600');
	var sexyElements = document.getElementsByClassName('sexy_button gift_category_button');
	//used to check if page has been enahanced
	sexyElements[0].parentNode.id = 'enhanced';
	//adjust window height based on setting
	document.getElementById('table_collection').parentNode.style.height = windowHeight + 'px';
	//left TD code
	var enhancedHTML =
		'<div style="width: 155px; height: 172px; margin-top: 5px;" class="action_box_container"><div style="width: 147px;" class="ro'+
		'und_border_1"></div><div style="width: 149px;" class="round_border_2"></div><div style="width: 151px;" class="round_border_3'+
		'"></div><div style="height: 167px;" class="action_box"><div style="position: relative;"><div><div class="job_title">View</di'+
		'v><table style="margin-left: 1px;"><tbody><tr><a class="sexy_button_new short_black" style="cursor: pointer; width: 145px;" '+
		'id="btnLoot"><span><span><span>Loot</span></span></span></a></tr><tr><a class="sexy_button_new short_black" style="cursor: p'+
		'ointer; width: 145px;" id="btnCollections"><span><span><span>Collections</span></span></span></a></tr><tr><a class="sexy_but'+
		'ton_new short_black" style="cursor: pointer; width: 145px;" id="btnBoosts"><span><span><span>Boosts</span></span></span></a>'+
		'</tr><tr><a class="sexy_button_new short_black" style="cursor: pointer; width: 145px;" id="btnAllCategories"><span><span><sp'+
		'an>All Categories</span></span></span></a></tr><tr><a class="sexy_button_new short_black" style="cursor: pointer; width: 145'+
		'px;" id="btnSettings"><span><span><span>Settings</span></span></span></a></tr></tbody></table></div></div></div><div style="'+
		'width: 151px;" class="round_border_3"></div><div style="width: 149px;" class="round_border_2"></div><div style="width: 147px'+
		';" class="round_border_1"></div></div><div style="width: 155px; height: 53px; margin-top: 5px;" class="action_box_container"'+
		'><div style="width: 147px;" class="round_border_1"></div><div style="width: 149px;" class="round_border_2"></div><div style='+
		'"width: 151px;" class="round_border_3"></div><div style="height: 48px;" class="action_box"><div style="position: relative;">'+
		'<div><div class="job_title">Recipient</div><table style="margin-left: 1px;"><tbody><tr><select id="recipientList" style="wid'+
		'th: 142px; margin-bottom: 4px; margin-right: 8px;">';
	for (var i = 0; i < userNames.length; i++)
	{
		enhancedHTML += '<option id="' + userIDs[i] + '" title="' + userIDs[i] + '">' + userNames[i] + '</option>';
	}
	enhancedHTML += 
		'</select></tr></tbody></table></div></div></div><div style="width: 151px;" class="round_border_3"></div><div style="width: 1'+
		'49px;" class="round_border_2"></div><div style="width: 147px;" class="round_border_1"></div></div><div style="width: 155px; '+
		'height: 142px; margin-top: 5px;" class="action_box_container"><div style="width: 147px;" class="round_border_1"></div><div s'+
		'tyle="width: 149px;" class="round_border_2"></div><div style="width: 151px;" class="round_border_3"></div><div style="height'+
		': 137px;" class="action_box"><div style="position: relative;"><div><div class="job_title">Action</div><table style="margin-l'+
		'eft: 1px;"><tbody><tr><a class="sexy_button_new short_black" style="cursor: pointer; width: 145px;" id="btnExecute"><span><s'+
		'pan><span>Execute</span></span></span></a></tr><tr><a class="sexy_button_new short_black" style="cursor: pointer; width: 145'+
		'px;" id="btnExecuteCategory"><span><span><span>Execute Category</span></span></span></a></tr><tr><a class="sexy_button_new s'+
		'hort_black" style="cursor: pointer; width: 145px;" id="btnExecuteSingle"><span><span><span>Execute Single</span></span></spa'+
		'n></a></tr><tr><a class="sexy_button_new short_black" style="cursor: pointer; width: 145px;" id="btnCancelSend"><span><span>'+
		'<span>Cancel Send</span></span></span></a></tr></tbody></table></div></div></div><div style="width: 151px;" class="round_bor'+
		'der_3"></div><div style="width: 149px;" class="round_border_2"></div><div style="width: 147px;" class="round_border_1"></div'+
		'></div>';
	sexyElements[0].parentNode.innerHTML = enhancedHTML;
	//settings table code
	document.getElementById('table_collection').parentNode.innerHTML += 
		'<div id="table_settings" style="display:  none;"><table style="vertical-align: text-top; margin-left: 20px;"><tbody><tr styl'+
		'e="height: 180px;"><td style="width: 220px;"><div style="width: 200px; height: 150px; margin-top: 5px;" class="action_box_co'+
		'ntainer"><div style="width: 192px;" class="round_border_1"></div><div style="width: 194px;" class="round_border_2"></div><di'+
		'v style="width: 196px;" class="round_border_3"></div><div style="height: 145px;" class="action_box"><div style="position: re'+
		'lative;"><div><div class="job_title">Quantities</div><table style="margin-left: 10px;"><tbody><tr><td style="width: 130px;">'+
		'Save</td><td><input type="checkbox" id="chkSaveQuantities"></td></tr><tr><td style="width: 130px;">Reset</td><td><input type'+
		'="checkbox" id="chkResetQuantities"></td></tr><tr><td style="width: 130px;">Default Value</td><td><input id="txtResetValue" '+
		'style="border-color: black; background: none repeat scroll 0% 0% rgb(0, 0, 0); color: rgb(188, 210, 234);" size="2" value= "'+
		GM_getValue('txtResetValue', 'Skip')+'"></td></tr></tbody></table></div></div></div><div style="width: 196px;" class="round_b'+
		'order_3"></div><div style="width: 194px;" class="round_border_2"></div><div style="width: 192px;" class="round_border_1"></d'+
		'iv></div></td><td style="width: 220px;"><div style="width: 200px; height: 150px; margin-top: 5px;" class="action_box_contain'+
		'er"><div style="width: 192px;" class="round_border_1"></div><div style="width: 194px;" class="round_border_2"></div><div sty'+
		'le="width: 196px;" class="round_border_3"></div><div style="height: 145px;" class="action_box"><div style="position: relativ'+
		'e;"><div><div class="job_title">Recipients</div><table style="margin-left: 10px;"><tbody><tr><td style="width: 130px;">Defau'+
		'lt Current</td><td><input type="checkbox" id="chkDefaultCurrent"></td></tr><tr><td style="width: 130px;">Delete Current</td>'+
		'<td><input type="checkbox" id="chkDeleteCurrent"></td></tr><tr><td style="width: 130px;">Save From Below</td><td><input '+
		'type="checkbox" id="chkSaveRecipientsFromBelow"></td></tr></tbody></table></div></div></div><div style="width: 196px;" clas'+
		's="round_border_3"></div><div style="width: 194px;" class="round_border_2"></div><div style="width: 192px;" class="round_bor'+
		'der_1"></div></div></td></tr><tr style="height: 180px;"><td style="width: 220px;"><div style="width: 200px; height: 150px; m'+
		'argin-top: 5px;" class="action_box_container"><div style="width: 192px;" class="round_border_1"></div><div style="width: 194'+
		'px;" class="round_border_2"></div><div style="width: 196px;" class="round_border_3"></div><div style="height: 145px;" class='+
		'"action_box"><div style="position: relative;"><div><div class="job_title">Sending</div><table style="margin-left: 10px;"><tb'+
		'ody><tr><td style="width: 130px;">Keep Quantities</td><td><input type="checkbox" id="chkKeepQuantities" '+
		GM_getValue('chkKeepQuantities', 'checked')+'></td></tr><tr><td style="width: 130px;">Auto Execute</td><td><input type="check'+
		'box" id="chkAutoExecute"'+GM_getValue('chkAutoExecute', '')+'></td></tr><tr><td style="width: 130px;">Auto Execute Delay</td'+
		'><td><input id="txtAutoExecuteDelay" style="border-color: black; background: none repeat scroll 0% 0% rgb(0, 0, 0); color: r'+
		'gb(188, 210, 234);" size="2" value="'+GM_getValue('txtAutoExecuteDelay', '60')+'"></td></tr></tbody></table></div></div></di'+
		'v><div style="width: 196px;" class="round_border_3"></div><div style="width: 194px;" class="round_border_2"></div><div style'+
		'="width: 192px;" class="round_border_1"></div></div></td><td style="width: 220px;"><div style="width: 200px; height: 150px; '+
		'margin-top: 5px;" class="action_box_container"><div style="width: 192px;" class="round_border_1"></div><div style="width: 19'+
		'4px;" class="round_border_2"></div><div style="width: 196px;" class="round_border_3"></div><div style="height: 145px;" class'+
		'="action_box"><div style="position: relative;"><div><div class="job_title">Appearence</div><table style="margin-left: 10px;"'+
		'><tbody><tr><td style="width: 130px;">Window Height</td><td><input id="txtWindowHeight" value="'+
		GM_getValue('txtWindowHeight', '600')+'" style="border-color: black; background: none repeat scroll 0% 0% rgb(0, 0, 0); color'+
		': rgb(188, 210, 234);" size="2"></td></tr></tbody></table></div></div></div><div style="width: 196px;" class="round_border_3'+
		'"></div><div style="width: 194px;" class="round_border_2"></div><div style="width: 192px;" class="round_border_1"></div></di'+
		'v></td></tr></tbody></table><a class="sexy_button_new short_black" style="cursor: pointer; width: 70px; margin-left: 375px;"'+
		' id="btnSave"><span><span><span>Save</span></span></span></a></div>';
}

function setupQtyInputs() 
{
	//gets collection,loot,boost tables
	var lootTable = document.getElementById('table_loot');
	var boostsTable = document.getElementById('table_expendables');
	var collectionsTable = document.getElementById('table_collection');
	//gets each item box in those tables
	var divElements = lootTable.getElementsByTagName('DIV');
	var divElementsB = boostsTable.getElementsByTagName('DIV');
	var divElementsC = collectionsTable.getElementsByTagName('DIV');
	//adds a textbox to each item box
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
	//fill text boxes from GM saved data
	var keeps = eval(GM_getValue('keeps', []));
	for (var i = 0; i < keeps.length; i++)
	{
		if (document.getElementById(keeps[i][0]))
		{
			document.getElementById(keeps[i][0]).value= keeps[i][1];
		}
	}
	//for boxes w/ no saved data the Reset value is used
	var inputElements = document.getElementsByClassName('EGtextBox');
	var defaultInputValue = document.getElementById('txtResetValue').value;
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
	var option;
	if (document.getElementById('chkKeepQuantities').checked)
		{option = 'Keep';}
	else
		{option = 'Send';}
	parElement.innerHTML = parElement.innerHTML.replace(/[\t\r\n]/g, '');
	//adjust item box height for new content to fit
	parElement.style.height = '150px';
	//fill in new content
	parElement.innerHTML += 
		'<table><tbody><tr><td><div class="EGinputText">' + option + ':</div></td><td><input style="border-color: black; background: '+
		'rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline'+
		'-policy: continuous; color: rgb(188, 210, 234); text-align: right;" size="2" class="EGtextBox" id="' + 
		trim(parElement.childNodes[0].textContent) + ':' + parElement.id.charAt(9) + ':' + parElement.id.substr(11) + '" egonhand= "' + 
		parElement.childNodes[2].textContent.substring(1) + '"/></td></tr></tbody></table>';
}

function attachMethods()
{
	document.getElementById('btnLoot').addEventListener('click', btnLoot, false);
	document.getElementById('btnCollections').addEventListener('click', btnCollections, false);
	document.getElementById('btnBoosts').addEventListener('click', btnBoosts, false);
	document.getElementById('btnAllCategories').addEventListener('click', btnAllCategories, false);
	document.getElementById('btnSettings').addEventListener('click', btnSettingss, false);
	document.getElementById('btnExecute').addEventListener('click', btnExecute, false);
	document.getElementById('btnExecuteCategory').addEventListener('click', btnExecuteCategory, false);
	document.getElementById('btnExecuteSingle').addEventListener('click', btnExecuteSingle, false);
	document.getElementById('btnCancelSend').addEventListener('click', btnCancelSend, false);
	document.getElementById('btnSave').addEventListener('click', btnSave, false);
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
					'<li class="tab_off tab_last"><div class="tab_content" style="width: 160px;">'+
					'<a id="addAsRecipient">Add as recipient</a>'+
					'<input style="border-color: black; background: rgb(0, 0, 0) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(188, 210, 234);" size="20" class="EGtextBox" title="' + match.substring(comma) + '" id="recipientNameBox"/>'+
					'</div></li>';
				document.getElementById('recipientNameBox').value = profileTab.childNodes[2].textContent.replace(/[()]/g, '');
				document.getElementById('addAsRecipient').addEventListener('click', btnSaveRecipient, true);
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

function showTable(table)
{
	var tablesArray = new Array(document.getElementById('table_collection'),
								document.getElementById('table_loot'),
								document.getElementById('table_expendables'),
								document.getElementById('table_settings'));
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

function btnExecute() {setupExecution('All');}

function btnExecuteCategory() {setupExecution('Category');}

function btnExecuteSingle() {setupExecution('Single');}

function btnCancelSend(){executionInProgress = false; alert('Sending stopped');}

function btnSave()
{
	//txtResetValue()
	GM_setValue('txtResetValue', document.getElementById('txtResetValue').value);
	//txtAutoExecuteDelay()
	GM_setValue('txtAutoExecuteDelay', document.getElementById('txtAutoExecuteDelay').value);
	//txtWindowHeight()
	GM_setValue('txtWindowHeight', document.getElementById('txtWindowHeight').value);
	//chkKeepQuantities()
	var chk = document.getElementById('chkKeepQuantities');
	GM_setValue('chkKeepQuantities', checked(chk));
	//chkAutoExecute()
	var chk = document.getElementById('chkAutoExecute');
	GM_setValue('chkAutoExecute', checked(chk));
	//chkDeleteCurrent()
	if (document.getElementById('chkDeleteCurrent').checked)
	{
		var recipientList = document.getElementById('recipientList');
		recipientList.remove(recipientList.selectedIndex);
		var userNames = new Array();
		var userIDs = new Array();
		for (var i = 0; i < recipientList.length; i++)
			{userNames[i] = recipientList.childNodes[i].value;userIDs[i] = recipientList.childNodes[i].id;}
		GM_setValue('userNames', uneval(userNames));
		GM_setValue('userIDs', uneval(userIDs));
	}
	//chkDefaultCurrent()
	if (document.getElementById('chkDefaultCurrent').checked)
	{
		var recipientList = document.getElementById('recipientList');
		var userNames = new Array();
		var userIDs = new Array();
		userNames[0] = recipientList.childNodes[recipientList.selectedIndex].value;
		userIDs[0] = recipientList.childNodes[recipientList.selectedIndex].id;
		for (var i = 0; i < recipientList.length; i++)
		{
			if (i != recipientList.selectedIndex)
			{
				userNames[userNames.length] = recipientList.childNodes[i].value;
				userIDs[userIDs.length] = recipientList.childNodes[i].id;
			}
		}
		GM_setValue('userNames', uneval(userNames));
		GM_setValue('userIDs', uneval(userIDs));
	}
	//chkSaveRecipientsFromBelow
	if (document.getElementById('chkSaveRecipientsFromBelow').checked)
	{
		var inputElements = document.getElementById('gift_send').getElementsByTagName('INPUT');
		for (var i = 0; i < inputElements.length; i++)
		{
			if (inputElements[i].checked)
			{
				saveRecipient(inputElements[i].value, trim(inputElements[i].nextSibling.textContent))
			}
		}
	}
	//chkResetQuantities
	if (document.getElementById('chkResetQuantities').checked)
	{
		var txtResetValue = document.getElementById('txtResetValue').value;
		var inputElements = document.getElementsByClassName('EGtextBox');
		for (var i = 0, j = inputElements.length; i < j; i++)
			{inputElements[i].value = txtResetValue;}
	}
	//chkSaveQuantities()
	if (document.getElementById('chkSaveQuantities').checked)
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
	}
	alert('Settings Saved');
}

function btnSaveRecipient()
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
		if (saveRecipient(recipientNameBox.title, recipientNameBox.value))
		{
			alert('Mafia Name:' + recipientNameBox.value + '\nMafia ID:' + recipientNameBox.title + '\nNow going to the gifting page.');
		}
		else
		{
			alert('You have already saved this recipient');
		}
	}
	else
	{
		alert('Mafia is not a member of your family\nThey cannot be added as a recipient');
	}
	window.location.href = 'http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=gift&xw_action=view&xw_city=2';
}

function saveRecipient(recipientID, recipientName)
{
	var userNames = eval(GM_getValue('userNames', []));
	var userIDs = eval(GM_getValue('userIDs', []));
	var newSpot = userNames.length;
	var isDuplicate = false;
	for (var i = 0; i < userIDs.length; i++)
	{
		if (recipientID == userIDs[i])
		{
			isDuplicate = true;
		}
	}
	if (!isDuplicate)
	{
		userNames[newSpot] = recipientName;
		userIDs[newSpot] = recipientID;
		GM_setValue('userNames', uneval(userNames));
		GM_setValue('userIDs', uneval(userIDs));
		return true;
	}
	else
	{
		return false;
	}
}

function btnClose()
{
	document.getElementById('divSending').parentNode.removeChild(document.getElementById('divSending'));
}

//=========================================HELPER METHODS====================================================================
function isArray(obj){if(obj.constructor.toString().indexOf("Array")==-1)return false;else return true;}

function refreshGiftingPage(){allElements=document.getElementsByTagName('A');for(var i=0;i<allElements.length;i++){if(allElements[i].text=='Gifting'){clickElement(allElements[i]);}}}

function checked(chk){if (chk.checked){return 'checked';}else{return '';}}

function clickElement(elt){var evt=document.createEvent('MouseEvents');evt.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);elt.dispatchEvent(evt);}

function trim(str){return str.replace(/^\s+|\s+$|\&quot;|["]/g,'');}