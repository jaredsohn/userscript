// ==UserScript==
// @name           Easy Combat Item Use
// @namespace      http://userscripts.org/users/169582
// @description    Places a button above the attack button that will attack with preferred combat item
// @include        *twilightheroes.com/fight.php*
// ==/UserScript==

//this is the only line you need to edit to put
//in new/different combat item choices
var CombatItems = '1766,1767,1768,1769,1770,881,883,882,879,880';




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
		document.addEventListener("keydown", catchkey, true);
	}
}

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
	case 68: //d
	  normal_attack();
	  break;
	case 70: //f
	  spell_attack()
	  break;
	case 87: //w
	  clickitem();
	  break;  
    default:
      break;
  }
}