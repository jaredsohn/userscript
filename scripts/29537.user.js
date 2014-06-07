// ==UserScript==
// @name           FUMBBL Enhanced Editor
// @author		   SeraphimRed
// @version		   1.3
// @date		   29/07/08
// @namespace      http://userscripts.org/users/58057
// @description    Script to enhance FUMBBL's Edit Forms
// @include        http://fumbbl.com/*
// @history        1.0	Original version
//				   1.1	Return caret and scroll to initial position when modifying textarea
//						Added Image Selection box
//						Added Create FUMBBL Table	
//				   1.2  Owing to recent FUMBBL changes with styles, show button uses single quotes rather than double 
//				   1.3  Replaced double quotes of all styles to single quotes 

// ==/UserScript==

/******************************************************
GLOBAL DATA - do not modify unless modfying underlying 
			  code too
******************************************************/
var pageEditBox;		//references to controls that require a global access
var htmlPasteSelect;
var htmlImgSelect;

var htmlSelectTag = new Array();
var htmlSelectCode = new Array();
var htmlSelectImg = new Array();
var htmlSelectSrc = new Array();

/******************************************************
CONFIG - Modify the enhanced editor options below
******************************************************/
// textarea width, FUMBBL's is set to 80
var editbox_col_size = 150;
// row size, FUMBBL's is set to 30
var editbox_row_size = 40 


/*	HTML TAG Insertion
	Add/Modify the following arrays to offer varying HTML options.
	Using the text YOURTEXT within the code array element will 
	place the current textarea selection in its place
*/
htmlSelectTag[0]="Insert HTML Tag";		htmlSelectCode[0]=""; //use this only as a description of the function
htmlSelectTag[1]="Bold";				htmlSelectCode[1]="<b>YOURTEXT</b>"; 
htmlSelectTag[2]="Italic";				htmlSelectCode[2]="<i>YOURTEXT</i>"; 
htmlSelectTag[3]="Underline";			htmlSelectCode[3]="<u>YOURTEXT</u>"; 
htmlSelectTag[4]="Heading Text";		htmlSelectCode[4]="<h1>YOURTEXT</h1>"; 
htmlSelectTag[5]="Align Text Left";		htmlSelectCode[5]="<div align=left>YOURTEXT</div>"; 
htmlSelectTag[6]="Font Color Blue";		htmlSelectCode[6]="<font color=blue>YOURTEXT</font>"; 
htmlSelectTag[7]="Image";				htmlSelectCode[7]="<img src=\"IMAGEURL\">"; 
htmlSelectTag[8]="Link";				htmlSelectCode[8]="<a href=\"LINKURL\">YOURTEXT</a>"; 

/* this code will only work as is once due to referencing the same hide1 id, modify this id if using the button more than once */
htmlSelectTag[9]="Show Button";		htmlSelectCode[9]="<input style='width:150px;' type=\"button\" value=\"Show\" " +
										"onclick=\"x=document.getElementById('hide1');if(x.style.display != 'none'){x.style.display = 'none';this.value='Show'}else{x.style.display = 'block';this.value='Hide';}\">" +
										"<div id=hide1 style='display:none'>" + 
										"YOURTEXT</div>";

/*	Image Insertion
	Add/Modify the following arrays to offer varying Image Options.
	As default this includes all player icons
*/										
htmlSelectImg[0]="Insert Image";			htmlSelectSrc[0]=""; 
htmlSelectImg[1]="Amazon Lino";				htmlSelectSrc[1]="<img src='http://fumbbl.com/files/images/amazon/lineman.png'>";
htmlSelectImg[2]="Amazon Blitzer";			htmlSelectSrc[2]="<img src='http://fumbbl.com/files/images/amazon/blitzer.png'>";
htmlSelectImg[3]="Amazon Thrower";			htmlSelectSrc[3]="<img src='http://fumbbl.com/files/images/amazon/thrower.png'>";
htmlSelectImg[4]="Amazon Catcher";			htmlSelectSrc[4]="<img src='http://fumbbl.com/files/images/amazon/catcher.png'>";

