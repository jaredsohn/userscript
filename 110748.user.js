// ==UserScript==
// @name	emoticons005 of frendz4m.com
// @version	1.10
// @author	WAKKAR.SHASHANK8@@gmail.com
// @description	Use Animated emoticons(for www.frendz4m.com only) in community Forums. Just click on a smiley to insert. Enjoy, love u frendz4m
// @include        http://*.frendz4m.*/*reply.php*
// @include        http://*.frendz4m.*/*forum*/*showthreads*
// @include        http://*.frendz4m.*/*forum*/*edit.php*
// @include        http://*.frendz4m.*/*forum*/*index2.php*
// @include	   http://*.frendz4m.*/forum/index2.php*
// @include	   http://*.frendz4m.*/*forum*/*pm*/*replypm.php*
// @include	   http://*.frendz4m.*/*forum*/*pm*/*writepm.php*
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

var smileyarr = new Array();	
smileyarr["sex016"]="http://www.freesmileys.org/smileys/smiley-sex016.gif";
smileyarr["FUN"]="http://www.freesmileys.org/smileys/smiley-merv/rofl.gif";
smileyarr["sex011"]="http://www.freesmileys.org/smileys/smiley-sex011.gif";
smileyarr["sex009"]="http://www.freesmileys.org/smileys/smiley-sex009.gif";
smileyarr["sex012"]="http://www.freesmileys.org/smileys/smiley-sex012.gif";
smileyarr["sex016"]="http://www.freesmileys.org/smileys/smiley-sex016.gif";
smileyarr["dance007"]="http://www.freesmileys.org/smileys/smiley-dance007.gif";
smileyarr["dance020"]="http://www.freesmileys.org/smileys/smiley-dance020.gif";
smileyarr["angry021"]="http://www.freesmileys.org/smileys/smiley-angry021.gif";
smileyarr["stop"]="http://www.freesmileys.org/smileys/smiley-forum/stop.gif";
smileyarr["emoticon-animal-032"]="http://www.freesmileys.org/emoticons/emoticon-animal-032.gif";
smileyarr["emoticon-anime-016"]="http://www.freesmileys.org/emoticons/emoticon-anime-016.gif";
smileyarr["emoticon-char-004"]="http://www.freesmileys.org/emoticons/emoticon-char-004.gif";
smileyarr["emoticon-anime-050"]=http://www.freesmileys.org/emoticons/emoticon-anime-050.gif";
smileyarr["emoticon-misc-009.gif"]="http://www.freesmileys.org/emoticons/emoticon-misc-009.gif";

	

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