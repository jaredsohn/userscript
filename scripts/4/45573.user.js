// ==UserScript== 
// @name           Ogame Statistics Distancer
// @namespace      Oliver
// @description    Modifies Ogame statistics page to show distances to homeworlds
// @include        http://uni*.ogame.org/game/index.php?page=statistics*
// ==/UserScript==



//CONFIGURATION
var range = 50;
//END CONFIG

var homesys = document.getElementById('header_top').getElementsByTagName('option')[0].innerHTML.split('[')[1].split(':')[1];

var fields = document.getElementById('content').getElementsByTagName('th');
for (var i=2; i < (fields.length); i = i+5)
{
	link = fields[i].getElementsByTagName('a');
	url = link[0].href;
	var target = url.split('&');
	if (target.length > 3)
	{
		var text = target[3].split('=')[1]+'.'+target[4].split('=')[1]+'.'+target[5].split('=')[1];
		var dist = Math.abs(parseInt(target[4].split('=')[1]) - homesys);
		var clr = Math.round(dist / (range/255));
		if (clr > 255)
			clr = 255;
		tmp = link[0].innerHTML;
		var rd;
		var gn;
		if (clr < 127)
		{
			rd = (clr*2).toString(16);
			if (rd.length == 1)
				rd = '0'+rd;
			gn = 'ff';
		}
		else
		{
			rd = 'ff';
			gn = (255-(clr-128)*2).toString(16);
			if (gn.length == 1)
				gn = '0'+gn;
		}
		var clrstr = rd+gn+'00';
		
		link[0].innerHTML = tmp+' (<font color='+clrstr+'>'+dist+'</font>)';
	}
}