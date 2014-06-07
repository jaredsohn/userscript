// ==UserScript==
// @name Ябитуриент
// @author G.Rinat
// @namespace http://abiturient.pro/talk/
// @version 1.0
// @description Дополнительные возможности для комментирования на форуме abiturient.pro
// @include http://abiturient.pro/talk/*
// ==/UserScript==

var comform = document.getElementsByClassName('Tabs CommentTabs')[0];
var panelred = ' '+
'<br />'+
'     <ul class="toolscom">'+
'         <li><a href="javascript:dohtm(0);" style="font-weight:normal;">Цитата</a></li>'+
'         <li><a href="javascript:dohtm(1);" style="font-weight:normal;">Ссылка</a></li>'+
'         <li><a href="javascript:dohtm(2);" style="font-weight:normal;">Фото</a></li>'+
'         <li><a href="javascript:dohtm(3);" style="font-weight:normal;"><b>Ж</b></a></li>'+
'         <li><a href="javascript:dohtm(4);" style="font-weight:normal;"><i>К</i></a></li>'+
'         <li><a href="javascript:dohtm(5);" style="font-weight:normal;"><u>П</u></a></li>'+
'         <li><a href="javascript:dohtm(6);" style="font-weight:normal;"><s>З</s></a></li>'+
'         <li><a href="http://ru.wikipedia.org/wiki/%D0%AD%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D1%8B_HTML#.D0.9E.D1.81.D0.BD.D0.BE.D0.B2.D0.BD.D1.8B.D0.B5_.D1.8D.D0.BB.D0.B5.D0.BC.D0.B5.D0.BD.D1.82.D1.8B_.28.C2.AB.D1.82.D0.B5.D0.B3.D0.B8.C2.BB.29" target="_blank"  style="font-weight:normal;">?</a></li>'+
'      </ul>';
comform.innerHTML = comform.innerHTML + panelred;
var addlinkqu = document.getElementsByClassName('Meta');
for(var i=0;addlinkqu[i]!=null;i++){
    addlinkqu[i].innerHTML = addlinkqu[i].innerHTML + '<span class="quoteme"><a href="javascript:doquote('+i+');">Цитировать</a></span>';
}

function main () {
window.dohtm = function(ret){
    switch(ret){
	    case 0:
		    Sel('<blockquote>','</blockquote>');
		    break;
	    case 1:
		    Sel('<a href="','">ссылка</a>');
		    break;
	    case 2:
		    Sel('<img src="','" />');
		    break;
	    case 3:
		    Sel('<b>','</b>');
		    break;
	    case 4:
		    Sel('<i>','</i>');
		    break;
	    case 5:
		    Sel('<u>','</u>');
		    break;
	    case 6:
		    Sel('<s>','</s>');
		    break;
	}
}

window.doquote = function(ret){
	var el = document.getElementById('Form_Body');
	el.value=el.value+'<blockquote>'+document.getElementsByClassName('Message')[ret].innerHTML+'</blockquote> ';
	el.focus();
	el.selectionEnd = el.value.length;
	el.selectionStart = el.value.length;
}

window.Sel = function(one,two){
	var el = document.getElementById('Form_Body');
	if (el.selectionStart==el.selectionEnd){
		el.value=el.value+one+two;
		el.selectionEnd = el.value.length-two.length;
		el.selectionStart = el.value.length-two.length;
	}else{
		el.value=el.value.substring(0,el.selectionStart)+one+
		el.value.substring(el.selectionStart,el.selectionEnd)+
		two+el.value.substring(el.selectionEnd);
		el.selectionStart = el.value.length;
		el.selectionEnd = el.value.length;
	}
	el.focus();
}	
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
document.body.appendChild(script);