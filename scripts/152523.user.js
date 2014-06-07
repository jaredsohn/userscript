// ==UserScript==
// @name           Livelinks Backup
// @namespace      pendevin
// @description    Checks for new posts every minute and appends them to the page
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        http://endoftheinter.net/inboxthread.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// @include        https://endoftheinter.net/inboxthread.php*
// ==/UserScript==

//xhtmlhttprequest handler
//i got this from shoecream's userscript autoupdater at http://userscripts.org/scripts/show/45904
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

	createQueryString:function(obj){
		var ret=[];
		for(var i in obj)
			ret.push([i,encodeURIComponent(obj[i])].join('='));
		return ret.join('&');
	},

	//sends the XHR request, callback is the function to call on the returned page
	get:function(url,callback,optional){
		if(optional==undefined)optional=null;
		GM_xmlhttpRequest({
			method:'GET',
			url:url,
			headers:{
				'User-Agent':navigator.userAgent,
				'Content-Type':'application/x-www-form-urlencoded',
			},
			onload:function(r){XHR.createDoc(r,callback,optional);}
		});
	}
}

function base64Encode(data){
  return btoa(data.replace(/[\u0100-\uffff]/g,function(c){
    return String.fromCharCode(c.charCodeAt(0)&0xff);
  }));
}

//check shit and stuff
function goingLive(){
	//if we're writing a post, don't do shit
	if(getComputedStyle(closeButton).getPropertyValue('display')=='none'){
		XHR.get(location.href,function(r){
			var newMessages=r.doc.getElementsByClassName('message-container').length;
			var newPages=r.doc.getElementById('u0_3').innerHTML;

			//add new messages to the page
			if(newMessages>messages||pages.textContent!=newPages.textContent){
				location.reload();
			}

			//set up for the next check. suck it slow connection fags
			if(messages<50)
				window.setTimeout(goingLive,60000);
			else
				window.setTimeout(goingLive,600000);
		});
	}
	else{
		//set up for the next check. suck it slow connection fags
		if(messages<50)
			window.setTimeout(goingLive,5000);
		else
			window.setTimeout(goingLive,600000);
	}
}

//all the messages on a page
var messages=document.getElementsByClassName('message-container').length;
//the page number shit at the bottom
var pages=document.getElementById('u0_3').innerHTML;
//quickpost nub thing
var closeButton=document.getElementsByClassName('close')[0];
//start my shit
window.setTimeout(goingLive,5000);