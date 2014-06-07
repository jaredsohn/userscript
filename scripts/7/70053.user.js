// ==UserScript==
// @name          Enhanced Gifter
// @description   Gets rid of loot you do not want
// @include   http://apps.facebook.com/inthemafia/*
// @include   http://apps.new.facebook.com/inthemafia/*
// @version   8.02.09
// ==/UserScript==

GM_registerMenuCommand('EG - Save Recipient Info', saveRecipientInfo);

var currentItem;
var singleGiftID;
var singleGiftQuanity;
var autoButton;
var giftQuantity = new Array();
var keepQuantity = eval(GM_getValue('keepQuantity', []));
var giftName = new Array(".22 Pistol", "Butterfly Knife", "Brass Knuckles", "9mm Semi-Automatic", 
	".45 Revolver", "Tactical Shotgun", "C4", "Stab-Proof Vest", "Automatic Rifle", 
	"Semi-Automatic Shotgun", "Armored Truck", "Grenade Launcher", ".50 Caliber Rifle", 
	"Armored Car", "RPG Launcher", "Bodyguards", "Night Vision Goggles", "Napalm", 
	"Lucky Shamrock Medallion", "Firebomb", "Concealable Camera", "Computer Setup", 
	"Untraceable Cell Phone", "Blackmail Photos", "Prop Plane", "Harley Davidson", 
	"Illegal Transaction Records", "Luxury Yacht", "Porsche 911", "Bookie's Holdout Pistol", 
	"Humvee", "AR-15 Assault Rifle", "Falsified Documents", "Private Jet", "Police Cruiser", 
	"Armored Limousine", "Federal Agent", "Guerrilla Squad", "Mara Serpiente", "Chucho FAV", 
	"Ocelot Armored Truck", "Montaine 320", "Cigarette Boat", "Mini-Sub", "Si-14 Cargo Plane", 
	"Hu-9 Helicopter", "Armored State Car", "Garza 9", "RA-92", "M16A1", "Ru-38 Pistol", 
	"Cane Knife", "Para 322", "Gaff Hook", "ASC45 Conquistador", "Aguila HV .50 Sniper Rifle", 
	"TNT", "Street Gang Member", "Camouflage Body Armor", "Flintlock Pistols", "Bayonet", "Tri-Point Hat", 
	"Davy Crockett Hat", "Musket", "Saber", "Red Coat", "Cannon", "Politico Corrupto");

var giftID = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
						"11", "14", "15", "16", "17", "18", "19", "20", 
						"60", "61", "62", "63", "64", "65", "66", "67", 
						"68", "69", "70", "71", "72", "73", "74", "75", 
						"76", "77", "78", "174", "175", "176", "177", 
						"178", "179", "180", "181", "182", "183", "194", 
						"195", "196", "197", "198", "199", "200", "201", 
						"202", "203", "204", "205", "222", "223", "224", 
						"225", "226", "227", "228", "229", "245");


window.setInterval(function (){checkIfLootPage()}, 4000);
window.setInterval(function (){startAutoGift()}, 300000);

function startAutoGift()
{
	if (GM_getValue("autoGiftEnabled") == true)
	{
		//navigates to loot page
		window.location.href = "http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=loot&xw_action=view&xw_city=1";
		//waits 5 seconds
		window.setTimeout(clickExecute, 5000);
	}
}

function clickExecute()
{
	allElements = document.getElementsByTagName('A');
	for (var i = 0; i < allElements.length; i++)
	{
		thisElement = allElements[i];
		if(thisElement.textContent == 'Execute')
		{
			//clicks the execute button
			clickElement(thisElement);
		}
	}
}

function checkIfLootPage()
{
	allElements = document.getElementsByTagName('DIV');
	for (var i = 0; i < allElements.length; i++)
	{
		thisElement = allElements[i];
		if(thisElement.className == 'title')
		{	
			if(thisElement.textContent == 'Loot')
			{
				addElementsToPage(thisElement);
				fillInputBoxes();
			}
		}
	}
}

