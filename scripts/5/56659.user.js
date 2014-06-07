// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  It was written using
// Greasemonkey 0.8 and FireFox 3.0.13
// To install Greasemonkey go to http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Single Click Max Troop Training", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Single Click Max Troop Training
// @description   Places a button next to each text field which trains maximum allowed troops when clicked
// @include       http://www.mythicwars.com/norron/g_troopTrain.asp
// ==/UserScript==


window.setTimeout( function() 
{
	// Get a reference to the training table and add a new header to it

	var forms = document.getElementsByTagName('form')[0];
	var table = forms.getElementsByTagName('table')[0];
	var headerEL = document.createElement('td');
	headerEL.setAttribute('class', 'mainsubsubheader');
	headerEL.setAttribute('nowrap', 'true');
	headerEL.innerHTML = "Max";
	table.rows[0].appendChild(headerEL);

	for(var i=1; i<table.rows.length-1; i++)
	{
		// Get the maximum troops of this rows type that can be trained
		var trainable = table.rows[i].cells[5].innerHTML;
		trainable = trainable.substring(trainable.indexOf(';')+1,trainable.lastIndexOf('&'));
                trainable = trainable.replace(",", "");

		// Trim "&nbsp;" off of the textbox. It causes the column to wrap after adding this new one.
		textBox = table.rows[i].cells[6].innerHTML;
		table.rows[i].cells[6].innerHTML = textBox.substring(textBox.indexOf(';')+1, textBox.lastIndexOf('&'));

		// Create a new column. Just added same attributes that existed in the previous columns.
		var newCol = document.createElement('td');
		newCol.setAttribute('align','center');
		newCol.setAttribute('valign', 'top');
		newCol.setAttribute('class', 'bodytext');

		// Create the new input element. Its onClick method adds the maximum troops to this rows input box.
		var newInput = document.createElement('input');
		newInput.setAttribute('type','button');
		newInput.setAttribute('value',trainable);
		newInput.setAttribute('class','button');
		var string = 'getElementsByName("train'+i+'")[0].value='+trainable+';';
		var string2 = 'document.getElementsByTagName("form")[0].submit();';
		newInput.setAttribute('onClick', string+string2);
		newInput.style.width="4em";

		// Add the new input element to the new column element and then add that to the end of this row.
		newCol.appendChild(newInput);
		table.rows[i].appendChild(newCol);
	}

}, 100);

