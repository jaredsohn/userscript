// ==UserScript==
// @name           Mythos Single Click Max Training
// @description    Places a button next to each text field which trains maximum allowed troops when clicked
// @namespace      http://www.mythicwars.com/norron/g_spyMissions.asp
// @include        http://www.mythicwars.com/mythos/g_troopTrain.asp
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
		var elementName;
		if(i==1)
			elementName = 'trainToxotes';
		if(i==2)
			elementName = 'trainHoplites';
		if(i==3)
			elementName = 'trainHippikons';
		if(i==4)
			elementName = 'trainProdromoi';
		if(i==5)
			elementName = 'trainBiremes';
		if(i==6)
			elementName = 'trainXSpecial';

		var string = 'getElementsByName("'+elementName+'")[0].value='+trainable+';';
		var string2 = 'document.getElementsByTagName("form")[0].submit();';
		newInput.setAttribute('onClick', string+string2);
		newInput.style.width="4em";

		// Add the new input element to the new column element and then add that to the end of this row.
		newCol.appendChild(newInput);
		table.rows[i].appendChild(newCol);
	}

}, 50);


