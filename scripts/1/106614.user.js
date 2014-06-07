// ==UserScript== 
// @name           OSM Track analyzer
// @namespace           osm
// @version        1.10
// @description    Adds an statistic info to track pages
// @include        http://www.openstreetmap.org/user/*/traces*
// @include        http://www.openstreetmap.org/traces*
// @match        http://www.openstreetmap.org/user/*/traces*
// @match        http://www.openstreetmap.org/traces*
// ==/UserScript==

function getscript(src) {
	var newscript = document.createElement('script');
	newscript.setAttribute('type','text/javascript');
	newscript.setAttribute('src', src);
	document.body.appendChild(newscript);
	return newscript;
}

var ids = [];
var re2 = /<a href="[^"]*traces\/([0-9]+)/;

var table = document.getElementById("trace_list");
var result = /http.*traces\/([0-9]+)/.exec(document.location);
var isTable = (result == null);

// Preparing callback function and injecting it in document
var newscript = document.createElement('script');
newscript.setAttribute('type','text/javascript');
var newscripttext = document.createTextNode("var isTable=" + isTable.toString() + ",table = document.getElementById(\"trace_list\"),re2=/<a href=\"[^\"]*traces\\/([0-9]+)/;function formatTable(data){var html='';var max=0;var maxk;for(var k in data){switch(k){case\"distance\":html+=\"<tr><td>Distance:</td><td>\"+parseFloat(data[k]).toFixed(2)+\" km</td></tr>\";break;case\"maxspeed\":html+=\"<tr><td>Maximal speed:</td><td>\"+parseFloat(data[k]).toFixed(2)+\" km/h</td></tr>\";break;case\"minspeed\":html+=\"<tr><td>Minimal speed:</td><td>\"+parseFloat(data[k]).toFixed(2)+\" km/h</td></tr>\";break;case\"uselesspoints\":html+=\"<tr><td>Useless points:</td><td>\"+data[k]+\"</td></tr>\";break;case\"usefulpoints\":html+=\"<tr><td>Useful points:</td><td>\"+data[k]+\"</td></tr>\";break;case\"timestart\":html+=\"<tr><td>Start time:</td><td>\"+data[k]+\"</td></tr>\";break;case\"timestop\":html+=\"<tr><td>Stop time:</td><td>\"+data[k]+\"</td></tr>\";break;case\"timespan\":html+=\"<tr><td>Time span:</td><td>\"+data[k]+\"</td></tr>\";break;case\"bbox\":html+=\"<tr><td>Bounding box:</td><td>\"+data[k]+\"</td></tr>\";break;case\"avgspeed\":html+=\"<tr><td>Average speed:</td><td>\"+parseFloat(data[k]).toFixed(2)+\" km/h</td></tr>\";break;case\"transport\":for(var sk in data[k]){if(data[k][sk]>max){max=data[k][sk];maxk=sk}}html+=\"<tr><td></td><td><div class='tai \"+maxk+\"'></div></td></tr>\";break;default:html+=\"<tr><td>\"+k+\":</td><td>\"+data[k]+\"</td></tr>\";break}}return html}function formatCell(data){var html='<td class=\"tta\">';var list=[];var max=0;var maxk;for(var k in data){switch(k){case\"distance\":list.push(\"Distance: \"+parseFloat(data[k]).toFixed(2)+\" km;\");break;case\"maxspeed\":list.push(\"Maximal speed: \"+parseFloat(data[k]).toFixed(2)+\" km/h;\");break;case\"avgspeed\":list.push(\"Average speed: \"+parseFloat(data[k]).toFixed(2)+\" km/h;\");break;case\"transport\":for(var sk in data[k]){if(data[k][sk]>max){max=data[k][sk];maxk=sk}}html+=\"<div class='tait \"+maxk+\"'></div>\";break;default:}}html+=(list.join(\"<br>\")+\"</td>\");return html}function inject(response){if(isTable){var rows=table.getElementsByTagName('tr');for(var i in rows){if(parseInt(i)!=parseInt(i))continue;result=re2.exec(rows[i].innerHTML);if(result!=null)rows[i].innerHTML+=formatCell(response[result[1]])}}else{var result = /http.*traces\\/([0-9]+)/.exec(document.location);table=document.getElementById(\"content\").getElementsByTagName(\"table\")[0];table.innerHTML+=formatTable(response[result[1]])}}");
newscript.appendChild(newscripttext);
document.body.appendChild(newscript);

