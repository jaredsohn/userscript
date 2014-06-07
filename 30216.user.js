// ==UserScript==
// @version 99 
// @name Shiv's Rocks
// @author Shiv - using DAnger fonts
// @namespace
// @description Shiv Always rockz..
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