htmlSelectImg[5]="Chaos Beastman";			htmlSelectSrc[5]="<img src='http://fumbbl.com/files/images/chaos/beastman.png'>";
htmlSelectImg[6]="Chaos Warrior";			htmlSelectSrc[6]="<img src='http://fumbbl.com/files/images/chaos/chaos.png'>";

htmlSelectImg[7]="Chaos Dwarf";				htmlSelectSrc[7]="<img src='http://fumbbl.com/files/images/chaosdwarf/chaosdwarf.png'>";
htmlSelectImg[8]="Hobgoblin";				htmlSelectSrc[8]="<img src='http://fumbbl.com/files/images/chaosdwarf/hobgoblin.png'>";
htmlSelectImg[9]="Bull Centaur";			htmlSelectSrc[9]="<img src='http://fumbbl.com/files/images/chaosdwarf/bullcentaur.png'>";

htmlSelectImg[10]="Dark Elf Lino";			htmlSelectSrc[10]="<img src='http://fumbbl.com/files/images/darkelf/lineman.png'>";
htmlSelectImg[11]="Dark Elf Blitzer";		htmlSelectSrc[11]="<img src='http://fumbbl.com/files/images/darkelf/blitzer.png'>";
htmlSelectImg[12]="Dark Elf Thrower";		htmlSelectSrc[12]="<img src='http://fumbbl.com/files/images/darkelf/thrower.png'>";
htmlSelectImg[13]="Dark Elf Witchelf";		htmlSelectSrc[13]="<img src='http://fumbbl.com/files/images/darkelf/witchelf.png'>";

htmlSelectImg[14]="Dwarf Longbeard";		htmlSelectSrc[14]="<img src='http://fumbbl.com/files/images/dwarf/longbeard.png'>";
htmlSelectImg[15]="Dwarf Blitzer";			htmlSelectSrc[15]="<img src='http://fumbbl.com/files/images/dwarf/blitzer.png'>";
htmlSelectImg[16]="Dwarf Runner";			htmlSelectSrc[16]="<img src='http://fumbbl.com/files/images/dwarf/runner.png'>";
htmlSelectImg[17]="Dwarf Troll Slayer";		htmlSelectSrc[17]="<img src='http://fumbbl.com/files/images/dwarf/trollslayer.png'>";

htmlSelectImg[18]="Elf Lino";				htmlSelectSrc[18]="<img src='http://fumbbl.com/files/images/elf/lineman.png'>";
htmlSelectImg[19]="Elf Blitzer";			htmlSelectSrc[19]="<img src='http://fumbbl.com/files/images/elf/blitzer.png'>";
htmlSelectImg[20]="Elf Thrower";			htmlSelectSrc[20]="<img src='http://fumbbl.com/files/images/elf/thrower.png'>";
htmlSelectImg[21]="Elf Catcher";			htmlSelectSrc[21]="<img src='http://fumbbl.com/files/images/elf/catcher.png'>";

htmlSelectImg[22]="Goblin";					htmlSelectSrc[22]="<img src='http://fumbbl.com/files/images/goblin/goblin.png'>";

htmlSelectImg[23]="Halfling";				htmlSelectSrc[23]="<img src='http://fumbbl.com/files/images/halfling/halfling.png'>";

htmlSelectImg[24]="High Elf Lino";			htmlSelectSrc[24]="<img src='http://fumbbl.com/files/images/highelf/lineman.png'>";
htmlSelectImg[25]="HE Dragon Warrior";		htmlSelectSrc[25]="<img src='http://fumbbl.com/files/images/highelf/dragonwarrior.png'>";
htmlSelectImg[26]="HE Lion Warrior";		htmlSelectSrc[26]="<img src='http://fumbbl.com/files/images/highelf/lionwarrior.png'>";
htmlSelectImg[27]="HE Phoenix Warrior";		htmlSelectSrc[27]="<img src='http://fumbbl.com/files/images/highelf/phoenixwarrior.png'>";