if (isTable) {
  var tabletext = table.innerHTML;
  var re = new RegExp("<td class=\"table[01]\"><a href=\"[^\"]*traces/([0-9]+)\">([\\s\\S]*?)</td>", "g");
  while ((result = re.exec(tabletext)) != null)
    if (result[2].search(/trace_public|trace_identifiable/) != -1)
      ids.push(result[1]);
}
else {
  ids.push(result[1]);
}

// Querying!
getscript('http://traces.osmosnimki.ru/stat?ids=' + ids.join(",") + '&callback=inject');

// Preparing style and injecting this in the document
var style = document.createElement("style");
var styletext = document.createTextNode(".tai{width:32px;height:32px;} .tait{width:32px;height:32px;float:left;} .tta{min-width:220px;} .foot{background:url('data:image/gif;base64,R0lGODlhIAAgAKIAAABA0gJB0gdG0zNm20164Iuo68jW9f///ywAAAAAIAAgAAADYAi63P4wykmrvTjrzTskR+E9xnEEY1McRtoIgsuUrAyaJpEOeL+HONoIFMABboNOwSAwAgaFpKdpEsloORfvAFgddCOvotTybK2gcoe8uKE62UUp8N6EVCeZfs/v+/9/CQA7')} .bicycle{background:url('data:image/gif;base64,R0lGODlhIAAgAKIAAABA0gZF0xVQ1ixh2k164H2e6LXI8u/z/CwAAAAAIAAgAAADhQi63P4wykmrvTjrzbv/nmCMSnCcnnkURNseg2ecNG10wnkvxxxgg5ohJ1D4agQK4ZAMHgKzQuGQQy0LE6aCOVIxpwAYIJhVTEe9E1YLDsciB8VgNENvsYGkW7JikERmcQtLEzlDc08AAm9hTAJTehIiOj8PUyeMIJqbnJ2en6ChoqOkCgkAOw%3D%3D')} .auto{background:url('data:image/gif;base64,R0lGODlhIAAgAKIAAABA0gRC0hNO1Slf2U154Iel6sTT9f///ywAAAAAIAAgAAADXAi63P4wykmrvTjrzbv/YChWxWEc5jl4pTIU7kFwrSIYCwpXQYn+wOBvJjkZCichkEDQTQ5IqE9JOJVwEtNvGjQkUxPBlDBgmpm3X8BifMpG8Lh8Tq/b7/i8XpEAADs%3D')} .train{background:url('data:image/gif;base64,R0lGODlhIAAgAKIAAABA0v///4yo6wpI1BNO1Sdd2V2F4sXT9CwAAAAAIAAgAAADfgi63P4wykmrvThrNgoBw7A5g2EaRSqOAHEaAuqx8BGf81gER39+LICAJ7gVgoTeIRdUGAIBYHPxDEwdsQd0m4Euhl6rQlzZms0AMplybqfRFqVc/uaW23g4O89fRwI7UGABg4MGGAdQSYqJUY0rE3OSkz1XlpeYmZqbnJ0KCQA7')} .avia{background:url('data:image/gif;base64,R0lGODlhIAAgAKIAAABA0gxJ1BpU1zNm22WM5Jex7c/b9////ywAAAAAIAAgAAADeQi63P4wykmrvTjrHcngUnEQYGQcRfkIB6o6Q2sUdGHcuBFkROv/P0MmBgwSBJpe0UDYcZS+5ksUdJZOrcFJp/IJA9tuiwQAHwyDNPnCajHMv9SFuFYQZXWK0qpQCjUicgwnBWmAB3wKJ0gcHw4Cfy+Sk5SVlpeYFgkAOw%3D%3D')}");
style.appendChild(styletext);
document.body.appendChild(style);