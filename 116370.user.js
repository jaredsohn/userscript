// ==UserScript==
// @name Change Color
// @namespace com.kobaj
// @description Change the Color of CoFo
// @include http://www.computerforum.com*
// ==/UserScript==

var numberofthemes = 6;

//TODO
//get and set post box/comment box image colors better

//dun touch this
//********************************//
var options = [];
for (var i = 0; i < numberofthemes; i++)
{
    options = options.concat(document.createElement('option'));
}

//overview
//********************************//
//name of your theme 

options[0].innerHTML = "Dark";
options[1].innerHTML = "White";
options[2].innerHTML = "default";
options[3].innerHTML = "Invert";
options[4].innerHTML = "Green";
options[5].innerHTML = "Red";

//********************************//
//specials

var smallfontText = ["#ffffff", "#000000", "", "#ffffff", "", ""];
var timeText = ["#ffffff", "#000000", "", "#ffffff", "", ""];

var tborderColor = ["#000000", "#999", "", "#999", "", ""];


//********************************//
//quickreply

var panelSurroundColor = ["#555555", "#ffffff", "", "#000000", "", ""];
var panelColor = ["#555555", "#ffffff", "", "#111111", "", ""];

//********************************//
//vbulletin_editor
var editorPanelColor = ["#333333", "#ffffff", "", "#000000", "", ""];

var vbmenuoptionColor = ["#333333", "#ffffff", "", "#000000", "", ""];
var vbmenuoptionText = ["#ffffff", "#000000", "", "#fff", "", ""]; 

//********************************//
//tcat 

var tcatColor = ["#222222", "#ffffff", "", "#202020", "", ""];
var tcatText = ["#ffffff", "#000000", "", "#fff", "", ""]; //

//********************************//
//.alt2 .alt2active #headerbar

var alt2Color = ["#444444", "#ffffff", "", "#0E0E0E", "", ""];
var alt2Text = ["#ffffff", "#000000", "", "#ffffff", "", ""];

//********************************//
//alt1 alt1active

var alt1Color = ["#666666", "#ffffff", "", "#000000", "", ""];
var alt1Text = ["#ffffff", "#000000", "", "#ffffff", "", ""];

//********************************//
//page body

var pageColor = ["#888888", "#ffffff", "", "#333333", "", ""];
var pageText = ["#ffffff", "#000000", "", "#ffffff", "", ""];

//********************************//
//thead bands of color

var prefColor = ["#000000", "#ffffff", "", "#cc4400", "#193300" ,"#550000"];
var prefText = ["#ffffff", "#000000", "", "#fff", "", ""]; //

//put it all together!
//********************************//

var vbmenuoption = document.getElementsByClassName('vbmenu_option');

var ttop = document.getElementsByClassName('header_bg');

var thead = document.getElementsByClassName('thead');
var tfeet = document.getElementsByClassName('tfoot');
var vbmenu_control = document.getElementsByClassName('vbmenu_control');

var tcat = document.getElementsByClassName('tcat');

var alt2 = document.getElementsByClassName('alt2');
var alt2active = document.getElementsByClassName('alt2Active'); 
var headerbar = document.getElementById('headerbar'); 

var alt1 = document.getElementsByClassName('alt1');
var alt1active = document.getElementsByClassName('alt1Active');

var page = document.getElementsByClassName('page');

var panelSurround = document.getElementsByClassName('panelsurround');
var panel = document.getElementsByClassName('panel');

var smallfont = document.getElementsByClassName('smallfont');
var time = document.getElementsByClassName('time');

var tborder = document.getElementsByClassName('tborder');

var vbEditor = document.getElementsByClassName('vBulletin_editor');
var vbEditorButtons = document.getElementsByClassName('imagebutton');

var heads = document.getElementsByTagName('h1');
var heads2 = document.getElementsByTagName('h2');

var shades = document.getElementsByClassName('shade');

//links

//functions
//********************************//
var index = 0;

function ChangeBackgroundColors(elementsT, inputColor)
{
    var i=0;
    for (i=0;i<elementsT.length;i++)
    {
        elementsT[i].style.setProperty("background", inputColor, "important");
    }
    return;
}

function ChangeTextColors(elementsT, inputColor)
{
    for(var i = 0; i < elementsT.length; i++)
    {
        elementsT[i].style.setProperty("color", inputColor, "important");
    }
    return;
}

function clearTtop()
{
	for(var i = 0; i < ttop.length; i++)
    {
        ttop[i].style.setProperty("background-image", "", "important");
    }
    return;
}

function SetAllBackgrounds()
{
	ChangeBackgroundColors(vbmenuoption, vbmenuoptionColor[index]);

	ChangeBackgroundColors(ttop, prefColor[index]);
    ChangeBackgroundColors(thead, prefColor[index]);
    ChangeBackgroundColors(tfeet, prefColor[index]);
    ChangeBackgroundColors(vbmenu_control, prefColor[index]);
    
    ChangeBackgroundColors(tcat, tcatColor[index]);
    
    ChangeBackgroundColors(alt2, alt2Color[index]);
    ChangeBackgroundColors(alt2active, alt2Color[index]);
    //ChangeBackgroundColors(headerbar, alt2Color[index]);
    headerbar.style.setProperty("background", alt2Color[index], "important");
    
    ChangeBackgroundColors(alt1, alt1Color[index]);
    ChangeBackgroundColors(alt1active, alt1Color[index]);
    
    ChangeBackgroundColors(page, pageColor[index]);
    //ChangeBackgroundColors(document.body, pageColor[index]);
    document.body.style.setProperty("background", pageColor[index], "important");
    
    ChangeBackgroundColors(panelSurround, panelSurroundColor[index]);
    ChangeBackgroundColors(panel, panelColor[index]);
    
    ChangeBackgroundColors(tborder, tborderColor[index]);
	
	ChangeBackgroundColors(vbEditor, editorPanelColor[index]);
	ChangeBackgroundColors(vbEditorButtons, editorPanelColor[index]);
}