htmlSelectImg[28]="Human Lino";				htmlSelectSrc[28]="<img src='http://fumbbl.com/files/images/human/lineman.png'>";
htmlSelectImg[29]="Human Blitzer";			htmlSelectSrc[29]="<img src='http://fumbbl.com/files/images/human/blitzer.png'>";
htmlSelectImg[30]="Human Thrower";			htmlSelectSrc[30]="<img src='http://fumbbl.com/files/images/human/thrower.png'>";
htmlSelectImg[31]="Human Catcher";			htmlSelectSrc[31]="<img src='http://fumbbl.com/files/images/human/catcher.png'>";

htmlSelectImg[32]="Khemri Skeleton";		htmlSelectSrc[32]="<img src='http://fumbbl.com/files/images/khemri/skeleton.png'>";
htmlSelectImg[33]="Khemri Blitz-ra";		htmlSelectSrc[33]="<img src='http://fumbbl.com/files/images/khemri/blitzra.png'>";
htmlSelectImg[34]="Khemri Mummy";			htmlSelectSrc[34]="<img src='http://fumbbl.com/files/images/khemri/mummy.png'>";
htmlSelectImg[35]="Khemri Throw-ra";		htmlSelectSrc[35]="<img src='http://fumbbl.com/files/images/khemri/throwra.png'>";

htmlSelectImg[36]="Lizardmen Skink";		htmlSelectSrc[36]="<img src='http://fumbbl.com/files/images/lizardmen/skink.png'>";
htmlSelectImg[37]="Lizardmen Saurus";		htmlSelectSrc[37]="<img src='http://fumbbl.com/files/images/lizardmen/saurus.png'>";
htmlSelectImg[38]="Lizardmen Kroxigor";		htmlSelectSrc[38]="<img src='http://fumbbl.com/files/images/lizardmen/kroxigor.png'>";

htmlSelectImg[39]="Minotaur";				htmlSelectSrc[39]="<img src='http://fumbbl.com/files/images/chaos/minotaur.png'>";

htmlSelectImg[40]="Necro Zombie";			htmlSelectSrc[40]="<img src='http://fumbbl.com/files/images/necromantic/zombie.png'>";
htmlSelectImg[41]="Necro Flesh Golem";		htmlSelectSrc[41]="<img src='http://fumbbl.com/files/images/necromantic/fleshgolem.png'>";
htmlSelectImg[42]="Necro Ghoul";			htmlSelectSrc[42]="<img src='http://fumbbl.com/files/images/necromantic/ghoul.png'>";
htmlSelectImg[43]="Necro Werewolf";			htmlSelectSrc[43]="<img src='http://fumbbl.com/files/images/necromantic/werewolf.png'>";
htmlSelectImg[44]="Necro Wight";			htmlSelectSrc[44]="<img src='http://fumbbl.com/files/images/necromantic/wight.png'>";

htmlSelectImg[45]="Norse Lino";				htmlSelectSrc[45]="<img src='http://fumbbl.com/files/images/norse/lineman.png'>";
htmlSelectImg[46]="Norse Blitzer";			htmlSelectSrc[46]="<img src='http://fumbbl.com/files/images/norse/blitzer.png'>";
htmlSelectImg[47]="Norse Thrower";			htmlSelectSrc[47]="<img src='http://fumbbl.com/files/images/norse/thrower.png'>";
htmlSelectImg[48]="Norse Catcher";			htmlSelectSrc[48]="<img src='http://fumbbl.com/files/images/norse/catcher.png'>";

htmlSelectImg[49]="Ogre";					htmlSelectSrc[49]="<img src='http://fumbbl.com/files/images/norse/ogre.png'>";
htmlSelectImg[50]="Ogre with Helm";			htmlSelectSrc[50]="<img src='http://fumbbl.com/files/images/ogre/ogre.png'>";

