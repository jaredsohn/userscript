// ==UserScript==
// @name           LLinkify
// @namespace      pendevin
// @description    Fetches the title of topics and links
// @include        http://endoftheinter.net/inboxthread.php?*
// @include        http://boards.endoftheinter.net/message.php?*
// @include        http://boards.endoftheinter.net/postmsg.php*
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        http://archives.endoftheinter.net/showmessages.php?*
// @include        https://endoftheinter.net/inboxthread.php?*
// @include        https://boards.endoftheinter.net/message.php?*
// @include        https://boards.endoftheinter.net/postmsg.php*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// @include        https://archives.endoftheinter.net/showmessages.php?*
// ==/UserScript==

//xhtmlhttprequest handler
//i got this from shoecream's userscript autoupdater at http://userscripts.org/scripts/show/45904
//**!!!NEEDS THE addElm FUNCTION!!!**
var XHR={
	// r.doc is the returned page
	// r.respose is the response element
	createDoc:function(response,callback,optional){
		var doc=document.implementation.createDocument('','',null);
		var html=document.createElement("html");
		html.innerHTML=response.responseText;
		doc.appendChild(html);
		var r={};
		r.response=response;
		r.doc=doc;
		callback(r,optional);
	},

	//sends the XHR request, callback is the function to call on the returned page
	get:function(url,callback,optional){
		if(optional==undefined)optional=null;
		GM_xmlhttpRequest({
			method:'GET',
			url:url,
			headers:{
				'User-Agent': navigator.userAgent,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			onload:function(r){XHR.createDoc(r,callback,optional);}
		});
	}
}

//returns a new element with (tag, id(optional), classname(optional), innerHTML(optional))
//if you want any other attributes, add arrays to the end of the arguments with [attribute,value]
//this might be cooler using JSON, but i could be wrong---probably
//for the attributes, use the html versions not the dom versions
function addElm(tag,id,className,innerHTML){
	var newElm=document.createElement(tag);
	if(id!=undefined&&id!=null)newElm.id=id;
	if(className!=undefined&&className!=null)newElm.className=className;
	if(innerHTML!=undefined&&innerHTML!=null)typeof innerHTML=="string"?newElm.innerHTML=innerHTML:newElm.appendChild(innerHTML);
	for(var i=4;i<arguments.length;i++)newElm.setAttribute(arguments[i][0],arguments[i][1]);
	return newElm;
}

//i totally improved this one
//variables that aren't present return null
//a variable with no value returns the true
function getUrlVars(urlz){
	//thanks for the function citizenray
	var vars=[];
	var hash="";
	var hashes=urlz.slice(urlz.indexOf('?')+1).split('&');
	for(var i=0;i<hashes.length;i++){
		hash=hashes[i].split('=');
		if(hash[1]!=null&&hash[1].indexOf("#")>=0)hash[1]=hash[1].substring(0,hash[1].indexOf("#"));
		if(hash[1]==undefined){
			hash[1]=true;
			if(hash[0].indexOf("#")>=0)hash[0]=hash[0].substring(0,hash[0].indexOf("#"));
		}
		vars.push(hash[0]);
		vars[hash[0]]=hash[1];
	}
	return vars;
}

var throbber="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";

function linkit(){
	topic(document.body);
	if(location.pathname=="/showmessages.php"){
		document.addEventListener("DOMNodeInserted",function(e){setTimeout(function(){if(e.target.firstChild&&e.target.firstChild.className=="message-container"){topic(e.target);}},0);},false);
	}

	var css="\
		.invalid_topic,.invalid_link{text-decoration:line-through;}\
		.valid{color:#00cc00;}\
		.invalid{color:#ff0035;}\
	";
	GM_addStyle(css);
}

function topic(place){
	var as=place.getElementsByTagName("a");
	for(var i=0;i<as.length;i++){
		if((as[i].parentNode.className=="message"||as[i].parentNode.className=="body"||as[i].parentNode.className=="quoted-message")&&as[i].pathname=="/showmessages.php"&&as[i].id!='nextpage')
			getLink(as[i]);
	}

	//send an xhr request for a page, gets the title
	function getLink(link){
		link.innerHTML="<img src='"+throbber+"'>Loading topic...";
		link.className+=" LT";
		XHR.get(link.href,function(r){
			var h2=r.doc.title.substring(22);
			if(h2==""){
				link.innerHTML="<span class='invalid'>\u2772Invalid Topic\u2773</span> "+link.title+" <span class='invalid'>\u2718</span>";
				link.className="invalid_topic";
			}
			else if(r.doc.getElementsByTagName("em")[0].innerHTML=="This topic has been archived. No additional messages may be posted.")
				link.innerHTML=h2+" <span class='invalid'>\u2714\u2772AT\u2773</span>";
			else
				link.innerHTML=h2+" <span class='valid'>\u2714\u2772LT\u2773</span>";
		},link);
	}
}

linkit();