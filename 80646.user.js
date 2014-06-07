// ==UserScript==
// @name           Resource Catcher
// @namespace      Ranatama
// @description    Displays resources earned, and who earned them
// @include        http://*animecubed.com/billy/bvs/village.html
// ==/UserScript==
//If you use thousands separator, it should go after this.






function newName(name, nameArr){
	for(var j = 0; j < nameArr.length; j++){
		if(nameArr[j] == name){
			return j;
		}
	}

	return nameArr.length;
}

function displayRP(nameAr, bas, adv, spy) {
	var results = " ";

	for (var e = 0; e < nameAr.length; e++){
		if(isNaN(bas[e])){
			bas[e] = 0;
		}
		if(isNaN(adv[e])){
			adv[e] = 0;
		}
		if(isNaN(spy[e])){
			spy[e] = 0;
		}

		var bastr = bas[e] + "";
		var advstr = adv[e] + "";
		results += nameAr[e] + " " + bastr + " Basics and " + advstr + " Advanceds. " + spy[e] + " spies. \n";
	}
	alert(results);
}

function process_event(event) {

	if (event.keyCode==123){		//f12
	var names = [];
	var basics = [];
	var advanceds = [];
	var spies = [];
	var count = 0;
	var curUsr = 0;	
		//code to check "Contracts","Party House Win" and 
		//"Invasion Success"
		//NEW: SPIES :D
		var msgs = document.evaluate("id('messageul')//li/label", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		var ws = new RegExp(" ");
		var com = new RegExp(", ");

		for ( var i=0 ; i < msgs.snapshotLength; i++ ) {  
			//check if is above stuffs	
			var text = msgs.snapshotItem(i).innerHTML;
			if(text.substring(0,31) == "&nbsp;&nbsp;<b>Invasion Success"){
				//return name of invader and rsc stolen
				var temp = text.split(ws);

				curUsr = newName(temp[6], names);
				if(curUsr == count){
				
					names[count] = temp[6]; //name

					count++;
				}
				if(isNaN(basics[curUsr])){
					basics[curUsr] = 0;
				}
				if(isNaN(advanceds[curUsr])){
					advanceds[curUsr] = 0;
				}
				//alert(name[curUsr]);
				var ex = new RegExp("!");
				var took = text.split(ex);
				var rsc = took[1];
				var stolen = rsc.split(com);

				var flippedSwitch = false;
				for(var p = 0; p < stolen.length; p++){
					if(stolen[p].indexOf("Unmelt") >= 0 || stolen[p].indexOf("Solid") >= 0){

						basics[curUsr] += p;
						advanceds[curUsr] += stolen.length - p;
						flippedSwitch = true;
						break;
					}
				}
				if(!flippedSwitch){
					basics[curUsr] += stolen.length;
				}

			}

			if(text.substring(0,24) == "&nbsp;&nbsp;<b>Contracts"){
			if(text.indexOf(",") >= 0){
				//check if got resources, return name/rsrc
				var temp2 = text.split(ws);
				curUsr = newName(temp2[5], names);
				if(curUsr == count){
					names[count] = temp2[5]; //name

					count++;
				}

				var mill = text.split(com);
				var tempBas = 0;
				var tempAdv = 0;

				for (var k = 1; k < mill.length; k++){
					//count up basics and advanceds
					var white = mill[k].split(ws);
					var num = white[0];
					if(mill[k].indexOf("Unmelt") >= 0 || mill[k].indexOf("Solid Fire") >= 0){

						tempAdv += parseInt(num);
					}else{
						tempBas += parseInt(num);
					}
				}

				if(isNaN(basics[curUsr])){
					basics[curUsr] = 0;
				}
				if(isNaN(advanceds[curUsr])){
					advanceds[curUsr] = 0;
				}

				basics[curUsr] += tempBas;
				advanceds[curUsr] += tempAdv;
			}
	
			}

			if(text.substring(0,30) == "&nbsp;&nbsp;<b>Party House Win"){
				//return name of winner and 1 basic

				var temp3 = text.split(ws);
				//alert("+ " + temp3[3]);
				curUsr = newName(temp3[3], names);

				if(curUsr == count){

					var name3 = temp3[3];

					names[curUsr]= name3; //name
					


					count++;
				}
				if(isNaN(basics[curUsr])){
					basics[curUsr] = 0;
				}
				basics[curUsr] += 1;


			}
			if(text.substring(0,26) == "&nbsp;&nbsp;<b>Spy Success"){
				var temp4 = text.split(ws);
				curUsr = newName(temp4[6], names);
				if(curUsr == count){
					names[curUsr] = temp4[6];
					count++;
				}
				if(isNaN(spies[curUsr])){
					spies[curUsr] = 0;
				}
				spies[curUsr] += 1;
				
			}
  
		}

		displayRP(names, basics, advanceds, spies);
	}
}


window.addEventListener("keyup", process_event, false);