// ==UserScript==
// @name          Rubin Love You Alot
// @namespace     http://www.orkut.co.in/Main#Home
// @author		  Rubin Jose
// @description   Yahoo  smilies for Orkut by DGX-|RUBIN|
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
// All credits to Original script writer. I hope u all enjoy the script! ;)
*********************************************************/

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();


/*Yahoo big smilies*/

	smileyarr["angry"]="http://i27.tinypic.com/2njlmqb.jpg";
	smileyarr["bounce"]="http://i31.tinypic.com/34sie7q.jpg";
	smileyarr["angry"]="http://i28.tinypic.com/1q4yeg.jpg";
	smileyarr["wave"]="http://i26.tinypic.com/347d1xe.jpg";
	smileyarr["me-here"]="http://i31.tinypic.com/2el5v2x.jpg";
	smileyarr["dance-yahoo"]="http://i32.tinypic.com/2ym9f93.jpg";
	smileyarr["stepup"]="http://i31.tinypic.com/8xlv2v.jpg";
	smileyarr["love"]="http://i29.tinypic.com/2uz42s6.jpg";
	smileyarr["love-fore"]="http://i32.tinypic.com/4jvl9d.jpg";
	smileyarr["simple"]="http://i31.tinypic.com/2bbsjl.jpg";
	smileyarr["hide"]="http://i25.tinypic.com/izcosg.jpg";
	smileyarr["love-"]="http://i26.tinypic.com/2mfm7m0.jpg";
	smileyarr["kiss"]="http://i29.tinypic.com/j7rul2.jpg";
	smileyarr["thinking"]="http://i32.tinypic.com/2j2gvw0.jpg";
	smileyarr["exercise"]="http://i25.tinypic.com/2rc8yli.jpg";
	smileyarr["wait"]="http://i26.tinypic.com/2qn1g7q.jpg";
	smileyarr["rock"]="http://i25.tinypic.com/nl7hna.jpg";
	smileyarr["angry"]="http://i28.tinypic.com/1z4ej39.jpg";
	smileyarr["cute"]="http://i25.tinypic.com/zyde0j.jpg";
	smileyarr["Happy"] ="http://smileyjungle.com/smilies/greetings11.gif";
	smileyarr["smile1"]="http://smileyjungle.com/smilies/greetings0.gif";
	smileyarr["smile6"]="http://smileyjungle.com/smilies/aloofandbored0.gif";
	smileyarr["smile4"]="http://smileyjungle.com/smilies/angel3.gif";
	smileyarr["smile3"]="http://smileyjungle.com/smilies/angry0.gif";
	smileyarr["smile2"]="http://smileyjungle.com/smilies/angry5.gif";
	smileyarr["Help"]="http://smileyjungle.com/smilies/infomilies16.gif";
	smileyarr["love"]="http://smileyjungle.com/smilies/infomilies41.gif";
	smileyarr["teeth"]="http://smileyjungle.com/smilies/smiling3.gif";
	smileyarr["confused"]="http://smileyjungle.com/smilies/confused1.gif";
	smileyarr["love"]="http://smileyjungle.com/smilies/love3.gif";
	smileyarr["love2"]="http://smileyjungle.com/smilies/love27.gif";
	smileyarr["love3"]="http://smileyjungle.com/smilies/love49.gif";
	smileyarr["celebrate"]="http://smileyjungle.com/smilies/celebrate8.gif";
	smileyarr["celbra"]="http://smileyjungle.com/smilies/celebrate16.gif";
	smileyarr["dead"]="http://smileyjungle.com/smilies/aloofandbored10.gif";
	

	s

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

// DGX-Rules