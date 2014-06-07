// ==UserScript==
// @name           OracleHelper
// @namespace      bitsscream
// @include        http://127.0.0.1:8080/htmldb/*
// ==/UserScript==

/***** Key Mapping *****
 * F5 = 116 //not recomended as used for refresh
 * F6 = 117
 * F9 = 120
 * rest calculate yourself
 **********************/
var runShorcutKey=117;	//add your favourite key value here


//do not alter beyond this point//
var code1='function init(){if (document.addEventListener){document.addEventListener("keypress",keypress,false);}else if(document.attachEvent){ document.attachEvent("onkeypress", keypress);}else{document.onkeypress= keypress;}}function keypress(e){if (!e) e= event;	if(e.keyCode=='+runShorcutKey+'){	/*F6*/		if (e.preventDefault) e.preventDefault();if (e.stopPropagation) e.stopPropagation();		p1003_RunButton();	return false;}return true;}init();';

var code='function init(){	var nBox = document.getElementById("P1003_SQL_COMMAND1");    if (document.addEventListener){       document.addEventListener("keypress",keypress,false);       nBox.addEventListener("keypress",keypressTA,false);    }    else if (document.attachEvent){       document.attachEvent("onkeypress", keypress);       nBox.attachEvent("onkeypress", keypressTA);    }    else{       document.onkeypress= keypress;       nBox.onkeypress= keypressTA;    }	nBox.onclick=clickTA;	updateLineNo();}function updateLineNo(){	var div=document.getElementById("line_disp_id");	var nBox = document.getElementById("P1003_SQL_COMMAND1");	var cursorPos = getCursorPos(nBox);	var txt=nBox.value.substring(0,cursorPos).split("\\n");	var ncnt=txt.length; 	var ccnt=txt[ncnt-1].length;	div.innerHTML="Ln:"+ncnt+" Col:"+ccnt+"";}function clickTA(){updateLineNo();}function setCursor(cursorPos){	var nBox = document.getElementById("P1003_SQL_COMMAND1");	nBox.selectionStart=cursorPos+1;	nBox.selectionEnd=cursorPos+1; updateLineNo();}function getCursorPos(el){	if (el.selectionStart) { 		return el.selectionStart; 	} else if (document.selection) { 		el.focus(); 		var r = document.selection.createRange(); 		if (r == null) { 			return 0; 		} 		var re = el.createTextRange(), 		rc = re.duplicate(); 		re.moveToBookmark(r.getBookmark()); 		rc.setEndPoint("EndToStart", re); 		return rc.text.length; 	}  	return 0; }function keypress(e){	if (!e) e= event;	if(e.keyCode=='+runShorcutKey+'){	if (e.preventDefault) e.preventDefault();		if (e.stopPropagation) e.stopPropagation();		p1003_RunButton();		return false;	}	sc_quickKeys(e);	return true;}function keypressTA(e){	var nBox = document.getElementById("P1003_SQL_COMMAND1");	if(e.keyCode==9){			if (e.preventDefault) e.preventDefault();		if (e.stopPropagation) e.stopPropagation();	var cursorPos = getCursorPos(nBox);		nBox.value=nBox.value.substring(0,cursorPos)+"\t"+nBox.value.substring(cursorPos,nBox.value.length);		setCursor(cursorPos);		return false;	}	else if(e.ctrlKey && (e.charCode==122 || e.charCode==90) ){		var cursorPos = getCursorPos(nBox);		setTimeout("setCursor("+(cursorPos-2)+")", 10 );	}	setTimeout("updateLineNo()",10);	return true;} init();';

function insertJavascript(srcCode) {
	var scriptNode = document.createElement("script");
	scriptNode.setAttribute("type", "application/x-javascript");
	scriptNode.innerHTML=srcCode;
	var headerNode = document.getElementsByTagName("head")[0];
	headerNode.appendChild(scriptNode);
}

function getElementsByProp(parent, tagName, propNameValue){
	propName=propNameValue.split("=")[0];
	propValue=propNameValue.split("=")[1];
	propValue=propValue.substring(1,propValue.length-1);
	object=parent.getElementsByTagName(tagName);
	var j=0;
	var retArr=new Array();
	for(i=0;i<object.length;i++){
		if(object[i].getAttribute(propName)==propValue){
			retArr[j++]=object[i];
		}
	}
	return retArr;
}
function main(){
	insertJavascript(code);
	//htmldbNewBottom1
	var div=getElementsByProp(document.body, "div",'class="htmldbNewBottom2"')[0];
	div.innerHTML='<b><div id="line_disp_id"></div></b>';
}
main();