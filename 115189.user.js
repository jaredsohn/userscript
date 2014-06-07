// ==UserScript==
// @name          kick_you test
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        *
// ==/UserScript==

// Append some text to the element with id someText using the jQuery library.
function init() {
  var strFunc = "<script type='text/javascript'>" +
				"function getCheckedValue() {  " +
				"var j = 0, i = 0; " +
				"var numOfQues = document.getElementById('txtNumOfQues').value - 1 + 1; " +
				"var numOfRightAwser = document.getElementById('txtNumOfRightQues').value - 1 + 1; " +
				"var numOfWrongAwser = numOfQues - numOfRightAwser; " +
				"var wrongAswer = new Array(); " +
				"var check = true; " +
				"if (numOfWrongAwser > 0) {   " +
				" for (i=0; i<numOfWrongAwser; i++) { " +
				"  check = true; " +
				"  while (check) {	 " +		
				"	check = false; " +
				"	wrongAswer[i] = Math.floor(Math.random()*numOfQues); " +
				"	for (j=0; j<i; j++) { " +
				"	  if (wrongAswer[j] == wrongAswer[i]) { " +
				"		check = true; " +
				"		break;  " +
				"	  } " +
				"	} " +
				"  } " +
				" } " +
				"} " +
				"for (i=1; i<=numOfQues; i++) { " +
				"var groupName = 'A' + i; " +
				"var radios = document.getElementsByName(groupName); " +
				"var isWrongAswer = false; " +
				"for (j=0; j<numOfWrongAwser; j++) { " +
				"  if (i-1==wrongAswer[j]) { " +
				"	isWrongAswer = true; " +
				"	break; " +
				"  } " +
				"} " +
				"var k = 0; " +
				"while (radios.length>0) { " +
				"	if (isWrongAswer) { " +
				"	  radios[0].checked = false; " +
				"	} else { " +
				"	  radios[0].checked = true; " +
				"	} " +
				"	radios[0].name += k; " +
				"	k++; " +
				" } " +
				"} " +
				"return null; " +
				"}" +
				"</script>";
  strFunc += "<br/>" +
    "Num of question:&nbsp;<input type='text' id='txtNumOfQues' name='txtNumOfQues' style='width:40' /> <br /> " +
    "Num of right question:&nbsp;<input type='text' id='txtNumOfRightQues' name='txtNumOfRightQues' style='width:40' /> <br /> " +
    "<input id='btnReplaceRadio' name='btnReplaceRadio' type='submit' onclick='getCheckedValue()' value='abc'/> ";
  $('body').append(strFunc);
}
init();