function addElementsToPage(thisElement)
{
	//alter top loot to stop a refesh
	thisElement.textContent = "Enhanced Gifting";
	
	var executeButton;
	var saveButton;
	anchorElements = document.getElementsByTagName('A');
	for (var i = 0; i < anchorElements.length; i++)
	{
		if(anchorElements[i].textContent == 'Send Gift')
		{	
			executeButton = anchorElements[i].cloneNode(true);
			executeButton.textContent = "Execute";
			executeButton.setAttribute('onclick', "");
			executeButton.removeAttribute("href");
			executeButton.addEventListener('click', function(event) 
			{
				execute();
				event.stopPropagation();
				event.preventDefault();
			}, true);
			i = anchorElements.length;
		}
	}
	anchorElements = document.getElementsByTagName('A');
	for (var i = 0; i < anchorElements.length; i++)
	{
		if(anchorElements[i].textContent == 'Add to Wishlist')
		{	
			saveButton = anchorElements[i].cloneNode(true);
			saveButton.textContent = "Save Quantities";
			saveButton.setAttribute('onclick', "");
			saveButton.removeAttribute("href");
			saveButton.addEventListener('click', function(event) 
			{
				save();
				event.stopPropagation();
				event.preventDefault();
			}, true);
			i = anchorElements.length;
		}
	}
	anchorElements = document.getElementsByTagName('A');
	for (var i = 0; i < anchorElements.length; i++)
	{
		if(anchorElements[i].textContent == 'Add to Wishlist')
		{	
			autoButton = anchorElements[i].cloneNode(true);
			autoButton.textContent = "AutoGift:" + GM_getValue("autoGiftEnabled");
			autoButton.setAttribute('onclick', "");
			autoButton.removeAttribute("href");
			autoButton.addEventListener('click', function(event) 
			{
				toggleAutoGift();
				event.stopPropagation();
				event.preventDefault();
			}, true);
			i = anchorElements.length;
		}
	}
	thisElement.appendChild(executeButton);
	thisElement.appendChild(saveButton);
	thisElement.appendChild(autoButton);
	//add text boxes and text
	allElements = document.getElementsByTagName('A');
	for (var i = 0; i < allElements.length; i++)
	{
		var newTextElement = document.createTextNode('---- Keep:');

		var newTextArea = document.createElement('INPUT');
		newTextArea.size = "2";
		thisElement = allElements[i];
		if (thisElement.text == "Send Gift")
		{
			thisElement.parentNode.parentNode.parentNode.firstChild.firstChild.appendChild(newTextElement);
			thisElement.parentNode.parentNode.parentNode.firstChild.firstChild.appendChild(newTextArea);
		}
	}
	highjackButtons();
}

function toggleAutoGift()
{
	if (GM_getValue("autoGiftEnabled") == false)
	{
		GM_setValue("autoGiftEnabled", true);
	}
	else
	{
		GM_setValue("autoGiftEnabled", false);
	}
	autoButton.textContent = "AutoGift:" + GM_getValue("autoGiftEnabled");
}

function highjackButtons()
{
	anchorElements = document.getElementsByTagName('A');
	for (var i = 0; i < anchorElements.length; i++)
	{
		if(anchorElements[i].textContent == 'Send Gift')
		{
			anchorElements[i].textContent = "Send Just This";
			anchorElements[i].setAttribute('onclick', "");
			anchorElements[i].addEventListener('click', function(event) 
			{
				singleGiftID = this.href.substring(this.href.lastIndexOf("=") + 1);
				singleGiftQuantity = Number(this.parentNode.parentNode.parentNode.firstChild.firstChild.firstChild.textContent.toString().substring(this.parentNode.parentNode.parentNode.firstChild.firstChild.firstChild.textContent.toString().indexOf(":") + 1) - this.parentNode.parentNode.parentNode.firstChild.firstChild.lastChild.value);
				preSendSingle()
				event.stopPropagation();
				event.preventDefault();
			}, true);
		}
	}
}

function preSendSingle()
{
	ifrm2 = document.createElement("IFRAME");
  	ifrm2.setAttribute("id","sendFrame2"); 
  	ifrm2.style.width = 10+"px"; 
  	ifrm2.style.height = 10+"px"; 
  	document.body.appendChild(ifrm2);
	sendSingle();
}

function sendSingle()
{
	while (singleGiftQuantity > 0)
	{
		ifrm2.setAttribute("src",'http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=gift&recipients[0]=' + 
			GM_getValue("userID") + '&gift_category=1&gift_id=' + singleGiftID + '&gift_key=' + GM_getValue("giftKey") + '&xw_action=send'); 
		top.document.title = 'Sending: '+ singleGiftQuantity;
		singleGiftQuantity--;
		if (singleGiftQuantity == 0)
		{
			top.document.title = 'Done Sending';
			window.setTimeout(refreshLootPage, 4000);
		}
		window.setTimeout(sendSingle, 4000);
		break;
	}
}

function refreshLootPage()
{
	allElements = document.getElementsByTagName('A');
	for (var j = 0; j < allElements.length; j++)
	{
		thisElement = allElements[j];
		if(thisElement.text == 'Loot')
		{	
			clickElement(thisElement);
		}
	}
}

