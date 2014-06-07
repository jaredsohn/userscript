// ==UserScript==
// @name           EasyGate
// @namespace      Ogame
// @description    Selection automatique d'une porte par défaut...
// @include        http://*.ogame.*/game/index.php?page=infos&*
// ==/UserScript==

var moonsOrder=['1991818', "2090864"]

var selected=false;
try
{

	var sel=document.getElementById('content').getElementsByTagName("select")[0];

	for(var i=0;i<sel.options.length;i++)
	{
		if(sel.options[i].getAttribute('value')==moonsOrder[0])
		{
			sel.options[i].selected=true;
			selected=true;
		}
	}
	if(!selected)
		for(var i=0;i<sel.options.length;i++)
		{
			if(sel.options[i].getAttribute('value')==moonsOrder[1])
			{
				sel.options[i].selected=true;
				selected=true;
			}
		}
}catch(e){}