// ==UserScript==
// @name                Google Reader + del.icio.us
// @namespace      	http://google.com/reader/userscript
// @description       	Adds reader posts to del.icio.us when clicked
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// ==/UserScript==


// Google Reader + del.icio.us
// Adapted from http://userscripts.org/scripts/show/6497 by JohnM
// All bugs are mine, and not JohnM's.

// Updates by Scott Cowan http://userscripts.org/users/32932
// added fix for prefilling the Title, and https sites from Liu Yang http://userscripts.org/users/27500
// moved the entry box about the buttons instead of below
// Note: if your using Google Reader Optimized you'll need to change css for .entry-actions to float: left instead of right

//Constants
//NORMALIZE=false leaves the tags alone
//NORMALIZE=true converts tags to proper case and replaces -'s with spaces, like reader should itself
/*var DEFAULT_LABEL="toread";*/
var NORMALIZE=true;

var tags=GM_getValue("tag","toread");

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
GM_registerMenuCommand("Define Tags",config);

function config() {
  tags=prompt("Insert a list of tags separated by a \",\"\nYou can separe lists of tags to get more possibility with \"|\"\nYou must reload after every changes.",tags);
  GM_setValue("tag",tags);
}

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
        labels=tags.split("|");
        for (var i = 0; i < labels.length; ++i) {
          var btn=document.createElement("span");
          btn.className="item-star star link";
          btn.innerHTML=labels[i];
          btn.addEventListener("click", postBookmark,false);
          linkbar.appendChild(btn);
        }
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
      header=parent.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
	}
	else{
      header=parent.parentNode.childNodes[1].childNodes[0].childNodes[1].childNodes[0];
	}
    url=header.getAttribute('href');
	var title=header.innerHTML;
	var title_remove_img_regexp = /<img.*?\/?>/;
	title = title.replace(title_remove_img_regexp,"");
	labels=bookmarkStar.innerHTML;
  var notes="";
	
  GM_xmlhttpRequest({
		method: 'POST',
		url: 'https://api.del.icio.us/v1/posts/add?' + 'url='+encodeURIComponent(url)+'&description='+encodeURIComponent(title)
		      +'&extended='+notes+'&tags='+labels,
	})
	bookmarkStar.className="item-star-active star link";
}

