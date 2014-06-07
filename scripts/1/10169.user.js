// ==UserScript==
// @name                Google Reader + Twitter
// @namespace      	http://google.com/reader/userscript
// @description       	Adds reader posts to twitter when clicked
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// ==/UserScript==


//Constants
//NORMALIZE=false leaves the tags alone
//NORMALIZE=true converts tags to proper case and replaces -'s with spaces, like reader should itself

//-------------------------- custmoize code begin-----------------------------------
var URL_SHORTENER = 'bitly';// you can also use 'tinyurl'

//format the message to send, pls type as you like
function formatSendMsg(labels, title, notes, url) {
	var msg = "";
	if(notes.length>0) {
		msg = notes + " ";
	}
	if(labels.length>0) {
		msg = msg + "#" + labels + " ";
	}
	msg = msg + "reading:" + title + ' ' + url 
	return msg;
	//return notes + " reading " + title + ' ' + url;
}

//-------------------------- custmoize code end -----------------------------------

//-------------------------- shorturl service begin ---------------------------------

var urlShorteners = {
	'bitly':getTinyAndInsert_BitLy,
	'tinyurl':getTinyAndInsert_TinyURL
}

function getTinyAndInsert_TinyURL(event) {
  var thelongurl = url;
  urlinput.value = "making url tiny...";
  GM_xmlhttpRequest({
		method: 'GET',
		url: "http://tinyurl.com/create.php?url=" + thelongurl,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				urlinput.value=responseDetails.responseText.match(/<blockquote><b>(http\:\/\/tinyurl\.com\/[a-zA-Z0-9]+)<\/b><br>/)[1];
				countWord(event);
			}	
		}
	});
}

function getTinyAndInsert_BitLy(event) {
  var thelongurl = url;
  urlinput.value = "making url tiny...";
  GM_xmlhttpRequest({
		method: 'GET',
		url: "http://api.bit.ly/shorten?version=2.0.1&login=twitthis&apiKey=R_f0b6b5e3a4c028b3ec97119e4f3ce16c&format=xml&longUrl=" + thelongurl,
		onload: function(responseDetails) {
				var tinydom = new DOMParser().parseFromString(responseDetails.responseText, "application/xml");
				urlinput.value = tinydom.getElementsByTagName('shortUrl')[0].textContent;
				countWord(event);
		}
	});
}

//-------------------------- shorturl service end ---------------------------------


var getTinyAndInsert = urlShorteners[URL_SHORTENER];

var DEFAULT_LABEL="";
var NORMALIZE=true;

//Variables for editing bookmark details
var bookmarkField;
var bookmarkStar;
var lblinput;
var notesinput;
var urlinput;
var url;
var titleinput;
var notesdesc;

var mode;


var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

function nodeInserted(event){	
	if (event.target.tagName=="DIV"){
		//GM_log("Added - "+event.target.className);
		try{
			if (event.target.className!=""){
				var linkbar;
				if (event.target.className=="entry-actions"){
					linkbar=event.target;
					mode="list";
				}
				else if (event.target.firstChild && event.target.firstChild.className ==="card card-common"
			    ||  event.target.firstChild.className === "ccard-container card-common"){
					linkbar = getElementsByClassName("entry-actions", "div", event.target)[0];
					mode="expanded";
				}
				else
					return;
				var btn=document.createElement("span");
				btn.className="item-star star link";
				btn.innerHTML="Twitter";
				btn.addEventListener("click", postBookmark,false);
				linkbar.appendChild(btn);
			}
		}
		catch(e){
			//GM_log(e);
		}
	}
}

function postBookmark(event){
	bookmarkStar=event.target;
	var parent;
	var header;
	if (mode=="expanded"){
	  parent= event.target.parentNode.parentNode.parentNode;
	  event.target.parentNode.parentNode.className = "card-actions";
	}
	else{
	  parent= event.target.parentNode.parentNode;
	  parent.className = "entry read expanded action-area-visible";
	}
	event.target.className = "item-star star link email-active";
	url = getElementsByClassName("entry-title-link","a",parent)[0].getAttribute('href');
	var title = getElementsByClassName("entry-title-link","a",parent)[0].firstChild.nodeValue;
	var pos=findPos(event.target);
	var addbkmk=getBookmarkField();
	if (mode=="expanded"){
		if (addbkmk.className=="action-area card-bottom"){
			event.target.className = "item-star star link";
			addbkmk.className = "action-area card-bottom hidden";
			event.target.parentNode.parentNode.className = "card-actions card-bottom";
			return;
		}
		addbkmk.className="action-area card-bottom";
	} else {
		if (addbkmk.className=="action-area"){
			event.target.className = "item-star star link";
			addbkmk.className = "action-area hidden";
			parent.className = "entry read expanded";
			return;
		}
		addbkmk.className="action-area";
	}
	parent.appendChild(bookmarkField);
	lblinput = document.getElementById("lblinput");
	notesinput = document.getElementById("notesinput");
	urlinput = document.getElementById("urlinput");
	titleinput = document.getElementById("titleinput");
	notesdesc = document.getElementById("notesdesc");
	notesinput.addEventListener('click',function(){notesinput.focus();},false);
	notesinput.value="";
	lblinput.value = getTags(parent);
	urlinput.value = url;
	titleinput.value=title;
	btnSend = document.getElementById("btnSend");
	btnTinyURL = document.getElementById("btnTinyURL");
	btnCount = document.getElementById("btnCount");
	btnCancel = document.getElementById("btnCancel");
	btnSend.addEventListener('click',saveBookmark,false);
	btnTinyURL.addEventListener('click',getTinyAndInsert,false);
	btnCount.addEventListener('click',countWord,false);
	if (mode=="expanded"){
		btnCancel.addEventListener("click", function(){event.target.parentNode.parentNode.className = "card-actions card-bottom";bookmarkField.className="action-area card-bottom hidden"; event.target.className = "item-star star link"; notesdesc.innerHTML="<b>Note to go along with the item:</b> (Optional, no more than 140 characters)";notesinput.value="";},false);
	} else {
		btnCancel.addEventListener("click", function(){parent.className = "entry read expanded";bookmarkField.className="action-area hidden"; event.target.className = "item-star star link"; notesdesc.innerHTML="<b>Note to go along with the item:</b> (Optional, no more than 140 characters)";notesinput.value="";},false);
	}
	countWord(event);
	btnSend.focus();
	notesinput.focus();
}

