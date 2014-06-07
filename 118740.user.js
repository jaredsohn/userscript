// ==UserScript==
// @name           Apple forum Enhancer
// @namespace      o_O
// @include        http://appleforum.s4.bizhat.com/*

// ==/UserScript==

var strFavicon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAEF0RVh0Q29tbWVudABDUkVBVE9SOiBnZC1qcGVnIHYxLjAgKHVzaW5nIElKRyBKUEVHIHY2MiksIHF1YWxpdHkgPSA5NQrNMqzWAAACUElEQVRIS51Uvc5hURS9xm9oJhIinoFCoVBqNGqvQERo8AoiHkBEhEQYjUQnESqinIKERKMRtUQU/j5m3W9dxx0x3LELzt1n73XW3nudI9nt9uv1ej6fL5cLFrPZLJ1OB4NBt9stvbMfN9PpdHJsvV4HBK1cLqvT9Xo9Pvn71ABBFCXmcDgA5Xg84vcdj+f7JCfvfX0bCtztdtVqtVKpgGmz2fx1s0ajgU9hwg9Pu91OJpMAMRgMMtbpdAIQ4USx2hebzQYgSr+QhjJZ6X8ZSCB+Pp/fseACKXhjsZj2fsXjcaTUajWmmM1m+Q9qYONTqZRGrOl0ivhQKIR4k8mEISpY7Bf2stmswOKwEcQBKa2VJK/Xi8j1eq0M7uFwUWMmk+E5rB/RxKIHlsvlAJTP57GG32azPdYhxocWPOzdhSNJq9UKQB6PRyjzCTU0nhNZLBbdbrff7w8Gg06nI3D9fj92J5MJPUajkXxF4XcGaDypLZfL4XD4+9sAx4hCoYCtRCKhaSzUPRKi0ehDwna7hd/lcqn7+AoUpCALoQne0kAgAE+v12Mmy0F1b9jt93vy4hxhpVIJn5FIRLQZKJTIizdDzhT94hxxmQDNHN4y5a7dKFF66qfGYrEom2KOrVYLdIrFoqY2/x2k6IOCoIXDYcRYrVan0/lTgzkcDjzL4KjoGVh8J3grP7DxeKywxBAB9NnjxYNHo9Edi5rAi0odvTbMVBgi0RAxbvmNJpbP5/ug60hB4xXpsTqojEBi5P9aqM+j4qg+2c854mH6jJQ66w8wGG87YeRfrQAAAABJRU5ErkJggg==";
var strNewTitle;
var strNewFont="Tahoma";
try{
	strNewTitle=GM_getValue("Title","Frendz Forum");
}catch(e){
	strNewTitle="Frendz Forum";
}

if(document.body && (document.body.textContent.indexOf("Server failed stats")!=-1 || document.body.textContent.indexOf("Too many connections")!=-1)){
	location.reload();
}

function setFavicon(strSrc){
	var aLinks=document.getElementsByTagName("link");
	for(var i=0;i<aLinks.length;i++){
		if(aLinks[i].rel==="icon"){
			aLinks[i].href=strSrc;
			return;
		}
	}
	var aLink=document.createElement("link");
	aLink.rel="icon";
	aLink.type="image/png";
	aLink.href=strSrc;
	document.getElementsByTagName("head")[0].appendChild(aLink);
}

setFavicon(strFavicon);

var changeTitle=function (){
	strNewTitle=prompt("Enter new title:",strNewTitle);
	if(strNewTitle)
		GM_setValue("Title",strNewTitle);
}

