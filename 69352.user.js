// ==UserScript==
// @name           DoH Recycle Helper
// @namespace      DoHEnhancements
// @description    Checks worthy items for recycleing
// @include        http://www.domainofheroes.com/*
// @include        http://*domainofheroes.com/*
// ==/UserScript==

var selectedModifiers = new Object();
var selectedMaterials = new Object();
var selectedRarity = 6;

function checkWorthyItems()
{
	var checkboxList = unsafeWindow.$$('input.chkMule');
	
	var statusTextElement = document.getElementById('statusText');
	var worthyItems = 0;
	
	itemloop:
	for(var i=0; i < checkboxList.length; i++)
	{
		statusTextElement.textContent = 'Checking item: ' + i + ' Worth Recycling: ' + worthyItems;
		
		var item = unsafeWindow.CacheGet('itm' + checkboxList[i].id.substring(3));
		var itc = unsafeWindow.CacheGet('itc' + item.ItcId);
		
		if(item.Locked || itc.IsCharm || itc.IsTreasureKey || item.RarityId > selectedRarity)
		{
			checkboxList[i].checked = false;
			continue;
		}
		
		var itemModifiers = [];
		
		//convert prefix and suffix ids to regular enchantment ids
		itemModifiers.push(unsafeWindow.CacheGet('PRE' + item.PreId).ModId);
		itemModifiers.push(unsafeWindow.CacheGet('SUF' + item.SufId).ModId);
		
		//add rarity modifiers subtract 3 from rarity and that's how many mod slots item has
		for(var j = 1; j <= item.RarityId - 3; j++)
		{
			itemModifiers.push(item['ModId' + j]);
		}
		
		
		//Compare modifiers to user list
		for(var j = 0; j < itemModifiers.length; j++)
		{

			if(selectedModifiers[itemModifiers[j]])
			{
				//OMG A MATCH!
				checkboxList[i].checked = true;
				worthyItems += 1;
				continue itemloop;
			}
		}
		
		//Compare materials to user list
		
		var ity = unsafeWindow.CacheGet('ity' + item.ItyId);
		for(var j = 1; j <= 3; j++)
		{
				//Material matches, check if quality matches
			if(item.QualityId >= selectedMaterials[ity['MaterialId' + j]])
			{
				//OMG A MATCH!
				checkboxList[i].checked = true;
				worthyItems += 1;
				continue itemloop;
			}
			
		}
		
		
		checkboxList[i].checked = false;
	}
	
	unsafeWindow.MassRecycleItems('Mule');
	statusTextElement.textContent = 'Finished. Please wait while game recycles items';
}

function reagentChange()
{

	var reagent = unsafeWindow.CacheGet(this.id);
	
	selectedModifiers[reagent.ModifierIdWeak] = false;
	selectedModifiers[reagent.ModifierIdNormal] = false;
	selectedModifiers[reagent.ModifierIdStrong] = false;
	
	switch(this.value)
	{
		case '1':
			selectedModifiers[reagent.ModifierIdWeak] = true;
		case '2':
			selectedModifiers[reagent.ModifierIdNormal] = true;
		case '3':
			selectedModifiers[reagent.ModifierIdStrong] = true;
	}
	
	 GM_setValue('selectedModifiers', uneval(selectedModifiers));

}

function materialChange()
{
	selectedMaterials[this.id] = this.value;
	GM_setValue('selectedMaterials', uneval(selectedMaterials));
}

function rarityChange()
{
	selectedRarity = this.value;
	
	GM_setValue('selectedRarity', selectedRarity);
}

function getReagentIndex(reagentId)
{

	var reagent = unsafeWindow.CacheGet(reagentId);
	
	if(selectedModifiers[reagent.ModifierIdWeak])
	{
		return 1;
	}
	else if(selectedModifiers[reagent.ModifierIdNormal])
	{
		return 2;
	}
	else if(selectedModifiers[reagent.ModifierIdStrong])
	{
		return 3;
	}
	else
	{
		return 0;
	}
}

function getMaterialIndex(materialId)
{
	if(selectedMaterials[materialId] && selectedMaterials[materialId] != 9)
		return selectedMaterials[materialId];
	else
		return 0;
}

