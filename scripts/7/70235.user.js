// ==UserScript==
// @name           Online List Cleaner 2.0 by r0zir
// @namespace      http://homewarez.pl
// @include        http://homewarez.pl/index.php
// @include        http://homewarez.pl/viewtopic.php
// @include        http://homewarez.pl/viewforum.php
// ==/UserScript==

 	var rangi = new Array();
	rangi["rgb(255, 0, 0)"] = "Admin";
	rangi["rgb(13, 140, 137)"] = "Mod";
	rangi["rgb(0, 100, 0)"] = "SMod";
	rangi["rgb(110, 95, 142)"] = "Uplinker";
	rangi["rgb(197, 196, 198)"] = "Uploader";
	
	var ekipa = new Array();
	var out = new Array();
	
	elements = document.getElementsByTagName('span');
	for(var i in elements)
	{
		if(elements[i].className == 'gensmall' && /to forum:/.test(elements[i].innerHTML))
		{
			var onlineObj = elements[i];
			var usersOnline = onlineObj.getElementsByTagName('a');
			for(i=0;i<usersOnline.length;i++){if(rangi[usersOnline[i].style.color]) {ekipa[i] = new Array(usersOnline[i],rangi[usersOnline[i].style.color]);}}
			
			var io = 0;
			for(var r in rangi)
			{
				for(var ii in ekipa){if(ekipa[ii][1]==rangi[r]) out[io] = ekipa[ii][0];io++;}
			}
			
			var next = onlineObj.firstChild.nextSibling; var pre = next.nodeValue;
			next = next.nextSibling; pre += '<b>'+next.innerHTML+'</b>';
			next = next.nextSibling; pre += next.nodeValue;
			next = next.nextSibling; 
			next = next.nextSibling; pre += '<br />'+next.nodeValue;
			next = next.nextSibling; pre += '<b>'+next.innerHTML+'</b>';
			next = next.nextSibling; pre += next.nodeValue+'<br />Ekipa online: ';
			
			onlineObj.innerHTML = pre;
			for(var iii in out){onlineObj.appendChild(out[iii]); if(iii < out.length-1) {var odstep = document.createTextNode(', ');onlineObj.appendChild(odstep);}}
			break;
		}
	}  
