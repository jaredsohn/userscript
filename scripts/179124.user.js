// ==UserScript==
// @name           HV - fastdebuff
// @namespace      smishe
// @version        1.1
// @match          http://hentaiverse.org/?s=*

// ==/UserScript==


if(document.getElementById("monsterpane")){


var monsterList = document.getElementById("monsterpane").getElementsByClassName("btm1");
var monLength = monsterList.length;


function imp(t){
document.getElementById("213").click();
document.getElementById("monsterpane").getElementsByClassName("btm1")[t].click();
}

function auto_imp(){
    for(i=0;i<monLength;i++){
		if(monsterList[i].onmouseover){
			var procAll = monsterList[i].querySelectorAll(".btm6 img");		
			var imp_sign = 0;
			if(procAll.length != 0){
				for(j=0;j<procAll.length;j++){
					if(procAll[j].src == "http://ehgt.org/v/e/imperil.png"){
						imp_sign ++;
					}
				}
			}
			if(procAll.length == 0||imp_sign == 0){
				if(monsterList[i+1] && monsterList[i+1].onmouseover){
					imp(i+1);
				}else{
					imp(i);
				}
				break;
			}
		}		
		
	}
}

var button1 = document.createElement("input");
button1.type = "button";
button1.value = "impril";
button1.id = "bn1";
button1.style.cursor = "pointer";
button1.style.position = "absolute";
button1.style.top = 0 + "px";
button1.style.left = 500 + "px";
document.getElementById("togpane_log").appendChild(button1);



button1.onclick = function (){
	auto_imp();
}



function weaken(t){
document.getElementById("212").click();
monsterList[t].click();
}

function auto_weaken(){
    for(i=0;i<monLength;i++){
		if(monsterList[i].onmouseover){
			var procAll = monsterList[i].querySelectorAll(".btm6 img");		
			var weaken_sign = 0;
			if(procAll.length != 0){
				for(j=0;j<procAll.length;j++){
					if(procAll[j].src == "http://ehgt.org/v/e/weaken.png"){
						weaken_sign ++;
					}
				}
			}
			if(procAll.length == 0||weaken_sign == 0){
				if(monsterList[i+1] && monsterList[i+1].onmouseover){
					weaken(i+1);
				}else{
					weaken(i);
				}
				break;
			}
		}		
		
	}
}



var button2 = document.createElement("input");
button2.type = "button";
button2.value = "weaken";
button2.id = "bn2";
button2.style.cursor = "pointer";
button2.style.position = "absolute";
button2.style.top = 0 + "px";
button2.style.left = 600 + "px";
document.getElementById("togpane_log").appendChild(button2);



button2.onclick = function (){
	auto_weaken();
}


}