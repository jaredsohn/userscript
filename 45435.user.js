// ==UserScript==
// @name                All Jobs Locator
// @version             1
// @namespace           GV
// @author              VP
// @description         TheWest hidden job locator
// @include		http://*.the-west.*/game.php
// @include		http://*.the-west.*/game.php#
// ==/UserScript==

window.onload=btn();

function btn()
{

var button=document.createElement('input');
button.type='button';
button.value='Jobs';
$('right_menu').appendChild(button);
button.addEventListener('click', function()
{
loadData();
}, false);

}

function loadData()
{
remoldopt();
var element=document.getElementById('minimap_job_id');
for(var e=0;e<element.childNodes.length;e++){
element.removeChild(element.childNodes[e]);
}
var names=new Array(94);
for(var i=1;i<94;i++){
if(i!=81 && i!=89){
unsafeWindow.JobList[i].malus=1;
names[i]=unsafeWindow.JobList[i].name;
}
}
var sorted = new String(names.sort()).split(/,/);
for (var z=0;z<sorted.length;z++)
{
createoption(sorted[z],getId(sorted[z]));
}

function getId(lname)
{
for(var x=1;x<94;x++)
{
if (x != 89 && x!= 81)
{
if (unsafeWindow.JobList[x].name==lname){
return x
}
}
}
}

}

function remoldopt()
{
e = document.getElementById('minimap_job_id');
while (e.childNodes.length != 0)
{
e.removeChild(e.childNodes[0]);
}
e.style.color = 'rgb(33, 99, 99)';
var reg=new RegExp('gr'); //server language so as jobs don't get out of range
if (reg.test(document.location))
{
document.getElementById('minimap_list').style.paddingLeft='1px';
}
}

function createoption(thename, theid)
{
if (thename){
var elem=document.createElement('option');
elem.innerHTML=thename;
elem.value=theid;
elem.style.color='blue';
document.getElementById("minimap_job_id").appendChild(elem);
}
}

function $(id){return document.getElementById(id);}