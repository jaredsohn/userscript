// HappyFoto ZBERNA
// version 1.0
// 2009-08-25
// Copyright (c) 2009, Radoslav Bielik
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// 
//
// ENGLISH
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// To uninstall, go to Tools/Manage User Scripts,
// select "HappyFoto ZBERNA", and click Uninstall.
//
// SLOVAK
// Toto je skript pre Greasemonkey (Firefox addon)
//
// Pre nainstalovanie je potrebny Greasemonkey: http://greasemonkey.mozdev.org/
// Po instalacii Greasemonkey restartujte Firefox a znova otvorte tento skript.
// Pre odinstalovanie otvorte Tools/Manage User Scripts,
// zvolte "HappyFoto ZBERNA" a kliknite "Uninstall"
//
// 
//
// ==UserScript==
// @name HappyFoto ZBERNA
// @namespace http://bielik.org
// @description Skript pre zlepšenie rozhrania online zberne fotoslužby HappyFoto. Pridáva tlačítka na označenie alebo odznačenie všetkých fotografií v objednávke, a tiež možnosť označiť fotky podľa názvu súboru. Skript obsahuje aj počítadlo fotografií. http://bielik.org/greasemonkey
// @include http://digi.happy-foto.cz/album?xsl=cart*
// @include http://digi.happyfoto.sk/album?xsl=cart*
// ==/UserScript==



// add the new elements to the page, and count the photos
hfzberna_addlink();
hfzberna_countPhotos(true);


// sets or toggles the checkboxes
function hfzberna_setCheckboxes(setChecked)
{
	var fieldsInput = document.getElementsByTagName("input");
	var countPhotos = 0;
	var countChecked = 0;

	// iterate through all the checkboxes in the page
	for(var i=0; i<fieldsInput.length; i++)
	{
		var current = fieldsInput.item(i);

		if(current.type == "checkbox" && current.name.indexOf("chkimg") != -1)
		{
			countPhotos++;

			if(setChecked != null)
				current.checked = setChecked;
			else
				current.checked = !current.checked;

			if(current.checked)
				countChecked++;

			/*if(current.name.indexOf("5ks_") == 7) 
			{
				current.checked = true;
				count++;
			}
			else
				current.checked = false;*/
		}
	}

	hfzberna_displayCount(countPhotos, countChecked);
}

// set checkboxes by name
function hfzberna_setCheckboxesByName(nameMask)
{
	var fieldsInput = document.getElementsByTagName("input");
	var countPhotos = 0;
	var countChecked = 0;

	// iterate through all the checkboxes in the page
	for(var i=0; i<fieldsInput.length; i++)
	{
		var current = fieldsInput.item(i);

		if(current.type == "checkbox" && current.name.indexOf("chkimg") != -1)
		{
			countPhotos++;

			if(current.name.indexOf(nameMask) != -1) 
				current.checked = true;
			else
				current.checked = false;

			if(current.checked)
				countChecked++;
		}
	}

	hfzberna_displayCount(countPhotos, countChecked);
}

// counts the photos (by counting the checkboxes)
// also installs event listener
function hfzberna_countPhotos(installEventListener)
{
	var fieldsInput = document.getElementsByTagName("input");
	var countPhotos = 0;
	var countChecked = 0;

	// iterate through all the checkboxes in the page
	for(var i=0; i<fieldsInput.length; i++)
	{
		var current = fieldsInput.item(i);

		// verify we have a photo-related checkbox 
		if(current.type == "checkbox" && current.name.indexOf("chkimg") != -1)
		{
			// increment the main counter
			countPhotos++;

			// increment the "checked" counter
			if(current.checked)
				countChecked++;

			// install the listener
			if(installEventListener)
				current.addEventListener("click", hfzberna_countPhotos, true);
		}
	}

	hfzberna_displayCount(countPhotos, countChecked);
}

