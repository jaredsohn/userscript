// ==UserScript==
// @name				Last iw
// @namespace	iwlian
// @include			http://hentaiverse.org/?s=Battle&ss=iw*
// @version			1.51
// ==/UserScript==
if (document.getElementById("togpane_log"))return
if (document.getElementById('riddlemaster'))return
document.onkeyup = keyDown
if ( localStorage.iwag==1){   //跳转页面
	localStorage.iwag=0
	itemworld.set_selected_item(localStorage.eqNo, localStorage.eqName);
	itemworld.commit_transaction()
}
iwspan = document.createElement("div");
iwspan2 = document.createElement("div");
iwspan.style.cssText = "z-index:4;font-size:25px;color:red; position:absolute; top:430px; left:700px ;text-align:left";
iwspan2.style.cssText = "z-index:4;font-size:25px;color:black; position:absolute; top:550px; left:700px ;text-align:left";

iwspan.style.cursor='pointer'
iwspan2.style.cursor='pointer'
iwspan.innerHTML="<br>记录装备(快捷键:s)<br>Record equipment(Hotkey:s)"
iwspan2.innerHTML="<br>快捷进入(快捷键:z或x):<br>GoTo itemword(Hotkey:z or x):<br>"+'<span style=\"background:#666666;color:#FFFFFF\" >'+localStorage.eqName+'</span>'
iwspan.onclick=function (){document.addEventListener('mousedown',mkeyDown);alert("在该页面右键点击装备即可记录\nRight click on your equipment in this page.");}
iwspan2.onclick=function (){localStorage.iwag=1;document.location.href=localStorage.iwlink;}

document.body.appendChild(iwspan);
document.body.appendChild(iwspan2);

function getRoot(x) {
return document.evaluate('ancestor::div[@class="eqdp" or @class="eqde"]',x,null,9,null).singleNodeValue;
}
function mkeyDown(e){
if (e.which != 3) return;	
currentItem = getRoot(e.target);
if (!currentItem) return;
temp=currentItem.outerHTML.match(/([0-9]+), \'([A-Z][a-zA-Z ]+)/)
localStorage.eqNo=temp[1]
localStorage.eqName=temp[2]
localStorage.iwlink=document.location.href
iwspan2.innerHTML="<br>快捷进入(快捷键:z或x):<br>GoTo itemword(Hotkey:z or x):<br>"+'<span style=\"background:#666666;color:#FFFFFF\" >'+localStorage.eqName+'</span>'
}
function keyDown(e){
	var key = String.fromCharCode(e.keyCode).toLowerCase();
	if (key=='s') iwspan.onclick();
	if (key=='z'||key=='x') iwspan2.onclick();
}


