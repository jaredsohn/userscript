// ==UserScript==
// @name           Travian Notebook Plus 
// @description    you can write infomation and save it.(now you can open/close the note)
// @version        3.0
// @include        http://*.travian*.*/nachrichten*
// ==/UserScript==

var newTarget = document.createElement('div');
newTarget.innerHTML = '<div id="Note"></div>';
var Target = document.getElementById('overview');
Target.parentNode.appendChild(newTarget, Target);

function saveNote(){
var elem1 = document.createElement("div");
elem1.innerHTML = '<div id="saved">- saved -</div>';
var tags0 = document.evaluate("id('saved')", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags0.snapshotLength; i++)
{var del0 = tags0.snapshotItem(i); del0.parentNode.removeChild(del0);}
var saved = document.getElementById("btn");
saved.parentNode.appendChild(elem1);
}

function ShowNoteBook() {
var note = document.getElementById('Note'); var saves = GM_getValue("notepadlog");
note.innerHTML = ''+
'<div id="block"><textarea id="notic"></textarea><p class="btn"><input type="button" value="save" id="btn"></p></div>';
var savebutton = document.getElementById('btn');
savebutton.addEventListener("click", savelog, false);
savebutton.addEventListener("click", saveNote, false);
function savelog() {var writtentext = document.getElementById('notic').value;
GM_setValue("notepadlog", writtentext);} 
var textboxy = document.getElementById('notic').value = saves;
};

var a = document.createElement("span");
a.innerHTML = '<span id="show"><a href="javascript:void(0)">show Note</a>';
a.addEventListener("click", function(){ ShowNoteBook(false); }, 0);
a.addEventListener("click", function(){ addCloser(false); }, 0);
a.addEventListener("click", function(){ RemoveIt(false); }, 0);
var target1 = document.getElementById("textmenu");
target1.parentNode.insertBefore(a, target1);

function showit(){
var a = document.createElement("span");
a.innerHTML = '<span id="show"><a href="javascript:void(0)">show Note</a>';
a.addEventListener("click", function(){ ShowNoteBook(false); }, 0);
a.addEventListener("click", function(){ addCloser(false); }, 0);
a.addEventListener("click", function(){ RemoveIt(false); }, 0);
var target1 = document.getElementById("textmenu");
target1.parentNode.insertBefore(a, target1);}

function CloseNoteBook(){
var tags1 = document.evaluate("id('block')", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags1.snapshotLength; i++)
{var del1 = tags1.snapshotItem(i); del1.parentNode.removeChild(del1);}
var tags2 = document.evaluate("id('close')", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags2.snapshotLength; i++)
{var del2 = tags2.snapshotItem(i); del2.parentNode.removeChild(del2);}}

function RemoveIt(){
var tags3 = document.evaluate("id('show')", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags3.snapshotLength; i++)
{var del3 = tags3.snapshotItem(i); del3.parentNode.removeChild(del3);}
}

function addCloser(){
var a2 = document.createElement("span");
a2.innerHTML = '<span id="close"><a href="javascript:void(0)">Close Note</a>';
a2.addEventListener("click", function(){ CloseNoteBook(false); }, 0);
a2.addEventListener("click", function(){ showit(false); }, 0);
var target2 = document.getElementById("textmenu");
target2.parentNode.insertBefore(a2, target2);}