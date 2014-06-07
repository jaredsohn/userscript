 // ==UserScript==
// @name          Facebook Picture Links
// @description   Adds links to Facebook thumbnails to the fullsize images.
// @author        MaddHatter
// @version       1.0
// @include       http://*.facebook.com/album*
// @include       http://*.facebook.com/photo*
// ==/UserScript==

function addGlobalStyle(css) { //Function to add CSS Styles
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function addLink(){//Function to add link bar to images
	var slash=this.src.lastIndexOf("/");
	fullImage=this.src.substr(0,slash+1)+"n"+this.src.substr(slash+2);
	originalHTML=this.parentNode.parentNode.innerHTML;
	this.parentNode.parentNode.innerHTML=originalHTML+'<div class="fullSize" style="width:'+this.width+'px; text-align:center; position:relative; bottom:21px;"><a href="'+fullImage+'" style="display:block;">Original</a></div>'
}

//Define fullSize class
addGlobalStyle('.fullSize{  height:15px; z-index:57; margin:0 auto;}');
addGlobalStyle('.fullSize a {background-color:rgb(59, 89, 152); color:#FFFFFF; font-size:10px; -moz-opacity:0.8;}');
addGlobalStyle('.fullSize a:hover {background-color:rgb(59, 89, 152); color:#FFFFFF; font-size:10px; -moz-opacity:0.8; text-decoration:none;}');


//Add event listeners for onload of images
var allImgs=document.getElementsByTagName("img");

for(i=0;i<allImgs.length;i++){
	var slash=allImgs[i].src.lastIndexOf("/");

	if((allImgs[i].src.charAt(slash+1)=="s") && isNaN(allImgs[i].src.charAt(slash+2))==false){
		allImgs[i].addEventListener('load',addLink,false);
	}
}