htmlSelectImg[51]="Orc Lino";				htmlSelectSrc[51]="<img src='http://fumbbl.com/files/images/orc/lineman.png'>";
htmlSelectImg[52]="Orc Blitzer";			htmlSelectSrc[52]="<img src='http://fumbbl.com/files/images/orc/blitzer.png'>";
htmlSelectImg[53]="Orc Thrower";			htmlSelectSrc[53]="<img src='http://fumbbl.com/files/images/orc/thrower.png'>";
htmlSelectImg[54]="Orc Black";				htmlSelectSrc[54]="<img src='http://fumbbl.com/files/images/orc/blackorc.png'>";

htmlSelectImg[55]="Rotters Beastman";		htmlSelectSrc[55]="<img src='http://fumbbl.com/files/images/rotters/beastman.png'>";
htmlSelectImg[56]="Rotters Beast";			htmlSelectSrc[56]="<img src='http://fumbbl.com/files/images/rotters/beastofnurgle.png'>";
htmlSelectImg[57]="Rotters Rotter";			htmlSelectSrc[57]="<img src='http://fumbbl.com/files/images/rotters/rotter.png'>";

htmlSelectImg[58]="Skaven Lino";			htmlSelectSrc[58]="<img src='http://fumbbl.com/files/images/skaven/lineman.png'>";
htmlSelectImg[59]="Skaven Storm Vermin";	htmlSelectSrc[59]="<img src='http://fumbbl.com/files/images/skaven/stormvermin.png'>";
htmlSelectImg[60]="Skaven Thrower";			htmlSelectSrc[60]="<img src='http://fumbbl.com/files/images/skaven/thrower.png'>";
htmlSelectImg[61]="Skaven Gutter Runner";	htmlSelectSrc[61]="<img src='http://fumbbl.com/files/images/skaven/gutterrunner.png'>";

htmlSelectImg[62]="Treeman";				htmlSelectSrc[62]="<img src='http://fumbbl.com/files/images/woodelf/treeman.png'>";
htmlSelectImg[63]="Troll";					htmlSelectSrc[63]="<img src='http://fumbbl.com/files/images/chaos/troll.png'>";

htmlSelectImg[64]="Undead Zombie";			htmlSelectSrc[64]="<img src='http://fumbbl.com/files/images/undead/zombie.png'>";
htmlSelectImg[65]="Undead Mummy";			htmlSelectSrc[65]="<img src='http://fumbbl.com/files/images/undead/mummy.png'>";
htmlSelectImg[66]="Undead Ghoul";			htmlSelectSrc[66]="<img src='http://fumbbl.com/files/images/undead/ghoul.png'>";
htmlSelectImg[67]="Undead Skeleton";		htmlSelectSrc[67]="<img src='http://fumbbl.com/files/images/undead/skeleton.png'>";
htmlSelectImg[68]="Undead Wight";			htmlSelectSrc[68]="<img src='http://fumbbl.com/files/images/undead/wight.png'>";

htmlSelectImg[69]="Vampire Red Hair";		htmlSelectSrc[69]="<img src='http://fumbbl.com/files/images/vampire.png'>";
htmlSelectImg[70]="Vampire Blue Hair";		htmlSelectSrc[70]="<img src='http://fumbbl.com/files/images/vampire/vampire.png'>";
htmlSelectImg[71]="Vampire Thrall";			htmlSelectSrc[71]="<img src='http://fumbbl.com/files/images/vampire/thrall.png'>";

htmlSelectImg[72]="Woodelf Lino";			htmlSelectSrc[72]="<img src='http://fumbbl.com/files/images/woodelf/lineman.png'>";
htmlSelectImg[73]="Woodelf Catcher";		htmlSelectSrc[73]="<img src='http://fumbbl.com/files/images/woodelf/catcher.png'>";
htmlSelectImg[74]="Woodelf Thrower";		htmlSelectSrc[74]="<img src='http://fumbbl.com/files/images/woodelf/thrower.png'>";
htmlSelectImg[75]="Woodelf Wardancer";		htmlSelectSrc[75]="<img src='http://fumbbl.com/files/images/woodelf/wardancer.png'>";
/******************************************************
FUNCTIONS
******************************************************/

