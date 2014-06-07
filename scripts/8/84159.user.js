// ==UserScript==
// @name           get BBCODE from opera
// @include        http://my.opera.com/*/albums/*
// @author         congxz6688
// ==/UserScript==


var cssStyle = "";
cssStyle += "#myNewText2 {float: right;}";
GM_addStyle(cssStyle);

var myAnchors=document.evaluate('//ul[@id="mypix"]/descendant::img', document, null, 6, null);
if (myAnchors.snapshotLength>0){
	var myText="";
	for (i=0;i<myAnchors.snapshotLength;i++){
		imganch="[img]" + myAnchors.snapshotItem(i).src.replace(/\/thumbs/,"").replace(/_thum.*$/,"") + "[/img]";
		myText+=imganch + "\r\n" + "\r\n";

		var NewInput=document.createElement("input");
			NewInput.type="text";
			NewInput.size="43";
			NewInput.id=i;
			NewInput.value=imganch;
			NewInput.setAttribute("readonly", "readonly");
			NewInput.addEventListener("click", selectAllText(i), false);
		myAnchors.snapshotItem(i).parentNode.parentNode.insertBefore(NewInput,myAnchors.snapshotItem(i).parentNode);
	}

	if (myText!=""){
		var myUl=document.getElementById("content");
		var NewTextArea=document.createElement("textarea");
		NewTextArea.id="myNewText2";
		NewTextArea.rows="4";
		NewTextArea.cols="80";
		NewTextArea.innerHTML=myText;
		NewTextArea.setAttribute("readonly", "readonly");
		NewTextArea.addEventListener("click", selectAllText("myNewText2"), false);
		myUl.insertBefore(NewTextArea,myUl.firstChild);//.parentNode.appendChild  //,myUl.nextSibling
	}
}

var myAnchors2=document.evaluate('//ul[@id="sortable"]/descendant::img', document, null, 6, null);
if (myAnchors2.snapshotLength>0){
	var myText="";
	for (i=0;i<myAnchors2.snapshotLength;i++){
		imganch="[img]" + myAnchors2.snapshotItem(i).src.replace(/\/thumbs/,"").replace(/_thum.*$/,"") + "[/img]";
		myText+=imganch + "\r\n" + "\r\n";
	}

	if (myText!=""){
		var myUl=document.getElementById("content");
		var NewTextArea=document.createElement("textarea");
		NewTextArea.id="myNewText2";
		NewTextArea.rows="4";
		NewTextArea.cols="80";
		NewTextArea.innerHTML=myText;
		NewTextArea.setAttribute("readonly", "readonly");
		NewTextArea.addEventListener("click", selectAllText("myNewText2"), false);
		myUl.insertBefore(NewTextArea,myUl.firstChild);//.parentNode.appendChild  //,myUl.nextSibling
	}
}

function selectAllText(e){
	return function(){
		document.getElementById(e).select();
	}
}