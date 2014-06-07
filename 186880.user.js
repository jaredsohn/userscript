// ==UserScript==
// @name        DefaultNTUCQOpinion
// @namespace   http://lan.enzan.org/DefaultNTUCQOpinion
// @description Give Default Selected on "NTU Course Questionnaire" 在台大期未意見調查提供預設值
// @include     https://investea.aca.ntu.edu.tw/opinion/*
// @version     1.04
// @grant       none
// ==/UserScript==


var frmElem = document.getElementsByTagName("form") ;
var submitpage = frmElem[0].action.substring(frmElem[0].action.lastIndexOf("/") + 1);

if (submitpage == "dcheck4.asp" ) {
	//window.alert("答題頁!");
	var specradio = ["ans1","ans2","ans3", "ans4", "ans5"] ; 
	var specradiovalue = ["1","1","1","1","3"] ;
	var allElements, thisElement;
	allElements = document.getElementsByTagName('input');
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		thisSpecID = specradio.indexOf(thisElement.name);
		if (thisSpecID >= 0  && thisElement.value == specradiovalue[thisSpecID] ){
			thisElement.checked = "checked";
		}else if ( thisSpecID < 0 && thisElement.type == "checkbox" && thisElement.name == "homework" ){
			var selectHomework = 	["3", "8" ,"9"] ; 
			if ( selectHomework.indexOf(thisElement.value) >= 0 ){
				thisElement.checked = "checked";
			}
		}else if ( thisSpecID < 0 && thisElement.type == "radio" &&  thisElement.value == "5" ){
			//window.alert(thisElement.name);
			thisElement.checked = "checked";
		}
	}
	allElements = document.getElementsByTagName('textarea');
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if ( thisElement.name == "opinion1" ){
			thisElement.value = "謝謝老師！" ; 
		}
	}
}


if (submitpage == "giveform3.asp" ) {
	//window.alert("首頁!");
	var allElements, thisElement;
	allElements = document.getElementsByTagName('input');
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if (thisElement.type == "radio" ){
			thisElement.checked = "checked";
			break;
		}
	}
}

if (submitpage == "mchooes.asp" ) {
	//window.alert("合開課程!");
	var allElements, thisElement;
	allElements = document.getElementsByTagName('input');
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if (thisElement.type == "checkbox" &&  thisElement.name == "tea_tot"  ){
			thisElement.checked = "checked";
		}
	}
}

if (submitpage == "dcheck4m.asp" ) {
	//window.alert("合開課程答題頁!");
	var specradio = ["ans1","ans2","ans3", "ans4", "ans5"] ; 
	var specradiovalue = ["1","1","1","1","3"] ;
	var allElements, thisElement;
	allElements = document.getElementsByTagName('input');
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		thisSpecID = specradio.indexOf(thisElement.name);
		if (thisSpecID >= 0  && thisElement.value == specradiovalue[thisSpecID] ){
			thisElement.checked = "checked";
		}else if ( thisSpecID < 0 && thisElement.type == "checkbox" && thisElement.name == "homework" ){
			var selectHomework = 	["3", "8" ,"9"] ; 
			if ( selectHomework.indexOf(thisElement.value) >= 0 ){
				thisElement.checked = "checked";
			}
		}else if ( thisSpecID < 0 && thisElement.type == "radio" &&  thisElement.value == "5" ){
			//window.alert(thisElement.name);
			thisElement.checked = "checked";
		}
	}
	allElements = document.getElementsByTagName('textarea');
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if ( thisElement.name.indexOf("OPINION") == 0 ){
			thisElement.value = "謝謝老師！" ; 
		} else if (thisElement.name == "opinion1") {
			thisElement.value = "這個課很好！" ; 
		}
	}
}


