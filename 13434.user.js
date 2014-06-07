// ==UserScript==
// @name           Debajyoti's Selected Yahoo Smilies + TextBox Enlarger 
// @description    Use Basic Yahoo! Smilies for Orkut Friends and simultaneously Enlarge your Textbox!
// @include        http://www.orkut.com/Scrapbook.aspx*
// ==/UserScript==



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
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/1.gif";
	smileyarr["sad"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/2.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/14.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/4.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/10.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/3.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/16.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/6.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/21.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/9.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/19.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/25.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/24.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/28.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/41.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/36.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/34.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/103.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/69.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/52.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/53.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/57.gif";
	smileyarr["Join BSS-Best Scraps&Softwares For More Tricks"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/79.gif";
	
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

var td=document.getElementsByTagName("ul")[1];
     td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/CommTopics.aspx?cmm=26050471'>BSS-Best Scraps And Softwares</a>&nbsp;|&nbsp;</li>";


