// ==UserScript==
// @name                Google Reader + jiwai.de
// @namespace      	http://google.com/reader/userscript
// @description       	Adds reader posts to jiwai.de when clicked
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include            https://google.com/reader/*
// @include             https://*.google.com/reader/*
// ==/UserScript==


//Constants
//NORMALIZE=false leaves the tags alone
//NORMALIZE=true converts tags to proper case and replaces -'s with spaces, like reader should itself
var DEFAULT_LABEL="";
var NORMALIZE=true;

//Variables for editing bookmark details
var bookmarkField;
var bookmarkStar;
var lblinput;
var notesinput;
var url;
var titleinput;

var mode;

var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);
entries.addEventListener('DOMNodeRemoved', function(event){nodeRemoved(event);},true);

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
				else if (event.target.firstChild && event.target.firstChild.className=="card"){
					linkbar=event.target.firstChild.firstChild.childNodes[2].
						childNodes[1].firstChild;
					mode="expanded";
				}
				else
					return;
				var btn=document.createElement("span");
				btn.className="item-star star link";
				btn.innerHTML="Share with jiwai.de";
				btn.addEventListener("click", postBookmark,false);
				linkbar.appendChild(btn);
			}
		}
		catch(e){
			//GM_log(e);
		}
	}
}

function nodeRemoved(event){
	if (event.target.tagName=="TABLE"){
		if (event.target.getAttribute("id")=="bookmarkField"){
			bookmarkField=null;
			getBookmarkField();
		}
	}
}

function postBookmark(event){
	bookmarkStar=event.target;
	var parent=event.target.parentNode;
	var header;
	if (mode=="expanded"){
		header=parent.parentNode.parentNode.previousSibling.childNodes[1].
			firstChild.childNodes[1].childNodes[1].firstChild;
	}
	else{
		header=parent.previousSibling.childNodes[1].childNodes[1].firstChild;	
	}
	url=header.getAttribute('href');
	var title=header.firstChild.nodeValue;
		
	var pos=findPos(event.target);
	var addbkmk=getBookmarkField();
	addbkmk.className="round-box tags-container-box tags-container";
	addbkmk.setAttribute('style',"top: "+(pos[1]-85)+"px; left: "+(pos[0]-150)+"px; width: 350px !important;");
	//bookmarkField.setAttribute("style","width: 600px !important;");
	lblinput.value = getTags(parent);
	urlinput.value = url;
	titleinput.value=title;
	if(notesdesc) {
		notesdesc.innerHTML="Note:";
	}
	if(notesinput) {
		notesinput.value="";
	}
}

