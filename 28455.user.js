/**
* @Author H22CREATIONS
* @Copyright 2009
*/


// ==UserScript==
// @name           VCDQuality Tor
// @namespace           VCDQuality_Tor
// @include      http://*vcdq.com/*
// @description    Adds Links to popular torrent sites in VCDQuality.com
// ==/UserScript==

img_height = 14;
img_width = 14;


tor_width = 2 * img_width + 2;
table = document.getElementById('content').getElementsByTagName('table')[0];
lines = table.getElementsByTagName("tr");
img_mininova="<img src='data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////ANx3RgDdEREA7rmeAOWXbgD44NcA8825AOuphAD68ekA34BQAOJ+RgDx0MEA/PLxAP/99wDmkmsAMzMzMzMzMzMxEREREREREzERERERERETMRERERERERMxonHCoRUkEzGiccKhFSQTMaJxwqEVJBMxonHCsRUkEzGiQXItHyQTMaK08iVCJxMxoosixSL+EzGZ7W0eZuETMRERERERERMxEREREREREzERERERERETMzMzMzMzMzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' width='" + img_width + "' height='" + img_height + "' />";
img_torrentz="<img src='data:image/x-icon;base64,R0lGODlhEAAQAAAAACwAAAAAEAAQAIbUViT8rpQ8WnR0ipycVkT83sxscny0VjT88uykrrz0ekxcWmRUboREWnzc4uz8Ziz8ZiTMViz87uT0VhRMWmyEVlSEmqysVjz8+vysusRsWlzM0txkepTs7vTMsqyEkqSMVky8WjRMZoRcboxEYnykpqzs7uxMWnS0wszcViT8upxEWnR8jqT84tyUcmy8VjT89vRkWmREXnzk5uzEytR0foz8VhRUWmx8WlT8/vy0vsx0WlxsfpRMaoRccoz8/vwAQJMCpPttAhi49wEYuPcBELz3AQT7bQJGD5J8fgAAABC89wEAABEBELj3ARB8lgIQfJYCJPttAkYPknx+AAAAEHyWAgAAEQEQeJYCAAARAQAAEQF4AREB+PttApEOknwIBhEBbQWSfAAAAAAYeJYChAUeAQAAcwEQeJYCEHiWAngBEQEYeJYCGHiWApAlkwE4/G0CeAERAXgBEQEQuPcBELj3ARh4lgKAAAAAgAAAAIxHsCAAAAAAUPxtAhi49wEHf4A5OTkYKCwiIhwlMzk5OTk5OTkONTsVAg0CDTIJGDkSBTkOBiAxKScCDQICDSUBKhgYPBcVAgICAgIrMRcAHjk5NA0RLzELGhUXKSkgKzwYORYCMSk2NjY2ABorAg0yMzkjAg0rGhU2NhUCDQICDSg5PQICDQIENjYUDQICDQJ/gBk5PgINAisANgANAgINAg00ORYrDQI3EzYHAg0CDQIkMzkbDQICODY2FQINAgICAzk5OSwCDSA2NhUCAg0CMhs5OTkmHAIHNjYaDQ0rDTo5OTk5OR0fITY2OAICDCg5OTk5OTk5EgoPEC4fOh05OTk5OTk5CC0IGDAwOTk5OQaAOTk5OYEAOw==' width='" + img_width + "' height='" + img_height + "' />";

function get_search_query(line){
	TDs=line.getElementsByTagName("td");
	//Name
	name=TDs[2].textContent.replace('*NEW*','');
	name=name.replace(/\*(.*?)\*/g, "$1");
	name=name.replace(/'/g, "\"");
	name=name.replace(/R\d{1}(\s|\.)/ig, "");
	name=name.replace(/(\(.*?\))/g, "");
	//Quality
	quality=TDs[1].textContent.replace(/ /g, "");
	quality=quality.replace(/UNKNOWN/ig, "");
	quality=quality.replace(/SCREENER/ig, "SCR");
	quality=quality.replace(/TELESYNC/ig, "TS");
	quality=quality.replace(/TELECINE/ig, "TC");
	quality=quality.replace(/TV/ig, "");
	quality=quality.replace(/LASERDISC/ig, "");
	//Group
	group=TDs[7].textContent.replace(/ /g, "");
	
	
	search_query=name+' '+quality+' '+group;
	search_query=search_query.replace(/\s(\s*)/g, " ");
	search_query=search_query.replace(/\s/g, "+");
return search_query;
}

function generate_td_innerHTML(search_query){
s=new Array();
s[0]="<a href='http://www.mininova.org/search/?search="+search_query+"' title='Mininova'>"+img_mininova+"</a>"
s[1]="<a href='http://www.torrentz.com/search?q="+search_query+"' title='Torrentz'>"+img_torrentz+"</a>";
return s.join("");
}

table = document.getElementById('content');
lines = table.getElementsByTagName("tr");

//TH
	//Widen Comment
		comment_th=lines[0].getElementsByTagName("th")[9];
		comment_th.setAttribute("style","white-space: nowrap; width: 80px;");

column_after=lines[0].getElementsByTagName("th")[3];
newTH=document.createElement('th');
newTH.setAttribute("width",tor_width);
newTH.innerHTML='Tor';
column_after.parentNode.insertBefore(newTH, column_after);

//TD
for (var i=1;i<lines.length;i++) { 
	line=lines[i];
	newTD=document.createElement('td');
	
	search_query=get_search_query(line);
	newTD.innerHTML=generate_td_innerHTML(search_query);
	
	column_after=line.getElementsByTagName("td")[3];
	column_after.parentNode.insertBefore(newTD, column_after);
}