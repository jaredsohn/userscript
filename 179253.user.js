// ==UserScript==
// @name        Deloc'
// @namespace   ***
// @description Affiche la date de délocation des zones Kube
// @include     http://kube.muxxu.com/zone/choose
// @author      Titi_Alone
// @version     1.1
//@grant        none
// ==/UserScript==

function daysToHours(days){return days*24;}
function hoursToMilliseconds(hours){return (new Date().getTime()+(hours*60*60*1000));}
function prettyDate(date){return ""+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+"";}
timers = document.getElementsByClassName("timer");
prec = 0;
for(i=0; i<timers.length; i++) {
element = document.createElement("p");
/([0-9]+)j ([0-9]+)h/.exec(timers[i].innerHTML);
if(prec==RegExp.$1) {
date = 0;
} else {
date = RegExp.$1;
}
prec = RegExp.$1;
element.innerHTML = "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAppJREFUOMulU01PE2EQflExYICjF5Sw6g8gGhPjL/CiFxNxuWhI+hdM/AUexI+ICPEjXj0gftxKhFppC6Utu+2W0u522+0nbaG0gOVg2DzOvMjFK5tM5p15Z55n5nmzQpz0657wXe6fWrk/MB1W+9+E1b6pFbX39bLaMxlSz5H1vgqqfZNB9ezLgHr6xZJ66vkvteuZf0w89d0RT7x9gpo9ylzRvfK9iktfylDmSri9UMXdxSoeRxp4FK5hdKGEG1+z6H5n4MzbOLpmdIjJsEMAihicCY2PzGYOr81lcfWzhZFZE6PeHMa8NsZ/2Hg4b+HmbArXPxkY+qjhwocYBt/HcH562R6YmB8Wi2vJBxHL+aPlywilsohYBXhXdaxk8vAbGcRyFfzUU1g1HcyHNUTpfimR5jrz21J4SNhZy9Pa2XEPOr9RrVRAZxiJBJrb2ygVCzjodGCZpozjuo52q4XU+joa9bqjra0pwjRNTzabdVt0USqVsLu7iwoD/Yu3trZQKBSwubmJjY0NFItFUD17R9d1ReRyOY9lWW6z2QR5CUCgspEbuNEwDOTzeQQCAZmLxWIM4iQSCUVkMhkPmVutVrFOo5XLZQmwQ6uk02nJyM31el0yb9MqTETmEPARQCgUcjnp8/lkkd/vl02apsmYPQPF43G5TiQS4bNDBIqgRg8xu8dMPDIXMRPneDLO84oc7+3tyclolaMJbNv2EKObTCbBxs2pVAq1Wk3GPFk0GoXjOAgGg/KeJyIBHao7moDQ3GOmRqMhdWARO/SEbO12G/v7+9I4Zk/3DgFLgHHS4JDHY2QGYGZm5EZ+FRaQzywsN/N6lLPpNYYFiXGRVL9HQCqto5JoKsXSOPe/Z6OaMRL/FonZc+K/+S/6fcoPz/4zCQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAwOS0wOS0xM1QxNjo0OToxNiswMjowMEsZjnsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMDktMDktMTNUMTY6NDk6MTYrMDI6MDA6RDbHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==\"> <strong><span style=\"color:maroon;\">Expire le</span> "+prettyDate(new Date(hoursToMilliseconds(daysToHours(date))))+"</strong>";
timers[i].parentNode.insertBefore(element, timers[i].nextSibling);
}