function processLinks(){
	try{
		repairLinks();
		if(location.pathname.indexOf("/download2.php")!=-1)
			startFzDownload();
		if(location.href.indexOf("/forum/login.php")!=-1)
			location.href=location.href.replace("/forum/login.php","/login.php");
		if(location.href.indexOf("/forum/register.php")!=-1)
			location.href=location.href.replace("/forum/register.php","/register.php");
		if(location.href.indexOf("/authenticate.php")!=-1)
			location.href=location.href.replace("/authenticate.php","/forum");
	}catch(e){}
}
function repairLinks(){
	for(var i=0;i<document.links.length;i++){
		try{
			var t=document.links[i];
			
			
			// Repair all links here
			
			// Repair = No Popups
			t.setAttribute("onclick","");
			
			// Repair = Direct Attachment Links + [Download Now] will directly redirect to file + [Post] to check post and details.
			
			// 1. for frendz4m.com
			if(t.getAttribute("skipme")!="true" && (t.href.indexOf("/link.php?link=download.php")!=-1 || t.href.indexOf("/download.php")!=-1)){
				t.href="http://www.frendz4m.com/forum/downloads/download2.php"+t.search.substring(t.search.lastIndexOf("?"));
				t.target="_blank";
				
				var drl=document.createElement("a");
				drl.setAttribute("href","javascript:void(0);");
				drl.setAttribute("onclick",""+
						"this.innerHTML=\"<iframe src=\\\""+t.href+"\\\" width=0 height=0 style=\\\"visibility:hidden\\\"></iframe>\";"+
						"return false;"+
					"");
				drl.setAttribute("skipme", "true");
				drl.innerHTML="[Download Now]";
				t.parentNode.insertBefore(drl,t);
				t.parentNode.insertBefore(document.createTextNode(" "),t);
				
				
				var pst=document.createElement("a");
				pst.setAttribute("href","http://www.frendz4m.com/forum/downloads/download.php"+t.search.substring(t.search.lastIndexOf("?")));
				pst.innerHTML="[Post]";
				pst.setAttribute("skipme", "true");
				t.parentNode.insertBefore(pst,t);
				t.parentNode.insertBefore(document.createTextNode(" "),t);
			}
			
			
			// 2. for moviesmobile.net
			if(t.href.indexOf("/common/dwnload.php?")!=-1){
				t.href=t.href.replace("/common/dwnload.php?","/common/download.php?");
				t.target="_blank";
			}
            
            
			// Repair = Direct External Links
			if(t.href.indexOf("http://www.frendzforum.org/forum/link.php?link=")!=-1 || t.href.indexOf("frendz4m.com/forum/link.php?link=")!=-1 || t.href.indexOf("moviesmobile.net/common/link.php?link=")!=-1){
				var strLink=t.href.substr(t.href.lastIndexOf("link.php?link=")+14);
				if(strLink.indexOf("www.")==0)
					strLink="http://"+strLink;
				t.href=strLink;
				t.target="_blank";
			}
			
			
			// Repair = Disable Ad Links. Disable ad images yourself with Adblock Plus.
			if(t.href.toLowerCase().indexOf("http://ads")==0 || t.href.toLowerCase().indexOf("buzzcity.net")!=-1 || t.href.toLowerCase().indexOf("sky4m.com")!=-1 || t.href.toLowerCase().indexOf("sky4mcom")!=-1 || t.href=="http://bit.ly/cumKBr"|| t.href.toLowerCase().indexOf("amobee.com")!=-1 || t.href.toLowerCase().indexOf("inmobi.com")!=-1){
				t.style.display="none";
				t.href="javascript:alert('Ad Link');void 0;";
				t.innerHTML="";
			}
			
			// Repair = Search IP -> Profile Link + New Window
			if(t.href.indexOf("/search/profile.php?")!=-1){
				t.href=t.href.replace(/\/search\/profile.php/ig,"/profile.php");
				t.target="_blank";
			}
			
			// Repair = Search Posts -> Repair Thread links + New Window
			if(t.href.indexOf("/search/index.php?forumID=")!=-1 && t.innerHTML.indexOf("Search")==-1){
				t.href=t.href.replace(/\/search\/index.php/ig,"/showthreads.php");
				t.target="_blank";
			}
			
			/*// Repair = Remove Personal Profile Links // Disabled
			if(t.href.indexOf("/profilep.php")!=-1){
				t.innerHTML="";
				t.href="";
			}*/
			
			//Repair =  Direct links for registration and login
			if(t.href.indexOf("/forum/login.php")!=-1)
				t.href=t.href.replace("/forum/login.php","/login.php");
			if(t.href.indexOf("/forum/register.php")!=-1)
				t.href=t.href.replace("/forum/register.php","/register.php");
			
			// Repair = Trace IPs
			if(t.href.indexOf("/ipdetails.php")!=-1){
				t.href="http://aruljohn.com/track.pl?host="+t.textContent;
				t.target="_blank";
			}
			
			// Repair GET to POST - Doesn't work - fucked up coding by owner
			if(t.href.indexOf("/searchp.php?searchterm=")!=-1){
				t.style.display="none";
			}
					
			// Repair = HREF -> Title
			t.title=t.href;
		}catch(e){}
	}
}

