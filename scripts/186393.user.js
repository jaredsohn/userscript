// ==UserScript==
// @name           GrooveShark show playlist in plain text
// @author         ajax333221
// @description    makes a list of the songs from the playlist in plain text for easy copy-paste
// @version        1.0
// @include        http://grooveshark.com/*
// @include        http://*.grooveshark.com/*
// ==/UserScript==

window.onload=function(){
	var myElem;
	
	myElem=createOrSelectDIV("showListTrigger");
	myElem.style.position="fixed";
	myElem.style.top="0px";
	myElem.style.width="10px";
	myElem.style.height="10px";
	myElem.style.background="#59dd54";
	myElem.style.zIndex=1001;
	myElem.onclick=showList;
	
	document.body.insertBefore(myElem,document.body.childNodes[0]);
};

function createOrSelectDIV(elemId){
	var temp;
	
	temp=document.getElementById(elemId);
	
	if(!temp){
		temp=document.createElement("div");
		temp.id=elemId;
	}
	
	return temp;
}

function showList(){
	var i,len,temp,myElem,allDivs,songList,songNum,plTitle,clsName;
	
	if(~document.URL.indexOf("/playlist/")){
		songList="";
		songNum=0;
		allDivs=document.getElementsByTagName("div");
		
		for(i=0,len=allDivs.length;i<len;i++){
			temp=allDivs[i];
			clsName=(" "+temp.className+" ");
			
			if(~clsName.indexOf(" module-row-cell ")){
				if(~clsName.indexOf(" song ")){
					songNum++;
					songList+=(songNum+") \""+temp.firstChild.innerHTML+"\" - ");
				}else if(~clsName.indexOf(" artist ")){
					songList+=(temp.firstChild.innerHTML+"\n");
				}
			}
		}
		
		temp=document.getElementById("playlist-title");
		plTitle=(temp?(temp.innerHTML.split("<span")[0]+"\n--------------------\n"):"");
		
		myElem=createOrSelectDIV("listHolder");
		myElem.innerHTML="<a id='listHider' style='color:#ccc;'>close [ x ]</a><br><textarea style='width:500px;height:230px;color:#bbb;background:#1b1b1b;'>"+plTitle+""+(songList.slice(0,-1)||"songs not found and/or the page was still loading.")+"</textarea>";
		myElem.style.position="fixed";
		myElem.style.top="230px";
		myElem.style.left="100px";
		myElem.style.background="#3f3f3f";
		myElem.style.textAlign="right";
		myElem.style.padding="5px";
		myElem.style.zIndex=1002;
		
		document.body.insertBefore(myElem,document.body.childNodes[0]);
		
		temp=document.getElementById("listHolder");
		document.getElementById("listHider").onclick=function(){temp.parentNode.removeChild(temp);};
	}
}