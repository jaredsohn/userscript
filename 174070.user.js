// ==UserScript==
// @name	Doc Truyen Online RightClick
// @description	Open Next Chapter in Tunghoanh.com,WebTruyen.com,Truyenyy.com
// @include	http://tunghoanh.com/*/*.html
// @include	http://webtruyen.com/*/*.html
// @include	http://truyenyy.com/doc-truyen/*
// @exclude	http://tunghoanh.com/*/trang-*.html
// @author	Mr.CHU (Chu Tiên Sinh)
// @version	13.110906
// @encoding utf-8
// @icon http://icons.iconarchive.com/icons/calle/black-knight/32/Read-the-Story-of-icon.png
// @resource icon http://icons.iconarchive.com/icons/calle/black-knight/32/Read-the-Story-of-icon.png
//====================================================
// Reason : Source Code Has Been Changed
// @copyright	2012-2013 © Please report the bug. Thanks!
// ==/UserScript==
const thisURL = window.location.href;
const thisDomain = GetDomain(thisURL);

function GetDomain(url) {
    //return url.match(/:\/\/(.[^/]+)/)[1]; //include www if found
	return url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/)[2]; //no www
}

if (thisDomain == "tunghoanh.com"){

	var NextPrevLinks = document.evaluate(
	'//a['+
		'(starts-with(@class, "prev") or starts-with(@class, "next")) '+
		'and starts-with(@href, "http://tunghoanh.com/") '+
	']',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	var NextPrevLink;
	var NextLink = "#";
	var PrevLink = "#";
	var linkClass;
	for (i = 0; i < NextPrevLinks.snapshotLength; i++){
		NextPrevLink = NextPrevLinks.snapshotItem(i);
		linkClass = NextPrevLink.getAttribute("class");
		if (linkClass == "prev")
		{	PrevLink = NextPrevLink;  }
		else if (linkClass == "next")
		{	NextLink = NextPrevLink;  }
		else
		{	NextLink = "#";  }
		
	}
	
}else if (thisDomain == "webtruyen.com"){

	var NextPrevLinks = document.evaluate(
	'//a['+
		'(starts-with(@id, "prechap") or starts-with(@id, "nextchap")) '+
		'and starts-with(@href, "http://webtruyen.com/") '+
	']',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	var NextPrevLink;
	var NextLink = "#";
	var PrevLink = "#";
	var linkId;
	for (i = 0; i < NextPrevLinks.snapshotLength; i++){
		NextPrevLink = NextPrevLinks.snapshotItem(i);
		linkId = NextPrevLink.getAttribute("id");
		if (linkId == "prechap")
		{	PrevLink = NextPrevLink;  }
		else if (linkId == "nextchap")
		{	NextLink = NextPrevLink;  }
		else
		{	NextLink = "#";  }
		
	}
	
}else if (thisDomain == "truyenyy.com"){

	var NextPrevLinks = document.evaluate(
	'//a['+
		'(starts-with(@class, "btn btn-small btn-warning")) '+
		/*'and starts-with(@href, "/doc-truyen/") '+*/
	']',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	var NextPrevLink;
	var NextLink = "#";
	var PrevLink = "#";
	var linkId;
	
	if (NextPrevLinks.snapshotLength == 3){
		PrevLink = NextPrevLinks.snapshotItem(0);
		NextLink = NextPrevLinks.snapshotItem(2);
	}else{
		if (NextPrevLinks.snapshotItem(0).getAttribute("href") == "#chap_jump"){
			PrevLink = "#";
			NextLink = NextPrevLinks.snapshotItem(1);
		}else{
			PrevLink = NextPrevLinks.snapshotItem(0);
			NextLink = "#";
		}
	}
	
}

//---------------------------------------------------------------
//---------------------------------------------------------------

	$(document).keydown(function(e){
			//if (is_firefox == false && is_explorer = false) return;
			 var code = (e.keyCode ? e.keyCode : e.which);
			 
			 if(code == 37) { //left
				location.href = PrevLink;
			 }
			 if(code == 39) { //right
				if (NextLink != "#"){
					location.href = NextLink;
				}else{
					alert('Chưa có Chương mới hoặc Truyện đã đến hồi kết!');
					return false;
				}
			 }			 
	});
	$('body').dblclick(function(){
		if (NextLink != "#"){
			window.open(NextLink, '_blank');
		}else{
			alert('Chưa có Chương mới hoặc Truyện đã đến hồi kết!');
			return false;
		}
	});
	(function($) {
	  $.fn.rightClick = function(method) {
		$(this).bind('contextmenu rightclick', function(e){
			e.preventDefault();
			method();
			return false;
		})

	  };
	})(jQuery);
	$('body').rightClick(function(e){
		if (NextLink != "#"){
			window.open(NextLink, '_blank');
		}else{
			alert('Chưa có Chương mới hoặc Truyện đã đến hồi kết!');
			return false;
		}
	});

//---------------------------------------------------------------
//---------------------------------------------------------------