/*****************************************************
* add_comments
*
* Purpose:	To add HTML comments at each line break 
*			FUMBBL inserts html line breaks as each
*			carriage return
*
* Params:	None
*	
* Returns:	None
******************************************************/
function add_comments()
{
	pageEditBox.value = pageEditBox.value.replace(/\n/g,"<!--\n-->");
}

/*****************************************************
* strip_comments
*
* Purpose:	To strip out HTML comments from the 
*			textarea
*
* Params:	None
*	
* Returns:	None
******************************************************/
function strip_comments()
{
	pageEditBox.value = pageEditBox.value.replace(/<!--|-->/g,"");
}

/*****************************************************
* insert_html
*
* Purpose:	To insert text around a selection 
*			Used for adding HTML tags
*
* Params:	textBox: Text Object
*			insertText: Text to insert
*	
* Returns:	None
******************************************************/
function insert_html(textBox, insertText) 
{
	textBox.focus();
        
    var startPos = textBox.selectionStart;
    var endPos = textBox.selectionEnd;
    var replace = textBox.value.substring(startPos, endPos);
    var scrollTop = textBox.scrollTop;
    
    if((startPos != endPos) && (insertText.indexOf("YOURTEXT")))
    {
		insertText = insertText.replace("YOURTEXT",replace);
    }

    textBox.value = textBox.value.substring(0, startPos) + insertText + textBox.value.substring(endPos, textBox.value.length);
    textBox.setSelectionRange(endPos+insertText.length, endPos+insertText.length); 
    
    //return caret and scroll bar to original positions
    textBox.selectionStart = startPos + insertText.length;
    textBox.selectionEnd = startPos + insertText.length;
    textBox.scrollTop = scrollTop;
} 

/*****************************************************
* html_select_change
*
* Purpose:	Event handler for HTML Select change()
*
* Params:	None
*	
* Returns:	None
******************************************************/
function html_select_change()
{
	if(htmlPasteSelect.selectedIndex > 0)
	{
		insert_html(pageEditBox, htmlSelectCode[htmlPasteSelect.selectedIndex]);
		// set index back to 0 to get description of the select box
		htmlPasteSelect.selectedIndex = 0;
	}
}

/*****************************************************
* html_select_img_change
*
* Purpose:	Event handler for Image Select change()
*
* Params:	None
*	
* Returns:	None
******************************************************/
function html_select_img_change()
{
	if(htmlImgSelect.selectedIndex > 0)
	{
		insert_html(pageEditBox, htmlSelectSrc[htmlImgSelect.selectedIndex]);
		// set index back to 0 to get description of the select box
		htmlImgSelect.selectedIndex = 0;
	}
}

/*****************************************************
* populate_select
*
* Purpose:	Populate a select element with array values
*
* Params:	select: select element to populate
*			values: array of textual options
*	
* Returns:	None
******************************************************/
function populate_select(select, values)
{
	var x;
	for(x = 0; x < values.length; x++)
	{
		var choice = document.createElement('option');
		choice.value = 'option1';
		choice.appendChild(document.createTextNode(values[x]));
		select.appendChild(choice);
	}
}

/*****************************************************
* add_button
*
* Purpose:	To add a button to a form
*
* Params:	appendToForm: Form to add button to
*			buttonName:	  Button name to display (value)
*			clickEvent: Click handler for the button	
*	
* Returns:	None
******************************************************/
function add_button(appendToForm, buttonName, clickEvent)
{
	var newBut = document.createElement('INPUT');
	
	newBut.type = "button";
	newBut.value = buttonName;
	newBut.addEventListener("click", clickEvent, true);
	appendToForm.insertBefore(newBut, appendToForm.elements[appendToForm.elements.length]);
}