function getBookmarkField(){
	if (!bookmarkField){
		bookmarkField=document.createElement("table");
		bookmarkField.setAttribute("id","bookmarkField");
		bookmarkField.setAttribute("cellspacing","0");
		bookmarkField.setAttribute("cellpadding","0");
		bookmarkField.setAttribute("border","0");
		bookmarkField.className="round-box tags-container-box tags-container hidden";
		//bookmarkField.setAttribute("style","width: 600px !important;");
		var body=document.createElement("tbody");
			var bodyTR1=document.createElement("tr");
				var bodyTR1TD1=document.createElement("td"); bodyTR1TD1.className="s tl";
				bodyTR1.appendChild(bodyTR1TD1);
				var bodyTR1TD2=document.createElement("td"); bodyTR1TD2.className="s"; 
				bodyTR1.appendChild(bodyTR1TD2);
				var bodyTR1TD3=document.createElement("td"); bodyTR1TD3.className="s tr"; 
				bodyTR1TD3.setAttribute("style","width: 3ox !important;");
				bodyTR1.appendChild(bodyTR1TD3);
			body.appendChild(bodyTR1);
			var bodyTR2=document.createElement("tr");
				var bodyTR2TD1=document.createElement("td"); bodyTR2TD1.className="s"; 
				bodyTR2.appendChild(bodyTR2TD1);
				var bodyTR2TD2=document.createElement("td"); bodyTR2TD2.className="c"; 
					var ul=document.createElement("ul");
						var li=document.createElement("li"); li.className="user-tags-param-parent user-tags";
							var divedit=document.createElement("div"); divedit.className="tags-edit";
								divedit.setAttribute("style","width: 98% !important;");
								var editcontents=document.createElement("div"); 
									editcontents.className="tags-edit-contents";
									
									var titledesc=document.createElement("div"); 
									titledesc.className="help";
										titledesc.innerHTML="Description:";
									editcontents.appendChild(titledesc);
									titleinput=document.createElement("input");
										titleinput.setAttribute("type","text");
										titleinput.setAttribute("autocomplete","off");
										titleinput.className="tags-edit-tags";
										titleinput.setAttribute("style",
											"width: 96% !important;");
									editcontents.appendChild(titleinput);
									
									var lbldesc=document.createElement("div"); 
										lbldesc.className="help";
										lbldesc.innerHTML="Tags: (Separate with comma)";
									editcontents.appendChild(lbldesc);
									lblinput=document.createElement("input");
										lblinput.setAttribute("type","text");
										lblinput.setAttribute("autocomplete","off");
										lblinput.className="tags-edit-tags label-input";
										lblinput.setAttribute("style",
											"width: 96% !important;");
									editcontents.appendChild(lblinput);
									
									var urldesc=document.createElement("div"); 
										urldesc.className="help";
										urldesc.innerHTML="URL:";
									editcontents.appendChild(urldesc);
									urlinput=document.createElement("input");
										urlinput.setAttribute("type","text");
										urlinput.setAttribute("autocomplete","off");
										urlinput.className="tags-edit-tags label-input";
										urlinput.setAttribute("style",
											"width: 96% !important;");
									editcontents.appendChild(urlinput);
									
									notesdesc=document.createElement("div"); 
										notesdesc.className="help";
										notesdesc.innerHTML="Note:";
									editcontents.appendChild(notesdesc);
									notesinput=document.createElement("textarea");
										notesinput.setAttribute("type","text");
										notesinput.setAttribute("autocomplete","off");
										notesinput.setAttribute("rows","2");
										notesinput.setAttribute("cols","20");
										notesinput.setAttribute("style",
											"width: 96% !important; height: 40px !important;");
									editcontents.appendChild(notesinput);
									
									var buttons=document.createElement("div"); 
										buttons.className="tags-edit-buttons";
										var save=createButton("Save","tags-edit-save");
										save.addEventListener('click',saveBookmark,false);
										buttons.appendChild(save);
										var tiny=createButton("TinyURL","tags-edit-tiny");
										tiny.addEventListener('click',getTinyAndInsert,false);
										buttons.appendChild(tiny);
										var count=createButton("Count","tags-edit-count");
										count.addEventListener('click',countWord,false);
										buttons.appendChild(count);
										var close=createButton("Cancel","tags-edit-cance;");
										close.addEventListener("click",
										function(){bookmarkField.className+=" hidden";}
										,false);
										buttons.appendChild(close);
									editcontents.appendChild(buttons);
								divedit.appendChild(editcontents);
							li.appendChild(divedit);
						ul.appendChild(li);
					bodyTR2TD2.appendChild(ul);
				bodyTR2.appendChild(bodyTR2TD2);
				var bodyTR2TD3=document.createElement("td"); bodyTR2TD3.className="s"; 
				bodyTR2TD3.setAttribute("style","width: 3ox !important;");
				bodyTR2.appendChild(bodyTR2TD3);
			body.appendChild(bodyTR2);
			var bodyTR3=document.createElement("tr");
				var bodyTR3TD1=document.createElement("td"); bodyTR3TD1.className="s bl"; 
				bodyTR3.appendChild(bodyTR3TD1);
				var bodyTR3TD2=document.createElement("td"); bodyTR3TD2.className="s"; 
				//bodyTR3TD2.setAttribute("style","width: 130% !important; ");
				bodyTR3.appendChild(bodyTR3TD2);
				var bodyTR3TD3=document.createElement("td"); bodyTR3TD3.className="s br"; 
				bodyTR3.appendChild(bodyTR3TD3);
				bodyTR3.setAttribute("style","width: 3ox !important;");
			body.appendChild(bodyTR3);
		bookmarkField.appendChild(body);
		entries.appendChild(bookmarkField);
	}
	return bookmarkField;
}

