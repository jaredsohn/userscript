// Google Reader + ma.gnolia
// Author:     Aqeel Zafar
// Website:  http://aqeeliz.com
// Version:   0.0.1
// Credit:     Ported http://userscripts.org/scripts/show/7957 to ma.gnolia from del.icio.us
// ------
// 
// ==UserScript==
// @name                Google Reader + ma.gnolia
// @namespace      http://aqeeliz.com
// @description     Adds google reader posts to ma.gnolia when clicked
// @include            http://google.com/reader/*
// @include            http://*.google.com/reader/*
// ==/UserScript==

//Constants
//NORMALIZE=false leaves the tags alone
//NORMALIZE=true converts tags to proper case
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
				btn.innerHTML="Add to ma.gnolia";
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
	var title=header.firstChild.innerHTML;
		
	var pos=findPos(event.target);
	var addbkmk=getBookmarkField();
	addbkmk.className="round-box tags-container-box tags-container";
	addbkmk.setAttribute('style',"top: "+(pos[1]-15)+"px; left: "+(pos[0]+40)+"px; width: 350px !important;");
	//bookmarkField.setAttribute("style","width: 600px !important;");
	lblinput.value = getTags(parent);
	titleinput.value=title;
  
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
										titledesc.innerHTML="Title:";
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
										lbldesc.innerHTML="Tags: (Separate with commas)";
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
										notesdesc.innerHTML="Description:";
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
			//lbl=lbl.replace(/-/g,' ');
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
	GM_log("URL: "+url+"\nTitle: "+titleinput.value+"\nTags: "+lblinput.value+"\nNotes: "+notesinput.value);
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'https://ma.gnolia.com/api/mirrord/v1/posts/add?' + 'url='+encodeURIComponent(url)+'&description='+titleinput.value
		      +'&extended='+notesinput.value+'&tags='+lblinput.value
	})
	bookmarkField.className+=" hidden";
	bookmarkStar.className="item-star-active star link";
}
