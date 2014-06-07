// ==UserScript==
// @name           NI Experience123
// @namespace      http://nordinvasion.com
// @description    Calculates the experience for you
// @include        http://www.nordinvasion.com/
// @include        http://nordinvasion.com/
// ==/UserScript==

var obj = document.getElementsByClassName('halfpane')[0].getElementsByClassName('assist_list')[0];

//alert(obj.getElementsByTagName('li').length);

for (var i = 2; i < obj.getElementsByTagName('li').length-1; i++)
{
	var temp = obj.getElementsByTagName('li')[i].getElementsByTagName('span')[0];
	// alert(temp);
	temp.innerHTML = '<a class="a' + i + '">' + temp.innerHTML + '</a>';
}

addEvents();

function getAssistValue()
{
	return obj.getElementsByTagName('li')[0].innerHTML.split('</span>')[1].replace(' xp', '').replace(' ', '');
}

function addEvents()
{
	obj.getElementsByClassName('a2')[0].addEventListener('click', function(){inputEXP('assist_ranged')}, false);
	obj.getElementsByClassName('a3')[0].addEventListener('click', function(){inputEXP('assist_melee')}, false);
	obj.getElementsByClassName('a4')[0].addEventListener('click', function(){inputEXP('assist_mounted')}, false);
	obj.getElementsByClassName('a5')[0].addEventListener('click', function(){inputEXP('assist_gold')}, false);
}

function inputEXP(name)
{
	var fields = ['assist_ranged','assist_melee','assist_mounted','assist_gold']
	// alert('inputting');
	var assist = getAssistValue();
	
	if (name == 'assist_ranged') {
		assist -= (assist % 5);
		fields.splice(0,1);
	}
	else if (name == 'assist_melee')
	{
		assist -= (assist % 2);
		fields.splice(1,1);
	}
	else if (name == 'assist_mounted')
	{
		assist -= (assist % 10);
		fields.splice(2,1);
	}
	else if (name == 'assist_gold')
	{
		assist -= (assist % 5);
		fields.splice(3,1);
	}
	for(i in fields)
	{
		document.getElementsByName(fields[i])[0].value = 0;
	}
	// alert(fields);
	
	document.getElementsByName(name)[0].value = assist;
}

//make other boxes 0 when you click on it.