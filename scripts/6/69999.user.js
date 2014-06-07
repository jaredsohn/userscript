// ==UserScript==
// @name		OGame (minimiza automaticamente imagem de cabecalho 
// @namespace	http://andromeda.ogame.com.ar/gmscripts/
// @description	Automaticamente minimiza as imagens de algunas paginas
// @include		http://uni111.ogame.com.pt/*
// @unwrap

// @copyright   Year, Author (Author Homepage)
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version 0.0.1
// @uso:script scriptid
// @uso:version versionid
// @attribution Attribution Name (Attribution Script Homepage)
// @author      John Doe
// @contributor Jane Doe (http://www.example.com/janedoe)
// @contributor Jack Doe (http://www.example.com/jackdoe)
// @contributor Jill Doe (http://www.example.com/jilldoe)

// @homepage http://www.example.com/myhomepage

// ==/UserScript==

// zona de mensajes
if (location.href.indexOf('?page=messages') != -1)
{
	document.getElementById('planet').className = 'shortHeader';
}
// zona de enviar flotas
else if (location.href.indexOf('?page=fleet') != -1)
{
	document.getElementById('planet').className = 'shortHeader';
}
// zona de ver movimientos de flotas
else if (location.href.indexOf('?page=movement') != -1)
{
	document.getElementById('planet').className = 'shortHeader';
}
// zona de alianza y circular
else if (location.href.indexOf('?page=network') != -1)
{
	document.getElementById('planet').className = 'shortHeader';
}

	//alert(location.href);

