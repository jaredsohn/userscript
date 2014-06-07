// ==UserScript==
// @name           Ogame Send All Resources
// @namespace      Oliver
// @description    Adds a link to send the minimum ships to carry all your resources
// @include        http://*.ogame.org/game/index.php?page=flotten1*
// ==/UserScript==

var total = 0;
var resources = document.getElementById('resources').getElementsByTagName('tr')[2].getElementsByTagName('font');
for (var i=0; i<3; i++)
	total = total + parseInt(resources[i].innerHTML.replace(/\./g,''));

var forms = document.getElementsByTagName('form');
var rows = forms[forms.length - 1].getElementsByTagName('tr');

for (var i=2; i<rows.length - 3; i++)
{
	var inputs = rows[i].getElementsByTagName('input');
	var mod = rows[i].getElementsByTagName('th')[2];
	var maximum = inputs[0].value;
	var id = inputs[0].name.substr(3);
	var capacity = inputs[3].value;
	if (capacity > 5)
	{
		var required = Math.ceil(total / capacity);
		var num = Math.min(maximum, required);
		var plus = "";
		if (maximum < required)
			plus = "-";
		mod.innerHTML = mod.innerHTML + "(<a href=\"#t\" onclick=\"javascript:document.getElementsByName('"+id+"')[0].value="+num+"\">"+required+plus+"</a>)";
	}
}