function startFzDownload(){
	for(var i=0;i<document.links.length;i++){
		try{
			var t=document.links[i];
			if(t.innerHTML=="Download"){
				var x=t.href;
				document.body.innerHTML="<font face=\""+strNewFont+"\" size=7><a href=\""+x+"\">"+getFzFileName(x)+"</a></font>";
				location.replace(x);
				break;
			}
		}catch(e){}
	}
}

function getFzFileName(x){
	try{
		var y=x.substr(x.lastIndexOf("/")+1);
		y=y.substr(y.indexOf("-")+1);
		y=y.substr(y.indexOf("-")+1);
		return y;
	}catch(e){}
}

function applyCSSTheme(){
	try{
		var css;
		css="body,table{font-family:"+strNewFont+" !important;width:100% !important}"+
			"textarea{width:100% !important;}"+
			".maintable{border:1px solid #e0e0e0 !important;width:100% !important;padding:0px 0px 0px 0px !important}"+
			".logo2{font-size:25px !important;font-family:"+strNewFont+" !important;text-shadow: #c0c0c0 5px 5px 5px !important;}"+
			".logo{font-family:"+strNewFont+" !important}"+
			"a:hover{text-decoration:underline !important;}"+
			"a{font-family:"+strNewFont+" !important;text-decoration:none !important;color:#497D9C !important;}"+
			"a:visited{color: #997D9C !important;}"+
			".headline{text-align:left;font-family:"+strNewFont+" !important;font-size:12px !important}"+
			".forumrow,.catline,.attachrow,input,textarea,select{text-align:left;font-family:"+strNewFont+" !important;font-size:13px !important}"+
			"td{border:0px !important;padding:2px 2px 2px 3px !important;vertical-align:top !important;font-family:"+strNewFont+" !important;}"+
			".numbertd{text-align:right;font-family:monospace;font-size:12px}"+
			".pink{color:#000080 !important}"+
			"input[name=\"title\"]{width:100% !important}"+
			"table.quotecode td{font-family:monospace !important}";
		if(location.host.indexOf(".fzc.me")==-1){
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
		}
		try{
			var ad=document.getElementsByClassName("ad")[0];
			ad.innerHTML="";
		}catch(e){}
		var maintable=document.getElementsByClassName("maintable");
		if(maintable[3].innerHTML.indexOf("Forum Category")!=-1)
			maintable[3].innerHTML="";
		for(var i=0;i<maintable.length;i++){
			try{
				if(maintable[i].rows[0].cells[0].innerHTML=="Sub-Forum Name" || maintable[i].rows[0].cells[0].innerHTML=="Forum Name"){
					maintable[i].rows[0].insertCell(1).innerHTML="Forum Starter";
					for(var j=1;j<maintable[i].rows.length;j++){
						if(maintable[i].rows[j].cells.length==5){
							maintable[i].rows[j].insertCell(2).innerHTML="<font color=##008000>FrendzForum</font>";
							maintable[i].rows[j].cells[0].width="2%";
							maintable[i].rows[j].cells[1].width="38%";
							maintable[i].rows[j].cells[2].width="10%";
							maintable[i].rows[j].cells[3].width="5%";
							maintable[i].rows[j].cells[4].width="5%";
							maintable[i].rows[j].cells[5].width="30%";
						}
					}
				}
			}catch(e){}
			try{
				for(var j=0;j<maintable[i].rows.length;j++){
					for(var k=0;k<maintable[i].rows[j].cells.length;k++){
						if(j%2==0 && maintable[i].rows.length>3)
							maintable[i].rows[j].cells[k].style.background="#e0e0e0";
					}
				}
			}catch(e){}
			try{
				if(maintable[i].rows[0].cells[0].innerHTML=="Sub-Forum Name" || maintable[i].rows[0].cells[0].innerHTML=="Forum Name" || maintable[i].rows[0].cells[0].innerHTML=="Topic"){
					for(var j=0;j<maintable[i].rows.length;j++){
						if(maintable[i].rows[j].cells.length==6){
							maintable[i].rows[j].cells[3].className="numbertd";
							maintable[i].rows[j].cells[4].className="numbertd pink";
							maintable[i].rows[j].cells[2].innerHTML="<a href=\"profile.php?username="+maintable[i].rows[j].cells[2].textContent+"\">"+maintable[i].rows[j].cells[2].textContent+"</a>";
							maintable[i].rows[j].cells[5].className="numbertd";
							maintable[i].rows[j].cells[3].innerHTML=currency(maintable[i].rows[j].cells[3].innerHTML);
							maintable[i].rows[j].cells[4].innerHTML=currency(maintable[i].rows[j].cells[4].innerHTML);
							var username=maintable[i].rows[j].cells[5].getElementsByTagName("font")[0];
							username.innerHTML="<a href=\"profile.php?username="+username.textContent+"\">"+username.textContent+"</a>";
						} else if(maintable[i].rows[j].cells.length==5){
							maintable[i].rows[j].cells[2].className="numbertd";
							maintable[i].rows[j].cells[3].className="numbertd pink";
							maintable[i].rows[j].cells[4].className="numbertd";
						}
					}
				}
			}catch(e){}
		}
	}catch(e){}
}

