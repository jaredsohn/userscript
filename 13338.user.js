// ==UserScript==
// @name           PSPK's Selected Yahoo Smileys + TextBox Enlarger!
// @description    Use Basic Yahoo Smileys for Orkut Friends and Simultaneously Enlarge your Textbox!!!
// @include        http://www.orkut.com/Scrapbook.aspx*
// @include        http://www.orkut.com/CommMsgPost.aspx*
// @include        http://www.orkut.co.in/Scrapbook.aspx*
// @include        http://www.orkut.co.in/CommMsgPost.aspx*
// ==/UserScript==

/********************************************************
Whole structure changed by Praveen to simplify the script.
and add the smilies to the reply box as well.
Original Concept by Abhishek
Base script http://userscripts.org/scripts/show/12735
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
	smileyarr["smile"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/1.gif";
	smileyarr["bsmile"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/4.gif";
	smileyarr["roll"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/24.gif";
	smileyarr["sad"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/2.gif";
	smileyarr["angry"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/14.gif";
	smileyarr["confuse"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/7.gif";
	smileyarr["funny"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/10.gif";
	smileyarr["wink"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/3.gif";
	smileyarr["cool"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/16.gif";
	smileyarr["hug"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/6.gif";
	smileyarr["laugh"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/21.gif";
	smileyarr["applause"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/41.gif";
	smileyarr["bestwishes"]="http://s240.photobucket.com/albums/ff289/otext/smiley/sm55.gif";
	smileyarr["devil"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/19.gif";
	smileyarr["angel"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/25.gif";
	smileyarr["party"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/36.gif";
	smileyarr["clown"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/34.gif";
	smileyarr["dancing"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/69.gif";
	smileyarr["rose"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/53.gif";
	smileyarr["star"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/79.gif";
	smileyarr["cafe"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/57.gif";
	smileyarr["bye"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/103.gif";
	smileyarr["sleep"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/28.gif";
	
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

//-----------------------------------------------------------
//--                    Enlarges the textbox               --
//-----------------------------------------------------------



function RunScript() {
set_style_script(window.document,document.getElementById('scrapText'),"height: 150px;width: 700px;",null,null);
}; // Ends RunScript
window.addEventListener("load", function() { RunScript() }, false);

function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};

//.us