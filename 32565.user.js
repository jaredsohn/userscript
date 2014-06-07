// ==UserScript==
// @name UCWEB saver
// @author ezibo
// @ujs:category general: enhancements
// @ujs:modified 2008-04-25

// press ALT + Click to save link,pic link and pic to ucweb
// ==/UserScript==


function procucweb(){
	var url = "http://my.ucweb.com/index.php?op=ie2ucweb";
	var eventx = event.srcElement;
	var mode = 0;
	var title = document.title;
	if(eventx.tagName=="A")
	{
		mode = 3; // url, text
		var u = eventx.getAttribute("HREF");
		var t = eventx.innerText;
		url = url+'&mode='+mode+'&url='+encodeURIComponent(u)+'&text='+encodeURIComponent(t)+'&title='+encodeURIComponent(title);
		window.open(url);
	}
	else if (eventx.tagName=="IMG" && eventx.parentNode.tagName=="A") {
		mode = 2; // url, src, alt, text, title
		var parent = eventx.parentNode;
		var t = parent.innerText;
		var u = parent.getAttribute("HREF");
		var s = eventx.getAttribute("SRC");
		var a = eventx.getAttribute("ALT");
		url = url+'&mode='+mode+'&url='+encodeURIComponent(u)+'&src='+encodeURIComponent(s)+'&alt='+encodeURIComponent(a)+'&title='+encodeURIComponent(title)+'&text='+encodeURIComponent(t);
		window.open(url);
	}
	else if (eventx.tagName=="IMG") {
		mode = 1; // src, alt
		var s = eventx.getAttribute("SRC");
		var a = eventx.getAttribute("ALT");
		url = url+'&mode='+mode+'&src='+encodeURIComponent(s)+'&alt='+encodeURIComponent(a)+'&title='+encodeURIComponent(title);
		window.open(url);
	}
	else {
		mode = 4;
		var u = document.location.href;
		var s = document.getSelection();
		if( s == "" ) { // no selection
			mode = 5; // url, title
		}
		url = url+'&mode='+mode+'&url='+encodeURIComponent(u)+'&title='+encodeURIComponent(title)+'&select='+encodeURIComponent(s);
		window.open(url);
	}
}

function ProcClick(e){
	if(e && e.button==0){
		if(!e.ctrlKey && !e.shiftKey && e.altKey){
			e.stopPropagation();
			e.preventDefault();
			procucweb();
		}
	}
}

document.addEventListener('click',ProcClick,false)