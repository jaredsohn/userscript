// ==UserScript==
// @name		FTO Times
// @namespace		http://userscripts.org/tags/faerytaleonline
// @include		*faerytaleonline.com/main.php
// @version		1.3
// @description		FTO tweak for times in chat. Click on a date to change from FTO format to real life format, and back. Double click a date to mark last chat message you read.
// @icon		http://faerytaleonline.com/favicon.ico
// ==/UserScript==

var colour = "#FF0000";
var highlight = true;

var ftonow = ftotorl(document.getElementById("location").parentNode.parentNode.parentNode.rows[1].cells[1].textContent);
var chat = document.getElementById("insert_response").children;

var saveddate, savedoffset;

var charname,charbname;
for(var i=0;i<document.forms.length;i++)
	if(document.forms[i].name=="namefrm"){
		charname = document.forms[i].elements[2].value;
		//alert(document.forms[i].elements[2].parentNode.parentNode.parentNode.parentNode.nodeName);
		charbname = document.forms[i].elements[2].parentNode.parentNode.parentNode.parentNode.rows;
		charbname = charbname[charbname.length-2].children[1].textContent;
		charbname = charbname.slice(1);
		break;
	}



if(saveddate = pokazCookie(charname)){
	saveddate = saveddate.split("|");
	savedoffset = saveddate[1];
	saveddate = saveddate[0];
}
var curentmarked=0;
var rx = /.+\d+.+\d+/;

for(var i=0;i<chat.length;i++) {
	var b = chat[i].firstChild.firstChild.firstChild.firstChild.firstChild;
	var time = new Date();
	time.setMinutes(0,0,0);
	time.setHours(time.getHours()-ftonow+ftotorl(b.textContent));
	
	var pnode = b.insertBefore(document.createElement("span"),b.firstChild);
	var node = pnode.insertBefore(document.createElement("span"),pnode.firstChild);
	node.textContent=pnode.nextSibling.textContent;
	var node2 = pnode.insertBefore(document.createElement("span"),pnode.firstChild);
	node2.textContent=time.toLocaleString();
	if(node.textContent.indexOf(":")!=-1)
		node2.textContent+=" - ";
	node2.style.display="none";
	b.removeChild(pnode.nextSibling);
	
	pnode.addEventListener("click",function(){
		if(this.firstChild.style.display=='none'){
			this.children[0].style.display='inline';
			this.children[1].style.display='none'
		}else{
			this.children[1].style.display='inline';
			this.children[0].style.display='none'
		}
	},false);
	
	if(saveddate){
		if(!curentmarked && (saveddate==node.textContent.match(rx)[0]))
			curentmarked=1;
		else
			if(curentmarked==1 && (saveddate!=node.textContent.match(rx)[0])){
				curentmarked=chat[i-savedoffset];
				curentmarked.style.borderTop ="1px solid red";
			}
	}
	
	
	pnode.addEventListener("dblclick",function(){	
		if(curentmarked)curentmarked.style.borderTop ="";
		curentmarked=this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		curentmarked.style.borderTop ="1px solid red";
		saveddate=this.children[1].textContent.match(rx)[0];
		for(i=1,step=curentmarked;(step=step.nextSibling).nodeName=="TABLE";i++)
			if(step.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.children[1].textContent.match(rx)[0]!=saveddate)
				break;
		savedoffset=i;
		ustawCookie(charname,saveddate+"|"+savedoffset);
				
		
	},false);
	
	if(highlight){
		rxcharname = new RegExp(charname, "g");
		rxcharbname = new RegExp(charbname, "g");
		chat[i].firstChild.children[1].innerHTML = chat[i].firstChild.children[1].innerHTML.replace(rxcharname, '<span style="color: '+colour+';">'+charname+'</span>');
		chat[i].firstChild.children[1].innerHTML = chat[i].firstChild.children[1].innerHTML.replace(rxcharbname, '<span style="color: '+colour+';">'+charbname+'</span>');
	}
	
	//node2.onclick="if(this.style.display=='none'){this.style.display='inline';this.nextSibling.style.display='none'}else{this.nextSibling.style.display='inline';this.style.display='none'}";
	//node.onclick="if(this.style.display=='none'){this.style.display='inline';this.previousSibling.style.display='none'}else{this.previousSibling.style.display='inline';this.style.display='none'}";
}


var exp = new Date();
exp.setMonth(exp.getMonth()+6);

function ustawCookie(nazwa, wartosc) 
 {
 document.cookie = nazwa + "=" + escape(wartosc) + "; expires=" + exp.toGMTString()
 }

function pokazCookie(nazwa) 
 { 
 if (document.cookie!="") 
  {
  var toCookie=document.cookie.split("; ");  
  for (i=0; i<toCookie.length; i++) 
   {
   var nazwaCookie=toCookie[i].split("=")[0]; 
   var wartoscCookie=toCookie[i].split("=")[1]; 
   if (nazwaCookie==nazwa) return unescape(wartoscCookie)
   }
  }
  return 0;
 }

function ftotorl(date){
	var year = parseInt(date.match(/, (\d+) -/)[1]),
		hour = parseInt(date.match(/hr (\d+)/ )[1]),
		day  = 		date.match(/([^,]+),/ )[1],
		months = ["Khelek", "Losse", "Kuile", "Rosa", "Lote", "Urnu", "Naur", "Elen", "Gurtha", "Lasse", "Vasa", "Ringwe"];
		
	return (months.indexOf(day) + 1) * 12+year*12*12+hour;
}
