// ==UserScript==
// @name           TH Easy Keyboard Gaming
// @namespace      http://userscripts.org/users/169582
// @description    Places a button above the attack button that will attack with preferred combat item, Q to use it, S for Normal attack, D for spell, A for taming, Z to run away
// @include        *twilightheroes.com/fight.php*
// ==/UserScript==

// edit this line to add the id of the items you want to preselect, in this order
var CombatItems = '881,882,1766,1767,1768,1769,1770';
// edit this line to add the id of the spells you want to preselect, in this order
var CombatSpells = '1030,1022,1012,1011,1021';

//select item
var items = CombatItems.split(',');

var i = 0;
var t;
while(items[i])
{
	t = checkitem(items[i]);
	if(t)
		break;
	++i;
}

//select spell
var spells = CombatSpells.split(',');

var w = 0;
var u;
while(spells[w])
{
	u = checkspell(spells[w]);
	if(u)
		break;
	++w;
}

var text = document.getElementsByTagName('p');
var p = text[text.length - 1];
if(p)
{
	var button = document.getElementsByTagName('input')[3];
	
	var data = document.createElement("center");
	if(t)
	{
		data.innerHTML = '<br><input type="button" id="combat" value="' + t.innerHTML + '">';
		p.insertBefore(data,null);
	}
	
	if(document.getElementById("combat"))
	{
		document.getElementById("combat").addEventListener("click",clickitem,true);
	}
}
document.addEventListener("keydown", catchkey, true);

//click the use item button to use the selected item
function clickitem()
{
	var input = document.getElementsByTagName('input');
	var button = null;
	for (var i = 0; i < input.length; ++i) {
		if (input[i].type == 'submit' && input[i].value == "Use an Item") {
			button = input[i];
			break;
		}
	}
	if(button)
		button.click();
}

//click the normal combat attack button
function normal_attack()
{
	var input = document.getElementsByTagName('input');
	var button = null;
	for (var i = 0; i < input.length; ++i) {
		if (input[i].type == 'submit' && input[i].value.match("Attack"))
		{
			button = input[i];
			break;
		}
	}
	if(button)
		button.click();
}

//click the skill button
function spell_attack()
{
	var input = document.getElementsByTagName('input');
	var button = null;
	for (var i = 0; i < input.length; ++i) {
		if (input[i].type == 'submit' && input[i].value.match("Use a Skill"))
		{
			button = input[i];
			break;
		}
	}
	if(button)
		button.click();
}

//click the Tame button
function tame()
{
	var input = document.getElementsByTagName('input');
	var button = null;
	for (var i = 0; i < input.length; ++i) {
		if (input[i].type == 'submit' && input[i].value.match("Tame the Animal"))
		{
			button = input[i];
			break;
		}
	}
	if(button)
		button.click();
}

//Run Away button =P
function chicken()
{
	var input = document.getElementsByTagName('input');
	var button = null;
	for (var i = 0; i < input.length; ++i) {
		if (input[i].type == 'submit' && input[i].value.match("Run Away"))
		{
			button = input[i];
			break;
		}
	}
	if(button)
		button.click();
}


//check whether the current item from the select list matches the user's item choice
function checkitem(x)
{
	var select = document.getElementsByName("pickwhich");//[1];
	
	if(!select)
		return null;
		
	if(select.length == 3)
		select = select[2];
	else
		select = select[1];
		
	for(var i = 0; select[i]; ++i)
	{
		if(select[i].value == x)
		{	
			select.selectedIndex = i;
			return select[i];
		}
	}
	return null;
}



//checking if spell exists and selecting it if it does
function checkspell(z)
{
	var select = document.getElementsByName("pickwhich");//[1];
	
	if(!select)
		return null;
		
	if(select.length == 3)
		select = select[1];
	else
		select = select[0];
		
	for(var w = 0; select[w]; ++w)
	{
		if(select[w].value == z)
		{	
			select.selectedIndex = w;
			return select[w];
		}
	}
	return null;
}

//get which key was pressed and do something depending on which key it was
function catchkey(e)
{
  var keycode;
  if(window.event)
  {
    keycode = window.event.keyCode;
  } else if(e)
  {
    keycode = e.which;
  }
  switch(keycode)
  {
	case 83: //s
	  normal_attack();
	  break;
	case 68: //d
	  spell_attack();
	  break;
	case 65: //a
	  tame();
	  break;
	case 90: //z
	  chicken();
	  break;
	case 81: //q
	  clickitem();
	  break;
    default:
      break;
  }
}