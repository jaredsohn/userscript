// ==UserScript==
// @name           blogTV Extra Buttons
// @namespace      http://userscripts.org/users/101501
// @description    Buttons to refresh, detach/attach, and hide/show the video and/or chat.
// @include        http://www.blogtv.com/People/*
// ==/UserScript==

function formatButton(btn) {
btn.style.width="200px";
btn.style.border="1px solid";
btn.style.backgroundColor="#FFFFFF";
btn.style.fontFamily="Courier New";
btn.style.fontSize="8pt";
}

newDiv = document.createElement("div");
newTable = document.createElement("table");
newTable.setAttribute("width","688px");

newRow = document.createElement("tr");

newData = document.createElement("td");
newData.setAttribute("align", "center");
newButton = document.createElement("button");
formatButton(newButton);
newButton.setAttribute("id","refVidB");
newText = document.createTextNode("Refresh Video");
newButton.appendChild(newText);
newButton.addEventListener("click", function() {
	VideoContainer=document.getElementById("adaptvDiv");
	VideoContainerContents=VideoContainer.innerHTML;
	VideoContainer.innerHTML="";
	VideoContainer.innerHTML=VideoContainerContents;
}, false);
newData.appendChild(newButton);
newRow.appendChild(newData);

newData = document.createElement("td");
newData.setAttribute("align", "center");
newButton = document.createElement("button");
formatButton(newButton);
newButton.setAttribute("id","refChaB");
newText = document.createTextNode("Refresh Chat");
newButton.appendChild(newText);
newButton.addEventListener("click", function() {
	ChatContainer=document.getElementById("FCAobject");
	ChatContainerContents=ChatContainer.innerHTML;
	ChatContainer.innerHTML="";
	ChatContainer.innerHTML=ChatContainerContents;
}, false);
newData.appendChild(newButton);
newRow.appendChild(newData);

newData = document.createElement("td");
newData.setAttribute("align", "center");
newButton = document.createElement("button");
formatButton(newButton);
newButton.setAttribute("id","refVnCB");
newText = document.createTextNode("Refresh Video & Chat");
newButton.appendChild(newText);
newButton.addEventListener("click", function() {
	VideoContainer=document.getElementById("adaptvDiv");
	VideoContainerContents=VideoContainer.innerHTML;
	VideoContainer.innerHTML="";
	VideoContainer.innerHTML=VideoContainerContents;
	ChatContainer=document.getElementById("FCAobject");
	ChatContainerContents=ChatContainer.innerHTML;
	ChatContainer.innerHTML="";
	ChatContainer.innerHTML=ChatContainerContents;
}, false);
newData.appendChild(newButton);
newRow.appendChild(newData);

newTable.appendChild(newRow);

newRow = document.createElement("tr");

newData = document.createElement("td");
newData.setAttribute("align", "center");
newButton = document.createElement("button");
formatButton(newButton);
newButton.setAttribute("id","detVidB");
newText = document.createTextNode("Detach Video");
newButton.appendChild(newText);
newButton.addEventListener("click", function() {
	document.getElementById("detVnCB").disabled = true;
	GM_setValue("isDetVid",1);
	document.location.assign('javascript:VideoWindow=window.open();VideoWindow.addEventListener("unload",function() {if (VideoWindow.window.opener.document.getElementById("detVidB").innerHTML=="Attach Video") {VideoWindow.window.opener.document.getElementById("detVidB").click();}},false);VideoContainer=document.getElementById("adaptvDiv");VideoContainerContents=VideoContainer.innerHTML;VideoWindow.document.write(VideoContainerContents);VideoWindow.document.title=document.title+" - Video";VideoWindow.window.stop();VideoContainer.innerHTML="";void(0);');
	ovd=arguments.callee;
	this.removeEventListener("click", arguments.callee, false);
	this.addEventListener("click", function() {
		if (GM_getValue("isDetCha")!=1)
		{
			document.getElementById("detVnCB").disabled = false;
		};
		GM_deleteValue("isDetVid");
		document.location.assign('javascript:if (VideoContainer.innerHTML=="") {VideoContainer.innerHTML=VideoContainerContents};VideoWindow.close();void(0);');
		this.removeEventListener("click", arguments.callee, false);
		this.addEventListener("click", ovd, false);
		this.innerHTML="Detach Video";
	}, false);
	this.innerHTML="Attach Video";
}, false);
newData.appendChild(newButton);
newRow.appendChild(newData);

