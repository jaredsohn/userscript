// ==UserScript==
// @name           Onclick to Links on OTR
// @description  Onclick to Links on OTR
// @include        http://*.onlinetvrecorder.com/left.php
// ==/UserScript==

var tds=document.getElementsByTagName("td");
var frameChange=/.*parent\.mainFrame\.location\.href=['"](.*?)['"].*/i;
var popupOpen=/.*window\.open.*?\(.*?['"](.*?)['"].*/i;

for (var i=0;i<tds.length;i++){
	var td=tds[i];
	onClick=td.getAttribute("onclick");
	
	if(onClick!=""){
		var createLink=false;
		if(frameChange.test(onClick)) createLink=frameChange.exec(onClick)[1];
		else if(popupOpen.test(onClick)) createLink=popupOpen.exec(onClick)[1];
		
		 if(createLink){
			td.setAttribute("onclick","")
			content=td.innerHTML;
			td.innerHTML="";
			tdlink=document.createElement("a");
			tdlink.href=createLink;
			tdlink.style.textDecoration="none";
			tdlink.target="mainFrame";
			
			tdcontent=document.createElement("div");
			tdcontent.style.width="100%";
			tdcontent.innerHTML=content;
			
			tdlink.appendChild(tdcontent);
			td.appendChild(tdlink);
		}
	}
}
