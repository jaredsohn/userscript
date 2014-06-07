// ==UserScript==
// @name	Blakut Moderation Script
// @version	1.00
// @author	Swashata
// @namespace	TEAM BLAKUT
// @description	Quick Reference Moderation Script for Warning reminder etc.
// @include        http://*.orkut.*/*CommMsgs.aspx*
// @include        http://*.orkut.*/*CommMsgPost.aspx*
// ==/UserScript==

/**********************************************************************************************************************************************************
//Phew done after some equation solving! My Moral: Take things in an easy way.
//Found the definition of the title given... made that to come as link ;) Now the title is used as link as well as quick display!!
***********************************************************************************************************************************************************/

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<a href="+title+"><img src="+image+"></a>";
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["http://bit.ly/DFS"]="http://lh5.ggpht.com/_xP3DamJrys4/STEmtytg5YI/AAAAAAAAACA/wvay2-lh-mc/s400/2hd1l45.png";
	smileyarr["http://bit.ly/Banned"]="http://lh3.ggpht.com/_Wn1h6aeHNlw/SKDCZBc6n6I/AAAAAAAABfU/xUnSHUY51iA/Banned.gif";
	smileyarr["http://bit.ly/TAGS"]="http://lh3.ggpht.com/_Wn1h6aeHNlw/SKDCZGpqOTI/AAAAAAAABfc/hmXQgGneLNU/Use%20TAGS.gif";
	smileyarr["http://bit.ly/DFSSpam"]="http://lh6.ggpht.com/_Wn1h6aeHNlw/SKaT8Q2yy_I/AAAAAAAABgA/SlGUfjppoRY/Spam.gif";
	smileyarr["http://bit.ly/GeneralRule"]="http://lh5.ggpht.com/_Wn1h6aeHNlw/SKaT8V6ZTLI/AAAAAAAABgI/LU2D47556u4/Do%20not%20reply.gif";
	smileyarr["http://bit.ly/GeneralRule"]="http://lh6.ggpht.com/_Wn1h6aeHNlw/SKaT8g45CMI/AAAAAAAABgQ/qCqqn3R6Ig8/2b%20deleted.gif";
	

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

//More Smileys could be found on http://www.blakut.com/2008/12/use-animated-smileys-to-make-orkutting.html
// Visit our official website www.blakut.com for regualr update on smileys and other orkut related stuffs.
//~~Happy Orkutting~~
// Regards--- Swashata