newData = document.createElement("td");
newData.setAttribute("align", "center");
newButton = document.createElement("button");
formatButton(newButton);
newButton.setAttribute("id","detChaB");
newText = document.createTextNode("Detach Chat");
newButton.appendChild(newText);
newButton.addEventListener("click", function() {
	document.getElementById("detVnCB").disabled = true;
	GM_setValue("isDetCha",1);
	document.location.assign('javascript:ChatWindow=window.open();ChatWindow.addEventListener("unload",function() {if (ChatWindow.window.opener.document.getElementById("detChaB").innerHTML=="Attach Chat") {ChatWindow.window.opener.document.getElementById("detChaB").click();}},false);ChatContainer=document.getElementById("FCAobject");ChatContainerContents=ChatContainer.innerHTML;ChatWindow.document.write(ChatContainerContents);ChatWindow.document.title=document.title+" - Chat";ChatWindow.window.stop();ChatContainer.innerHTML="";void(0);');
	ocd=arguments.callee;
	this.removeEventListener("click", arguments.callee, false);
	this.addEventListener("click", function() {
		if (GM_getValue("isDetVid")!=1)
		{
			document.getElementById("detVnCB").disabled = false;
		};
		GM_deleteValue("isDetCha");
		document.location.assign('javascript:if (ChatContainer.innerHTML=="") {ChatContainer.innerHTML=ChatContainerContents};ChatWindow.close();void(0);');
		this.removeEventListener("click", arguments.callee, false);
		this.addEventListener("click", ocd, false);
		this.innerHTML="Detach Chat";
	}, false);
	this.innerHTML="Attach Chat";
}, false);
newData.appendChild(newButton);
newRow.appendChild(newData);

newData = document.createElement("td");
newData.setAttribute("align", "center");
newButton = document.createElement("button");
formatButton(newButton);
newButton.setAttribute("id","detVnCB");
newText = document.createTextNode("Detach Video & Chat");
newButton.appendChild(newText);
newButton.addEventListener("click", function() {
	document.getElementById("detVidB").disabled = true;
	document.getElementById("detChaB").disabled = true;
	document.location.assign('javascript:VideoAndChatWindow=window.open();VideoAndChatWindow.addEventListener("unload",function() {if (VideoAndChatWindow.window.opener.document.getElementById("detVnCB").innerHTML=="Attach Video &amp; Chat") {VideoAndChatWindow.window.opener.document.getElementById("detVnCB").click();}},false);VideoContainer=document.getElementById("adaptvDiv");VideoContainerContents=VideoContainer.innerHTML;VideoContainer.innerHTML="";ChatContainer=document.getElementById("FCAobject");ChatContainerContents=ChatContainer.innerHTML;ChatContainer.innerHTML="";VideoAndChatWindow.document.write("<table><tr><td>");VideoAndChatWindow.document.write(VideoContainerContents);VideoAndChatWindow.document.write("</td><td>");VideoAndChatWindow.document.write(ChatContainerContents);VideoAndChatWindow.document.write("</td></tr></table>");VideoAndChatWindow.document.title=document.title+" - Video and Chat";VideoAndChatWindow.window.stop();void(0);');
	ovcd=arguments.callee;
	this.removeEventListener("click", arguments.callee, false);
	this.addEventListener("click", function() {
		document.getElementById("detVidB").disabled = false;
		document.getElementById("detChaB").disabled = false;
		document.location.assign('javascript:if (VideoContainer.innerHTML=="") {VideoContainer.innerHTML=VideoContainerContents};if (ChatContainer.innerHTML=="") {ChatContainer.innerHTML=ChatContainerContents};VideoAndChatWindow.close();void(0);');
		this.removeEventListener("click", arguments.callee, false);
		this.addEventListener("click", ovcd, false);
		this.innerHTML="Detach Video & Chat";
	}, false);
	this.innerHTML="Attach Video & Chat";
}, false);
newData.appendChild(newButton);
newRow.appendChild(newData);

