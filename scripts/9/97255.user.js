// ==UserScript==
// @name           Edit Enhancer
// @namespace      pendevin
// @description    Highlights edits on the messages screen.
// @include http://boards.endoftheinter.net/showmessages.php*
// @include https://boards.endoftheinter.net/showmessages.php*
// ==/UserScript==

//reads a cookie registered for the local domain
function readCookie(name){
	var	nameEQ=name+"=";
	var	ca=document.cookie.split(';');
	for(var i in ca){
		var	c=ca[i];
		if(c.indexOf(" ")==0)c=c.substring(1);
		if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);
	}
	return null;
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

//not a method
function insertAfter(newNode,target){
	var parent=target.parentNode;
	var refChild=target.nextSibling;
	if(refChild!=null)parent.insertBefore(newNode,refChild);
	else parent.appendChild(newNode);
}

//i totally improved this one
//variables that aren't present return null
//a variable with no value returns the true
function getUrlVars(urlz){
	//thanks for the function citizenray
	var vars=[];
	var hash="";
	var hashes=urlz.slice(urlz.indexOf('?')+1).split('&');
	for(var i in hashes){
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

//xhtmlhttprequest handler
//i got this from shoecream's userscript autoupdater at http://userscripts.org/scripts/show/45904
//needs the addElm funtion
var XHR={
	// adds an extra 'doc' property to the response object that contains
	// the document element of the response
	createDoc:function(r,callback,optional){
		var doc=document.implementation.createDocument('','',null);
		var html=addElm("html",null,null,r.responseText);
		doc.appendChild(html);
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

function enhance(){
	var tops=document.getElementsByClassName("message-top");
	var posters=[];
	var details=[];
	for(var i in tops){
		if(tops[i].parentNode.className!="quoted-message"){
			for(var j in tops[i].children){
				if(tops[i].children[j].href!=undefined&&tops[i].children[j].href.search(/\?user=\d+/)!=-1)posters.push(tops[i].children[j].href.match(/\?user=(\d+)/)[1]);
				if(tops[i].children[j].innerHTML.search(/Message\sDetail/)!=-1)details.push(tops[i].children[j]);
			}
		}
	}
	for(i in details){
		if(details[i].innerHTML.search(/\(\d+\sedits?\)/)!=-1){
			details[i].href+="&diff";
			details[i].className="highlight";
		}
		if(posters[i]==readCookie("userid")&&details[i].parentNode.parentNode.lastChild.firstChild.firstChild.firstChild.innerHTML!="[This message was deleted at the request of the original poster]"&&details[i].nextSibling.className!=("editEnhancements")){
			var links=addElm("span",null,"editEnhancements","\
				 | \
				<a href='/postmsg.php?board="+getUrlVars(location.href)["board"]+"&topic="+getUrlVars(details[i].href)["topic"]+"&id="+getUrlVars(details[i].href)["id"]+"'>Edit Message</a>\
				 | \
				<form style='display: inline;' action='"+details[i].href+"' method='post' id='deleteMe_"+i+"'>\
				<input type='hidden' value='fuck' name='h' id='deleteH_"+i+"'>\
				<input type='hidden' value='1' name='action'>\
				<span id='deleteSubmit_"+i+"' class='deleteSubmit'>Delete Message</span>\
				</form>\
			");
			insertAfter(links,details[i]);
			document.getElementById("deleteSubmit_"+i).addEventListener("click",function(){
				if(window.confirm("Are you sure you want to delete this message")){
					XHR.get(details[i].href,function(r){
						var forms=r.doc.getElementsByTagName("form");
						for(var j in forms)if(forms[j].action==details[i].pathname+details[i].search)document.getElementById("deleteH_"+i).value=forms[j].firstChild.value;
						document.getElementById("deleteMe_"+i).submit();
					});
				}
			},false);
		}
	}
}

enhance();
document.addEventListener("DOMNodeInserted",function(e){if(e.target.firstChild&&e.target.firstChild.className=="message-container")enhance();},false)

var css="\
	.message-container>.message-top>.highlight{font-weight:bold;}\
	.deleteSubmit{cursor:pointer;text-decoration:underline;}\
";
GM_addStyle(css);

