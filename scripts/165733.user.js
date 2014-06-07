// ==UserScript==
// @name           FF-FLOODER-BY-DABAANG
// @namespace      website.name.removed
// @include        http://*.frendz4m.com/forum/*
// @include        http://www.frendzforum.org/forum/*
//       
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Required Functions*/

var doc=document;
unsafeWindow.doc=document;

unsafeWindow.xmlrequest=function (aUrl,aData,aFunc,aMethod){
	try{
		var request=new XMLHttpRequest();
		var method="POST";
		if(aMethod)
			method=aMethod;
			request.open(method,aUrl);
		request.onreadystatechange=function (){
			if(request.readyState==4){
				aFunc(request);
			}
		}
		if(method.toUpperCase()!="GET"){
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.setRequestHeader("Content-Length",aData.length);
		}
		request.setRequestHeader("Connection","close");
		if(method.toUpperCase()!="GET")
			request.send(aData);
		else
			request.send(null);
	}catch(e){}
}

/*Loading Complete Functions*/

unsafeWindow.topicFloodComplete=function (resp){
	alert("Done");
}

unsafeWindow.shoutboxFloodComplete=function (resp){
	try{
		doc.forms[0].elements['floodcount'].value=parseInt(doc.forms[0].elements['floodcount'].value)-1;
		if(parseInt(doc.forms[0].elements['floodcount'].value)==0)
			window.location=window.location; 
	}catch(e){}
}

unsafeWindow.newTopicFloodComplete=function (resp){
	try{
		if(resp.responseText.indexOf("You can only post once")!=-1){
			alert("Got limit!");
		}
		doc.forms[0].elements['floodcount'].value=parseInt(doc.forms[0].elements['floodcount'].value)-1;
		if(parseInt(doc.forms[0].elements['floodcount'].value)==0)
			history.back();
	}catch(e){}
}

unsafeWindow.thanksFloodComplete=function (resp){
	var thankslink=document.getElementById("thankslink");
	var thanksdone=0;
	if(thankslink.text!="Thanks All"){
		thanksdone=parseInt(thankslink.text);
	}
	thankslink.innerHTML=(thanksdone+1)+" Thanks Done";
}

/*Flooders*/
unsafeWindow.floodnow=function (){
	try{
		if(document.location.pathname.indexOf("/index2.php")!=-1 || document.location.pathname.indexOf("/shout.php")!=-1){ // Shoutbox
			var shoutMessage="";
			for(var i=0;i<parseInt(doc.forms[0].elements['floodcount'].value);i++){
				if(doc.forms[0].elements['message'])
					shoutMessage="message="+escape(doc.forms[0].elements['message'].value+"[COLOR=White]"+i+"[/COLOR]")+"&shout="+escape("Shout!");
				else if(doc.forms[0].elements['shout'])
					shoutMessage="shout="+escape(doc.forms[0].elements['shout'].value+"[COLOR=White]"+i+"[/COLOR]");
				win.xmlrequest(doc.location.href,shoutMessage,unsafeWindow.shoutboxFloodComplete);
			}
		}
	}catch(e){}
	
	try{
		if(document.location.pathname.indexOf("/newtopic.php")!=-1){ // New Topic
			for(var i=0;i<parseInt(doc.forms[0].elements['floodcount'].value);i++){
				win.xmlrequest(doc.forms[0].action,"name="+doc.forms[0].elements['name'].value+"&title="+escape(doc.forms[0].elements['title'].value)+"&submitpost=Post&post="+escape(doc.forms[0].elements['post'].value+"[COLOR=White]"+i+"[/COLOR]"),unsafeWindow.newTopicFloodComplete);
			}
		}
	}catch(e){}
}