function currency(s){
	try{
		var a=parseInt(s);
		var b=""+a+"";
		if(b.length>6){
			b=b.substring(0,b.length-6)+","+b.substring(b.length-6,b.length-3)+","+b.substring(b.length-3);
		} else if(b.length>3){
			b=b.substring(0,b.length-3)+","+b.substring(b.length-3);
		}
		return "&nbsp;"+b;
	}catch(e){}
}

function removeAdRows(){
	try{
		var maintable=document.getElementsByClassName("maintable");
		for(var i=0;i<maintable.length;i++){
			try{
				if(maintable[i].rows[0].cells[0].innerHTML=="Topic"){
					for(var j=0;j<maintable[i].rows.length;j++){
						if(maintable[i].rows[j].cells[1].textContent.replace(/\r/g,'').replace(/\n/g,'').length==0){
							maintable[i].deleteRow(j);
							j--;
							continue;
						}
					}
				}
			}catch(e){}
		}
	}catch(e){}
}

function removeSpoiler(el){}

function repairTitle(){}

function changeForumName(strTitle){
	document.title=replaceAll(document.title,"Frendz Forum",strTitle,10);
	document.title=replaceAll(document.title,"Frendz Wap",strTitle,10);
	document.title=replaceAll(document.title,"FrendzForum",strTitle,10);
	document.title=replaceAll(document.title,"Frendz4m",strTitle,10);
	var divs=unsafeWindow.document.getElementsByTagName("div");
	for(var i in divs){
		try{
			if(divs[i].className.indexOf("logo")!=-1){
				divs[i].innerHTML=replaceAll(divs[i].innerHTML,"Frendz Forum",strTitle,10);
				divs[i].innerHTML=replaceAll(divs[i].innerHTML,"FrendzForum",strTitle,10);
				divs[i].innerHTML=replaceAll(divs[i].innerHTML,"Frendz4m",strTitle,10);
				divs[i].title="Click to change title";
				divs[i].addEventListener("click",changeTitle,false);
			}
		}catch(e){}
	}
}

function replaceAll(strString,strWhat,strWith,intLoop){
	while(strString.indexOf(strWhat)!=-1 && intLoop--){
		strString=strString.replace(strWhat,strWith)
	}
	return strString;
}

function removeInlineStyles(){ //lolwut?
	var aStyles=document.getElementsByTagName("style");
	while(aStyles.length!=0){
		try{
			aStyles[0].parentNode.removeChild(aStyles[0]);
			aStyles=document.getElementsByTagName("style");
		}catch(e){
			break;
		}
	}
}

