// ==UserScript==
// @name                Google Reader 2 Douban 
// @namespace      	    http://npchen.blogspot.com/
// @description         在Google Reader添加推荐到豆瓣的按钮
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// @require             http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author              NullPointer
// @version             1.0.1
/* @reason
   v1.0.1  推荐成功后的提示直接出现在post下，不再弹出对话框
   v1.0  新版Google Reader到豆瓣推荐脚本
   @end*/
// ==/UserScript==

var thisScript = {
   name: "Google Reader 豆瓣推荐",
   id: "48219",
   version:"1.0.1"
}

var updater = new Updater(thisScript);
updater.check();  

var DEFAULT_LABEL="";
var NORMALIZE=true;

var bookmarkField;
var bookmarkStar;
var lblinput;
var notesinput;
var urlinput;
var url;
var titleinput;
var notesdesc;
var mode;

var ck;

function setck(){
   var rurl = "http://www.douban.com/recommend/?url="+encodeURIComponent('http://www.douban.com/')+'&title='+encodeURIComponent('test');
   GM_xmlhttpRequest({
		method: 'GET',
		url: rurl,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) { 
				ck=responseDetails.responseText.match(/<input type=\"hidden\" name=\"ck\" value=\"([a-zA-Z0-9]{4})\"\/>/)[1];
			}	
		}
	});
}

setck();

var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

var recbtn;

function nodeInserted(event){	
	if (event.target.tagName=="DIV"){
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
				recbtn=document.createElement("span");
				recbtn.className="item-star star link";
				recbtn.innerHTML="豆瓣";
				recbtn.addEventListener("click", postBookmark,false);
				linkbar.appendChild(recbtn);
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
    //setck(url, title);
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
	notesinput = document.getElementById("notesinput");
	urlinput = document.getElementById("urlinput");
	titleinput = document.getElementById("titleinput");
	notesinput.addEventListener('click',function(){notesinput.focus();},false);
	notesinput.value="";
	urlinput.value = url;
	titleinput.value=title;
	btnSend = document.getElementById("btnSend");
	btnCancel = document.getElementById("btnCancel");
	btnSend.addEventListener('click',saveBookmark,false);
	if (mode=="expanded"){
		btnCancel.addEventListener("click", function(){event.target.parentNode.parentNode.className = "card-actions card-bottom";bookmarkField.className="action-area card-bottom hidden"; event.target.className = "item-star star link"; },false);
	} else {
		btnCancel.addEventListener("click", function(){parent.className = "entry read expanded";bookmarkField.className="action-area hidden"; event.target.className = "item-star star link"; },false);
	}
	btnSend.focus();
	notesinput.focus();
}

function getBookmarkField(){
	if (!bookmarkField){
		bookmarkField=document.createElement("div");
		bookmarkField.setAttribute("id", "doubanField");
		bookmarkField.innerHTML = "<div class='email-this-area'> <table class='email-entry-table'> <tbody> <tr> <td class='field-name'>标题:</td> <td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input' type='text' id='titleinput'></td> </tr> <tr> <td class='field-name'>网址:</td> <td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input' type='text' id='urlinput'></td> </tr> <tr> <td colspan='2'><div id='notesdesc'><b>评论:</b> </div><br> <textarea class='email-this-comment' rows='4' id='notesinput'></textarea> <div class='email-this-buttons' tabindex='-1'> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-send' id='btnSend'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'>&nbsp;</div> <div class='goog-button-base-content'> <div class='goog-button-body'>发送</div> </div></div></div></div></div> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-cancel' id='btnCancel'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'>&nbsp;</div> <div class='goog-button-base-content'> <div class='goog-button-body'>取消</div> </div></div></div></div></div> </div></td></tr></tbody></table> </div>";
	}
	return bookmarkField;
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
	var title=titleinput.value;
	var notes=notesinput.value;
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://www.douban.com/recommend/?', 
		headers: {'Content-type': 'application/x-www-form-urlencoded'},   
		data: 'title=' + encodeURIComponent(title) + '&uid=' + encodeURIComponent(url)  + '&comment=' + notes +'&type=I&ck='+ck,
        onload: function(responseDetails) {
			if (responseDetails.status == 200) { 
				recbtn.innerHTML="推荐成功"
			}
                        //else alert(responseDetails.status);
		}
	});
    bookmarkField.className+=" hidden";
	bookmarkStar.className="item-star-active star link";
	notesinput.value="";
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