newTable.appendChild(newRow);

newRow = document.createElement("tr");

newData = document.createElement("td");
newData.setAttribute("align", "center");
newButton = document.createElement("button");
formatButton(newButton);
newButton.setAttribute("id","hidVidB");
newText = document.createTextNode("Hide Video");
newButton.appendChild(newText);
newButton.addEventListener("click", function() {
	document.getElementById("hidVnCB").disabled = true;
	GM_setValue("isHidVid",1);
	document.getElementById("adaptvDiv").style.visibility="hidden";
	ovs=arguments.callee;
	this.removeEventListener("click", arguments.callee, false);
	this.addEventListener("click", function() {
		if (GM_getValue("isHidCha")!=1)
		{
			document.getElementById("hidVnCB").disabled = false;
		};
		GM_deleteValue("isHidVid",1);
		document.getElementById("adaptvDiv").style.visibility="visible";
		this.removeEventListener("click", arguments.callee, false);
		this.addEventListener("click", ovs, false);
		this.innerHTML="Hide Video";
	}, false);
	this.innerHTML="Show Video";
}, false);
newData.appendChild(newButton);
newRow.appendChild(newData);

newData = document.createElement("td");
newData.setAttribute("align", "center");
newButton = document.createElement("button");
formatButton(newButton);
newButton.setAttribute("id","hidChaB");
newText = document.createTextNode("Hide Chat");
newButton.appendChild(newText);
newButton.addEventListener("click", function() {
	document.getElementById("hidVnCB").disabled = true;
	GM_setValue("isHidCha",1);
	document.getElementById("FCAobject").style.visibility="hidden";
	ocs=arguments.callee;
	this.removeEventListener("click", arguments.callee, false);
	this.addEventListener("click", function() {
		if (GM_getValue("isHidVid")!=1)
		{
		document.getElementById("hidVnCB").disabled = false;
		};
		GM_deleteValue("isHidCha",1);
		document.getElementById("FCAobject").style.visibility="visible";
		this.removeEventListener("click", arguments.callee, false);
		this.addEventListener("click", ocs, false);
		this.innerHTML="Hide Chat";
	}, false);
	this.innerHTML="Show Chat";
}, false);
newData.appendChild(newButton);
newRow.appendChild(newData);

newData = document.createElement("td");
newData.setAttribute("align", "center");
newButton = document.createElement("button");
formatButton(newButton);
newButton.setAttribute("id","hidVnCB");
newText = document.createTextNode("Hide Video & Chat");
newButton.appendChild(newText);
newButton.addEventListener("click", function() {
	document.getElementById("hidVidB").disabled = true;
	document.getElementById("hidChaB").disabled = true;
	document.getElementById("adaptvDiv").style.visibility="hidden";
	document.getElementById("FCAobject").style.visibility="hidden";
	ovcs=arguments.callee;
	this.removeEventListener("click", arguments.callee, false);
	this.addEventListener("click", function() {
		document.getElementById("hidVidB").disabled = false;
		document.getElementById("hidChaB").disabled = false;
		document.getElementById("adaptvDiv").style.visibility="visible";
		document.getElementById("FCAobject").style.visibility="visible";
		this.removeEventListener("click", arguments.callee, false);
		this.addEventListener("click", ovcs, false);
		this.innerHTML="Hide Video & Chat";
	}, false);
	this.innerHTML="Show Video & Chat";
}, false);
newData.appendChild(newButton);
newRow.appendChild(newData);

newTable.appendChild(newRow);

newDiv.appendChild(newTable);

if (document.getElementById("MoreLiveshowsDiv")!=null)
{
	document.getElementById("MoreLiveshowsDiv").parentNode.insertBefore(newDiv,document.getElementById("MoreLiveshowsDiv").nextSibling.nextSibling.nextSibling);
}
