// ==UserScript==
// @name          Google Bookmark Sidebar
// @namespace     Hans Schmucker (hansschmucker@gmail.com)
// @description	Creates a sidebar compatible Google Bookmarks interface
// @include       http://www.google.com/*
// ==/UserScript==

function IsBookmark(linktobecheckednum){
	var linktobechecked=document.links[linktobecheckednum].id;
		if( linktobechecked.match( /bkmk_href/ ) ){
			return 1;
		}else{
			return 0;
		}

}

function IsLinkLabel(linktobecheckednum){
	var linktobechecked=document.links[linktobecheckednum].href;
		if( linktobechecked.match( /google\.com\/searchhistory\/lookup\?q\=label\:/ ) && document.links[linktobecheckednum].parentNode.getAttribute("class",false)=="cp"){
			return 1;
		}else{
			return 0;
		}

}

function togglesubs(event){
	var label=this.getAttribute("name",0); 
	if(top.document.getElementById("GBM_iframe").getAttribute("inuse",0)=="0"){
		if(top.document.getElementById(label+"_treehandle").getAttribute("collapsed",0)=="1"){
			top.document.getElementById(label+"_treehandle").src="http://hansschmucker.free.fr/minus.png";
			top.document.getElementById(label+"_content").style.display="";
			top.document.getElementById(label+"_treehandle").setAttribute("collapsed","0");
			if(top.document.getElementById(label+"_treehandle").getAttribute("filled",0)=="0"){
				top.document.getElementById("GBM_iframe").setAttribute("inuse","1");
				top.document.getElementById("GBM_iframe").src="http://www.google.com/searchhistory/lookup?q=label:"+label+"&reporttotop=bookmarks&whichlabel="+label;
				top.document.getElementById(label+"_treehandle").setAttribute("filled","1");
			}
		}else{
			top.document.getElementById(label+"_treehandle").setAttribute("collapsed","1");
			top.document.getElementById(label+"_treehandle").src="http://hansschmucker.free.fr/plus.png";
			top.document.getElementById(label+"_content").style.display="none";
		}
	}
}

function followLink(event){
	var label=this.getAttribute("name",0); 
	top.location.href=top.document.getElementById(label+"_bookmarkhandlefont").getAttribute("url",0);
}

function displayLinkUrl(event){
	var label=this.getAttribute("name",0); 
	top.document.getElementById("urlfielddiv").firstChild.nodeValue=top.document.getElementById(label+"_bookmarkhandlefont").getAttribute("url",0);
	top.document.getElementById("urlfielddiv").style.left = event.pageX + "px";
	top.document.getElementById("urlfielddiv").style.top = event.pageY + "px";
	top.document.getElementById("urlfielddiv").style.display="";
}

function hideLinkUrl(event){
	top.document.getElementById("urlfielddiv").style.display="none";
	top.document.getElementById("urlfielddiv").firstChild.nodeValue="";
}

function AttachLabelLink(insertat,url, text, fontsize){
		var Plus=document.createElement("img");
			Plus.src="http://hansschmucker.free.fr/google/bookmarks/plus.png";
			Plus.setAttribute("class","treehandle");
			Plus.setAttribute("id",text+"_treehandle");
			Plus.setAttribute("name",text);
			Plus.style.display="";
			Plus.addEventListener("click", togglesubs, false);
			Plus.setAttribute("url",url);
			Plus.setAttribute("collapsed","1");
			Plus.setAttribute("filled","0");
			Plus.style.cursor="pointer";

		var LinkFont=document.createElement("font");
			LinkFont.setAttribute("size",fontsize);
			LinkFont.value=text;
			LinkFont.setAttribute("face","Tahoma,Verdana,Arial");
			LinkFont.appendChild(document.createTextNode(text));
			LinkFont.setAttribute("class","categoryhandlefont");
			LinkFont.setAttribute("id",text+"_categoryhandlefont");
			LinkFont.setAttribute("name",text);
			LinkFont.addEventListener("click", togglesubs, false);
			LinkFont.setAttribute("url",url);
			LinkFont.style.cursor="pointer";

		var content=document.createElement("div");
			content.setAttribute("class","content");
			content.setAttribute("id",text+"_content");
			content.setAttribute("name",text);
			content.style.display="none";


		insertat.appendChild(Plus);
		insertat.appendChild(LinkFont);
		insertat.appendChild(content);
		insertat.appendChild(document.createElement("br"));
		
}