function buildReagentSelects()
{
	selectedModifiers = eval(GM_getValue('selectedModifiers', 'new Object()'));
	
	for(var i = 1; i <= 54; i++)
	{
		var quantitySpan = document.getElementById('reaQty' + i);
		var quantityCell = quantitySpan.parentNode;
		var nameCell = quantityCell.previousSibling;
		
		var selectBox = document.createElement('select');
		selectBox.id = 'REA' + i;
		selectBox.options[0] = new Option("None", 0);
		selectBox.options[1] = new Option("T1", 1);
		selectBox.options[2] = new Option("T2", 2);
		selectBox.options[3] = new Option("T3", 3);
		
		selectBox.selectedIndex = getReagentIndex(selectBox.id);
		
		selectBox.addEventListener('change',reagentChange,false);
		
		
		var selectCell = document.createElement('td');
		selectCell.align = 'left';
		selectCell.appendChild(selectBox);
		
		nameCell.parentNode.insertBefore(selectCell, nameCell);
		
	}
}

function buildMaterialSelects()
{
	selectedMaterials = eval(GM_getValue('selectedMaterials', 'new Object()'));
	
	for(var i = 1; i <= 25; i++)
	{
		var quantitySpan = document.getElementById('matQty' + i);
		var quantityCell = quantitySpan.parentNode;
		var nameCell = quantityCell.previousSibling;
		
		var selectBox = document.createElement('select');
		selectBox.id = i;
		selectBox.style.width = "50px";
		selectBox.options[0] = new Option("None", 9);
		selectBox.options[1] = new Option("Inferior", 1);
		selectBox.options[2] = new Option("Lesser", 2);
		selectBox.options[3] = new Option("Normal", 3);
		selectBox.options[4] = new Option("High", 4);
		selectBox.options[5] = new Option("Craftwork", 5);
		selectBox.options[6] = new Option("Exceptional", 6);
		selectBox.options[7] = new Option("Elite", 7);
		selectBox.options[8] = new Option("Heroic", 8);
								
		selectBox.selectedIndex = getMaterialIndex(selectBox.id);
		selectBox.addEventListener('change',materialChange,false);
		
		
		var selectCell = document.createElement('td');
		selectCell.align = 'left';
		selectCell.appendChild(selectBox);
		
		nameCell.parentNode.insertBefore(selectCell, nameCell);
		
	}
}

function buildSmartRecycle()
{
	//Create Smart Recycle Button and status text
	var muleWrapperDiv = document.getElementById('muleWrapper');

	if(muleWrapperDiv)
	{
		var wrapperTable = muleWrapperDiv.getElementsByTagName('table')[0];
	
		if(wrapperTable)
		{
			var newTable = document.createElement('table');
			var newRow = newTable.insertRow(-1);
			var newCell = newRow.insertCell(0);
			var newCell2 = newRow.insertCell(1);
		
			newCell2.id = 'statusText';
			newCell2.style.whiteSpace='nowrap';
			newCell2.textContent = '-- click to recycle items worth recycling';
		
		
			var newLinkElement = document.createElement('a');
			newLinkElement.href = 'javascript:void(0)';
			newLinkElement.innerHTML = '<img border="0" class="h12px h12px-recycleToShop" src="http://media.domainofheroes.com/clear.gif"/>Smart Recycle';
			newLinkElement.addEventListener('click',checkWorthyItems,false);
		
	
			newCell.appendChild(newLinkElement);
		
			wrapperTable.parentNode.insertBefore(newTable, wrapperTable.nextSibling);
		
		}
	}
}

function buildRaritySelect()
{
	var materialFont = document.getElementById('materialLimit');
	
	if(materialFont)
	{
		var materialRow = materialFont.parentNode.parentNode;
	
		var rarityRow = document.createElement('tr');
		var rarityCell = rarityRow.insertCell(0);
		
		var selectBox = document.createElement('select');
		selectBox.id = 'raritySelect';
		selectBox.options[0] = new Option("Common", 1);
		selectBox.options[1] = new Option("Uncommon", 2);
		selectBox.options[2] = new Option("Notable", 3);
		selectBox.options[3] = new Option("Rare", 4);
		selectBox.options[4] = new Option("Unique", 5);
		selectBox.options[5] = new Option("Legendary", 6);
		selectBox.options[6] = new Option("Mythical", 7);
	
		selectBox.selectedIndex = GM_getValue('selectedRarity', 6) - 1;
		
		selectBox.addEventListener('change',rarityChange,false);
	
		var rarityTextNode = document.createTextNode(" Maximum rarity to recycle: ");
		rarityCell.appendChild(rarityTextNode);
		rarityCell.appendChild(selectBox);
	
		materialRow.parentNode.insertBefore(rarityRow, materialRow);
	}
	
	
}

function LoadAddon()
{

	buildSmartRecycle();
	buildRaritySelect();
	buildMaterialSelects();
	buildReagentSelects();
}

setTimeout(LoadAddon, 5000);