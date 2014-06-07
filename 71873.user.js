// ==UserScript==
// @name           vhdl tutorial
// @namespace      djurex.no-ip.biz
// @description    Changes frames position
// @include        http://www.vhdl-online.de/tutorial/englisch/*
// ==/UserScript==

	// GM_log( document.getElementsByTagName('body'));
	document.bgColor = '#183050';
//	document.fgColor = '#D8F0D0';
	document.fgColor = '#FFB040';
	document.linkColor = '#FFB040';
	
	var li = document.getElementsByTagName('*');
	
	// var newLi = document.createElement('LI');
	
	var style;
	
	 for ( var i = li.length -1; i >= 0; i--)
	{
	
		if(li[i].tagName == 'IMG')
		{
			// GM_log(li[i].src);
			if(li[i].src != 'http://www.vhdl-online.de/tutorial/englisch/t_18.gif'
				&& li[i].src != 'http://www.vhdl-online.de/tutorial/englisch/t_1.gif')
				li[i].style.backgroundColor = 'lightblue';
		}
		else
			li[i].style.color = '#FFB040';
		
		/* newLi.textContent = li[i].textContent
		style = getComputedStyle(li[i], '');
		GM_log(style.color);
		li[i].textContent = '';
		li[i].parentNode.insertBefore(newLi, li[i]);
		newLi = document.createElement('LI'); */
		
	} 
	var frameset = document.getElementsByTagName('FRAMESET')[0];
	if( frameset)
		frameset.rows = "30%,*";

	var frame = document.getElementsByTagName('FRAME');
	// GM_log( frame[0].src);
	if( frame[0])
	{
		var tmp = frame[0].src;
		frame[0].src = frame[1].src;
		frame[1].src = tmp;
	}
	
	
