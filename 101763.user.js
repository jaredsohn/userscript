// ==UserScript==
// @name           BibleGateway.com Enhancement
// @namespace      biblegateway
// @description    Enhancements for BibleGateway.com
// @include        http://www.biblegateway.com/*
// ==/UserScript==


var resultOptions = document.getElementsByClassName("result-options");

var buttonTemplate = document.createElement("button");
buttonTemplate.type="button";
buttonTemplate.style.fontSize="8px";
buttonTemplate.style.height="21px";
buttonTemplate.style.width="21px";
buttonTemplate.style.backgroundColor="#ccc";
buttonTemplate.style.borderWidth="2px";
buttonTemplate.style.borderStyle="groove";
buttonTemplate.style.borderColor="#000";
buttonTemplate.style.borderRadius="3px";
buttonTemplate.style.cursor="pointer";
buttonTemplate.style.color="#000";
//buttonTemplate.style.textShadow="0px 0px 2px #000";

for (var i=0;i<resultOptions.length;i++){
	
	var functionNum = "";
	if (i==1) functionNum = "2";
	
	var li = document.createElement("li");
	li.style.width="90px"
	li.style.marginTop="-3px";
	
	var btnVersenum = buttonTemplate.cloneNode(true);
	btnVersenum.appendChild(document.createTextNode("¹A"));
	btnVersenum.style.marginRight="2px";
	btnVersenum.className="btnVersenum";
	
	btnVersenum.setAttribute("onmouseover", "this.style.backgroundColor='#ffaa40';this.style.borderColor='#663300';ShowOptionInfo" + functionNum + "('Toggle','Verse Numbers')");
	btnVersenum.setAttribute("onmouseout", "this.style.backgroundColor='#ccc';this.style.borderColor='#000';HideOptionInfo" + functionNum + "()");
	
	btnVersenum.addEventListener("click",function(){
		versenums = document.getElementsByClassName("versenum");
		buttons = document.getElementsByClassName(this.className)
		if (this.style.color=="rgb(153, 153, 153)"){
			for (var i=0;i<buttons.length;i++) buttons[i].style.color="";
			for (var i=0;i<versenums.length;i++) versenums[i].style.display="";
		} else {
			for (var i=0;i<buttons.length;i++) buttons[i].style.color="rgb(153, 153, 153)";
			for (var i=0;i<versenums.length;i++) versenums[i].style.display="none";
		}
	},false)
	
	var btnXRefs = buttonTemplate.cloneNode(true);
	btnXRefs.appendChild(document.createTextNode("(A)"));
	btnXRefs.style.marginRight="2px";
	btnXRefs.className="btnXRefs";
	
	btnXRefs.setAttribute("onmouseover", "this.style.backgroundColor='#ffaa40';this.style.borderColor='#663300';ShowOptionInfo" + functionNum + "('Toggle','Cross References')");
	btnXRefs.setAttribute("onmouseout", "this.style.backgroundColor='#ccc';this.style.borderColor='#000';HideOptionInfo" + functionNum + "()");
	
	btnXRefs.addEventListener("click",function(){
		xrefs = document.getElementsByClassName("xref");
		xrefList = document.getElementsByClassName("crossrefs");
		buttons = document.getElementsByClassName(this.className)
		if (this.style.color=="rgb(153, 153, 153)"){
			for (var i=0;i<buttons.length;i++) buttons[i].style.color="";
			for (var i=0;i<xrefs.length;i++) xrefs[i].style.display="";
			for (var i=0;i<xrefList.length;i++) xrefList[i].style.display="";
		} else {
			for (var i=0;i<buttons.length;i++) buttons[i].style.color="rgb(153, 153, 153)";
			for (var i=0;i<xrefs.length;i++) xrefs[i].style.display="none";
			for (var i=0;i<xrefList.length;i++) xrefList[i].style.display="none";
		}
	},false)
	
	var btnFootnotes = buttonTemplate.cloneNode(true);
	btnFootnotes.appendChild(document.createTextNode("[a]"));
	btnFootnotes.style.marginRight="2px";
	btnFootnotes.className="btnFootnotes";
	
	btnFootnotes.setAttribute("onmouseover", "this.style.backgroundColor='#ffaa40';this.style.borderColor='#663300';ShowOptionInfo" + functionNum + "('Toggle','Footnotes')");
	btnFootnotes.setAttribute("onmouseout", "this.style.backgroundColor='#ccc';this.style.borderColor='#000';HideOptionInfo" + functionNum + "()");
	
	btnFootnotes.addEventListener("click",function(){
		footnotes = document.getElementsByClassName("footnote");
		footnoteList = document.getElementsByClassName("footnotes");
		buttons = document.getElementsByClassName(this.className)
		if (this.style.color=="rgb(153, 153, 153)"){
			for (var i=0;i<buttons.length;i++) buttons[i].style.color="";
			for (var i=0;i<footnotes.length;i++) footnotes[i].style.display="";
			for (var i=0;i<footnoteList.length;i++) footnoteList[i].style.display="";
		} else {
			for (var i=0;i<buttons.length;i++) buttons[i].style.color="rgb(153, 153, 153)";
			for (var i=0;i<footnotes.length;i++) footnotes[i].style.display="none";
			for (var i=0;i<footnoteList.length;i++) footnoteList[i].style.display="none";
		}
	},false)
	
	var btntH5 = buttonTemplate.cloneNode(true);
	btntH5.appendChild(document.createTextNode("h5"));
	btntH5.className="btntH5";
	
	btntH5.setAttribute("onmouseover", "this.style.backgroundColor='#ffaa40';this.style.borderColor='#663300';ShowOptionInfo" + functionNum + "('Toggle','H5 Heading tags')");
	btntH5.setAttribute("onmouseout", "this.style.backgroundColor='#ccc';this.style.borderColor='#000';HideOptionInfo" + functionNum + "()");
	
	btntH5.addEventListener("click",function(){
		h5s = document.getElementsByTagName("h5");
		buttons = document.getElementsByClassName(this.className)
		if (this.style.color=="rgb(153, 153, 153)"){
			for (var i=0;i<buttons.length;i++) buttons[i].style.color="";
			for (var i=0;i<h5s.length;i++) h5s[i].style.display="";
		} else {
			for (var i=0;i<buttons.length;i++) buttons[i].style.color="rgb(153, 153, 153)";
			for (var i=0;i<h5s.length;i++) h5s[i].style.display="none";
		}
	},false)
	
	li.appendChild(btnVersenum);
	li.appendChild(btnFootnotes);
	li.appendChild(btnXRefs);
	li.appendChild(btntH5);
	resultOptions[i].appendChild(li);
}