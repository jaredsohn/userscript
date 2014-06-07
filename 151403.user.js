// ==UserScript==
// @name           Mastering Chemistry Percent Scores
// @namespace      Liboicl
// @include        http://session.masteringchemistry.com/myct/scores
// ==/UserScript==
function roundNumber(num, dec) {
	var result = String(Math.round(num*Math.pow(10,dec))/Math.pow(10,dec));
	if(result.indexOf('.')<0) {result+= '.';}
	while(result.length- result.indexOf('.')<=dec) {result+= '0';}
	return result;
}

function calcScore(){
	var list=document.getElementsByTagName("td");
	var digits;
	var yes=0;

	for(i=0;i<list.length;i++){
		if(list[i].headers == "yui-dt0-th-score "){
			if(typeof list[i].children[0].children[0] !== 'undefined'){
				if(list[i].children[0].children[0].innerHTML.indexOf(" / ") != -1){
					digits = list[i].children[0].children[0].innerHTML.split(" / ");
					if(digits[0] != "--")
						list[i].children[0].children[0].innerHTML+= "<br>" + roundNumber((digits[0] / digits[1])*100,2) + "%";
					yes=1;
				}
			}
			else if(typeof list[i].children[0] !== 'undefined'){
				if(list[i].children[0].innerHTML.indexOf(" / ") != -1){
					digits = list[i].children[0].innerHTML.split(" / ");
					if(digits[0] != "--")
						list[i].children[0].innerHTML+= "<br>" + roundNumber((digits[0] / digits[1])*100,2) + "%";
				}
			}
		}
	}

	if(yes==0){
		window.setTimeout(calcScore, 1000);
	}
}

calcScore();