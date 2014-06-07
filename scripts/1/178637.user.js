// ==UserScript==
// @name          TF2R multiline
// @namespace     http://zemn.me
// @description   Press shift-enter to add new-lines to the chat box. Enter sends, as usual.
// @match         http://tf2r.com/chat.html
// @version       1.0
// @run-at        document-end
// @grant         none
// ==/UserScript==
var d=document,v,
	singleLine=true,
	multiLine=false,
	sWidth="width:660px;",
	sMultiLine=sWidth+"height:4em",
	sSingleLine=sWidth+"height:1.2em";

//post button is for scrubs
//ignore horrible javascript
(v=document.getElementById("sendfeed")).parentNode.removeChild(v);
var	el = d.getElementById("feedtext"),
	ta = d.createElement("textarea");


ta.style.display="none";
el.parentNode.insertBefore(ta, el);
{
	var el2=document.createElement("input");
	el2.id=el.id;
	el2.setAttribute("style", sSingleLine);
	ta.setAttribute("style", sMultiLine);
	el.parentNode.insertBefore(el2, el);
	el.parentNode.removeChild(el);
	el=el2;
	ta.style.display="none";
}
var displayed=singleLine;



var end = function(el) {
	if (typeof el.selectionStart == "number") {
		el.selectionStart = el.selectionEnd = el.value.length;
	} else if (typeof el.createTextRange != "undefined") {
		el.focus();
		var range = el.createTextRange()
		range.collapse(false);
		range.select();
	}
}

ta.onkeypress=function(e){
	if(e.keyCode==13&&(!e.shiftKey)&&(!pblock)&&ta.value!="")
		postChat(),
		ta.style.display="none",
		el.style.display="block",
		el.id=ta.id,
		ta.id="",
		el.value=tl.value="",


		end(el), el.focus();
}


el.onkeypress=function(e){

	ta.value=el.value;
	if(e.keyCode==13){
		if (e.shiftKey){
			ta.id=el.id;
			el.id="";
			ta.value=el.value+="\n";
			el.style.display="none";
			ta.style.display="block";
			end(ta), ta.focus();
		} else if (!pblock) 
			postChat(),
			el.value=ta.value=="";
	}
}