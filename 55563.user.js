// ==UserScript==
// @name           Kurnik.pl - wszystkie pokoje
// @namespace      localhost
// @description    Odblokowuje pelne pokoje
// @include        http://www.kurnik.pl/*/
// ==/UserScript==
 
url = location.href.split("/");

lang = url[url.length-3];

html = document.body.innerHTML;

pos = html.search("gid=");

game = html.substr(pos + 4, 2);

for(tableIndex = 0; tableIndex<2;tableIndex++)
{
	table = document.body.getElementsByTagName("TABLE")[tableIndex];
	rooms = table.getElementsByTagName("B");
	for(rx = 0; rx < rooms.length; rx++)
	{
		if(rooms[rx].innerHTML.substr(0,2)!="<a")
		{
			rooms[rx].innerHTML = "<a target=\""+game+"\" onclick=\"return rm('"+ game + "','/?"+game +"="+ rooms[rx].innerHTML +"');\" href=\"http://ko.kurnik.pl/?" + game + "=" + rooms[rx].innerHTML +"\">" + rooms[rx].innerHTML +"</a>";
		}
	}
}