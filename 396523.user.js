// ==UserScript==
// @name           Omni Emoticon
// @namespace      +Cloud
// @description    Inserts Omnis face on your post now!
// @include        *hackforums.net/newreply.php*
// @include        *hackforums.net/editpost.php*
// @include        *hackforums.net/newthread.php*
// @include        *hackforums.net/showthread.php*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "[img]"+image+"[/img]";
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["1"]="http://i.imgur.com/RjO7FwV.jpg";
	smileyarr["2"]="http://i.imgur.com/ReeWbBJ.png";

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);