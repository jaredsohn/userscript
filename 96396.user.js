// ==UserScript==
// @name           BvS SuperFail HotKey
// @namespace      Lokyar
// @description    Hotkeys for SUPERFAIL PH Game
// @include        http://www.animecubed.com/billy/bvs/partyhouse-superfail.html
// ==/UserScript==

function process_event(event) {
	if (event.keyCode==81){		//Q for Ryo
		var jutsu=document.forms.namedItem("dicebuyin").elements;
		for(var i=0; i<jutsu.length; i++){
			if(jutsu[i].id=="useryo"){
				jutsu[i].wrappedJSObject.click();
			}
		}

	}
	if (event.keyCode==87){		//W for RP
		var jutsu=document.forms.namedItem("dicebuyin").elements;
		for(var i=0; i<jutsu.length; i++){
			if(jutsu[i].id=="userp"){
				jutsu[i].wrappedJSObject.click();
			}
		}
	}
	if (event.keyCode==69){		//E to Confirm/Play
		var jutsu=document.forms.namedItem("dicebuyin").elements;
		for(var i=0; i<jutsu.length; i++){
			if(jutsu[i].id=="useconf"){
				jutsu[i].wrappedJSObject.click();
			}
		}
		document.forms.namedItem("dicebuyin").submit();

	}
	if (event.keyCode==83){		//S to Select All dice and Roll
		var jutsu=document.forms.namedItem("scoredice").elements;
		for(var i=0; i<jutsu.length; i++){
			if(jutsu[i].type=="checkbox"){
				jutsu[i].wrappedJSObject.click();
			}
		}
		document.forms.namedItem("scoredice").submit();

	}

	if (event.keyCode==49){		//1 for First Score
		var jutsu=document.forms.namedItem("scoredice").elements;
		var choice=1;
		for(var i=0; i<jutsu.length; i++){
			if(jutsu[i].type=="checkbox"){
				if(choice==1){
					jutsu[i].wrappedJSObject.click();
				}
			choice++;
			}
		}
	}

	if (event.keyCode==50){		//2 for Second Score
		var jutsu=document.forms.namedItem("scoredice").elements;
		var choice=1;
		for(var i=0; i<jutsu.length; i++){
			if(jutsu[i].type=="checkbox"){
				if(choice==2){
					jutsu[i].wrappedJSObject.click();
				}
			choice++;
			}
		}
	}

	if (event.keyCode==51){		//3 for Third Score
		var jutsu=document.forms.namedItem("scoredice").elements;
		var choice=1;
		for(var i=0; i<jutsu.length; i++){
			if(jutsu[i].type=="checkbox"){
				if(choice==3){
					jutsu[i].wrappedJSObject.click();
				}
			choice++;
			}
		}
	}

	if (event.keyCode==52){		//4 for Fourth Score
		var jutsu=document.forms.namedItem("scoredice").elements;
		var choice=1;
		for(var i=0; i<jutsu.length; i++){
			if(jutsu[i].type=="checkbox"){
				if(choice==4){
					jutsu[i].wrappedJSObject.click();
				}
			choice++;
			}
		}
	}
	if (event.keyCode==37){		//Left to Roll
		document.forms.namedItem("scoredice").submit();
	}
	if (event.keyCode==39){		//Right to Bank
		document.forms.namedItem("enddice").submit();
	}
}

window.addEventListener("keyup", process_event, false);