function getBookmarkField(){
	if (!bookmarkField){
		bookmarkField=document.createElement("div");
		bookmarkField.setAttribute("id", "twitterField");
		bookmarkField.innerHTML = "<div class='email-this-area'> <table class='email-entry-table'> <tbody> <tr> <td class='field-name'>Title:</td> <td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input' type='text' id='titleinput'></td> </tr> <tr> <td class='field-name'>Tag:</td> <td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input' type='text' id='lblinput'></td> </tr> <tr> <td class='field-name'>URL:</td> <td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input' type='text' id='urlinput'></td> </tr> <tr> <td colspan='2'><div id='notesdesc'><b>Note to go along with the item:</b> (Optional, no more than 140 characters)</div><br> <textarea class='email-this-comment' rows='6' id='notesinput'></textarea> <div class='email-this-buttons' tabindex='-1'> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-send' id='btnSend'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'>&nbsp;</div> <div class='goog-button-base-content'> <div class='goog-button-body'>Send</div> </div></div></div></div></div> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-cancel' id='btnTinyURL'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'>&nbsp;</div> <div class='goog-button-base-content'> <div class='goog-button-body'>TinyURL</div> </div></div></div></div></div> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-cancel' id='btnCount'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'>&nbsp;</div> <div class='goog-button-base-content'> <div class='goog-button-body'>Count</div> </div></div></div></div></div> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-cancel' id='btnCancel'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'>&nbsp;</div> <div class='goog-button-base-content'> <div class='goog-button-body'>Cancel</div> </div></div></div></div></div> </div></td></tr></tbody></table> </div>";
	}
	return bookmarkField;
}

function getTags(parent){
	var taglist = getElementsByClassName("user-tags-list", "ul", parent)[0];
	var ins = taglist.getElementsByTagName("li");
	var lbls="";
	for (var i=0;i<ins.length;i++){
		var lbl=ins[i].getElementsByTagName("a")[0].text;
		if (NORMALIZE){
			lbl=lbl.replace(/-/g,' ');
			lbl=lbl.toLowerCase().replace(/^(.)|\s(.)/g, function($1) { return $1.toUpperCase(); });
		}
		if (i>0) lbls+=", ";
		lbls+=lbl;
	}
	if (DEFAULT_LABEL.length>0){
		if (lbls.length>0){
			lbls=DEFAULT_LABEL+", "+lbls;
		}
		else{
			lbls=DEFAULT_LABEL;
		}
	}
	return lbls;
}

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft + obj.offsetParent.offsetLeft;
		curtop = obj.offsetTop + obj.offsetParent.offsetTop+obj.offsetParent.offsetParent.offsetTop;
	} 
	return [curleft,curtop];
}

function saveBookmark(event){
	
	var title = titleinput.value;
	var labels = lblinput.value;
	var notes = notesinput.value;
	var msg = formatSendMsg(labels, title, notes, urlinput.value);
	var size = 140 - countMsgWord(msg);
	if(size<0) {
		alert("the message is too long!");
		notesdesc.innerHTML="<b>Note to go along with the item:</b> (Optional, remain " + size + " characters)";
		return;
	}
	
	GM_log("URL: "+url+"\nTitle: "+title+"\nTags: "+labels+"\nNotes: "+notes);
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'https://twitter.com/statuses/update.xml', 
		headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
		data: 'source=GRSharing&status=' + formatSendMsg(labels, title, notes, encodeURIComponent(urlinput.value))
//	    onload: function(responseDetails) {
//	        alert('returned status:' + responseDetails.status +
//	              ',statusText:' + responseDetails.statusText + '\n' +
//	              ',responseHeaders:' + responseDetails.responseHeaders + '\n' +
//	              'responseText:\n' + responseDetails.responseText);
//	    }
	})
	if (mode=="expanded"){
		getElementsByClassName("card-actions","div",bookmarkField.parentNode)[0].className = "card-actions card-bottom";
	} else {
		bookmarkField.parentNode.className = "entry read expanded";
	}
	bookmarkField.className+=" hidden";
	bookmarkStar.className="item-star-active star link";
	notesinput.value="";
}

function countWord(event) {
	
	var title=titleinput.value;
	var labels=lblinput.value;
	var notes=notesinput.value;
	var msg = formatSendMsg(labels, title, notes, urlinput.value);
	notesdesc.innerHTML="<b>Note to go along with the item:</b> (Optional, remain " + (140 - countMsgWord(msg)) + " characters)";
}

function countMsgWord(str) {
	var len;
	var i;
	len = 0;
	for (i=0;i<str.length;i++) {
		if (str.charCodeAt(i)>255) {
			len++;
		} else {
			len++;
		}
	}
	return len;
}

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}	
	}
	return returnElements;
}