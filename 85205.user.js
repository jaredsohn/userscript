// ==UserScript==
// @name           get BBCODE from yahooGroup
// @include        http://groups.yahoo.com/group/*
// @exclude 	   http://groups.yahoo.com/group/*/photos/album/0/list*
// @exclude 	   http://groups.yahoo.com/group/*/photos/pic/list*
// @author         congxz6688
// @version        2011.10.09
// ==/UserScript==


var cssStyle = "";
cssStyle += "#myNewText,#myNewText2 {margin : 0px 0px 0px 10px;}";
cssStyle += "#newp {margin : 10px 0px 0px 66px;}";
GM_addStyle(cssStyle);


var displayall=document.evaluate('//div[@class="photo-album-link"]', document, null, 6, null);
if(displayall.snapshotLength>0){
	displayall.snapshotItem(0).innerHTML+=" | <a href='?mode=tn&order=title&start=1&count=400&dir=asc'>显示所有图片并获取链接</a>"
	displayall.snapshotItem(0).innerHTML+=" | <a href='?mode=tn&order=title&start=1&count=30&dir=asc'>分页显示图片(30P)并获取链接</a>"
}

if(window.location.href.search(/list\?mode=tn&order=title&start=\d{1,3}&count=\d{1,3}&dir=asc/)!=-1){
    var myAnchors=document.evaluate('//div[@class="ygrp-photos-thumbnail"]/descendant::img', document, null, 6, null);
    if (myAnchors.snapshotLength>0){
	var myText="";
	var myText2="";
	for (i=0;i<myAnchors.snapshotLength;i++){
		imganch="<img src='"+ myAnchors.snapshotItem(i).src.replace(/http:\/\/xa/,"http://d").replace(/\/tn\//,"/or/") + "' />";
		imganch2="[img]"+myAnchors.snapshotItem(i).src.replace(/http:\/\/xa/,"http://d").replace(/\/tn\//,"/or/") + "[/img]";
		myText+=((myText=="")?"":"<br><br>\r\n\r\n") + imganch;
		myText2+=((myText2=="")?"":"\r\n\r\n") + imganch2;

		var NewInput=document.createElement("input");
			NewInput.type="text";
			NewInput.size="20";
			NewInput.value=imganch2;
			NewInput.setAttribute("readonly", "readonly");
			NewInput.addEventListener("click", function (){this.select();}, false);

		var NewInput2=document.createElement("input");
			NewInput2.type="text";
			NewInput2.size="20";
			NewInput2.value=imganch;
			NewInput2.setAttribute("readonly", "readonly");
			NewInput2.addEventListener("click", function (){this.select();}, false);

		var myposs=document.getElementById("meta-user-"+i);
		var myposs2=document.getElementById("meta-date-"+i);
		myposs.innerHTML="";
		myposs2.innerHTML="";
		myposs.appendChild(NewInput2);
		myposs2.appendChild(NewInput);
	}

	if (myText!=""){
		var myUl = document.evaluate("//h1[@class='ygrp-module-header']", document, null, 9, null);

		var NewTextArea=document.createElement("textarea");
		NewTextArea.id="myNewText";
		NewTextArea.rows="2";
		NewTextArea.cols="45"
		NewTextArea.innerHTML=myText;
		NewTextArea.setAttribute("readonly", "readonly");
		NewTextArea.addEventListener("click", function (){this.select();}, false);
		myUl.singleNodeValue.appendChild(NewTextArea);


		var NewTextArea2=document.createElement("textarea");
		NewTextArea2.id="myNewText2";
		NewTextArea2.rows="2";
		NewTextArea2.cols="45"
		NewTextArea2.innerHTML=myText2;
		NewTextArea2.setAttribute("readonly", "readonly");
		NewTextArea2.addEventListener("click", function (){this.select();}, false);
		myUl.singleNodeValue.appendChild(NewTextArea2);


		var NewP=document.createElement("p");
		NewP.id="newp";
		var Newbutton=document.createElement("input");
		Newbutton.type="button";
		Newbutton.title="以上文本框的默认内容为全部图片的链接，点击之后更换为选定部分的链接。";
		Newbutton.value="选定部分图片，然后点击这里获取其链接";
		Newbutton.addEventListener("click", gowork, false);
		NewP.appendChild(Newbutton);
		myUl.singleNodeValue.appendChild(NewP);
	}
    }
}

function gowork(){
	var mychecks=document.evaluate('//div[@class="ygrp-box-content"]/descendant::input[@type="checkbox"]', document, null, 6, null);
	var myyText="";
	var myyText2="";
	for (i=0;i<mychecks.snapshotLength;i++) {
		if (mychecks.snapshotItem(i).checked) {
		imganchh="<img src='"+ myAnchors.snapshotItem(i).src.replace(/http:\/\/xa/,"http://d").replace(/\/tn\//,"/or/") + "' />";
		imganchh2="[img]"+myAnchors.snapshotItem(i).src.replace(/http:\/\/xa/,"http://d").replace(/\/tn\//,"/or/") + "[/img]";
		myyText+=((myyText=="")?"":"<br><br>\r\n\r\n") + imganchh;
		myyText2+=((myyText2=="")?"":"\r\n\r\n") + imganchh2;
		}
	}
	if (myyText!=""){
		NewTextArea.innerHTML=myyText;
		NewTextArea2.innerHTML=myyText2;
	}	
}