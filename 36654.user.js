// ==UserScript==
// @name                Google Reader + Diigo
// @namespace      	http://google.com/reader/userscript
// @description       	Adds reader posts to Diigo when clicked, a hack of Google Reader + del.icio.us
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// ==/UserScript==


// Google Reader + Diigo
// Adapted from http://userscripts.org/scripts/show/34043


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
				btn.innerHTML="Add to Diigo";
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
		//alert(parent.parentNode.parentNode.previousSibling.childNodes[1].firstChild.firstChild.childNodes[1].firstChild);
		//header=parent.parentNode.parentNode.previousSibling.childNodes[1].
		//	firstChild.childNodes[1].childNodes[1].firstChild;
		header = parent.parentNode.parentNode.previousSibling.childNodes[1].firstChild.firstChild.childNodes[1].firstChild;
	}
	else{
		//alert(parent.previousSibling.childNodes[0].childNodes.length);
		//alert(parent.previousSibling.childNodes[0].childNodes[1].nodeName);
		header=parent.previousSibling.childNodes[0].childNodes[1].firstChild;	
	}
	url=header.getAttribute('href');
	var title=header.innerHTML;
	var title_remove_img_regexp = /<img.*?\/?>/;
	title = title.replace(title_remove_img_regexp,"");
	
/*	var content_div;
	content_div = header.parentNode.nextSibling.nextSibling.firstChild.firstChild.firstChild;
  var notes='';
  if (content_div.selectionStart || content_div.selectionStart == '0') {
		var startPos = content_div.selectionStart;
		var endPos = content_div.selectionEnd;
		var cursorPos = endPos;
		var scrollTop = content_div.scrollTop;

		if (startPos != endPos) {
			notes = content_div.innerHTML.substring(startPos,endPos);
	  }
	}
*/  	
	var pos=findPos(event.target);
	var addbkmk=getBookmarkField();
	addbkmk.className="round-box tags-container-box tags-container";
	addbkmk.setAttribute('style',"top: "+(pos[1]-15-50)+"px; left: "+(pos[0]+40-150)+"px; width: 350px !important;");
	//bookmarkField.setAttribute("style","width: 600px !important;");
	lblinput.value = getTags(parent);
	titleinput.value=title;
	lblinput.focus();
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
										lbldesc.innerHTML="Tags: (Separate with spaces)";
									editcontents.appendChild(lbldesc);
									lblinput=document.createElement("input");
										lblinput.setAttribute("type","text");
										lblinput.setAttribute("autocomplete","off");
										lblinput.className="tags-edit-tags label-input";
										lblinput.setAttribute("style",
											"width: 96% !important;");
									editcontents.appendChild(lblinput);
									var notesdesc=document.createElement("div"); 
										notesdesc.className="help";
										notesdesc.innerHTML="Extended:";
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
	var btn=document.createElement("table"); btn.className="button-container button-container-tight viewer-buttons "+class;
		var tr = document.createElement("tr");
		var td=document.createElement("td"); td.className="btl"; 
		var td2=document.createElement("td"); td2.className="btr";
		tr.appendChild(td); tr.appendChild(td2);
		btn.appendChild(tr);
		
		var tr2 = document.createElement("tr");
		var td3=document.createElement("td"); td3.className="bbl";
		tr2.appendChild(td3);
		
		var td4=document.createElement("td"); td4.className="bbr";

		var div2Inside=document.createElement("div"); div2Inside.className="button-body-container";
			var span=document.createElement("span"); span.className="button-body unselectable";
				span.innerHTML=text;
			div2Inside.appendChild(span);
		td4.appendChild(div2Inside);
		tr2.appendChild(td4);

		btn.appendChild(tr2);

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
	var notes=notesinput.value;
	GM_log("URL: "+url+"\nTitle: "+title+"\nTags: "+labels+"\nNotes: "+notes);
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://api2.diigo.com/bookmarks?' + 'url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)
		      +'&desc='+notes+'&tags='+labels
	})
	bookmarkField.className+=" hidden";
	bookmarkStar.className="item-star-active star link";
}