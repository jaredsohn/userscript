// ==UserScript==
// @name           richedit every site - jede beliebige Seite bearbeiten und speichern/drucken
// @namespace      wktools.net
// @description    Dieses Script blendet oben links einen Button ein, über den man in den edit-Modus wechseln kann und die jeweilige Seite ähnlich wie in Word beliebig bearbeiten kann
// @include        *
// ==/UserScript==

editPanel=document.createElement("div");
with(editPanel.style){
  position="fixed";
  top="20px";
  left="20px";
  backgroundColor="#ffffff";
  fontFamily="arial";
  fontSize="12px";
}
editPanel2=document.createElement("span");

startEdit=document.createElement("span");
startEditImg=document.createElement("img");
startEditImg.src="data:image/gif;base64,R0lGODlhEAAQAIQaAAAAAAcHBw8PDxcXFx8fHycnJy8vLzc3Nz8/P0dHR09PT1dXV19fX2dnZ29v"+
"b3d3d39/f4eHh4+Pj5eXl5+fn6enp6+vr7e3t7+/v8fHx////////////////////////yH5BAEK"+
"AB8ALAAAAAAQABAAAAU7ICCOZCl+aKqq56pmGdq6XwTH8xrt8Jenu6AM4AruUj9jhEUEGlczpaslnTYBQlpLtKT5ml5mGGoqj0IAOw==";
startEditImg.title="Start editing";
startEditImg.addEventListener("click", function(e){
  document.designMode="On";
  startEdit.style.display="none";
  editing.style.display="";
}, false);

startEdit.appendChild(startEditImg);
editPanel2.appendChild(startEdit);

editing=document.createElement("span");
with(editing.style){
  display="none";
}
editingImg=document.createElement("img");
editingImg.src="data:image/gif;base64,R0lGODlhEAAQAKECAAAAAISEhP///////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAIALAAA"+
"AAAQABAAAAIxhI9pwu2+RHhtihUyzTNy911ApUmlCHInmq4s6UaMusphyOKmhbl7TpkxZEGI4ngoAAA7";
editingImg.title="End editing";
editingImg.addEventListener("click", function(e){
  document.designMode="off";
  startEdit.style.display="";
  editing.style.display="none";
}, false);
editing.appendChild(editingImg);

editPanel2.appendChild(editing);
editPanel.appendChild(editPanel2);

opencloseDiv=document.createElement("span");
with(opencloseDiv.style){
  position="relative";
  top="-5px";
}

minDiv=document.createElement("span");
minDiv.appendChild(document.createTextNode("_"));
minDiv.addEventListener("click", function(e){
  minDiv.style.display="none";
  maxDiv.style.display="";
  editPanel2.style.display="none";
  opencloseDiv.style.top="";
}, false);
opencloseDiv.appendChild(minDiv);

maxDiv=document.createElement("span");
maxDiv.style.display="none";
maxDiv.appendChild(document.createTextNode("~"));
maxDiv.addEventListener("click", function(e){
  minDiv.style.display="";
  maxDiv.style.display="none";
  editPanel2.style.display="";
  opencloseDiv.style.top="-5px";
}, false);
opencloseDiv.appendChild(maxDiv);

closeDiv=document.createElement("span");
closeDiv.appendChild(document.createTextNode("x"));
closeDiv.addEventListener("click", function(e){
  editPanel.style.display="none";
}, false);
opencloseDiv.appendChild(closeDiv);

editPanel.appendChild(opencloseDiv);

document.body.appendChild(editPanel);