function AttachBookmarkLink(insertat,url, text, fontsize){
		var handle=document.createElement("img");
			handle.src="http://hansschmucker.free.fr/google/bookmarks/list.png";
			handle.setAttribute("class","bookmarkhandle");
			handle.setAttribute("id",text+"_bookmarkhandle");
			handle.setAttribute("name",text);
			handle.setAttribute("url",url);
			handle.addEventListener("click", followLink, false);
			handle.addEventListener("mouseover", displayLinkUrl, false);
			handle.addEventListener("mouseout", hideLinkUrl, false);
			handle.style.cursor="pointer";

		var LinkFont=document.createElement("font");
			LinkFont.setAttribute("size",fontsize);
			LinkFont.value=text;
			LinkFont.setAttribute("face","Tahoma,Verdana,Arial");
			LinkFont.appendChild(document.createTextNode(text));
			LinkFont.setAttribute("class","bookmarkhandlefont");
			LinkFont.setAttribute("id",text+"_bookmarkhandlefont");
			LinkFont.setAttribute("name",text);
			LinkFont.addEventListener("click", followLink, false);
			LinkFont.addEventListener("mouseover", displayLinkUrl, false);
			LinkFont.addEventListener("mouseout", hideLinkUrl, false);
			LinkFont.setAttribute("url",url);
			LinkFont.style.cursor="pointer";

		insertat.appendChild(handle);
		insertat.appendChild(LinkFont);
		insertat.appendChild(document.createElement("br"));
		return handle;
}

function reportlabels(){
	for(mi=0;mi<document.links.length;mi++){
		if( IsLinkLabel(mi) ){
			var Text=document.links[mi].href;
			Text=Text.replace( /.*label\:(\w*)\&.*/, '$1');
			AttachLabelLink(top.document.getElementById("labels"), document.links[mi].href, Text, 1);
		}
	}
}

function reportbookmarks(label){
	for(mi=0;mi<document.links.length;mi++){
		if( IsBookmark(mi) ){
			var handle=AttachBookmarkLink(top.document.getElementById(label+"_content"), document.links[mi].href, document.links[mi].text, 1);
		}
	}
	handle.src="http://hansschmucker.free.fr/google/bookmarks/listend.png";
}

function main(){
	if(top.location.href!=self.location.href){
		if( self.location.href.match( /google\.com\/searchhistory/ ) ){
			if( self.location.href.match( /reporttotop\=labels/ ) ){
				reportlabels();
			}
			if( self.location.href.match( /reporttotop\=bookmarks/ ) ){
				reportbookmarks(self.location.href.replace( /.*whichlabel\=(\w*).*/, '$1'));
			}
			top.document.getElementById("GBM_iframe").setAttribute("inuse","0");
			self.location.href="about:about";
		}
	}else{
		if( self.location.href.match( /google\.com\/bookmarks/ ) ){
			document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("table")[1]);
			document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("blockquote")[0]);
			document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("table")[0]);
			var iframe=document.createElement("iframe");
				iframe.width="1";
				iframe.height="1";
				iframe.style.position="absolute";
				iframe.style.top="-32px";
				iframe.style.left="-32px";
				iframe.id="GBM_iframe";
				iframe.src="http://www.google.com/searchhistory/lookup?q=is:bookmarked&reporttotop=labels";
				iframe.setAttribute("inuse","0");
			document.getElementsByTagName("body")[0].appendChild(iframe);
			var div=document.createElement("div");
				div.id="labels";
			document.getElementsByTagName("body")[0].appendChild(div);
			
			var urlfielddiv=document.createElement("div");
				urlfielddiv.id="urlfielddiv";
				urlfielddiv.style.position="absolute";
				urlfielddiv.style.top="32px";
				urlfielddiv.style.left="32px";
				urlfielddiv.style.backgroundColor="rgb(196,196,196)";
				urlfielddiv.style.display="none";
				urlfieldtext=document.createTextNode("");
				urlfielddiv.appendChild(urlfieldtext);
			
			document.getElementsByTagName("body")[0].appendChild(urlfielddiv);
			
			document.title="GBookmarks";
			document.getElementsByTagName("body")[0].style.backgroundImage="url(http://hansschmucker.free.fr/google/bookmarks/bg.png)";
			document.getElementsByTagName("body")[0].style.backgroundRepeat="repeat-y";
			document.getElementsByTagName("body")[0].style.backgroundPosition="left"; 
		}
	}
}

main();
