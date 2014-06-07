// ==UserScript==
// @name 101.ru no banners
// @description 101.ru adds remover
// @match http://101.ru/*
// @include http://101.ru/*
// ==/UserScript==
function getElement(id)
{		
	return document.getElementById(id);
}
function doDirtyJob()
{
	if (getElement('player_banner')==null)
	{
		window.setTimeout(doDirtyJob,100);
		return;
	}
	var node = getElement('player_submenu').nextSibling;
	while (node.tagName != 'DIV') 
	{
		node=node.nextSibling;		
	}
	if (node.id!='player_content')
	{
		node.style.display = 'none';	
	}
	getElement('player_banner').style.display='none';
	getElement('player_footer').style.display = 'none';
	getElement('playfoot_wide').style.display = 'none';	
}

window.setTimeout(doDirtyJob,100);