function SetAllText()
{
	ChangeTextColors(vbmenuoption, vbmenuoptionText[index]);

    ChangeTextColors(thead, prefText[index]);
    ChangeTextColors(tfeet, prefText[index]);
    ChangeTextColors(vbmenu_control, prefText[index]);
    
    ChangeTextColors(tcat, tcatText[index]);
    
    ChangeTextColors(alt2, alt2Text[index]);
    ChangeTextColors(alt2active, alt2Text[index]);
    headerbar.style.setProperty("color", alt2Text[index], "important");
    
    ChangeTextColors(alt1, alt1Text[index]);
    ChangeTextColors(alt1active, alt1Text[index]);
    
    ChangeTextColors(page, pageText[index]);
    //ChangeTextColors(heads, pageColor[index]);
    //ChangeTextColors(heads2, pageColor[index]);
    document.body.style.setProperty("color", pageText[index], "important");
    
    ChangeTextColors(shades, smallfontText[index]);
    ChangeTextColors(smallfont, smallfontText[index]);
    ChangeTextColors(time, timeText[index]);
    
    //and just about the worst way to handle link color. Oh well.    
    var links = document.getElementsByTagName( 'a' );
    for ( var i = 0; i < links.length; i++ ) 
    {
        links[i].style.color = pageText[index];
    }
}

function SetTThings()
{
	clearTtop();
    SetAllBackgrounds();
    SetAllText();  
    replaceQuick();
    replaceRegular();
}

//********************************//
//DropDownMenu

var selectionBox = document.createElement('select');

function OnChange()
{
  var myIndex  = selectionBox.selectedIndex;
  //var selValue = selectionBox.options[myIndex].value;
  index = myIndex;
  SetTThings();
  SaveState();
}

selectionBox.name = "ColorChooser";
selectionBox.addEventListener("change", function(e){OnChange()},false);

for(var i = 0; i<options.length;i++)
{
    selectionBox.appendChild(options[i]);
}

document.body.appendChild(selectionBox);

//**********************************//
//Width Bar

var checked = null;

var WidthBar = document.createElement('input');
WidthBar.type = "checkbox";

function setWidth()
{
if(checked)
	{
		page[0].style.setProperty("width", "85%", "important");
	}
else
		page[0].style.setProperty("width", "100%", "important");
}

function OnCheck()
{
    checked = WidthBar.checked;
	setWidth();
	SaveState();
}

WidthBar.addEventListener("change", function(e){OnCheck()}, false);

document.body.appendChild(WidthBar);

var span = document.createElement('span');
span.innerHTML = "85%";
document.body.appendChild(span);

//********************************//
//save state

function SaveState()
{
    GM_setValue("cofoColorChoice2",index);
    GM_setValue("cofoWidthChoice2", checked);
}

function GetState()
{
    index = GM_getValue("cofoColorChoice2");
    if(index == null)
    {
        index = 0;
    }
    
    options[index].selected = "selected";
    
    checked = GM_getValue("cofoWidthChoice2");
    if(checked == null)
    {
    	checked = false;
    }

    WidthBar.checked = checked;
    setWidth();
}

//*********************************//
//fixing the text box
function replaceQuick()
{
	var quickbox = document.getElementById('vB_Editor_QR_controls');
	if (quickbox != null)
	{
		var td = quickbox.childNodes[1].childNodes[1].childNodes[0].childNodes;
	for(var i=0; i < td.length; i++)
	{
		if(td[i].nodeName == "TD")
		{
			td[i].childNodes[0].innerHTML = "<span style=\"background:" + editorPanelColor[index] + ";visibility:visable;padding:0;height:100%;width:100%;display:block;\">" + td[i].innerHTML + "</span>";
		}
	}
	}

}

//the other text box too.
function replaceRegular()
{
	var quickbox = document.getElementById('vB_Editor_001_controls');
	if (quickbox != null)
	{
		var td = quickbox.childNodes[1].childNodes[1].childNodes[0].childNodes;
		for(var i=0; i < td.length; i++)
		{
			if(td[i].nodeName == "TD")
			{
				td[i].childNodes[0].innerHTML = "<span style=\"background:" + editorPanelColor[index] + ";visibility:visable;padding:0;height:100%;width:100%;display:block;\">" + td[i].innerHTML + "</span>";
			}
		}
		
		//alert(quickbox.childNodes[3].nodeName);
		
		td = quickbox.childNodes[3].childNodes[1].childNodes[0].childNodes;
		for(var i=0; i < td.length; i++)
		{
			if(td[i].nodeName == "TD")
			{
				td[i].childNodes[0].innerHTML = "<span style=\"background:" + editorPanelColor[index] + ";visibility:visable;padding:0;height:100%;width:100%;display:block;\">" + td[i].innerHTML + "</span>";
			}
		}
	}

}

//********************************//
//always at the bottoms
GetState();

SetTThings();