// formats and displays the photo count in the span named spanInfoText
function hfzberna_displayCount(countPhotos, countChecked)
{
	var spanInfoText = document.getElementById("spanInfoText");
	spanInfoText.innerHTML = 
		"Fototaška obsahuje <b style='font-size:140%'>" + countPhotos + "</b> fotografií, označených je <b style='font-size:140%'>" + countChecked + "</b>";
}

function hfzberna_select()
{
	hfzberna_setCheckboxes(true);
}

function hfzberna_deselect()
{
	hfzberna_setCheckboxes(false);
}

function hfzberna_invert()
{
	hfzberna_setCheckboxes();
}

function hfzberna_selectByName()
{
	var inputNameMask = document.getElementsByName("inputNameMask");
	if(inputNameMask == null || inputNameMask.length != 1)
		return;

	var nameMask = inputNameMask.item(0).value;
	if(nameMask == '')
		return;

	hfzberna_setCheckboxesByName(nameMask);
}


// This function inserts newNode after referenceNode
function hfzberna_insertafter(referenceNode, newNode)
{
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// adds all new HTML elements to the top of the page (links, text, etc)
function hfzberna_addlink()
{
	// find the <h2> heading (there should be a single one)
	var allH2 = document.getElementsByTagName("h2");
	var ourH2 = allH2.item(0);

	// create a DIV to contain new links
	var divSettings = document.createElement('div');
	divSettings.style.paddingBottom = "1em";
	divSettings.style.lineHeight = "1.5em";

	// create link to select all
	var linkSelectAll = document.createElement('a');
	var msgSelectAll = document.createTextNode("Označ všetky");
	linkSelectAll.setAttribute("href", "#");
	linkSelectAll.style.paddingRight = "0.5em";
	linkSelectAll.addEventListener("click", hfzberna_select, true);
	linkSelectAll.appendChild(msgSelectAll);
	divSettings.appendChild(linkSelectAll);

	// create link to deselect all
	var linkDeselectAll = document.createElement('a');
	var msgDeselectAll = document.createTextNode("Zruš označenie");
	linkDeselectAll.setAttribute("href", "#");
	linkDeselectAll.style.paddingRight = "0.5em";
	linkDeselectAll.addEventListener("click", hfzberna_deselect, true);
	linkDeselectAll.appendChild(msgDeselectAll);
	divSettings.appendChild(linkDeselectAll);

	// create link to invert selection
	var linkInvertAll = document.createElement('a');
	var msgInvertAll = document.createTextNode("Invertuj");
	linkInvertAll.setAttribute("href", "#");
	linkInvertAll.style.paddingRight = "0.5em";
	linkInvertAll.addEventListener("click", hfzberna_invert, true);
	linkInvertAll.appendChild(msgInvertAll);
	divSettings.appendChild(linkInvertAll);

	// create link to select by name
	var linkSelectByName = document.createElement('a');
	var msgSelectByName = document.createTextNode("Označ podľa mena");
	linkSelectByName.setAttribute("href", "#");
	linkSelectByName.style.paddingRight = "0.5em";
	linkSelectByName.addEventListener("click", hfzberna_selectByName, true);
	linkSelectByName.appendChild(msgSelectByName);
	divSettings.appendChild(linkSelectByName);

	// create an input box
	var inputBox = document.createElement('input');
	inputBox.setAttribute('type','text');
	inputBox.setAttribute('value','');
	inputBox.setAttribute('name', 'inputNameMask');
	divSettings.appendChild(inputBox);

	// insert line break
	var lineBreak = document.createElement('<br>');
	divSettings.appendChild(lineBreak);

	// create a dynamic span
	var spanInfo = document.createElement('span');
	var msgInfo = document.createTextNode("tu bude text");
	spanInfo.setAttribute("id", "spanInfoText");
	spanInfo.style.color = "#108060";
	spanInfo.style.fontSize = "80%";
	spanInfo.appendChild(msgInfo);
	divSettings.appendChild(spanInfo);

	// insert the main DIV into the document
	hfzberna_insertafter(ourH2, divSettings);
}