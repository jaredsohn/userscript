// ==UserScript==
// @name           qntdw
// @description    Dodaje w widoku tematu przycisk "Nowy Temat"
// @include        http://*darkwarez.pl/forum/*
// ==/UserScript==

if(/viewtopic\.php/.test(window.location))
{

	var elements = document.getElementsByTagName("img");
	for(i=0;i<elements.length;i++)
	{
		if(elements[i].alt == "Odpowiedz do tematu") 
		{
			var open = 1;
			tede = elements[i].parentNode.parentNode.parentNode;
			break;
		}
	}


	var elements = Array.filter( document.getElementsByClassName('nav'), function(elem){ return elem.nodeName == 'A';});  
	for(var i in elements)
	{
		if( /f=([0-9]+)/.test(elements[i].href) ) {arr = elements[i].href.split(/f=/);fromforum=arr[1];break;}
	}


	if(fromforum && fromforum != '16')
	{
		var newt = document.createElement("td");
		newt.innerHTML = '<a href="posting.php?mode=newtopic&amp;f='+fromforum+'"><img border="0" alt="Napisz nowy temat" src="templates/bLock/images/lang_english/post.gif"></a>';
		tede.parentNode.insertBefore(newt,tede);
		
	}
	
}