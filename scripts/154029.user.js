// Version 1.2
// Updated:
// Thursday, December 13, 2012.
// Created:
// Wednesday, December 7, 2005.
// Random Filler no Checkbox
// Adam Knutson _ Edit by KenNguyen
//
// ==UserScript==
// @name         Random Filler no Checkbox
// @description  Automatically fills forms, selecting random values.  Just press CTRL + SHIFT + F!  To auto fill text boxes with a random number within a specified range (x through y) press CTRL + SHIFT + M.
// ==/UserScript==

function randomFill()
{
    //Menus
    var selectMenus = document.getElementsByTagName('select');

    // The menu section.
    if (selectMenus.length) 
	{
		// if there is atleast one menu on the page
		// then change the value of all of them.
		for (var i = 0; i < selectMenus.length; i++) 
		{
			// Number of choices in the menu
			var choiceNum = selectMenus[i].length;
			// Select a random number between 0 and the (number of choices - 1)
			var newIndex = Math.round( ( Math.random() * ( choiceNum - 1) ) );
			if (newIndex == 0) 
			{
			// Lets make sure the menu doesn't stay on the default value
			// which is usually 0.
			newIndex = newIndex + 1;
			}

			// Change the selection.
			selectMenus[i].selectedIndex = newIndex;
		}
    }


    // The Radio Section
    var inputElements = document.getElementsByTagName('input');
    var groupCount = 0;
    var groupStart = 0;

    if ( inputElements.length ) 
	{
		// if there is atleast one input element on the page
		// then change the value of all of them.
		for (var i = 0; i < inputElements.length; i++) 
		{
			var formName = inputElements[i].form.name;
			var groupName = inputElements[i].name;
			//var currentGroup = document.forms[formName].elements[groupName];

			var form = document.forms.namedItem(formName);
		
			// radio boxes
			if ( inputElements[i].type == 'radio' )
			{
				if ( i == 0 || groupCount == 0 || groupName == previousName )
				{
					// then add one to the count.
					groupCount = groupCount + 1;
					var previousName = groupName;

					////// this could potentially cause a problem
					////// if there is no i + 1:
					if ( inputElements[i + 1].name != groupName )
					{
						var haveGroupNo = 0;
						// if the next element is a different group
						// select a value for this group, and reset
						// the count.
						
						// the lowest numbered element we can select in this group
						var minRange = ((i + 1) - groupCount);
						
						// randomize the selection
						
						for (var j = minRange; j < (minRange + groupCount); j++)
						{
							// are there any "no" word in string
							// if there are a "no" word, check this radio
							if (inputElements[j].value.toLowerCase().indexOf("no") != -1 )
							{
								inputElements[j].checked = true;
								haveGroupNo = 1;
								break;
							}
						}
						
						if (haveGroupNo == 0)
						{
							var selection = Math.round( ( Math.random() * ( groupCount - 1) ) );
							
							//select a value anywhere from minRange to minRange + selection.
							inputElements[minRange + selection].checked = true;
						}
						
						groupCount = 0;
					}
				}
			}
		}
    }
}

function textRangeFill()
{
    // fills random values in all text boxes the range specified (min to max).
    // hotkey is CTRL, SHIFT, S
    var textElements = document.getElementsByTagName('input'); 
    var min = parseInt(prompt("min","0"));
    var max = parseInt(prompt("max","10"));

    for (var i = 0; i < textElements.length; i++)
	{
		if (textElements[i].type == 'text')
		{
			var number = Math.round( Math.random() * (max - min) + min);
			textElements[i].value = number; 
			
		} 
    }
}

// The listener section
//

// constant variables for the keys.
var F_KEY = 70;

var M_KEY = 77;

function keyPressed(e)
{
    // If you press CTRL, SHIFT, F
    // Fill out the form.
    if( e.ctrlKey && e.shiftKey && e.keyCode == F_KEY )
	{
        randomFill();
	}
    // If you press CTRL, SHIFT, M
    // Fill out the text.
    if( e.ctrlKey && e.shiftKey && e.keyCode == M_KEY )
	{
        textRangeFill();
	}

}

// listen for keypresses
window.addEventListener('keydown', keyPressed, false);