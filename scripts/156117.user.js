// ==UserScript==
// @name        teszt4
// @namespace   teszt
// @include     *.playdom.com/games/mistwood/*
// @version     1
// ==/UserScript==


newBubi();
newCheck1();
document.getElementById("bubi").innerGTML+='<br><br><br><br>';
newCheck2();



var timerId = 0;


function newBubi(){
	var hova = document.getElementsByTagName("body")[0];
	var mit = document.createElement("DIV");
	hova.appendChild(mit);
	mit.id = "bubi";
	mit.style.width = 100+"px";
	// mit.style.height = 20+"px";
	mit.style.border = "2px solid";
	mit.style.position = "fixed";
	mit.style.top = "50px";
	mit.style.right = "50px";
	mit.style.backgroundColor = "#CCC";
	mit.style.zIndex = "5000";
	mit.style.padding = "10px";
	mit.style.textAlign = "left";
	
}

function newCheck1(){
	var hova = document.getElementById("bubi");
	var mit = document.createElement("input");
	hova.appendChild(mit);
	mit.id = "chb";
	mit.type = "checkbox";
	mit.onclick=function(){indit();}
	checkName1();
}

function checkName1(){
	var hova = document.getElementById("bubi");
	var mit = document.createElement("span");
	hova.appendChild(mit);
	mit.innerHTML='adat folyam';
}



function newCheck2(){
	var hova = document.getElementById("bubi");
	var mit = document.createElement("input");
	hova.appendChild(mit);
	mit.id = "lista";
	mit.type = "checkbox";
	mit.onclick=function(){lista();}
	checkName2();
}

function checkName2(){
	var hova = document.getElementById("bubi");
	var mit = document.createElement("span");
	hova.appendChild(mit);
	mit.innerHTML='lista nyit';
}


function lista(){
	ch=document.getElementById('lista').checked;
	if (!ch){
		document.getElementById('play_sidebar').style.height='1345px;';
		document.getElementById('play_feed_bg').style.height='1231px';
		document.getElementById('play_feed_list').style.height='1095px';
		document.getElementById('play_feed_list').style.zIndex='1';
		document.getElementById('footer').style.zIndex='1000';
	}else{
		document.getElementById('play_sidebar').style.height='5000px';
		document.getElementById('play_feed_bg').style.height='5000px';
		document.getElementById('play_feed_list').style.height='5000px';
		document.getElementById('play_feed_list').style.zIndex='1000';
		document.getElementById('footer').style.zIndex='1';
	}
}



function indit(){
	ch=document.getElementById('chb').checked;
	if (ch){
		timerID = setInterval(function(){kattingat()},3000);
	}else{
		clearInterval(timerID);
	}
}


var link_idk = new Array();
function kattingat(){
	var div = document.getElementById("play_feed_list");
	for (i=0;i<div.childNodes.length;i++){
		if (div.childNodes[i].className=='play_feed_item'){
			var val=div.childNodes[i].id;
			var inArray = false;
			for (j = 0; j < link_idk.length; j++){
				if (val == link_idk[j]){
					inArray = true;
				}
			}
			if (!inArray){
				link_idk.push(val);
				var div2=document.getElementById(val);
				for (j=0;j<div2.childNodes.length;j++){
					var elem=div2.childNodes[j];
					if (elem.className=='homeFeedSource_system'){
						for (k=0;k<elem.childNodes.length;k++){
							var elem2=elem.childNodes[k];
							
							var n=-1;
							if (elem2.className=='play_feed_item_text'){
								n=elem2.innerHTML.indexOf("energy"); 
							}
							if (n<0 && elem2.className=='play_feed_item_action clear'){
								var link=elem2.getElementsByTagName('a')[0];
								if (elem2.style.display!='none'){
									link.click();
									// alert(link.innerHTML);
								}
							}
						}
						// if (elem.innerHTML!='NEED ENERGY help them!'){}
					}
				}
				
				
			}
		}
	}
	// alert(link_idk.length);
}