unsafeWindow.floodtopic=function floodtopic(url){
	var reply=prompt("Enter reply:","");
	var threadparent=url;
	var tempThreadparent=0;
	var forumID=0;
	threadparent=threadparent.substr(threadparent.indexOf("-")+1);
	forumID=parseInt(threadparent);
	threadparent=threadparent.substr(threadparent.indexOf("-")+1);
	tempThreadparent=parseInt(threadparent);
	threadparent=threadparent.substr(threadparent.indexOf("-")+1);
	threadparent=parseInt(threadparent);
	if(isNaN(threadparent))
		threadparent=tempThreadparent;
	if(document.locaton.indexOf("sky4m.com")!=-1)
		win.xmlrequest("replyquick.php?forumID="+forumID,"threadparent="+threadparent+"&reply=reply&post="+escape(reply),win.topicFloodComplete);
	else
		win.xmlrequest(url,"threadparent="+threadparent+"&reply=reply&post="+escape(reply),win.topicFloodComplete);
}

unsafeWindow.thanksall=function (){
	var docLinks=document.links;
	for(var i in docLinks){
		try{
			if(docLinks[i].href.toString().indexOf("/thx.php")!=-1){
				win.xmlrequest(docLinks[i].href.toString(),"",win.thanksFloodComplete,"GET");
			}
		}catch(e){}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Add CSS*/
var css=".flooder,.flooder input{font-family:Tahoma !important;color:red !important}";  
var win=unsafeWindow;
var doc=unsafeWindow.document;


if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Remove interuptions

if(document.location.pathname.indexOf("/index2.php")!=-1){
	try{
		var metaRefresh=document.getElementsByTagName("meta")[0]; // Remove Timeout on Shoutbox
		metaRefresh.parentNode.removeChild(metaRefresh);
	}catch(e){}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Apply Floodings*/

// Full Shoutbox / New Topic
if(document.location.pathname.indexOf("/index2.php")!=-1 || document.location.pathname.indexOf("/newtopic.php")!=-1 || document.location.pathname.indexOf("/shout.php")!=-1){ // Shoutbox or New Topic
	try{
		var span1=document.createElement("span");  // Add Flooder
		span1.innerHTML="<br><span class=flooder>Repeat : <input name=floodcount type=text value=10> <input name=floodnow type=button onclick=window.floodnow(); value=\"Flood Now\"></span>";
		document.forms[0].appendChild(span1);
	}catch(e){}	
}

// Forum Topics

if(document.location.pathname.indexOf("/showforums")!=-1 || document.location.pathname.indexOf("/forumdisplay")!=-1){ // Forums	
	var docLinks=document.links;
	for(var i in docLinks){
		try{
			if(docLinks[i].href.indexOf("/showthread")!=-1 && docLinks[i].href.indexOf("http://")==0 && docLinks[i].text.indexOf("(L)")==-1 && docLinks[i].text.indexOf("(Last)")==-1){
				var space1=document.createElement("span");
				space1.innerHTML="&nbsp;("
				var space2=document.createElement("span");
				space2.innerHTML=")"
				var a1=document.createElement("a");
				a1.href="javascript:floodtopic('"+docLinks[i].href+"');";
				a1.className="flooder";
				a1.innerHTML="<b>Flood</b>";
				docLinks[i].parentNode.appendChild(space1);
				docLinks[i].parentNode.appendChild(a1);
				docLinks[i].parentNode.appendChild(space2);
			}
		}catch(e){}
	}
}

// Topic, Thanks to Everyone + Reply Box

if(document.location.pathname.indexOf("/showthread")!=-1){ // Topic
	var a1=document.createElement("a");
	a1.style.position="fixed";
	a1.className="flooder";
	a1.style.top="0px";
	a1.style.right="0px";
	a1.style.fontSize="50px";
	a1.href="javascript:window.thanksall();void 0;";
	a1.innerHTML="Thanks All";
	a1.id="thankslink";
	document.body.appendChild(a1);
	
	var a2=document.createElement("a");
	a2.style.position="Fixed";
	a2.className="flooder";
	a2.style.bottom="0px";
	a2.style.right="0px";
	a2.style.fontSize="33px";
	a2.href="javascript:window.floodtopic('"+location.href+"');void 0;";
	a2.innerHTML="Flood";
	document.body.appendChild(a2);
}