function fillInputBoxes()
{
	allElements = document.getElementsByTagName('INPUT');
	for (var i = 0; i < allElements.length; i++)
	{
		currentInputBox = allElements[i];
		if (currentInputBox.size == 2)
		{
			try
			{
				var currentGiftID = currentInputBox.parentNode.parentNode.parentNode.lastChild.lastChild.lastChild.previousSibling.href.substring(currentInputBox.parentNode.parentNode.parentNode.lastChild.lastChild.lastChild.previousSibling.href.lastIndexOf("=") + 1);
			}
			catch(err)
			{
			}
			for (j = 0; j < giftID.length; j++)
			{
				if (currentGiftID == giftID[j])
				{
					if (keepQuantity[j] == undefined)
					{
						currentInputBox.value = "501";
					}
					else
					{
						currentInputBox.value = keepQuantity[j];
					}
				}
			}
		}
	}
}

function execute()
{
	ifrm = document.createElement("IFRAME");
  	ifrm.setAttribute("id","sendFrame"); 
  	ifrm.style.width = 10+"px"; 
  	ifrm.style.height = 10+"px"; 
  	document.body.appendChild(ifrm);
	
	var allElements = document.getElementsByTagName('INPUT');
	for (var i = 0; i < allElements.length; i++)
	{
		currentInputBox = allElements[i];
		if (currentInputBox.size == 2)
		{
			var currentGiftID = currentInputBox.parentNode.parentNode.parentNode.lastChild.lastChild.lastChild.previousSibling.href.substring(currentInputBox.parentNode.parentNode.parentNode.lastChild.lastChild.lastChild.previousSibling.href.lastIndexOf("=") + 1);
			for (var j = 0; j < giftID.length; j++)
			{
				if (currentGiftID == giftID[j])
				{
					giftQuantity[j] = Number(currentInputBox.previousSibling.previousSibling.textContent.toString().substring(currentInputBox.previousSibling.previousSibling.textContent.toString().indexOf(":") + 1)) - Number(currentInputBox.value);
				}
			}
		}
	}
	sendItem();
}

function sendItem()
{
	for (var i = 0; i < giftID.length; i++)
	{
		if (giftQuantity[i] > 0)
		{
			giftQuantity[i]--;
			ifrm.setAttribute("src",'http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=gift&recipients[0]=' + 
				GM_getValue("userID") + '&gift_category=1&gift_id=' + giftID[i] + '&gift_key=' + GM_getValue("giftKey") + '&xw_action=send'); 
			top.document.title = 'Sending: '+ giftName[i];
			window.setTimeout(sendItem, 4000);
			i = giftID.length;
		}
		else
		{
			if ((i + 1) == giftID.length)
			{
				top.document.title = 'Done Sending';
				window.setTimeout(refreshLootPage, 4000);
			}
		}
		
	}
}

function clickElement(elt)
{
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	elt.dispatchEvent(evt);
}

function save()
{
	allElements = document.getElementsByTagName('INPUT');
	for (var i = 0; i < allElements.length; i++)
	{
		currentInputBox = allElements[i];
		if (currentInputBox.size == 2)
		{
			try
			{
				var currentGiftID = currentInputBox.parentNode.parentNode.parentNode.lastChild.lastChild.lastChild.previousSibling.href.substring(currentInputBox.parentNode.parentNode.parentNode.lastChild.lastChild.lastChild.previousSibling.href.lastIndexOf("=") + 1);
			}
			catch(err)
			{
			}
			for (j = 0; j < giftID.length; j++)
			{
				if (currentGiftID == giftID[j])
				{
					keepQuantity[j] = currentInputBox.value;
				}
			}
		}
	}
	GM_setValue('keepQuantity', uneval(keepQuantity));	
}

function saveRecipientInfo()
{
	var match=/gift_key=([0-9a-f]+)/.exec(document.body.innerHTML).toString();
	var comma = match.indexOf(",");
	comma++;
	var giftKey = match.substring(comma);
	GM_setValue("giftKey", giftKey);

	var content=document.getElementById('app10979261223_content_row');
	var as=content.getElementsByTagName('a');
	for(i=0;i<as.length;i++)
	{
		if(as[i].innerHTML=='Profile')
		{
			var match=/[;&]user=(\d+)/.exec(as[i].href).toString();
			var comma = match.indexOf(",");
			comma++;
			var userID = match.substring(comma);
			GM_setValue("userID", userID);
		}
	}
	alert('Recipient:' + userID + '  Gift key:' + giftKey);
}