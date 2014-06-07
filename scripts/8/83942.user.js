// ==UserScript==
// @name           get image_Hotlink from wordpress
// @include        http://*.wordpress.com/*
// @include        https://*.wordpress.com/*
// @author         congxz6688
// ==/UserScript==


var myAnchors=document.evaluate('//tbody[@id="the-list"]/descendant::img[@class="attachment-80x60"]', document, null, 6, null);
var myposs=document.evaluate('//tbody[@id="the-list"]/descendant::td[@class="author column-author"]', document, null, 6, null);
if (myAnchors.snapshotLength>0){
	var myText="";
	var myText2="";
	for (i=myAnchors.snapshotLength-1; i >-1 ; i--){
		howsize=(myAnchors.snapshotItem(i).width>myAnchors.snapshotItem(i).height)? "?w=800" : "?h=800";
		imganch="[url=" + myAnchors.snapshotItem(i).src.match(/http.*(?=\?)/) + "][img]"+myAnchors.snapshotItem(i).src.match(/http.*(?=\?)/) + howsize + "[/img][/url]";
		imganch2="[img]"+myAnchors.snapshotItem(i).src.match(/http.*(?=\?)/) + "[/img]";
		myText+=imganch + "\r\n" + "\r\n";
		myText2+= imganch2 + "\r\n" + "\r\n";

		var NewInput=document.createElement("input");
			NewInput.type="text";
			NewInput.size="20";
			NewInput.id=i;
			NewInput.value=imganch2;
			NewInput.setAttribute("readonly", "readonly");
			NewInput.addEventListener("click", function (){this.select();}, false);

		var NewInput2=document.createElement("input");
			NewInput2.type="text";
			NewInput2.size="20";
			NewInput2.id=i+"s";
			NewInput2.value=imganch;
			NewInput2.setAttribute("readonly", "readonly");
			NewInput2.addEventListener("click", function (){this.select();}, false);

		myposs.snapshotItem(i).innerHTML="";
		myposs.snapshotItem(i).appendChild(NewInput2);
		myposs.snapshotItem(i).appendChild(NewInput);
	}

	if (myText!=""){
		var myUl = document.evaluate("//ul[@class='subsubsub']", document, null, 9, null);

		var NewTextArea=document.createElement("textarea");
		NewTextArea.id="myNewText";
		NewTextArea.rows="3";
		NewTextArea.cols="55"
		NewTextArea.innerHTML=myText;
		NewTextArea.setAttribute("readonly", "readonly");
		NewTextArea.addEventListener("click", function (){this.select();}, false);
		myUl.singleNodeValue.parentNode.insertBefore(NewTextArea,myUl.singleNodeValue);


		var NewTextArea2=document.createElement("textarea");
		NewTextArea2.id="myNewText2";
		NewTextArea2.rows="3";
		NewTextArea2.cols="55"
		NewTextArea2.innerHTML=myText2;
		NewTextArea2.setAttribute("readonly", "readonly");
		NewTextArea2.addEventListener("click", function (){this.select();}, false);
		myUl.singleNodeValue.parentNode.insertBefore(NewTextArea2,myUl.singleNodeValue);


		var NewP=document.createElement("p");
		var Newbutton=document.createElement("input");
		Newbutton.type="button";
		Newbutton.title="点击后，上面文本框的内容由默认的全部链接更新为选定部分链接";
		Newbutton.value="先选定部分图片，然后点击这里获取其链接";
		Newbutton.addEventListener("click", gowork, false);
		NewP.appendChild(Newbutton);
		myUl.singleNodeValue.parentNode.insertBefore(NewP,myUl.singleNodeValue);
		
	}
}


function gowork(){
	var mychecks=document.evaluate('//tbody[@id="the-list"]/descendant::input[@type="checkbox"]', document, null, 6, null);
	var myyText="";
	var myyText2="";
	for (i=mychecks.snapshotLength-1; i >-1 ; i--) {
		if (mychecks.snapshotItem(i).checked) {
		howsize=(myAnchors.snapshotItem(i).width>myAnchors.snapshotItem(i).height)? "?w=800" : "?h=800";
		imganchh="[url=" + myAnchors.snapshotItem(i).src.match(/http.*(?=\?)/) + "][img]"+myAnchors.snapshotItem(i).src.match(/http.*(?=\?)/) + howsize + "[/img][/url]";
		imganchh2="[img]"+myAnchors.snapshotItem(i).src.match(/http.*(?=\?)/) + "[/img]";
		myyText+=imganchh + "\r\n" + "\r\n";
		myyText2+= imganchh2 + "\r\n" + "\r\n";;
		}
	}
	if (myyText!=""){
		NewTextArea.innerHTML=myyText;
		NewTextArea2.innerHTML=myyText2;
	}	
}