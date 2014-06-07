// ==UserScript==
// @name           ShowPost
// @namespace      http://userscripts.org/users/useridnumber
// @include        http://clubs.dir.bg/showthreaded.php*
// ==/UserScript==

var gPrev;

function findWidth(el)
{
	if(el.childNodes[0].innerHTML)
		var lines = el.childNodes[0].innerHTML.split('<img');
	
	if(lines)
		if(lines[1])
			if(lines[1].substring(55,57)=='10')
				return parseInt(lines[1].substring(66,lines[1].length-4))
			else
				return 0
	else 
		return -1;
				//console.debug(lines[1].substring(66,lines[1].length-4));	

}

function findParent(ch)
{
	var prev = ch.previousSibling.previousSibling;
	//alert(prev);
	var parWidth = findWidth(ch)-13;
	
	//alert(chWidth);
	while(1==1)
	{
		if(!(prev.previousSibling))
			break;
		if(findWidth(prev) == parWidth)
			break;
		
		
		//console.debug(findWidth(prev)+'|'+parWidth);
		prev = prev.previousSibling.previousSibling;
		
		//if(findWidth(prev) == chWidth)
			//alert(prev);		
	}
	//console.debug('----------');
	return prev;
	
	//prev.style.backgroundColor = '#eeffff';
}



function onMOver()
{
	//alert(this.className);
	if(this.classname != 'tdheader')
	{
		gPrev = findParent(this);
		gPrev.style.backgroundColor = 'red';
		this.style.backgroundColor = '#55FFFF';
	}
}

function onMOut()
{
	if(this.className == 'lighttable')
		this.style.backgroundColor = '#FFFFFF';
	if(this.className == 'darktable')
		this.style.backgroundColor = '#EEEFF2';		

	if(gPrev.className == 'lighttable')
		gPrev.style.backgroundColor = '#FFFFFF';
	if(gPrev.className == 'darktable')
		gPrev.style.backgroundColor = '#EEEFF2';	
	//gPrev.style.backgroundColor = '#eeeff2';
}


function gettable()
{
	var table = document.getElementsByTagName('table');
	//alert(table.length);
	
	var rows = table[19].getElementsByTagName('tr');
	
	
	for(var i=0;i<rows.length;i++)
	{
		if(rows[i].className != 'tdheader')
		{
			rows[i].addEventListener("mouseover", onMOver, true);
			rows[i].addEventListener("mouseout", onMOut, true);
		}
	}

}


gettable();