// ==UserScript==
// @name          Monitor.hr ads fix
// @namespace     http://wreza.bloger.hr
// @description	  Removes paid articles on www.monitor.hr (v0.1)
// @include       http://*monitor.hr/*
// ==/UserScript==

function monitor_hr_walker(obj, n, from_position)
{

	if(obj==undefined) return null;
	
	if(obj.innerHTML=="Sponzorirana vijest")
	{
		monitor_hr_do_the_block(obj.parentNode, from_position);
		return null;
	}
	
	var group = obj.childNodes;
	for (var i = 0; i < group.length; i++)
	{
		monitor_hr_walker(group[i], n+1, i);
	}
	return true;
}

function monitor_hr_do_the_block(obj, from)
{

	while(obj.childNodes[from-1].nodeType!=8) from--;
	
	from--;

	do
	{
		obj.removeChild( obj.childNodes[from] );
	}
	while( obj.childNodes[from]!=undefined && obj.childNodes[from].title!="Permalink");

}

monitor_hr_walker(document.body, 0, 0);