function createButton(text,class){
	var btn=document.createElement("div"); btn.className="button-container "+class;
		var div1=document.createElement("div"); div1.className="btl"; btn.appendChild(div1);
		var div2=document.createElement("div"); div2.className="bbl";
			var div2Inside=document.createElement("div"); div2Inside.className="bbr";
				var span=document.createElement("span"); span.className="button-body";
					span.innerHTML=text;
				div2Inside.appendChild(span);
			div2.appendChild(div2Inside);
		btn.appendChild(div2);
	return btn;
}

function getTags(parent){
	var ins=parent.getElementsByTagName("ins");
	var lbls="";
	for (var i=0;i<ins.length;i++){
		var lbl=ins[i].innerHTML;
		if (NORMALIZE){
			lbl=lbl.replace(/-/g,' ');
			lbl=lbl.toLowerCase().replace(/^(.)|\s(.)/g, function($1) { return $1.toUpperCase(); });
		}
		if (i>0) lbls+=" ";
		lbls+=lbl;
	}
	if (DEFAULT_LABEL.length>0){
		if (lbls.length>0){
			lbls=DEFAULT_LABEL+" "+lbls;
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
	
	var title=titleinput.value;
	var labels=lblinput.value;
	if(labels.length>0) {
		labels = "[" + labels + "] ";
	}
	var notes=notesinput.value;
	if(notes.length>0) {
		notes = " (" + notes + ")";
	}
	var msg = labels + title + notes + ' ' + urlinput.value;
	var size = 1000 - countMsgWord(msg);
	if(size<0) {
		alert("the message is too long!");
		notesdesc.innerHTML="Note: remain " + size + " characters";
		return;
	}
	
	GM_log("URL: "+url+"\nTitle: "+title+"\nTags: "+labels+"\nNotes: "+notes);
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://api.jiwai.de/statuses/update.xml', 
		headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
		data: 'source=GRSharing&status=' + labels + title + notes + ' ' + encodeURIComponent(urlinput.value)
//	    onload: function(responseDetails) {
//	        alert('returned status:' + responseDetails.status +
//	              ',statusText:' + responseDetails.statusText + '\n' +
//	              ',responseHeaders:' + responseDetails.responseHeaders + '\n' +
//	              'responseText:\n' + responseDetails.responseText);
//	    }
	})
	bookmarkField.className+=" hidden";
	bookmarkStar.className="item-star-active star link";
	notesinput.value="";
}

function getTinyAndInsert(event) {
  var thelongurl = url;
  urlinput.value = "making url tiny...";
  GM_xmlhttpRequest({
		method: 'GET',
		url: "http://tinyurl.com/create.php?url=" + thelongurl,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				urlinput.value=responseDetails.responseText.match(/<blockquote><b>(http\:\/\/tinyurl\.com\/[a-zA-Z0-9]+)<\/b><br>/)[1];
			}	
		}
	});
}

function countWord(event) {
	
	var title=titleinput.value;
	var labels=lblinput.value;
	if(labels.length>0) {
		labels = "[" + labels + "] ";
	}
	var notes=notesinput.value;
	if(notes.length>0) {
		notes = " (" + notes + ")";
	}
	var msg = labels + title + notes + ' ' + urlinput.value;
	notesdesc.innerHTML="Note: remain " + (1000 - countMsgWord(msg)) + " characters";
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

