// ==UserScript==
// @name                Google Reader + BlueDot
// @namespace      	http://google.com/reader/userscript
// @description       	Adds reader posts to BlueDot when clicked
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// ==/UserScript==


// Google Reader + BlueDot
// Adapted from http://userscripts.org/scripts/show/7957 by Jordan Brock
// Keyboard shortcut support added by Liu Yang
// Adapted for BlueDot, notes fixed by David Morgan
// Keyboard shortcuts:
//	d: Brings up the posting dialog box
//	ctrl+enter: Posts the Dot

//Constants
//NORMALIZE=false leaves the tags alone
//NORMALIZE=true converts tags to proper case and replaces -'s with spaces, like reader should itself
var DEFAULT_LABEL="GReader";
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
				/*		var checkURL = linkbar.parentNode.parentNode.previousSibling.childNodes[1].firstChild.childNodes[1].childNodes[1].firstChild.getAttribute('href');
					GM_log('https://secure.bluedot.us/v1/posts/get?' + 'url='+encodeURIComponent(checkURL));
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'https://secure.bluedot.us/v1/posts/all?' + 'url='+encodeURIComponent(checkURL),
					    	onload: function(responseDetails) {
				        		//alert('Request for posting returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' +'Data:\n' + responseDetails.responseText);
								if (responseDetails.responseText.match(/hash/)){
									btn.className="item-star-active star link";
								} else {
									btn.className="item-star star link";
								}		
						}
					})
				*/
				btn.className="item-star star link";
				btn.innerHTML="Dot This!";
				//btn.addEventListener("click", postBookmark,false);
				btn.addEventListener("click", postBookmarkShortCut,false);
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
	var title=header.innerHTML;
	var title_remove_img_regexp = /<img.*?\/?>/;
	title = title.replace(title_remove_img_regexp,""); 	
	var pos=findPos(bookmarkStar);
	var addbkmk=getBookmarkField();
	addbkmk.className="round-box tags-container-box tags-container";
	addbkmk.setAttribute('style',"top: "+(pos[1]-15)+"px; left: "+(pos[0]+40)+"px; width: 350px !important;");
	lblinput.value = getTags(parent);
	titleinput.value=title;
	if(window.getSelection() != ''){
		notesinput.value='\n\nQuoted: '+window.getSelection();
	} else {
		notesinput.value = '';
	}
	lblinput.focus();
	notesinput.selectionStart = 0;
	notesinput.selectionEnd = 0;
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
			lbl=lbl.replace(/-/g,', ');
			lbl.toLowerCase();
			//lbl=lbl.toLowerCase().replace(/^(.)|\s(.)/g, function($1) { return $1.toUpperCase(); });
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
	var title=titleinput.value;
	var labels=lblinput.value;
	var notes=notesinput.value;
	GM_log("URL: "+url+"\nTitle: "+title+"\nTags: "+labels+"\nNotes: "+notes);
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://secure.bluedot.us/v1/posts/add?' + 'url='+encodeURIComponent(url)+'&description='+encodeURIComponent(title)
		      +'&extended='+encodeURIComponent(notes)+'&tags='+labels+'',
		/* for debugging
	    	onload: function(responseDetails) {
        		alert('Request for posting returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' +
              'Data:\n' + responseDetails.responseText);
		}
		*/
	})
	bookmarkField.className+=" hidden";
	bookmarkStar.className="item-star-active star link";
	bookmarkStar.innerHTML="Just Dotted.";
}
function postBookmarkShortCut(event){
  var k = String.fromCharCode(event.which);
  if (bookmarkField && !bookmarkField.className.match(/hidden/)) {
 	if (event.keyCode==27) {
		bookmarkField.className+=" hidden";
	}
	if ((event.which==13 && event.ctrlKey) || event.keyCode == 77) saveBookmark(0);
    	return false;
  }
  if (!document.getElementById('entries')) return false;
  for (i=0;i<document.getElementById('entries').getElementsByTagName('TABLE').length;i++){
      if (document.getElementById('entries').getElementsByTagName('TABLE')[i].className.match(/tags-container/)) {
        var taginputbox = document.getElementById('entries').getElementsByTagName('TABLE')[i];
        if (!taginputbox.className.match(/hidden/)) {
          return false;
        }
        break;
      }
  }
  if (k == 'd' || event == '[object XPCNativeWrapper [object MouseEvent]]') { // do the following code
  } else return false;
  if (!document.getElementById("current-entry")) return false;
  var parent = false;
  for (i=0;i<document.getElementById("current-entry").getElementsByTagName('DIV').length;i++) {
    if (document.getElementById("current-entry").getElementsByTagName('DIV')[i].className == 'entry-actions') {
      parent = document.getElementById("current-entry").getElementsByTagName('DIV')[i];
      break;
    }
  }
  if (!parent) return false;
	bookmarkStar=false;
  for (i=0;i<parent.getElementsByTagName('SPAN').length;i++) {
    if (parent.getElementsByTagName('SPAN')[i].innerHTML == 'Dot This!' || parent.getElementsByTagName('SPAN')[i].innerHTML == 'Previously Dotted.' || parent.getElementsByTagName('SPAN')[i].innerHTML == 'Just Dotted.') {
      bookmarkStar = parent.getElementsByTagName('SPAN')[i];
      break;
    }
  }
  if (!bookmarkStar) return false;
	var header;
	if (mode=="expanded"){
		header=parent.parentNode.parentNode.previousSibling.childNodes[1].
			firstChild.childNodes[1].childNodes[1].firstChild;
	}
	else{
		header=parent.previousSibling.childNodes[1].childNodes[1].firstChild;	
	}
	url=header.getAttribute('href');
	if (bookmarkStar.className=='item-star-active star link'){
		var answer = confirm("Remove this Dot?")
		if (answer){
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://secure.bluedot.us/v1/posts/delete?' + 'url='+encodeURIComponent(url)+'',
				/* for debugging
	 		   	onload: function(responseDetails) {
        				alert('Request for posting returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' +
              			'Data:\n' + responseDetails.responseText);
				}
				*/
			})
			bookmarkStar.className = "item-star star link";
			bookmarkStar.innerHTML = "Dot This!";
		}
		return false;
	}
	var title=header.innerHTML;
	var title_remove_img_regexp = /<img.*?\/?>/;
	title = title.replace(title_remove_img_regexp,"");
	
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://secure.bluedot.us/v1/posts/all?' + 'url='+encodeURIComponent(url),
		    	onload: function(responseDetails) {
	        		//alert('Request for posting returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' +'Data:\n' + responseDetails.responseText);
					if (responseDetails.responseText.match(/hash/)){
						bookmarkStar.className="item-star-active star link";
						bookmarkStar.innerHTML = "Previously Dotted.";
						alert("Previously Dotted.");
						return false;
					} else {
	
	var pos=findPos(bookmarkStar);
	var addbkmk=getBookmarkField();
	addbkmk.className="round-box tags-container-box tags-container";
	addbkmk.setAttribute('style',"top: "+(pos[1]-15)+"px; left: "+(pos[0]+40)+"px; width: 350px !important;");
	lblinput.value = getTags(parent);
	titleinput.value=title;
	if(window.getSelection() != ''){
		notesinput.value='\n\nQuoted: '+window.getSelection();
	} else {
		notesinput.value = '';
	}
	lblinput.focus();
	notesinput.selectionStart = 0;
	notesinput.selectionEnd = 0;
					}
			}
		})
}
document.addEventListener("keypress", postBookmarkShortCut, true);