function createPagination(){
	for(var i=0;i<document.links.length;i++){
		var link=document.links[i];
		if(link.pathname.indexOf("/forum/showthreads-")==0 && (link.pathname.indexOf("+")!=-1 || link.pathname.indexOf("--")==-1) || (link.textContent.indexOf("Last")!=-1 && link.pathname.indexOf("/forum/showforums-")!=-1)){
			var strLastPagePathname="";
			if(link.textContent.indexOf("Last")!=-1 && link.pathname.indexOf("/forum/showforums-")!=-1)
				strLastPagePathname=link.pathname;
			else if(link.nextSibling){
				for(var child=link.nextSibling;child;child=child.nextSibling){
					if(child.nodeType==3)
						continue;
					if(child.nodeName.toLowerCase()!="a" && child.nodeName.toLowerCase()!="font")
						break;
					if(child.pathname && child.pathname.indexOf("--")!=-1 && (child.innerHTML.indexOf("Last")!=-1 || child.innerHTML.indexOf("L")!=-1)){
						strLastPagePathname=child.pathname;
						break;
					}
				}
			}
			if(strLastPagePathname.length!=0){
				var lngLastPage=parseInt(strLastPagePathname.substring(strLastPagePathname.indexOf("--")+2));
				if(link.nextSibling && link.nextSibling.innerHTML && link.nextSibling.innerHTML.indexOf("(L)")!=-1)
					link.parentNode.removeChild(link.nextSibling);
				link.parentNode.appendChild(document.createElement("br"));
				link.parentNode.appendChild(document.createTextNode("Page: [ "));
				var j;
				var intList=20;
				if(strLastPagePathname.indexOf("/forum/showforums-")!=-1)
					intList=15;
				for(j=0;j<lngLastPage && j<intList*10;j+=intList){ // 10 pages
					addPagination(link, j, intList);
					link.parentNode.appendChild(document.createTextNode(" "));
				}
				if(j<lngLastPage){
					var temp=lngLastPage-intList*9;
					if(temp>j){
						j=temp;
						link.parentNode.appendChild(document.createTextNode("... "));
					}
					for(;j<lngLastPage;j+=intList){ // 10 pages
						addPagination(link, j, intList);
						link.parentNode.appendChild(document.createTextNode(" "));
					}
				}
				addPagination(link, lngLastPage, intList);
				link.parentNode.appendChild(document.createTextNode(" ]"));
			}
		}
	}
}

function addPagination(link, lngPost, intList){
	var aPageLink=document.createElement("a");
	if(link.href.indexOf("+")!=-1)
		aPageLink.href=link.href.substr(0,link.href.indexOf("+"))+"--"+lngPost+".htm";
	else if(link.href.indexOf("--")!=-1)
		aPageLink.href=link.href.substr(0,link.href.indexOf("--"))+"--"+lngPost+".htm";
	else if(link.href.indexOf(".htm")!=-1)
		aPageLink.href=link.href.substr(0,link.href.indexOf(".htm"))+"--"+lngPost+".htm";
	aPageLink.innerHTML=parseInt(lngPost/intList)+1;
	link.parentNode.appendChild(aPageLink);
}

function repairHTML(){
	var tds=document.getElementsByTagName("td");
	for(var i=0;i<tds.length;i++){
		if(tds[i].innerHTML.indexOf("&amp;")!=-1){
			tds[i].innerHTML=tds[i].innerHTML.replace(/\&amp;/g,"&");
		}
	}
}
removeInlineStyles();
repairHTML();
processLinks(); // also removes ads
removeAdRows();
applyCSSTheme();
removeSpoiler(unsafeWindow.document.body.parentNode);
repairTitle();
changeForumName(strNewTitle);
createPagination();

var selects=document.getElementsByTagName("select");
for(var i=0;i<selects.length;i++){
	if(selects[i].name=="moveto"){
		selects[i].addEventListener("change",function (){
			location.href=this.value;
		},false);
	}
}