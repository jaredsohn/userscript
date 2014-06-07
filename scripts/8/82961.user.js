// ==UserScript==
// @name           Google Images Canvas
// @namespace      http://userscripts.org/users/sarregouset
// @description    Zooms Hovered Images
// @include        http://www.google.com/images?*
// @include        http://www.google.com/imgres?*
// @include        http://images.google.com/images?*
// ==/UserScript==

//Initialize variables to prevent looping
function initialize() {
	var image = document.getElementById('rg_hi');
	hnow = image.height;
	wnow = image.width;
	var right = document.getElementById('rg_hx');
	rnow = right.style.width;
	tnow = box.style.top; //These seem to be zero the first time and then irrelevant?
	lnow = box.style.left;
	}

function hover() {
	var link = document.getElementById('rg_hl');
	var url = link.href;
	url = url.replace(/http:\/\/(www|images).google.com\/imgres\?imgurl=/,"").replace(/&imgrefurl=.*/,"");//.replace(/%2520/," ");testing
//	url = url.replace(/&iact.*/,"");
	//Make sure url exists.
	var img = new Image();
//	img.onload = function (){
		link.href = url;
		var image = document.getElementById('rg_hi');
		image.src = url;
		image.style.height = 2*hnow+"px";
		image.style.width = 2*wnow+"px";
		var right = document.getElementById('rg_hx');
		right.style.width = 2*rnow+"px";
		box.style.top = Math.max(tnow-hnow/2,0)+"px";	
		box.style.left = Math.max(lnow-wnow/2,0)+"px";	
		box.style.height = 2*hnow+85+"px";	
		box.style.width = 2*wnow+"px";
//		}
/*	img.onerror = function (){
		var note = document.getElementById('rg_ht');
		span = document.createElement('span');
		span.style.color = "red";
		span.textContent = "(image ref broken)";
		note.appendChild(span, note);	
		}
	img.src = url;*/
	
	//Link to website
	var title = document.getElementById('rg_hta');
	var ref = title.href;
	ref = ref.replace(/http:\/\/(www|images).google.com\/imgres\?imgurl=.*&imgrefurl=/,"").replace(/&usg=.*/,"").replace(/%2520/," ");
//	ref = ref.replace(/&iact.*/,""); //Need to do this after user clicks??
	var source = document.getElementById('rg_hr');
	var unow = source.textContent;
	a = document.createElement('a');
	a.id = "rg_hr";
	a.href = ref;
	a.style.color = "green";
	a.textContent = unow;
	source.parentNode.replaceChild(a, source);	
	}
	
//Initialize global variables
var hnow, wnow, tnow, lnow, rnow;
var box = document.getElementById('rg_h');

//Find hovered pic and watch changes
var node = document.getElementById('rg_hn');
node.addEventListener('DOMNodeInserted', initialize, false);
var watch = document.getElementById('rg_hl');
watch.addEventListener('DOMSubtreeModified', hover, false);