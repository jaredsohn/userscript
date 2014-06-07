// ==UserScript==
// @name           Filter Farm
// @namespace      Peeranat
// @include        http://*.travian.*/build.php?gid=16&tt=99
// @include        http://*.travian.*/build.php?id=39&tt=99
// ==/UserScript==
container = document.getElementById("raidList")

btcheck = document.createElement("input")
btcheck.setAttribute("type","button")
btcheck.setAttribute("onclick","filterFarm()")
btcheck.setAttribute("value","Filter Farm")

function filterFarm(){
var table = document.querySelector("table.list")
//var imgs = document.querySelectorAll("img.full")
var imgs = document.querySelectorAll("img.iReport3, img.iReport2")
table.innerHTML = ""
for(i=0;i<imgs.length;i++){
	table.appendChild(imgs[i].parentNode.parentNode)
}

};

container.insertBefore(btcheck,container.firstChild)


var Script = document.createElement('script');
Script.setAttribute('type', 'text/javascript');

Script.innerHTML =  filterFarm
var target = document.getElementsByTagName('head')[0].getElementsByTagName('script')[0];
target.parentNode.insertBefore(Script, target);