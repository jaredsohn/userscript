// ==UserScript==
// @name          Enhanced Gifter
// @description   Gets rid of loot you do not want
// @include   http://apps.facebook.com/inthemafia/*
// @include   http://apps.new.facebook.com/inthemafia/*
// @version   9.10.09
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
	"Untraceable Cell Phone", "Blackmail Photos", "Prop Plane", "Chopper", 
	"Illegal Transaction Records", "Luxury Yacht", "GX9", "Bookie's Holdout Pistol", 
	"Multi-Purpose Truck", "BA-12 Assault Rifle", "Falsified Documents", "Private Jet", "Police Cruiser", 
	"Armored Limousine", "Federal Agent", "Guerrilla Squad", "Mara Serpiente", "Chucho FAV", 
	"Ocelot Armored Truck", "Montaine 320", "Cigarette Boat", "Mini-Sub", "Si-14 Cargo Plane", 
	"Hu-9 Helicopter", "Armored State Car", "Garza 9", "RA-92", "M16A1", "Ru-38 Pistol", 
	"Cane Knife", "Para 322", "Gaff Hook", "ASC45 Conquistador", "Aguila HV .50 Sniper Rifle", 
	"TNT", "Street Gang Member", "Camouflage Body Armor", "Flintlock Pistols", "Bayonet", "Tri-Point Hat", 
	"Davy Crockett Hat", "Musket", "Saber", "Red Coat", "Cannon", "Politico Corrupto", "Canonazo", "Track Loader");


var giftID = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
						"11", "14", "15", "16", "17", "18", "19", "20", 
						"60", "61", "62", "63", "64", "65", "66", "67", 
						"68", "69", "70", "71", "72", "73", "74", "75", 
						"76", "77", "78", "174", "175", "176", "177", 
						"178", "179", "180", "181", "182", "183", "194", 
						"195", "196", "197", "198", "199", "200", "201", 
						"202", "203", "204", "205", "222", "223", "224", 
						"225", "226", "227", "228", "229", "245", "261",
						"262");


window.setInterval(function (){checkIfLootPage()}, 4000);
window.setInterval(function (){startAutoGift()}, 300000);

//does a click event on "Execute" if autogift is enabled
//currently doesn't work for some reason
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

//helper method to do a mouse click through code
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

//looks for 'loot' as the title, if true it runs 'addElementsToPage()' and 'fillInputBoxes()'
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

//adds elements to the loot page
//thisElement is used as a mark to place some of the elements
function addElementsToPage(thisElement)
{
	//alter top loot to stop a refesh
	thisElement.textContent = "Enhanced Gifting";
	
	//buttons for the top of page
	var executeButton;
	var saveButton;
	//finds a sexy button to clone to make mine
	anchorElements = document.getElementsByTagName('A');
	for (var i = 0; i < anchorElements.length; i++)
	{
		if(anchorElements[i].textContent == 'Send Gift')
		{	
			//clone the button
			executeButton = anchorElements[i].cloneNode(true);
			//change text
			executeButton.textContent = "Execute";
			//remove old click events and links
			executeButton.setAttribute('onclick', "");
			executeButton.removeAttribute("href");
			//create my own click event
			executeButton.addEventListener('click', function(event) 
			{
				execute();
				event.stopPropagation();
				event.preventDefault();
			}, true);
			//exits loop once a button is found
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
			//needs a default of 'false' added
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
	//adds buttons to "loot" title of the page
	thisElement.appendChild(executeButton);
	thisElement.appendChild(saveButton);
	thisElement.appendChild(autoButton);
	//add text boxes and text
	allElements = document.getElementsByTagName('A');
	for (var i = 0; i < allElements.length; i++)
	{
		//add some text
		var newTextElement = document.createTextNode('---- Keep:');
		//creates text boxes
		var newTextArea = document.createElement('INPUT');
		//scale down the text boxes, they default too big.
		//can make bigger if people want to send >999 items
		newTextArea.size = "2";
		thisElement = allElements[i];
		if (thisElement.text == "Send Gift")
		{
			//adds text and textboxes above any anchor element that has "Send Gift" as the text
			//this is the case for each giftable loot item
thisElement.parentNode.parentNode.parentNode.firstChild.firstChild.appendChild(newTextElement);
			thisElement.parentNode.parentNode.parentNode.firstChild.firstChild.appendChild(newTextArea);
		}
	}
	highjackButtons();
}

//switches "autoGiftEnabled" GM variable from true to false or vice versa
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

//takes over "send gift" buttons since it is unlikely people with use them with this script enabled
function highjackButtons()
{
	//finds "send gift" buttons"
	anchorElements = document.getElementsByTagName('A');
	for (var i = 0; i < anchorElements.length; i++)
	{
		if(anchorElements[i].textContent == 'Send Gift')
		{
			//changes text
			anchorElements[i].textContent = "Send Just This";
			//remove click event
			anchorElements[i].setAttribute('onclick', "");
			//add new click event
			anchorElements[i].addEventListener('click', function(event) 
			{
				//finds gift id
				singleGiftID = this.href.substring(this.href.lastIndexOf("=") + 1);
				//gets quantity from the text box
				singleGiftQuantity = Number(this.parentNode.parentNode.parentNode.firstChild.firstChild.firstChild.textContent.toString().substring(this.parentNode.parentNode.parentNode.firstChild.firstChild.firstChild.textContent.toString().indexOf(":") + 1) - this.parentNode.parentNode.parentNode.firstChild.firstChild.lastChild.value);
				//sends the item
				preSendSingle();
				//prevents href link
				event.stopPropagation();
				event.preventDefault();
			}, true);
		}
	}
}

//sets up a hidden from to do the gifting in
function preSendSingle()
{
	ifrm2 = document.createElement("IFRAME");
  	ifrm2.setAttribute("id","sendFrame2"); 
  	ifrm2.style.width = 10+"px"; 
  	ifrm2.style.height = 10+"px"; 
  	document.body.appendChild(ifrm2);
	sendSingle();
}

//actually sends the item, then calls itself again if singleGiftQuantity > 0
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

//refreshes loot page after gifting so displayed quantities are correct
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

//fills in 
function fillInputBoxes()
{
	//find text boxes
	allElements = document.getElementsByTagName('INPUT');
	for (var i = 0; i < allElements.length; i++)
	{
		currentInputBox = allElements[i];
		if (currentInputBox.size == 2)
		{
			try
			{
				//get giftID associated with text box by the "send gift" button link
				var currentGiftID = currentInputBox.parentNode.parentNode.parentNode.lastChild.lastChild.lastChild.previousSibling.href.substring(currentInputBox.parentNode.parentNode.parentNode.lastChild.lastChild.lastChild.previousSibling.href.lastIndexOf("=") + 1);
			}
			catch(err)
			{
			}
			for (j = 0; j < giftID.length; j++)
			{
				if (currentGiftID == giftID[j])
				{
					//could just send up a default value when retriving from GM
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

//save the text box values
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