/*****************************************************
* create_table
*
* Purpose:	To create a simple FUMBBL style table
*			prompting for the number of rows and columns
*			and prompting for row headers
*
* Params:	None	
*	
* Returns:	None
******************************************************/
function create_table()
{
	var x, y;
	var rows, columns;
	var tableHTML = "<table style='border: 2px solid black; margin-left: auto; margin-right: auto;' border=\"0\" cellpadding=\"5\" cellspacing=\"0\">\n";
	var useRowHeaders;
			
	columns = prompt("Please enter the number of colums required","2");
	
	if(columns != null)
	{
		if(isNaN(columns) == true)
		{
			alert("Please enter numeric values only");
		}
		else
		{
			rows = prompt("Please enter the number of rows required","3");
			
			useRowHeaders = confirm("Would you like Row Headers?");
			
			if(isNaN(rows) == true)
			{
				alert("Please enter numeric values only");
			}
			else
			{
				if(rows != null)
				{
					for(x = 0; x < rows; x++)
					{
						if(x == 0)
						{
							tableHTML += "<tr style='text-align: center; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; color: white; background: rgb(0, 0, 0)' valign=\"top\">\n";
						}
						else
						{
							if((x%2) == 0)
							{
								tableHTML += "<tr class=\"even\" align=\"center\">\n";
							}
							else
							{
								tableHTML += "<tr class=\"odd\" align=\"center\">\n";
							}
						}
						
						for(y = 0; y < columns; y++)
						{
							if((x == 0) || (useRowHeaders && y==0))
							{
								tableHTML += "<th>col" + y + "</th>\n";
							}
							else
							{
								tableHTML += "<td>r" + x + "c" + y +"</td>\n";
							}
						}
						tableHTML += "</tr>\n";
					}
					tableHTML += "</table>";
					pageEditBox.value=pageEditBox.value+tableHTML;
					
					alert("Use comments to remove the HTML line breaks FUMBBL inserts."); 
				}
			}
		}
	}
}

/*****************************************************
* enhance_edit_page
*
* Purpose:	To parse a FUMBBL edit page and add 
*			some commonly requested enhancements
*
* Params:	None	
*	
* Returns:	None
******************************************************/
function enhance_edit_page() 
{
	if(location.href.match('&op=edit'))
	{
		var pageForms = document.getElementsByTagName('form');
		var pageEditForm = pageForms[pageForms.length-1];
		var pageTextareas = document.getElementsByTagName('textarea');
				
		/*** configure textarea ***/
		
		//get reference to textarea for global use		
		pageEditBox = pageTextareas[pageTextareas.length-1];//pageEditForm.elements[3];
		
		// set textarea size
		pageEditBox.cols = editbox_col_size;
		pageEditBox.rows = editbox_row_size;
		
		/*** Add HTML Comments buttons */
		add_button(pageEditForm, "Add Comments", add_comments);
		add_button(pageEditForm, "Remove Comments", strip_comments);
		add_button(pageEditForm, "Create Table", create_table);
		
		/*** Create the HTML selection element ***/
		
		//get reference to HTML Tag Select for global use	
		htmlPasteSelect = document.createElement('select');

		populate_select(htmlPasteSelect, htmlSelectTag);
		htmlPasteSelect.addEventListener("change", html_select_change, true);
		pageEditForm.insertBefore(htmlPasteSelect, pageEditForm.elements[pageEditForm.elements.length]);
		
		//get reference to Img Select for global use	
		htmlImgSelect = document.createElement('select');
		
		populate_select(htmlImgSelect, htmlSelectImg);
		htmlImgSelect.addEventListener("change", html_select_img_change, true);
		pageEditForm.insertBefore(htmlImgSelect, pageEditForm.elements[pageEditForm.elements.length]);
		
		

	}	
}

enhance_edit_page();

