// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IC Aid Page transformation
// @namespace     http://www.imperialconflict.com
// @description   This script modifies the aid page quite radically
// @include       http://www.imperialconflict.com/aid.php
// ==/UserScript==

var gold = 0;
var endu = 0;
var food = 0;
var iron = 0;
var octa = 0;

function checkField(field, res)
{
	if((field.indexOf(res) !== -1) && (field.indexOf('input') == -1))
		return true;
	else
		return false;
}

function loader()
{
	var elems = document.getElementsByTagName('td');
	var elem;
	var restemp;
	
	var amountregex = /[0-9]+/gi;

	for(i = 0; i < elems.length; i++)
	{
		elem = elems[i].innerHTML.toString();
		restemp = '';
		
		//if(elem.indexOf('gold') != -1)
		if(checkField(elem, 'gold'))
		{
			if(elem.indexOf('<img') !== -1)
				restemp = elem.substr(elem.indexOf('>')+1, elem.length);
			else
				restemp = elem.replace(/gold/gi, '');
			gold = parseInt(restemp);
		}
		else if(checkField(elem, 'endurium'))
		{
			if(elem.indexOf('<img') !== -1)
				restemp = elem.substr(elem.indexOf('>')+1, elem.length);
			else
				restemp = elem.replace(/endurium/gi, '');
			endu = parseInt(restemp);
		}
		else if(checkField(elem, 'food'))
		{
			if(elem.indexOf('<img') !== -1)
				restemp = elem.substr(elem.indexOf('>')+1, elem.length);
			else
				restemp = elem.replace(/food/gi, '');
			food = parseInt(restemp);
		}
		else if(checkField(elem, 'iron'))
		{
			if(elem.indexOf('<img') !== -1)
				restemp = elem.substr(elem.indexOf('>')+1, elem.length);
			else
				restemp = elem.replace(/iron/gi, '');
			iron = parseInt(restemp);
		}
		else if(checkField(elem, 'octarine'))
		{
			if(elem.indexOf('<img') !== -1)
				restemp = elem.substr(elem.indexOf('>')+1, elem.length);
			else
				restemp = elem.replace(/octarine/gi, '');
			octa = parseInt(restemp);
		}
	}
	
	var elems2 = document.getElementsByTagName('p');
	var elem2 = elems2[elems2.length - 2];
	
	elem2.innerHTML = '<input type="button" id="send" value="Parse form" />';
	
	elem2.innerHTML += '<br /><br /><div style="color: #CC0000; text-align: center;"><small>You can enter "a", "h", "t", "q" and "f" to fill in all, half, a third, a quarter or a fifth respectively. A percentage is also possible (ie. 15%).</small></div>';
}

function applyFormatting(curtotal, type)
{
	var percentage = false;
	
	switch(type)
	{
		case '':
			return '';
		break;
		case 'all':
		case 'a':
			return curtotal;
		break;
		case 'half':
		case 'h':
			return Math.floor(curtotal/2);
		break;
		case 'third':
		case 't':
			return Math.floor(curtotal/3);
		break;
		case 'quarter':
		case 'q':
			return Math.floor(curtotal/4);
		break;
		case 'fifth':
		case 'f':
			return Math.floor(curtotal/5);
		break;
	}
	
	if(type.toString().indexOf('%') !== -1)
	{
		var percentage = parseInt(type);
		return Math.floor(curtotal * (percentage / 100));
	}
}

function doForm(event)
{
	var target = event ? event.target : this;
	
	if(target.type != "button" && target.id != "send")
		return false;
	
	var forms = document.getElementsByTagName('form')[0];
	var inputs = forms.getElementsByTagName('input');
	for(j = 0; j < inputs.length; j++)
	{
		if(inputs[j].name == 'cash')
			inputs[j].value = applyFormatting(gold, inputs[j].value);
		else if(inputs[j].name == 'endurium')
			inputs[j].value = applyFormatting(endu, inputs[j].value);
		else if(inputs[j].name == 'food')
			inputs[j].value = applyFormatting(food, inputs[j].value);
		else if(inputs[j].name == 'iron')
			inputs[j].value = applyFormatting(iron, inputs[j].value);
		else if(inputs[j].name == 'octarine')
			inputs[j].value = applyFormatting(octa, inputs[j].value);
	}
}

window.addEventListener('click', doForm, true);
window.addEventListener('load', loader, true);