// ==UserScript==
// @version Smilies
// @name Shiv's Rocks
// @author Shiv - using DAnger fonts
// @namespace
// @description Shiv Smilies.
// @include http://www.orkut.co.in/CommMsgPost.aspx?*
// @include http://www.orkut.co.in/*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea() {
	return document.getElementsByTagName('textarea')[0];
}


function mM() {
	e=getTextArea();
	s=e.value;
	r="";
	for(k=0;k<s.length;k++){
		l=s.substr(k,1);
		r+=(k%2) ? l.toLowerCase() : l.toUpperCase();
	}
	e.value=r;
}
//-----------------------------------------------------------
//--                  Written links                        --
//-----------------------------------------------------------
	function ankfns() {
	text=getTextArea();
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("div");
	d.className="T";
	d.style.fontSize="11px";
	d.align="left";
	d.innerHTML="<b><span style='color:green;'>Shiv Rocks</b></span>";
	d.style.marginTop="10px";
	c.appendChild(d);


	SPG=document.createElement("b");
	SPG.innerHTML=" ---(*.*)-->> ";
        d.appendChild(SPG);

	ad=document.createElement("a");
	ad.href="http://www.orkut.co.in/Profile.aspx?uid=10797568321145789832";
	ad.innerHTML="<b><span style='color:red;'>Shiv's</span><span style='color:black;'> Profile</b></span>";
	ad.target="_blank";
	d.appendChild(ad);



	SPB=document.createElement("b");
	SPB
}

ankfns();
}, false);
//-----------------------------------------------------------
//--                 Large Orkut Smileys                   --
//-----------------------------------------------------------


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src=www.orkut.com/"+image+" width=40 height=40>";
}

function orkutsmiley() {
	var smileyarr = new Array();	
	smileyarr["smile"]="img/i_smile.gif";
	smileyarr["sad"]="img/i_sad.gif";
	smileyarr["angry"]="img/i_angry.gif";
	smileyarr["bsmile"]="img/i_bigsmile.gif";
	smileyarr["funny"]="img/i_funny.gif";
	smileyarr["surprise"]="img/i_surprise.gif";
	smileyarr["wink"]="img/i_wink.gif";
	smileyarr["cool"]="img/i_cool.gif";
	smileyarr["confuse"]="img/i_confuse.gif";
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
orkutsmiley();
}, false);
