// ==UserScript==
// @name           F Sprüche
// @namespace      uptodate_userscripts
// @author		   uptodate
// @version		   1.7
// @description    Spruch Generator
// @include        http://*
// ==/UserScript==




(function()
	{
el = document.getElementsByTagName("input");

for(i = 0; i < el.length; i++)
{
el[i].onclick=function()
		{
		switch(Math.ceil(Math.random(1,3)*10))
			{
			case 1:alert("Du lügst ...");
			break;
			case 2:alert("Ihr wisst nicht wie es ist immer die Krone aufzuhaben");
			break;
			case 3:alert("Da müsst ihr halt die Queries rumschreiben");
			break;
			case 4:alert("Ihr wisst ja gar nicht wie das ist.");
			break;
			case 5:alert("Das wurde niemals besprochen");
			break;
			case 6:alert("Zeig mir Diagramme");
			break;
			case 7:alert("Immer bleibt alles an mir hängen !");
			break;
			case 8:alert("Ohne PK ist alles schneller!");
			break;
			case 9:alert("Ich nehm euch alle mit");
			break;
			case 10:alert("Das war alles Andres Idee")
		}
	}
    }
el = document.getElementsByTagName("button");
for(i = 0; i < el.length; i++)
{
el[i].onclick=function()
		{
		switch(Math.ceil(Math.random(1,3)*10))
			{
			case 1:alert("Du lügst ...");
			break;
			case 2:alert("Ihr wisst nicht wie es ist immer die Krone aufzuhaben");
			break;
			case 3:alert("Da müsst ihr halt die Queries rumschreiben");
			break;
			case 4:alert("Ihr wisst ja gar nicht wie das ist.");
			break;
			case 5:alert("Das wurde niemals besprochen");
			break;
			case 6:alert("Zeig mir Diagramme");
			break;
			case 7:alert("Immer bleibt alles an mir hängen !");
			break;
			case 8:alert("Ohne PK ist alles schneller!");
			break;
			case 9:alert("Ich nehm euch alle mit");
			break;
			case 10:alert("Das war alles Andres Idee")
		}
	}
    }
}
)()