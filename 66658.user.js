// ==UserScript==
// @name           clubs.dir.bg line hailight
// @namespace      *
// @include        http://clubs.dir.bg/*
// ==/UserScript==

function getElementsbyTagNameSameLevel(el,tagName)
{

	els = el.getElementsByTagName(tagName);
	var rI = 0;
	var res = Array();
	
	for(var i=0;i<els.length;i++)
	{
		if(els[i].parentNode.parentNode == el)
		{
			res[rI] = els[i];
			rI++;
		}
	}
	return res;
}


function getStyle(el,styleProp)
{
	var x = el;
	if (x.currentStyle)
		var y = x.currentStyle[styleProp];
	else 
		if (window.getComputedStyle)
			var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	return y;
}



function onMOver()
{
	if(this.classname != 'tdheader')
		this.style.backgroundColor = '#eeffff';
}

function onMOut()
{
	if(this.className == 'lighttable')
		this.style.backgroundColor = '#FFFFFF';
	if(this.className == 'darktable')
		this.style.backgroundColor = '#EEEFF2';	
		
	if(this.className == '')
		this.style.backgroundColor = '#EEEFF2';	
		//alert('');
}

function Main()
{
	var tables = document.getElementsByTagName('table');


	for(var i=0;i<tables.length;i++)
	{
	
		if(tables[i].innerHTML.indexOf('<tbody><tr><td style="padding: 6px;"><table bgcolor="#000000" border="0" cellpadding="3" cellspacing="1" width="100%">') >= 0 &&
		   tables[i].innerHTML.indexOf('<tbody><tr><td align="center" valign="top">') == -1 &&
		   tables[i].innerHTML.indexOf('<tbody><tr><td style="padding-top: 15px;" align="center" background="http://i.dir.bg/clubs/blu_0/header_bgr_2.jpg" height="131" valign="top">') == -1)
			{
				table = tables[i].childNodes[1].childNodes[0].childNodes[0].childNodes[0];
			}
	

		
	}

	var rows = getElementsbyTagNameSameLevel(table,'tr');
	for(i=0;i<rows.length;i++)
	{
		if(rows[i].className != 'tdheader' && rows[i].className != 'black_12')
		{
			rows[i].addEventListener("mouseover", onMOver, true);
			rows[i].addEventListener("mouseout", onMOut, true);
		}
	} 
}


Main();
